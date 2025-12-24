
import { Link } from "react-router-dom";
import Header2 from "../../header2/header2";
import MultiSelect from "../../reactMultiSelect";
import Constants from "../../../constants/routes";
import { advance_suppliers_options, contractshotelOptions, insertUpdateTypeOptions, inventoryClassOptions, monthOptions, yearOptions } from "../../../constants/contants";




const ContractsHotelAllotment = () => {

  return (
    <>
      <Header2 title="ALLOTMENT MAP" />
      <div class="container-fluid pt-0 p-4" id="content-pad">



        <form>
          <div className="row">
            <div className="form-group col-md-6">
              <label>Supplier</label>
              <MultiSelect
                options={advance_suppliers_options}
                isSearchable
                placeholder="- Select Supplier -"
                className="custom-select required"
                noOptionsMessage={() => "No Supplier Found"}
              />
            </div>
            <div className="form-group col-md-6">
              <label>Hotel</label>
              <MultiSelect
                options={contractshotelOptions}
                isSearchable
                placeholder="- Select Hotel -"
                className="custom-select required"
                noOptionsMessage={() => "No Hotel Found"}
              />
            </div>
            <div className="col-md-12 form-group">
              {/* <div class="panel-body"> */}
              <div className="row mt-3">
                <div className="col-md-2">
                  <input type="hidden" id="sel_rate_profile" name="sel_rate_profile" defaultValue={0} className="form-control form-control-sm" />
                </div>
                <div className="col-md-2 ">
                  <input type="hidden" id="sel_inventory_class" name="sel_inventory_class" defaultValue={0} className="form-control form-control-sm" />
                </div>
                <div className="col-md-2 ">
                  <input type="hidden" id="sel_roomclass" name="sel_roomclass" defaultValue={0} className="form-control form-control-sm" />
                </div>
                <div className="col-md-2 ">
                  <input type="hidden" id="sel_roombasis" name="sel_roombasis" defaultValue={0} className="form-control form-control-sm" />
                </div>
                <div className="col-md-2 ">
                  <input type="hidden" id="action_type" name="action_type" defaultValue className="form-control form-control-sm" />
                </div>
              </div>
              {/* </div> */}
            </div>
            <div className="form-group col-md-3">
              <label>Month</label>
              <MultiSelect
                options={monthOptions}
                isSearchable
                placeholder="- Select Month -"
                className="custom-select"
                noOptionsMessage={() => "No Month Found"}
              />
            </div>
            <div className="form-group col-md-3">
              <label>Year</label>
              <MultiSelect
                options={yearOptions}
                isSearchable
                placeholder="- Select Year -"
                className="custom-select"
                noOptionsMessage={() => "No Year Found"}
              />
            </div>
            <div className="form-group col-md-3">
              <label>Inventory Room Category</label>
              <MultiSelect
                options={inventoryClassOptions}
                isSearchable
                placeholder="- Select-"
                className="custom-select"
                noOptionsMessage={() => "No Inventory Room Found"}
              />
            </div>
            <div className="form-group col-md-3">
              <label>Insert/ Update</label>
              <MultiSelect
                options={insertUpdateTypeOptions}
                isSearchable
                placeholder="- Select-"
                className="custom-select"
                noOptionsMessage={() => "No Insert/ Update Found"}
              />
            </div>
            {/* <div class="form-group col-md-6">
          <label>View</label>
          <select class="selectpicker form-control show-menu-arrow" name='sel_view' id='sel_view'>							
              <option value='1'>General View</option>
              <option value='2'>Supplement View</option>
              <option value='3'>Rate View</option>
          </select>
      </div> */}
            <div className="form-group col-md-6 mt-3">
              <label>View</label>
              <br />
              <div className="radioline1 mt-3">
                <div className="checkbox checkbox-success checkbox-inline">
                  <input type="checkbox" name="chk_view" defaultValue="rate_view" id="Rate" onclick="JavascriptshowHideContent('showhide_rate_view', 'view')" defaultChecked />
                  <label htmlFor="Rate">Rate</label>
                </div>
                <div className="checkbox checkbox-success checkbox-inline">
                  <input type="checkbox" name="chk_view" defaultValue="availibility_view" id="app" onclick="JavascriptshowHideContent('showhide_availibility_view', 'view')" />
                  <label htmlFor="Inventory Allocation">Inventory Allocation</label>
                </div>
                <div className="checkbox checkbox-success checkbox-inline">
                  <input type="checkbox" name="chk_view" defaultValue="minimumstay_view" id="app" onclick="JavascriptshowHideContent('showhide_minimumstay_view', 'view')" />
                  <label htmlFor="Minimum Stay">Minimum Stay</label>
                </div>
                <div className="checkbox checkbox-success checkbox-inline">
                  <input type="checkbox" name="chk_view" defaultValue="releaseperiod_view" id="app" onclick="JavascriptshowHideContent('showhide_releaseperiod_view', 'view')" />
                  <label htmlFor="Release Period">Release Period</label>
                </div>
                <div className="checkbox checkbox-success checkbox-inline">
                  <input type="checkbox" name="chk_view" defaultValue="stopsell_view" id="app" onclick="JavascriptshowHideContent('showhide_stopsell_view', 'view')" />
                  <label htmlFor="Stop Sell">Stop Sell</label>
                </div>
              </div>
            </div>
            <div className="form-group col-md-6 mt-3">
              <label>I wish to modify rates</label>
              <br />
              <div className="radioline1 mt-3">
                <div className="radio radio-success radio-inline">
                  <input type="radio" name="rates_manipulation_type" defaultValue="betweendates" onclick="getRatesManipulationType()" defaultChecked="checked" id="between" />
                  <label htmlFor="between">Between dates and application days</label>
                </div>
                <div className="radio radio-success radio-inline">
                  <input type="radio" name="rates_manipulation_type" defaultValue="monthly" onclick="getRatesManipulationType()" id="app" />
                  <label htmlFor="Monthly">Monthly</label>
                </div>
                <div className="radio radio-success radio-inline">
                  <input type="radio" name="rates_manipulation_type" defaultValue="weekly" onclick="getRatesManipulationType()" id="app" />
                  <label htmlFor="Weekly">Weekly</label>
                </div>
                <div className="radio radio-success radio-inline">
                  <input type="radio" name="rates_manipulation_type" defaultValue="daybyday" onclick="getRatesManipulationType()" id="app" />
                  <label htmlFor="day">Day By Day</label>
                </div>
              </div>
            </div>
          </div>
          {/* 2nd Row */}
          <div className="row mt-4">
            <div className="col-md-12 form-group">
              <Link to={Constants.URLConstants.CONTRACTSHOTELSALLOTMENTBUTTON} className="btn btn-dark btn-sm" type="button" onclick="JavascriptcallSearch(document.forms['search_hotel_from']);">
                <i className="fa fa-search" />&nbsp;Search
              </Link>
            </div>
          </div>
        </form>






      </div>
    </>
  );
};
export default ContractsHotelAllotment;
