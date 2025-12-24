import Flatpickr from "react-flatpickr";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Header2 from "../../header2/header2";
import MultiSelect from "../../reactMultiSelect";
import {
  citiesByCountry,
  countries,
} from "../../../constants/Country-City-Data";
import Constants from "../../../constants/routes";
import {
  add_options,
  displayTypeOptions,
  nationalityOptions,
  offersdiscount_options,
  offlineHotelSuppliersOptions,
  resultCountOptions,
  supplierProfileOptions,
} from "../../../constants/contants";

const ContractsOffersAndDiscountsSearchButton = () => {
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
  const wrapper1Ref = useRef(null);
  const wrapper2Ref = useRef(null);

  useEffect(() => {
    const wrapper1 = wrapper1Ref.current;
    const wrapper2 = wrapper2Ref.current;

    const handleWrapper1Scroll = () => {
      wrapper2.scrollLeft = wrapper1.scrollLeft;
    };

    const handleWrapper2Scroll = () => {
      wrapper1.scrollLeft = wrapper2.scrollLeft;
    };

    if (wrapper1 && wrapper2) {
      wrapper1.addEventListener("scroll", handleWrapper1Scroll);
      wrapper2.addEventListener("scroll", handleWrapper2Scroll);
    }
    // Cleanup event listeners when component unmounts
    return () => {
      if (wrapper1 && wrapper2) {
        wrapper1.removeEventListener("scroll", handleWrapper1Scroll);
        wrapper2.removeEventListener("scroll", handleWrapper2Scroll);
      }
    };
  }, []);

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

        <Header2 title="SHOW NEW OFFER DISCOUNT" />

        <form>
          <div className="panel-body removeMargins">
            <div className="row">
              <div className="col-md-5 form-group">
                <Link
                  to={
                    Constants.URLConstants.CONTRACTSHOTELSOFFERSANDDISCOUNTSNEW
                  }
                  className="btn btn-outline-secondary btn-sm"
                >
                  <i className="fa fa-plus" />
                  &nbsp;Add New Offer/Discount Details
                </Link>
              </div>
              <div className="col-md-5 form-group">
                {/*Pagination panel*/}
                <nav aria-label="Page navigation example">
                  <ul className="pagination pagination-sm justify-content-center">
                    <li className="page-item">
                      <Link
                        className="page-link"
                        href="#"
                        aria-label="Previous"
                      >
                        <span aria-hidden="true">«FIRST</span>
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link
                        className="page-link"
                        href="#"
                        aria-label="Previous"
                      >
                        <span aria-hidden="true">«PREVIOUS</span>
                      </Link>
                    </li>
                    <li className="page-item active">
                      <Link className="page-link" href="#">
                        1
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link className="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">NEXT»</span>
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link className="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">LAST»</span>
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="col-md-2 form-group">
                <style
                  dangerouslySetInnerHTML={{
                    __html:
                      "\n                            .table tr[visible='false'],\n                            .no-result {\n                                display: none;\n                                border: 1px solid #ddd;\n                                padding: 10px;\n                                margin-top: -2px;\n                            }\n        \n                            .table tr[visible='true'] {\n                                display: table-row;\n                            }\n        \n                            .counter {\n                                padding: 8px;\n                                color: #ccc;\n                            }\n        \n                            .search_new {\n                                float: right;\n                                height: 35px;\n                                margin-bottom: 0px;\n                                padding-left: 5px;\n                            }\n                        ",
                  }}
                />
                <div
                  className="form-group col-md-2 new_search_icon"
                  style={{ textAlign: "right", paddingRight: "0px" }}
                >
                  <h5 style={{ display: "inline" }}>
                    <i
                      className="fa fa-search srchWithinPg"
                      id="magnifiers"
                      data-toggle="tooltip"
                      data-placement="top"
                      data-original-title="Search within this table"
                    />
                  </h5>
                </div>
                <div className="form-group col-md-10 bookingsrc">
                  <input
                    type="text"
                    className="tablesearch form-control form-control-sm search_new"
                    placeholder="Search"
                  />
                </div>
              </div>
              <div className="form-group"></div>
              <div
                id="search_sup_wrapper"
                className="dataTables_wrapper form-inline dt-bootstrap no-footer"
              >
                <div
                  className="doubleScroll-scroll-wrapper"
                  id="wrapper1"
                  ref={wrapper1Ref}
                  style={{
                    height: "20px",
                    overflow: "scroll hidden",
                    width: "1461.4px",
                  }}
                >
                  <div
                    className="suwala-doubleScroll-scroll"
                    style={{ height: "20px", width: "2055px" }}
                  />
                </div>
                <div
                  id="wrapper2"
                  ref={wrapper2Ref}
                  style={{ overflow: "auto" }}
                >
                  <table
                    id="search_sup"
                    className="table table-bordered   table-responsive dataTable no-footer"
                    role="grid"
                    aria-describedby="search_sup_info"
                  >
                    <thead>
                      <tr className="event_bg phps_header" role="row">
                        <th
                          className="sorting_asc"
                          tabIndex={0}
                          aria-controls="search_sup"
                          rowSpan={1}
                          colSpan={1}
                          aria-sort="ascending"
                          aria-label="Offer Type/ Code: activate to sort column descending"
                          style={{ width: "160.2px" }}
                        >
                          Offer Type/ Code
                        </th>
                        <th
                          className="sorting"
                          tabIndex={0}
                          aria-controls="search_sup"
                          rowSpan={1}
                          colSpan={1}
                          aria-label="Value: activate to sort column ascending"
                          style={{ width: "65.2px" }}
                        >
                          Value
                        </th>
                        <th
                          className="sorting"
                          tabIndex={0}
                          aria-controls="search_sup"
                          rowSpan={1}
                          colSpan={1}
                          aria-label="Country: activate to sort column ascending"
                          style={{ width: "61.2px" }}
                        >
                          Country
                        </th>
                        <th
                          className="sorting"
                          tabIndex={0}
                          aria-controls="search_sup"
                          rowSpan={1}
                          colSpan={1}
                          aria-label="City: activate to sort column ascending"
                          style={{ width: "78.2px" }}
                        >
                          City
                        </th>
                        <th
                          className="sorting"
                          tabIndex={0}
                          aria-controls="search_sup"
                          rowSpan={1}
                          colSpan={1}
                          aria-label="Rating: activate to sort column ascending"
                          style={{ width: "44.2px" }}
                        >
                          Rating
                        </th>
                        <th
                          className="sorting"
                          tabIndex={0}
                          aria-controls="search_sup"
                          rowSpan={1}
                          colSpan={1}
                          aria-label="Property: activate to sort column ascending"
                          style={{ width: "110.2px" }}
                        >
                          Property
                        </th>
                        <th
                          className="sorting"
                          tabIndex={0}
                          aria-controls="search_sup"
                          rowSpan={1}
                          colSpan={1}
                          aria-label="Agent: activate to sort column ascending"
                          style={{ width: "140.2px" }}
                        >
                          Agent
                        </th>
                        <th
                          className="sorting"
                          tabIndex={0}
                          aria-controls="search_sup"
                          rowSpan={1}
                          colSpan={1}
                          aria-label="Branch: activate to sort column ascending"
                          style={{ width: "50.2px" }}
                        >
                          Branch
                        </th>
                        <th
                          className="sorting"
                          tabIndex={0}
                          aria-controls="search_sup"
                          rowSpan={1}
                          colSpan={1}
                          aria-label="Room/Meal Basis: activate to sort column ascending"
                          style={{ width: "110.2px" }}
                        >
                          Room/Meal Basis
                        </th>
                        <th
                          className="sorting"
                          tabIndex={0}
                          aria-controls="search_sup"
                          rowSpan={1}
                          colSpan={1}
                          aria-label="Inventory Category: activate to sort column ascending"
                          style={{ width: "135.2px" }}
                        >
                          Inventory Category
                        </th>
                        <th
                          className="sorting"
                          tabIndex={0}
                          aria-controls="search_sup"
                          rowSpan={1}
                          colSpan={1}
                          aria-label="Room Category: activate to sort column ascending"
                          style={{ width: "102.2px" }}
                        >
                          Room Category
                        </th>
                        <th
                          className="sorting"
                          tabIndex={0}
                          aria-controls="search_sup"
                          rowSpan={1}
                          colSpan={1}
                          aria-label="Market Profile: activate to sort column ascending"
                          style={{ width: "102.2px" }}
                        >
                          Market Profile
                        </th>
                        <th
                          className="sorting"
                          tabIndex={0}
                          aria-controls="search_sup"
                          rowSpan={1}
                          colSpan={1}
                          aria-label="Nationality: activate to sort column ascending"
                          style={{ width: "87.2px" }}
                        >
                          Nationality
                        </th>
                        <th
                          className="sorting"
                          tabIndex={0}
                          aria-controls="search_sup"
                          rowSpan={1}
                          colSpan={1}
                          aria-label="Booking From - To: activate to sort column ascending"
                          style={{ width: "118.2px" }}
                        >
                          Booking From - To
                        </th>
                        <th
                          className="sorting"
                          tabIndex={0}
                          aria-controls="search_sup"
                          rowSpan={1}
                          colSpan={1}
                          aria-label="CheckIn From - To : activate to sort column ascending"
                          style={{ width: "116.2px" }}
                        >
                          CheckIn From - To{" "}
                        </th>
                        <th
                          className="sorting"
                          tabIndex={0}
                          aria-controls="search_sup"
                          rowSpan={1}
                          colSpan={1}
                          aria-label="Supplier: activate to sort column ascending"
                          style={{ width: "66.2px" }}
                        >
                          Supplier
                        </th>
                        <th
                          className="sorting"
                          tabIndex={0}
                          aria-controls="search_sup"
                          rowSpan={1}
                          colSpan={1}
                          aria-label="Checkin Before: activate to sort column ascending"
                          style={{ width: "102.2px" }}
                        >
                          Checkin Before
                        </th>
                        <th
                          className="sorting"
                          tabIndex={0}
                          aria-controls="search_sup"
                          rowSpan={1}
                          colSpan={1}
                          aria-label="Offer Only For: activate to sort column ascending"
                          style={{ width: "98.2px" }}
                        >
                          Offer Only For
                        </th>
                        <th
                          className="no-sort sorting"
                          tabIndex={0}
                          aria-controls="search_sup"
                          rowSpan={1}
                          colSpan={1}
                          aria-label="Is Refundable: activate to sort column ascending"
                          style={{ width: "93.2px" }}
                        >
                          Is Refundable
                        </th>
                        <th
                          className="no-sort sorting"
                          tabIndex={0}
                          aria-controls="search_sup"
                          rowSpan={1}
                          colSpan={1}
                          aria-label="Action: activate to sort column ascending"
                          style={{ width: "85px" }}
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      <tr className="event_bg odd" role="row">
                        <td className="sorting_1">
                          Discount(12345)
                          <span className="mand bold font_16">*</span>
                        </td>
                        <td>12.000&nbsp; %</td>
                        <td>India</td>
                        <td>Mumbai</td>
                        <td>
                          <font color="#008000">-</font>
                        </td>
                        <td>Gokul Hotel</td>
                        <td>- </td>
                        <td>- </td>
                        <td>Half Board</td>
                        <td>
                          <div className="allside_padding_10">Executive</div>
                        </td>
                        <td></td>
                        <td>
                          <font color="#008000">-</font>
                        </td>
                        <td>
                          Indian, Albania, Algerian, Andorran, ANGOLA, Antigua
                          &amp;amp; Barbuda, Argentina, Armenian, Aruban,
                          Australian, Austrian, Azerbaijani, Bahamian, Bahraini,
                          Bangladeshi, Barbadian, Belarusian, Belgian, Belizean,
                          Benin, Bermuda, Bhutan, Bolivian, Bosnia and
                          Herzegovina, Batswana, Brazilian, British Virgin
                          Islands, Bruneian, Bulgarian, BURKINA FASO, Burundi,
                          American
                        </td>
                        <td>13 May 2020 - 30 May 2020</td>
                        <td>
                          <font color="#008000">-</font> -{" "}
                          <font color="#008000">-</font>
                        </td>
                        <td>Al Expedia </td>
                        <td>0 days </td>
                        <td>All</td>
                        <td>Yes </td>
                        <td className="actionlink">
                          <div className="actionCont">
                            <div className="input-group-addon">
                              <Link
                                href="applicable_offer.php?action=edit&code=10"
                                className="fa fa-pencil-square-o"
                                data-toggle="tooltip"
                                data-original-title="Edit"
                                data-placement="top"
                              ></Link>
                            </div>
                            <div className="input-group-addon">
                              <Link
                                href="applicable_offer.php?action=deactive&code=10&hotel_id=73158&supplier_id=S000000880"
                                className="fa fa-check-circle"
                                data-toggle="tooltip"
                                data-original-title="Click To Deactivate"
                                data-placement="top"
                              ></Link>
                            </div>
                            <div className="input-group-addon">
                              <Link
                                href="applicable_offer.php?action=delete&code=10&hotel_id=73158&supplier_id=S000000880"
                                className="fa fa-trash"
                                data-toggle="tooltip"
                                data-original-title="|Delete"
                                data-placement="top"
                              ></Link>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr className="event_bg even" role="row">
                        <td className="sorting_1">Discount(test20percent)</td>
                        <td>20.000&nbsp; %</td>
                        <td>United Arab Emirates</td>
                        <td>Dubai</td>
                        <td>
                          <font color="#008000">-</font>
                        </td>
                        <td>
                          <font color="#008000">-</font>
                        </td>
                        <td>- </td>
                        <td>- </td>
                        <td>
                          Half Board, Breakfast, ULTRA All, Superior, Bed &amp;
                          Breakfast, Breakfast and dinner, buffet breakfast,
                          Breakfast Included
                        </td>
                        <td>
                          <div className="allside_padding_10">
                            Classic Suite, Standard ER
                          </div>
                        </td>
                        <td></td>
                        <td>
                          <font color="#008000">-</font>
                        </td>
                        <td>
                          <font color="#008000">-</font>
                        </td>
                        <td>
                          <font color="#008000">-</font> -{" "}
                          <font color="#008000">-</font>
                        </td>
                        <td>17 Aug 2019 - 01 Sep 2019</td>
                        <td>QtechTest </td>
                        <td>0 days </td>
                        <td>All</td>
                        <td>Yes </td>
                        <td className="actionlink">
                          <div className="actionCont">
                            <div className="input-group-addon">
                              <Link
                                href="applicable_offer.php?action=edit&code=6"
                                className="fa fa-pencil-square-o"
                                data-toggle="tooltip"
                                data-original-title="Edit"
                                data-placement="top"
                              ></Link>
                            </div>
                            <div className="input-group-addon">
                              <Link
                                href="applicable_offer.php?action=deactive&code=6&hotel_id=88960&supplier_id=S000000001"
                                className="fa fa-check-circle"
                                data-toggle="tooltip"
                                data-original-title="Click To Deactivate"
                                data-placement="top"
                              ></Link>
                            </div>
                            <div className="input-group-addon">
                              <Link
                                href="applicable_offer.php?action=delete&code=6&hotel_id=88960&supplier_id=S000000001"
                                className="fa fa-trash"
                                data-toggle="tooltip"
                                data-original-title="|Delete"
                                data-placement="top"
                              ></Link>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr className="event_bg odd" role="row">
                        <td className="sorting_1">
                          Early Bird(12345)
                          <span className="mand bold font_16">*</span>
                        </td>
                        <td>9.000&nbsp; %</td>
                        <td>India</td>
                        <td>Mumbai</td>
                        <td>
                          <font color="#008000">-</font>
                        </td>
                        <td>Gokul Hotel</td>
                        <td>- </td>
                        <td>- </td>
                        <td>Half Board</td>
                        <td>
                          <div className="allside_padding_10">Executive</div>
                        </td>
                        <td>Single, Max Pax - 5, Extrabed - 3</td>
                        <td>
                          <font color="#008000">-</font>
                        </td>
                        <td>
                          Indian, Albania, Algerian, Andorran, ANGOLA, Antigua
                          &amp;amp; Barbuda, Argentina, Armenian, Aruban,
                          Australian, Austrian, Azerbaijani, Bahamian, Bahraini,
                          Bangladeshi, Barbadian, Belarusian, Belgian, Belizean,
                          Benin, Bermuda, Bhutan, Bolivian, Bosnia and
                          Herzegovina, Batswana, Brazilian, British Virgin
                          Islands, Bruneian, Bulgarian, BURKINA FASO, Burundi,
                          American
                        </td>
                        <td>13 May 2020 - 30 May 2020</td>
                        <td>
                          <font color="#008000">-</font> -{" "}
                          <font color="#008000">-</font>
                        </td>
                        <td>Al Expedia </td>
                        <td>- </td>
                        <td>All</td>
                        <td>Yes </td>
                        <td className="actionlink">
                          <div className="actionCont">
                            <div className="input-group-addon">
                              <Link
                                href="applicable_offer.php?action=edit&code=9"
                                className="fa fa-pencil-square-o"
                                data-toggle="tooltip"
                                data-original-title="Edit"
                                data-placement="top"
                              ></Link>
                            </div>
                            <div className="input-group-addon">
                              <Link
                                href="applicable_offer.php?action=active&code=9&hotel_id=73158&supplier_id=S000000880"
                                className="fa fa-times-circle"
                                data-toggle="tooltip"
                                data-original-title="Click To Activate"
                                data-placement="top"
                              ></Link>
                            </div>
                            <div className="input-group-addon">
                              <Link
                                href="applicable_offer.php?action=delete&code=9&hotel_id=73158&supplier_id=S000000880"
                                className="fa fa-trash"
                                data-toggle="tooltip"
                                data-original-title="|Delete"
                                data-placement="top"
                              ></Link>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr className="event_bg even" role="row">
                        <td className="sorting_1">
                          Promotion(123)
                          <span className="mand bold font_16">*</span>
                        </td>
                        <td>dfadsfsdf</td>
                        <td>Portugal</td>
                        <td>Algarve</td>
                        <td>
                          <font color="#008000">-</font>
                        </td>
                        <td>Alaaddin Hotel</td>
                        <td>CD0116#minal@123(sub agent) </td>
                        <td>- </td>
                        <td>
                          Half Board, Breakfast, ULTRA All, Superior, Bed &amp;
                          Breakfast, Breakfast and dinner, buffet breakfast,
                          Breakfast Included, BB, Bed Only, Dinner Buffet, Room
                          Only.
                        </td>
                        <td>
                          <div className="allside_padding_10">
                            1 Bedroom suite, twin deluxe room
                          </div>
                        </td>
                        <td></td>
                        <td>
                          <font color="#008000">-</font>
                        </td>
                        <td>
                          Indian, Albania, Algerian, Andorran, ANGOLA, Antigua
                          &amp;amp; Barbuda, Argentina, Armenian, Aruban,
                          Australian, Austrian, Azerbaijani, Bahamian, Bahraini,
                          Bangladeshi, Barbadian, Belarusian, Belgian, Belizean,
                          Benin, Bermuda, Bhutan, Bolivian, Bosnia and
                          Herzegovina, Batswana, Brazilian, British Virgin
                          Islands, Bruneian, Bulgarian, BURKINA FASO, Burundi,
                          American
                        </td>
                        <td>18 Jun 2019 - 31 Jul 2019</td>
                        <td>20 Jun 2019 - 30 Jun 2019</td>
                        <td>allwin-qtech </td>
                        <td>1 days </td>
                        <td>All</td>
                        <td>Yes </td>
                        <td className="actionlink">
                          <div className="actionCont">
                            <div className="input-group-addon">
                              <Link
                                href="applicable_offer.php?action=edit&code=2"
                                className="fa fa-pencil-square-o"
                                data-toggle="tooltip"
                                data-original-title="Edit"
                                data-placement="top"
                              ></Link>
                            </div>
                            <div className="input-group-addon">
                              <Link
                                href="applicable_offer.php?action=deactive&code=2&hotel_id=67301&supplier_id=S000000003"
                                className="fa fa-check-circle"
                                data-toggle="tooltip"
                                data-original-title="Click To Deactivate"
                                data-placement="top"
                              ></Link>
                            </div>
                            <div className="input-group-addon">
                              <Link
                                href="applicable_offer.php?action=delete&code=2&hotel_id=67301&supplier_id=S000000003"
                                className="fa fa-trash"
                                data-toggle="tooltip"
                                data-original-title="|Delete"
                                data-placement="top"
                              ></Link>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr className="event_bg odd" role="row">
                        <td className="sorting_1">Promotion(1233)</td>
                        <td>test</td>
                        <td>India</td>
                        <td>New delhi(Delhi)</td>
                        <td>
                          <font color="#008000">-</font>
                        </td>
                        <td>Monkey Mia Dolphin Resort</td>
                        <td>CD0119#ABC(User2) </td>
                        <td>- </td>
                        <td>
                          Half Board, Breakfast, ULTRA All, Superior, Bed &amp;
                          Breakfast, Breakfast and dinner, buffet breakfast,
                          Breakfast Included, BB
                        </td>
                        <td>
                          <div className="allside_padding_10">
                            Classic, Classic Suite, Deluxe, Executive, Premium,
                            Premiunm, Royal, Standard, Standard ER,
                            StandardTest, Super Deluxe
                          </div>
                        </td>
                        <td></td>
                        <td>
                          <font color="#008000">-</font>
                        </td>
                        <td>
                          Indian, Albania, Algerian, Andorran, ANGOLA, Antigua
                          &amp;amp; Barbuda, Argentina, Armenian, Aruban,
                          Australian, Austrian, Azerbaijani, Bahamian, Bahraini,
                          Bangladeshi, Barbadian, Belarusian, Belgian, Belizean,
                          Benin, Bermuda, Bhutan, Bolivian, Bosnia and
                          Herzegovina, Batswana, Brazilian, British Virgin
                          Islands, Bruneian, Bulgarian, BURKINA FASO, Burundi,
                          American
                        </td>
                        <td>26 Jun 2019 - 31 Jul 2019</td>
                        <td>01 Jul 2019 - 31 Aug 2019</td>
                        <td>QtechTest </td>
                        <td>1 days </td>
                        <td>All</td>
                        <td>Yes </td>
                        <td className="actionlink">
                          <div className="actionCont">
                            <div className="input-group-addon">
                              <Link
                                href="applicable_offer.php?action=edit&code=3"
                                className="fa fa-pencil-square-o"
                                data-toggle="tooltip"
                                data-original-title="Edit"
                                data-placement="top"
                              ></Link>
                            </div>
                            <div className="input-group-addon">
                              <Link
                                href="applicable_offer.php?action=deactive&code=3&hotel_id=46361&supplier_id=S000000001"
                                className="fa fa-check-circle"
                                data-toggle="tooltip"
                                data-original-title="Click To Deactivate"
                                data-placement="top"
                              ></Link>
                            </div>
                            <div className="input-group-addon">
                              <Link
                                href="applicable_offer.php?action=delete&code=3&hotel_id=46361&supplier_id=S000000001"
                                className="fa fa-trash"
                                data-toggle="tooltip"
                                data-original-title="|Delete"
                                data-placement="top"
                              ></Link>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr className="event_bg even" role="row">
                        <td className="sorting_1">
                          Promotion(233)
                          <span className="mand bold font_16">*</span>
                        </td>
                        <td>This offer is available now.</td>
                        <td>United Arab Emirates</td>
                        <td>Dubai</td>
                        <td>
                          <font color="#008000">-</font>
                        </td>
                        <td>World_Avenue_A</td>
                        <td>CD0127#(demo) </td>
                        <td>- </td>
                        <td>Half Board</td>
                        <td>
                          <div className="allside_padding_10">Deluxe</div>
                        </td>
                        <td></td>
                        <td>
                          <font color="#008000">-</font>
                        </td>
                        <td>
                          Afghanistan, Albania, Algerian, Andorran, ANGOLA,
                          Antigua &amp;amp; Barbuda, Argentina, Armenian,
                          Aruban, Australian, Austrian, Azerbaijani, Bahamian,
                          Bahraini, Bangladeshi, Barbadian, Belarusian, Belgian,
                          Belizean, Benin, Bermuda, Bhutan, Bolivian, Bosnia and
                          Herzegovina, Batswana, Brazilian, British Virgin
                          Islands, Bruneian, Bulgarian, BURKINA FASO, Burundi,
                          American
                        </td>
                        <td>01 Sep 2022 - 31 Oct 2022</td>
                        <td>
                          <font color="#008000">-</font> -{" "}
                          <font color="#008000">-</font>
                        </td>
                        <td>World Avenue </td>
                        <td>- </td>
                        <td>All</td>
                        <td>Yes </td>
                        <td className="actionlink">
                          <div className="actionCont">
                            <div className="input-group-addon">
                              <Link
                                href="applicable_offer.php?action=edit&code=11"
                                className="fa fa-pencil-square-o"
                                data-toggle="tooltip"
                                data-original-title="Edit"
                                data-placement="top"
                              ></Link>
                            </div>
                            <div className="input-group-addon">
                              <Link
                                href="applicable_offer.php?action=deactive&code=11&hotel_id=73198&supplier_id=S000000888"
                                className="fa fa-check-circle"
                                data-toggle="tooltip"
                                data-original-title="Click To Deactivate"
                                data-placement="top"
                              ></Link>
                            </div>
                            <div className="input-group-addon">
                              <Link
                                href="applicable_offer.php?action=delete&code=11&hotel_id=73198&supplier_id=S000000888"
                                className="fa fa-trash"
                                data-toggle="tooltip"
                                data-original-title="|Delete"
                                data-placement="top"
                              ></Link>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default ContractsOffersAndDiscountsSearchButton;
