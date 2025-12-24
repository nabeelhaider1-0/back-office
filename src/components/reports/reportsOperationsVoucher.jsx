import { Link } from "react-router-dom";

import React, { useState } from "react";
import Flatpickr from "react-flatpickr";
import Header2 from "../header2/header2";
import MultiSelect from "../reactMultiSelect";
import Constants from "../../constants/routes";

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

const ReportsOperationsVoucher = () => {
  const [isFormVisible, setFormVisibility] = useState(false);

  const toggleFormVisibility = () => {
    setFormVisibility(!isFormVisible);
  };

  const [showBookingDate, setShowBookingDate] = useState(false);

  const toggleBookingDate = () => {
    setShowBookingDate(!showBookingDate);
  };

  const [showServiceDate, setShowserviceDate] = useState(false);

  const toggleServiceDate = () => {
    setShowserviceDate(!showServiceDate);
  };

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
      <Header2 title="VOUCHERS" />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <div>
          <form>
            <div className="panel-body">
              <div className="row">
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
                  <label>Booking No.</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="txt_booking_id"
                    size={50}
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
                  "\n                                @media print {}\n                            ",
              }}
            />

            <div className="row pd_tp">
              <div className="row mt-2">
                <div className="col-md-4">
                  <Link
                    className="btn btn-outline-secondary btn-sm leftTopBtn"
                    onclick="callAjaxSubmit('',1);"
                    title="Click to download XL sheet"
                  >
                    <i className="fa fa-download" />
                    &nbsp;Download Excel
                  </Link>
                  &nbsp;&nbsp;
                  <Link
                    className="btn btn-dark btn-sm leftTopBtn"
                    onClick={() => window.print()}
                    valign="top"
                    title="Click to print"
                  >
                    <i className="fa fa-print" />
                    &nbsp;Print
                  </Link>
                </div>
                <div className="col-md-6"></div>
                <div className="col-md-2 search_option">
                  <style
                    dangerouslySetInnerHTML={{
                      __html:
                        "\n                                            .table tr[visible='false'],\n                                            .no-result {\n                                                display: none;\n                                                border: 1px solid #ddd;\n                                                padding: 10px;\n                                                margin-top: -2px;\n                                            }\n\n                                            .table tr[visible='true'] {\n                                                display: table-row;\n                                            }\n\n                                            .counter {\n                                                padding: 8px;\n                                                color: #ccc;\n                                            }\n\n                                            .search_new {\n                                                float: right;\n                                                height: 35px;\n                                                margin-bottom: 0px;\n                                                padding-left: 5px;\n                                            }\n                                        ",
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
                style={{}}
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
                        width: "191.2px",
                      }}
                      className="row_header sorting"
                      tabIndex={0}
                      aria-controls="search_agents_table1"
                      rowSpan={1}
                      colSpan={1}
                      aria-label="
                                              
                                              Booking No. &nbsp;								
                                                  
                                              &nbsp;
                                              
                                                  
                                              
                                                                      : activate to sort column ascending"
                    >
                      Booking No. &nbsp;{" "}
                      <Link to="/tms/reports.php?sbt1=View Report&service_to_date=17-08-2023&service_from_date=17-07-2023&booking_to_date=17-08-2023&booking_from_date=17-07-2023&consultant_name=&reservation_id=&sel_max_results=50&sel_selected_service=all&txt_booking_id=&sel_branch=&sel_agent_name=&sel_agent=&report=voucher&run=1&&sort_by=id&order=ASC&action_type=list_members"></Link>
                      &nbsp;
                      <Link to="/tms/reports.php?sbt1=View Report&service_to_date=17-08-2023&service_from_date=17-07-2023&booking_to_date=17-08-2023&booking_from_date=17-07-2023&consultant_name=&reservation_id=&sel_max_results=50&sel_selected_service=all&txt_booking_id=&sel_branch=&sel_agent_name=&sel_agent=&report=voucher&run=1&&sort_by=id&order=DESC&action_type=list_members"></Link>
                    </th>
                    <th
                      style={{
                        color: "rgb(255, 255, 255)",
                        fontWeight: 400,
                        fontSize: "12px",
                        padding: "7px",
                        width: "209.2px",
                      }}
                      className="row_header sorting"
                      tabIndex={0}
                      aria-controls="search_agents_table1"
                      rowSpan={1}
                      colSpan={1}
                      aria-label="
                                              
                                              Booking Date &nbsp;								
                                                  
                                              &nbsp;
                                              
                                                  
                                              
                                                                      : activate to sort column ascending"
                    >
                      Booking Date &nbsp;{" "}
                      <Link to="/tms/reports.php?sbt1=View Report&service_to_date=17-08-2023&service_from_date=17-07-2023&booking_to_date=17-08-2023&booking_from_date=17-07-2023&consultant_name=&reservation_id=&sel_max_results=50&sel_selected_service=all&txt_booking_id=&sel_branch=&sel_agent_name=&sel_agent=&report=voucher&run=1&&sort_by=create_date&order=ASC&action_type=list_members"></Link>
                      &nbsp;
                      <Link to="/tms/reports.php?sbt1=View Report&service_to_date=17-08-2023&service_from_date=17-07-2023&booking_to_date=17-08-2023&booking_from_date=17-07-2023&consultant_name=&reservation_id=&sel_max_results=50&sel_selected_service=all&txt_booking_id=&sel_branch=&sel_agent_name=&sel_agent=&report=voucher&run=1&&sort_by=create_date&order=DESC&action_type=list_members"></Link>
                    </th>
                    <th
                      style={{
                        color: "rgb(255, 255, 255)",
                        fontWeight: 400,
                        fontSize: "12px",
                        padding: "7px",
                        width: "422.2px",
                      }}
                      className="row_header sorting"
                      tabIndex={0}
                      aria-controls="search_agents_table1"
                      rowSpan={1}
                      colSpan={1}
                      aria-label="
                                              
                                              Passenger &nbsp;								
                                                  
                                              &nbsp;
                                              
                                                  
                                              
                                                                      : activate to sort column ascending"
                    >
                      Passenger &nbsp;{" "}
                      <Link to="/tms/reports.php?sbt1=View Report&service_to_date=17-08-2023&service_from_date=17-07-2023&booking_to_date=17-08-2023&booking_from_date=17-07-2023&consultant_name=&reservation_id=&sel_max_results=50&sel_selected_service=all&txt_booking_id=&sel_branch=&sel_agent_name=&sel_agent=&report=voucher&run=1&&sort_by=pax_name&order=ASC&action_type=list_members"></Link>
                      &nbsp;
                      <Link to="/tms/reports.php?sbt1=View Report&service_to_date=17-08-2023&service_from_date=17-07-2023&booking_to_date=17-08-2023&booking_from_date=17-07-2023&consultant_name=&reservation_id=&sel_max_results=50&sel_selected_service=all&txt_booking_id=&sel_branch=&sel_agent_name=&sel_agent=&report=voucher&run=1&&sort_by=pax_name&order=DESC&action_type=list_members"></Link>
                    </th>
                    <th
                      style={{
                        color: "rgb(255, 255, 255)",
                        fontWeight: 400,
                        fontSize: "12px",
                        padding: "7px",
                        width: "171.2px",
                      }}
                      className="row_header sorting"
                      tabIndex={0}
                      aria-controls="search_agents_table1"
                      rowSpan={1}
                      colSpan={1}
                      aria-label="
                                              
                                              Check In &nbsp;								
                                                  
                                              &nbsp;
                                              
                                                  
                                              
                                                                      : activate to sort column ascending"
                    >
                      Check In &nbsp;{" "}
                      <Link to="/tms/reports.php?sbt1=View Report&service_to_date=17-08-2023&service_from_date=17-07-2023&booking_to_date=17-08-2023&booking_from_date=17-07-2023&consultant_name=&reservation_id=&sel_max_results=50&sel_selected_service=all&txt_booking_id=&sel_branch=&sel_agent_name=&sel_agent=&report=voucher&run=1&&sort_by=arrival_date&order=ASC&action_type=list_members"></Link>
                      &nbsp;
                      <Link to="/tms/reports.php?sbt1=View Report&service_to_date=17-08-2023&service_from_date=17-07-2023&booking_to_date=17-08-2023&booking_from_date=17-07-2023&consultant_name=&reservation_id=&sel_max_results=50&sel_selected_service=all&txt_booking_id=&sel_branch=&sel_agent_name=&sel_agent=&report=voucher&run=1&&sort_by=arrival_date&order=DESC&action_type=list_members"></Link>
                    </th>
                    <th
                      style={{
                        color: "rgb(255, 255, 255)",
                        fontWeight: 400,
                        fontSize: "12px",
                        padding: "7px",
                        width: "142.2px",
                      }}
                      className="row_header       numeric-comma sorting"
                      tabIndex={0}
                      aria-controls="search_agents_table1"
                      rowSpan={1}
                      colSpan={1}
                      aria-label="
                                              
                                              Amount &nbsp;								
                                                  
                                              &nbsp;
                                              
                                                  
                                              
                                                                      : activate to sort column ascending"
                    >
                      Amount &nbsp;{" "}
                      <Link to="/tms/reports.php?sbt1=View Report&service_to_date=17-08-2023&service_from_date=17-07-2023&booking_to_date=17-08-2023&booking_from_date=17-07-2023&consultant_name=&reservation_id=&sel_max_results=50&sel_selected_service=all&txt_booking_id=&sel_branch=&sel_agent_name=&sel_agent=&report=voucher&run=1&&sort_by=display_room_rate&order=ASC&action_type=list_members"></Link>
                      &nbsp;
                      <Link to="/tms/reports.php?sbt1=View Report&service_to_date=17-08-2023&service_from_date=17-07-2023&booking_to_date=17-08-2023&booking_from_date=17-07-2023&consultant_name=&reservation_id=&sel_max_results=50&sel_selected_service=all&txt_booking_id=&sel_branch=&sel_agent_name=&sel_agent=&report=voucher&run=1&&sort_by=display_room_rate&order=DESC&action_type=list_members"></Link>
                    </th>
                    <th
                      style={{
                        color: "rgb(255, 255, 255)",
                        fontWeight: 400,
                        fontSize: "12px",
                        padding: "7px",
                        width: "155.2px",
                      }}
                      className="row_header   no-sort sorting_disabled"
                      rowSpan={1}
                      colSpan={1}
                      aria-label="
                                              
                                              Currency &nbsp;							"
                    >
                      Currency &nbsp;{" "}
                    </th>
                    <th
                      style={{
                        color: "rgb(255, 255, 255)",
                        fontWeight: 400,
                        fontSize: "12px",
                        padding: "7px",
                        width: "100px",
                      }}
                      className="row_header nonprintable  no-sort sorting_disabled"
                      rowSpan={1}
                      colSpan={1}
                      aria-label="
                                              
                                              Print &nbsp;							"
                    >
                      Print &nbsp;{" "}
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
                      align="left"
                    >
                      TD200014&nbsp;
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
                      06 Dec 2017&nbsp;
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
                      Mr asmi test &nbsp;
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
                      29 Dec 2017&nbsp;
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
                      450&nbsp;
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
                      SAR&nbsp;
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row1 nonprintable"
                      align="center"
                    >
                      <div className="iconCol">
                        <div
                          data-toggle="tooltip"
                          data-original-title="Print"
                          data-placement="top"
                          className="input-group-addon"
                        >
                          {" "}
                          <Link
                            target="blank"
                            to={
                              Constants.URLConstants
                                .REPORTSOPERATIONSVOUCHERPRINT
                            }
                          >
                            <i className="fa fa-print" />{" "}
                          </Link>
                        </div>
                      </div>
                      &nbsp;
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
                      align="left"
                    >
                      191&nbsp;
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
                      17 Jan 2018&nbsp;
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
                      Mr Amitabh Bachchan &nbsp;
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
                      30 Jan 2018&nbsp;
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
                      27.56&nbsp;
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
                      USD&nbsp;
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row2 nonprintable"
                      align="center"
                    >
                      <div className="iconCol">
                        <div
                          data-toggle="tooltip"
                          data-original-title="Print"
                          data-placement="top"
                          className="input-group-addon"
                        >
                          {" "}
                          <Link to="#">
                            <i className="fa fa-print" />{" "}
                          </Link>
                        </div>
                      </div>
                      &nbsp;
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
                      align="left"
                    >
                      TD000304&nbsp;
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
                      21 Feb 2018&nbsp;
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
                      Mr asmi test &nbsp;
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
                      01 Nov 2017&nbsp;
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
                      4429.37&nbsp;
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
                      INR&nbsp;
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row1 nonprintable"
                      align="center"
                    >
                      <div className="iconCol">
                        <div
                          data-toggle="tooltip"
                          data-original-title="Print"
                          data-placement="top"
                          className="input-group-addon"
                        >
                          {" "}
                          <Link to="#">
                            <i className="fa fa-print" />{" "}
                          </Link>
                        </div>
                      </div>
                      &nbsp;
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
                      align="left"
                    >
                      TD000306&nbsp;
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
                      21 Feb 2018&nbsp;
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
                      Mr asmi test &nbsp;
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
                      01 Nov 2017&nbsp;
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
                      9638.09&nbsp;
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
                      INR&nbsp;
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row2 nonprintable"
                      align="center"
                    >
                      <div className="iconCol">
                        <div
                          data-toggle="tooltip"
                          data-original-title="Print"
                          data-placement="top"
                          className="input-group-addon"
                        >
                          {" "}
                          <Link
                            to="#"
                            // onclick="javascript:window.open('/print_voucher.php?voucher=yes&code=f309179f85fadcae869ec5a96330c39053136306','printvoucher_hotel','width=1200,height=1200,scrollbars=yes,resizable=1')"
                          >
                            <i className="fa fa-print" />{" "}
                          </Link>
                        </div>
                      </div>
                      &nbsp;
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
                      align="left"
                    >
                      TD000308&nbsp;
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
                      21 Feb 2018&nbsp;
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
                      Mr asmi test &nbsp;
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
                      01 Nov 2017&nbsp;
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
                      3139.32&nbsp;
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
                      INR&nbsp;
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row1 nonprintable"
                      align="center"
                    >
                      <div className="iconCol">
                        <div
                          data-toggle="tooltip"
                          data-original-title="Print"
                          data-placement="top"
                          className="input-group-addon"
                        >
                          {" "}
                          <Link to="#">
                            <i className="fa fa-print" />{" "}
                          </Link>
                        </div>
                      </div>
                      &nbsp;
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
                      align="left"
                    >
                      TD000309&nbsp;
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
                      21 Feb 2018&nbsp;
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
                      Mr asmi test &nbsp;
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
                      01 Nov 2017&nbsp;
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
                      3892.01&nbsp;
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
                      INR&nbsp;
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row2 nonprintable"
                      align="center"
                    >
                      <div className="iconCol">
                        <div
                          data-toggle="tooltip"
                          data-original-title="Print"
                          data-placement="top"
                          className="input-group-addon"
                        >
                          {" "}
                          <Link to="#">
                            <i className="fa fa-print" />{" "}
                          </Link>
                        </div>
                      </div>
                      &nbsp;
                    </td>
                  </tr>
                  <tr role="row" className="odd">
                    {/*  <td align="center" class="report_row1" align="center" style="border: 1px solid #9799a0;">7</td> */}
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row1 "
                      align="left"
                    >
                      TD000310&nbsp;
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
                      21 Feb 2018&nbsp;
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
                      Mr asmi test &nbsp;
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
                      01 Nov 2017&nbsp;
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
                      3139.32&nbsp;
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
                      INR&nbsp;
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row1 nonprintable"
                      align="center"
                    >
                      <div className="iconCol">
                        <div
                          data-toggle="tooltip"
                          data-original-title="Print"
                          data-placement="top"
                          className="input-group-addon"
                        >
                          {" "}
                          <Link to="#">
                            <i className="fa fa-print" />{" "}
                          </Link>
                        </div>
                      </div>
                      &nbsp;
                    </td>
                  </tr>
                  <tr role="row" className="even">
                    {/*  <td align="center" class="report_row2" align="center" style="border: 1px solid #9799a0;">8</td> */}
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row2 "
                      align="left"
                    >
                      TD000312&nbsp;
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
                      21 Feb 2018&nbsp;
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
                      Mr asmi test &nbsp;
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
                      01 Nov 2017&nbsp;
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
                      4592.07&nbsp;
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
                      INR&nbsp;
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row2 nonprintable"
                      align="center"
                    >
                      <div className="iconCol">
                        <div
                          data-toggle="tooltip"
                          data-original-title="Print"
                          data-placement="top"
                          className="input-group-addon"
                        >
                          {" "}
                          <Link to="#">
                            <i className="fa fa-print" />{" "}
                          </Link>
                        </div>
                      </div>
                      &nbsp;
                    </td>
                  </tr>
                  <tr role="row" className="odd">
                    {/*  <td align="center" class="report_row1" align="center" style="border: 1px solid #9799a0;">9</td> */}
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row1 "
                      align="left"
                    >
                      TD000313&nbsp;
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
                      21 Feb 2018&nbsp;
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
                      Mr asmi test &nbsp;
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
                      01 Nov 2017&nbsp;
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
                      4018.49&nbsp;
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
                      INR&nbsp;
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row1 nonprintable"
                      align="center"
                    >
                      <div className="iconCol">
                        <div
                          data-toggle="tooltip"
                          data-original-title="Print"
                          data-placement="top"
                          className="input-group-addon"
                        >
                          {" "}
                          <Link to="#">
                            <i className="fa fa-print" />{" "}
                          </Link>
                        </div>
                      </div>
                      &nbsp;
                    </td>
                  </tr>
                  <tr role="row" className="even">
                    {/*  <td align="center" class="report_row2" align="center" style="border: 1px solid #9799a0;">10</td> */}
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row2 "
                      align="left"
                    >
                      TD000316&nbsp;
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
                      22 Feb 2018&nbsp;
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
                      Mr asmi test &nbsp;
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
                      01 Nov 2017&nbsp;
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
                      4535.33&nbsp;
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
                      INR&nbsp;
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row2 nonprintable"
                      align="center"
                    >
                      <div className="iconCol">
                        <div
                          data-toggle="tooltip"
                          data-original-title="Print"
                          data-placement="top"
                          className="input-group-addon"
                        >
                          {" "}
                          <Link to="#">
                            <i className="fa fa-print" />{" "}
                          </Link>
                        </div>
                      </div>
                      &nbsp;
                    </td>
                  </tr>
                  <tr role="row" className="odd">
                    {/*  <td align="center" class="report_row1" align="center" style="border: 1px solid #9799a0;">11</td> */}
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row1 "
                      align="left"
                    >
                      TD000318&nbsp;
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
                      22 Feb 2018&nbsp;
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
                      Mr asmi test &nbsp;
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
                      01 Nov 2017&nbsp;
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
                      4852.11&nbsp;
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
                      INR&nbsp;
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row1 nonprintable"
                      align="center"
                    >
                      <div className="iconCol">
                        <div
                          data-toggle="tooltip"
                          data-original-title="Print"
                          data-placement="top"
                          className="input-group-addon"
                        >
                          {" "}
                          <Link to="#">
                            <i className="fa fa-print" />{" "}
                          </Link>
                        </div>
                      </div>
                      &nbsp;
                    </td>
                  </tr>
                  <tr role="row" className="even">
                    {/*  <td align="center" class="report_row2" align="center" style="border: 1px solid #9799a0;">12</td> */}
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row2 "
                      align="left"
                    >
                      TD000319&nbsp;
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
                      22 Feb 2018&nbsp;
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
                      Mr asmi test &nbsp;
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
                      02 May 2018&nbsp;
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
                      4429.37&nbsp;
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
                      INR&nbsp;
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row2 nonprintable"
                      align="center"
                    >
                      <div className="iconCol">
                        <div
                          data-toggle="tooltip"
                          data-original-title="Print"
                          data-placement="top"
                          className="input-group-addon"
                        >
                          {" "}
                          <Link to="#">
                            <i className="fa fa-print" />{" "}
                          </Link>
                        </div>
                      </div>
                      &nbsp;
                    </td>
                  </tr>
                  <tr role="row" className="odd">
                    {/*  <td align="center" class="report_row1" align="center" style="border: 1px solid #9799a0;">13</td> */}
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row1 "
                      align="left"
                    >
                      TD000321&nbsp;
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
                      22 Feb 2018&nbsp;
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
                      Mr asmi test &nbsp;
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
                      02 May 2018&nbsp;
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
                      4429.37&nbsp;
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
                      INR&nbsp;
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row1 nonprintable"
                      align="center"
                    >
                      <div className="iconCol">
                        <div
                          data-toggle="tooltip"
                          data-original-title="Print"
                          data-placement="top"
                          className="input-group-addon"
                        >
                          {" "}
                          <Link to="#">
                            <i className="fa fa-print" />{" "}
                          </Link>
                        </div>
                      </div>
                      &nbsp;
                    </td>
                  </tr>
                  <tr role="row" className="even">
                    {/*  <td align="center" class="report_row2" align="center" style="border: 1px solid #9799a0;">14</td> */}
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row2 "
                      align="left"
                    >
                      TD000323&nbsp;
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
                      22 Feb 2018&nbsp;
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
                      Mr asmi test &nbsp;
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
                      02 May 2018&nbsp;
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
                      4429.37&nbsp;
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
                      INR&nbsp;
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row2 nonprintable"
                      align="center"
                    >
                      <div className="iconCol">
                        <div
                          data-toggle="tooltip"
                          data-original-title="Print"
                          data-placement="top"
                          className="input-group-addon"
                        >
                          {" "}
                          <Link to="#">
                            <i className="fa fa-print" />{" "}
                          </Link>
                        </div>
                      </div>
                      &nbsp;
                    </td>
                  </tr>
                  <tr role="row" className="odd">
                    {/*  <td align="center" class="report_row1" align="center" style="border: 1px solid #9799a0;">15</td> */}
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row1 "
                      align="left"
                    >
                      TD000325&nbsp;
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
                      22 Feb 2018&nbsp;
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
                      Mr asmi test &nbsp;
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
                      01 Nov 2017&nbsp;
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
                      4429.37&nbsp;
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
                      INR&nbsp;
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row1 nonprintable"
                      align="center"
                    >
                      <div className="iconCol">
                        <div
                          data-toggle="tooltip"
                          data-original-title="Print"
                          data-placement="top"
                          className="input-group-addon"
                        >
                          {" "}
                          <Link to="#">
                            <i className="fa fa-print" />{" "}
                          </Link>
                        </div>
                      </div>
                      &nbsp;
                    </td>
                  </tr>
                  <tr role="row" className="even">
                    {/*  <td align="center" class="report_row2" align="center" style="border: 1px solid #9799a0;">16</td> */}
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row2 "
                      align="left"
                    >
                      TD000327&nbsp;
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
                      22 Feb 2018&nbsp;
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
                      Mr asmi test &nbsp;
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
                      01 Nov 2017&nbsp;
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
                      4429.37&nbsp;
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
                      INR&nbsp;
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row2 nonprintable"
                      align="center"
                    >
                      <div className="iconCol">
                        <div
                          data-toggle="tooltip"
                          data-original-title="Print"
                          data-placement="top"
                          className="input-group-addon"
                        >
                          {" "}
                          <Link to="#">
                            <i className="fa fa-print" />{" "}
                          </Link>
                        </div>
                      </div>
                      &nbsp;
                    </td>
                  </tr>
                  <tr role="row" className="odd">
                    {/*  <td align="center" class="report_row1" align="center" style="border: 1px solid #9799a0;">17</td> */}
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row1 "
                      align="left"
                    >
                      TD000335&nbsp;
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
                      23 Feb 2018&nbsp;
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
                      Mr asmi test &nbsp;
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
                      01 Nov 2017&nbsp;
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
                      3139.32&nbsp;
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
                      INR&nbsp;
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row1 nonprintable"
                      align="center"
                    >
                      <div className="iconCol">
                        <div
                          data-toggle="tooltip"
                          data-original-title="Print"
                          data-placement="top"
                          className="input-group-addon"
                        >
                          {" "}
                          <Link to="#">
                            <i className="fa fa-print" />{" "}
                          </Link>
                        </div>
                      </div>
                      &nbsp;
                    </td>
                  </tr>
                  <tr role="row" className="even">
                    {/*  <td align="center" class="report_row2" align="center" style="border: 1px solid #9799a0;">18</td> */}
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row2 "
                      align="left"
                    >
                      TD1200339&nbsp;
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
                      24 Feb 2018&nbsp;
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
                      Ms Mansi test &nbsp;
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
                      07 Mar 2018&nbsp;
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
                      52.59&nbsp;
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
                      USD&nbsp;
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row2 nonprintable"
                      align="center"
                    >
                      <div className="iconCol">
                        <div
                          data-toggle="tooltip"
                          data-original-title="Print"
                          data-placement="top"
                          className="input-group-addon"
                        >
                          {" "}
                          <Link to="#">
                            <i className="fa fa-print" />{" "}
                          </Link>
                        </div>
                      </div>
                      &nbsp;
                    </td>
                  </tr>
                  <tr role="row" className="odd">
                    {/*  <td align="center" class="report_row1" align="center" style="border: 1px solid #9799a0;">19</td> */}
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row1 "
                      align="left"
                    >
                      TD000340&nbsp;
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
                      26 Feb 2018&nbsp;
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
                      Mr abcd xyz &nbsp;
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
                      03 Apr 2018&nbsp;
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
                      4409.09&nbsp;
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
                      INR&nbsp;
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row1 nonprintable"
                      align="center"
                    >
                      <div className="iconCol">
                        <div
                          data-toggle="tooltip"
                          data-original-title="Print"
                          data-placement="top"
                          className="input-group-addon"
                        >
                          {" "}
                          <Link to="#">
                            <i className="fa fa-print" />{" "}
                          </Link>
                        </div>
                      </div>
                      &nbsp;
                    </td>
                  </tr>
                  <tr role="row" className="even">
                    {/*  <td align="center" class="report_row2" align="center" style="border: 1px solid #9799a0;">20</td> */}
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row2 "
                      align="left"
                    >
                      TD1200342&nbsp;
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
                      27 Feb 2018&nbsp;
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
                      Ms Mansi test &nbsp;
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
                      10 Mar 2018&nbsp;
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
                      49.97&nbsp;
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
                      USD&nbsp;
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row2 nonprintable"
                      align="center"
                    >
                      <div className="iconCol">
                        <div
                          data-toggle="tooltip"
                          data-original-title="Print"
                          data-placement="top"
                          className="input-group-addon"
                        >
                          {" "}
                          <Link to="#">
                            <i className="fa fa-print" />{" "}
                          </Link>
                        </div>
                      </div>
                      &nbsp;
                    </td>
                  </tr>
                  <tr role="row" className="odd">
                    {/*  <td align="center" class="report_row1" align="center" style="border: 1px solid #9799a0;">21</td> */}
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row1 "
                      align="left"
                    >
                      TD000343&nbsp;
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
                      27 Feb 2018&nbsp;
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
                      Mr asmi test &nbsp;
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
                      01 May 2018&nbsp;
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
                      3000&nbsp;
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
                      INR&nbsp;
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row1 nonprintable"
                      align="center"
                    >
                      <div className="iconCol">
                        <div
                          data-toggle="tooltip"
                          data-original-title="Print"
                          data-placement="top"
                          className="input-group-addon"
                        >
                          {" "}
                          <Link to="#">
                            <i className="fa fa-print" />{" "}
                          </Link>
                        </div>
                      </div>
                      &nbsp;
                    </td>
                  </tr>
                  <tr role="row" className="even">
                    {/*  <td align="center" class="report_row2" align="center" style="border: 1px solid #9799a0;">22</td> */}
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row2 "
                      align="left"
                    >
                      TD000344&nbsp;
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
                      27 Feb 2018&nbsp;
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
                      Mr asmi test &nbsp;
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
                      01 Jun 2018&nbsp;
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
                      3000&nbsp;
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
                      INR&nbsp;
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row2 nonprintable"
                      align="center"
                    >
                      <div className="iconCol">
                        <div
                          data-toggle="tooltip"
                          data-original-title="Print"
                          data-placement="top"
                          className="input-group-addon"
                        >
                          {" "}
                          <Link to="#">
                            <i className="fa fa-print" />{" "}
                          </Link>
                        </div>
                      </div>
                      &nbsp;
                    </td>
                  </tr>
                  <tr role="row" className="odd">
                    {/*  <td align="center" class="report_row1" align="center" style="border: 1px solid #9799a0;">23</td> */}
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row1 "
                      align="left"
                    >
                      TD000349&nbsp;
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
                      09 Mar 2018&nbsp;
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
                      Mr nnnn nnnn &nbsp;
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
                      09 Mar 2018&nbsp;
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
                      19803.66&nbsp;
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
                      INR&nbsp;
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row1 nonprintable"
                      align="center"
                    >
                      <div className="iconCol">
                        <div
                          data-toggle="tooltip"
                          data-original-title="Print"
                          data-placement="top"
                          className="input-group-addon"
                        >
                          {" "}
                          <Link
                            to="#"
                            // onclick="javascript:window.open('/print_voucher.php?voucher=yes&code=ae110465c728714f7cadc0f2ec331c2c29771349','printvoucher_hotel','width=1200,height=1200,scrollbars=yes,resizable=1')"
                          >
                            <i className="fa fa-print" />{" "}
                          </Link>
                        </div>
                      </div>
                      &nbsp;
                    </td>
                  </tr>
                  <tr role="row" className="even">
                    {/*  <td align="center" class="report_row2" align="center" style="border: 1px solid #9799a0;">24</td> */}
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row2 "
                      align="left"
                    >
                      TD200350&nbsp;
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
                      10 Mar 2018&nbsp;
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
                      Mr Allwin QtechTest &nbsp;
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
                      19 Apr 2018&nbsp;
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
                      25.34&nbsp;
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
                      USD&nbsp;
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row2 nonprintable"
                      align="center"
                    >
                      <div className="iconCol">
                        <div
                          data-toggle="tooltip"
                          data-original-title="Print"
                          data-placement="top"
                          className="input-group-addon"
                        >
                          {" "}
                          <Link to="#">
                            <i className="fa fa-print" />{" "}
                          </Link>
                        </div>
                      </div>
                      &nbsp;
                    </td>
                  </tr>
                  <tr role="row" className="odd">
                    {/*  <td align="center" class="report_row1" align="center" style="border: 1px solid #9799a0;">25</td> */}
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row1 "
                      align="left"
                    >
                      TD000355&nbsp;
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
                      14 Mar 2018&nbsp;
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
                      Mr RRRR RRRR &nbsp;
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
                      14 Mar 2018&nbsp;
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
                      4113.6&nbsp;
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
                      INR&nbsp;
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row1 nonprintable"
                      align="center"
                    >
                      <div className="iconCol">
                        <div
                          data-toggle="tooltip"
                          data-original-title="Print"
                          data-placement="top"
                          className="input-group-addon"
                        >
                          {" "}
                          <Link to="#">
                            <i className="fa fa-print" />{" "}
                          </Link>
                        </div>
                      </div>
                      &nbsp;
                    </td>
                  </tr>
                  <tr role="row" className="even">
                    {/*  <td align="center" class="report_row2" align="center" style="border: 1px solid #9799a0;">26</td> */}
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row2 "
                      align="left"
                    >
                      TD000356&nbsp;
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
                      14 Mar 2018&nbsp;
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
                      Mr rrrr rrrr &nbsp;
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
                      14 Mar 2018&nbsp;
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
                      16164.5&nbsp;
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
                      INR&nbsp;
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row2 nonprintable"
                      align="center"
                    >
                      <div className="iconCol">
                        <div
                          data-toggle="tooltip"
                          data-original-title="Print"
                          data-placement="top"
                          className="input-group-addon"
                        >
                          {" "}
                          <Link to="#">
                            <i className="fa fa-print" />{" "}
                          </Link>
                        </div>
                      </div>
                      &nbsp;
                    </td>
                  </tr>
                  <tr role="row" className="odd">
                    {/*  <td align="center" class="report_row1" align="center" style="border: 1px solid #9799a0;">27</td> */}
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row1 "
                      align="left"
                    >
                      TD900360&nbsp;
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
                      19 Mar 2018&nbsp;
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
                      asmita &nbsp;
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
                      19 Jun 2018&nbsp;
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
                      1076.35&nbsp;
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
                      INR&nbsp;
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row1 nonprintable"
                      align="center"
                    >
                      <div className="iconCol">
                        <div
                          data-toggle="tooltip"
                          data-original-title="Print"
                          data-placement="top"
                          className="input-group-addon"
                        >
                          {" "}
                          <Link
                            to="#"
                            // onclick="javascript:window.open('/print_voucher_transfer.php?voucher=yes&code=73e11f37490f881d7895edca1fa414b563968360','printvoucher_transfer','width=1200,height=1200,scrollbars=yes,resizable=1')"
                          >
                            <i className="fa fa-print" />{" "}
                          </Link>
                        </div>
                      </div>
                      &nbsp;
                    </td>
                  </tr>
                  <tr role="row" className="even">
                    {/*  <td align="center" class="report_row2" align="center" style="border: 1px solid #9799a0;">28</td> */}
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row2 "
                      align="left"
                    >
                      TD900362&nbsp;
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
                      19 Mar 2018&nbsp;
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
                      asmita &nbsp;
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
                      01 Jun 2018&nbsp;
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
                      789.81&nbsp;
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
                      INR&nbsp;
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row2 nonprintable"
                      align="center"
                    >
                      <div className="iconCol">
                        <div
                          data-toggle="tooltip"
                          data-original-title="Print"
                          data-placement="top"
                          className="input-group-addon"
                        >
                          {" "}
                          <Link to="#">
                            <i className="fa fa-print" />{" "}
                          </Link>
                        </div>
                      </div>
                      &nbsp;
                    </td>
                  </tr>
                  <tr role="row" className="odd">
                    {/*  <td align="center" class="report_row1" align="center" style="border: 1px solid #9799a0;">29</td> */}
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row1 "
                      align="left"
                    >
                      TD000365&nbsp;
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
                      20 Mar 2018&nbsp;
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
                      Mr zazszs zszazs &nbsp;
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
                      20 Mar 2018&nbsp;
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
                      8065.19&nbsp;
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
                      INR&nbsp;
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row1 nonprintable"
                      align="center"
                    >
                      <div className="iconCol">
                        <div
                          data-toggle="tooltip"
                          data-original-title="Print"
                          data-placement="top"
                          className="input-group-addon"
                        >
                          {" "}
                          <Link
                            to="#"
                            // onclick="javascript:window.open('/print_voucher.php?voucher=yes&code=66004bd14a5509bfb9cae72004ccdb5f89194365','printvoucher_hotel','width=1200,height=1200,scrollbars=yes,resizable=1')"
                          >
                            <i className="fa fa-print" />{" "}
                          </Link>
                        </div>
                      </div>
                      &nbsp;
                    </td>
                  </tr>
                  <tr role="row" className="even">
                    {/*  <td align="center" class="report_row2" align="center" style="border: 1px solid #9799a0;">30</td> */}
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row2 "
                      align="left"
                    >
                      TD000366&nbsp;
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
                      20 Mar 2018&nbsp;
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
                      Mr dfdfg fffgfg &nbsp;
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
                      20 Mar 2018&nbsp;
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
                      12954.68&nbsp;
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
                      INR&nbsp;
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row2 nonprintable"
                      align="center"
                    >
                      <div className="iconCol">
                        <div
                          data-toggle="tooltip"
                          data-original-title="Print"
                          data-placement="top"
                          className="input-group-addon"
                        >
                          {" "}
                          <Link
                            to="#"
                            // onclick="javascript:window.open('/print_voucher.php?voucher=yes&code=c929d53306ef8c7ae12513914fdbace265440366','printvoucher_hotel','width=1200,height=1200,scrollbars=yes,resizable=1')"
                          >
                            <i className="fa fa-print" />{" "}
                          </Link>
                        </div>
                      </div>
                      &nbsp;
                    </td>
                  </tr>
                  <tr role="row" className="odd">
                    {/*  <td align="center" class="report_row1" align="center" style="border: 1px solid #9799a0;">31</td> */}
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row1 "
                      align="left"
                    >
                      TD1100369&nbsp;
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
                      21 Mar 2018&nbsp;
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
                      Mr aaaa aaa &nbsp;
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
                      21 Mar 2018&nbsp;
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
                      4575.77&nbsp;
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
                      INR&nbsp;
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row1 nonprintable"
                      align="center"
                    >
                      <div className="iconCol">
                        <div
                          data-toggle="tooltip"
                          data-original-title="Print"
                          data-placement="top"
                          className="input-group-addon"
                        >
                          {" "}
                          <Link
                            to="#"
                            // onclick="javascript:window.open('/print_voucher.php?voucher=yes&code=f9450ae393bf9f0e79d41f7e7fe36e6b92132369','printvoucher_hotel','width=1200,height=1200,scrollbars=yes,resizable=1')"
                          >
                            <i className="fa fa-print" />{" "}
                          </Link>
                        </div>
                      </div>
                      &nbsp;
                    </td>
                  </tr>
                  <tr role="row" className="even">
                    {/*  <td align="center" class="report_row2" align="center" style="border: 1px solid #9799a0;">32</td> */}
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row2 "
                      align="left"
                    >
                      TD1100370&nbsp;
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
                      21 Mar 2018&nbsp;
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
                      Mr ddddd ddfdf &nbsp;
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
                      21 Mar 2018&nbsp;
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
                      12000&nbsp;
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
                      INR&nbsp;
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row2 nonprintable"
                      align="center"
                    >
                      <div className="iconCol">
                        <div
                          data-toggle="tooltip"
                          data-original-title="Print"
                          data-placement="top"
                          className="input-group-addon"
                        >
                          {" "}
                          <Link
                            to="#"
                            // onclick="javascript:window.open('/print_voucher.php?voucher=yes&code=dae9a6ec21e6ef1557987e9df757386c40734370','printvoucher_hotel','width=1200,height=1200,scrollbars=yes,resizable=1')"
                          >
                            <i className="fa fa-print" />{" "}
                          </Link>
                        </div>
                      </div>
                      &nbsp;
                    </td>
                  </tr>
                  <tr role="row" className="odd">
                    {/*  <td align="center" class="report_row1" align="center" style="border: 1px solid #9799a0;">33</td> */}
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row1 "
                      align="left"
                    >
                      TD600378&nbsp;
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
                      27 Mar 2018&nbsp;
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
                      Mr ToBeAdvisedC ToBeAdvisedC &nbsp;
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
                      15 Aug 2018&nbsp;
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
                      1485.84&nbsp;
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
                      USD&nbsp;
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row1 nonprintable"
                      align="center"
                    >
                      <div className="iconCol">
                        <div
                          data-toggle="tooltip"
                          data-original-title="Print"
                          data-placement="top"
                          className="input-group-addon"
                        >
                          {" "}
                          <Link
                            to="#"
                            // onclick="javascript:window.open('/print_voucher.php?voucher=yes&code=d4b2576c4b11f7b26c1bb74c03a9738e70271378','printvoucher_hotel','width=1200,height=1200,scrollbars=yes,resizable=1')"
                          >
                            <i className="fa fa-print" />{" "}
                          </Link>
                        </div>
                      </div>
                      &nbsp;
                    </td>
                  </tr>
                  <tr role="row" className="even">
                    {/*  <td align="center" class="report_row2" align="center" style="border: 1px solid #9799a0;">34</td> */}
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row2 "
                      align="left"
                    >
                      TD000383&nbsp;
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
                      04 Apr 2018&nbsp;
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
                      Mr asmi test &nbsp;
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
                      02 Jan 2018&nbsp;
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
                      2329.27&nbsp;
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
                      INR&nbsp;
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row2 nonprintable"
                      align="center"
                    >
                      <div className="iconCol">
                        <div
                          data-toggle="tooltip"
                          data-original-title="Print"
                          data-placement="top"
                          className="input-group-addon"
                        >
                          {" "}
                          <Link
                            to="#"
                            // onclick="javascript:window.open('/print_voucher.php?voucher=yes&code=3f0ab107b3e53a1d4f163bf79b12c6ec18984383','printvoucher_hotel','width=1200,height=1200,scrollbars=yes,resizable=1')"
                          >
                            <i className="fa fa-print" />{" "}
                          </Link>
                        </div>
                      </div>
                      &nbsp;
                    </td>
                  </tr>
                  <tr role="row" className="odd">
                    {/*  <td align="center" class="report_row1" align="center" style="border: 1px solid #9799a0;">35</td> */}
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row1 "
                      align="left"
                    >
                      TD000384&nbsp;
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
                      04 Apr 2018&nbsp;
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
                      Mr asmi test &nbsp;
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
                      02 Jan 2018&nbsp;
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
                      2329.95&nbsp;
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
                      INR&nbsp;
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row1 nonprintable"
                      align="center"
                    >
                      <div className="iconCol">
                        <div
                          data-toggle="tooltip"
                          data-original-title="Print"
                          data-placement="top"
                          className="input-group-addon"
                        >
                          {" "}
                          <Link
                            to="#"
                            // onclick="javascript:window.open('/print_voucher.php?voucher=yes&code=98bc4890b8171c82ba50023597142b6d78363384','printvoucher_hotel','width=1200,height=1200,scrollbars=yes,resizable=1')"
                          >
                            <i className="fa fa-print" />{" "}
                          </Link>
                        </div>
                      </div>
                      &nbsp;
                    </td>
                  </tr>
                  <tr role="row" className="even">
                    {/*  <td align="center" class="report_row2" align="center" style="border: 1px solid #9799a0;">36</td> */}
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row2 "
                      align="left"
                    >
                      TD000385&nbsp;
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
                      04 Apr 2018&nbsp;
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
                      Mr asmi test &nbsp;
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
                      02 Jan 2018&nbsp;
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
                      2789.32&nbsp;
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
                      INR&nbsp;
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row2 nonprintable"
                      align="center"
                    >
                      <div className="iconCol">
                        <div
                          data-toggle="tooltip"
                          data-original-title="Print"
                          data-placement="top"
                          className="input-group-addon"
                        >
                          {" "}
                          <Link
                            to="#"
                            // onclick="javascript:window.open('/print_voucher.php?voucher=yes&code=d21e663e29d7c6afc26e5d01721f906975695385','printvoucher_hotel','width=1200,height=1200,scrollbars=yes,resizable=1')"
                          >
                            <i className="fa fa-print" />{" "}
                          </Link>
                        </div>
                      </div>
                      &nbsp;
                    </td>
                  </tr>
                  <tr role="row" className="odd">
                    {/*  <td align="center" class="report_row1" align="center" style="border: 1px solid #9799a0;">37</td> */}
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row1 "
                      align="left"
                    >
                      TD000386&nbsp;
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
                      04 Apr 2018&nbsp;
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
                      Mr asmi test &nbsp;
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
                      02 Jan 2018&nbsp;
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
                      3102.09&nbsp;
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
                      INR&nbsp;
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row1 nonprintable"
                      align="center"
                    >
                      <div className="iconCol">
                        <div
                          data-toggle="tooltip"
                          data-original-title="Print"
                          data-placement="top"
                          className="input-group-addon"
                        >
                          {" "}
                          <Link
                            to="#"
                            // onclick="javascript:window.open('/print_voucher.php?voucher=yes&code=4241857cba4b9d53ade5609e99d0662670603386','printvoucher_hotel','width=1200,height=1200,scrollbars=yes,resizable=1')"
                          >
                            <i className="fa fa-print" />{" "}
                          </Link>
                        </div>
                      </div>
                      &nbsp;
                    </td>
                  </tr>
                  <tr role="row" className="even">
                    {/*  <td align="center" class="report_row2" align="center" style="border: 1px solid #9799a0;">38</td> */}
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row2 "
                      align="left"
                    >
                      TD000387&nbsp;
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
                      05 Apr 2018&nbsp;
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
                      Mr asmi test &nbsp;
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
                      01 Jan 2018&nbsp;
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
                      2118.5&nbsp;
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
                      INR&nbsp;
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row2 nonprintable"
                      align="center"
                    >
                      <div className="iconCol">
                        <div
                          data-toggle="tooltip"
                          data-original-title="Print"
                          data-placement="top"
                          className="input-group-addon"
                        >
                          {" "}
                          <Link
                            to="#"
                            // onclick="javascript:window.open('/print_voucher.php?voucher=yes&code=952c28038dff0b3335cad5d3e7b5022b40477387','printvoucher_hotel','width=1200,height=1200,scrollbars=yes,resizable=1')"
                          >
                            <i className="fa fa-print" />{" "}
                          </Link>
                        </div>
                      </div>
                      &nbsp;
                    </td>
                  </tr>
                  <tr role="row" className="odd">
                    {/*  <td align="center" class="report_row1" align="center" style="border: 1px solid #9799a0;">39</td> */}
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row1 "
                      align="left"
                    >
                      TD900403&nbsp;
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
                      11 Apr 2018&nbsp;
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
                      &nbsp;
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
                      19 Jul 2018&nbsp;
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
                      0 &nbsp;
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
                      INR&nbsp;
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row1 nonprintable"
                      align="center"
                    >
                      <div className="iconCol">
                        <div
                          data-toggle="tooltip"
                          data-original-title="Print"
                          data-placement="top"
                          className="input-group-addon"
                        >
                          {" "}
                          <Link
                            to="#"
                            // onclick="javascript:window.open('/print_voucher_transfer.php?voucher=yes&code=9a63dd5656560a2a193e07d8743861cc20735403','printvoucher_transfer','width=1200,height=1200,scrollbars=yes,resizable=1')"
                          >
                            <i className="fa fa-print" />{" "}
                          </Link>
                        </div>
                      </div>
                      &nbsp;
                    </td>
                  </tr>
                  <tr role="row" className="even">
                    {/*  <td align="center" class="report_row2" align="center" style="border: 1px solid #9799a0;">40</td> */}
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row2 "
                      align="left"
                    >
                      TD900407&nbsp;
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
                      11 Apr 2018&nbsp;
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
                      &nbsp;
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
                      09 Jul 2018&nbsp;
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
                      0 &nbsp;
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
                      INR&nbsp;
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row2 nonprintable"
                      align="center"
                    >
                      <div className="iconCol">
                        <div
                          data-toggle="tooltip"
                          data-original-title="Print"
                          data-placement="top"
                          className="input-group-addon"
                        >
                          {" "}
                          <Link
                            to="#"
                            // onclick="javascript:window.open('/print_voucher_transfer.php?voucher=yes&code=481ff285dd5fa55877966e75/d10c1bd113080407','printvoucher_transfer','width=1200,height=1200,scrollbars=yes,resizable=1')"
                          >
                            <i className="fa fa-print" />{" "}
                          </Link>
                        </div>
                      </div>
                      &nbsp;
                    </td>
                  </tr>
                  <tr role="row" className="odd">
                    {/*  <td align="center" class="report_row1" align="center" style="border: 1px solid #9799a0;">41</td> */}
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row1 "
                      align="left"
                    >
                      TD900409&nbsp;
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
                      11 Apr 2018&nbsp;
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
                      asmita &nbsp;
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
                      12 Jun 2018&nbsp;
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
                      14.18&nbsp;
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
                      INR&nbsp;
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row1 nonprintable"
                      align="center"
                    >
                      <div className="iconCol">
                        <div
                          data-toggle="tooltip"
                          data-original-title="Print"
                          data-placement="top"
                          className="input-group-addon"
                        >
                          {" "}
                          <Link
                            to="#"
                            // onclick="javascript:window.open('/print_voucher_transfer.php?voucher=yes&code=9aeaed7525313033160d86e046df0d9633557409','printvoucher_transfer','width=1200,height=1200,scrollbars=yes,resizable=1')"
                          >
                            <i className="fa fa-print" />{" "}
                          </Link>
                        </div>
                      </div>
                      &nbsp;
                    </td>
                  </tr>
                  <tr role="row" className="even">
                    {/*  <td align="center" class="report_row2" align="center" style="border: 1px solid #9799a0;">42</td> */}
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row2 "
                      align="left"
                    >
                      TD000411&nbsp;
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
                      13 Apr 2018&nbsp;
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
                      Mr asmi test &nbsp;
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
                      02 Jan 2018&nbsp;
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
                      2137.57&nbsp;
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
                      INR&nbsp;
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row2 nonprintable"
                      align="center"
                    >
                      <div className="iconCol">
                        <div
                          data-toggle="tooltip"
                          data-original-title="Print"
                          data-placement="top"
                          className="input-group-addon"
                        >
                          {" "}
                          <Link
                            to="#"
                            // onclick="javascript:window.open('/print_voucher.php?voucher=yes&code=abb64ec807c88a029a40eac5439c081641134411','printvoucher_hotel','width=1200,height=1200,scrollbars=yes,resizable=1')"
                          >
                            <i className="fa fa-print" />{" "}
                          </Link>
                        </div>
                      </div>
                      &nbsp;
                    </td>
                  </tr>
                  <tr role="row" className="odd">
                    {/*  <td align="center" class="report_row1" align="center" style="border: 1px solid #9799a0;">43</td> */}
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row1 "
                      align="left"
                    >
                      TD000412&nbsp;
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
                      13 Apr 2018&nbsp;
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
                      Mr asmi test &nbsp;
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
                      02 Jan 2018&nbsp;
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
                      2137.57&nbsp;
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
                      INR&nbsp;
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row1 nonprintable"
                      align="center"
                    >
                      <div className="iconCol">
                        <div
                          data-toggle="tooltip"
                          data-original-title="Print"
                          data-placement="top"
                          className="input-group-addon"
                        >
                          {" "}
                          <Link to="#">
                            <i className="fa fa-print" />{" "}
                          </Link>
                        </div>
                      </div>
                      &nbsp;
                    </td>
                  </tr>
                  <tr role="row" className="even">
                    {/*  <td align="center" class="report_row2" align="center" style="border: 1px solid #9799a0;">44</td> */}
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row2 "
                      align="left"
                    >
                      TD000413&nbsp;
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
                      13 Apr 2018&nbsp;
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
                      Mr asmi test &nbsp;
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
                      02 Jan 2018&nbsp;
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
                      2137.57&nbsp;
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
                      INR&nbsp;
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row2 nonprintable"
                      align="center"
                    >
                      <div className="iconCol">
                        <div
                          data-toggle="tooltip"
                          data-original-title="Print"
                          data-placement="top"
                          className="input-group-addon"
                        >
                          {" "}
                          <Link to="#">
                            <i className="fa fa-print" />{" "}
                          </Link>
                        </div>
                      </div>
                      &nbsp;
                    </td>
                  </tr>
                  <tr role="row" className="odd">
                    {/*  <td align="center" class="report_row1" align="center" style="border: 1px solid #9799a0;">45</td> */}
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row1 "
                      align="left"
                    >
                      TD000415&nbsp;
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
                      13 Apr 2018&nbsp;
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
                      Mr asmi test &nbsp;
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
                      02 Jan 2018&nbsp;
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
                      2137.57&nbsp;
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
                      INR&nbsp;
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row1 nonprintable"
                      align="center"
                    >
                      <div className="iconCol">
                        <div
                          data-toggle="tooltip"
                          data-original-title="Print"
                          data-placement="top"
                          className="input-group-addon"
                        >
                          {" "}
                          <Link
                            to="#"
                            // onclick="javascript:window.open('/print_voucher.php?voucher=yes&code=4eafa0cd5da8ec3f9ab14116d53e1c2654841415','printvoucher_hotel','width=1200,height=1200,scrollbars=yes,resizable=1')"
                          >
                            <i className="fa fa-print" />{" "}
                          </Link>
                        </div>
                      </div>
                      &nbsp;
                    </td>
                  </tr>
                  <tr role="row" className="even">
                    {/*  <td align="center" class="report_row2" align="center" style="border: 1px solid #9799a0;">46</td> */}
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row2 "
                      align="left"
                    >
                      TD000417&nbsp;
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
                      13 Apr 2018&nbsp;
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
                      Mr asmi test &nbsp;
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
                      02 Jan 2018&nbsp;
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
                      2137.57&nbsp;
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
                      INR&nbsp;
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row2 nonprintable"
                      align="center"
                    >
                      <div className="iconCol">
                        <div
                          data-toggle="tooltip"
                          data-original-title="Print"
                          data-placement="top"
                          className="input-group-addon"
                        >
                          {" "}
                          <Link
                            to="#"
                            // onclick="javascript:window.open('/print_voucher.php?voucher=yes&code=2cd2629962756af116aa573558a032c366938417','printvoucher_hotel','width=1200,height=1200,scrollbars=yes,resizable=1')"
                          >
                            <i className="fa fa-print" />{" "}
                          </Link>
                        </div>
                      </div>
                      &nbsp;
                    </td>
                  </tr>
                  <tr role="row" className="odd">
                    {/*  <td align="center" class="report_row1" align="center" style="border: 1px solid #9799a0;">47</td> */}
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row1 "
                      align="left"
                    >
                      TD000419&nbsp;
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
                      13 Apr 2018&nbsp;
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
                      Mr asmi test &nbsp;
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
                      01 Jan 2018&nbsp;
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
                      2137.57&nbsp;
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
                      INR&nbsp;
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row1 nonprintable"
                      align="center"
                    >
                      <div className="iconCol">
                        <div
                          data-toggle="tooltip"
                          data-original-title="Print"
                          data-placement="top"
                          className="input-group-addon"
                        >
                          {" "}
                          <Link to="#">
                            <i className="fa fa-print" />{" "}
                          </Link>
                        </div>
                      </div>
                      &nbsp;
                    </td>
                  </tr>
                  <tr role="row" className="even">
                    {/*  <td align="center" class="report_row2" align="center" style="border: 1px solid #9799a0;">48</td> */}
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row2 "
                      align="left"
                    >
                      TD800430&nbsp;
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
                      17 Apr 2018&nbsp;
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
                      &nbsp;
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
                      22 Apr 2018&nbsp;
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
                      26.96&nbsp;
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
                      SAR&nbsp;
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row2 nonprintable"
                      align="center"
                    >
                      <div className="iconCol">
                        <div
                          data-toggle="tooltip"
                          data-original-title="Print"
                          data-placement="top"
                          className="input-group-addon"
                        >
                          {" "}
                          <Link
                            to="#"
                            // onclick="javascript:window.open('/print_voucher.php?voucher=yes&code=c6558a6e2b99687fc66cf8102b22b7cb96122430','printvoucher_hotel','width=1200,height=1200,scrollbars=yes,resizable=1')"
                          >
                            <i className="fa fa-print" />{" "}
                          </Link>
                        </div>
                      </div>
                      &nbsp;
                    </td>
                  </tr>
                  <tr role="row" className="odd">
                    {/*  <td align="center" class="report_row1" align="center" style="border: 1px solid #9799a0;">49</td> */}
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row1 "
                      align="left"
                    >
                      TD800431&nbsp;
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
                      19 Apr 2018&nbsp;
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
                      &nbsp;
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
                      21 Apr 2018&nbsp;
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
                      222.87&nbsp;
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
                      SAR&nbsp;
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row1 nonprintable"
                      align="center"
                    >
                      <div className="iconCol">
                        <div
                          data-toggle="tooltip"
                          data-original-title="Print"
                          data-placement="top"
                          className="input-group-addon"
                        >
                          {" "}
                          <Link
                            to="#"
                            // onclick="javascript:window.open('/print_voucher.php?voucher=yes&code=44b6cad0da59f9c012d23a92f5d5d91316842431','printvoucher_hotel','width=1200,height=1200,scrollbars=yes,resizable=1')"
                          >
                            <i className="fa fa-print" />{" "}
                          </Link>
                        </div>
                      </div>
                      &nbsp;
                    </td>
                  </tr>
                  <tr role="row" className="even">
                    {/*  <td align="center" class="report_row2" align="center" style="border: 1px solid #9799a0;">50</td> */}
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row2 "
                      align="left"
                    >
                      TD800432&nbsp;
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
                      20 Apr 2018&nbsp;
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
                      &nbsp;
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
                      20 Apr 2018&nbsp;
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
                      26.96&nbsp;
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
                      SAR&nbsp;
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "7px",
                      }}
                      className="report_row2 nonprintable"
                      align="center"
                    >
                      <div className="iconCol">
                        <div
                          data-toggle="tooltip"
                          data-original-title="Print"
                          data-placement="top"
                          className="input-group-addon"
                        >
                          {" "}
                          <Link to="#">
                            <i className="fa fa-print" />{" "}
                          </Link>
                        </div>
                      </div>
                      &nbsp;
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className="bg-grey">
                    <td
                      style={{
                        textAlign: "center",
                        padding: "7px",
                        fontSize: "13px",
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
                      }}
                      className="row_header"
                      rowSpan={1}
                      colSpan={1}
                    ></td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="form-group no-result">
              <h5 className="text-center">No Result Found.</h5>
            </div>
            <div className="row pd_tp">
              <div className="row mt-4">
                <div className="col-md-4">
                  <Link
                    className="btn btn-outline-secondary btn-sm leftTopBtn"
                    onclick="callAjaxSubmit('',1);"
                    title="Click to download XL sheet"
                  >
                    <i className="fa fa-download" />
                    &nbsp;Download Excel
                  </Link>
                  &nbsp;&nbsp;
                  <Link
                    className="btn btn-dark btn-sm leftTopBtn"
                    onclick="callAjaxSubmit('',2);"
                    valign="top"
                    title="Click to print"
                  >
                    <i className="fa fa-print" />
                    &nbsp;Print
                  </Link>
                </div>
                <div className="col-md-7"></div>
                <div className="col-md-1 search_option">
                  <Link
                    className="btn btn-dark btn-sm form-group pull-right"
                    to="/tms/reports.php?sbt1=View Report&service_to_date=17-08-2023&service_from_date=17-07-2023&booking_to_date=17-08-2023&booking_from_date=17-07-2023&consultant_name=&reservation_id=&sel_max_results=50&sel_selected_service=all&txt_booking_id=&sel_branch=&sel_agent_name=&sel_agent=&report=voucher&run=1&&Total=50&Start=50"
                  >
                    <i className="fa fa-arrow-right" />
                    &nbsp;Next
                  </Link>
                </div>
              </div>
            </div>
            <style
              type="text/css"
              dangerouslySetInnerHTML={{
                __html:
                  "\n                                @media print {\n                                    /*.table.dataTable thead tr td\n{\nborder-top: 1px solid #DDD!important;\nborder-bottom: 1px solid #DDD!important;\n}\n\n.table.dataTable > thead > tr > th, .table.dataTable > thead > tr > td\n{\nwhite-space: normal!important;\npadding: 8px 5px 8px 5px!important;\n}*/\n                                    /*tr td.bookIdCol a{display:none !important;} */\n                                    /*tr.bg-primary td { border:1px solid #000 !important;} */\n                                }\n                            ",
              }}
            />
          </form>
        </div>
      </div>
    </>
  );
};
export default ReportsOperationsVoucher;
