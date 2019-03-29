@/*
    select标签中各个参数的说明:
    name : select的名称
    id : select的id
    underline : 是否带分割线
@*/
<div class="form-group">
    <label class="col-sm-3 control-label">${name}</label>
    <div class="col-sm-9">
        <div id="${id}" class="selectpicker" data-clear="true" data-live="true">
							<a href="#" class="clear"><span class="fa fa-times"></span><span class="sr-only">Cancel the selection</span></a>
							<button data-id="prov" type="button" class="btn btn-lg btn-block btn-default dropdown-toggle">
							<span class="placeholder">Choose an option</span>
							<span class="caret"></span>
							</button>
							<div class="dropdown-menu">
								<div class="live-filtering" data-clear="true" data-autocomplete="true" data-keys="true">
									<label class="sr-only" for="input-bts-ex-5">Search in the list</label>
									<div class="search-box">
										<div class="input-group">
											<span class="input-group-addon" id="search-icon5">
											<span class="fa fa-search"></span>
											<a href="#" class="fa fa-times hide filter-clear"><span class="sr-only">Clear filter</span></a>
											</span>
											<div style="position: relative; height: 34px; display: block;"><input type="text" class="form-control live-search hint" aria-describedby="search-icon5" tabindex="-1" style="background-color: transparent; position: absolute;"><input type="text" placeholder="Search in the list" id="input-bts-ex-5" class="form-control live-search" aria-describedby="search-icon5" tabindex="1" style="background-color: transparent; position: relative;"></div>
										</div>
									</div>
									<div class="list-to-filter">
										<ul class="list-unstyled">
											<li class="optgroup">
												<span class="optgroup-header">List Group <span class="subtext"></span></span>
												<ul class="list-unstyled">
													<li class="filter-item items" data-filter="item 1" data-value="1">item 1</li>
													<li class="filter-item items" data-filter="item 2" data-value="2">item 2</li>
													<li class="filter-item items" data-filter="item 3" data-value="3">item 3</li>
													<li class="filter-item items" data-filter="item 4" data-value="4">item 4</li>
													<li class="filter-item items" data-filter="item 5" data-value="5">item 5</li>
												</ul>
											</li>
										</ul>
										<div class="no-search-results" style="display: none;">
											<div class="alert alert-warning" role="alert"><i class="fa fa-warning margin-right-sm"></i>No entry for <strong>'<span></span>'</strong> was found.</div>
										</div>
									</div>
								</div>
							</div>
							<input type="hidden" name="bts-ex-5" value="">
						</div>
        @if(isNotEmpty(hidden)){
            <input class="form-control" type="hidden" id="${hidden}" value="${hiddenValue!}">
        @}
    </div>
</div>
@if(isNotEmpty(underline) && underline == 'true'){
    <div class="hr-line-dashed"></div>
@}
							
							
							
							
									
								
							


