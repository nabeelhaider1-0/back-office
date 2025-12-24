import React, { useState } from "react"; // Import React and useState
import Flatpickr from "react-flatpickr";

import { Link } from "react-router-dom";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";
import MultiSelect from "../reactMultiSelect";
import {
  paymentModeOptionss,
  paymentTypeOptions,
  supplierOptions,
} from "../../constants/contants";

const AccountsSuppliersPaymentSearch = () => {
  const [startDate, setStartDate] = useState(null); // State for the start date
  const [endDate, setEndDate] = useState(null);
  const handleTrashClick = () => {
    // Function to clear both start and end dates
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <Header2
          title="SEARCH PAYMENT"
          linkText1="Search Payment"
          linkText2="Add Payment"
          link2={Constants.URLConstants.ACCOUNTSSUPPLIERSPAYMENTNEW}
        />

        <div>
          <form>
            <div className="row">
              <div className="col-md-2 form-group">
                <label>Document #</label>
                <input
                  type="text"
                  className="form-control form-control-sm colPos test123"
                  name="search_id"
                />
              </div>
              <div className="col-md-2 form-group">
                <label>Supplier</label>
                <MultiSelect
                  options={supplierOptions}
                  isSearchable
                  placeholder="- Select Supplier-"
                  noOptionsMessage={() => "No Supplier Found"}
                  className="custom-select"
                />
              </div>
              <div className="col-md-2 form-group">
                <label>Payment Mode</label>
                <MultiSelect
                  options={paymentModeOptionss}
                  isSearchable
                  placeholder="- Select Payment-"
                  noOptionsMessage={() => "No Payment Found"}
                  className="custom-select "
                />
              </div>
              <div className="col-md-2 form-group">
                <label>Supplier Confirmation Number</label>
                <input
                  className="form-control form-control-sm colPos"
                  type="text"
                  name="supplier_reference_number"
                />
              </div>
              <div className="col-md-3 form-group">
                <label>Payment Date</label>
                <div
                  className="input-group date input-daterange"
                  id="receiptDate"
                >
                  <Flatpickr
                    value={startDate}
                    onChange={(date) => setStartDate(date)}
                    options={{ dateFormat: "Y-m-d" }}
                  />
                  <span className="input-group-addon">to</span>
                  <Flatpickr
                    value={endDate}
                    onChange={(date) => setEndDate(date)}
                    options={{ dateFormat: "Y-m-d" }}
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
              <div className="col-md-2 form-group">
                <label>Payments Amount</label>
                <input
                  type="text"
                  className="form-control form-control-sm   colPos"
                  name="search_payments"
                />
              </div>
              <div className="form-group col-md-2">
                <label>Payment Type</label>
                <MultiSelect
                  options={paymentTypeOptions}
                  isSearchable
                  placeholder="- Select Payment Type-"
                  noOptionsMessage={() => "No Payment Type Found"}
                  className="custom-select "
                />
              </div>
            </div>
            <br />
            {/*2nd Row*/}
            <div className="row">
              <div className="col-md-3 form-group">
                <button
                  className="btn btn-dark btn-sm"
                  type="submit"
                  name="submit"
                  value="search"
                >
                  <i className="fa fa-search" /> Search
                </button>
              </div>
            </div>
          </form>
          <br />
          <form>
            {/*5th Row*/}
            <div className="row">
              <div className="col-md-4 form-group">
                <div className="col-md-3 form-group mt-3">
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                    style={{ color: "#fff !important" }}
                    id="download_excel"
                  >
                    <i className="fa fa-file-excel-o" />
                    &nbsp;Download
                  </button>
                </div>
              </div>
              <div className="col-md-5 form-group">
                {/*Pagination panel*/}
                <nav aria-label="Page navigation example">
                  <ul className="pagination pagination-sm justify-content-center mt-4">
                    <li className="page-item">
                      <Link className="page-link" to="#" aria-label="Previous">
                        <span aria-hidden="true">«FIRST</span>
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link className="page-link" to="#" aria-label="Previous">
                        <span aria-hidden="true">«PREVIOUS</span>
                      </Link>
                    </li>
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
                        <span aria-hidden="true">NEXT»</span>
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link className="page-link" to="#" aria-label="Next">
                        <span aria-hidden="true">LAST»</span>
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="col-md-3 form-group">
                <style
                  dangerouslySetInnerHTML={{
                    __html:
                      "\n            .table tr[visible='false'],\n            .no-result {\n              display: none;\n              border: 1px solid #ddd;\n              padding: 10px;\n              margin-top: -2px;\n            }\n\n            .table tr[visible='true'] {\n              display: table-row;\n            }\n\n            .counter {\n              padding: 8px;\n              color: #ccc;\n            }\n\n            .search_new {\n              float: right;\n              height: 35px;\n              margin-bottom: 0px;\n              padding-left: 5px;\n            }\n          ",
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
            {/* Table Creation */}
            <div className="col-md-12">
              <div
                className="doubleScroll-scroll-wrapper"
                id="wrapper1"
                style={{
                  height: "20px",
                  overflow: "scroll hidden",
                  width: "1290px",
                }}
              >
                <div
                  className="suwala-doubleScroll-scroll"
                  style={{ height: "20px", width: "1290px" }}
                />
              </div>
              <div id="wrapper2" style={{ overflow: "auto" }}>
                <table
                  id="search_sup"
                  className="table   table-responsive dataTable no-footer table-bordered"
                  aria-describedby="search_sup_info"
                  role="grid"
                >
                  <thead>
                    <tr role="row">
                      <th
                        className="sorting"
                        tabIndex={0}
                        aria-controls="search_sup"
                        rowSpan={1}
                        colSpan={1}
                        style={{ width: "124px" }}
                        aria-label="Document #: activate to sort column ascending"
                      >
                        Document #
                      </th>
                      <th
                        className="sorting"
                        tabIndex={0}
                        aria-controls="search_sup"
                        rowSpan={1}
                        colSpan={1}
                        style={{ width: "65px" }}
                        aria-label="Booking Id: activate to sort column ascending"
                      >
                        Booking Id
                      </th>
                      <th
                        className="sorting"
                        tabIndex={0}
                        aria-controls="search_sup"
                        rowSpan={1}
                        colSpan={1}
                        style={{ width: "113px" }}
                        aria-label="Supplier: activate to sort column ascending"
                      >
                        Supplier
                      </th>
                      <th
                        className="sorting_desc"
                        tabIndex={0}
                        aria-controls="search_sup"
                        rowSpan={1}
                        colSpan={1}
                        style={{ width: "133px" }}
                        aria-sort="descending"
                        aria-label="Supplier Confirmation #: activate to sort column ascending"
                      >
                        Supplier Confirmation #
                      </th>
                      <th
                        className="sorting"
                        tabIndex={0}
                        aria-controls="search_sup"
                        rowSpan={1}
                        colSpan={1}
                        style={{ width: "88px" }}
                        aria-label="Payment Mode: activate to sort column ascending"
                      >
                        Payment Mode
                      </th>
                      <th
                        className="sorting"
                        tabIndex={0}
                        aria-controls="search_sup"
                        rowSpan={1}
                        colSpan={1}
                        style={{ width: "77px" }}
                        aria-label="Payment Type: activate to sort column ascending"
                      >
                        Payment Type
                      </th>
                      <th
                        className="sorting"
                        tabIndex={0}
                        aria-controls="search_sup"
                        rowSpan={1}
                        colSpan={1}
                        style={{ width: "77px" }}
                        aria-label="Payment Date: activate to sort column ascending"
                      >
                        Payment Date
                      </th>
                      <th
                        className="sorting"
                        tabIndex={0}
                        aria-controls="search_sup"
                        rowSpan={1}
                        colSpan={1}
                        style={{ width: "77px" }}
                        aria-label="Payments&nbsp;: activate to sort column ascending"
                      >
                        Payments&nbsp;
                      </th>
                      <th
                        className="sorting"
                        tabIndex={0}
                        aria-controls="search_sup"
                        rowSpan={1}
                        colSpan={1}
                        style={{ width: "124px" }}
                        aria-label="Un-allocated Payment&nbsp;: activate to sort column ascending"
                      >
                        Un-allocated Payment&nbsp;
                      </th>
                      <th
                        className="sorting_disabled"
                        rowSpan={1}
                        colSpan={1}
                        style={{ width: "87px" }}
                        aria-label="Actions"
                      >
                        Actions
                      </th>
                      <th
                        className="sorting"
                        tabIndex={0}
                        aria-controls="search_sup"
                        rowSpan={1}
                        colSpan={1}
                        style={{ width: "83px" }}
                        aria-label="Created By: activate to sort column ascending"
                      >
                        Created By
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    <tr role="row" className="odd">
                      <td>2021/11355</td>
                      <td>27954</td>
                      <td>Sabre Flight (BHD)</td>
                      <td className="sorting_1">SVVVFT</td>
                      <td>Debit Note</td>
                      <td>debit_note</td>
                      <td>
                        <div className="dateWrapper">
                          <div className="onlyDate">22 </div>
                          <div className="monthYear">
                            {" "}
                            2<br />
                            2021{" "}
                          </div>
                        </div>
                      </td>
                      <td>10.000</td>
                      <td>10.000</td>
                      <td>
                        <div className="actionCont">
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              data-toggle="tooltip"
                              data-original-title="Edit"
                              data-placement="top"
                              to={
                                Constants.URLConstants
                                  .ACCOUNTSSUPPLIERSPAYMENTEDIT
                              }
                            >
                              {" "}
                              <i className="fa fa-pencil-square-o" />{" "}
                            </Link>{" "}
                          </div>
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              to={
                                Constants.URLConstants
                                  .ACCOUNTSSUPPLIERSPAYMENTVIEW
                              }
                              data-toggle="tooltip"
                              data-original-title="View"
                              data-placement="top"
                            >
                              {" "}
                              <i className="fa fa-eye" />{" "}
                            </Link>{" "}
                          </div>
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              to={
                                Constants.URLConstants
                                  .ACCOUNTSSUPPLIERSPAYMENTALLOCATION
                              }
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Booking Allocation"
                            >
                              {" "}
                              <i className="fa fa-pie-chart text-info" />{" "}
                            </Link>{" "}
                          </div>
                        </div>
                      </td>
                      <td>v3otramslive</td>
                    </tr>
                    <tr role="row" className="even">
                      <td>debit_note000002028</td>
                      <td>27581</td>
                      <td>Sabre Flight (BHD)</td>
                      <td className="sorting_1">RXMYMG</td>
                      <td>Debit Note</td>
                      <td>debit_note</td>
                      <td>
                        <div className="dateWrapper">
                          <div className="onlyDate">16 </div>
                          <div className="monthYear">
                            {" "}
                            1<br />
                            2021{" "}
                          </div>
                        </div>
                      </td>
                      <td>4.200</td>
                      <td>4.200</td>
                      <td>
                        <div className="actionCont">
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              data-toggle="tooltip"
                              data-original-title="Edit"
                              data-placement="top"
                              to="AccountsSuppliersPaymentsedit.html"
                            >
                              {" "}
                              <i className="fa fa-pencil-square-o" />{" "}
                            </Link>{" "}
                          </div>
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              to="AccountsSuppliersPaymentsview.html"
                              data-toggle="tooltip"
                              data-original-title="View"
                              data-placement="top"
                            >
                              {" "}
                              <i className="fa fa-eye" />
                            </Link>{" "}
                          </div>
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              to="AccountsSuppliersPaymentsAllocation.html"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Booking Allocation"
                            >
                              {" "}
                              <i className="fa fa-pie-chart text-info" />{" "}
                            </Link>{" "}
                          </div>
                        </div>
                      </td>
                      <td>v3otramslive</td>
                    </tr>
                    <tr role="row" className="odd">
                      <td>Pmt000002055</td>
                      <td>27554</td>
                      <td>Sabre Flight (BHD)</td>
                      <td className="sorting_1">QXVDNI</td>
                      <td>Cash</td>
                      <td>payment</td>
                      <td>
                        <div className="dateWrapper">
                          <div className="onlyDate">12 </div>
                          <div className="monthYear">
                            {" "}
                            1<br />
                            2021{" "}
                          </div>
                        </div>
                      </td>
                      <td>61.000</td>
                      <td>0.400</td>
                      <td>
                        <div className="actionCont">
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              data-toggle="tooltip"
                              data-original-title="Edit"
                              data-placement="top"
                              to="AccountsSuppliersPaymentsedit.html"
                            >
                              {" "}
                              <i className="fa fa-pencil-square-o" />{" "}
                            </Link>{" "}
                          </div>
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              to="AccountsSuppliersPaymentsview. html"
                              data-toggle="tooltip"
                              data-original-title="View"
                              data-placement="top"
                            >
                              {" "}
                              <i className="fa fa-eye" />
                            </Link>{" "}
                          </div>
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              to="AccountsSuppliersPaymentsAllocation.html"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Booking Allocation"
                            >
                              {" "}
                              <i className="fa fa-pie-chart text-info" />{" "}
                            </Link>{" "}
                          </div>
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Delete"
                              to="javascript confirm_del('controller.php?page=payment&action=delete&id=46');"
                            >
                              <i className="fa fa-trash" />{" "}
                            </Link>{" "}
                          </div>
                        </div>
                      </td>
                      <td>v3otramslive</td>
                    </tr>
                    <tr role="row" className="even">
                      <td>debit_note000002021</td>
                      <td>27554</td>
                      <td>Sabre Flight (BHD)</td>
                      <td className="sorting_1">QXVDNI</td>
                      <td>Debit Note</td>
                      <td>debit_note</td>
                      <td>
                        <div className="dateWrapper">
                          <div className="onlyDate">12 </div>
                          <div className="monthYear">
                            {" "}
                            1<br />
                            2021{" "}
                          </div>
                        </div>
                      </td>
                      <td>10.600</td>
                      <td>10.600</td>
                      <td>
                        <div className="actionCont">
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              data-toggle="tooltip"
                              data-original-title="Edit"
                              data-placement="top"
                              to="AccountsSuppliersPaymentsedit.html"
                            >
                              {" "}
                              <i className="fa fa-pencil-square-o" />{" "}
                            </Link>{" "}
                          </div>
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              to="AccountsSuppliersPaymentsview. html"
                              data-toggle="tooltip"
                              data-original-title="View"
                              data-placement="top"
                            >
                              {" "}
                              <i className="fa fa-eye" />
                            </Link>{" "}
                          </div>
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              to="AccountsSuppliersPaymentsAllocation.html"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Booking Allocation"
                            >
                              {" "}
                              <i className="fa fa-pie-chart text-info" />{" "}
                            </Link>{" "}
                          </div>
                        </div>
                      </td>
                      <td>v3otramslive</td>
                    </tr>
                    <tr role="row" className="odd">
                      <td>debit_note000002025</td>
                      <td>27558</td>
                      <td>Sabre Flight (BHD)</td>
                      <td className="sorting_1">GMQLRV</td>
                      <td>Debit Note</td>
                      <td>debit_note</td>
                      <td>
                        <div className="dateWrapper">
                          <div className="onlyDate">12 </div>
                          <div className="monthYear">
                            {" "}
                            1<br />
                            2021{" "}
                          </div>
                        </div>
                      </td>
                      <td>2.700</td>
                      <td>2.700</td>
                      <td>
                        <div className="actionCont">
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              data-toggle="tooltip"
                              data-original-title="Edit"
                              data-placement="top"
                              to="AccountsSuppliersPaymentsedit.html"
                            >
                              {" "}
                              <i className="fa fa-pencil-square-o" />{" "}
                            </Link>{" "}
                          </div>
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              to="AccountsSuppliersPaymentsview. html"
                              data-toggle="tooltip"
                              data-original-title="View"
                              data-placement="top"
                            >
                              {" "}
                              <i className="fa fa-eye" />
                            </Link>{" "}
                          </div>
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              to="AccountsSuppliersPaymentsAllocation.html"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Booking Allocation"
                            >
                              {" "}
                              <i className="fa fa-pie-chart text-info" />{" "}
                            </Link>{" "}
                          </div>
                        </div>
                      </td>
                      <td>v3otramslive</td>
                    </tr>
                    <tr role="row" className="even">
                      <td>debit_note000002026</td>
                      <td>27558</td>
                      <td>Sabre Flight (BHD)</td>
                      <td className="sorting_1">GMQLRV</td>
                      <td>Debit Note</td>
                      <td>debit_note</td>
                      <td>
                        <div className="dateWrapper">
                          <div className="onlyDate">12 </div>
                          <div className="monthYear">
                            {" "}
                            1<br />
                            2021{" "}
                          </div>
                        </div>
                      </td>
                      <td>6.000</td>
                      <td>6.000</td>
                      <td>
                        <div className="actionCont">
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              data-toggle="tooltip"
                              data-original-title="Edit"
                              data-placement="top"
                              to="AccountsSuppliersPaymentsedit.html"
                            >
                              {" "}
                              <i className="fa fa-pencil-square-o" />{" "}
                            </Link>{" "}
                          </div>
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              to="AccountsSuppliersPaymentsview. html"
                              data-toggle="tooltip"
                              data-original-title="View"
                              data-placement="top"
                            >
                              {" "}
                              <i className="fa fa-eye" />
                            </Link>{" "}
                          </div>
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              to="AccountsSuppliersPaymentsAllocation.html"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Booking Allocation"
                            >
                              {" "}
                              <i className="fa fa-pie-chart text-info" />{" "}
                            </Link>{" "}
                          </div>
                        </div>
                      </td>
                      <td>v3otramslive</td>
                    </tr>
                    <tr role="row" className="odd">
                      <td>debit_note000002022</td>
                      <td>27562</td>
                      <td>Sabre Flight (BHD)</td>
                      <td className="sorting_1">EHVIPX</td>
                      <td>Debit Note</td>
                      <td>debit_note</td>
                      <td>
                        <div className="dateWrapper">
                          <div className="onlyDate">12 </div>
                          <div className="monthYear">
                            {" "}
                            1<br />
                            2021{" "}
                          </div>
                        </div>
                      </td>
                      <td>6.000</td>
                      <td>6.000</td>
                      <td>
                        <div className="actionCont">
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              data-toggle="tooltip"
                              data-original-title="Edit"
                              data-placement="top"
                              to="AccountsSuppliersPaymentsedit.html"
                            >
                              {" "}
                              <i className="fa fa-pencil-square-o" />{" "}
                            </Link>{" "}
                          </div>
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              to="AccountsSuppliersPaymentsview. html"
                              data-toggle="tooltip"
                              data-original-title="View"
                              data-placement="top"
                            >
                              {" "}
                              <i className="fa fa-eye" />
                            </Link>{" "}
                          </div>
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              to="AccountsSuppliersPaymentsAllocation.html"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Booking Allocation"
                            >
                              {" "}
                              <i className="fa fa-pie-chart text-info" />{" "}
                            </Link>{" "}
                          </div>
                        </div>
                      </td>
                      <td>v3otramslive</td>
                    </tr>
                    <tr role="row" className="even">
                      <td>Pmt000002109</td>
                      <td>TD1728884</td>
                      <td>TDO Visa DMCC (INR)</td>
                      <td className="sorting_1">C123</td>
                      <td>Cash</td>
                      <td>payment</td>
                      <td>
                        <div className="dateWrapper">
                          <div className="onlyDate">14 </div>
                          <div className="monthYear">
                            {" "}
                            10
                            <br />
                            2021{" "}
                          </div>
                        </div>
                      </td>
                      <td>2000.000</td>
                      <td>0.000</td>
                      <td>
                        <div className="actionCont">
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              data-toggle="tooltip"
                              data-original-title="Edit"
                              data-placement="top"
                              to="AccountsSuppliersPaymentsedit.html"
                            >
                              <i className="fa fa-pencil-square-o" />{" "}
                            </Link>{" "}
                          </div>
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              to="AccountsSuppliersPaymentsview. html"
                              data-toggle="tooltip"
                              data-original-title="View"
                              data-placement="top"
                            >
                              {" "}
                              <i className="fa fa-eye" />
                            </Link>{" "}
                          </div>
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              to="AccountsSuppliersPaymentsAllocation.html"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Booking Allocation"
                            >
                              {" "}
                              <i className="fa fa-pie-chart" />{" "}
                            </Link>{" "}
                          </div>
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Delete"
                              to="javascript confirm_del('controller.php?page=payment&action=delete&id=109');"
                            >
                              <i className="fa fa-trash" />{" "}
                            </Link>{" "}
                          </div>
                        </div>
                      </td>
                      <td>v3otramslive</td>
                    </tr>
                    <tr role="row" className="odd">
                      <td>2021/12102</td>
                      <td>TD1728884</td>
                      <td>TDO Visa DMCC (INR)</td>
                      <td className="sorting_1">C123</td>
                      <td>Debit Note</td>
                      <td>debit_note</td>
                      <td>
                        <div className="dateWrapper">
                          <div className="onlyDate">13 </div>
                          <div className="monthYear">
                            {" "}
                            10
                            <br />
                            2021{" "}
                          </div>
                        </div>
                      </td>
                      <td>2000.000</td>
                      <td>2000.000</td>
                      <td>
                        <div className="actionCont">
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              data-toggle="tooltip"
                              data-original-title="Edit"
                              data-placement="top"
                              to="AccountsSuppliersPaymentsedit.html"
                            >
                              <i className="fa fa-pencil-square-o" />{" "}
                            </Link>{" "}
                          </div>
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              to="AccountsSuppliersPaymentsview. html"
                              data-toggle="tooltip"
                              data-original-title="View"
                              data-placement="top"
                            >
                              {" "}
                              <i className="fa fa-eye" />
                            </Link>{" "}
                          </div>
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              to="AccountsSuppliersPaymentsAllocation.html"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Booking Allocation"
                            >
                              {" "}
                              <i className="fa fa-pie-chart text-info" />{" "}
                            </Link>{" "}
                          </div>
                        </div>
                      </td>
                      <td>v3otramslive</td>
                    </tr>
                    <tr role="row" className="even">
                      <td>debit_note000002023</td>
                      <td>27559</td>
                      <td>Sabre Flight (BHD)</td>
                      <td className="sorting_1">ANBPEJ</td>
                      <td>Debit Note</td>
                      <td>debit_note</td>
                      <td>
                        <div className="dateWrapper">
                          <div className="onlyDate">12 </div>
                          <div className="monthYear">
                            {" "}
                            1<br />
                            2021{" "}
                          </div>
                        </div>
                      </td>
                      <td>4.000</td>
                      <td>4.000</td>
                      <td>
                        <div className="actionCont">
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              data-toggle="tooltip"
                              data-original-title="Edit"
                              data-placement="top"
                              to="AccountsSuppliersPaymentsedit.html"
                            >
                              {" "}
                              <i className="fa fa-pencil-square-o" />{" "}
                            </Link>{" "}
                          </div>
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              to="AccountsSuppliersPaymentsview.html"
                              data-toggle="tooltip"
                              data-original-title="View"
                              data-placement="top"
                            >
                              {" "}
                              <i className="fa fa-eye" />
                            </Link>{" "}
                          </div>
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              to="AccountsSuppliersPaymentsAllocation.html"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Booking Allocation"
                            >
                              {" "}
                              <i className="fa fa-pie-chart text-info" />{" "}
                            </Link>{" "}
                          </div>
                        </div>
                      </td>
                      <td>v3otramslive</td>
                    </tr>
                    <tr role="row" className="odd">
                      <td>debit_note000002024</td>
                      <td>27559</td>
                      <td>Sabre Flight (BHD)</td>
                      <td className="sorting_1">ANBPEJ</td>
                      <td>Debit Note</td>
                      <td>debit_note</td>
                      <td>
                        <div className="dateWrapper">
                          <div className="onlyDate">12 </div>
                          <div className="monthYear">
                            {" "}
                            1<br />
                            2021{" "}
                          </div>
                        </div>
                      </td>
                      <td>1.000</td>
                      <td>1.000</td>
                      <td>
                        <div className="actionCont">
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              data-toggle="tooltip"
                              data-original-title="Edit"
                              data-placement="top"
                              to="javascriptedit_payment('sabre','50','1.000','online','BHD');"
                            >
                              {" "}
                              <i className="fa fa-pencil-square-o" />{" "}
                            </Link>{" "}
                          </div>
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              to="controller.php?page=payment&action=view&id=50"
                              data-toggle="tooltip"
                              data-original-title="View"
                              data-placement="top"
                            >
                              {" "}
                              <i className="fa fa-eye" />
                            </Link>{" "}
                          </div>
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              to="javascriptpayments_booking_allocation('sabre','50','1.000','online','BHD','debit_note');"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Booking Allocation"
                            >
                              {" "}
                              <i className="fa fa-pie-chart text-info" />{" "}
                            </Link>{" "}
                          </div>
                        </div>
                      </td>
                      <td>v3otramslive</td>
                    </tr>
                    <tr role="row" className="even">
                      <td>debit_note000002027</td>
                      <td>27557</td>
                      <td>Sabre Flight (BHD)</td>
                      <td className="sorting_1">AMVTSV</td>
                      <td>Debit Note</td>
                      <td>debit_note</td>
                      <td>
                        <div className="dateWrapper">
                          <div className="onlyDate">12 </div>
                          <div className="monthYear">
                            {" "}
                            1<br />
                            2021{" "}
                          </div>
                        </div>
                      </td>
                      <td>4.000</td>
                      <td>4.000</td>
                      <td>
                        <div className="actionCont">
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              data-toggle="tooltip"
                              data-original-title="Edit"
                              data-placement="top"
                              to="javascriptedit_payment('sabre','53','4.000','online','BHD');"
                            >
                              {" "}
                              <i className="fa fa-pencil-square-o" />{" "}
                            </Link>{" "}
                          </div>
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              to="controller.php?page=payment&action=view&id=53"
                              data-toggle="tooltip"
                              data-original-title="View"
                              data-placement="top"
                            >
                              {" "}
                              <i className="fa fa-eye" />
                            </Link>{" "}
                          </div>
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              to="javascriptpayments_booking_allocation('sabre','53','4.000','online','BHD','debit_note');"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Booking Allocation"
                            >
                              {" "}
                              <i className="fa fa-pie-chart text-info" />{" "}
                            </Link>{" "}
                          </div>
                        </div>
                      </td>
                      <td>v3otramslive</td>
                    </tr>
                    <tr role="row" className="odd">
                      <td>Pmt000002054</td>
                      <td>27555</td>
                      <td>Sabre Flight (BHD)</td>
                      <td className="sorting_1">ALJGTT</td>
                      <td>Cash</td>
                      <td>payment</td>
                      <td>
                        <div className="dateWrapper">
                          <div className="onlyDate">12 </div>
                          <div className="monthYear">
                            {" "}
                            1<br />
                            2021{" "}
                          </div>
                        </div>
                      </td>
                      <td>66.000</td>
                      <td>0.000</td>
                      <td>
                        <div className="actionCont">
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              data-toggle="tooltip"
                              data-original-title="Edit"
                              data-placement="top"
                              to="javascriptedit_payment('sabre','44','66.000','online','BHD');"
                            >
                              {" "}
                              <i className="fa fa-pencil-square-o" />{" "}
                            </Link>{" "}
                          </div>
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              to="controller.php?page=payment&action=view&id=44"
                              data-toggle="tooltip"
                              data-original-title="View"
                              data-placement="top"
                            >
                              {" "}
                              <i className="fa fa-eye" />
                            </Link>{" "}
                          </div>
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              to="javascriptpayments_booking_allocation('sabre','44','66.000','online','BHD','payment');"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Booking Allocation"
                            >
                              {" "}
                              <i className="fa fa-pie-chart" />{" "}
                            </Link>{" "}
                          </div>
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Delete"
                              to="javascript confirm_del('controller.php?page=payment&action=delete&id=44');"
                            >
                              <i className="fa fa-trash" />{" "}
                            </Link>{" "}
                          </div>
                        </div>
                      </td>
                      <td>v3otramslive</td>
                    </tr>
                    <tr role="row" className="even">
                      <td>debit_note000002020</td>
                      <td>27555</td>
                      <td>Sabre Flight (BHD)</td>
                      <td className="sorting_1">ALJGTT</td>
                      <td>Debit Note</td>
                      <td>debit_note</td>
                      <td>
                        <div className="dateWrapper">
                          <div className="onlyDate">12 </div>
                          <div className="monthYear">
                            {" "}
                            1<br />
                            2021{" "}
                          </div>
                        </div>
                      </td>
                      <td>6.000</td>
                      <td>6.000</td>
                      <td>
                        <div className="actionCont">
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              data-toggle="tooltip"
                              data-original-title="Edit"
                              data-placement="top"
                              to="javascriptedit_payment('sabre','45','6.000','online','BHD');"
                            >
                              {" "}
                              <i className="fa fa-pencil-square-o" />{" "}
                            </Link>{" "}
                          </div>
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              to="controller.php?page=payment&action=view&id=45"
                              data-toggle="tooltip"
                              data-original-title="View"
                              data-placement="top"
                            >
                              {" "}
                              <i className="fa fa-eye" />
                            </Link>{" "}
                          </div>
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              to="javascriptpayments_booking_allocation('sabre','45','6.000','online','BHD','debit_note');"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Booking Allocation"
                            >
                              {" "}
                              <i className="fa fa-pie-chart text-info" />{" "}
                            </Link>{" "}
                          </div>
                        </div>
                      </td>
                      <td>v3otramslive</td>
                    </tr>
                    <tr role="row" className="odd">
                      <td>Pmt000002038</td>
                      <td>03624</td>
                      <td>Agoda (USD)</td>
                      <td className="sorting_1">8295874</td>
                      <td>VCC</td>
                      <td>payment</td>
                      <td>
                        <div className="dateWrapper">
                          <div className="onlyDate">12 </div>
                          <div className="monthYear">
                            {" "}
                            12
                            <br />
                            2019{" "}
                          </div>
                        </div>
                      </td>
                      <td>75.460</td>
                      <td>0.000</td>
                      <td>
                        <div className="actionCont">
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              data-toggle="tooltip"
                              data-original-title="Edit"
                              data-placement="top"
                              to="javascriptedit_payment('agoda','28','75.460','online','USD');"
                            >
                              {" "}
                              <i className="fa fa-pencil-square-o" />{" "}
                            </Link>{" "}
                          </div>
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              to="controller.php?page=payment&action=view&id=28"
                              data-toggle="tooltip"
                              data-original-title="View"
                              data-placement="top"
                            >
                              {" "}
                              <i className="fa fa-eye" />
                            </Link>{" "}
                          </div>
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              to="javascriptpayments_booking_allocation('agoda','28','75.460','online','USD','payment');"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Booking Allocation"
                            >
                              {" "}
                              <i className="fa fa-pie-chart" />{" "}
                            </Link>{" "}
                          </div>
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Delete"
                              to="javascript confirm_del('controller.php?page=payment&action=delete&id=28');"
                            >
                              <i className="fa fa-trash" />{" "}
                            </Link>{" "}
                          </div>
                        </div>
                      </td>
                      <td />
                    </tr>
                    <tr role="row" className="even">
                      <td>Pmt000002027</td>
                      <td>03607</td>
                      <td>Agoda (USD)</td>
                      <td className="sorting_1">8295464</td>
                      <td>VCC</td>
                      <td>payment</td>
                      <td>
                        <div className="dateWrapper">
                          <div className="onlyDate">11 </div>
                          <div className="monthYear">
                            {" "}
                            12
                            <br />
                            2019{" "}
                          </div>
                        </div>
                      </td>
                      <td>26.280</td>
                      <td>0.000</td>
                      <td>
                        <div className="actionCont">
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              data-toggle="tooltip"
                              data-original-title="Edit"
                              data-placement="top"
                              to="javascriptedit_payment('agoda','17','26.280','online','USD');"
                            >
                              {" "}
                              <i className="fa fa-pencil-square-o" />{" "}
                            </Link>{" "}
                          </div>
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              to="controller.php?page=payment&action=view&id=17"
                              data-toggle="tooltip"
                              data-original-title="View"
                              data-placement="top"
                            >
                              {" "}
                              <i className="fa fa-eye" />
                            </Link>{" "}
                          </div>
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              to="javascriptpayments_booking_allocation('agoda','17','26.280','online','USD','payment');"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Booking Allocation"
                            >
                              {" "}
                              <i className="fa fa-pie-chart" />{" "}
                            </Link>{" "}
                          </div>
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Delete"
                              to="javascript confirm_del('controller.php?page=payment&action=delete&id=17');"
                            >
                              <i className="fa fa-trash" />{" "}
                            </Link>{" "}
                          </div>
                        </div>
                      </td>
                      <td />
                    </tr>
                    <tr role="row" className="odd">
                      <td>Pmt000002026</td>
                      <td>03605</td>
                      <td>Agoda (USD)</td>
                      <td className="sorting_1">8295149</td>
                      <td>VCC</td>
                      <td>payment</td>
                      <td>
                        <div className="dateWrapper">
                          <div className="onlyDate">10 </div>
                          <div className="monthYear">
                            {" "}
                            12
                            <br />
                            2019{" "}
                          </div>
                        </div>
                      </td>
                      <td>61.260</td>
                      <td>0.000</td>
                      <td>
                        <div className="actionCont">
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              data-toggle="tooltip"
                              data-original-title="Edit"
                              data-placement="top"
                              to="javascriptedit_payment('agoda','16','61.260','online','USD');"
                            >
                              {" "}
                              <i className="fa fa-pencil-square-o" />{" "}
                            </Link>{" "}
                          </div>
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              to="controller.php?page=payment&action=view&id=16"
                              data-toggle="tooltip"
                              data-original-title="View"
                              data-placement="top"
                            >
                              {" "}
                              <i className="fa fa-eye" />
                            </Link>{" "}
                          </div>
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              to="javascriptpayments_booking_allocation('agoda','16','61.260','online','USD','payment');"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Booking Allocation"
                            >
                              {" "}
                              <i className="fa fa-pie-chart" />{" "}
                            </Link>{" "}
                          </div>
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Delete"
                              to="javascript confirm_del('controller.php?page=payment&action=delete&id=16');"
                            >
                              <i className="fa fa-trash" />{" "}
                            </Link>{" "}
                          </div>
                        </div>
                      </td>
                      <td />
                    </tr>
                    <tr role="row" className="even">
                      <td>Pmt000002019</td>
                      <td>TD1802129</td>
                      <td>Dhisco (EUR)</td>
                      <td className="sorting_1">482395966588</td>
                      <td>VCC</td>
                      <td>payment</td>
                      <td>
                        <div className="dateWrapper">
                          <div className="onlyDate">02 </div>
                          <div className="monthYear">
                            {" "}
                            5<br />
                            2019{" "}
                          </div>
                        </div>
                      </td>
                      <td>120.000</td>
                      <td>0.000</td>
                      <td>
                        <div className="actionCont">
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              data-toggle="tooltip"
                              data-original-title="Edit"
                              data-placement="top"
                              to="javascriptedit_payment('dhisco_rotana','7','120.000','online','EUR');"
                            >
                              <i className="fa fa-pencil-square-o" />{" "}
                            </Link>{" "}
                          </div>
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              to="controller.php?page=payment&action=view&id=7"
                              data-toggle="tooltip"
                              data-original-title="View"
                              data-placement="top"
                            >
                              {" "}
                              <i className="fa fa-eye" />
                            </Link>{" "}
                          </div>
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              to="javascriptpayments_booking_allocation('dhisco_rotana','7','120.000','online','EUR','payment');"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Booking Allocation"
                            >
                              {" "}
                              <i className="fa fa-pie-chart" />{" "}
                            </Link>{" "}
                          </div>
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Delete"
                              to="javascript confirm_del('controller.php?page=payment&action=delete&id=7');"
                            >
                              <i className="fa fa-trash" />{" "}
                            </Link>{" "}
                          </div>
                        </div>
                      </td>
                      <td />
                    </tr>
                    <tr role="row" className="odd">
                      <td>Pmt000002106</td>
                      <td>TD828827</td>
                      <td>Sayali_Qtech (INR)</td>
                      <td className="sorting_1">343434</td>
                      <td>VCC</td>
                      <td>payment</td>
                      <td>
                        <div className="dateWrapper">
                          <div className="onlyDate">08 </div>
                          <div className="monthYear">
                            {" "}
                            6<br />
                            2021{" "}
                          </div>
                        </div>
                      </td>
                      <td>200.000</td>
                      <td>0.000</td>
                      <td>
                        <div className="actionCont">
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              data-toggle="tooltip"
                              data-original-title="Edit"
                              data-placement="top"
                              to="javascriptedit_payment('S000000883','106','200.000','local','INR');"
                            >
                              <i className="fa fa-pencil-square-o" />{" "}
                            </Link>{" "}
                          </div>
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              to="controller.php?page=payment&action=view&id=106"
                              data-toggle="tooltip"
                              data-original-title="View"
                              data-placement="top"
                            >
                              {" "}
                              <i className="fa fa-eye" />
                            </Link>{" "}
                          </div>
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              to="javascriptpayments_booking_allocation('S000000883','106','200.000','local','INR','payment');"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Booking Allocation"
                            >
                              {" "}
                              <i className="fa fa-pie-chart" />{" "}
                            </Link>{" "}
                          </div>
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Delete"
                              to="javascript confirm_del('controller.php?page=payment&action=delete&id=106');"
                            >
                              <i className="fa fa-trash" />{" "}
                            </Link>{" "}
                          </div>
                        </div>
                      </td>
                      <td>mainsamiksha</td>
                    </tr>
                    <tr role="row" className="even">
                      <td>Pmt000002107</td>
                      <td>TD828828</td>
                      <td>Sayali_Qtech (INR)</td>
                      <td className="sorting_1">343434</td>
                      <td>VCC</td>
                      <td>payment</td>
                      <td>
                        <div className="dateWrapper">
                          <div className="onlyDate">08 </div>
                          <div className="monthYear">
                            {" "}
                            6<br />
                            2021{" "}
                          </div>
                        </div>
                      </td>
                      <td>200.000</td>
                      <td>0.000</td>
                      <td>
                        <div className="actionCont">
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              data-toggle="tooltip"
                              data-original-title="Edit"
                              data-placement="top"
                              to="javascriptedit_payment('S000000883','107','200.000','local','INR');"
                            >
                              <i className="fa fa-pencil-square-o" />{" "}
                            </Link>{" "}
                          </div>
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              to="controller.php?page=payment&action=view&id=107"
                              data-toggle="tooltip"
                              data-original-title="View"
                              data-placement="top"
                            >
                              {" "}
                              <i className="fa fa-eye" />
                            </Link>{" "}
                          </div>
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              to="javascriptpayments_booking_allocation('S000000883','107','200.000','local','INR','payment');"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Booking Allocation"
                            >
                              {" "}
                              <i className="fa fa-pie-chart" />{" "}
                            </Link>{" "}
                          </div>
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Delete"
                              to="javascript confirm_del('controller.php?page=payment&action=delete&id=107');"
                            >
                              <i className="fa fa-trash" />{" "}
                            </Link>{" "}
                          </div>
                        </div>
                      </td>
                      <td>mainsamiksha</td>
                    </tr>
                    <tr role="row" className="odd">
                      <td>Pmt000002020</td>
                      <td>TD1802130</td>
                      <td>Dhisco (EUR)</td>
                      <td className="sorting_1">252394967452</td>
                      <td>VCC</td>
                      <td>payment</td>
                      <td>
                        <div className="dateWrapper">
                          <div className="onlyDate">02 </div>
                          <div className="monthYear">
                            {" "}
                            5<br />
                            2019{" "}
                          </div>
                        </div>
                      </td>
                      <td>120.000</td>
                      <td>0.000</td>
                      <td>
                        <div className="actionCont">
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              data-toggle="tooltip"
                              data-original-title="Edit"
                              data-placement="top"
                              to="javascriptedit_payment('dhisco_rotana','8','120.000','online','EUR');"
                            >
                              <i className="fa fa-pencil-square-o" />{" "}
                            </Link>{" "}
                          </div>
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              to="controller.php?page=payment&action=view&id=8"
                              data-toggle="tooltip"
                              data-original-title="View"
                              data-placement="top"
                            >
                              {" "}
                              <i className="fa fa-eye" />
                            </Link>{" "}
                          </div>
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              to="javascriptpayments_booking_allocation('dhisco_rotana','8','120.000','online','EUR','payment');"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Booking Allocation"
                            >
                              {" "}
                              <i className="fa fa-pie-chart" />{" "}
                            </Link>{" "}
                          </div>
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Delete"
                              to="javascript confirm_del('controller.php?page=payment&action=delete&id=8');"
                            >
                              <i className="fa fa-trash" />{" "}
                            </Link>{" "}
                          </div>
                        </div>
                      </td>
                      <td />
                    </tr>
                    <tr role="row" className="even">
                      <td>Pmt000002022</td>
                      <td>TD1103595</td>
                      <td>expedia (USD)</td>
                      <td className="sorting_1" />
                      <td>VCC</td>
                      <td>payment</td>
                      <td>
                        <div className="dateWrapper">
                          <div className="onlyDate">9 </div>
                          <div className="monthYear">
                            {" "}
                            12
                            <br />
                            2019{" "}
                          </div>
                        </div>
                      </td>
                      <td>67.700</td>
                      <td>0.000</td>
                      <td>
                        <div className="actionCont">
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              data-toggle="tooltip"
                              data-original-title="Edit"
                              data-placement="top"
                              to="javascriptedit_payment('expedia','12','67.700','online','USD');"
                            >
                              {" "}
                              <i className="fa fa-pencil-square-o" />{" "}
                            </Link>{" "}
                          </div>
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              to="controller.php?page=payment&action=view&id=12"
                              data-toggle="tooltip"
                              data-original-title="View"
                              data-placement="top"
                            >
                              {" "}
                              <i className="fa fa-eye" />
                            </Link>{" "}
                          </div>
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              to="javascriptpayments_booking_allocation('expedia','12','67.700','online','USD','payment');"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Booking Allocation"
                            >
                              {" "}
                              <i className="fa fa-pie-chart" />{" "}
                            </Link>{" "}
                          </div>
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Delete"
                              to="javascript confirm_del('controller.php?page=payment&action=delete&id=12');"
                            >
                              <i className="fa fa-trash" />{" "}
                            </Link>{" "}
                          </div>
                        </div>
                      </td>
                      <td />
                    </tr>
                    <tr role="row" className="odd">
                      <td>Pmt000002023</td>
                      <td>TD1103597</td>
                      <td>expedia (USD)</td>
                      <td className="sorting_1" />
                      <td>VCC</td>
                      <td>payment</td>
                      <td>
                        <div className="dateWrapper">
                          <div className="onlyDate">9 </div>
                          <div className="monthYear">
                            {" "}
                            12
                            <br />
                            2019{" "}
                          </div>
                        </div>
                      </td>
                      <td>70.380</td>
                      <td>0.000</td>
                      <td>
                        <div className="actionCont">
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              data-toggle="tooltip"
                              data-original-title="Edit"
                              data-placement="top"
                              to="javascriptedit_payment('expedia','13','70.380','online','USD');"
                            >
                              {" "}
                              <i className="fa fa-pencil-square-o" />{" "}
                            </Link>{" "}
                          </div>
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              to="controller.php?page=payment&action=view&id=13"
                              data-toggle="tooltip"
                              data-original-title="View"
                              data-placement="top"
                            >
                              {" "}
                              <i className="fa fa-eye" />
                            </Link>{" "}
                          </div>
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              to="javascriptpayments_booking_allocation('expedia','13','70.380','online','USD','payment');"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Booking Allocation"
                            >
                              {" "}
                              <i className="fa fa-pie-chart" />{" "}
                            </Link>{" "}
                          </div>
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Delete"
                              to="javascript confirm_del('controller.php?page=payment&action=delete&id=13');"
                            >
                              <i className="fa fa-trash" />{" "}
                            </Link>{" "}
                          </div>
                        </div>
                      </td>
                      <td />
                    </tr>
                    <tr role="row" className="even">
                      <td>Pmt000002024</td>
                      <td>03603</td>
                      <td>Agoda (USD)</td>
                      <td className="sorting_1" />
                      <td>VCC</td>
                      <td>payment</td>
                      <td>
                        <div className="dateWrapper">
                          <div className="onlyDate">10 </div>
                          <div className="monthYear">
                            {" "}
                            12
                            <br />
                            2019{" "}
                          </div>
                        </div>
                      </td>
                      <td>41.890</td>
                      <td>0.000</td>
                      <td>
                        <div className="actionCont">
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              data-toggle="tooltip"
                              data-original-title="Edit"
                              data-placement="top"
                              to="javascriptedit_payment('agoda','14','41.890','online','USD');"
                            >
                              {" "}
                              <i className="fa fa-pencil-square-o" />{" "}
                            </Link>{" "}
                          </div>
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              to="controller.php?page=payment&action=view&id=14"
                              data-toggle="tooltip"
                              data-original-title="View"
                              data-placement="top"
                            >
                              {" "}
                              <i className="fa fa-eye" />
                            </Link>{" "}
                          </div>
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              to="javascriptpayments_booking_allocation('agoda','14','41.890','online','USD','payment');"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Booking Allocation"
                            >
                              {" "}
                              <i className="fa fa-pie-chart" />{" "}
                            </Link>{" "}
                          </div>
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Delete"
                              to="javascript confirm_del('controller.php?page=payment&action=delete&id=14');"
                            >
                              <i className="fa fa-trash" />{" "}
                            </Link>{" "}
                          </div>
                        </div>
                      </td>
                      <td />
                    </tr>
                    <tr role="row" className="odd">
                      <td>Pmt000002025</td>
                      <td>03604</td>
                      <td>Agoda (USD)</td>
                      <td className="sorting_1" />
                      <td>VCC</td>
                      <td>payment</td>
                      <td>
                        <div className="dateWrapper">
                          <div className="onlyDate">10 </div>
                          <div className="monthYear">
                            {" "}
                            12
                            <br />
                            2019{" "}
                          </div>
                        </div>
                      </td>
                      <td>61.260</td>
                      <td>0.000</td>
                      <td>
                        <div className="actionCont">
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              data-toggle="tooltip"
                              data-original-title="Edit"
                              data-placement="top"
                              to="javascriptedit_payment('agoda','15','61.260','online','USD');"
                            >
                              {" "}
                              <i className="fa fa-pencil-square-o" />{" "}
                            </Link>{" "}
                          </div>
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              to="controller.php?page=payment&action=view&id=15"
                              data-toggle="tooltip"
                              data-original-title="View"
                              data-placement="top"
                            >
                              {" "}
                              <i className="fa fa-eye" />
                            </Link>{" "}
                          </div>
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              to="javascriptpayments_booking_allocation('agoda','15','61.260','online','USD','payment');"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Booking Allocation"
                            >
                              {" "}
                              <i className="fa fa-pie-chart" />{" "}
                            </Link>{" "}
                          </div>
                          <div className="input-group-addon">
                            {" "}
                            <Link
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Delete"
                              to="javascript confirm_del('controller.php?page=payment&action=delete&id=15');"
                            >
                              <i className="fa fa-trash" />{" "}
                            </Link>{" "}
                          </div>
                        </div>
                      </td>
                      <td />
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default AccountsSuppliersPaymentSearch;
