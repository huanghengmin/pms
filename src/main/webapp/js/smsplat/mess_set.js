/*短信模板*/
/*$(function () {
    postRequest("/Services/BasicService.aspx", null, "SmsTemplateUsl", "GetSmsTemplate", false, function (data) {
        if (data.State.Success) {
            var list = data.Data.List;
            var tr = "";
            for (var i = 0; i < list.length; i++) {
                tr = '<tr>';
                tr += '<td>' + list[i].CategoryName + '</td>';
                if (list[i].Id == 0) {
                    tr += '<td style="text-align:left"></td>';
                    tr += '<td></td>';
                    tr += '<td></td>';
                } else {

                    tr += '<td style="text-align:left">' + list[i].TemplateContent + '</td>';
                    tr += '<td>' + changeStatus(list[i].Status) + '</td>';
                    var hours = new Array();
                    if (list[i].Hours != "" && list[i].Hours != null && list[i].Hours != "null") {
                        hours = list[i].Hours.split(',');
                        if (hours[0] == "" && hours[1] == "") {
                            tr += '<td></td>';

                        } else if (hours[0] != "" && hours[1] == "") {
                            tr += '<td>' + hours[0] + '</td>';
                        } else if (hours[0] == "" && hours[1] != "") {
                            tr += '<td>' + hours[1] + '</td>';
                        } else {
                            tr += '<td>' + hours[0] + "-" + hours[1] + '</td>';
                        }
                    } else {
                        tr += '<td></td>';
                    }

                }

                tr += '<td><img width="9" height="9" src="../037.gif"><span class="STYLE1"> [</span><a id="a_' + i + '" href="#" onclick="TemplateEdit(' + list[i].Id + ',' + list[i].CategoryId + ',\'' + list[i].CategoryName + '\',\'' + list[i].IsShowDays + '\',\'' + list[i].IsShowHours + '\',\'' + list[i].Remark + '\',\'' + list[i].IsShowMobile + '\',\'' + list[i].CategoryCode + '\')">编辑</a><span class="STYLE1">]</span> </td>';
                tr += '</tr>';
                $("#tbList").append(tr);

            }


        } else {

        }
    });
});*/

/*var changeStatus = function (status) {
    switch (status) {
        case 0:
            return "是";
        case 1:
            return "否";
        default:
            return "";
    }
}*/
//账号管理修改
function TemplateEdit(id, categoryid, categoryname, isshowdays, isshowhours, remark, isshowmobile, categorycode) {
    openWin("pages/smsplat/edit_type.html?id=" + id + "&categoryid=" + categoryid + "&categoryname=" + escape(categoryname) + "&isshowdays=" + isshowdays + "&isshowhours=" + isshowhours + "&remark=" + escape(remark) + "&isshowmobile=" + isshowmobile + "&categorycode=" + categorycode, 625, 430, "pwin");
}
//字符串转换成时间
/*
function ChangeDateFormat(val) {
    if (val != null) {
        var date = new Date(parseInt(val.replace("/Date(", "").replace(")/", ""), 10));
        //月份为0-11，所以+1，月份小于10时补个0
        var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        return date.getFullYear() + "-" + month + "-" + currentDate;
    }
    return "";
}*/
