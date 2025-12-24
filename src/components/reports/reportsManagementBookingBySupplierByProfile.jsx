import Flatpickr from "react-flatpickr";
import React, { useState } from "react";
import Header2 from "../header2/header2";
import MultiSelect from "../reactMultiSelect";
import {
  markupProfileOptions,
  suppliersPreset,
} from "../../constants/contants";

const ReportsManagementBookingBySupplierByProfile = () => {
  const [startDate, setStartDate] = useState(null); // State for the start date
  const [endDate, setEndDate] = useState(null); // State for the end date

  const handleTrashClick = () => {
    // Function to clear both start and end dates
    setStartDate(null);
    setEndDate(null);
  };

  const [isFormVisible, setFormVisibility] = useState(false);

  const toggleFormVisibility = () => {
    setFormVisibility(!isFormVisible);
  };

  return (
    <>
      <Header2 title="SUPPLIER PROFILE" />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <div>
          <form>
            <div className="panel-body">
              <div className="row">
                <div className="form-group col-md-3">
                  <label>Suppliers</label>
                  <MultiSelect
                    options={suppliersPreset}
                    isSearchable
                    placeholder="- All -"
                    className="custom-select required"
                    noOptionsMessage={() => "No Suppliers Found"}
                  />
                </div>
                <div className="form-group col-md-3">
                  <label>Supplier Profile</label>
                  <MultiSelect
                    options={markupProfileOptions}
                    isSearchable
                    placeholder="- All -"
                    className="custom-select required"
                    noOptionsMessage={() => "No Profile Found"}
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
                        onClick={handleTrashClick}
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
                <div className="row mt-2">
                  <div className="col-md-5">
                    <a
                      title="Click to download XL sheet"
                      href="/tms/new_report.php?report=supplier_profile&a=&run=1&sel_suppliers=dhisco_rotana&sel_supplierProfile=57&txt_booking_id=&booking_from_date=&booking_to_date=&sel_max_results=&download=1"
                      className="btn btn-dark btn-sm form-group topBtn"
                    >
                      <i className="fa fa-download" />
                      &nbsp;&nbsp;Download Excel
                    </a>
                    &nbsp;&nbsp;
                    <a
                      title="Click to print XL sheet"
                      href="/tms/new_report.php?report=supplier_profile&a=&run=1&sel_suppliers=dhisco_rotana&sel_supplierProfile=57&txt_booking_id=&booking_from_date=&booking_to_date=&sel_max_results=&print=1"
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
                  <div className="dataTables_scroll">
                    <div
                      id="search_transfer_wrapper"
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
                              id="search_transfer"
                              className="table table-bordered   table-responsive alignTbl dataTable no-footer"
                              role="grid"
                              aria-describedby="search_transfer_info"
                            >
                              <thead>
                                <tr role="row">
                                  <th
                                    align="center"
                                    className="bold padd_5 brdr sorting"
                                    tabIndex={0}
                                    aria-controls="search_transfer"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="Date
                  
                    
                    
                  
                    
                  
                    
                    : activate to sort column ascending"
                                    style={{ width: "51.2px" }}
                                  >
                                    Date
                                    <a href="new_report.php?sort_by=create_date&direction=up&report=supplier_profile&a=&run=1&sel_suppliers=dhisco_rotana&sel_supplierProfile=57&txt_booking_id=&booking_from_date=&booking_to_date=&sel_max_results=">
                                      <img
                                        src="images/up_arrow.gif"
                                        alt=""
                                        border={0}
                                        height={5}
                                        width={9}
                                      />
                                    </a>
                                    <a href="new_report.php?sort_by=create_date&direction=down&report=supplier_profile&a=&run=1&sel_suppliers=dhisco_rotana&sel_supplierProfile=57&txt_booking_id=&booking_from_date=&booking_to_date=&sel_max_results=">
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
                                    align="center"
                                    className="bold padd_5 brdr sorting"
                                    tabIndex={0}
                                    aria-controls="search_transfer"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="Booking Id
                  
                    
                    
                  
                    
                  
                    
                    : activate to sort column ascending"
                                    style={{ width: "88.2px" }}
                                  >
                                    Booking Id
                                    <a href="new_report.php?sort_by=id&direction=up&report=supplier_profile&a=&run=1&sel_suppliers=dhisco_rotana&sel_supplierProfile=57&txt_booking_id=&booking_from_date=&booking_to_date=&sel_max_results=">
                                      <img
                                        src="images/up_arrow.gif"
                                        alt=""
                                        border={0}
                                        height={5}
                                        width={9}
                                      />
                                    </a>
                                    <a href="new_report.php?sort_by=id&direction=down&report=supplier_profile&a=&run=1&sel_suppliers=dhisco_rotana&sel_supplierProfile=57&txt_booking_id=&booking_from_date=&booking_to_date=&sel_max_results=">
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
                                    align="center"
                                    className="bold padd_5 brdr   no-sort sorting_disabled"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="Booking status
                  
                    
                    "
                                    style={{ width: "122.2px" }}
                                  >
                                    Booking status
                                  </th>
                                  <th
                                    align="center"
                                    className="bold padd_5 brdr   no-sort sorting_disabled"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="Voucher Id.
                  
                    
                    "
                                    style={{ width: "175.2px" }}
                                  >
                                    Voucher Id.
                                  </th>
                                  <th
                                    align="center"
                                    className="bold padd_5 brdr   no-sort sorting_disabled"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="Type
                  
                    
                    "
                                    style={{ width: "54.2px" }}
                                  >
                                    Type
                                  </th>
                                  <th
                                    align="center"
                                    className="bold padd_5 brdr   no-sort sorting_disabled"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="Service Type
                  
                    
                    "
                                    style={{ width: "101.2px" }}
                                  >
                                    Service Type
                                  </th>
                                  <th
                                    align="center"
                                    className="bold padd_5 brdr sorting"
                                    tabIndex={0}
                                    aria-controls="search_transfer"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="Pax Name
                  
                    
                    
                  
                    
                  
                    
                    : activate to sort column ascending"
                                    style={{ width: "184.2px" }}
                                  >
                                    Pax Name
                                    <a href="new_report.php?sort_by=lead_name&direction=up&report=supplier_profile&a=&run=1&sel_suppliers=dhisco_rotana&sel_supplierProfile=57&txt_booking_id=&booking_from_date=&booking_to_date=&sel_max_results=">
                                      <img
                                        src="images/up_arrow.gif"
                                        alt=""
                                        border={0}
                                        height={5}
                                        width={9}
                                      />
                                    </a>
                                    <a href="new_report.php?sort_by=lead_name&direction=down&report=supplier_profile&a=&run=1&sel_suppliers=dhisco_rotana&sel_supplierProfile=57&txt_booking_id=&booking_from_date=&booking_to_date=&sel_max_results=">
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
                                    align="center"
                                    className="bold padd_5 brdr  numAlign sorting"
                                    tabIndex={0}
                                    aria-controls="search_transfer"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="Agent Charge
                  
                    
                    
                  
                    
                  
                    
                    : activate to sort column ascending"
                                    style={{ width: "114.2px" }}
                                  >
                                    Agent Charge
                                    <a href="new_report.php?sort_by=agent_rate&direction=up&report=supplier_profile&a=&run=1&sel_suppliers=dhisco_rotana&sel_supplierProfile=57&txt_booking_id=&booking_from_date=&booking_to_date=&sel_max_results=">
                                      <img
                                        src="images/up_arrow.gif"
                                        alt=""
                                        border={0}
                                        height={5}
                                        width={9}
                                      />
                                    </a>
                                    <a href="new_report.php?sort_by=agent_rate&direction=down&report=supplier_profile&a=&run=1&sel_suppliers=dhisco_rotana&sel_supplierProfile=57&txt_booking_id=&booking_from_date=&booking_to_date=&sel_max_results=">
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
                                    align="center"
                                    className="bold padd_5 brdr   no-sort sorting_disabled"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="Agent Currency
                  
                    
                    "
                                    style={{ width: "128.2px" }}
                                  >
                                    Agent Currency
                                  </th>
                                  <th
                                    align="center"
                                    className="bold padd_5 brdr  numAlign sorting"
                                    tabIndex={0}
                                    aria-controls="search_transfer"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="Supplier Charge
                  
                    
                    
                  
                    
                  
                  
                  
                    
                    : activate to sort column ascending"
                                    style={{ width: "135.2px" }}
                                  >
                                    Supplier Charge
                                    <a href="new_report.php?sort_by=supplier_rate&direction=up&report=supplier_profile&a=&run=1&sel_suppliers=dhisco_rotana&sel_supplierProfile=57&txt_booking_id=&booking_from_date=&booking_to_date=&sel_max_results=">
                                      <img
                                        src="images/up_arrow.gif"
                                        alt=""
                                        border={0}
                                        height={5}
                                        width={9}
                                      />
                                    </a>
                                    <a href="new_report.php?sort_by=supplier_rate&direction=down&report=supplier_profile&a=&run=1&sel_suppliers=dhisco_rotana&sel_supplierProfile=57&txt_booking_id=&booking_from_date=&booking_to_date=&sel_max_results=">
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
                                    align="center"
                                    className="bold padd_5 brdr   no-sort sorting_disabled"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="Supplier Currency
                  
                    
                    "
                                    style={{ width: "149px" }}
                                  >
                                    Supplier Currency
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white">
                                <tr className="phps_row_1 odd" role="row">
                                  <td align="center" className="brdr">
                                    <div className="dateWrapper">
                                      <div className="onlyDate">26</div>
                                      <div className="monthYear">
                                        Apr
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td align="center" className="brdr">
                                    TD1802071
                                  </td>
                                  <td align="center" className="brdr">
                                    <h5>
                                      <span className="tdd_label label-warning">
                                        vouchered
                                      </span>
                                    </h5>
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;111
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Sale
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;hotel
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Mr aaa ddd
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    10698.78&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    INR&nbsp;
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    128.00&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    EUR&nbsp;
                                  </td>
                                </tr>
                                <tr className="phps_row_0 even" role="row">
                                  <td align="center" className="brdr">
                                    <div className="dateWrapper">
                                      <div className="onlyDate">26</div>
                                      <div className="monthYear">
                                        Apr
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td align="center" className="brdr">
                                    TD1802073
                                  </td>
                                  <td align="center" className="brdr">
                                    <h5>
                                      <span className="tdd_label label-warning">
                                        vouchered
                                      </span>
                                    </h5>
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;666
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Sale
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;hotel
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Mr qqq rrr
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    11367.46&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    INR&nbsp;
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    136.00&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    EUR&nbsp;
                                  </td>
                                </tr>
                                <tr className="phps_row_1 odd" role="row">
                                  <td align="center" className="brdr">
                                    <div className="dateWrapper">
                                      <div className="onlyDate">29</div>
                                      <div className="monthYear">
                                        Apr
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td align="center" className="brdr">
                                    TD1802083
                                  </td>
                                  <td align="center" className="brdr">
                                    <h5>
                                      <span className="tdd_label label-warning">
                                        vouchered
                                      </span>
                                    </h5>
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;123
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Sale
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;hotel
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Mr bbb sss
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    14536.62&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    INR&nbsp;
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    136.00&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    EUR&nbsp;
                                  </td>
                                </tr>
                                <tr className="phps_row_0 even" role="row">
                                  <td align="center" className="brdr">
                                    <div className="dateWrapper">
                                      <div className="onlyDate">30</div>
                                      <div className="monthYear">
                                        Apr
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td align="center" className="brdr">
                                    TD1802095
                                  </td>
                                  <td align="center" className="brdr">
                                    <h5>
                                      <span className="tdd_label label-warning">
                                        vouchered
                                      </span>
                                    </h5>
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;222
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Sale
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;hotel
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Mr fff sss
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    10030.11&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    INR&nbsp;
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    120.00&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    EUR&nbsp;
                                  </td>
                                </tr>
                                <tr className="phps_row_1 odd" role="row">
                                  <td align="center" className="brdr">
                                    <div className="dateWrapper">
                                      <div className="onlyDate">30</div>
                                      <div className="monthYear">
                                        Apr
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td align="center" className="brdr">
                                    TD1802100
                                  </td>
                                  <td align="center" className="brdr">
                                    <h5>
                                      <span className="tdd_label label-warning">
                                        vouchered
                                      </span>
                                    </h5>
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;444
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Sale
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;hotel
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Mr sss ggg
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    11367.46&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    INR&nbsp;
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    136.00&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    EUR&nbsp;
                                  </td>
                                </tr>
                                <tr className="phps_row_0 even" role="row">
                                  <td align="center" className="brdr">
                                    <div className="dateWrapper">
                                      <div className="onlyDate">08</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td align="center" className="brdr">
                                    TD1802189
                                  </td>
                                  <td align="center" className="brdr">
                                    <h5>
                                      <span className="tdd_label label-warning">
                                        vouchered
                                      </span>
                                    </h5>
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;123
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Sale
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;hotel
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Mr abc xyz
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    12838.54&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    INR&nbsp;
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    128.00&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    EUR&nbsp;
                                  </td>
                                </tr>
                                <tr className="phps_row_1 odd" role="row">
                                  <td align="center" className="brdr">
                                    <div className="dateWrapper">
                                      <div className="onlyDate">09</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td align="center" className="brdr">
                                    TD1802190
                                  </td>
                                  <td align="center" className="brdr">
                                    <h5>
                                      <span className="tdd_label label-warning">
                                        vouchered
                                      </span>
                                    </h5>
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;123
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Sale
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;hotel
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Mr abc xyx
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    12036.13&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    INR&nbsp;
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    120.00&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    EUR&nbsp;
                                  </td>
                                </tr>
                                <tr className="phps_row_0 even" role="row">
                                  <td align="center" className="brdr">
                                    <div className="dateWrapper">
                                      <div className="onlyDate">13</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td align="center" className="brdr">
                                    TD1802234
                                  </td>
                                  <td align="center" className="brdr">
                                    <h5>
                                      <span className="tdd_label label-warning">
                                        vouchered
                                      </span>
                                    </h5>
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;sss
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Sale
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;hotel
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Mr vcgh cvcv
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    12036.13&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    INR&nbsp;
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    120.00&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    EUR&nbsp;
                                  </td>
                                </tr>
                                <tr className="phps_row_1 odd" role="row">
                                  <td align="center" className="brdr">
                                    <div className="dateWrapper">
                                      <div className="onlyDate">13</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td align="center" className="brdr">
                                    TD1802236
                                  </td>
                                  <td align="center" className="brdr">
                                    <h5>
                                      <span className="tdd_label label-warning">
                                        vouchered
                                      </span>
                                    </h5>
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;123
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Sale
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;hotel
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Mr fff sss
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    12838.54&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    INR&nbsp;
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    128.00&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    EUR&nbsp;
                                  </td>
                                </tr>
                                <tr className="phps_row_0 even" role="row">
                                  <td align="center" className="brdr">
                                    <div className="dateWrapper">
                                      <div className="onlyDate">13</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td align="center" className="brdr">
                                    TD1802241
                                  </td>
                                  <td align="center" className="brdr">
                                    <h5>
                                      <span className="tdd_label label-warning">
                                        vouchered
                                      </span>
                                    </h5>
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;123
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Sale
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;hotel
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Mr qqq ggg
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    12838.54&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    INR&nbsp;
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    128.00&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    EUR&nbsp;
                                  </td>
                                </tr>
                                <tr className="phps_row_1 odd" role="row">
                                  <td align="center" className="brdr">
                                    <div className="dateWrapper">
                                      <div className="onlyDate">13</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td align="center" className="brdr">
                                    TD1802244
                                  </td>
                                  <td align="center" className="brdr">
                                    <h5>
                                      <span className="tdd_label label-warning">
                                        vouchered
                                      </span>
                                    </h5>
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;555
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Sale
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;hotel
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Mr ddd sss
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    13640.95&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    INR&nbsp;
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    136.00&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    EUR&nbsp;
                                  </td>
                                </tr>
                                <tr className="phps_row_0 even" role="row">
                                  <td align="center" className="brdr">
                                    <div className="dateWrapper">
                                      <div className="onlyDate">13</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td align="center" className="brdr">
                                    TD1802247
                                  </td>
                                  <td align="center" className="brdr">
                                    <h5>
                                      <span className="tdd_label label-warning">
                                        vouchered
                                      </span>
                                    </h5>
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;123
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Sale
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;hotel
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Mr fgfg ffdf
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    13640.95&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    INR&nbsp;
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    136.00&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    EUR&nbsp;
                                  </td>
                                </tr>
                                <tr className="phps_row_1 odd" role="row">
                                  <td align="center" className="brdr">
                                    <div className="dateWrapper">
                                      <div className="onlyDate">13</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td align="center" className="brdr">
                                    TD1802248
                                  </td>
                                  <td align="center" className="brdr">
                                    <h5>
                                      <span className="tdd_label label-warning">
                                        vouchered
                                      </span>
                                    </h5>
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;555
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Sale
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;hotel
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Mr dff ghgh
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    13640.95&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    INR&nbsp;
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    136.00&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    EUR&nbsp;
                                  </td>
                                </tr>
                                <tr className="phps_row_0 even" role="row">
                                  <td align="center" className="brdr">
                                    <div className="dateWrapper">
                                      <div className="onlyDate">13</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td align="center" className="brdr">
                                    TD1802252
                                  </td>
                                  <td align="center" className="brdr">
                                    <h5>
                                      <span className="tdd_label label-warning">
                                        vouchered
                                      </span>
                                    </h5>
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;666
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Sale
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;hotel
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Mr ggg ssss
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    13640.95&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    INR&nbsp;
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    136.00&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    EUR&nbsp;
                                  </td>
                                </tr>
                                <tr className="phps_row_1 odd" role="row">
                                  <td align="center" className="brdr">
                                    <div className="dateWrapper">
                                      <div className="onlyDate">13</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td align="center" className="brdr">
                                    TD1802257
                                  </td>
                                  <td align="center" className="brdr">
                                    <h5>
                                      <span className="tdd_label label-warning">
                                        vouchered
                                      </span>
                                    </h5>
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;555
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Sale
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;hotel
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Mr bbb ddd
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    12036.13&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    INR&nbsp;
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    120.00&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    EUR&nbsp;
                                  </td>
                                </tr>
                                <tr className="phps_row_0 even" role="row">
                                  <td align="center" className="brdr">
                                    <div className="dateWrapper">
                                      <div className="onlyDate">14</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td align="center" className="brdr">
                                    TD1802273
                                  </td>
                                  <td align="center" className="brdr">
                                    <h5>
                                      <span className="tdd_label label-warning">
                                        vouchered
                                      </span>
                                    </h5>
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;123
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Sale
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;hotel
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Mr abc xyz
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    183.60&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    USD&nbsp;
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    120.00&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    EUR&nbsp;
                                  </td>
                                </tr>
                                <tr className="phps_row_1 odd" role="row">
                                  <td align="center" className="brdr">
                                    <div className="dateWrapper">
                                      <div className="onlyDate">14</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td align="center" className="brdr">
                                    TD1802274
                                  </td>
                                  <td align="center" className="brdr">
                                    <h5>
                                      <span className="tdd_label label-warning">
                                        vouchered
                                      </span>
                                    </h5>
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;123
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Sale
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;hotel
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Mr abc xyz
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    183.60&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    USD&nbsp;
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    120.00&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    EUR&nbsp;
                                  </td>
                                </tr>
                                <tr className="phps_row_0 even" role="row">
                                  <td align="center" className="brdr">
                                    <div className="dateWrapper">
                                      <div className="onlyDate">14</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td align="center" className="brdr">
                                    TD1802277
                                  </td>
                                  <td align="center" className="brdr">
                                    <h5>
                                      <span className="tdd_label label-warning">
                                        vouchered
                                      </span>
                                    </h5>
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;123
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Sale
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;hotel
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Mr abc xyz
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    208.08&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    USD&nbsp;
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    136.00&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    EUR&nbsp;
                                  </td>
                                </tr>
                                <tr className="phps_row_1 odd" role="row">
                                  <td align="center" className="brdr">
                                    <div className="dateWrapper">
                                      <div className="onlyDate">15</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td align="center" className="brdr">
                                    TD1802299
                                  </td>
                                  <td align="center" className="brdr">
                                    <h5>
                                      <span className="tdd_label label-warning">
                                        vouchered
                                      </span>
                                    </h5>
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;123
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Sale
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;hotel
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Mr adf xyz
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    208.08&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    USD&nbsp;
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    136.00&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    EUR&nbsp;
                                  </td>
                                </tr>
                                <tr className="phps_row_0 even" role="row">
                                  <td align="center" className="brdr">
                                    <div className="dateWrapper">
                                      <div className="onlyDate">16</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td align="center" className="brdr">
                                    TD1802305
                                  </td>
                                  <td align="center" className="brdr">
                                    <h5>
                                      <span className="tdd_label label-warning">
                                        vouchered
                                      </span>
                                    </h5>
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;fff
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Sale
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;hotel
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Mr ttt fff
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    12036.13&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    INR&nbsp;
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    120.00&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    EUR&nbsp;
                                  </td>
                                </tr>
                                <tr className="phps_row_1 odd" role="row">
                                  <td align="center" className="brdr">
                                    <div className="dateWrapper">
                                      <div className="onlyDate">16</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td align="center" className="brdr">
                                    TD1802320
                                  </td>
                                  <td align="center" className="brdr">
                                    <h5>
                                      <span className="tdd_label label-warning">
                                        vouchered
                                      </span>
                                    </h5>
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;123
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Sale
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;hotel
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Mr abc xyz
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    12036.13&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    INR&nbsp;
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    120.00&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    EUR&nbsp;
                                  </td>
                                </tr>
                                <tr className="phps_row_0 even" role="row">
                                  <td align="center" className="brdr">
                                    <div className="dateWrapper">
                                      <div className="onlyDate">17</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td align="center" className="brdr">
                                    TD1802328
                                  </td>
                                  <td align="center" className="brdr">
                                    <h5>
                                      <span className="tdd_label label-warning">
                                        vouchered
                                      </span>
                                    </h5>
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;123
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Sale
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;hotel
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Mr testt Booking
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    15437.92&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    INR&nbsp;
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    120.00&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    EUR&nbsp;
                                  </td>
                                </tr>
                                <tr className="phps_row_1 odd" role="row">
                                  <td align="center" className="brdr">
                                    <div className="dateWrapper">
                                      <div className="onlyDate">17</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td align="center" className="brdr">
                                    TD1802329
                                  </td>
                                  <td align="center" className="brdr">
                                    <h5>
                                      <span className="tdd_label label-warning">
                                        vouchered
                                      </span>
                                    </h5>
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;222
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Sale
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;hotel
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Mr Tesst TwoBookingg
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    15437.92&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    INR&nbsp;
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    120.00&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    EUR&nbsp;
                                  </td>
                                </tr>
                                <tr className="phps_row_0 even" role="row">
                                  <td align="center" className="brdr">
                                    <div className="dateWrapper">
                                      <div className="onlyDate">17</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td align="center" className="brdr">
                                    TD1802330
                                  </td>
                                  <td align="center" className="brdr">
                                    <h5>
                                      <span className="tdd_label label-warning">
                                        vouchered
                                      </span>
                                    </h5>
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;666
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Sale
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;hotel
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Mr third testtbooking
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    236.03&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    USD&nbsp;
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    120.00&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    EUR&nbsp;
                                  </td>
                                </tr>
                                <tr className="phps_row_1 odd" role="row">
                                  <td align="center" className="brdr">
                                    <div className="dateWrapper">
                                      <div className="onlyDate">17</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td align="center" className="brdr">
                                    TD1802331
                                  </td>
                                  <td align="center" className="brdr">
                                    <h5>
                                      <span className="tdd_label label-warning">
                                        vouchered
                                      </span>
                                    </h5>
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Enter Voucher ID555
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Sale
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;hotel
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Mr dddd aaaa
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    15437.92&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    INR&nbsp;
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    120.00&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    EUR&nbsp;
                                  </td>
                                </tr>
                                <tr className="phps_row_0 even" role="row">
                                  <td align="center" className="brdr">
                                    <div className="dateWrapper">
                                      <div className="onlyDate">17</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td align="center" className="brdr">
                                    TD1802332
                                  </td>
                                  <td align="center" className="brdr">
                                    <h5>
                                      <span className="tdd_label label-warning">
                                        vouchered
                                      </span>
                                    </h5>
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;555
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Sale
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;hotel
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Mr dffd fgfg
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    15437.92&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    INR&nbsp;
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    120.00&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    EUR&nbsp;
                                  </td>
                                </tr>
                                <tr className="phps_row_1 odd" role="row">
                                  <td align="center" className="brdr">
                                    <div className="dateWrapper">
                                      <div className="onlyDate">17</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td align="center" className="brdr">
                                    TD1802333
                                  </td>
                                  <td align="center" className="brdr">
                                    <h5>
                                      <span className="tdd_label label-warning">
                                        vouchered
                                      </span>
                                    </h5>
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;7777
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Sale
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;hotel
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Mr fgfg hghhj
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    15437.92&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    INR&nbsp;
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    120.00&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    EUR&nbsp;
                                  </td>
                                </tr>
                                <tr className="phps_row_0 even" role="row">
                                  <td align="center" className="brdr">
                                    <div className="dateWrapper">
                                      <div className="onlyDate">17</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td align="center" className="brdr">
                                    TD1802334
                                  </td>
                                  <td align="center" className="brdr">
                                    <h5>
                                      <span className="tdd_label label-warning">
                                        vouchered
                                      </span>
                                    </h5>
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;123
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Sale
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;hotel
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Mr fdfd fgfgf
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    12036.13&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    INR&nbsp;
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    120.00&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    EUR&nbsp;
                                  </td>
                                </tr>
                                <tr className="phps_row_1 odd" role="row">
                                  <td align="center" className="brdr">
                                    <div className="dateWrapper">
                                      <div className="onlyDate">17</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td align="center" className="brdr">
                                    TD1802335
                                  </td>
                                  <td align="center" className="brdr">
                                    <h5>
                                      <span className="tdd_label label-warning">
                                        vouchered
                                      </span>
                                    </h5>
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;777
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Sale
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;hotel
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Mr fgfg dfdf
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    12036.13&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    INR&nbsp;
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    120.00&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    EUR&nbsp;
                                  </td>
                                </tr>
                                <tr className="phps_row_0 even" role="row">
                                  <td align="center" className="brdr">
                                    <div className="dateWrapper">
                                      <div className="onlyDate">17</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td align="center" className="brdr">
                                    TD1802336
                                  </td>
                                  <td align="center" className="brdr">
                                    <h5>
                                      <span className="tdd_label label-warning">
                                        vouchered
                                      </span>
                                    </h5>
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;6767
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Sale
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;hotel
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Mr hjhj sstyt
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    12036.13&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    INR&nbsp;
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    120.00&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    EUR&nbsp;
                                  </td>
                                </tr>
                                <tr className="phps_row_1 odd" role="row">
                                  <td align="center" className="brdr">
                                    <div className="dateWrapper">
                                      <div className="onlyDate">17</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td align="center" className="brdr">
                                    TD1802337
                                  </td>
                                  <td align="center" className="brdr">
                                    <h5>
                                      <span className="tdd_label label-warning">
                                        vouchered
                                      </span>
                                    </h5>
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;888
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Sale
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;hotel
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Mr gfg fdf
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    12036.13&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    INR&nbsp;
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    120.00&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    EUR&nbsp;
                                  </td>
                                </tr>
                                <tr className="phps_row_0 even" role="row">
                                  <td align="center" className="brdr">
                                    <div className="dateWrapper">
                                      <div className="onlyDate">17</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td align="center" className="brdr">
                                    TD1802338
                                  </td>
                                  <td align="center" className="brdr">
                                    <h5>
                                      <span className="tdd_label label-warning">
                                        vouchered
                                      </span>
                                    </h5>
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;ghghh
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Sale
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;hotel
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Mr hjhj xxfx
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    183.60&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    USD&nbsp;
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    120.00&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    EUR&nbsp;
                                  </td>
                                </tr>
                                <tr className="phps_row_1 odd" role="row">
                                  <td align="center" className="brdr">
                                    <div className="dateWrapper">
                                      <div className="onlyDate">17</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td align="center" className="brdr">
                                    TD1802339
                                  </td>
                                  <td align="center" className="brdr">
                                    <h5>
                                      <span className="tdd_label label-warning">
                                        vouchered
                                      </span>
                                    </h5>
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;888
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Sale
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;hotel
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Mr gfg ghgh
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    183.60&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    USD&nbsp;
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    120.00&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    EUR&nbsp;
                                  </td>
                                </tr>
                                <tr className="phps_row_0 even" role="row">
                                  <td align="center" className="brdr">
                                    <div className="dateWrapper">
                                      <div className="onlyDate">18</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td align="center" className="brdr">
                                    TD1802348
                                  </td>
                                  <td align="center" className="brdr">
                                    <h5>
                                      <span className="tdd_label label-warning">
                                        vouchered
                                      </span>
                                    </h5>
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;111
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Sale
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;hotel
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Mr vbb vbvb
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    12036.13&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    INR&nbsp;
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    120.00&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    EUR&nbsp;
                                  </td>
                                </tr>
                                <tr className="phps_row_1 odd" role="row">
                                  <td align="center" className="brdr">
                                    <div className="dateWrapper">
                                      <div className="onlyDate">18</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td align="center" className="brdr">
                                    TD1802349
                                  </td>
                                  <td align="center" className="brdr">
                                    <h5>
                                      <span className="tdd_label label-warning">
                                        vouchered
                                      </span>
                                    </h5>
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;555
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Sale
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;hotel
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Mr gfgfg rrer
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    12036.13&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    INR&nbsp;
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    120.00&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    EUR&nbsp;
                                  </td>
                                </tr>
                                <tr className="phps_row_0 even" role="row">
                                  <td align="center" className="brdr">
                                    <div className="dateWrapper">
                                      <div className="onlyDate">18</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td align="center" className="brdr">
                                    TD1802351
                                  </td>
                                  <td align="center" className="brdr">
                                    <h5>
                                      <span className="tdd_label label-warning">
                                        vouchered
                                      </span>
                                    </h5>
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;ggg
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Sale
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;hotel
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Mr fgfg gfgfg
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    1200.00&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    INR&nbsp;
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    120.00&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    EUR&nbsp;
                                  </td>
                                </tr>
                                <tr className="phps_row_1 odd" role="row">
                                  <td align="center" className="brdr">
                                    <div className="dateWrapper">
                                      <div className="onlyDate">18</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td align="center" className="brdr">
                                    TD1802356
                                  </td>
                                  <td align="center" className="brdr">
                                    <h5>
                                      <span className="tdd_label label-warning">
                                        vouchered
                                      </span>
                                    </h5>
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;666
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Sale
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;hotel
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp; vvv sss
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    13536.13&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    INR&nbsp;
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    120.00&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    EUR&nbsp;
                                  </td>
                                </tr>
                                <tr className="phps_row_0 even" role="row">
                                  <td align="center" className="brdr">
                                    <div className="dateWrapper">
                                      <div className="onlyDate">18</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td align="center" className="brdr">
                                    TD1802357
                                  </td>
                                  <td align="center" className="brdr">
                                    <h5>
                                      <span className="tdd_label label-warning">
                                        vouchered
                                      </span>
                                    </h5>
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;777
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Sale
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;hotel
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Mr fgf fgfgf
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    1200.00&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    INR&nbsp;
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    120.00&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    EUR&nbsp;
                                  </td>
                                </tr>
                                <tr className="phps_row_1 odd" role="row">
                                  <td align="center" className="brdr">
                                    <div className="dateWrapper">
                                      <div className="onlyDate">18</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td align="center" className="brdr">
                                    TD1802361
                                  </td>
                                  <td align="center" className="brdr">
                                    <h5>
                                      <span className="tdd_label label-warning">
                                        vouchered
                                      </span>
                                    </h5>
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;ghgh
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Sale
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;hotel
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Mr fgf fgf
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    12036.13&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    INR&nbsp;
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    120.00&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    EUR&nbsp;
                                  </td>
                                </tr>
                                <tr className="phps_row_0 even" role="row">
                                  <td align="center" className="brdr">
                                    <div className="dateWrapper">
                                      <div className="onlyDate">22</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td align="center" className="brdr">
                                    TD1802404
                                  </td>
                                  <td align="center" className="brdr">
                                    <h5>
                                      <span className="tdd_label label-warning">
                                        vouchered
                                      </span>
                                    </h5>
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;111
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Sale
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;hotel
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Mr fgf sds
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    12036.13&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    INR&nbsp;
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    120.00&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    EUR&nbsp;
                                  </td>
                                </tr>
                                <tr className="phps_row_1 odd" role="row">
                                  <td align="center" className="brdr">
                                    <div className="dateWrapper">
                                      <div className="onlyDate">22</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td align="center" className="brdr">
                                    TD1802405
                                  </td>
                                  <td align="center" className="brdr">
                                    <h5>
                                      <span className="tdd_label label-warning">
                                        vouchered
                                      </span>
                                    </h5>
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;222
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Sale
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;hotel
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Mr gfgfg dfdf
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    12036.13&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    INR&nbsp;
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    120.00&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    EUR&nbsp;
                                  </td>
                                </tr>
                                <tr className="phps_row_0 even" role="row">
                                  <td align="center" className="brdr">
                                    <div className="dateWrapper">
                                      <div className="onlyDate">22</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td align="center" className="brdr">
                                    TD1802406
                                  </td>
                                  <td align="center" className="brdr">
                                    <h5>
                                      <span className="tdd_label label-warning">
                                        vouchered
                                      </span>
                                    </h5>
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;123
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Sale
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;hotel
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Mr dfd gfgfg
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    12036.13&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    INR&nbsp;
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    120.00&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    EUR&nbsp;
                                  </td>
                                </tr>
                                <tr className="phps_row_1 odd" role="row">
                                  <td align="center" className="brdr">
                                    <div className="dateWrapper">
                                      <div className="onlyDate">24</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td align="center" className="brdr">
                                    TD1802414
                                  </td>
                                  <td align="center" className="brdr">
                                    <h5>
                                      <span className="tdd_label label-warning">
                                        vouchered
                                      </span>
                                    </h5>
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;123
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Sale
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;hotel
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Mr abc xyz
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    13052.52&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    INR&nbsp;
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    128.00&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    EUR&nbsp;
                                  </td>
                                </tr>
                                <tr className="phps_row_0 even" role="row">
                                  <td align="center" className="brdr">
                                    <div className="dateWrapper">
                                      <div className="onlyDate">24</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td align="center" className="brdr">
                                    TD1802419
                                  </td>
                                  <td align="center" className="brdr">
                                    <h5>
                                      <span className="tdd_label label-warning">
                                        vouchered
                                      </span>
                                    </h5>
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;qwe
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Sale
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;hotel
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Mr test abc
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    13052.52&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    INR&nbsp;
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    128.00&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    EUR&nbsp;
                                  </td>
                                </tr>
                                <tr className="phps_row_1 odd" role="row">
                                  <td align="center" className="brdr">
                                    <div className="dateWrapper">
                                      <div className="onlyDate">24</div>
                                      <div className="monthYear">
                                        May
                                        <br />
                                        2019
                                      </div>
                                    </div>
                                  </td>
                                  <td align="center" className="brdr">
                                    TD1802423
                                  </td>
                                  <td align="center" className="brdr">
                                    <h5>
                                      <span className="tdd_label label-warning">
                                        vouchered
                                      </span>
                                    </h5>
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;123
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Sale
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;hotel
                                  </td>
                                  <td align="left" className="brdr">
                                    &nbsp;Mr qqwrer ghgfh
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    13052.52&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    INR&nbsp;
                                  </td>
                                  <td align="right" className="brdr numAlign">
                                    128.00&nbsp;
                                  </td>
                                  <td align="right" className="brdr">
                                    EUR&nbsp;
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group no-result">
                      <h5 className="text-center">No Results Returned!!</h5>
                    </div>
                    <div className="row pd_tp">
                      <div className="row">
                        <div className="col-md-4">&nbsp;</div>
                        <div className="col-md-5">
                          <div className="form-group" />
                        </div>
                        <div className="col-md-3">&nbsp;</div>
                      </div>
                    </div>
                    <br />
                    <br />
                  </div>
                </div>
                <style
                  type="text/css"
                  dangerouslySetInnerHTML={{
                    __html:
                      "\n                        @media print {}\n                    ",
                  }}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default ReportsManagementBookingBySupplierByProfile;
