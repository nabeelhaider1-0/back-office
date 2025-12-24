import { add_options, searchmarkUpType } from "../../../constants/contants";
import Header2 from "../../header2/header2";
import MultiSelect from "../../reactMultiSelect";










const AddLeapTime = () => {

    return (
      <>
        <Header2
          title="AGENT SETTING"
          linkText1="Advanced Agent Setting"
       />
        <div class="container-fluid pt-0 p-4" id="content-pad">
        <form name="frm_add" method="post" onsubmit="return callmeadd();">
            <input type="hidden" name="action_name" id="action_name" value=""/>


            <div class="panel-body">
                <input type="hidden" name="sector_id" id="sector_id" value=""/>
                <div class="form-group">
                    <h5>Add Lead Time</h5>
                </div>
                <div class="row form-group">
                    <div class="col-md-3 form-group">
                        <label>Branch</label>
                        <MultiSelect
                            options={add_options}
                            isSearchable
                            placeholder="- Select Branch -"
                            noOptionsMessage={() => "No Branch Found"}
                            className="custom-select required"

                        />

                    </div>
                    <div class="form-group col-md-3" id="city_div">
                        <label>Agents</label>
                        <select
                            class="required selectpicker form-control form-control-sm show-menu-arrow bs-select-hidden"
                            multiple="" name="branch_agent[]" id="agent" data-live-search="true"
                            data-actions-box="true">

                        </select>

                    </div>
                    <div class="col-md-3 form-group">
                        <label>Supplier</label>
                        <MultiSelect
                            options={searchmarkUpType}
                            isSearchable
                            placeholder="- Select Supplier -"
                            noOptionsMessage={() => "No Supplier Found"}
                            className="custom-select required"

                        />

                    </div>
                    <div class="col-md-3 form-group" id="sel_local_supp_drop_1" style={{display:'none'}}>
                        <label>&nbsp;</label>
                        <select title="" id="sel_local_supp_1" name="local_supplier_1"
                            class="selectpicker form-control form-control-sm show-menu-arrow bs-select-hidden"
                            data-live-search="true">
                            <option value="">--Select--</option>
                        </select>

                    </div>
                    <div class="col-md-3 form-group">
                        <label>Lead Time</label>
                        <input type="text" name="txt_leadtime1" id="txt_leadtime1" value="" size="5" maxlength="5"
                            class="form-control form-control-sm required" onblur="extractNumber(this,2,true);"
                            onkeyup="extractNumber(this,2,true);"/>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-3 form-group">
                        <button type="button" name="Add" value="Add Markup" class="btn btn-dark btn-sm"
                            onclick="add_it_lead();">
                            <i class="fa fa-plus"></i>&nbsp;Add Lead Time
                        </button>
                    </div>
                </div>
            </div>
        </form>
<br/>
        {/* <!--2nd Row--> */}
        <form method="post" action="advanced_agent_settings.php" id="exclude_online_supplier_form">
            <div class="panel-body">
                <div class="form-group mt-4">
                    <h5>Exclude/Include Supplier</h5>
                </div>
                <div class="row form-group">
                    <div class="col-md-3 form-group">
                        <label>Branch</label>
                        <MultiSelect
                            options={add_options}
                            isSearchable
                            placeholder="- Select Branch -"
                            noOptionsMessage={() => "No Branch Found"}
                            className="custom-select required"

                        />
                    
                    </div>
                    <div class="form-group col-md-3" id="city_div">
                        <label>Agents</label>
                        <select class="required selectpicker form-control form-control-sm show-menu-arrow bs-select-hidden" multiple=""
                            name="branch_ex_agent" id="ex_agent" data-live-search="true" data-actions-box="true">
                        </select>
                        
                    </div>
                    <div class="col-md-3 form-group">
                        <label>Supplier</label>
                        <MultiSelect
                            options={searchmarkUpType}
                            isSearchable
                            placeholder="- Select Supplier -"
                            noOptionsMessage={() => "No Supplier Found"}
                            className="custom-select required"

                        />
                     
                    </div>
                    <div class="col-md-3 form-group">
                        <label>Exclude/Include Supplier</label>
                        <div>
                            <div class="radioline1 mt-2">
                            <div class="radio radio-success radio-inline">
                                <input id="ntapp" name="exclude_supplier" value="ex" type="radio"/>
                                <label for="ntapp">Exclude</label>
                            </div>
                            <div class="radio radio-success radio-inline">
                                <input id="app" name="exclude_supplier" value="in" checked="checked" type="radio"/>
                                <label for="app">Include</label>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-3 mb-5">
                    <input type="hidden" name="type" value="exclude_online_supplier" id="type"/>
                    <div class="col-md-3 form-group">
                        <button type="submit" class="btn btn-dark btn-sm" id="exclude_online_supplier">
                        <i class="fa fa-plus"></i>&nbsp;Exclude/Include Supplier
                        </button>
                    </div>
                </div>
            </div>
        </form>
        </div>
      </>
    );
  };
  export default AddLeapTime;