import Flatpickr from "react-flatpickr";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header2 from "../header2/header2";
import MultiSelect from "../reactMultiSelect";
import {
  AgencyOptions,
  add_options,
  resultPerpageOptions,
} from "../../constants/contants";

const ReportsAccountsCommission = () => {
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

  const [startDate3, setStartDate3] = useState(null); // State for the start date
  const [endDate3, setEndDate3] = useState(null); // State for the end date

  const handleTrashClick3 = () => {
    // Function to clear both start and end dates
    setStartDate3(null);
    setEndDate3(null);
  };

  const [isFormVisible, setFormVisibility] = useState(false);

  const toggleFormVisibility = () => {
    setFormVisibility(!isFormVisible);
  };

  return (
    <>
      <Header2 title="COMMISSION REPORT" />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <div>
          <form>
            <div className="panel-body">
              <div className="row">
                <div className="form-group col-md-3">
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
                <div className="form-group col-md-3">
                  <label>Booking ID</label>
                  <div>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="txt_booking_id"
                      id="txt_booking_id"
                      size={40}
                    />
                  </div>
                </div>
                <div className="form-group col-md-3">
                  <label>Select Branch</label>
                  <MultiSelect
                    options={add_options}
                    isSearchable
                    placeholder=" All Branches "
                    className="custom-select"
                    noOptionsMessage={() => "No Branch Found"}
                  />
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="chk_booking_date">Booking Date</label>
                  <div name="booking_date" id="booking_date">
                    <div
                      className="input-daterange input-group date"
                      id="booking_from_date_cont"
                      data-date-end-date="0d"
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
                        id="b1TrashBtn"
                        onClick={handleTrashClick}
                      >
                        <i className="fa fa-trash" />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="status_chk_box"> Status Date </label>
                  <div name="status_date" id="status_date">
                    <div
                      className="input-daterange input-group date"
                      id="status_from_date_cont"
                      data-date-end-date="0d"
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
                        id="b3TrashBtn"
                        onClick={handleTrashClick1}
                      >
                        <i className="fa fa-trash" />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="chk_service_date">Service Date</label>
                  <div name="service_date" id="service_date">
                    <div
                      className="input-daterange input-group date"
                      id="service_from_date_cont"
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
                        id="b2TrashBtn"
                        onClick={handleTrashClick3}
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
            <div className="panel-body removeMargins">
              <div className="hideDwnPrt">
                <div className="row mt-2">
                  <div className="col-md-4">
                    <Link
                      title="Click to download XL sheet"
                      to="/tms/new_report.php?report=commission_report&a=&run=1&sel_agent=&search_agent=&search_agent_value=&sel_agent_ajax=&txt_booking_id=&sel_branch=&booking_from_date=&booking_to_date=&status_from_date=&status_to_date=&service_from_date=&service_to_date=&sel_max_results=all&download=1"
                      className="btn btn-dark btn-sm form-group topBtn"
                    >
                      <i className="fa fa-download" />
                      &nbsp;&nbsp;Download Excel
                    </Link>
                    &nbsp;&nbsp;
                    <Link
                      title="Click to print XL sheet"
                      to="/tms/new_report.php?report=commission_report&a=&run=1&sel_agent=&search_agent=&search_agent_value=&sel_agent_ajax=&txt_booking_id=&sel_branch=&booking_from_date=&booking_to_date=&status_from_date=&status_to_date=&service_from_date=&service_to_date=&sel_max_results=all&print=1"
                      target="_blank"
                      className="btn btn-dark btn-sm form-group topBtn"
                    >
                      <i className="fa fa-print" />
                      &nbsp;&nbsp;Print
                    </Link>
                  </div>
                  <div className="col-md-6 col_hide">
                    <div className="form-group">
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
                            <Link className="page-link" to="#">
                              6
                            </Link>
                          </li>
                          <li className="page-item">
                            <Link className="page-link" to="#">
                              7
                            </Link>
                          </li>
                          <li className="page-item">
                            <Link className="page-link" to="#">
                              8
                            </Link>
                          </li>
                          <li className="page-item">
                            <Link className="page-link" to="#">
                              9
                            </Link>
                          </li>
                          <li className="page-item">
                            <Link className="page-link" to="#">
                              10
                            </Link>
                          </li>
                          <li className="page-item">
                            <Link
                              className="page-link"
                              to="#"
                              aria-label="Next"
                            >
                              <span aria-hidden="true">»</span>
                            </Link>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                  <div className="col-md-2 search_option">
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
              <div className="row">
                <div className="col-md-12">
                  <link
                    rel="stylesheet"
                    to="/cpfv3/css/tms/bootstrap_r/css/jquery.dataTables.css"
                  />
                  <link
                    rel="stylesheet"
                    to="/cpfv3/css/tms/bootstrap_r/css/bootstrap-select.css"
                  />
                  <div className="dataTables_scroll">
                    {/* <div class="form-group custPaging pgType2"></div> */}
                    <input type="hidden" name="sort_by" id="sort_by" />
                    <input
                      type="hidden"
                      name="current_page"
                      id="current_page"
                    />
                    <div
                      id="search_sup_wrapper"
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
                              className="table table-bordered   table-responsive alignTbl  dataTable no-footer"
                              role="grid"
                              aria-describedby="search_sup_info"
                            >
                              <thead>
                                {/*tr><td colspan='7'>&nbsp;<td></tr*/}
                                <tr role="row">
                                  <th
                                    className="sorting"
                                    tabIndex={0}
                                    aria-controls="search_sup"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="&nbsp;Date
                  
                      
                  
                  
                      
                  
              : activate to sort column ascending"
                                    style={{ width: "65.2px" }}
                                  >
                                    &nbsp;Date
                                    <Link to="new_report.php?sort_by=status_date&direction=up&report=commission_report&a=&run=1&sel_agent=&search_agent=&search_agent_value=&sel_agent_ajax=&txt_booking_id=&sel_branch=&booking_from_date=&booking_to_date=&status_from_date=&status_to_date=&service_from_date=&service_to_date=&sel_max_results=all">
                                      <img
                                        src="images/up_arrow.gif"
                                        alt=""
                                        border={0}
                                        height={5}
                                        width={9}
                                      />
                                    </Link>
                                    <Link to="new_report.php?sort_by=status_date&direction=down&report=commission_report&a=&run=1&sel_agent=&search_agent=&search_agent_value=&sel_agent_ajax=&txt_booking_id=&sel_branch=&booking_from_date=&booking_to_date=&status_from_date=&status_to_date=&service_from_date=&service_to_date=&sel_max_results=all">
                                      <img
                                        src="images/down_arrow.gif"
                                        alt=""
                                        border={0}
                                        height={5}
                                        width={9}
                                      />
                                    </Link>
                                  </th>
                                  <th
                                    className="no-sort sorting_disabled"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="&nbsp;Booking Id"
                                    style={{ width: "84.2px" }}
                                  >
                                    &nbsp;Booking Id
                                  </th>
                                  <th
                                    className="no-sort sorting_disabled"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="&nbsp;"
                                    style={{ width: "127.2px" }}
                                  >
                                    &nbsp;
                                  </th>
                                  <th
                                    className="no-sort sorting_disabled"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="&nbsp;Voucher Id."
                                    style={{ width: "91.2px" }}
                                  >
                                    &nbsp;Voucher Id.
                                  </th>
                                  <th
                                    className="no-sort sorting_disabled"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="&nbsp;Supplier"
                                    style={{ width: "113.2px" }}
                                  >
                                    &nbsp;Supplier
                                  </th>
                                  <th
                                    className="no-sort sorting_disabled"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="&nbsp;Service Type"
                                    style={{ width: "101.2px" }}
                                  >
                                    &nbsp;Service Type
                                  </th>
                                  <th
                                    className="sorting"
                                    tabIndex={0}
                                    aria-controls="search_sup"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="&nbsp;Pax Name
                  
                  
              : activate to sort column ascending"
                                    style={{ width: "206.2px" }}
                                  >
                                    &nbsp;Pax Name
                                    <Link to="new_report.php?sort_by=lead_name&direction=up&report=commission_report&a=&run=1&sel_agent=&search_agent=&search_agent_value=&sel_agent_ajax=&txt_booking_id=&sel_branch=&booking_from_date=&booking_to_date=&status_from_date=&status_to_date=&service_from_date=&service_to_date=&sel_max_results=all">
                                      <img
                                        src="images/up_arrow.gif"
                                        alt=""
                                        border={0}
                                        height={5}
                                        width={9}
                                      />
                                    </Link>
                                    <Link to="new_report.php?sort_by=lead_name&direction=down&report=commission_report&a=&run=1&sel_agent=&search_agent=&search_agent_value=&sel_agent_ajax=&txt_booking_id=&sel_branch=&booking_from_date=&booking_to_date=&status_from_date=&status_to_date=&service_from_date=&service_to_date=&sel_max_results=all">
                                      <img
                                        src="images/down_arrow.gif"
                                        alt=""
                                        border={0}
                                        height={5}
                                        width={9}
                                      />
                                    </Link>
                                  </th>
                                  <th
                                    className="no-sort numAlign sorting_disabled"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="&nbsp;Sale amount(USD)"
                                    style={{ width: "138.2px" }}
                                  >
                                    &nbsp;Sale amount(USD)
                                  </th>
                                  <th
                                    className="numAlign numeric-comma sorting"
                                    tabIndex={0}
                                    aria-controls="search_sup"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="&nbsp;Grand Total Profit
                  
                  
              : activate to sort column ascending"
                                    style={{ width: "153.2px" }}
                                  >
                                    &nbsp;Grand Total Profit
                                    <Link to="new_report.php?sort_by=total_profit&direction=up&report=commission_report&a=&run=1&sel_agent=&search_agent=&search_agent_value=&sel_agent_ajax=&txt_booking_id=&sel_branch=&booking_from_date=&booking_to_date=&status_from_date=&status_to_date=&service_from_date=&service_to_date=&sel_max_results=all">
                                      <img
                                        src="images/up_arrow.gif"
                                        alt=""
                                        border={0}
                                        height={5}
                                        width={9}
                                      />
                                    </Link>
                                    <Link to="new_report.php?sort_by=total_profit&direction=down&report=commission_report&a=&run=1&sel_agent=&search_agent=&search_agent_value=&sel_agent_ajax=&txt_booking_id=&sel_branch=&booking_from_date=&booking_to_date=&status_from_date=&status_to_date=&service_from_date=&service_to_date=&sel_max_results=all">
                                      <img
                                        src="images/down_arrow.gif"
                                        alt=""
                                        border={0}
                                        height={5}
                                        width={9}
                                      />
                                    </Link>
                                  </th>
                                  <th
                                    className="no-sort numAlign sorting_disabled"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="&nbsp;Cumulative Commission"
                                    style={{ width: "180.2px" }}
                                  >
                                    &nbsp;Cumulative Commission
                                  </th>
                                  <th
                                    className="no-sort sorting_disabled"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="&nbsp;Currency"
                                    style={{ width: "79px" }}
                                  >
                                    &nbsp;Currency
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white">
                                <tr role="row" className="odd">
                                  {/*td>1</td*/}
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">09</div>
                                      <div className="monthYear">
                                        Jan
                                        <br />
                                        2018
                                      </div>
                                    </div>
                                  </td>
                                  <td>00104</td>
                                  <td>Mansi Surve</td>
                                  <td>72128</td>
                                  <td>Nirvana Tour</td>
                                  <td>hotel</td>
                                  <td>Ms Mansi Test</td>
                                  <td className="numAlign">156.881</td>
                                  <td className="numAlign">1.863</td>
                                  <td className="numAlign">1.86</td>
                                  <td>USD</td>
                                </tr>
                                <tr role="row" className="even">
                                  {/*td>2</td*/}
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">17</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2018
                                      </div>
                                    </div>
                                  </td>
                                  <td>TD800574</td>
                                  <td>suhas qtech</td>
                                  <td>2873</td>
                                  <td>QtechTest</td>
                                  <td>hotel</td>
                                  <td>Mr suhasqtech test</td>
                                  <td className="numAlign">947.840</td>
                                  <td className="numAlign">45.140</td>
                                  <td className="numAlign">47.00</td>
                                  <td>USD</td>
                                </tr>
                                <tr role="row" className="odd">
                                  {/*td>3</td*/}
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">25</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2018
                                      </div>
                                    </div>
                                  </td>
                                  <td>TD800614</td>
                                  <td>prafull shirke</td>
                                  <td>94466</td>
                                  <td>MYCAB</td>
                                  <td>hotel</td>
                                  <td>Mr ddd bbb</td>
                                  <td className="numAlign">107.840</td>
                                  <td className="numAlign">0.003</td>
                                  <td className="numAlign">47.01</td>
                                  <td>USD</td>
                                </tr>
                                <tr role="row" className="even">
                                  {/*td>4</td*/}
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">25</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2018
                                      </div>
                                    </div>
                                  </td>
                                  <td>TD800618</td>
                                  <td>prafull shirke</td>
                                  <td>78729</td>
                                  <td>QtechTest</td>
                                  <td>hotel</td>
                                  <td>Mr room2adlt1 room2adlt1</td>
                                  <td className="numAlign">7344.030</td>
                                  <td className="numAlign">0.030</td>
                                  <td className="numAlign">47.04</td>
                                  <td>USD</td>
                                </tr>
                                <tr role="row" className="odd">
                                  {/*td>5</td*/}
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">25</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2018
                                      </div>
                                    </div>
                                  </td>
                                  <td>TD800619</td>
                                  <td>prafull shirke</td>
                                  <td>12938</td>
                                  <td>MYCAB</td>
                                  <td>hotel</td>
                                  <td>Mr cc cc</td>
                                  <td className="numAlign">1579.800</td>
                                  <td className="numAlign">-0.019</td>
                                  <td className="numAlign">47.02</td>
                                  <td>USD</td>
                                </tr>
                                <tr role="row" className="even">
                                  {/*td>6</td*/}
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">28</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2018
                                      </div>
                                    </div>
                                  </td>
                                  <td>TD800627</td>
                                  <td>prafull shirke</td>
                                  <td>58003</td>
                                  <td>QtechTest</td>
                                  <td>hotel</td>
                                  <td>Mr prafull shirke</td>
                                  <td className="numAlign">2027.462</td>
                                  <td className="numAlign">-76.288</td>
                                  <td className="numAlign">-29.27</td>
                                  <td>USD</td>
                                </tr>
                                <tr role="row" className="odd">
                                  {/*td>7</td*/}
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">30</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2018
                                      </div>
                                    </div>
                                  </td>
                                  <td>TD800634</td>
                                  <td>prafull shirke</td>
                                  <td>75348</td>
                                  <td>MYCAB</td>
                                  <td>hotel</td>
                                  <td>Mr www www</td>
                                  <td className="numAlign">26.960</td>
                                  <td className="numAlign">0.001</td>
                                  <td className="numAlign">-29.27</td>
                                  <td>USD</td>
                                </tr>
                                <tr role="row" className="even">
                                  {/*td>8</td*/}
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">31</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2018
                                      </div>
                                    </div>
                                  </td>
                                  <td>TD800639</td>
                                  <td>prafull shirke</td>
                                  <td>90243</td>
                                  <td>QtechTest</td>
                                  <td>hotel</td>
                                  <td>Mr prafull shirke</td>
                                  <td className="numAlign">2103.760</td>
                                  <td className="numAlign">0.010</td>
                                  <td className="numAlign">-29.26</td>
                                  <td>USD</td>
                                </tr>
                                <tr role="row" className="odd">
                                  {/*td>9</td*/}
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">04</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2018
                                      </div>
                                    </div>
                                  </td>
                                  <td>TD800644</td>
                                  <td>prafull shirke</td>
                                  <td>95884</td>
                                  <td>QtechTest</td>
                                  <td>hotel</td>
                                  <td>Mr prafull shirke</td>
                                  <td className="numAlign">2103.760</td>
                                  <td className="numAlign">0.010</td>
                                  <td className="numAlign">-29.25</td>
                                  <td>USD</td>
                                </tr>
                                <tr role="row" className="even">
                                  {/*td>10</td*/}
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">18</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2018
                                      </div>
                                    </div>
                                  </td>
                                  <td>00680</td>
                                  <td>suhas qtech</td>
                                  <td>1515</td>
                                  <td>redapple</td>
                                  <td>hotel</td>
                                  <td>Mr suhasqtech test</td>
                                  <td className="numAlign">3.150</td>
                                  <td className="numAlign">0.090</td>
                                  <td className="numAlign">-29.16</td>
                                  <td>USD</td>
                                </tr>
                                <tr role="row" className="odd">
                                  {/*td>11</td*/}
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">18</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2018
                                      </div>
                                    </div>
                                  </td>
                                  <td>TD800681</td>
                                  <td>suhas qtech</td>
                                  <td>852741</td>
                                  <td>QtechTest</td>
                                  <td>hotel</td>
                                  <td>Mr suhasqtech test</td>
                                  <td className="numAlign">200.810</td>
                                  <td className="numAlign">9.560</td>
                                  <td className="numAlign">-19.60</td>
                                  <td>USD</td>
                                </tr>
                                <tr role="row" className="even">
                                  {/*td>12</td*/}
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">23</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2018
                                      </div>
                                    </div>
                                  </td>
                                  <td>TD200709</td>
                                  <td>Mansi Surve</td>
                                  <td>ddd</td>
                                  <td>hotelbeds</td>
                                  <td>hotel</td>
                                  <td>Mr xcxcv zxczxc</td>
                                  <td className="numAlign">332.280</td>
                                  <td className="numAlign">0.002</td>
                                  <td className="numAlign">-19.60</td>
                                  <td>USD</td>
                                </tr>
                                <tr role="row" className="odd">
                                  {/*td>13</td*/}
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">23</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2018
                                      </div>
                                    </div>
                                  </td>
                                  <td>TD200710</td>
                                  <td>Mansi Surve</td>
                                  <td>65756756</td>
                                  <td>hotelbeds</td>
                                  <td>hotel</td>
                                  <td>Mr vbcvb dgdfg</td>
                                  <td className="numAlign">332.280</td>
                                  <td className="numAlign">0.002</td>
                                  <td className="numAlign">-19.60</td>
                                  <td>USD</td>
                                </tr>
                                <tr role="row" className="even">
                                  {/*td>14</td*/}
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">06</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2018
                                      </div>
                                    </div>
                                  </td>
                                  <td>TD800770</td>
                                  <td>prafull shirke</td>
                                  <td>10447</td>
                                  <td>QtechTest</td>
                                  <td>hotel</td>
                                  <td>Mr dryft fh</td>
                                  <td className="numAlign">11192.020</td>
                                  <td className="numAlign">0.070</td>
                                  <td className="numAlign">-19.53</td>
                                  <td>USD</td>
                                </tr>
                                <tr role="row" className="odd">
                                  {/*td>15</td*/}
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">10</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2018
                                      </div>
                                    </div>
                                  </td>
                                  <td>TD800771</td>
                                  <td>prafull shirke</td>
                                  <td>74850</td>
                                  <td>QtechTest</td>
                                  <td>hotel</td>
                                  <td>Mr ytdyh fgfh</td>
                                  <td className="numAlign">10098.000</td>
                                  <td className="numAlign">0.000</td>
                                  <td className="numAlign">-19.53</td>
                                  <td>USD</td>
                                </tr>
                                <tr role="row" className="even">
                                  {/*td>16</td*/}
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">09</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2018
                                      </div>
                                    </div>
                                  </td>
                                  <td>TD800772</td>
                                  <td>prafull shirke</td>
                                  <td>57321</td>
                                  <td>QtechTest</td>
                                  <td>hotel</td>
                                  <td>Mr rt gyty</td>
                                  <td className="numAlign">10392.590</td>
                                  <td className="numAlign">0.065</td>
                                  <td className="numAlign">-19.46</td>
                                  <td>USD</td>
                                </tr>
                                <tr role="row" className="odd">
                                  {/*td>17</td*/}
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">10</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2018
                                      </div>
                                    </div>
                                  </td>
                                  <td>TD800773</td>
                                  <td>prafull shirke</td>
                                  <td>77553</td>
                                  <td>QtechTest</td>
                                  <td>hotel</td>
                                  <td>Mr test aaa</td>
                                  <td className="numAlign">114.750</td>
                                  <td className="numAlign">0.000</td>
                                  <td className="numAlign">-19.46</td>
                                  <td>USD</td>
                                </tr>
                                <tr role="row" className="even">
                                  {/*td>18</td*/}
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">10</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2018
                                      </div>
                                    </div>
                                  </td>
                                  <td>TD800774</td>
                                  <td>prafull shirke</td>
                                  <td>83375</td>
                                  <td>QtechTest</td>
                                  <td>hotel</td>
                                  <td>Mr sss ffff</td>
                                  <td className="numAlign">133.880</td>
                                  <td className="numAlign">0.005</td>
                                  <td className="numAlign">-19.46</td>
                                  <td>USD</td>
                                </tr>
                                <tr role="row" className="odd">
                                  {/*td>19</td*/}
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">10</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2018
                                      </div>
                                    </div>
                                  </td>
                                  <td>TD800775</td>
                                  <td>prafull shirke</td>
                                  <td>70101</td>
                                  <td>QtechTest</td>
                                  <td>hotel</td>
                                  <td>Mr jj jj</td>
                                  <td className="numAlign">114.750</td>
                                  <td className="numAlign">0.000</td>
                                  <td className="numAlign">-19.46</td>
                                  <td>USD</td>
                                </tr>
                                <tr role="row" className="even">
                                  {/*td>20</td*/}
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">10</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2018
                                      </div>
                                    </div>
                                  </td>
                                  <td>TD800776</td>
                                  <td>prafull shirke</td>
                                  <td>82332</td>
                                  <td>QtechTest</td>
                                  <td>hotel</td>
                                  <td>Mr qqq aaaa</td>
                                  <td className="numAlign">114.750</td>
                                  <td className="numAlign">0.000</td>
                                  <td className="numAlign">-19.46</td>
                                  <td>USD</td>
                                </tr>
                                <tr role="row" className="odd">
                                  {/*td>21</td*/}
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">10</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2018
                                      </div>
                                    </div>
                                  </td>
                                  <td>TD800777</td>
                                  <td>prafull shirke</td>
                                  <td>33324</td>
                                  <td>QtechTest</td>
                                  <td>hotel</td>
                                  <td>Mr kk ch</td>
                                  <td className="numAlign">133.880</td>
                                  <td className="numAlign">0.005</td>
                                  <td className="numAlign">-19.45</td>
                                  <td>USD</td>
                                </tr>
                                <tr role="row" className="even">
                                  {/*td>22</td*/}
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">10</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2018
                                      </div>
                                    </div>
                                  </td>
                                  <td>TD800778</td>
                                  <td>prafull shirke</td>
                                  <td>97682</td>
                                  <td>QtechTest</td>
                                  <td>hotel</td>
                                  <td>Mr eeerrr rrrr</td>
                                  <td className="numAlign">133.880</td>
                                  <td className="numAlign">0.005</td>
                                  <td className="numAlign">-19.45</td>
                                  <td>USD</td>
                                </tr>
                                <tr role="row" className="odd">
                                  {/*td>23</td*/}
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">10</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2018
                                      </div>
                                    </div>
                                  </td>
                                  <td>TD800779</td>
                                  <td>prafull shirke</td>
                                  <td>14403</td>
                                  <td>QtechTest</td>
                                  <td>hotel</td>
                                  <td>Mr qwerty qwerty</td>
                                  <td className="numAlign">191.250</td>
                                  <td className="numAlign">0.000</td>
                                  <td className="numAlign">-19.45</td>
                                  <td>USD</td>
                                </tr>
                                <tr role="row" className="even">
                                  {/*td>24</td*/}
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">10</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2018
                                      </div>
                                    </div>
                                  </td>
                                  <td>TD800780</td>
                                  <td>prafull shirke</td>
                                  <td>28842</td>
                                  <td>QtechTest</td>
                                  <td>hotel</td>
                                  <td>Mr asg ashi</td>
                                  <td className="numAlign">114.750</td>
                                  <td className="numAlign">0.000</td>
                                  <td className="numAlign">-19.45</td>
                                  <td>USD</td>
                                </tr>
                                <tr role="row" className="odd">
                                  {/*td>25</td*/}
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">10</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2018
                                      </div>
                                    </div>
                                  </td>
                                  <td>TD800781</td>
                                  <td>prafull shirke</td>
                                  <td>44971</td>
                                  <td>QtechTest</td>
                                  <td>hotel</td>
                                  <td>Mr aa bb</td>
                                  <td className="numAlign">229.500</td>
                                  <td className="numAlign">0.000</td>
                                  <td className="numAlign">-19.45</td>
                                  <td>USD</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div class="form-group custPaging pgType2"></div> */}
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
export default ReportsAccountsCommission;
