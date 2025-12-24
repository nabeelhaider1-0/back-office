import Flatpickr from "react-flatpickr";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header2 from "../../header2/header2";
import MultiSelect from "../../reactMultiSelect";
import {
  addrule_currencyOptions,
  hotel_rating_options,
  infantAgeUpperOptions,
  meal_options,
  offlineHotelSuppliersOptions,
  releaseSelHrsOptions,
  releaseSelMinsOptions,
  searchbooking_channnel_manager_options,
  selTimezoneOptions,
  supplierProfileOptions,
} from "../../../constants/contants";
import {
  citiesByCountry,
  countries,
} from "../../../constants/Country-City-Data";
import Constants from "../../../constants/routes";

const ContractsHotelsRatesSearchButton = () => {
  const [startDate, setStartDate] = useState(null); // State for the start date
  const [endDate, setEndDate] = useState(null); // State for the end date

  const handleTrashClick = () => {
    // Function to clear both start and end dates
    setStartDate(null);
    setEndDate(null);
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
      <Header2 title="SEARCH LOCAL HOTEL" linkText1="List Hotels" />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <form>
          <div className="row">
            <div className="col-md-3 form-group">
              <label>Hotel Name</label>
              <input
                type="text"
                className="form-control form-control-sm test123"
                name="Search_hotel_name"
                defaultValue
              />
            </div>
            <div className="col-md-3 form-group">
              <label>Supplier</label>
              <MultiSelect
                options={offlineHotelSuppliersOptions}
                isSearchable
                placeholder="- Select Supplier -"
                className="custom-select"
                noOptionsMessage={() => "No Flight Supplier Found"}
              />
            </div>
            <div className="col-md-3 form-group">
              <label>Hotel Rating</label>
              <MultiSelect
                options={hotel_rating_options}
                isSearchable
                placeholder="- Select Hotel Rating -"
                className="custom-select"
                noOptionsMessage={() => "No Hotel Rating Found"}
              />
            </div>
            <div className="col-md-3 form-group">
              <label>Contract Date</label>
              <div
                className="input-group date input-daterange"
                id="contract_date"
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
                  id="tTrashBtn"
                  onClick={handleTrashClick}
                >
                  <i className="fa fa-trash" />
                </span>
              </div>
            </div>
            <div className="col-md-3 form-group mt-3">
              <label>Room Rates</label>
              <br />
              <div className="radioline1 mt-1">
                <div className="radio radio-success radio-inline">
                  <input
                    type="radio"
                    name="rrAdd"
                    id="rrAddAll"
                    defaultValue="all"
                    defaultChecked="checked"
                  />
                  <label htmlFor="rrAddAll">All</label>
                </div>
                <div className="radio radio-success radio-inline">
                  <input
                    type="radio"
                    name="rrAdd"
                    defaultValue="yes"
                    id="app"
                  />
                  <label htmlFor="rrAddYes">Yes</label>
                </div>
                <div className="radio radio-success radio-inline">
                  <input type="radio" name="rrAdd" defaultValue="no" id="app" />
                  <label htmlFor="rrAddNo">No</label>
                </div>
              </div>
            </div>
            <div className="col-md-3 form-group mt-3">
              <label>Allotment</label>
              <br />
              <div className="radioline1 mt-1">
                <div className="radio radio-success radio-inline">
                  <input
                    type="radio"
                    name="rrAllotmentAdd"
                    id="rrAllotmentAdd"
                    defaultValue="all"
                    defaultChecked="checked"
                  />
                  <label htmlFor="rrAllotmentAdd">All</label>
                </div>
                <div className="radio radio-success radio-inline">
                  <input
                    type="radio"
                    name="rrAllotmentAdd"
                    defaultValue="yes"
                    id="app"
                  />
                  <label htmlFor="rrAllotmentYes">Yes</label>
                </div>
                <div className="radio radio-success radio-inline">
                  <input
                    type="radio"
                    name="rrAllotmentAdd"
                    defaultValue="no"
                    id="app"
                  />
                  <label htmlFor="rrAllotmentNo">No</label>
                </div>
              </div>
            </div>
            <div className="col-md-3 form-group mt-3">
              <label>Package</label>
              <br />
              <div className="radioline1 mt-1">
                <div className="radio radio-success radio-inline">
                  <input
                    type="radio"
                    name="is_package"
                    defaultValue="all"
                    defaultChecked="checked"
                    id="no1"
                  />
                  <label htmlFor="no1">All</label>
                </div>
                <div className="radio radio-success radio-inline">
                  <input
                    type="radio"
                    name="is_package"
                    defaultValue="yes"
                    id="app"
                  />
                  <label htmlFor="yes1">Yes</label>
                </div>
                <div className="radio radio-success radio-inline">
                  <input
                    type="radio"
                    name="is_package"
                    defaultValue="no"
                    id="app"
                  />
                  <label htmlFor="no1">No</label>
                </div>
              </div>
            </div>
            <div className="col-md-3 form-group mt-3">
              <label>Country</label>
              <MultiSelect
                options={countries}
                isSearchable
                placeholder="- Select Country -"
                className="custom-select"
                noOptionsMessage={() => "No Country Found"}
                onChange={handleCountryChange}
              />
            </div>
            <div className="col-md-3 form-group mt-3">
              <label>City</label>
              <MultiSelect
                options={citiesByCountry[branchData.branchCountry] || []}
                isSearchable
                placeholder="- Select City -"
                className="custom-select"
                onChange={handleCityChange}
                noOptionsMessage={() => "No City Found"}
              />
            </div>
            <div className="col-md-3 form-group mt-3">
              <label>Currency</label>
              <MultiSelect
                options={addrule_currencyOptions}
                isSearchable
                placeholder="- Select Currency -"
                className="custom-select"
                noOptionsMessage={() => "No Currency Found"}
              />
            </div>
            <div className="col-md-3 form-group mt-3">
              <label>Room Meal Basis</label>
              <MultiSelect
                options={meal_options}
                isSearchable
                placeholder="- Select Room Meal -"
                className="custom-select"
                noOptionsMessage={() => "No Room Meal Found"}
              />
            </div>
            <div className="col-md-3 form-group mt-3">
              <label>Rate Profile</label>
              <MultiSelect
                options={supplierProfileOptions}
                isSearchable
                placeholder="- Select Rate -"
                className="custom-select"
                noOptionsMessage={() => "No Rate Found"}
              />
            </div>
          </div>
          {/* 2nd Row */}
          <div className="row mt-4">
            <div className="col-md-12 form-group">
              <Link
                to={Constants.URLConstants.CONTRACTSHOTELSRATESSEARCHBUTTON}
              >
                <button
                  className="btn btn-dark btn-sm"
                  type="button"
                  onclick="javascriptcallSearch(document.forms['search_hotel_from']);"
                >
                  <i className="fa fa-search" />
                  &nbsp;Search
                </button>
              </Link>
              <button
                className="btn btn-outline-secondary btn-sm mx-1"
                type="button"
                onclick="downloadReport();"
              >
                <i className="fa fa-download" />
                &nbsp; Hotel Rate Report
              </button>
            </div>
          </div>
        </form>
        <br />
        <form>
          <div className="panel-body removeMargins">
            <div className="dataTables_scroll">
              <div className="row pd_tp">
                <div className="row">
                  <div className="col-md-4 col_hide">
                    <div className="form-group col-md-12">&nbsp;</div>
                  </div>
                  <div className="col-md-5 col_hide">
                    <div className="form-group custPaging pgType2" />
                  </div>
                  <div className="col-md-3">
                    <style
                      dangerouslySetInnerHTML={{
                        __html:
                          "\n                                    .table tr[visible='false'],\n                                    .no-result {\n                                        display: none;\n                                        border: 1px solid #ddd;\n                                        padding: 10px;\n                                        margin-top: -2px;\n                                    }\n\n                                    .table tr[visible='true'] {\n                                        display: table-row;\n                                    }\n\n                                    .counter {\n                                        padding: 8px;\n                                        color: #ccc;\n                                    }\n\n                                    .search_new {\n                                        float: right;\n                                        height: 35px;\n                                        margin-bottom: 0px;\n                                        padding-left: 5px;\n                                    }\n                                ",
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
                </div>
              </div>
              <div
                id="search_local_hotels_wrapper"
                className="dataTables_wrapper form-inline dt-bootstrap no-footer"
              >
                <div className="row">
                  <div className="col-sm-6" />
                  <div className="col-sm-6" />
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <div
                      className="doubleScroll-scroll-wrapper"
                      id="wrapper1"
                      style={{
                        height: "20px",
                        overflow: "scroll hidden",
                        width: "1461.4px",
                      }}
                    >
                      <div
                        className="suwala-doubleScroll-scroll"
                        style={{ height: "20px", width: "1461px" }}
                      />
                    </div>
                    <div id="wrapper2" style={{ overflow: "auto" }}>
                      <table
                        id="search_local_hotels"
                        className="table table-bordered   table-responsive dataTable no-footer"
                        role="grid"
                        aria-describedby="search_local_hotels_info"
                      >
                        <thead>
                          <tr role="row">
                            <th
                              className="sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              style={{ width: "76.2px" }}
                            >
                              <Link id="select_hotels" to="javascriptvoid(1)">
                                &nbsp;
                              </Link>
                            </th>
                            <th
                              className="sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              style={{ width: "382.2px" }}
                            >
                              Hotel Name
                            </th>
                            <th
                              className="sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              style={{ width: "141.2px" }}
                            >
                              Hotel Rating
                            </th>
                            <th
                              className="sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              style={{ width: "246.2px" }}
                            >
                              Country
                            </th>
                            <th
                              className="sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              style={{ width: "129.2px" }}
                            >
                              City
                            </th>
                            <th
                              className="sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              style={{ width: "244.2px" }}
                            >
                              Supplier
                            </th>
                            <th
                              className="no-sort sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              style={{ width: "155px" }}
                            >
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          <tr className="phps_row_1 odd" role="row">
                            <td>
                              <div className="checkbox checkbox-success">
                                <input
                                  type="checkbox"
                                  name="chk[]"
                                  defaultValue={38216}
                                  aria-label="Single checkbox One"
                                />
                                <label />
                              </div>
                            </td>
                            <td style={{ textAlign: "left" }}>
                              &nbsp;1234 Testing
                            </td>
                            <td align="center">&nbsp; 2.0 Star(s)</td>
                            <td align="center">&nbsp;Singapore</td>
                            <td align="center">&nbsp;Singapore</td>
                            <td align="center">&nbsp;allwin-qtech</td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Add Extranet Rates"
                                >
                                  <Link
                                    to={
                                      Constants.URLConstants.HOTELINVENTORYAPP
                                    }
                                  >
                                    <i className="fa fa-hotel" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title=" Map Hotel Room Category"
                                >
                                  <Link
                                    onclick='Javacsript:view_room_class("38216","S000000003")'
                                    data-bs-toggle="modal"
                                    data-bs-target="#myModal1"
                                  >
                                    <i className="fa fa-map-marker" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Settings"
                                >
                                  <Link
                                    onclick='Javacsript:childSettings("38216","S000000003")'
                                    data-bs-toggle="modal"
                                    data-bs-target="#childSettings"
                                  >
                                    <i className="fa fa-user" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Update Content"
                                >
                                  <Link
                                    id="UpdateUploadExcel"
                                    onclick='Javacsript:DownloadExcel("38216","S000000003")'
                                    data-bs-toggle="modal"
                                    data-bs-target="#UpdateUploadExcelContainer"
                                  >
                                    <i className="fa fa-upload" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Hotel Logs"
                                >
                                  <Link
                                    target="_blank"
                                    to={
                                      Constants.URLConstants
                                        .CONTRACTSHOTELSRATESUSERLOGS
                                    }
                                  >
                                    <i className="fa fa-history" />
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_0 even" role="row">
                            <td>
                              <div className="checkbox checkbox-success">
                                <input
                                  type="checkbox"
                                  name="chk[]"
                                  defaultValue={38216}
                                  aria-label="Single checkbox One"
                                />
                                <label />
                              </div>
                            </td>
                            <td style={{ textAlign: "left" }}>
                              &nbsp;1234 Testing
                            </td>
                            <td align="center">&nbsp; 2.0 Star(s)</td>
                            <td align="center">&nbsp;Singapore</td>
                            <td align="center">&nbsp;Singapore</td>
                            <td align="center">&nbsp;QtechTest</td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Add Extranet Rates"
                                >
                                  <Link to="hotelInventoryapp.html">
                                    <i className="fa fa-hotel" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title=" Map Hotel Room Category"
                                >
                                  <Link
                                    onclick='Javacsript:view_room_class("38216","S000000001")'
                                    data-bs-toggle="modal"
                                    data-bs-target="#myModal1"
                                  >
                                    <i className="fa fa-map-marker" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Settings"
                                >
                                  <Link
                                    onclick='Javacsript:childSettings("38216","S000000001")'
                                    data-bs-toggle="modal"
                                    data-bs-target="#childSettings"
                                  >
                                    <i className="fa fa-user" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Update Content"
                                >
                                  <Link
                                    id="UpdateUploadExcel"
                                    onclick='Javacsript:DownloadExcel("38216","S000000001")'
                                    data-bs-toggle="modal"
                                    data-bs-target="#UpdateUploadExcelContainer"
                                  >
                                    <i className="fa fa-upload" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Hotel Logs"
                                >
                                  <Link
                                    target="_blank"
                                    to={
                                      Constants.URLConstants
                                        .CONTRACTSHOTELSRATESUSERLOGS
                                    }
                                  >
                                    <i className="fa fa-history" />
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_1 odd" role="row">
                            <td>
                              <div className="checkbox checkbox-success">
                                <input
                                  type="checkbox"
                                  name="chk[]"
                                  defaultValue={38278}
                                  aria-label="Single checkbox One"
                                />
                                <label />
                              </div>
                            </td>
                            <td style={{ textAlign: "left" }}>
                              &nbsp;5footway.Inn Project Bugis
                            </td>
                            <td align="center">&nbsp; 2.0 Star(s)</td>
                            <td align="center">&nbsp;Singapore</td>
                            <td align="center">&nbsp;Singapore</td>
                            <td align="center">&nbsp;QtechTest</td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Add Extranet Rates"
                                >
                                  <Link to="hotelInventoryapp.html">
                                    <i className="fa fa-hotel" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title=" Map Hotel Room Category"
                                >
                                  <Link
                                    onclick='Javacsript:view_room_class("38278","S000000001")'
                                    data-bs-toggle="modal"
                                    data-bs-target="#myModal1"
                                  >
                                    <i className="fa fa-map-marker" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Settings"
                                >
                                  <Link
                                    onclick='Javacsript:childSettings("38278","S000000001")'
                                    data-bs-toggle="modal"
                                    data-bs-target="#childSettings"
                                  >
                                    <i className="fa fa-user" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Update Content"
                                >
                                  <Link
                                    id="UpdateUploadExcel"
                                    onclick='Javacsript:DownloadExcel("38278","S000000001")'
                                    data-bs-toggle="modal"
                                    data-bs-target="#UpdateUploadExcelContainer"
                                  >
                                    <i className="fa fa-upload" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Hotel Logs"
                                >
                                  <Link
                                    target="_blank"
                                    to={
                                      Constants.URLConstants
                                        .CONTRACTSHOTELSRATESUSERLOGS
                                    }
                                  >
                                    <i className="fa fa-history" />
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_0 even" role="row">
                            <td>
                              <div className="checkbox checkbox-success">
                                <input
                                  type="checkbox"
                                  name="chk[]"
                                  defaultValue={38278}
                                  aria-label="Single checkbox One"
                                />
                                <label />
                              </div>
                            </td>
                            <td style={{ textAlign: "left" }}>
                              &nbsp;5footway.Inn Project Bugis
                            </td>
                            <td align="center">&nbsp; 2.0 Star(s)</td>
                            <td align="center">&nbsp;Singapore</td>
                            <td align="center">&nbsp;Singapore</td>
                            <td align="center">&nbsp;allwin-qtech</td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Add Extranet Rates"
                                >
                                  <Link to="hotelInventoryapp.html">
                                    <i className="fa fa-hotel" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title=" Map Hotel Room Category"
                                >
                                  <Link
                                    onclick='Javacsript:view_room_class("38278","S000000003")'
                                    data-bs-toggle="modal"
                                    data-bs-target="#myModal1"
                                  >
                                    <i className="fa fa-map-marker" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Settings"
                                >
                                  <Link
                                    onclick='Javacsript:childSettings("38278","S000000003")'
                                    data-bs-toggle="modal"
                                    data-bs-target="#childSettings"
                                  >
                                    <i className="fa fa-user" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Update Content"
                                >
                                  <Link
                                    id="UpdateUploadExcel"
                                    onclick='Javacsript:DownloadExcel("38278","S000000003")'
                                    data-bs-toggle="modal"
                                    data-bs-target="#UpdateUploadExcelContainer"
                                  >
                                    <i className="fa fa-upload" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Hotel Logs"
                                >
                                  <Link
                                    target="_blank"
                                    to={
                                      Constants.URLConstants
                                        .CONTRACTSHOTELSRATESUSERLOGS
                                    }
                                  >
                                    <i className="fa fa-history" />
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_1 odd" role="row">
                            <td>
                              <div className="checkbox checkbox-success">
                                <input
                                  type="checkbox"
                                  name="chk[]"
                                  defaultValue={38274}
                                  aria-label="Single checkbox One"
                                />
                                <label />
                              </div>
                            </td>
                            <td style={{ textAlign: "left" }}>
                              &nbsp;5footway.inn Project Chinatown 1
                            </td>
                            <td align="center">&nbsp; 2.0 Star(s)</td>
                            <td align="center">&nbsp;Singapore</td>
                            <td align="center">&nbsp;Singapore</td>
                            <td align="center">&nbsp;allwin-qtech</td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Add Extranet Rates"
                                >
                                  <Link onclick="extranet('38274','S000000003');">
                                    <i className="fa fa-hotel" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title=" Map Hotel Room Category"
                                >
                                  <Link
                                    onclick='Javacsript:view_room_class("38274","S000000003")'
                                    data-bs-toggle="modal"
                                    data-bs-target="#myModal1"
                                  >
                                    <i className="fa fa-map-marker" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Settings"
                                >
                                  <Link
                                    onclick='Javacsript:childSettings("38274","S000000003")'
                                    data-bs-toggle="modal"
                                    data-bs-target="#childSettings"
                                  >
                                    <i className="fa fa-user" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Update Content"
                                >
                                  <Link
                                    id="UpdateUploadExcel"
                                    onclick='Javacsript:DownloadExcel("38274","S000000003")'
                                    data-bs-toggle="modal"
                                    data-bs-target="#UpdateUploadExcelContainer"
                                  >
                                    <i className="fa fa-upload" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Hotel Logs"
                                >
                                  <Link
                                    target="_blank"
                                    to={
                                      Constants.URLConstants
                                        .CONTRACTSHOTELSRATESUSERLOGS
                                    }
                                  >
                                    <i className="fa fa-history" />
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_0 even" role="row">
                            <td>
                              <div className="checkbox checkbox-success">
                                <input
                                  type="checkbox"
                                  name="chk[]"
                                  defaultValue={38274}
                                  aria-label="Single checkbox One"
                                />
                                <label />
                              </div>
                            </td>
                            <td style={{ textAlign: "left" }}>
                              &nbsp;5footway.inn Project Chinatown 1
                            </td>
                            <td align="center">&nbsp; 2.0 Star(s)</td>
                            <td align="center">&nbsp;Singapore</td>
                            <td align="center">&nbsp;Singapore</td>
                            <td align="center">&nbsp;QtechTest</td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Add Extranet Rates"
                                >
                                  <Link to="hotelInventoryapp.html">
                                    <i className="fa fa-hotel" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title=" Map Hotel Room Category"
                                >
                                  <Link
                                    onclick='Javacsript:view_room_class("38274","S000000001")'
                                    data-bs-toggle="modal"
                                    data-bs-target="#myModal1"
                                  >
                                    <i className="fa fa-map-marker" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Settings"
                                >
                                  <Link
                                    onclick='Javacsript:childSettings("38274","S000000001")'
                                    data-bs-toggle="modal"
                                    data-bs-target="#childSettings"
                                  >
                                    <i className="fa fa-user" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Update Content"
                                >
                                  <Link
                                    id="UpdateUploadExcel"
                                    onclick='Javacsript:DownloadExcel("38274","S000000001")'
                                    data-bs-toggle="modal"
                                    data-bs-target="#UpdateUploadExcelContainer"
                                  >
                                    <i className="fa fa-upload" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Hotel Logs"
                                >
                                  <Link
                                    target="_blank"
                                    to={
                                      Constants.URLConstants
                                        .CONTRACTSHOTELSRATESUSERLOGS
                                    }
                                  >
                                    <i className="fa fa-history" />
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_1 odd" role="row">
                            <td>
                              <div className="checkbox checkbox-success">
                                <input
                                  type="checkbox"
                                  name="chk[]"
                                  defaultValue={38276}
                                  aria-label="Single checkbox One"
                                />
                                <label />
                              </div>
                            </td>
                            <td style={{ textAlign: "left" }}>
                              &nbsp;5footway.Inn Project Chinatown 2
                            </td>
                            <td align="center">&nbsp; 2.0 Star(s)</td>
                            <td align="center">&nbsp;Singapore</td>
                            <td align="center">&nbsp;Singapore</td>
                            <td align="center">&nbsp;allwin-qtech</td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Add Extranet Rates"
                                >
                                  <Link to="hotelInventoryapp.html">
                                    <i className="fa fa-hotel" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title=" Map Hotel Room Category"
                                >
                                  <Link
                                    onclick='Javacsript:view_room_class("38276","S000000003")'
                                    data-bs-toggle="modal"
                                    data-bs-target="#myModal1"
                                  >
                                    <i className="fa fa-map-marker" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Settings"
                                >
                                  <Link
                                    onclick='Javacsript:childSettings("38276","S000000003")'
                                    data-bs-toggle="modal"
                                    data-bs-target="#childSettings"
                                  >
                                    <i className="fa fa-user" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Update Content"
                                >
                                  <Link
                                    id="UpdateUploadExcel"
                                    onclick='Javacsript:DownloadExcel("38276","S000000003")'
                                    data-bs-toggle="modal"
                                    data-bs-target="#UpdateUploadExcelContainer"
                                  >
                                    <i className="fa fa-upload" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Hotel Logs"
                                >
                                  <Link
                                    target="_blank"
                                    to={
                                      Constants.URLConstants
                                        .CONTRACTSHOTELSRATESUSERLOGS
                                    }
                                  >
                                    <i className="fa fa-history" />
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_0 even" role="row">
                            <td>
                              <div className="checkbox checkbox-success">
                                <input
                                  type="checkbox"
                                  name="chk[]"
                                  defaultValue={38276}
                                  aria-label="Single checkbox One"
                                />
                                <label />
                              </div>
                            </td>
                            <td style={{ textAlign: "left" }}>
                              &nbsp;5footway.Inn Project Chinatown 2
                            </td>
                            <td align="center">&nbsp; 2.0 Star(s)</td>
                            <td align="center">&nbsp;Singapore</td>
                            <td align="center">&nbsp;Singapore</td>
                            <td align="center">&nbsp;QtechTest</td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Add Extranet Rates"
                                >
                                  <Link to="hotelInventoryapp.html">
                                    <i className="fa fa-hotel" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title=" Map Hotel Room Category"
                                >
                                  <Link
                                    onclick='Javacsript:view_room_class("38276","S000000001")'
                                    data-bs-toggle="modal"
                                    data-bs-target="#myModal1"
                                  >
                                    <i className="fa fa-map-marker" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Settings"
                                >
                                  <Link
                                    onclick='Javacsript:childSettings("38276","S000000001")'
                                    data-bs-toggle="modal"
                                    data-bs-target="#childSettings"
                                  >
                                    <i className="fa fa-user" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Update Content"
                                >
                                  <Link
                                    id="UpdateUploadExcel"
                                    onclick='Javacsript:DownloadExcel("38276","S000000001")'
                                    data-bs-toggle="modal"
                                    data-bs-target="#UpdateUploadExcelContainer"
                                  >
                                    <i className="fa fa-upload" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Hotel Logs"
                                >
                                  <Link
                                    target="_blank"
                                    to={
                                      Constants.URLConstants
                                        .CONTRACTSHOTELSRATESUSERLOGS
                                    }
                                  >
                                    <i className="fa fa-history" />
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_1 odd" role="row">
                            <td>
                              <div className="checkbox checkbox-success">
                                <input
                                  type="checkbox"
                                  name="chk[]"
                                  defaultValue={38407}
                                  aria-label="Single checkbox One"
                                />
                                <label />
                              </div>
                            </td>
                            <td style={{ textAlign: "left" }}>
                              &nbsp;5footwayinn Project Boat Quay
                            </td>
                            <td align="center">&nbsp; 2.0 Star(s)</td>
                            <td align="center">&nbsp;Singapore</td>
                            <td align="center">&nbsp;Singapore</td>
                            <td align="center">&nbsp;allwin-qtech</td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Add Extranet Rates"
                                >
                                  <Link to="hotelInventoryapp.html">
                                    <i className="fa fa-hotel" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title=" Map Hotel Room Category"
                                >
                                  <Link
                                    onclick='Javacsript:view_room_class("38407","S000000003")'
                                    data-bs-toggle="modal"
                                    data-bs-target="#myModal1"
                                  >
                                    <i className="fa fa-map-marker" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Settings"
                                >
                                  <Link
                                    onclick='Javacsript:childSettings("38407","S000000003")'
                                    data-bs-toggle="modal"
                                    data-bs-target="#childSettings"
                                  >
                                    <i className="fa fa-user" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Update Content"
                                >
                                  <Link
                                    id="UpdateUploadExcel"
                                    onclick='Javacsript:DownloadExcel("38407","S000000003")'
                                    data-bs-toggle="modal"
                                    data-bs-target="#UpdateUploadExcelContainer"
                                  >
                                    <i className="fa fa-upload" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Hotel Logs"
                                >
                                  <Link
                                    target="_blank"
                                    to={
                                      Constants.URLConstants
                                        .CONTRACTSHOTELSRATESUSERLOGS
                                    }
                                  >
                                    <i className="fa fa-history" />
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_0 even" role="row">
                            <td>
                              <div className="checkbox checkbox-success">
                                <input
                                  type="checkbox"
                                  name="chk[]"
                                  defaultValue={38407}
                                  aria-label="Single checkbox One"
                                />
                                <label />
                              </div>
                            </td>
                            <td style={{ textAlign: "left" }}>
                              &nbsp;5footwayinn Project Boat Quay
                            </td>
                            <td align="center">&nbsp; 2.0 Star(s)</td>
                            <td align="center">&nbsp;Singapore</td>
                            <td align="center">&nbsp;Singapore</td>
                            <td align="center">&nbsp;QtechTest</td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Add Extranet Rates"
                                >
                                  <Link to="hotelInventoryapp.html">
                                    <i className="fa fa-hotel" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title=" Map Hotel Room Category"
                                >
                                  <Link
                                    onclick='Javacsript:view_room_class("38407","S000000001")'
                                    data-bs-toggle="modal"
                                    data-bs-target="#myModal1"
                                  >
                                    <i className="fa fa-map-marker" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Settings"
                                >
                                  <Link
                                    onclick='Javacsript:childSettings("38407","S000000001")'
                                    data-bs-toggle="modal"
                                    data-bs-target="#childSettings"
                                  >
                                    <i className="fa fa-user" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Update Content"
                                >
                                  <Link
                                    id="UpdateUploadExcel"
                                    onclick='Javacsript:DownloadExcel("38407","S000000001")'
                                    data-bs-toggle="modal"
                                    data-bs-target="#UpdateUploadExcelContainer"
                                  >
                                    <i className="fa fa-upload" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Hotel Logs"
                                >
                                  <Link
                                    target="_blank"
                                    to={
                                      Constants.URLConstants
                                        .CONTRACTSHOTELSRATESUSERLOGS
                                    }
                                  >
                                    <i className="fa fa-history" />
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_1 odd" role="row">
                            <td>
                              <div className="checkbox checkbox-success">
                                <input
                                  type="checkbox"
                                  name="chk[]"
                                  defaultValue={62029}
                                  aria-label="Single checkbox One"
                                />
                                <label />
                              </div>
                            </td>
                            <td style={{ textAlign: "left" }}>
                              &nbsp;7 Flag International tests name
                            </td>
                            <td align="center">&nbsp; 2.0 Star(s)</td>
                            <td align="center">&nbsp;India</td>
                            <td align="center">&nbsp;Mumbai</td>
                            <td align="center">&nbsp;offline.supplier.mum</td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Add Extranet Rates"
                                >
                                  <Link to="hotelInventoryapp.html">
                                    <i className="fa fa-hotel" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title=" Map Hotel Room Category"
                                >
                                  <Link
                                    onclick='Javacsript:view_room_class("62029","S000000887")'
                                    data-bs-toggle="modal"
                                    data-bs-target="#myModal1"
                                  >
                                    <i className="fa fa-map-marker" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Settings"
                                >
                                  <Link
                                    onclick='Javacsript:childSettings("62029","S000000887")'
                                    data-bs-toggle="modal"
                                    data-bs-target="#childSettings"
                                  >
                                    <i className="fa fa-user" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Update Content"
                                >
                                  <Link
                                    id="UpdateUploadExcel"
                                    onclick='Javacsript:DownloadExcel("62029","S000000887")'
                                    data-bs-toggle="modal"
                                    data-bs-target="#UpdateUploadExcelContainer"
                                  >
                                    <i className="fa fa-upload" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Hotel Logs"
                                >
                                  <Link
                                    target="_blank"
                                    to={
                                      Constants.URLConstants
                                        .CONTRACTSHOTELSRATESUSERLOGS
                                    }
                                  >
                                    <i className="fa fa-history" />
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_0 even" role="row">
                            <td>
                              <div className="checkbox checkbox-success">
                                <input
                                  type="checkbox"
                                  name="chk[]"
                                  defaultValue={46586}
                                  aria-label="Single checkbox One"
                                />
                                <label />
                              </div>
                            </td>
                            <td style={{ textAlign: "left" }}>
                              &nbsp;ABC Arabian Suites
                            </td>
                            <td align="center">&nbsp; 4.0 Star(s)</td>
                            <td align="center">&nbsp;United Arab Emirates</td>
                            <td align="center">&nbsp;Dubai</td>
                            <td align="center">&nbsp;Nirvana Tour</td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Add Extranet Rates"
                                >
                                  <Link to="hotelInventoryapp.html">
                                    <i className="fa fa-hotel" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title=" Map Hotel Room Category"
                                >
                                  <Link
                                    onclick='Javacsript:view_room_class("46586","S000000002")'
                                    data-bs-toggle="modal"
                                    data-bs-target="#myModal1"
                                  >
                                    <i className="fa fa-map-marker" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Settings"
                                >
                                  <Link
                                    onclick='Javacsript:childSettings("46586","S000000002")'
                                    data-bs-toggle="modal"
                                    data-bs-target="#childSettings"
                                  >
                                    <i className="fa fa-user" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Update Content"
                                >
                                  <Link
                                    id="UpdateUploadExcel"
                                    onclick='Javacsript:DownloadExcel("46586","S000000002")'
                                    data-bs-toggle="modal"
                                    data-bs-target="#UpdateUploadExcelContainer"
                                  >
                                    <i className="fa fa-upload" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Hotel Logs"
                                >
                                  <Link
                                    target="_blank"
                                    to={
                                      Constants.URLConstants
                                        .CONTRACTSHOTELSRATESUSERLOGS
                                    }
                                  >
                                    <i className="fa fa-history" />
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_1 odd" role="row">
                            <td>
                              <div className="checkbox checkbox-success">
                                <input
                                  type="checkbox"
                                  name="chk[]"
                                  defaultValue={46586}
                                  aria-label="Single checkbox One"
                                />
                                <label />
                              </div>
                            </td>
                            <td style={{ textAlign: "left" }}>
                              &nbsp;ABC Arabian Suites
                            </td>
                            <td align="center">&nbsp; 4.0 Star(s)</td>
                            <td align="center">&nbsp;United Arab Emirates</td>
                            <td align="center">&nbsp;Dubai</td>
                            <td align="center">&nbsp;World Avenue</td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Add Extranet Rates"
                                >
                                  <Link to="hotelInventoryapp.html">
                                    <i className="fa fa-hotel" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title=" Map Hotel Room Category"
                                >
                                  <Link
                                    onclick='Javacsript:view_room_class("46586","S000000888")'
                                    data-bs-toggle="modal"
                                    data-bs-target="#myModal1"
                                  >
                                    <i className="fa fa-map-marker" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Settings"
                                >
                                  <Link
                                    onclick='Javacsript:childSettings("46586","S000000888")'
                                    data-bs-toggle="modal"
                                    data-bs-target="#childSettings"
                                  >
                                    <i className="fa fa-user" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Update Content"
                                >
                                  <Link
                                    id="UpdateUploadExcel"
                                    onclick='Javacsript:DownloadExcel("46586","S000000888")'
                                    data-bs-toggle="modal"
                                    data-bs-target="#UpdateUploadExcelContainer"
                                  >
                                    <i className="fa fa-upload" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Hotel Logs"
                                >
                                  <Link target="_blank" to="userlogs.html">
                                    <i className="fa fa-history" />
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_0 even" role="row">
                            <td>
                              <div className="checkbox checkbox-success">
                                <input
                                  type="checkbox"
                                  name="chk[]"
                                  defaultValue={38270}
                                  aria-label="Single checkbox One"
                                />
                                <label />
                              </div>
                            </td>
                            <td style={{ textAlign: "left" }}>
                              &nbsp;ABC Premium Hostel
                            </td>
                            <td align="center">&nbsp; 1.0 Star(s)</td>
                            <td align="center">&nbsp;Singapore</td>
                            <td align="center">&nbsp;Singapore</td>
                            <td align="center">&nbsp;QtechTest</td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Add Extranet Rates"
                                >
                                  <Link to="hotelInventoryapp.html">
                                    <i className="fa fa-hotel" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title=" Map Hotel Room Category"
                                >
                                  <Link
                                    onclick='Javacsript:view_room_class("38270","S000000001")'
                                    data-bs-toggle="modal"
                                    data-bs-target="#myModal1"
                                  >
                                    <i className="fa fa-map-marker" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Settings"
                                >
                                  <Link
                                    onclick='Javacsript:childSettings("38270","S000000001")'
                                    data-bs-toggle="modal"
                                    data-bs-target="#childSettings"
                                  >
                                    <i className="fa fa-user" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Update Content"
                                >
                                  <Link
                                    id="UpdateUploadExcel"
                                    onclick='Javacsript:DownloadExcel("38270","S000000001")'
                                    data-bs-toggle="modal"
                                    data-bs-target="#UpdateUploadExcelContainer"
                                  >
                                    <i className="fa fa-upload" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Hotel Logs"
                                >
                                  <Link target="_blank" to="userlogs.html">
                                    <i className="fa fa-history" />
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_1 odd" role="row">
                            <td>
                              <div className="checkbox checkbox-success">
                                <input
                                  type="checkbox"
                                  name="chk[]"
                                  defaultValue={38270}
                                  aria-label="Single checkbox One"
                                />
                                <label />
                              </div>
                            </td>
                            <td style={{ textAlign: "left" }}>
                              &nbsp;ABC Premium Hostel
                            </td>
                            <td align="center">&nbsp; 1.0 Star(s)</td>
                            <td align="center">&nbsp;Singapore</td>
                            <td align="center">&nbsp;Singapore</td>
                            <td align="center">&nbsp;allwin-qtech</td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Add Extranet Rates"
                                >
                                  <Link to="hotelInventoryapp.html">
                                    <i className="fa fa-hotel" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title=" Map Hotel Room Category"
                                >
                                  <Link
                                    onclick='Javacsript:view_room_class("38270","S000000003")'
                                    data-bs-toggle="modal"
                                    data-bs-target="#myModal1"
                                  >
                                    <i className="fa fa-map-marker" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Settings"
                                >
                                  <Link
                                    onclick='Javacsript:childSettings("38270","S000000003")'
                                    data-bs-toggle="modal"
                                    data-bs-target="#childSettings"
                                  >
                                    <i className="fa fa-user" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Update Content"
                                >
                                  <Link
                                    id="UpdateUploadExcel"
                                    onclick='Javacsript:DownloadExcel("38270","S000000003")'
                                    data-bs-toggle="modal"
                                    data-bs-target="#UpdateUploadExcelContainer"
                                  >
                                    <i className="fa fa-upload" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Hotel Logs"
                                >
                                  <Link target="_blank" to="userlogs.html">
                                    <i className="fa fa-history" />
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_0 even" role="row">
                            <td>
                              <div className="checkbox checkbox-success">
                                <input
                                  type="checkbox"
                                  name="chk[]"
                                  defaultValue={68789}
                                  aria-label="Single checkbox One"
                                />
                                <label />
                              </div>
                            </td>
                            <td style={{ textAlign: "left" }}>
                              &nbsp;Abidos Hotel Apartment Al Barsha
                            </td>
                            <td align="center">&nbsp; 4 Star(s)</td>
                            <td align="center">&nbsp;United Arab Emirates</td>
                            <td align="center">&nbsp;Dubai</td>
                            <td align="center">&nbsp;World Avenue</td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Add Extranet Rates"
                                >
                                  <Link to="hotelInventoryapp.html">
                                    <i className="fa fa-hotel" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title=" Map Hotel Room Category"
                                >
                                  <Link
                                    onclick='Javacsript:view_room_class("68789","S000000888")'
                                    data-bs-toggle="modal"
                                    data-bs-target="#myModal1"
                                  >
                                    <i className="fa fa-map-marker" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Settings"
                                >
                                  <Link
                                    onclick='Javacsript:childSettings("68789","S000000888")'
                                    data-bs-toggle="modal"
                                    data-bs-target="#childSettings"
                                  >
                                    <i className="fa fa-user" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Update Content"
                                >
                                  <Link
                                    id="UpdateUploadExcel"
                                    onclick='Javacsript:DownloadExcel("68789","S000000888")'
                                    data-bs-toggle="modal"
                                    data-bs-target="#UpdateUploadExcelContainer"
                                  >
                                    <i className="fa fa-upload" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Hotel Logs"
                                >
                                  <Link target="_blank" to="userlogs.html">
                                    <i className="fa fa-history" />
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_1 odd" role="row">
                            <td>
                              <div className="checkbox checkbox-success">
                                <input
                                  type="checkbox"
                                  name="chk[]"
                                  defaultValue={73183}
                                  aria-label="Single checkbox One"
                                />
                                <label />
                              </div>
                            </td>
                            <td style={{ textAlign: "left" }}>
                              &nbsp;Address downtown test
                            </td>
                            <td align="center">&nbsp; 4.0 Star(s)</td>
                            <td align="center">&nbsp;United Arab Emirates</td>
                            <td align="center">&nbsp;Dubai</td>
                            <td align="center">&nbsp;QtechTest</td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Add Extranet Rates"
                                >
                                  <Link to="hotelInventoryapp.html">
                                    <i className="fa fa-hotel" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title=" Map Hotel Room Category"
                                >
                                  <Link
                                    onclick='Javacsript:view_room_class("73183","S000000001")'
                                    data-bs-toggle="modal"
                                    data-bs-target="#myModal1"
                                  >
                                    <i className="fa fa-map-marker" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Settings"
                                >
                                  <Link
                                    onclick='Javacsript:childSettings("73183","S000000001")'
                                    data-bs-toggle="modal"
                                    data-bs-target="#childSettings"
                                  >
                                    <i className="fa fa-user" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Update Content"
                                >
                                  <Link
                                    id="UpdateUploadExcel"
                                    onclick='Javacsript:DownloadExcel("73183","S000000001")'
                                    data-bs-toggle="modal"
                                    data-bs-target="#UpdateUploadExcelContainer"
                                  >
                                    <i className="fa fa-upload" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Hotel Logs"
                                >
                                  <Link target="_blank" to="userlogs.html">
                                    <i className="fa fa-history" />
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_0 even" role="row">
                            <td>
                              <div className="checkbox checkbox-success">
                                <input
                                  type="checkbox"
                                  name="chk[]"
                                  defaultValue={38367}
                                  aria-label="Single checkbox One"
                                />
                                <label />
                              </div>
                            </td>
                            <td style={{ textAlign: "left" }}>
                              &nbsp;Adler Hostel
                            </td>
                            <td align="center">&nbsp; 2.0 Star(s)</td>
                            <td align="center">&nbsp;Singapore</td>
                            <td align="center">&nbsp;Singapore</td>
                            <td align="center">&nbsp;allwin-qtech</td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Add Extranet Rates"
                                >
                                  <Link to="hotelInventoryapp.html">
                                    <i className="fa fa-hotel" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title=" Map Hotel Room Category"
                                >
                                  <Link
                                    onclick='Javacsript:view_room_class("38367","S000000003")'
                                    data-bs-toggle="modal"
                                    data-bs-target="#myModal1"
                                  >
                                    <i className="fa fa-map-marker" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Settings"
                                >
                                  <Link
                                    onclick='Javacsript:childSettings("38367","S000000003")'
                                    data-bs-toggle="modal"
                                    data-bs-target="#childSettings"
                                  >
                                    <i className="fa fa-user" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Update Content"
                                >
                                  <Link
                                    id="UpdateUploadExcel"
                                    onclick='Javacsript:DownloadExcel("38367","S000000003")'
                                    data-bs-toggle="modal"
                                    data-bs-target="#UpdateUploadExcelContainer"
                                  >
                                    <i className="fa fa-upload" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Hotel Logs"
                                >
                                  <Link
                                    target="_blank"
                                    to="access_control.php?action=search_user_logs&entity_search=Hotels&entity_value_search=Adler%20Hostel&entity_id_search=38367&submit=Search"
                                  >
                                    <i className="fa fa-history" />
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_1 odd" role="row">
                            <td>
                              <div className="checkbox checkbox-success">
                                <input
                                  type="checkbox"
                                  name="chk[]"
                                  defaultValue={38367}
                                  aria-label="Single checkbox One"
                                />
                                <label />
                              </div>
                            </td>
                            <td style={{ textAlign: "left" }}>
                              &nbsp;Adler Hostel
                            </td>
                            <td align="center">&nbsp; 2.0 Star(s)</td>
                            <td align="center">&nbsp;Singapore</td>
                            <td align="center">&nbsp;Singapore</td>
                            <td align="center">&nbsp;QtechTest</td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Add Extranet Rates"
                                >
                                  <Link to="hotelInventoryapp.html">
                                    <i className="fa fa-hotel" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title=" Map Hotel Room Category"
                                >
                                  <Link
                                    onclick='Javacsript:view_room_class("38367","S000000001")'
                                    data-bs-toggle="modal"
                                    data-bs-target="#myModal1"
                                  >
                                    <i className="fa fa-map-marker" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Settings"
                                >
                                  <Link
                                    onclick='Javacsript:childSettings("38367","S000000001")'
                                    data-bs-toggle="modal"
                                    data-bs-target="#childSettings"
                                  >
                                    <i className="fa fa-user" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Update Content"
                                >
                                  <Link
                                    id="UpdateUploadExcel"
                                    onclick='Javacsript:DownloadExcel("38367","S000000001")'
                                    data-bs-toggle="modal"
                                    data-bs-target="#UpdateUploadExcelContainer"
                                  >
                                    <i className="fa fa-upload" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Hotel Logs"
                                >
                                  <Link target="_blank" to="userlogs.html">
                                    <i className="fa fa-history" />
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_0 even" role="row">
                            <td>
                              <div className="checkbox checkbox-success">
                                <input
                                  type="checkbox"
                                  name="chk[]"
                                  defaultValue={38362}
                                  aria-label="Single checkbox One"
                                />
                                <label />
                              </div>
                            </td>
                            <td style={{ textAlign: "left" }}>
                              &nbsp;Adonis Hotel
                            </td>
                            <td align="center">&nbsp; 3.0 Star(s)</td>
                            <td align="center">&nbsp;Singapore</td>
                            <td align="center">&nbsp;Singapore</td>
                            <td align="center">&nbsp;allwin-qtech</td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Add Extranet Rates"
                                >
                                  <Link to="hotelInventoryapp.html">
                                    <i className="fa fa-hotel" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title=" Map Hotel Room Category"
                                >
                                  <Link
                                    onclick='Javacsript:view_room_class("38362","S000000003")'
                                    data-bs-toggle="modal"
                                    data-bs-target="#myModal1"
                                  >
                                    <i className="fa fa-map-marker" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Settings"
                                >
                                  <Link
                                    onclick='Javacsript:childSettings("38362","S000000003")'
                                    data-bs-toggle="modal"
                                    data-bs-target="#childSettings"
                                  >
                                    <i className="fa fa-user" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Update Content"
                                >
                                  <Link
                                    id="UpdateUploadExcel"
                                    onclick='Javacsript:DownloadExcel("38362","S000000003")'
                                    data-bs-toggle="modal"
                                    data-bs-target="#UpdateUploadExcelContainer"
                                  >
                                    <i className="fa fa-upload" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Hotel Logs"
                                >
                                  <Link target="_blank" to="userlogs.html">
                                    <i className="fa fa-history" />
                                  </Link>
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
              <div
                className="custPaging pgType2"
                style={{ marginTop: "8px" }}
              />
            </div>
          </div>
        </form>
        <style
          dangerouslySetInnerHTML={{
            __html: "\n.modal-content {\n    width: 162%;\n    }\n    ",
          }}
        />
        {/* End */}
        <div
          className="modal fade"
          id="childSettings"
          tabIndex={-1}
          role="dialog"
          aria-hidden="true"
        >
          <div className="modal-dialog" style={{ width: "1000px" }}>
            <div className="modal-content">
              <div className="color-linegreen" />
              <div className="modal-body">
                <span
                  className="fa fa-times-circle fa-4 closeBtn"
                  data-bs-dismiss="modal"
                  id="closeBtn"
                ></span>
                <div className="siteLogo">
                  <img
                    src="http://beta.tdonlines.com/project_folder/tdonline//images/logo.png"
                    alt=""
                    style={{ width: "110px" }}
                  />
                </div>
                <hr />
                <style
                  type="text/css"
                  dangerouslySetInnerHTML={{
                    __html:
                      '\n                                body {\n                                    overflow: hidden;\n                                }\n\n                                form {\n                                    margin-bottom: 0em !important;\n                                }\n\n                                .modalForm1 {\n                                    padding: 0px 25px;\n                                    font-size: 12px;\n                                    max-height: 420px;\n                                    overflow: hidden;\n                                    overflow-y: auto;\n                                }\n\n                                .release_period_content {\n                                    padding: 0;\n                                }\n                                .checkbox.checkbox-inline {\n    margin-top: 0;\n}\n.checkbox.checkbox-inline {\n    margin-top: 0;\n}\n\n.checkbox.checkbox-inline {\n    margin-top: 0;\n}\n.checkbox {\n    padding-left: 20px;\n}\n.checkbox {\n    padding-left: 20px;\n}\n.checkbox {\n    margin: 5px 0px;\n}\n.radio-inline, .checkbox-inline {\n    display: inline-block;\n    padding-left: 20px;\n    margin-bottom: 0;\n    font-weight: normal;\n    vertical-align: middle;\n    cursor: pointer;\n}\n.panel-heading {\n    font-family: "MONTSERRAT";\n    font-size: 14pt;\n    text-transform: uppercase;\n}\n\n.panel-heading {\n    padding: 10px 15px;\n    border-bottom: 1px solid transparent;\n    border-top-left-radius: 3px;\n    border-top-right-radius: 3px;\n}\n                            ',
                  }}
                />
                <div className="hpanel modalForm1">
                  <div className="row">
                    <div className="form-group">
                      <div className="panel-heading">
                        Localsystem Required Inputs
                      </div>
                    </div>
                    <div className="form-group col-md-12">
                      <label>
                        <font color="red" />
                      </label>
                    </div>
                    <form
                      action="hotels.php?Search=Y&Search_hotel_name=&Search_hotel_rating=&Search_city=&Search_countries=&Search_hotel_location=&next="
                      method="post"
                      name="edit_hotel_form"
                    >
                      <input
                        type="hidden"
                        name="action"
                        defaultValue="update_local_system_changes"
                      />
                      <input type="hidden" name="id" defaultValue={38216} />
                      <input
                        type="hidden"
                        name="supplier_id"
                        defaultValue="S000000001"
                      />
                      <div className="form-group col-md-12">
                        <label>Weekend Days</label>
                        <div className>
                          <div className="checkbox checkbox-success checkbox-inline">
                            <input
                              type="checkbox"
                              id="chk_weekend_1"
                              name="chk_weekend_1"
                              defaultValue={1}
                            />
                            <label htmlFor="chk_weekend_1">Mon</label>
                          </div>
                          <div className="checkbox checkbox-success checkbox-inline">
                            <input
                              type="checkbox"
                              id="chk_weekend_2"
                              name="chk_weekend_2"
                              defaultValue={2}
                            />
                            <label htmlFor="chk_weekend_2">Tue</label>
                          </div>
                          <div className="checkbox checkbox-success checkbox-inline">
                            <input
                              type="checkbox"
                              id="chk_weekend_3"
                              name="chk_weekend_3"
                              defaultValue={3}
                            />
                            <label htmlFor="chk_weekend_3">Wed</label>
                          </div>
                          <div className="checkbox checkbox-success checkbox-inline">
                            <input
                              type="checkbox"
                              id="chk_weekend_4"
                              name="chk_weekend_4"
                              defaultValue={4}
                            />
                            <label htmlFor="chk_weekend_4">Thurs</label>
                          </div>
                          <div className="checkbox checkbox-success checkbox-inline">
                            <input
                              type="checkbox"
                              id="chk_weekend_5"
                              name="chk_weekend_5"
                              defaultValue={5}
                            />
                            <label htmlFor="chk_weekend_5">Fri</label>
                          </div>
                          <div className="checkbox checkbox-success checkbox-inline">
                            <input
                              type="checkbox"
                              id="chk_weekend_6"
                              name="chk_weekend_6"
                              defaultValue={6}
                              defaultChecked
                            />
                            <label htmlFor="chk_weekend_6">Sat</label>
                          </div>
                          <div className="checkbox checkbox-success checkbox-inline">
                            <input
                              type="checkbox"
                              id="chk_weekend_7"
                              name="chk_weekend_7"
                              defaultValue={7}
                              defaultChecked
                            />
                            <label htmlFor="chk_weekend_7">Sun</label>
                          </div>
                        </div>
                      </div>
                      <div className="form-group col-md-12">
                        <label>
                          Channel Manager{" "}
                          <font color="red">
                            (Selecting / Unselecting channel manager will map /
                            unmap room class for channel manager mapping.)
                          </font>
                        </label>
                        <MultiSelect
                          options={searchbooking_channnel_manager_options}
                          isSearchable
                          placeholder="- Select Channel Manager -"
                          className="custom-select"
                          noOptionsMessage={() => "No Channel Manager Found"}
                        />
                      </div>
                      <div className="row">
                        <div className="form-group col-md-6">
                          <div className="form-group col-xs-121">
                            <label>Infant Lower Limit (Yrs)</label>
                            <input
                              className="form-control form-control-sm"
                              name="sel_infant_age_lower"
                              id="sel_infant_age_lower"
                              defaultValue={0}
                              readOnly
                            />
                          </div>
                          <div className="form-group col-xs-121">
                            <label>Child Range 1 Lower Limit (Yrs)</label>
                            <input
                              size={2}
                              type="text"
                              className="selectpicker form-control form-control-sm show-menu-arrow"
                              name="sel_tiny_child_age_lower"
                              id="sel_tiny_child_age_lower"
                              defaultValue
                              readOnly
                              data-live-search="true"
                            />
                          </div>
                          <div className="form-group col-xs-121">
                            <label>Child Range 2 Lower Limit (Yrs)</label>
                            <input
                              size={2}
                              type="text"
                              className="form-control form-control-sm"
                              name="sel_child_age_lower"
                              id="sel_child_age_lower"
                              defaultValue
                              readOnly
                            />
                          </div>
                          <div className="form-group col-xs-121">
                            <label>Child Range 3 Lower Limit (Yrs)</label>
                            <input
                              size={2}
                              type="text"
                              className="form-control form-control-sm"
                              name="sel_teen_child_age_lower"
                              id="sel_teen_child_age_lower"
                              defaultValue
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="form-group col-md-6">
                          <div className="form-group col-xs-31">
                            <label>Infant Upper Limit (Yrs)</label>
                            <MultiSelect
                              options={infantAgeUpperOptions}
                              isSearchable
                              placeholder="- Select Infant Upper Limit -"
                              className="custom-select"
                              noOptionsMessage={() =>
                                "No Infant Upper Limit Found"
                              }
                            />
                          </div>
                          <div className="form-group col-xs-31">
                            <label>Child Range 1 Upper Limit (Yrs)</label>
                            <MultiSelect
                              options={infantAgeUpperOptions}
                              isSearchable
                              placeholder="- Select Child Range -"
                              className="custom-select"
                              noOptionsMessage={() => "No Child Range Found"}
                            />
                          </div>
                          <div className="form-group col-xs-31">
                            <label>Child Range 2 Upper Limit (Yrs)</label>
                            <MultiSelect
                              options={infantAgeUpperOptions}
                              isSearchable
                              placeholder="- Select Child Range -"
                              className="custom-select"
                              noOptionsMessage={() => "No Child Range Found"}
                            />
                          </div>
                          <div className="form-group col-xs-31">
                            <label>Child Range 3 Upper Limit (Yrs)</label>
                            <MultiSelect
                              options={infantAgeUpperOptions}
                              isSearchable
                              placeholder="- Select Child Range -"
                              className="custom-select"
                              noOptionsMessage={() => "No Child Range Found"}
                            />
                          </div>
                        </div>
                        <div className="form-group col-md-12">
                          <label>Hotel Checkin Time (Hrs:Min)</label>
                          <i
                            className="fa fa-info-circle"
                            title
                            data-toggle="tooltip"
                            data-placement="top"
                            data-original-title="If checkin date and booking date is same or if release period duartion is less then hotel will not be displayed in listing and release period will be calculated from the time."
                          />
                        </div>
                        <br />
                        <div className="form-group col-md-2 release_period_content">
                          <label>Hours</label>
                          <br />
                          <MultiSelect
                            options={releaseSelHrsOptions}
                            isSearchable
                            placeholder="- Select Hours -"
                            className="custom-select"
                            noOptionsMessage={() => "No Hours Found"}
                          />
                        </div>
                        <div className="form-group col-md-2 release_period_content">
                          <label>Minutes</label>
                          <br />
                          <MultiSelect
                            options={releaseSelMinsOptions}
                            isSearchable
                            placeholder="- Select Hours -"
                            className="custom-select"
                            noOptionsMessage={() => "No Hours Found"}
                          />
                        </div>
                        <div className="form-group col-md-3">
                          <label>Timezone</label>
                          <MultiSelect
                            options={selTimezoneOptions}
                            isSearchable
                            placeholder="- Select Timezone -"
                            className="custom-select"
                            noOptionsMessage={() => "No Timezone Found"}
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="row">
                    <div className="form-group col-md-12">
                      <button
                        type="button"
                        className="btn btn-dark btn-sm"
                        onclick="submit_form(document.forms['edit_hotel_form'])"
                        value="submit"
                      >
                        <i className="fa fa-floppy-o" />
                        &nbsp;Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade hmodal-success"
          id="myModal1"
          tabIndex={-1}
          role="dialog"
          aria-hidden="true"
          style={{ display: "none" }}
        >
          <div className="modal-dialog" style={{ width: "1000px" }}>
            <div className="modal-content">
              <div className="modal-body">
                <span
                  className="fa fa-times-circle fa-4 closeBtn"
                  data-bs-dismiss="modal"
                  id="closeBtn"
                ></span>
                <div className="color-line" />
                <div className="siteLogo">
                  <img
                    src="http://beta.tdonlines.com/project_folder/tdonline//images/logo.png"
                    alt=""
                    style={{ width: "110px" }}
                  />
                </div>
                <hr />
                <style
                  dangerouslySetInnerHTML={{
                    __html:
                      "\n                                html {\n                                    overflow: auto !important;\n                                }\n                            ",
                  }}
                />
                <div className="col-lg-12 form-group">
                  <form name="map_room_class_form" id="map_room_class_form">
                    <input
                      type="hidden"
                      name="supplier_id"
                      defaultValue="S000000001"
                    />
                    <input type="hidden" name="hotel_id" defaultValue={38216} />
                    <div className="row form-group">
                      <div className="col-lg-12 form-group">
                        <h4>Hotel Room Category Mapping</h4>
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-md-12">
                        <div className="checkbox checkbox-single checkbox-success">
                          <input
                            type="checkbox"
                            name="Select-All"
                            id="SelectAll"
                            defaultValue={1}
                          />
                          <label htmlFor="SelectAll">Select All</label>
                        </div>
                      </div>
                      <div className="checkbox-group row">
                        <div className="form-group col-md-6">
                          <div className="checkbox checkbox-single checkbox-success">
                            <input
                              className="checkboxChecked"
                              type="checkbox"
                              name="map_room_class[]"
                              data-class={13}
                              data-type="rc"
                              defaultValue={13}
                              id={13}
                            />
                            <label htmlFor={13}>
                              <b>Classic - </b>Triple
                            </label>
                          </div>
                        </div>
                        <div className="form-group col-md-6">
                          <div className="checkbox checkbox-single checkbox-success">
                            <input
                              className="checkboxChecked"
                              type="checkbox"
                              name="map_room_class[]"
                              data-class={67}
                              data-type="rc"
                              defaultValue={67}
                              id={67}
                            />
                            <label htmlFor={67}>
                              <b>Classic Suite - </b>Triple
                            </label>
                          </div>
                        </div>
                        <div className="form-group col-md-6">
                          <div className="checkbox checkbox-single checkbox-success">
                            <input
                              className="checkboxChecked"
                              type="checkbox"
                              name="map_room_class[]"
                              data-class={164}
                              data-type="rc"
                              defaultValue={164}
                              id={164}
                            />
                            <label htmlFor={164}>
                              <b>Deluxe - </b>Single{" "}
                            </label>
                          </div>
                        </div>
                        <div className="form-group col-md-6">
                          <div className="checkbox checkbox-single checkbox-success">
                            <input
                              className="checkboxChecked"
                              type="checkbox"
                              name="map_room_class[]"
                              data-class={8}
                              data-type="rc"
                              defaultValue={8}
                              id={8}
                            />
                            <label htmlFor={8}>
                              <b>Deluxe - </b>Triple
                            </label>
                          </div>
                        </div>
                        <div className="form-group col-md-6">
                          <div className="checkbox checkbox-single checkbox-success">
                            <input
                              className="checkboxChecked"
                              type="checkbox"
                              name="map_room_class[]"
                              data-class={165}
                              data-type="rc"
                              defaultValue={165}
                              id={165}
                            />
                            <label htmlFor={165}>
                              <b>Deluxe room - </b>Double, Extrabed - 2
                            </label>
                          </div>
                        </div>
                        <div className="form-group col-md-6">
                          <div className="checkbox checkbox-single checkbox-success">
                            <input
                              className="checkboxChecked"
                              type="checkbox"
                              name="map_room_class[]"
                              data-class={147}
                              data-type="rc"
                              defaultValue={147}
                              id={147}
                            />
                            <label htmlFor={147}>
                              <b>Exclusive plus triple - </b>Triple
                            </label>
                          </div>
                        </div>
                        <div className="form-group col-md-6">
                          <div className="checkbox checkbox-single checkbox-success">
                            <input
                              className="checkboxChecked"
                              type="checkbox"
                              name="map_room_class[]"
                              data-class={148}
                              data-type="rc"
                              defaultValue={148}
                              id={148}
                            />
                            <label htmlFor={148}>
                              <b>Exclusive plus triple extrabed - </b>Triple,
                              Extrabed - 1{" "}
                            </label>
                          </div>
                        </div>
                        <div className="form-group col-md-6">
                          <div className="checkbox checkbox-single checkbox-success">
                            <input
                              className="checkboxChecked"
                              type="checkbox"
                              name="map_room_class[]"
                              data-class={55}
                              data-type="rc"
                              defaultValue={55}
                              id={55}
                            />
                            <label htmlFor={55}>
                              <b>Executive - </b>Single, Extrabed - 3{" "}
                            </label>
                          </div>
                        </div>
                        <div className="form-group col-md-6">
                          <div className="checkbox checkbox-single checkbox-success">
                            <input
                              className="checkboxChecked"
                              type="checkbox"
                              name="map_room_class[]"
                              data-class={149}
                              data-type="rc"
                              defaultValue={149}
                              id={149}
                            />
                            <label htmlFor={149}>
                              <b>Executive - </b>Triple
                            </label>
                          </div>
                        </div>
                        <div className="form-group col-md-6">
                          <div className="checkbox checkbox-single checkbox-success">
                            <input
                              className="checkboxChecked"
                              type="checkbox"
                              name="map_room_class[]"
                              data-class={57}
                              data-type="rc"
                              defaultValue={57}
                              id={57}
                            />
                            <label htmlFor={57}>
                              <b>Executive - </b>Triple, Extrabed - 2{" "}
                            </label>
                          </div>
                        </div>
                        <div className="form-group col-md-6">
                          <div className="checkbox checkbox-single checkbox-success">
                            <input
                              className="checkboxChecked"
                              type="checkbox"
                              name="map_room_class[]"
                              data-class={60}
                              data-type="rc"
                              defaultValue={60}
                              id={60}
                            />
                            <label htmlFor={60}>
                              <b>Premium - </b>Single, Extrabed - 2{" "}
                            </label>
                          </div>
                        </div>
                        <div className="form-group col-md-6">
                          <div className="checkbox checkbox-single checkbox-success">
                            <input
                              className="checkboxChecked"
                              type="checkbox"
                              name="map_room_class[]"
                              data-class={62}
                              data-type="rc"
                              defaultValue={62}
                              id={62}
                            />
                            <label htmlFor={62}>
                              <b>Premium - </b>Triple, Extrabed - 2{" "}
                            </label>
                          </div>
                        </div>
                        <div className="form-group col-md-6">
                          <div className="checkbox checkbox-single checkbox-success">
                            <input
                              className="checkboxChecked"
                              type="checkbox"
                              name="map_room_class[]"
                              data-class={37}
                              data-type="rc"
                              defaultValue={37}
                              id={37}
                            />
                            <label htmlFor={37}>
                              <b>Premiunm - </b>Triple
                            </label>
                          </div>
                        </div>
                        <div className="form-group col-md-6">
                          <div className="checkbox checkbox-single checkbox-success">
                            <input
                              className="checkboxChecked"
                              type="checkbox"
                              name="map_room_class[]"
                              data-class={167}
                              data-type="rc"
                              defaultValue={167}
                              id={167}
                            />
                            <label htmlFor={167}>
                              <b>Qtech classic - </b>Double, Extrabed - 1
                            </label>
                          </div>
                        </div>
                        <div className="form-group col-md-6">
                          <div className="checkbox checkbox-single checkbox-success">
                            <input
                              className="checkboxChecked"
                              type="checkbox"
                              name="map_room_class[]"
                              data-class={169}
                              data-type="rc"
                              defaultValue={169}
                              id={169}
                            />
                            <label htmlFor={169}>
                              <b>Qtech classic - </b>Quad, Extrabed - 1{" "}
                            </label>
                          </div>
                        </div>
                        <div className="form-group col-md-6">
                          <div className="checkbox checkbox-single checkbox-success">
                            <input
                              className="checkboxChecked"
                              type="checkbox"
                              name="map_room_class[]"
                              data-class={166}
                              data-type="rc"
                              defaultValue={166}
                              id={166}
                            />
                            <label htmlFor={166}>
                              <b>Qtech classic - </b>Single, Extrabed - 1
                            </label>
                          </div>
                        </div>
                        <div className="form-group col-md-6">
                          <div className="checkbox checkbox-single checkbox-success">
                            <input
                              className="checkboxChecked"
                              type="checkbox"
                              name="map_room_class[]"
                              data-class={168}
                              data-type="rc"
                              defaultValue={168}
                              id={168}
                            />
                            <label htmlFor={168}>
                              <b>Qtech classic - </b>Triple, Extrabed - 1
                            </label>
                          </div>
                        </div>
                        <div className="form-group col-md-6">
                          <div className="checkbox checkbox-single checkbox-success">
                            <input
                              className="checkboxChecked"
                              type="checkbox"
                              name="map_room_class[]"
                              data-class={23}
                              data-type="rc"
                              defaultValue={23}
                              id={23}
                            />
                            <label htmlFor={23}>
                              <b>Royal - </b>Triple
                            </label>
                          </div>
                        </div>
                        <div className="form-group col-md-6">
                          <div className="checkbox checkbox-single checkbox-success">
                            <input
                              className="checkboxChecked"
                              type="checkbox"
                              name="map_room_class[]"
                              data-class={150}
                              data-type="rc"
                              defaultValue={150}
                              id={150}
                            />
                            <label htmlFor={150}>
                              <b>Special Executive - </b>Triple
                            </label>
                          </div>
                        </div>
                        <div className="form-group col-md-6">
                          <div className="checkbox checkbox-single checkbox-success">
                            <input
                              className="checkboxChecked"
                              type="checkbox"
                              name="map_room_class[]"
                              data-class={18}
                              data-type="rc"
                              defaultValue={18}
                              id={18}
                            />
                            <label htmlFor={18}>
                              <b>Standard - </b>Triple
                            </label>
                          </div>
                        </div>
                        <div className="form-group col-md-6">
                          <div className="checkbox checkbox-single checkbox-success">
                            <input
                              className="checkboxChecked"
                              type="checkbox"
                              name="map_room_class[]"
                              data-class={71}
                              data-type="rc"
                              defaultValue={71}
                              id={71}
                            />
                            <label htmlFor={71}>
                              <b>Standard ER - </b>Triple
                            </label>
                          </div>
                        </div>
                        <div className="form-group col-md-6">
                          <div className="checkbox checkbox-single checkbox-success">
                            <input
                              className="checkboxChecked"
                              type="checkbox"
                              name="map_room_class[]"
                              data-class={145}
                              data-type="rc"
                              defaultValue={145}
                              id={145}
                            />
                            <label htmlFor={145}>
                              <b>Standard Triple - </b>Triple
                            </label>
                          </div>
                        </div>
                        <div className="form-group col-md-6">
                          <div className="checkbox checkbox-single checkbox-success">
                            <input
                              className="checkboxChecked"
                              type="checkbox"
                              name="map_room_class[]"
                              data-class={80}
                              data-type="rc"
                              defaultValue={80}
                              id={80}
                            />
                            <label htmlFor={80}>
                              <b>StandardTest - </b>Triple
                            </label>
                          </div>
                        </div>
                        <div className="form-group col-md-6">
                          <div className="checkbox checkbox-single checkbox-success">
                            <input
                              className="checkboxChecked"
                              type="checkbox"
                              name="map_room_class[]"
                              data-class={47}
                              data-type="rc"
                              defaultValue={47}
                              id={47}
                            />
                            <label htmlFor={47}>
                              <b>Super Deluxe - </b>Triple
                            </label>
                          </div>
                        </div>
                        <div className="form-group col-md-6">
                          <div className="checkbox checkbox-single checkbox-success">
                            <input
                              className="checkboxChecked"
                              type="checkbox"
                              name="map_room_class[]"
                              data-class={146}
                              data-type="rc"
                              defaultValue={146}
                              id={146}
                            />
                            <label htmlFor={146}>
                              <b>Triple Standard ESC - </b>Triple, Extrabed - 1
                            </label>
                          </div>
                        </div>
                      </div>
                      <div
                        className="form-group col-md-12"
                        style={{ marginTop: "2em" }}
                      >
                        <button
                          type="button"
                          className="btn btn-dark btn-sm"
                          onclick="submit_map_room_class();"
                          value="Submit"
                        >
                          <i className="fa fa-floppy-o" />
                          &nbsp;Save
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n    .hpanel > .panel-heading {\n    color: inherit;\n    /* font-weight: 600; */\n    padding: 7px 4px;\n    transition: all .3s;\n    border: 1px solid transparent;\n    background-color: #edf0f5!important;\n}\n.panel-tools {\n    display: none;\n    float: right;\n    margin-top: 0;\n    padding: 0;\n    position: relative;\n}\n.hpanel > .panel-footer {\n    color: inherit;\n    border: 1px solid #e4e5e7;\n    border-top: none;\n    /* font-size: 90%; */\n    background: #f7f9fa;\n}\n\n\n.panel-footer {\n    padding: 10px 15px;\n \n    border-bottom-right-radius: 3px;\n    border-bottom-left-radius: 3px;\n}\n.btn-info{\n    color: #fff;\n}\n",
          }}
        />
        <div id="UpdateUploadExcelContainer" className="modal fade">
          <div className="modal-dialog modal-lg">
            <div className="modal-content" style={{ width: "120%" }}>
              <div className="modal-body">
                <span
                  className="fa fa-times-circle fa-4 closeBtn"
                  data-bs-dismiss="modal"
                  id="closeBtn"
                ></span>
                <div className="color-line" />
                <div className="row">
                  <div className="col-md-12">
                    <div className="hpanel">
                      <div className="panel-heading">
                        <div className="panel-tools">
                          <Link className="showhide">
                            <i className="fa fa-chevron-up" />
                          </Link>
                          <Link className="closebox">
                            <i className="fa fa-times" />
                          </Link>
                        </div>
                        Upload Excel
                      </div>
                      <div className="panel-footer">
                        <form
                          action="read_excel.php"
                          method="post"
                          encType="multipart/form-data"
                          id="excelUploadForm"
                          name="excelUploadForm"
                        >
                          <div className="row">
                            <div className="form-group col-md-8">
                              <div className="form-group col-md-3">
                                <label>Upload Excel File</label>
                                <input
                                  type="hidden"
                                  name="action"
                                  defaultValue="uploadExcel"
                                />
                                <input
                                  type="hidden"
                                  name="processType"
                                  defaultValue="ContentUpdate"
                                />
                                <input
                                  type="hidden"
                                  name="hotel_id"
                                  defaultValue={38216}
                                />
                                <input
                                  type="hidden"
                                  name="supplier_id"
                                  defaultValue="S000000003"
                                />
                                <span className="uniqFile input-group">
                                  <span className="input-group-addon fa fa-upload myInputFile">
                                    <input
                                      name="file"
                                      id="excelFile"
                                      size={40}
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      data-original-title="XLSX File"
                                      type="file"
                                    />
                                  </span>
                                </span>
                                <span id="FileUploadName" />
                              </div>
                            </div>
                          </div>
                          <div
                            className="row"
                            id="status"
                            style={{ display: "none" }}
                          >
                            <div className="form-group col-md-12">
                              <label id="msg" />
                            </div>
                          </div>
                          <div className="row mt-3">
                            <div className="form-group col-md-2">
                              <button
                                type="button"
                                className="btn btn-outline-secondary btn-sm"
                                name="b1"
                                value="Submit"
                                onclick="uploadFile();"
                              >
                                <i className="fa fa-upload" />
                                &nbsp;UPLOAD
                              </button>
                            </div>
                            <div
                              className="form-group col-md-3"
                              id="DownloadExcel"
                            >
                              <button
                                type="button"
                                className="btn btn-info btn-sm"
                                id="downloadHotelExcel"
                              >
                                <i className="fa fa-download" />
                                &nbsp;HOTEL EXCEL
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ContractsHotelsRatesSearchButton;
