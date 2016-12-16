/*黑名单*/

var pagesize = 10;
var page = 1;
var pageM = null;
var typeid = 0;

$(function () {
    pageLoad();
});

//添加黑名单点击事件
function btnAddClick(id) {
    top.ActiveWin = window;
    openWin("/Set/BlacklistAdd.html?id=" + id + "&typeid=" + typeid, 710, 330, "");
};

//添加类型按钮点击事件
var typeAddClick = function (id) {
    top.ActiveWin = window;
    openWin("/Set/BlacklistType.html?id=" + id + "", 420, 140, "");
};

//页面载入
var pageLoad = function () {
    var cardNo = $("#NameOrCardNo").val();
    var type = $("#select_type").val();
    if (type == null) {
        type = "";
    }

    postRequest("/Services/BasicService.aspx", { page: page, pagesize: pagesize, type: type, cardNo: cardNo }, "BlackListUsl", "GetData", false, function (data) {
        if (!data.State.Success) {
            alert(data.State.Des);
        }
        else {
            $("#select_type").html("");
            var selectHtml = "<option value=\"\">全部</option>";
            var ulHtml = "<li id=\"li_0\" onclick=\"SelectType(0)\"><span>全部</span></li>";
            if (data.Data.listbc.length > 0) {
                for (var i = 0; i < data.Data.listbc.length; i++) {
                    selectHtml += "<option value=\"" + data.Data.listbc[i].Id + "\">" + data.Data.listbc[i].Name + "</option>";
                    ulHtml += "<li id=\"li_" + data.Data.listbc[i].Id + "\" onclick=\"SelectType(" + data.Data.listbc[i].Id + ")\" data-id=\"" + data.Data.listbc[i].Id + "\" data-check=\"" + data.Data.listbc[i].AllowOrder + "\"><span>" + data.Data.listbc[i].Name + "</span><em class=\"edit\" onclick=\"typeAddClick(" + data.Data.listbc[i].Id + ")\"></em><em  onclick=\"DeleteRecord(" + data.Data.listbc[i].Id + ",'" + data.Data.listbc[i].Name + "')\"  class=\"dell\"></em></li>";
                }
            }
            ulHtml += "<li class=\"end\" id=\"li_end\">&nbsp;</li><li class=\"add\"><input type=\"button\" class=\"bus_add\" onclick=\"typeAddClick(0)\" value=\"添加类型\" id=\"typeAdd\"></li>";


            $("#select_type").append(selectHtml);
            $("#ul_type").html(ulHtml);

            $("#table_1").html("");
            $("#table_1").append("<th>姓名</th><th>类型</th><th>证件类型</th><th>证件号码</th><th>性别</th><th>出生年月</th><th>民族</th><th>地址</th><th>备注</th><th>操作</th>");
            if (data.Data.listbl.length > 0) {
                var html = "";
                for (var i = 0; i < data.Data.listbl.length; i++) {
                    html += "<tr><td>" + data.Data.listbl[i].Name + "</td><td>" + data.Data.listbl[i].BlacklistCategoryName + "</td><td>" + data.Data.listbl[i].CertificateTypeName + "</td>" +
                        "<td>" + data.Data.listbl[i].CertificateNo + "</td><td>" + data.Data.listbl[i].Sex + "</td><td>" + data.Data.listbl[i].BirthDay + "</td>" +
                        "<td>" + data.Data.listbl[i].Nation + "</td><td>" + data.Data.listbl[i].Address + "</td><td>" + data.Data.listbl[i].Remark + "</td>" +
                        "<td><img width=\"9\" height=\"9\" src=\"/images/037.gif\"><span class=\"STYLE1\"> [</span><a href=\"javascript:btnAddClick(" + data.Data.listbl[i].Id + ")\">编辑</a><span class=\"STYLE1\">]</span>" +
                        "<img width=\"9\" height=\"9\" src=\"/images/010.gif\"><span class=\"STYLE1\">[</span><a href=\"javascript:DeleteBlackListRecord(" + data.Data.listbl[i].Id + ",'" + data.Data.listbl[i].Name + "')\">删除</a><span class=\"STYLE1\">]</span></td></tr>";
                }
                $("#table_1").append(html);
            }

            $("#ul_type li").removeClass("select");
            $("#li_" + typeid).addClass("select");
            if (typeid != 0) {
                $("#select_type").val(typeid);
            }
            else {
                $("#select_type").val("");
            }

            if (pageM == null) {
                pageM = new JCPaging("divPage", page, pagesize, data.Data.count, queryMember);
            }
        }
    });
}

//分页
var queryMember = function (pages) {
    page = pages;
    pageLoad();
}

function DeleteBlackListRecord(id, name) {
    if (confirm("确定删除姓名为：" + name + "的记录吗？")) {
        postRequest("/Services/BasicService.aspx", { id: id }, "BlackListUsl", "DeleteBlacklist", false, function (data) {
            if (!data.State.Success) {
                alert(data.State.Des);
            }
            else {
                pageLoad();
            }
        });
    }
}

//删除黑名单类型
function DeleteRecord(id, name) {
    if (confirm("确定删除类型为：" + name + "的记录吗？")) {
        postRequest("/Services/BasicService.aspx", { id: id, name: name }, "BlackListUsl", "DeleteTypeData", false, function (data) {
            if (!data.State.Success) {
                alert(data.State.Des);
            }
            else {
                SelectType(0);
            }
        });
    }
}

//添加或者编辑黑名单类型
function saveType(name, ischeck, id) {
    postRequest("/Services/BasicService.aspx", { name: name.trim(), check: ischeck, id: id }, "BlackListUsl", "AddCategory", false, function (data) {
        if (!data.State.Success) {
            alert(data.State.Des);
        }
        else {
            alert("保存成功！");
            pageLoad();
        }
    });
}

//添加记录后刷新页面
function SaveBlackList() {
    pageLoad();
}

//查询
function Search() {
    page = 1;
    pageM = null;
    pageLoad();
}

function SelectType(id) {
    typeid = id;
    if (id != 0) {
        $("#select_type").val(id);
    }
    else {
        $("#select_type").val("");
    }
    Search();
}