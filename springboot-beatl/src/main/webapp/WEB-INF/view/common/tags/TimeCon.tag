@/*
时间查询条件标签的参数说明:

name : 查询条件的名称
id : 查询内容的input框id
isTime : 日期是否带有小时和分钟(true/false)
pattern : 日期的正则表达式(例如:"YYYY-MM-DD")
@*/
<div class="input-group">
    <div class="input-group-btn">
        <button data-toggle="dropdown" class="btn btn-white dropdown-toggle" type="button">
            @if(isNotEmpty(star) && star == 'true'){
            <span style="color:red;">*</span>
            @}
            ${name!}
        </button>
    </div>
    <input type="text" class="form-control" id="${id!}" value="${value!}"/>
    <script type="text/javascript">
        $(function () {
            laydate.render({
                elem: '#${id!}'
                , done: function () {
                    ${done!};
                },
                value: new Date()
                , theme: 'molv'
            });
        });
    </script>
</div>
@if(isNotEmpty(underline) && underline == 'true'){
<div class="hr-line-dashed"></div>
@}