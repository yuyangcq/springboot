/**
 * 初始化表格
 */
var YlContent = {
    id: "YlContentTable",//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1,
    resultObj: {},
    showObj: {}
};

/**
 * 初始化表格的列
 */
YlContent.initColumn = function () {
    return [
        {title: '银行名称', field: 'name', align: 'center', valign: 'middle', sortable: true, width: 30 },
        {title: '银行确认数值', field: 'banksum', align: 'center', valign: 'middle', sortable: true, width: 50},
        {title: '法人清算变动净值数据', field: 'qssum', align: 'center', valign: 'middle', sortable: true, width: 50},
        {title: '核对结果', field: 'jdsum', align: 'center', valign: 'middle', sortable: true, width: 50},
        {title: '港股通金额', field: 'ggsum', align: 'center', valign: 'middle', sortable: true, width: 50},
        {title: '最终差异原因备注', field: 'cysum', align: 'center', valign: 'middle', sortable: true, width: 50}
    ];
};

YlContent.initColumn1 = function () {
    return [
        {title: '恒生融资借款', field: 'hsrzjksum', align: 'center', valign: 'middle', sortable: true, width: 30 },
        {title: '新意融资借款', field: 'xyrzjksum', align: 'center', valign: 'middle', sortable: true, width: 50},
        {title: '融资借款校对结果', field: 'rzjkcysum', align: 'center', valign: 'middle', sortable: true, width: 50},
        {title: '恒生融资还款', field: 'hsrzhksum', align: 'center', valign: 'middle', sortable: true, width: 50},
        {title: '新意融资还款', field: 'xyrzhksum', align: 'center', valign: 'middle', sortable: true, width: 50},
        {title: '融资还款校对结果', field: 'rzhkcysum', align: 'center', valign: 'middle', sortable: true, width: 50}
    ];
};



$(function () {
	debugger;
	var id=$("#id").val();
	var type=$("#type").val();
	if(type!='3'){
       var defaultColumns = YlContent.initColumn();
       var table = new BSTable(YlContent.id, "/bankcheck/detail/list", defaultColumns);
       table.setQueryParams({id:id});
       table.setPaginationType("client");
       YlContent.table = table.init();
	}else if(type=='3'){
		 var defaultColumns = YlContent.initColumn1();
	       var table = new BSTable(YlContent.id, "/bankcheck/detail/list", defaultColumns);
	       table.setQueryParams({id:id});
	       table.setPaginationType("client");
	       YlContent.table = table.init();
	}
});




