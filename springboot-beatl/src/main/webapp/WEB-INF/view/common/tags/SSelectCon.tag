@/*
    选择查询条件标签的参数说明:

    name : 查询条件的名称
    id : 查询内容的input框id
@*/
<div class="input-group">
    <div class="input-group-btn">
        <button data-toggle="dropdown" class="btn btn-white dropdown-toggle" type="button">
            ${name}
        </button>
    </div>
    <select class="form-control" id="${id}" name="${id}" value="${value!}" onchange="${changeFun!}">
            ${tagBody!}
    </select>
    @if(isNotEmpty(hidden)){
            <input class="form-control" type="hidden" id="${hidden}" value="${hiddenValue!}">
    @}
</div>
@if(isNotEmpty(underline) && underline == 'true'){
    <div class="hr-line-dashed"></div>
@}