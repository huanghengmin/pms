/*员工信息*/
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
        top.ActiveWin = window;
        returnMethod = callBack;
        openWin("/Set/SalesManAdd.html?id=0&spfl=" + selspfl, 650, 500, "");
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
        var method = "DelSalesManByIDS";
        postRequest(url, { ids: ids }, "SalesManUsl", method, false, function (data) {
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
        var html = "<li id='li_0' class='select'><span id='sp_0'>全部</span></li>"
        for (var i = 0; i < spfl.length; i++) {
            html = html + "<li id='li_" + spfl[i].Id + "'><span id='sp_" + spfl[i].Id + "'>" + spfl[i].Name + "</span><em  id='ea_" + spfl[i].Id + "' class='edit'></em><em  id='em_" + spfl[i].Id + "' class='dell'></em></li>";
        }
        html = html + " <li id='li_end' class='end'>&nbsp;</li>";
        html = html + " <li class='add'>";
        html = html + " <input type='text' maxlength='10' id='txtFLName' placeholder='部门名称'/>";
        html = html + "<input type='button' value='+' id='btnSPFLAdd' class='bus_add_add'/></li>";
        $("#li_kind").html(html);
        dSFPFLEvent();
    };

    //部门单击事件
    var spflClick = function () {
        $("#txtKey").val("");
        var attrid = $(this).find("span").attr("id");
        if (attrid == undefined || attrid == null || attrid == "li_end") return;
        if (attrid.substring(0, 3) != "sp_") return;
        clearSPXX();
        ///开始加载员工信息
        selSpflSel(attrid.substring(3));
        querySpxx(1, true);
    };

    //设定某个部门被选中
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

    //根据部门标识获取员工信息
    var querySpxx = function (page, tag) {
        clearSPXX();
        if (tag == undefined || tag == null) { tag = false; }
        var key = $("#txtKey").val();
        var IsSalesMan = $("#IsSalesMan").val();
        var Status = $("#Status").val();
        postRequest("/Services/BasicService.aspx", { spfl: selspfl, pagesize: pagesize, key: key, page: page, IsSalesMan: IsSalesMan, Status: Status }, "SalesManUsl", "GetSalesManData", false, function (data) {
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

    //更新部门显示框
    var updateSPFLData = function (id, name) {
        $("#li_end").before("<li id='li_" + id + "'><span id='sp_" + id.toString() + "'>" + name + "</span><em  id='ea_" + id + "' class='edit'></em><em  id='em_" + id + "' class='dell'></em></li>");
        dSFPFLEvent();
        selSpflSel(id);
        $("#txtFLName").val("");
    };

    //部门新增
    var spflAddClick = function () {
        var spflname = $("#txtFLName").val();
        spflname = $.trim(spflname);
        if (spflname == '') {
            alert("请输入部门名称后，点击“+”号按钮保存!");
            return;
        }
        if (spflname != "" && !/^[A-Za-z0-9\u4e00-\u9fa5\s]+$/.test(spflname)) {
            alert("部门名称请输入中文字母数字!");
            return;
        }
        var url = "/Services/BasicService.aspx";
        var method = "SaveDepartment";
        postRequest(url, { name: spflname }, "SalesManUsl", method, false, function (data) {
            if (!data.State.Success) {      //不正确的
                alert(data.State.Des);
                return false;
            }
            updateSPFLData(data.Data.Id, data.Data.Name);
            clearSPXX();
            pageM.resetTotalCount(0);
        });
    };

    ///部门删除
    var spflDelClick = function (e) {
        var parent = $(this).parent();
        var attrid = $(parent).attr("id");
        if (attrid == undefined || attrid == null || attrid == "li_end") return;
        if (attrid.substring(0, 3) != "li_") return;
        if (!confirm("确认要删除吗?")) { return; }
        cancelEvent(e);
        var url = "/Services/BasicService.aspx";
        var method = "DelDepartmentById";
        postRequest(url, { id: attrid.substring(3) }, "SalesManUsl", method, false, function (data) {
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

    //部门事件
    var dSFPFLEvent = function () {
        $("#li_kind li").die().live("click", spflClick);
        $("#btnSPFLAdd").die().live("click", spflAddClick);
        $("#li_kind em.dell").die().live("click", spflDelClick);
        $("#li_kind em.edit").die().live("click", spfEditClick);
    };

    //部门编辑事件
    var spfEditClick = function () {
        var attrid = $(this).parent().attr("id");
        if (attrid == undefined || attrid == null || attrid == "li_end") return;
        if (attrid.substring(0, 3) != "li_") return;
        var id = attrid.substring(3);
        openWin("/Set/Department.html?id=" + id, 400, 150, "pwin");
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
                top.ActiveWin = window;
                returnMethod = callBack;
                openWin("/Set/SalesManAdd.html?id=" + attrid, 650, 500, "pwin");
                break;
            default:
                break;
        }
    };

    ///删除单个员工信息
    var delSpxxSingle = function (id) {
        var url = "/Services/BasicService.aspx";
        var method = "DelSalesManByID";
        postRequest(url, { id: id }, "SalesManUsl", method, false, function (data) {
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
        postRequest("/Services/BasicService.aspx", { spfl: 0, pagesize: pagesize }, "SalesManUsl",  "GetSalesManPage", false, function (data) {
            if (!data.State.Success) {      //不正确的
                alert(data.State.Des);
                return false;
            }
            fillSPFLData(data.Data.spfl);
            showSPXX(data.Data.spxx);
            if (pageM == null) {
                pageM = new JCPaging("divPage", 1, pagesize, data.Data.count, querySpxx);
            }
        });
    };

    //附加员工信息
    var showSPXX = function (datas) {
        var html = "";
        for (var i = 0; i < datas.length; i++) {
            html = rowHTML(datas[i]);
            $("#tblgood tr:last").after(html);
        }
        dSFPXXEvent();
    };

    //行内容
    var rowHTML = function (data) {
        var html = "";
        //html = html + "<tr id='tr_" + data.Id.toString() + "'><td><input type='checkbox' id='chk_" + data.Id.toString() + "' /></td>";
        html = html + "<tr id='tr_" + data.Id.toString() + "'>";
        html = html + "<td>" + data.WorkNo + "</td>";
        html = html + "<td>" + data.Name + "</td>";
        html = html + "<td>" + data.Sex + "</td>";
        html = html + "<td>" + data.Department + "</td>";
        //html = html + "<td>" + formatDateStr(data.Birthday, "yyyy-MM-dd") + "</td>";
        html = html + "<td>" + formatDateStr(data.EntryDate, "yyyy-MM-dd") + "</td>";
        html = html + "<td>" + data.CardNo + "</td>";
        //html = html + "<td>" + data.Degree + "</td>";
        html = html + "<td>" + data.Phone + "</td>";
        //html = html + "<td>" + data.Tel + "</td>";
        html = html + "<td>" + data.Post + "</td>";
        html = html + "<td>" + data.Position + "</td>";
        html = html + "<td>" + data.IsSalesManName + "</td>";
        html = html + "<td>" + data.IsCleanName + "</td>";
        if (data.IsCleanName == "是") {
            html = html + "<td>" + data.MonthTarget + "</td>";
        } else {
            html = html + "<td>&nbsp;</td>";
        }
        html = html + "<td>" + data.StatusName + "</td>";
        html = html + "<td><img src='/images/037.gif' width='9' height='9' /><span class='STYLE1'> [</span><a href='#' id='a_" + data.Id.toString() + "'>编辑</a><span class='STYLE1'>]</span> ";
        html = html + "<img src='/images/010.gif' width='9' height='9' /> </span><span class='STYLE1'>[</span><a href='#'  id='a_" + data.Id.toString() + "'>删除</a><span class='STYLE1'>]</span></td></tr>";
        return html;
    };

    //清空网格信息
    var clearSPXX = function () {
        $("#tblgood tr:gt(0):not(:eq(111))").remove();
    }
    //修改员工信息
    var editSPXX = function (row) {
        var orow = $("#tr_" + row.Id);
        $(orow).after(rowHTML(row));    //新增一条资料
        $(orow).remove();               //删除节点
    };

    //增加一条员工信息
    var deleteSPXX = function (id) {
        $("#tr_" + id).remove();
    };
    //页面载入
    var pageLoad = function () {
        attachEvent();
        getPageData();
    };
    pageLoad();
});