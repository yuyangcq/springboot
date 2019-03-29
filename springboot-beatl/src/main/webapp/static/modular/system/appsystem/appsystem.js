/**
 * 管理初始化
 */
var AppSystem = {
    id: "AppSystemTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
AppSystem.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
        {title: 'id', field: 'id', visible: false, align: 'center', valign: 'middle',width:'50px'},
        {title: '系统名称', field: 'appname', align: 'center', valign: 'middle', sortable: true},
        {title: '系统编码', field: 'appcode', align: 'center', valign: 'middle', sortable: true},
        {title: '备注', field: 'remark', align: 'center', valign: 'middle', sortable: true}];
};

/**
 * 检查是否选中
 */
AppSystem.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
    	AppSystem.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加
 */
AppSystem.openAddAppSystem = function () {
    var index = layer.open({
        type: 2,
        title: '添加应用管理',
        area: ['800px', '460px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/appsystem/appsystem_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看详情
 */
AppSystem.openAppSystemDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '应用管理详情',
            area: ['800px', '460px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/appsystem/appsystem_update/' + AppSystem.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除
 */
AppSystem.delete = function () {
    if (this.check()) {

        var operation = function(){
            var ajax = new $ax(Feng.ctxPath + "/appsystem/delete", function () {
                Feng.success("删除成功!");
                AppSystem.table.refresh();
            }, function (data) {
                Feng.error("删除失败!" + data.responseJSON.message + "!");
            });
            ajax.set("appsystemId",AppSystem.seItem.id);
            ajax.start();
        };

        Feng.confirm("是否刪除该配置?", operation);
    }
};

/**
 * 查询列表
 */
AppSystem.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    AppSystem.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = AppSystem.initColumn();
    var table = new BSTable(AppSystem.id, "/appsystem/list", defaultColunms);
    table.setPaginationType("client");
    AppSystem.table = table.init();   
});
