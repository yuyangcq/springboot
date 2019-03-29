$(function() {
    var stype=document.getElementById("type");
    stype.value="0";
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
    layui.use('element', function(){
        var element = layui.element;

        //一些事件监听
        element.on('tab(demo)', function(data){
            console.log(data);
        });
    });
    // 日期格式化
    // Date.prototype.pattern=function(fmt) {
    //     var o = {
    //         "M+" : this.getMonth()+1, //月份
    //         "d+" : this.getDate(), //日
    //         "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时
    //         "H+" : this.getHours(), //小时
    //         "m+" : this.getMinutes(), //分
    //         "s+" : this.getSeconds(), //秒
    //         "q+" : Math.floor((this.getMonth()+3)/3), //季度
    //         "S" : this.getMilliseconds() //毫秒
    //     };
    //     var week = {
    //         "0" : "/u65e5",
    //         "1" : "/u4e00",
    //         "2" : "/u4e8c",
    //         "3" : "/u4e09",
    //         "4" : "/u56db",
    //         "5" : "/u4e94",
    //         "6" : "/u516d"
    //     };
    //     if(/(y+)/.test(fmt)){
    //         fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    //     }
    //     if(/(E+)/.test(fmt)){
    //         fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);
    //     }
    //     for(var k in o){
    //         if(new RegExp("("+ k +")").test(fmt)){
    //             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    //         }
    //     }
    //     return fmt;
    // }
    // var newDate = (new Date()).pattern("yyyy-MM-dd");
    // $("#bussdate").val(newDate);
});

function changeAll(){
    var seach=document.getElementsByName("each");

    var sall=document.getElementById("all");
    var stype=document.getElementById("type");
    //stype.value="0";
    for(var i=0;i<seach.length;i++){
        seach[i].checked=sall.checked;
    }
    if(sall.checked){
        stype.value="0";
    }else{
        stype.value="";
    }
    YlResult.search();
    YlResult1.search();
    YlResult2.search();
}
function change(){
    var sall=document.getElementById("all");

    var stype=document.getElementById("type");
    stype.value="";
    var seach=document.getElementsByName("each");
    var flag=true;
    for(var i=0;i<seach.length;i++){
        flag=(flag&&seach[i].checked);
        if(seach[i].checked){
            stype.value+=seach[i].value+",";
        }
    }
    if(flag){
        sall.checked=true;
        stype.value="0";
    }else{
        sall.checked=false;
    }

    debugger;
    YlResult.search();
    YlResult1.search();
    YlResult2.search();

}
function changeGp1(){
    YlResult.search();
}
function changeGp2(){
    YlResult1.search();
}
function changeGp3(){
    YlResult2.search();
}
function stepOne() {
    document.getElementById("step2").click();
    $(".stepBox").find(".step2").css("display","block");
    $(".stepBox").find(".step1,.step3").css("display","none");
}
function stepTwo(obj) {
    if($(obj).attr("button_type") == "next"){
        document.getElementById("step3").click();
        $(".stepBox").find(".step3").css("display","block");
        $(".stepBox").find(".step1,.step2").css("display","none");
    }else {
        document.getElementById("step1").click();
        $(".stepBox").find(".step1").css("display","block");
        $(".stepBox").find(".step2,.step3").css("display","none");
    }
}
function stepThree() {
    document.getElementById("step2").click();
    $(".stepBox").find(".step2").css("display","block");
    $(".stepBox").find(".step1,.step3").css("display","none");
}