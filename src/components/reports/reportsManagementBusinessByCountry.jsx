import Flatpickr from "react-flatpickr";
import React, { useState } from "react";
import Header2 from "../header2/header2";
import MultiSelect from "../reactMultiSelect";
import { countries } from "../../constants/Country-City-Data";

const selectedServiceOptions = [
  { label: "All", value: "all" },
  { label: "Hotel", value: "hotel" },
  { label: "Activity", value: "sightseeing" },
  { label: "Transfer", value: "transfer" },
  { label: "Misc", value: "misc" },
  { label: "Airline", value: "Airline" },
  { label: "Packages", value: "packages" },
  { label: "Visa", value: "visa" },
  { label: "Event", value: "event" },
  { label: "Offline", value: "offline" },
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

const agencyOptions = [
  { value: "", label: "Select Agency" },
  { value: "agency1", label: "Agency 1" },
  { value: "agency2", label: "Agency 2" },
  { value: "agency3", label: "Agency 3" },
  // Add more agency options as needed
];

const consultantOptions = [
  { value: "", label: "Select Consultant Name" },
  // Add more consultant options as needed
];

const ReportsManagementBusinessByCountry = () => {
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

  return (
    <>
      <Header2 title="COUNTRY WISE SALES REPORT" />
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
                  noOptionsMessage={() => "No Country Found"}
                />
              </div>

              <div className="form-group col-md-3">
                <label>Agency</label>
                <MultiSelect
                  options={agencyOptions}
                  isSearchable
                  placeholder=" Agency "
                  className="custom-select"
                  noOptionsMessage={() => "No Agency Found"}
                />
              </div>
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
                <label>Services</label>
                <MultiSelect
                  options={selectedServiceOptions}
                  isSearchable
                  placeholder="- All -"
                  className="custom-select"
                  noOptionsMessage={() => "No Services Found"}
                />
              </div>

              <div className="form-group col-md-3 mt-2">
                <label>Results per page</label>
                <MultiSelect
                  options={maxResultsOptions}
                  isSearchable
                  placeholder=" 50 "
                  className="custom-select"
                  noOptionsMessage={() => "No Results Found"}
                />
              </div>
              <div className="form-group col-md-3 mt-2">
                <label>Master Reference</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="reservation_id"
                  size={50}
                />
              </div>
              <div className="form-group col-md-3 mt-2">
                <label>Consultant Name</label>
                <MultiSelect
                  options={consultantOptions}
                  isSearchable
                  placeholder=" Select Consultant "
                  className="custom-select"
                  noOptionsMessage={() => "No Consultant Found"}
                />
              </div>
            </div>
            <div className="row mt-2">
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
                "\n                td a {\n                    color: black;\n                    text-decoration: none;\n                }\n\n                td a:hover {\n                    color: black !important;\n                    text-decoration: none !important;\n                }\n            ",
            }}
          />
          <div className="panel-body removeMargins">
            <div className="dataTables_scroll">
              <div className="row mt-2">
                <div className="col-md-5 col_hide">
                  <div className="col-md-12">
                    <a
                      className="btn btn-dark btn-sm form-group"
                      href="/tms/reports.php?run=1&report=city_wise_sales&sel_country=0&sel_city=0&sel_agent=&sel_agent_name=&sel_branch=&sel_selected_service=all&sel_max_results=50&reservation_id=&consultant_name=&booking_from_date=16-07-2023&booking_to_date=16-08-2023&service_from_date=16-07-2023&service_to_date=16-08-2023&sbt1=View+Report&download=1"
                    >
                      <i className="fa fa-download" />
                      &nbsp;Download Excel
                    </a>
                    &nbsp;&nbsp;
                    <a
                      className="btn btn-dark btn-sm form-group"
                      href="/tms/reports.php?run=1&report=city_wise_sales&sel_country=0&sel_city=0&sel_agent=&sel_agent_name=&sel_branch=&sel_selected_service=all&sel_max_results=50&reservation_id=&consultant_name=&booking_from_date=16-07-2023&booking_to_date=16-08-2023&service_from_date=16-07-2023&service_to_date=16-08-2023&sbt1=View+Report&print=1"
                      target="_blank"
                    >
                      <i className="fa fa-print" />
                      &nbsp;Print
                    </a>
                  </div>
                </div>
                <div className="col-md-5 col_hide">
                  <div className="form-group" />
                </div>
                <div className="col-md-2">
                  <style
                    dangerouslySetInnerHTML={{
                      __html:
                        "\n                                .table tr[visible='false'],\n                                .no-result {\n                                    display: none;\n                                    border: 1px solid #ddd;\n                                    padding: 10px;\n                                    margin-top: -2px;\n                                }\n\n                                .table tr[visible='true'] {\n                                    display: table-row;\n                                }\n\n                                .counter {\n                                    padding: 8px;\n                                    color: #ccc;\n                                }\n\n                                .search_new {\n                                    float: right;\n                                    height: 35px;\n                                    margin-bottom: 0px;\n                                    padding-left: 5px;\n                                }\n                            ",
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
              <div
                id="search_transfer_wrapper"
                className="dataTables_wrapper form-inline dt-bootstrap no-footer"
              >
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
                        className="table table-bordered   table-responsive dataTable"
                        style={{ width: "100%" }}
                        role="grid"
                        aria-describedby="search_agents_table1_info"
                      >
                        <thead>
                          <tr role="row">
                            <th
                              style={{
                                color: "rgb(255, 255, 255)",
                                fontWeight: 400,
                                fontSize: "12px",
                                padding: "7px",
                                width: "499.2px",
                              }}
                              className="row_header sorting"
                              tabIndex={0}
                              aria-controls="search_agents_table1"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="
                                                  
                                                  Country Name &nbsp;								
                                                      
                                                  &nbsp;
                                                  
                                                      
                                                  
                                                                          : activate to sort column ascending"
                            >
                              Country Name &nbsp;{" "}
                              <a href="/tms/reports.php?sbt1=View Report&service_to_date=16-08-2023&service_from_date=16-07-2023&booking_to_date=16-08-2023&booking_from_date=16-07-2023&consultant_name=&reservation_id=&sel_max_results=50&sel_selected_service=all&sel_branch=&sel_agent_name=&sel_agent=&sel_country=0&report=country_wise_sales&run=1&&sort_by=country_name&order=ASC&action_type=list_members"></a>
                              &nbsp;
                              <a href="/tms/reports.php?sbt1=View Report&service_to_date=16-08-2023&service_from_date=16-07-2023&booking_to_date=16-08-2023&booking_from_date=16-07-2023&consultant_name=&reservation_id=&sel_max_results=50&sel_selected_service=all&sel_branch=&sel_agent_name=&sel_agent=&sel_country=0&report=country_wise_sales&run=1&&sort_by=country_name&order=DESC&action_type=list_members"></a>
                            </th>
                            <th
                              style={{
                                color: "rgb(255, 255, 255)",
                                fontWeight: 400,
                                fontSize: "12px",
                                padding: "7px",
                                width: "686.2px",
                              }}
                              className="row_header     numeric-comma sorting"
                              tabIndex={0}
                              aria-controls="search_agents_table1"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="
                                                  
                                                  Gross Sale In Base Currency &nbsp;								
                                                      
                                                  &nbsp;
                                                  
                                                      
                                                  
                                                                          : activate to sort column ascending"
                            >
                              Gross Sale In Base Currency &nbsp;{" "}
                              <a href="/tms/reports.php?sbt1=View Report&service_to_date=16-08-2023&service_from_date=16-07-2023&booking_to_date=16-08-2023&booking_from_date=16-07-2023&consultant_name=&reservation_id=&sel_max_results=50&sel_selected_service=all&sel_branch=&sel_agent_name=&sel_agent=&sel_country=0&report=country_wise_sales&run=1&&sort_by=total_business&order=ASC&action_type=list_members"></a>
                              &nbsp;
                              <a href="/tms/reports.php?sbt1=View Report&service_to_date=16-08-2023&service_from_date=16-07-2023&booking_to_date=16-08-2023&booking_from_date=16-07-2023&consultant_name=&reservation_id=&sel_max_results=50&sel_selected_service=all&sel_branch=&sel_agent_name=&sel_agent=&sel_country=0&report=country_wise_sales&run=1&&sort_by=total_business&order=DESC&action_type=list_members"></a>
                            </th>
                            <th
                              style={{
                                color: "rgb(255, 255, 255)",
                                fontWeight: 400,
                                fontSize: "12px",
                                padding: "7px",
                                width: "263px",
                              }}
                              className="row_header   no-sort sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="
                                                  
                                                  Currency &nbsp;							"
                            >
                              Currency &nbsp;{" "}
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          <tr role="row" className="odd">
                            {/*  <td align="center" class="report_row1" align="center" style="border: 1px solid #9799a0;">1</td> */}
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row1 "
                              align="center"
                            >
                              Bahrain&nbsp;
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row1 "
                              align="right"
                            >
                              1043.385&nbsp;
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row1 "
                              align="center"
                            >
                              USD&nbsp;
                            </td>
                          </tr>
                          <tr role="row" className="even">
                            {/*  <td align="center" class="report_row2" align="center" style="border: 1px solid #9799a0;">2</td> */}
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row2 "
                              align="center"
                            >
                              India&nbsp;
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row2 "
                              align="right"
                            >
                              378.8&nbsp;
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row2 "
                              align="center"
                            >
                              USD&nbsp;
                            </td>
                          </tr>
                          <tr role="row" className="odd">
                            {/*  <td align="center" class="report_row1" align="center" style="border: 1px solid #9799a0;">3</td> */}
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row1 "
                              align="center"
                            >
                              Indonesia&nbsp;
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row1 "
                              align="right"
                            >
                              92.316&nbsp;
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row1 "
                              align="center"
                            >
                              USD&nbsp;
                            </td>
                          </tr>
                          <tr role="row" className="even">
                            {/*  <td align="center" class="report_row2" align="center" style="border: 1px solid #9799a0;">4</td> */}
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row2 "
                              align="center"
                            >
                              Saudi Arabia&nbsp;
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row2 "
                              align="right"
                            >
                              11068.882&nbsp;
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row2 "
                              align="center"
                            >
                              USD&nbsp;
                            </td>
                          </tr>
                          <tr role="row" className="odd">
                            {/*  <td align="center" class="report_row1" align="center" style="border: 1px solid #9799a0;">5</td> */}
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row1 "
                              align="center"
                            >
                              Thailand&nbsp;
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row1 "
                              align="right"
                            >
                              245.248&nbsp;
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row1 "
                              align="center"
                            >
                              USD&nbsp;
                            </td>
                          </tr>
                          <tr role="row" className="even">
                            {/*  <td align="center" class="report_row2" align="center" style="border: 1px solid #9799a0;">6</td> */}
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row2 "
                              align="center"
                            >
                              United Arab Emirates&nbsp;
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row2 "
                              align="right"
                            >
                              175604.754&nbsp;
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row2 "
                              align="center"
                            >
                              USD&nbsp;
                            </td>
                          </tr>
                        </tbody>
                        <tfoot>
                          <tr style={{ backgroundColor: "#a09d9d" }}>
                            <td
                              style={{
                                textAlign: "center",
                                padding: "7px",
                                fontSize: "13px",
                                color: "white",
                              }}
                              className="row_header"
                              rowSpan={1}
                              colSpan={1}
                            ></td>
                            <td
                              style={{
                                textAlign: "center",
                                padding: "7px",
                                fontSize: "13px",
                                color: "white",
                              }}
                              className="row_header"
                              rowSpan={1}
                              colSpan={1}
                            >
                              188433.385{" "}
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                padding: "7px",
                                fontSize: "13px",
                                color: "white",
                              }}
                              className="row_header"
                              rowSpan={1}
                              colSpan={1}
                            ></td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-md-12">
                  <a
                    className="btn btn-dark btn-sm form-group"
                    href="/tms/reports.php?run=1&report=city_wise_sales&sel_country=0&sel_city=0&sel_agent=&sel_agent_name=&sel_branch=&sel_selected_service=all&sel_max_results=50&reservation_id=&consultant_name=&booking_from_date=16-07-2023&booking_to_date=16-08-2023&service_from_date=16-07-2023&service_to_date=16-08-2023&sbt1=View+Report&download=1"
                  >
                    <i className="fa fa-download" />
                    &nbsp;Download Excel
                  </a>
                  &nbsp;&nbsp;
                  <a
                    className="btn btn-dark btn-sm form-group"
                    href="/tms/reports.php?run=1&report=city_wise_sales&sel_country=0&sel_city=0&sel_agent=&sel_agent_name=&sel_branch=&sel_selected_service=all&sel_max_results=50&reservation_id=&consultant_name=&booking_from_date=16-07-2023&booking_to_date=16-08-2023&service_from_date=16-07-2023&service_to_date=16-08-2023&sbt1=View+Report&print=1"
                    target="_blank"
                  >
                    <i className="fa fa-print" />
                    &nbsp;Print
                  </a>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default ReportsManagementBusinessByCountry;
