@/*
时间查询条件标签的参数说明:

name : 查询条件的名称
id : 查询内容的input框id
isTime : 日期是否带有小时和分钟(true/false)
pattern : 日期的正则表达式(例如:"YYYY-MM-DD")
@*/
@if(isEmpty(value)){
@ inputValue = "";
@}else{
@ inputValue = value;
@}
@if(isEmpty(isTime)){
@ isTime = "false";
@}
@if(isEmpty(pattern)){
@ pattern = "YYYY-MM-DD";
@}
@if(isEmpty(choose)){
@ choose = "null";
@}
<span><label for="">${name}
@if(isNotEmpty(em)){
   <em class="star">*</em>
@}
</label><span>
        <input class="form-control" id="${id!}" name="${id!}" value="${inputValue!}" placeholder="${placeholder!}">
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
</span></span>