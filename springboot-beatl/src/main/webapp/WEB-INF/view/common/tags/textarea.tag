@/*
表单中input框标签中各个参数的说明:

hidden : input hidden框的id
id : input框id
name : input框名称
readonly : readonly属性
clickFun : 点击事件的方法名
style : 附加的css属性
@*/
<div class="form-group" id="${id}Div">
    <label class="col-sm-2 control-label">${name!}</label>
    <div class="col-sm-10">
        <textarea class="form-control" id="${id}" name="${id}" rows="2">${value!}</textarea>
    </div>
</div>
@if(isNotEmpty(underline) && underline == 'true'){
<div class="hr-line-dashed"></div>
@}