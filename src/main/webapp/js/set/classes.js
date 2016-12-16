/*班次管理*/
$(function () {
    postRequest("/Services/BasicService.aspx", null, "WorkClassUsl", "GetWorkClass", false, function (data) {
        if (data.State.Success) {
            if (data.Data.List != null && data.Data.List.length > 0) {
                for (var i = 0; i < data.Data.List.length; i++) {
                    var item = data.Data.List[i];
                    var tr = "<tr>";
                    tr += "<td><input type='text' value='" + item.Name + "' id='Name" + item.Id + "' maxlength='10'/></td>";
                    tr += " <td><input type='text' class='startdate' value='" + formatDateStr(item.StartDate, 'yyyy-MM-dd hh:mm') + "' id='StartDate" + item.Id + "'/></td>";
                    tr += "<td><input type='text' class='enddate' value='" + formatDateStr(item.EndDate, 'yyyy-MM-dd hh:mm') + "'id='EndDate" + item.Id + "' /></td>";
                    tr += "<td><img src='../images/037.gif' width='9' height='9' /><span class='STYLE1'> [</span><a href='#' onclick='ClassEdit(" + item.Id + ")'>保存</a><span class='STYLE1'>]</span><img src='../images/010.gif' width='9' height='9' /></span><span class='STYLE1'>[</span><a href='#' onclick='ClassDel(" + item.Id + ")'>删除</a><span class='STYLE1'>]</span></td>";
                    tr += "</tr>";
                    $("#tbList").append(tr);
                }

                $('.startdate').datetimepicker({
                    lang: 'ch',
                    format: 'H:i',
                    timepicker: true,
                    datepicker: false
                });
                $('.enddate').datetimepicker({
                    lang: 'ch',
                    format: 'H:i',
                    timepicker: true,
                    datepicker: false
                });
            }
        }
        else {
            $("#tbList").append("<tr><td colspan='4' style='color:red'>没有找到对应的数据</td></tr>");
        }
    })
})

//保存
function ClassEdit(id) {
    var name = $("#Name" + id).val();
    var StartDate = $("#StartDate" + id).val();
    var EndDate = $("#EndDate" + id).val();

    var result = checkData(name, StartDate, EndDate, id);
    if (!result) { return false; }
    postRequest("/Services/BasicService.aspx", { id: id, name: name, StartDate: StartDate, EndDate: EndDate }, "WorkClassUsl", "WorkClassEdit", false, function (data) {
        if (!data.State.Success) {
            alert(data.State.Des);
        }
        else {
            alert("保存成功");
            window.location.reload();
        }
    });
}
//删除
function ClassDel(id) {
    var rows = $("#tbList tbody tr").length;
    if (rows == 1) {
        alert("班次不能全部删除");
        return false;
    }
    var result = postSynRequest("/Services/BasicService.aspx", { id: id }, "WorkClassUsl", "ClassById");
    if (result.State.Success == true) {
        alert("该班次已使用，不能删除"); return false;
    }
    if (!confirm("是否确定删除?")) { return;}
    postRequest("/Services/BasicService.aspx", { id: id }, "WorkClassUsl", "ClassDel", false, function (data) {
        if (!data.State.Success) {
            alert(data.State.Des);
        }
        else {
            alert("删除成功");
            window.location.reload();
        }
    });
}
//检查合法性
function checkData(name, StartDate, EndDate, id) {
    $(".note_no").remove();
    $(".errorborder").removeClass('errorborder');
    if (isEmpty(name)) {
        showTipsCollect(3, 'btnRead', '班次名称不能为空', 'Name' + id);
        return false;
    }
    var r = /^[a-z\d\u4E00-\u9FA5]+$/i;
    if (!r.test(name)) {
        showTipsCollect(3, 'btnRead', '班次包含特殊字符', 'Name' + id);
        return false;
    }
    var result = postSynRequest("/Services/BasicService.aspx", { name: name, id: id }, "WorkClassUsl", "ClassByName");
    if (result.State.Success) {
        showTipsCollect(3, 'btnRead', '该班次名称已存在', 'Name' + id);
        return false;
    }
    if (EndDate == StartDate) {
        showTipsCollect(3, 'btnRead', '结束时间不能与开始时间一样', 'EndDate' + id);
        return false;
    }
    return true;
}

function BtnAdd() {
    if ($("#tbList tr").length > 6)
    {
        alert("最多只能有6个班次");
        return false;
    }
    var tr = "<tr>";
    tr += "<td><input type='text'  class='name' maxlength='10'/></td>";
    tr += " <td><input type='text'  class='startdate'/></td>";
    tr += "<td><input type='text'  class='enddate'/></td>";
    tr += "<td><img src='../images/037.gif' width='9' height='9' /><span class='STYLE1'> [</span><a href='#' onclick='btnAdd(this)'>保存</a><span class='STYLE1'>]</span><img src='../images/010.gif' width='9' height='9' /></span><span class='STYLE1'>[</span><a href='#' onclick='btnDel(this)'>删除</a><span class='STYLE1'>]</span></td>";
    tr += "</tr>";
    $("#tbList").append(tr);

    $('.startdate').datetimepicker({
        lang: 'ch',
        format: 'H:i',
        timepicker: true,
        datepicker: false
    });
    $('.enddate').datetimepicker({
        lang: 'ch',
        format: 'H:i',
        timepicker: true,
        datepicker: false
    });
}

function btnDel(obj) {
    var tr = obj.parentNode.parentNode;
    var tbody = tr.parentNode;
    tbody.removeChild(tr);
}

function btnAdd(obj) {
    var name = $(obj).parent().parent().find('input.name').val();
    var startdate = $(obj).parent().parent().find('input.startdate').val();
    var enddate = $(obj).parent().parent().find('input.enddate').val();
    var result = checkName(name, startdate, enddate, obj);
    if (!result) { return; }
    postRequest("/Services/BasicService.aspx", { name: name, StartDate: startdate, EndDate: enddate }, "WorkClassUsl", "WorkClassAdd", false, function (data) {
        if (data.State.Success) {
            alert("保存成功");
            window.location.reload();
        }
        else {
            alert(data.State.Des);
        }
    });
}

function checkName(name, startdate, enddate, obj) {
    $(".note_no").remove();
    $(".errorborder").removeClass('errorborder');
    if (isEmpty(name)) {
        showTipsCollect(3, 'btnRead', '班次名称不能为空', $(obj).parent().parent().find('input.name'));
        return false;
    }
    var r = /^[a-z\d\u4E00-\u9FA5]+$/i;
    if (!r.test(name)) {
        showTipsCollect(3, 'btnRead', '班次包含特殊字符', $(obj).parent().parent().find('input.name'));
        return false;
    }
    var result = postSynRequest("/Services/BasicService.aspx", { name: name }, "WorkClassUsl", "ClassByName");
    if (result.State.Success) {
        showTipsCollect(3, 'btnRead', '该班次名称已存在', $(obj).parent().parent().find('input.name'));
        return false;
    }
    if (enddate == startdate) {
        showTipsCollect(3, 'btnRead', '结束时间不能与开始时间一样', $(obj).parent().parent().find('input.enddate'));
        return false;
    }
    return true;
}