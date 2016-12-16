

function LoadClassInfo()
{
//    postRequest("/services/ssoservice.ashx", null, "Sso", "ClassSelectInit", false, function (data) {
        var data = {"Data":{"HotelName":"滨江店",
            "WorkTypes":[
                {"Id":998,"Name":"早班","StartDate":"08:00-18:00"},
                {"Id":999,"Name":"晚班","StartDate":"18:00-08:00"},
                {"Id":1000,"Name":"全天班","StartDate":"00:00-23:59"}
            ]},
            "State":{"Success":true,"Des":null,"Errkey":null,"Data":null}};
        if (data.State.Success) {
            $("#HotelName").html(data.Data.HotelName);
            if (data.Data.WorkTypes != null && data.Data.WorkTypes.length > 0) {
                for (var i = 0; i < data.Data.WorkTypes.length; i++) {
                    var item = data.Data.WorkTypes[i];
                    //$("#ShowClass").append('<option value="' + item.Id + '">' + item.Name + '</option>');
                    $("#ShowClass").append('<a href="###" data-id="' + item.Id + '" onclick="btnClass(this)"><li class="select_' + (i + 1) + '"><span>' + item.Name + '</span><em>' + item.StartDate + '</em><img src="images/clock.png" /></li></a>')
                }
            }
        }
        else {
            alert(data.Data.Errkey);
        }
//    });
}

function btnClass(obj) {
    var workType = $(obj).attr("data-id");
    //判断酒店是否设置酒店版本 2015-10-27
//    var data = postSynRequest("/services/ssoservice.ashx", null, "Sso", "ModuleSelectCheck");
    var data = {"State":{"Success":true,"Des":null,"Errkey":null,"Data":null}};
    if (!data.State.Success)
    {
        layer.open({
            type: 2, //窗口类型
            title: "", //窗口标题
            maxmin: false, //是否显示最大化最小化按钮
            shadeClose: false, //点击遮罩是否会关闭层
            area: ['600px', '470px'], //窗口大小
            scrollbar: false, //打开后锁定父窗口滚动
            content: ['../Set/ShopSet.html?r=' + Math.random()+"&workType="+workType, "no"], //内容URL
            skin: 'layui-layer-jc'
        });
        return false;
    }

//    var res = postSynRequest("/services/ssoservice.ashx", { workType: workType }, "Sso", "ClassSelectCheck");
    var res = {"State":{"Success":true,"Des":null,"Errkey":null,"Data":null}};
    if (!res.State.Success) {
        alert(res.State.Errkey);
        return;
    }
    if (res.State.Des != null && res.State.Des != "") {
        if (confirm(res.State.Des)) {
            window.location.href = "./index.html";
        }
    }
    else {
        window.location.href = "./index.html";
    }
}