import Flatpickr from "react-flatpickr";
import React, { useState } from "react";
import up from "../../assets/images/up_arrow.gif";
import down from "../../assets/images/down_arrow.gif";
import { Link } from "react-router-dom";
import Header2 from "../header2/header2";
import MultiSelect from "../reactMultiSelect";
import { countries } from "../../constants/Country-City-Data";
import { AgencyOptions, resultPerpageOptions } from "../../constants/contants";

const ReportsAccountsPaymentGatewayBooking = () => {
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
      <Header2 title="PAYMENT GATEWAY BOOKINGS " />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <div>
          <form>
            <div className="panel-body">
              <div className="row">
                <div className="form-group col-md-3">
                  <label>Agency</label>
                  <MultiSelect
                    options={AgencyOptions}
                    isSearchable
                    placeholder=" Agency "
                    className="custom-select"
                    noOptionsMessage={() => "No Agency Found"}
                  />
                </div>
                <div className="form-group col-md-3">
                  <label>Agent Country</label>
                  <MultiSelect
                    options={countries}
                    isSearchable
                    placeholder="- Select Country -"
                    className="custom-select"
                    noOptionsMessage={() => "No Country Found"}
                  />
                </div>
                <div className="form-group col-md-3">
                  <label>Booking Id</label>
                  <input
                    type="text"
                    className="selectpicker show-menu-arrow form-control form-control-sm"
                    name="txt_booking_id"
                    id="txt_booking_id"
                    size={40}
                    data-live-search="true"
                  />
                </div>
                <div className="form-group col-md-3">
                  <label>Order Reference</label>
                  <input
                    type="text"
                    className="selectpicker show-menu-arrow form-control form-control-sm"
                    name="txt_order_refno"
                    id="txt_order_refno"
                    size={40}
                    data-live-search="true"
                  />
                </div>
              </div>
              <div style={{ display: "none" }}>
                <label>Branches</label>
                <select
                  className="selectpicker show-menu-arrow form-control bs-select-hidden"
                  name="sel_branch"
                  id="sel_branch"
                  data-live-search="true"
                >
                  <option value>All</option>
                </select>
                <div className="btn-group bootstrap-select show-menu-arrow form-control">
                  <button
                    type="button"
                    className="btn dropdown-toggle btn-default"
                    data-toggle="dropdown"
                    data-id="sel_branch"
                    title="All"
                  >
                    <span className="filter-option pull-left">All</span>&nbsp;
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
                    <ul className="dropdown-menu inner" role="menu">
                      <li data-original-index={0} className="selected">
                        <Link
                          tabIndex={0}
                          className
                          style={{}}
                          data-tokens="null"
                        >
                          <span className="text">All</span>
                          <span className="glyphicon glyphicon-ok check-mark" />
                        </Link>
                      </li>
                    </ul>
                  </div>
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
                <div className="form-group col-md-3">
                  <label>Results</label>
                  <MultiSelect
                    options={resultPerpageOptions}
                    isSearchable
                    placeholder="- Select Result -"
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
              </div>
              <div className="row mt-2">
                <div className="col-md-3">
                  <div className="checkbox checkbox-success form-group">
                    <input
                      type="checkbox"
                      defaultValue={1}
                      name="only_markup_bookings"
                      id="only_markup_bookings"
                    />
                    <label htmlFor="only_markup_bookings">
                      Only Additional markup bookings
                    </label>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="checkbox checkbox-success form-group">
                    <input
                      type="checkbox"
                      name="partial_pg_bookings"
                      id="partial_pg_bookings"
                      size={40}
                      defaultValue={1}
                    />
                    <label htmlFor="partial_pg_bookings">
                      Partial Payment Gateway Bookings
                    </label>
                  </div>
                </div>
              </div>
              <br />
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
                __html: "\n.table > thead > tr > td {\n  color: #fff;\n\n}\n",
              }}
            />

            <div
              className="form-group panel-body ui-tabs ui-widget ui-widget-content ui-corner-all removeMargins"
              id="tabs"
              style={{ display: "block" }}
            >
              <div id="tabs">
                <div id="tabs-1" className="tab-pane active">
                  <div id="showContent">
                    <link
                      rel="stylesheet"
                      to="/cpfv3/css/tms/bootstrap_r/css/jquery.dataTables.css"
                    />
                    <link
                      rel="stylesheet"
                      to="/cpfv3/css/tms/bootstrap_r/css/bootstrap-select.css"
                    />
                    <style
                      dangerouslySetInnerHTML={{
                        __html:
                          "\n                                @media print {}\n                            ",
                      }}
                    />
                    <Link
                      className="btn btn-dark btn-sm leftTopBtn"
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
                    <input type="hidden" name="sort_by" id="sort_by" />
                    <input
                      type="hidden"
                      name="current_page"
                      id="current_page"
                    />
                    <div
                      className="doubleScroll-scroll-wrapper"
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
                    <div id="scrollCont" style={{ overflow: "auto" }}>
                      <table
                        id="search_sup"
                        className="table table-bordered   table-responsive alignTbl"
                      >
                        <thead>
                          <tr>
                            <td align="center" className="bold padd_5 brdr">
                              Booking Date
                              <Link>
                                <img
                                  src={up}
                                  alt=""
                                  border={0}
                                  height={5}
                                  width={9}
                                />
                              </Link>
                              <Link>
                                <img
                                  src={down}
                                  alt=""
                                  border={0}
                                  height={5}
                                  width={9}
                                />
                              </Link>
                            </td>
                            <td
                              align="center"
                              className="bold padd_5 brdr no-sort"
                            >
                              Service Date
                            </td>
                            <td align="center" className="bold padd_5 brdr">
                              Booking ID
                              <Link>
                                <img
                                  src={up}
                                  alt=""
                                  border={0}
                                  height={5}
                                  width={9}
                                />
                              </Link>
                              <Link>
                                <img
                                  src={down}
                                  alt=""
                                  border={0}
                                  height={5}
                                  width={9}
                                />
                              </Link>
                            </td>
                            <td
                              align="center"
                              className="bold padd_5 brdr no-sort"
                            >
                              Aquirer Id
                            </td>
                            <td
                              align="center"
                              className="bold padd_5 brdr no-sort"
                            >
                              Order Reference
                            </td>
                            <td align="center" className="bold padd_5 brdr">
                              Agent Name
                              <Link>
                                <img
                                  src={up}
                                  alt=""
                                  border={0}
                                  height={5}
                                  width={9}
                                />
                              </Link>
                              <Link>
                                <img
                                  src={down}
                                  alt=""
                                  border={0}
                                  height={5}
                                  width={9}
                                />
                              </Link>
                            </td>
                            <td
                              align="center"
                              className="bold padd_5 brdr no-sort"
                            >
                              Current Status
                            </td>
                            <td
                              align="center"
                              className="bold padd_5 brdr numAlign"
                            >
                              Total Amount
                              <Link>
                                <img
                                  src={up}
                                  alt=""
                                  border={0}
                                  height={5}
                                  width={9}
                                />
                              </Link>
                              <Link>
                                <img
                                  src={down}
                                  alt=""
                                  border={0}
                                  height={5}
                                  width={9}
                                />
                              </Link>
                            </td>
                            <td
                              align="center"
                              className="bold padd_5 brdr no-sort numAlign"
                            >
                              Markup
                            </td>
                            <td
                              align="center"
                              className="bold padd_5 brdr no-sort numAlign"
                            >
                              Markup %
                            </td>
                            <td align="center" className="bold brdr numAlign">
                              Additional Charge
                              <Link>
                                <img
                                  src={up}
                                  alt=""
                                  border={0}
                                  height={5}
                                  width={9}
                                />
                              </Link>
                              <Link>
                                <img
                                  src={down}
                                  alt=""
                                  border={0}
                                  height={5}
                                  width={9}
                                />
                              </Link>
                            </td>
                            <td
                              align="center"
                              className="bold padd_5 brdr no-sort numAlign"
                            >
                              Gross Amount
                            </td>
                            <td align="center" className="no-sort numAlign">
                              Gross Amount With Markup
                            </td>
                            <td
                              align="center"
                              className="bold padd_5 brdr no-sort numAlign"
                            >
                              Partial Amout
                            </td>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          <tr className="phps_row_1">
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">04</div>
                                <div className="monthYear">
                                  Dec
                                  <br />
                                  2017
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">01</div>
                                <div className="monthYear">
                                  Nov
                                  <br />
                                  2017
                                </div>
                              </div>
                            </td>
                            <td align="left" className="brdr padd_5">
                              TD200011
                            </td>
                            <td align="right" className="brdr padd_5">
                              CREDIMAX
                            </td>
                            <td align="right" className="brdr padd_5">
                              20171204055631
                            </td>
                            <td align="right" className="brdr padd_5">
                              Qtech
                            </td>
                            <td>
                              <label className="tdd_label label-danger">
                                Failed
                              </label>
                            </td>
                            <td align="left" className="brdr padd_5 numAlign">
                              INR&nbsp;3419.980
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;0.000{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;3419.98{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              {" "}
                              INR&nbsp;3419.98
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.000&nbsp;INR
                            </td>
                          </tr>
                          <tr className="phps_row_0">
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">05</div>
                                <div className="monthYear">
                                  Feb
                                  <br />
                                  2018
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">30</div>
                                <div className="monthYear">
                                  Mar
                                  <br />
                                  2018
                                </div>
                              </div>
                            </td>
                            <td align="left" className="brdr padd_5">
                              00265
                            </td>
                            <td align="right" className="brdr padd_5">
                              CREDIMAX
                            </td>
                            <td align="right" className="brdr padd_5">
                              20180205073040
                            </td>
                            <td align="right" className="brdr padd_5">
                              Qtech
                            </td>
                            <td>
                              <label className="tdd_label label-info">
                                Confirmed
                              </label>
                            </td>
                            <td align="left" className="brdr padd_5 numAlign">
                              INR&nbsp;16176.920
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;0.000{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;16176.92{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              {" "}
                              INR&nbsp;16176.92
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.000&nbsp;INR
                            </td>
                          </tr>
                          <tr className="phps_row_1">
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">09</div>
                                <div className="monthYear">
                                  Feb
                                  <br />
                                  2018
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">30</div>
                                <div className="monthYear">
                                  Mar
                                  <br />
                                  2018
                                </div>
                              </div>
                            </td>
                            <td align="left" className="brdr padd_5">
                              00276
                            </td>
                            <td align="right" className="brdr padd_5">
                              CREDIMAX
                            </td>
                            <td align="right" className="brdr padd_5">
                              20180209044430
                            </td>
                            <td align="right" className="brdr padd_5">
                              Qtech
                            </td>
                            <td>
                              <label className="tdd_label label-info">
                                Confirmed
                              </label>
                            </td>
                            <td align="left" className="brdr padd_5 numAlign">
                              INR&nbsp;16176.920
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;0.000{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;16176.92{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              {" "}
                              INR&nbsp;16176.92
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.000&nbsp;INR
                            </td>
                          </tr>
                          <tr className="phps_row_0">
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">09</div>
                                <div className="monthYear">
                                  Feb
                                  <br />
                                  2018
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">28</div>
                                <div className="monthYear">
                                  Mar
                                  <br />
                                  2018
                                </div>
                              </div>
                            </td>
                            <td align="left" className="brdr padd_5">
                              00277
                            </td>
                            <td align="right" className="brdr padd_5">
                              CREDIMAX
                            </td>
                            <td align="right" className="brdr padd_5">
                              20180209061233
                            </td>
                            <td align="right" className="brdr padd_5">
                              Qtech
                            </td>
                            <td>
                              <label className="tdd_label label-info">
                                Confirmed
                              </label>
                            </td>
                            <td align="left" className="brdr padd_5 numAlign">
                              INR&nbsp;16176.920
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;0.000{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;16176.92{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              {" "}
                              INR&nbsp;16176.92
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.000&nbsp;INR
                            </td>
                          </tr>
                          <tr className="phps_row_1">
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">09</div>
                                <div className="monthYear">
                                  Feb
                                  <br />
                                  2018
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">28</div>
                                <div className="monthYear">
                                  Mar
                                  <br />
                                  2018
                                </div>
                              </div>
                            </td>
                            <td align="left" className="brdr padd_5">
                              00278
                            </td>
                            <td align="right" className="brdr padd_5">
                              CREDIMAX
                            </td>
                            <td align="right" className="brdr padd_5">
                              20180209065056
                            </td>
                            <td align="right" className="brdr padd_5">
                              Qtech
                            </td>
                            <td>
                              <label className="tdd_label label-info">
                                Confirmed
                              </label>
                            </td>
                            <td align="left" className="brdr padd_5 numAlign">
                              INR&nbsp;16176.920
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;0.000{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;16176.92{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              {" "}
                              INR&nbsp;16176.92
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.000&nbsp;INR
                            </td>
                          </tr>
                          <tr className="phps_row_0">
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">09</div>
                                <div className="monthYear">
                                  Feb
                                  <br />
                                  2018
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">28</div>
                                <div className="monthYear">
                                  Mar
                                  <br />
                                  2018
                                </div>
                              </div>
                            </td>
                            <td align="left" className="brdr padd_5">
                              00279
                            </td>
                            <td align="right" className="brdr padd_5">
                              CREDIMAX
                            </td>
                            <td align="right" className="brdr padd_5">
                              20180209070526
                            </td>
                            <td align="right" className="brdr padd_5">
                              Qtech
                            </td>
                            <td>
                              <label className="tdd_label label-info">
                                Confirmed
                              </label>
                            </td>
                            <td align="left" className="brdr padd_5 numAlign">
                              INR&nbsp;16176.920
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;0.000{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;16176.92{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              {" "}
                              INR&nbsp;16176.92
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.000&nbsp;INR
                            </td>
                          </tr>
                          <tr className="phps_row_1">
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">02</div>
                                <div className="monthYear">
                                  Feb
                                  <br />
                                  2018
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">01</div>
                                <div className="monthYear">
                                  Jul
                                  <br />
                                  2018
                                </div>
                              </div>
                            </td>
                            <td align="left" className="brdr padd_5">
                              TD000261
                            </td>
                            <td align="right" className="brdr padd_5">
                              CREDIMAX
                            </td>
                            <td align="right" className="brdr padd_5">
                              20180209090707
                            </td>
                            <td align="right" className="brdr padd_5">
                              Qtech
                            </td>
                            <td>
                              <label className="tdd_label label-info">
                                Confirmed
                              </label>
                            </td>
                            <td align="left" className="brdr padd_5 numAlign">
                              INR&nbsp;4656.660
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;93.130{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;4749.79{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              {" "}
                              INR&nbsp;4749.79
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.000&nbsp;INR
                            </td>
                          </tr>
                          <tr className="phps_row_0">
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">09</div>
                                <div className="monthYear">
                                  Feb
                                  <br />
                                  2018
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">30</div>
                                <div className="monthYear">
                                  Mar
                                  <br />
                                  2018
                                </div>
                              </div>
                            </td>
                            <td align="left" className="brdr padd_5">
                              00280
                            </td>
                            <td align="right" className="brdr padd_5">
                              CREDIMAX
                            </td>
                            <td align="right" className="brdr padd_5">
                              20180209092811
                            </td>
                            <td align="right" className="brdr padd_5">
                              Qtech
                            </td>
                            <td>
                              <label className="tdd_label label-info">
                                Confirmed
                              </label>
                            </td>
                            <td align="left" className="brdr padd_5 numAlign">
                              INR&nbsp;16176.920
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;323.540{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;16500.46{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              {" "}
                              INR&nbsp;16500.46
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.000&nbsp;INR
                            </td>
                          </tr>
                          <tr className="phps_row_1">
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">09</div>
                                <div className="monthYear">
                                  Feb
                                  <br />
                                  2018
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">30</div>
                                <div className="monthYear">
                                  Mar
                                  <br />
                                  2018
                                </div>
                              </div>
                            </td>
                            <td align="left" className="brdr padd_5">
                              00281
                            </td>
                            <td align="right" className="brdr padd_5">
                              CREDIMAX
                            </td>
                            <td align="right" className="brdr padd_5">
                              20180209093351
                            </td>
                            <td align="right" className="brdr padd_5">
                              Qtech
                            </td>
                            <td>
                              <label className="tdd_label label-info">
                                Confirmed
                              </label>
                            </td>
                            <td align="left" className="brdr padd_5 numAlign">
                              INR&nbsp;16176.920
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;323.540{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;16500.46{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              {" "}
                              INR&nbsp;16500.46
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.000&nbsp;INR
                            </td>
                          </tr>
                          <tr className="phps_row_0">
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">20</div>
                                <div className="monthYear">
                                  Feb
                                  <br />
                                  2018
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">30</div>
                                <div className="monthYear">
                                  Mar
                                  <br />
                                  2018
                                </div>
                              </div>
                            </td>
                            <td align="left" className="brdr padd_5">
                              TD000297
                            </td>
                            <td align="right" className="brdr padd_5">
                              CREDIMAX
                            </td>
                            <td align="right" className="brdr padd_5">
                              20180220115746
                            </td>
                            <td align="right" className="brdr padd_5">
                              Qtech
                            </td>
                            <td>
                              <label className="tdd_label label-info">
                                Confirmed
                              </label>
                            </td>
                            <td align="left" className="brdr padd_5 numAlign">
                              INR&nbsp;4676.300
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;0.000{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;4676.3{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              {" "}
                              INR&nbsp;4676.3
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.000&nbsp;INR
                            </td>
                          </tr>
                          <tr className="phps_row_1">
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">02</div>
                                <div className="monthYear">
                                  Feb
                                  <br />
                                  2018
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">01</div>
                                <div className="monthYear">
                                  Nov
                                  <br />
                                  2017
                                </div>
                              </div>
                            </td>
                            <td align="left" className="brdr padd_5">
                              TD000254
                            </td>
                            <td align="right" className="brdr padd_5">
                              CREDIMAX
                            </td>
                            <td align="right" className="brdr padd_5">
                              20180220121211
                            </td>
                            <td align="right" className="brdr padd_5">
                              Qtech
                            </td>
                            <td>
                              <label className="tdd_label label-info">
                                Confirmed
                              </label>
                            </td>
                            <td align="left" className="brdr padd_5 numAlign">
                              INR&nbsp;4091.770
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;0.000{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;4091.77{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              {" "}
                              INR&nbsp;4091.77
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.000&nbsp;INR
                            </td>
                          </tr>
                          <tr className="phps_row_0">
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">02</div>
                                <div className="monthYear">
                                  Feb
                                  <br />
                                  2018
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">27</div>
                                <div className="monthYear">
                                  Apr
                                  <br />
                                  2018
                                </div>
                              </div>
                            </td>
                            <td align="left" className="brdr padd_5">
                              TD000250
                            </td>
                            <td align="right" className="brdr padd_5">
                              CREDIMAX
                            </td>
                            <td align="right" className="brdr padd_5">
                              20180221092607
                            </td>
                            <td align="right" className="brdr padd_5">
                              Qtech
                            </td>
                            <td>
                              <label className="tdd_label label-info">
                                Confirmed
                              </label>
                            </td>
                            <td align="left" className="brdr padd_5 numAlign">
                              INR&nbsp;3887.180
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;194.360{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;4081.54{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              {" "}
                              INR&nbsp;4081.54
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.000&nbsp;INR
                            </td>
                          </tr>
                          <tr className="phps_row_1">
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">22</div>
                                <div className="monthYear">
                                  Feb
                                  <br />
                                  2018
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">03</div>
                                <div className="monthYear">
                                  May
                                  <br />
                                  2018
                                </div>
                              </div>
                            </td>
                            <td align="left" className="brdr padd_5">
                              TD000329
                            </td>
                            <td align="right" className="brdr padd_5">
                              CREDIMAX
                            </td>
                            <td align="right" className="brdr padd_5">
                              20180222065616
                            </td>
                            <td align="right" className="brdr padd_5">
                              Qtech
                            </td>
                            <td>
                              <label className="tdd_label label-danger">
                                Cancelled
                              </label>
                            </td>
                            <td align="left" className="brdr padd_5 numAlign">
                              INR&nbsp;10.000
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;189.030{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;199.03{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              {" "}
                              INR&nbsp;199.03
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.000&nbsp;INR
                            </td>
                          </tr>
                          <tr className="phps_row_0">
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">22</div>
                                <div className="monthYear">
                                  Feb
                                  <br />
                                  2018
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">02</div>
                                <div className="monthYear">
                                  May
                                  <br />
                                  2018
                                </div>
                              </div>
                            </td>
                            <td align="left" className="brdr padd_5">
                              TD000330
                            </td>
                            <td align="right" className="brdr padd_5">
                              CREDIMAX
                            </td>
                            <td align="right" className="brdr padd_5">
                              20180222074723
                            </td>
                            <td align="right" className="brdr padd_5">
                              Qtech
                            </td>
                            <td>
                              <label className="tdd_label label-danger">
                                Cancelled
                              </label>
                            </td>
                            <td align="left" className="brdr padd_5 numAlign">
                              USD&nbsp;10.000
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              USD&nbsp;0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              USD&nbsp;2.580{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              USD&nbsp;12.58{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              {" "}
                              USD&nbsp;12.58
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.000&nbsp;USD
                            </td>
                          </tr>
                          <tr className="phps_row_1">
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">22</div>
                                <div className="monthYear">
                                  Feb
                                  <br />
                                  2018
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">01</div>
                                <div className="monthYear">
                                  Nov
                                  <br />
                                  2017
                                </div>
                              </div>
                            </td>
                            <td align="left" className="brdr padd_5">
                              TD000332
                            </td>
                            <td align="right" className="brdr padd_5">
                              CREDIMAX
                            </td>
                            <td align="right" className="brdr padd_5">
                              20180222095453
                            </td>
                            <td align="right" className="brdr padd_5">
                              Qtech
                            </td>
                            <td>
                              <label className="tdd_label label-danger">
                                Cancelled
                              </label>
                            </td>
                            <td align="left" className="brdr padd_5 numAlign">
                              USD&nbsp;10.000
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              USD&nbsp;0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              USD&nbsp;0.000{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              USD&nbsp;10{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              {" "}
                              USD&nbsp;10
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.000&nbsp;USD
                            </td>
                          </tr>
                          <tr className="phps_row_0">
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">22</div>
                                <div className="monthYear">
                                  Feb
                                  <br />
                                  2018
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">01</div>
                                <div className="monthYear">
                                  Nov
                                  <br />
                                  2017
                                </div>
                              </div>
                            </td>
                            <td align="left" className="brdr padd_5">
                              TD000333
                            </td>
                            <td align="right" className="brdr padd_5">
                              CREDIMAX
                            </td>
                            <td align="right" className="brdr padd_5">
                              20180222100442
                            </td>
                            <td align="right" className="brdr padd_5">
                              Qtech
                            </td>
                            <td>
                              <label className="tdd_label label-danger">
                                Cancelled
                              </label>
                            </td>
                            <td align="left" className="brdr padd_5 numAlign">
                              USD&nbsp;5.000
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              USD&nbsp;0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              USD&nbsp;0.000{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              USD&nbsp;5{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              {" "}
                              USD&nbsp;5
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.000&nbsp;USD
                            </td>
                          </tr>
                          <tr className="phps_row_1">
                            <td> —</td>
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">14</div>
                                <div className="monthYear">
                                  Jan
                                  <br />
                                  2019
                                </div>
                              </div>
                            </td>
                            <td align="left" className="brdr padd_5">
                              TD301239
                            </td>
                            <td align="right" className="brdr padd_5">
                              CREDIMAX
                            </td>
                            <td align="right" className="brdr padd_5">
                              20190114052016
                            </td>
                            <td align="right" className="brdr padd_5">
                              Neeraj
                            </td>
                            <td>
                              <label className="tdd_label label-warning">
                                Vouchered
                              </label>
                            </td>
                            <td align="left" className="brdr padd_5 numAlign">
                              SAR&nbsp;10.000
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              SAR&nbsp;0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              SAR&nbsp;0.300{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              SAR&nbsp;10.3{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              {" "}
                              SAR&nbsp;10.3
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.000&nbsp;SAR
                            </td>
                          </tr>
                          <tr className="phps_row_0">
                            <td> —</td>
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">14</div>
                                <div className="monthYear">
                                  Jan
                                  <br />
                                  2019
                                </div>
                              </div>
                            </td>
                            <td align="left" className="brdr padd_5">
                              TD301240
                            </td>
                            <td align="right" className="brdr padd_5">
                              CREDIMAX
                            </td>
                            <td align="right" className="brdr padd_5">
                              20190114060309
                            </td>
                            <td align="right" className="brdr padd_5">
                              Neeraj
                            </td>
                            <td>
                              <label className="tdd_label label-warning">
                                Vouchered
                              </label>
                            </td>
                            <td align="left" className="brdr padd_5 numAlign">
                              SAR&nbsp;10.000
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              SAR&nbsp;0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              SAR&nbsp;0.300{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              SAR&nbsp;10.3{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              {" "}
                              SAR&nbsp;10.3
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.000&nbsp;SAR
                            </td>
                          </tr>
                          <tr className="phps_row_1">
                            <td> —</td>
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">14</div>
                                <div className="monthYear">
                                  Jan
                                  <br />
                                  2019
                                </div>
                              </div>
                            </td>
                            <td align="left" className="brdr padd_5">
                              TD301241
                            </td>
                            <td align="right" className="brdr padd_5">
                              CREDIMAX
                            </td>
                            <td align="right" className="brdr padd_5">
                              20190114061340
                            </td>
                            <td align="right" className="brdr padd_5">
                              Neeraj
                            </td>
                            <td>
                              <label className="tdd_label label-warning">
                                Vouchered
                              </label>
                            </td>
                            <td align="left" className="brdr padd_5 numAlign">
                              SAR&nbsp;10.000
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              SAR&nbsp;0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              SAR&nbsp;0.300{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              SAR&nbsp;10.3{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              {" "}
                              SAR&nbsp;10.3
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.000&nbsp;SAR
                            </td>
                          </tr>
                          <tr className="phps_row_0">
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">04</div>
                                <div className="monthYear">
                                  May
                                  <br />
                                  2019
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">31</div>
                                <div className="monthYear">
                                  May
                                  <br />
                                  2019
                                </div>
                              </div>
                            </td>
                            <td align="left" className="brdr padd_5">
                              TD802156
                            </td>
                            <td align="right" className="brdr padd_5">
                              CREDIMAX
                            </td>
                            <td align="right" className="brdr padd_5">
                              20190504052558
                            </td>
                            <td align="right" className="brdr padd_5">
                              Neeraj
                            </td>
                            <td>
                              <label className="tdd_label label-info">
                                On_request
                              </label>
                            </td>
                            <td align="left" className="brdr padd_5 numAlign">
                              SAR&nbsp;486.540
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              SAR&nbsp;0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              SAR&nbsp;14.600{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              SAR&nbsp;501.14{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              {" "}
                              SAR&nbsp;501.14
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.000&nbsp;SAR
                            </td>
                          </tr>
                          <tr className="phps_row_1">
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">24</div>
                                <div className="monthYear">
                                  Oct
                                  <br />
                                  2019
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">15</div>
                                <div className="monthYear">
                                  Mar
                                  <br />
                                  2020
                                </div>
                              </div>
                            </td>
                            <td align="left" className="brdr padd_5">
                              03447
                            </td>
                            <td align="right" className="brdr padd_5" />
                            <td align="right" className="brdr padd_5" />
                            <td align="right" className="brdr padd_5">
                              Qtech
                            </td>
                            <td>
                              <label className="tdd_label label-warning">
                                Vouchered
                              </label>
                            </td>
                            <td align="left" className="brdr padd_5 numAlign">
                              INR&nbsp;1217.958
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;0.000{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;1217.958{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              {" "}
                              INR&nbsp;1217.958
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.000&nbsp;INR
                            </td>
                          </tr>
                          <tr className="phps_row_0">
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">24</div>
                                <div className="monthYear">
                                  Oct
                                  <br />
                                  2019
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">15</div>
                                <div className="monthYear">
                                  Mar
                                  <br />
                                  2020
                                </div>
                              </div>
                            </td>
                            <td align="left" className="brdr padd_5">
                              03448
                            </td>
                            <td align="right" className="brdr padd_5" />
                            <td align="right" className="brdr padd_5" />
                            <td align="right" className="brdr padd_5">
                              Qtech
                            </td>
                            <td>
                              <label className="tdd_label label-warning">
                                Vouchered
                              </label>
                            </td>
                            <td align="left" className="brdr padd_5 numAlign">
                              INR&nbsp;1217.958
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;0.000{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;1217.958{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              {" "}
                              INR&nbsp;1217.958
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.000&nbsp;INR
                            </td>
                          </tr>
                          <tr className="phps_row_1">
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">24</div>
                                <div className="monthYear">
                                  Oct
                                  <br />
                                  2019
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">15</div>
                                <div className="monthYear">
                                  Mar
                                  <br />
                                  2020
                                </div>
                              </div>
                            </td>
                            <td align="left" className="brdr padd_5">
                              03449
                            </td>
                            <td align="right" className="brdr padd_5" />
                            <td align="right" className="brdr padd_5" />
                            <td align="right" className="brdr padd_5">
                              Qtech
                            </td>
                            <td>
                              <label className="tdd_label label-warning">
                                Vouchered
                              </label>
                            </td>
                            <td align="left" className="brdr padd_5 numAlign">
                              INR&nbsp;1217.958
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;0.000{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;1217.958{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              {" "}
                              INR&nbsp;1217.958
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.000&nbsp;INR
                            </td>
                          </tr>
                          <tr className="phps_row_0">
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">24</div>
                                <div className="monthYear">
                                  Oct
                                  <br />
                                  2019
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">15</div>
                                <div className="monthYear">
                                  Mar
                                  <br />
                                  2020
                                </div>
                              </div>
                            </td>
                            <td align="left" className="brdr padd_5">
                              03450
                            </td>
                            <td align="right" className="brdr padd_5" />
                            <td align="right" className="brdr padd_5" />
                            <td align="right" className="brdr padd_5">
                              Qtech
                            </td>
                            <td>
                              <label className="tdd_label label-warning">
                                Vouchered
                              </label>
                            </td>
                            <td align="left" className="brdr padd_5 numAlign">
                              INR&nbsp;1217.958
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;0.000{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;1217.958{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              {" "}
                              INR&nbsp;1217.958
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.000&nbsp;INR
                            </td>
                          </tr>
                          <tr className="phps_row_1">
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">25</div>
                                <div className="monthYear">
                                  Oct
                                  <br />
                                  2019
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">15</div>
                                <div className="monthYear">
                                  Mar
                                  <br />
                                  2020
                                </div>
                              </div>
                            </td>
                            <td align="left" className="brdr padd_5">
                              03452
                            </td>
                            <td align="right" className="brdr padd_5" />
                            <td align="right" className="brdr padd_5" />
                            <td align="right" className="brdr padd_5">
                              Qtech
                            </td>
                            <td>
                              <label className="tdd_label label-warning">
                                Vouchered
                              </label>
                            </td>
                            <td align="left" className="brdr padd_5 numAlign">
                              INR&nbsp;1214.949
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;0.000{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;1214.949{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              {" "}
                              INR&nbsp;1214.949
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.000&nbsp;INR
                            </td>
                          </tr>
                          <tr className="phps_row_0">
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">25</div>
                                <div className="monthYear">
                                  Oct
                                  <br />
                                  2019
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">15</div>
                                <div className="monthYear">
                                  Mar
                                  <br />
                                  2020
                                </div>
                              </div>
                            </td>
                            <td align="left" className="brdr padd_5">
                              03453
                            </td>
                            <td align="right" className="brdr padd_5" />
                            <td align="right" className="brdr padd_5" />
                            <td align="right" className="brdr padd_5">
                              Qtech
                            </td>
                            <td>
                              <label className="tdd_label label-warning">
                                Vouchered
                              </label>
                            </td>
                            <td align="left" className="brdr padd_5 numAlign">
                              INR&nbsp;1214.949
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;0.000{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;1214.949{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              {" "}
                              INR&nbsp;1214.949
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.000&nbsp;INR
                            </td>
                          </tr>
                          <tr className="phps_row_1">
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">25</div>
                                <div className="monthYear">
                                  Oct
                                  <br />
                                  2019
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">15</div>
                                <div className="monthYear">
                                  Mar
                                  <br />
                                  2020
                                </div>
                              </div>
                            </td>
                            <td align="left" className="brdr padd_5">
                              03454
                            </td>
                            <td align="right" className="brdr padd_5" />
                            <td align="right" className="brdr padd_5" />
                            <td align="right" className="brdr padd_5">
                              Qtech
                            </td>
                            <td>
                              <label className="tdd_label label-warning">
                                Vouchered
                              </label>
                            </td>
                            <td align="left" className="brdr padd_5 numAlign">
                              INR&nbsp;1214.949
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;0.000{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;1214.949{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              {" "}
                              INR&nbsp;1214.949
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.000&nbsp;INR
                            </td>
                          </tr>
                          <tr className="phps_row_0">
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">25</div>
                                <div className="monthYear">
                                  Oct
                                  <br />
                                  2019
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">15</div>
                                <div className="monthYear">
                                  Mar
                                  <br />
                                  2020
                                </div>
                              </div>
                            </td>
                            <td align="left" className="brdr padd_5">
                              03455
                            </td>
                            <td align="right" className="brdr padd_5" />
                            <td align="right" className="brdr padd_5" />
                            <td align="right" className="brdr padd_5">
                              Qtech
                            </td>
                            <td>
                              <label className="tdd_label label-warning">
                                Vouchered
                              </label>
                            </td>
                            <td align="left" className="brdr padd_5 numAlign">
                              INR&nbsp;1214.949
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;0.000{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;1214.949{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              {" "}
                              INR&nbsp;1214.949
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.000&nbsp;INR
                            </td>
                          </tr>
                          <tr className="phps_row_1">
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">25</div>
                                <div className="monthYear">
                                  Oct
                                  <br />
                                  2019
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">15</div>
                                <div className="monthYear">
                                  Jan
                                  <br />
                                  2020
                                </div>
                              </div>
                            </td>
                            <td align="left" className="brdr padd_5">
                              03456
                            </td>
                            <td align="right" className="brdr padd_5" />
                            <td align="right" className="brdr padd_5" />
                            <td align="right" className="brdr padd_5">
                              Nida
                            </td>
                            <td>
                              <label className="tdd_label label-warning">
                                Vouchered
                              </label>
                            </td>
                            <td align="left" className="brdr padd_5 numAlign">
                              INR&nbsp;1214.950
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;0.000{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;1214.95{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              {" "}
                              INR&nbsp;1214.95
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.000&nbsp;INR
                            </td>
                          </tr>
                          <tr className="phps_row_0">
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">25</div>
                                <div className="monthYear">
                                  Oct
                                  <br />
                                  2019
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">15</div>
                                <div className="monthYear">
                                  Mar
                                  <br />
                                  2020
                                </div>
                              </div>
                            </td>
                            <td align="left" className="brdr padd_5">
                              03457
                            </td>
                            <td align="right" className="brdr padd_5" />
                            <td align="right" className="brdr padd_5" />
                            <td align="right" className="brdr padd_5">
                              Qtech
                            </td>
                            <td>
                              <label className="tdd_label label-warning">
                                Vouchered
                              </label>
                            </td>
                            <td align="left" className="brdr padd_5 numAlign">
                              INR&nbsp;1214.949
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;0.000{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;1214.949{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              {" "}
                              INR&nbsp;1214.949
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.000&nbsp;INR
                            </td>
                          </tr>
                          <tr className="phps_row_1">
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">26</div>
                                <div className="monthYear">
                                  Nov
                                  <br />
                                  2019
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">20</div>
                                <div className="monthYear">
                                  Dec
                                  <br />
                                  2019
                                </div>
                              </div>
                            </td>
                            <td align="left" className="brdr padd_5">
                              03508
                            </td>
                            <td align="right" className="brdr padd_5">
                              HP
                            </td>
                            <td align="right" className="brdr padd_5">
                              20191126055949
                            </td>
                            <td align="right" className="brdr padd_5">
                              Vartak Holidazzle
                            </td>
                            <td>
                              <label className="tdd_label label-danger">
                                Cancelled
                              </label>
                            </td>
                            <td align="left" className="brdr padd_5 numAlign">
                              INR&nbsp;0.000
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;223.400{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;223.4{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              {" "}
                              INR&nbsp;223.4
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.000&nbsp;INR
                            </td>
                          </tr>
                          <tr className="phps_row_0">
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">26</div>
                                <div className="monthYear">
                                  Nov
                                  <br />
                                  2019
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">27</div>
                                <div className="monthYear">
                                  Nov
                                  <br />
                                  2019
                                </div>
                              </div>
                            </td>
                            <td align="left" className="brdr padd_5">
                              03516
                            </td>
                            <td align="right" className="brdr padd_5">
                              HP
                            </td>
                            <td align="right" className="brdr padd_5">
                              20191126104105
                            </td>
                            <td align="right" className="brdr padd_5">
                              Vartak Holidazzle
                            </td>
                            <td>
                              <label className="tdd_label label-warning">
                                Vouchered
                              </label>
                            </td>
                            <td align="left" className="brdr padd_5 numAlign">
                              INR&nbsp;15564.208
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;311.284{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;15875.492{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              {" "}
                              INR&nbsp;15875.492
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.000&nbsp;INR
                            </td>
                          </tr>
                          <tr className="phps_row_1">
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">27</div>
                                <div className="monthYear">
                                  Nov
                                  <br />
                                  2019
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">27</div>
                                <div className="monthYear">
                                  Nov
                                  <br />
                                  2019
                                </div>
                              </div>
                            </td>
                            <td align="left" className="brdr padd_5">
                              03526
                            </td>
                            <td align="right" className="brdr padd_5" />
                            <td align="right" className="brdr padd_5" />
                            <td align="right" className="brdr padd_5">
                              Vartak Holidazzle
                            </td>
                            <td>
                              <label className="tdd_label label-warning">
                                Vouchered
                              </label>
                            </td>
                            <td align="left" className="brdr padd_5 numAlign">
                              INR&nbsp;2710.320
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;0.000{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;2710.32{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              {" "}
                              INR&nbsp;2710.32
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.000&nbsp;INR
                            </td>
                          </tr>
                          <tr className="phps_row_0">
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">27</div>
                                <div className="monthYear">
                                  Nov
                                  <br />
                                  2019
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">27</div>
                                <div className="monthYear">
                                  Nov
                                  <br />
                                  2019
                                </div>
                              </div>
                            </td>
                            <td align="left" className="brdr padd_5">
                              03527
                            </td>
                            <td align="right" className="brdr padd_5" />
                            <td align="right" className="brdr padd_5" />
                            <td align="right" className="brdr padd_5">
                              Vartak Holidazzle
                            </td>
                            <td>
                              <label className="tdd_label label-warning">
                                Vouchered
                              </label>
                            </td>
                            <td align="left" className="brdr padd_5 numAlign">
                              INR&nbsp;2175.960
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;0.000{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;2175.96{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              {" "}
                              INR&nbsp;2175.96
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.000&nbsp;INR
                            </td>
                          </tr>
                          <tr className="phps_row_1">
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">06</div>
                                <div className="monthYear">
                                  Dec
                                  <br />
                                  2019
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">23</div>
                                <div className="monthYear">
                                  Feb
                                  <br />
                                  2020
                                </div>
                              </div>
                            </td>
                            <td align="left" className="brdr padd_5">
                              TD1103561
                            </td>
                            <td align="right" className="brdr padd_5" />
                            <td align="right" className="brdr padd_5" />
                            <td align="right" className="brdr padd_5">
                              Tech
                            </td>
                            <td>
                              <label className="tdd_label label-info">
                                On_request
                              </label>
                            </td>
                            <td align="left" className="brdr padd_5 numAlign">
                              USD&nbsp;280.400
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              USD&nbsp;0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              USD&nbsp;0.000{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              USD&nbsp;280.4{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              {" "}
                              USD&nbsp;280.4
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.000&nbsp;USD
                            </td>
                          </tr>
                          <tr className="phps_row_0">
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">06</div>
                                <div className="monthYear">
                                  Dec
                                  <br />
                                  2019
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">27</div>
                                <div className="monthYear">
                                  Feb
                                  <br />
                                  2020
                                </div>
                              </div>
                            </td>
                            <td align="left" className="brdr padd_5">
                              TD1103571
                            </td>
                            <td align="right" className="brdr padd_5" />
                            <td align="right" className="brdr padd_5" />
                            <td align="right" className="brdr padd_5">
                              Tech
                            </td>
                            <td>
                              <label className="tdd_label label-info">
                                On_request
                              </label>
                            </td>
                            <td align="left" className="brdr padd_5 numAlign">
                              USD&nbsp;483.530
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              USD&nbsp;0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              USD&nbsp;0.000{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              USD&nbsp;483.53{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              {" "}
                              USD&nbsp;483.53
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.000&nbsp;USD
                            </td>
                          </tr>
                          <tr className="phps_row_1">
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">09</div>
                                <div className="monthYear">
                                  Dec
                                  <br />
                                  2019
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">29</div>
                                <div className="monthYear">
                                  Mar
                                  <br />
                                  2020
                                </div>
                              </div>
                            </td>
                            <td align="left" className="brdr padd_5">
                              TD1103580
                            </td>
                            <td align="right" className="brdr padd_5" />
                            <td align="right" className="brdr padd_5" />
                            <td align="right" className="brdr padd_5">
                              Tech
                            </td>
                            <td>
                              <label className="tdd_label label-info">
                                On_request
                              </label>
                            </td>
                            <td align="left" className="brdr padd_5 numAlign">
                              USD&nbsp;220.890
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              USD&nbsp;0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              USD&nbsp;0.000{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              USD&nbsp;220.89{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              {" "}
                              USD&nbsp;220.89
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.000&nbsp;USD
                            </td>
                          </tr>
                          <tr className="phps_row_0">
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">09</div>
                                <div className="monthYear">
                                  Dec
                                  <br />
                                  2019
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">29</div>
                                <div className="monthYear">
                                  Mar
                                  <br />
                                  2020
                                </div>
                              </div>
                            </td>
                            <td align="left" className="brdr padd_5">
                              TD1103583
                            </td>
                            <td align="right" className="brdr padd_5" />
                            <td align="right" className="brdr padd_5" />
                            <td align="right" className="brdr padd_5">
                              Tech
                            </td>
                            <td>
                              <label className="tdd_label label-info">
                                On_request
                              </label>
                            </td>
                            <td align="left" className="brdr padd_5 numAlign">
                              USD&nbsp;220.890
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              USD&nbsp;0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              USD&nbsp;0.000{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              USD&nbsp;220.89{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              {" "}
                              USD&nbsp;220.89
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.000&nbsp;USD
                            </td>
                          </tr>
                          <tr className="phps_row_1">
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">09</div>
                                <div className="monthYear">
                                  Dec
                                  <br />
                                  2019
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">29</div>
                                <div className="monthYear">
                                  Mar
                                  <br />
                                  2020
                                </div>
                              </div>
                            </td>
                            <td align="left" className="brdr padd_5">
                              TD1103590
                            </td>
                            <td align="right" className="brdr padd_5" />
                            <td align="right" className="brdr padd_5" />
                            <td align="right" className="brdr padd_5">
                              Tech
                            </td>
                            <td>
                              <label className="tdd_label label-info">
                                On_request
                              </label>
                            </td>
                            <td align="left" className="brdr padd_5 numAlign">
                              USD&nbsp;220.890
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              USD&nbsp;0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              USD&nbsp;0.000{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              USD&nbsp;220.89{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              {" "}
                              USD&nbsp;220.89
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.000&nbsp;USD
                            </td>
                          </tr>
                          <tr className="phps_row_0">
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">09</div>
                                <div className="monthYear">
                                  Dec
                                  <br />
                                  2019
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">28</div>
                                <div className="monthYear">
                                  Mar
                                  <br />
                                  2020
                                </div>
                              </div>
                            </td>
                            <td align="left" className="brdr padd_5">
                              TD1103591
                            </td>
                            <td align="right" className="brdr padd_5" />
                            <td align="right" className="brdr padd_5" />
                            <td align="right" className="brdr padd_5">
                              Tech
                            </td>
                            <td>
                              <label className="tdd_label label-info">
                                On_request
                              </label>
                            </td>
                            <td align="left" className="brdr padd_5 numAlign">
                              USD&nbsp;239.390
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              USD&nbsp;0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              USD&nbsp;0.000{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              USD&nbsp;239.39{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              {" "}
                              USD&nbsp;239.39
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.000&nbsp;USD
                            </td>
                          </tr>
                          <tr className="phps_row_1">
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">09</div>
                                <div className="monthYear">
                                  Dec
                                  <br />
                                  2019
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">28</div>
                                <div className="monthYear">
                                  Mar
                                  <br />
                                  2020
                                </div>
                              </div>
                            </td>
                            <td align="left" className="brdr padd_5">
                              TD1103592
                            </td>
                            <td align="right" className="brdr padd_5" />
                            <td align="right" className="brdr padd_5" />
                            <td align="right" className="brdr padd_5">
                              Tech
                            </td>
                            <td>
                              <label className="tdd_label label-info">
                                On_request
                              </label>
                            </td>
                            <td align="left" className="brdr padd_5 numAlign">
                              USD&nbsp;239.390
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              USD&nbsp;0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              USD&nbsp;0.000{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              USD&nbsp;239.39{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              {" "}
                              USD&nbsp;239.39
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.000&nbsp;USD
                            </td>
                          </tr>
                          <tr className="phps_row_0">
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">11</div>
                                <div className="monthYear">
                                  Dec
                                  <br />
                                  2019
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">20</div>
                                <div className="monthYear">
                                  Dec
                                  <br />
                                  2019
                                </div>
                              </div>
                            </td>
                            <td align="left" className="brdr padd_5">
                              03613
                            </td>
                            <td align="right" className="brdr padd_5" />
                            <td align="right" className="brdr padd_5" />
                            <td align="right" className="brdr padd_5">
                              Neeraj
                            </td>
                            <td>
                              <label className="tdd_label label-warning">
                                Vouchered
                              </label>
                            </td>
                            <td align="left" className="brdr padd_5 numAlign">
                              INR&nbsp;2151.890
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;0.000{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;2151.89{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              {" "}
                              INR&nbsp;2151.89
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.000&nbsp;INR
                            </td>
                          </tr>
                          <tr className="phps_row_1">
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">21</div>
                                <div className="monthYear">
                                  Jan
                                  <br />
                                  2020
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">25</div>
                                <div className="monthYear">
                                  Jan
                                  <br />
                                  2020
                                </div>
                              </div>
                            </td>
                            <td align="left" className="brdr padd_5">
                              TD803731
                            </td>
                            <td align="right" className="brdr padd_5">
                              HP
                            </td>
                            <td align="right" className="brdr padd_5">
                              20200121092230
                            </td>
                            <td align="right" className="brdr padd_5">
                              Vartak Holidazzle
                            </td>
                            <td>
                              <label className="tdd_label label-warning">
                                Vouchered
                              </label>
                            </td>
                            <td align="left" className="brdr padd_5 numAlign">
                              INR&nbsp;2457.605
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;49.152{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;2506.757{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              {" "}
                              INR&nbsp;2506.757
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.000&nbsp;INR
                            </td>
                          </tr>
                          <tr className="phps_row_0">
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">18</div>
                                <div className="monthYear">
                                  Feb
                                  <br />
                                  2020
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">19</div>
                                <div className="monthYear">
                                  Jul
                                  <br />
                                  2020
                                </div>
                              </div>
                            </td>
                            <td align="left" className="brdr padd_5">
                              TD1403750
                            </td>
                            <td align="right" className="brdr padd_5">
                              HP
                            </td>
                            <td align="right" className="brdr padd_5">
                              20200218124007
                            </td>
                            <td align="right" className="brdr padd_5">
                              Tech
                            </td>
                            <td>
                              <label className="tdd_label label-info">
                                On_request
                              </label>
                            </td>
                            <td align="left" className="brdr padd_5 numAlign">
                              SAR&nbsp;724.044
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              SAR&nbsp;0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              SAR&nbsp;14.481{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              SAR&nbsp;738.525{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              {" "}
                              SAR&nbsp;738.525
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.000&nbsp;SAR
                            </td>
                          </tr>
                          <tr className="phps_row_1">
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">20</div>
                                <div className="monthYear">
                                  Feb
                                  <br />
                                  2020
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">05</div>
                                <div className="monthYear">
                                  Mar
                                  <br />
                                  2020
                                </div>
                              </div>
                            </td>
                            <td align="left" className="brdr padd_5">
                              TD803764
                            </td>
                            <td align="right" className="brdr padd_5">
                              HP
                            </td>
                            <td align="right" className="brdr padd_5">
                              20200220113410
                            </td>
                            <td align="right" className="brdr padd_5">
                              Vartak Holidazzle
                            </td>
                            <td>
                              <label className="tdd_label label-warning">
                                Vouchered
                              </label>
                            </td>
                            <td align="left" className="brdr padd_5 numAlign">
                              INR&nbsp;15376.446
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;307.529{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;15683.975{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              {" "}
                              INR&nbsp;15683.975
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.000&nbsp;INR
                            </td>
                          </tr>
                          <tr className="phps_row_0">
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">25</div>
                                <div className="monthYear">
                                  Feb
                                  <br />
                                  2020
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">05</div>
                                <div className="monthYear">
                                  Mar
                                  <br />
                                  2020
                                </div>
                              </div>
                            </td>
                            <td align="left" className="brdr padd_5">
                              TD803792
                            </td>
                            <td align="right" className="brdr padd_5">
                              HP
                            </td>
                            <td align="right" className="brdr padd_5">
                              20200225044616
                            </td>
                            <td align="right" className="brdr padd_5">
                              Vartak Holidazzle
                            </td>
                            <td>
                              <label className="tdd_label label-warning">
                                Vouchered
                              </label>
                            </td>
                            <td align="left" className="brdr padd_5 numAlign">
                              INR&nbsp;15376.446
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;307.529{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;15683.975{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              {" "}
                              INR&nbsp;15683.975
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.000&nbsp;INR
                            </td>
                          </tr>
                          <tr className="phps_row_1">
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">08</div>
                                <div className="monthYear">
                                  May
                                  <br />
                                  2020
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">30</div>
                                <div className="monthYear">
                                  May
                                  <br />
                                  2020
                                </div>
                              </div>
                            </td>
                            <td align="left" className="brdr padd_5">
                              TD806772
                            </td>
                            <td align="right" className="brdr padd_5">
                              HP
                            </td>
                            <td align="right" className="brdr padd_5">
                              20200508071402
                            </td>
                            <td align="right" className="brdr padd_5">
                              Qtech Jaison
                            </td>
                            <td>
                              <label className="tdd_label label-warning">
                                Vouchered
                              </label>
                            </td>
                            <td align="left" className="brdr padd_5 numAlign">
                              USD&nbsp;27.500
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              USD&nbsp;0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              USD&nbsp;0.550{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              USD&nbsp;28.05{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              {" "}
                              USD&nbsp;28.05
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.000&nbsp;USD
                            </td>
                          </tr>
                          <tr className="phps_row_0">
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">13</div>
                                <div className="monthYear">
                                  May
                                  <br />
                                  2020
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">22</div>
                                <div className="monthYear">
                                  May
                                  <br />
                                  2020
                                </div>
                              </div>
                            </td>
                            <td align="left" className="brdr padd_5">
                              TD807664
                            </td>
                            <td align="right" className="brdr padd_5">
                              HP
                            </td>
                            <td align="right" className="brdr padd_5">
                              20200513124412
                            </td>
                            <td align="right" className="brdr padd_5">
                              Qtech Jaison
                            </td>
                            <td>
                              <label className="tdd_label label-warning">
                                Vouchered
                              </label>
                            </td>
                            <td align="left" className="brdr padd_5 numAlign">
                              USD&nbsp;28.600
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              USD&nbsp;0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              USD&nbsp;0.572{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              USD&nbsp;29.172{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              {" "}
                              USD&nbsp;29.172
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.000&nbsp;USD
                            </td>
                          </tr>
                          <tr className="phps_row_1">
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">21</div>
                                <div className="monthYear">
                                  May
                                  <br />
                                  2020
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">29</div>
                                <div className="monthYear">
                                  Jul
                                  <br />
                                  2020
                                </div>
                              </div>
                            </td>
                            <td align="left" className="brdr padd_5">
                              TD809718
                            </td>
                            <td align="right" className="brdr padd_5">
                              HP
                            </td>
                            <td align="right" className="brdr padd_5">
                              20200521145250
                            </td>
                            <td align="right" className="brdr padd_5">
                              Vartak Holidazzle
                            </td>
                            <td>
                              <label className="tdd_label label-warning">
                                Vouchered
                              </label>
                            </td>
                            <td align="left" className="brdr padd_5 numAlign">
                              INR&nbsp;10223.634
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;204.473{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;10428.107{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              {" "}
                              INR&nbsp;10428.107
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.000&nbsp;INR
                            </td>
                          </tr>
                          <tr className="phps_row_0">
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">03</div>
                                <div className="monthYear">
                                  Sep
                                  <br />
                                  2020
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">18</div>
                                <div className="monthYear">
                                  Sep
                                  <br />
                                  2020
                                </div>
                              </div>
                            </td>
                            <td align="left" className="brdr padd_5">
                              TD824915
                            </td>
                            <td align="right" className="brdr padd_5">
                              HP
                            </td>
                            <td align="right" className="brdr padd_5">
                              20200903054424
                            </td>
                            <td align="right" className="brdr padd_5">
                              Vartak Holidazzle
                            </td>
                            <td>
                              <label className="tdd_label label-info">
                                On_request
                              </label>
                            </td>
                            <td align="left" className="brdr padd_5 numAlign">
                              INR&nbsp;5898.110
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;117.960{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              INR&nbsp;6016.07{" "}
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              {" "}
                              INR&nbsp;6016.07
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.000&nbsp;INR
                            </td>
                          </tr>
                          <tr className="row_header">
                            <td align="center" className="brdr" />
                            <td align="center" className="brdr" />
                            <td align="left" className="brdr">
                              &nbsp;
                            </td>
                            <td align="left" className="brdr">
                              &nbsp;
                            </td>
                            <td align="left" className="brdr">
                              &nbsp;
                            </td>
                            <td align="left" className="brdr">
                              &nbsp;
                            </td>
                            <td align="left" className="brdr">
                              &nbsp;
                            </td>
                            <td align="right" className="brdr">
                              &nbsp;
                            </td>
                            <td align="right" className="brdr">
                              &nbsp;
                            </td>
                            <td align="right" className="brdr">
                              &nbsp;
                            </td>
                            <td align="right" className="brdr">
                              &nbsp;
                            </td>
                            <td align="right" className="brdr">
                              &nbsp;
                            </td>
                            <td align="right" className="brdr">
                              &nbsp;
                            </td>
                            <td align="right" className="brdr">
                              &nbsp;
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <style
                      type="text/css"
                      dangerouslySetInnerHTML={{
                        __html:
                          "\n                                @media print {\n                                    /*.table.dataTable thead tr td\n{\nborder-top: 1px solid #DDD!important;\nborder-bottom: 1px solid #DDD!important;\n}\n\n.table.dataTable > thead > tr > th, .table.dataTable > thead > tr > td\n{\nwhite-space: normal!important;\npadding: 8px 5px 8px 5px!important;\n}*/\n                                    /*tr td.bookIdCol a{display:none !important;} */\n                                    /*tr.bg-primary td { border:1px solid #000 !important;} */\n                                }\n                            ",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default ReportsAccountsPaymentGatewayBooking;
