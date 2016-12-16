$(function () {

//    $('<audio id="chatAudio"><source src="../Music/notify.mp3" type="audio/mpeg"></audio>').appendTo('body');//载入声音文件
//    loadRemind(false);
//    // 初始化连接
//    $.connection.hub.url = "http://wesocket.jdd365.cn/signalr";
//    //$.connection.hub.url = "http://uat.wesocket.jdd365.cn/signalr";
//    var socket = $.connection.BookRemindHub;
//
//    // 登录成功后回调方法
//    socket.client.onLogonSuccess = function (id, message) {
//        //alert(message);
//    };
//
//    // 登录失败后回调方法
//    socket.client.onLogonFail = function (id, message) {
//        //alert(message);
//    };
//
//    // 接受提醒推送信息
//    socket.client.sendRemindMessage = function (msg) {
//        if (msg == "ROOMSTATEUPDATE") {//刷新房态图
//            top.main.window.$("#btnStateUpdate").click();
//        }
//        else if (msg == "NEWREMIND") {
//            loadRemind(true);
//        }
//        else if (msg == "SYSTEMUPDATE") {//系统更新通知
//            //添加RemindMessage
//            systemUpdate(1);
//        }
//        else if (msg.indexOf("STARTSPIDERREMIND") >= 0) {
//            var userAgent = window.navigator.userAgent.toLowerCase();
//            if (userAgent == "jchotelclient") {
//                var data = msg.replace("STARTSPIDERREMIND_", "");
//                var arrdata = data.split("|");
//                for (var i = 0; i < arrdata.length; i++) {
//                    alert('JCCMD:startSpider:' + arrdata[i]);
//                }
//            }
//        }
//    };

//    // 连接服务器并登录
//    $.connection.hub.start().done(function () {
//        //var sessionId = $.cookie('JDD_BSPMS_TICKET');
//        var data = postSynRequest("/Services/BasicService.aspx", null, "Common", "GetLogonUser");
//        var sessionId = data.Data.Id + "|" + data.Data.ShopId + "|" + data.Data.ComId;
//        socket.server.logon(sessionId);
//    });
});

function showRemindBox(isHide) {
    $("#remindbox").show();
    if (isHide != "0") {
        $("#remindicon").hide();
    }
}

function hideRemindBox() {
    $("#remindbox").hide();
    $("#remindicon").show();
}

function bookDetail(id) {
    openWin('/Book/BookAdd.html?id=' + id, 920, 400, "pwin");
}

function orderDetail(id) {
    openWin('/Customer/OrderDetail.html?id=' + id, 900, 530, "pwin");
}

function remindMessage(TargetId,Id, pmsVerSion,Type) {
    hideRemindBox();
    if (Type != 1 && Type != 4 && Type != 5) {
        openWin('/Message.html', 900, 500, "pwin");
    } else {
        if (pmsVerSion == "2") {
            var res = postSynRequest("/services/basicservice.aspx", { ids: Id }, "BaseData", "MessageSetRead");
            loadRemind(false);
            openWin('/TopSpeed/Book/BookAdd.html?id=' + TargetId, 900, 400, "pwin");
        } else {
            var res = postSynRequest("/services/basicservice.aspx", { ids: Id }, "BaseData", "MessageSetRead");
            loadRemind(false);
            openWin('/Book/BookAdd.html?id=' + TargetId, 920, 400, "pwin");
        }
        $(".yud").click()
    }
}

function loadRemind(isshow) {
    var data = postSynRequest("/services/basicservice.aspx", null, "BaseData", "QueryRemindMessage");
    if (data.State.Success && data.Data != null && data.Data.length > 0) {
        $('#chatAudio')[0].play(); //播放声音
        $("#showimg").removeAttr("src")
        $("#showimg").attr("src", "images/message.gif")
        $("#remindbox div.style ul li").remove();
        for (var i = 0; i < data.Data.length; i++) {
            var item = data.Data[i];
            $("#remindbox div.style ul").append('<li><a href="javascript:void(0)" onclick="remindMessage(' + item.TargetId + ',' + item.Id + ',' + item.PmsVerSion + ',' + item.Type + ');">' + item.RemindMsg + '</a></li>');
        }
        $("#remindicon div.number").html(data.Data.length);

        if (isshow)
            showRemindBox();
    } else {
        $("#showimg").removeAttr("src")
        $("#showimg").attr("src", "images/message.png")
        $("#remindbox div.style ul li").remove();
        $("#remindbox div.style ul").append('<li><a href="javascript:void(0)" onclick="remindMessage();">没有新的提醒消息</a></li>');
        $("#remindicon div.number").html("0");
        hideRemindBox();
    }
}

//type 1 系统更新
function systemUpdate(type) {
    postRequest("/services/basicservice.aspx", { Type: type }, "BaseData", "AddRemindMessage", false, function (data) {
        if (data.State.Success) {
            loadRemind(true);
        }
    });
}