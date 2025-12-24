import Header2 from "../header2/header2";
import Flatpickr from "react-flatpickr";
import React, { useState } from "react";
import MultiSelect from "../reactMultiSelect";
import {
  invoiceStatusOptions,
  onlineSupplierOptions,
} from "../../constants/contants";

const ReportsAccountsSupplierStatementOnlineSupplier = () => {
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
      <Header2 title="ONLINE SUPPLIER STATEMENT" />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <div>
          <form>
            <div className="panel-body">
              <div className="row">
                <div className="form-group col-md-3">
                  <label>Supplier</label>
                  <MultiSelect
                    options={onlineSupplierOptions}
                    isSearchable
                    placeholder=" Select Supplier "
                    className="custom-select"
                    noOptionsMessage={() => "No Supplier Found"}
                  />
                </div>
                <div className="form-group col-md-3">
                  <label>Pax Name</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="pax_name"
                    id="txt_pax_name"
                    size={40}
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
                  <label>Show</label>
                  <MultiSelect
                    options={invoiceStatusOptions}
                    isSearchable
                    placeholder=" Select "
                    className="custom-select"
                    noOptionsMessage={() => "No Status Found"}
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
                  <label htmlFor="chk_service_date">Service Date</label>
                  <div name="service_date" id="service_date">
                    <div
                      className="input-daterange input-group date"
                      id="service_from_date_cont"
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
                        id="b2TrashBtn"
                        onClick={handleTrashClick1}
                      >
                        <i className="fa fa-trash" />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="chk_date_status">Check-Out Date</label>
                  <div name="checkout_date" id="checkout_date">
                    <div
                      className="input-daterange input-group date"
                      id="checkout_from_date_cont"
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
                        id="b3TrashBtn"
                        onClick={handleTrashClick3}
                      >
                        <i className="fa fa-trash" />
                      </span>
                    </div>
                  </div>
                </div>
                <input type="hidden" name="sel_max_results" />
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
                <div className="row">
                  <div className="col-md-5">
                    <a
                      title="Click to download XL sheet"
                      href="/tms/new_report.php?report=supplier_statement_online&a=&run=1&sel_online_supplier_with_currency=_&pax_name=&txt_booking_id=&sel_paid_unpaid=onlypending&booking_from_date=&booking_to_date=&service_from_date=&service_to_date=&checkout_from_date=&checkout_to_date=&sel_max_results=&download=1"
                      className="btn btn-dark btn-sm form-group topBtn"
                    >
                      <i className="fa fa-download" />
                      &nbsp;&nbsp;Download Excel
                    </a>
                    &nbsp;&nbsp;
                    <a
                      title="Click to print XL sheet"
                      href="/tms/new_report.php?report=supplier_statement_online&a=&run=1&sel_online_supplier_with_currency=_&pax_name=&txt_booking_id=&sel_paid_unpaid=onlypending&booking_from_date=&booking_to_date=&service_from_date=&service_to_date=&checkout_from_date=&checkout_to_date=&sel_max_results=&print=1"
                      target="_blank"
                      className="btn btn-dark btn-sm form-group topBtn"
                    >
                      <i className="fa fa-print" />
                      &nbsp;&nbsp;Print
                    </a>
                  </div>
                  <div className="col-md-5 col_hide">
                    <div className="form-group" />
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
                    href="/cpfv3/css/tms/bootstrap_r/css/jquery.dataTables.css"
                  />
                  <link
                    rel="stylesheet"
                    href="/cpfv3/css/tms/bootstrap_r/css/bootstrap-select.css"
                  />
                  <div className="dataTables_scroll">
                    <div
                      id="search_agents_table1_wrapper"
                      className="dataTables_wrapper form-inline dt-bootstrap no-footer"
                    >
                      <div className="row">
                        <div className="col-sm-10" />
                        <div className="col-sm-2">
                          <div
                            id="search_agents_table1_filter"
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
                                <tr role="row">
                                  <th
                                    className="no-sort sorting_disabled"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="
    No
                  "
                                    style={{ width: "37.2px" }}
                                  >
                                    No
                                  </th>
                                  <th
                                    className="sorting"
                                    tabIndex={0}
                                    aria-controls="search_agents_table1"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="
    Booking Date
                      
    
                  : activate to sort column ascending"
                                    style={{ width: "71.2px" }}
                                  >
                                    Booking Date
                                    <a href="new_report.php?sort_by=create_date&direction=up&report=supplier_statement_online&a=&run=1&sel_online_supplier_with_currency=_&pax_name=&txt_booking_id=&sel_paid_unpaid=onlypending&booking_from_date=&booking_to_date=&service_from_date=&service_to_date=&checkout_from_date=&checkout_to_date=&sel_max_results=">
                                      <img
                                        src="images/up_arrow.gif"
                                        alt=""
                                        border={0}
                                        height={5}
                                        width={9}
                                      />
                                    </a>
                                    <a href="new_report.php?sort_by=create_date&direction=down&report=supplier_statement_online&a=&run=1&sel_online_supplier_with_currency=_&pax_name=&txt_booking_id=&sel_paid_unpaid=onlypending&booking_from_date=&booking_to_date=&service_from_date=&service_to_date=&checkout_from_date=&checkout_to_date=&sel_max_results=">
                                      <img
                                        src="images/down_arrow.gif"
                                        alt=""
                                        border={0}
                                        height={5}
                                        width={9}
                                      />
                                    </a>
                                  </th>
                                  <th
                                    className="no-sort sorting_disabled"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="
    Service Date
                  "
                                    style={{ width: "68.2px" }}
                                  >
                                    Service Date
                                  </th>
                                  <th
                                    className="no-sort sorting_disabled"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="
    Check-Out Date
                  "
                                    style={{ width: "82.2px" }}
                                  >
                                    Check-Out Date
                                  </th>
                                  <th
                                    className="sorting"
                                    tabIndex={0}
                                    aria-controls="search_agents_table1"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="
    Booking Id
                      
    
                  : activate to sort column ascending"
                                    style={{ width: "56.2px" }}
                                  >
                                    Booking Id
                                    <a href="new_report.php?sort_by=booking_rate_id&direction=up&report=supplier_statement_online&a=&run=1&sel_online_supplier_with_currency=_&pax_name=&txt_booking_id=&sel_paid_unpaid=onlypending&booking_from_date=&booking_to_date=&service_from_date=&service_to_date=&checkout_from_date=&checkout_to_date=&sel_max_results=">
                                      <img
                                        src="images/up_arrow.gif"
                                        alt=""
                                        border={0}
                                        height={5}
                                        width={9}
                                      />
                                    </a>
                                    <a href="new_report.php?sort_by=booking_rate_id&direction=down&report=supplier_statement_online&a=&run=1&sel_online_supplier_with_currency=_&pax_name=&txt_booking_id=&sel_paid_unpaid=onlypending&booking_from_date=&booking_to_date=&service_from_date=&service_to_date=&checkout_from_date=&checkout_to_date=&sel_max_results=">
                                      <img
                                        src="images/down_arrow.gif"
                                        alt=""
                                        border={0}
                                        height={5}
                                        width={9}
                                      />
                                    </a>
                                  </th>
                                  <th
                                    className="no-sort sorting_disabled"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="
    Voucher Id.
                  "
                                    style={{ width: "123.2px" }}
                                  >
                                    Voucher Id.
                                  </th>
                                  <th
                                    className="no-sort sorting_disabled"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="
    Booking Ref. No.
                  "
                                    style={{ width: "130.2px" }}
                                  >
                                    Booking Ref. No.
                                  </th>
                                  <th
                                    className="no-sort sorting_disabled"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="
    Type
                  "
                                    style={{ width: "65.2px" }}
                                  >
                                    Type
                                  </th>
                                  <th
                                    className="no-sort sorting_disabled"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="
    Service Type
                  "
                                    style={{ width: "73.2px" }}
                                  >
                                    Service Type
                                  </th>
                                  <th
                                    className="sorting"
                                    tabIndex={0}
                                    aria-controls="search_agents_table1"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="
    Pax Name
                      
    
                  : activate to sort column ascending"
                                    style={{ width: "102.2px" }}
                                  >
                                    Pax Name
                                    <a href="new_report.php?sort_by=lead_name&direction=up&report=supplier_statement_online&a=&run=1&sel_online_supplier_with_currency=_&pax_name=&txt_booking_id=&sel_paid_unpaid=onlypending&booking_from_date=&booking_to_date=&service_from_date=&service_to_date=&checkout_from_date=&checkout_to_date=&sel_max_results=">
                                      <img
                                        src="images/up_arrow.gif"
                                        alt=""
                                        border={0}
                                        height={5}
                                        width={9}
                                      />
                                    </a>
                                    <a href="new_report.php?sort_by=lead_name&direction=down&report=supplier_statement_online&a=&run=1&sel_online_supplier_with_currency=_&pax_name=&txt_booking_id=&sel_paid_unpaid=onlypending&booking_from_date=&booking_to_date=&service_from_date=&service_to_date=&checkout_from_date=&checkout_to_date=&sel_max_results=">
                                      <img
                                        src="images/down_arrow.gif"
                                        alt=""
                                        border={0}
                                        height={5}
                                        width={9}
                                      />
                                    </a>
                                  </th>
                                  <th
                                    className="numAlign no-sort sorting_disabled"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="
    Debit 
                  "
                                    style={{ width: "70.2px" }}
                                  >
                                    Debit
                                  </th>
                                  <th
                                    className="numAlign no-sort sorting_disabled"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="
    Debit In (LC) USD
                  "
                                    style={{ width: "84.2px" }}
                                  >
                                    Debit In (LC) USD
                                  </th>
                                  <th
                                    className="numAlign no-sort sorting_disabled"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="
    Credit
                  "
                                    style={{ width: "34.2px" }}
                                  >
                                    Credit
                                  </th>
                                  <th
                                    className="numAlign no-sort sorting_disabled"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="
    Exchange Rate
                  "
                                    style={{ width: "80.2px" }}
                                  >
                                    Exchange Rate
                                  </th>
                                  <th
                                    className="numAlign no-sort sorting_disabled"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="
    Balance
                  "
                                    style={{ width: "70.2px" }}
                                  >
                                    Balance
                                  </th>
                                  <th
                                    className="numAlign no-sort sorting_disabled"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="
    Cumulative Balance
                  "
                                    style={{ width: "110px" }}
                                  >
                                    Cumulative Balance
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white">
                                <tr role="row" className="odd">
                                  <td>1</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">07</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2018
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">08</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2018
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">09</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2018
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD700653</td>
                                  <td> 1234</td>
                                  <td> 234242</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel (misc)</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr adsad asdad</td>
                                  <td className="numAlign">10.00 </td>
                                  <td className="numAlign">10.52 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">1.051875</td>
                                  <td className="numAlign">10.00 </td>
                                  <td className="numAlign">10.00 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>2</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">21</div>
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
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">02</div>
                                      <div className="monthYear">
                                        Nov
                                        <br />
                                        2017
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD000304</td>
                                  <td> 1231</td>
                                  <td> 156332323</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr asmi test</td>
                                  <td className="numAlign">70.62 </td>
                                  <td className="numAlign">268.04 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">3.7957084</td>
                                  <td className="numAlign">70.62 </td>
                                  <td className="numAlign">80.62 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>3</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">21</div>
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
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">02</div>
                                      <div className="monthYear">
                                        Nov
                                        <br />
                                        2017
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD000306</td>
                                  <td> 1231</td>
                                  <td> 156339833</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr asmi test</td>
                                  <td className="numAlign">153.66 </td>
                                  <td className="numAlign">583.24 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">3.7957084</td>
                                  <td className="numAlign">153.66 </td>
                                  <td className="numAlign">234.27 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>4</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">21</div>
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
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">02</div>
                                      <div className="monthYear">
                                        Nov
                                        <br />
                                        2017
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD000309</td>
                                  <td> 1231</td>
                                  <td> 156342123</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr asmi test</td>
                                  <td className="numAlign">62.05 </td>
                                  <td className="numAlign">235.52 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">3.7957084</td>
                                  <td className="numAlign">62.05 </td>
                                  <td className="numAlign">296.32 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>5</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">21</div>
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
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">02</div>
                                      <div className="monthYear">
                                        Nov
                                        <br />
                                        2017
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD000313</td>
                                  <td> 1231</td>
                                  <td> 156344853</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr asmi test</td>
                                  <td className="numAlign">64.06 </td>
                                  <td className="numAlign">243.17 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">3.7957084</td>
                                  <td className="numAlign">64.06 </td>
                                  <td className="numAlign">360.39 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>6</td>
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
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">02</div>
                                      <div className="monthYear">
                                        Nov
                                        <br />
                                        2017
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD000316</td>
                                  <td> 1231</td>
                                  <td> 156397613</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr asmi test</td>
                                  <td className="numAlign">72.31 </td>
                                  <td className="numAlign">274.45 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">3.7957084</td>
                                  <td className="numAlign">72.31 </td>
                                  <td className="numAlign">432.69 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>7</td>
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
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">02</div>
                                      <div className="monthYear">
                                        Nov
                                        <br />
                                        2017
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD000318</td>
                                  <td> 1231</td>
                                  <td> 156397773</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr asmi test</td>
                                  <td className="numAlign">77.36 </td>
                                  <td className="numAlign">293.62 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">3.7957084</td>
                                  <td className="numAlign">77.36 </td>
                                  <td className="numAlign">510.05 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>8</td>
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
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD000319</td>
                                  <td> 1231</td>
                                  <td> 156399333</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr asmi test</td>
                                  <td className="numAlign">70.62 </td>
                                  <td className="numAlign">268.04 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">3.7957084</td>
                                  <td className="numAlign">70.62 </td>
                                  <td className="numAlign">580.66 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>9</td>
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
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD000321</td>
                                  <td> 1231</td>
                                  <td> 156399563</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr asmi test</td>
                                  <td className="numAlign">70.62 </td>
                                  <td className="numAlign">268.04 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">3.7957084</td>
                                  <td className="numAlign">70.62 </td>
                                  <td className="numAlign">651.28 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>10</td>
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
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD000323</td>
                                  <td> 1231</td>
                                  <td> 156399963</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr asmi test</td>
                                  <td className="numAlign">70.62 </td>
                                  <td className="numAlign">268.04 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">3.7957084</td>
                                  <td className="numAlign">70.62 </td>
                                  <td className="numAlign">721.89 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>11</td>
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
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">02</div>
                                      <div className="monthYear">
                                        Nov
                                        <br />
                                        2017
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD000325</td>
                                  <td> 1231</td>
                                  <td> 156400633</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr asmi test</td>
                                  <td className="numAlign">70.62 </td>
                                  <td className="numAlign">268.04 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">3.7957084</td>
                                  <td className="numAlign">70.62 </td>
                                  <td className="numAlign">792.51 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>12</td>
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
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">02</div>
                                      <div className="monthYear">
                                        Nov
                                        <br />
                                        2017
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD000327</td>
                                  <td> 1231</td>
                                  <td> 156400773</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr asmi test</td>
                                  <td className="numAlign">70.62 </td>
                                  <td className="numAlign">268.04 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">3.7957084</td>
                                  <td className="numAlign">70.62 </td>
                                  <td className="numAlign">863.13 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>13</td>
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
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">04</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2018
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD000329</td>
                                  <td> 329</td>
                                  <td> 156407023</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr asmi test</td>
                                  <td className="numAlign">10.00 </td>
                                  <td className="numAlign">37.96 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">3.7957084</td>
                                  <td className="numAlign">10.00 </td>
                                  <td className="numAlign">873.13 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>14</td>
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
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD000330</td>
                                  <td> 330</td>
                                  <td> 156411483</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr asmi test</td>
                                  <td className="numAlign">10.00 </td>
                                  <td className="numAlign">37.96 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">3.7957084</td>
                                  <td className="numAlign">10.00 </td>
                                  <td className="numAlign">883.13 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>15</td>
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
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">02</div>
                                      <div className="monthYear">
                                        Nov
                                        <br />
                                        2017
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD000332</td>
                                  <td> 332</td>
                                  <td> 156427463</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr asmi test</td>
                                  <td className="numAlign">10.00 </td>
                                  <td className="numAlign">37.96 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">3.7957084</td>
                                  <td className="numAlign">10.00 </td>
                                  <td className="numAlign">893.13 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>16</td>
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
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">02</div>
                                      <div className="monthYear">
                                        Nov
                                        <br />
                                        2017
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD000333</td>
                                  <td> 333</td>
                                  <td> 156429183</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr asmi test</td>
                                  <td className="numAlign">5.00 </td>
                                  <td className="numAlign">18.98 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">3.7957084</td>
                                  <td className="numAlign">5.00 </td>
                                  <td className="numAlign">898.13 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>1395</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">22</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">16</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">17</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD1802404</td>
                                  <td> 111</td>
                                  <td> 02418971104</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr fgf sds</td>
                                  <td className="numAlign">120.00 </td>
                                  <td className="numAlign">564.57 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">4.70475</td>
                                  <td className="numAlign">120.00 </td>
                                  <td className="numAlign">430748.59 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>1396</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">22</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">15</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">16</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD1802405</td>
                                  <td> 222</td>
                                  <td> 82418971380</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr gfgfg dfdf</td>
                                  <td className="numAlign">120.00 </td>
                                  <td className="numAlign">564.57 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">4.70475</td>
                                  <td className="numAlign">120.00 </td>
                                  <td className="numAlign">430868.59 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>1397</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">22</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">22</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">23</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD1802406</td>
                                  <td> 123</td>
                                  <td> 332417971337</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr dfd gfgfg</td>
                                  <td className="numAlign">120.00 </td>
                                  <td className="numAlign">564.57 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">4.70475</td>
                                  <td className="numAlign">120.00 </td>
                                  <td className="numAlign">430988.59 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>1398</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">22</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">22</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">23</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD1802407</td>
                                  <td> 444</td>
                                  <td> 242418971740</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr sdsd hhgh</td>
                                  <td className="numAlign">120.00 </td>
                                  <td className="numAlign">564.57 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">4.70475</td>
                                  <td className="numAlign">120.00 </td>
                                  <td className="numAlign">431108.59 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>1399</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">22</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">22</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">23</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD1802408</td>
                                  <td> 666</td>
                                  <td> 382417972089</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr ghhgh ddf</td>
                                  <td className="numAlign">120.00 </td>
                                  <td className="numAlign">564.57 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">4.70475</td>
                                  <td className="numAlign">120.00 </td>
                                  <td className="numAlign">431228.59 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>1400</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">24</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">01</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">02</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD1802413</td>
                                  <td> 123</td>
                                  <td> 352422971651</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr abc test</td>
                                  <td className="numAlign">136.00 </td>
                                  <td className="numAlign">639.85 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">4.70475</td>
                                  <td className="numAlign">136.00 </td>
                                  <td className="numAlign">431364.59 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>1401</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">24</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">21</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">22</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD1802414</td>
                                  <td> 123</td>
                                  <td> 452423972254</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr abc xyz</td>
                                  <td className="numAlign">128.00 </td>
                                  <td className="numAlign">602.21 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">4.70475</td>
                                  <td className="numAlign">128.00 </td>
                                  <td className="numAlign">431492.59 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>1402</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">24</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">11</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">12</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD1802419</td>
                                  <td> qwe</td>
                                  <td> 32422972030</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr test abc</td>
                                  <td className="numAlign">128.00 </td>
                                  <td className="numAlign">602.21 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">4.70475</td>
                                  <td className="numAlign">128.00 </td>
                                  <td className="numAlign">431620.59 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>1403</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">24</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">01</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">02</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD1802423</td>
                                  <td> 123</td>
                                  <td> 472423972370</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr qqwrer ghgfh</td>
                                  <td className="numAlign">128.00 </td>
                                  <td className="numAlign">602.21 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">4.70475</td>
                                  <td className="numAlign">128.00 </td>
                                  <td className="numAlign">431748.59 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>1404</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">29</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">18</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">20</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>02610</td>
                                  <td> 56347</td>
                                  <td> 8233326</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr Farid Bangash</td>
                                  <td className="numAlign">99.78 </td>
                                  <td className="numAlign">381.66 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">3.825</td>
                                  <td className="numAlign">99.78 </td>
                                  <td className="numAlign">431848.37 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>1405</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">29</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">30</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td></td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD902624</td>
                                  <td> 2624</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> transfer</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> FFinalllBookinggg </td>
                                  <td className="numAlign">100.00 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign" />
                                  <td className="numAlign">100.00 </td>
                                  <td className="numAlign">431948.37 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>1406</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">29</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">30</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td></td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD1002625</td>
                                  <td> 2625</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> sightseeing</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr FFinalll Bookinggg</td>
                                  <td className="numAlign">100.00 </td>
                                  <td className="numAlign">6.01 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">0.0600576</td>
                                  <td className="numAlign">100.00 </td>
                                  <td className="numAlign">432048.37 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>1407</td>
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
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD902640</td>
                                  <td> 2640</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> transfer</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> ssssggg </td>
                                  <td className="numAlign">100.00 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign" />
                                  <td className="numAlign">100.00 </td>
                                  <td className="numAlign">432148.37 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>1408</td>
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
                                  <td></td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD1002641</td>
                                  <td> 2641</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> sightseeing</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr ssss ggg</td>
                                  <td className="numAlign">100.00 </td>
                                  <td className="numAlign">6.01 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">0.0600576</td>
                                  <td className="numAlign">100.00 </td>
                                  <td className="numAlign">432248.37 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>1409</td>
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
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD902644</td>
                                  <td> 2644</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> transfer</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> vvvvnnnn </td>
                                  <td className="numAlign">100.00 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign" />
                                  <td className="numAlign">100.00 </td>
                                  <td className="numAlign">432348.37 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>1410</td>
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
                                  <td></td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD1002645</td>
                                  <td> 2645</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> sightseeing</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr vvvv nnnn</td>
                                  <td className="numAlign">100.00 </td>
                                  <td className="numAlign">6.01 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">0.0600576</td>
                                  <td className="numAlign">100.00 </td>
                                  <td className="numAlign">432448.37 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>1411</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">01</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">01</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">02</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD802656</td>
                                  <td> 555</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Ammended</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr ffff ddd</td>
                                  <td className="numAlign">10.00 </td>
                                  <td className="numAlign">0.60 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">0.0600576</td>
                                  <td className="numAlign">10.00 </td>
                                  <td className="numAlign">432458.37 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>1412</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">01</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">01</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">02</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD802656</td>
                                  <td> 555</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Ammended</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr ffff ddd</td>
                                  <td className="numAlign">10.00 </td>
                                  <td className="numAlign">0.60 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">0.0600576</td>
                                  <td className="numAlign">10.00 </td>
                                  <td className="numAlign">432468.37 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>1413</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">03</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">03</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td></td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD1002690</td>
                                  <td> 2690</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> sightseeing</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr tesssttt Bookkinggg</td>
                                  <td className="numAlign">100.00 </td>
                                  <td className="numAlign">6.01 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">0.0600576</td>
                                  <td className="numAlign">100.00 </td>
                                  <td className="numAlign">432568.37 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>1414</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">04</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">01</div>
                                      <div className="monthYear">
                                        Sep
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">02</div>
                                      <div className="monthYear">
                                        Sep
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>02692</td>
                                  <td> 123</td>
                                  <td> 8234167</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr Qtech Test</td>
                                  <td className="numAlign">25.83 </td>
                                  <td className="numAlign">98.80 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">3.825</td>
                                  <td className="numAlign">25.83 </td>
                                  <td className="numAlign">432594.20 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>1415</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">04</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">01</div>
                                      <div className="monthYear">
                                        Sep
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">02</div>
                                      <div className="monthYear">
                                        Sep
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>02693</td>
                                  <td> 123</td>
                                  <td> 8234169</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr fgsgf sadf</td>
                                  <td className="numAlign">70.73 </td>
                                  <td className="numAlign">270.54 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">3.825</td>
                                  <td className="numAlign">70.73 </td>
                                  <td className="numAlign">432664.93 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>1416</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">04</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">20</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">21</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>02694</td>
                                  <td> 80568</td>
                                  <td> 8234179</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr athulya ullas</td>
                                  <td className="numAlign">16.62 </td>
                                  <td className="numAlign">63.57 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">3.825</td>
                                  <td className="numAlign">16.62 </td>
                                  <td className="numAlign">432681.55 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>1417</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">05</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">01</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">02</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>02698</td>
                                  <td> 123</td>
                                  <td> 8234323</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr abc xyz</td>
                                  <td className="numAlign">25.83 </td>
                                  <td className="numAlign">98.80 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">3.825</td>
                                  <td className="numAlign">25.83 </td>
                                  <td className="numAlign">432707.38 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>1418</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">05</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">01</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">02</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>02701</td>
                                  <td> 1234</td>
                                  <td> 8234329</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr abc swewer</td>
                                  <td className="numAlign">25.83 </td>
                                  <td className="numAlign">98.80 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">3.825</td>
                                  <td className="numAlign">25.83 </td>
                                  <td className="numAlign">432733.21 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>1419</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">05</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">01</div>
                                      <div className="monthYear">
                                        Sep
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">02</div>
                                      <div className="monthYear">
                                        Sep
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>02702</td>
                                  <td> 123</td>
                                  <td> 8234342</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr abc xyz</td>
                                  <td className="numAlign">25.30 </td>
                                  <td className="numAlign">96.77 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">3.825</td>
                                  <td className="numAlign">25.30 </td>
                                  <td className="numAlign">432758.51 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>1420</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">05</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">22</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">23</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>02704</td>
                                  <td> 015</td>
                                  <td> 8234355</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr one two</td>
                                  <td className="numAlign">6.87 </td>
                                  <td className="numAlign">26.28 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">3.825</td>
                                  <td className="numAlign">6.87 </td>
                                  <td className="numAlign">432765.38 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>1421</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">05</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">16</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">17</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>02706</td>
                                  <td> 7865</td>
                                  <td> 8234376</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr Snehal Testing</td>
                                  <td className="numAlign">20.01 </td>
                                  <td className="numAlign">76.54 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">3.825</td>
                                  <td className="numAlign">20.01 </td>
                                  <td className="numAlign">432785.39 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>1422</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">05</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">01</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">02</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>02710</td>
                                  <td> 123</td>
                                  <td> 8234387</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr abc sadf</td>
                                  <td className="numAlign">20.01 </td>
                                  <td className="numAlign">76.54 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">3.825</td>
                                  <td className="numAlign">20.01 </td>
                                  <td className="numAlign">432805.40 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>1423</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">05</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">07</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">08</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>02711</td>
                                  <td> 123</td>
                                  <td> 8234389</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr abc xyz</td>
                                  <td className="numAlign">25.83 </td>
                                  <td className="numAlign">98.80 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">3.825</td>
                                  <td className="numAlign">25.83 </td>
                                  <td className="numAlign">432831.23 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>1424</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">06</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">15</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">16</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD802714</td>
                                  <td> 7865</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr Aone Atwo</td>
                                  <td className="numAlign">1000.00 </td>
                                  <td className="numAlign">60.06 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">0.0600576</td>
                                  <td className="numAlign">1000.00 </td>
                                  <td className="numAlign">433831.23 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>1425</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">06</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">15</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">16</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD802714</td>
                                  <td> 7865</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr Aone Atwo</td>
                                  <td className="numAlign">1000.00 </td>
                                  <td className="numAlign">60.06 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">0.0600576</td>
                                  <td className="numAlign">1000.00 </td>
                                  <td className="numAlign">434831.23 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>1426</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">08</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">20</div>
                                      <div className="monthYear">
                                        Apr
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td></td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD302715</td>
                                  <td> 2715</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> visa</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> aditi mantri</td>
                                  <td className="numAlign">50.00 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign" />
                                  <td className="numAlign">50.00 </td>
                                  <td className="numAlign">434881.23 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>1427</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">08</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">22</div>
                                      <div className="monthYear">
                                        Apr
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td></td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD301993</td>
                                  <td> 1993</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> visa</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Prachi sdfsdf</td>
                                  <td className="numAlign">100.00 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign" />
                                  <td className="numAlign">100.00 </td>
                                  <td className="numAlign">434981.23 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>1428</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">08</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">08</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td></td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD302716</td>
                                  <td> 2716</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> visa</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Snehal test</td>
                                  <td className="numAlign">100.00 </td>
                                  <td className="numAlign">105.19 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">1.051875</td>
                                  <td className="numAlign">100.00 </td>
                                  <td className="numAlign">435081.23 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>1429</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">08</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">06</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td></td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD1602717</td>
                                  <td> test12345</td>
                                  <td> 11111</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> sightseeing</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr samiksha qtech</td>
                                  <td className="numAlign">10.00 </td>
                                  <td className="numAlign">10.52 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">1.051875</td>
                                  <td className="numAlign">10.00 </td>
                                  <td className="numAlign">435091.23 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>1430</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">08</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">08</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td></td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD302719</td>
                                  <td> 2719</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> visa</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> S V</td>
                                  <td className="numAlign">100.00 </td>
                                  <td className="numAlign">360.55 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">3.6055368</td>
                                  <td className="numAlign">100.00 </td>
                                  <td className="numAlign">435191.23 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>1431</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">10</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">10</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td></td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD1002726</td>
                                  <td> 777</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> sightseeing</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr sss bbb</td>
                                  <td className="numAlign">100.00 </td>
                                  <td className="numAlign">6.01 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">0.0600576</td>
                                  <td className="numAlign">100.00 </td>
                                  <td className="numAlign">435291.23 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>1432</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">10</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">10</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">10</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD902733</td>
                                  <td> 2733</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> transfer</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> vvvzzz </td>
                                  <td className="numAlign">100.00 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign" />
                                  <td className="numAlign">100.00 </td>
                                  <td className="numAlign">435391.23 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>1433</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">10</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">10</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td></td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD1002734</td>
                                  <td> 2734</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> sightseeing</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr vvv zzz</td>
                                  <td className="numAlign">100.00 </td>
                                  <td className="numAlign">6.01 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">0.0600576</td>
                                  <td className="numAlign">100.00 </td>
                                  <td className="numAlign">435491.23 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>1434</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">10</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">10</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td></td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD1002737</td>
                                  <td> 2737</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> sightseeing</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr nnn aaa</td>
                                  <td className="numAlign">100.00 </td>
                                  <td className="numAlign">6.01 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">0.0600576</td>
                                  <td className="numAlign">100.00 </td>
                                  <td className="numAlign">435591.23 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>1435</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">11</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">22</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">23</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD802756</td>
                                  <td> 123</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr ABCD BCDE</td>
                                  <td className="numAlign">1250.00 </td>
                                  <td className="numAlign">75.07 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">0.0600576</td>
                                  <td className="numAlign">1250.00 </td>
                                  <td className="numAlign">436841.23 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>1436</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">11</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">22</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">23</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD802756</td>
                                  <td> 123</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr ABCD BCDE</td>
                                  <td className="numAlign">1250.00 </td>
                                  <td className="numAlign">75.07 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">0.0600576</td>
                                  <td className="numAlign">1250.00 </td>
                                  <td className="numAlign">438091.23 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>1437</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">12</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">28</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">29</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD802757</td>
                                  <td> 759</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr Test Snehal</td>
                                  <td className="numAlign">1000.00 </td>
                                  <td className="numAlign">60.06 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">0.0600576</td>
                                  <td className="numAlign">1000.00 </td>
                                  <td className="numAlign">439091.23 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>1438</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">12</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">28</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">29</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD802757</td>
                                  <td> 759</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr Test Snehal</td>
                                  <td className="numAlign">1000.00 </td>
                                  <td className="numAlign">60.06 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">0.0600576</td>
                                  <td className="numAlign">1000.00 </td>
                                  <td className="numAlign">440091.23 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>1439</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">12</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">29</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">30</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD802758</td>
                                  <td> 452</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr Test Two</td>
                                  <td className="numAlign">1000.00 </td>
                                  <td className="numAlign">60.06 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">0.0600576</td>
                                  <td className="numAlign">1000.00 </td>
                                  <td className="numAlign">441091.23 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>1440</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">12</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">29</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">30</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD802758</td>
                                  <td> 452</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr Test Two</td>
                                  <td className="numAlign">1000.00 </td>
                                  <td className="numAlign">60.06 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">0.0600576</td>
                                  <td className="numAlign">1000.00 </td>
                                  <td className="numAlign">442091.23 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>1441</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">12</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">05</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">06</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>02759</td>
                                  <td> 23129</td>
                                  <td> 8235349</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr jaimon james</td>
                                  <td className="numAlign">16.30 </td>
                                  <td className="numAlign">62.35 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">3.825</td>
                                  <td className="numAlign">16.30 </td>
                                  <td className="numAlign">442107.53 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>1442</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">12</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">29</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">30</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD802760</td>
                                  <td> 782</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr Test Three</td>
                                  <td className="numAlign">5000.00 </td>
                                  <td className="numAlign">300.29 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">0.0600576</td>
                                  <td className="numAlign">5000.00 </td>
                                  <td className="numAlign">447107.53 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>1443</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">12</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">29</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">30</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD802760</td>
                                  <td> 782</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr Test Three</td>
                                  <td className="numAlign">5000.00 </td>
                                  <td className="numAlign">300.29 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">0.0600576</td>
                                  <td className="numAlign">5000.00 </td>
                                  <td className="numAlign">452107.53 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>1444</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">13</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">19</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">20</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD802761</td>
                                  <td> 45</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr sxdg sxdhf</td>
                                  <td className="numAlign">1000.00 </td>
                                  <td className="numAlign">60.06 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">0.0600576</td>
                                  <td className="numAlign">1000.00 </td>
                                  <td className="numAlign">453107.53 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>1445</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">13</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">19</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">20</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD802761</td>
                                  <td> 45</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr sxdg sxdhf</td>
                                  <td className="numAlign">1000.00 </td>
                                  <td className="numAlign">60.06 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">0.0600576</td>
                                  <td className="numAlign">1000.00 </td>
                                  <td className="numAlign">454107.53 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>1446</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">14</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">18</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">20</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>02762</td>
                                  <td> 66921</td>
                                  <td> 8236327</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr renu kumar</td>
                                  <td className="numAlign">163.94 </td>
                                  <td className="numAlign">627.07 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">3.825</td>
                                  <td className="numAlign">163.94 </td>
                                  <td className="numAlign">454271.47 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>1447</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">14</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">18</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">20</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>02763</td>
                                  <td> 11193</td>
                                  <td> 8236330</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr ram singh</td>
                                  <td className="numAlign">163.94 </td>
                                  <td className="numAlign">627.07 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">3.825</td>
                                  <td className="numAlign">163.94 </td>
                                  <td className="numAlign">454435.41 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>1448</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">14</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">18</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">20</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>02764</td>
                                  <td> 80907</td>
                                  <td> 8236335</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr rakesh kumar</td>
                                  <td className="numAlign">163.94 </td>
                                  <td className="numAlign">627.07 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">3.825</td>
                                  <td className="numAlign">163.94 </td>
                                  <td className="numAlign">454599.35 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>1449</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">15</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">16</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">17</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD802772</td>
                                  <td> 2772</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr 777 111</td>
                                  <td className="numAlign">100.00 </td>
                                  <td className="numAlign">6.01 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">0.0600576</td>
                                  <td className="numAlign">100.00 </td>
                                  <td className="numAlign">454699.35 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>1450</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">15</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">16</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">17</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD802772</td>
                                  <td> 2772</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr 777 111</td>
                                  <td className="numAlign">100.00 </td>
                                  <td className="numAlign">6.01 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">0.0600576</td>
                                  <td className="numAlign">100.00 </td>
                                  <td className="numAlign">454799.35 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>1451</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">17</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">18</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">19</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD802809</td>
                                  <td> 2809</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr 555 111</td>
                                  <td className="numAlign">500.00 </td>
                                  <td className="numAlign">30.03 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">0.0600576</td>
                                  <td className="numAlign">500.00 </td>
                                  <td className="numAlign">455299.35 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>1452</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">17</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">18</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">19</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD802809</td>
                                  <td> 2809</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr 555 111</td>
                                  <td className="numAlign">500.00 </td>
                                  <td className="numAlign">30.03 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">0.0600576</td>
                                  <td className="numAlign">500.00 </td>
                                  <td className="numAlign">455799.35 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>1453</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">17</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">18</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">18</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD902810</td>
                                  <td> 2810</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> transfer</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> 555111 </td>
                                  <td className="numAlign">200.00 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign" />
                                  <td className="numAlign">200.00 </td>
                                  <td className="numAlign">455999.35 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>1454</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">17</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">18</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td></td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD1002811</td>
                                  <td> 2811</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> sightseeing</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr 555 111</td>
                                  <td className="numAlign">100.00 </td>
                                  <td className="numAlign">6.01 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">0.0600576</td>
                                  <td className="numAlign">100.00 </td>
                                  <td className="numAlign">456099.35 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>1455</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">17</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">18</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">19</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD802813</td>
                                  <td> 2813</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr fff aaa</td>
                                  <td className="numAlign">500.00 </td>
                                  <td className="numAlign">2650.00 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">5.3</td>
                                  <td className="numAlign">500.00 </td>
                                  <td className="numAlign">456599.35 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>1456</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">17</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">18</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">19</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD802813</td>
                                  <td> 2813</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr fff aaa</td>
                                  <td className="numAlign">500.00 </td>
                                  <td className="numAlign">2650.00 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">5.3</td>
                                  <td className="numAlign">500.00 </td>
                                  <td className="numAlign">457099.35 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>1457</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">17</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">18</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">18</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD902814</td>
                                  <td> 2814</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> transfer</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> fffaaa </td>
                                  <td className="numAlign">200.00 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign" />
                                  <td className="numAlign">200.00 </td>
                                  <td className="numAlign">457299.35 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>1458</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">17</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">18</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td></td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD1002815</td>
                                  <td> 2815</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> sightseeing</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr fff aaa</td>
                                  <td className="numAlign">100.00 </td>
                                  <td className="numAlign">6.01 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">0.0600576</td>
                                  <td className="numAlign">100.00 </td>
                                  <td className="numAlign">457399.35 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>1459</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">17</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">18</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">19</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD802813</td>
                                  <td> 2813</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Ammended</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr fff aaa</td>
                                  <td className="numAlign">200.00 </td>
                                  <td className="numAlign">1060.00 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">5.3</td>
                                  <td className="numAlign">200.00 </td>
                                  <td className="numAlign">457599.35 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>1460</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">17</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">18</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">19</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD802813</td>
                                  <td> 2813</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Ammended</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr fff aaa</td>
                                  <td className="numAlign">200.00 </td>
                                  <td className="numAlign">1060.00 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">5.3</td>
                                  <td className="numAlign">200.00 </td>
                                  <td className="numAlign">457799.35 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>1461</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">18</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">24</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">25</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>02825</td>
                                  <td> 123</td>
                                  <td> 8237040</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr abc xyz</td>
                                  <td className="numAlign">26.37 </td>
                                  <td className="numAlign">100.87 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">3.825</td>
                                  <td className="numAlign">26.37 </td>
                                  <td className="numAlign">457825.72 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>1462</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">18</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">11</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">12</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>02826</td>
                                  <td> Entefghdfhgh</td>
                                  <td> 8237084</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr halancia Qtech</td>
                                  <td className="numAlign">754.33 </td>
                                  <td className="numAlign">2885.31 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">3.825</td>
                                  <td className="numAlign">754.33 </td>
                                  <td className="numAlign">458580.05 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>1463</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">19</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">01</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">02</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>02827</td>
                                  <td> 40971</td>
                                  <td> 8237558</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr Thomas Thomas</td>
                                  <td className="numAlign">18.10 </td>
                                  <td className="numAlign">69.23 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">3.825</td>
                                  <td className="numAlign">18.10 </td>
                                  <td className="numAlign">458598.15 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>1464</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">19</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">25</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">26</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>02828</td>
                                  <td> 53791</td>
                                  <td> 8237560</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr jaimon james</td>
                                  <td className="numAlign">18.10 </td>
                                  <td className="numAlign">69.23 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">3.825</td>
                                  <td className="numAlign">18.10 </td>
                                  <td className="numAlign">458616.25 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>1465</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">19</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">04</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">05</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>02829</td>
                                  <td> 34741</td>
                                  <td> 8237564</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr Thomas Thomas</td>
                                  <td className="numAlign">18.46 </td>
                                  <td className="numAlign">70.61 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">3.825</td>
                                  <td className="numAlign">18.46 </td>
                                  <td className="numAlign">458634.71 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>1466</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">20</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">24</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">25</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>02830</td>
                                  <td> 16473</td>
                                  <td> 8237921</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr sandeep sandeep</td>
                                  <td className="numAlign">18.40 </td>
                                  <td className="numAlign">70.38 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">3.825</td>
                                  <td className="numAlign">18.40 </td>
                                  <td className="numAlign">458653.11 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>1467</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">20</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">01</div>
                                      <div className="monthYear">
                                        Aug
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">02</div>
                                      <div className="monthYear">
                                        Aug
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>02831</td>
                                  <td> 86037</td>
                                  <td> 8237925</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mrs suni suni</td>
                                  <td className="numAlign">23.84 </td>
                                  <td className="numAlign">91.19 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">3.825</td>
                                  <td className="numAlign">23.84 </td>
                                  <td className="numAlign">458676.95 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>1468</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">20</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">06</div>
                                      <div className="monthYear">
                                        Aug
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">07</div>
                                      <div className="monthYear">
                                        Aug
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>02832</td>
                                  <td> 67451</td>
                                  <td> 8237960</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr vimal kumar</td>
                                  <td className="numAlign">25.83 </td>
                                  <td className="numAlign">98.80 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">3.825</td>
                                  <td className="numAlign">25.83 </td>
                                  <td className="numAlign">458702.78 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>1469</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">20</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">03</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">04</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>02833</td>
                                  <td> 46585</td>
                                  <td> 8237983</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr boby boby</td>
                                  <td className="numAlign">18.10 </td>
                                  <td className="numAlign">69.23 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">3.825</td>
                                  <td className="numAlign">18.10 </td>
                                  <td className="numAlign">458720.88 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>1470</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">20</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">24</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">25</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>02834</td>
                                  <td> 69287</td>
                                  <td> 8237990</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr binu binu</td>
                                  <td className="numAlign">18.40 </td>
                                  <td className="numAlign">70.38 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">3.825</td>
                                  <td className="numAlign">18.40 </td>
                                  <td className="numAlign">458739.28 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>1471</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">28</div>
                                      <div className="monthYear">
                                        Jun
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">25</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">25</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD1602942</td>
                                  <td> 123</td>
                                  <td> 123</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> sightseeing</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr nnnn bbbb</td>
                                  <td className="numAlign">900.00 </td>
                                  <td className="numAlign">54.05 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">0.0600576</td>
                                  <td className="numAlign">900.00 </td>
                                  <td className="numAlign">459639.28 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>1472</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">08</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">23</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">24</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD802943</td>
                                  <td> 858</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr Snehal Test</td>
                                  <td className="numAlign">1000.00 </td>
                                  <td className="numAlign">60.06 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">0.0600576</td>
                                  <td className="numAlign">1000.00 </td>
                                  <td className="numAlign">460639.28 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>1473</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">08</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">23</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">24</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD802943</td>
                                  <td> 858</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr Snehal Test</td>
                                  <td className="numAlign">1000.00 </td>
                                  <td className="numAlign">60.06 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">0.0600576</td>
                                  <td className="numAlign">1000.00 </td>
                                  <td className="numAlign">461639.28 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>1474</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">08</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">17</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">18</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD802944</td>
                                  <td> 123</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr SnehalG Test</td>
                                  <td className="numAlign">1000.00 </td>
                                  <td className="numAlign">60.06 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">0.0600576</td>
                                  <td className="numAlign">1000.00 </td>
                                  <td className="numAlign">462639.28 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>1475</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">08</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">17</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">18</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD802944</td>
                                  <td> 123</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr SnehalG Test</td>
                                  <td className="numAlign">1000.00 </td>
                                  <td className="numAlign">60.06 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">0.0600576</td>
                                  <td className="numAlign">1000.00 </td>
                                  <td className="numAlign">463639.28 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>1476</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">08</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">15</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">16</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD802945</td>
                                  <td> 500</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr SnehalPG Test</td>
                                  <td className="numAlign">1000.00 </td>
                                  <td className="numAlign">60.06 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">0.0600576</td>
                                  <td className="numAlign">1000.00 </td>
                                  <td className="numAlign">464639.28 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>1477</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">08</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">15</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">16</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD802945</td>
                                  <td> 500</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr SnehalPG Test</td>
                                  <td className="numAlign">1000.00 </td>
                                  <td className="numAlign">60.06 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">0.0600576</td>
                                  <td className="numAlign">1000.00 </td>
                                  <td className="numAlign">465639.28 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>1478</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">10</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">26</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">27</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD802946</td>
                                  <td> v12323</td>
                                  <td> c3123</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Rohan Vartak</td>
                                  <td className="numAlign">500.00 </td>
                                  <td className="numAlign">1912.50 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">3.825</td>
                                  <td className="numAlign">500.00 </td>
                                  <td className="numAlign">466139.28 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>1479</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">10</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">26</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">27</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD802946</td>
                                  <td> v12323</td>
                                  <td> c3123</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Rohan Vartak</td>
                                  <td className="numAlign">500.00 </td>
                                  <td className="numAlign">1912.50 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">3.825</td>
                                  <td className="numAlign">500.00 </td>
                                  <td className="numAlign">466639.28 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>1480</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">10</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">25</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">26</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD802947</td>
                                  <td> 123</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr fgfg fgfg</td>
                                  <td className="numAlign">1000.00 </td>
                                  <td className="numAlign">60.06 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">0.0600576</td>
                                  <td className="numAlign">1000.00 </td>
                                  <td className="numAlign">467639.28 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>1481</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">10</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">25</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">26</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD802947</td>
                                  <td> 123</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr fgfg fgfg</td>
                                  <td className="numAlign">1000.00 </td>
                                  <td className="numAlign">60.06 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">0.0600576</td>
                                  <td className="numAlign">1000.00 </td>
                                  <td className="numAlign">468639.28 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>1482</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">12</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">19</div>
                                      <div className="monthYear">
                                        Oct
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">20</div>
                                      <div className="monthYear">
                                        Oct
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>02951</td>
                                  <td> 123</td>
                                  <td> 8244880</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr Reportt Caseeee</td>
                                  <td className="numAlign">21.14 </td>
                                  <td className="numAlign">80.86 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">3.825</td>
                                  <td className="numAlign">21.14 </td>
                                  <td className="numAlign">468660.42 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>1483</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">17</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">30</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">31</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD802952</td>
                                  <td> 333</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr ghgh ghgh</td>
                                  <td className="numAlign">1000.00 </td>
                                  <td className="numAlign">60.06 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">0.0600576</td>
                                  <td className="numAlign">1000.00 </td>
                                  <td className="numAlign">469660.42 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>1484</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">17</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">30</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">31</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD802952</td>
                                  <td> 333</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr ghgh ghgh</td>
                                  <td className="numAlign">1000.00 </td>
                                  <td className="numAlign">60.06 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">0.0600576</td>
                                  <td className="numAlign">1000.00 </td>
                                  <td className="numAlign">470660.42 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>1485</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">19</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">20</div>
                                      <div className="monthYear">
                                        Aug
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">21</div>
                                      <div className="monthYear">
                                        Aug
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD802953</td>
                                  <td> 47577</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr jaimon james</td>
                                  <td className="numAlign">1000.00 </td>
                                  <td className="numAlign">60.06 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">0.0600576</td>
                                  <td className="numAlign">1000.00 </td>
                                  <td className="numAlign">471660.42 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>1486</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">19</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">20</div>
                                      <div className="monthYear">
                                        Aug
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">21</div>
                                      <div className="monthYear">
                                        Aug
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD802953</td>
                                  <td> 47577</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr jaimon james</td>
                                  <td className="numAlign">1000.00 </td>
                                  <td className="numAlign">60.06 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">0.0600576</td>
                                  <td className="numAlign">1000.00 </td>
                                  <td className="numAlign">472660.42 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>1487</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">22</div>
                                      <div className="monthYear">
                                        Jul
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">28</div>
                                      <div className="monthYear">
                                        Sep
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">29</div>
                                      <div className="monthYear">
                                        Sep
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>02958</td>
                                  <td> 53977</td>
                                  <td> 8247502</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr ssss wwww</td>
                                  <td className="numAlign">176.06 </td>
                                  <td className="numAlign">673.43 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">3.825</td>
                                  <td className="numAlign">176.06 </td>
                                  <td className="numAlign">472836.48 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>1488</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">02</div>
                                      <div className="monthYear">
                                        Aug
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">21</div>
                                      <div className="monthYear">
                                        Sep
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">21</div>
                                      <div className="monthYear">
                                        Sep
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD1502968</td>
                                  <td> 123</td>
                                  <td> 636558</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> transfer</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr sdsdsd sdsds </td>
                                  <td className="numAlign">122.73 </td>
                                  <td className="numAlign">577.41 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">4.70475</td>
                                  <td className="numAlign">122.73 </td>
                                  <td className="numAlign">472959.21 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>1489</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">05</div>
                                      <div className="monthYear">
                                        Aug
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">01</div>
                                      <div className="monthYear">
                                        Dec
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">02</div>
                                      <div className="monthYear">
                                        Dec
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>02969</td>
                                  <td> 90573</td>
                                  <td> 8252782</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr aHMED Hassan</td>
                                  <td className="numAlign">80.70 </td>
                                  <td className="numAlign">308.68 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">3.825</td>
                                  <td className="numAlign">80.70 </td>
                                  <td className="numAlign">473039.91 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>1490</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">06</div>
                                      <div className="monthYear">
                                        Aug
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">21</div>
                                      <div className="monthYear">
                                        Sep
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">21</div>
                                      <div className="monthYear">
                                        Sep
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD902971</td>
                                  <td> 123</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> transfer</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr bvbvb vbvb </td>
                                  <td className="numAlign">500.00 </td>
                                  <td className="numAlign">30.03 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">0.0600576</td>
                                  <td className="numAlign">500.00 </td>
                                  <td className="numAlign">473539.91 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>1491</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">07</div>
                                      <div className="monthYear">
                                        Aug
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">21</div>
                                      <div className="monthYear">
                                        Sep
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">21</div>
                                      <div className="monthYear">
                                        Sep
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD902977</td>
                                  <td> 123</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> transfer</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr LocalTer Ter </td>
                                  <td className="numAlign">400.00 </td>
                                  <td className="numAlign">24.02 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">0.0600576</td>
                                  <td className="numAlign">400.00 </td>
                                  <td className="numAlign">473939.91 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>1492</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">08</div>
                                      <div className="monthYear">
                                        Aug
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">01</div>
                                      <div className="monthYear">
                                        Nov
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">01</div>
                                      <div className="monthYear">
                                        Nov
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD1502978</td>
                                  <td> 555</td>
                                  <td> 636564</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> transfer</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr Oneway AccToAcc </td>
                                  <td className="numAlign">106.71 </td>
                                  <td className="numAlign">502.04 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">4.70475</td>
                                  <td className="numAlign">106.71 </td>
                                  <td className="numAlign">474046.62 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>1493</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">08</div>
                                      <div className="monthYear">
                                        Aug
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">01</div>
                                      <div className="monthYear">
                                        Oct
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">02</div>
                                      <div className="monthYear">
                                        Oct
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>02979</td>
                                  <td> 123</td>
                                  <td> 8253724</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr NewSupplier Task</td>
                                  <td className="numAlign">31.60 </td>
                                  <td className="numAlign">120.87 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">3.825</td>
                                  <td className="numAlign">31.60 </td>
                                  <td className="numAlign">474078.22 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>1494</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">09</div>
                                      <div className="monthYear">
                                        Aug
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">19</div>
                                      <div className="monthYear">
                                        Oct
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">19</div>
                                      <div className="monthYear">
                                        Oct
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD1502984</td>
                                  <td> 123</td>
                                  <td> 636567</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> transfer</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr aaa ddd </td>
                                  <td className="numAlign">213.42 </td>
                                  <td className="numAlign">1004.09 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">4.70475</td>
                                  <td className="numAlign">213.42 </td>
                                  <td className="numAlign">474291.64 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>1495</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">09</div>
                                      <div className="monthYear">
                                        Aug
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">02</div>
                                      <div className="monthYear">
                                        Oct
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">02</div>
                                      <div className="monthYear">
                                        Oct
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD902985</td>
                                  <td> 123</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> transfer</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr aaa ffff </td>
                                  <td className="numAlign">100.00 </td>
                                  <td className="numAlign">1.60 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">0.016014</td>
                                  <td className="numAlign">100.00 </td>
                                  <td className="numAlign">474391.64 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>1496</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">09</div>
                                      <div className="monthYear">
                                        Aug
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">15</div>
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
                                        Oct
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD902996</td>
                                  <td> 0012333</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> transfer</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr test tester </td>
                                  <td className="numAlign">220.00 </td>
                                  <td className="numAlign">13.21 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">0.0600576</td>
                                  <td className="numAlign">220.00 </td>
                                  <td className="numAlign">474611.64 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>1497</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">09</div>
                                      <div className="monthYear">
                                        Aug
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">19</div>
                                      <div className="monthYear">
                                        Oct
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">19</div>
                                      <div className="monthYear">
                                        Oct
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD902997</td>
                                  <td> 123</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> transfer</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr acc acc </td>
                                  <td className="numAlign">100.00 </td>
                                  <td className="numAlign">1.60 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">0.016014</td>
                                  <td className="numAlign">100.00 </td>
                                  <td className="numAlign">474711.64 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>1498</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">10</div>
                                      <div className="monthYear">
                                        Aug
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">19</div>
                                      <div className="monthYear">
                                        Oct
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">19</div>
                                      <div className="monthYear">
                                        Oct
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD1502999</td>
                                  <td> 123</td>
                                  <td> 636569</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> transfer</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr aaa ddd </td>
                                  <td className="numAlign">106.71 </td>
                                  <td className="numAlign">502.04 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">4.70475</td>
                                  <td className="numAlign">106.71 </td>
                                  <td className="numAlign">474818.35 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>1499</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">10</div>
                                      <div className="monthYear">
                                        Aug
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">19</div>
                                      <div className="monthYear">
                                        Oct
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">19</div>
                                      <div className="monthYear">
                                        Oct
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD903000</td>
                                  <td> 123</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> transfer</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr vvv ssss </td>
                                  <td className="numAlign">100.00 </td>
                                  <td className="numAlign">6.01 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">0.0600576</td>
                                  <td className="numAlign">100.00 </td>
                                  <td className="numAlign">474918.35 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>1500</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">10</div>
                                      <div className="monthYear">
                                        Aug
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">05</div>
                                      <div className="monthYear">
                                        Oct
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">05</div>
                                      <div className="monthYear">
                                        Oct
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD903008</td>
                                  <td> 666</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> transfer</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr ss sshfh </td>
                                  <td className="numAlign">100.00 </td>
                                  <td className="numAlign">1.60 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">0.016014</td>
                                  <td className="numAlign">100.00 </td>
                                  <td className="numAlign">475018.35 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>1501</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">10</div>
                                      <div className="monthYear">
                                        Aug
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">06</div>
                                      <div className="monthYear">
                                        Sep
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">06</div>
                                      <div className="monthYear">
                                        Sep
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD1503014</td>
                                  <td> 777</td>
                                  <td> 636571</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> transfer</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr hhh fff </td>
                                  <td className="numAlign">106.71 </td>
                                  <td className="numAlign">502.04 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">4.70475</td>
                                  <td className="numAlign">106.71 </td>
                                  <td className="numAlign">475125.06 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>1502</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">10</div>
                                      <div className="monthYear">
                                        Aug
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">06</div>
                                      <div className="monthYear">
                                        Sep
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">06</div>
                                      <div className="monthYear">
                                        Sep
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD1503015</td>
                                  <td> 888</td>
                                  <td> 636572</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> transfer</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr RoundAcc Ter </td>
                                  <td className="numAlign">225.54 </td>
                                  <td className="numAlign">1061.11 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">4.70475</td>
                                  <td className="numAlign">225.54 </td>
                                  <td className="numAlign">475350.60 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>1503</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">12</div>
                                      <div className="monthYear">
                                        Aug
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">12</div>
                                      <div className="monthYear">
                                        Nov
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">12</div>
                                      <div className="monthYear">
                                        Nov
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD903018</td>
                                  <td> 00123456</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> transfer</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr Test Qtech </td>
                                  <td className="numAlign">350.00 </td>
                                  <td className="numAlign">21.02 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">0.0600576</td>
                                  <td className="numAlign">350.00 </td>
                                  <td className="numAlign">475700.60 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>1504</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">12</div>
                                      <div className="monthYear">
                                        Aug
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">10</div>
                                      <div className="monthYear">
                                        Sep
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">10</div>
                                      <div className="monthYear">
                                        Sep
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD903025</td>
                                  <td> 1232333</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> transfer</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr Test Qtech </td>
                                  <td className="numAlign">400.00 </td>
                                  <td className="numAlign">24.02 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">0.0600576</td>
                                  <td className="numAlign">400.00 </td>
                                  <td className="numAlign">476100.60 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>1505</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">12</div>
                                      <div className="monthYear">
                                        Aug
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">10</div>
                                      <div className="monthYear">
                                        Sep
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">10</div>
                                      <div className="monthYear">
                                        Sep
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD903026</td>
                                  <td> 321654</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> transfer</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr Test Qtech </td>
                                  <td className="numAlign">400.00 </td>
                                  <td className="numAlign">24.02 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">0.0600576</td>
                                  <td className="numAlign">400.00 </td>
                                  <td className="numAlign">476500.60 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>1506</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">12</div>
                                      <div className="monthYear">
                                        Aug
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">12</div>
                                      <div className="monthYear">
                                        Sep
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">12</div>
                                      <div className="monthYear">
                                        Sep
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD1503030</td>
                                  <td> TD1503030</td>
                                  <td> 1513200</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> transfer</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr Test Qtech </td>
                                  <td className="numAlign">137.76 </td>
                                  <td className="numAlign">648.13 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">4.70475</td>
                                  <td className="numAlign">137.76 </td>
                                  <td className="numAlign">476638.36 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>1507</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">12</div>
                                      <div className="monthYear">
                                        Aug
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">02</div>
                                      <div className="monthYear">
                                        Oct
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">02</div>
                                      <div className="monthYear">
                                        Oct
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD1503031</td>
                                  <td> TD1503031</td>
                                  <td> 1513205</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> transfer</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr test qtech </td>
                                  <td className="numAlign">112.25 </td>
                                  <td className="numAlign">528.11 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">4.70475</td>
                                  <td className="numAlign">112.25 </td>
                                  <td className="numAlign">476750.61 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>1508</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">13</div>
                                      <div className="monthYear">
                                        Aug
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">12</div>
                                      <div className="monthYear">
                                        Nov
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">12</div>
                                      <div className="monthYear">
                                        Nov
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD903034</td>
                                  <td> TD903034</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> transfer</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr test qtech </td>
                                  <td className="numAlign">500.00 </td>
                                  <td className="numAlign">30.03 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">0.0600576</td>
                                  <td className="numAlign">500.00 </td>
                                  <td className="numAlign">477250.61 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>1509</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">16</div>
                                      <div className="monthYear">
                                        Aug
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">15</div>
                                      <div className="monthYear">
                                        Nov
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">16</div>
                                      <div className="monthYear">
                                        Nov
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD203052</td>
                                  <td> 1235</td>
                                  <td> 148-1513826</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr vaibhav test</td>
                                  <td className="numAlign">30.90 </td>
                                  <td className="numAlign">118.19 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">3.825</td>
                                  <td className="numAlign">30.90 </td>
                                  <td className="numAlign">477281.51 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>1510</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">16</div>
                                      <div className="monthYear">
                                        Aug
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">13</div>
                                      <div className="monthYear">
                                        Dec
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">14</div>
                                      <div className="monthYear">
                                        Dec
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD203053</td>
                                  <td> 5654</td>
                                  <td> 148-1513832</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr vaibhav Test</td>
                                  <td className="numAlign">32.01 </td>
                                  <td className="numAlign">122.44 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">3.825</td>
                                  <td className="numAlign">32.01 </td>
                                  <td className="numAlign">477313.52 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>1511</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">16</div>
                                      <div className="monthYear">
                                        Aug
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">31</div>
                                      <div className="monthYear">
                                        Jan
                                        <br />
                                        2020
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">01</div>
                                      <div className="monthYear">
                                        Feb
                                        <br />
                                        2020
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD203054</td>
                                  <td> 8989</td>
                                  <td> 148-1513837</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr vaibhav test</td>
                                  <td className="numAlign">491.61 </td>
                                  <td className="numAlign">1880.41 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">3.825</td>
                                  <td className="numAlign">491.61 </td>
                                  <td className="numAlign">477805.13 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>1512</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">17</div>
                                      <div className="monthYear">
                                        Aug
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">30</div>
                                      <div className="monthYear">
                                        Nov
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">01</div>
                                      <div className="monthYear">
                                        Dec
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD203057</td>
                                  <td> 1234</td>
                                  <td> 148-1513853</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr vaibhav test</td>
                                  <td className="numAlign">31.26 </td>
                                  <td className="numAlign">119.57 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">3.825</td>
                                  <td className="numAlign">31.26 </td>
                                  <td className="numAlign">477836.39 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>1513</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">17</div>
                                      <div className="monthYear">
                                        Aug
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">30</div>
                                      <div className="monthYear">
                                        Nov
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">01</div>
                                      <div className="monthYear">
                                        Dec
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD203058</td>
                                  <td> 5656</td>
                                  <td> 148-1513854</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr vaibhav Test</td>
                                  <td className="numAlign">264.89 </td>
                                  <td className="numAlign">1013.20 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">3.825</td>
                                  <td className="numAlign">264.89 </td>
                                  <td className="numAlign">478101.28 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>1514</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">17</div>
                                      <div className="monthYear">
                                        Aug
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">30</div>
                                      <div className="monthYear">
                                        Nov
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">01</div>
                                      <div className="monthYear">
                                        Dec
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD203059</td>
                                  <td> 3434</td>
                                  <td> 148-1513855</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr vaibhav Test</td>
                                  <td className="numAlign">182.21 </td>
                                  <td className="numAlign">696.95 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">3.825</td>
                                  <td className="numAlign">182.21 </td>
                                  <td className="numAlign">478283.49 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>1515</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">17</div>
                                      <div className="monthYear">
                                        Aug
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">01</div>
                                      <div className="monthYear">
                                        Dec
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">02</div>
                                      <div className="monthYear">
                                        Dec
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD203060</td>
                                  <td> 1234</td>
                                  <td> 1234</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> vaibhav test</td>
                                  <td className="numAlign">15.00 </td>
                                  <td className="numAlign">57.38 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">3.825</td>
                                  <td className="numAlign">15.00 </td>
                                  <td className="numAlign">478298.49 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>1516</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">17</div>
                                      <div className="monthYear">
                                        Aug
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">01</div>
                                      <div className="monthYear">
                                        Sep
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">01</div>
                                      <div className="monthYear">
                                        Sep
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD1503062</td>
                                  <td> 777</td>
                                  <td> 636590</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> transfer</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr Rounnd AccToAcc </td>
                                  <td className="numAlign">213.42 </td>
                                  <td className="numAlign">1004.09 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">4.70475</td>
                                  <td className="numAlign">213.42 </td>
                                  <td className="numAlign">478511.91 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>1517</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">17</div>
                                      <div className="monthYear">
                                        Aug
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">01</div>
                                      <div className="monthYear">
                                        Sep
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">01</div>
                                      <div className="monthYear">
                                        Sep
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD1503063</td>
                                  <td> 888</td>
                                  <td> 636591</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> transfer</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr fgfg ssd </td>
                                  <td className="numAlign">213.42 </td>
                                  <td className="numAlign">1004.09 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">4.70475</td>
                                  <td className="numAlign">213.42 </td>
                                  <td className="numAlign">478725.33 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>1518</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">17</div>
                                      <div className="monthYear">
                                        Aug
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">01</div>
                                      <div className="monthYear">
                                        Sep
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">01</div>
                                      <div className="monthYear">
                                        Sep
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD1503064</td>
                                  <td> 890</td>
                                  <td> 636592</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> transfer</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr hghgh dfdfdf </td>
                                  <td className="numAlign">213.42 </td>
                                  <td className="numAlign">1004.09 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">4.70475</td>
                                  <td className="numAlign">213.42 </td>
                                  <td className="numAlign">478938.75 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>1519</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">17</div>
                                      <div className="monthYear">
                                        Aug
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">26</div>
                                      <div className="monthYear">
                                        Oct
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">27</div>
                                      <div className="monthYear">
                                        Oct
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD203065</td>
                                  <td> 2154</td>
                                  <td> 148-1513871</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr vaibhav test</td>
                                  <td className="numAlign">73.14 </td>
                                  <td className="numAlign">279.76 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">3.825</td>
                                  <td className="numAlign">73.14 </td>
                                  <td className="numAlign">479011.89 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>1520</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">17</div>
                                      <div className="monthYear">
                                        Aug
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">01</div>
                                      <div className="monthYear">
                                        Nov
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">01</div>
                                      <div className="monthYear">
                                        Nov
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD903066</td>
                                  <td> desaffsa</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> transfer</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr rtrtr rtrtt </td>
                                  <td className="numAlign">500.00 </td>
                                  <td className="numAlign">30.03 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">0.0600576</td>
                                  <td className="numAlign">500.00 </td>
                                  <td className="numAlign">479511.89 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>1521</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">17</div>
                                      <div className="monthYear">
                                        Aug
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">03</div>
                                      <div className="monthYear">
                                        Oct
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">03</div>
                                      <div className="monthYear">
                                        Oct
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD1503071</td>
                                  <td> 86878</td>
                                  <td> 1513877</td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> transfer</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr test qtech </td>
                                  <td className="numAlign">88.44 </td>
                                  <td className="numAlign">416.09 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">4.70475</td>
                                  <td className="numAlign">88.44 </td>
                                  <td className="numAlign">479600.33 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>1522</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">17</div>
                                      <div className="monthYear">
                                        Aug
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">01</div>
                                      <div className="monthYear">
                                        Oct
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">01</div>
                                      <div className="monthYear">
                                        Oct
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD903076</td>
                                  <td> 3434</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> transfer</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr vaibhav test </td>
                                  <td className="numAlign">4000.00 </td>
                                  <td className="numAlign">4000.00 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">1.00000</td>
                                  <td className="numAlign">4000.00 </td>
                                  <td className="numAlign">483600.33 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>1523</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">17</div>
                                      <div className="monthYear">
                                        Aug
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">01</div>
                                      <div className="monthYear">
                                        Oct
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">01</div>
                                      <div className="monthYear">
                                        Oct
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD903080</td>
                                  <td> 5858</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> transfer</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr vaibhav test </td>
                                  <td className="numAlign">4000.00 </td>
                                  <td className="numAlign">4000.00 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">1.00000</td>
                                  <td className="numAlign">4000.00 </td>
                                  <td className="numAlign">487600.33 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>1524</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">17</div>
                                      <div className="monthYear">
                                        Aug
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">01</div>
                                      <div className="monthYear">
                                        Oct
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">01</div>
                                      <div className="monthYear">
                                        Oct
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD903081</td>
                                  <td> 3434</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> transfer</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr vaibhav test </td>
                                  <td className="numAlign">4000.00 </td>
                                  <td className="numAlign">4000.00 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">1.00000</td>
                                  <td className="numAlign">4000.00 </td>
                                  <td className="numAlign">491600.33 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>1525</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">19</div>
                                      <div className="monthYear">
                                        Aug
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">11</div>
                                      <div className="monthYear">
                                        Sep
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">11</div>
                                      <div className="monthYear">
                                        Sep
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD903082</td>
                                  <td> 123</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> transfer</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr First Passanger </td>
                                  <td className="numAlign">300.00 </td>
                                  <td className="numAlign">18.02 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">0.0600576</td>
                                  <td className="numAlign">300.00 </td>
                                  <td className="numAlign">491900.33 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>1526</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">19</div>
                                      <div className="monthYear">
                                        Aug
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">02</div>
                                      <div className="monthYear">
                                        Oct
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">02</div>
                                      <div className="monthYear">
                                        Oct
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD903083</td>
                                  <td> 23234</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> transfer</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr Test Qtechsoftware </td>
                                  <td className="numAlign">500.00 </td>
                                  <td className="numAlign">30.03 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">0.0600576</td>
                                  <td className="numAlign">500.00 </td>
                                  <td className="numAlign">492400.33 </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td>1527</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">19</div>
                                      <div className="monthYear">
                                        Aug
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">01</div>
                                      <div className="monthYear">
                                        Jan
                                        <br />
                                        2020
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">01</div>
                                      <div className="monthYear">
                                        Jan
                                        <br />
                                        2020
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD903087</td>
                                  <td> 2323</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> transfer</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr vaibhav test </td>
                                  <td className="numAlign">3000.00 </td>
                                  <td className="numAlign">3000.00 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">1.00000</td>
                                  <td className="numAlign">3000.00 </td>
                                  <td className="numAlign">495400.33 </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td>11878</td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">13</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">28</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="dateWrapper">
                                      <div className="onlyDate">29</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2021
                                      </div>
                                    </div>
                                  </td>
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td>TD828537</td>
                                  <td> 234324</td>
                                  <td> </td>
                                  {/* <td>  </td> */}
                                  <td> Sale</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> hotel</td>
                                  {/*  code modified by Anand on 20 Dec 2012  */}
                                  <td> Mr samiksha Qtech</td>
                                  <td className="numAlign">100.00 </td>
                                  <td className="numAlign">5.89 </td>
                                  <td className="numAlign">0.00 </td>
                                  <td className="numAlign">0.05888</td>
                                  <td className="numAlign">100.00 </td>
                                  <td className="numAlign">3090963.52 </td>
                                </tr>
                              </tbody>
                              <tbody className="bg-white">
                                <tr className="row_header bg-grey">
                                  <td />
                                  <td />
                                  {/* MER-665 - Added column for the online supplier statement - swapnil nagaonkar - 12 March 2015 */}
                                  <td />
                                  <td> </td>
                                  <td> </td>
                                  <td> </td>
                                  <td> </td>
                                  <td> </td>
                                  <td> </td>
                                  <td> </td>
                                  <td
                                    className="numAlign"
                                    style={{ color: "#fff!important" }}
                                  >
                                    3196710.58
                                  </td>
                                  <td
                                    className="numAlign"
                                    style={{ color: "#fff!important" }}
                                  >
                                    2444481.73
                                  </td>
                                  <td
                                    className="numAlign"
                                    style={{ color: "#fff!important" }}
                                  >
                                    0.00{" "}
                                  </td>
                                  <td> </td>
                                  <td
                                    className="numAlign"
                                    style={{ color: "#fff!important" }}
                                  >
                                    3196710.58
                                  </td>
                                  <td> </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
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
export default ReportsAccountsSupplierStatementOnlineSupplier;
