import Flatpickr from "react-flatpickr";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header2 from "../header2/header2";
import MultiSelect from "../reactMultiSelect";
import { citiesByCountry, countries } from "../../constants/Country-City-Data";
import {
  AgencyOptions,
  add_options,
  addrule_currencyOptions,
  reports_agentTypeOptions,
  resultPerpageOptions,
  transfer_statusOptions,
} from "../../constants/contants";

const ReportsAccountsOutstandingCustomer = () => {
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

  const [startDate2, setStartDate2] = useState(null); // State for the start date
  const [endDate2, setEndDate2] = useState(null); // State for the end date

  const handleTrashClick2 = () => {
    // Function to clear both start and end dates
    setStartDate2(null);
    setEndDate2(null);
  };
  const [startDate3, setStartDate3] = useState(null); // State for the start date
  const [endDate3, setEndDate3] = useState(null); // State for the end date

  const handleTrashClick3 = () => {
    // Function to clear both start and end dates
    setStartDate3(null);
    setEndDate3(null);
  };
  const [startDate4, setStartDate4] = useState(null); // State for the start date
  const [endDate4, setEndDate4] = useState(null); // State for the end date

  const handleTrashClick4 = () => {
    // Function to clear both start and end dates
    setStartDate4(null);
    setEndDate4(null);
  };

  const [showBookingDate, setShowBookingDate] = useState(false);

  const toggleBookingDate = () => {
    setShowBookingDate(!showBookingDate);
  };

  const [showServiceDate, setShowserviceDate] = useState(false);

  const toggleServiceDate = () => {
    setShowserviceDate(!showServiceDate);
  };

  const [showDeadlineDate, setDeadlineDate] = useState(false);

  const toggleDeadlineDate = () => {
    setDeadlineDate(!showDeadlineDate);
  };
  const [showStatusDate, setStatusDate] = useState(false);

  const toggleStatusDate = () => {
    setStatusDate(!showStatusDate);
  };
  const [showVoucherDate, setVoucherDate] = useState(false);

  const toggleVoucherDate = () => {
    setVoucherDate(!showVoucherDate);
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
      <Header2 title="CUSTOMER OUTSTANDING" />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <div>
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
                  <label>Agent Type</label>
                  <MultiSelect
                    options={reports_agentTypeOptions}
                    isSearchable
                    placeholder=" Select Agent Type "
                    className="custom-select"
                    noOptionsMessage={() => "No Type Found"}
                  />
                </div>
                <div className="form-group col-md-3">
                  <input
                    type="hidden"
                    className="form-control form-control-sm"
                    name="sel_agent"
                    id="sel_agent"
                  />
                  <label>Agency</label>
                  <br />
                  <MultiSelect
                    options={AgencyOptions}
                    isSearchable
                    placeholder=" Select Agent "
                    className="custom-select"
                    noOptionsMessage={() => "No Agency Found"}
                  />
                </div>
                <div className="form-group col-md-3 mt-2">
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
                <div className="form-group col-md-3 mt-2">
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
                <div className="form-group col-md-3 mt-2">
                  <div
                    className="checkbox checkbox-success"
                    style={{ display: "inline-block" }}
                  >
                    <input
                      type="checkbox"
                      defaultValue={1}
                      name="chk_service_date"
                      id="chk_service_date"
                      onChange={toggleDeadlineDate}
                    />
                    <label htmlFor="chk_service_date">Deadline Date</label>
                  </div>
                  &nbsp;&nbsp;
                  <div
                    name="service_date"
                    id="service_date"
                    style={{ display: showDeadlineDate ? "block" : "none" }}
                  >
                    <div
                      className="input-daterange input-group date"
                      id="datetimepicker2"
                    >
                      <Flatpickr
                        value={startDate2}
                        onChange={(date) => setStartDate2(date)}
                        options={{ dateFormat: "Y-m-d" }}
                        style={{ width: "131px" }}
                      />

                      <span class="input-group-addon">to</span>
                      <Flatpickr
                        value={endDate2}
                        onChange={(date) => setEndDate2(date)}
                        options={{ dateFormat: "Y-m-d" }}
                        style={{ width: "131px" }}
                      />
                      <span
                        className="input-group-addon"
                        onClick={handleTrashClick2}
                      >
                        <i className="fa fa-trash" />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="form-group col-md-3 mt-2">
                  <div
                    className="checkbox checkbox-success"
                    style={{ display: "inline-block" }}
                  >
                    <input
                      type="checkbox"
                      defaultValue={1}
                      name="chk_service_date"
                      id="chk_service_date"
                      onChange={toggleVoucherDate}
                    />
                    <label htmlFor="chk_service_date">Voucher Date</label>
                  </div>
                  &nbsp;&nbsp;
                  <div
                    name="service_date"
                    id="service_date"
                    style={{ display: showVoucherDate ? "block" : "none" }}
                  >
                    <div
                      className="input-daterange input-group date"
                      id="datetimepicker2"
                    >
                      <Flatpickr
                        value={startDate3}
                        onChange={(date) => setStartDate3(date)}
                        options={{ dateFormat: "Y-m-d" }}
                        style={{ width: "131px" }}
                      />

                      <span class="input-group-addon">to</span>
                      <Flatpickr
                        value={endDate3}
                        onChange={(date) => setEndDate3(date)}
                        options={{ dateFormat: "Y-m-d" }}
                        style={{ width: "131px" }}
                      />
                      <span
                        className="input-group-addon"
                        onClick={handleTrashClick3}
                      >
                        <i className="fa fa-trash" />
                      </span>
                    </div>
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
                      name="chk_booking_date"
                      id="chk_booking_date"
                      onChange={toggleStatusDate}
                    />
                    <label htmlFor="chk_booking_date"> Status Date</label>
                  </div>
                  &nbsp;&nbsp;
                  <div
                    name="booking_date"
                    id="booking_date"
                    style={{ display: showStatusDate ? "block" : "none" }}
                  >
                    <div
                      className="input-daterange input-group date"
                      id="datetimepicker1"
                    >
                      <Flatpickr
                        value={startDate4}
                        onChange={(date) => setStartDate4(date)}
                        options={{ dateFormat: "Y-m-d" }}
                        style={{ width: "131px" }}
                      />

                      <span class="input-group-addon">to</span>
                      <Flatpickr
                        value={endDate4}
                        onChange={(date) => setEndDate4(date)}
                        options={{ dateFormat: "Y-m-d" }}
                        style={{ width: "131px" }}
                      />
                      <span
                        className="input-group-addon"
                        onClick={handleTrashClick4}
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
                  <label>Currency</label>
                  <MultiSelect
                    options={addrule_currencyOptions}
                    isSearchable
                    placeholder=" Select Currency "
                    className="custom-select"
                    noOptionsMessage={() => "No Currency Found"}
                  />
                </div>
                <div className="form-group col-md-3">
                  <label>Agent Status</label>
                  <MultiSelect
                    options={transfer_statusOptions}
                    isSearchable
                    placeholder=" Status"
                    className="custom-select"
                    noOptionsMessage={() => "No Status Found"}
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-3">
                  <label>Branch</label>
                  <MultiSelect
                    options={add_options}
                    isSearchable
                    placeholder=" All Branches "
                    className="custom-select"
                    noOptionsMessage={() => "No Branch Found"}
                  />
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
                __html: "\n.table > thead > tr > td {\n  color: #fff;\n\n}\n",
              }}
            />

            <div
              className="form-group panel-body removeMargins"
              id="tabhide"
              style={{ display: "block" }}
            >
              <div id="tabs1" className="ui-tabs">
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
                    <input
                      type="hidden"
                      name="sort_by"
                      id="sort_by"
                      defaultValue="ORDER BY credit_usage DESC"
                    />
                    <input
                      type="hidden"
                      name="current_page"
                      id="current_page"
                    />
                    <div style={{ clear: "both" }} />
                    {/*Pagination panel*/}
                    <nav aria-label="Page navigation example">
                      <ul className="pagination pagination-sm justify-content-center">
                        <li className="page-item active">
                          <Link className="page-link" to="#">
                            1
                          </Link>
                        </li>
                        <li className="page-item">
                          <Link className="page-link" to="#">
                            2
                          </Link>
                        </li>
                        <li className="page-item">
                          <Link className="page-link" to="#">
                            3
                          </Link>
                        </li>
                        <li className="page-item">
                          <Link className="page-link" to="#">
                            4
                          </Link>
                        </li>
                        <li className="page-item">
                          <Link className="page-link" to="#">
                            5
                          </Link>
                        </li>
                        <li className="page-item">
                          <Link className="page-link" to="#" aria-label="Next">
                            <span aria-hidden="true">»</span>
                          </Link>
                        </li>
                      </ul>
                    </nav>
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
                        id="search_sup"
                        className="table table-bordered   table-responsive table-bordered alignTbl"
                        style={{ width: "100%!important" }}
                      >
                        <thead>
                          <tr>
                            {/*add code to display sorting option in customer outstanding report-Darpan Meher- 30 apr 2015  */}
                            <td align="center" className="bold padd_5 brdr">
                              Agency Name
                              <Link>
                                <img
                                  src="images/up_arrow.gif"
                                  alt=""
                                  border={0}
                                  height={5}
                                  width={9}
                                />
                              </Link>
                              <Link>
                                <img
                                  src="images/down_arrow.gif"
                                  alt=""
                                  border={0}
                                  height={5}
                                  width={9}
                                />
                              </Link>
                            </td>
                            <td align="center" className="bold padd_5 brdr">
                              Agent Type
                              <Link>
                                <img
                                  src="images/up_arrow.gif"
                                  alt=""
                                  border={0}
                                  height={5}
                                  width={9}
                                />
                              </Link>
                              <Link>
                                <img
                                  src="images/down_arrow.gif"
                                  alt=""
                                  border={0}
                                  height={5}
                                  width={9}
                                />
                              </Link>
                            </td>
                            <td align="center" className="bold padd_5 brdr">
                              Consultant
                              <Link>
                                <img
                                  src="images/up_arrow.gif"
                                  alt=""
                                  border={0}
                                  height={5}
                                  width={9}
                                />
                              </Link>
                              <Link>
                                <img
                                  src="images/down_arrow.gif"
                                  alt=""
                                  border={0}
                                  height={5}
                                  width={9}
                                />
                              </Link>
                            </td>
                            <td
                              align="center"
                              className="bold padd_5 brdr numAlign numeric-comma"
                            >
                              Credit Limit
                              <Link>
                                <img
                                  src="images/up_arrow.gif"
                                  alt=""
                                  border={0}
                                  height={5}
                                  width={9}
                                />
                              </Link>
                              <Link>
                                <img
                                  src="images/down_arrow.gif"
                                  alt=""
                                  border={0}
                                  height={5}
                                  width={9}
                                />
                              </Link>
                            </td>
                            <td
                              align="center"
                              className="bold padd_5 brdr numAlign numeric-comma"
                            >
                              Temp. Credit Limit
                              <Link>
                                <img
                                  src="images/up_arrow.gif"
                                  alt=""
                                  border={0}
                                  height={5}
                                  width={9}
                                />
                              </Link>
                              <Link>
                                <img
                                  src="images/down_arrow.gif"
                                  alt=""
                                  border={0}
                                  height={5}
                                  width={9}
                                />
                              </Link>
                            </td>
                            <td
                              align="center"
                              className="bold padd_5 brdr numAlign numeric-comma"
                            >
                              Total ( Credit Limit + Temp. Credit )
                              <Link>
                                <img
                                  src="images/up_arrow.gif"
                                  alt=""
                                  border={0}
                                  height={5}
                                  width={9}
                                />
                              </Link>
                              <Link>
                                <img
                                  src="images/down_arrow.gif"
                                  alt=""
                                  border={0}
                                  height={5}
                                  width={9}
                                />
                              </Link>
                            </td>
                            <td
                              align="center"
                              className="bold padd_5 brdr numAlign numeric-comma"
                            >
                              Balance
                              <Link>
                                <img
                                  src="images/up_arrow.gif"
                                  alt=""
                                  border={0}
                                  height={5}
                                  width={9}
                                />
                              </Link>
                              <Link>
                                <img
                                  src="images/down_arrow_red.gif"
                                  alt=""
                                  border={0}
                                  height={5}
                                  width={9}
                                />
                              </Link>
                            </td>
                            <td
                              align="center"
                              className="bold padd_5 brdr numAlign numeric-comma"
                            >
                              Unallocated Amount
                              <Link>
                                <img
                                  src="images/up_arrow.gif"
                                  alt=""
                                  border={0}
                                  height={5}
                                  width={9}
                                />
                              </Link>
                              <Link>
                                <img
                                  src="images/down_arrow.gif"
                                  alt=""
                                  border={0}
                                  height={5}
                                  width={9}
                                />
                              </Link>
                            </td>
                            <td
                              align="center"
                              className="bold padd_5 brdr numAlign numeric-comma"
                            >
                              Total Outstanding
                              <Link>
                                <img
                                  src="images/up_arrow.gif"
                                  alt=""
                                  border={0}
                                  height={5}
                                  width={9}
                                />
                              </Link>
                              <Link>
                                <img
                                  src="images/down_arrow.gif"
                                  alt=""
                                  border={0}
                                  height={5}
                                  width={9}
                                />
                              </Link>
                            </td>
                            <td
                              align="center"
                              className="bold padd_5 brdr numAlign"
                            >
                              %
                              <Link>
                                <img
                                  src="images/up_arrow.gif"
                                  alt=""
                                  border={0}
                                  height={5}
                                  width={9}
                                />
                              </Link>
                              <Link>
                                <img
                                  src="images/down_arrow.gif"
                                  alt=""
                                  border={0}
                                  height={5}
                                  width={9}
                                />
                              </Link>
                            </td>
                            <td
                              align="center"
                              className="bold padd_5 brdr numAlign"
                            >
                              Total%
                              <Link>
                                <img
                                  src="images/up_arrow.gif"
                                  alt=""
                                  border={0}
                                  height={5}
                                  width={9}
                                />
                              </Link>
                              <Link>
                                <img
                                  src="images/down_arrow.gif"
                                  alt=""
                                  border={0}
                                  height={5}
                                  width={9}
                                />
                              </Link>
                            </td>
                            {/*End code to display sorting option in customer outstanding report-Darpan Meher- 30 apr 2015  */}
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          <tr className="phps_row_1">
                            <td align="left" className="brdr padd_5 bookIdCol">
                              <Link
                                to="new_report.php?report=customer_statement&run=0&sel_agent=48&auto_result=1"
                                target="_blank"
                              />
                              Test (Main Agent Id - CD0048)
                            </td>
                            <td align="left" className="brdr padd_5">
                              {" "}
                              Credit Agent
                            </td>
                            <td align="left" className="brdr padd_5">
                              rohan vartak
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              500.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              500.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              1062926.54 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              1062926.54 SAR
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              212585.31
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              212585.31
                            </td>
                          </tr>
                          <tr className="phps_row_0">
                            <td align="left" className="brdr padd_5 bookIdCol">
                              <Link
                                to="new_report.php?report=customer_statement&run=0&sel_agent=1&auto_result=1"
                                target="_blank"
                              />
                              qtech (asmita kapadi Id - CD0001)
                            </td>
                            <td align="left" className="brdr padd_5">
                              {" "}
                              Credit Agent
                            </td>
                            <td align="left" className="brdr padd_5" />
                            <td align="right" className="brdr padd_5 numAlign">
                              1000000000.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              500.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              1000000500.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              616534.91 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              21354595.58 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              -20738060.67 SAR
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              -2.07
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              -2.07
                            </td>
                          </tr>
                          <tr className="phps_row_1">
                            <td align="left" className="brdr padd_5 bookIdCol">
                              <Link
                                to="new_report.php?report=customer_statement&run=0&sel_agent=2&auto_result=1"
                                target="_blank"
                              />
                              Neeraj (Neeraj Yadav Id - CD0002)
                            </td>
                            <td align="left" className="brdr padd_5">
                              {" "}
                              Credit Agent
                            </td>
                            <td align="left" className="brdr padd_5">
                              vaibhav test
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              1000000.00 INR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 INR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              1000000.00 INR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              359265.72 INR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              1300.00 INR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              357965.72 INR
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              35.80
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              35.80
                            </td>
                          </tr>
                          <tr className="phps_row_0">
                            <td align="left" className="brdr padd_5 bookIdCol">
                              <Link
                                to="new_report.php?report=customer_statement&run=0&sel_agent=55&auto_result=1"
                                target="_blank"
                              />
                              CHECK (fgfg fgfg Id - CD0055)
                            </td>
                            <td align="left" className="brdr padd_5">
                              {" "}
                              Credit Agent
                            </td>
                            <td align="left" className="brdr padd_5">
                              rohan vartak
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              2300000.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              2300000.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              169027.84 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              169027.84 SAR
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              7.35
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              7.35
                            </td>
                          </tr>
                          <tr className="phps_row_1">
                            <td align="left" className="brdr padd_5 bookIdCol">
                              <Link
                                to="new_report.php?report=customer_statement&run=0&sel_agent=77&auto_result=1"
                                target="_blank"
                              />
                              Red Apple (Bhargavi Pise Id - CD0077)
                            </td>
                            <td align="left" className="brdr padd_5">
                              {" "}
                              Credit Agent
                            </td>
                            <td align="left" className="brdr padd_5">
                              rohan vartak
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              500000.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              500000.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              165343.60 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              165343.60 SAR
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              33.07
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              33.07
                            </td>
                          </tr>
                          <tr className="phps_row_0">
                            <td align="left" className="brdr padd_5 bookIdCol">
                              <Link
                                to="new_report.php?report=customer_statement&run=0&sel_agent=76&auto_result=1"
                                target="_blank"
                              />
                              qtech (prafull sunil shirke Id - CD0076)
                            </td>
                            <td align="left" className="brdr padd_5">
                              {" "}
                              Credit Agent
                            </td>
                            <td align="left" className="brdr padd_5">
                              rohan vartak
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              500000.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              500000.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              109714.89 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              5100.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              104614.89 SAR
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              20.92
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              20.92
                            </td>
                          </tr>
                          <tr className="phps_row_1">
                            <td align="left" className="brdr padd_5 bookIdCol">
                              <Link
                                to="new_report.php?report=customer_statement&run=0&sel_agent=44&auto_result=1"
                                target="_blank"
                              />
                              qtech (prafull sunil shirke Id - CD0044)
                            </td>
                            <td align="left" className="brdr padd_5">
                              {" "}
                              Credit Agent
                            </td>
                            <td align="left" className="brdr padd_5">
                              rohan vartak
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              500000.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              500000.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              100757.71 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              100757.71 SAR
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              20.15
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              20.15
                            </td>
                          </tr>
                          <tr className="phps_row_0">
                            <td align="left" className="brdr padd_5 bookIdCol">
                              <Link
                                to="new_report.php?report=customer_statement&run=0&sel_agent=7&auto_result=1"
                                target="_blank"
                              />
                              rcom (suhas patil Id - CD0007)
                            </td>
                            <td align="left" className="brdr padd_5">
                              {" "}
                              Credit Agent
                            </td>
                            <td align="left" className="brdr padd_5" />
                            <td align="right" className="brdr padd_5 numAlign">
                              100000.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              100.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              100100.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              73766.78 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              22699.57 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              51067.21 SAR
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              51.07
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              51.02
                            </td>
                          </tr>
                          <tr className="phps_row_1">
                            <td align="left" className="brdr padd_5 bookIdCol">
                              <Link
                                to="new_report.php?report=customer_statement&run=0&sel_agent=65&auto_result=1"
                                target="_blank"
                              />
                              Test (fgfg fgfg Id - CD0065)
                            </td>
                            <td align="left" className="brdr padd_5">
                              {" "}
                              Credit Agent
                            </td>
                            <td align="left" className="brdr padd_5">
                              suhas patil
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              1800000.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              1800000.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              35600.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              35600.00 SAR
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              1.98
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              1.98
                            </td>
                          </tr>
                          <tr className="phps_row_0">
                            <td align="left" className="brdr padd_5 bookIdCol">
                              <Link
                                to="new_report.php?report=customer_statement&run=0&sel_agent=23&auto_result=1"
                                target="_blank"
                              />
                              Qtech (Allwin Pillai Id - CD0023)
                            </td>
                            <td align="left" className="brdr padd_5">
                              {" "}
                              Credit Agent
                            </td>
                            <td align="left" className="brdr padd_5" />
                            <td align="right" className="brdr padd_5 numAlign">
                              50000.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              50000.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              30052.46 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              30052.46 SAR
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              60.10
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              60.10
                            </td>
                          </tr>
                          <tr className="phps_row_1">
                            <td align="left" className="brdr padd_5 bookIdCol">
                              <Link
                                to="new_report.php?report=customer_statement&run=0&sel_agent=60&auto_result=1"
                                target="_blank"
                              />
                              Qtech (Allwin Pillai Id - CD0060)
                            </td>
                            <td align="left" className="brdr padd_5">
                              {" "}
                              Credit Agent
                            </td>
                            <td align="left" className="brdr padd_5">
                              rohan vartak
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              100000.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              200.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              100200.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              18724.87 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              18724.87 SAR
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              18.72
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              18.69
                            </td>
                          </tr>
                          <tr className="phps_row_0">
                            <td align="left" className="brdr padd_5 bookIdCol">
                              <Link
                                to="new_report.php?report=customer_statement&run=0&sel_agent=51&auto_result=1"
                                target="_blank"
                              />
                              Qtech (Allwin Pillai Id - CD0051)
                            </td>
                            <td align="left" className="brdr padd_5">
                              {" "}
                              Credit Agent
                            </td>
                            <td align="left" className="brdr padd_5">
                              rohan vartak
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              100000.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              200.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              100200.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              16381.05 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              3125.52 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              13255.53 SAR
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              13.26
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              13.23
                            </td>
                          </tr>
                          <tr className="phps_row_1">
                            <td align="left" className="brdr padd_5 bookIdCol">
                              <Link
                                to="new_report.php?report=customer_statement&run=0&sel_agent=39&auto_result=1"
                                target="_blank"
                              />
                              qtech (suhas test qtech Id - CD0039)
                            </td>
                            <td align="left" className="brdr padd_5">
                              {" "}
                              Credit Agent
                            </td>
                            <td align="left" className="brdr padd_5">
                              rohan vartak
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              5000000.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              1000.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              5001000.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              12443.66 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              2035.35 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              10408.31 SAR
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.21
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.21
                            </td>
                          </tr>
                          <tr className="phps_row_0">
                            <td align="left" className="brdr padd_5 bookIdCol">
                              <Link
                                to="new_report.php?report=customer_statement&run=0&sel_agent=82&auto_result=1"
                                target="_blank"
                              />
                              Qtech (Allwin Pillai Id - CD0082)
                            </td>
                            <td align="left" className="brdr padd_5">
                              {" "}
                              Credit Agent
                            </td>
                            <td align="left" className="brdr padd_5">
                              suhas patil
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              50000.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              200.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              50200.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              8001.61 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              1530.29 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              6471.32 USD
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              12.94
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              12.89
                            </td>
                          </tr>
                          <tr className="phps_row_1">
                            <td align="left" className="brdr padd_5 bookIdCol">
                              <Link
                                to="new_report.php?report=customer_statement&run=0&sel_agent=19&auto_result=1"
                                target="_blank"
                              />
                              qtech (asmita qtech Id - CD0019)
                            </td>
                            <td align="left" className="brdr padd_5">
                              {" "}
                              Credit Agent
                            </td>
                            <td align="left" className="brdr padd_5">
                              rohan vartak
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              1000000000.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              50.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              1000000050.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              6542.65 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              6542.65 SAR
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.00
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.00
                            </td>
                          </tr>
                          <tr className="phps_row_0">
                            <td align="left" className="brdr padd_5 bookIdCol">
                              <Link
                                to="new_report.php?report=customer_statement&run=0&sel_agent=3&auto_result=1"
                                target="_blank"
                              />
                              qtech (asmita kapadi Id - CD0003)
                            </td>
                            <td align="left" className="brdr padd_5">
                              {" "}
                              Credit Agent
                            </td>
                            <td align="left" className="brdr padd_5" />
                            <td align="right" className="brdr padd_5 numAlign">
                              1000000000.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              1000000000.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              2000000000.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              3853.34 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              34662.40 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              -30809.06 SAR
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              -0.00
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              -0.00
                            </td>
                          </tr>
                          <tr className="phps_row_1">
                            <td align="left" className="brdr padd_5 bookIdCol">
                              <Link
                                to="new_report.php?report=customer_statement&run=0&sel_agent=11&auto_result=1"
                                target="_blank"
                              />
                              qtech (Qtech Qtech Id - CD0011)
                            </td>
                            <td align="left" className="brdr padd_5">
                              {" "}
                              Credit Agent
                            </td>
                            <td align="left" className="brdr padd_5">
                              rohan vartak
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              100000.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              10000.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              110000.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              1432.77 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              1000.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              432.77 SAR
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.43
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.39
                            </td>
                          </tr>
                          <tr className="phps_row_0">
                            <td align="left" className="brdr padd_5 bookIdCol">
                              <Link
                                to="new_report.php?report=customer_statement&run=0&sel_agent=4&auto_result=1"
                                target="_blank"
                              />
                              Qtech (Allwin Pillai Id - CD0004)
                            </td>
                            <td align="left" className="brdr padd_5">
                              {" "}
                              Credit Agent
                            </td>
                            <td align="left" className="brdr padd_5">
                              suhas patil
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              100000.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              10000.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              110000.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              970.45 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              5995.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              -5024.55 USD
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              -5.02
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              -4.57
                            </td>
                          </tr>
                          <tr className="phps_row_1">
                            <td align="left" className="brdr padd_5 bookIdCol">
                              <Link
                                to="new_report.php?report=customer_statement&run=0&sel_agent=24&auto_result=1"
                                target="_blank"
                              />
                              suhas (suhas test test1 Id - CD0024)
                            </td>
                            <td align="left" className="brdr padd_5">
                              {" "}
                              Credit Agent
                            </td>
                            <td align="left" className="brdr padd_5" />
                            <td align="right" className="brdr padd_5 numAlign">
                              10000.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              10000.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              891.21 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              891.21 USD
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              8.91
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              8.91
                            </td>
                          </tr>
                          <tr className="phps_row_0">
                            <td align="left" className="brdr padd_5 bookIdCol">
                              <Link
                                to="new_report.php?report=customer_statement&run=0&sel_agent=10&auto_result=1"
                                target="_blank"
                              />
                              Qtech (Mansi Surve Id - CD0010)
                            </td>
                            <td align="left" className="brdr padd_5">
                              {" "}
                              Credit Agent
                            </td>
                            <td align="left" className="brdr padd_5">
                              rohan vartak
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              5000000.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              5000000.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              821.44 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              821.44 SAR
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.02
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.02
                            </td>
                          </tr>
                          <tr className="phps_row_1">
                            <td align="left" className="brdr padd_5 bookIdCol">
                              <Link
                                to="new_report.php?report=customer_statement&run=0&sel_agent=80&auto_result=1"
                                target="_blank"
                              />
                              Qtech (Allwin Pillai Id - CD0080)
                            </td>
                            <td align="left" className="brdr padd_5">
                              {" "}
                              Credit Agent
                            </td>
                            <td align="left" className="brdr padd_5">
                              rohan vartak
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              100000.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              500.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              100500.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              489.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              489.00 USD
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.49
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.49
                            </td>
                          </tr>
                          <tr className="phps_row_0">
                            <td align="left" className="brdr padd_5 bookIdCol">
                              <Link
                                to="new_report.php?report=customer_statement&run=0&sel_agent=27&auto_result=1"
                                target="_blank"
                              />
                              qtech (asmita qtech Id - CD0027)
                            </td>
                            <td align="left" className="brdr padd_5">
                              {" "}
                              Credit Agent
                            </td>
                            <td align="left" className="brdr padd_5" />
                            <td align="right" className="brdr padd_5 numAlign">
                              1000.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              50.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              1050.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              420.86 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              420.86 USD
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              42.09
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              40.08
                            </td>
                          </tr>
                          <tr className="phps_row_1">
                            <td align="left" className="brdr padd_5 bookIdCol">
                              <Link
                                to="new_report.php?report=customer_statement&run=0&sel_agent=20&auto_result=1"
                                target="_blank"
                              />
                              Expedia (Rex Martin Id - CD0020)
                            </td>
                            <td align="left" className="brdr padd_5">
                              {" "}
                              Credit Agent
                            </td>
                            <td align="left" className="brdr padd_5" />
                            <td align="right" className="brdr padd_5 numAlign">
                              10000.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              10000.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              308.79 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              308.79 USD
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              3.09
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              3.09
                            </td>
                          </tr>
                          <tr className="phps_row_0">
                            <td align="left" className="brdr padd_5 bookIdCol">
                              <Link
                                to="new_report.php?report=customer_statement&run=0&sel_agent=69&auto_result=1"
                                target="_blank"
                              />
                              Qtech (Allwin Pillai Id - CD0069)
                            </td>
                            <td align="left" className="brdr padd_5">
                              {" "}
                              Credit Agent
                            </td>
                            <td align="left" className="brdr padd_5">
                              rohan vartak
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              1000.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              1000.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              267.80 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              150.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              117.80 USD
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              11.78
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              11.78
                            </td>
                          </tr>
                          <tr className="phps_row_1">
                            <td align="left" className="brdr padd_5 bookIdCol">
                              <Link
                                to="new_report.php?report=customer_statement&run=0&sel_agent=71&auto_result=1"
                                target="_blank"
                              />
                              Qtech (Allwin Pillai Id - CD0071)
                            </td>
                            <td align="left" className="brdr padd_5">
                              {" "}
                              Credit Agent
                            </td>
                            <td align="left" className="brdr padd_5">
                              rohan vartak
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              2000000.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              200.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              2000200.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              245.29 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              245.29 USD
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.01
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.01
                            </td>
                          </tr>
                          <tr className="phps_row_0">
                            <td align="left" className="brdr padd_5 bookIdCol">
                              <Link
                                to="new_report.php?report=customer_statement&run=0&sel_agent=74&auto_result=1"
                                target="_blank"
                              />
                              Qtech (Allwin Pillai Id - CD0074)
                            </td>
                            <td align="left" className="brdr padd_5">
                              {" "}
                              Credit Agent
                            </td>
                            <td align="left" className="brdr padd_5">
                              rohan vartak
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              10000.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              1000.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              11000.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              214.20 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              1.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              213.20 USD
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              2.13
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              1.94
                            </td>
                          </tr>
                          <tr className="phps_row_1">
                            <td align="left" className="brdr padd_5 bookIdCol">
                              <Link
                                to="new_report.php?report=customer_statement&run=0&sel_agent=14&auto_result=1"
                                target="_blank"
                              />
                              Qtech-Agency (Allwin Pillai Id - CD0014)
                            </td>
                            <td align="left" className="brdr padd_5">
                              {" "}
                              Credit Agent
                            </td>
                            <td align="left" className="brdr padd_5">
                              rohan vartak
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              1000.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              500.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              1500.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              179.50 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              47.98 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              131.52 USD
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              13.15
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              8.77
                            </td>
                          </tr>
                          <tr className="phps_row_0">
                            <td align="left" className="brdr padd_5 bookIdCol">
                              <Link
                                to="new_report.php?report=customer_statement&run=0&sel_agent=8&auto_result=1"
                                target="_blank"
                              />
                              Qtech (Mansi Surve Id - CD0008)
                            </td>
                            <td align="left" className="brdr padd_5">
                              {" "}
                              Credit Agent
                            </td>
                            <td align="left" className="brdr padd_5" />
                            <td align="right" className="brdr padd_5 numAlign">
                              500000.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              500000.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              173.31 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              173.31 SAR
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.03
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.03
                            </td>
                          </tr>
                          <tr className="phps_row_1">
                            <td align="left" className="brdr padd_5 bookIdCol">
                              <Link
                                to="new_report.php?report=customer_statement&run=0&sel_agent=72&auto_result=1"
                                target="_blank"
                              />
                              Qtech (Allwin Pillai Id - CD0072)
                            </td>
                            <td align="left" className="brdr padd_5">
                              {" "}
                              Credit Agent
                            </td>
                            <td align="left" className="brdr padd_5">
                              rohan vartak
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              10000.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              1000.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              11000.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              141.40 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              141.40 USD
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              1.41
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              1.29
                            </td>
                          </tr>
                          <tr className="phps_row_0">
                            <td align="left" className="brdr padd_5 bookIdCol">
                              <Link
                                to="new_report.php?report=customer_statement&run=0&sel_agent=79&auto_result=1"
                                target="_blank"
                              />
                              qtech (suhas qtech test Id - CA0079)
                            </td>
                            <td align="left" className="brdr padd_5">
                              {" "}
                              Cash Agent
                            </td>
                            <td align="left" className="brdr padd_5">
                              rohan vartak
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              121.98 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              10000000.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              -9999878.02 USD
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.00
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.00
                            </td>
                          </tr>
                          <tr className="phps_row_1">
                            <td align="left" className="brdr padd_5 bookIdCol">
                              <Link
                                to="new_report.php?report=customer_statement&run=0&sel_agent=62&auto_result=1"
                                target="_blank"
                              />
                              qtech Tri (Allwin Pillai Id - CD0062)
                            </td>
                            <td align="left" className="brdr padd_5">
                              {" "}
                              Credit Agent
                            </td>
                            <td align="left" className="brdr padd_5">
                              rohan vartak
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              1000000.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              200.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              1000200.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              117.30 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              117.30 USD
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.01
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.01
                            </td>
                          </tr>
                          <tr className="phps_row_0">
                            <td align="left" className="brdr padd_5 bookIdCol">
                              <Link
                                to="new_report.php?report=customer_statement&run=0&sel_agent=21&auto_result=1"
                                target="_blank"
                              />
                              Allwin (Xavi Alonso Id - CD0021)
                            </td>
                            <td align="left" className="brdr padd_5">
                              {" "}
                              Credit Agent
                            </td>
                            <td align="left" className="brdr padd_5" />
                            <td align="right" className="brdr padd_5 numAlign">
                              10000.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              100000.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              110000.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              102.56 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              102.56 USD
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              1.03
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.09
                            </td>
                          </tr>
                          <tr className="phps_row_1">
                            <td align="left" className="brdr padd_5 bookIdCol">
                              <Link
                                to="new_report.php?report=customer_statement&run=0&sel_agent=6&auto_result=1"
                                target="_blank"
                              />
                              Chennai-Qtech (Allwin Xavier Pillai Id - CA0006)
                            </td>
                            <td align="left" className="brdr padd_5">
                              {" "}
                              Cash Agent
                            </td>
                            <td align="left" className="brdr padd_5">
                              rohan vartak
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              100.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              36.77 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              63.23 USD
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.00
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.00
                            </td>
                          </tr>
                          <tr className="phps_row_0">
                            <td align="left" className="brdr padd_5 bookIdCol">
                              <Link
                                to="new_report.php?report=customer_statement&run=0&sel_agent=33&auto_result=1"
                                target="_blank"
                              />
                              Qtech (Allwin Pillai Id - CA0033)
                            </td>
                            <td align="left" className="brdr padd_5">
                              {" "}
                              Cash Agent
                            </td>
                            <td align="left" className="brdr padd_5" />
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              25.34 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              25.34 USD
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.00
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.00
                            </td>
                          </tr>
                          <tr className="phps_row_1">
                            <td align="left" className="brdr padd_5 bookIdCol">
                              <Link
                                to="new_report.php?report=customer_statement&run=0&sel_agent=28&auto_result=1"
                                target="_blank"
                              />
                              Qtech (BMW RnineT Id - CD0028)
                            </td>
                            <td align="left" className="brdr padd_5">
                              {" "}
                              Credit Agent
                            </td>
                            <td align="left" className="brdr padd_5">
                              rohan vartak
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              5000.00 BHD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 BHD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              5000.00 BHD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              15.27 BHD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 BHD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              15.27 BHD
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.31
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.31
                            </td>
                          </tr>
                          <tr className="phps_row_0">
                            <td align="left" className="brdr padd_5 bookIdCol">
                              <Link
                                to="new_report.php?report=customer_statement&run=0&sel_agent=68&auto_result=1"
                                target="_blank"
                              />
                              Qtech (Allwin Pillai Id - CA0068)
                            </td>
                            <td align="left" className="brdr padd_5">
                              {" "}
                              Cash Agent
                            </td>
                            <td align="left" className="brdr padd_5">
                              Neeraj yadav
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 USD
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.00
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.00
                            </td>
                          </tr>
                          <tr className="phps_row_1">
                            <td align="left" className="brdr padd_5 bookIdCol">
                              <Link
                                to="new_report.php?report=customer_statement&run=0&sel_agent=78&auto_result=1"
                                target="_blank"
                              />
                              qtech (prafull sunil shirke Id - CD0078)
                            </td>
                            <td align="left" className="brdr padd_5">
                              {" "}
                              Credit Agent
                            </td>
                            <td align="left" className="brdr padd_5">
                              rohan vartak
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              500000.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              500000.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 SAR
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.00
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.00
                            </td>
                          </tr>
                          <tr className="phps_row_0">
                            <td align="left" className="brdr padd_5 bookIdCol">
                              <Link
                                to="new_report.php?report=customer_statement&run=0&sel_agent=30&auto_result=1"
                                target="_blank"
                              />
                              XMLOUT (Rex Martin Id - CD0030)
                            </td>
                            <td align="left" className="brdr padd_5">
                              {" "}
                              Credit Agent
                            </td>
                            <td align="left" className="brdr padd_5">
                              rohan vartak
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              10000.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              200.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              10200.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 USD
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.00
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.00
                            </td>
                          </tr>
                          <tr className="phps_row_1">
                            <td align="left" className="brdr padd_5 bookIdCol">
                              <Link
                                to="new_report.php?report=customer_statement&run=0&sel_agent=17&auto_result=1"
                                target="_blank"
                              />
                              Qtech (Allwin Pillai Id - CA0017)
                            </td>
                            <td align="left" className="brdr padd_5">
                              {" "}
                              Cash Agent
                            </td>
                            <td align="left" className="brdr padd_5" />
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 USD
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.00
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.00
                            </td>
                          </tr>
                          <tr className="phps_row_0">
                            <td align="left" className="brdr padd_5 bookIdCol">
                              <Link
                                to="new_report.php?report=customer_statement&run=0&sel_agent=13&auto_result=1"
                                target="_blank"
                              />
                              suhaspatil (suhas patil Id - CA0013)
                            </td>
                            <td align="left" className="brdr padd_5">
                              {" "}
                              Cash Agent
                            </td>
                            <td align="left" className="brdr padd_5" />
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 SAR
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.00
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.00
                            </td>
                          </tr>
                          <tr className="phps_row_1">
                            <td align="left" className="brdr padd_5 bookIdCol">
                              <Link
                                to="new_report.php?report=customer_statement&run=0&sel_agent=12&auto_result=1"
                                target="_blank"
                              />
                              Al Riyadh (Mansi Surve Id - CD0012)
                            </td>
                            <td align="left" className="brdr padd_5">
                              {" "}
                              Credit Agent
                            </td>
                            <td align="left" className="brdr padd_5">
                              rohan vartak
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              500000.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              500000.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 SAR
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.00
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.00
                            </td>
                          </tr>
                          <tr className="phps_row_0">
                            <td align="left" className="brdr padd_5 bookIdCol">
                              <Link
                                to="new_report.php?report=customer_statement&run=0&sel_agent=5&auto_result=1"
                                target="_blank"
                              />
                              Qtech (vidya D Mangane Id - CD0005)
                            </td>
                            <td align="left" className="brdr padd_5">
                              {" "}
                              Credit Agent
                            </td>
                            <td align="left" className="brdr padd_5" />
                            <td align="right" className="brdr padd_5 numAlign">
                              500.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              500.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 SAR
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.00
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.00
                            </td>
                          </tr>
                          <tr className="phps_row_1">
                            <td align="left" className="brdr padd_5 bookIdCol">
                              <Link
                                to="new_report.php?report=customer_statement&run=0&sel_agent=18&auto_result=1"
                                target="_blank"
                              />
                              qtech (zxc vbn Id - CD0018)
                            </td>
                            <td align="left" className="brdr padd_5">
                              {" "}
                              Credit Agent
                            </td>
                            <td align="left" className="brdr padd_5" />
                            <td align="right" className="brdr padd_5 numAlign">
                              100000.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              100000.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              6172706.34 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              -6172706.34 SAR
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              -6172.71
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              -6172.71
                            </td>
                          </tr>
                          <tr className="phps_row_0">
                            <td align="left" className="brdr padd_5 bookIdCol">
                              <Link
                                to="new_report.php?report=customer_statement&run=0&sel_agent=29&auto_result=1"
                                target="_blank"
                              />
                              qtech (asmita qtech Id - CA0029)
                            </td>
                            <td align="left" className="brdr padd_5">
                              {" "}
                              Cash Agent
                            </td>
                            <td align="left" className="brdr padd_5" />
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 SAR
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.00
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.00
                            </td>
                          </tr>
                          <tr className="phps_row_1">
                            <td align="left" className="brdr padd_5 bookIdCol">
                              <Link
                                to="new_report.php?report=customer_statement&run=0&sel_agent=34&auto_result=1"
                                target="_blank"
                              />
                              Qtech (Allwin Pillai Id - CA0034)
                            </td>
                            <td align="left" className="brdr padd_5">
                              {" "}
                              Cash Agent
                            </td>
                            <td align="left" className="brdr padd_5" />
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 USD
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.00
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.00
                            </td>
                          </tr>
                          <tr className="phps_row_0">
                            <td align="left" className="brdr padd_5 bookIdCol">
                              <Link
                                to="new_report.php?report=customer_statement&run=0&sel_agent=32&auto_result=1"
                                target="_blank"
                              />
                              Test (Main Agent Id - CA0032)
                            </td>
                            <td align="left" className="brdr padd_5">
                              {" "}
                              Cash Agent
                            </td>
                            <td align="left" className="brdr padd_5" />
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 SAR
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.00
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.00
                            </td>
                          </tr>
                          <tr className="phps_row_1">
                            <td align="left" className="brdr padd_5 bookIdCol">
                              <Link
                                to="new_report.php?report=customer_statement&run=0&sel_agent=59&auto_result=1"
                                target="_blank"
                              />
                              Qtech (Allwin Pillai Id - CD0059)
                            </td>
                            <td align="left" className="brdr padd_5">
                              {" "}
                              Credit Agent
                            </td>
                            <td align="left" className="brdr padd_5">
                              rohan vartak
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              50000.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              500.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              50500.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 USD
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 USD
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.00
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.00
                            </td>
                          </tr>
                          <tr className="phps_row_0">
                            <td align="left" className="brdr padd_5 bookIdCol">
                              <Link
                                to="new_report.php?report=customer_statement&run=0&sel_agent=31&auto_result=1"
                                target="_blank"
                              />
                              454545 (Rajendra Chaurasia Id - CA0031)
                            </td>
                            <td align="left" className="brdr padd_5">
                              {" "}
                              Cash Agent
                            </td>
                            <td align="left" className="brdr padd_5" />
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 SAR
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.00
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.00
                            </td>
                          </tr>
                          <tr className="phps_row_1">
                            <td align="left" className="brdr padd_5 bookIdCol">
                              <Link
                                to="new_report.php?report=customer_statement&run=0&sel_agent=35&auto_result=1"
                                target="_blank"
                              />
                              Test (Main Agent Id - CD0035)
                            </td>
                            <td align="left" className="brdr padd_5">
                              {" "}
                              Credit Agent
                            </td>
                            <td align="left" className="brdr padd_5">
                              Ahmed Khan
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 SAR
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.00
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              0.00
                            </td>
                          </tr>
                          <tr className="phps_row_0">
                            <td align="left" className="brdr padd_5 bookIdCol">
                              <Link
                                to="new_report.php?report=customer_statement&run=0&sel_agent=15&auto_result=1"
                                target="_blank"
                              />
                              easy (suhas mohan patil Id - CD0015)
                            </td>
                            <td align="left" className="brdr padd_5">
                              {" "}
                              Credit Agent
                            </td>
                            <td align="left" className="brdr padd_5">
                              rohan vartak
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              100000.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              0.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              100000.00 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              -30326.74 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              374998.15 SAR
                            </td>
                            <td align="right" className="brdr padd_5 numAlign">
                              -405324.89 SAR
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              -405.32
                            </td>
                            <td align="center" className="brdr padd_5 numAlign">
                              -405.32
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    {/*Pagination panel*/}
                    <nav aria-label="Page navigation example">
                      <ul className="pagination pagination-sm justify-content-center mt-2">
                        <li className="page-item">
                          <Link className="page-link" to="#">
                            1
                          </Link>
                        </li>
                        <li className="page-item">
                          <Link className="page-link" to="#">
                            2
                          </Link>
                        </li>
                        <li className="page-item">
                          <Link className="page-link" to="#">
                            3
                          </Link>
                        </li>
                        <li className="page-item">
                          <Link className="page-link" to="#">
                            4
                          </Link>
                        </li>
                        <li className="page-item">
                          <Link className="page-link" to="#">
                            5
                          </Link>
                        </li>
                        <li className="page-item">
                          <Link className="page-link" to="#" aria-label="Next">
                            <span aria-hidden="true">»</span>
                          </Link>
                        </li>
                      </ul>
                    </nav>
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
export default ReportsAccountsOutstandingCustomer;
