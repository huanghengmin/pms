/*短信列表*/
var pager = undefined;
var pageSize = 10;
var reSetTotal = 1;
$(function () {
    //获取系统当前时间
    $('#StartDate').datetimepicker({
        lang: 'ch',
        format: 'Y-m-d H:i',
        timepicker: true
    });
    $('#EndDate').datetimepicker({
        lang: 'ch',
        format: 'Y-m-d H:i',
        timepicker: true
    });
    //var result = postSynRequest("/Services/BasicService.aspx", null, "SmsRecordUsl", "GetDateTime");
    //if (result.State.Success) {
    //    $("#StartDate").val(result.Data.StartDate);
    //    $("#EndDate").val(result.Data.EndDate);
    //}

    var Status = getUrlParam("status");
    if (Status == 0) {
        $("#btnResend").val("发送");
    } else {
        $("#btnResend").val("重发");
    }

    pager = new JCPaging('pager', 1, pageSize, 0, function (page) {
        reSetTotal = 0;
        LoadData(page);
    });
    LoadData(1);

    $("#btnSearch").click(function () {
        $("#tbList tbody tr").remove();
        reSetTotal = 1;
        LoadData(1);
    });
    //网格单击事件
    $("#tbList tbody tr").click(function () {
        if ($(this).hasClass("select")) { return; }
        $("#tbList tr").removeClass("select");
        $(this).addClass("select");
    });
    //删除
    $("#btnDel").click(function () {
        var ids = getSelectedByName("SmsId");
        if (ids == "") {
            alert("请选择要删除的数据!");
            return false;
        }
        if (!confirm("是否确定要删除?")) {
            return false;
        }
        alert("删除成功");
       /* postRequest("/Services/BasicService.aspx", { id: ids, status: getUrlParam("status") }, "SmsRecordUsl", "DelById", false, function (data) {
            if (!data.State.Success) {
                alert(data.State.Des);
            }
            else {
                alert("删除成功");
                window.location.reload();
                parent.menu_left.location.reload();
            }
        });*/
    });


    //重发
    $("#btnResend").click(function () {
        var ids = "";
        var b_result = true;
        $("input[name='SmsId']").each(function (e) {
            if (this.checked == true) {
                var btn = $("#btnResend").val();
               
                if (btn == "重发") {
                    if ($(this).attr("data-status") != "3") {
                        alert("只有发送失败的短信才能重发");
                        b_result = false;
                        return false;
                    }
                }
                if (btn == "发送") {
                    if ($(this).attr("data-status") != "0") {
                        alert("只有草稿箱的短信才能发送");
                        b_result = false;
                        return false;
                    }
                }
                ids += this.value + ",";
            }
        });
        if (!b_result) return false;
        if (ids != "") {
            ids = ids.substring(0, ids.length - 1);
        }
        if (ids == "") {
            alert("请选择要重发的数据!");
            return false;
        }
        alert("重发成功");
        /*postRequest("/Services/BasicService.aspx", { id: ids, status: getUrlParam("status") }, "SmsRecordUsl", "SmsResend", false, function (data) {
            if (!data.State.Success) {
                alert(data.State.Des);
            }
            else {
                if (getUrlParam("status") == 0) {
                    alert("发送成功");
                } else {
                    alert("重发成功");
                }
                window.location.reload();
                parent.menu_left.location.reload();
            }
        });*/
    })
})
function LoadData(page) {
    var StartDate = $("#StartDate").val();
    var EndDate = $("#EndDate").val();
    var LogType = $("#LogType").val();
    var Mobile = $("#Mobile").val();
    /*postRequest("/Services/BasicService.aspx", { StartDate: StartDate, EndDate: EndDate, LogType: LogType, Mobile: Mobile, page: page, pagesize: pageSize, reSetTotal: reSetTotal, Status: getUrlParam("status") }, "SmsRecordUsl", "GetSmsRecordPage", false, function (data) {
        if (data.State.Success) {
            $("#tbList tbody tr").remove();
            if (data.Data.List != null && data.Data.List.length > 0) {
                for (var i = 0; i < data.Data.List.length; i++) {
                    var item = data.Data.List[i];
                    var name = item.Name.split(',')[0];
                    if (item.Name.split(',').length > 1) {
                        //if (item.Name.split(',')[0] != "") {
                        name = name + "......";
                        //}
                    }
                    var tr = "<tr>";
                    tr += "<td><input type='checkbox' name='SmsId' value='" + item.Id + "' data-status='" + item.Status + "'/></td>";
                    tr += "<td>" + name + "</td>";
                    if (item.Mobile.length < 100)
                        tr += "<td>" + item.Mobile.replace(new RegExp(',', 'gm'), '\n') + "</td>";
                    else
                        tr += "<td>" + (item.Mobile.substring(0, 100) + "…").replace(new RegExp(',', 'gm'), '\n') + "</td>"
                    tr += "<td>" + item.CategoryName + "</td>";                   
                    if (item.Status == 0) {
                        tr += "<td><a href='send.html?id=" + item.Id + "'>" + item.SmsContent + "</a></td>";
                    } else {
                        tr += "<td>" + item.SmsContent + "</td>";
                    }
                    if (item.SmsNumber != 0)
                        tr += "<td>" + item.SmsNumber + "</td>";
                    else
                        tr += "<td>" + 1 + "</td>";
                    tr += "<td>" + formatDateStr(item.CreateDate, "yyyy-MM-dd hh:mm") + "</td>";
                    tr += "<td>" + item.StatusName + "</td>";
                    tr += "</tr>";
                    $("#tbList tbody").append(tr);
                }
                //网格单击事件
                $("#tbList tbody tr").die().live("click", function () {
                    if ($(this).hasClass("select")) { return; }
                    $("#tbList tr").removeClass("select");
                    $(this).addClass("select");
                });
                if (reSetTotal == 1) {
                    pager.resetTotalCount(data.Data.Total);
                }
            } else {
                $("#tbList tbody").append('<tr><td colspan="8" style="color:red">没找到相应的数据</td></tr>');
            }
        }
    });*/
}