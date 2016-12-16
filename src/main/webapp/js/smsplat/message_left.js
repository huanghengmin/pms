/*短信列表*/
// $(function () {
    alert("加载短信发送，草稿箱，待发送等列表")
   /* postRequest("/Services/BasicService.aspx", null, "SmsRecordUsl", "GetSmsRecordCount", false, function (data) {
        if (data.State.Success) {
            if (data.Data.List != null && data.Data.List.length > 0) {
                for (var i = 0; i < data.Data.List.length; i++) {
                    var item = data.Data.List[i];
                    if (item.Status == 0) {
                        $("#a_draft").html("草稿箱(" + item.Number + ")");
                    } else if (item.Status == 1) {
                        $("#a_sent").html("待发送(" + item.Number + ")");
                    } else if (item.Status == 2) {
                        $("#a_Sendsuccess").html("发送成功(" + item.Number + ")");
                    } else if (item.Status == 3) {
                        $("#a_Sendfailure").html("发送失败(" + item.Number + ")");
                    } else if (item.Status == 4) {
                        $("#a_deleted").html("回收站(" + item.Number + ")");
                    }
                }
            }
        }
    });*/
// })