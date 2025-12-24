import React, { useState } from "react"; // Import React and useState
import Flatpickr from "react-flatpickr";
import { Link } from "react-router-dom";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";
import MultiSelect from "../reactMultiSelect";
import {
  add_options,
  agentSectionOptions,
  paymentModeOptions,
} from "../../constants/contants";

const AccountsAgentRecieptSearch = () => {
  const [startDate, setStartDate] = useState(null); // State for the start date
  const [endDate, setEndDate] = useState(null);
  const handleTrashClick = () => {
    // Function to clear both start and end dates
    setStartDate(null);
    setEndDate(null);
  };
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  const chkbxOptions = document.querySelectorAll(".select-option");

  const selectAllChkboxes = () => {
    const isChecked = !selectAllChecked;
    setSelectAllChecked(isChecked);

    chkbxOptions.forEach((checkbox) => {
      checkbox.checked = isChecked;
    });
  };

  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <Header2
          title="SEARCH RECEIPT"
          linkText1="Search Reciepts"
          linkText2="Add Reciepts"
          link1={Constants.URLConstants.ACCOUNTSAGENTRECIEPTNEW}
        />

        <div>
          <form>
            <div className="row">
              <div className="col-md-2 form-group">
                <label>Receipt #</label>
                <input
                  className="form-control form-control-sm test123"
                  type="text"
                  name="search_id"
                />
              </div>
              <div className="col-md-2 form-group">
                <label>Customer Profile Id</label>
                <input
                  className="form-control form-control-sm"
                  type="text"
                  name="customer_id"
                />
              </div>
              <div className="col-md-2 form-group">
                <label>Reference No</label>
                <input
                  className="form-control form-control-sm"
                  type="text"
                  name="system_reference"
                />
              </div>
              <div className="col-md-3 form-group">
                <label>Agent</label>
                <MultiSelect
                  options={agentSectionOptions}
                  isSearchable
                  placeholder="- Agent-"
                  noOptionsMessage={() => "No Agent Found"}
                  className="custom-select required"
                />
              </div>
              <div className="col-md-2 form-group">
                <label>Branches</label>
                <MultiSelect
                  options={add_options}
                  isSearchable
                  placeholder="- Select Branches -"
                  noOptionsMessage={() => "No Branches Found"}
                  className="custom-select"
                />
              </div>
              <div className="col-md-2 form-group mt-3">
                <label>Receipt Mode</label>
                <MultiSelect
                  options={paymentModeOptions}
                  isSearchable
                  placeholder="- Select Receipt -"
                  noOptionsMessage={() => "No Receipt Found"}
                  className="custom-select"
                />
              </div>
              <div className="col-md-3 form-group mt-3">
                <label>Receipt Date</label>
                <div
                  className="input-group date input-daterange"
                  id="receiptDate"
                >
                  <Flatpickr
                    value={startDate}
                    onChange={(date) => setStartDate(date)}
                    options={{ dateFormat: "Y-m-d" }}
                    style={{ width: "127px" }}
                  />
                  <span className="input-group-addon">to</span>
                  <Flatpickr
                    value={endDate}
                    onChange={(date) => setEndDate(date)}
                    options={{ dateFormat: "Y-m-d" }}
                    style={{ width: "127px" }}
                  />
                  <span
                    className="input-group-addon"
                    onClick={handleTrashClick}
                  >
                    <i className="fa fa-trash" id="receiptTrashBtn" />
                  </span>
                </div>
              </div>
              <div className="col-md-2 form-group mt-3">
                <label>Received</label>
                <input
                  className="form-control form-control-sm"
                  type="text"
                  name="search_payments"
                />
              </div>
              <div className="col-md-2 form-group mt-3">
                <label>Unallocated Amount</label>
                <input
                  className="form-control form-control-sm"
                  type="text"
                  name="search_payments"
                />
              </div>
              {/* Added By Brynal Start */}
              {/* Added By Brynal End */}
            </div>
            <br />
            {/*2nd Row*/}
            <div className="row mb-4">
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
              <div className="col-md-2 form-group" />
              <div className="col-md-2 form-group" />
              <div className="col-md-5 form-group">
                {/*Pagination panel*/}
                <nav aria-label="Page navigation example">
                  <ul className="pagination pagination-sm justify-content-center mt-4">
                    <li className="page-item">
                      <Link className="page-link" to="#" aria-label="Previous">
                        <span aria-hidden="true">«</span>
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
                      <Link className="page-link" to="#" aria-label="Next">
                        <span aria-hidden="true">»</span>
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="col-md-3 form-group mt-3">
                <style
                  dangerouslySetInnerHTML={{
                    __html:
                      "\n                    .table tr[visible='false'],\n                    .no-result {\n                        display: none;\n                        border: 1px solid #ddd;\n                        padding: 10px;\n                        margin-top: -2px;\n                    }\n\n                    .table tr[visible='true'] {\n                        display: table-row;\n                    }\n\n                    .counter {\n                        padding: 8px;\n                        color: #ccc;\n                    }\n\n                    .search_new {\n                        float: right;\n                        height: 35px;\n                        margin-bottom: 0px;\n                        padding-left: 5px;\n                    }\n                ",
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
            {/* Table Creation */}
            <div
              id="search_controller_wrapper"
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
                      id="search_controller"
                      className="table   table-responsive dataTable no-footer table-bordered "
                      role="grid"
                      aria-describedby="search_controller_info"
                    >
                      <thead>
                        <tr role="row">
                          <th
                            className="sorting_disabled"
                            rowSpan={1}
                            colSpan={1}
                            style={{ width: "29px" }}
                          >
                            <input
                              className="select-option"
                              type="checkbox"
                              name="select-all"
                              onClick={selectAllChkboxes}
                              id="selectAll"
                            />
                          </th>
                          <th
                            className="sorting_disabled"
                            rowSpan={1}
                            colSpan={1}
                            style={{ width: "103px" }}
                          >
                            Receipt #
                          </th>
                          <th
                            className="sorting_disabled"
                            rowSpan={1}
                            colSpan={1}
                            style={{ width: "138px" }}
                          >
                            Customer Profile Id
                          </th>
                          <th
                            className="sorting_disabled"
                            rowSpan={1}
                            colSpan={1}
                            style={{ width: "241px" }}
                          >
                            Agent
                          </th>
                          <th
                            className="sorting_disabled"
                            rowSpan={1}
                            colSpan={1}
                            style={{ width: "87px" }}
                          >
                            Receipt Date
                          </th>
                          <th
                            className="sorting_disabled"
                            rowSpan={1}
                            colSpan={1}
                            style={{ width: "91px" }}
                          >
                            Receipt Mode
                          </th>
                          <th
                            className="sorting_disabled"
                            rowSpan={1}
                            colSpan={1}
                            style={{ width: "71px" }}
                          >
                            Currency&nbsp;
                          </th>
                          <th
                            className="sorting_disabled"
                            rowSpan={1}
                            colSpan={1}
                            style={{ width: "77px" }}
                          >
                            Received&nbsp;
                          </th>
                          <th
                            className="sorting_disabled"
                            rowSpan={1}
                            colSpan={1}
                            style={{ width: "147px" }}
                          >
                            Unallocated Amount&nbsp;
                          </th>
                          <th
                            className="sorting_disabled"
                            rowSpan={1}
                            colSpan={1}
                            style={{ width: "120px" }}
                          >
                            Actions
                          </th>
                          <th
                            className="sorting_disabled"
                            rowSpan={1}
                            colSpan={1}
                            style={{ width: "76px" }}
                          >
                            Created By
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        <tr className="phps_row_1 odd" role="row">
                          <td>
                            <input
                              className="select-option"
                              type="checkbox"
                              name="chk[]"
                              id="chk[]"
                              onclick="check_select_check_box(this)"
                              defaultValue={602}
                            />
                          </td>
                          <td>Rcpt00000602 </td>
                          <td />
                          <td>Sqtech (Sujay Test) </td>
                          <td>
                            <div className="dateWrapper">
                              <div className="onlyDate">22</div>
                              <div className="monthYear">
                                Jun
                                <br />
                                2023
                              </div>
                            </div>
                          </td>
                          <td>
                            EFT {/* code added by rakesh for CC option */}
                            {/* code added by rakesh for CC option */}
                          </td>
                          <td>SAR</td>
                          {/* code modified by Anand on 1 Dec 2012 for 3 digits */}
                          <td>114.321</td>
                          <td>SAR&nbsp;0.000</td>
                          {/* code modified by Anand on 1 Dec 2012 for 3 digits */}
                          <td className="actionlink">
                            <div className="actionCont">
                              <div className="input-group-addon">
                                <Link
                                  data-toggle="tooltip"
                                  data-original-title="Edit"
                                  data-placement="top"
                                  to={
                                    Constants.URLConstants
                                      .ACCOUNTSAGENTRECIEPTEDIT
                                  }
                                >
                                  <i className="fa fa-pencil-square-o" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to={
                                    Constants.URLConstants
                                      .ACCOUNTSAGENTRECIEPTALLOCATION
                                  }
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="0.000 Amount for Allocation"
                                >
                                  {/* <img src="images/booking_allocation_gray.gif" data-toggle="tooltip" data-placement="top" border=0 alt="0.000 Amount for Allocation" title='0.000 Amount for Allocation'>&nbsp; */}
                                  <i className="fa fa-pie-chart text-info" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to={
                                    Constants.URLConstants
                                      .ACCOUNTSAGENTRECIEPTPARTIALALLOCATION
                                  }
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="Partial Allocation"
                                >
                                  <i className="fa fa-ruble text-info" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to={
                                    Constants.URLConstants
                                      .ACCOUNTSAGENTRECIEPTVIEW
                                  }
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="View"
                                >
                                  <i className="fa fa-eye" />
                                  {/*<img src="images/view.gif" border=0 alt="View" title='View' data-toggle="tooltip" data-placement="top">*/}
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <span
                                  id="tool_show"
                                  to="#"
                                  data-toggle="modal"
                                  data-target="#payment_gateway_logs_modal"
                                  title="Payment Gateway Log"
                                  data-params="search_id=&customer_id=&search_agent=&search_payment_mode=&search_payments="
                                  onclick="openPaymentLogModal(2130,291,602,this)"
                                  className="payment-log"
                                >
                                  <i className="fa fa-file" />
                                </span>
                              </div>
                              {/* <div class="input-group-addon">
                          <Link to="payment_gateway_logs.php?log=2130&agentid=291&rptid=602&search_id=&customer_id=&search_agent=&search_payment_mode=&search_payments="
                              data-toggle="tooltip" data-placement="top" title="Payment Gateway Log">
                              <i class="fa fa-file"></i> 
                          </Link>
                      </div> */}
                              {/* code changed by arvind for XR-222 */}
                            </div>
                          </td>
                          <td />
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>
                            <input
                              className="select-option"
                              type="checkbox"
                              name="chk[]"
                              id="chk[]"
                              onclick="check_select_check_box(this)"
                              defaultValue={601}
                            />
                          </td>
                          <td>Rcpt00000601 </td>
                          <td />
                          <td>Sqtech (Sujay Test) </td>
                          <td>
                            <div className="dateWrapper">
                              <div className="onlyDate">22</div>
                              <div className="monthYear">
                                Jun
                                <br />
                                2023
                              </div>
                            </div>
                          </td>
                          <td>
                            EFT {/* code added by rakesh for CC option */}
                            {/* code added by rakesh for CC option */}
                          </td>
                          <td>SAR</td>
                          {/* code modified by Anand on 1 Dec 2012 for 3 digits */}
                          <td>141.427</td>
                          <td>SAR&nbsp;0.000</td>
                          {/* code modified by Anand on 1 Dec 2012 for 3 digits */}
                          <td className="actionlink">
                            <div className="actionCont">
                              <div className="input-group-addon">
                                <Link
                                  data-toggle="tooltip"
                                  data-original-title="Edit"
                                  data-placement="top"
                                  to="accountseditreciept.html"
                                >
                                  <i className="fa fa-pencil-square-o" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="accountsrecieptallocation.html"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="0.000 Amount for Allocation"
                                >
                                  {/* <img src="images/booking_allocation_gray.gif" data-toggle="tooltip" data-placement="top" border=0 alt="0.000 Amount for Allocation" title='0.000 Amount for Allocation'>&nbsp; */}
                                  <i className="fa fa-pie-chart" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="accountsrecieptpartialallocation.html"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="Partial Allocation"
                                >
                                  <i className="fa fa-ruble" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="accountsviewreciept.html"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="View"
                                >
                                  <i className="fa fa-eye" />
                                  {/*<img src="images/view.gif" border=0 alt="View" title='View' data-toggle="tooltip" data-placement="top">*/}
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <span
                                  id="tool_show"
                                  to="#"
                                  data-toggle="modal"
                                  data-target="#payment_gateway_logs_modal"
                                  title="Payment Gateway Log"
                                  data-params="search_id=&customer_id=&search_agent=&search_payment_mode=&search_payments="
                                  onclick="openPaymentLogModal(2090,291,601,this)"
                                  className="payment-log"
                                >
                                  <i className="fa fa-file" />
                                </span>
                              </div>
                              {/* <div class="input-group-addon">
                          <Link to="payment_gateway_logs.php?log=2090&agentid=291&rptid=601&search_id=&customer_id=&search_agent=&search_payment_mode=&search_payments="
                              data-toggle="tooltip" data-placement="top" title="Payment Gateway Log">
                              <i class="fa fa-file"></i> 
                          </Link>
                      </div> */}
                              {/* code changed by arvind for XR-222 */}
                            </div>
                          </td>
                          <td />
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>
                            <input
                              className="select-option"
                              type="checkbox"
                              name="chk[]"
                              id="chk[]"
                              onclick="check_select_check_box(this)"
                              defaultValue={600}
                            />
                          </td>
                          <td>Rcpt00000600 </td>
                          <td />
                          <td>Vartak Holidazzle (Rohan Vartak) </td>
                          <td>
                            <div className="dateWrapper">
                              <div className="onlyDate">21</div>
                              <div className="monthYear">
                                Jun
                                <br />
                                2023
                              </div>
                            </div>
                          </td>
                          <td>
                            EFT {/* code added by rakesh for CC option */}
                            {/* code added by rakesh for CC option */}
                          </td>
                          <td>INR</td>
                          {/* code modified by Anand on 1 Dec 2012 for 3 digits */}
                          <td>13,629.702</td>
                          <td>INR&nbsp;0.000</td>
                          {/* code modified by Anand on 1 Dec 2012 for 3 digits */}
                          <td className="actionlink">
                            <div className="actionCont">
                              <div className="input-group-addon">
                                <Link
                                  data-toggle="tooltip"
                                  data-original-title="Edit"
                                  data-placement="top"
                                  to="accountseditreciept.html"
                                >
                                  <i className="fa fa-pencil-square-o" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="accountsrecieptallocation.html"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="0.000 Amount for Allocation"
                                >
                                  {/* <img src="images/booking_allocation_gray.gif" data-toggle="tooltip" data-placement="top" border=0 alt="0.000 Amount for Allocation" title='0.000 Amount for Allocation'>&nbsp; */}
                                  <i className="fa fa-pie-chart" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="accountsrecieptpartialallocation.html"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="Partial Allocation"
                                >
                                  <i className="fa fa-ruble" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="accountsviewreciept.html"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="View"
                                >
                                  <i className="fa fa-eye" />
                                  {/*<img src="images/view.gif" border=0 alt="View" title='View' data-toggle="tooltip" data-placement="top">*/}
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <span
                                  id="tool_show"
                                  to="#"
                                  data-toggle="modal"
                                  data-target="#payment_gateway_logs_modal"
                                  title="Payment Gateway Log"
                                  data-params="search_id=&customer_id=&search_agent=&search_payment_mode=&search_payments="
                                  onclick="openPaymentLogModal(2106,195,600,this)"
                                  className="payment-log"
                                >
                                  <i className="fa fa-file" />
                                </span>
                              </div>
                              {/* <div class="input-group-addon">
                          <Link to="payment_gateway_logs.php?log=2106&agentid=195&rptid=600&search_id=&customer_id=&search_agent=&search_payment_mode=&search_payments="
                              data-toggle="tooltip" data-placement="top" title="Payment Gateway Log">
                              <i class="fa fa-file"></i> 
                          </Link>
                      </div> */}
                              {/* code changed by arvind for XR-222 */}
                            </div>
                          </td>
                          <td />
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>
                            <input
                              className="select-option"
                              type="checkbox"
                              name="chk[]"
                              id="chk[]"
                              onclick="check_select_check_box(this)"
                              defaultValue={599}
                            />
                          </td>
                          <td>Rcpt00000599 </td>
                          <td />
                          <td>Vartak Holidazzle (Rohan Vartak) </td>
                          <td>
                            <div className="dateWrapper">
                              <div className="onlyDate">21</div>
                              <div className="monthYear">
                                Jun
                                <br />
                                2023
                              </div>
                            </div>
                          </td>
                          <td>
                            EFT {/* code added by rakesh for CC option */}
                            {/* code added by rakesh for CC option */}
                          </td>
                          <td>INR</td>
                          {/* code modified by Anand on 1 Dec 2012 for 3 digits */}
                          <td>13,802.048</td>
                          <td>INR&nbsp;0.000</td>
                          {/* code modified by Anand on 1 Dec 2012 for 3 digits */}
                          <td className="actionlink">
                            <div className="actionCont">
                              <div className="input-group-addon">
                                <Link
                                  data-toggle="tooltip"
                                  data-original-title="Edit"
                                  data-placement="top"
                                  to="accountseditreciept.html"
                                >
                                  <i className="fa fa-pencil-square-o" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="accountsrecieptallocation.html"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="0.000 Amount for Allocation"
                                >
                                  {/* <img src="images/booking_allocation_gray.gif" data-toggle="tooltip" data-placement="top" border=0 alt="0.000 Amount for Allocation" title='0.000 Amount for Allocation'>&nbsp; */}
                                  <i className="fa fa-pie-chart" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="accountsrecieptpartialallocation.html"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="Partial Allocation"
                                >
                                  <i className="fa fa-ruble" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="accountsviewreciept.html"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="View"
                                >
                                  <i className="fa fa-eye" />
                                  {/*<img src="images/view.gif" border=0 alt="View" title='View' data-toggle="tooltip" data-placement="top">*/}
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <span
                                  id="tool_show"
                                  to="#"
                                  data-toggle="modal"
                                  data-target="#payment_gateway_logs_modal"
                                  title="Payment Gateway Log"
                                  data-params="search_id=&customer_id=&search_agent=&search_payment_mode=&search_payments="
                                  onclick="openPaymentLogModal(2127,195,599,this)"
                                  className="payment-log"
                                >
                                  <i className="fa fa-file" />
                                </span>
                              </div>
                              {/* <div class="input-group-addon">
                          <Link to="payment_gateway_logs.php?log=2127&agentid=195&rptid=599&search_id=&customer_id=&search_agent=&search_payment_mode=&search_payments="
                              data-toggle="tooltip" data-placement="top" title="Payment Gateway Log">
                              <i class="fa fa-file"></i> 
                          </Link>
                      </div> */}
                              {/* code changed by arvind for XR-222 */}
                            </div>
                          </td>
                          <td />
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>
                            <input
                              className="select-option"
                              type="checkbox"
                              name="chk[]"
                              id="chk[]"
                              onclick="check_select_check_box(this)"
                              defaultValue={598}
                            />
                          </td>
                          <td>Rcpt00000598 </td>
                          <td />
                          <td>Vartak Holidazzle (Rohan Vartak) </td>
                          <td>
                            <div className="dateWrapper">
                              <div className="onlyDate">21</div>
                              <div className="monthYear">
                                Jun
                                <br />
                                2023
                              </div>
                            </div>
                          </td>
                          <td>
                            EFT {/* code added by rakesh for CC option */}
                            {/* code added by rakesh for CC option */}
                          </td>
                          <td>INR</td>
                          {/* code modified by Anand on 1 Dec 2012 for 3 digits */}
                          <td>13,802.048</td>
                          <td>INR&nbsp;0.000</td>
                          {/* code modified by Anand on 1 Dec 2012 for 3 digits */}
                          <td className="actionlink">
                            <div className="actionCont">
                              <div className="input-group-addon">
                                <Link
                                  data-toggle="tooltip"
                                  data-original-title="Edit"
                                  data-placement="top"
                                  to="accountseditreciept.html"
                                >
                                  <i className="fa fa-pencil-square-o" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="accountsrecieptallocation.html"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="0.000 Amount for Allocation"
                                >
                                  {/* <img src="images/booking_allocation_gray.gif" data-toggle="tooltip" data-placement="top" border=0 alt="0.000 Amount for Allocation" title='0.000 Amount for Allocation'>&nbsp; */}
                                  <i className="fa fa-pie-chart" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="accountsrecieptpartialallocation.html"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="Partial Allocation"
                                >
                                  <i className="fa fa-ruble" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="accountsviewreciept.html"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="View"
                                >
                                  <i className="fa fa-eye" />
                                  {/*<img src="images/view.gif" border=0 alt="View" title='View' data-toggle="tooltip" data-placement="top">*/}
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <span
                                  id="tool_show"
                                  to="#"
                                  data-toggle="modal"
                                  data-target="#payment_gateway_logs_modal"
                                  title="Payment Gateway Log"
                                  data-params="search_id=&customer_id=&search_agent=&search_payment_mode=&search_payments="
                                  onclick="openPaymentLogModal(2125,195,598,this)"
                                  className="payment-log"
                                >
                                  <i className="fa fa-file" />
                                </span>
                              </div>
                              {/* <div class="input-group-addon">
                          <Link to="payment_gateway_logs.php?log=2125&agentid=195&rptid=598&search_id=&customer_id=&search_agent=&search_payment_mode=&search_payments="
                              data-toggle="tooltip" data-placement="top" title="Payment Gateway Log">
                              <i class="fa fa-file"></i> 
                          </Link>
                      </div> */}
                              {/* code changed by arvind for XR-222 */}
                            </div>
                          </td>
                          <td />
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>
                            <input
                              className="select-option"
                              type="checkbox"
                              name="chk[]"
                              id="chk[]"
                              onclick="check_select_check_box(this)"
                              defaultValue={597}
                            />
                          </td>
                          <td>Rcpt00000597 </td>
                          <td />
                          <td>Sqtech (Sujay Test) </td>
                          <td>
                            <div className="dateWrapper">
                              <div className="onlyDate">21</div>
                              <div className="monthYear">
                                Jun
                                <br />
                                2023
                              </div>
                            </div>
                          </td>
                          <td>
                            EFT {/* code added by rakesh for CC option */}
                            {/* code added by rakesh for CC option */}
                          </td>
                          <td>SAR</td>
                          {/* code modified by Anand on 1 Dec 2012 for 3 digits */}
                          <td>159.498</td>
                          <td>SAR&nbsp;0.000</td>
                          {/* code modified by Anand on 1 Dec 2012 for 3 digits */}
                          <td className="actionlink">
                            <div className="actionCont">
                              <div className="input-group-addon">
                                <Link
                                  data-toggle="tooltip"
                                  data-original-title="Edit"
                                  data-placement="top"
                                  to="accountseditreciept.html"
                                >
                                  <i className="fa fa-pencil-square-o" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="accountsrecieptallocation.html"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="0.000 Amount for Allocation"
                                >
                                  {/* <img src="images/booking_allocation_gray.gif" data-toggle="tooltip" data-placement="top" border=0 alt="0.000 Amount for Allocation" title='0.000 Amount for Allocation'>&nbsp; */}
                                  <i className="fa fa-pie-chart" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="accountsrecieptpartialallocation.html"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="Partial Allocation"
                                >
                                  <i className="fa fa-ruble" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="accountsviewreciept.html"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="View"
                                >
                                  <i className="fa fa-eye" />
                                  {/*<img src="images/view.gif" border=0 alt="View" title='View' data-toggle="tooltip" data-placement="top">*/}
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <span
                                  id="tool_show"
                                  to="#"
                                  data-toggle="modal"
                                  data-target="#payment_gateway_logs_modal"
                                  title="Payment Gateway Log"
                                  data-params="search_id=&customer_id=&search_agent=&search_payment_mode=&search_payments="
                                  onclick="openPaymentLogModal(2123,291,597,this)"
                                  className="payment-log"
                                >
                                  <i className="fa fa-file" />
                                </span>
                              </div>
                              {/* <div class="input-group-addon">
                          <Link to="payment_gateway_logs.php?log=2123&agentid=291&rptid=597&search_id=&customer_id=&search_agent=&search_payment_mode=&search_payments="
                              data-toggle="tooltip" data-placement="top" title="Payment Gateway Log">
                              <i class="fa fa-file"></i> 
                          </Link>
                      </div> */}
                              {/* code changed by arvind for XR-222 */}
                            </div>
                          </td>
                          <td />
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>
                            <input
                              className="select-option"
                              type="checkbox"
                              name="chk[]"
                              id="chk[]"
                              onclick="check_select_check_box(this)"
                              defaultValue={596}
                            />
                          </td>
                          <td>Rcpt00000596 </td>
                          <td />
                          <td>Sqtech (Sujay Test) </td>
                          <td>
                            <div className="dateWrapper">
                              <div className="onlyDate">20</div>
                              <div className="monthYear">
                                Jun
                                <br />
                                2023
                              </div>
                            </div>
                          </td>
                          <td>
                            EFT {/* code added by rakesh for CC option */}
                            {/* code added by rakesh for CC option */}
                          </td>
                          <td>SAR</td>
                          {/* code modified by Anand on 1 Dec 2012 for 3 digits */}
                          <td>141.427</td>
                          <td>SAR&nbsp;0.000</td>
                          {/* code modified by Anand on 1 Dec 2012 for 3 digits */}
                          <td className="actionlink">
                            <div className="actionCont">
                              <div className="input-group-addon">
                                <Link
                                  data-toggle="tooltip"
                                  data-original-title="Edit"
                                  data-placement="top"
                                  to="accountseditreciept.html"
                                >
                                  <i className="fa fa-pencil-square-o" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="accountsrecieptallocation.html"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="0.000 Amount for Allocation"
                                >
                                  {/* <img src="images/booking_allocation_gray.gif" data-toggle="tooltip" data-placement="top" border=0 alt="0.000 Amount for Allocation" title='0.000 Amount for Allocation'>&nbsp; */}
                                  <i className="fa fa-pie-chart" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="accountsrecieptpartialallocation.html"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="Partial Allocation"
                                >
                                  <i className="fa fa-ruble" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="accountsviewreciept.html"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="View"
                                >
                                  <i className="fa fa-eye" />
                                  {/*<img src="images/view.gif" border=0 alt="View" title='View' data-toggle="tooltip" data-placement="top">*/}
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <span
                                  id="tool_show"
                                  to="#"
                                  data-toggle="modal"
                                  data-target="#payment_gateway_logs_modal"
                                  title="Payment Gateway Log"
                                  data-params="search_id=&customer_id=&search_agent=&search_payment_mode=&search_payments="
                                  onclick="openPaymentLogModal(2095,291,596,this)"
                                  className="payment-log"
                                >
                                  <i className="fa fa-file" />
                                </span>
                              </div>
                              {/* <div class="input-group-addon">
                          <Link to="payment_gateway_logs.php?log=2095&agentid=291&rptid=596&search_id=&customer_id=&search_agent=&search_payment_mode=&search_payments="
                              data-toggle="tooltip" data-placement="top" title="Payment Gateway Log">
                              <i class="fa fa-file"></i> 
                          </Link>
                      </div> */}
                              {/* code changed by arvind for XR-222 */}
                            </div>
                          </td>
                          <td />
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>
                            <input
                              className="select-option"
                              type="checkbox"
                              name="chk[]"
                              id="chk[]"
                              onclick="check_select_check_box(this)"
                              defaultValue={595}
                            />
                          </td>
                          <td>Rcpt00000595 </td>
                          <td />
                          <td>Sqtech (Sujay Test) </td>
                          <td>
                            <div className="dateWrapper">
                              <div className="onlyDate">20</div>
                              <div className="monthYear">
                                Jun
                                <br />
                                2023
                              </div>
                            </div>
                          </td>
                          <td>
                            EFT {/* code added by rakesh for CC option */}
                            {/* code added by rakesh for CC option */}
                          </td>
                          <td>SAR</td>
                          {/* code modified by Anand on 1 Dec 2012 for 3 digits */}
                          <td>201.449</td>
                          <td>SAR&nbsp;0.000</td>
                          {/* code modified by Anand on 1 Dec 2012 for 3 digits */}
                          <td className="actionlink">
                            <div className="actionCont">
                              <div className="input-group-addon">
                                <Link
                                  data-toggle="tooltip"
                                  data-original-title="Edit"
                                  data-placement="top"
                                  to="accountseditreciept.html"
                                >
                                  <i className="fa fa-pencil-square-o" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="accountsrecieptallocation.html"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="0.000 Amount for Allocation"
                                >
                                  {/* <img src="images/booking_allocation_gray.gif" data-toggle="tooltip" data-placement="top" border=0 alt="0.000 Amount for Allocation" title='0.000 Amount for Allocation'>&nbsp; */}
                                  <i className="fa fa-pie-chart" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="accountsrecieptpartialallocation.html"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="Partial Allocation"
                                >
                                  <i className="fa fa-ruble" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="accountsviewreciept.html"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="View"
                                >
                                  <i className="fa fa-eye" />
                                  {/*<img src="images/view.gif" border=0 alt="View" title='View' data-toggle="tooltip" data-placement="top">*/}
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <span
                                  id="tool_show"
                                  to="#"
                                  data-toggle="modal"
                                  data-target="#payment_gateway_logs_modal"
                                  title="Payment Gateway Log"
                                  data-params="search_id=&customer_id=&search_agent=&search_payment_mode=&search_payments="
                                  onclick="openPaymentLogModal(2091,291,595,this)"
                                  className="payment-log"
                                >
                                  <i className="fa fa-file" />
                                </span>
                              </div>
                              {/* <div class="input-group-addon">
                          <Link to="payment_gateway_logs.php?log=2091&agentid=291&rptid=595&search_id=&customer_id=&search_agent=&search_payment_mode=&search_payments="
                              data-toggle="tooltip" data-placement="top" title="Payment Gateway Log">
                              <i class="fa fa-file"></i> 
                          </Link>
                      </div> */}
                              {/* code changed by arvind for XR-222 */}
                            </div>
                          </td>
                          <td />
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>
                            <input
                              className="select-option"
                              type="checkbox"
                              name="chk[]"
                              id="chk[]"
                              onclick="check_select_check_box(this)"
                              defaultValue={594}
                            />
                          </td>
                          <td>Rcpt00000594 </td>
                          <td />
                          <td>Sqtech (Sujay Test) </td>
                          <td>
                            <div className="dateWrapper">
                              <div className="onlyDate">19</div>
                              <div className="monthYear">
                                Jun
                                <br />
                                2023
                              </div>
                            </div>
                          </td>
                          <td>
                            EFT {/* code added by rakesh for CC option */}
                            {/* code added by rakesh for CC option */}
                          </td>
                          <td>SAR</td>
                          {/* code modified by Anand on 1 Dec 2012 for 3 digits */}
                          <td>114.321</td>
                          <td>SAR&nbsp;0.000</td>
                          {/* code modified by Anand on 1 Dec 2012 for 3 digits */}
                          <td className="actionlink">
                            <div className="actionCont">
                              <div className="input-group-addon">
                                <Link
                                  data-toggle="tooltip"
                                  data-original-title="Edit"
                                  data-placement="top"
                                  to="accountseditreciept.html"
                                >
                                  <i className="fa fa-pencil-square-o" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="accountsrecieptallocation.html"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="0.000 Amount for Allocation"
                                >
                                  {/* <img src="images/booking_allocation_gray.gif" data-toggle="tooltip" data-placement="top" border=0 alt="0.000 Amount for Allocation" title='0.000 Amount for Allocation'>&nbsp; */}
                                  <i className="fa fa-pie-chart" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="accountsrecieptpartialallocation.html"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="Partial Allocation"
                                >
                                  <i className="fa fa-ruble" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="accountsviewreciept.html"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="View"
                                >
                                  <i className="fa fa-eye" />
                                  {/*<img src="images/view.gif" border=0 alt="View" title='View' data-toggle="tooltip" data-placement="top">*/}
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <span
                                  id="tool_show"
                                  to="#"
                                  data-toggle="modal"
                                  data-target="#payment_gateway_logs_modal"
                                  title="Payment Gateway Log"
                                  data-params="search_id=&customer_id=&search_agent=&search_payment_mode=&search_payments="
                                  onclick="openPaymentLogModal(2089,291,594,this)"
                                  className="payment-log"
                                >
                                  <i className="fa fa-file" />
                                </span>
                              </div>
                              {/* <div class="input-group-addon">
                          <Link to="payment_gateway_logs.php?log=2089&agentid=291&rptid=594&search_id=&customer_id=&search_agent=&search_payment_mode=&search_payments="
                              data-toggle="tooltip" data-placement="top" title="Payment Gateway Log">
                              <i class="fa fa-file"></i> 
                          </Link>
                      </div> */}
                              {/* code changed by arvind for XR-222 */}
                            </div>
                          </td>
                          <td />
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>
                            <input
                              className="select-option"
                              type="checkbox"
                              name="chk[]"
                              id="chk[]"
                              onclick="check_select_check_box(this)"
                              defaultValue={593}
                            />
                          </td>
                          <td>Rcpt00000593 </td>
                          <td />
                          <td>Sqtech (Sujay Test) </td>
                          <td>
                            <div className="dateWrapper">
                              <div className="onlyDate">19</div>
                              <div className="monthYear">
                                Jun
                                <br />
                                2023
                              </div>
                            </div>
                          </td>
                          <td>
                            EFT {/* code added by rakesh for CC option */}
                            {/* code added by rakesh for CC option */}
                          </td>
                          <td>SAR</td>
                          {/* code modified by Anand on 1 Dec 2012 for 3 digits */}
                          <td>114.321</td>
                          <td>SAR&nbsp;0.000</td>
                          {/* code modified by Anand on 1 Dec 2012 for 3 digits */}
                          <td className="actionlink">
                            <div className="actionCont">
                              <div className="input-group-addon">
                                <Link
                                  data-toggle="tooltip"
                                  data-original-title="Edit"
                                  data-placement="top"
                                  to="javascriptedit_receipts('291','593','114.321','receipt','SAR');"
                                >
                                  <i className="fa fa-pencil-square-o" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="javascriptreceipts_booking_allocation('291','593','114.321','SAR');"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="0.000 Amount for Allocation"
                                >
                                  {/* <img src="images/booking_allocation_gray.gif" data-toggle="tooltip" data-placement="top" border=0 alt="0.000 Amount for Allocation" title='0.000 Amount for Allocation'>&nbsp; */}
                                  <i className="fa fa-pie-chart" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="accountsrecieptpartialallocation.html"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="Partial Allocation"
                                >
                                  <i className="fa fa-ruble" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="controller.php?page=receipt&action=view&id=593"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="View"
                                >
                                  <i className="fa fa-eye" />
                                  {/*<img src="images/view.gif" border=0 alt="View" title='View' data-toggle="tooltip" data-placement="top">*/}
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <span
                                  id="tool_show"
                                  to="#"
                                  data-toggle="modal"
                                  data-target="#payment_gateway_logs_modal"
                                  title="Payment Gateway Log"
                                  data-params="search_id=&customer_id=&search_agent=&search_payment_mode=&search_payments="
                                  onclick="openPaymentLogModal(2087,291,593,this)"
                                  className="payment-log"
                                >
                                  <i className="fa fa-file" />
                                </span>
                              </div>
                              {/* <div class="input-group-addon">
                          <Link to="payment_gateway_logs.php?log=2087&agentid=291&rptid=593&search_id=&customer_id=&search_agent=&search_payment_mode=&search_payments="
                              data-toggle="tooltip" data-placement="top" title="Payment Gateway Log">
                              <i class="fa fa-file"></i> 
                          </Link>
                      </div> */}
                              {/* code changed by arvind for XR-222 */}
                            </div>
                          </td>
                          <td />
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>
                            <input
                              className="select-option"
                              type="checkbox"
                              name="chk[]"
                              id="chk[]"
                              onclick="check_select_check_box(this)"
                              defaultValue={592}
                            />
                          </td>
                          <td>Rcpt00000592 </td>
                          <td />
                          <td>Sqtech (Sujay Test) </td>
                          <td>
                            <div className="dateWrapper">
                              <div className="onlyDate">19</div>
                              <div className="monthYear">
                                Jun
                                <br />
                                2023
                              </div>
                            </div>
                          </td>
                          <td>
                            EFT {/* code added by rakesh for CC option */}
                            {/* code added by rakesh for CC option */}
                          </td>
                          <td>SAR</td>
                          {/* code modified by Anand on 1 Dec 2012 for 3 digits */}
                          <td>114.321</td>
                          <td>SAR&nbsp;0.000</td>
                          {/* code modified by Anand on 1 Dec 2012 for 3 digits */}
                          <td className="actionlink">
                            <div className="actionCont">
                              <div className="input-group-addon">
                                <Link
                                  data-toggle="tooltip"
                                  data-original-title="Edit"
                                  data-placement="top"
                                  to="javascriptedit_receipts('291','592','114.321','receipt','SAR');"
                                >
                                  <i className="fa fa-pencil-square-o" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="javascriptreceipts_booking_allocation('291','592','114.321','SAR');"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="0.000 Amount for Allocation"
                                >
                                  {/* <img src="images/booking_allocation_gray.gif" data-toggle="tooltip" data-placement="top" border=0 alt="0.000 Amount for Allocation" title='0.000 Amount for Allocation'>&nbsp; */}
                                  <i className="fa fa-pie-chart" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="javascriptreceipts_partial_allocation('291','592','114.321','SAR');"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="Partial Allocation"
                                >
                                  <i className="fa fa-ruble" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="controller.php?page=receipt&action=view&id=592"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="View"
                                >
                                  <i className="fa fa-eye" />
                                  {/*<img src="images/view.gif" border=0 alt="View" title='View' data-toggle="tooltip" data-placement="top">*/}
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <span
                                  id="tool_show"
                                  to="#"
                                  data-toggle="modal"
                                  data-target="#payment_gateway_logs_modal"
                                  title="Payment Gateway Log"
                                  data-params="search_id=&customer_id=&search_agent=&search_payment_mode=&search_payments="
                                  onclick="openPaymentLogModal(2084,291,592,this)"
                                  className="payment-log"
                                >
                                  <i className="fa fa-file" />
                                </span>
                              </div>
                              {/* <div class="input-group-addon">
                          <Link to="payment_gateway_logs.php?log=2084&agentid=291&rptid=592&search_id=&customer_id=&search_agent=&search_payment_mode=&search_payments="
                              data-toggle="tooltip" data-placement="top" title="Payment Gateway Log">
                              <i class="fa fa-file"></i> 
                          </Link>
                      </div> */}
                              {/* code changed by arvind for XR-222 */}
                            </div>
                          </td>
                          <td />
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>
                            <input
                              className="select-option"
                              type="checkbox"
                              name="chk[]"
                              id="chk[]"
                              onclick="check_select_check_box(this)"
                              defaultValue={591}
                            />
                          </td>
                          <td>Rcpt00000591 </td>
                          <td />
                          <td>Sqtech (Sujay Test) </td>
                          <td>
                            <div className="dateWrapper">
                              <div className="onlyDate">19</div>
                              <div className="monthYear">
                                Jun
                                <br />
                                2023
                              </div>
                            </div>
                          </td>
                          <td>
                            EFT {/* code added by rakesh for CC option */}
                            {/* code added by rakesh for CC option */}
                          </td>
                          <td>SAR</td>
                          {/* code modified by Anand on 1 Dec 2012 for 3 digits */}
                          <td>141.427</td>
                          <td>SAR&nbsp;0.000</td>
                          {/* code modified by Anand on 1 Dec 2012 for 3 digits */}
                          <td className="actionlink">
                            <div className="actionCont">
                              <div className="input-group-addon">
                                <Link
                                  data-toggle="tooltip"
                                  data-original-title="Edit"
                                  data-placement="top"
                                  to="javascriptedit_receipts('291','591','141.427','receipt','SAR');"
                                >
                                  <i className="fa fa-pencil-square-o" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="javascriptreceipts_booking_allocation('291','591','141.427','SAR');"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="0.000 Amount for Allocation"
                                >
                                  {/* <img src="images/booking_allocation_gray.gif" data-toggle="tooltip" data-placement="top" border=0 alt="0.000 Amount for Allocation" title='0.000 Amount for Allocation'>&nbsp; */}
                                  <i className="fa fa-pie-chart" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="javascriptreceipts_partial_allocation('291','591','141.427','SAR');"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="Partial Allocation"
                                >
                                  <i className="fa fa-ruble" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="controller.php?page=receipt&action=view&id=591"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="View"
                                >
                                  <i className="fa fa-eye" />
                                  {/*<img src="images/view.gif" border=0 alt="View" title='View' data-toggle="tooltip" data-placement="top">*/}
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <span
                                  id="tool_show"
                                  to="#"
                                  data-toggle="modal"
                                  data-target="#payment_gateway_logs_modal"
                                  title="Payment Gateway Log"
                                  data-params="search_id=&customer_id=&search_agent=&search_payment_mode=&search_payments="
                                  onclick="openPaymentLogModal(2083,291,591,this)"
                                  className="payment-log"
                                >
                                  <i className="fa fa-file" />
                                </span>
                              </div>
                              {/* <div class="input-group-addon">
                          <Link to="payment_gateway_logs.php?log=2083&agentid=291&rptid=591&search_id=&customer_id=&search_agent=&search_payment_mode=&search_payments="
                              data-toggle="tooltip" data-placement="top" title="Payment Gateway Log">
                              <i class="fa fa-file"></i> 
                          </Link>
                      </div> */}
                              {/* code changed by arvind for XR-222 */}
                            </div>
                          </td>
                          <td />
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>
                            <input
                              className="select-option"
                              type="checkbox"
                              name="chk[]"
                              id="chk[]"
                              onclick="check_select_check_box(this)"
                              defaultValue={590}
                            />
                          </td>
                          <td>Rcpt00000590 </td>
                          <td />
                          <td>Sqtech (Sujay Test) </td>
                          <td>
                            <div className="dateWrapper">
                              <div className="onlyDate">19</div>
                              <div className="monthYear">
                                Jun
                                <br />
                                2023
                              </div>
                            </div>
                          </td>
                          <td>
                            EFT {/* code added by rakesh for CC option */}
                            {/* code added by rakesh for CC option */}
                          </td>
                          <td>SAR</td>
                          {/* code modified by Anand on 1 Dec 2012 for 3 digits */}
                          <td>201.300</td>
                          <td>SAR&nbsp;0.000</td>
                          {/* code modified by Anand on 1 Dec 2012 for 3 digits */}
                          <td className="actionlink">
                            <div className="actionCont">
                              <div className="input-group-addon">
                                <Link
                                  data-toggle="tooltip"
                                  data-original-title="Edit"
                                  data-placement="top"
                                  to="javascriptedit_receipts('291','590','201.300','receipt','SAR');"
                                >
                                  <i className="fa fa-pencil-square-o" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="javascriptreceipts_booking_allocation('291','590','201.300','SAR');"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="0.000 Amount for Allocation"
                                >
                                  {/* <img src="images/booking_allocation_gray.gif" data-toggle="tooltip" data-placement="top" border=0 alt="0.000 Amount for Allocation" title='0.000 Amount for Allocation'>&nbsp; */}
                                  <i className="fa fa-pie-chart" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="javascriptreceipts_partial_allocation('291','590','201.300','SAR');"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="Partial Allocation"
                                >
                                  <i className="fa fa-ruble" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="controller.php?page=receipt&action=view&id=590"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="View"
                                >
                                  <i className="fa fa-eye" />
                                  {/*<img src="images/view.gif" border=0 alt="View" title='View' data-toggle="tooltip" data-placement="top">*/}
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <span
                                  id="tool_show"
                                  to="#"
                                  data-toggle="modal"
                                  data-target="#payment_gateway_logs_modal"
                                  title="Payment Gateway Log"
                                  data-params="search_id=&customer_id=&search_agent=&search_payment_mode=&search_payments="
                                  onclick="openPaymentLogModal(2082,291,590,this)"
                                  className="payment-log"
                                >
                                  <i className="fa fa-file" />
                                </span>
                              </div>
                              {/* <div class="input-group-addon">
                          <Link to="payment_gateway_logs.php?log=2082&agentid=291&rptid=590&search_id=&customer_id=&search_agent=&search_payment_mode=&search_payments="
                              data-toggle="tooltip" data-placement="top" title="Payment Gateway Log">
                              <i class="fa fa-file"></i> 
                          </Link>
                      </div> */}
                              {/* code changed by arvind for XR-222 */}
                            </div>
                          </td>
                          <td />
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>
                            <input
                              className="select-option"
                              type="checkbox"
                              name="chk[]"
                              id="chk[]"
                              onclick="check_select_check_box(this)"
                              defaultValue={589}
                            />
                          </td>
                          <td>Rcpt00000589 </td>
                          <td />
                          <td>Sqtech (Sujay Test) </td>
                          <td>
                            <div className="dateWrapper">
                              <div className="onlyDate">19</div>
                              <div className="monthYear">
                                Jun
                                <br />
                                2023
                              </div>
                            </div>
                          </td>
                          <td>
                            EFT {/* code added by rakesh for CC option */}
                            {/* code added by rakesh for CC option */}
                          </td>
                          <td>SAR</td>
                          {/* code modified by Anand on 1 Dec 2012 for 3 digits */}
                          <td>120.473</td>
                          <td>SAR&nbsp;0.000</td>
                          {/* code modified by Anand on 1 Dec 2012 for 3 digits */}
                          <td className="actionlink">
                            <div className="actionCont">
                              <div className="input-group-addon">
                                <Link
                                  data-toggle="tooltip"
                                  data-original-title="Edit"
                                  data-placement="top"
                                  to="javascriptedit_receipts('291','589','120.473','receipt','SAR');"
                                >
                                  <i className="fa fa-pencil-square-o" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="javascriptreceipts_booking_allocation('291','589','120.473','SAR');"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="0.000 Amount for Allocation"
                                >
                                  {/* <img src="images/booking_allocation_gray.gif" data-toggle="tooltip" data-placement="top" border=0 alt="0.000 Amount for Allocation" title='0.000 Amount for Allocation'>&nbsp; */}
                                  <i className="fa fa-pie-chart" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="javascriptreceipts_partial_allocation('291','589','120.473','SAR');"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="Partial Allocation"
                                >
                                  <i className="fa fa-ruble" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="controller.php?page=receipt&action=view&id=589"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="View"
                                >
                                  <i className="fa fa-eye" />
                                  {/*<img src="images/view.gif" border=0 alt="View" title='View' data-toggle="tooltip" data-placement="top">*/}
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <span
                                  id="tool_show"
                                  to="#"
                                  data-toggle="modal"
                                  data-target="#payment_gateway_logs_modal"
                                  title="Payment Gateway Log"
                                  data-params="search_id=&customer_id=&search_agent=&search_payment_mode=&search_payments="
                                  onclick="openPaymentLogModal(2080,291,589,this)"
                                  className="payment-log"
                                >
                                  <i className="fa fa-file" />
                                </span>
                              </div>
                              {/* <div class="input-group-addon">
                          <Link to="payment_gateway_logs.php?log=2080&agentid=291&rptid=589&search_id=&customer_id=&search_agent=&search_payment_mode=&search_payments="
                              data-toggle="tooltip" data-placement="top" title="Payment Gateway Log">
                              <i class="fa fa-file"></i> 
                          </Link>
                      </div> */}
                              {/* code changed by arvind for XR-222 */}
                            </div>
                          </td>
                          <td />
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>
                            <input
                              className="select-option"
                              type="checkbox"
                              name="chk[]"
                              id="chk[]"
                              onclick="check_select_check_box(this)"
                              defaultValue={588}
                            />
                          </td>
                          <td>Rcpt00000588 </td>
                          <td />
                          <td>Sqtech (Sujay Test) </td>
                          <td>
                            <div className="dateWrapper">
                              <div className="onlyDate">16</div>
                              <div className="monthYear">
                                Jun
                                <br />
                                2023
                              </div>
                            </div>
                          </td>
                          <td>
                            EFT {/* code added by rakesh for CC option */}
                            {/* code added by rakesh for CC option */}
                          </td>
                          <td>SAR</td>
                          {/* code modified by Anand on 1 Dec 2012 for 3 digits */}
                          <td>150.807</td>
                          <td>SAR&nbsp;0.000</td>
                          {/* code modified by Anand on 1 Dec 2012 for 3 digits */}
                          <td className="actionlink">
                            <div className="actionCont">
                              <div className="input-group-addon">
                                <Link
                                  data-toggle="tooltip"
                                  data-original-title="Edit"
                                  data-placement="top"
                                  to="javascriptedit_receipts('291','588','150.807','receipt','SAR');"
                                >
                                  <i className="fa fa-pencil-square-o" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="javascriptreceipts_booking_allocation('291','588','150.807','SAR');"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="0.000 Amount for Allocation"
                                >
                                  {/* <img src="images/booking_allocation_gray.gif" data-toggle="tooltip" data-placement="top" border=0 alt="0.000 Amount for Allocation" title='0.000 Amount for Allocation'>&nbsp; */}
                                  <i className="fa fa-pie-chart" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="javascriptreceipts_partial_allocation('291','588','150.807','SAR');"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="Partial Allocation"
                                >
                                  <i className="fa fa-ruble" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="controller.php?page=receipt&action=view&id=588"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="View"
                                >
                                  <i className="fa fa-eye" />
                                  {/*<img src="images/view.gif" border=0 alt="View" title='View' data-toggle="tooltip" data-placement="top">*/}
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <span
                                  id="tool_show"
                                  to="#"
                                  data-toggle="modal"
                                  data-target="#payment_gateway_logs_modal"
                                  title="Payment Gateway Log"
                                  data-params="search_id=&customer_id=&search_agent=&search_payment_mode=&search_payments="
                                  onclick="openPaymentLogModal(2065,291,588,this)"
                                  className="payment-log"
                                >
                                  <i className="fa fa-file" />
                                </span>
                              </div>
                              {/* <div class="input-group-addon">
                          <Link to="payment_gateway_logs.php?log=2065&agentid=291&rptid=588&search_id=&customer_id=&search_agent=&search_payment_mode=&search_payments="
                              data-toggle="tooltip" data-placement="top" title="Payment Gateway Log">
                              <i class="fa fa-file"></i> 
                          </Link>
                      </div> */}
                              {/* code changed by arvind for XR-222 */}
                            </div>
                          </td>
                          <td />
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>
                            <input
                              className="select-option"
                              type="checkbox"
                              name="chk[]"
                              id="chk[]"
                              onclick="check_select_check_box(this)"
                              defaultValue={587}
                            />
                          </td>
                          <td>Rcpt00000587 </td>
                          <td />
                          <td>Sqtech (Sujay Test) </td>
                          <td>
                            <div className="dateWrapper">
                              <div className="onlyDate">16</div>
                              <div className="monthYear">
                                Jun
                                <br />
                                2023
                              </div>
                            </div>
                          </td>
                          <td>
                            EFT {/* code added by rakesh for CC option */}
                            {/* code added by rakesh for CC option */}
                          </td>
                          <td>SAR</td>
                          {/* code modified by Anand on 1 Dec 2012 for 3 digits */}
                          <td>134.070</td>
                          <td>SAR&nbsp;0.000</td>
                          {/* code modified by Anand on 1 Dec 2012 for 3 digits */}
                          <td className="actionlink">
                            <div className="actionCont">
                              <div className="input-group-addon">
                                <Link
                                  data-toggle="tooltip"
                                  data-original-title="Edit"
                                  data-placement="top"
                                  to="javascriptedit_receipts('291','587','134.070','receipt','SAR');"
                                >
                                  <i className="fa fa-pencil-square-o" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="javascriptreceipts_booking_allocation('291','587','134.070','SAR');"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="0.000 Amount for Allocation"
                                >
                                  {/* <img src="images/booking_allocation_gray.gif" data-toggle="tooltip" data-placement="top" border=0 alt="0.000 Amount for Allocation" title='0.000 Amount for Allocation'>&nbsp; */}
                                  <i className="fa fa-pie-chart" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="javascriptreceipts_partial_allocation('291','587','134.070','SAR');"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="Partial Allocation"
                                >
                                  <i className="fa fa-ruble" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="controller.php?page=receipt&action=view&id=587"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="View"
                                >
                                  <i className="fa fa-eye" />
                                  {/*<img src="images/view.gif" border=0 alt="View" title='View' data-toggle="tooltip" data-placement="top">*/}
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <span
                                  id="tool_show"
                                  to="#"
                                  data-toggle="modal"
                                  data-target="#payment_gateway_logs_modal"
                                  title="Payment Gateway Log"
                                  data-params="search_id=&customer_id=&search_agent=&search_payment_mode=&search_payments="
                                  onclick="openPaymentLogModal(2062,291,587,this)"
                                  className="payment-log"
                                >
                                  <i className="fa fa-file" />
                                </span>
                              </div>
                              {/* <div class="input-group-addon">
                          <Link to="payment_gateway_logs.php?log=2062&agentid=291&rptid=587&search_id=&customer_id=&search_agent=&search_payment_mode=&search_payments="
                              data-toggle="tooltip" data-placement="top" title="Payment Gateway Log">
                              <i class="fa fa-file"></i> 
                          </Link>
                      </div> */}
                              {/* code changed by arvind for XR-222 */}
                            </div>
                          </td>
                          <td />
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>
                            <input
                              className="select-option"
                              type="checkbox"
                              name="chk[]"
                              id="chk[]"
                              onclick="check_select_check_box(this)"
                              defaultValue={586}
                            />
                          </td>
                          <td>Rcpt00000586 </td>
                          <td />
                          <td>Sqtech (Sujay Test) </td>
                          <td>
                            <div className="dateWrapper">
                              <div className="onlyDate">16</div>
                              <div className="monthYear">
                                Jun
                                <br />
                                2023
                              </div>
                            </div>
                          </td>
                          <td>
                            EFT {/* code added by rakesh for CC option */}
                            {/* code added by rakesh for CC option */}
                          </td>
                          <td>SAR</td>
                          {/* code modified by Anand on 1 Dec 2012 for 3 digits */}
                          <td>114.321</td>
                          <td>SAR&nbsp;0.000</td>
                          {/* code modified by Anand on 1 Dec 2012 for 3 digits */}
                          <td className="actionlink">
                            <div className="actionCont">
                              <div className="input-group-addon">
                                <Link
                                  data-toggle="tooltip"
                                  data-original-title="Edit"
                                  data-placement="top"
                                  to="javascriptedit_receipts('291','586','114.321','receipt','SAR');"
                                >
                                  <i className="fa fa-pencil-square-o" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="javascriptreceipts_booking_allocation('291','586','114.321','SAR');"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="0.000 Amount for Allocation"
                                >
                                  {/* <img src="images/booking_allocation_gray.gif" data-toggle="tooltip" data-placement="top" border=0 alt="0.000 Amount for Allocation" title='0.000 Amount for Allocation'>&nbsp; */}
                                  <i className="fa fa-pie-chart" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="javascriptreceipts_partial_allocation('291','586','114.321','SAR');"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="Partial Allocation"
                                >
                                  <i className="fa fa-ruble" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="controller.php?page=receipt&action=view&id=586"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="View"
                                >
                                  <i className="fa fa-eye" />
                                  {/*<img src="images/view.gif" border=0 alt="View" title='View' data-toggle="tooltip" data-placement="top">*/}
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <span
                                  id="tool_show"
                                  to="#"
                                  data-toggle="modal"
                                  data-target="#payment_gateway_logs_modal"
                                  title="Payment Gateway Log"
                                  data-params="search_id=&customer_id=&search_agent=&search_payment_mode=&search_payments="
                                  onclick="openPaymentLogModal(2056,291,586,this)"
                                  className="payment-log"
                                >
                                  <i className="fa fa-file" />
                                </span>
                              </div>
                              {/* <div class="input-group-addon">
                          <Link to="payment_gateway_logs.php?log=2056&agentid=291&rptid=586&search_id=&customer_id=&search_agent=&search_payment_mode=&search_payments="
                              data-toggle="tooltip" data-placement="top" title="Payment Gateway Log">
                              <i class="fa fa-file"></i> 
                          </Link>
                      </div> */}
                              {/* code changed by arvind for XR-222 */}
                            </div>
                          </td>
                          <td />
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>
                            <input
                              className="select-option"
                              type="checkbox"
                              name="chk[]"
                              id="chk[]"
                              onclick="check_select_check_box(this)"
                              defaultValue={585}
                            />
                          </td>
                          <td>Rcpt00000585 </td>
                          <td />
                          <td>Sqtech (Sujay Test) </td>
                          <td>
                            <div className="dateWrapper">
                              <div className="onlyDate">16</div>
                              <div className="monthYear">
                                Jun
                                <br />
                                2023
                              </div>
                            </div>
                          </td>
                          <td>
                            EFT {/* code added by rakesh for CC option */}
                            {/* code added by rakesh for CC option */}
                          </td>
                          <td>SAR</td>
                          {/* code modified by Anand on 1 Dec 2012 for 3 digits */}
                          <td>114.321</td>
                          <td>SAR&nbsp;0.000</td>
                          {/* code modified by Anand on 1 Dec 2012 for 3 digits */}
                          <td className="actionlink">
                            <div className="actionCont">
                              <div className="input-group-addon">
                                <Link
                                  data-toggle="tooltip"
                                  data-original-title="Edit"
                                  data-placement="top"
                                  to="javascriptedit_receipts('291','585','114.321','receipt','SAR');"
                                >
                                  <i className="fa fa-pencil-square-o" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="javascriptreceipts_booking_allocation('291','585','114.321','SAR');"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="0.000 Amount for Allocation"
                                >
                                  {/* <img src="images/booking_allocation_gray.gif" data-toggle="tooltip" data-placement="top" border=0 alt="0.000 Amount for Allocation" title='0.000 Amount for Allocation'>&nbsp; */}
                                  <i className="fa fa-pie-chart" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="javascriptreceipts_partial_allocation('291','585','114.321','SAR');"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="Partial Allocation"
                                >
                                  <i className="fa fa-ruble" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="controller.php?page=receipt&action=view&id=585"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="View"
                                >
                                  <i className="fa fa-eye" />
                                  {/*<img src="images/view.gif" border=0 alt="View" title='View' data-toggle="tooltip" data-placement="top">*/}
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <span
                                  id="tool_show"
                                  to="#"
                                  data-toggle="modal"
                                  data-target="#payment_gateway_logs_modal"
                                  title="Payment Gateway Log"
                                  data-params="search_id=&customer_id=&search_agent=&search_payment_mode=&search_payments="
                                  onclick="openPaymentLogModal(2055,291,585,this)"
                                  className="payment-log"
                                >
                                  <i className="fa fa-file" />
                                </span>
                              </div>
                              {/* <div class="input-group-addon">
                          <Link to="payment_gateway_logs.php?log=2055&agentid=291&rptid=585&search_id=&customer_id=&search_agent=&search_payment_mode=&search_payments="
                              data-toggle="tooltip" data-placement="top" title="Payment Gateway Log">
                              <i class="fa fa-file"></i> 
                          </Link>
                      </div> */}
                              {/* code changed by arvind for XR-222 */}
                            </div>
                          </td>
                          <td />
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>
                            <input
                              className="select-option"
                              type="checkbox"
                              name="chk[]"
                              id="chk[]"
                              onclick="check_select_check_box(this)"
                              defaultValue={584}
                            />
                          </td>
                          <td>Rcpt00000584 </td>
                          <td />
                          <td>Sqtech (Sujay Test) </td>
                          <td>
                            <div className="dateWrapper">
                              <div className="onlyDate">16</div>
                              <div className="monthYear">
                                Jun
                                <br />
                                2023
                              </div>
                            </div>
                          </td>
                          <td>
                            EFT {/* code added by rakesh for CC option */}
                            {/* code added by rakesh for CC option */}
                          </td>
                          <td>SAR</td>
                          {/* code modified by Anand on 1 Dec 2012 for 3 digits */}
                          <td>163.500</td>
                          <td>SAR&nbsp;0.000</td>
                          {/* code modified by Anand on 1 Dec 2012 for 3 digits */}
                          <td className="actionlink">
                            <div className="actionCont">
                              <div className="input-group-addon">
                                <Link
                                  data-toggle="tooltip"
                                  data-original-title="Edit"
                                  data-placement="top"
                                  to="javascriptedit_receipts('291','584','163.500','receipt','SAR');"
                                >
                                  <i className="fa fa-pencil-square-o" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="javascriptreceipts_booking_allocation('291','584','163.500','SAR');"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="0.000 Amount for Allocation"
                                >
                                  {/* <img src="images/booking_allocation_gray.gif" data-toggle="tooltip" data-placement="top" border=0 alt="0.000 Amount for Allocation" title='0.000 Amount for Allocation'>&nbsp; */}
                                  <i className="fa fa-pie-chart" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="javascriptreceipts_partial_allocation('291','584','163.500','SAR');"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="Partial Allocation"
                                >
                                  <i className="fa fa-ruble" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="controller.php?page=receipt&action=view&id=584"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="View"
                                >
                                  <i className="fa fa-eye" />
                                  {/*<img src="images/view.gif" border=0 alt="View" title='View' data-toggle="tooltip" data-placement="top">*/}
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <span
                                  id="tool_show"
                                  to="#"
                                  data-toggle="modal"
                                  data-target="#payment_gateway_logs_modal"
                                  title="Payment Gateway Log"
                                  data-params="search_id=&customer_id=&search_agent=&search_payment_mode=&search_payments="
                                  onclick="openPaymentLogModal(2054,291,584,this)"
                                  className="payment-log"
                                >
                                  <i className="fa fa-file" />
                                </span>
                              </div>
                              {/* <div class="input-group-addon">
                          <Link to="payment_gateway_logs.php?log=2054&agentid=291&rptid=584&search_id=&customer_id=&search_agent=&search_payment_mode=&search_payments="
                              data-toggle="tooltip" data-placement="top" title="Payment Gateway Log">
                              <i class="fa fa-file"></i> 
                          </Link>
                      </div> */}
                              {/* code changed by arvind for XR-222 */}
                            </div>
                          </td>
                          <td />
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>
                            <input
                              className="select-option"
                              type="checkbox"
                              name="chk[]"
                              id="chk[]"
                              onclick="check_select_check_box(this)"
                              defaultValue={583}
                            />
                          </td>
                          <td>Rcpt00000583 </td>
                          <td />
                          <td>Sqtech (Sujay Test) </td>
                          <td>
                            <div className="dateWrapper">
                              <div className="onlyDate">16</div>
                              <div className="monthYear">
                                Jun
                                <br />
                                2023
                              </div>
                            </div>
                          </td>
                          <td>
                            EFT {/* code added by rakesh for CC option */}
                            {/* code added by rakesh for CC option */}
                          </td>
                          <td>SAR</td>
                          {/* code modified by Anand on 1 Dec 2012 for 3 digits */}
                          <td>115.525</td>
                          <td>SAR&nbsp;0.000</td>
                          {/* code modified by Anand on 1 Dec 2012 for 3 digits */}
                          <td className="actionlink">
                            <div className="actionCont">
                              <div className="input-group-addon">
                                <Link
                                  data-toggle="tooltip"
                                  data-original-title="Edit"
                                  data-placement="top"
                                  to="javascriptedit_receipts('291','583','115.525','receipt','SAR');"
                                >
                                  <i className="fa fa-pencil-square-o" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="javascriptreceipts_booking_allocation('291','583','115.525','SAR');"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="0.000 Amount for Allocation"
                                >
                                  {/* <img src="images/booking_allocation_gray.gif" data-toggle="tooltip" data-placement="top" border=0 alt="0.000 Amount for Allocation" title='0.000 Amount for Allocation'>&nbsp; */}
                                  <i className="fa fa-pie-chart" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="javascriptreceipts_partial_allocation('291','583','115.525','SAR');"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="Partial Allocation"
                                >
                                  <i className="fa fa-ruble" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="controller.php?page=receipt&action=view&id=583"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="View"
                                >
                                  <i className="fa fa-eye" />
                                  {/*<img src="images/view.gif" border=0 alt="View" title='View' data-toggle="tooltip" data-placement="top">*/}
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <span
                                  id="tool_show"
                                  to="#"
                                  data-toggle="modal"
                                  data-target="#payment_gateway_logs_modal"
                                  title="Payment Gateway Log"
                                  data-params="search_id=&customer_id=&search_agent=&search_payment_mode=&search_payments="
                                  onclick="openPaymentLogModal(2051,291,583,this)"
                                  className="payment-log"
                                >
                                  <i className="fa fa-file" />
                                </span>
                              </div>
                              {/* <div class="input-group-addon">
                          <Link to="payment_gateway_logs.php?log=2051&agentid=291&rptid=583&search_id=&customer_id=&search_agent=&search_payment_mode=&search_payments="
                              data-toggle="tooltip" data-placement="top" title="Payment Gateway Log">
                              <i class="fa fa-file"></i> 
                          </Link>
                      </div> */}
                              {/* code changed by arvind for XR-222 */}
                            </div>
                          </td>
                          <td />
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>
                            <input
                              className="select-option"
                              type="checkbox"
                              name="chk[]"
                              id="chk[]"
                              onclick="check_select_check_box(this)"
                              defaultValue={582}
                            />
                          </td>
                          <td>Rcpt00000582 </td>
                          <td />
                          <td>Sqtech (Sujay Test) </td>
                          <td>
                            <div className="dateWrapper">
                              <div className="onlyDate">16</div>
                              <div className="monthYear">
                                Jun
                                <br />
                                2023
                              </div>
                            </div>
                          </td>
                          <td>
                            EFT {/* code added by rakesh for CC option */}
                            {/* code added by rakesh for CC option */}
                          </td>
                          <td>SAR</td>
                          {/* code modified by Anand on 1 Dec 2012 for 3 digits */}
                          <td>115.525</td>
                          <td>SAR&nbsp;0.000</td>
                          {/* code modified by Anand on 1 Dec 2012 for 3 digits */}
                          <td className="actionlink">
                            <div className="actionCont">
                              <div className="input-group-addon">
                                <Link
                                  data-toggle="tooltip"
                                  data-original-title="Edit"
                                  data-placement="top"
                                  to="javascriptedit_receipts('291','582','115.525','receipt','SAR');"
                                >
                                  <i className="fa fa-pencil-square-o" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="javascriptreceipts_booking_allocation('291','582','115.525','SAR');"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="0.000 Amount for Allocation"
                                >
                                  {/* <img src="images/booking_allocation_gray.gif" data-toggle="tooltip" data-placement="top" border=0 alt="0.000 Amount for Allocation" title='0.000 Amount for Allocation'>&nbsp; */}
                                  <i className="fa fa-pie-chart" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="javascriptreceipts_partial_allocation('291','582','115.525','SAR');"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="Partial Allocation"
                                >
                                  <i className="fa fa-ruble" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="controller.php?page=receipt&action=view&id=582"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="View"
                                >
                                  <i className="fa fa-eye" />
                                  {/*<img src="images/view.gif" border=0 alt="View" title='View' data-toggle="tooltip" data-placement="top">*/}
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <span
                                  id="tool_show"
                                  to="#"
                                  data-toggle="modal"
                                  data-target="#payment_gateway_logs_modal"
                                  title="Payment Gateway Log"
                                  data-params="search_id=&customer_id=&search_agent=&search_payment_mode=&search_payments="
                                  onclick="openPaymentLogModal(2049,291,582,this)"
                                  className="payment-log"
                                >
                                  <i className="fa fa-file" />
                                </span>
                              </div>
                              {/* <div class="input-group-addon">
                          <Link to="payment_gateway_logs.php?log=2049&agentid=291&rptid=582&search_id=&customer_id=&search_agent=&search_payment_mode=&search_payments="
                              data-toggle="tooltip" data-placement="top" title="Payment Gateway Log">
                              <i class="fa fa-file"></i> 
                          </Link>
                      </div> */}
                              {/* code changed by arvind for XR-222 */}
                            </div>
                          </td>
                          <td />
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>
                            <input
                              className="select-option"
                              type="checkbox"
                              name="chk[]"
                              id="chk[]"
                              onclick="check_select_check_box(this)"
                              defaultValue={581}
                            />
                          </td>
                          <td>Rcpt00000581 </td>
                          <td />
                          <td>Sqtech (Sujay Test) </td>
                          <td>
                            <div className="dateWrapper">
                              <div className="onlyDate">15</div>
                              <div className="monthYear">
                                Jun
                                <br />
                                2023
                              </div>
                            </div>
                          </td>
                          <td>
                            EFT {/* code added by rakesh for CC option */}
                            {/* code added by rakesh for CC option */}
                          </td>
                          <td>SAR</td>
                          {/* code modified by Anand on 1 Dec 2012 for 3 digits */}
                          <td>126.153</td>
                          <td>SAR&nbsp;0.000</td>
                          {/* code modified by Anand on 1 Dec 2012 for 3 digits */}
                          <td className="actionlink">
                            <div className="actionCont">
                              <div className="input-group-addon">
                                <Link
                                  data-toggle="tooltip"
                                  data-original-title="Edit"
                                  data-placement="top"
                                  to="javascriptedit_receipts('291','581','126.153','receipt','SAR');"
                                >
                                  <i className="fa fa-pencil-square-o" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="javascriptreceipts_booking_allocation('291','581','126.153','SAR');"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="0.000 Amount for Allocation"
                                >
                                  {/* <img src="images/booking_allocation_gray.gif" data-toggle="tooltip" data-placement="top" border=0 alt="0.000 Amount for Allocation" title='0.000 Amount for Allocation'>&nbsp; */}
                                  <i className="fa fa-pie-chart" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="javascriptreceipts_partial_allocation('291','581','126.153','SAR');"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="Partial Allocation"
                                >
                                  <i className="fa fa-ruble" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="controller.php?page=receipt&action=view&id=581"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="View"
                                >
                                  <i className="fa fa-eye" />
                                  {/*<img src="images/view.gif" border=0 alt="View" title='View' data-toggle="tooltip" data-placement="top">*/}
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <span
                                  id="tool_show"
                                  to="#"
                                  data-toggle="modal"
                                  data-target="#payment_gateway_logs_modal"
                                  title="Payment Gateway Log"
                                  data-params="search_id=&customer_id=&search_agent=&search_payment_mode=&search_payments="
                                  onclick="openPaymentLogModal(2032,291,581,this)"
                                  className="payment-log"
                                >
                                  <i className="fa fa-file" />
                                </span>
                              </div>
                              {/* <div class="input-group-addon">
                          <Link to="payment_gateway_logs.php?log=2032&agentid=291&rptid=581&search_id=&customer_id=&search_agent=&search_payment_mode=&search_payments="
                              data-toggle="tooltip" data-placement="top" title="Payment Gateway Log">
                              <i class="fa fa-file"></i> 
                          </Link>
                      </div> */}
                              {/* code changed by arvind for XR-222 */}
                            </div>
                          </td>
                          <td />
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>
                            <input
                              className="select-option"
                              type="checkbox"
                              name="chk[]"
                              id="chk[]"
                              onclick="check_select_check_box(this)"
                              defaultValue={580}
                            />
                          </td>
                          <td>Rcpt00000580 </td>
                          <td />
                          <td>Sqtech (Sujay Test) </td>
                          <td>
                            <div className="dateWrapper">
                              <div className="onlyDate">15</div>
                              <div className="monthYear">
                                Jun
                                <br />
                                2023
                              </div>
                            </div>
                          </td>
                          <td>
                            EFT {/* code added by rakesh for CC option */}
                            {/* code added by rakesh for CC option */}
                          </td>
                          <td>SAR</td>
                          {/* code modified by Anand on 1 Dec 2012 for 3 digits */}
                          <td>289.222</td>
                          <td>SAR&nbsp;0.000</td>
                          {/* code modified by Anand on 1 Dec 2012 for 3 digits */}
                          <td className="actionlink">
                            <div className="actionCont">
                              <div className="input-group-addon">
                                <Link
                                  data-toggle="tooltip"
                                  data-original-title="Edit"
                                  data-placement="top"
                                  to="javascriptedit_receipts('291','580','289.222','receipt','SAR');"
                                >
                                  <i className="fa fa-pencil-square-o" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="javascriptreceipts_booking_allocation('291','580','289.222','SAR');"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="0.000 Amount for Allocation"
                                >
                                  {/* <img src="images/booking_allocation_gray.gif" data-toggle="tooltip" data-placement="top" border=0 alt="0.000 Amount for Allocation" title='0.000 Amount for Allocation'>&nbsp; */}
                                  <i className="fa fa-pie-chart" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="javascriptreceipts_partial_allocation('291','580','289.222','SAR');"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="Partial Allocation"
                                >
                                  <i className="fa fa-ruble" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="controller.php?page=receipt&action=view&id=580"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="View"
                                >
                                  <i className="fa fa-eye" />
                                  {/*<img src="images/view.gif" border=0 alt="View" title='View' data-toggle="tooltip" data-placement="top">*/}
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <span
                                  id="tool_show"
                                  to="#"
                                  data-toggle="modal"
                                  data-target="#payment_gateway_logs_modal"
                                  title="Payment Gateway Log"
                                  data-params="search_id=&customer_id=&search_agent=&search_payment_mode=&search_payments="
                                  onclick="openPaymentLogModal(2030,291,580,this)"
                                  className="payment-log"
                                >
                                  <i className="fa fa-file" />
                                </span>
                              </div>
                              {/* <div class="input-group-addon">
                          <Link to="payment_gateway_logs.php?log=2030&agentid=291&rptid=580&search_id=&customer_id=&search_agent=&search_payment_mode=&search_payments="
                              data-toggle="tooltip" data-placement="top" title="Payment Gateway Log">
                              <i class="fa fa-file"></i> 
                          </Link>
                      </div> */}
                              {/* code changed by arvind for XR-222 */}
                            </div>
                          </td>
                          <td />
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td>
                            <input
                              className="select-option"
                              type="checkbox"
                              name="chk[]"
                              id="chk[]"
                              onclick="check_select_check_box(this)"
                              defaultValue={579}
                            />
                          </td>
                          <td>Rcpt00000579 </td>
                          <td />
                          <td>Sqtech (Sujay Test) </td>
                          <td>
                            <div className="dateWrapper">
                              <div className="onlyDate">15</div>
                              <div className="monthYear">
                                Jun
                                <br />
                                2023
                              </div>
                            </div>
                          </td>
                          <td>
                            EFT {/* code added by rakesh for CC option */}
                            {/* code added by rakesh for CC option */}
                          </td>
                          <td>SAR</td>
                          {/* code modified by Anand on 1 Dec 2012 for 3 digits */}
                          <td>822.532</td>
                          <td>SAR&nbsp;0.000</td>
                          {/* code modified by Anand on 1 Dec 2012 for 3 digits */}
                          <td className="actionlink">
                            <div className="actionCont">
                              <div className="input-group-addon">
                                <Link
                                  data-toggle="tooltip"
                                  data-original-title="Edit"
                                  data-placement="top"
                                  to="javascriptedit_receipts('291','579','822.532','receipt','SAR');"
                                >
                                  <i className="fa fa-pencil-square-o" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="javascriptreceipts_booking_allocation('291','579','822.532','SAR');"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="0.000 Amount for Allocation"
                                >
                                  {/* <img src="images/booking_allocation_gray.gif" data-toggle="tooltip" data-placement="top" border=0 alt="0.000 Amount for Allocation" title='0.000 Amount for Allocation'>&nbsp; */}
                                  <i className="fa fa-pie-chart" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="javascriptreceipts_partial_allocation('291','579','822.532','SAR');"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="Partial Allocation"
                                >
                                  <i className="fa fa-ruble" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="controller.php?page=receipt&action=view&id=579"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="View"
                                >
                                  <i className="fa fa-eye" />
                                  {/*<img src="images/view.gif" border=0 alt="View" title='View' data-toggle="tooltip" data-placement="top">*/}
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <span
                                  id="tool_show"
                                  to="#"
                                  data-toggle="modal"
                                  data-target="#payment_gateway_logs_modal"
                                  title="Payment Gateway Log"
                                  data-params="search_id=&customer_id=&search_agent=&search_payment_mode=&search_payments="
                                  onclick="openPaymentLogModal(2029,291,579,this)"
                                  className="payment-log"
                                >
                                  <i className="fa fa-file" />
                                </span>
                              </div>
                              {/* <div class="input-group-addon">
                          <Link to="payment_gateway_logs.php?log=2029&agentid=291&rptid=579&search_id=&customer_id=&search_agent=&search_payment_mode=&search_payments="
                              data-toggle="tooltip" data-placement="top" title="Payment Gateway Log">
                              <i class="fa fa-file"></i> 
                          </Link>
                      </div> */}
                              {/* code changed by arvind for XR-222 */}
                            </div>
                          </td>
                          <td />
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td>
                            <input
                              className="select-option"
                              type="checkbox"
                              name="chk[]"
                              id="chk[]"
                              onclick="check_select_check_box(this)"
                              defaultValue={578}
                            />
                          </td>
                          <td>Rcpt00000578 </td>
                          <td />
                          <td>Sqtech (Sujay Test) </td>
                          <td>
                            <div className="dateWrapper">
                              <div className="onlyDate">15</div>
                              <div className="monthYear">
                                Jun
                                <br />
                                2023
                              </div>
                            </div>
                          </td>
                          <td>
                            EFT {/* code added by rakesh for CC option */}
                            {/* code added by rakesh for CC option */}
                          </td>
                          <td>SAR</td>
                          {/* code modified by Anand on 1 Dec 2012 for 3 digits */}
                          <td>114.321</td>
                          <td>SAR&nbsp;0.000</td>
                          {/* code modified by Anand on 1 Dec 2012 for 3 digits */}
                          <td className="actionlink">
                            <div className="actionCont">
                              <div className="input-group-addon">
                                <Link
                                  data-toggle="tooltip"
                                  data-original-title="Edit"
                                  data-placement="top"
                                  to="javascriptedit_receipts('291','578','114.321','receipt','SAR');"
                                >
                                  <i className="fa fa-pencil-square-o" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="javascriptreceipts_booking_allocation('291','578','114.321','SAR');"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="0.000 Amount for Allocation"
                                >
                                  {/* <img src="images/booking_allocation_gray.gif" data-toggle="tooltip" data-placement="top" border=0 alt="0.000 Amount for Allocation" title='0.000 Amount for Allocation'>&nbsp; */}
                                  <i className="fa fa-pie-chart" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="javascriptreceipts_partial_allocation('291','578','114.321','SAR');"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="Partial Allocation"
                                >
                                  <i className="fa fa-ruble" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="controller.php?page=receipt&action=view&id=578"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="View"
                                >
                                  <i className="fa fa-eye" />
                                  {/*<img src="images/view.gif" border=0 alt="View" title='View' data-toggle="tooltip" data-placement="top">*/}
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <span
                                  id="tool_show"
                                  to="#"
                                  data-toggle="modal"
                                  data-target="#payment_gateway_logs_modal"
                                  title="Payment Gateway Log"
                                  data-params="search_id=&customer_id=&search_agent=&search_payment_mode=&search_payments="
                                  onclick="openPaymentLogModal(2027,291,578,this)"
                                  className="payment-log"
                                >
                                  <i className="fa fa-file" />
                                </span>
                              </div>
                              {/* <div class="input-group-addon">
                          <Link to="payment_gateway_logs.php?log=2027&agentid=291&rptid=578&search_id=&customer_id=&search_agent=&search_payment_mode=&search_payments="
                              data-toggle="tooltip" data-placement="top" title="Payment Gateway Log">
                              <i class="fa fa-file"></i> 
                          </Link>
                      </div> */}
                              {/* code changed by arvind for XR-222 */}
                            </div>
                          </td>
                          <td />
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <nav aria-label="Page navigation example">
                <ul className="pagination pagination-sm justify-content-center mt-4">
                  <li className="page-item">
                    <Link className="page-link" to="#" aria-label="Previous">
                      <span aria-hidden="true">«</span>
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
                    <Link className="page-link" to="#" aria-label="Next">
                      <span aria-hidden="true">»</span>
                    </Link>
                  </li>
                </ul>
              </nav>
              <div className="row">
                <div className="col-sm-6">
                  <div
                    className="dataTables_info"
                    id="search_controller_info"
                    role="status"
                    aria-live="polite"
                  ></div>
                </div>
                <div className="col-sm-6" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default AccountsAgentRecieptSearch;
