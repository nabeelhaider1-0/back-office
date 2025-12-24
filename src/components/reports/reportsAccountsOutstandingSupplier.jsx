import Flatpickr from "react-flatpickr";
import React, { useState } from "react";
import Header2 from "../header2/header2";
import MultiSelect from "../reactMultiSelect";
import { reports_supplierOptionsa } from "../../constants/contants";
const ReportsAccountsOutstandingSupplier = () => {
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

  const [isFormVisible, setFormVisibility] = useState(false);

  const toggleFormVisibility = () => {
    setFormVisibility(!isFormVisible);
  };

  return (
    <>
      <Header2 title="SUPPLIER OUTSTANDING" />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <div>
          <form>
            <div className="panel-body">
              <div className="row">
                <div className="form-group col-md-3">
                  <label>Suppliers</label>
                  <MultiSelect
                    options={reports_supplierOptionsa}
                    isSearchable
                    placeholder=" Select Supplier"
                    className="custom-select"
                    noOptionsMessage={() => "No Supplier Found"}
                  />
                </div>
                <div
                  className="form-group col-md-3"
                  id="selOffSupplierDiv"
                  style={{ display: "none" }}
                >
                  <label>Offline Suppliers</label>
                  <select
                    className="selectpicker show-menu-arrow form-control form-control-sm bs-select-hidden"
                    name="selOfflineSupplier"
                    data-live-search="true"
                  >
                    <option value>All</option>
                  </select>
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
                      href="/tms/new_report.php?report=supplier_outstanding_report&a=&run=1&sel_supplier_with_currency=&selOfflineSupplier=&booking_from_date=&booking_to_date=&service_from_date=&service_to_date=&sel_max_results=&sort_by=&current_page=&download=1"
                      className="btn btn-dark btn-sm form-group topBtn"
                    >
                      <i className="fa fa-download" />
                      &nbsp;&nbsp;Download Excel
                    </a>
                    &nbsp;&nbsp;
                    <a
                      title="Click to print XL sheet"
                      href="/tms/new_report.php?report=supplier_outstanding_report&a=&run=1&sel_supplier_with_currency=&selOfflineSupplier=&booking_from_date=&booking_to_date=&service_from_date=&service_to_date=&sel_max_results=&sort_by=&current_page=&print=1"
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
                        <div className="col-sm-10" />
                        <div className="col-sm-2">
                          <div
                            id="search_sup_filter"
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
                          <div id="scrollCont" style={{ overflow: "auto" }}>
                            <table
                              id="search_sup"
                              className="table table-bordered   table-responsive alignTbl dataTable no-footer"
                              role="grid"
                              aria-describedby="search_sup_info"
                            >
                              <thead>
                                {/*tr><td colspan='7'>&nbsp;<td></tr*/}
                                <tr role="row">
                                  <th
                                    className="sorting_disabled"
                                    rowSpan={1}
                                    colSpan={1}
                                    style={{ width: "644.2px" }}
                                  >
                                    &nbsp;Supplier
                                  </th>
                                  <th
                                    className="numAlign sorting_disabled"
                                    rowSpan={1}
                                    colSpan={1}
                                    style={{ width: "263.2px" }}
                                  >
                                    &nbsp;Balance
                                  </th>
                                  <th
                                    className="sorting_disabled"
                                    rowSpan={1}
                                    colSpan={1}
                                    style={{ width: "233.2px" }}
                                  >
                                    &nbsp;Currency
                                  </th>
                                  <th
                                    className="numAlign sorting_disabled"
                                    rowSpan={1}
                                    colSpan={1}
                                    style={{ width: "301px" }}
                                  >
                                    &nbsp;Balance(USD)
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white">
                                <tr role="row" className="odd">
                                  {/* <td>1</td> */}
                                  <td className="bookIdCol">
                                    <a
                                      href="new_report.php?report=supplier_statement_online&sel_online_supplier_with_currency=_&run=1&sel_paid_unpaid=all"
                                      target="_blank"
                                      style={{ color: "#000" }}
                                    >
                                      ()
                                    </a>
                                  </td>
                                  <td className="numAlign">0</td>
                                  <td />
                                  <td className="numAlign">0.00</td>
                                  {/* code modified by himanshu for GT-958 on 8-1-2014 */}
                                </tr>
                                <tr role="row" className="even">
                                  {/* <td>2</td> */}
                                  <td className="bookIdCol">
                                    <a
                                      href="new_report.php?report=supplier_statement_online&sel_online_supplier_with_currency=agoda_AED&run=1&sel_paid_unpaid=all"
                                      target="_blank"
                                      style={{ color: "#000" }}
                                    >
                                      AGODA (AED)
                                    </a>
                                  </td>
                                  <td className="numAlign">2676.83</td>
                                  <td>AED</td>
                                  <td className="numAlign">736.13</td>
                                  {/* code modified by himanshu for GT-958 on 8-1-2014 */}
                                </tr>
                                <tr role="row" className="odd">
                                  {/* <td>3</td> */}
                                  <td className="bookIdCol">
                                    <a
                                      href="new_report.php?report=supplier_statement_online&sel_online_supplier_with_currency=agoda_BHD&run=1&sel_paid_unpaid=all"
                                      target="_blank"
                                      style={{ color: "#000" }}
                                    >
                                      AGODA (BHD)
                                    </a>
                                  </td>
                                  <td className="numAlign">200</td>
                                  <td>BHD</td>
                                  <td className="numAlign">208.30</td>
                                  {/* code modified by himanshu for GT-958 on 8-1-2014 */}
                                </tr>
                                <tr role="row" className="even">
                                  {/* <td>4</td> */}
                                  <td className="bookIdCol">
                                    <a
                                      href="new_report.php?report=supplier_statement_online&sel_online_supplier_with_currency=agoda_INR&run=1&sel_paid_unpaid=all"
                                      target="_blank"
                                      style={{ color: "#000" }}
                                    >
                                      AGODA (INR)
                                    </a>
                                  </td>
                                  <td className="numAlign">5901</td>
                                  <td>INR</td>
                                  <td className="numAlign">92.65</td>
                                  {/* code modified by himanshu for GT-958 on 8-1-2014 */}
                                </tr>
                                <tr role="row" className="odd">
                                  {/* <td>5</td> */}
                                  <td className="bookIdCol">
                                    <a
                                      href="new_report.php?report=supplier_statement_online&sel_online_supplier_with_currency=agoda_JOD&run=1&sel_paid_unpaid=all"
                                      target="_blank"
                                      style={{ color: "#000" }}
                                    >
                                      AGODA (JOD)
                                    </a>
                                  </td>
                                  <td className="numAlign">70</td>
                                  <td>JOD</td>
                                  <td className="numAlign">371.00</td>
                                  {/* code modified by himanshu for GT-958 on 8-1-2014 */}
                                </tr>
                                <tr role="row" className="even">
                                  {/* <td>6</td> */}
                                  <td className="bookIdCol">
                                    <a
                                      href="new_report.php?report=supplier_statement_online&sel_online_supplier_with_currency=agoda_PKR&run=1&sel_paid_unpaid=all"
                                      target="_blank"
                                      style={{ color: "#000" }}
                                    >
                                      AGODA (PKR)
                                    </a>
                                  </td>
                                  <td className="numAlign">100</td>
                                  <td>PKR</td>
                                  <td className="numAlign">0.00</td>
                                  {/* code modified by himanshu for GT-958 on 8-1-2014 */}
                                </tr>
                                <tr role="row" className="odd">
                                  {/* <td>7</td> */}
                                  <td className="bookIdCol">
                                    <a
                                      href="new_report.php?report=supplier_statement_online&sel_online_supplier_with_currency=agoda_USD&run=1&sel_paid_unpaid=all"
                                      target="_blank"
                                      style={{ color: "#000" }}
                                    >
                                      AGODA (USD)
                                    </a>
                                  </td>
                                  <td className="numAlign">46115.43</td>
                                  <td>USD</td>
                                  <td className="numAlign">176391.52</td>
                                  {/* code modified by himanshu for GT-958 on 8-1-2014 */}
                                </tr>
                                <tr role="row" className="even">
                                  {/* <td>8</td> */}
                                  <td className="bookIdCol">
                                    <a
                                      href="new_report.php?report=supplier_statement_online&sel_online_supplier_with_currency=amadeus_JOD&run=1&sel_paid_unpaid=all"
                                      target="_blank"
                                      style={{ color: "#000" }}
                                    >
                                      AMADEUS (JOD)
                                    </a>
                                  </td>
                                  <td className="numAlign">3364.6</td>
                                  <td>JOD</td>
                                  <td className="numAlign">4747.25</td>
                                  {/* code modified by himanshu for GT-958 on 8-1-2014 */}
                                </tr>
                                <tr role="row" className="odd">
                                  {/* <td>9</td> */}
                                  <td className="bookIdCol">
                                    <a
                                      href="new_report.php?report=supplier_statement_online&sel_online_supplier_with_currency=dhisco_rotana_EUR&run=1&sel_paid_unpaid=all"
                                      target="_blank"
                                      style={{ color: "#000" }}
                                    >
                                      DHISCO_ROTANA (EUR)
                                    </a>
                                  </td>
                                  <td className="numAlign">7896</td>
                                  <td>EUR</td>
                                  <td className="numAlign">37148.71</td>
                                  {/* code modified by himanshu for GT-958 on 8-1-2014 */}
                                </tr>
                                <tr role="row" className="even">
                                  {/* <td>10</td> */}
                                  <td className="bookIdCol">
                                    <a
                                      href="new_report.php?report=supplier_statement_online&sel_online_supplier_with_currency=dotw_INR&run=1&sel_paid_unpaid=all"
                                      target="_blank"
                                      style={{ color: "#000" }}
                                    >
                                      DOTW (INR)
                                    </a>
                                  </td>
                                  <td className="numAlign">10</td>
                                  <td>INR</td>
                                  <td className="numAlign">0.16</td>
                                  {/* code modified by himanshu for GT-958 on 8-1-2014 */}
                                </tr>
                                <tr role="row" className="odd">
                                  {/* <td>11</td> */}
                                  <td className="bookIdCol">
                                    <a
                                      href="new_report.php?report=supplier_statement_online&sel_online_supplier_with_currency=dotw_USD&run=1&sel_paid_unpaid=all"
                                      target="_blank"
                                      style={{ color: "#000" }}
                                    >
                                      DOTW (USD)
                                    </a>
                                  </td>
                                  <td className="numAlign">14858.571</td>
                                  <td>USD</td>
                                  <td className="numAlign">56398.80</td>
                                  {/* code modified by himanshu for GT-958 on 8-1-2014 */}
                                </tr>
                                <tr role="row" className="even">
                                  {/* <td>12</td> */}
                                  <td className="bookIdCol">
                                    <a
                                      href="new_report.php?report=supplier_statement_online&sel_online_supplier_with_currency=egyptexpress_AED&run=1&sel_paid_unpaid=all"
                                      target="_blank"
                                      style={{ color: "#000" }}
                                    >
                                      EGYPTEXPRESS (AED)
                                    </a>
                                  </td>
                                  <td className="numAlign">10</td>
                                  <td>AED</td>
                                  <td className="numAlign">10.52</td>
                                  {/* code modified by himanshu for GT-958 on 8-1-2014 */}
                                </tr>
                                <tr role="row" className="odd">
                                  {/* <td>13</td> */}
                                  <td className="bookIdCol">
                                    <a
                                      href="new_report.php?report=supplier_statement_online&sel_online_supplier_with_currency=expedia_USD&run=1&sel_paid_unpaid=all"
                                      target="_blank"
                                      style={{ color: "#000" }}
                                    >
                                      EXPEDIA (USD)
                                    </a>
                                  </td>
                                  <td className="numAlign">357.52</td>
                                  <td>USD</td>
                                  <td className="numAlign">1340.70</td>
                                  {/* code modified by himanshu for GT-958 on 8-1-2014 */}
                                </tr>
                                <tr role="row" className="even">
                                  {/* <td>14</td> */}
                                  <td className="bookIdCol">
                                    <a
                                      href="new_report.php?report=supplier_statement_online&sel_online_supplier_with_currency=expediapackage_USD&run=1&sel_paid_unpaid=all"
                                      target="_blank"
                                      style={{ color: "#000" }}
                                    >
                                      EXPEDIAPACKAGE (USD)
                                    </a>
                                  </td>
                                  <td className="numAlign">172.9</td>
                                  <td>USD</td>
                                  <td className="numAlign">656.28</td>
                                  {/* code modified by himanshu for GT-958 on 8-1-2014 */}
                                </tr>
                                <tr role="row" className="odd">
                                  {/* <td>15</td> */}
                                  <td className="bookIdCol">
                                    <a
                                      href="new_report.php?report=supplier_statement_online&sel_online_supplier_with_currency=groups_INR&run=1&sel_paid_unpaid=all"
                                      target="_blank"
                                      style={{ color: "#000" }}
                                    >
                                      GROUPS (INR)
                                    </a>
                                  </td>
                                  <td className="numAlign">293</td>
                                  <td>INR</td>
                                  <td className="numAlign">17.60</td>
                                  {/* code modified by himanshu for GT-958 on 8-1-2014 */}
                                </tr>
                                <tr role="row" className="even">
                                  {/* <td>16</td> */}
                                  <td className="bookIdCol">
                                    <a
                                      href="new_report.php?report=supplier_statement_online&sel_online_supplier_with_currency=hbsight_AED&run=1&sel_paid_unpaid=all"
                                      target="_blank"
                                      style={{ color: "#000" }}
                                    >
                                      HBSIGHT (AED)
                                    </a>
                                  </td>
                                  <td className="numAlign">910</td>
                                  <td>AED</td>
                                  <td className="numAlign">957.21</td>
                                  {/* code modified by himanshu for GT-958 on 8-1-2014 */}
                                </tr>
                                <tr role="row" className="odd">
                                  {/* <td>17</td> */}
                                  <td className="bookIdCol">
                                    <a
                                      href="new_report.php?report=supplier_statement_online&sel_online_supplier_with_currency=hbsight_EUR&run=1&sel_paid_unpaid=all"
                                      target="_blank"
                                      style={{ color: "#000" }}
                                    >
                                      HBSIGHT (EUR)
                                    </a>
                                  </td>
                                  <td className="numAlign">458.749</td>
                                  <td>EUR</td>
                                  <td className="numAlign">2158.30</td>
                                  {/* code modified by himanshu for GT-958 on 8-1-2014 */}
                                </tr>
                                <tr role="row" className="even">
                                  {/* <td>18</td> */}
                                  <td className="bookIdCol">
                                    <a
                                      href="new_report.php?report=supplier_statement_online&sel_online_supplier_with_currency=hbsight_INR&run=1&sel_paid_unpaid=all"
                                      target="_blank"
                                      style={{ color: "#000" }}
                                    >
                                      HBSIGHT (INR)
                                    </a>
                                  </td>
                                  <td className="numAlign">900</td>
                                  <td>INR</td>
                                  <td className="numAlign">54.05</td>
                                  {/* code modified by himanshu for GT-958 on 8-1-2014 */}
                                </tr>
                                <tr role="row" className="odd">
                                  {/* <td>19</td> */}
                                  <td className="bookIdCol">
                                    <a
                                      href="new_report.php?report=supplier_statement_online&sel_online_supplier_with_currency=hotelbeds_BHD&run=1&sel_paid_unpaid=all"
                                      target="_blank"
                                      style={{ color: "#000" }}
                                    >
                                      HOTELBEDS (BHD)
                                    </a>
                                  </td>
                                  <td className="numAlign">100</td>
                                  <td>BHD</td>
                                  <td className="numAlign">1000.00</td>
                                  {/* code modified by himanshu for GT-958 on 8-1-2014 */}
                                </tr>
                                <tr role="row" className="even">
                                  {/* <td>20</td> */}
                                  <td className="bookIdCol">
                                    <a
                                      href="new_report.php?report=supplier_statement_online&sel_online_supplier_with_currency=hotelbeds_EUR&run=1&sel_paid_unpaid=all"
                                      target="_blank"
                                      style={{ color: "#000" }}
                                    >
                                      HOTELBEDS (EUR)
                                    </a>
                                  </td>
                                  <td className="numAlign">49174.26</td>
                                  <td>EUR</td>
                                  <td className="numAlign">211578.15</td>
                                  {/* code modified by himanshu for GT-958 on 8-1-2014 */}
                                </tr>
                                <tr role="row" className="odd">
                                  {/* <td>21</td> */}
                                  <td className="bookIdCol">
                                    <a
                                      href="new_report.php?report=supplier_statement_online&sel_online_supplier_with_currency=hotelbeds_INR&run=1&sel_paid_unpaid=all"
                                      target="_blank"
                                      style={{ color: "#000" }}
                                    >
                                      HOTELBEDS (INR)
                                    </a>
                                  </td>
                                  <td className="numAlign">60</td>
                                  <td>INR</td>
                                  <td className="numAlign">3.53</td>
                                  {/* code modified by himanshu for GT-958 on 8-1-2014 */}
                                </tr>
                                <tr role="row" className="even">
                                  {/* <td>22</td> */}
                                  <td className="bookIdCol">
                                    <a
                                      href="new_report.php?report=supplier_statement_online&sel_online_supplier_with_currency=hotelbeds_JOD&run=1&sel_paid_unpaid=all"
                                      target="_blank"
                                      style={{ color: "#000" }}
                                    >
                                      HOTELBEDS (JOD)
                                    </a>
                                  </td>
                                  <td className="numAlign">200</td>
                                  <td>JOD</td>
                                  <td className="numAlign">1060.00</td>
                                  {/* code modified by himanshu for GT-958 on 8-1-2014 */}
                                </tr>
                                <tr role="row" className="odd">
                                  {/* <td>23</td> */}
                                  <td className="bookIdCol">
                                    <a
                                      href="new_report.php?report=supplier_statement_online&sel_online_supplier_with_currency=hotelbeds_USD&run=1&sel_paid_unpaid=all"
                                      target="_blank"
                                      style={{ color: "#000" }}
                                    >
                                      HOTELBEDS (USD)
                                    </a>
                                  </td>
                                  <td className="numAlign">2374.25</td>
                                  <td>USD</td>
                                  <td className="numAlign">8905.10</td>
                                  {/* code modified by himanshu for GT-958 on 8-1-2014 */}
                                </tr>
                                <tr role="row" className="even">
                                  {/* <td>24</td> */}
                                  <td className="bookIdCol">
                                    <a
                                      href="new_report.php?report=supplier_statement_online&sel_online_supplier_with_currency=hotelbedstransfer_AED&run=1&sel_paid_unpaid=all"
                                      target="_blank"
                                      style={{ color: "#000" }}
                                    >
                                      HOTELBEDSTRANSFER (AED)
                                    </a>
                                  </td>
                                  <td className="numAlign">100</td>
                                  <td>AED</td>
                                  <td className="numAlign">104.15</td>
                                  {/* code modified by himanshu for GT-958 on 8-1-2014 */}
                                </tr>
                                <tr role="row" className="odd">
                                  {/* <td>25</td> */}
                                  <td className="bookIdCol">
                                    <a
                                      href="new_report.php?report=supplier_statement_online&sel_online_supplier_with_currency=hotelbedstransfer_EUR&run=1&sel_paid_unpaid=all"
                                      target="_blank"
                                      style={{ color: "#000" }}
                                    >
                                      HOTELBEDSTRANSFER (EUR)
                                    </a>
                                  </td>
                                  <td className="numAlign">7063.94</td>
                                  <td>EUR</td>
                                  <td className="numAlign">33234.07</td>
                                  {/* code modified by himanshu for GT-958 on 8-1-2014 */}
                                </tr>
                                <tr role="row" className="even">
                                  {/* <td>26</td> */}
                                  <td className="bookIdCol">
                                    <a
                                      href="new_report.php?report=supplier_statement_online&sel_online_supplier_with_currency=localsightseeing_AED&run=1&sel_paid_unpaid=all"
                                      target="_blank"
                                      style={{ color: "#000" }}
                                    >
                                      LOCALSIGHTSEEING (AED)
                                    </a>
                                  </td>
                                  <td className="numAlign">4000</td>
                                  <td>AED</td>
                                  <td className="numAlign">4125.00</td>
                                  {/* code modified by himanshu for GT-958 on 8-1-2014 */}
                                </tr>
                                <tr role="row" className="odd">
                                  {/* <td>27</td> */}
                                  <td className="bookIdCol">
                                    <a
                                      href="new_report.php?report=supplier_statement_online&sel_online_supplier_with_currency=localsightseeing_AUD&run=1&sel_paid_unpaid=all"
                                      target="_blank"
                                      style={{ color: "#000" }}
                                    >
                                      LOCALSIGHTSEEING (AUD)
                                    </a>
                                  </td>
                                  <td className="numAlign">200</td>
                                  <td>AUD</td>
                                  <td className="numAlign">188.49</td>
                                  {/* code modified by himanshu for GT-958 on 8-1-2014 */}
                                </tr>
                                <tr role="row" className="even">
                                  {/* <td>28</td> */}
                                  <td className="bookIdCol">
                                    <a
                                      href="new_report.php?report=supplier_statement_online&sel_online_supplier_with_currency=localsightseeing_INR&run=1&sel_paid_unpaid=all"
                                      target="_blank"
                                      style={{ color: "#000" }}
                                    >
                                      LOCALSIGHTSEEING (INR)
                                    </a>
                                  </td>
                                  <td className="numAlign">752243.04</td>
                                  <td>INR</td>
                                  <td className="numAlign">45177.91</td>
                                  {/* code modified by himanshu for GT-958 on 8-1-2014 */}
                                </tr>
                                <tr role="row" className="odd">
                                  {/* <td>29</td> */}
                                  <td className="bookIdCol">
                                    <a
                                      href="new_report.php?report=supplier_statement_online&sel_online_supplier_with_currency=localsightseeing_USD&run=1&sel_paid_unpaid=all"
                                      target="_blank"
                                      style={{ color: "#000" }}
                                    >
                                      LOCALSIGHTSEEING (USD)
                                    </a>
                                  </td>
                                  <td className="numAlign">125</td>
                                  <td>USD</td>
                                  <td className="numAlign">474.46</td>
                                  {/* code modified by himanshu for GT-958 on 8-1-2014 */}
                                </tr>
                                <tr role="row" className="even">
                                  {/* <td>30</td> */}
                                  <td className="bookIdCol">
                                    <a
                                      href="new_report.php?report=supplier_statement_online&sel_online_supplier_with_currency=localsystem_AED&run=1&sel_paid_unpaid=all"
                                      target="_blank"
                                      style={{ color: "#000" }}
                                    >
                                      LOCALSYSTEM (AED)
                                    </a>
                                  </td>
                                  <td className="numAlign">101183.222</td>
                                  <td>AED</td>
                                  <td className="numAlign">104345.20</td>
                                  {/* code modified by himanshu for GT-958 on 8-1-2014 */}
                                </tr>
                                <tr role="row" className="odd">
                                  {/* <td>31</td> */}
                                  <td className="bookIdCol">
                                    <a
                                      href="new_report.php?report=supplier_statement_online&sel_online_supplier_with_currency=localsystem_AUD&run=1&sel_paid_unpaid=all"
                                      target="_blank"
                                      style={{ color: "#000" }}
                                    >
                                      LOCALSYSTEM (AUD)
                                    </a>
                                  </td>
                                  <td className="numAlign">1700</td>
                                  <td>AUD</td>
                                  <td className="numAlign">6129.41</td>
                                  {/* code modified by himanshu for GT-958 on 8-1-2014 */}
                                </tr>
                                <tr role="row" className="even">
                                  {/* <td>32</td> */}
                                  <td className="bookIdCol">
                                    <a
                                      href="new_report.php?report=supplier_statement_online&sel_online_supplier_with_currency=localsystem_INR&run=1&sel_paid_unpaid=all"
                                      target="_blank"
                                      style={{ color: "#000" }}
                                    >
                                      LOCALSYSTEM (INR)
                                    </a>
                                  </td>
                                  <td className="numAlign">430670.62</td>
                                  <td>INR</td>
                                  <td className="numAlign">25865.04</td>
                                  {/* code modified by himanshu for GT-958 on 8-1-2014 */}
                                </tr>
                                <tr role="row" className="odd">
                                  {/* <td>33</td> */}
                                  <td className="bookIdCol">
                                    <a
                                      href="new_report.php?report=supplier_statement_online&sel_online_supplier_with_currency=localsystem_JOD&run=1&sel_paid_unpaid=all"
                                      target="_blank"
                                      style={{ color: "#000" }}
                                    >
                                      LOCALSYSTEM (JOD)
                                    </a>
                                  </td>
                                  <td className="numAlign">820</td>
                                  <td>JOD</td>
                                  <td className="numAlign">4346.00</td>
                                  {/* code modified by himanshu for GT-958 on 8-1-2014 */}
                                </tr>
                                <tr role="row" className="even">
                                  {/* <td>34</td> */}
                                  <td className="bookIdCol">
                                    <a
                                      href="new_report.php?report=supplier_statement_online&sel_online_supplier_with_currency=localsystem_SAR&run=1&sel_paid_unpaid=all"
                                      target="_blank"
                                      style={{ color: "#000" }}
                                    >
                                      LOCALSYSTEM (SAR)
                                    </a>
                                  </td>
                                  <td className="numAlign">9752</td>
                                  <td>SAR</td>
                                  <td className="numAlign">574.20</td>
                                  {/* code modified by himanshu for GT-958 on 8-1-2014 */}
                                </tr>
                                <tr role="row" className="odd">
                                  {/* <td>35</td> */}
                                  <td className="bookIdCol">
                                    <a
                                      href="new_report.php?report=supplier_statement_online&sel_online_supplier_with_currency=localsystem_USD&run=1&sel_paid_unpaid=all"
                                      target="_blank"
                                      style={{ color: "#000" }}
                                    >
                                      LOCALSYSTEM (USD)
                                    </a>
                                  </td>
                                  <td className="numAlign">186946</td>
                                  <td>USD</td>
                                  <td className="numAlign">715068.45</td>
                                  {/* code modified by himanshu for GT-958 on 8-1-2014 */}
                                </tr>
                                <tr role="row" className="even">
                                  {/* <td>36</td> */}
                                  <td className="bookIdCol">
                                    <a
                                      href="new_report.php?report=supplier_statement_online&sel_online_supplier_with_currency=localsystem_ZAR&run=1&sel_paid_unpaid=all"
                                      target="_blank"
                                      style={{ color: "#000" }}
                                    >
                                      LOCALSYSTEM (ZAR)
                                    </a>
                                  </td>
                                  <td className="numAlign">18995</td>
                                  <td>ZAR</td>
                                  <td className="numAlign">6827.91</td>
                                  {/* code modified by himanshu for GT-958 on 8-1-2014 */}
                                </tr>
                                <tr role="row" className="odd">
                                  {/* <td>37</td> */}
                                  <td className="bookIdCol">
                                    <a
                                      href="new_report.php?report=supplier_statement_online&sel_online_supplier_with_currency=localtransfer_AED&run=1&sel_paid_unpaid=all"
                                      target="_blank"
                                      style={{ color: "#000" }}
                                    >
                                      LOCALTRANSFER (AED)
                                    </a>
                                  </td>
                                  <td className="numAlign">6150</td>
                                  <td>AED</td>
                                  <td className="numAlign">0.00</td>
                                  {/* code modified by himanshu for GT-958 on 8-1-2014 */}
                                </tr>
                                <tr role="row" className="even">
                                  {/* <td>38</td> */}
                                  <td className="bookIdCol">
                                    <a
                                      href="new_report.php?report=supplier_statement_online&sel_online_supplier_with_currency=localtransfer_EUR&run=1&sel_paid_unpaid=all"
                                      target="_blank"
                                      style={{ color: "#000" }}
                                    >
                                      LOCALTRANSFER (EUR)
                                    </a>
                                  </td>
                                  <td className="numAlign">222</td>
                                  <td>EUR</td>
                                  <td className="numAlign">955.18</td>
                                  {/* code modified by himanshu for GT-958 on 8-1-2014 */}
                                </tr>
                                <tr role="row" className="odd">
                                  {/* <td>39</td> */}
                                  <td className="bookIdCol">
                                    <a
                                      href="new_report.php?report=supplier_statement_online&sel_online_supplier_with_currency=localtransfer_GBP&run=1&sel_paid_unpaid=all"
                                      target="_blank"
                                      style={{ color: "#000" }}
                                    >
                                      LOCALTRANSFER (GBP)
                                    </a>
                                  </td>
                                  <td className="numAlign">10</td>
                                  <td>GBP</td>
                                  <td className="numAlign">63.89</td>
                                  {/* code modified by himanshu for GT-958 on 8-1-2014 */}
                                </tr>
                                <tr role="row" className="even">
                                  {/* <td>40</td> */}
                                  <td className="bookIdCol">
                                    <a
                                      href="new_report.php?report=supplier_statement_online&sel_online_supplier_with_currency=localtransfer_INR&run=1&sel_paid_unpaid=all"
                                      target="_blank"
                                      style={{ color: "#000" }}
                                    >
                                      LOCALTRANSFER (INR)
                                    </a>
                                  </td>
                                  <td className="numAlign">534238</td>
                                  <td>INR</td>
                                  <td className="numAlign">32085.05</td>
                                  {/* code modified by himanshu for GT-958 on 8-1-2014 */}
                                </tr>
                                <tr role="row" className="odd">
                                  {/* <td>41</td> */}
                                  <td className="bookIdCol">
                                    <a
                                      href="new_report.php?report=supplier_statement_online&sel_online_supplier_with_currency=localtransfer_SAR&run=1&sel_paid_unpaid=all"
                                      target="_blank"
                                      style={{ color: "#000" }}
                                    >
                                      LOCALTRANSFER (SAR)
                                    </a>
                                  </td>
                                  <td className="numAlign">30732.8</td>
                                  <td>SAR</td>
                                  <td className="numAlign">30732.80</td>
                                  {/* code modified by himanshu for GT-958 on 8-1-2014 */}
                                </tr>
                                <tr role="row" className="even">
                                  {/* <td>42</td> */}
                                  <td className="bookIdCol">
                                    <a
                                      href="new_report.php?report=supplier_statement_online&sel_online_supplier_with_currency=localtransfer_USD&run=1&sel_paid_unpaid=all"
                                      target="_blank"
                                      style={{ color: "#000" }}
                                    >
                                      LOCALTRANSFER (USD)
                                    </a>
                                  </td>
                                  <td className="numAlign">331.5</td>
                                  <td>USD</td>
                                  <td className="numAlign">1243.12</td>
                                  {/* code modified by himanshu for GT-958 on 8-1-2014 */}
                                </tr>
                                <tr role="row" className="odd">
                                  {/* <td>43</td> */}
                                  <td className="bookIdCol">
                                    <a
                                      href="new_report.php?report=supplier_statement_online&sel_online_supplier_with_currency=miki_USD&run=1&sel_paid_unpaid=all"
                                      target="_blank"
                                      style={{ color: "#000" }}
                                    >
                                      MIKI (USD)
                                    </a>
                                  </td>
                                  <td className="numAlign">293.96</td>
                                  <td>USD</td>
                                  <td className="numAlign">1124.40</td>
                                  {/* code modified by himanshu for GT-958 on 8-1-2014 */}
                                </tr>
                                <tr role="row" className="even">
                                  {/* <td>44</td> */}
                                  <td className="bookIdCol">
                                    <a
                                      href="new_report.php?report=supplier_statement_online&sel_online_supplier_with_currency=misc_AED&run=1&sel_paid_unpaid=all"
                                      target="_blank"
                                      style={{ color: "#000" }}
                                    >
                                      MISC (AED)
                                    </a>
                                  </td>
                                  <td className="numAlign">900</td>
                                  <td>AED</td>
                                  <td className="numAlign">247.50</td>
                                  {/* code modified by himanshu for GT-958 on 8-1-2014 */}
                                </tr>
                                <tr role="row" className="odd">
                                  {/* <td>45</td> */}
                                  <td className="bookIdCol">
                                    <a
                                      href="new_report.php?report=supplier_statement_online&sel_online_supplier_with_currency=misc_USD&run=1&sel_paid_unpaid=all"
                                      target="_blank"
                                      style={{ color: "#000" }}
                                    >
                                      MISC (USD)
                                    </a>
                                  </td>
                                  <td className="numAlign">10</td>
                                  <td>USD</td>
                                  <td className="numAlign">37.50</td>
                                  {/* code modified by himanshu for GT-958 on 8-1-2014 */}
                                </tr>
                                <tr role="row" className="even">
                                  {/* <td>46</td> */}
                                  <td className="bookIdCol">
                                    <a
                                      href="new_report.php?report=supplier_statement_online&sel_online_supplier_with_currency=redapple_INR&run=1&sel_paid_unpaid=all"
                                      target="_blank"
                                      style={{ color: "#000" }}
                                    >
                                      REDAPPLE (INR)
                                    </a>
                                  </td>
                                  <td className="numAlign">1500</td>
                                  <td>INR</td>
                                  <td className="numAlign">23.55</td>
                                  {/* code modified by himanshu for GT-958 on 8-1-2014 */}
                                </tr>
                                <tr role="row" className="odd">
                                  {/* <td>47</td> */}
                                  <td className="bookIdCol">
                                    <a
                                      href="new_report.php?report=supplier_statement_online&sel_online_supplier_with_currency=redapple_USD&run=1&sel_paid_unpaid=all"
                                      target="_blank"
                                      style={{ color: "#000" }}
                                    >
                                      REDAPPLE (USD)
                                    </a>
                                  </td>
                                  <td className="numAlign">924.59</td>
                                  <td>USD</td>
                                  <td className="numAlign">3536.56</td>
                                  {/* code modified by himanshu for GT-958 on 8-1-2014 */}
                                </tr>
                                <tr role="row" className="even">
                                  {/* <td>48</td> */}
                                  <td className="bookIdCol">
                                    <a
                                      href="new_report.php?report=supplier_statement_online&sel_online_supplier_with_currency=restel_EUR&run=1&sel_paid_unpaid=all"
                                      target="_blank"
                                      style={{ color: "#000" }}
                                    >
                                      RESTEL (EUR)
                                    </a>
                                  </td>
                                  <td className="numAlign">70.95</td>
                                  <td>EUR</td>
                                  <td className="numAlign">305.27</td>
                                  {/* code modified by himanshu for GT-958 on 8-1-2014 */}
                                </tr>
                                <tr role="row" className="odd">
                                  {/* <td>49</td> */}
                                  <td className="bookIdCol">
                                    <a
                                      href="new_report.php?report=supplier_statement_online&sel_online_supplier_with_currency=sabre_AED&run=1&sel_paid_unpaid=all"
                                      target="_blank"
                                      style={{ color: "#000" }}
                                    >
                                      SABRE (AED)
                                    </a>
                                  </td>
                                  <td className="numAlign">1877.4</td>
                                  <td>AED</td>
                                  <td className="numAlign">1955.35</td>
                                  {/* code modified by himanshu for GT-958 on 8-1-2014 */}
                                </tr>
                                <tr role="row" className="even">
                                  {/* <td>50</td> */}
                                  <td className="bookIdCol">
                                    <a
                                      href="new_report.php?report=supplier_statement_online&sel_online_supplier_with_currency=sabre_BHD&run=1&sel_paid_unpaid=all"
                                      target="_blank"
                                      style={{ color: "#000" }}
                                    >
                                      SABRE (BHD)
                                    </a>
                                  </td>
                                  <td className="numAlign">16353.5</td>
                                  <td>BHD</td>
                                  <td className="numAlign">43263.18</td>
                                  {/* code modified by himanshu for GT-958 on 8-1-2014 */}
                                </tr>
                                <tr role="row" className="odd">
                                  {/* <td>51</td> */}
                                  <td className="bookIdCol">
                                    <a
                                      href="new_report.php?report=supplier_statement_online&sel_online_supplier_with_currency=sabre_INR&run=1&sel_paid_unpaid=all"
                                      target="_blank"
                                      style={{ color: "#000" }}
                                    >
                                      SABRE (INR)
                                    </a>
                                  </td>
                                  <td className="numAlign">310</td>
                                  <td>INR</td>
                                  <td className="numAlign">18.25</td>
                                  {/* code modified by himanshu for GT-958 on 8-1-2014 */}
                                </tr>
                                <tr role="row" className="even">
                                  {/* <td>52</td> */}
                                  <td className="bookIdCol">
                                    <a
                                      href="new_report.php?report=supplier_statement_online&sel_online_supplier_with_currency=sabre_SAR&run=1&sel_paid_unpaid=all"
                                      target="_blank"
                                      style={{ color: "#000" }}
                                    >
                                      SABRE (SAR)
                                    </a>
                                  </td>
                                  <td className="numAlign">80667.8</td>
                                  <td>SAR</td>
                                  <td className="numAlign">80667.80</td>
                                  {/* code modified by himanshu for GT-958 on 8-1-2014 */}
                                </tr>
                                <tr role="row" className="odd">
                                  {/* <td>53</td> */}
                                  <td className="bookIdCol">
                                    <a
                                      href="new_report.php?report=supplier_statement_online&sel_online_supplier_with_currency=sabre_USD&run=1&sel_paid_unpaid=all"
                                      target="_blank"
                                      style={{ color: "#000" }}
                                    >
                                      SABRE (USD)
                                    </a>
                                  </td>
                                  <td className="numAlign">500</td>
                                  <td>USD</td>
                                  <td className="numAlign">1875.00</td>
                                  {/* code modified by himanshu for GT-958 on 8-1-2014 */}
                                </tr>
                                <tr role="row" className="even">
                                  {/* <td>54</td> */}
                                  <td className="bookIdCol">
                                    <a
                                      href="new_report.php?report=supplier_statement_online&sel_online_supplier_with_currency=tboholidays_EUR&run=1&sel_paid_unpaid=all"
                                      target="_blank"
                                      style={{ color: "#000" }}
                                    >
                                      TBOHOLIDAYS (EUR)
                                    </a>
                                  </td>
                                  <td className="numAlign">28</td>
                                  <td>EUR</td>
                                  <td className="numAlign">120.47</td>
                                  {/* code modified by himanshu for GT-958 on 8-1-2014 */}
                                </tr>
                                <tr role="row" className="odd">
                                  {/* <td>55</td> */}
                                  <td className="bookIdCol">
                                    <a
                                      href="new_report.php?report=supplier_statement_online&sel_online_supplier_with_currency=tboholidays_USD&run=1&sel_paid_unpaid=all"
                                      target="_blank"
                                      style={{ color: "#000" }}
                                    >
                                      TBOHOLIDAYS (USD)
                                    </a>
                                  </td>
                                  <td className="numAlign">1009.43</td>
                                  <td>USD</td>
                                  <td className="numAlign">3785.36</td>
                                  {/* code modified by himanshu for GT-958 on 8-1-2014 */}
                                </tr>
                                <tr role="row" className="even">
                                  {/* <td>56</td> */}
                                  <td className="bookIdCol">
                                    <a
                                      href="new_report.php?report=supplier_statement_online&sel_online_supplier_with_currency=travco_EUR&run=1&sel_paid_unpaid=all"
                                      target="_blank"
                                      style={{ color: "#000" }}
                                    >
                                      TRAVCO (EUR)
                                    </a>
                                  </td>
                                  <td className="numAlign">3250</td>
                                  <td>EUR</td>
                                  <td className="numAlign">14990.62</td>
                                  {/* code modified by himanshu for GT-958 on 8-1-2014 */}
                                </tr>
                                <tr role="row" className="odd">
                                  {/* <td>57</td> */}
                                  <td className="bookIdCol">
                                    <a
                                      href="new_report.php?report=supplier_statement_online&sel_online_supplier_with_currency=visa_AED&run=1&sel_paid_unpaid=all"
                                      target="_blank"
                                      style={{ color: "#000" }}
                                    >
                                      VISA (AED)
                                    </a>
                                  </td>
                                  <td className="numAlign">708</td>
                                  <td>AED</td>
                                  <td className="numAlign">708.00</td>
                                  {/* code modified by himanshu for GT-958 on 8-1-2014 */}
                                </tr>
                                <tr role="row" className="even">
                                  {/* <td>58</td> */}
                                  <td className="bookIdCol">
                                    <a
                                      href="new_report.php?report=supplier_statement_online&sel_online_supplier_with_currency=visa_AUD&run=1&sel_paid_unpaid=all"
                                      target="_blank"
                                      style={{ color: "#000" }}
                                    >
                                      VISA (AUD)
                                    </a>
                                  </td>
                                  <td className="numAlign">4066</td>
                                  <td>AUD</td>
                                  <td className="numAlign">14660.11</td>
                                  {/* code modified by himanshu for GT-958 on 8-1-2014 */}
                                </tr>
                                <tr role="row" className="odd">
                                  {/* <td>59</td> */}
                                  <td className="bookIdCol">
                                    <a
                                      href="new_report.php?report=supplier_statement_online&sel_online_supplier_with_currency=visa_BHD&run=1&sel_paid_unpaid=all"
                                      target="_blank"
                                      style={{ color: "#000" }}
                                    >
                                      VISA (BHD)
                                    </a>
                                  </td>
                                  <td className="numAlign">7</td>
                                  <td>BHD</td>
                                  <td className="numAlign">71.40</td>
                                  {/* code modified by himanshu for GT-958 on 8-1-2014 */}
                                </tr>
                                <tr role="row" className="even">
                                  {/* <td>60</td> */}
                                  <td className="bookIdCol">
                                    <a
                                      href="new_report.php?report=supplier_statement_online&sel_online_supplier_with_currency=visa_EUR&run=1&sel_paid_unpaid=all"
                                      target="_blank"
                                      style={{ color: "#000" }}
                                    >
                                      VISA (EUR)
                                    </a>
                                  </td>
                                  <td className="numAlign">200</td>
                                  <td>EUR</td>
                                  <td className="numAlign">0.00</td>
                                  {/* code modified by himanshu for GT-958 on 8-1-2014 */}
                                </tr>
                                <tr role="row" className="odd">
                                  {/* <td>61</td> */}
                                  <td className="bookIdCol">
                                    <a
                                      href="new_report.php?report=supplier_statement_online&sel_online_supplier_with_currency=visa_GBP&run=1&sel_paid_unpaid=all"
                                      target="_blank"
                                      style={{ color: "#000" }}
                                    >
                                      VISA (GBP)
                                    </a>
                                  </td>
                                  <td className="numAlign">40</td>
                                  <td>GBP</td>
                                  <td className="numAlign">56.40</td>
                                  {/* code modified by himanshu for GT-958 on 8-1-2014 */}
                                </tr>
                                <tr role="row" className="even">
                                  {/* <td>62</td> */}
                                  <td className="bookIdCol">
                                    <a
                                      href="new_report.php?report=supplier_statement_online&sel_online_supplier_with_currency=visa_INR&run=1&sel_paid_unpaid=all"
                                      target="_blank"
                                      style={{ color: "#000" }}
                                    >
                                      VISA (INR)
                                    </a>
                                  </td>
                                  <td className="numAlign">27195</td>
                                  <td>INR</td>
                                  <td className="numAlign">1633.27</td>
                                  {/* code modified by himanshu for GT-958 on 8-1-2014 */}
                                </tr>
                                <tr role="row" className="odd">
                                  {/* <td>63</td> */}
                                  <td className="bookIdCol">
                                    <a
                                      href="new_report.php?report=supplier_statement_online&sel_online_supplier_with_currency=visa_SAR&run=1&sel_paid_unpaid=all"
                                      target="_blank"
                                      style={{ color: "#000" }}
                                    >
                                      VISA (SAR)
                                    </a>
                                  </td>
                                  <td className="numAlign">1590</td>
                                  <td>SAR</td>
                                  <td className="numAlign">1590.00</td>
                                  {/* code modified by himanshu for GT-958 on 8-1-2014 */}
                                </tr>
                                <tr role="row" className="even">
                                  {/* <td>64</td> */}
                                  <td className="bookIdCol">
                                    <a
                                      href="new_report.php?report=supplier_statement_online&sel_online_supplier_with_currency=visa_USD&run=1&sel_paid_unpaid=all"
                                      target="_blank"
                                      style={{ color: "#000" }}
                                    >
                                      VISA (USD)
                                    </a>
                                  </td>
                                  <td className="numAlign">3745</td>
                                  <td>USD</td>
                                  <td className="numAlign">14324.62</td>
                                  {/* code modified by himanshu for GT-958 on 8-1-2014 */}
                                </tr>
                                <tr role="row" className="odd">
                                  {/* <td>65</td> */}
                                  <td className="bookIdCol">
                                    <a
                                      href="new_report.php?report=supplier_statement_online&sel_online_supplier_with_currency=whitesands_BHD&run=1&sel_paid_unpaid=all"
                                      target="_blank"
                                      style={{ color: "#000" }}
                                    >
                                      WHITESANDS (BHD)
                                    </a>
                                  </td>
                                  <td className="numAlign">300</td>
                                  <td>BHD</td>
                                  <td className="numAlign">3000.00</td>
                                  {/* code modified by himanshu for GT-958 on 8-1-2014 */}
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-6">
                          <div
                            className="dataTables_info"
                            id="search_sup_info"
                            role="status"
                            aria-live="polite"
                          >
                            Showing 1 to 65 of 65 entries
                          </div>
                        </div>
                        <div className="col-sm-6" />
                      </div>
                    </div>
                  </div>
                  <style
                    type="text/css"
                    dangerouslySetInnerHTML={{
                      __html:
                        "\n                            @media print {\n                                /*tr td.bookIdCol a { display : none !important;}*/\n                            }\n                        ",
                    }}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default ReportsAccountsOutstandingSupplier;
