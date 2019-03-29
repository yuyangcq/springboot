/**
 * 初始化部门详情对话框
 */
var AppSystemDlg = {
    appSystemData : {},
    validateFields: {
    	appname: {
            validators: {
                notEmpty: {
                    message: '名称不能为空'
                }
            }
        },
        appcode: {
            validators: {
                notEmpty: {
                    message: '代码不能为空'
                }
            }
        }
    }
};

/**
 * 清除数据
 */
AppSystemDlg.clearData = function() {
    this.appSystemData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
AppSystemDlg.set = function(key, val) {
    this.appSystemData[key] = (typeof value == "undefined") ? $("#" + key).val() : value;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
AppSystemDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
AppSystemDlg.close = function() {
    parent.layer.close(window.parent.AppSystem.layerIndex);
}


/**
 * 收集数据
 */
AppSystemDlg.collectData = function() {
    this.set('id').set('appname').set('appcode').set('remark');
}


/**
 * 验证数据是否为空
 */
AppSystemDlg.validate = function () {
    $('#appSystemForm').data("bootstrapValidator").resetForm();
    $('#appSystemForm').bootstrapValidator('validate');
    return $("#appSystemForm").data('bootstrapValidator').isValid();
}

/**
 * 提交添加部门
 */
AppSystemDlg.initAppSystem = function() {
	
	//提交信息
    var ajax = new $ax(Feng.ctxPath + "/appsystem/list", function(data){
        var appid = $("#appid");
        var option = $("<option>").text('请选择').val('0');
        appid.empty();
        appid.append(option);
        for(var i=0;i<data.length;i++) {
            var option = $("<option>").text(data[i].appname).val(data[i].id);
           
            appid.append(option);
        }
        
    },function(data){
    });
    //ajax.set(this.groupInfoData);
    ajax.start();
}

AppSystemDlg.changeAppSystem = function() {
	
	//提交信息
    var ajax = new $ax(Feng.ctxPath + "/appsystem/list", function(data){
        var appid = $("#appid");
        var option = $("<option>").text('请选择').val('0');
        appid.empty();
        appid.append(option);
        for(var i=0;i<data.length;i++) {
            var option = $("<option>").text(data[i].appname).val(data[i].id);
           
            appid.append(option);
        }
        
    },function(data){
    });
    //ajax.set(this.groupInfoData);
    ajax.start();
}


/**
 * 提交添加部门
 */
AppSystemDlg.addSubmit = function() {

    this.clearData();
    this.collectData();

    if (!this.validate()) {
        return;
    }

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/appsystem/add", function(data){
        Feng.success("添加成功!");
        window.parent.AppSystem.table.refresh();
        AppSystemDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.appSystemData);
    ajax.start();
}

/**
 * 提交修改
 */
AppSystemDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    if (!this.validate()) {
        return;
    }

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/appsystem/update", function(data){
        Feng.success("修改成功!");
        window.parent.AppSystem.table.refresh();
        AppSystemDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.appSystemData);
    ajax.start();
}
