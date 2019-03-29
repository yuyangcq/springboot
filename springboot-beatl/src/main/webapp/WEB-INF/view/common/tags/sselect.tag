@/*
    select标签中各个参数的说明:
    name : select的名称
    id : select的id
    underline : 是否带分割线
@*/
<span>
    <label for="">${name}
	    @if(isNotEmpty(em)){
	       <em class="star">*</em>
	    @}
    </label>
    <span>
         <select id="${id}"  name="${id}"
               @if(isNotEmpty(class)){
                    class="${class}"
               @}
         >
              ${tagBody!}
         </select>
         @if(isNotEmpty(hidden)){
            <input class="form-control" type="hidden" id="${hidden}" value="${hiddenValue!}">
         @}
    </span>
</span>
@if(isNotEmpty(underline) && underline == 'true'){
    <div class="hr-line-dashed"></div>
@}

