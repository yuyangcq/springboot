var Detail = {
    id: "DetailTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

Detail.initColumn = function () {
    return [
        {title: '证券账户', field: 'securities_account', align: 'center', valign: 'middle', sortable: true},
        {title: '开通日期', field: 'open_date', align: 'center', valign: 'middle', sortable: true},
        {title: '错误类型', field: 'error_type', align: 'center', valign: 'middle', sortable: true},
    ]
};


$(function () {
    var fileName = $('#fileName').val() || "";
    var defaultColumns = Detail.initColumn();
    var table = new BSTable(Detail.id, '/ganggutong/detail_query', defaultColumns);
    table.setPaginationType("client");
    table.setQueryParams({
        fileName: fileName
    });
    Detail.table = table.init();
});