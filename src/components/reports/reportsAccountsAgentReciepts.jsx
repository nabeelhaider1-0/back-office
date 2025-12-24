import Flatpickr from "react-flatpickr";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header2 from "../header2/header2";
import MultiSelect from "../reactMultiSelect";
import {
  AgencyOptions,
  allocationStatusOptions,
  reports_paymentModeOptions,
} from "../../constants/contants";

const ReportsAccountsAgentReciepts = () => {
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
      <Header2 title="RECEIPT" />
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
                    placeholder=" Select Agent "
                    className="custom-select"
                    noOptionsMessage={() => "No Agency Found"}
                  />
                </div>
                <div className="form-group col-md-3">
                  <label>Allocation Status</label>
                  <MultiSelect
                    options={allocationStatusOptions}
                    isSearchable
                    placeholder=" All "
                    className="custom-select"
                    noOptionsMessage={() => "No Allocation Found"}
                  />
                </div>
                <div className="form-group col-md-3">
                  <label>Mode of payment</label>
                  <MultiSelect
                    options={reports_paymentModeOptions}
                    isSearchable
                    placeholder=" Select  "
                    className="custom-select"
                    noOptionsMessage={() => "No payment Found"}
                  />
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="booking_date_cw">Receipt Date</label>
                  <div name="booking_date" id="booking_date">
                    <div
                      className="input-daterange input-group date"
                      id="datetimepicker"
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
                        id="b5TrashBtn"
                        onClick={handleTrashClick}
                      >
                        <i className="fa fa-trash" />
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="form-group col-md-12"
                  style={{ paddingTop: "30px" }}
                >
                  <button
                    className="btn btn-dark btn-sm"
                    type="button"
                    onClick={toggleFormVisibility}
                    name="sbt1"
                    value="View Report"
                    id="btn-submit"
                  >
                    <i className="fa fa-eye" />
                    &nbsp;&nbsp;View Report
                  </button>
                  <button
                    className="btn btn-dark btn-sm btn-act mx-1"
                    action="download"
                  >
                    <i className="fa fa-file-excel-o" />
                    &nbsp;&nbsp;Download
                  </button>
                  <button
                    className="btn btn-dark btn-sm btn-act mx-1"
                    action="print"
                  >
                    <i className="fa fa-print" />
                    &nbsp;&nbsp;Print
                  </button>
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
              <div className="dataTables_scroll">
                <br />
                <div
                  id="receipt_table_wrapper"
                  className="dataTables_wrapper form-inline dt-bootstrap no-footer"
                >
                  <div className="row">
                    <div className="col-md-3">
                      <div
                        className="dataTables_info"
                        id="receipt_table_info"
                        role="status"
                        aria-live="polite"
                      >
                        showing 1 to 25 of 577
                      </div>
                    </div>
                    <div className="col-md-7 dtPaging">
                      <div
                        className="dataTables_paginate paging_full_numbers"
                        id="receipt_table_paginate"
                      >
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
                    <div className="col-md-2">
                      <div
                        id="receipt_table_filter"
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
                    <div className="col-md-12">
                      <table
                        id="receipt_table"
                        className="table table-bordered   table-responsive dataTable no-footer"
                        style={{ width: "100%" }}
                        aria-describedby="receipt_table_info"
                        role="grid"
                      >
                        <thead>
                          <tr role="row">
                            <th
                              className="sorting_desc"
                              tabIndex={0}
                              aria-controls="receipt_table"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Date: activate to sort column ascending"
                              style={{ width: "47.2px" }}
                              aria-sort="descending"
                            >
                              Date
                            </th>
                            <th
                              className="sorting"
                              tabIndex={0}
                              aria-controls="receipt_table"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Receipt No: activate to sort column ascending"
                              style={{ width: "77.2px" }}
                            >
                              Receipt No
                            </th>
                            <th
                              className="sorting"
                              tabIndex={0}
                              aria-controls="receipt_table"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Account: activate to sort column ascending"
                              style={{ width: "127.2px" }}
                            >
                              Account
                            </th>
                            <th
                              className="sorting"
                              tabIndex={0}
                              aria-controls="receipt_table"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Amount: activate to sort column ascending"
                              style={{ width: "77.2px" }}
                            >
                              Amount
                            </th>
                            <th
                              className="sorting"
                              tabIndex={0}
                              aria-controls="receipt_table"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Unallocated Amount: activate to sort column ascending"
                              style={{ width: "114.2px" }}
                            >
                              Unallocated Amount
                            </th>
                            <th
                              className="sorting"
                              tabIndex={0}
                              aria-controls="receipt_table"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Amount Allocated: activate to sort column ascending"
                              style={{ width: "100.2px" }}
                            >
                              Amount Allocated
                            </th>
                            <th
                              className="sorting"
                              tabIndex={0}
                              aria-controls="receipt_table"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Currency: activate to sort column ascending"
                              style={{ width: "77.2px" }}
                            >
                              Currency
                            </th>
                            <th
                              className="sorting"
                              tabIndex={0}
                              aria-controls="receipt_table"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Cash / Cheque: activate to sort column ascending"
                              style={{ width: "177.2px" }}
                            >
                              Cash / Cheque
                            </th>
                            <th
                              className="sorting"
                              tabIndex={0}
                              aria-controls="receipt_table"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Narration: activate to sort column ascending"
                              style={{ width: "491px" }}
                            >
                              Narration
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          <tr role="row" className="odd">
                            <td className="sorting_1">
                              <div className="dateWrapper">
                                <div className="onlyDate">31 </div>
                                <div className="monthYear">
                                  {" "}
                                  May
                                  <br />
                                  2023{" "}
                                </div>
                              </div>
                            </td>
                            <td>Rcpt00000532</td>
                            <td>sqtech [CD0291]</td>
                            <td>106.06</td>
                            <td>0</td>
                            <td>106.06</td>
                            <td>SAR</td>
                            <td>ELECTRONIC FUND TRANSFER(EFT)</td>
                            <td>Booking done from tap payment gateway.</td>
                          </tr>
                          <tr role="row" className="even">
                            <td className="sorting_1">
                              <div className="dateWrapper">
                                <div className="onlyDate">31 </div>
                                <div className="monthYear">
                                  {" "}
                                  Mar
                                  <br />
                                  2021{" "}
                                </div>
                              </div>
                            </td>
                            <td>1357</td>
                            <td>sayali [CD0265]</td>
                            <td>1660</td>
                            <td>4.7</td>
                            <td>1655.3</td>
                            <td>INR</td>
                            <td>Cash</td>
                            <td>TD1127948</td>
                          </tr>
                          <tr role="row" className="odd">
                            <td className="sorting_1">
                              <div className="dateWrapper">
                                <div className="onlyDate">31 </div>
                                <div className="monthYear">
                                  {" "}
                                  Jan
                                  <br />
                                  2021{" "}
                                </div>
                              </div>
                            </td>
                            <td>12345</td>
                            <td>sayali [CD0265]</td>
                            <td>10000</td>
                            <td>10000</td>
                            <td>0</td>
                            <td>AED</td>
                            <td>Cash</td>
                            <td>asdfghjkll</td>
                          </tr>
                          <tr role="row" className="even">
                            <td className="sorting_1">
                              <div className="dateWrapper">
                                <div className="onlyDate">31 </div>
                                <div className="monthYear">
                                  {" "}
                                  Jan
                                  <br />
                                  2021{" "}
                                </div>
                              </div>
                            </td>
                            <td>12345</td>
                            <td>sayali [CD0265]</td>
                            <td>5000</td>
                            <td>906.24</td>
                            <td>4093.76</td>
                            <td>INR</td>
                            <td>Cash</td>
                            <td>asdfghjkl</td>
                          </tr>
                          <tr role="row" className="odd">
                            <td className="sorting_1">
                              <div className="dateWrapper">
                                <div className="onlyDate">31 </div>
                                <div className="monthYear">
                                  {" "}
                                  Jan
                                  <br />
                                  2021{" "}
                                </div>
                              </div>
                            </td>
                            <td>12345</td>
                            <td>sayali [CD0265]</td>
                            <td>900</td>
                            <td>900</td>
                            <td>0</td>
                            <td>AED</td>
                            <td>Cash</td>
                            <td>Test</td>
                          </tr>
                          <tr role="row" className="even">
                            <td className="sorting_1">
                              <div className="dateWrapper">
                                <div className="onlyDate">31 </div>
                                <div className="monthYear">
                                  {" "}
                                  Jan
                                  <br />
                                  2021{" "}
                                </div>
                              </div>
                            </td>
                            <td>12345</td>
                            <td>sayali [CD0265]</td>
                            <td>900</td>
                            <td>3.361</td>
                            <td>896.639</td>
                            <td>AED</td>
                            <td>Cash</td>
                            <td>Test</td>
                          </tr>
                          <tr role="row" className="odd">
                            <td className="sorting_1">
                              <div className="dateWrapper">
                                <div className="onlyDate">31 </div>
                                <div className="monthYear">
                                  {" "}
                                  Dec
                                  <br />
                                  2020{" "}
                                </div>
                              </div>
                            </td>
                            <td>Rcpt00000275</td>
                            <td>Vartak Holidazzle [CD0195]</td>
                            <td>11690.809</td>
                            <td>0</td>
                            <td>11690.809</td>
                            <td>INR</td>
                            <td>ELECTRONIC FUND TRANSFER(EFT)</td>
                            <td>Booking done from HP payment gateway.</td>
                          </tr>
                          <tr role="row" className="even">
                            <td className="sorting_1">
                              <div className="dateWrapper">
                                <div className="onlyDate">30 </div>
                                <div className="monthYear">
                                  {" "}
                                  May
                                  <br />
                                  2023{" "}
                                </div>
                              </div>
                            </td>
                            <td>Rcpt00000526</td>
                            <td>sqtech [CD0291]</td>
                            <td>164.747</td>
                            <td>0</td>
                            <td>164.747</td>
                            <td>SAR</td>
                            <td>ELECTRONIC FUND TRANSFER(EFT)</td>
                            <td>Booking done from CREDIMAX payment gateway.</td>
                          </tr>
                          <tr role="row" className="odd">
                            <td className="sorting_1">
                              <div className="dateWrapper">
                                <div className="onlyDate">30 </div>
                                <div className="monthYear">
                                  {" "}
                                  May
                                  <br />
                                  2023{" "}
                                </div>
                              </div>
                            </td>
                            <td>Rcpt00000527</td>
                            <td>sqtech [CD0291]</td>
                            <td>114.321</td>
                            <td>0</td>
                            <td>114.321</td>
                            <td>SAR</td>
                            <td>ELECTRONIC FUND TRANSFER(EFT)</td>
                            <td>Booking done from CREDIMAX payment gateway.</td>
                          </tr>
                          <tr role="row" className="even">
                            <td className="sorting_1">
                              <div className="dateWrapper">
                                <div className="onlyDate">30 </div>
                                <div className="monthYear">
                                  {" "}
                                  May
                                  <br />
                                  2023{" "}
                                </div>
                              </div>
                            </td>
                            <td>Rcpt00000528</td>
                            <td>sqtech [CD0291]</td>
                            <td>106.06</td>
                            <td>0</td>
                            <td>106.06</td>
                            <td>SAR</td>
                            <td>ELECTRONIC FUND TRANSFER(EFT)</td>
                            <td>Booking done from CREDIMAX payment gateway.</td>
                          </tr>
                          <tr role="row" className="odd">
                            <td className="sorting_1">
                              <div className="dateWrapper">
                                <div className="onlyDate">30 </div>
                                <div className="monthYear">
                                  {" "}
                                  May
                                  <br />
                                  2023{" "}
                                </div>
                              </div>
                            </td>
                            <td>Rcpt00000529</td>
                            <td>sqtech [CD0291]</td>
                            <td>115.525</td>
                            <td>0</td>
                            <td>115.525</td>
                            <td>SAR</td>
                            <td>ELECTRONIC FUND TRANSFER(EFT)</td>
                            <td>Booking done from tap payment gateway.</td>
                          </tr>
                          <tr role="row" className="even">
                            <td className="sorting_1">
                              <div className="dateWrapper">
                                <div className="onlyDate">30 </div>
                                <div className="monthYear">
                                  {" "}
                                  May
                                  <br />
                                  2023{" "}
                                </div>
                              </div>
                            </td>
                            <td>Rcpt00000530</td>
                            <td>sqtech [CD0291]</td>
                            <td>114.321</td>
                            <td>0</td>
                            <td>114.321</td>
                            <td>SAR</td>
                            <td>ELECTRONIC FUND TRANSFER(EFT)</td>
                            <td>Booking done from tap payment gateway.</td>
                          </tr>
                          <tr role="row" className="odd">
                            <td className="sorting_1">
                              <div className="dateWrapper">
                                <div className="onlyDate">30 </div>
                                <div className="monthYear">
                                  {" "}
                                  May
                                  <br />
                                  2023{" "}
                                </div>
                              </div>
                            </td>
                            <td>Rcpt00000531</td>
                            <td>sqtech [CD0291]</td>
                            <td>117.677</td>
                            <td>0</td>
                            <td>117.677</td>
                            <td>SAR</td>
                            <td>ELECTRONIC FUND TRANSFER(EFT)</td>
                            <td>Booking done from tap payment gateway.</td>
                          </tr>
                          <tr role="row" className="even">
                            <td className="sorting_1">
                              <div className="dateWrapper">
                                <div className="onlyDate">30 </div>
                                <div className="monthYear">
                                  {" "}
                                  May
                                  <br />
                                  2018{" "}
                                </div>
                              </div>
                            </td>
                            <td>V123</td>
                            <td>Qtech [CD0074]</td>
                            <td>52</td>
                            <td>1</td>
                            <td>51</td>
                            <td>USD</td>
                            <td />
                            <td />
                          </tr>
                          <tr role="row" className="odd">
                            <td className="sorting_1">
                              <div className="dateWrapper">
                                <div className="onlyDate">30 </div>
                                <div className="monthYear">
                                  {" "}
                                  Dec
                                  <br />
                                  2022{" "}
                                </div>
                              </div>
                            </td>
                            <td>Rcpt00000515</td>
                            <td>moavia_eilago [CD0313]</td>
                            <td>116.092</td>
                            <td>0</td>
                            <td>116.092</td>
                            <td>BHD</td>
                            <td>ELECTRONIC FUND TRANSFER(EFT)</td>
                            <td>Booking done from CREDIMAX payment gateway.</td>
                          </tr>
                          <tr role="row" className="even">
                            <td className="sorting_1">
                              <div className="dateWrapper">
                                <div className="onlyDate">30 </div>
                                <div className="monthYear">
                                  {" "}
                                  Dec
                                  <br />
                                  2022{" "}
                                </div>
                              </div>
                            </td>
                            <td>Rcpt00000516</td>
                            <td>moavia_eilago [CD0313]</td>
                            <td>202.36</td>
                            <td>0</td>
                            <td>202.36</td>
                            <td>BHD</td>
                            <td>ELECTRONIC FUND TRANSFER(EFT)</td>
                            <td>Booking done from CREDIMAX payment gateway.</td>
                          </tr>
                          <tr role="row" className="odd">
                            <td className="sorting_1">
                              <div className="dateWrapper">
                                <div className="onlyDate">30 </div>
                                <div className="monthYear">
                                  {" "}
                                  Apr
                                  <br />
                                  2021{" "}
                                </div>
                              </div>
                            </td>
                            <td>Rcpt00000373</td>
                            <td>Vartak Holidazzle [CD0195]</td>
                            <td>1547.947</td>
                            <td>0</td>
                            <td>1547.947</td>
                            <td>INR</td>
                            <td>ELECTRONIC FUND TRANSFER(EFT)</td>
                            <td>Booking done from CREDIMAX payment gateway.</td>
                          </tr>
                          <tr role="row" className="even">
                            <td className="sorting_1">
                              <div className="dateWrapper">
                                <div className="onlyDate">30 </div>
                                <div className="monthYear">
                                  {" "}
                                  Apr
                                  <br />
                                  2021{" "}
                                </div>
                              </div>
                            </td>
                            <td>Rcpt00000374</td>
                            <td>Vartak Holidazzle [CD0195]</td>
                            <td>1560.239</td>
                            <td>0</td>
                            <td>1560.239</td>
                            <td>INR</td>
                            <td>ELECTRONIC FUND TRANSFER(EFT)</td>
                            <td>Booking done from CREDIMAX payment gateway.</td>
                          </tr>
                          <tr role="row" className="odd">
                            <td className="sorting_1">
                              <div className="dateWrapper">
                                <div className="onlyDate">30 </div>
                                <div className="monthYear">
                                  {" "}
                                  Apr
                                  <br />
                                  2021{" "}
                                </div>
                              </div>
                            </td>
                            <td>Rcpt00000375</td>
                            <td>qtech [CD0282]</td>
                            <td>1560.239</td>
                            <td>0</td>
                            <td>1560.239</td>
                            <td>INR</td>
                            <td>ELECTRONIC FUND TRANSFER(EFT)</td>
                            <td>Booking done from CREDIMAX payment gateway.</td>
                          </tr>
                          <tr role="row" className="even">
                            <td className="sorting_1">
                              <div className="dateWrapper">
                                <div className="onlyDate">30 </div>
                                <div className="monthYear">
                                  {" "}
                                  Apr
                                  <br />
                                  2021{" "}
                                </div>
                              </div>
                            </td>
                            <td>Rcpt00000376</td>
                            <td>qtech [CD0282]</td>
                            <td>16834.062</td>
                            <td>0</td>
                            <td>16834.062</td>
                            <td>INR</td>
                            <td>ELECTRONIC FUND TRANSFER(EFT)</td>
                            <td>Booking done from CREDIMAX payment gateway.</td>
                          </tr>
                          <tr role="row" className="odd">
                            <td className="sorting_1">
                              <div className="dateWrapper">
                                <div className="onlyDate">30 </div>
                                <div className="monthYear">
                                  {" "}
                                  Apr
                                  <br />
                                  2021{" "}
                                </div>
                              </div>
                            </td>
                            <td>Rcpt00000377</td>
                            <td>qtech [CD0282]</td>
                            <td>16289.896</td>
                            <td>0</td>
                            <td>16289.896</td>
                            <td>INR</td>
                            <td>ELECTRONIC FUND TRANSFER(EFT)</td>
                            <td>Booking done from CREDIMAX payment gateway.</td>
                          </tr>
                          <tr role="row" className="even">
                            <td className="sorting_1">
                              <div className="dateWrapper">
                                <div className="onlyDate">30 </div>
                                <div className="monthYear">
                                  {" "}
                                  Apr
                                  <br />
                                  2021{" "}
                                </div>
                              </div>
                            </td>
                            <td>Rcpt00000378</td>
                            <td>qtech [CD0282]</td>
                            <td>123051.906</td>
                            <td>-0.001</td>
                            <td>123051.907</td>
                            <td>INR</td>
                            <td>ELECTRONIC FUND TRANSFER(EFT)</td>
                            <td>Booking done from CREDIMAX payment gateway.</td>
                          </tr>
                          <tr role="row" className="odd">
                            <td className="sorting_1">
                              <div className="dateWrapper">
                                <div className="onlyDate">29 </div>
                                <div className="monthYear">
                                  {" "}
                                  May
                                  <br />
                                  2023{" "}
                                </div>
                              </div>
                            </td>
                            <td>Rcpt00000525</td>
                            <td>sqtech [CD0291]</td>
                            <td>137.168</td>
                            <td>0</td>
                            <td>137.168</td>
                            <td>SAR</td>
                            <td>ELECTRONIC FUND TRANSFER(EFT)</td>
                            <td>Booking done from CREDIMAX payment gateway.</td>
                          </tr>
                          <tr role="row" className="even">
                            <td className="sorting_1">
                              <div className="dateWrapper">
                                <div className="onlyDate">29 </div>
                                <div className="monthYear">
                                  {" "}
                                  Jun
                                  <br />
                                  2021{" "}
                                </div>
                              </div>
                            </td>
                            <td>CN00000062</td>
                            <td>sayali [CA0276]</td>
                            <td>591.325</td>
                            <td>591.325</td>
                            <td>0</td>
                            <td>INR</td>
                            <td />
                            <td>
                              Credit Note for :- TD1128871 Booking
                              Modified&lt;br&gt;ddddd
                            </td>
                          </tr>
                          <tr role="row" className="odd">
                            <td className="sorting_1">
                              <div className="dateWrapper">
                                <div className="onlyDate">29 </div>
                                <div className="monthYear">
                                  {" "}
                                  Apr
                                  <br />
                                  2021{" "}
                                </div>
                              </div>
                            </td>
                            <td>Rcpt00000370</td>
                            <td>qtech [CD0282]</td>
                            <td>1724.13</td>
                            <td>0</td>
                            <td>1724.13</td>
                            <td>INR</td>
                            <td>ELECTRONIC FUND TRANSFER(EFT)</td>
                            <td>Booking done from CREDIMAX payment gateway.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div
                  className="form-group no-result"
                  style={{ display: "none" }}
                >
                  <h5 className="text-center">No Records Found!!</h5>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default ReportsAccountsAgentReciepts;
