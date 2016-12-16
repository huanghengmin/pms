/*
 模块名称:费用信息修改和新增
 编 写 人:ccj
 编写时间:2014-09-29
 完成时间:
 */
$(function () {
    var prePYM = "";
    ///显示默认信息
    var showDefaultInfor = function () {
        var strid = $("#hidid").val();
        if (strid != "0") {
            showTips(2, 'txtBH', "费用编号不能修改!");
        } else {
            showTips(2, 'txtBH', "请输入费用编号!");
        }
        showTips(2, 'txtName', "请输入费用名称!");
        showTips(2, 'txtPrice', "请输入单价!");
    };

    ///检查数据的合法性
    var checkok = function () {
        var success = true;
        var r = /^[a-z\d\u4E00-\u9FA5]+$/i;
        if (isEmpty($("#txtBH").val())) {
            showTips(3, 'txtBH', "费用编号不能为空");
            success = false;
        } else {
            showTips(2, 'txtBH', "");
            if (!r.test($("#txtBH").val())) {
                showTips(3, 'txtBH', "费用编号包含特殊字符");
                success = false;
            }
            else {
                $(".note").hide();
            }
        }
        if (isEmpty($("#txtName").val())) {
            showTips(3, 'txtName', "费用名称不能为空");
            success = false;
        } else {
            showTips(2, 'txtName', "");
            if (!isEmpty($("#txtName").val()) && !/^[A-Za-z0-9\u4e00-\u9fa5\s]+$/.test($("#txtName").val())) {
                showTips(3, 'txtName', "费用名称请输入中文字母数字");
                success = false;
            }
            else {
                $(".note").hide();
                var name = $("#txtName").val().replace(/\s/g, "");
                var result = postSynRequest("/Services/BasicService.aspx", { id: $("#hidid").val(), name: name }, "SPXXUsl", "PriceByName");
                if (result.State.Success) {
                    showTips(3, 'txtName', "费用(商品)名称不能重复");
                    success = false;
                } else {
                    showTips(2, 'txtName', "");
                }
            }
        }

        if (!isNumeric($("#txtPrice").val())) {
            showTips(3, 'txtPrice', "单价输入有误");
            success = false;
        } else {
            if (parseFloat($("#txtPrice").val()) < 0) {
                showTips(3, 'txtPrice', "单价不能小于零");
                success = false;
            } else {
                showTips(2, 'txtPrice', "");
            }
        }

        return success;
    };
    //保存事件
    var saveClick = function () {
        if (!checkok()) { return; }
        var spfl = $("#selSPFL").val();
        var dj = $("#txtPrice").val();
        var status = "";
        var Obj = document.getElementsByName("radStatus");
        for (i = 0; i < Obj.length; i++) {
            if (Obj[i].checked) {
                break
            }
        };
        if (i == Obj.length) {
            alert("没有选择！");
        } else {
            status = Obj[i].value;
        }
        var data = {
            Id: $("#hidid").val(),
            BH: $("#txtBH").val(),
            Name: $("#txtName").val().replace(/\s/g, ""),
            SPFL: spfl,
            TXM: $("#txtTXM").val(),
            PYM: $("#txtPYM").val(),
            dDJ: dj,
            Des: $("#txtRemark").val(),
            status: status
        };
        postRequest("/Services/BasicService.aspx", data, "SPXXUsl", "PriceAdd", false, function (data) {
            if (!data.State.Success) {
                showErrNotice(data.State);
                alert(data.State.Des);
                return false;
            }
            alert("保存成功!");
            //top.ActiveWin.returnMethod(data.Data);
            try {
                parent[0].returnMethod(data.Data);
            } catch (e) {
                if (typeof (parent[0][0].returnMethod)=="function")
                    parent[0][0].returnMethod(data.Data);
                else
                    parent[0][1].returnMethod(data.Data);
            }
            closeWin();
        });
    };

    //商品类别
    $("#selSPFL").change(function () {
        var spflId = $(this).val();
        postRequest("/Services/BasicService.aspx", { spflId: spflId }, "SPXXUsl", "GetShopBh", false, function (data) {
            if (data.State.Success) {
                $("#txtBH").val(data.Data.shopBh);
                $("#ShopBH").val(data.Data.shopBh);
            }
        });
    });

    //附加事件
    var attachEvent = function () {
        $("#btnSave").click(saveClick);
        $("#txtName").blur(getPYM);
        $("#txtPYM").focus(getPYM);
    };

    ///加载下拉框
    var loadCombo = function (spfls, dw) {
        for (var i = 0; i < spfls.length; i++) {
            $("#selSPFL").append("<option value='" + spfls[i].Id + "'>" + spfls[i].Name + "</option>");
        }
    }

    //获取页面数据
    var getPageData = function () {
        var str = $("#hidid").val();
        var spfl = "0";
        var url = "/Services/BasicService.aspx";
        var method = "GetPriceInforPageData";
        var spfl = getUrlParam("spfl");
        if (spfl == undefined || spfl == null || spfl == "") { spfl = 0; }
        postRequest(url, { id: $("#hidid").val(), spfl: spfl }, "SPXXUsl", method, false, function (data) {
            if (!data.State.Success) {
                alert("获取数据失败!" + data.State.Des);
                return false;
            }
            loadCombo(data.Data.spfls, data.Data.dw);
            fillData(data.Data.spxx, data.Data.shopBh);
        });
    };

    //获取拼音码
    var getPYM = function () {
        var url = "/Services/BasicService.aspx";
        var method = "GetPYM";
        if (prePYM == $("#txtName").val()) { return; }
        postRequest(url, { name: $("#txtName").val().replace(/\s/g, "") }, "SPXXUsl", method, false, function (data) {
            if (!data.State.Success) { return false; }
            $("#txtPYM").val(data.Data);
            prePYM = $("#txtName").val();
        });
    };


    //错误显示
    var showErrNotice = function (err) {
        switch (err.Errkey) {
            case "Name":
                showTips(3, 'txtName', err.Des);
                break;
            case "iSPFL":
                showTips(3, 'selSPFL', err.Des);
                break;
            case "BH":
                showTips(3, 'txtBH', err.Des);
                break;
        }
    }

    //填充数据
    var fillData = function (spxx, shopBh) {
        $(".radio").removeAttr("checked");
        if (shopBh != "" && shopBh != undefined && shopBh != null) {
            $("#txtBH").val(shopBh);
        } else {
            $("#txtBH").val(spxx.BH);
        }
        $("#txtName").val(spxx.Name);
        $("#txtBarCode").val(spxx.TXM);
        $("#txtPYM").val(spxx.PYM);
        $("#txtPrice").val(spxx.dDJ.toFixed(2));
        $("#txtRemark").val(spxx.Des);
        $("#selSPFL").val(spxx.iSPFL);
        document.getElementById(spxx.Available).checked = true;
        prePYM = spxx.Name;
    };

    //设置默认值
    var setDefault = function () {
        var id = getUrlParam("id");
        if (id == undefined || id == null) { id = "0"; }
        $("#hidid").val(id);
        if (id != "0") {
            $("#txtBH").attr("disabled", "disabled");
            $("#txtBH").css("background", "#EEE");
        }
        else {

        }
        attachEvent();
        showDefaultInfor();
    };

    //页面载入
    var pageLoad = function () {
        setDefault();
        getPageData();
    };
    pageLoad();
});