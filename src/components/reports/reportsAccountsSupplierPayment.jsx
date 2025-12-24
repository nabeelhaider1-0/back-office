import Flatpickr from "react-flatpickr";
import React, { useState } from "react";
import up from "../../assets/images/up_arrow.gif";
import down from "../../assets/images/down_arrow.gif";
import MultiSelect from "../reactMultiSelect";
import {
  maxResultsOptions,
  staffaccessreports_initialOptions,
} from "../../constants/contants";
import Header2 from "../header2/header2";

const ReportsAccountsSupplierPayment = () => {
  const [startDate, setStartDate] = useState(null); // State for the start date
  const [endDate, setEndDate] = useState(null); // State for the end date

  const handleTrashClick = () => {
    // Function to clear both start and end dates
    setStartDate(null);
    setEndDate(null);
  };

  const [showBookingDate, setShowBookingDate] = useState(false);

  const toggleBookingDate = () => {
    setShowBookingDate(!showBookingDate);
  };

  const [isFormVisible, setFormVisibility] = useState(false);

  const toggleFormVisibility = () => {
    setFormVisibility(!isFormVisible);
  };

  return (
    <>
      <Header2 title="SUPPLIER PAYMENTS" />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <form>
          <div className="panel-body">
            <div className="row">
              <div className="form-group col-md-3">
                <label>Suppliers</label>
                <br />
                <div className="radioline1">
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      name="supplier_type"
                      id="local"
                      defaultValue="local"
                      defaultChecked
                      className="test123"
                    />
                    <label htmlFor="local"> Offline Supplier </label>
                  </div>
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      name="supplier_type"
                      id="app"
                      defaultValue="online"
                    />
                    <label htmlFor="online"> Online Supplier </label>
                  </div>
                </div>
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
                <label>Master Reference</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="reservation_id"
                  size={50}
                />
              </div>
              <div className="form-group col-md-3">
                <label>Consultant Name</label>
                <MultiSelect
                  options={staffaccessreports_initialOptions}
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
                  <label htmlFor="chk_booking_date"> Booking Date</label>
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
          <div className="panel-body removeMargins">
            <div className="row pd_tp">
              <div className="row mt-2">
                <div className="col-md-4 col_hide">
                  <div className="col-md-12">
                    <a
                      className="btn btn-dark btn-sm form-group"
                      href="/tms/reports.php?run=1&report=payments&supplier_type=local&sel_max_results=50&reservation_id=&consultant_name=&booking_from_date=18-07-2023&booking_to_date=18-08-2023&sbt1=View+Report&download=1"
                    >
                      <i className="fa fa-download" />
                      &nbsp;Download Excel
                    </a>
                    &nbsp;&nbsp;
                    <a
                      className="btn btn-dark btn-sm form-group"
                      href="/tms/reports.php?run=1&report=payments&supplier_type=local&sel_max_results=50&reservation_id=&consultant_name=&booking_from_date=18-07-2023&booking_to_date=18-08-2023&sbt1=View+Report&print=1"
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
            </div>
            <div>
              <link
                rel="stylesheet"
                href="/cpfv3/css/tms/bootstrap_r/css/jquery.dataTables.css"
              />
              <link
                rel="stylesheet"
                href="/cpfv3/css/tms/bootstrap_r/css/bootstrap-select.css"
              />
              <link
                href="https://fonts.googleapis.com/css?family=Montserrat:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i"
                rel="stylesheet"
              />
              <style
                dangerouslySetInnerHTML={{
                  __html:
                    "\n                        #search_agents_table1 a {\n                            text-decoration: underline;\n                        }\n\n                        #unallocatedAmountDetailContent {\n                            min-height: 400px;\n                            margin-bottom: 10px;\n                        }\n\n                        .modal-content {\n                            overflow: hidden;\n                        }\n                    ",
                }}
              />
              {/* code added by himanshu for GT-647 on 15-10-2013 */}
              <div
                id="search_agents_table1_wrapper"
                className="dataTables_wrapper form-inline dt-bootstrap"
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
                                width: "92.2px",
                              }}
                              className="row_header sorting"
                              tabIndex={0}
                              aria-controls="search_agents_table1"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="
                                  
                                  Date &nbsp;								
                                      
                                  &nbsp;
                                  
                                      
                                  
                                                          : activate to sort column ascending"
                            >
                              Date &nbsp;{" "}
                              <a href="/tms/reports.php?sbt1=View Report&booking_to_date=18-08-2023&booking_from_date=18-07-2023&consultant_name=&reservation_id=&sel_max_results=50&supplier_type=local&report=payments&run=1&&sort_by=DSRDate&order=ASC&action_type=list_members">
                                <img src={up} alt="up" border={0} />
                              </a>
                              &nbsp;
                              <a href="/tms/reports.php?sbt1=View Report&booking_to_date=18-08-2023&booking_from_date=18-07-2023&consultant_name=&reservation_id=&sel_max_results=50&supplier_type=local&report=payments&run=1&&sort_by=DSRDate&order=DESC&action_type=list_members">
                                <img src={down} alt="down" border={0} />
                              </a>
                            </th>
                            <th
                              style={{
                                color: "rgb(255, 255, 255)",
                                fontWeight: 400,
                                fontSize: "12px",
                                padding: "7px",
                                width: "119.2px",
                              }}
                              className="row_header sorting"
                              tabIndex={0}
                              aria-controls="search_agents_table1"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="
                                  
                                  Document No &nbsp;								
                                      
                                  &nbsp;
                                  
                                      
                                  
                                                          : activate to sort column ascending"
                            >
                              Document No &nbsp;{" "}
                              <a href="/tms/reports.php?sbt1=View Report&booking_to_date=18-08-2023&booking_from_date=18-07-2023&consultant_name=&reservation_id=&sel_max_results=50&supplier_type=local&report=payments&run=1&&sort_by=DocNo&order=ASC&action_type=list_members">
                                <img src={up} alt="up" border={0} />
                              </a>
                              &nbsp;
                              <a href="/tms/reports.php?sbt1=View Report&booking_to_date=18-08-2023&booking_from_date=18-07-2023&consultant_name=&reservation_id=&sel_max_results=50&supplier_type=local&report=payments&run=1&&sort_by=DocNo&order=DESC&action_type=list_members">
                                <img src={down} alt="down" border={0} />
                              </a>
                            </th>
                            <th
                              style={{
                                color: "rgb(255, 255, 255)",
                                fontWeight: 400,
                                fontSize: "12px",
                                padding: "7px",
                                width: "109.2px",
                              }}
                              className="row_header   no-sort sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="
                                  
                                  Account &nbsp;							"
                            >
                              Account &nbsp;{" "}
                            </th>
                            <th
                              style={{
                                color: "rgb(255, 255, 255)",
                                fontWeight: 400,
                                fontSize: "12px",
                                padding: "7px",
                                width: "90.2px",
                              }}
                              className="row_header sorting"
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
                              <a href="/tms/reports.php?sbt1=View Report&booking_to_date=18-08-2023&booking_from_date=18-07-2023&consultant_name=&reservation_id=&sel_max_results=50&supplier_type=local&report=payments&run=1&&sort_by=Amount&order=ASC&action_type=list_members">
                                <img src={up} alt="up" border={0} />
                              </a>
                              &nbsp;
                              <a href="/tms/reports.php?sbt1=View Report&booking_to_date=18-08-2023&booking_from_date=18-07-2023&consultant_name=&reservation_id=&sel_max_results=50&supplier_type=local&report=payments&run=1&&sort_by=Amount&order=DESC&action_type=list_members">
                                <img src={down} alt="down" border={0} />
                              </a>
                            </th>
                            <th
                              style={{
                                color: "rgb(255, 255, 255)",
                                fontWeight: 400,
                                fontSize: "12px",
                                padding: "7px",
                                width: "85.2px",
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
                                width: "117.2px",
                              }}
                              className="row_header   no-sort sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="
                                  
                                  Cash / Cheque &nbsp;							"
                            >
                              Cash / Cheque &nbsp;{" "}
                            </th>
                            <th
                              style={{
                                color: "rgb(255, 255, 255)",
                                fontWeight: 400,
                                fontSize: "12px",
                                padding: "7px",
                                width: "93.2px",
                              }}
                              className="row_header   no-sort sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="
                                  
                                  Cheque No. &nbsp;							"
                            >
                              Cheque No. &nbsp;{" "}
                            </th>
                            <th
                              style={{
                                color: "rgb(255, 255, 255)",
                                fontWeight: 400,
                                fontSize: "12px",
                                padding: "7px",
                                width: "399.2px",
                              }}
                              className="row_header   no-sort sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="
                                  
                                  Narration &nbsp;							"
                            >
                              Narration &nbsp;{" "}
                            </th>
                            <th
                              style={{
                                color: "rgb(255, 255, 255)",
                                fontWeight: 400,
                                fontSize: "12px",
                                padding: "7px",
                                width: "132.2px",
                              }}
                              className="row_header   no-sort sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="
                                  
                                  Bank Reference &nbsp;							"
                            >
                              Bank Reference &nbsp;{" "}
                            </th>
                            <th
                              style={{
                                color: "rgb(255, 255, 255)",
                                fontWeight: 400,
                                fontSize: "12px",
                                padding: "7px",
                                width: "118px",
                              }}
                              className="row_header   no-sort sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="
                                  
                                  Bank Charges &nbsp;							"
                            >
                              Bank Charges &nbsp;{" "}
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
                              02 Apr 2018&nbsp;
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
                              Pmt000000001&nbsp;
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
                              QtechTest&nbsp;
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
                              12&nbsp;
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
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row1 "
                              align="center"
                            >
                              CSH&nbsp;
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
                              0 &nbsp;
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
                              fgfgf&nbsp;
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
                              0 &nbsp;
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
                              0 &nbsp;
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
                              04 Jul 2018&nbsp;
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
                              2018/00496&nbsp;
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
                              QtechTest&nbsp;
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
                              5&nbsp;
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
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row2 "
                              align="center"
                            >
                              Debit Note&nbsp;
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
                              0 &nbsp;
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
                              Dedit Note for :- TD800759 Booking
                              Modified&lt;br&gt;test&nbsp;
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
                              0 &nbsp;
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
                              0 &nbsp;
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
                              17 Jun 2019&nbsp;
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
                              2019/1576&nbsp;
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
                              allwin-qtech&nbsp;
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
                              500&nbsp;
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
                              INR&nbsp;
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
                              Debit Note&nbsp;
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
                              0 &nbsp;
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
                              Dedit Note for :- TD802813 Booking Modified&nbsp;
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
                              0 &nbsp;
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
                              0 &nbsp;
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
                              25 Jul 2019&nbsp;
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
                              DN/5&nbsp;
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
                              allwin-qtech&nbsp;
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
                              20&nbsp;
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
                              INR&nbsp;
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
                              Debit Note&nbsp;
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
                              0 &nbsp;
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
                              Dedit Note for :- TD802813 Booking
                              Modified&lt;br&gt;Test&nbsp;
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
                              0 &nbsp;
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
                              0 &nbsp;
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
                              26 Aug 2019&nbsp;
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
                              Pmt000002021&nbsp;
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
                              QtechTest&nbsp;
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
                              1200&nbsp;
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
                              INR&nbsp;
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
                              CSH&nbsp;
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
                              0 &nbsp;
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
                              dfdfdf&nbsp;
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
                              0 &nbsp;
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
                              0 &nbsp;
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
                              12 Dec 2019&nbsp;
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
                              Pmt000002041&nbsp;
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
                              Nirvana Tour&nbsp;
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
                              102&nbsp;
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
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row2 "
                              align="center"
                            >
                              VCC&nbsp;
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
                              0 &nbsp;
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
                              Payment Via VCC&nbsp;
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
                              0 &nbsp;
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
                              0 &nbsp;
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
                              align="center"
                            >
                              12 Dec 2019&nbsp;
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
                              Pmt000002042&nbsp;
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
                              Nirvana Tour&nbsp;
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
                              102&nbsp;
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
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row1 "
                              align="center"
                            >
                              VCC&nbsp;
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
                              0 &nbsp;
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
                              Payment Via VCC&nbsp;
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
                              0 &nbsp;
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
                              0 &nbsp;
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
                              align="center"
                            >
                              26 May 2020&nbsp;
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
                              Pmt000002053&nbsp;
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
                              allwin-qtech&nbsp;
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
                              2900&nbsp;
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
                              AED&nbsp;
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
                              CSH&nbsp;
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
                              0 &nbsp;
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
                              dcfghjk&nbsp;
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
                              0 &nbsp;
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
                              0 &nbsp;
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
                              align="center"
                            >
                              12 May 2021&nbsp;
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
                              Pmt000002057&nbsp;
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
                              allwin-qtech&nbsp;
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
                              100&nbsp;
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
                              INR&nbsp;
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
                              VCC&nbsp;
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
                              0 &nbsp;
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
                              Payment Via VCC&nbsp;
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
                              0 &nbsp;
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
                              0 &nbsp;
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
                              align="center"
                            >
                              12 May 2021&nbsp;
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
                              Pmt000002058&nbsp;
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
                              allwin-qtech&nbsp;
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
                              100&nbsp;
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
                              INR&nbsp;
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
                              VCC&nbsp;
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
                              0 &nbsp;
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
                              Payment Via VCC&nbsp;
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
                              0 &nbsp;
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
                              0 &nbsp;
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
                              align="center"
                            >
                              13 May 2021&nbsp;
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
                              Pmt000002059&nbsp;
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
                              allwin-qtech&nbsp;
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
                              100&nbsp;
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
                              INR&nbsp;
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
                              VCC&nbsp;
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
                              0 &nbsp;
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
                              Payment Via VCC&nbsp;
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
                              0 &nbsp;
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
                              0 &nbsp;
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
                              align="center"
                            >
                              13 May 2021&nbsp;
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
                              Pmt000002060&nbsp;
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
                              allwin-qtech&nbsp;
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
                              100&nbsp;
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
                              INR&nbsp;
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
                              VCC&nbsp;
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
                              0 &nbsp;
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
                              Payment Via VCC&nbsp;
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
                              0 &nbsp;
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
                              0 &nbsp;
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
                              align="center"
                            >
                              13 May 2021&nbsp;
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
                              Pmt000002061&nbsp;
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
                              allwin-qtech&nbsp;
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
                              100&nbsp;
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
                              INR&nbsp;
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
                              VCC&nbsp;
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
                              0 &nbsp;
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
                              Payment Via VCC&nbsp;
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
                              0 &nbsp;
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
                              0 &nbsp;
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
                              align="center"
                            >
                              13 May 2021&nbsp;
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
                              Pmt000002062&nbsp;
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
                              allwin-qtech&nbsp;
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
                              100&nbsp;
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
                              INR&nbsp;
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
                              VCC&nbsp;
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
                              0 &nbsp;
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
                              Payment Via VCC&nbsp;
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
                              0 &nbsp;
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
                              0 &nbsp;
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
                              align="center"
                            >
                              13 May 2021&nbsp;
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
                              Pmt000002063&nbsp;
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
                              allwin-qtech&nbsp;
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
                              100&nbsp;
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
                              INR&nbsp;
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
                              VCC&nbsp;
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
                              0 &nbsp;
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
                              Payment Via VCC&nbsp;
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
                              0 &nbsp;
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
                              0 &nbsp;
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
                              align="center"
                            >
                              13 May 2021&nbsp;
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
                              Pmt000002064&nbsp;
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
                              allwin-qtech&nbsp;
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
                              100&nbsp;
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
                              INR&nbsp;
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
                              VCC&nbsp;
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
                              0 &nbsp;
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
                              Payment Via VCC&nbsp;
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
                              0 &nbsp;
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
                              0 &nbsp;
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
                              align="center"
                            >
                              13 May 2021&nbsp;
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
                              Pmt000002065&nbsp;
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
                              allwin-qtech&nbsp;
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
                              100&nbsp;
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
                              INR&nbsp;
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
                              VCC&nbsp;
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
                              0 &nbsp;
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
                              Payment Via VCC&nbsp;
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
                              0 &nbsp;
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
                              0 &nbsp;
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
                              align="center"
                            >
                              13 May 2021&nbsp;
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
                              Pmt000002066&nbsp;
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
                              allwin-qtech&nbsp;
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
                              100&nbsp;
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
                              INR&nbsp;
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
                              VCC&nbsp;
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
                              0 &nbsp;
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
                              Payment Via VCC&nbsp;
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
                              0 &nbsp;
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
                              0 &nbsp;
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
                              align="center"
                            >
                              13 May 2021&nbsp;
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
                              Pmt000002067&nbsp;
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
                              allwin-qtech&nbsp;
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
                              100&nbsp;
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
                              INR&nbsp;
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
                              VCC&nbsp;
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
                              0 &nbsp;
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
                              Payment Via VCC&nbsp;
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
                              0 &nbsp;
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
                              0 &nbsp;
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
                              align="center"
                            >
                              13 May 2021&nbsp;
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
                              Pmt000002068&nbsp;
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
                              allwin-qtech&nbsp;
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
                              100&nbsp;
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
                              INR&nbsp;
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
                              VCC&nbsp;
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
                              0 &nbsp;
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
                              Payment Via VCC&nbsp;
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
                              0 &nbsp;
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
                              0 &nbsp;
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
                              align="center"
                            >
                              13 May 2021&nbsp;
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
                              Pmt000002069&nbsp;
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
                              allwin-qtech&nbsp;
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
                              100&nbsp;
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
                              INR&nbsp;
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
                              VCC&nbsp;
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
                              0 &nbsp;
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
                              Payment Via VCC&nbsp;
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
                              0 &nbsp;
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
                              0 &nbsp;
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
                              align="center"
                            >
                              13 May 2021&nbsp;
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
                              Pmt000002070&nbsp;
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
                              allwin-qtech&nbsp;
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
                              100&nbsp;
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
                              INR&nbsp;
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
                              VCC&nbsp;
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
                              0 &nbsp;
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
                              Payment Via VCC&nbsp;
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
                              0 &nbsp;
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
                              0 &nbsp;
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
                              align="center"
                            >
                              17 May 2021&nbsp;
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
                              Pmt000002071&nbsp;
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
                              Sayali_Qtech&nbsp;
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
                              200&nbsp;
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
                              INR&nbsp;
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
                              VCC&nbsp;
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
                              0 &nbsp;
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
                              Payment Via VCC&nbsp;
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
                              0 &nbsp;
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
                              0 &nbsp;
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
                              align="center"
                            >
                              17 May 2021&nbsp;
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
                              Pmt000002072&nbsp;
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
                              Sayali_Qtech&nbsp;
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
                              200&nbsp;
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
                              INR&nbsp;
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
                              VCC&nbsp;
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
                              0 &nbsp;
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
                              Payment Via VCC&nbsp;
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
                              0 &nbsp;
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
                              0 &nbsp;
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
                              align="center"
                            >
                              17 May 2021&nbsp;
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
                              Pmt000002073&nbsp;
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
                              Sayali_Qtech&nbsp;
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
                              200&nbsp;
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
                              INR&nbsp;
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
                              VCC&nbsp;
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
                              0 &nbsp;
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
                              Payment Via VCC&nbsp;
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
                              0 &nbsp;
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
                              0 &nbsp;
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
                              align="center"
                            >
                              17 May 2021&nbsp;
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
                              Pmt000002074&nbsp;
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
                              Sayali_Qtech&nbsp;
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
                              200&nbsp;
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
                              INR&nbsp;
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
                              VCC&nbsp;
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
                              0 &nbsp;
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
                              Payment Via VCC&nbsp;
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
                              0 &nbsp;
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
                              0 &nbsp;
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
                              align="center"
                            >
                              17 May 2021&nbsp;
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
                              Pmt000002075&nbsp;
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
                              Sayali_Qtech&nbsp;
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
                              200&nbsp;
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
                              INR&nbsp;
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
                              VCC&nbsp;
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
                              0 &nbsp;
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
                              Payment Via VCC&nbsp;
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
                              0 &nbsp;
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
                              0 &nbsp;
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
                              align="center"
                            >
                              19 May 2021&nbsp;
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
                              Pmt000002076&nbsp;
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
                              Sayali_Qtech&nbsp;
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
                              200&nbsp;
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
                              INR&nbsp;
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
                              VCC&nbsp;
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
                              0 &nbsp;
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
                              Payment Via VCC&nbsp;
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
                              0 &nbsp;
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
                              0 &nbsp;
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
                              align="center"
                            >
                              19 May 2021&nbsp;
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
                              Pmt000002077&nbsp;
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
                              Sayali_Qtech&nbsp;
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
                              200&nbsp;
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
                              INR&nbsp;
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
                              VCC&nbsp;
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
                              0 &nbsp;
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
                              Payment Via VCC&nbsp;
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
                              0 &nbsp;
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
                              0 &nbsp;
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
                              align="center"
                            >
                              19 May 2021&nbsp;
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
                              Pmt000002078&nbsp;
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
                              Sayali_Qtech&nbsp;
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
                              200&nbsp;
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
                              INR&nbsp;
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
                              VCC&nbsp;
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
                              0 &nbsp;
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
                              Payment Via VCC&nbsp;
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
                              0 &nbsp;
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
                              0 &nbsp;
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
                              align="center"
                            >
                              19 May 2021&nbsp;
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
                              Pmt000002079&nbsp;
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
                              Sayali_Qtech&nbsp;
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
                              200&nbsp;
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
                              INR&nbsp;
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
                              VCC&nbsp;
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
                              0 &nbsp;
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
                              Payment Via VCC&nbsp;
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
                              0 &nbsp;
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
                              0 &nbsp;
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
                              align="center"
                            >
                              19 May 2021&nbsp;
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
                              Pmt000002080&nbsp;
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
                              Sayali_Qtech&nbsp;
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
                              200&nbsp;
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
                              INR&nbsp;
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
                              VCC&nbsp;
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
                              0 &nbsp;
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
                              Payment Via VCC&nbsp;
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
                              0 &nbsp;
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
                              0 &nbsp;
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
                              align="center"
                            >
                              19 May 2021&nbsp;
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
                              Pmt000002081&nbsp;
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
                              Sayali_Qtech&nbsp;
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
                              200&nbsp;
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
                              INR&nbsp;
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
                              VCC&nbsp;
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
                              0 &nbsp;
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
                              Payment Via VCC&nbsp;
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
                              0 &nbsp;
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
                              0 &nbsp;
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
                              align="center"
                            >
                              19 May 2021&nbsp;
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
                              Pmt000002082&nbsp;
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
                              Sayali_Qtech&nbsp;
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
                              200&nbsp;
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
                              INR&nbsp;
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
                              VCC&nbsp;
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
                              0 &nbsp;
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
                              Payment Via VCC&nbsp;
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
                              0 &nbsp;
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
                              0 &nbsp;
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
                              align="center"
                            >
                              19 May 2021&nbsp;
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
                              Pmt000002083&nbsp;
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
                              Sayali_Qtech&nbsp;
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
                              200&nbsp;
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
                              INR&nbsp;
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
                              VCC&nbsp;
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
                              0 &nbsp;
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
                              Payment Via VCC&nbsp;
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
                              0 &nbsp;
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
                              0 &nbsp;
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
                              align="center"
                            >
                              20 May 2021&nbsp;
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
                              Pmt000002084&nbsp;
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
                              Sayali_Qtech&nbsp;
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
                              200&nbsp;
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
                              INR&nbsp;
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
                              VCC&nbsp;
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
                              0 &nbsp;
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
                              Payment Via VCC&nbsp;
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
                              0 &nbsp;
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
                              0 &nbsp;
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
                              align="center"
                            >
                              20 May 2021&nbsp;
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
                              Pmt000002085&nbsp;
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
                              Sayali_Qtech&nbsp;
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
                              200&nbsp;
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
                              INR&nbsp;
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
                              VCC&nbsp;
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
                              0 &nbsp;
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
                              Payment Via VCC&nbsp;
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
                              0 &nbsp;
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
                              0 &nbsp;
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
                              align="center"
                            >
                              20 May 2021&nbsp;
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
                              Pmt000002086&nbsp;
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
                              Sayali_Qtech&nbsp;
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
                              200&nbsp;
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
                              INR&nbsp;
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
                              VCC&nbsp;
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
                              0 &nbsp;
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
                              Payment Via VCC&nbsp;
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
                              0 &nbsp;
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
                              0 &nbsp;
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
                              align="center"
                            >
                              20 May 2021&nbsp;
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
                              Pmt000002087&nbsp;
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
                              Sayali_Qtech&nbsp;
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
                              200&nbsp;
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
                              INR&nbsp;
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
                              VCC&nbsp;
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
                              0 &nbsp;
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
                              Payment Via VCC&nbsp;
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
                              0 &nbsp;
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
                              0 &nbsp;
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
                              align="center"
                            >
                              24 May 2021&nbsp;
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
                              Pmt000002088&nbsp;
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
                              Sayali_Qtech&nbsp;
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
                              200&nbsp;
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
                              INR&nbsp;
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
                              VCC&nbsp;
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
                              0 &nbsp;
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
                              Payment Via VCC&nbsp;
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
                              0 &nbsp;
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
                              0 &nbsp;
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
                              align="center"
                            >
                              24 May 2021&nbsp;
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
                              Pmt000002089&nbsp;
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
                              Sayali_Qtech&nbsp;
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
                              200&nbsp;
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
                              INR&nbsp;
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
                              VCC&nbsp;
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
                              0 &nbsp;
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
                              Payment Via VCC&nbsp;
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
                              0 &nbsp;
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
                              0 &nbsp;
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
                              align="center"
                            >
                              24 May 2021&nbsp;
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
                              Pmt000002090&nbsp;
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
                              Sayali_Qtech&nbsp;
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
                              200&nbsp;
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
                              INR&nbsp;
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
                              VCC&nbsp;
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
                              0 &nbsp;
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
                              Payment Via VCC&nbsp;
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
                              0 &nbsp;
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
                              0 &nbsp;
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
                              align="center"
                            >
                              24 May 2021&nbsp;
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
                              Pmt000002091&nbsp;
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
                              Sayali_Qtech&nbsp;
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
                              200&nbsp;
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
                              INR&nbsp;
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
                              VCC&nbsp;
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
                              0 &nbsp;
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
                              Payment Via VCC&nbsp;
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
                              0 &nbsp;
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
                              0 &nbsp;
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
                              align="center"
                            >
                              24 May 2021&nbsp;
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
                              Pmt000002092&nbsp;
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
                              Sayali_Qtech&nbsp;
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
                              200&nbsp;
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
                              INR&nbsp;
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
                              VCC&nbsp;
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
                              0 &nbsp;
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
                              Payment Via VCC&nbsp;
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
                              0 &nbsp;
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
                              0 &nbsp;
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
                              align="center"
                            >
                              24 May 2021&nbsp;
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
                              Pmt000002093&nbsp;
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
                              Sayali_Qtech&nbsp;
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
                              200&nbsp;
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
                              INR&nbsp;
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
                              VCC&nbsp;
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
                              0 &nbsp;
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
                              Payment Via VCC&nbsp;
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
                              0 &nbsp;
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
                              0 &nbsp;
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
                              align="center"
                            >
                              24 May 2021&nbsp;
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
                              Pmt000002094&nbsp;
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
                              Sayali_Qtech&nbsp;
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
                              100&nbsp;
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
                              INR&nbsp;
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
                              VCC&nbsp;
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
                              0 &nbsp;
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
                              Payment Via VCC&nbsp;
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
                              0 &nbsp;
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
                              0 &nbsp;
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
                              align="center"
                            >
                              27 May 2021&nbsp;
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
                              Pmt000002095&nbsp;
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
                              Sayali_Qtech&nbsp;
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
                              200&nbsp;
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
                              INR&nbsp;
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
                              VCC&nbsp;
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
                              0 &nbsp;
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
                              Payment Via VCC&nbsp;
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
                              0 &nbsp;
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
                              0 &nbsp;
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
                              align="center"
                            >
                              27 May 2021&nbsp;
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
                              Pmt000002096&nbsp;
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
                              Sayali_Qtech&nbsp;
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
                              100&nbsp;
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
                              INR&nbsp;
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
                              VCC&nbsp;
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
                              0 &nbsp;
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
                              Payment Via VCC&nbsp;
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
                              0 &nbsp;
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
                              0 &nbsp;
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
                              align="center"
                            >
                              31 May 2021&nbsp;
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
                              Pmt000002097&nbsp;
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
                              allwin-qtech&nbsp;
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
                              100&nbsp;
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
                              INR&nbsp;
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
                              VCC&nbsp;
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
                              0 &nbsp;
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
                              Payment Via VCC&nbsp;
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
                              0 &nbsp;
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
                              0 &nbsp;
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
                              align="center"
                            >
                              31 May 2021&nbsp;
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
                              Pmt000002098&nbsp;
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
                              allwin-qtech&nbsp;
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
                              100&nbsp;
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
                              INR&nbsp;
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
                              VCC&nbsp;
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
                              0 &nbsp;
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
                              Payment Via VCC&nbsp;
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
                              0 &nbsp;
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
                              0 &nbsp;
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
                  </div>
                </div>
              </div>
              <br />
              <style
                type="text/css"
                dangerouslySetInnerHTML={{
                  __html:
                    "\n                        /*@media print{\n            .table.dataTable > thead > tr > th, .table.dataTable > thead > tr > td\n            {\n                white-space: normal!important;\n                padding: 8px 5px 8px 5px!important;\n            }\n            \n             tr.bg-primary th { color:#000 !important;}\n        }*/\n                    ",
                }}
              />
            </div>
            <div className="form-group no-result">
              <h5 className="text-center">No Receipt Found.</h5>
            </div>
            <div className="row pd_tp">
              <div className="row">
                <div className="col-md-5">
                  <div className="col-md-12">
                    <a
                      className="btn btn-dark btn-sm form-group"
                      href="/tms/reports.php?run=1&report=payments&supplier_type=local&sel_max_results=50&reservation_id=&consultant_name=&booking_from_date=18-07-2023&booking_to_date=18-08-2023&sbt1=View+Report&download=1"
                    >
                      <i className="fa fa-download" />
                      &nbsp;Download Excel
                    </a>
                    &nbsp;&nbsp;
                    <a
                      className="btn btn-dark btn-sm form-group"
                      href="/tms/reports.php?run=1&report=payments&supplier_type=local&sel_max_results=50&reservation_id=&consultant_name=&booking_from_date=18-07-2023&booking_to_date=18-08-2023&sbt1=View+Report&print=1"
                      target="_blank"
                    >
                      <i className="fa fa-print" />
                      &nbsp;Print
                    </a>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group" />
                </div>
                <div className="col-md-1">
                  <a
                    className="btn btn-dark btn-sm form-group pull-right"
                    href="/tms/reports.php?sbt1=View Report&booking_to_date=18-08-2023&booking_from_date=18-07-2023&consultant_name=&reservation_id=&sel_max_results=50&supplier_type=local&report=payments&run=1&&Total=50&Start=50"
                  >
                    <i className="fa fa-arrow-right" />
                    &nbsp;Next
                  </a>
                </div>
              </div>
            </div>
            <br />
            <br />
          </div>
        </form>
      </div>
    </>
  );
};
export default ReportsAccountsSupplierPayment;
