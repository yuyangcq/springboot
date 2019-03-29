/**
 * 初始化表格
 */
var YlResult = {
    id: "QueryResultTable",//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1,
    resultObj: {},
    showObj: {}
};

/**
 * 初始化表格的列
 */
YlResult.initColumn = function () {
    return [
        {field: '', field: 'icon', align: 'center', valign: 'middle', width: 30 ,formatter: function (value) {
                if (value === undefined) return;
                if (value === 'success') return '<img src='+Feng.ctxPath+'/static/img/success.png>';
                if (value === 'error') return '<img src='+Feng.ctxPath+'/static/img/error.png>';
                if (value === 'alert') return '<img src='+Feng.ctxPath+'/static/img/alert.png>';
            }},
        {title: '项目名称', field: 'name', align: 'center', valign: 'middle', sortable: true, width: 100},
        {title: '结果说明', field: 'showresult', align: 'center', valign: 'middle', sortable: true, width: 100,formatter: function (value) {
                if (value === undefined) return;
                if (value === 0) return '正确';
                if (value === 1) return '错误';
                if (value === 2) return '警告';
            }},
        {title: '状态', field: 'isensure', align: 'center', valign: 'middle', sortable: true, width: 60,formatter: function (value) {
                if (value === undefined) return;
                if (value === 0) return '未确认';
                if (value === 1) return '已确认';
            }},
        {title: '详情', field: 'content', align: 'center', valign: 'middle', sortable: true, width: 150},
        {title: '检查人员', field: 'createby', align: 'center', valign: 'middle', sortable: true, width: 150},
        {title: '备注', field: 'remark', align: 'center', valign: 'middle', sortable: true, width: 150},
        {title: '操作', field: 'fid', align: 'center', valign: 'middle', sortable: true, width: 90,formatter: operateFormatter1}
    ];
};

function operateFormatter1 (value, row, index) {

    var id = value;
    var result = "";
   debugger;
   if(row.content.indexOf("单户") == -1) {
       result += "<a onclick=\"YlResult.openResultDetail('" + id + "')\" title='查看'>点击查看</a>";
   }
    return result;
}

/**
 * 打开查看结果详情
 */
YlResult.openResultDetail = function (id) {

    var index = layer.open({
        type: 2,
        title: '详情',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/bankcheck/detail/' + id
    });
    YlResult.layerIndex = index;
    layer.full(index);
};

/**
 * 检查是否选中
 */
YlResult.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if (selected.length === 0) {
        Feng.info("请先选中表格中的某一记录！");
        return false;
    } else if (selected.length > 1) {
        Feng.info("只能选中某一条记录再进行操作！");
        return false;
    }
    else {
        YlResult.seItem = selected[0];
        return true;
    }
};

// YlResult.search = function () {
//     debugger;
//     var queryData = {};
//     queryData['name'] = $("#name").val();
//     YlResult.table.refresh({query: queryData});
// };
YlResult.search = function () {
    var date = $("#bussdate").val();

    if(date==undefined||date=="") {
        Feng.error("请先选择查询日期！");
    }else {
        var gp1 = document.getElementsByName("gp1");

        var showresult = '';
        if (gp1[0].checked == true && gp1[1].checked == true && gp1[2].checked == true) {
            showresult = '3';
        } else {
            if (gp1[0].checked == true) {
                showresult += "0,";
            }
            if (gp1[1].checked == true) {
                showresult += "1,";
            }
            if (gp1[2].checked == true) {
                showresult += "2,";
            }
        }

        var queryData = {};
        //queryData['batchno'] = $("#batchno").val();
        //queryData['type'] = $("#type").val();
        queryData['date'] = $("#bussdate").val();
        queryData['showresult'] = showresult;
        YlResult.table.refresh({query: queryData});
        YlResult.count($("#type").val());;
    }
};

/**
 * 关闭此对话框
 */
YlResult.close = function() {
    parent.layer.close(window.parent.YlResult.layerIndex);
}

/**
 * 计算结果数量
 */
YlResult.count=function(type){

    var ajax = new $ax(Feng.ctxPath + '/resultquery/countresultnumber', function (data) {

        debugger;
        if(data.success){
            $("#v1_success").text("正确("+data.success+")条");
        }else{
            $("#v1_success").text("正确(0)条");
        }
        if(data.error){
            $("#v1_error").text("错误("+data.error+")条");
        }else{
            $("#v1_error").text("错误(0)条");
        }
        if(data.alert){
            $("#v1_alert").text("警告("+data.alert+")条");
        }else{
            $("#v1_alert").text("警告(0)条");
        }

    });
    ajax.set("type", type);
    ajax.set("date", $("#bussdate").val());
    ajax.set("resulttype",0);
    ajax.start();

}

function changeGp1(){
    YlResult.search();
}

$(function () {

    var showresult="3";
    var stype=document.getElementById("type");
    stype.value="0";
    var gp1=document.getElementsByName("gp1");
    for(var i=0;i<gp1.length;i++){
        gp1[i].checked=true;
    }
    var defaultColumns = YlResult.initColumn();
    var table = new BSTable(YlResult.id, "/resultquery/list", defaultColumns);
    //var stype = $("#type").val();
    var date = $("#bussdate").val();
    //table.setQueryParams({type:"0",showresult:showresult});
    table.setQueryParams({date:date});
    table.setPaginationType("client");
    YlResult.table = table.init();
    YlResult.count(stype.value);
    $("#bussdate").val("");
});