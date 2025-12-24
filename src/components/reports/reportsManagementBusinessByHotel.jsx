import Flatpickr from "react-flatpickr";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header2 from "../header2/header2";
import MultiSelect from "../reactMultiSelect";
import { citiesByCountry, countries } from "../../constants/Country-City-Data";

const branchOptions = [
  { label: "--Select--", value: "" },
  { label: "Mumbai Branch", value: 1 },
  { label: "UAE Branch", value: 2 },
  { label: "UK Head Office", value: 3 },
  { label: "Head Office", value: 4 },
  { label: "Dubai GSA", value: 5 },
  { label: "London Branch", value: 6 },
  { label: "Saudi Branch", value: 7 },
  { label: "Dubai V3 Wh", value: 8 },
  { label: "Pune Branch", value: 9 },
  { label: "India - GSA", value: 10 },
  { label: "Test Branch1", value: 11 },
  { label: "test", value: 12 },
  { label: "Test Branch", value: 13 },
  { label: "Testffff", value: 14 },
  { label: "FRANCHISE BRANCH", value: 15 },
  { label: "Jcholidays", value: 16 },
  { label: "Demo", value: 17 },
  { label: "malaysia", value: 19 },
  { label: "GSA Iraq", value: 20 },
  { label: "Chennai", value: 21 },
  { label: "Bangkok Branch", value: 22 },
  { label: "suhas_branch", value: 23 },
  { label: "Istanbul", value: 24 },
  { label: "hyderabad", value: 25 },
  { label: "hyderabad_suhas", value: 26 },
  { label: "branch_suhas", value: 27 },
  { label: "New Joint Branch", value: 28 },
  { label: "Bahrain Branch", value: 29 },
  { label: "Branch Bahrain", value: 30 },
  { label: "testdddd", value: 31 },
  { label: "Demo", value: 32 },
  { label: "HotelConfirm", value: 33 },
  { label: "HotelConfirm_Live", value: 34 },
  { label: "Demo_Test_Branch", value: 35 },
  { label: "Demo Branch", value: 36 },
  { label: "GSA Branch", value: 37 },
  { label: "Testpp", value: 38 },
  { label: "GTest", value: 39 },
  { label: "WA_Malaysia", value: 40 },
  { label: "Bolton Branch", value: 41 },
  { label: "World Avenue", value: 42 },
  { label: "TEST_BRANCH_A", value: 43 },
  { label: "TEST_BRANCH_JV_A", value: 44 },
  { label: "TEST_BRANCH_JV_C", value: 45 },
  { label: "world_avenue_malesia", value: 46 },
  { label: "World Avenues Malaysia", value: 47 },
  { label: "test_branch_jv", value: 48 },
  { label: "1 Booking", value: 49 },
];

const statusOptions = [
  { label: "Confirmed", value: "confirmed" },
  { label: "Vouchered", value: "vouchered" },
  { label: "Cancelled", value: "cancelled" },
];

const maxResultsOptions = [
  { value: 50, label: "50" },
  { value: 100, label: "100" },
  { value: 150, label: "150" },
  { value: 200, label: "200" },
  { value: 250, label: "250" },
  { value: 300, label: "300" },
  { value: 350, label: "350" },
  { value: 400, label: "400" },
  { value: 450, label: "450" },
  { value: 500, label: "500" },
  { value: 550, label: "550" },
  { value: 600, label: "600" },
  { value: 650, label: "650" },
  { value: 700, label: "700" },
  { value: 750, label: "750" },
  { value: 800, label: "800" },
  { value: 850, label: "850" },
  { value: 900, label: "900" },
  { value: 950, label: "950" },
  { value: 1000, label: "1000" },
  { value: 1050, label: "1050" },
  { value: 1100, label: "1100" },
  { value: 1150, label: "1150" },
  { value: 1200, label: "1200" },
  { value: 1250, label: "1250" },
  { value: 1300, label: "1300" },
  { value: 1350, label: "1350" },
  { value: 1400, label: "1400" },
  { value: 1450, label: "1450" },
  { value: 1500, label: "1500" },
];

const hotelOptions = [
  { label: "--Select--", value: "" },
  { label: "Hotel Option 1", value: "hotel_option_1" },
  { label: "Hotel Option 2", value: "hotel_option_2" },
  { label: "Hotel Option 3", value: "hotel_option_3" },
  // Add more options as needed
];

const ReportsManagementBusinessByHotel = () => {
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

  const [showBookingDate, setShowBookingDate] = useState(false);

  const toggleBookingDate = () => {
    setShowBookingDate(!showBookingDate);
  };

  const [showServiceDate, setShowserviceDate] = useState(false);

  const toggleServiceDate = () => {
    setShowserviceDate(!showServiceDate);
  };

  const [isFormVisible, setFormVisibility] = useState(false);

  const toggleFormVisibility = () => {
    setFormVisibility(!isFormVisible);
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
      <Header2 title="HOTEL WISE SALES REPORT" />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <form>
          <div className="panel-body">
            <div className="row">
              <div className="form-group col-md-3">
                <label>Country</label>
                <MultiSelect
                  options={countries}
                  isSearchable
                  placeholder="- Select Country -"
                  className="custom-select"
                  onChange={handleCountryChange}
                  noOptionsMessage={() => "No Country Found"}
                />
              </div>
              <div className="form-group col-md-3">
                <label>City</label>
                <MultiSelect
                  //  options={Array.isArray(branchData.branchCity) ? branchData.branchCity : []}
                  options={citiesByCountry[branchData.branchCountry] || []}
                  isSearchable
                  placeholder="- Select City -"
                  className="custom-select"
                  onChange={handleCityChange}
                  noOptionsMessage={() => "No City Found"}
                />
              </div>

              <div className="form-group col-md-3">
                <label>Hotel Name</label>
                <MultiSelect
                  options={hotelOptions}
                  isMulti
                  isSearchable
                  placeholder=" Select Hotel Name "
                  className="custom-select"
                  noOptionsMessage={() => "No Branch Found"}
                />
              </div>
              <div className="form-group col-md-3">
                <label>Status</label>
                <MultiSelect
                  options={statusOptions}
                  isSearchable
                  placeholder=" Status "
                  className="custom-select"
                  noOptionsMessage={() => "No Status Found"}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="form-group col-md-3">
                <label>Branch</label>
                <MultiSelect
                  options={branchOptions}
                  isSearchable
                  placeholder=" All Branches "
                  className="custom-select"
                  noOptionsMessage={() => "No Branch Found"}
                />
              </div>

              <div className="form-group col-md-3">
                <label>Results per page</label>
                <MultiSelect
                  options={maxResultsOptions}
                  isSearchable
                  placeholder=" 50 "
                  className="custom-select"
                  noOptionsMessage={() => "No Results Found"}
                />
              </div>

              <div className="form-group col-md-3">
                <div
                  className="checkbox checkbox-success"
                  style={{ display: "inline-block" }}
                >
                  <input
                    type="checkbox"
                    defaultValue={1}
                    name="chk_booking_date"
                    id="chk_booking_date"
                    onChange={toggleBookingDate}
                  />
                  <label htmlFor="chk_booking_date"> Booking Date </label>
                </div>
                &nbsp;&nbsp;
                <div
                  name="booking_date"
                  id="booking_date"
                  style={{ display: showBookingDate ? "block" : "none" }}
                >
                  <div
                    className="input-daterange input-group date"
                    id="datetimepicker1"
                  >
                    <Flatpickr
                      value={startDate}
                      onChange={(date) => setStartDate(date)}
                      options={{ dateFormat: "Y-m-d" }}
                      style={{ width: "131px" }}
                    />

                    <span class="input-group-addon">to</span>
                    <Flatpickr
                      value={endDate}
                      onChange={(date) => setEndDate(date)}
                      options={{ dateFormat: "Y-m-d" }}
                      style={{ width: "131px" }}
                    />
                    <span
                      className="input-group-addon"
                      onClick={handleTrashClick}
                    >
                      <i className="fa fa-trash" />
                    </span>
                  </div>
                </div>
              </div>
              <div className="form-group col-md-3">
                <div
                  className="checkbox checkbox-success"
                  style={{ display: "inline-block" }}
                >
                  <input
                    type="checkbox"
                    defaultValue={1}
                    name="chk_service_date"
                    id="chk_service_date"
                    onChange={toggleServiceDate}
                  />
                  <label htmlFor="chk_service_date">Service Date</label>
                </div>
                &nbsp;&nbsp;
                <div
                  name="service_date"
                  id="service_date"
                  style={{ display: showServiceDate ? "block" : "none" }}
                >
                  <div
                    className="input-daterange input-group date"
                    id="datetimepicker2"
                  >
                    <Flatpickr
                      value={startDate1}
                      onChange={(date) => setStartDate1(date)}
                      options={{ dateFormat: "Y-m-d" }}
                      style={{ width: "131px" }}
                    />

                    <span class="input-group-addon">to</span>
                    <Flatpickr
                      value={endDate1}
                      onChange={(date) => setEndDate1(date)}
                      options={{ dateFormat: "Y-m-d" }}
                      style={{ width: "131px" }}
                    />
                    <span
                      className="input-group-addon"
                      onClick={handleTrashClick1}
                    >
                      <i className="fa fa-trash" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="form-group col-md-12">
                <div className="col-md-2 ">
                  <button
                    type="button"
                    name="sbt1"
                    className="btn btn-dark btn-sm"
                    value="View Report"
                    onClick={toggleFormVisibility}
                  >
                    <i className="fa fa-eye" />
                    &nbsp;&nbsp;View Report
                  </button>
                </div>
                <div id="mesID" style={{ display: "none" }} />
              </div>
            </div>
          </div>
        </form>

        <br />
        <form
          id="hideornot"
          style={{ display: isFormVisible ? "block" : "none" }}
        >
          <style
            dangerouslySetInnerHTML={{
              __html:
                "\ntd a{\ncolor: black;\n    text-decoration: none;\n}\ntd a:hover{\ncolor: black !important;\ntext-decoration: none !important;\n}\n\n",
            }}
          />
          <div className="panel-body removeMargins">
            <div className="dataTables_scroll">
              <div className="row">
                <div className="col-md-12">
                  <div
                    valign="top"
                    onclick="callAjaxSubmit(2,'');"
                    title="Click to download XL sheet "
                    className="btn btn-dark btn-sm form-group"
                    style={{ marginBottom: "-42px" }}
                  >
                    <i className="fa fa-download" />
                    &nbsp;Download Excel
                  </div>
                </div>
              </div>
              <div
                id="search_transfer_wrapper"
                className="dataTables_wrapper form-inline dt-bootstrap no-footer"
              >
                <div className="row">
                  <div className="col-sm-10" />
                  <div className="col-sm-2">
                    <div
                      id="search_transfer_filter"
                      className="dataTables_filter"
                    >
                      {" "}
                      <label>
                        <h5 style={{ display: "inline" }}>
                          <i
                            className="fa fa-search srchWithinPg"
                            id="magnifier"
                            data-toggle="tooltip"
                            data-placement="top"
                            data-original-title="Search within this table"
                          />
                        </h5>
                        <input
                          type="search"
                          className="form-control input-sm"
                          placeholder
                          aria-controls="search_creadit_note"
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <div
                      className="doubleScroll-scroll-wrapper"
                      id="wrapper1"
                      style={{
                        height: "20px",
                        overflow: "scroll hidden",
                        width: "1320px",
                      }}
                    >
                      <div
                        className="suwala-doubleScroll-scroll"
                        style={{ height: "20px", width: "1320px" }}
                      />
                    </div>
                    <div id="wrapper2" style={{ overflow: "auto" }}>
                      <table
                        id="search_agents_table1"
                        className="table table-bordered   table-responsive alignTbl dataTable no-footer"
                        role="grid"
                        aria-describedby="search_agents_table1_info"
                      >
                        <thead>
                          <tr className="row_header" role="row">
                            <th
                              className="sorting"
                              tabIndex={0}
                              aria-controls="search_agents_table1"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Hotel
                                              
                                              
                                          : activate to sort column ascending"
                              style={{ width: "571.2px" }}
                            >
                              Hotel
                              {/*a to="javascript:callAjaxSubmit(0,' ORDER BY hotel_name ASC');" ><img  src="images/up_arrow.gif" alt="" border="0" height="5" width="9"></Link>
                                              <Link to="javascript:callAjaxSubmit(0,' ORDER BY hotel_name DESC');"><img  src="images/down_arrow.gif" alt="" border="0" height="5" width="9"></a*/}
                            </th>
                            <th
                              className="sorting"
                              tabIndex={0}
                              aria-controls="search_agents_table1"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="City
                                              
                                              
                                          : activate to sort column ascending"
                              style={{ width: "248.2px" }}
                            >
                              City
                              {/*a to="javascript:callAjaxSubmit(0,' ORDER BY city_name ASC');" ><img  src="images/up_arrow.gif" alt="" border="0" height="5" width="9"></Link>
                                              <Link to="javascript:callAjaxSubmit(0,' ORDER BY city_name DESC');"><img  src="images/down_arrow.gif" alt="" border="0" height="5" width="9"></a*/}
                            </th>
                            <th
                              className="numAlign sorting"
                              tabIndex={0}
                              aria-controls="search_agents_table1"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Nights
                                              
                                              
                                          : activate to sort column ascending"
                              style={{ width: "120.2px" }}
                            >
                              Nights
                              {/*a to="javascript:callAjaxSubmit(0,' ORDER BY total_nights ASC');" ><img  src="images/up_arrow.gif" alt="" border="0" height="5" width="9"></Link>
                                              <Link to="javascript:callAjaxSubmit(0,' ORDER BY total_nights DESC');"><img  src="images/down_arrow.gif" alt="" border="0" height="5" width="9"></a*/}
                            </th>
                            <th
                              className="numAlign sorting"
                              tabIndex={0}
                              aria-controls="search_agents_table1"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Gross Sales in USD
                                              
                                              
                                          : activate to sort column ascending"
                              style={{ width: "277.2px" }}
                            >
                              Gross Sales in USD
                              {/*a to="javascript:callAjaxSubmit(0,' ORDER BY total_business ASC');" ><img  src="images/up_arrow.gif" alt="" border="0" height="5" width="9"></Link>
                                              <Link to="javascript:callAjaxSubmit(0,' ORDER BY total_business DESC');"><img  src="images/down_arrow.gif" alt="" border="0" height="5" width="9"></a*/}
                            </th>
                            <th
                              className="no-sort sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Actions"
                              style={{ width: "118px" }}
                            >
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          <tr className="phps_row_1 odd" role="row">
                            {/*td height="20" align="center" class="brdr">1</td*/}
                            <td>
                              <Link
                                to="/tms/list_bookings.php?action_name=show_bookings&txt_city=Dubai&txt_hotel=THE ADDRESS DOWNTOWN HOTEL&check_out_from=&check_out_to=&booking_start_from=&booking_start_to=&max_results=25&sel_status=vouchered&view_summary=general&invoiced=yes"
                                target="_blank"
                              >
                                {" "}
                                THE ADDRESS DOWNTOWN HOTEL
                              </Link>
                            </td>
                            <td>Dubai</td>
                            <td className="numAlign">23</td>
                            <td className="numAlign">42269.74</td>
                            {/* <td>USD</td> */}
                            <td align="center">
                              <div className="iconCol">
                                <div
                                  className="input-group-addon text-center"
                                  data-toggle="tooltip"
                                  data-original-title="View Chart"
                                  data-placement="top"
                                >
                                  <Link>
                                    <i className="fa fa-bar-chart" />
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_0 even" role="row">
                            {/*td height="20" align="center" class="brdr">2</td*/}
                            <td>
                              <Link
                                to="/tms/list_bookings.php?action_name=show_bookings&txt_city=Dubai&txt_hotel=SWISSOTEL AL GHURAIR&check_out_from=&check_out_to=&booking_start_from=&booking_start_to=&max_results=25&sel_status=vouchered&view_summary=general&invoiced=yes"
                                target="_blank"
                              >
                                {" "}
                                SWISSOTEL AL GHURAIR
                              </Link>
                            </td>
                            <td>Dubai</td>
                            <td className="numAlign">40</td>
                            <td className="numAlign">27285.67</td>
                            {/* <td>USD</td> */}
                            <td align="center">
                              <div className="iconCol">
                                <div
                                  className="input-group-addon text-center"
                                  data-toggle="tooltip"
                                  data-original-title="View Chart"
                                  data-placement="top"
                                >
                                  <Link>
                                    <i className="fa fa-bar-chart" />
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_1 odd" role="row">
                            {/*td height="20" align="center" class="brdr">3</td*/}
                            <td>
                              <Link
                                to="/tms/list_bookings.php?action_name=show_bookings&txt_city=Abu Dhabi&txt_hotel=Al Diar Capital&check_out_from=&check_out_to=&booking_start_from=&booking_start_to=&max_results=25&sel_status=vouchered&view_summary=general&invoiced=yes"
                                target="_blank"
                              >
                                {" "}
                                Al Diar Capital
                              </Link>
                            </td>
                            <td>Abu Dhabi</td>
                            <td className="numAlign">3</td>
                            <td className="numAlign">14745.63</td>
                            {/* <td>USD</td> */}
                            <td align="center">
                              <div className="iconCol">
                                <div
                                  className="input-group-addon text-center"
                                  data-toggle="tooltip"
                                  data-original-title="View Chart"
                                  data-placement="top"
                                >
                                  <Link>
                                    <i className="fa fa-bar-chart" />
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_0 even" role="row">
                            {/*td height="20" align="center" class="brdr">4</td*/}
                            <td>
                              <Link
                                to="/tms/list_bookings.php?action_name=show_bookings&txt_city=Dubai&txt_hotel=DUBAI MARINE BEACH RESORT AND SPA&check_out_from=&check_out_to=&booking_start_from=&booking_start_to=&max_results=25&sel_status=vouchered&view_summary=general&invoiced=yes"
                                target="_blank"
                              >
                                {" "}
                                DUBAI MARINE BEACH RESORT AND SPA
                              </Link>
                            </td>
                            <td>Dubai</td>
                            <td className="numAlign">13</td>
                            <td className="numAlign">14602.64</td>
                            {/* <td>USD</td> */}
                            <td align="center">
                              <div className="iconCol">
                                <div
                                  className="input-group-addon text-center"
                                  data-toggle="tooltip"
                                  data-original-title="View Chart"
                                  data-placement="top"
                                >
                                  <Link>
                                    <i className="fa fa-bar-chart" />
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_1 odd" role="row">
                            {/*td height="20" align="center" class="brdr">5</td*/}
                            <td>
                              <Link
                                to="/tms/list_bookings.php?action_name=show_bookings&txt_city=dubai&txt_hotel=Royal Falcon Hotel&check_out_from=&check_out_to=&booking_start_from=&booking_start_to=&max_results=25&sel_status=vouchered&view_summary=general&invoiced=yes"
                                target="_blank"
                              >
                                {" "}
                                Royal Falcon Hotel
                              </Link>
                            </td>
                            <td>dubai</td>
                            <td className="numAlign">115</td>
                            <td className="numAlign">14352.49</td>
                            {/* <td>USD</td> */}
                            <td align="center">
                              <div className="iconCol">
                                <div
                                  className="input-group-addon text-center"
                                  data-toggle="tooltip"
                                  data-original-title="View Chart"
                                  data-placement="top"
                                >
                                  <Link>
                                    <i className="fa fa-bar-chart" />
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_0 even" role="row">
                            {/*td height="20" align="center" class="brdr">6</td*/}
                            <td>
                              <Link
                                to="/tms/list_bookings.php?action_name=show_bookings&txt_city=Dubai&txt_hotel=THE ADDRESS DUBAI MARINA&check_out_from=&check_out_to=&booking_start_from=&booking_start_to=&max_results=25&sel_status=vouchered&view_summary=general&invoiced=yes"
                                target="_blank"
                              >
                                {" "}
                                THE ADDRESS DUBAI MARINA
                              </Link>
                            </td>
                            <td>Dubai</td>
                            <td className="numAlign">11</td>
                            <td className="numAlign">14233.50</td>
                            {/* <td>USD</td> */}
                            <td align="center">
                              <div className="iconCol">
                                <div
                                  className="input-group-addon text-center"
                                  data-toggle="tooltip"
                                  data-original-title="View Chart"
                                  data-placement="top"
                                >
                                  <Link>
                                    <i className="fa fa-bar-chart" />
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_1 odd" role="row">
                            {/*td height="20" align="center" class="brdr">7</td*/}
                            <td>
                              <Link
                                to="/tms/list_bookings.php?action_name=show_bookings&txt_city=madinah&txt_hotel=Frontel Al Harithia Hotel&check_out_from=&check_out_to=&booking_start_from=&booking_start_to=&max_results=25&sel_status=vouchered&view_summary=general&invoiced=yes"
                                target="_blank"
                              >
                                {" "}
                                Frontel Al Harithia Hotel
                              </Link>
                            </td>
                            <td>madinah</td>
                            <td className="numAlign">1</td>
                            <td className="numAlign">10416.58</td>
                            {/* <td>USD</td> */}
                            <td align="center">
                              <div className="iconCol">
                                <div
                                  className="input-group-addon text-center"
                                  data-toggle="tooltip"
                                  data-original-title="View Chart"
                                  data-placement="top"
                                >
                                  <Link>
                                    <i className="fa fa-bar-chart" />
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_0 even" role="row">
                            {/*td height="20" align="center" class="brdr">8</td*/}
                            <td>
                              <Link
                                to="/tms/list_bookings.php?action_name=show_bookings&txt_city=Dubai&txt_hotel=ABC Arabian Suites&check_out_from=&check_out_to=&booking_start_from=&booking_start_to=&max_results=25&sel_status=vouchered&view_summary=general&invoiced=yes"
                                target="_blank"
                              >
                                {" "}
                                ABC Arabian Suites
                              </Link>
                            </td>
                            <td>Dubai</td>
                            <td className="numAlign">3</td>
                            <td className="numAlign">8368.10</td>
                            {/* <td>USD</td> */}
                            <td align="center">
                              <div className="iconCol">
                                <div
                                  className="input-group-addon text-center"
                                  data-toggle="tooltip"
                                  data-original-title="View Chart"
                                  data-placement="top"
                                >
                                  <Link>
                                    <i className="fa fa-bar-chart" />
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_1 odd" role="row">
                            {/*td height="20" align="center" class="brdr">9</td*/}
                            <td>
                              <Link
                                to="/tms/list_bookings.php?action_name=show_bookings&txt_city=dubai&txt_hotel=Metropolitan Hotel Dubai&check_out_from=&check_out_to=&booking_start_from=&booking_start_to=&max_results=25&sel_status=vouchered&view_summary=general&invoiced=yes"
                                target="_blank"
                              >
                                {" "}
                                Metropolitan Hotel Dubai
                              </Link>
                            </td>
                            <td>dubai</td>
                            <td className="numAlign">20</td>
                            <td className="numAlign">5316.07</td>
                            {/* <td>USD</td> */}
                            <td align="center">
                              <div className="iconCol">
                                <div
                                  className="input-group-addon text-center"
                                  data-toggle="tooltip"
                                  data-original-title="View Chart"
                                  data-placement="top"
                                >
                                  <Link>
                                    <i className="fa fa-bar-chart" />
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_0 even" role="row">
                            {/*td height="20" align="center" class="brdr">10</td*/}
                            <td>
                              <Link
                                to="/tms/list_bookings.php?action_name=show_bookings&txt_city=Dubai&txt_hotel=ARMANI HOTEL DUBAI&check_out_from=&check_out_to=&booking_start_from=&booking_start_to=&max_results=25&sel_status=vouchered&view_summary=general&invoiced=yes"
                                target="_blank"
                              >
                                {" "}
                                ARMANI HOTEL DUBAI
                              </Link>
                            </td>
                            <td>Dubai</td>
                            <td className="numAlign">1</td>
                            <td className="numAlign">5219.96</td>
                            {/* <td>USD</td> */}
                            <td align="center">
                              <div className="iconCol">
                                <div
                                  className="input-group-addon text-center"
                                  data-toggle="tooltip"
                                  data-original-title="View Chart"
                                  data-placement="top"
                                >
                                  <Link>
                                    <i className="fa fa-bar-chart" />
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_1 odd" role="row">
                            {/*td height="20" align="center" class="brdr">11</td*/}
                            <td>
                              <Link
                                to="/tms/list_bookings.php?action_name=show_bookings&txt_city=Dubai&txt_hotel=ATLANTIS THE PALM -TEST&check_out_from=&check_out_to=&booking_start_from=&booking_start_to=&max_results=25&sel_status=vouchered&view_summary=general&invoiced=yes"
                                target="_blank"
                              >
                                {" "}
                                ATLANTIS THE PALM -TEST
                              </Link>
                            </td>
                            <td>Dubai</td>
                            <td className="numAlign">2</td>
                            <td className="numAlign">4786.05</td>
                            {/* <td>USD</td> */}
                            <td align="center">
                              <div className="iconCol">
                                <div
                                  className="input-group-addon text-center"
                                  data-toggle="tooltip"
                                  data-original-title="View Chart"
                                  data-placement="top"
                                >
                                  <Link>
                                    <i className="fa fa-bar-chart" />
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_0 even" role="row">
                            {/*td height="20" align="center" class="brdr">12</td*/}
                            <td>
                              <Link
                                to="/tms/list_bookings.php?action_name=show_bookings&txt_city=dubai&txt_hotel=Al Khoory Hotel Apartments - Al Barsha&check_out_from=&check_out_to=&booking_start_from=&booking_start_to=&max_results=25&sel_status=vouchered&view_summary=general&invoiced=yes"
                                target="_blank"
                              >
                                {" "}
                                Al Khoory Hotel Apartments - Al Barsha
                              </Link>
                            </td>
                            <td>dubai</td>
                            <td className="numAlign">10</td>
                            <td className="numAlign">3494.25</td>
                            {/* <td>USD</td> */}
                            <td align="center">
                              <div className="iconCol">
                                <div
                                  className="input-group-addon text-center"
                                  data-toggle="tooltip"
                                  data-original-title="View Chart"
                                  data-placement="top"
                                >
                                  <Link>
                                    <i className="fa fa-bar-chart" />
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_1 odd" role="row">
                            {/*td height="20" align="center" class="brdr">13</td*/}
                            <td>
                              <Link
                                to="/tms/list_bookings.php?action_name=show_bookings&txt_city=dubai&txt_hotel=Aravi Dubai Ex Avari Hotel Dubai&check_out_from=&check_out_to=&booking_start_from=&booking_start_to=&max_results=25&sel_status=vouchered&view_summary=general&invoiced=yes"
                                target="_blank"
                              >
                                {" "}
                                Aravi Dubai Ex Avari Hotel Dubai
                              </Link>
                            </td>
                            <td>dubai</td>
                            <td className="numAlign">11</td>
                            <td className="numAlign">2599.39</td>
                            {/* <td>USD</td> */}
                            <td align="center">
                              <div className="iconCol">
                                <div
                                  className="input-group-addon text-center"
                                  data-toggle="tooltip"
                                  data-original-title="View Chart"
                                  data-placement="top"
                                >
                                  <Link>
                                    <i className="fa fa-bar-chart" />
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_0 even" role="row">
                            {/*td height="20" align="center" class="brdr">14</td*/}
                            <td>
                              <Link
                                to="/tms/list_bookings.php?action_name=show_bookings&txt_city=dubai&txt_hotel=Dubai Palm Hotel&check_out_from=&check_out_to=&booking_start_from=&booking_start_to=&max_results=25&sel_status=vouchered&view_summary=general&invoiced=yes"
                                target="_blank"
                              >
                                {" "}
                                Dubai Palm Hotel
                              </Link>
                            </td>
                            <td>dubai</td>
                            <td className="numAlign">25</td>
                            <td className="numAlign">2188.84</td>
                            {/* <td>USD</td> */}
                            <td align="center">
                              <div className="iconCol">
                                <div
                                  className="input-group-addon text-center"
                                  data-toggle="tooltip"
                                  data-original-title="View Chart"
                                  data-placement="top"
                                >
                                  <Link>
                                    <i className="fa fa-bar-chart" />
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_1 odd" role="row">
                            {/*td height="20" align="center" class="brdr">15</td*/}
                            <td>
                              <Link
                                to="/tms/list_bookings.php?action_name=show_bookings&txt_city=dubai&txt_hotel=BURJ ARAB DUBAI&check_out_from=&check_out_to=&booking_start_from=&booking_start_to=&max_results=25&sel_status=vouchered&view_summary=general&invoiced=yes"
                                target="_blank"
                              >
                                {" "}
                                BURJ ARAB DUBAI
                              </Link>
                            </td>
                            <td>dubai</td>
                            <td className="numAlign">3</td>
                            <td className="numAlign">1722.16</td>
                            {/* <td>USD</td> */}
                            <td align="center">
                              <div className="iconCol">
                                <div
                                  className="input-group-addon text-center"
                                  data-toggle="tooltip"
                                  data-original-title="View Chart"
                                  data-placement="top"
                                >
                                  <Link>
                                    <i className="fa fa-bar-chart" />
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_0 even" role="row">
                            {/*td height="20" align="center" class="brdr">16</td*/}
                            <td>
                              <Link
                                to="/tms/list_bookings.php?action_name=show_bookings&txt_city=dubai&txt_hotel=Lotus Grand Hotel Dubai&check_out_from=&check_out_to=&booking_start_from=&booking_start_to=&max_results=25&sel_status=vouchered&view_summary=general&invoiced=yes"
                                target="_blank"
                              >
                                {" "}
                                Lotus Grand Hotel Dubai
                              </Link>
                            </td>
                            <td>dubai</td>
                            <td className="numAlign">12</td>
                            <td className="numAlign">1574.87</td>
                            {/* <td>USD</td> */}
                            <td align="center">
                              <div className="iconCol">
                                <div
                                  className="input-group-addon text-center"
                                  data-toggle="tooltip"
                                  data-original-title="View Chart"
                                  data-placement="top"
                                >
                                  <Link>
                                    <i className="fa fa-bar-chart" />
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_1 odd" role="row">
                            {/*td height="20" align="center" class="brdr">17</td*/}
                            <td>
                              <Link
                                to="/tms/list_bookings.php?action_name=show_bookings&txt_city=dubai&txt_hotel=Carlton Al Barsha Hotel&check_out_from=&check_out_to=&booking_start_from=&booking_start_to=&max_results=25&sel_status=vouchered&view_summary=general&invoiced=yes"
                                target="_blank"
                              >
                                {" "}
                                Carlton Al Barsha Hotel
                              </Link>
                            </td>
                            <td>dubai</td>
                            <td className="numAlign">10</td>
                            <td className="numAlign">1566.84</td>
                            {/* <td>USD</td> */}
                            <td align="center">
                              <div className="iconCol">
                                <div
                                  className="input-group-addon text-center"
                                  data-toggle="tooltip"
                                  data-original-title="View Chart"
                                  data-placement="top"
                                >
                                  <Link>
                                    <i className="fa fa-bar-chart" />
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_0 even" role="row">
                            {/*td height="20" align="center" class="brdr">18</td*/}
                            <td>
                              <Link
                                to="/tms/list_bookings.php?action_name=show_bookings&txt_city=dubai&txt_hotel=Signature Inn Deira&check_out_from=&check_out_to=&booking_start_from=&booking_start_to=&max_results=25&sel_status=vouchered&view_summary=general&invoiced=yes"
                                target="_blank"
                              >
                                {" "}
                                Signature Inn Deira
                              </Link>
                            </td>
                            <td>dubai</td>
                            <td className="numAlign">5</td>
                            <td className="numAlign">1479.30</td>
                            {/* <td>USD</td> */}
                            <td align="center">
                              <div className="iconCol">
                                <div
                                  className="input-group-addon text-center"
                                  data-toggle="tooltip"
                                  data-original-title="View Chart"
                                  data-placement="top"
                                >
                                  <Link>
                                    <i className="fa fa-bar-chart" />
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_1 odd" role="row">
                            {/*td height="20" align="center" class="brdr">19</td*/}
                            <td>
                              <Link
                                to="/tms/list_bookings.php?action_name=show_bookings&txt_city=dubai&txt_hotel=Signature Inn&check_out_from=&check_out_to=&booking_start_from=&booking_start_to=&max_results=25&sel_status=vouchered&view_summary=general&invoiced=yes"
                                target="_blank"
                              >
                                {" "}
                                Signature Inn
                              </Link>
                            </td>
                            <td>dubai</td>
                            <td className="numAlign">13</td>
                            <td className="numAlign">1252.78</td>
                            {/* <td>USD</td> */}
                            <td align="center">
                              <div className="iconCol">
                                <div
                                  className="input-group-addon text-center"
                                  data-toggle="tooltip"
                                  data-original-title="View Chart"
                                  data-placement="top"
                                >
                                  <Link>
                                    <i className="fa fa-bar-chart" />
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_0 even" role="row">
                            {/*td height="20" align="center" class="brdr">20</td*/}
                            <td>
                              <Link
                                to="/tms/list_bookings.php?action_name=show_bookings&txt_city=bahrain&txt_hotel=Ramee Grand Hotel and Spa&check_out_from=&check_out_to=&booking_start_from=&booking_start_to=&max_results=25&sel_status=vouchered&view_summary=general&invoiced=yes"
                                target="_blank"
                              >
                                {" "}
                                Ramee Grand Hotel and Spa
                              </Link>
                            </td>
                            <td>bahrain</td>
                            <td className="numAlign">8</td>
                            <td className="numAlign">1043.39</td>
                            {/* <td>USD</td> */}
                            <td align="center">
                              <div className="iconCol">
                                <div
                                  className="input-group-addon text-center"
                                  data-toggle="tooltip"
                                  data-original-title="View Chart"
                                  data-placement="top"
                                >
                                  <Link>
                                    <i className="fa fa-bar-chart" />
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>

                          <tr className="phps_row_1 odd" role="row">
                            {/*td height="20" align="center" class="brdr">49</td*/}
                            <td>
                              <Link
                                to="/tms/list_bookings.php?action_name=show_bookings&txt_city=dubai&txt_hotel=Tulip Hotel Apartment&check_out_from=&check_out_to=&booking_start_from=&booking_start_to=&max_results=25&sel_status=vouchered&view_summary=general&invoiced=yes"
                                target="_blank"
                              >
                                {" "}
                                Tulip Hotel Apartment
                              </Link>
                            </td>
                            <td>dubai</td>
                            <td className="numAlign">2</td>
                            <td className="numAlign">98.07</td>
                            {/* <td>USD</td> */}
                            <td align="center">
                              <div className="iconCol">
                                <div
                                  className="input-group-addon text-center"
                                  data-toggle="tooltip"
                                  data-original-title="View Chart"
                                  data-placement="top"
                                >
                                  <Link>
                                    <i className="fa fa-bar-chart" />
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_0 even" role="row">
                            {/*td height="20" align="center" class="brdr">50</td*/}
                            <td>
                              <Link
                                to="/tms/list_bookings.php?action_name=show_bookings&txt_city=dubai&txt_hotel=Grand Central Hotel&check_out_from=&check_out_to=&booking_start_from=&booking_start_to=&max_results=25&sel_status=vouchered&view_summary=general&invoiced=yes"
                                target="_blank"
                              >
                                {" "}
                                Grand Central Hotel
                              </Link>
                            </td>
                            <td>dubai</td>
                            <td className="numAlign">2</td>
                            <td className="numAlign">95.73</td>
                            {/* <td>USD</td> */}
                            <td align="center">
                              <div className="iconCol">
                                <div
                                  className="input-group-addon text-center"
                                  data-toggle="tooltip"
                                  data-original-title="View Chart"
                                  data-placement="top"
                                >
                                  <Link>
                                    <i className="fa fa-bar-chart" />
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                        <tbody className="bg-white">
                          <tr
                            className="row_header"
                            style={{ backgroundColor: "#a09d9d" }}
                          >
                            <td>&nbsp;</td>
                            <td>
                              <h5
                                style={{
                                  fontSize: "12px",
                                  fontWeight: 500,
                                  color: "white",
                                }}
                              >
                                Total
                              </h5>
                            </td>
                            <td
                              className="numAlign"
                              style={{
                                fontSize: "12px",
                                fontWeight: 500,
                                color: "white",
                              }}
                            >
                              459
                            </td>
                            <td
                              className="numAlign"
                              style={{
                                fontSize: "12px",
                                fontWeight: 500,
                                color: "white",
                              }}
                            >
                              USD 187258.48
                            </td>
                            {/* <td>USD</td> */}
                            <td>&nbsp;</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-md-12">
                  <div
                    valign="top"
                    onclick="callAjaxSubmit(2,'');"
                    title="Click to download XL sheet "
                    className="btn btn-dark btn-sm form-group"
                  >
                    <i className="fa fa-download" />
                    &nbsp;Download Excel
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default ReportsManagementBusinessByHotel;
