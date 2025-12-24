
import { Link } from "react-router-dom";
import Header2 from "../../header2/header2";
import MultiSelect from "../../reactMultiSelect";
import Constants from "../../../constants/routes";
import { hotelOptions, offlineHotelSuppliersOptions, roomClassOptions } from "../../../constants/contants";





const ContractsDynamicAllotmentNew = () => {

  return (
    <>
      <Header2 title="ADD DYANAMIC ALLOTMENT" linkText1="Search Dynamic Allotment Rule" link1={Constants.URLConstants.CONTRACTSHOTELSDYNAMICALLOTMENTSEARCH} />
      <div class="container-fluid pt-0 p-4" id="content-pad">


        <form>
          <div className="panel-body">
            <div className="row">
              <div className="form-group col-md-3">
                <label>Supplier</label>
                <MultiSelect
                  options={offlineHotelSuppliersOptions}
                  isSearchable
                  placeholder="- Select Supplier -"
                  className="custom-select required"
                  noOptionsMessage={() => "No Supplier Found"}
                />
              </div>
              <div className="form-group col-md-3">
                <label>Hotel</label>
                <MultiSelect
                  options={hotelOptions}
                  isSearchable
                  placeholder="- Select Hotel -"
                  className="custom-select required"
                  noOptionsMessage={() => "No Hotel Found"}
                />
              </div>
              <div className="form-group col-md-3">
                <label>Inventory Room Class</label>
                <MultiSelect
                  options={roomClassOptions}
                  isSearchable
                  placeholder="- Select -"
                  className="custom-select required"
                  noOptionsMessage={() => "No Room Class Found"}
                />
              </div>
            </div>
            {/*<div class="row">
                   <div class="form-group col-md-3">
                          <label>Meal Basis</label>
                           <select class="form-control selectpicker" name="sel_meal_basis" id="sel_meal_basis">
                                <option value='0'>- Select -</option>
                                
                          </select>
                   </div>
           </div>*/}
            <div className="row mt-2">
              <div className="form-group col-md-3">
                <label>From Date</label>
                <input type="text" className="form-control form-control-sm required from_date" name="txt_from_date" id="txt_from_date" placeholder="From Date" required="required" />
              </div>
              <div className="form-group col-md-3">
                <label>To Date</label>
                <input type="text" className="form-control form-control-sm required to_date" name="txt_to_date" id="txt_to_date" placeholder="To Date" required="required" />
              </div>
            </div>
            <input type="hidden" name="last_shown_cancellation" id="last_shown_cancellation" defaultValue={1} required="required" />
            {/* <div class="row"> */}
            {/* <div id="pd_cancellation"> */}
            <div className="row mt-2" id="pd_cancellation1">
              <div className="form-group col-md-3">
                <label>Day Difference</label>&nbsp;<i className="fa fa-info-circle" title data-toggle="tooltip" data-placement="top" data-original-title="Note : Day difference is day between check in and booking date" />
                <input type="text" className="form-control form-control-sm required day-diff" name="txt_days[1]" id="txt_days1" placeholder="Day Difference" required="required" />
              </div>
              <div className="form-group col-md-3">
                <label>Allotment</label>&nbsp;<i className="fa fa-info-circle" title data-toggle="tooltip" data-placement="top" data-original-title="Note: Allotment is nothing but no.of rooms.	" />
                <input type="text" className="form-control form-control-sm required" name="txt_allotment[1]" id="txt_allotment1" placeholder="Allotment" required="required" />
              </div>
              <div className="form-group col-md-3">
                <div className="input-group ">
                  <Link className="input-group-addon" id="plus_cancellation" onclick="plus_func_cancellation();"><i className="fa fa-plus fa-lg" style={{ marginLeft: '6px', color: 'black' }} /></Link>
                  <Link className="input-group-addon" id="minus_cancellation" onclick="minus_func_cancellation()" style={{ display: 'none' }}><i className="fa fa-minus" /></Link>
                </div>
              </div>
            </div>
            {/* </div> */}
            {/* </div> */}
            {/* <div class="row"> */}
            {/* <div id="pd_cancellation"> */}
            <div className="row" id="pd_cancellation2" style={{ display: 'none' }}>
              <div className="form-group col-md-3">
                <label>Day Difference</label>&nbsp;<i className="fa fa-info-circle" title data-toggle="tooltip" data-placement="top" data-original-title="Note : Day difference is day between check in and booking date" />
                <input type="text" className="form-control form-control-sm required day-diff" name="txt_days[2]" id="txt_days2" placeholder="Day Difference" required="required" />
              </div>
              <div className="form-group col-md-3">
                <label>Allotment</label>&nbsp;<i className="fa fa-info-circle" title data-toggle="tooltip" data-placement="top" data-original-title="Note: Allotment is nothing but no.of rooms.	" />
                <input type="text" className="form-control form-control-sm required" name="txt_allotment[2]" id="txt_allotment2" placeholder="Allotment" required="required" />
              </div>
              <div className="form-group col-md-3">
                <div className="input-group ">
                </div>
              </div>
            </div>
            {/* </div> */}
            {/* </div> */}
            {/* <div class="row"> */}
            {/* <div id="pd_cancellation"> */}
            <div className="row" id="pd_cancellation3" style={{ display: 'none' }}>
              <div className="form-group col-md-3">
                <label>Day Difference</label>&nbsp;<i className="fa fa-info-circle" title data-toggle="tooltip" data-placement="top" data-original-title="Note : Day difference is day between check in and booking date" />
                <input type="text" className="form-control form-control-sm required day-diff" name="txt_days[3]" id="txt_days3" placeholder="Day Difference" required="required" />
              </div>
              <div className="form-group col-md-3">
                <label>Allotment</label>&nbsp;<i className="fa fa-info-circle" title data-toggle="tooltip" data-placement="top" data-original-title="Note: Allotment is nothing but no.of rooms.	" />
                <input type="text" className="form-control form-control-sm required" name="txt_allotment[3]" id="txt_allotment3" placeholder="Allotment" required="required" />
              </div>
              <div className="form-group col-md-3">
                <div className="input-group ">
                </div>
              </div>
            </div>
            {/* </div> */}
            {/* </div> */}
            {/* <div class="row"> */}
            {/* <div id="pd_cancellation"> */}
            <div className="row" id="pd_cancellation4" style={{ display: 'none' }}>
              <div className="form-group col-md-3">
                <label>Day Difference</label>&nbsp;<i className="fa fa-info-circle" title data-toggle="tooltip" data-placement="top" data-original-title="Note : Day difference is day between check in and booking date" />
                <input type="text" className="form-control form-control-sm required day-diff" name="txt_days[4]" id="txt_days4" placeholder="Day Difference" required="required" />
              </div>
              <div className="form-group col-md-3">
                <label>Allotment</label>&nbsp;<i className="fa fa-info-circle" title data-toggle="tooltip" data-placement="top" data-original-title="Note: Allotment is nothing but no.of rooms.	" />
                <input type="text" className="form-control form-control-sm required" name="txt_allotment[4]" id="txt_allotment4" placeholder="Allotment" required="required" />
              </div>
              <div className="form-group col-md-3">
                <div className="input-group ">
                </div>
              </div>
            </div>
            {/* </div> */}
            {/* </div> */}
            {/* <div class="row"> */}
            {/* <div id="pd_cancellation"> */}
            <div className="row" id="pd_cancellation5" style={{ display: 'none' }}>
              <div className="form-group col-md-3">
                <label>Day Difference</label>&nbsp;<i className="fa fa-info-circle" title data-toggle="tooltip" data-placement="top" data-original-title="Note : Day difference is day between check in and booking date" />
                <input type="text" className="form-control form-control-sm required day-diff" name="txt_days[5]" id="txt_days5" placeholder="Day Difference" required="required" />
              </div>
              <div className="form-group col-md-3">
                <label>Allotment</label>&nbsp;<i className="fa fa-info-circle" title data-toggle="tooltip" data-placement="top" data-original-title="Note: Allotment is nothing but no.of rooms.	" />
                <input type="text" className="form-control form-control-sm required" name="txt_allotment[5]" id="txt_allotment5" placeholder="Allotment" required="required" />
              </div>
              <div className="form-group col-md-3">
                <div className="input-group ">
                </div>
              </div>
            </div>
            {/* </div> */}
            {/* </div> */}
            <input type="hidden" name="action" defaultValue="insert_staggered_inventory" required="required" />
            <div className="row mt-4">
              <div className="form-group col-md-3">
                <input type="button" className="btn btn-dark btn-sm" name="add" defaultValue="Save" onclick="javascript submit_form(document.forms['add_stagger_inventory_form'],false,'add');" required="required" />
              </div>
            </div>
          </div></form>






      </div>
    </>
  );
};
export default ContractsDynamicAllotmentNew;
