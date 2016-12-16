//确定是单店还是连锁
//创建人：wd

$(document).ready(function () {
    IsPMSVersion_head()
})
//设置页面头a标签
function IsPMSVersion_head() {
    var a = $("#PmsVersion");

    a.html("单店版")
    a[0].href = "http://localhost:8080/pms/"

//    postRequest("/Services/SsoService.ashx", {}, "", "IsPMSVersion", false, function (data) {
//        var data = {"Data":null,"State":{"Data":null,"Des":null,"Errkey":null,"Success":true}};
//        if (!data.State.Success) {//连锁
//            a.html("单店版")
//            a[0].href = "http://www.jdd365.cn/"
//        }
//        else {//单店
//            a.html("连锁版")
//            a[0].href = "http://g.jdd365.cn/"
//        }
//    })
}