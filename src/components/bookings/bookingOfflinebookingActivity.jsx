
import React, { useState, } from "react"; // Import React and useState
import Flatpickr from "react-flatpickr";
import { Link } from "react-router-dom";
import Header2 from "../header2/header2";
import MultiSelect from "../reactMultiSelect";
import { addrule_currencyOptions, country_options, nationalityOptions, offlineHotelSuppliersOptions, offline_adults_options, offline_child_options, salutations } from "../../constants/contants";
const BookingOfflineBookingTour = () => {

    const [startDate, setStartDate] = useState(null); // State for the start date
    const [endDate, setEndDate] = useState(null); // State for the start date

  
    const handleTrashClick = () => {
      // Function to clear both start and end dates
      setStartDate(null);

    };

  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">

        <Header2 title="FLIGHT MANUAL RECONCILIATION"/>


        <form>
  <div className="panel-body">
    <div className="row">
      <div className="form-group col-md-2 ">
        <label>Agent Information</label><br />
        <input id="agent_suggest_box" name="agent_suggest_box" className="required form-control form-control-sm ui-autocomplete-input test123" required type="text" data-toggle="tooltip" data-placement="top" title autoComplete="off" data-original-title="Agency Name, Code, Username or First Name" /> <input type="hidden" className="form-control" name="agent_id" id="agent_id"    />
      </div>
      <div className="form-group col-md-1">
        <label htmlFor="exampleInputEmail1">Credit Value</label>
        <div id="id_credit_value">0</div>
      </div>
      <div className="form-group col-md-1">
        <label htmlFor="exampleInputEmail1">Credit Usage</label>
        <div id="id_credit_usage">0</div>
      </div>
      <div id="sub_user" className="form-group col-md-12">
        <div className="phps_row_1 row">
          <div id="add_sub_user" />
        </div>
      </div>
      <div id="sub_agent" className="form-group col-md-12">
        <div className="phps_row_1 row">
          <div id="add_sub_agent" />
        </div>
      </div>
    </div>
    <div className="row mt-4">
      <div className="form-group col-md-2 ">
        <label>Nationality</label>
        <MultiSelect
                  options={nationalityOptions}
                  isMulti
                  isSearchable
                  placeholder="- Select Nationality -"
                  noOptionsMessage={() => "No Country Found"}
                  className="custom-select required"
                  

                />
     
      </div>
      <div className="form-group col-md-2 ">
        <label>Country</label>
        <MultiSelect
                  options={country_options}
                  isMulti
                  isSearchable
                  placeholder="- Select a country -"
                  noOptionsMessage={() => "No Country Found"}
                  className="custom-select required"
                  

                />
        
      </div>
      <div className="form-group col-md-2 ">
        <label>City</label>
        <select name="sel_city" data-live-search="true" className="required form-control form-control-sm selectpicker show-menu-arrow bs-select-hidden" id="city" onchange="getActivityList();" data-live-search-style="startsWith">
          <option value={0} selected="selected">Select City</option>
        </select>
      </div>
      <div className="form-group col-md-2 ">
        <label>Adult</label>
        <MultiSelect
                  options={offline_adults_options}
                  isMulti
                  isSearchable
                  placeholder="No. of Adults"
                  noOptionsMessage={() => "No Options Found"}
                  className="custom-select"
                />
        
      </div>
      <div className="form-group col-md-2 ">
        <label>Child</label>
        
        <MultiSelect
                  options={offline_child_options}
                  isMulti
                  isSearchable
                  placeholder="No. of Childs"
                  noOptionsMessage={() => "No Options Found"}
                  className="custom-select"
                />
       
        <div className="width_100per float_left" style={{border: '0px solid red', display: 'none'}} id="parah_out">
          <div id="parah" style={{border: '0px solid green', float: 'left', textAlign: 'left', padding: '0px'}} />
        </div>
      </div>
    </div>
    <div className="panel-body form-group mt-3" style={{border: '1px solid #e4e5e7', paddingTop: '17px', paddingBottom: '23px', paddingLeft: '23px'}}>
      <div className="row">
        <div className="form-group col-md-12">
          <h5>Leader Details</h5>
        </div>
      </div>
      <div className="row mt-2">
        <div className="form-group col-md-1">
        <MultiSelect
                  options={salutations}
                  isMulti
                  isSearchable
                  placeholder="- Select -"
                  noOptionsMessage={() => "No Option Found"}
                  className="custom-select required"

                />
        
        </div>
        <div className="form-group col-md-2">
          <input    name="leader_first_name" id="leader_first_name" placeholder="Leader First Name" type="text" className="required textstyle form-control form-control-sm" size={15} />
        </div>
        <div className="form-group col-md-2">
          <div className="input-group date col-md-12 col-xs-12">
            <input    name="leader_last_name" placeholder="Leader Last Name" id="leader_last_name" type="text" className="required textstyle form-control form-control-sm" size={15} />
            <span className="input-group-addon copytopassenger" onclick="javascriptcopytopassenger()">
              <Link className="text" data-toggle="tooltip" data-placement="top" title data-original-title="Copy To Passenger List"><i className="fa fa-files-o" /></Link>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div className="panel-body form-group mt-3" style={{border: '1px solid #e4e5e7', paddingTop: '17px', paddingBottom: '23px', paddingLeft: '23px'}}>
      <div className="row">
        <div className="col-md-12">
          <h5>Passengers Details</h5>
        </div>
        <div className="col-md-12 ">
          <div className="row mt-2">
            <div className="form-group col-md-2">
              <div className="row">
                <div className="form-group col-md-4 text-center m-t-xs">
                  <label>Pax 1</label>
                </div>
                <div className="col-md-8">
                <MultiSelect
                  options={salutations}
                  isMulti
                  isSearchable
                  placeholder="Pax1"
                  noOptionsMessage={() => "No Pax1 Found"}
                  className="custom-select required"

                />
              
                </div>
              </div>
            </div>
            <div className="form-group col-md-2">
              <input name="txt_first_name_1" placeholder="First Name" id="txt_first_name_1" type="text" className="required form-control form-control-sm" size={15} />
            </div>
            <div className="form-group col-md-2">
              <div className="input-group date col-md-12 col-xs-12">
                <input name="txt_last_name_1" placeholder="Last Name" id="txt_last_name_1" type="text" className="required form-control form-control-sm" size={15} />
                <span className="input-group-addon" onclick="javascriptcopylastname('txt_last_name_1')"><Link className="text" data-toggle="tooltip" data-placement="top" title data-original-title="Copy"><i className="fa fa-files-o" /></Link></span>
              </div>
            </div>
            <div id="pax_id" />
            <div id="child_id" />
          </div>
        </div>
      </div>
    </div>
    <div className="row mt-2">
      <div className="form-group col-md-12">
        <label>Supplier Type</label><br />
        <div className="radioline1">
          <div className="radio radio-success radio-inline form-group col-md-1">
            <input id="checkSuppType2" type="radio" name="rdSupplierType" defaultValue="L" onclick="checkSuppType(this.value);" defaultChecked="checked" /><label htmlFor="checkSuppType2" onclick="checkSuppType(this.value);">Local Supplier</label>
          </div>
          <div className="radio radio-success radio-inline form-group col-md-3">
            <input id="app" type="radio" name="rdSupplierType" defaultValue="O" onclick="checkSuppType(this.value);" /><label htmlFor="checkSuppType1">Online
              Supplier</label>
          </div>
        </div>
      </div>
    </div>
    <div className="row mt-2">
      <div className="form-group col-md-2">
        <label>Supplier</label>
        
        <MultiSelect
                  options={offlineHotelSuppliersOptions}
                  isMulti
                  isSearchable
                  placeholder="Select Supplier"
                  noOptionsMessage={() => "No Supplier Found"}
                  className="custom-select required"

                />
     
      </div>
      <div className="form-group col-md-2">
        <label>Supplier Profile</label>
        <select className="required form-control form-control-sm selectpicker show-menu-arrow bs-select-hidden" name="sel_supplierProfileL" id="sel_supplierProfileL" data-live-search="true">
          <option value={0}>Select Supplier Profile</option>
          <option label="localsystem" value={16}>localsystem</option>
          <option label="Watergate Hotel Co.Ltd" value={36}>Watergate Hotel Co.Ltd</option>
        </select>
      </div>
      <div className="form-group col-md-2 ">
        <label>Activity</label>
        <select name="sel_activity" className="form-control form-control form-control-sm selectpicker show-menu-arrow required bs-select-hidden" id="sel_activity" onchange="getActivityDetailById()" data-live-search="true">
          <option value={0}>Select Activity</option>
        </select>
      </div>
      <div className="form-group col-md-2 ">
        <label>Booking Status</label>
        <select name="sel_booking_status" className="required form-control form-control-sm selectpicker show-menu-arrow bs-select-hidden" id="sel_booking_status" data-live-search="true">
          <option value>Select Status</option>
          <option label="On Request" value="on_request">On Request</option>
          <option label="Confirmed" value="confirmed">Confirmed</option>
        </select>
      </div>
    </div>
    <div className="row mt-2">
      <div className="form-group col-md-2 ">
        <label>Activity Date</label>
        <div className="input-group date col-md-12 col-sm-12 col-xs-12" id="tour_date">
        <Flatpickr
                  value={startDate}
                  onChange={(date) => setStartDate(date)}
                  options={{ dateFormat: "Y-m-d" }}
                  style={{width:'210px'}}
                />
          <span className="input-group-addon" id="tourTrashBtn" onClick={handleTrashClick}>
            <i className="fa fa-trash" />
          </span>
        </div>
      </div>
      <div className="form-group col-md-2 ">
        <label>Agent Expiration Date</label>
        <div className="input-group date col-md-12 col-sm-12 col-xs-12" id="expiredatetime">
        <Flatpickr
                  value={endDate}
                  onChange={(date) => setEndDate(date)}
                  options={{ dateFormat: "Y-m-d" }}
                  style={{width:'300px'}}
                />
        </div>
      </div>
      <div className="form-group col-md-2 ">
        <label>Confirmation #</label>
        <input className="form-control form-control-sm" type="text" name="confirmation_number"    />
      </div>
      <div className="form-group col-md-2 ">
        <label>Agent Reference #</label>
        <input className="form-control form-control-sm" type="text" name="agent_ref_no"    />
      </div>
    </div>
    <div className="row mt-2">
      <div className="form-group col-md-2 " id="pickup" style={{display: 'none'}}>
        <label>Activity Departure Point</label>
        <select name="tour_dep_point" className="form-control form-control-sm selectpicker show-menu-arrow bs-select-hidden" id="tour_dep_point" data-live-search="true">
          <option value>Select Departure Point</option>
        </select>
      </div>
      <div className="form-group col-md-2 " id="location" style={{display: 'none'}}>
        <label>Activity Arrival Point</label>
        <select name="arrival_point" className="form-control form-control-sm selectpicker show-menu-arrow bs-select-hidden" id="arrival_point" data-live-search="true">
          <option value>Select Arrival Point</option>
        </select>
      </div>
      <div className="form-group col-md-2 ">
        <label>Pick Up Point</label>
        <div className="input-group col-md-12 col-xs-6">
          <select name="tour_dep_point1" onchange="check_pickup_dropoff(this);get_surcharge();" className="form-control form-control-sm selectpicker show-menu-arrow bs-select-hidden" id="tour_dep_point1" data-live-search="true">
            <option value>Select Pick-up Point</option>
          </select>
          <span className="input-group-addon other_address_for_pickup">OR</span>
        </div>
      </div>
      <div className="form-group col-md-2  other_address_for_pickup">
        <label>Other Pick Up Address</label>
        <input className="form-control form-control-sm input_style4" onkeyup="check_pickup_dropoff(this);" onblur="check_pickup_dropoff(this);" type="text" name="other_address_pickup" id="other_address_pickup"    />
      </div>
      <div className="form-group col-md-2 ">
        <label>Pick Up Time</label>
        <input type="text" className="form-control form-control-sm" name="from_slot" id="from_slot"    />
      </div>
      <div className="form-group col-md-2 ">
        <label>Drop Off Point</label>
        <div className="input-group col-md-12 col-xs-6">
          <select name="dropoff" onchange="check_pickup_dropoff(this);get_surcharge();" className="form-control form-control-sm selectpicker show-menu-arrow bs-select-hidden" id="dropoff" data-live-search="true">
            <option value>Select Drop Off Point</option>
          </select>
          <span className="input-group-addon other_address_for_dropoff">OR</span>
        </div>
      </div>
      <div className="form-group col-md-2  other_address_for_dropoff">
        <label>Other Drop Off Address</label>
        <input className="form-control form-control-sm input_style4" onkeyup="check_pickup_dropoff(this);" onblur="check_pickup_dropoff(this);" type="text" name="other_address_dropoff" id="other_address_dropoff"    />
      </div>
      <div className="form-group col-md-2 ">
        <label>Drop Off Time</label>
        <input type="text" className="form-control form-control-sm" name="to_slot" id="to_slot"    />
      </div>
    </div>
    <div className="row mt-2">
      <div className="form-group col-md-2 ">
        <label>Supplier Currency</label>
        <MultiSelect
                  options={addrule_currencyOptions}
                  isMulti
                  isSearchable
                  placeholder="- Select Currency -"
                  noOptionsMessage={() => "No Currency Found"}
                  className="custom-select required"
                /> 
      </div>
      <div className="form-group col-md-2 ">
        <label>Agent Currency</label>
        <MultiSelect
                  options={addrule_currencyOptions}
                  isMulti
                  isSearchable
                  placeholder="- Select Currency -"
                  noOptionsMessage={() => "No Currency Found"}
                  className="custom-select required"
                /> 
      </div>
      <div className="form-group col-md-2 ">
        <label>Applied Multiplier</label>
        <div className="input-group date col-md-12 col-xs-12">
          <input type="text" className="form-control form-control-sm" name="applied_multiplier" id="applied_multiplier" onblur="get_modification(this)" onkeyup="extractNumber(this,5,false);" />
          <span className="input-group-addon">&nbsp;<span id="nc1" /> To <span id="dc1" />&nbsp;</span>
        </div>
      </div>
      <div className="form-group col-md-2 ">
        <label>Current Rate</label>
        <div id="currency_conversion_1" />
      </div>
      <div style={{display: 'none'}}>
        <div className="form-group col-md-2">
          <label>Basecurrency Multiplier</label>
          <input type="text" name="basecurrency_multiplier" className="form-control" id="basecurrency_multiplier" onblur="extractNumber(this,5,false);" onkeyup="extractNumber(this,6,false);" />
          <span id="dc2" />
          <div id="currency_conversion_2" />
        </div>
        <div className="form-group col-md-2">
          <label>Basecurrency Multiplier Native</label>
          <input type="text" name="basecurrency_multiplier_native" className="form-control" id="basecurrency_multiplier_native" onblur="extractNumber(this,5,false);" onkeyup="extractNumber(this,6,false);" />
          <span id="nc2" />
          <div id="currency_conversion_3" />
        </div>
        <div className="form-group col-md-2">
          <label>Booking Currency To Agent Currency Multiplier</label>
          <input type="text" name="agent_currency_multiplier" className="form-control" id="agent_currency_multiplier" onblur="extractNumber(this,5,false);" onkeyup="extractNumber(this,6,false);" />
          <span id="dc4" /> To <span id="dc5" />
          <div id="currency_conversion_4" />
        </div>
      </div>
    </div>
    <div className="row mt-2">
      <div className="form-group col-md-2 ">
        <label>Agent Markup</label>
        <div className="input-group date col-md-12 col-xs-12">
          <input type="text" name="txt_agent_markup" id="txt_agent_markup" className="form-control form-control-sm"    size={5} onblur="extractNumber(this,2,false);cal_total_markup();" />
          <span className="input-group-addon">%</span>
        </div>
      </div>
      <div style={{display: 'none'}} id="sub_agent_markup" className="form-group col-md-2 ">
        <label>Sub Agent Markup</label>
        <div className="input-group date col-md-12 col-xs-12">
          <input type="text" name="txt_sub_agent_markup" className="form-control" id="txt_sub_agent_markup"    size={5} onblur="extractNumber(this,2,false);cal_total_markup();" /><span className="input-group-addon">%</span>
        </div>
      </div>
      <div className="form-group col-md-2 ">
        <label>Total Markup</label>
        <div className="input-group date col-md-12 col-xs-12">
          <input className="form-control form-control-sm" type="text" name="txt_markup" id="txt_markup"    size={5} readOnly />
          <span className="input-group-addon">%</span>
        </div>
      </div>
      <div className="form-group col-md-2 ">
        <label>Applicable Tax</label>
        <input type="text" className="form-control form-control-sm" id="applicable_tax" name="applicable_tax"    size={5} readOnly />
        <p id="tax" />
        <input type="hidden" className="form-control form-control-sm" id="applicable_service_tax" name="applicable_service_tax"    size={5} readOnly />
        <p id="tax" />
      </div>
    </div>
    <div className="row mt-1">
      <div className="form-group col-md-2 ">
        <label>Supplier Adult Per Pax Rate</label>
        <div className="input-group date col-md-12 col-xs-12">
          <input type="text" name="native_rate" id="native_rate" className="required form-control form-control-sm pad1px"    size={10} onblur="extractNumber(this,2,false);get_modification('supplier_rate');" onkeyup="extractNumber(this,2,false);" /> <span className="input-group-addon" id="nc4" />
        </div>
      </div>
      <div className="form-group col-md-2 ">
        <label>Supplier Child Per Pax Rate</label>
        <div className="input-group date col-md-12 col-xs-12">
          <input type="text" name="native_child_rate" id="native_child_rate" className="required form-control form-control-sm pad1px" defaultValue={0} size={10} onblur="extractNumber(this,2,false);get_modification('supplier_rate');" onkeyup="extractNumber(this,2,false);" readOnly="readonly" /> <span className="input-group-addon" id="nc5" />
        </div>
      </div>
      <div className="form-group col-md-2 " id="surcharge" style={{display: 'none'}}>
        <label>Supplier Surcharge</label>
        <input className="form-control form-control-sm input_style4" type="text" name="surcharge_rate" id="surcharge_rate" defaultValue={0} onblur="extractNumber(this,3,false);get_modification('supplier_rate');" onkeyup="extractNumber(this,3,false);" />
      </div>
      <div className="form-group col-md-2">
        <label>Supplier Discount</label>
        <input type="text" name="native_discount" id="native_discount"    onchange="extractNumber(this,3,false);" size={5} onblur="extractNumber(this,3,false);get_modification('supplier_rate');" onkeyup="extractNumber(this,3,false);" maxLength={6} className="form-control form-control-sm" />
      </div>
      <div className="form-group col-md-2 " id="total_supplier_section">
        <label>Total Supplier Rate</label>
        <input className="form-control form-control-sm" readOnly="readonly" type="text" name="total_supplier_rate" id="total_supplier_rate"    size={10} onblur="extractNumber(this,2,false);" onkeyup="extractNumber(this,2,false);" />
      </div>
    </div>
    <div className="row mt-2">
      <div className="form-group col-md-2 ">
        <label>Agent Per Pax Rate</label>
        <div className="input-group date col-md-12 col-xs-12">
          <input type="text" name="display_room_rate" className="required form-control form-control-sm pad1px" id="display_room_rate"    onblur="extractNumber(this,2,false);get_modification('agent_rate');" onkeyup="extractNumber(this,2,false);" /><span className="input-group-addon" id="dc6" />
        </div>
      </div>
      <div className="form-group col-md-2 ">
        <label>Agent Child Per Pax Rate</label>
        <div className="input-group date col-md-12 col-xs-12">
          <input type="text" name="display_child_rate" id="display_child_rate" className="required form-control form-control-sm pad1px" defaultValue={0} size={10} onblur="extractNumber(this,2,false);get_modification('agent_rate');" onkeyup="extractNumber(this,2,false);" readOnly="readonly" /> <span className="input-group-addon" id="dc7" />
        </div>
      </div>
      <div className="form-group col-md-2 " id="agent_surcharge" style={{display: 'none'}}>
        <label>Agent Surcharge</label>
        <input className="form-control form-control-sm input_style4" type="text" name="agent_surcharge_rate" id="agent_surcharge_rate" defaultValue={0} onblur="extractNumber(this,3,false);get_modification('agent_rate');" onkeyup="extractNumber(this,3,false);" />
      </div>
      <div className="form-group col-md-2">
        <label>Agent Discount</label>
        <input type="text" name="display_discount" id="display_discount"    size={5} onblur="extractNumber(this,3,false);" onkeyup="extractNumber(this,3,false);" maxLength={6} className="form-control form-control-sm" />
      </div>
      <div className="form-group col-md-2 " id="total_agent_section">
        <label>Total Agent Rate</label>
        <input type="text" id="total_agent_rate" name="total_agent_rate" readOnly="readonly" className="form-control form-control-sm" style={{height: '29px'}} />
      </div>
      <div className="form-group col-md-2 ">
        <label>Agent Rate With Tax</label>
        <input type="text" className="form-control form-control-sm" id="display_agent_rate_w_tax" name="display_agent_rate_w_tax"    size={5} readOnly />
      </div>
    </div>
    <div className="row mt-2">
      <div className="form-group col-md-2 ">
        <label>Payment Gateway Charge</label>
        <div className="input-group date col-md-12 col-xs-12">
          <input className="form-control form-control-sm" type="text" name="additional_charge"    size={5} />
          <span className="input-group-addon" id="dc7" />
        </div>
      </div>
    </div>
    <div className="row mt-2">
      <div className="form-group col-md-12 ">
        <label>Cancellation Policy</label>
        <textarea name="cancellation_policy" rows={4} className="form-control form-control-sm" cols={60} defaultValue={"Cancellations or changes made 3 day/s prior to check in ( Noon local hotel time ) will be subject to 1 night/s fee. No- Show/Early Departure is subjected to 1 night/s fee"} />
      </div>
    </div>
    <div className="row mt-2">
      <div className="form-group col-md-12 ">
        <label>Supplier Cancellation Policy </label>
        <textarea name="supplier_cancellation_policy" id="supplier_cancellation_policy" rows={4} className="form-control form-control-sm supplier_readonly" cols={60} readOnly defaultValue={""} />
      </div>
      <div className="form-group col-md-12 mt-2 ">
        <label>Remark</label>
        <textarea name="remark" rows={4} className="form-control form-control-sm" cols={60} defaultValue={""} />
      </div>
      <div className="form-group col-md-12 mt-2">
        <label>Inclusion</label>
        <textarea className="form-control form-control-sm" name="tour_incl" rows={4} cols={70} id="tour_inclusive" defaultValue={""} />
      </div>
      <div className="form-group col-md-12 mt-2">
        <label>Exclusion</label>
        <textarea className="form-control form-control-sm" name="tour_exc" rows={4} cols={70} id="tour_exclusive" defaultValue={""} />
      </div>
      <div className="form-group col-md-12 mt-2">
        <label>Terms &amp; Condition</label>
        <textarea className="form-control form-control-sm" name="terms_n_condition" rows={4} cols={70} id="terms_n_condition" defaultValue={""} />
      </div>
    </div>
    <div className="row mt-3">
      <div className="form-group col-md-12">
        <h5>Email To</h5>
        <div className="radioline1">
          <div className="checkbox checkbox-success checkbox-inline">
            <input id="mailtoagent" type="checkbox" name="mailtoagent" defaultValue={1} />
            <label htmlFor="mailtoagent">Agent</label>
          </div>
          <div className="checkbox checkbox-success checkbox-inline">
            <input id="app" type="checkbox" name="mailtocommon" defaultValue={1} />
            <label htmlFor="mailtocommon">Common</label>
          </div>
          <div className="checkbox checkbox-success checkbox-inline btnPadd">
            <input id="app" type="checkbox" name="mailtosupplier" defaultValue={1} />
            <label htmlFor="mailtosupplier">Supplier</label>
          </div>
        </div>
      </div>
    </div>
    <div className="row mt-3">
      <div className="form-group col-md-12">
        <span id="loading" style={{display: 'none'}}><img src="/cpfv3/images/loading.gif" alt="" /></span>
        <button type="button" name="save_offline_sightseeing" className="btn btn-dark btn-sm" id="save_offline_sightseeing" onclick="Javascript submit_form(document.forms['sightseeing_form']);">
          <i className="fa fa-floppy-o" />&nbsp;Save
        </button>
      </div>
    </div>
  </div>
</form>




      </div>
    </>
  );
};
export default BookingOfflineBookingTour;
