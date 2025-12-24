import Flatpickr from "react-flatpickr";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header2 from "../../header2/header2";
import MultiSelect from "../../reactMultiSelect";
import {
  citiesByCountry,
  countries,
} from "../../../constants/Country-City-Data";
import {
  add_options,
  applyOnOptions,
  currencyOptionsa,
  nationalityOptions,
  offerForOptions,
  offlineHotelSuppliersOptions,
  refund_options,
  supplierProfileOptions,
} from "../../../constants/contants";

const ContractsOffersAndDiscountsNew = () => {
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

  const [displayDiv, setDisplayDiv] = useState(false);

  const handleRadioChange = () => {
    setDisplayDiv((prevDisplay) => !prevDisplay);
  };
  const [displayDiv1, setDisplayDiv1] = useState(false);

  const handleRadioChange1 = () => {
    setDisplayDiv1((prevDisplay) => !prevDisplay);
  };

  const [displayDiv2, setDisplayDiv2] = useState(false);

  const handleRadioChange2 = () => {
    setDisplayDiv2((prevDisplay) => !prevDisplay);
  };

  const [displayDiv3, setDisplayDiv3] = useState(false);

  const handleRadioChange3 = () => {
    setDisplayDiv3((prevDisplay) => !prevDisplay);
  };

  const [branchData, setBranchData] = useState({
    branchCountry: "",
    branchCity: "",
  });

  const handleCountryChange = (selectedCountry) => {
    setBranchData((prevData) => ({
      ...prevData,
      branchCountry: selectedCountry.value,
      branchCity: "", // Reset city when country changes
    }));
  };

  const handleCityChange = (selectedCity) => {
    setBranchData((prevData) => ({
      ...prevData,
      branchCity: selectedCity.value,
    }));
  };

  return (
    <>
      <Header2
        title="ADD NEW OFFER/DISCOUNT"
        linkText1="Apply Applicable Offer Discounts"
      />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <form>
          <div className="panel-body">
            <div className="row mt-2">
              <div className=" radioline col-md-8 form-group">
                <br />
                <div className="radio radio-success radio-inline" id="app">
                  <input
                    type="radio"
                    name="offer[]"
                    defaultValue="EBD"
                    id="id_EBD"
                    onchange="showDownPopup('EBD');"
                    className="test123"
                  />
                  <label htmlFor="id_EBD">Early Bird</label>
                </div>
                <div className="radio radio-success radio-inline" id="app">
                  <input
                    type="radio"
                    name="offer[]"
                    defaultValue="SP"
                    id="id_SP"
                    onchange="showDownPopup('SP');"
                  />
                  <label htmlFor="id_SP">Stay Pay</label>
                </div>
                <div className="radio radio-success radio-inline" id="app">
                  <input
                    type="radio"
                    name="offer[]"
                    defaultValue="LS"
                    id="id_LS"
                    onchange="showDownPopup('LS');"
                  />
                  <label htmlFor="id_LS">Long Stay</label>
                </div>
                <div className="radio radio-success radio-inline" id="app">
                  <input
                    type="radio"
                    name="offer[]"
                    defaultValue="MP"
                    id="id_MP"
                    onchange="showDownPopup('MP');"
                  />
                  <label htmlFor="id_MP">MARK UP</label>
                </div>
                <div className="radio radio-success radio-inline" id="app">
                  <input
                    type="radio"
                    name="offer[]"
                    defaultValue="DIS"
                    id="id_DIS"
                    onchange="showDownPopup('DIS');"
                  />
                  <label htmlFor="id_DIS">Discount</label>
                </div>
                <div className="radio radio-success radio-inline" id="app">
                  <input
                    type="radio"
                    name="offer[]"
                    defaultValue="PM"
                    id="id_PM"
                    onchange="showDownPopup('PM');"
                  />
                  <label htmlFor="id_PM">Promotion</label>
                </div>
              </div>
              <p
                style={{
                  fontSize: "12px",
                  color: "grey !important",
                  fontWeight: 400,
                }}
              >
                Note:- Discount and Offer Module only work for Offline supplier.
              </p>
            </div>
            <div className="row mt-3">
              <div className="col-md-3 form-group phps_row_0 padd_5 hideforb2c">
                <label>Want to make compulsory?</label>
                <br />
                <div className="radioline1 mt-1">
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      name="compulsory"
                      defaultValue="yes"
                      id="yes"
                    />
                    <label htmlFor="yes">Yes</label>
                  </div>
                  <div className="radio radio-success radio-inline" id="app">
                    <input
                      type="radio"
                      id="no"
                      name="compulsory"
                      defaultValue="no"
                      defaultChecked
                    />
                    <label htmlFor="no">No</label>
                  </div>
                </div>
              </div>
              <div className="col-md-3 form-group phps_row_1 padd_5">
                <label>Discount Code</label>
                <input
                  type="text"
                  name="disp_discount_code"
                  id="disp_discount_code"
                  maxLength={30}
                  className="form-control form-control-sm required"
                />
              </div>
              <div className="col-md-3 form-group phps_row_0 padd_5">
                <label>Branch</label>
                <MultiSelect
                  options={add_options}
                  isSearchable
                  placeholder="- Select Branch -"
                  className="custom-select"
                  noOptionsMessage={() => "No Branch Found"}
                />
              </div>
              <div className="col-md-3 form-group phps_row_1 padd_5">
                <label>Agent</label>
                <input
                  id="agent_suggest_box"
                  className="box form-control form-control-sm ui-autocomplete-input"
                  type="text"
                  autoComplete="off"
                  name="sel_agent"
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-3 form-group phps_row_0 padd_5">
                <label>Country</label>
                <MultiSelect
                  options={countries}
                  isSearchable
                  placeholder="- Select Country -"
                  className="custom-select required"
                  onChange={handleCountryChange}
                  noOptionsMessage={() => "No Country Found"}
                />
              </div>
              <div className="col-md-3 form-group phps_row_1 padd_5">
                <label>City</label>
                <MultiSelect
                  //  options={Array.isArray(branchData.branchCity) ? branchData.branchCity : []}
                  options={citiesByCountry[branchData.branchCountry] || []}
                  isSearchable
                  placeholder="- Select City -"
                  className="custom-select required"
                  onChange={handleCityChange}
                  noOptionsMessage={() => "No City Found"}
                />
              </div>
            </div>
            <div className="row col-md-12 mt-3">
              <div
                className=" radioline1 hideforb2c panel-body col-md-4"
                style={{ height: "110px" }}
              >
                <div className="hideforb2c col-md-5 form-group phps_row_0 padd_5 row">
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      name="join_offer2"
                      defaultValue="nat"
                      id="pak"
                      onChange={handleRadioChange}
                    />
                    <label htmlFor="pak">Pax Nationality</label>
                  </div>
                  {displayDiv && (
                    <div id="div_nat_disp">
                      <MultiSelect
                        options={nationalityOptions}
                        isMulti
                        isSearchable
                        placeholder="- Select Nationality -"
                        noOptionsMessage={() => "No Country Found"}
                        className="custom-select"
                      />
                    </div>
                  )}
                </div>
                <div className="hideforb2c col-md-7 form-group phps_row_1 padd_5">
                  <div className="valuefor_txt">
                    <div className="radio radio-success radio-inline">
                      <input
                        type="radio"
                        name="join_offer2"
                        id="market"
                        defaultValue="market"
                        onChange={handleRadioChange1}
                      />
                      <label htmlFor="market">Market Profile</label>
                    </div>
                  </div>
                  {displayDiv1 && (
                    <div id="div_market_disp">
                      <MultiSelect
                        options={supplierProfileOptions}
                        isSearchable
                        placeholder="- Select -"
                        className="custom-select"
                        noOptionsMessage={() => "No Rate Found"}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div
                className="hideforb2c panel-body col-md-2"
                style={{ height: "110px" }}
              >
                <div className="row">
                  <div className="col-md-12 form-group phps_row_0 padd_5">
                    <div className="valuefor_txt">
                      <div className="checkbox checkbox-success checkbox-inline">
                        <input
                          type="checkbox"
                          name="join_offer"
                          defaultValue="hotel"
                          id="join_offer_property"
                          onChange={handleRadioChange2}
                        />
                        <label htmlFor="join_offer_property">Property</label>
                      </div>
                    </div>
                    {displayDiv2 && (
                      <div id="div_hotel_disp">
                        <select
                          className="selectpicker form-control form-control-sm show-menu-arrow bs-select-hidden"
                          onchange="show_Room_Category();show_Room_Basis();"
                          id="sel_property"
                          name="sel_property"
                          disabled="disabled"
                          data-live-search="true"
                        >
                          <option value>--Select--</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div
                className="hideforb2c panel-body col-md-2"
                style={{ height: "110px" }}
              >
                <div className="col-md-12 form-group phps_row_1 padd_5">
                  <div className="valuefor_txt">
                    {/* <div class="radio radio-success radio-inline">
              <input type="radio" name="join_offer1" value="off_supplier" id="offline" onchange="display_offers1('off_supp')"  >
              <label for="offline">Offline Supplier</label>
          </div> */}
                    <div className="checkbox checkbox-success checkbox-inline">
                      <input
                        type="checkbox"
                        name="join_offer1"
                        id="join_offer1_offline_supplier"
                        defaultValue="off_supplier"
                        onhange={handleRadioChange3}
                      />
                      <label htmlFor="join_offer1_offline_supplier">
                        Offline Supplier
                      </label>
                    </div>
                  </div>
                  {displayDiv3 && (
                    <div id="div_off_supp_disp">
                      <MultiSelect
                        options={offlineHotelSuppliersOptions}
                        isSearchable
                        placeholder="- Select Supplier -"
                        className="custom-select"
                        noOptionsMessage={() => "No Flight Supplier Found"}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div id="float_rb" style={{ display: "none" }}>
                <div
                  className="panel-body col-md-2"
                  style={{ height: "110px" }}
                >
                  <div className="float_l col-md-12 form-group phps_row_0 padd_5">
                    <div className="valuefor_txt">
                      <div className="radio radio-success radio-inline">
                        <input
                          type="radio"
                          name="join_offer3"
                          defaultValue="room_basis"
                          onchange="display_offers1('room_basis')"
                          id="room_meal_basis"
                        />
                        <label htmlFor="room_meal_basis">
                          Room/Meal Basis{" "}
                        </label>
                      </div>
                    </div>
                    <div id="div_room_basis_disp" style={{ display: "none" }}>
                      <select
                        className="selectpicker form-control form-control-sm show-menu-arrow input_width_2 setfonts color_set_1 bs-select-hidden"
                        name="room_basis[]"
                        id="room_basis"
                        multiple
                        data-live-search="true"
                        data-actions-box="true"
                      >
                        <option value="all">All</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div id="float_lpa" style={{ display: "none" }}>
                <div
                  className="panel-body col-md-2"
                  style={{ height: "110px" }}
                >
                  <div className="col-md-12 form-group phps_row_1 padd_5">
                    <div className="valuefor_txt">
                      <div className="radio radio-success radio-inline">
                        <input
                          type="radio"
                          name="join_offer4"
                          defaultValue="room_class"
                          id="room"
                          onchange="display_offers1('room_class')"
                        />
                        <label htmlFor="room">Inventory Room Category </label>
                      </div>
                    </div>
                    <div id="div_room_class_disp" style={{ display: "none" }}>
                      {/* <select class="form-control" id="rate_profile" style="height:65px" name="rate_profile[]" multiple size="10" ondblclick="addOfferNote()">
                  <option value="">-Select-</option>
                                                                                  <option label="AFRICAN MARKET" value="67">AFRICAN MARKET</option>
<option label="APAC" value="31">APAC</option>
<option label="CIS- RUSSIA MARKET" value="68">CIS- RUSSIA MARKET</option>
<option label="EUROPE MARKET" value="69">EUROPE MARKET</option>
<option label="FAR EAST" value="70">FAR EAST</option>
<option label="GCC- MARKET" value="71">GCC- MARKET</option>
<option label="GCC-UAE&amp;SA" value="72">GCC-UAE&amp;SA</option>
<option label="SUB-C MARKET" value="73">SUB-C MARKET</option>
<option label="USA MARKET" value="74">USA MARKET</option>

                                                                          </select> */}
                      {/* 
          <select class="form-control" name="room_class[]" id="room_class" multiple>
                                                                  <option value="all">All</option>
          </select> */}
                      <select
                        className="form-control form-control-sm setfonts color_set_1"
                        style={{ height: "65px" }}
                        name="room_class[]"
                        id="room_class"
                        ondblclick="show_Room_Class();"
                        size={10}
                        multiple
                      >
                        <option value="all">All</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div id="float_rc" style={{ display: "none" }}>
                <div
                  className="panel-body col-md-2 form-group"
                  style={{ height: "110px" }}
                >
                  <div className="valuefor_txt">
                    <div className="radio radio-success radio-inline">
                      <input
                        type="radio"
                        name="join_offer5"
                        defaultValue="room_cls"
                        onchange
                      />
                      <label htmlFor="room">Room Category</label>
                    </div>
                  </div>
                  <div id="div_room_cls_disp" style={{ display: "none" }}>
                    <select
                      className="selectpicker form-control form-control-sm show-menu-arrow bs-select-hidden"
                      name="room_cls[]"
                      id="room_cls"
                      multiple
                      data-live-search="true"
                      data-actions-box="true"
                    >
                      <option value="all">All</option>
                    </select>
                    <div className="btn-group bootstrap-select show-tick form-control show-menu-arrow">
                      <button
                        type="button"
                        className="btn dropdown-toggle btn-default"
                        data-toggle="dropdown"
                        data-id="room_cls"
                        title="Nothing selected"
                      >
                        <span className="filter-option pull-left">
                          Nothing selected
                        </span>
                        &nbsp;
                        <span className="caret" />
                      </button>
                      <div className="dropdown-menu open">
                        <div className="bs-searchbox">
                          <input
                            type="text"
                            className="form-control"
                            autoComplete="off"
                          />
                        </div>
                        <div className="bs-actionsbox">
                          <div className="btn-group btn-group-sm btn-block">
                            <button
                              type="button"
                              className="actions-btn bs-select-all btn btn-default"
                            >
                              Select All
                            </button>
                            <button
                              type="button"
                              className="actions-btn bs-deselect-all btn btn-default"
                            >
                              Deselect All
                            </button>
                          </div>
                        </div>
                        <ul className="dropdown-menu inner" role="menu">
                          <li data-original-index={0}>
                            <Link tabIndex={0} className data-tokens="null">
                              <span className="text">All</span>
                              <span className="glyphicon glyphicon-ok check-mark" />
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row showforb2c" style={{ display: "none" }}>
              <div
                className="col-md-3 form-group phps_row_0 padd_5"
                id="user-wise_div"
                style={{ display: "none" }}
              >
                <label className="valuefor_txt">Users</label>
                <select
                  className="selectpicker form-control form-control-sm show-menu-arrow input_width_2 setfonts color_set_1 bs-select-hidden"
                  id="users"
                  name="users[]"
                  multiple
                  data-live-search="true"
                  data-actions-box="true"
                >
                  <option value>-Select-</option>
                </select>
                {/* <input id="agent_suggest_box" type="text" class="form-control" name="customer_id" value=""/>
      <input type="hidden" name="users" id="users"/> */}
              </div>
              {/* <div class="col-md-3 form-group phps_row_1 padd_5">
      <label class="selectpicker form-control show-menu-arrow valuefor_txt">Country</label>
      <select class="input_width_2 setfonts color_set_1" id='sel_country' name="sel_country">
          <option value="">-Select-</option>
          <option label="Afghanistan" value="97">Afghanistan</option>
<option label="Albania" value="43">Albania</option>
<option label="Algeria" value="142">Algeria</option>
<option label="Andorra" value="44">Andorra</option>
<option label="Angola" value="143">Angola</option>
<option label="Antigua And Barbuda" value="230">Antigua And Barbuda</option>
<option label="Argentina" value="29">Argentina</option>
<option label="Armenia" value="45">Armenia</option>
<option label="Aruba" value="231">Aruba</option>
<option label="Australia" value="196">Australia</option>
<option label="Austria" value="46">Austria</option>
<option label="Azerbaijan" value="47">Azerbaijan</option>
<option label="Bahamas" value="3">Bahamas</option>
<option label="Bahrain" value="98">Bahrain</option>
<option label="Bangladesh" value="99">Bangladesh</option>
<option label="Barbados" value="4">Barbados</option>
<option label="Belarus" value="48">Belarus</option>
<option label="Belgium" value="49">Belgium</option>
<option label="Belize" value="5">Belize</option>
<option label="Benin" value="144">Benin</option>
<option label="Bermuda" value="6">Bermuda</option>
<option label="Bhutan" value="100">Bhutan</option>
<option label="Bolivia" value="30">Bolivia</option>
<option label="Bonaire, Sint Eustatius And Saba" value="416">Bonaire, Sint Eustatius And Saba</option>
<option label="Bosnia And Herzegovina" value="50">Bosnia And Herzegovina</option>
<option label="Botswana" value="145">Botswana</option>
<option label="Brazil" value="31">Brazil</option>
<option label="British Virgin Islands" value="7">British Virgin Islands</option>
<option label="Brunei" value="101">Brunei</option>
<option label="Bulgaria" value="51">Bulgaria</option>
<option label="Burkina Faso" value="146">Burkina Faso</option>
<option label="Burundi" value="147">Burundi</option>
<option label="Cambodia" value="102">Cambodia</option>
<option label="Cameroon" value="148">Cameroon</option>
<option label="Canada" value="2">Canada</option>
<option label="Cape Verde" value="149">Cape Verde</option>
<option label="Cayman Islands" value="8">Cayman Islands</option>
<option label="Central African Republic" value="150">Central African Republic</option>
<option label="Chad" value="151">Chad</option>
<option label="Chile" value="32">Chile</option>
<option label="China" value="103">China</option>
<option label="Colombia" value="33">Colombia</option>
<option label="Comoros" value="402">Comoros</option>
<option label="Cook Islands" value="412">Cook Islands</option>
<option label="Costa Rica" value="9">Costa Rica</option>
<option label="Croatia" value="52">Croatia</option>
<option label="Cuba" value="10">Cuba</option>
<option label="Curacao" value="415">Curacao</option>
<option label="Cyprus" value="53">Cyprus</option>
<option label="Czech Republic" value="54">Czech Republic</option>
<option label="Democratic Republic Of The Congo" value="153">Democratic Republic Of The Congo</option>
<option label="Denmark" value="55">Denmark</option>
<option label="Djibouti" value="154">Djibouti</option>
<option label="Dominica" value="11">Dominica</option>
<option label="Dominican Republic" value="12">Dominican Republic</option>
<option label="East Timor" value="104">East Timor</option>
<option label="Ecuador" value="34">Ecuador</option>
<option label="Egypt" value="155">Egypt</option>
<option label="El Salvador" value="13">El Salvador</option>
<option label="Equatorial Guinea" value="156">Equatorial Guinea</option>
<option label="Eritrea" value="157">Eritrea</option>
<option label="Estonia" value="56">Estonia</option>
<option label="Ethiopia" value="158">Ethiopia</option>
<option label="Falkland Islands" value="35">Falkland Islands</option>
<option label="Fiji Islands" value="198">Fiji Islands</option>
<option label="Finland" value="57">Finland</option>
<option label="France" value="58">France</option>
<option label="French Guiana" value="36">French Guiana</option>
<option label="French Polynesia" value="199">French Polynesia</option>
<option label="Gabon" value="159">Gabon</option>
<option label="Gambia" value="160">Gambia</option>
<option label="Georgia" value="59">Georgia</option>
<option label="Germany" value="60">Germany</option>
<option label="Ghana" value="161">Ghana</option>
<option label="Gibraltar" value="61">Gibraltar</option>
<option label="Greece" value="62">Greece</option>
<option label="Greece Islands" value="404">Greece Islands</option>
<option label="Greenland" value="14">Greenland</option>
<option label="Grenada" value="15">Grenada</option>
<option label="Guadeloupe" value="16">Guadeloupe</option>
<option label="Guam" value="200">Guam</option>
<option label="Guatemala" value="17">Guatemala</option>
<option label="Guernsey" value="63">Guernsey</option>
<option label="Guinea" value="162">Guinea</option>
<option label="Guinea Bissau" value="163">Guinea Bissau</option>
<option label="Guyana" value="37">Guyana</option>
<option label="Haiti" value="18">Haiti</option>
<option label="Honduras" value="19">Honduras</option>
<option label="Hong Kong" value="105">Hong Kong</option>
<option label="Hungary" value="64">Hungary</option>
<option label="Iceland" value="65">Iceland</option>
<option label="India" value="106">India</option>
<option label="Indonesia" value="107">Indonesia</option>
<option label="Iran" value="108">Iran</option>
<option label="Iraq" value="109">Iraq</option>
<option label="Ireland" value="66">Ireland</option>
<option label="Isle Of Man" value="67">Isle Of Man</option>
<option label="Israel" value="110">Israel</option>
<option label="Italy" value="68">Italy</option>
<option label="Ivory Coast" value="164">Ivory Coast</option>
<option label="Jamaica" value="20">Jamaica</option>
<option label="Japan" value="111">Japan</option>
<option label="Jersey" value="69">Jersey</option>
<option label="Jordan" value="112">Jordan</option>
<option label="Kazakhstan" value="113">Kazakhstan</option>
<option label="Kenya" value="165">Kenya</option>
<option label="Kiribati" value="201">Kiribati</option>
<option label="Kosovo" value="70">Kosovo</option>
<option label="Kuwait" value="114">Kuwait</option>
<option label="Kyrgyzstan" value="115">Kyrgyzstan</option>
<option label="Laos" value="116">Laos</option>
<option label="Latvia" value="71">Latvia</option>
<option label="Lebanon" value="117">Lebanon</option>
<option label="Lesotho" value="166">Lesotho</option>
<option label="Liberia" value="167">Liberia</option>
<option label="Libya" value="168">Libya</option>
<option label="Liechtenstein" value="72">Liechtenstein</option>
<option label="Lithuania" value="73">Lithuania</option>
<option label="Luxembourg" value="74">Luxembourg</option>
<option label="Macau" value="118">Macau</option>
<option label="Macedonia" value="75">Macedonia</option>
<option label="Madagascar" value="169">Madagascar</option>
<option label="Malawi" value="170">Malawi</option>
<option label="Malaysia" value="119">Malaysia</option>
<option label="Maldives" value="120">Maldives</option>
<option label="Mali" value="171">Mali</option>
<option label="Malta" value="76">Malta</option>
<option label="Marshall Islands" value="202">Marshall Islands</option>
<option label="Martinique" value="21">Martinique</option>
<option label="Mauritania" value="172">Mauritania</option>
<option label="Mauritius" value="173">Mauritius</option>
<option label="Mexico" value="22">Mexico</option>
<option label="Micronesia" value="203">Micronesia</option>
<option label="Moldova" value="77">Moldova</option>
<option label="Monaco" value="78">Monaco</option>
<option label="Mongolia" value="121">Mongolia</option>
<option label="Montenegro" value="79">Montenegro</option>
<option label="Montserrat" value="23">Montserrat</option>
<option label="Morocco" value="174">Morocco</option>
<option label="Mozambique" value="175">Mozambique</option>
<option label="Myanmar(Burma)" value="122">Myanmar(Burma)</option>
<option label="Namibia" value="176">Namibia</option>
<option label="Nauru" value="204">Nauru</option>
<option label="Nepal" value="123">Nepal</option>
<option label="Netherlands" value="80">Netherlands</option>
<option label="New Caledonia" value="205">New Caledonia</option>
<option label="New Zealand" value="197">New Zealand</option>
<option label="Nicaragua" value="24">Nicaragua</option>
<option label="Niger" value="177">Niger</option>
<option label="Nigeria" value="178">Nigeria</option>
<option label="North Korea" value="124">North Korea</option>
<option label="Northern Cyprus" value="411">Northern Cyprus</option>
<option label="Northern Mariana Islands" value="414">Northern Mariana Islands</option>
<option label="Norway" value="81">Norway</option>
<option label="Oman" value="125">Oman</option>
<option label="Pakistan" value="126">Pakistan</option>
<option label="Palestine" value="228">Palestine</option>
<option label="Panama" value="25">Panama</option>
<option label="Papua New Guinea" value="206">Papua New Guinea</option>
<option label="Paraguay" value="38">Paraguay</option>
<option label="Peru" value="39">Peru</option>
<option label="Philippines" value="127">Philippines</option>
<option label="Poland" value="82">Poland</option>
<option label="Portugal" value="83">Portugal</option>
<option label="Puerto Rico" value="26">Puerto Rico</option>
<option label="Qatar" value="128">Qatar</option>
<option label="Republic Of The Congo" value="152">Republic Of The Congo</option>
<option label="Reunion" value="179">Reunion</option>
<option label="Romania" value="84">Romania</option>
<option label="Russia" value="85">Russia</option>
<option label="Rwanda" value="180">Rwanda</option>
<option label="Saint Barthelemy" value="400">Saint Barthelemy</option>
<option label="Saint Kitts And Nevis" value="413">Saint Kitts And Nevis</option>
<option label="Saint Lucia" value="401">Saint Lucia</option>
<option label="Samoa" value="207">Samoa</option>
<option label="San Marino" value="86">San Marino</option>
<option label="Sao Tome And Principe" value="181">Sao Tome And Principe</option>
<option label="Saudi Arabia" value="129">Saudi Arabia</option>
<option label="Senegal" value="182">Senegal</option>
<option label="Serbia" value="87">Serbia</option>
<option label="Seychelles" value="183">Seychelles</option>
<option label="Sierra Leone" value="184">Sierra Leone</option>
<option label="Singapore" value="130">Singapore</option>
<option label="Slovakia" value="88">Slovakia</option>
<option label="Slovenia" value="89">Slovenia</option>
<option label="Solomon Islands" value="208">Solomon Islands</option>
<option label="Somalia" value="185">Somalia</option>
<option label="South Africa" value="186">South Africa</option>
<option label="South Korea" value="131">South Korea</option>
<option label="South Sudan" value="403">South Sudan</option>
<option label="Spain" value="90">Spain</option>
<option label="Sri Lanka" value="132">Sri Lanka</option>
<option label="Sudan" value="187">Sudan</option>
<option label="Suriname" value="40">Suriname</option>
<option label="Swaziland" value="188">Swaziland</option>
<option label="Sweden" value="91">Sweden</option>
<option label="Switzerland" value="92">Switzerland</option>
<option label="Syria" value="133">Syria</option>
<option label="Taiwan" value="134">Taiwan</option>
<option label="Tajikistan" value="135">Tajikistan</option>
<option label="Tanzania" value="189">Tanzania</option>
<option label="Thailand" value="136">Thailand</option>
<option label="Togo" value="190">Togo</option>
<option label="Tonga" value="209">Tonga</option>
<option label="Trinidad And Tobago" value="27">Trinidad And Tobago</option>
<option label="Tunisia" value="191">Tunisia</option>
<option label="Turkey" value="93">Turkey</option>
<option label="Turkmenistan" value="137">Turkmenistan</option>
<option label="Turks And Caicos Islands" value="410">Turks And Caicos Islands</option>
<option label="Tuvalu" value="210">Tuvalu</option>
<option label="Uganda" value="192">Uganda</option>
<option label="Ukraine" value="94">Ukraine</option>
<option label="United Arab Emirates" value="138">United Arab Emirates</option>
<option label="United Kingdom" value="95">United Kingdom</option>
<option label="United States" value="1">United States</option>
<option label="United States Virgin Islands" value="28">United States Virgin Islands</option>
<option label="Uruguay" value="41">Uruguay</option>
<option label="Uzbekistan" value="139">Uzbekistan</option>
<option label="Vanuatu" value="211">Vanuatu</option>
<option label="Vatican City" value="96">Vatican City</option>
<option label="Venezuela" value="42">Venezuela</option>
<option label="Vietnam" value="140">Vietnam</option>
<option label="Wallis And Futuna" value="212">Wallis And Futuna</option>
<option label="Western Sahara" value="193">Western Sahara</option>
<option label="Yemen" value="141">Yemen</option>
<option label="Zambia" value="194">Zambia</option>
<option label="Zimbabwe" value="195">Zimbabwe</option>

      </select>
  </div>
  <div class="col-md-3 form-group phps_row_0 padd_5">
      <label class="valuefor_txt">City</label>
      <select class="selectpicker form-control show-menu-arrow input_width_2 setfonts color_set_1" id='sel_city' name="sel_city">
          <option>-Select-</option>
      </select>
  </div>
  <div class="col-md-3 form-group phps_row_1 padd_5">
      <label class="valuefor_txt">Property1</label>
      <select class="selectpicker form-control show-menu-arrow input_width_2 setfonts color_set_1" id="sel_property" name="sel_property">
          <option value="all">All</option>
      </select>									
  </div> */}
            </div>
            <div id="row1" className="row">
              <div className="col-md-3 form-group phps_row_0 padd_5">
                <label className="valuefor_txt">Booking Date</label>
                <div
                  className="input-group date input-daterange"
                  id="booking_from_date"
                >
                  <Flatpickr
                    value={startDate}
                    onChange={(date) => setStartDate(date)}
                    options={{ dateFormat: "Y-m-d" }}
                  />

                  <span class="input-group-addon">to</span>
                  <Flatpickr
                    value={endDate}
                    onChange={(date) => setEndDate(date)}
                    options={{ dateFormat: "Y-m-d" }}
                  />
                  <span
                    className="input-group-addon"
                    id="booTrashBtn"
                    onClick={handleTrashClick}
                  >
                    <i className="fa fa-trash" />
                  </span>
                </div>
              </div>
              <div className="col-md-3 form-group phps_row_1 padd_5">
                <label className="valuefor_txt">Checkin Date</label>
                <div
                  className="input-group date input-daterange"
                  id="checkin_date_from"
                >
                  <Flatpickr
                    value={startDate1}
                    onChange={(date) => setStartDate1(date)}
                    options={{ dateFormat: "Y-m-d" }}
                  />

                  <span class="input-group-addon">to</span>
                  <Flatpickr
                    value={endDate1}
                    onChange={(date) => setEndDate1(date)}
                    options={{ dateFormat: "Y-m-d" }}
                  />
                  <span
                    className="input-group-addon"
                    id="checkTrashBtn"
                    onClick={handleTrashClick1}
                  >
                    <i className="fa fa-trash" />
                  </span>
                </div>
              </div>
              <div className="col-md-2 form-group phps_row_0 padd_5">
                <lable>&nbsp;</lable>
                <div className="input-group col-md-12 col-xs-12">
                  <div
                    className="radio radio-success radio-inline"
                    style={{ marginTop: "10px" }}
                  >
                    <input
                      type="radio"
                      className="discount_apply"
                      id="radio-checkin-before1"
                      name="discount_apply1"
                      defaultValue="checkin-before"
                    />{" "}
                    <label className="check_heading">Checkin Before </label>
                  </div>
                  <span>
                    <i
                      className="fa fa-info-circle"
                      title
                      data-toggle="tooltip"
                      data-placement="top"
                      data-original-title="Note : Check in before days is difference between check in and booking date. If difference is no of date entered in check in before or more offer will be applied. Eg-Check in before-5 offer will be applied if difference between check in and booking date is 5 and more."
                    />
                  </span>
                  <div
                    className="radio radio-success radio-inline"
                    style={{ marginTop: "10px" }}
                  >
                    <input
                      type="radio"
                      className="discount_apply"
                      id="radio-last-minute1"
                      name="discount_apply1"
                      defaultValue="last-minute"
                    />{" "}
                    <label className="check_heading">Last Minute</label>
                  </div>
                  <span>
                    <i
                      className="fa fa-info-circle"
                      title
                      data-toggle="tooltip"
                      data-placement="top"
                      data-original-title="Note : Last min days is difference between check in and booking date. If difference is no of date entered in check in before or less offer will be applied. Eg-Check in before-5 offer will be applied if difference between check in and booking date is 5 and less(1,2,3)"
                    />
                  </span>
                </div>
              </div>
              <div
                className="col-md-2 form-group phps_row_1 padd_5 last-minute1"
                style={{ display: "none" }}
              >
                <label className="valuefor_txt">Last Minute</label>
                <div className="input-group col-md-12 col-xs-12">
                  <input
                    type="text"
                    name="last_minute1"
                    id="last-minute1"
                    maxLength={3}
                    size={4}
                    className="form-control form-control-sm"
                    onblur="extractNumber(this,2,false);"
                    onkeyup="extractNumber(this,2,false);"
                  />
                  <span className="input-group-addon">Days</span>
                </div>
              </div>
              <div
                className="col-md-2 form-group phps_row_0 padd_5 checkin-before1"
                style={{}}
              >
                <label className="valuefor_txt">Checkin Before</label>
                <div className="input-group col-md-12 col-xs-12">
                  <input
                    type="text"
                    name="before_checkin1"
                    id="checkin-before1"
                    maxLength={3}
                    size={4}
                    className="form-control form-control-sm"
                    onblur="extractNumber(this,2,false);"
                    onkeyup="extractNumber(this,2,false);"
                  />
                  <span
                    className="input-group-addon"
                    style={{ paddingRight: "31px!important" }}
                  >
                    Days
                  </span>
                </div>
              </div>
              <div className="float_l padd_5 col-md-1 form-group">
                <label>&nbsp;</label>
                <br />
                <div className="input-group">
                  <span
                    id="addmore_span"
                    className="input-group-addon"
                    onclick="add_more_row();"
                  >
                    <i id="addmore" className="fa fa-plus fa-lg " />
                  </span>
                  &nbsp;&nbsp;
                  <span
                    id="remove_span"
                    className="input-group-addon"
                    onclick="remove_row()"
                  >
                    <i
                      name="removebtn"
                      id="removebtn"
                      className="fa fa-minus fa-lg"
                    />
                  </span>
                </div>
              </div>
              {/* <div class="phps_row_1 padd_5">
<div class="float_l padd_5">
<div class="valuefor_txt">Booking Date From</div>
<div>
<input readonly id="sf_date1" name="sf_date1" type="text"   
value=""  class="input_width_1 setfonts color_set_1 marginR5">
<img src="images/clear.gif" onclick="clear1('sf_date1')"/></div>
</div>

<div class="float_l padd_5  brdr_rgt">
<div class="valuefor_txt">Booking Date To</div>
<div>
<input  readonly id="st_date1" name="st_date1" type="text"  

value=""  class="input_width_1 setfonts color_set_1 marginR5">
<img src="images/clear.gif" onclick="clear1('st_date1')"/></div>
</div>

<div class="float_l padd_5">
<div class="valuefor_txt">Checkin Date From</div>
<div>
<input readonly id="bf_date1" name="bf_date1" type="text"   

value=""  class="input_width_1 setfonts color_set_1 marginR5">
<img src="images/clear.gif" onclick="clear1('bf_date1')"/></div>
</div>

<div class="float_l padd_5  brdr_rgt">
<div class="valuefor_txt">Checkin Date To</div>
<div>
<input readonly id="bt_date1" name="bt_date1"  type="text"  

value=""  class="input_width_1 setfonts color_set_1 marginR5">
<img src="images/clear.gif" onclick="clear1('bt_date1')"/></div>
</div>

<div class="float_l padd_5">
<div class="valuefor_txt">Checkin Before</div>
<div>
<input type="text" value="" name="before_checkin1" id="before_checkin1" maxlength="3" size="4" class="setfonts 

color_set_1 marginR5" onBlur="extractNumber(this,2,false);" onKeyUp="extractNumber(this,2,false);"> Days
</div>
</div> */}
              <input
                type="hidden"
                id="date_count1"
                name="date_count1"
                defaultValue={1}
              />
              <br className="clear" />
              <table border={0} cellSpacing={0} cellPadding={0} width="100%">
                <tbody className="bg-white">
                  <tr>
                    <td valign="top" align="right" width="15%">
                      &nbsp;
                    </td>
                    <td valign="top" align="right">
                      {/* <span id="addmore_span"><input type="button" value="Add More" name="addmore" id="addmore" onclick="add_more_row();" /></span>&nbsp;&nbsp; 
<span id="remove_span"><input type="button" value="Remove" name="removebtn" id="removebtn" onclick="remove_row();" /></span>&nbsp;&nbsp;&nbsp;*/}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div id="row2" className="row" style={{ display: "none" }}>
              <div className="col-md-2 form-group phps_row_0 padd_5">
                <label className="valuefor_txt">Booking Date</label>
                <div
                  className="input-group date input-daterange"
                  id="booking_from_date"
                >
                  <input
                    id="sf_date2"
                    name="sf_date2"
                    type="text"
                    className="form-control form-control-sm"
                  />
                  <span className="input-group-addon">to</span>
                  <input
                    id="st_date2"
                    name="st_date2"
                    type="text"
                    className="form-control form-control-sm"
                  />
                  <span
                    className="input-group-addon"
                    alt="clear"
                    title="clear"
                    onclick="clear1('st_date2')"
                  >
                    <i className="fa fa-trash" />
                  </span>
                </div>
              </div>
              <div className="col-md-2 form-group phps_row_1 padd_5">
                <label className="valuefor_txt">Checkin Date</label>
                <div
                  className="input-group date input-daterange"
                  id="checkin_date_from"
                >
                  <input
                    id="bf_date2"
                    name="bf_date2"
                    type="text"
                    className="form-control form-control-sm"
                  />
                  <span className="input-group-addon">to</span>
                  <input
                    id="bt_date2"
                    name="bt_date2"
                    type="text"
                    className="form-control form-control-sm"
                  />
                  <span
                    className="input-group-addon"
                    alt="clear"
                    title="clear"
                    onclick="clear1('bt_date2')"
                  >
                    <i className="fa fa-trash" />
                  </span>
                </div>
              </div>
              <div className="col-md-3 form-group phps_row_0 padd_5">
                <lable>&nbsp;</lable>
                <div className="input-group col-md-12 col-xs-12">
                  <div
                    className="radio radio-success radio-inline"
                    style={{ marginTop: "10px" }}
                  >
                    <input
                      type="radio"
                      className="discount_apply"
                      id="radio-checkin-before2"
                      name="discount_apply2"
                      defaultValue="checkin-before"
                    />{" "}
                    <label className="check_heading">Checkin Before </label>
                  </div>
                  <span>
                    <i
                      className="fa fa-info-circle"
                      title
                      data-toggle="tooltip"
                      data-placement="top"
                      data-original-title="Note : Check in before days is difference between check in and booking date. If difference is no of date entered in check in before or more offer will be applied. Eg-Check in before-5 offer will be applied if difference between check in and booking date is 5 and more."
                    />
                  </span>
                  <div
                    className="radio radio-success radio-inline"
                    style={{ marginTop: "10px" }}
                  >
                    <input
                      type="radio"
                      className="discount_apply"
                      id="radio-last-minute2"
                      name="discount_apply2"
                      defaultValue="last-minute"
                    />{" "}
                    <label className="check_heading">Last Minute</label>
                  </div>
                  <span>
                    <i
                      className="fa fa-info-circle"
                      title
                      data-toggle="tooltip"
                      data-placement="top"
                      data-original-title="Note : Last min days is difference between check in and booking date. If difference is no of date entered in check in before or less offer will be applied. Eg-Check in before-5 offer will be applied if difference between check in and booking date is 5 and less(1,2,3)"
                    />
                  </span>
                </div>
              </div>
              <div
                className="col-md-2 form-group phps_row_1 padd_5 last-minute2"
                style={{ display: "none" }}
              >
                <label className="valuefor_txt">Last Minute</label>
                <div className="input-group col-md-12 col-xs-12">
                  <input
                    type="text"
                    name="last_minute2"
                    id="last-minute2"
                    maxLength={3}
                    size={4}
                    className="form-control form-control-sm"
                    onblur="extractNumber(this,2,false);"
                    onkeyup="extractNumber(this,2,false);"
                  />
                  <span className="input-group-addon">Days</span>
                </div>
              </div>
              <div
                className="col-md-2 form-group phps_row_0 padd_5 checkin-before2"
                style={{ display: "none" }}
              >
                <label className="valuefor_txt">Checkin Before</label>
                <div className="input-group col-md-12 col-xs-12">
                  <input
                    type="text"
                    name="before_checkin2"
                    id="checkin-before2"
                    maxLength={3}
                    size={4}
                    className="form-control form-control-sm"
                    onblur="extractNumber(this,2,false);"
                    onkeyup="extractNumber(this,2,false);"
                  />
                  <span className="input-group-addon">Days</span>
                </div>
              </div>
              {/* <div class="phps_row_1 padd_5">
<div class="float_l padd_5">
<div class="valuefor_txt">Booking Date From</div>
<div>
<input readonly id="sf_date2" name="sf_date2" type="text"   
value=""  class="input_width_1 setfonts color_set_1 marginR5">
<img src="images/clear.gif" onclick="clear1('sf_date2')"/></div>
</div>

<div class="float_l padd_5  brdr_rgt">
<div class="valuefor_txt">Booking Date To</div>
<div>
<input  readonly id="st_date2" name="st_date2" type="text"  

value=""  class="input_width_1 setfonts color_set_1 marginR5">
<img src="images/clear.gif" onclick="clear1('st_date2')"/></div>
</div>

<div class="float_l padd_5">
<div class="valuefor_txt">Checkin Date From</div>
<div>
<input readonly id="bf_date2" name="bf_date2" type="text"   

value=""  class="input_width_1 setfonts color_set_1 marginR5">
<img src="images/clear.gif" onclick="clear1('bf_date2')"/></div>
</div>

<div class="float_l padd_5  brdr_rgt">
<div class="valuefor_txt">Checkin Date To</div>
<div>
<input readonly id="bt_date2" name="bt_date2"  type="text"  

value=""  class="input_width_1 setfonts color_set_1 marginR5">
<img src="images/clear.gif" onclick="clear1('bt_date2')"/></div>
</div>

<div class="float_l padd_5">
<div class="valuefor_txt">Checkin Before</div>
<div>
<input type="text" value="" name="before_checkin2" id="before_checkin2" maxlength="3" size="4" class="setfonts 

color_set_1 marginR5" onBlur="extractNumber(this,2,false);" onKeyUp="extractNumber(this,2,false);"> Days
</div>
</div> */}
              <input type="hidden" id="date_count2" name="date_count2" />
              <br className="clear" />
              <table border={0} cellSpacing={0} cellPadding={0} width="100%">
                <tbody className="bg-white">
                  <tr>
                    <td valign="top" align="right" width="15%">
                      &nbsp;
                    </td>
                    <td valign="top" align="right">
                      {/* <span id="addmore_span"><input type="button" value="Add More" name="addmore" id="addmore" onclick="add_more_row();" /></span>&nbsp;&nbsp; 
<span id="remove_span"><input type="button" value="Remove" name="removebtn" id="removebtn" onclick="remove_row();" /></span>&nbsp;&nbsp;&nbsp;*/}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div id="row3" className="row" style={{ display: "none" }}>
              <div className="col-md-2 form-group phps_row_0 padd_5">
                <label className="valuefor_txt">Booking Date</label>
                <div
                  className="input-group date input-daterange"
                  id="booking_from_date"
                >
                  <input
                    id="sf_date3"
                    name="sf_date3"
                    type="text"
                    className="form-control form-control-sm"
                  />
                  <span className="input-group-addon">to</span>
                  <input
                    id="st_date3"
                    name="st_date3"
                    type="text"
                    className="form-control form-control-sm"
                  />
                  <span
                    className="input-group-addon"
                    alt="clear"
                    title="clear"
                    onclick="clear1('st_date3')"
                  >
                    <i className="fa fa-trash" />
                  </span>
                </div>
              </div>
              <div className="col-md-2 form-group phps_row_1 padd_5">
                <label className="valuefor_txt">Checkin Date</label>
                <div
                  className="input-group date input-daterange"
                  id="checkin_date_from"
                >
                  <input
                    id="bf_date3"
                    name="bf_date3"
                    type="text"
                    className="form-control form-control-sm"
                  />
                  <span className="input-group-addon">to</span>
                  <input
                    id="bt_date3"
                    name="bt_date3"
                    type="text"
                    className="form-control form-control-sm"
                  />
                  <span
                    className="input-group-addon"
                    alt="clear"
                    title="clear"
                    onclick="clear1('bt_date3')"
                  >
                    <i className="fa fa-trash" />
                  </span>
                </div>
              </div>
              <div className="col-md-3 form-group phps_row_0 padd_5">
                <lable>&nbsp;</lable>
                <div className="input-group col-md-12 col-xs-12">
                  <div
                    className="radio radio-success radio-inline"
                    style={{ marginTop: "10px" }}
                  >
                    <input
                      type="radio"
                      className="discount_apply"
                      id="radio-checkin-before3"
                      name="discount_apply3"
                      defaultValue="checkin-before"
                    />{" "}
                    <label className="check_heading">Checkin Before </label>
                  </div>
                  <span>
                    <i
                      className="fa fa-info-circle"
                      title
                      data-toggle="tooltip"
                      data-placement="top"
                      data-original-title="Note : Check in before days is difference between check in and booking date. If difference is no of date entered in check in before or more offer will be applied. Eg-Check in before-5 offer will be applied if difference between check in and booking date is 5 and more."
                    />
                  </span>
                  <div
                    className="radio radio-success radio-inline"
                    style={{ marginTop: "10px" }}
                  >
                    <input
                      type="radio"
                      className="discount_apply"
                      id="radio-last-minute3"
                      name="discount_apply3"
                      defaultValue="last-minute"
                    />{" "}
                    <label className="check_heading">Last Minute</label>
                  </div>
                  <span>
                    <i
                      className="fa fa-info-circle"
                      title
                      data-toggle="tooltip"
                      data-placement="top"
                      data-original-title="Note : Last min days is difference between check in and booking date. If difference is no of date entered in check in before or less offer will be applied. Eg-Check in before-5 offer will be applied if difference between check in and booking date is 5 and less(1,2,3)"
                    />
                  </span>
                </div>
              </div>
              <div
                className="col-md-2 form-group phps_row_1 padd_5 last-minute3"
                style={{ display: "none" }}
              >
                <label className="valuefor_txt">Last Minute</label>
                <div className="input-group col-md-12 col-xs-12">
                  <input
                    type="text"
                    name="last_minute3"
                    id="last-minute3"
                    maxLength={3}
                    size={4}
                    className="form-control form-control-sm"
                    onblur="extractNumber(this,2,false);"
                    onkeyup="extractNumber(this,2,false);"
                  />
                  <span className="input-group-addon">Days</span>
                </div>
              </div>
              <div
                className="col-md-2 form-group phps_row_0 padd_5 checkin-before3"
                style={{ display: "none" }}
              >
                <label className="valuefor_txt">Checkin Before</label>
                <div className="input-group col-md-12 col-xs-12">
                  <input
                    type="text"
                    name="before_checkin3"
                    id="checkin-before3"
                    maxLength={3}
                    size={4}
                    className="form-control form-control-sm"
                    onblur="extractNumber(this,2,false);"
                    onkeyup="extractNumber(this,2,false);"
                  />
                  <span className="input-group-addon">Days</span>
                </div>
              </div>
              {/* <div class="phps_row_1 padd_5">
<div class="float_l padd_5">
<div class="valuefor_txt">Booking Date From</div>
<div>
<input readonly id="sf_date3" name="sf_date3" type="text"   
value=""  class="input_width_1 setfonts color_set_1 marginR5">
<img src="images/clear.gif" onclick="clear1('sf_date3')"/></div>
</div>

<div class="float_l padd_5  brdr_rgt">
<div class="valuefor_txt">Booking Date To</div>
<div>
<input  readonly id="st_date3" name="st_date3" type="text"  

value=""  class="input_width_1 setfonts color_set_1 marginR5">
<img src="images/clear.gif" onclick="clear1('st_date3')"/></div>
</div>

<div class="float_l padd_5">
<div class="valuefor_txt">Checkin Date From</div>
<div>
<input readonly id="bf_date3" name="bf_date3" type="text"   

value=""  class="input_width_1 setfonts color_set_1 marginR5">
<img src="images/clear.gif" onclick="clear1('bf_date3')"/></div>
</div>

<div class="float_l padd_5  brdr_rgt">
<div class="valuefor_txt">Checkin Date To</div>
<div>
<input readonly id="bt_date3" name="bt_date3"  type="text"  

value=""  class="input_width_1 setfonts color_set_1 marginR5">
<img src="images/clear.gif" onclick="clear1('bt_date3')"/></div>
</div>

<div class="float_l padd_5">
<div class="valuefor_txt">Checkin Before</div>
<div>
<input type="text" value="" name="before_checkin3" id="before_checkin3" maxlength="3" size="4" class="setfonts 

color_set_1 marginR5" onBlur="extractNumber(this,2,false);" onKeyUp="extractNumber(this,2,false);"> Days
</div>
</div> */}
              <input type="hidden" id="date_count3" name="date_count3" />
              <br className="clear" />
              <table border={0} cellSpacing={0} cellPadding={0} width="100%">
                <tbody className="bg-white">
                  <tr>
                    <td valign="top" align="right" width="15%">
                      &nbsp;
                    </td>
                    <td valign="top" align="right">
                      {/* <span id="addmore_span"><input type="button" value="Add More" name="addmore" id="addmore" onclick="add_more_row();" /></span>&nbsp;&nbsp; 
<span id="remove_span"><input type="button" value="Remove" name="removebtn" id="removebtn" onclick="remove_row();" /></span>&nbsp;&nbsp;&nbsp;*/}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <input type="hidden" id="cnt" name="cnt" defaultValue={1} />
            <input
              name="current_roomrate_row"
              id="current_roomrate_row"
              defaultValue={1}
              type="hidden"
            />
            <div className="row mt-3">
              <div className="col-md-3 form-group phps_row_0 padd_5">
                <div className="checkbox checkbox-success checkbox-inline">
                  <input
                    type="checkbox"
                    defaultValue={1}
                    name="is_min_offer"
                    id="is_min_offer"
                  />
                  <label htmlFor="is_min_offer" className>
                    Min offer apply
                  </label>
                </div>
                <div id="min_stay" style={{ display: "none" }}>
                  <label className>Min Stay </label>
                  <input
                    type="text"
                    onkeyup="extractNumber(this,2,false);"
                    onblur="extractNumber(this,2,false);validate_stay('min');"
                    className="form-control form-control-sm setfonts color_set_1 marginR5"
                    size={4}
                    maxLength={3}
                    id="id_min_stay"
                    name="min_stay"
                  />
                </div>
              </div>
              <div className="col-md-3 form-group phps_row_1 padd_5">
                <div className="checkbox checkbox-success checkbox-inline">
                  <input
                    type="checkbox"
                    defaultValue={1}
                    name="is_max_offer"
                    id="is_max_offer"
                  />
                  <label htmlFor="is_max_offer" className>
                    Max offer apply
                  </label>
                </div>
                <div id="max_stay" style={{ display: "none" }}>
                  <label className>Max Stay</label>
                  <input
                    type="text"
                    onkeyup="extractNumber(this,2,false);"
                    onblur="extractNumber(this,2,false);validate_stay('max');"
                    className="form-control form-control-sm setfonts color_set_1 marginR5"
                    size={4}
                    maxLength={3}
                    id="id_max_stay"
                    name="max_stay"
                  />
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12 form-group phps_row_0 padd_5">
                {/* added by bhumi for new offers module */}
              </div>
            </div>
            <div
              className="panel-footer text-right"
              style={{ textAlign: "right" }}
            >
              *Applicable for Mapped and Contracted Properties Only
            </div>
            <div className="panel-body ">
              <div className="row mt-3">
                <div className="col-md-3 form-group phps_row_1 padd_5">
                  <label className="valuefor_txt">Is Refundable?</label>
                  <MultiSelect
                    options={refund_options}
                    isSearchable
                    placeholder="- Select Refundable -"
                    className="custom-select"
                    noOptionsMessage={() => "No Refundable Found"}
                  />
                </div>
                {/* 
    <div class="col-md-3 form-group phps_row_0 padd_5">
  <label class="valuefor_txt">Offer Options</label>
  <select class="selectpicker form-control show-menu-arrow input_width_2 setfonts color_set_1" id='sel_weekday_weekend' name="sel_weekday_weekend">
      <option value="all"  selected>All Days</option>
      <option value="weekday" >Weekday</option>
      <option value="weekend" >Weekend</option>
  </select>
                  </div> */}
                <div
                  className="col-md-3 form-group phps_row_1 padd_5"
                  id="sel_apply_on_tag"
                >
                  <label>Offer Apply on</label>
                  <MultiSelect
                    options={applyOnOptions}
                    isSearchable
                    placeholder="- Select Apply -"
                    className="custom-select"
                    noOptionsMessage={() => "No Apply Found"}
                  />
                </div>
                <div
                  className="col-md-3 form-group phps_row_0 padd_5"
                  id="div_offer_only_for"
                  style={{ display: "block" }}
                >
                  <label className>Offer Apply on Days</label>
                  <MultiSelect
                    options={offerForOptions}
                    isSearchable
                    placeholder="- Select Offer Days -"
                    className="custom-select"
                    noOptionsMessage={() => "No Offer Days Found"}
                  />
                </div>
              </div>
              <div className="form-group phps_row_1 padd_5 mt-3">
                {/* 3 */}
                <div
                  id="div_EBD"
                  style={{}}
                  className="hideforb2c overflow_data clear_floatdata phps_row_0 padd_5 panel-body"
                >
                  <h5>Early Bird</h5>
                  {/* phase B 1 */}
                  <div className="overflow_data clear_floatdata row">
                    <div className="col-sm-12 form-group phps_row_1 padd_5 row">
                      <div className="radioline col-lg-3 form-group phps_row_0 padd_5">
                        <div className="radio radio-success radio-inline">
                          <input
                            type="radio"
                            id="app"
                            className="show_accordingly_EBD"
                            onchange="show_accordingly('EBD',this)"
                            name="EBD_dtype"
                            defaultValue="amount"
                            defaultChecked
                          />
                          <label htmlFor="EBD_dtypeAmount">Amount</label>
                        </div>
                        <div className="radio radio-success radio-inline">
                          <input
                            type="radio"
                            id="app"
                            className="show_accordingly_EBD"
                            onchange="show_accordingly('EBD',this)"
                            name="EBD_dtype"
                            defaultValue="per"
                          />
                          <label htmlFor="EBD_dtypePer">Percentage</label>
                        </div>
                      </div>
                      <div className="col-lg-12 form-group phps_row_1 padd_5 mt-3">
                        <label>Discount</label>
                      </div>
                      <div className="col-xs-5 col-md-3 col-sm-4">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 input-group">
                          <input
                            type="text"
                            className="form-control form-control-sm setfonts color_set_1"
                            maxLength={5}
                            name="EBD_discount"
                            id="EBD_discount"
                            onblur="extractNumber(this,2,false);"
                            onkeyup="extractNumber(this,2,false);"
                          />
                          <span
                            id="EBD_show_per"
                            className="input-group-addon"
                            style={{ display: "none" }}
                          >
                            %
                          </span>
                        </div>
                      </div>
                      <div className="col-md-3 col-sm-4  col-xs-5">
                        <span id="EBD_show_amount">
                          <MultiSelect
                            options={currencyOptionsa}
                            isSearchable
                            placeholder="- Select Currency -"
                            className="custom-select"
                            noOptionsMessage={() => "No Currency Found"}
                          />
                          Per Night
                          <span>
                            <i
                              className="fa fa-info-circle"
                              title
                              data-toggle="tooltip"
                              data-placement="top"
                              data-original-title="Note : If Currency is not selected, Amount entered in Discount field will apply as Percentage"
                            />
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-12 form-group phps_row_0 padd_5 mt-3">
                      <label>Offer Note</label>
                      <textarea
                        className="form-control form-control-sm"
                        name="EBD_offer_note"
                        id="EBD_offer_note"
                        rows={5}
                        defaultValue={""}
                      />
                    </div>
                  </div>
                </div>
                {/* 4 */}
                <div
                  id="div_SP"
                  style={{ display: "none" }}
                  className="showforb2c overflow_data clear_floatdata phps_row_0 panel-body"
                >
                  <h4>Stay / Pay</h4>
                  {/* phase B 1 */}
                  <div className="overflow_data clear_floatdata row">
                    <div className="col-md-3 form-group">
                      <label>Stay</label>
                      <div className="input-group col-md-12 col-xs-12">
                        <input
                          type="text"
                          className="form-control form-control-sm setfonts color_set_1 required"
                          maxLength={3}
                          name="SP_no_of_nights"
                          id="SP_no_of_nights"
                          onblur="extractNumber(this,0,false);"
                          onkeyup="extractNumber(this,0,false);"
                        />
                        <span className="input-group-addon">Night(s)</span>
                      </div>
                    </div>
                    <div className="col-md-3 form-group">
                      <label>Pay</label>
                      <div className="input-group col-md-12 col-xs-12">
                        <input
                          type="text"
                          className="form-control form-control-sm setfonts color_set_1 required"
                          maxLength={3}
                          name="SP_no_of_nights1"
                          id="SP_no_of_nights1"
                          onblur="extractNumber(this,0,false);"
                          onkeyup="extractNumber(this,0,false);"
                        />
                        <span className="input-group-addon">Night(s)</span>
                      </div>
                    </div>
                    <div className="col-md-3 form-group">
                      <label>&nbsp;</label> <br />
                      <div className="checkbox checkbox-success checkbox-inline">
                        <input
                          type="checkbox"
                          name="multiple_stay_offer"
                          id="multiple_stay_offer"
                          defaultValue="yes"
                        />
                        <label htmlFor="multiple_stay_offer">Multiple</label>
                      </div>
                    </div>
                    <div className="col-md-12 form-group">
                      <label>Offer Note</label>
                      <textarea
                        className="form-control form-control-sm"
                        name="SP_offer_note"
                        id="SP_offer_note"
                        defaultValue={""}
                      />
                    </div>
                  </div>
                </div>
                {/* 5 */}
                <div
                  id="div_LS"
                  style={{ display: "none" }}
                  className="overflow_data clear_floatdata phps_row_0 panel-body"
                >
                  <h4>Long Stay</h4>
                  {/* phase A 1 */}
                  <div className="overflow_data clear_floatdata ">
                    <div className="col-md-3 form-group row">
                      <label>Night(s)</label>
                      <input
                        type="text"
                        className="form-control form-control-sm setfonts color_set_1"
                        maxLength={3}
                        name="no_of_nights"
                        id="no_of_nights"
                        onblur="extractNumber(this,0,false);"
                        onkeyup="extractNumber(this,0,false);"
                      />
                    </div>
                    {/* phase A 2 */}
                    <div className="overflow_data clear_floatdata row">
                      <div className="col-sm-12 form-group phps_row_1 padd_5 row">
                        <div className="col-lg-3 form-group phps_row_0 padd_5">
                          <div className="radio radio-success radio-inline">
                            <input
                              type="radio"
                              id="LS_dtypeAmount"
                              className="show_accordingly_LS"
                              onchange="show_accordingly('LS',this)"
                              name="LS_dtype"
                              defaultValue="amount"
                              defaultChecked
                            />
                            <label htmlFor="LS_dtypeAmount">Amount</label>
                          </div>
                          <div className="radio radio-success radio-inline">
                            <input
                              type="radio"
                              id="LS_dtypePer"
                              className="show_accordingly_LS"
                              onchange="show_accordingly('LS',this)"
                              name="LS_dtype"
                              defaultValue="per"
                            />
                            <label htmlFor="LS_dtypePer">Percentage</label>
                          </div>
                        </div>
                        <div className="col-lg-12 form-group phps_row_1 padd_5">
                          <label>Discount</label>
                        </div>
                        <div className="col-xs-5 col-md-3 col-sm-4">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 input-group">
                            <input
                              type="text"
                              className="form-control setfonts color_set_1"
                              maxLength={5}
                              name="LS_discount"
                              id="LS_discount"
                              onblur="extractNumber(this,2,false);"
                              onkeyup="extractNumber(this,2,false);"
                            />
                            <span
                              id="LS_show_per"
                              className="input-group-addon"
                              style={{ display: "none" }}
                            >
                              %
                            </span>
                          </div>
                        </div>
                        <div className="col-md-3 col-sm-4  col-xs-5">
                          <span id="LS_show_amount">
                            <MultiSelect
                              options={currencyOptionsa}
                              isSearchable
                              placeholder="- Select Currency -"
                              className="custom-select required"
                              noOptionsMessage={() => "No Currency Found"}
                            />
                            Per Night
                            <span>
                              <i
                                className="fa fa-info-circle"
                                title
                                data-toggle="tooltip"
                                data-placement="top"
                                data-original-title="Note : If Currency is not selected, Amount entered in Discount field will apply as Percentage"
                              />
                            </span>
                          </span>
                        </div>
                      </div>
                      <div className="col-sm-12 col-md-12 col-lg-12 form-group phps_row_0 padd_5">
                        <label>Offer Note</label>
                        <textarea
                          className="form-control form-control-sm"
                          name="LS_offer_note"
                          id="LS_offer_note"
                          defaultValue={""}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* 6 */}
                <div
                  id="div_MP"
                  style={{ display: "none" }}
                  className="overflow_data clear_floatdata phps_row_0 panel-body"
                >
                  <h4>Markup</h4>
                  {/* phase A 1 */}
                  <div className="overflow_data clear_floatdata row">
                    <div className="col-sm-12 form-group phps_row_1 padd_5 row">
                      <div className="col-lg-3 form-group phps_row_0 padd_5">
                        <div className="radio radio-success radio-inline">
                          <input
                            type="radio"
                            id="MP_dtypeAmount"
                            className="show_accordingly_MP"
                            onchange="show_accordingly('MP',this)"
                            name="MP_dtype"
                            defaultValue="amount"
                            defaultChecked
                          />
                          <label htmlFor="MP_dtypeAmount">Amount</label>
                        </div>
                        <div className="radio radio-success radio-inline">
                          <input
                            type="radio"
                            id="MP_dtypePer"
                            className="show_accordingly_MP"
                            onchange="show_accordingly('MP',this)"
                            name="MP_dtype"
                            defaultValue="per"
                          />
                          <label htmlFor="MP_dtypePer">Percentage</label>
                        </div>
                      </div>
                      <div className="col-lg-3 form-group phps_row_1 padd_5">
                        <div className="radio radio-success radio-inline">
                          <input
                            type="radio"
                            id="markup_type"
                            name="markup_type"
                            defaultValue="markup"
                          />
                          <label htmlFor="markup_type">Markup</label>
                        </div>
                        <div className="radio radio-success radio-inline">
                          <input
                            type="radio"
                            id="commision"
                            name="markup_type"
                            defaultValue="commssion"
                          />
                          <label htmlFor="commision">Commssion</label>
                        </div>
                      </div>
                      <div className="col-xs-5 col-md-3 col-sm-4">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 input-group">
                          <input
                            type="text"
                            className="form-control setfonts color_set_1"
                            maxLength={5}
                            name="MP_discount"
                            id="MP_discount"
                            onblur="extractNumber(this,2,false);"
                            onkeyup="extractNumber(this,2,false);"
                          />
                          <span
                            id="MP_show_per"
                            className="input-group-addon"
                            style={{ display: "none" }}
                          >
                            %
                          </span>
                        </div>
                      </div>
                      <div className="col-md-3 col-sm-4  col-xs-5">
                        <span id="MP_show_amount">
                          <MultiSelect
                            options={currencyOptionsa}
                            isSearchable
                            placeholder="- Select Currency -"
                            className="custom-select required"
                            noOptionsMessage={() => "No Currency Found"}
                          />
                          Per Night
                          <span>
                            <i
                              className="fa fa-info-circle"
                              title
                              data-toggle="tooltip"
                              data-placement="top"
                              data-original-title="Note : If Currency is not selected, Amount entered in Discount field will apply as Percentage"
                            />
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-12 form-group phps_row_0 padd_5">
                      <label>Offer Note</label>
                      <textarea
                        className="form-control"
                        name="MP_offer_note"
                        id="MP_offer_note"
                        defaultValue={""}
                      />
                    </div>
                  </div>
                  {/* phase A 2 */}
                  {/* <div class="col-md-12">	
          <div class="overflow_data clear_floatdata row">
              <label>Note</label>
              <textarea class="form-control"  name="MP_admin_note" id="MP_admin_note"></textarea>
          </div>
      </div> */}
                </div>
                {/* 7 */}
                <div
                  id="div_DIS"
                  style={{ display: "none" }}
                  className="overflow_data clear_floatdata phps_row_0 panel-body"
                >
                  <h4>Discount</h4>
                  {/* phase A 1 */}
                  <div className="overflow_data clear_floatdata row">
                    <div className="col-sm-12 form-group phps_row_1 padd_5 row">
                      <div className="col-lg-3 form-group phps_row_0 padd_5">
                        <div className="radio radio-success radio-inline">
                          <input
                            type="radio"
                            id="DIS_dtypeAmount"
                            className="show_accordingly_DIS"
                            onchange="show_accordingly('DIS',this)"
                            name="DIS_dtype"
                            defaultValue="amount"
                            defaultChecked
                          />
                          <label htmlFor="DIS_dtypeAmount">Amount</label>
                        </div>
                        <div className="radio radio-success radio-inline">
                          <input
                            type="radio"
                            id="DIS_dtypePer"
                            className="show_accordingly_DIS"
                            onchange="show_accordingly('DIS',this)"
                            name="DIS_dtype"
                            defaultValue="per"
                          />
                          <label htmlFor="DIS_dtypePer">Percentage</label>
                        </div>
                      </div>
                      <div className="col-lg-12 form-group phps_row_1 padd_5">
                        <label>Discount</label>
                      </div>
                      <div className="col-xs-5 col-md-3 col-sm-4">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 input-group">
                          <input
                            type="text"
                            className="form-control form-control-sm setfonts color_set_1"
                            maxLength={5}
                            name="DIS_discount"
                            id="DIS_discount"
                            onblur="extractNumber(this,2,false);"
                            onkeyup="extractNumber(this,2,false);"
                          />
                          <span
                            id="DIS_show_per"
                            className="input-group-addon"
                            style={{ display: "none" }}
                          >
                            %
                          </span>
                        </div>
                      </div>
                      <div className="col-md-3 col-sm-4  col-xs-5">
                        <span id="DIS_show_amount">
                          <MultiSelect
                            options={currencyOptionsa}
                            isSearchable
                            placeholder="- Select Currency -"
                            className="custom-select required"
                            noOptionsMessage={() => "No Currency Found"}
                          />
                          Per Night
                          <span>
                            <i
                              className="fa fa-info-circle"
                              title
                              data-toggle="tooltip"
                              data-placement="top"
                              data-original-title="Note : If Currency is not selected, Amount entered in Discount field will apply as Percentage"
                            />
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-12 form-group phps_row_0 padd_5">
                      <label>Offer Note</label>
                      <textarea
                        className="form-control form-control-sm"
                        name="DIS_offer_note"
                        id="DIS_offer_note"
                        defaultValue={""}
                      />
                    </div>
                  </div>
                  {/* phase A 2*/}
                  {/* <div class="col-md-12">
          <div  class="overflow_data clear_floatdata">
              <label>Note</label>
              <textarea class="form-control"  name="DIS_admin_note" id="DIS_admin_note"></textarea>
          </div> 
      </div>  */}
                </div>
                {/* 8 */}
                <div
                  id="div_PM"
                  style={{ display: "none" }}
                  className="overflow_data clear_floatdata phps_row_0 panel-body"
                >
                  <h4>Promotion</h4>
                  {/* phase B 1 */}
                  <div className="col-md-12">
                    <div className="overflow_data clear_floatdata row">
                      <label>Promotion Note</label>
                      <textarea
                        className="form-control form-control-sm required"
                        name="promotion_text"
                        id="promotion_text"
                        defaultValue={""}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="col-md-12 form-group phps_row_1 padd_5">
                {/* <div id='button_disp'  style="height:20px;" class="phps_header">  */}
                <button
                  type="button"
                  className="btn btn-dark btn-sm"
                  name="disc_button"
                  onclick="check_validation();"
                  value="Add Offers"
                >
                  <i className="fa fa-plus" />
                  &nbsp;Add Offers
                </button>
                {/* </div> */}&nbsp;&nbsp;
                <a
                  href="applicable_offer.php?action=show_offers_through_link"
                  className="btn btn-outline-secondary btn-sm"
                >
                  <i className="fa fa-share" />
                  &nbsp;Go To All Offers/Discounts
                </a>
              </div>
            </div>
            <div className="row"></div>
          </div>
        </form>
      </div>
    </>
  );
};
export default ContractsOffersAndDiscountsNew;
