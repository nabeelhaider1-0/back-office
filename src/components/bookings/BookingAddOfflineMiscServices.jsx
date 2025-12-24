
import React, { useState, } from "react"; // Import React and useState
import Flatpickr from "react-flatpickr";
import Header2 from "../header2/header2";
import { addrule_currencyOptions, advance_suppliers_options, bookingStatusOptions, country_options, nationalityOptions, noofadultsOptions, salutations, selDaysOptions, supplierProfileOptions, suppliersOnlineOptions } from "../../constants/contants";
import MultiSelect from "../reactMultiSelect";


const BookingAddOfflineMiscServices = () => {

    const [startDate, setStartDate] = useState(null); // State for the start date
    const [endDate, setEndDate] = useState(null); // State for the start date

  
    const handleTrashClick = () => {
      // Function to clear both start and end dates
      setStartDate(null);
      setEndDate(null);

    };



  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">

        <Header2 title="ADDING NEW SECTOR"/>

 
        <form>
  <div className="panel-body">
    <div className="row">
      <div className="form-group col-md-3 phps_row_1">
        <label>Country</label>
        <input type="hidden" name="sel_countries_name"   className="form-control form-control-sm" />
        <MultiSelect
                  options={country_options}
                  isMulti
                  isSearchable
                  placeholder="- Select a country -"
                  noOptionsMessage={() => "No Country Found"}
                  className="custom-select required"
                  

                />
      </div>
      <div className="form-group col-md-3 phps_row_0">
        <label>City</label>
        <input type="hidden" name="sel_city_name"   className="form-control form-control-sm" />
        <select name="sel_city" id="city" onfocus="javascriptcheckCountry(document.forms['modify_booking_form']);" onchange="getHotelList(this.value);" className="required selectpicker show-menu-arrow form-control form-control-sm bs-select-hidden" data-live-search-style="startsWith" data-live-search="true">
          <option value={0}>-- Select --</option>
        </select>
      </div>
      <div className="form-group col-md-3 phps_row_1">
        <label>Passenger Nationality</label>
        <MultiSelect
                  options={nationalityOptions}
                  isMulti
                  isSearchable
                  placeholder="- Select Nationality -"
                  noOptionsMessage={() => "No Country Found"}
                  className="custom-select required"
                  

                />
       
      </div>
      <div className="form-group col-md-3 phps_row_0">
        <label>Booking Status</label>

        <MultiSelect
                  options={bookingStatusOptions}
                  isMulti
                  isSearchable
                  placeholder="- Select Status -"
                  noOptionsMessage={() => "No Status Found"}
                  className="custom-select required"
                  

                />
        
   
      </div>
    </div>
    <div className="row form-group mt-1">
      <div className="form-group col-md-3 phps_row_1">
        <label>Service Date</label>
        <div className="input-daterange input-group date" id="serviceDate">
        <Flatpickr
                  value={startDate}
                  onChange={(date) => setStartDate(date)}
                  options={{ dateFormat: "Y-m-d" }}
                
                />
          <span className="input-group-addon">to</span>
          <Flatpickr
                  value={endDate}
                  onChange={(date) => setEndDate(date)}
                  options={{ dateFormat: "Y-m-d" }}
                 
                />
          <span className="input-group-addon" id="serviceTrashBtn" onClick={handleTrashClick}>
            <i className="fa fa-trash" />
          </span>
        </div>
      </div>
      <div className="form-group col-md-3 phps_row_1">
        <label>Total Nights</label>
        
        <MultiSelect
                  options={selDaysOptions}
                  isMulti
                  isSearchable
                  placeholder="- Select -"
                  noOptionsMessage={() => "No Options Found"}
                  className="custom-select required"
                  

                />
      
      </div>
      <div className="form-group col-md-3 phps_row_0">
        <label>Hotel/Service</label>
        {/* <input type="text" class="form-control required" name="service_name" value="" maxlength="100"> */}
        <div className="input-group date col-md-12 col-xs-12">
          <input type="hidden" name="sel_hotels_name"   className="form-control form-control-sm" />
          <select name="sel_hotels" id="sel_hotels" onfocus="javascriptcheckCountryCity(document.forms['add_misc_services']);" className="required selectpicker show-menu-arrow form-control form-control-sm bs-select-hidden" data-live-search="true">
            <option value={0}>Select Hotel</option>
          </select>
          <input type="hidden"   name="txt_other_hotel" id="txt_other_hotel" />
          {/*input type="button" value="Add Other Hotel" onclick="javascriptshow_other_hotel();" */}
          <span className="input-group-addon" onclick="javascriptshow_other_hotel();"><i className="fa fa-plus" /></span>
        </div>
      </div>
      <div className="form-group col-md-3 phps_row_1">
        {/*<font color="red" id="mandatory_field">*</font>*/}
        <label>Agent Reference</label>
        <input type="text" className="form-control form-control-sm required" name="agent_ref_no"   maxLength={100} />
      </div>
    </div>
    <div className="row mt-2">
      <div className="form-group col-md-3 phps_row_1">
        {/*<font color="red" id="mandatory_field">*</font>*/}
        <label>Confirmation Number</label>
        <input type="text" className="form-control form-control-sm required" name="confirmation_number"   maxLength={100} />
      </div>
    </div>
    <div className="form-group row mt-2 mb-4">
      <div className="form-group col-md-3 phps_row_0">
        {/* <div id="conf_no"></div> */}
        <label>Confirmation Number/Supplier ref#</label>
        <input type="text" name="confirmation_number"   maxLength={100} className="form-control form-control-sm" />
      </div>
      <div className="form-group col-md-3 phps_row_1">
        <label>Agent Reference</label>
        <input type="text" name="agent_ref_no"   maxLength={100} className="form-control form-control-sm" />
      </div>
    </div>
    <div className="form-group panel-body" style={{border: '1px solid #e4e5e7', paddingTop: '7px', paddingBottom: '23px', paddingLeft: '13px', paddingRight: '20px'}}>
      <div className="row">
        <div className="form-group col-md-12">
          <h5>Passenger Details</h5>
        </div>
        <div className="col-md-12 phps_row_1">
          <div className="row phps_row_0 mt-2">
            <div className="col-md-1">
              <label>Pax1</label>
            </div>
            <div className="col-md-2">
              <div className="row">
                <div className="form-group col-md-12">
                  {/*<select name="sel_salutations_1" id= "sel_salutations_1" class="form-control selectpicker show-menu-arrow">*/}
                 
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
            <div className="form-group col-md-3">
              <input name="first_name" id="first_name" placeholder="First Name" type="text" className="required textstyle form-control form-control-sm" size={15} />
            </div>
            <div className="form-group col-md-3">
              <div className="input-group col-md-12 col-xs-12">
                <input name="last_name" id="last_name" placeholder="Last Name" type="text" className="required textstyle form-control form-control-sm" size={15} />
              </div>
            </div>
          </div>
          <div className="row phps_row_1 mt-2">
            <div className="form-group col-md-3 phps_row_0">
              <label>Email</label>
              <input type="text" name="txt_email"   className="required form-control form-control-sm" />
            </div>
            <div className="form-group col-md-3 phps_row_1">
              <label>No. of Adults</label>

              <MultiSelect
                  options={noofadultsOptions}
                  isMulti
                  isSearchable
                  placeholder="No. of Adults"
                  noOptionsMessage={() => "No Options Found"}
                  className="custom-select"
                />
              
            </div>
            <div className="form-group col-md-3 phps_row_0">
              <label>No. of Child</label>
              <MultiSelect
                  options={noofadultsOptions}
                  isMulti
                  isSearchable
                  placeholder="No. of Child"
                  noOptionsMessage={() => "No Options Found"}
                  className="custom-select"
                />
              
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="row mt-3">
      <div className="form-group col-md-12 phps_row_1">
        <h5>Supplier Type</h5>
        <div className="radioline1">
          <div className="radio radio-success radio-inline">
            <input id="rdSupplierType1" type="radio" name="rdSupplierType" defaultValue="O" onclick="checkSuppType(this.value);" defaultChecked="checked" />
            <label htmlFor="rdSupplierType1">Online Supplier</label>
          </div>
          <div className="radio radio-success radio-inline">
            <input id="app" type="radio" name="rdSupplierType" defaultValue="L" onclick="checkSuppType(this.value);" />
            <label htmlFor="rdSupplierType2">Local Supplier</label>
          </div>
        </div>
      </div>
    </div>
    <div className="row mt-2">
      <div className="col-md-12 phps_row_0">
        <div id="onlineSupp" style={{width: '100%', display: 'block'}}>
          <div className="row">
            <div className="form-group col-md-3">
              <label>Supplier</label>
              

              <MultiSelect
                  options={suppliersOnlineOptions}
                  isMulti
                  isSearchable
                  placeholder="- Select -"
                  noOptionsMessage={() => "No Supplier Found"}
                  className="custom-select required"
                />
              
            </div>
            <div className="form-group col-md-3">
              <label>Supplier Profile</label>
              <select title="- Select -" className="required select_style1 selectpicker form-control form-control-sm show-menu-arrow dropdown_medium bs-select-hidden" name="sel_supplierProfile" id="sel_supplierProfile" data-live-search="true">
                <option className="bs-title-option" value>- Select -</option>
                <option label="hotelbeds" value={4} selected="selected">hotelbeds
                </option>
              </select>
            </div>
          </div>
        </div>
        <div id="localSupp" style={{width: '100%', display: 'none'}}>
          <div className="row">
            <div className="form-group col-md-3">
              <label>Supplier</label>

            
              <MultiSelect
                  options={advance_suppliers_options}
                  isMulti
                  isSearchable
                  placeholder="- Select -"
                  noOptionsMessage={() => "No Supplier Found"}
                  className="custom-select required"
                />  
             
            </div>
            <div className="form-group col-md-3">
              <label>Supplier Profile</label>
              

              <MultiSelect
                  options={supplierProfileOptions}
                  isMulti
                  isSearchable
                  placeholder="- Select -"
                  noOptionsMessage={() => "No Supplier Found"}
                  className="custom-select required"
                />  
              
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="row mt-2 ">
      <div className="form-group col-md-3">
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
      <div className="form-group col-md-3">
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
      <div className="form-group col-md-3">
        <label>Applied Multiplier</label>
        <input type="text" className="required form-control form-control-sm" id="applied_multiplier" name="applied_multiplier" defaultValue="1.14734" onblur="get_modification_value(this)" onkeyup="extractNumber(this,5,false);" />
        <span id="nc1"> EUR </span> To <span id="dc1">USD </span>
      </div>
      <div className="form-group col-md-3">
        <label>Current Rate</label><br />
        <span id="currency_conversion_1">1.14734</span>
      </div>
      <div style={{display: 'none'}}>
        <div className="form-group col-md-3">
          <label>Basecurrency Multiplier</label>
          <input type="text" name="basecurrency_multiplier" className="form-control form-control-sm" id="basecurrency_multiplier" onblur="extractNumber(this,5,false);" defaultValue="3.75" onkeyup="extractNumber(this,6,false);" />
          <span id="dc2">USD </span> To USD To SAR
          Current Rate<div id="currency_conversion_2">1</div>
        </div>
        <div className="form-group col-md-3">
          <label>Basecurrency Multiplier Native</label>
          <input type="text" name="basecurrency_multiplier_native" className="form-control form-control-sm" id="basecurrency_multiplier_native" onblur="extractNumber(this,5,false);" defaultValue="4.30262" onkeyup="extractNumber(this,6,false);" />
          <span id="nc2"> EUR </span> To SAR
          Current Rate-: <div id="currency_conversion_3"> 1.14734</div>
        </div>
        <div className="form-group col-md-3">
          <label>Booking Currency To Agent Currency Multiplier</label>
          <input type="text" name="agent_currency_multiplier" className="form-control form-control-sm" id="agent_currency_multiplier" defaultValue="3.75" onblur="extractNumber(this,5,false);" onkeyup="extractNumber(this,6,false);" />
          <span id="dc4"> USD </span> To <span id="dc5">SAR</span>
          Current Rate- <div id="currency_conversion_4">3.75</div>
        </div>
      </div>
    </div>
    <div className="row mt-2">
      <div className="form-group col-md-3">
        <label>Markup Type</label>
        <div className="radioline1">
          <div className="radio radio-success radio-inline">
            <input type="radio" id="percentage" name="rdMarkupType" defaultValue="P" onclick="checkMarkupType(this.value);" defaultChecked="checked" />
            <label htmlFor="percentage">Percentage</label>
          </div>
          <div className="radio radio-success radio-inline">
            <input type="radio" name="rdMarkupType" id="app" defaultValue="A" onclick="checkMarkupType(this.value);" />
            <label htmlFor="amount">Amount</label>
          </div>
        </div>
      </div>
      <div className="form-group col-md-3" id="amountmarkup" style={{display: 'none'}}>
        <label>Markup Amount</label>
        <input type="text" name="amount_markup" id="amount_markup"   onclick="checksupplieramount()" onchange="get_markup_by_amount()" className="form-control" />
      </div>
      <div className="form-group col-md-3">
        <label>Agent Markup</label>
        <div className="input-group date col-md-12 col-xs-12">
          <input type="text" name="txt_agent_markup" id="txt_agent_markup" className="form-control" defaultValue="23.596798270365" size={5} onchange="cal_total_markup();" onblur="extractNumber(this,2,true);" onkeyup="extractNumber(this,2,true);" />
          <span className="input-group-addon">%</span>
        </div>
      </div>
      <div className="form-group col-md-3">
        <label>Total Markup</label>
        <div className="input-group date col-md-12 col-xs-12">
          <input type="text" readOnly="readonly" name="txt_markup" id="txt_markup" className="form-control" defaultValue="23.596798270365" size={5} onblur="extractNumber(this,3,false);get_modification_value(this);" onkeyup="extractNumber(this,3,false);" /><span className="input-group-addon">%</span>
          <input type="hidden" name="txt_wh_markup" defaultValue={0} size={5} />
        </div>
      </div>
    </div>
    <div className="form-group col-md-3 phps_row_0 mb-3">
      <label>Apply Service Tax</label>
      <input type="text" className="form-control form-control-sm" name="applicable_service_tax" id="applicable_service_tax" defaultValue size={5} onblur onkeyup="extractNumber(this,3,false);" />
    </div>
    <div className="form-group panel-body" style={{border: '1px solid #e4e5e7', paddingTop: '7px', paddingBottom: '23px', paddingLeft: '13px', paddingRight: '20px'}}>
      <div className="row">
        <div className="form-group col-md-12 phps_row_1">
          <h5>Rates (Supplier Rate)</h5>
        </div>
        <div className="form-group col-md-3 phps_row_0">
          <label>Date</label><br />
          <div id="set_date">05-08-2023 to 06-08-2023</div>
        </div>
        <div className="form-group col-md-3 phps_row_1">
          <label>Supplier Rate</label>
          <input type="text" name="native_rate" id="native_rate"   className="required form-control form-control-sm" onblur="extractNumber(this,3,false);" onkeyup="extractNumber(this,3,false);" onchange="get_modification_value(this)" />
        </div>
        <div className="form-group col-md-3 phps_row_0">
          <label>Agent Rate</label>
          <input type="text" id="display_rate" name="display_rate"   className="required form-control form-control-sm" onblur="extractNumber(this,3,false);" onkeyup="extractNumber(this,3,false);" onchange="markup_change_with_selling_rate(this);" />
        </div>
        {/* code changed by Anand on 3 Dec 2012 */}
        <div className="form-group col-md-3 phps_row_1">
          <label>Supplier rate</label>
          <div>
            <span id="total_supplier_rate" /> <span id="nc4" />
          </div>
        </div>
        <div className="form-group col-md-3 phps_row_0">
          <label>Agent rate</label>
          <div>
            <span id="total_agent_rate" /> <span id="dc5">INR</span>
          </div>
        </div>
        {/*  /*code added by rakesh for sub agent in misc* /*/}
        <div className="form-group col-md-3 phps_row_1">
          <label>Supplier Discount</label>
          <input type="text" name="native_discount" id="native_discount"   onchange="get_modification_value(this)" className="form-control form-control-sm" onblur="extractNumber(this,3,false);" onkeyup="extractNumber(this,3,false);" maxLength={6} />
        </div>
        <div className="form-group col-md-3 phps_row_0">
          <label>Agent Display Discount</label>
          <input type="text" name="display_discount" id="display_discount"   onchange="get_modification_value(this)" className="form-control form-control-sm" onblur="extractNumber(this,3,false);" onkeyup="extractNumber(this,3,false);" maxLength={10} />
        </div>
        <div className="form-group col-md-3 phps_row_1">
          <label>Total Supplier Rate</label>
          <div>
            <span id="total_native_rate" /> <span id="nc5" />
          </div>
        </div>
        <div className="form-group col-md-3 phps_row_0">
          <label>Total Agent Rate</label>
          <div data-toggle="tooltip" data-placement="top" title data-original-title="Service Tax is included in Total Booking Cost">
            <span id="total_display_rate" />
            <span id="dc6">INR</span>
          </div>
        </div>
        <div className="form-group col-md-3 phps_row_1">
          <label>Payment Gateway Charges</label>
          <div className="input-group date col-md-12 col-xs-12">
            <input type="text" className="form-control form-control-sm" name="additional_charge"   onkeyup="extractNumber(this,6,false);" />
            <span className="input-group-addon" id="dc8">INR</span>
          </div>
        </div>
      </div>
    </div>
    <div className="row mt-2">
      <div className="form-group col-md-3 phps_row_0">
        <label>Expiration Date</label>
        <div className="input-group date col-md-12 col-xs-12 col-sm-12">
          <input id="expiration_date" data-bs-toggle="tooltip" data-placement="top" title="If you Modify Expiration Date, also change in cancellation policy." className="form-control form-control-sm required" name="expiration_date" type="text" size={25} defaultValue="15/09/2023 05:29:00" onkeypress="copyExpirationDate()" />
        </div>
      </div>
    </div>
    <div className="row mt-2">
      <div className="form-group col-md-12 phps_row_1">
        <label>Description</label>
        <textarea className="required form-control form-control-sm" name="description" rows={4} cols={70} defaultValue={""} />
      </div>
    </div>
    <div className="row mt-2">
      <div className="form-group col-md-12 phps_row_1">
        <label>Cancellation Policy</label>
        <textarea id="cancellation_policy" name="cancellation_policy" rows={4} className="form-control form-control-sm" cols={60} defaultValue={""} />
      </div>
    </div>
    <div className="row mt-2">
      <div className="form-group col-md-12 phps_row_0">
        <label>Supplier Cancellation Policy</label>
        <textarea name="supplier_cancellation_policy" rows={4} cols={70} className="form-control" defaultValue={""} />
      </div>
    </div>
    <br />
    <div className="row">
      <div className="form-group col-md-12 phps_row_1">
        <h5>Email To</h5>
        <div className="radioline1 mt-1">
          <div className="checkbox checkbox-success checkbox-inline">
            <input id="mailtoagent" type="checkbox" name="mailtoagent" defaultValue={1} />
            <label htmlFor="mailtoagent">Agent and Consultant</label>
          </div>
          <div className="checkbox checkbox-success checkbox-inline">
            <input id="app" type="checkbox" name="mailtocommon" defaultValue={1} />
            <label htmlFor="mailtocommon">Email Settings</label>
          </div>
          <div className="checkbox checkbox-success checkbox-inline">
            <input id="app" type="checkbox" name="mailtosupplier" defaultValue={1} />
            <label htmlFor="mailtosupplier">Supplier</label>
          </div>
        </div>
      </div>
    </div>
    <br />
    <div className="row">
      <div className="form-group col-md-3 phps_row_0">
        <span id="loading" style={{display: 'none'}}><img src="/cpfv3/images/loading.gif" alt="" /></span>
        <span id="save_button" style={{display: 'block'}}><button type="button" className="btn btn-dark btn-sm" name="b1" id="b1" value="Save" onclick="Javascript submit_form(document.forms['modify_booking_form']);">
            <i className="fa fa-floppy-o" />&nbsp;Save
          </button></span>
      </div>
    </div>
  </div>
</form>




      </div>
    </>
  );
};
export default BookingAddOfflineMiscServices;