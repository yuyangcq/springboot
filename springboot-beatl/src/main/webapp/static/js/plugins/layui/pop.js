/*
files by hibiscus_xuan
*/
var principal='<div class="principal">' +
    '    <div class="content_top clearfix">' +
    '        <ul class="clearfix"></ul>' +
    '        <span class="search"><input type="text"> <span class="search_icon"><img src="/static/js/plugins/layui/pop/search_icon.jpg" alt=""></span></span>' +
    '    </div>' +
    '    <div class="content">' +
    '        <ul></ul>' +
    '    </div>' +
    '    <div class="submit">' +
    '        <button style="background-color: #558ed5;" class="sure">确认</button>' +
    '        <button style="background-color: #b2b2b2;" class="cancel">取消</button>' +
    '    </div>' +
    '</div>';

//费用项设置
var cost_set ='<div class="cost_set">' +
    '<ul>' +
    '   <li><label for="">费用项</label><select class="first"><option value="管理费" onclick="change()">管理费</option><option value="托管费" onclick="change()">托管费</option><option value="服务费" onclick="change()">服务费</option><option value="其他" onclick="change()">其他</option></select></li>' +
    '   <li class="sel_type"><label for="">计算类型</label><input type="checkbox" class="checkbox" >固定金额<input type="checkbox" class="checkbox" >年费用率<input type="checkbox" class="checkbox" >总费率</li>' +
    '   <li><label for="">固定金额</label><input type="text" class="sel1"><label for="">比例</label><input type="text" class="sel2"></li>' +
    '   <li><label for="">规模</label><select name="" class="sel3"><option value="规模一">规模一</option><option value="规模二">规模二</option><option value="规模三">规模三</option><option value="规模四">规模四</option></select><label for="">计算基数</label><select name="" class="sel4"><option value="规模一">360天</option><option value="规模二">180天</option><option value="规模三">120天</option><option value="规模四">90天</option></select></li>' +
    '   <li><label for="">账户户名</label><select name="" style="width: 55%"><option value="户名一">户名一</option><option value="户名二">户名二</option><option value="户名三">户名三</option><option value="户名四">户名四</option></select></li>' +
    '   <li><label for="">账户账号</label><select name="" style="width: 55%"><option value="户名一">户名一</option><option value="户名二">户名二</option><option value="户名三">户名三</option><option value="户名四">户名四</option></select></li>' +
    '   <li><label for="">账户开户号</label><select name="" style="width: 55%"><option value="户名一">户名一</option><option value="户名二">户名二</option><option value="户名三">户名三</option><option value="户名四">户名四</option></select></li>' +
    '   <li style="text-align: center"> <button style="background-color: #558ed5">确认</button><button>取消</button></li>' +
    '</ul>' +
    '</div>';
//还息日期
var calendar='<div class="calendar_box">' +
'<div class="content_top clearfix">' +
'<ul class="clearfix"></ul>'+
'</div>' +
'<div class="content">' +
'<div id="ca"></div>' +
'</div>' +
'<div class="submit">' +
'<button style="background-color: #558ed5;" class="sure">确认</button>' +
'<button style="background-color: #b2b2b2;" class="cancel">取消</button>' +
'</div>' +
'</div>';
