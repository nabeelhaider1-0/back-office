
import React, { useState, } from "react"; // Import React and useState
import Flatpickr from "react-flatpickr";
import Header2 from "../header2/header2";
import MultiSelect from "../reactMultiSelect";
import { country_options, days, edtoptions, groupTypes, nationalityOptions, salutations } from "../../constants/contants";



const BookingAddOfflineGroupBooking = () => {

    const [startDate, setStartDate] = useState(null); // State for the start date

  
    const handleTrashClick = () => {
      // Function to clear both start and end dates
      setStartDate(null);

    };
  
  
    
  
    
    

  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">

        <Header2 title="ADD OFFLINE GROUP BOOKING
" linkText1="Search Bookings" linkText2="Add Offline Group Booking" link1="/"/>

 
<form>
  <div className="panel-body">
    <div className="row">
      <div className="form-group col-md-3 mb-2">
        <label>Agent Information</label>
        <MultiSelect
                  options={edtoptions}
                  isMulti
                  isSearchable
                  placeholder="Select Agent..."
                  noOptionsMessage={() => "No Agent Found"}
                  className="custom-select required"

                />
       
      </div>
      <div id="sub_user">
        <div className="phps_row_1 row">
          <div id="add_sub_user" />
        </div>
      </div>
      <div id="sub_agent">
        <div className="phps_row_1 row">
          <div id="add_sub_agent" />
        </div>
      </div>
      <div className="form-group col-md-3">
        <label htmlFor="exampleInputEmail1">Credit Value</label>
        <div id="id_credit_value">0</div>
      </div>
      <div className="form-group col-md-3">
        <label htmlFor="exampleInputEmail1">Credit Usage</label>
        <div id="id_credit_usage">0</div>
      </div>
    </div>
    <div className="row mt-2">
      <div className="form-group col-md-2 phps_row_0">
        <label>Group Leader Name</label>
      
        <MultiSelect
                  options={salutations}
                  isMulti
                  isSearchable
                  placeholder="Salutation"
                  noOptionsMessage={() => "No Salutation Found"}
                  className="custom-select required"

                />
       
      </div>
      <div className="form-group col-md-3 phps_row_1">
        <label>&nbsp;</label>
        <input type="text" placeholder="First Name" maxLength={30} name="leader_first_name" id="leader_first_name" className="required form-control form-control-sm"   onkeyup="isalpha_character(this);" />
      </div>
      <div className="form-group col-md-3 phps_row_0">
        <label>&nbsp;</label>
        <input type="text" placeholder="Last Name" maxLength={30} name="leader_last_name" id="leader_last_name" className="required form-control form-control-sm"   onkeyup="isalpha_character(this);" />
      </div>
    </div>
    <div className="row mt-1">
      <div className="form-group col-md-12 phps_row_1">
        <label>Address</label>
        <textarea name="txt_address" cols={35} className="form-control form-control-sm required" rows={4} defaultValue={""} />
        {/* <div class="summernote" id="txt_address" name="txt_address">
                  
                  </div> */}
      </div>
    </div>
    <div className="row mt-2">
      <div className="form-group col-md-3 phps_row_0">
        <label>Email Address</label>
        <input type="text" name="holder_email" className="required form-control form-control-sm" id="holder_email"   maxLength={60} />
      </div>
      <div className="form-group col-md-3 phps_row_1">
        <label>Daytime Contact No</label>
        <input type="text" name="daytime_contact_no" className="required form-control form-control-sm" id="daytime_contact_no"   maxLength={25} onkeyup="extractNumber(this,0,0);" />
      </div>
      <div className="form-group col-md-3 phps_row_0">
        <label>Postal Code</label>
        <input type="text" name="postal_code" className="required form-control form-control-sm" id="postal_code"   maxLength={10} onkeyup="extractNumber(this,0,0);" />
      </div>
      <div className="form-group col-md-3 phps_row_1">
        <label>Arrival date</label>
        <div className="input-group date col-md-12 col-sm-12 col-xs-12" id="booking_to_date_cal">
        <Flatpickr
                  value={startDate}
                  onChange={(date) => setStartDate(date)}
                  options={{ dateFormat: "Y-m-d" }}
                  style={{width:'310px'}}
                />
          <span className="input-group-addon dateIcon"><i className="fa fa-th" /></span>
          <span className="input-group-addon" id="checkTrashBtn" onClick={handleTrashClick}>
            <i className="fa fa-trash" />
          </span>
        </div>
      </div>
    </div>
    {/*03/09/13 Mahesh-add the holder country and the holder city*/}
    <div className="row mt-2">
      <div className="form-group col-md-3 phps_row_0">
        <label>Group Leader Country</label>
        <MultiSelect
                  options={country_options}
                  isMulti
                  isSearchable
                  placeholder="- Select a country -"
                  noOptionsMessage={() => "No Country Found"}
                  className="custom-select required"
                  

                />
       
      </div>
      <div className="form-group col-md-3 phps_row_1">
        <label>Group Leader City</label>
        <select name="holder_city" id="holder_city" className="required selectpicker form-control form-control-sm show-menu-arrow bs-select-hidden" data-live-search="true">
          <option value>- Select a city -</option>
        </select>
      </div>
      <div className="form-group col-md-3 phps_row_0">
        <label>Booking Country</label>
        <MultiSelect
                  options={country_options}
                  isMulti
                  isSearchable
                  placeholder="- Select a country -"
                  noOptionsMessage={() => "No Country Found"}
                  className="custom-select required"
                  

                />
      </div>
      <div className="form-group col-md-3 phps_row_1">
        <label>Booking City</label>
        <select name="booking_city" id="booking_city" className="required selectpicker form-control form-control-sm show-menu-arrow bs-select-hidden" data-live-search="true">
          <option value>- Select a city -</option>
        </select>
      </div>
    </div>
    <div className="row mt-2">
      <div className="form-group col-md-3 phps_row_0">
        <label>Group Nationality</label>

        <MultiSelect
                  options={nationalityOptions}
                  isMulti
                  isSearchable
                  placeholder=" --Select-- "
                  noOptionsMessage={() => "No Country Found"}
                  className="custom-select "
                  

                />
      
      </div>
      <div className="form-group col-md-3 phps_row_1">
        <label>Group Type</label>
        
        <MultiSelect
                  options={groupTypes}
                  isMulti
                  isSearchable
                  placeholder=" --Select-- "
                  noOptionsMessage={() => "No Group Found"}
                  className="custom-select "
                  

                />
     
      </div>
      <div className="form-group col-md-3 phps_row_0">
        <label>Budget per person per night</label>
        <input type="text" data-toggle="tooltip" data-placement="top" title className="required form-control form-control-sm" name="budget" maxLength={40}   data-original-title="EX. 10001 AED" />
      </div>
      <div className="form-group col-md-3 phps_row_1">
        <label>Total Nights</label>
      
       
        <MultiSelect
                  options={days}
                  isMulti
                  isSearchable
                  placeholder=" --Select-- "
                  noOptionsMessage={() => "No Days Found"}
                  className="custom-select required"
                  

                />
    
      </div>
    </div>
    <div className="row mt-2">
      <div className="form-group col-md-3 phps_row_0">
        <label>No of Adults</label>
        <input type="text" name="no_of_adults" className="required form-control form-control-sm"   maxLength={3} onkeyup="extractNumber(this,0,0);" />
      </div>
      <div className="form-group col-md-3 phps_row_1">
        <label>No of Children Age (0-2)</label>
        <input type="text" className="form-control form-control-sm" name="no_of_child_0_2"   maxLength={2} onkeyup="extractNumber(this,0,0);" />
      </div>
      <div className="form-group col-md-3 phps_row_0">
        <label>No of Children Age (3-12)</label>
        <input type="text" className="form-control form-control-sm" name="no_of_child_3_12"   maxLength={2} onkeyup="extractNumber(this,0,0);" />
      </div>
    </div>
    <div className="row mt-2">
      <div className="col-md-12">
        <label style={{fontFamily: 'MONTSERRAT', fontWeight: 'normal', fontSize: '12px'}}>Category of hotel</label>
      </div>
      <div className="form-group col-md-12">
        <div className="radioline1 mt-1">
          <div className="checkbox checkbox-success checkbox-inline">
            <input id="star1" type="checkbox" name="hotel_rating[]" defaultValue={1} onclick="changeStarImage(this,'star1','1');" />
            <label htmlFor="star1"><i className="fa fa-star text-warning" /></label>
          </div>
          {/*<img src="images/star_1.jpg" id="star1" />*/}
          <div className="checkbox checkbox-success checkbox-inline">
            <input id="app" type="checkbox" name="hotel_rating[]" defaultValue={2} onclick="changeStarImage(this,'star2','2');" />
            {/*<img src="images/star_2.jpg" id="star2" />*/}
            <label htmlFor="star2"><i className="fa fa-star text-warning" />
              <i className="fa fa-star text-warning" /></label>
          </div>
          <div className="checkbox checkbox-success checkbox-inline">
            <input id="app" type="checkbox" name="hotel_rating[]" defaultValue={3} onclick="changeStarImage(this,'star3','3');" />
            {/*<img src="images/star_3.jpg" id="star3" />*/}
            <label htmlFor="star3"><i className="fa fa-star text-warning" />
              <i className="fa fa-star text-warning" />
              <i className="fa fa-star text-warning" /></label>
          </div>
          <div className="checkbox checkbox-success checkbox-inline">
            <input id="app" type="checkbox" name="hotel_rating[]" defaultValue={4} onclick="changeStarImage(this,'star4','4');" />
            {/*<img src="images/star_4.jpg" id="star4" />*/}
            <label htmlFor="star4"><i className="fa fa-star text-warning" />
              <i className="fa fa-star text-warning" />
              <i className="fa fa-star text-warning" />
              <i className="fa fa-star text-warning" /></label>
          </div>
          <div className="checkbox checkbox-success checkbox-inline">
            <input id="app" type="checkbox" name="hotel_rating[]" defaultValue={5} onclick="changeStarImage(this,'star5','5');" />
            {/*<img src="images/star_5.jpg" id="star5" />*/}
            <label htmlFor="star5"><i className="fa fa-star text-warning" />
              <i className="fa fa-star text-warning" />
              <i className="fa fa-star text-warning" />
              <i className="fa fa-star text-warning" />
              <i className="fa fa-star text-warning" /></label>
          </div>
        </div>
      </div>
      <div className="form-group col-md-3 phps_row_1 mt-2">
        <label>Hotel Name</label>
        <input type="text" name="hotel_name" id="hotel_name" className="form-control form-control-sm"   />
      </div>
    </div>
    <div className="row mt-4">
      <div className="form-group col-md-12">
        <h5>Number of rooms</h5>
        <div className="row">
          <div className="form-group col-md-2">
            <label>Twin</label>
            <input aria-describedby="sizing-addon3" type="text" className="form-control form-control-sm" name="txt_twin" id="txt_twin" size={5} maxLength={2}   onkeyup="extractNumber(this,0,0);" />
          </div>
          <div className="form-group col-md-2">
            <label>Double</label>
            <input aria-describedby="sizing-addon3" type="text" className="form-control form-control-sm" name="txt_double" id="txt_double" size={5} maxLength={2}   onkeyup="extractNumber(this,0,0);" />
          </div>
          <div className="form-group col-md-2">
            <label>Single</label>
            <input aria-describedby="sizing-addon3" type="text" className="form-control form-control-sm" name="txt_single" id="txt_single" size={5} maxLength={2}   onkeyup="extractNumber(this,0,0);" />
          </div>
          <div className="form-group col-md-2">
            <label>Triple</label>
            <input aria-describedby="sizing-addon3" type="text" className="form-control form-control-sm" name="txt_triple" id="txt_triple" size={5} maxLength={2}   onkeyup="extractNumber(this,0,0);" />
          </div>
          <div className="form-group col-md-2">
            <label>Quad</label>
            <input aria-describedby="sizing-addon3" type="text" className="form-control form-control-sm" name="txt_quad" id="txt_quad" size={5} maxLength={2}   onkeyup="extractNumber(this,0,0);" />
          </div>
        </div>
      </div>
    </div>
    <div className="row mt-2">
      <div className="form-group col-md-12 phps_row_0">
        <label>Request/Information</label>
        <textarea required className="select_style form-control form-control-sm" name="special_request" cols={91} rows={4} defaultValue={""} />
        {/* <div class="summernote" name="special_request">
                      
                  </div> */}
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
            <input id="app" type="checkbox" name="mailtoconsultant" defaultValue={1} />
            <label htmlFor="mailtoconsultant">Consultant</label>
          </div>
          <div className="checkbox checkbox-success checkbox-inline">
            <input id="app" type="checkbox" name="mailtocommon" defaultValue={1} />
            <label htmlFor="mailtocommon">Common </label>
          </div>
        </div>
      </div>
    </div>
    <div className="form-group col-md-3 phps_row_1 mt-4">
      <span id="loading" style={{display: 'none'}}><img src="/cpfv3/images/loading.gif" alt="" /></span>
      <button type="button" className="btn btn-dark btn-sm" name="b1" id="b1" onclick="Javascript submit_form(document.forms['groups_modify_booking_form']);">
        <i className="fa fa-floppy-o" />&nbsp;Save
      </button>
    </div>
  </div>
</form>



      </div>
    </>
  );
};
export default BookingAddOfflineGroupBooking;