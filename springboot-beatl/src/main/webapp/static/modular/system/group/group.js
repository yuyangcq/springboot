/**
 * 组管理初始化
 */
var Group = {
    id: "GroupTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
Group.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
        {title: 'id', field: 'id', align: 'center', valign: 'middle',width:'50px'},
        {title: '组简称', field: 'simplename', align: 'center', valign: 'middle', sortable: true},
        {title: '组全称', field: 'fullname', align: 'center', valign: 'middle', sortable: true},
        {title: '排序', field: 'num', align: 'center', valign: 'middle', sortable: true},
        {title: '备注', field: 'tips', align: 'center', valign: 'middle', sortable: true}];
};

/**
 * 检查是否选中
 */
Group.check = function () {
    var selected = $('#' + this.id).bootstrapTreeTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
    	Group.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加组
 */
Group.openAddGroup = function () {
    var index = layer.open({
        type: 2,
        title: '添加组',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/group/group_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看组详情
 */
Group.openGroupDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '组详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/group/group_update/' + Group.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除组
 */
Group.delete = function () {
    if (this.check()) {

        var operation = function(){
            var ajax = new $ax(Feng.ctxPath + "/group/delete", function () {
                Feng.success("删除成功!");
                Group.table.refresh();
            }, function (data) {
                Feng.error("删除失败!" + data.responseJSON.message + "!");
            });
            ajax.set("groupId",Group.seItem.id);
            ajax.start();
        };

        Feng.confirm("是否刪除该组?", operation);
    }
};

/**
 * 查询部门列表
 */
Group.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    Group.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = Group.initColumn();
    var table = new BSTreeTable(Group.id, "/group/list", defaultColunms);
    table.setExpandColumn(2);
    table.setIdField("id");
    table.setCodeField("id");
    table.setParentCodeField("pid");
    table.setExpandAll(true);
    table.init();
    Group.table = table;
});
