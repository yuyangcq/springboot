/**
 * 初始化组详情对话框
 */
var DataImportInfoDlg = {
    dataImportInfoDlg : {},
    validateFields: {
        name1: {
            validators: {
                notEmpty: {
                    message: '结果不能为空'
                }
            }
        }
    }
};

DataImportInfoDlg.close = function() {
    parent.layer.close(window.parent.YlResult.layerIndex);
}
DataImportInfoDlg.updateSubmit = function () {
    debugger;
    var id= $("#uid").val();
    var name= $("#name").val();
    var path= $("#path").val();
    if(name == "" || name == "请输入项目名称"){
        $("#name").val("请输入项目名称");
        $("#name").css("color","red")
        return
    }else if(path == "" || path == "请输入文件路径" ){
        $("#path").val("请输入文件路径");
        $("#path").css("color","red")
        return
    }
    var types= document.getElementsByName("each");
    var type = "1";
    for(var i = 0;i<types.length;i++){
        if(types[i].checked==true){
            type =  types[i].value;
        }
    }
    var ajax = new $ax(Feng.ctxPath + '/bankimport/update', function (data) {
        if (data.code === 200) {
            Feng.success("更新完成!");
            debugger
            window.parent.YlResult.search();
            DataImportInfoDlg.close();

        } else {
            if (data.hasOwnProperty("message")) {
                Feng.error(data.message + "!");
            } else {
                Feng.error("失败！");
            }
        }

    }, function (data) {
        if (data.hasOwnProperty("responseJSON")) {
            if (data.responseJSON.hasOwnProperty("message")) {
                Feng.error(data.responseJSON.message + "!");
            }
        }
        /*YlResult.search();*/
    });
    ajax.set("id",id);
    ajax.set("name",name);
    ajax.set("path",path);
    ajax.set("type",type);
    ajax.start();

}
DataImportInfoDlg.addSubmit = function () {
     debugger;
    var name= $("#name1").val();
    var path= $("#path").val();
    if(name == "" || name == "请输入项目名称"){
        $("#name1").val("请输入项目名称");
        $("#name1").css("color","red")
        return
    }else if(path == "" || path == "请输入文件路径"){
        $("#path").val("请输入文件路径");
        $("#path").css("color","red")
        return
    }
    var types= document.getElementsByName("each");
    var type = "1";
    for(var i = 0;i<types.length;i++){
        if(types[i].checked==true){
            type =  types[i].value;
        }
    }
    debugger;
    var ajax = new $ax(Feng.ctxPath + '/bankimport/add', function (data) {
        if (data.code === 200) {
            Feng.success("添加完成!");
            DataImportInfoDlg.close();
            window.parent.YlResult.search();
        } else {
            if (data.hasOwnProperty("message")) {
                Feng.error(data.message + "!");
            } else {
                Feng.error("失败！");
            }
        }

    }, function (data) {
        if (data.hasOwnProperty("responseJSON")) {
            if (data.responseJSON.hasOwnProperty("message")) {
                Feng.error(data.responseJSON.message + "!");
            }
        }
        /*YlResult.search();*/
    });
    ajax.set("name",name);
    ajax.set("path",path);
    ajax.set("type",type);
    ajax.start();

}
DataImportInfoDlg.clearText = function (obj) {
    debugger
    var value = $(obj).val();
    if(value ==  "请输入项目名称" || value == "请输入文件路径"){
        $(obj).val("");
        $(obj).css("color","#333");
    }

}