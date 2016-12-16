/*积分设置*/
$(function () {
    var pagesize = 10;
    var selspfl = 0;
    var addtag = false;
    var pageM = null;
    //获取页面数据
    var getPageData = function () {
        postRequest("/Services/BasicService.aspx", { spfl: 0, pagesize: pagesize }, "MerberUsl", "GetMerberPage", false, function (data) {
            if (!data.State.Success) {      //不正确的
                alert(data.State.Des);
                return false;
            }
            fillSPFLData(data.Data.datas);
            if (data.Data.List != null && data.Data.List.length > 0) {
                showSPXX(data.Data.List);
                if (pageM == null) {
                    pageM = new JCPaging("divPage", 1, pagesize, data.Data.Total, querySpxx);
                }
            } else {
                $("#tblgood").append("<tr><td colspan='6' style='color:red;'>没找到对应的数据</td></tr>");
            }
        });
    };
    //填充数据
    var fillSPFLData = function (spfl) {
        var html = "<li id='li_0' class='select'><span>全部</span></li>"
        for (var i = 0; i < spfl.length; i++) {
            html = html + "<li id='li_" + spfl[i].Id + "'><span>" + spfl[i].Name + "</span></li>";
        }
        html = html + "<li id='li_f1'><span>房型</span></li>";
        html = html + "<li class='end'>&nbsp;</li>";
        $("#li_kind").html(html);
    };
    //附加商品信息
    var showSPXX = function (datas) {
        var html = "";
        for (var i = 0; i < datas.length; i++) {
            html = rowHTML(datas[i]);
            $("#tblgood tr:last").after(html);
        }
    };
    //行内容
    var rowHTML = function (data) {
        var html = "";
        html = html + "<tr id='tr_" + data.Id.toString() + "'>";
        html = html + "<td>" + data.BH + "</td>";
        html = html + "<td>" + data.Name + "</td>";
        html = html + "<td>" + data.Type + "</td>";
        html = html + "<td>" + data.DW + "</td>";

        html = html + "<td>" + data.Price.toFixed(2) + "</td>";
        html = html + "<td><input style='float:left;margin-left:20px;display:inline' type='text' class='txt' id='txt" + data.Id + "'  value='" + data.Integral + "' maxlength='10' onblur=\"ScoreEdit(this,'" + data.Type + "');\" onfocus='Scorefocus(this)'/></td>";
        html = html + "</tr>";
        return html;
    };

    //设定某个商品分类被选中
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
    //根据分类标识获取商品信息
    var querySpxx = function (page, tag) {
        clearSPXX();
        if (tag == undefined || tag == null) { tag = false; }
        postRequest("/Services/BasicService.aspx", { spfl: selspfl, pagesize: pagesize, page: page }, "MerberUsl", "GetMerberData", false, function (data) {
            if (!data.State.Success) {      //不正确的
                alert(data.State.Des);
                return false;
            }
            if (data.Data.List != null && data.Data.List.length > 0) {
                showSPXX(data.Data.List);
                if (data.Data.length == 0) { }
                if (tag) {
                    if (pageM == null) {
                        pageM = new JCPaging("divPage", 1, pagesize, data.Data.Total, querySpxx);
                    } else {
                        pageM.resetTotalCount(data.Data.Total);
                    }
                }
            } else {
                $("#tblgood").append("<tr><td colspan='6' style='color:red;'>没找到对应的数据</td></tr>");
            }
        });
        addtag = false;
    };
    //清空网格信息
    var clearSPXX = function () {
        $("#tblgood tr:gt(0):not(:eq(111))").remove();
    }
    $("#li_kind li").live("click", function () {
        var attrid = $(this).attr("id");
        if (attrid == undefined || attrid == null || attrid == "li_end") return;
        var id = attrid.substring(0, 3);
        if (id != "li_") return;
        clearSPXX();
        ///开始加载商品信息
        selSpflSel(attrid.substring(3));
        querySpxx(1, true);
    });

    //页面载入
    var pageLoad = function () {
        getPageData();
    };
    pageLoad();
});

var oldvalue = "";        //原值
function Scorefocus(obj) {
    oldvalue = $(obj).val();
}

//失去焦点时保存数据.
function ScoreEdit(obj, type) {
    var id = $(obj).attr("id").substring(3);
    $(obj).val($(obj).val().replace(/[^\d]/g, ""));
    var Integral = $(obj).val();
    if (Integral == oldvalue) { return; }
    var node = $(this);
    var result = checkCode(Integral, $(obj));
    if (!result) { $(node).val(oldvalue); $(node).blur(); return false; }
    postRequest("/Services/BasicService.aspx", { id: id, type: type, Integral: Integral }, "MerberUsl", "MerberEdit", false, function (data) {
        if (!data.State.Success) {
            alert(data.State.Des);
        }
    });

}
function checkCode(Integral, obj) {
    $(".note_no").hide();
    var result = true;
    if (Integral == "") {
        showTips(3, obj, "请输入积分");
        result = false;
    }
    if (!isEmpty(Integral) && !/^\d+$/.test(Integral)) {
        showTips(3, obj, "积分只能为正整数");
        result = false;
    }
    if (Integral < 0) {
        showTips(3, obj, "积分必须大于0");
        result = false;
    }
    if (result) {
        return true;
    } else {
        return false;
    }
}