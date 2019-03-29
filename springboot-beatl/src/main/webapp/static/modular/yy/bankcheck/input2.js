/**
 * 初始化组详情对话框
 */
var YlResultInfoDlg = {
    ylResultInfoData : {},
    validateFields: {
    	showresult: {
            validators: {
                notEmpty: {
                    message: '结果不能为空'
                }
            }
        }
    }
};

/**
 * 清除数据
 */
YlResultInfoDlg.clearData = function() {
    this.ylResultInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
YlResultInfoDlg.set = function(key, val) {
    this.ylResultInfoData[key] = (typeof value == "undefined") ? $("#" + key).val() : value;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
YlResultInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
YlResultInfoDlg.close = function() {
    parent.layer.close(window.parent.YlResult2.layerIndex);
}



/**
 * 收集数据
 */
YlResultInfoDlg.collectData = function() {
    this.set('id').set('showresult').set('remark');
}

/**
 * 验证数据是否为空
 */
YlResultInfoDlg.validate = function () {
    $('#ylResultInfoForm').data("bootstrapValidator").resetForm();
    $('#ylResultInfoForm').bootstrapValidator('validate');
    return $("#ylResultInfoForm").data('bootstrapValidator').isValid();
}

/**
 * 提交添加部门
 */
YlResultInfoDlg.addSubmit = function() {
    debugger;
    this.clearData();
    this.collectData();

    //if (!this.validate()) {
    //    return;
    //}

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/bankcheck/ensureresult", function(data){
        Feng.success("修改成功!");
        window.parent.YlResult2.table.refresh();
        YlResultInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    debugger;
    ajax.set("id", this.ylResultInfoData['id']);
    ajax.set("showresult", this.ylResultInfoData['showresult']);
    ajax.set("remark", this.ylResultInfoData['remark']);
    ajax.start();
}


$(function() {
    Feng.initValidator("ylResultInfoForm", YlResultInfoDlg.validateFields);
    $("#showresult").find("option[value='"+document.getElementById('showresultid').value+"']").attr("selected",true);
});
