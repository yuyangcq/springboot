/**
 * 初始化表格
 */
var YlResult2 = {
    id: "YlResultTable2",//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1,
    resultObj: {},
    showObj: {}
};

/**
 * 初始化表格的列
 */
YlResult2.initColumn = function () {
    return [
        {field: '', field: 'icon', align: 'center', valign: 'middle', width: 30,formatter: function (value) {
            if (value === undefined) return;
            if (value === 'success') return '<img src='+Feng.ctxPath +'/static/img/success.png>';
            if (value === 'error') return '<img src='+Feng.ctxPath +'/static/img/error.png>';
            if (value === 'alert') return '<img src='+Feng.ctxPath +'/static/img/alert.png>';
        }},
        {title: '项目名称', field: 'name', align: 'center', valign: 'middle', sortable: true, width: 100},
        {title: '结果说明', field: 'showresult', align: 'center', valign: 'middle', sortable: true, width: 100,formatter: function (value) {
            if (value === undefined) return;
            if (value === 0) return '正确';
            if (value === 1) return '错误';
            if (value === 2) return '警告';
        }},
        {title: '状态', field: 'isensure', align: 'center', valign: 'middle', sortable: true, width: 50,formatter: function (value) {
            if (value === undefined) return;
            if (value === 0) return '未确认';
            if (value === 1) return '已确认';
        }},
        {title: '详情', field: 'content', align: 'center', valign: 'middle', sortable: true, width: 150},
        {title: '备注', field: 'remark', align: 'center', valign: 'middle', sortable: true, width: 150},
        {title: '操作', field: 'fid', align: 'center', valign: 'middle', sortable: true, width: 50,formatter: operateFormatter}
    ];
};

function operateFormatter (value, row, index) {
    var id = value;
    var result = "";
    if(row.isensure==0){
       result += "<a onclick=\"YlResult2.openResultDetail('" + row.id + "')\" title='修改'>修改</a>";
    }
    return result;
}

YlResult2.openResultDetail = function (id) {
    var index = layer.open({
        type: 2,
        title: '确认结果',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: false,
        content: Feng.ctxPath + '/bankcheck/checkresult/' + id
    });
    this.layerIndex = index;
};


/**
 * 打开核对详情对话框
 */
YlResult2.openDetail = function () {

		layer.open({
		    content: '您确定要重新检查吗？点击确认后上次结果将消失'
		    ,btn: ['检查', '放弃']
		    ,yes: function(index){
		    	layer.close(index);
		    	layer.open({
				    content: '您确定要重置文件吗？点击确认后将重新下载银行流水文件'
				    ,btn: ['重置', '放弃']
				    ,yes: function(index){
				       //location.reload();
				       layer.close(index);
				       YlResult.check(true);
				    }
				    ,no: function(index){
				       layer.close(index);
				       YlResult.check(false);
				    }
				  });
		       
		       
		    }
		    ,no: function(index){
		       layer.close(index);
		    }
		  });
};



YlResult2.search = function () {
	var gp3=document.getElementsByName("gp3");
	
	var showresult='';
	if(gp3[0].checked==true&&gp3[1].checked==true&&gp3[2].checked==true){
		showresult='3';
	}else {
		if(gp3[0].checked==true){
		   showresult+="0,";
		}
		if(gp3[1].checked==true){
	       showresult+="1,";
	    }
	    if(gp3[2].checked==true){
		   showresult+="2,";
	    }
	}

    var queryData = {};
    queryData['type'] =  $("#type").val();
    queryData['date'] =  $("#bussdate").val();
    queryData['showresult'] =  showresult;
    debugger;
    YlResult2.table.refresh({query: queryData});
    YlResult2.count($("#type").val());
};


YlResult2.ensure=function(){
	
	if(!$("#bussdate").val()||$("#bussdate").val()==''){
		Feng.error("请选择核对的日期!");
		return;
	}
	var ajax = new $ax(Feng.ctxPath + "/bankcheck/ensureall", function(data){
        Feng.success("确认成功!");
        window.parent.YlResult2.table.refresh();
        YlResultInfoDlg.close();
    },function(data){
        Feng.error("确认失败!" + data.responseJSON.message + "!");
    });
	ajax.set("date", $("#bussdate").val());
    ajax.start();
    YlResult2.search();
   
};


/**
 * 计算结果数量
 */
YlResult2.count=function(type){
	
    var ajax = new $ax(Feng.ctxPath + '/bankcheck/count', function (data) {

    	    if(data.success){
    		   $("#v3_success").text("正确("+data.success+")条");
    	    }else{
    	       $("#v3_success").text("正确(0)条");
    	    }
    	    if(data.error){
    		   $("#v3_error").text("错误("+data.error+")条");
    	    }else{
    	       $("#v3_error").text("错误(0)条");	
    	    }
    	    if(data.alert){
    		   $("#v3_alert").text("警告("+data.alert+")条");
    	    }else{
    	    	$("#v3_alert").text("警告(0)条");
    	    }
        
    });
    ajax.set("type", type);
    ajax.set("date", $("#bussdate").val());
    ajax.set("resulttype",2);
    ajax.start();
	
}



$(function () {
	
	var stype=document.getElementById("type");
	var sall=document.getElementById("all");
	var seach=document.getElementsByName("each");
	for(var i=0;i<seach.length;i++){
		seach[i].checked=true;
	}
	stype.value="0";
	sall.checked=true;
	var showresult="3";
	var gp1=document.getElementsByName("gp1");
	var gp2=document.getElementsByName("gp2");
	var gp3=document.getElementsByName("gp3");
	for(var i=0;i<gp1.length;i++){
		gp1[i].checked=true;
	}
	for(var i=0;i<gp2.length;i++){
		gp2[i].checked=true;
	}
	for(var i=0;i<gp3.length;i++){
		gp3[i].checked=true;
	}
	
	var bussdate=$("#bussdate").val();
    var defaultColumns = YlResult2.initColumn();
    var table = new BSTable(YlResult2.id, "/bankcheck/list2", defaultColumns);
    table.setQueryParams({type:stype.value,date:bussdate,showresult:showresult});
    table.setPaginationType("client");
    YlResult2.table = table.init();
    YlResult2.count(stype.value);
});