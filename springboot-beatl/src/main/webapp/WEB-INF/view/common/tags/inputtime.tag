@/*
表单中input框标签中各个参数的说明:

hidden : input hidden框的id
id : input框id
name : input框名称
readonly : readonly属性
clickFun : 点击事件的方法名
style : 附加的css属性
isTime : 是否是日期时间格式
pattern : 日期的格式
@*/
@if(isEmpty(isTime)){
@ isTime = false;
@}
<div class="form-group" id="${id}Div">
    <label class="col-sm-${width!'4'} control-label">${name}</label>
    <div class="col-sm-${width!'8'}">
        <input class="form-control" id="${id}" name="${id}"
               @if(isNotEmpty(value)){
               value="${tool.dateType(value)}"
               @}
               @if(isNotEmpty(type)){
               type="${type}"
               @}else{
               type="text"
               @}
               @if(isNotEmpty(readonly)){
               readonly="${readonly}"
               @}
               @if(isNotEmpty(style)){
               style="${style}"
               @}
               @if(isNotEmpty(disabled)){
               disabled="${disabled}"
               @}
               @if(isNotEmpty(placeholder)){
               placeholder="${placeholder}"
               @}
        >
        @if(isNotEmpty(hidden)){
        <input class="form-control" type="hidden" id="${hidden}" value="${hiddenValue!}">
        @}
        @if(isNotEmpty(selectFlag)){
        <div id="${selectId}" style="display: none; position: absolute; z-index: 200;">
            <ul id="${selectTreeId}" class="ztree tree-box" style="${selectStyle!}"></ul>
        </div>
        @}
    </div>
</div>
@if(isNotEmpty(underline) && underline == 'true'){
<div class="hr-line-dashed"></div>
@}
<script type="text/javascript">
    $(function () {
        laydate.render({
            elem: '#${id!}'
            , done: function () {
                ${done!};
            }
            , theme: 'molv'
        });
    });
</script>