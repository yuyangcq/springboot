/**
 * 初始化表格
 */
var YlResult1 = {
    id: "YlResultTable1",//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1,
    resultObj: {},
    showObj: {}
};

/**
 * 初始化表格的列
 */
YlResult1.initColumn = function () {
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
        {title: '详情', field: 'content', align: 'center', valign: 'middle', sortable: true, width: 150},
        {title: '操作', field: 'fid', align: 'center', valign: 'middle', sortable: true, width: 150,formatter: operateFormatter1}
    ];
};

function operateFormatter1 (value, row, index) {
    var id = value;
    var result = "";
    result += "<a onclick=\"YlResult1.openResultDetail('" + id + "')\" title='查看'>详情</a>";
    return result;
}


/**
 * 打开查看结果详情
 */
YlResult1.openResultDetail = function (id) {
        var index = layer.open({
            type: 2,
            title: '详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/bankcheck/detail/' + id
        });
        YlResult1.layerIndex = index;
        layer.full(index);
};





/**
 * 打开核对详情对话框
 */
YlResult1.openDetail = function () {
	
	if(!$("#type").val()||$("#type").val()==''){
		Feng.error("请勾选核对文件类型!");
		return;
	}
	if(!$("#bussdate").val()||$("#bussdate").val()==''){
		Feng.error("请选择核对的日期!");
		return;
	}
	
	var index = layer.open({
			  type: 1,
			  skin: 'layui-layer-rim', //加上边框
			  area: ['420px', '260px'], //宽高
			  content: '<div class="ibox float-e-margins"><div class="ibox-content"><div class="form-horizontal" id="deptInfoForm"><div class="row"><div class="col-sm-12 b-r">'+
			  '<label class="control-label">建行结息</label><input class="form-control" id="interest_settle" name="interest_settle"/>'+
			  '<label class="control-label">信用建行结息</label><input class="form-control" id="xy_interest_settle" name="xy_interest_settle"/></div></div>'+
			  '<div class="row btn-group-m-t"><div class="col-sm-10"><button type="button" class="btn btn-button info" name="提交" id="ensure" onclick="YlResult1.bankcheck()"><i class="fa fa-check"></i>&nbsp;提交</button>'+
			  '<button type="button" class="btn btn-button info" name="取消" id="cancel" onclick="YlResult1.closeDialog()"><i class="fa fa-eraser"></i>&nbsp;取消</button></div></div>'
		  });
	YlResult1.layerIndex=index;
};


YlResult1.closeDialog= function(){
	layer.close(YlResult1.layerIndex);
}

function isNumber(val){

    var regPos = /^\d+(\.\d+)?$/; //非负浮点数
    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
    if(regPos.test(val) || regNeg.test(val)){
        return true;
    }else{
        return false;
    }

}


/**
 * 核对
 */
YlResult1.bankcheck = function () {

	
	if(!$("#interest_settle").val()||$("#interest_settle").val()==''){
		Feng.error("请输入建行结息!");
		return;
	}
	if(!$("#xy_interest_settle").val()||$("#xy_interest_settle").val()==''){
		Feng.error("请输入信用建行结息!");
		return;
	}
	
	if(!isNumber($("#interest_settle").val())){
		Feng.error("建行结息不是数字!");
		return;
	}
	
	if(!isNumber($("#xy_interest_settle").val())){
		Feng.error("信用建行结息不是数字!");
		return;
	}

	layer.close(YlResult1.layerIndex);
	layer.load(2);
	setTimeout(function () {
        //判断是否有修改或审批权限
        var ajax = new $ax(Feng.ctxPath + '/bankcheck/bankcheck', function (data) {
        	layer.closeAll("loading")
            if (data.code === 200) {
                Feng.success("核对完成!");
            } else {
                if (data.hasOwnProperty("message")) {
                    Feng.error(data.message + "!");
                } else {
                    Feng.error("核对失败！");
                }
            }
            YlResult1.search();
        }, function (data) {
            layer.closeAll("loading")
            if (data.hasOwnProperty("responseJSON")) {
                if (data.responseJSON.hasOwnProperty("message")) {
                    Feng.error(data.responseJSON.message + "!");
                }
            }
            YlResult1.search();
        });
        ajax.set("date", $("#bussdate").val());
        ajax.set("type",$("#type").val());
        ajax.set("interest_settle",$("#interest_settle").val());
        ajax.set("xy_interest_settle",$("#xy_interest_settle").val());
        ajax.start();
    },100)
};


YlResult1.search = function () {
	var gp2=document.getElementsByName("gp2");
	
	var showresult='';
	if(gp2[0].checked==true&&gp2[1].checked==true&&gp2[2].checked==true){
		showresult='3';
	}else {
		if(gp2[0].checked==true){
		   showresult+="0,";
		}
		if(gp2[1].checked==true){
	       showresult+="1,";
	    }
	    if(gp2[2].checked==true){
		   showresult+="2,";
	    }
	}

    var queryData = {};
    queryData['type'] =  $("#type").val();
    queryData['date'] =  $("#bussdate").val();
    queryData['showresult'] =  showresult;
    YlResult1.table.refresh({query: queryData});
    YlResult1.count($("#type").val());
};


/**
 * 计算结果数量
 */
YlResult1.count=function(type){
	
    var ajax = new $ax(Feng.ctxPath + '/bankcheck/count', function (data) {

    	    if(data.success){
    		   $("#v2_success").text("正确("+data.success+")条");
    	    }else{
    	       $("#v2_success").text("正确(0)条");
    	    }
    	    if(data.error){
    		   $("#v2_error").text("错误("+data.error+")条");
    	    }else{
    	       $("#v2_error").text("错误(0)条");	
    	    }
    	    if(data.alert){
    		   $("#v2_alert").text("警告("+data.alert+")条");
    	    }else{
    	    	$("#v2_alert").text("警告(0)条");
    	    }
        
    });
    ajax.set("type", type);
    ajax.set("date", $("#bussdate").val());
    ajax.set("resulttype",1);
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
    var defaultColumns = YlResult1.initColumn();
    var table = new BSTable(YlResult1.id, "/bankcheck/list1", defaultColumns);
    table.setQueryParams({type:stype.value,date:bussdate,showresult:showresult});
    table.setPaginationType("client");
    YlResult1.table = table.init();
    YlResult1.count(stype.value);
});