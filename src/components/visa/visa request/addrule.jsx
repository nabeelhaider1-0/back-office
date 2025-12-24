import Header2 from "../../header2/header2";
import React, { useState, } from "react"; // Import React and useState
import Flatpickr from "react-flatpickr";
import MultiSelect from "../../reactMultiSelect";
import { AirlineOptions, Journey_options, add_options, addrule_agent_options, addrule_currencyOptions, cancel_options, fare_class_options, flightproviders_options, nationalityOptions, refund_options, staffaccessreports_initialOptions, travel_class_options } from "../../../constants/contants";
const FlightAddRule = () => {
    const [startDate, setStartDate] = useState(null); // State for the start date
    const [endDate, setEndDate] = useState(null); // State for the end date
  
    const handleTrashClick = () => {
      // Function to clear both start and end dates
      setStartDate(null);
      setEndDate(null);
    };
    const [startDate1, setStartDate1] = useState(null); // State for the start date
    const [endDate1, setEndDate1] = useState(null); // State for the end date
  
    const handleTrashClick1 = () => {
      // Function to clear both start and end dates
      setStartDate1(null);
      setEndDate1(null);
    };
  return (
    <>
      <Header2 title="ADD RULE" linkText1="Add Applicable Rule" />
      <div class="container-fluid pt-0 p-4" id="content-pad">
  
      <div className="panel-body">
  <form method="POST" name="rules_module" id="rules_module" action="flight_rules.php">
    <div className="row mt-2">
      <div className="col-md-3 form-group phps_row_0 padd_5">
        <label>Rule Identifier</label>
        <input type="text" name="rule_identifier" id="rule_identifier" defaultValue onkeyup="IsValid(this.value);" autoComplete="off" maxLength={50} className="form-control form-control-sm required test123" /><br />
      </div>
      {/* <div class="col-md-4 form-group">
								<label>Rule Type: </label>
								<br/>
								<div class="radio radio-success radio-inline">
									<input type="radio" name="rule" id="id_markup" value="MARKUP" data-element="Mark Up"  checked /><label for="id_markup">Mark up</label>
								</div>
								<div class="radio radio-success radio-inline">
									<input type="radio" name="rule" id="id_discount" value="DISCOUNT" data-element="Discount"  /><label for="id_discount">Discount</label>
								</div>
								<div class="radio radio-success radio-inline">
									<input type="radio" name="rule" id="id_reissue_charges" value="REISSUE" data-element="Reissue Charges"  /><label for="id_reissue_charges">Reissue Charges</label>
								</div>
								<div class="radio radio-success radio-inline">
									<input type="radio" name="rule" id="id_cancellation_service_charges" value="CANCELLATION" data-element="Cancellation Charges"  /><label for="id_cancellation_service_charges">Cancellation Service Charges</label>
								</div>
							</div> */}
      <div className="col-md-4 form-group">
        <label>Rule Type: </label>
        <br />
        <div className="radioline1 mt-2">
          <div className="checkbox checkbox-success checkbox-inline">
            <input type="checkbox" name="rule[]" id="id_rate_policy" defaultValue="RATE_POLICY" data-element="Rate policy" defaultChecked /><label htmlFor="id_rate_policy">Rate
              Policy</label>
          </div>
          <div className="checkbox checkbox-success checkbox-inline">
            <input type="checkbox" name="rule[]" id="app" defaultValue="REISSUE" data-element="Reissue Charges" /><label htmlFor="id_reissue_charges">Reissue
              Charges</label>
          </div>
          <div className="checkbox checkbox-success checkbox-inline">
            <input type="checkbox" name="rule[]" id="app" defaultValue="CANCELLATION" data-element="Cancellation Charges" /><label htmlFor="id_cancellation_service_charges">Cancellation Service Charges</label>
          </div>
          <br />
        </div>
      </div>
      <div id="rate_policy_show" className="col-md-2 form-group" style={{display: 'block'}}>
        <label>&nbsp; </label>
        <br />
        <div className="radioline1">
          <div className="radio radio-success radio-inline">
            <input type="radio" name="sub_rule" id="id_markup" defaultValue="MARKUP" data-element="Mark Up" defaultChecked /><label htmlFor="id_markup">Mark up</label>
          </div>
          <div className="radio radio-success radio-inline">
            <input type="radio" name="sub_rule" id="app" defaultValue="DISCOUNT" data-element="Discount" /><label htmlFor="id_discount">Discount</label>
          </div>
        </div>
      </div>
      <div className="col-md-3 form-group">
        <label>Status: </label>
        <br />
        <div className="radioline1">
          <div className="radio radio-success radio-inline">
            <input type="radio" id="status_active" defaultValue="A" name="status" defaultChecked /><label htmlFor="status_active">Active</label>
          </div>
          <div className="radio radio-success radio-inline">
            <input type="radio" id="app" defaultValue="I" name="status" /><label htmlFor="status_inactive">In
              Active</label>
          </div>
        </div>
        {/* <select class="selectpicker form-control show-menu-arrow input_width_2 setfonts required" id='sel_status' name="sel_status">
									<option label="-Select-" value="">-Select-</option>
<option label="Active" value="A">Active</option>
<option label="In Active" value="I">In Active</option>

								</select> */}
      </div>
    </div>
    <div className="row">
      <div className="col-md-3 form-group phps_row_1 padd_5">
        <label>Consultant</label>
        <MultiSelect
                  options={staffaccessreports_initialOptions}
                  isSearchable
                  placeholder="- Select -"
                  className="custom-select "

                />
        
      </div>
      <div className="col-md-3 form-group phps_row_0 padd_5">
        <label>Branch</label>
        <MultiSelect
                  options={add_options}
                  isSearchable
                  placeholder="- Select Branch -"
                  className="custom-select "

                />
       
      </div>
      <div className="col-md-3 form-group phps_row_1 padd_5">
        <label>Agent</label>

        <MultiSelect
                  options={addrule_agent_options}
                  isSearchable
                  placeholder="- Select Agent -"
                  className="custom-select "

                />
        
      </div>
      <div className="col-md-3 form-group phps_row_0 padd_5">
        <label>Currency: </label>
        <MultiSelect
                  options={addrule_currencyOptions}
                  isSearchable
                  placeholder="- Select -"
                  className="custom-select "

                />
        
       
      </div>
    </div>
  </form>
  <br />
  <form>
    <div className="row mt-1">
      <div className="col-md-6 form-group">
        <div className="card" style={{paddingRight: '44px', paddingTop: '12px', paddingBottom: '12px', paddingLeft: '23px'}}>
          <h6>From</h6>
          <div className="row">
            <div className="col-md-6 form-group">
              <label>Country: </label>
              <MultiSelect
                  options={nationalityOptions}
                  isSearchable
                  placeholder="- Select Country -"
                  className="custom-select "

                />
           
            </div>
            <div className="col-md-6 form-group">
              <label>Airport: </label>
              <select className="selectpicker form-control form-control-sm show-menu-arrow input_width_2 setfonts color_set_1 bs-select-hidden" id="sel_airport_from" name="sel_airport_from[]"     data-live-search="true" data-actions-box="true">
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6 form-group">
        <div className="card" style={{paddingRight: '44px', paddingTop: '12px', paddingBottom: '12px', paddingLeft: '24px'}}>
          <h6>To</h6>
          <div className="row">
            <div className="col-md-6 form-group ">
              <label>Country: </label>
              <MultiSelect
                  options={nationalityOptions}
                  isSearchable
                  placeholder="- Select Country -"
                  className="custom-select "

                />
            </div>
            <div className="col-md-6 form-group ">
              <label>Airport: </label>
              <select className="selectpicker form-control form-control-sm  show-menu-arrow input_width_2 setfonts color_set_1 bs-select-hidden" id="sel_airport_to" name="sel_airport_to[]"    data-live-search="true" data-actions-box="true">
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br />
    <div className="row mt-2">
      <div className="col-md-3 form-group">
        <label>Airline: </label>
       
        <MultiSelect
                  options={ AirlineOptions}
                  isSearchable
                  placeholder="- Select Airline -"
                  className="custom-select "

                />
        
      </div>
      <div className="col-md-3 form-group phps_row_1 padd_5">
        <label>Class of Travel </label>
        
        <MultiSelect
                  options={ travel_class_options}
                  isSearchable
                  placeholder="- Select Travel Class  -"
                  className="custom-select "

                />
      
      </div>
      <div className="col-md-3 form-group phps_row_0 padd_5">
        <label>Fare Class </label>
        
        <MultiSelect
                  options={ fare_class_options}
                  isSearchable
                  placeholder="- Select Fare Class  -"
                  className="custom-select "

                />
       
      </div>
      <div className="col-md-3 form-group">
        <label>Flight Providers: </label>

        
        <MultiSelect
                  options={ flightproviders_options}
                  isSearchable
                  placeholder="- Select Flight Provider  -"
                  className="custom-select "

                />
      
      </div>
    </div>
    <br />
    <div>
      <label><h6>Last Available Seats </h6></label>
    </div>
    <div className="row">
      <div className="col-md-3 form-group phps_row_1 padd_5">
        <label>From: </label>
        <input type="number" min={0} id="seat_left_between" name="seat_left_between" className="form-control form-control-sm " defaultValue onkeypress="return IsNumeric(event,this,'no');" onblur="return removeError(this.id);" ondrop="return false;" onpaste="return false;" />
        <span id="seat_left_between_error" style={{color: 'Red', display: 'none'}}>*Please enter numeric value
          for Last Available Seats From</span>
        {/* <select class="selectpicker form-control show-menu-arrow input_width_2 setfonts" id='seat_left_between' name="seat_left_between" onchange="selected_value(this.value);">
									<option value="">--</option>
									<option label="0" value="0">0</option>
<option label="1" value="1">1</option>
<option label="2" value="2">2</option>
<option label="3" value="3">3</option>
<option label="4" value="4">4</option>
<option label="5" value="5">5</option>
<option label="6" value="6">6</option>
<option label="7" value="7">7</option>
<option label="8" value="8">8</option>
<option label="9" value="9">9</option>
<option label="10" value="10">10</option>
<option label="11" value="11">11</option>
<option label="12" value="12">12</option>
<option label="13" value="13">13</option>
<option label="14" value="14">14</option>
<option label="15" value="15">15</option>
<option label="16" value="16">16</option>
<option label="17" value="17">17</option>
<option label="18" value="18">18</option>
<option label="19" value="19">19</option>
<option label="20" value="20">20</option>
<option label="21" value="21">21</option>
<option label="22" value="22">22</option>
<option label="23" value="23">23</option>
<option label="24" value="24">24</option>
<option label="25" value="25">25</option>
<option label="26" value="26">26</option>
<option label="27" value="27">27</option>
<option label="28" value="28">28</option>
<option label="29" value="29">29</option>
<option label="30" value="30">30</option>
<option label="31" value="31">31</option>
<option label="32" value="32">32</option>
<option label="33" value="33">33</option>
<option label="34" value="34">34</option>
<option label="35" value="35">35</option>
<option label="36" value="36">36</option>
<option label="37" value="37">37</option>
<option label="38" value="38">38</option>
<option label="39" value="39">39</option>
<option label="40" value="40">40</option>
<option label="41" value="41">41</option>
<option label="42" value="42">42</option>
<option label="43" value="43">43</option>
<option label="44" value="44">44</option>
<option label="45" value="45">45</option>
<option label="46" value="46">46</option>
<option label="47" value="47">47</option>
<option label="48" value="48">48</option>
<option label="49" value="49">49</option>
<option label="50" value="50">50</option>
<option label="51" value="51">51</option>
<option label="52" value="52">52</option>
<option label="53" value="53">53</option>
<option label="54" value="54">54</option>
<option label="55" value="55">55</option>
<option label="56" value="56">56</option>
<option label="57" value="57">57</option>
<option label="58" value="58">58</option>
<option label="59" value="59">59</option>
<option label="60" value="60">60</option>
<option label="61" value="61">61</option>
<option label="62" value="62">62</option>
<option label="63" value="63">63</option>
<option label="64" value="64">64</option>
<option label="65" value="65">65</option>
<option label="66" value="66">66</option>
<option label="67" value="67">67</option>
<option label="68" value="68">68</option>
<option label="69" value="69">69</option>
<option label="70" value="70">70</option>
<option label="71" value="71">71</option>
<option label="72" value="72">72</option>
<option label="73" value="73">73</option>
<option label="74" value="74">74</option>
<option label="75" value="75">75</option>
<option label="76" value="76">76</option>
<option label="77" value="77">77</option>
<option label="78" value="78">78</option>
<option label="79" value="79">79</option>
<option label="80" value="80">80</option>
<option label="81" value="81">81</option>
<option label="82" value="82">82</option>
<option label="83" value="83">83</option>
<option label="84" value="84">84</option>
<option label="85" value="85">85</option>
<option label="86" value="86">86</option>
<option label="87" value="87">87</option>
<option label="88" value="88">88</option>
<option label="89" value="89">89</option>
<option label="90" value="90">90</option>
<option label="91" value="91">91</option>
<option label="92" value="92">92</option>
<option label="93" value="93">93</option>
<option label="94" value="94">94</option>
<option label="95" value="95">95</option>
<option label="96" value="96">96</option>
<option label="97" value="97">97</option>
<option label="98" value="98">98</option>
<option label="99" value="99">99</option>
<option label="100" value="100">100</option>

								</select> */}
      </div>
      <div className="col-md-3 form-group phps_row_0 padd_5">
        <label>To: </label>
        <input type="number" min={0} id="seat_left_to" name="seat_left_to" className="form-control form-control-sm " defaultValue onkeypress="return IsNumeric(event,this,'no');" onblur="return removeError(this.id);" ondrop="return false;" onpaste="return false;" />
        <span id="seat_left_to_error" style={{color: 'Red', display: 'none'}}>*Please enter numeric value for
          Last Available Seats to</span>
        {/* <select class="selectpicker form-control show-menu-arrow input_width_2 setfonts" id='seat_left_to' name="seat_left_to">
									<option value="">--</option>
									
								</select> */}
      </div>
      <div className="col-md-3 form-group">
        <label>Booking Policy: </label>

        
        <MultiSelect
                  options={ refund_options}
                  isSearchable
                  placeholder="- Select Booking Policy  -"
                  className="custom-select "

                />
      
      </div>
      <div className="col-md-3 form-group">
        <label>Journey Type: </label>
        
        <MultiSelect
                  options={ Journey_options}
                  isSearchable
                  placeholder="- Select Journey Type  -"
                  className="custom-select "

                />
       
      </div>
    </div>
    <br />
    <div className="row">
      <div className="col-md-3 form-group phps_row_1 padd_5">
        <label className="valuefor_txt">Last Minute</label>
        <input type="text" name="last_minute" id="last_minute" defaultValue onblur="return removeError(this.id);" maxLength={10} className="form-control form-control-sm " onkeypress="return IsNumeric(event,this,'no');" ondrop="return false;" onpaste="return false;" />
        <p>Search Days before Departure</p>
        <span id="last_minute_error" style={{color: 'Red', display: 'none'}}>*Please enter numeric
          value</span>
      </div>
      <div className="col-md-3 form-group phps_row_0 padd_5">
        <label className="valuefor_txt">Booking Dates</label>
        <div className="input-daterange input-group date col-md-12 col-sm-12 col-xs-12" id="search_from_date">
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
          <span className="input-group-addon" id="bookTrashBtn"onClick={handleTrashClick}>
            <i className="fa fa-trash" />
          </span>
        </div>
      </div>
      <div className="col-md-3 form-group phps_row_1 padd_5">
        <label className="valuefor_txt">Travel date</label>
        <div className="input-daterange input-group date col-md-12 col-sm-12 col-xs-12" id="departure_date_from">
        <Flatpickr
                  value={startDate1}
                  onChange={(date) => setStartDate1(date)}
                  options={{ dateFormat: "Y-m-d" }}
                />
          <span className="input-group-addon">to</span>
          <Flatpickr
                  value={endDate1}
                  onChange={(date) => setEndDate1(date)}
                  options={{ dateFormat: "Y-m-d" }}
                />
          <span className="input-group-addon" id="travelTrashBtn"onClick={handleTrashClick1}>
            <i className="fa fa-trash" />
          </span>
        </div>
      </div>
    </div>
    <br />
    <div className="row">
      <div className="col-md-6 form-group phps_row_0 padd_5">
        <div>
          <label><b>Pax Range</b></label>
        </div>
        <div className="row">
          <div className="col-md-6 form-group phps_row_1 padd_5">
            <label>From:</label>
            <input type="number" min={0} name="pax_range_from" id="pax_range_from" defaultValue maxLength={25} className="form-control form-control-sm" onkeypress="return IsNumeric(event,this,'no');" onblur="return removeError(this.id);" ondrop="return false;" onpaste="return false;" />
            <span id="pax_range_from_error" style={{color: 'Red', display: 'none'}}>*Please enter numeric
              value for Pax From range</span>
          </div>
          <div className="col-md-6 form-group phps_row_0 padd_5">
            <label>To:</label>
            <input type="number" min={0} name="pax_range_to" id="pax_range_to" defaultValue maxLength={25} className="form-control form-control-sm " onkeypress="return IsNumeric(event,this,'no');" onblur="return removeError(this.id);" ondrop="return false;" onpaste="return false;" />
            <span id="pax_range_to_error" style={{color: 'Red', display: 'none'}}>*Please enter numeric
              value for Pax To range</span>
          </div>
        </div>
      </div>
      <div className="col-md-6 form-group phps_row_1 padd_5">
        <div>
          <label><b>Booking Amount Range</b></label>
        </div>
        <div className="row">
          <div className="col-md-6 form-group phps_row_0 padd_5">
            <label>From:</label>
            <input type="number" min={0} name="booking_amount_range_from" id="booking_amount_range_from" defaultValue onblur="return removeError(this.id);" maxLength={25} className="form-control form-control-sm" onkeypress="return IsNumeric(event,this,'yes');" ondrop="return false;" onpaste="return false;" />
            <span id="booking_amount_range_from_error" style={{color: 'Red', display: 'none'}}>*Please
              enter numeric value for booking amount From range</span>
          </div>
          <div className="col-md-6 form-group phps_row_1 padd_5">
            <label>To:</label>
            <input type="number" min={0} name="booking_amount_range_to" id="booking_amount_range_to" defaultValue onblur="return removeError(this.id);" maxLength={25} className="form-control form-control-sm" onkeypress="return IsNumeric(event,this,'yes');" ondrop="return false;" onpaste="return false;" />
            <span id="booking_amount_range_to_error" style={{color: 'Red', display: 'none'}}>*Please enter
              numeric value for booking amount To range</span>
          </div>
        </div>
      </div>
    </div>
  </form>
  <br />
  <div className="panel-body">
    <form>
      {/* 						<h3><span id="heading">Mark Up</span></h3>
						 */}
      <h4><span id="heading">Applicable Charges</span></h4>
      <div className>
        <div className="row" id="display_rule_applied" style={{display: 'block'}}>
          <div className="col-md-12 form-group" id="rule_applied_type">
            <label>Rule Applied On: </label>
            <br />
            <div className="radioline1 mt-2">
              <div className="radio radio-success radio-inline">
                <input type="radio" name="rule_applied_type" id="id_gross_fare" defaultValue="GROSS_FARE" defaultChecked /><label htmlFor="id_gross_fare">Gross Fare</label>
              </div>
              <div className="radio radio-success radio-inline">
                <input type="radio" name="rule_applied_type" id="app" defaultValue="BASE_FARE" /><label htmlFor="id_base_fare">Base Fare</label>
              </div>
              <br />
            </div>
          </div>
        </div>
        <div className="row mt-2" id="display_markup_charges">
          <div className="col-md-12">
            <h5><span id="heading">Mark Up</span></h5>
          </div>
          <div className="col-md-3 form-group phps_row_0 padd_5">
            <label>Mark up by: </label>
            <MultiSelect
                  options={ cancel_options}
                  isSearchable
                  placeholder="-Select-"
                  className="custom-select "

                />
          </div>
          <div className="col-md-3 form-group phps_row_1 padd_5">
            <label>Charges: </label>
            <input type="text" name="markup_charge_value" id="markup_charge_value" defaultValue disabled maxLength={25} className="form-control form-control-sm required" onblur="return removeError(this.id);" onkeypress="return IsNumeric(event,this);" ondrop="return false;" />
            <span id="markup_charge_value_error" style={{color: 'Red', display: 'none'}}>*Please enter numeric
              value</span><br />
          </div>
          <div className="col-md-3 form-group phps_row_0 padd_5">
            <label style={{width: '100%', float: 'left'}}>&nbsp;</label>
            <div className="checkbox checkbox-success checkbox-inline">
              <input type="checkbox" name="rule[]" id="app" defaultValue="CANCELLATION" data-element="Cancellation Charges" /><label htmlFor="id_cancellation_service_charges">&nbsp;Apply different markup for ancillary</label>
            </div>
          </div>
        </div>
        <div className="row" id="display_ancillary_charges" style={{display: 'none'}}>
          <div className="col-md-12">
            <h4><span id="heading">Mark Up</span></h4>
          </div>
          <div className="col-md-3 form-group phps_row_1 padd_5">
            <label>Mark up on ancillary services: </label>
            <MultiSelect
                  options={ cancel_options}
                  isSearchable
                  placeholder="-Select-"
                  className="custom-select "

                />
          </div>
          <div className="col-md-3 form-group phps_row_0 padd_5">
            <label>Charges: </label>
            <input type="text" name="ancillary_markup_charge_value" id="ancillary_markup_charge_value" defaultValue disabled maxLength={25} className="form-control required" onblur="return removeError(this.id);" onkeypress="return IsNumeric(event,this);" ondrop="return false;" />
            <span id="ancillary_markup_charge_value_error" style={{color: 'Red', display: 'none'}}>*Please
              enter numeric value</span><br />
          </div>
        </div>
        <div className="row" id="display_discount_charges" style={{display: 'none'}}>
          <div className="col-md-12">
            <h4><span id="heading">Discount</span></h4>
          </div>
          <div className="col-md-12 form-group" id="discount_types">
            <label>Types: </label>
            <br />
            <div className="radio radio-success radio-inline">
              <input type="radio" name="discount_type" id="id_normal_codes" defaultValue="NORMAL" /><label htmlFor="id_normal_codes">Normal Discount</label>
            </div>
            <div className="radio radio-success radio-inline">
              <input type="radio" name="discount_type" id="id_supplier_codes" defaultValue="SUPP_CODES" /><label htmlFor="id_supplier_codes">Supplier Codes Discount</label>
            </div>
            <br />
          </div>
          <div className="normal_discount" id="normal_discount" style={{display: 'block'}}>
            <div className="col-md-3 form-group phps_row_1 padd_5">
              <label>Discount by: </label>
              <MultiSelect
                  options={ cancel_options}
                  isSearchable
                  placeholder="-Select-"
                  className="custom-select "

                />
            </div>
            <div className="col-md-3 form-group phps_row_0 padd_5">
              <label>Charges: </label>
              <input type="text" name="normal_discount_charge_value" id="normal_discount_charge_value" defaultValue disabled maxLength={25} className="form-control required" onblur="return removeError(this.id);" onkeypress="return IsNumeric(event,this);" ondrop="return false;" />
              <span id="normal_discount_charge_value_error" style={{color: 'Red', display: 'none'}}>*Please
                enter numeric value</span>
            </div>
          </div>
          <div className="add_more_discounts" id="add_more_discounts" style={{display: 'none'}}>
            <input type="hidden" name="discount_count_row" defaultValue={1} id="discount_count_row" />
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-3">
                  <div className="checkbox checkbox-success checkbox-inline">
                    <input type="checkbox" name="deal_code[]" id="id_deal_code1" defaultValue="DEAL_CODE" data-element="Deal code" defaultChecked onclick="showhide_deal_code(this)" /><label htmlFor="id_deal_code">Deal
                      Code</label>
                  </div>
                </div>
                <div className="col-md-1" style={{paddingRight: 0}}>
                  <div className="checkbox checkbox-success checkbox-inline">
                    <input type="checkbox" name="special_remark[]" id="id_special_remark1" defaultValue="SPECIAL_REMARK" data-element="Special remark" disabled onclick="showhide_supplier_remark(this)" /><label htmlFor="id_airline_remark">Remarks</label>
                  </div>
                </div>
                <i className="fa fa-info" data-toggle="tooltip" style={{background: 'black', padding: '2px 6px', marginLeft: '-30px', color: 'white', borderRadius: '50%'}} data-placement="top" data-html="true" data-css="true" title data-original-title="Please select airline to enable this option." />
              </div>
            </div>
            <div className="col-md-3 ">
              <div className="form-group" name="deal_codes_div1[]" id="deal_codes_div" style={{display: 'block'}}>
                <div className="row">
                  <div className="col-md-12">
                    <label><b>Type of Codes:</b></label>
                  </div>
                  <div className="col-md-12">
                    <div className="radio radio-success radio-inline">
                      <input type="radio" name="special_code[]" id="id_corporate_code1" defaultValue="CORPORATE_CODE" defaultChecked /><label htmlFor="id_corporate_code">Corporate Code</label>
                    </div>
                    <div className="radio radio-success radio-inline">
                      <input type="radio" name="special_code[]" id="id_accounting_code1" defaultValue="ACCOUNTING_CODE" /><label htmlFor="id_accounting_code">Accounting
                        Code</label>
                    </div>
                  </div>
                  <div className="col-md-12 form-group phps_row_1 padd_5">
                    <label>Discount Code: </label>
                    <input type="text" name="discount_code[]" id="discount_code1" defaultValue maxLength={25} className="form-control required" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3 form-group" name="airline_remark_div1[]" id="airline_remark_div" style={{display: 'none'}}>
              <div className="row">
                <div className="col-md-12 form-group" style={{paddingTop: '40px'}}>
                  <label>Remark: </label>
                  <div className="form-group phps_row_0 padd_5">
                    <input type="text" name="remarks_text[]" id="remarks_text1" defaultValue maxLength={100} className="form-control required" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row" id="display_reissue_charges" style={{display: 'none'}}>
          <div className="col-md-12">
            <h4><span id="heading">Reissue Charges</span></h4>
          </div>
          <div className="col-md-3 form-group phps_row_1 padd_5">
            <label>Reissue by: </label>
            <MultiSelect
                  options={ cancel_options}
                  isSearchable
                  placeholder="-Select-"
                  className="custom-select "

                />
          </div>
          <div className="col-md-3 form-group phps_row_0 padd_5">
            <label>Charges: </label>
            <input type="text" name="reissue_charge_value" id="reissue_charge_value" defaultValue disabled maxLength={25} className="form-control required" onblur="return removeError(this.id);" onkeypress="return IsNumeric(event,this);" ondrop="return false;" />
            <span id="reissue_charge_value_error" style={{color: 'Red', display: 'none'}}>*Please enter
              numeric value</span><br />
          </div>
        </div>
        <div className="clearfix" />
        <div className="row" id="display_cancellation_charges" style={{display: 'none'}}>
          <div className="col-md-12">
            <h4><span id="heading">Cancellation Charges</span></h4>
          </div>
          <div className="col-md-3 form-group phps_row_1 padd_5">
            <label>Cancel by: </label>

          
        <MultiSelect
                  options={ cancel_options}
                  isSearchable
                  placeholder="-Select-"
                  className="custom-select "

                />
      
            
          </div>
          <div className="col-md-3 form-group phps_row_0 padd_5">
            <label>Charges: </label>
            <input type="text" name="cancellation_charge_value" id="cancellation_charge_value" defaultValue disabled maxLength={25} className="form-control form-control-sm required" onblur="return removeError(this.id);" onkeypress="return IsNumeric(event,this);" ondrop="return false;" />
            <span id="cancellation_charge_value_error" style={{color: 'Red', display: 'none'}}>*Please enter
              numeric value</span><br />
          </div>
          {/* <span><b>*Note:-</b> The cancellation, Rate policy  and reissue will be applied over and above the supplier charges.</span>

							<div class="row">
								<div class="col-md-10 form-group phps_row_1 padd_5">
									<label>Remarks</label>
									<textarea name="remarks_text" id="remarks_text" class="form-control" rows="6" cols="50" ></textarea>
								</div>
							</div> */}
        </div>
        <div className="clearfix" />
        <div className="row">
          <div className="form-group col-md-12">
            <button type="button" name="b1" value="SUBMIT" onclick="submit_form(document.forms['rules_module'],'insert_rules') " className="btn btn-dark btn-sm">
              <i className="fa fa-plus" />
              &nbsp;Add Rule
            </button>
          </div>
        </div>
      </div>
    </form></div>
</div>


      </div>
    </>
  );
};
export default FlightAddRule;
