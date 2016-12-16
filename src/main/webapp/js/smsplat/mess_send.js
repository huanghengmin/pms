/*会员信息*/
var memberdata = undefined;
var recordSendId = "";
var SmsSighLength = 0;
$(function () {
    $("#StartDate").val(datetostring(new Date().valueOf() - (7 * 24 * 60 * 60 * 1000)))
    $("#EndDate").val(datetostring(new Date().valueOf()))
    $("#QueryType").change(function () {
        var QueryType = $("#QueryType").val();
        if (QueryType == 0) {
            $("#QueryDate").html("预定时间：");
            $("#StartDate").val(datetostring(new Date().valueOf() - (7 * 24 * 60 * 60 * 1000)))
            $("#EndDate").val(datetostring(new Date().valueOf()))
            $("#btnQueryOrder").click();
        }
        if (QueryType == 1) {
            $("#QueryDate").html("预离时间：");
            $("#StartDate").val("")
            $("#EndDate").val("")
            $("#btnQueryOrder").click();
        }
        if (QueryType == 2) {
            $("#QueryDate").html("结账时间：");
            $("#StartDate").val(datetostring(new Date().valueOf() - (7 * 24 * 60 * 60 * 1000)))
            $("#EndDate").val(datetostring(new Date().valueOf()))
            $("#btnQueryOrder").click();
        }
    })
   /* var data = postSynRequest("/Services/BasicService.aspx", null, "AccountUsl", "GetSmsSign");
    if (data.State.Success) {
        SmsSighLength = 68 - data.Data.SmsSign.length;
    } else {*/
        SmsSighLength = 64;
    // }
    $("#Length").html(SmsSighLength);
    $("#btnQueryOrder").click(function () {
        GetCustomerList();
    })
    $("#Discription").keydown(function () {
        IllegalChar($("#Discription").val());
        checkInputNum();
    });
    $("#Discription").keyup(function () {
        IllegalChar($("#Discription").val());
        checkInputNum();
    });
    $("#Discription").change(function () {
        IllegalChar($("#Discription").val());
        checkInputNum();
    });
    recordSendId = getQueryParam("id");
    if (recordSendId != "" && recordSendId != "undefined") {
        alert("获取非会员数据列表！");
        /*postRequest("/Services/BasicService.aspx", { id: recordSendId }, "SmsSendUsl", "GetSmsRecordById", false, function (data) {
            if (data.State.Success) {
                var names = new Array();
                var phones = new Array();
                names = data.Data.List.Name.split(',');
                phones = data.Data.List.Mobile.split(',');
                for (var i = 0; i < phones.length; i++) {
                    var html = '<div style="float:left;white-space:nowrap;" class="addr_base addr_normal">';
                    html += '<b>' + names[i] + '</b>';
                    html += '<span>&lt;' + phones[i] + '&gt;;</span>';
                    html += '</div>';
                    $("#inputs").append(html);
                }
                $("#Discription").val(data.Data.List.SmsContent);
                checkInputNum();
            } else {
                alert("获取数据失败！");
            }
        });*/
    }
    //加载会员列表
    alert("加载会员列表");
    /*postRequest("/Services/BasicService.aspx", null, "SmsSendUsl", "GetVipMember", false, function (data) {
        if (data.State.Success) {
            var str = new Array();
            var htmls = "";
            memberdata = data.Data.List;
            for (var i = 0; i < data.Data.List.length; i++) {
                var item1 = data.Data.List[i];
                if ($.inArray(item1.CategoryName, str) == -1) {
                    if (i == 0) {
                        str.push(item1.CategoryName);
                        htmls +='<div class="mess_type">';
                        htmls += '<div class="mess_type_titles"  headerindex="0h"><input name="' + item1.CategoryName + '" type="checkbox" class="cardcategory"/>' + item1.CategoryName + '<span onclick="openul(\'' + item1.CategoryName + '\')"><img class="imgmp" id="i_' + item1.CategoryName + '" src="../Images/minus.gif" /></span></div>';
                        htmls += '<ul id="ul_' + item1.CategoryName + '" style="display:block" class="mess_people" contentindex="0c">';
                        for (var j = 0; j < data.Data.List.length; j++) {
                            var item2 = data.Data.List[j];
                            if (item1.CategoryName == item2.CategoryName) {
                                htmls += '<li><p><input name="' + item1.CategoryName + '" type="checkbox" class="ches"/><b>' + item2.CardNo + '</b></p>';
                                htmls += '<p><em>' + item2.Phone + '</em> <em>' + item2.Name + '</em></p></li>';
                            }
                        }
                        htmls += '</div>';
                    }
                    else {
                        str.push(item1.CategoryName);
                        htmls += '<div class="mess_type">';
                        htmls += '<div class="mess_type_titles"  headerindex="0h"><input name="' + item1.CategoryName + '" type="checkbox" class="cardcategory"/>' + item1.CategoryName + '<span onclick="openul(\'' + item1.CategoryName + '\')"><img class="imgmp" id="i_' + item1.CategoryName + '" src="../Images/plus.gif" /></span></div>';
                        htmls += '<ul id="ul_' + item1.CategoryName + '" style="display:none" class="mess_people" contentindex="0c">';
                        for (var j = 0; j < data.Data.List.length; j++) {
                            var item2 = data.Data.List[j];
                            if (item1.CategoryName == item2.CategoryName) {
                                htmls += '<li><p><input name="' + item1.CategoryName + '" type="checkbox" class="ches"/><b>' + item2.CardNo + '</b></p>';
                                htmls += '<p><em>' + item2.Phone + '</em> <em>' + item2.Name + '</em></p></li>';
                            }
                        }
                        htmls += '</div>';
                    }
                }
            }
            $("#link_man_list").append(htmls);
        } else {
            alert("加载会员列表失败!");
        }
    });*/

    GetCustomerList()

    //
    refreshCss();

    //联系人输入框单击事件
    $(".inputs").bind("click", function (event) {
        alert("联系人输入框单击事件");
        if (!$(this).children(".addr_text").length > 0) {
            $(".addr_base").removeClass("fn_list");
            $(".addr_text").remove();
            var inputHtml = '<div style="float: left; border: medium none; overflow: hidden; width:auto" class="addr_text">'
                + '<input id="hide_input" type="text" style="border:none;outline:none;-webkit-appearance:none;width:auto;ime-mode:active" class="js_input inputadd" onkeydown="changeInputlength(this);"/>'
                + '<div style="width: 1px; height: 1px; overflow: auto; white-space: nowrap; border: medium none; margin: 0px; padding: 0px; font-family: Tahoma; font-size: 12px; font-weight: 400; line-height: 16px; word-spacing: 0px;"></div>'
                + '</div>';
            $(this).append(inputHtml);
            $("#hide_input").focus();
        } else {
           // alert("d")
        }

        
        
    })


    //联系人全选事件
    $(".cardcategory").live("click",function (event) {
        alert("联系人全选事件");
        cancelEvent(event);
        if ($(this).attr("checked")) {
            $('input[name="' + $(this).attr("name") + '"]').attr("checked", "true");
        } else {
            $('input[name="' + $(this).attr("name") + '"]').removeAttr("checked");
        }
        $('input[name="' + $(this).attr("name") + '"]').each(function () {
            if ($(this).hasClass("ches")){
                var data = new Array();
                var html = "";
                //获取姓名\电话号码
                $(this).parent().parent().children('p').each(function () {
                    $(this).children('em').each(function () {
                        data.push($(this).html());
                    });
                });
                //获取会员卡号
                $(this).parent().parent().children('p').each(function () {
                    $(this).children('b').each(function () {
                        data.push($(this).html());
                    });
                });
                //判断选中和不选中
                if ($(this).attr("checked") == "checked") {
                    //不存在
                    var bool = true;
                    //判断会员电话号码在联系人中是否存在
                    $("#inputs").children().each(function () {
                        if ($(this).attr("id") == data[2]) {
                            bool = false;
                        }
                    });
                    //不存在,加入号码
                    if (bool) {
                        html += '<div id="' + data[2] + '" style="float:left;white-space:nowrap;" class="addr_base addr_normal">';
                        html += '<b>' + data[1] + '</b>';
                        html += '<span>&lt;' + data[0] + '&gt;;</span>';
                        html += '</div>';
                        $("#inputs").append(html);
                        refreshCss();
                    }
                } else {
                    //判断会员电话号码在联系人中是否存在
                    $("#inputs").children().each(function () {
                        //存在,删除号码
                        if ($(this).attr("id") == data[2]) {
                            $(this).remove();
                        }
                    });
                }
            }
        })
           
    });

    
    //输入框单个双击选中事件
    $(".addr_base").live("dblclick", function () {
        alert("输入框单个双击选中事件");
        $(this).addClass("input_edit").siblings().removeClass("input_edit")
        var data = new Array();
        var html = "";
        $(this).children('b').each(function () {

            data.push($(this).html());
        }
           );
        $(this).children('span').each(function () {

            data.push($(this).html());
        });
        $(this).hide();
        $(".addr_text").remove();
        var inputHtml = '<div style="float: left; border: medium none; overflow: hidden; width:auto" class="addr_text">'
                + '<input id="hide_input" type="text" style="border:none;outline:none;-webkit-appearance:none;width:auto;ime-mode:active" class="js_input inputedit" onkeydown="changeInputlength(this);"/>'
                + '<div style="width: 1px; height: 1px; overflow: auto; white-space: nowrap; border: medium none; margin: 0px; padding: 0px; font-family: Tahoma; font-size: 12px; font-weight: 400; line-height: 16px; word-spacing: 0px;"></div>'
                + '</div>';
        $(this).after(inputHtml);
        var tel = data[1].replace("&lt;", "").replace("&gt;", "").replace(";","");
        var name = data[0];
        $("#hide_input").val(name + "," + tel);
        $(".inputedit").focus();
    });

    //输入框文本框失去焦点事件
    $(".inputedit").live("blur", function () {
        alert("输入框文本框失去焦点事件");
        var html = "";
        var updateData = new Array();
        updateData = $("#hide_input").val().split(',');
        if (updateData.length == 1) {
            if (isMobil(updateData[0]) == false) {
                $("#hide_input").addClass("input_err");
                $("#hide_input").focus();
            } else {
                $("#hide_input").parent().remove();
                $("#inputs").children().each(function () {
                    if ($(this).hasClass("input_edit")) {
                        $(this).removeClass("input_edit");
                        $(this).children().remove();
                        html = '<b></b>';
                        html += '<span>&lt;' + updateData[0] + '&gt;;</span>';
                        $(this).append(html);
                        $(this).show();
                    }
                });
            }
        } else if (updateData.length == 2) {
            if (isMobil(updateData[1]) == false) {
                $("#hide_input").addClass("input_err");
                $("#hide_input").focus();
            } else {
                $("#hide_input").parent().remove();
                $("#inputs").children().each(function () {
                    if ($(this).hasClass("input_edit")) {
                        $(this).removeClass("input_edit");
                        $(this).children().remove();
                        html = '<b>' + updateData[0] + '</b>';
                        html += '<span>&lt;' + updateData[1] + '&gt;;</span>';
                        $(this).append(html);
                        $(this).show();
                    }
                });
            }
            

        }
        else {
            if (isMobil(updateData[1]) == false || updateData.length < 2) {
                $("#hide_input").addClass("input_err");
                $("#hide_input").focus();
            }
        }
            
    });

    //输入框文本框失去焦点事件
    $(".inputadd").live("blur", function () {
        alert("输入框文本框失去焦点事件");
        var html = "";
        var updateData = new Array();
        updateData = $("#hide_input").val().split(',');
        if ($("#hide_input").val() == "") {
            $("#hide_input").parent().remove();
        } else if (updateData.length==1) {
            if (isMobil(updateData[0]) == false) {
                $("#hide_input").addClass("input_err");
                $("#hide_input").focus();
                return;
            } else {
                $("#hide_input").parent().remove();
                html = '<div style="float:left;white-space:nowrap;" class="addr_base addr_normal">';
                html += '<b></b>';
                html += '<span>&lt;' + updateData[0] + '&gt;;</span>';
                html += '</div>';
                $("#inputs").append(html);
            }
        } else if (updateData.length == 2) {
            if (isMobil(updateData[1]) == false) {
                $("#hide_input").addClass("input_err");
                $("#hide_input").focus();
                return;
            } else {
                $("#hide_input").parent().remove();
                html = '<div style="float:left;white-space:nowrap;" class="addr_base addr_normal">';
                html += '<b>'+ updateData[0]+'</b>';
                html += '<span>&lt;' + updateData[1] + '&gt;;</span>';
                html += '</div>';
                $("#inputs").append(html);
            }
        }
    });

    //删除键
    window.document.onkeydown = disableRefresh;
    function disableRefresh(evt) {
        evt = (evt) ? evt : window.event
        if (evt.keyCode) {
            if (evt.keyCode == 46 || evt.keyCode == 8) {
                var b = true;
                $("#inputs").children().each(function () {
                    if ($(this).hasClass("fn_list") && !$(this).hasClass("input_edit")) {
                        $(this).remove();
                        b = false;
                    }
                });
                return b;
            }
        }
    };

    //单个钩选
    $('.ches').live("change",function () {
        alert("单个钩选");
        var data = new Array();
        var html = "";
        $(this).parent().parent().children('p').each(function () {
            $(this).children('em').each(function () {
                data.push($(this).html());
            });
        });
        $(this).parent().parent().children('p').each(function () {
            $(this).children('b').each(function () {
                data.push($(this).html());
            });
        });
        if ($(this).attr("checked") == "checked") {
            var bool = true;
            $("#inputs").children().each(function () {
                if ($(this).attr("id") == data[2])
                {
                    bool = false;
                }
            });
            // alert(bool);
            if (bool) {
                html += '<div id="' + data[2] + '" style="float:left;white-space:nowrap;" class="addr_base addr_normal">';
                html += '<b>' + data[1] + '</b>';
                html += '<span>&lt;' + data[0] + '&gt;;</span>';
                // html += '<span class="semicolon">;</span>';
                // html += '<a class="addr_del" href="javascript:;"></a>';
                html += '</div>';
                // alert(html);
                $("#inputs").append(html);
                // alert($("#inputs").id);
                refreshCss();
            }
        } else {
            $("#inputs").children().each(function () {
                if ($(this).attr("id") == data[2]) {
                    $(this).remove();
                }
            });
        }
                
    })

    //搜索文本框按键事件
    $("#ser_txt").bind("keyup", function (evt) {
        alert("搜索文本框按键事件");
        if ($("#ser_txt").val() != "") {
            //
            goSearch($("#ser_txt").val().toUpperCase());
            
        } else {
            //文本框为空显示所有
            showallmembers();
        }
    });

    //发送事件
    $("#btnSure").bind("click", function () {
        alert("发送事件");
        sendsmss(1);
    });
    //保存草稿事件
    $("#btnCancel").bind("click", function () {
        alert("保存草稿事件");
        sendsmss(0);
    });
});

var refreshCss = function () {
    $(".addr_base").live("mouseover", function () {
        $(this).addClass("attbg")
    });
    $(".addr_base").live("mouseout", function () {
        $(this).removeClass("attbg")
    });
    $(".addr_base").live("click", function () {
        $(this).addClass("fn_list").siblings().removeClass("fn_list");
        //$(".inputadd").blur();
        $("#hide_input").blur();
    });
}

var changeInputlength = function(cursor) {
    var getcount = document.getElementById("hide_input");

    cursor.size = getcount.value.length + 2;
}

//ddaccordion.init({
//    headerclass: "mess_type_titles",
//    contentclass: "mess_people",
//    revealtype: "click", // "click", "clickgo", or "mouseover"
//    mouseoverdelay: 200,
//    collapseprev: true, // true/false 
//    defaultexpanded: [],
//    onemustopen: false,
//    animatedefault: false,
//    persiststate: true,
//    toggleclass: ["select_no", "select_on"],
//    togglehtml: ["suffix", "<img src='../images/plus.gif' class='statusicon' />", "<img src='../images/minus.gif' class='statusicon' />"],
//    animatespeed: "fast" //"fast", "normal", or "slow"

//});

//开始搜索
var goSearch = function (str) {
    alert("开始搜索");
    var html = "";
    html += '<div class="mess_type">';
    html += '<div class="mess_type_titles"  headerindex="0h"><input name="search" type="checkbox" class="cardcategory"/>搜索记录</div>';
    html += '<ul class="mess_people" contentindex="0c">';
    for (var i = 0; i < memberdata.length; i++) {
        var name="";
        if (!checkname(str)) {
            name = makePy(memberdata[i].Name.toUpperCase()).toString();
        } else {
            name = memberdata[i].Name;
        }
        if (name.indexOf(str) != -1 || memberdata[i].CardNo.toString().indexOf(str) != -1 || memberdata[i].Phone.toString().indexOf(str) != -1) {
            html += '<li><p><input name="search" type="checkbox" class="ches panle1"/><b>' + memberdata[i].CardNo + '</b></p>';
            html += '<p><em>' + memberdata[i].Phone + '</em> <em>' + memberdata[i].Name + '</em></p></li>';
        }
    }
    html += '</div>';
    $("#link_man_list").children().remove();
    $("#link_man_list").append(html);
}

//加载原始会员信息
var showallmembers = function () {
    alert("加载原始会员信息");
    var str = "";
    var htmls = "";
    for (var i = 0; i < memberdata.length; i++) {
        var item1 = memberdata[i];
        if (str.indexOf(item1.CategoryName) == -1) {
            if (i == 0) {
                str += item1.CategoryName;
                htmls += '<div class="mess_type">';
                htmls += '<div class="mess_type_titles"  headerindex="0h"><input name="' + item1.CategoryName + '" type="checkbox" class="cardcategory"/>' + item1.CategoryName + '<span onclick="openul(\'' + item1.CategoryName + '\')"><img class="imgmp" id="i_' + item1.CategoryName + '" src="../Images/minus.gif" /></span></div>';
                htmls += '<ul  id="ul_' + item1.CategoryName + '" style="display:block" class="mess_people" contentindex="0c">';
                for (var j = 0; j < memberdata.length; j++) {
                    var item2 = memberdata[j];
                    if (item1.CategoryName == item2.CategoryName) {
                        htmls += '<li><p><input name="' + item1.CategoryName + '" type="checkbox" class="ches panle1"/><b>' + item2.CardNo + '</b></p>';
                        htmls += '<p><em>' + item2.Phone + '</em> <em>' + item2.Name + '</em></p></li>';
                    }
                }
                htmls += '</div>';
            }
            else {
                str += "," + item1.CategoryName;
                htmls += '<div class="mess_type">';
                htmls += '<div class="mess_type_titles"  headerindex="0h"><input name="' + item1.CategoryName + '" type="checkbox" class="cardcategory"/>' + item1.CategoryName + '<span onclick="openul(\'' + item1.CategoryName + '\')"><img class="imgmp" id="i_' + item1.CategoryName + '" src="../Images/plus.gif" /></span></div>';
                htmls += '<ul  id="ul_' + item1.CategoryName + '" style="display:none" class="mess_people" contentindex="0c">';
                for (var j = 0; j < memberdata.length; j++) {
                    var item2 = memberdata[j];
                    if (item1.CategoryName == item2.CategoryName) {
                        htmls += '<li><p><input name="' + item1.CategoryName + '" type="checkbox" class="ches panle1"/><b>' + item2.CardNo + '</b></p>';
                        htmls += '<p><em>' + item2.Phone + '</em> <em>' + item2.Name + '</em></p></li>';
                    }
                }
                htmls += '</div>';
            }
        }
    }
    $("#link_man_list").children().remove();
    $("#link_man_list").append(htmls);
}

//检查输入的是否为汉字
var checkname = function (name) {
    alert("检查输入的是否为汉字");
    var strExp = new RegExp(/^[\u4E00-\u9FA5]+$/);
    if (strExp.test(name)) {
        return true;
    } else {
        return false;
    }
}

//发送事件
var sendsmss = function (state) {
    if ($("#inputs").html() == "") {
        alert("接收人不能为空！");
        return;
    }
    if ($("#Discription").val() == "") {
        alert("信息的内容不能为空！");
        return;
    }
    if (!checkSpecialChars($("#Discription").val())) {
        alert("你输入的内容包含非法字符，例如:" + specialChars);
        return;
    }
   
    if (parseInt($("#charnum").html()) > SmsSighLength)
    {
        if (!confirm("你发送的内容超过一条短信限定长度，如要继续发送会扣除多条短信条数，是否继续"))
        {
            return;
        }
    }
    var count = 0;
    var phones = "";
    var msgs = "";
    $("#inputs").children().each(function () {
        if ($(this).hasClass("addr_text")) {
            alert("接收人号码输入错误！");
            return;
        } else {
            var name = $(this).children("b").html();
            var mobile = $(this).children("span").html().replace("&lt;", "").replace("&gt;", "").replace(";", "");
            if (phones.indexOf(mobile) == -1)
            {
                if (count != 0) {
                    phones += ";";
                }
                phones += name;
                phones += ",";
                phones += mobile;
                count++;
            }
            
        }
    });
    msgs = $("#Discription").val();
    /*postRequest("/Services/BasicService.aspx", {id:recordSendId, phone: phones, msg: msgs, state: state }, "SmsSendUsl", "SendSms", false, function (data) {
        if (data.State.Success) {
            alert(data.State.Des);
            //document.location.reload();
            clearAll();
        } else {
            alert(data.State.Des);
        }
        parent.menu_left.location.reload();
    });*/
}

//折叠面板
function openul(c) {
    //展开方式一、
    $("#ul_" + c).toggle();
    if ($("#ul_" + c).css('display') == "block") {
        $("#i_" + c).attr("src", "../minus.gif");
    }
    else {
        $("#i_" + c).attr("src", "../plus.gif");
    }

    //展开方式二、

    //$(".mess_people").each(function () {
    //    emid=$(this).attr("id");
    //    if (emid == "ul_" + c) {
    //        if ($("#ul_" + c).css('display') == "block") {
    //            $("#ul_" + c).hide();
    //        }
    //        else {
    //            $("#ul_" + c).show();
    //        }
    //    }
    //    else {
    //        $(this).hide();
    //    }
       
    //});

    //$(".imgmp").each(function () {
    //    imgid = $(this).attr("id");
        
    //    if (imgid == "i_" + c) {
    //        if ($("#ul_" + c).css('display') == "block") {
    //            $(this).attr("src", "../Images/minus.gif");
    //        }
    //        else {
    //            $(this).attr("src", "../Images/plus.gif");
    //        }
    //    }
    //    else {
    //        $(this).attr("src", "../Images/plus.gif");
    //    }
    //});
}

function clearAll() {
    $("#inputs").children().remove();
    $("#Discription").val("");
    recordSendId = "";
}

//屏蔽非法字符
function IllegalChar(text) {
    var values = $("#Discription").val();
    var chars = new Array();
    chars = illegalChars.split('|');
    for (var i = 0; i < chars.length; i++) {
        if (text.indexOf(chars[i]) != -1)
        {
            values = values.replace(chars[i], "");
            $("#Discription").val(values);
        }
    }
}

function checkInputNum() {
    
    $("#charnum").html($("#Discription").val().length);
}


function GetCustomerList() {
    alert("GetCustomerList");
    QueryType = $("#QueryType").val();
    /*postRequest("/Services/BasicService.aspx", { QueryType: QueryType, StartDate: $("#StartDate").val(), EndDate: $("#EndDate").val(),PhoneOrName:$("#PhoneOrName").val() }, "SmsSendUsl", "GetCustomerInfo", false, function (data) {
        if (data.State.Success) {
            $("#customerTable tbody").html("");
            $("#customerTable thead").html("");
            var html = "";
            if (QueryType == 0) {
                $("#customerTable thead").html('<tr><th><input type="checkbox" id="checkAll" /></th><th>姓名</th><th>联系方式</th><th>预定时间</th><th>来店时间</th></tr>');
                if (data.Data != null) {
                    for (var i = 0; i < data.Data.length; i++) {
                        html += "<tr>";
                        var check = true;
                        $("#inputs").children().each(function () {
                            //存在,打勾
                            if ($(this).attr("data-id") == data.Data[i].Phone) {
                                check = false;
                            }
                        });
                        if (check)
                            html += "<td><input type='checkbox' class='trcheck' data-id='" + data.Data[i].Phone + "'></td>";
                        else
                            html += "<td><input type='checkbox' class='trcheck' data-id='" + data.Data[i].Phone + "' checked='true'></td>";
                        html += "<td>" + data.Data[i].CustomerName + "</td>";
                        html += "<td>" + data.Data[i].Phone + "</td>";
                        html += "<td>" + data.Data[i].KeyDate + "</td>";
                        html += "<td>" + data.Data[i].CreateDate + "</td>";
                        html += "</tr>";
                    }
                }
                else {
                    html += "<tr><td colspan='5'>未查到当前数据</td></tr>";
                }
            } else {
                if (QueryType == 1)
                    $("#customerTable thead").html('<tr><th><input type="checkbox" id="checkAll" /></th><th>姓名</th><th>联系方式</th><th>预离时间</th></tr>');
                else
                    $("#customerTable thead").html('<tr><th><input type="checkbox" id="checkAll" /></th><th>姓名</th><th>联系方式</th><th>离店时间</th></tr>');
                if (data.Data != null) {
                    for (var i = 0; i < data.Data.length; i++) {
                        html += "<tr>";
                        var check = true;
                        $("#inputs").children().each(function () {
                            //存在,打勾
                            if ($(this).attr("data-id") == data.Data[i].Phone) {
                                check = false;
                            }
                        });
                        if (check)
                            html += "<td><input type='checkbox' class='trcheck' data-id='" + data.Data[i].Phone + "'></td>";
                        else
                            html += "<td><input type='checkbox' class='trcheck' data-id='" + data.Data[i].Phone + "' checked='true'></td>";
                        html += "<td>" + data.Data[i].CustomerName + "</td>";
                        html += "<td>" + data.Data[i].Phone + "</td>";
                        html += "<td>" + data.Data[i].KeyDate + "</td>";
                        html += "</tr>";
                    }
                } else {
                    html += "<tr><td colspan='5'>未查到当前数据</td></tr>";
                }
            }
            $("#customerTable tbody").html(html);
            $("#checkAll").click(function () {
                if ($("#checkAll")[0].checked) {
                    $(".trcheck").attr("checked", "true");
                    for (var i = 0; i < $(".trcheck").length; i++)
                    {
                        var name = $($(".trcheck")[i]).parent().next().html();
                        var phone = $($(".trcheck")[i]).parent().next().next().html();
                        var id = $($(".trcheck")[i]).attr("data-id");
                        var check = true;
                        $("#inputs").children().each(function () {
                            //存在,不添加
                            if ($(this).attr("data-id") == phone) {
                                check = false;                                
                            }
                        });
                        if (check) {
                            var html = '<div style="float:left;white-space:nowrap;" class="addr_base addr_normal" data-id="' + phone + '">';
                            html += '<b>' + name + '</b>';
                            html += '<span>&lt;' + phone + '&gt;;</span>';
                            html += '</div>';
                            $("#inputs").append(html);
                        }
                    }
                }
                else {                   
                    $(".trcheck").removeAttr("checked");
                    for (var i = 0; i < $(".trcheck").length; i++) {
                        var phone = $($(".trcheck")[i]).attr("data-id");
                        $("#inputs").children().each(function () {
                            //存在,删除号码
                            if ($(this).attr("data-id") == phone) {
                                $(this).remove();
                            }
                        });
                    }
                }
            })
            $(".trcheck").click(function () {
                if ($("#checkAll")[0].checked && this.checked == false)
                {
                    $("#checkAll")[0].checked = false;
                }
                var name = $(this).parent().next().html();
                var phone = $(this).parent().next().next().html();
                var id = $(this).attr("data-id");
                if (this.checked == true) {
                    var html = '<div style="float:left;white-space:nowrap;" class="addr_base addr_normal" data-id="' + phone + '">';
                    html += '<b>' + name + '</b>';
                    html += '<span>&lt;' + phone + '&gt;;</span>';
                    html += '</div>';
                    $("#inputs").append(html);
                } else {
                    $("#inputs").children().each(function () {
                        //存在,删除号码
                        if ($(this).attr("data-id") == phone) {
                            $(this).remove();
                        }
                    });
                }

            })
        } else {
            alert("加载客人信息失败!")
        }
    });*/
}


//秒数转为Date  obj为数字
function datetostring(obj) {
    var date = new Date(obj);
    var datetime = ""
    datetime = date.getFullYear() + '-';//年
    if (date.getMonth() > 8)//月
        datetime = datetime + (date.getMonth() + 1) + '-';
    else
        datetime = datetime + '0' + (date.getMonth() + 1) + '-';
    if (date.getDate() > 9)//日
        datetime = datetime + (date.getDate()) + ' ';
    else
        datetime = datetime + '0' + (date.getDate()) + ' ';

    if (date.getHours() > 9)//时
        datetime = datetime + (date.getHours()) + ':';
    else
        datetime = datetime + '0' + (date.getHours()) + ':';
    if (date.getMinutes() > 9)//分
        datetime = datetime + (date.getMinutes());
    else
        datetime = datetime + '0' + (date.getMinutes());
    return datetime

}