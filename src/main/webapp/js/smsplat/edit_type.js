
$(function () {
    var id = getQueryParam("id");
    var categoryid = getQueryParam("categoryid");
    var categoryname = getQueryParam("categoryname");
    var isshowdays = getQueryParam("isshowdays");
    var isshowhours = getQueryParam("isshowhours");
    var isshowmobile = getQueryParam("isshowmobile");
    var categorycode = getQueryParam("categorycode");
    var remark = getQueryParam("remark");
    $("#txt_categoryname").val(decodeURI(categoryname));
    $("#txt_remark").html(decodeURI(remark));
    if (isshowdays=="true") {
        $("#txt_days").parent().show();
    } else {
        $("#txt_days").parent().hide();
    }

    if (isshowhours == "true") {
        $("#txt_shour").parent().show();
        $('#txt_shour').datetimepicker({
            datepicker: false,
            format: 'H:i',
        });
        $('#txt_ehour').datetimepicker({
            datepicker: false,
            format: 'H:i'
        });
    } else {
        $("#txt_ehour").parent().hide();
    }
    
    if (isshowmobile == "true") {
        $("#txt_mobile").parent().show();
    } else {
        $("#txt_mobile").parent().hide();
    }
    if (categorycode == "m002") {
        $("#h_set").show();
    }
    else {
        $("#h_set").hide();
    }
    //模板无内容
    if (id == 0) {
        $("input[name=rdo_status][value=0]").attr("checked", 'checked');
        $("#btn_sure").bind("click", function () {
            if ($("#txt_categorycontent").val() == "" || $("#txt_categorycontent").val() == null) {
                alert("模板内容不能为空！");
                //showTipsCollect(2, "div_tips", "请输入模板内容", "txt_categorycontent");
                return;
            }
            if (getRadioValue("rdo_status") == "" || getRadioValue("rdo_status") == null) {
                alert("请选择是否启用！");
                return;
            }
            if (!checkSpecialChars($("#txt_categorycontent").val())) {
                alert("你输入的包含非法字符，例如:" + specialChars);
                return;
            }
            var content = $("#txt_categorycontent").val();
            var days = $("#txt_days").val();
            var shours = $("#txt_shour").val();
            var ehours = $("#txt_ehour").val();
            var mobile = $("#txt_mobile").val();
            var hours="";
            if (shours != "" && ehours != "") {
                hours = shours + "," + ehours;
            }
            var status = getRadioValue("rdo_status");
            var yangli = getSelectedByName("cbx_yangli");
            var yinli = getSelectedByName("cbx_yinli");
            var holiday = yangli + "|" + yinli;
            //保存添加
            alert("保存成功！");
          /*  postRequest("/Services/BasicService.aspx", { categoryid: categoryid, content: content, days: days, hours: hours, status: status, mobile: mobile,holiday:holiday }, "SmsTemplateUsl", "AddSmsTemp", false, function (data) {
                if (data.State.Success) {
                    alert("保存成功！");
                    parent.set_main.document.location.reload();
                    closeWin();
                } else {
                    alert("保存失败！");
                }
            });*/
        });
    } else {
        //修改模板内容
        alert("修改模板内容");
        /*postRequest("/Services/BasicService.aspx", { id: id }, "SmsTemplateUsl", "GetSmsTemplateById", false, function (data) {
            if (data.State.Success) {
                $("#txt_categorycontent").val(data.Data.List.TemplateContent);
                var hours = data.Data.List.Hours.split(',');
                var holiday = new Array();
                var yangli = new Array();
                var yinli = new Array();
                holiday = data.Data.List.Holiday.split('|');
                if (holiday.length==2) {
                    if (holiday[0] != "") {
                        yangli = holiday[0].split(',');
                        for (var i = 0; i < yangli.length; i++) {
                            $("input[name=cbx_yangli][value=" + yangli[i] + "]").attr("checked", 'checked');
                        }
                    }
                    if (holiday[1]) {
                        yinli = holiday[1].split(',');
                        for (var i = 0; i < yinli.length; i++) {
                            $("input[name=cbx_yinli][value=" + yinli[i] + "]").attr("checked", 'checked');
                        }
                    }
                }
                $("#txt_shour").val(hours[0]);
                $("#txt_ehour").val(hours[1]);
                $("#txt_days").val(data.Data.List.Days);
                $("#txt_mobile").val(data.Data.List.Mobile);
                if (data.Data.List.Status == 1) {
                    $("input[name=rdo_status][value=1]").attr("checked", 'checked');
                }
                else {
                    $("input[name=rdo_status][value=0]").attr("checked", 'checked');
                }
            } else {

            }
        });*/
        $("#btn_sure").bind("click", function () {
            if ($("#txt_categorycontent").val() == "" || $("#txt_categorycontent").val() == null) {
                alert("模板内容不能为空！");
                return;
            }
            if (getRadioValue("rdo_status") == "" || getRadioValue("rdo_status") == null) {
                alert("请选择是否启用！");
                return;
            }
            if (!checkSpecialChars($("#txt_categorycontent").val())) {
                alert("你输入的包含非法字符，例如:" + specialChars);
                return;
            }
            var content = $("#txt_categorycontent").val();
            var days = $("#txt_days").val();
            var shours = $("#txt_shour").val();
            var ehours = $("#txt_ehour").val();
            var status = getRadioValue("rdo_status");
            var mobile = $("#txt_mobile").val();
            var hours = "";
            if (shours != "" && ehours != "") {
                hours = shours + "," + ehours;
            }
            var yangli = getSelectedByName("cbx_yangli");
            var yinli = getSelectedByName("cbx_yinli");
            var holiday = yangli + "|" + yinli;
            //保存修改
            alert("修改成功！");
         /*   postRequest("/Services/BasicService.aspx", { id: id, content: content, days: days, hours: hours, status: status, mobile: mobile, holiday: holiday }, "SmsTemplateUsl", "SmsTemplateEdit", false, function (data) {
                if (data.State.Success) {
                    alert("修改成功！");
                    parent.set_main.document.location.reload();
                    closeWin();
                }
                else {
                    alert("修改失败！");
                }
            });*/
        });
    }
});

var checkvalue = function () {
    if ($("#txt_categorycontent").val() == "" || $("#txt_categorycontent").val() == null){
        alert("模板内容不能为空！");
        return;
    }
    //if ($("#txt_shour").val() == "" || $("#txt_shour").val() == null) {
    //    alert("");
    //    return;
    //}
    //if ($("#txt_days").val() == "" || $("#txt_days").val() == null) {
    //    alert("");
    //    return;
    //}
    if (getRadioValue("rdo_status") == "" || getRadioValue("rdo_status") == null)
    {
        alert("请选择是否发送！");
        return;
    }
}

var checknumber = function (obj) {
    //alert("obj");
    var number = $(obj).val();
    if (number != "") {
        var strP = /^\d+(\.\d+)?$/;
        if (!strP.test(number)) {
            alert("请填入数据！");
            return false;
        }
        try {
            if (parseFloat(number) != number) {
                alert("请填入数据！");
                return false;
            }
        }
        catch (ex) {
            alert("请填入数据！");
            return false;
        }
    }
    return true;
}

var checkMobile = function (obj) {
    var mobileStr = $(obj).val();
    if (mobileStr == "")
    {
        alert("手机号码输入不正确!");
        return false;
    } else {
        var mobileList = new Array();
        mobileList = mobileStr.split(',');
        for (var i = 0; i < mobileList.length; i++) {
            if (!isMobil(mobileList[i])) {
                alert("手机号码输入不正确!");
                return false;
            }
        }
    }
    return true;
}

var openHoliday = function () {
    $(".calendar").toggle();
}
