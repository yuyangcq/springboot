@/*
    select标签中各个参数的说明:
    name : select的名称
    id : select的id
    underline : 是否带分割线
@*/
<div class="form-group" id="${id}Div">
    <label class="col-sm-${width!'4'} control-label">${name}</label>
    <div class="col-sm-${width!'8'}">
        <select class="form-control" id="${id}" name="${id}" value="${value!}" onchange="${changeFun!}">
            ${tagBody!}
        </select>
        @if(isNotEmpty(hidden)){
            <input class="form-control" type="hidden" id="${hidden}" value="${hiddenValue!}">
        @}
    </div>
</div>
@if(isNotEmpty(underline) && underline == 'true'){
    <div class="hr-line-dashed"></div>
@}


