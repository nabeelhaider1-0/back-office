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
  displayTypeOptions,
  nationalityOptions,
  offersdiscount_options,
  offlineHotelSuppliersOptions,
  resultCountOptions,
  supplierProfileOptions,
} from "../../../constants/contants";
import Constants from "../../../constants/routes";

const ContractsOffersAndDiscountsSearch = () => {
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

  return (
    <>
      <Header2
        title="SEARCH APPLICABLE OFFER DISCOUNTS"
        linkText1="Search Applicable Offer Discounts"
      />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <div>
          <form>
            <div className="panel-body">
              <div id="message" style={{ display: "none" }}></div>
              <div className="row">
                <div className="col-md-4 form-group noMargin">
                  {/* <label class="padd_5"><input type="radio" name="offer[]" value="" onchange="showDownPopup_search('');"/><span></span></label>*/}
                  <label>Offers</label>

                  <MultiSelect
                    options={offersdiscount_options}
                    isSearchable
                    placeholder="- Select -"
                    className="custom-select"
                    noOptionsMessage={() => "No Options Found"}
                  />
                </div>
                {/* <div class="col-md-8 text-right form-group noMargin">
                          <br/>
                                                                          <div class="btn-group text-center form-group">
                                      <a href="applicable_offer.php?action=search_show_online" class="btn btn-outline btn-sm btn-primary" id="online">Online</a> 
                                      <a href="applicable_offer.php?action=search_show_offline" class="btn btn-outline btn-sm btn-primary" id="offline">Offline</a>
                                  </div>
                                                                  </div> */}
              </div>
            </div>
          </form>
          <br />
          <form>
            <div className="panel-body">
              <div className="phps_row_0 padd_5">
                <div className="row mt-3">
                  {/* dono */}
                  <div className="col-md-2 form-group">
                    <label className="valuefor_txt">Branch</label>
                    <MultiSelect
                      options={add_options}
                      isSearchable
                      placeholder="- Select Branch -"
                      className="custom-select"
                      noOptionsMessage={() => "No Branch Found"}
                    />
                  </div>
                  <div className="col-md-2 form-group">
                    <label className="valuefor_txt">Agent</label>
                    <input
                      className="form-control form-control-sm box"
                      type="text"
                      onkeyup="getAgentList(this,event);"
                      autoComplete="off"
                      name="sel_agent"
                      id="sel_agent"
                    />
                  </div>
                  {/* offline */}
                  <div className="col-md-2 form-group">
                    <label className="valuefor_txt">Country</label>
                    <MultiSelect
                      options={countries}
                      isSearchable
                      placeholder="- Select Country -"
                      className="custom-select required"
                      onChange={handleCountryChange}
                      noOptionsMessage={() => "No Country Found"}
                    />
                  </div>
                  <div className="col-md-2 form-group">
                    <label className="valuefor_txt">City</label>
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
                  <div className="col-md-4 form-group">
                    <label className="valuefor_txt">Discount Code</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="discount_code"
                      id="discount_code"
                      maxLength={30}
                      size={31}
                    />
                  </div>
                </div>
                {/* <br class="clear"/> */}
                {/* offline */}
                <div className="row blocks form-group mt-4">
                  <div className="col-md-3 form-group noMargins">
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
                  <div className="col-md-3 form-group noMargins">
                    <div className="radio radio-success radio-inline">
                      <input
                        type="radio"
                        name="join_offer2"
                        defaultValue="market"
                        id="market"
                        onChange={handleRadioChange1}
                      />
                      <label htmlFor="market">Market Profile</label>
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
                  <div className="col-md-3 form-group">
                    <div className="radio radio-success radio-inline">
                      <input
                        type="radio"
                        name="join_offer"
                        defaultValue="hotel"
                        id="join_offer_property"
                        onChange={handleRadioChange2}
                      />
                      <label htmlFor="property">Property</label>
                    </div>
                    {displayDiv2 && (
                      <div id="div_hotel_disp">
                        <select
                          className="selectpicker form-control form-control-sm show-menu-arrow setfonts color_set_1 bs-select-hidden"
                          onchange="show_Room_Category()"
                          id="sel_property"
                          name="sel_property"
                          disabled="disabled"
                          data-live-search="true"
                        >
                          <option value="all">All</option>
                        </select>
                      </div>
                    )}
                  </div>
                  <div className="col-md-3 form-group">
                    <div className="radio radio-success radio-inline">
                      <input
                        type="radio"
                        name="join_offer1"
                        id="join_offer1_offline_supplier"
                        defaultValue="off_supplier"
                        onChange={handleRadioChange3}
                      />
                      <label htmlFor="offline_supplier">Offline Supplier</label>
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
                  <div
                    className="col-md-3 form-group"
                    id="float_lpa"
                    style={{ display: "none" }}
                  >
                    <div className="radio radio-inline radio-success">
                      <input
                        type="radio"
                        name="join_offer1"
                        defaultValue="room_class"
                        onchange="display_offers1('room_class')"
                        id="roomcat"
                      />
                      <label htmlFor="roomcat">Room Category </label>
                    </div>
                    <div id="div_room_class_disp" style={{ display: "none" }}>
                      <select
                        className="selectpicker form-control form-control-sm show-menu-arrow setfonts color_set_1 bs-select-hidden"
                        name="room_class"
                        id="room_class"
                        data-live-search="true"
                      >
                        <option value="all">All</option>
                      </select>
                    </div>
                  </div>
                </div>
                {/* <br class="clear"/> */}
              </div>
            </div>
          </form>
          <div
            className="panel-footer text-right mt-2 mb-2"
            style={{ textAlign: "right" }}
          >
            *Applicable for Mapped and Contracted Properties Only
          </div>
          <form>
            <div className="panel-body">
              <div className="row mt-4">
                <div className="col-md-3 form-group">
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
                      id="bookTrashBtn"
                      onClick={handleTrashClick}
                    >
                      <i className="fa fa-trash" />
                    </span>
                  </div>
                </div>
                {/* <div class="col-md-2 form-group">
                                  <label class="valuefor_txt">Booking Date To</label>
                                  <div class='input-group date' id="booking_to_date">
                                      <input name="st_date" type="text" value="" class="form-control setfonts color_set_1 marginR5">
                                      <!--input id="st_date" name="st_date" type="text" value="" class="form-control setfonts color_set_1 marginR5"
                                      <span class="input-group-addon">
                                          <span class="glyphicon glyphicon-calendar"></span>
                                      </span>
                                  </div>
                              </div> */}
                <div className="col-md-3 form-group">
                  <label className="valuefor_txt">Checkin Date Form</label>
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
                      id="checkinTrashBtn"
                      onClick={handleTrashClick1}
                    >
                      <i className="fa fa-trash" />
                    </span>
                  </div>
                </div>
                {/* <div class="col-md-2 form-group">
                                  <label class="valuefor_txt">Checkin Date To</label>
                                  <div class='input-group date' id="checkin_date_to">
                                      <input name="bt_date"  type="text" value="" class="form-control setfonts color_set_1 marginR5">
                                      <!--input id="bt_date" name="bt_date"  type="text" value="" class="form-control setfonts color_set_1 marginR5"
                                      <span class="input-group-addon">
                                          <span class="glyphicon glyphicon-calendar"></span>
                                      </span>
                                  </div>
                              </div> */}
                <div className="col-md-3 form-group">
                  <label className="valuefor_txt">Checkin Before(Days)</label>
                  <div className="input-group col-md-12 col-xs-12">
                    <input
                      type="text"
                      name="before_checkin"
                      id="before_checkin"
                      maxLength={3}
                      size={4}
                      className="form-control form-control-sm setfonts color_set_1"
                      onblur="extractNumber(this,2,false);"
                      onkeyup="extractNumber(this,2,false);"
                    />
                    <span
                      className="input-group-addon"
                      style={{ paddingRight: "32px!important" }}
                    >
                      Days
                    </span>
                  </div>
                </div>
                <div className="col-md-3 form-group">
                  <label className="valuefor_txt">Display Only</label>
                  <MultiSelect
                    options={displayTypeOptions}
                    isSearchable
                    placeholder="- Select Display -"
                    className="custom-select"
                    noOptionsMessage={() => "No Display Found"}
                  />
                </div>
                <div className="col-md-3 form-group mt-3">
                  <label className="valuefor_txt">Results</label>
                  <MultiSelect
                    options={resultCountOptions}
                    isSearchable
                    placeholder="- Select Results -"
                    className="custom-select"
                    noOptionsMessage={() => "No Results Found"}
                  />
                </div>
                <br className="clear" />
              </div>
              <br />
              <div className="row mt-3">
                <div className="col-md-12 form-group">
                  <input
                    type="hidden"
                    name="search_action"
                    id="search_action"
                  />
                  <Link
                    to={
                      Constants.URLConstants
                        .CONTRACTSHOTELSOFFERSANDDISCOUNTSSEARCHBUTTON
                    }
                  >
                    {" "}
                    <button
                      type="button"
                      className="btn btn-dark btn-sm"
                      name="search_button"
                      value="Search"
                      onclick="show_results(0,0);"
                    >
                      <i className="fa fa-search" />
                      &nbsp;Search
                    </button>
                  </Link>
                  &nbsp;&nbsp;
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                    name="show_all_button"
                    value="Show All"
                    onclick="show_results(1,1);"
                  >
                    <i className="fa fa-list" />
                    &nbsp;Show All
                  </button>
                  &nbsp;&nbsp;
                  <Link
                    onclick="resetAll();"
                    className="btn btn-outline-secondary btn-sm"
                  >
                    <i className="fa fa-repeat" />
                    &nbsp;Reset All
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default ContractsOffersAndDiscountsSearch;
