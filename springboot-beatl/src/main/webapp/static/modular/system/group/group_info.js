/**
 * 初始化组详情对话框
 */
var GroupInfoDlg = {
    groupInfoData : {},
    zTreeInstance : null,
    validateFields: {
        simplename: {
            validators: {
                notEmpty: {
                    message: '组名称不能为空'
                }
            }
        },
        fullname: {
            validators: {
                notEmpty: {
                    message: '组全称不能为空'
                }
            }
        },
        pName: {
            validators: {
                notEmpty: {
                    message: '上级名称不能为空'
                }
            }
        }
    }
};

/**
 * 清除数据
 */
GroupInfoDlg.clearData = function() {
    this.groupInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
GroupInfoDlg.set = function(key, val) {
    this.groupInfoData[key] = (typeof value == "undefined") ? $("#" + key).val() : value;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
GroupInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
GroupInfoDlg.close = function() {
    parent.layer.close(window.parent.Group.layerIndex);
}

/**
 * 点击部门ztree列表的选项时
 *
 * @param e
 * @param treeId
 * @param treeNode
 * @returns
 */
GroupInfoDlg.onClickGroup = function(e, treeId, treeNode) {
    $("#pName").attr("value", GroupInfoDlg.zTreeInstance.getSelectedVal());
    $("#pid").attr("value", treeNode.id);
}

/**
 * 显示部门选择的树
 *
 * @returns
 */
GroupInfoDlg.showGroupSelectTree = function() {
    var pName = $("#pName");
    var pNameOffset = $("#pName").offset();
    $("#parentGroupMenu").css({
        left : pNameOffset.left + "px",
        top : pNameOffset.top + pName.outerHeight() + "px"
    }).slideDown("fast");

    $("body").bind("mousedown", onBodyDown);
}

/**
 * 隐藏部门选择的树
 */
GroupInfoDlg.hideGroupSelectTree = function() {
    $("#parentGroupMenu").fadeOut("fast");
    $("body").unbind("mousedown", onBodyDown);// mousedown当鼠标按下就可以触发，不用弹起
}

/**
 * 收集数据
 */
GroupInfoDlg.collectData = function() {
    this.set('id').set('simplename').set('fullname').set('tips').set('num').set('pid');
}

/**
 * 验证数据是否为空
 */
GroupInfoDlg.validate = function () {
    $('#groupInfoForm').data("bootstrapValidator").resetForm();
    $('#groupInfoForm').bootstrapValidator('validate');
    return $("#groupInfoForm").data('bootstrapValidator').isValid();
}

/**
 * 提交添加部门
 */
GroupInfoDlg.addSubmit = function() {
    debugger;
    this.clearData();
    this.collectData();

    if (!this.validate()) {
        return;
    }

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/group/add", function(data){
        Feng.success("添加成功!");
        window.parent.Group.table.refresh();
        GroupInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.groupInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
GroupInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    if (!this.validate()) {
        return;
    }

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/group/update", function(data){
        Feng.success("修改成功!");
        window.parent.Group.table.refresh();
        GroupInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.groupInfoData);
    ajax.start();
}

function onBodyDown(event) {
    if (!(event.target.id == "menuBtn" || event.target.id == "parentGroupMenu" || $(
            event.target).parents("#parentGroupMenu").length > 0)) {
    	GroupInfoDlg.hideGroupSelectTree();
    }
}

$(function() {
    Feng.initValidator("groupInfoForm", GroupInfoDlg.validateFields);

    var ztree = new $ZTree("parentGroupMenuTree", "/group/tree");
    ztree.bindOnClick(GroupInfoDlg.onClickGroup);
    ztree.init();
    GroupInfoDlg.zTreeInstance = ztree;
});
