/**
 * 初始化表格
 */
var YlResult = {
    id: "YlResultTable",//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1,
    resultObj: {},
    showObj: {},
    bussDateValue: "",
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
        {title: '详情', field: 'content', align: 'center', valign: 'middle', sortable: true, width: 150}
    ];
};

/**
 * 下载核对文件
 */
YlResult.download = function(){
	
	if(!$("#bussdate").val()||$("#bussdate").val()==''){
		Feng.error("请选择核对的日期!");
		return;
	}
     // YlResult.progress();
    layer.load(2);
	//开始下载文件
	 setTimeout(function () {
		try{
	        var ajax = new $ax(Feng.ctxPath + '/bankcheck/download', function (data) {
	            debugger;
	            if (data.code === 200) {
	                Feng.success("文件下载成功!");
	                layer.closeAll('loading');
	            } else {
	                Feng.error("下载文件失败!");
	                layer.closeAll('loading');
	            }
	
	        },function(data){
	        	debugger;
	        	
	                Feng.error("下载文件失败!");
	                layer.closeAll('loading');
	            
	        });
	        ajax.set("date", $("#bussdate").val());
	        ajax.start();
		}catch(e){
			Feng.error("下载文件失败!");
            layer.closeAll('loading');
		}
    },1000);


}
YlResult.sendAjax = function(){
/*    $.ajax({
        type:"post",
        url:Feng.ctxPath + '/bankcheck/download',
        data:{"data":sessionStorage.getItem("bussdate")},
        success: function () {
            Feng.success("文件下载成功!");
            YlResult.close();
        },
        error: function () {
            Feng.error("下载文件失败!");
            YlResult.close();
        }
    })*/
/*    var ajax = new $ax(Feng.ctxPath + '/bankcheck/download', function (data) {

        if (data.code === 200) {
            Feng.success("文件下载成功!");
            YlResult.close();
        } else {
            Feng.error("下载文件失败!");
            YlResult.close();
        }

    });
    ajax.set("date", sessionStorage.getItem("bussdate"));
    ajax.start()*/;
}

/**
 * 下载文件进度条
 */
YlResult.progress = function(){
    var index = layer.open({
        type: 1,
        title: '',
        area: ['140px', '128px'], //宽高
        fix: false, //不固定
        maxmin: false,
		closeBtn: 0,
		content:'<div class="graph"><img src='+Feng.ctxPath+'/static/img/loading.gif></div>'
         //content: Feng.ctxPath + '/bankcheck/jumptodownload'
    });
    this.layerIndex = index;
}
/**
 * 关闭弹框
 */
YlResult.close = function() {
    parent.layer.close(window.parent.YlResult.layerIndex);
}
/**
 * 修改下载是否状态
 */
YlResult.changeStatus = function(){
    window.isStartDownload = true;
}
/**
 * 打开核对详情对话框
 */
YlResult.openDetail = function () {
	if(!$("#type").val()||$("#type").val()==''){
		Feng.error("请勾选核对文件类型!");
		return;
	}
	if(!$("#bussdate").val()||$("#bussdate").val()==''){
		Feng.error("请选择核对的日期!");
		return;
	}
	
	
		layer.open({
		    content: '您确定要重新检查吗？点击检查后上次结果将消失'
		    ,btn: ['检查', '放弃']
		    ,yes: function(index){
		    	layer.close(index);
		    	YlResult.check();		    	
		    }
		    ,no: function(index){
		       layer.close(index);
		    }
		  });
};

/**
 * 搜索
 */
YlResult.search = function () {
	var gp1=document.getElementsByName("gp1");
	
	var showresult='';
	if(gp1[0].checked==true&&gp1[1].checked==true&&gp1[2].checked==true){
		showresult='3';
	}else {
		if(gp1[0].checked==true){
		   showresult+="0,";
		}
		if(gp1[1].checked==true){
	       showresult+="1,";
	    }
	    if(gp1[2].checked==true){
		   showresult+="2,";
	    }
	}

    var queryData = {};
    queryData['type'] =  $("#type").val();
    queryData['date'] =  $("#bussdate").val();
    queryData['showresult'] =  showresult;
    YlResult.table.refresh({query: queryData});
    YlResult.count($("#type").val());;
};


/**
 * 单步文件核对
 */
YlResult.check = function () {

    // var index = layer.load(1, {
  	//    shade: [0.1,'#fff'] //0.1透明度的白色背景
    // });
    layer.load(2);
    //判断是否有修改或审批权限
	setTimeout(function () {
        var ajax = new $ax(Feng.ctxPath + '/bankcheck/check', function (data) {
            layer.closeAll("loading");
            if (data.code === 200) {
                Feng.success("核对完成!");
            } else {
                if (data.hasOwnProperty("message")) {
                    Feng.error(data.message + "!");
                } else {
                    Feng.error("核对失败！");
                }
            }
            YlResult.search();

        }, function (data) {
            layer.closeAll("loading");
            layer.close(index);
            if (data.hasOwnProperty("responseJSON")) {
                if (data.responseJSON.hasOwnProperty("message")) {
                    Feng.error(data.responseJSON.message + "!");
                }
            }
            YlResult.search();

        });
        ajax.set("type", $("#type").val());
        ajax.set("date", $("#bussdate").val());
        ajax.start();
    },1000)

};

/**
 * 计算结果数量
 */
YlResult.count=function(type){
	
    var ajax = new $ax(Feng.ctxPath + '/bankcheck/count', function (data) {

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

    var defaultColumns = YlResult.initColumn();
    var bussdate=$("#bussdate").val();
    var table = new BSTable(YlResult.id, "/bankcheck/list", defaultColumns);
    //var stype = $("#type").val();
    table.setQueryParams({type:stype.value,date:bussdate,showresult:showresult});
    table.setPaginationType("client");
    YlResult.table = table.init();
    YlResult.count(stype.value);
});