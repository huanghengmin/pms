/*
 模块名称:费用信息含费用分类.
 编 写 人:ccj
 编写时间:2014-09-29
 完成时间:
 */
var returnMethod = null;        //弹出窗体回调函数
$(function () {
    var pagesize = 10;
    var selspfl = 0;
    var addtag = false;
    var pageM = null;
    ///回调函数
    var callBack = function (data) {
        var attrid = $("#tr_" + data.Id).attr("id");
        if (attrid == null || attrid == undefined) {
            var datas = new Array();
            datas.push(data);

            showSPXX(datas);
        } else {
            editSPXX(data);
        }
    };

    //按钮点击事件
    var btnAddClick = function () {
        if (!addtag) {
            addtag = true;
            //clearSPXX();
        }
        //top.ActiveWin = window;
        ActiveWin = window;
        returnMethod = callBack;
        openWin("/pages/Priceinfor.html?id=0&spfl=" + selspfl, 500, 460, "");
//        "<iframe src='../express/map.jsp' height='100%' width='100%'></iframe>"
    };

    //附加事件
    var attachEvent = function () {
        $("#btnAdd").click(btnAddClick);
        $("#chk_all").click(chkAllClick);
        $("#btnMDel").click(btnMDelClick);
        $("#btnQuery").click(function () { clearSPXX(); querySpxx(1, true); });
    };

    ///批量删除
    var btnMDelClick = function () {
        var chks = $("#tblgood tbody tr td input[type=checkbox]");
        var ids = "";
        for (var i = 0; i < chks.length; i++) {
            if ($(chks[i]).attr("checked")) {
                if (ids != "") { ids = ids + ","; }
                ids = ids + $(chks[i]).attr("id").substring(4)
            }
        }
        if (ids == "") {
            alert("请选择需要删除的资料!");
            return;
        }
        if (!confirm("确定要删除选中的资料吗?")) { return; }

        var url = "/Services/BasicService.aspx";
        var method = "DelPriceByIDS";
        postRequest(url, { ids: ids }, "SPXXUsl", method, false, function (data) {
            if (!data.State.Success) {      //不正确的
                alert(data.State.Des);
                return false;
            }
            var aid = ids.split(",");
            for (var i = 0; i < aid.length; i++) {
                deleteSPXX(aid[i]);
            }
            alert("删除成功!");
        });
    }

    //所有选择
    var chkAllClick = function () {
        var tag = $(this).attr("checked");
        if (tag == null || tag == undefined || !tag) {
            tag = false;
        }
        $("#tblgood tbody tr td input[type=checkbox]").attr("checked", tag);
    };

    //填充数据
    var fillSPFLData = function (spfl) {
        var html = "<li id='li_0' class='select'><span>全部</span></li>"
        for (var i = 0; i < spfl.length; i++) {
            html = html + "<li id='li_" + spfl[i].Id + "'><span>" + spfl[i].Name + "</span><em class='edit'></em><em class='dell'></em></li>";
        }
        html = html + " <li id='li_end' class='end'>&nbsp;</li>";
        html = html + " <li class='add'>";
        html = html + " <input type='text' maxlength='10' id='txtFLName' placeholder='费用类别'/>";
        html = html + "<input type='button' value='+' id='btnSPFLAdd' class='bus_add_add'/></li>";
        $("#li_kind").html(html);
        dSFPFLEvent();
    };

    //费用分类单击事件
    var spflClick = function () {
        $("#txtKey").val("");
        var attrid = $(this).attr("id");
        if (attrid == undefined || attrid == null || attrid == "li_end") return;
        if (attrid.substring(0, 3) != "li_") return;
        clearSPXX();
        ///开始加载费用信息
        selSpflSel(attrid.substring(3));
        querySpxx(1, true);
    };

    //设定某个费用分类被选中
    var selSpflSel = function (kindid) {
        //置为选中状态
        var liid = "";
        var lilist = $("#li_kind li");
        for (var i = 0; i < lilist.length; i++) {
            liid = $(lilist[i]).attr("id");
            if (liid == undefined || liid == null || liid == "li_end") continue;
            $(lilist[i]).removeClass("select");
        }
        $("#li_" + kindid).addClass("select");
        selspfl = kindid;
    };

    //根据分类标识获取费用信息
    var querySpxx = function (page, tag) {
        clearSPXX();
        if (tag == undefined || tag == null) { tag = false; }
        var key = $("#txtKey").val();
        postRequest("/Services/BasicService.aspx", { spfl: selspfl, pagesize: pagesize, key: key, page: page }, "SPXXUsl", "GetSPXXPrice", false, function (data) {
            if (!data.State.Success) {      //不正确的
                alert(data.State.Des);
                return false;
            }
            showSPXX(data.Data.spxx);
            if (data.Data.length == 0) { alert("提示:没有资料."); }
            if (tag) {
                if (pageM == null) {
                    pageM = new JCPaging("divPage", 1, pagesize, data.Data.count, querySpxx);
                } else {
                    pageM.resetTotalCount(data.Data.count);
                }
            }
        });
        addtag = false;
    };

    //更新费用分类显示框
    var updateSPFLData = function (id, name) {
        $("#li_end").before("<li id='li_" + id + "'><span>" + name + "</span><em class='edit'></em><em class='dell'></em></li>");
        dSFPFLEvent();
        selSpflSel(id);
    };

    //费用分类新增
    var spflAddClick = function () {
        var spflname = $("#txtFLName").val();
        spflname = $.trim(spflname)
        var result = checkName(spflname);
        if (!result) { return; }
        postRequest("/Services/BasicService.aspx", { name: spflname }, "SPXXUsl", "SPFLAdd", false, function (data) {
            if (!data.State.Success) {      //不正确的
                alert(data.State.Des);
                return false;
            }
            updateSPFLData(data.Data.Id, data.Data.Name);
            clearSPXX();
            pageM.resetTotalCount(0);
            $("#txtFLName").val("");
        });
    };

    //检查合法性
    function checkName(name) {
        if (isEmpty(name) || name == undefined) {
            alert("请输入费用类别名称后，点击“+”号按钮保存!");
            return false;
        }
        var r = /^[a-z\d\u4E00-\u9FA5]+$/i;
        if (!r.test(name)) {
            alert("输入的费用类别包含特殊字符");
            return false;
        }
        var result = postSynRequest("/Services/BasicService.aspx", { name: name }, "SPXXUsl", "SPXXByName");
        if (!result.State.Success) {
            alert("该费用类别已存在");
            return false;
        }
        return true;
    }


    function spfEditClick(obj) {
        var attrid = $(obj).parent().attr("id");
        if (attrid == undefined || attrid == null || attrid == "li_end") return;
        if (attrid.substring(0, 3) != "li_") return;
        var id = attrid.substring(3);
        ActiveWin = window;
        returnMethod = pageLoad;
        openWin("/Set/PriceEdit.html?type=2&id=" + id, 400, 150, "pwin");
    }
    //费用分类事件
    var dSFPFLEvent = function () {
        $("#li_kind li").die().live("click", spflClick);
        $("#btnSPFLAdd").die().live("click", spflAddClick);
        $("#li_kind em.dell").click(function () { spflDelClick(this); });
        $("#li_kind em.edit").die().live("click", function () { spfEditClick(this); });
    };

    var spxxEditOrDelClick = function () {
        var caption = $(this).html();
        var attrid = $(this).attr("id");
        if (attrid == undefined || attrid == null || attrid.substring(0, 2) != 'a_') { return; }

        attrid = attrid.substring(2);
        switch (caption) {
            case "删除":
                if (!confirm("确定要删除这笔资料吗?")) { return; }
                delSpxxSingle(attrid);
                break;
            case "编辑":
                //top.ActiveWin = window;
                ActiveWin = window;
                returnMethod = callBack;
                openWin("/Set/Priceinfor.html?id=" + attrid, 500, 460, "pwin");
                break;
            default:
                break;
        }
    };

    ///删除单个费用信息
    var delSpxxSingle = function (id) {
        var url = "/Services/BasicService.aspx";
        var method = "DelPriceByID";
        postRequest(url, { id: id }, "SPXXUsl", method, false, function (data) {
            if (!data.State.Success) {      //不正确的
                alert(data.State.Des);
                return false;
            }
            deleteSPXX(id);
            alert("删除成功!");
        });
    };

    var dSFPXXEvent = function () {
        $("#tblgood tbody tr td a").die().live("click", spxxEditOrDelClick);

    };



    //获取页面数据
    var getPageData = function () {
        $.ajax({
            url:'../ExpenseAction_findExpenseType.action',
            type:'POST', //GET
            async:true,    //或false,是否异步
            // timeout:5000,    //超时时间
            dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text

            success:function(data,textStatus,jqXHR){
                console.log(textStatus);
//                alert(data+textStatus);
                var expenseTypeData=data;
//                alert(expenseTypeData.count)
//                if (!expenseTypeData.State.Success) {      //不正确的
//                    alert(expenseTypeData.State.Des);
//                    return false;
//                }
                fillSPFLData(expenseTypeData.Data.spfl);
//                showSPXX(expenseTypeData.Data.spxx);
                if (pageM == null) {
                    pageM = new JCPaging("divPage", 1, pagesize, expenseTypeData.count, querySpxx);
                }
            }
        });


    };

//    //获取页面数据
//    var getPageData = function () {
//        postRequest("/Services/BasicService.aspx", { spfl: 0, pagesize: pagesize }, "SPXXUsl", "GetSPXXPagePrice", false, function (data) {
//            if (!data.State.Success) {      //不正确的
//                alert(data.State.Des);
//                return false;
//            }
//            fillSPFLData(data.Data.spfl);
//            showSPXX(data.Data.spxx);
//            if (pageM == null) {
//                pageM = new JCPaging("divPage", 1, pagesize, data.Data.count, querySpxx);
//            }
//        });
//    };

    //附加费用信息
    var showSPXX = function (datas) {
        var html = "";
        $("#tblgood tr:gt(0)").remove();
        for (var i = 0; i < datas.length; i++) {
            html = rowHTML(datas[i]);
            $("#tblgood tr:last").after(html);
        }
        dSFPXXEvent();
    };

    //行内容
    var rowHTML = function (data) {
        var html = "";
        html = html + "<tr id='tr_" + data.Id.toString() + "'>";
        html = html + "<td>" + data.BH + "</td>";
        html = html + "<td>" + data.Name + "</td>";
        html = html + "<td>" + data.SPFLName + "</td>";
        html = html + "<td>" + data.dDJ.toFixed(2) + "</td>";
        html = html + "<td>" + data.AvailableName + "</td>";
        html = html + "<td><img src='/images/037.gif' width='9' height='9' /><span class='STYLE1'> [</span><a href='#' id='a_" + data.Id.toString() + "'>编辑</a><span class='STYLE1'>]</span> ";
        html = html + "<img src='/images/010.gif' width='9' height='9' /> </span><span class='STYLE1'>[</span><a href='#'  id='a_" + data.Id.toString() + "'>删除</a><span class='STYLE1'>]</span></td></tr>";
        return html;
    };

    //清空网格信息
    var clearSPXX = function () {
        $("#tblgood tr:gt(0):not(:eq(111))").remove();
    }

    //修改费用信息
    var editSPXX = function (row) {
        var orow = $("#tr_" + row.Id);
        $(orow).after(rowHTML(row));    //新增一条资料
        $(orow).remove();               //删除节点
    };

    //增加一条费用信息
    var deleteSPXX = function (id) {
        $("#tr_" + id).remove();
    };

    //页面载入
    var pageLoad = function () {
        attachEvent();
        getPageData();
    };
    pageLoad();

    ///费用分类删除
    function spflDelClick(obj) {
        var name = $(obj).prev().prev().html();
        if (!confirm("确定要删除（" + name + "）吗，删除后将不能恢复？")) {
            return false;
        }
        var parent = $(obj).parent();
        var attrid = $(parent).attr("id");
        if (attrid == undefined || attrid == null || attrid == "li_end") return;
        if (attrid.substring(0, 3) != "li_") return;
        postRequest("/Services/BasicService.aspx", { id: attrid.substring(3) }, "SPXXUsl", "DelPriceById", false, function (data) {
            if (!data.State.Success) {      //不正确的
                alert(data.State.Des);
                return false;
            }
            //删除某个分类
            var selid = $("#" + attrid).next().attr("id");
            if (selid == undefined || selid == null || selid.substring(0, 3) != 'li_' || selid == 'li_end') {
                selid = $("#" + attrid).prev().attr("id");
            }
            //将某个置为选中
            selSpflSel(selid.substring(3));
            $("#" + attrid).remove();       //删除节点
            querySpxx(1, true);
            alert("删除成功!");
        });
    };
});
