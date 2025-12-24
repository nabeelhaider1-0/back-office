import React, { useState } from "react"; // Import React and useState
import Flatpickr from "react-flatpickr";
import { Link } from "react-router-dom";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";
import MultiSelect from "../reactMultiSelect";
import { addrule_agent_options } from "../../constants/contants";

const AccountsAgentCreditSearch = () => {
  const [startDate, setStartDate] = useState(null); // State for the start date
  const handleTrashClick = () => {
    // Function to clear both start and end dates
    setStartDate(null);
  };

  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <Header2
          title="SEARCH CREDIT NOTE"
          linkText1="Search Credit Notes"
          linkText2="Add Credit Note"
          link1={Constants.URLConstants.ACCOUNTSAGENTCREDITNEW}
        />

        <div>
          <form>
            <div className="row">
              <div className="col-md-3 form-group">
                <label>Document #</label>
                <input
                  className="form-control form-control-sm test123"
                  type="text"
                  name="search_id"
                />
              </div>
              <div className="col-md-3 form-group">
                <label>Agent</label>
                <MultiSelect
                  options={addrule_agent_options}
                  isSearchable
                  placeholder="- Select Agent -"
                  noOptionsMessage={() => "No Agent Found"}
                  className="custom-select"
                />
              </div>
              <div className="col-md-3 form-group">
                <label>Credit Note Date</label>
                <div className="row">
                  <div className="col-md-11 col-sm-11 col-xs-11 dateField">
                    <div
                      className="input-group date col-md-12 col-sm-12 col-xs-12"
                      id="booking_to_date_cal"
                    >
                      <Flatpickr
                        value={startDate}
                        onChange={(date) => setStartDate(date)}
                        options={{ dateFormat: "Y-m-d" }}
                        style={{ width: "273.5px" }}
                      />
                      <span className="input-group-addon">
                        <i className="fa fa-th" />
                      </span>
                    </div>
                  </div>
                  <div
                    className="col-md-1 col-sm-1 col-xs-1 row"
                    style={{ padding: "0px", cursor: "pointer" }}
                  >
                    <span
                      className="input-group-addon pointer"
                      onClick={handleTrashClick}
                      style={{ textAlign: "center" }}
                    >
                      <i className="fa fa-trash" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-md-3 form-group">
                <label>Received</label>
                <input
                  className="form-control form-control-sm"
                  type="text"
                  name="search_payments"
                  id="search_payments"
                />
              </div>
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
              <div className="col-md-1 form-group" />
              <div className="col-md-6 form-group">
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
                      <Link className="page-link" to="#" aria-label="Next">
                        <span aria-hidden="true">»</span>
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="col-md-2 form-group" />
            </div>
            <div className="row">
              <div className="col-md-2 form-group" />
              <div className="col-md-2 form-group" />
              <div className="col-md-6 form-group" />
              <div className="col-md-2 form-group mt-3">
                <div
                  id="search_creadit_note_filter"
                  className="dataTables_filter"
                >
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
            {/* Table Creation */}
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
                    id="search_creadit_note"
                    className="table   table-responsive dataTable no-footer table-bordered"
                    role="grid"
                    aria-describedby="search_creadit_note_info"
                  >
                    <thead>
                      <tr role="row">
                        <th
                          className="sorting_disabled"
                          rowSpan={1}
                          colSpan={1}
                          style={{ width: "199px" }}
                        >
                          Document #
                        </th>
                        <th
                          className="sorting_disabled"
                          rowSpan={1}
                          colSpan={1}
                          style={{ width: "512px" }}
                        >
                          Agent
                        </th>
                        <th
                          className="sorting_disabled"
                          rowSpan={1}
                          colSpan={1}
                          style={{ width: "247px" }}
                        >
                          Credit Note Date
                        </th>
                        <th
                          className="sorting_disabled"
                          rowSpan={1}
                          colSpan={1}
                          style={{ width: "176px" }}
                        >
                          Received&nbsp;
                        </th>
                        <th
                          className="sorting_disabled"
                          rowSpan={1}
                          colSpan={1}
                          style={{ width: "124px" }}
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      <tr className="phps_row_1 odd" role="row">
                        <td align="left">&nbsp;2021/12102 </td>
                        <td align="left">
                          &nbsp;Vartak Holidazzle (Rohan Vartak){" "}
                        </td>
                        <td align="left">
                          <div className="dateWrapper">
                            <div className="onlyDate">13</div>
                            <div className="monthYear">
                              Oct
                              <br />
                              2021
                            </div>
                          </div>
                        </td>
                        <td align="left">&nbsp;2,000.00</td>
                        <td align="center" className="actionlink">
                          <div className="actionCont" style={{ width: "29px" }}>
                            <div className="input-group-addon">
                              <Link
                                to={
                                  Constants.URLConstants.ACCOUNTSAGENTCREDITVIEW
                                }
                                data-toggle="tooltip"
                                data-original-title="View"
                                data-placement="top"
                              >
                                <i className="fa fa-eye" />
                              </Link>
                            </div>
                          </div>
                          <div className="input-group-addon">
                            <Link
                              to="javaScriptconfirm_del('controller.php?page=credit_note&action=delete&id=478&search_id=&search_agent=&search_payment_mode=&search_payments=');"
                              data-toggle="tooltip"
                              data-placement="top"
                              title
                              data-original-title="Delete"
                            >
                              <i className="fa fa-trash" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                      <tr className="phps_row_0 even" role="row">
                        <td align="left">&nbsp;CN00000062 </td>
                        <td align="left">&nbsp;Sayali (Sayali Patil) </td>
                        <td align="left">
                          <div className="dateWrapper">
                            <div className="onlyDate">29</div>
                            <div className="monthYear">
                              Jun
                              <br />
                              2021
                            </div>
                          </div>
                        </td>
                        <td align="left">&nbsp;591.33</td>
                        <td align="center" className="actionlink">
                          <div className="actionCont" style={{ width: "29px" }}>
                            <div className="input-group-addon">
                              <Link
                                to="accountsviewcredit.html"
                                data-toggle="tooltip"
                                data-original-title="View"
                                data-placement="top"
                              >
                                <i className="fa fa-eye" />
                              </Link>
                            </div>
                          </div>
                          <div className="input-group-addon">
                            <Link
                              to="javaScriptconfirm_del('controller.php?page=credit_note&action=delete&id=469&search_id=&search_agent=&search_payment_mode=&search_payments=');"
                              data-toggle="tooltip"
                              data-placement="top"
                              title
                              data-original-title="Delete"
                            >
                              <i className="fa fa-trash" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                      <tr className="phps_row_1 odd" role="row">
                        <td align="left">&nbsp;CN00000061 </td>
                        <td align="left">&nbsp;Flyron (Flyron Flyron) </td>
                        <td align="left">
                          <div className="dateWrapper">
                            <div className="onlyDate">14</div>
                            <div className="monthYear">
                              Jun
                              <br />
                              2021
                            </div>
                          </div>
                        </td>
                        <td align="left">&nbsp;20.00</td>
                        <td align="center" className="actionlink">
                          <div className="actionCont" style={{ width: "29px" }}>
                            <div className="input-group-addon">
                              <Link
                                to="accountsviewcredit.html"
                                data-toggle="tooltip"
                                data-original-title="View"
                                data-placement="top"
                              >
                                <i className="fa fa-eye" />
                              </Link>
                            </div>
                          </div>
                          <div className="input-group-addon">
                            <Link
                              to="javaScriptconfirm_del('controller.php?page=credit_note&action=delete&id=467&search_id=&search_agent=&search_payment_mode=&search_payments=');"
                              data-toggle="tooltip"
                              data-placement="top"
                              title
                              data-original-title="Delete"
                            >
                              <i className="fa fa-trash" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                      <tr className="phps_row_0 even" role="row">
                        <td align="left">&nbsp;CN00000060 </td>
                        <td align="left">
                          &nbsp;Vartak Holidazzle (Rohan Vartak){" "}
                        </td>
                        <td align="left">
                          <div className="dateWrapper">
                            <div className="onlyDate">14</div>
                            <div className="monthYear">
                              Jun
                              <br />
                              2021
                            </div>
                          </div>
                        </td>
                        <td align="left">&nbsp;1,595.80</td>
                        <td align="center" className="actionlink">
                          <div className="actionCont" style={{ width: "29px" }}>
                            <div className="input-group-addon">
                              <Link
                                to="accountsviewcredit.html"
                                data-toggle="tooltip"
                                data-original-title="View"
                                data-placement="top"
                              >
                                <i className="fa fa-eye" />
                              </Link>
                            </div>
                          </div>
                          <div className="input-group-addon">
                            <Link
                              to="javaScriptconfirm_del('controller.php?page=credit_note&action=delete&id=465&search_id=&search_agent=&search_payment_mode=&search_payments=');"
                              data-toggle="tooltip"
                              data-placement="top"
                              title
                              data-original-title="Delete"
                            >
                              <i className="fa fa-trash" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                      <tr className="phps_row_1 odd" role="row">
                        <td align="left">&nbsp;CN00000059 </td>
                        <td align="left">
                          &nbsp;Vartak Holidazzle (Rohan Vartak){" "}
                        </td>
                        <td align="left">
                          <div className="dateWrapper">
                            <div className="onlyDate">08</div>
                            <div className="monthYear">
                              Jun
                              <br />
                              2021
                            </div>
                          </div>
                        </td>
                        <td align="left">&nbsp;96.70</td>
                        <td align="center" className="actionlink">
                          <div className="actionCont" style={{ width: "29px" }}>
                            <div className="input-group-addon">
                              <Link
                                to="accountsviewcredit.html"
                                data-toggle="tooltip"
                                data-original-title="View"
                                data-placement="top"
                              >
                                <i className="fa fa-eye" />
                              </Link>
                            </div>
                          </div>
                          <div className="input-group-addon">
                            <Link
                              to="javaScriptconfirm_del('controller.php?page=credit_note&action=delete&id=463&search_id=&search_agent=&search_payment_mode=&search_payments=');"
                              data-toggle="tooltip"
                              data-placement="top"
                              title
                              data-original-title="Delete"
                            >
                              <i className="fa fa-trash" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                      <tr className="phps_row_0 even" role="row">
                        <td align="left">&nbsp;CN00000058 </td>
                        <td align="left">
                          &nbsp;Vartak Holidazzle (Rohan Vartak){" "}
                        </td>
                        <td align="left">
                          <div className="dateWrapper">
                            <div className="onlyDate">03</div>
                            <div className="monthYear">
                              Jun
                              <br />
                              2021
                            </div>
                          </div>
                        </td>
                        <td align="left">&nbsp;1,778.21</td>
                        <td align="center" className="actionlink">
                          <div className="actionCont" style={{ width: "29px" }}>
                            <div className="input-group-addon">
                              <Link
                                to="accountsviewcredit.html"
                                data-toggle="tooltip"
                                data-original-title="View"
                                data-placement="top"
                              >
                                <i className="fa fa-eye" />
                              </Link>
                            </div>
                          </div>
                          <div className="input-group-addon">
                            <Link
                              to="javaScriptconfirm_del('controller.php?page=credit_note&action=delete&id=452&search_id=&search_agent=&search_payment_mode=&search_payments=');"
                              data-toggle="tooltip"
                              data-placement="top"
                              title
                              data-original-title="Delete"
                            >
                              <i className="fa fa-trash" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                      <tr className="phps_row_1 odd" role="row">
                        <td align="left">&nbsp;CN00000057 </td>
                        <td align="left">&nbsp;Sayali (Sayali Patil) </td>
                        <td align="left">
                          <div className="dateWrapper">
                            <div className="onlyDate">11</div>
                            <div className="monthYear">
                              May
                              <br />
                              2021
                            </div>
                          </div>
                        </td>
                        <td align="left">&nbsp;100.00</td>
                        <td align="center" className="actionlink">
                          <div className="actionCont" style={{ width: "29px" }}>
                            <div className="input-group-addon">
                              <Link
                                to="accountsviewcredit.html"
                                data-toggle="tooltip"
                                data-original-title="View"
                                data-placement="top"
                              >
                                <i className="fa fa-eye" />
                              </Link>
                            </div>
                          </div>
                          <div className="input-group-addon">
                            <Link
                              to="javaScriptconfirm_del('controller.php?page=credit_note&action=delete&id=403&search_id=&search_agent=&search_payment_mode=&search_payments=');"
                              data-toggle="tooltip"
                              data-placement="top"
                              title
                              data-original-title="Delete"
                            >
                              <i className="fa fa-trash" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                      <tr className="phps_row_0 even" role="row">
                        <td align="left">&nbsp;2021/11402 </td>
                        <td align="left">&nbsp;Sayali (Sayali Patil) </td>
                        <td align="left">
                          <div className="dateWrapper">
                            <div className="onlyDate">02</div>
                            <div className="monthYear">
                              Mar
                              <br />
                              2021
                            </div>
                          </div>
                        </td>
                        <td align="left">&nbsp;0.00</td>
                        <td align="center" className="actionlink">
                          <div className="actionCont" style={{ width: "29px" }}>
                            <div className="input-group-addon">
                              <Link
                                to="accountsviewcredit.html"
                                data-toggle="tooltip"
                                data-original-title="View"
                                data-placement="top"
                              >
                                <i className="fa fa-eye" />
                              </Link>
                            </div>
                          </div>
                          <div className="input-group-addon">
                            <Link
                              to="javaScriptconfirm_del('controller.php?page=credit_note&action=delete&id=339&search_id=&search_agent=&search_payment_mode=&search_payments=');"
                              data-toggle="tooltip"
                              data-placement="top"
                              title
                              data-original-title="Delete"
                            >
                              <i className="fa fa-trash" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                      <tr className="phps_row_1 odd" role="row">
                        <td align="left">&nbsp;2021/11313 </td>
                        <td align="left">&nbsp;Sayali (Sayali Patil) </td>
                        <td align="left">
                          <div className="dateWrapper">
                            <div className="onlyDate">24</div>
                            <div className="monthYear">
                              Feb
                              <br />
                              2021
                            </div>
                          </div>
                        </td>
                        <td align="left">&nbsp;3,000.00</td>
                        <td align="center" className="actionlink">
                          <div className="actionCont" style={{ width: "29px" }}>
                            <div className="input-group-addon">
                              <Link
                                to="accountsviewcredit.html"
                                data-toggle="tooltip"
                                data-original-title="View"
                                data-placement="top"
                              >
                                <i className="fa fa-eye" />
                              </Link>
                            </div>
                          </div>
                          <div className="input-group-addon">
                            <Link
                              to="javaScriptconfirm_del('controller.php?page=credit_note&action=delete&id=332&search_id=&search_agent=&search_payment_mode=&search_payments=');"
                              data-toggle="tooltip"
                              data-placement="top"
                              title
                              data-original-title="Delete"
                            >
                              <i className="fa fa-trash" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                      <tr className="phps_row_0 even" role="row">
                        <td align="left">&nbsp;2021/11355 </td>
                        <td align="left">&nbsp;Sayali (Sayali Patil) </td>
                        <td align="left">
                          <div className="dateWrapper">
                            <div className="onlyDate">22</div>
                            <div className="monthYear">
                              Feb
                              <br />
                              2021
                            </div>
                          </div>
                        </td>
                        <td align="left">&nbsp;1,678.94</td>
                        <td align="center" className="actionlink">
                          <div className="actionCont" style={{ width: "29px" }}>
                            <div className="input-group-addon">
                              <Link
                                to="accountsviewcredit.html"
                                data-toggle="tooltip"
                                data-original-title="View"
                                data-placement="top"
                              >
                                <i className="fa fa-eye" />
                              </Link>
                            </div>
                          </div>
                          <div className="input-group-addon">
                            <Link
                              to="javaScriptconfirm_del('controller.php?page=credit_note&action=delete&id=326&search_id=&search_agent=&search_payment_mode=&search_payments=');"
                              data-toggle="tooltip"
                              data-placement="top"
                              title
                              data-original-title="Delete"
                            >
                              <i className="fa fa-trash" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                      <tr className="phps_row_1 odd" role="row">
                        <td align="left">&nbsp;2021/11355 </td>
                        <td align="left">&nbsp;Sayali (Sayali Patil) </td>
                        <td align="left">
                          <div className="dateWrapper">
                            <div className="onlyDate">22</div>
                            <div className="monthYear">
                              Feb
                              <br />
                              2021
                            </div>
                          </div>
                        </td>
                        <td align="left">&nbsp;1,000.00</td>
                        <td align="center" className="actionlink">
                          <div className="actionCont" style={{ width: "29px" }}>
                            <div className="input-group-addon">
                              <Link
                                to="accountsviewcredit.html"
                                data-toggle="tooltip"
                                data-original-title="View"
                                data-placement="top"
                              >
                                <i className="fa fa-eye" />
                              </Link>
                            </div>
                          </div>
                          <div className="input-group-addon">
                            <Link
                              to="javaScriptconfirm_del('controller.php?page=credit_note&action=delete&id=325&search_id=&search_agent=&search_payment_mode=&search_payments=');"
                              data-toggle="tooltip"
                              data-placement="top"
                              title
                              data-original-title="Delete"
                            >
                              <i className="fa fa-trash" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                      <tr className="phps_row_0 even" role="row">
                        <td align="left">&nbsp;2021/11339 </td>
                        <td align="left">&nbsp;Sayali (Sayali Patil) </td>
                        <td align="left">
                          <div className="dateWrapper">
                            <div className="onlyDate">18</div>
                            <div className="monthYear">
                              Feb
                              <br />
                              2021
                            </div>
                          </div>
                        </td>
                        <td align="left">&nbsp;2,980.45</td>
                        <td align="center" className="actionlink">
                          <div className="actionCont" style={{ width: "29px" }}>
                            <div className="input-group-addon">
                              <Link
                                to="controller.php?page=credit_note&action=view&id=321"
                                data-toggle="tooltip"
                                data-original-title="View"
                                data-placement="top"
                              >
                                <i className="fa fa-eye" />
                              </Link>
                            </div>
                          </div>
                          <div className="input-group-addon">
                            <Link
                              to="javaScriptconfirm_del('controller.php?page=credit_note&action=delete&id=321&search_id=&search_agent=&search_payment_mode=&search_payments=');"
                              data-toggle="tooltip"
                              data-placement="top"
                              title
                              data-original-title="Delete"
                            >
                              <i className="fa fa-trash" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                      <tr className="phps_row_1 odd" role="row">
                        <td align="left">&nbsp;2021/11335 </td>
                        <td align="left">&nbsp;Sayali (Sayali Patil) </td>
                        <td align="left">
                          <div className="dateWrapper">
                            <div className="onlyDate">18</div>
                            <div className="monthYear">
                              Feb
                              <br />
                              2021
                            </div>
                          </div>
                        </td>
                        <td align="left">&nbsp;400.00</td>
                        <td align="center" className="actionlink">
                          <div className="actionCont" style={{ width: "29px" }}>
                            <div className="input-group-addon">
                              <Link
                                to="controller.php?page=credit_note&action=view&id=319"
                                data-toggle="tooltip"
                                data-original-title="View"
                                data-placement="top"
                              >
                                <i className="fa fa-eye" />
                              </Link>
                            </div>
                          </div>
                          <div className="input-group-addon">
                            <Link
                              to="javaScriptconfirm_del('controller.php?page=credit_note&action=delete&id=319&search_id=&search_agent=&search_payment_mode=&search_payments=');"
                              data-toggle="tooltip"
                              data-placement="top"
                              title
                              data-original-title="Delete"
                            >
                              <i className="fa fa-trash" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                      <tr className="phps_row_0 even" role="row">
                        <td align="left">&nbsp;CN00000056 </td>
                        <td align="left">&nbsp;Sayali (Sayali Patil) </td>
                        <td align="left">
                          <div className="dateWrapper">
                            <div className="onlyDate">18</div>
                            <div className="monthYear">
                              Jan
                              <br />
                              2021
                            </div>
                          </div>
                        </td>
                        <td align="left">&nbsp;17,799.52</td>
                        <td align="center" className="actionlink">
                          <div className="actionCont" style={{ width: "29px" }}>
                            <div className="input-group-addon">
                              <Link
                                to="controller.php?page=credit_note&action=view&id=305"
                                data-toggle="tooltip"
                                data-original-title="View"
                                data-placement="top"
                              >
                                <i className="fa fa-eye" />
                              </Link>
                            </div>
                          </div>
                          <div className="input-group-addon">
                            <Link
                              to="javaScriptconfirm_del('controller.php?page=credit_note&action=delete&id=305&search_id=&search_agent=&search_payment_mode=&search_payments=');"
                              data-toggle="tooltip"
                              data-placement="top"
                              title
                              data-original-title="Delete"
                            >
                              <i className="fa fa-trash" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                      <tr className="phps_row_1 odd" role="row">
                        <td align="left">&nbsp;CN00000055 </td>
                        <td align="left">&nbsp;Sayali (Sayali Patil) </td>
                        <td align="left">
                          <div className="dateWrapper">
                            <div className="onlyDate">13</div>
                            <div className="monthYear">
                              Jan
                              <br />
                              2021
                            </div>
                          </div>
                        </td>
                        <td align="left">&nbsp;2,093.76</td>
                        <td align="center" className="actionlink">
                          <div className="actionCont" style={{ width: "29px" }}>
                            <div className="input-group-addon">
                              <Link
                                to="controller.php?page=credit_note&action=view&id=302"
                                data-toggle="tooltip"
                                data-original-title="View"
                                data-placement="top"
                              >
                                <i className="fa fa-eye" />
                              </Link>
                            </div>
                          </div>
                          <div className="input-group-addon">
                            <Link
                              to="javaScriptconfirm_del('controller.php?page=credit_note&action=delete&id=302&search_id=&search_agent=&search_payment_mode=&search_payments=');"
                              data-toggle="tooltip"
                              data-placement="top"
                              title
                              data-original-title="Delete"
                            >
                              <i className="fa fa-trash" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                      <tr className="phps_row_0 even" role="row">
                        <td align="left">&nbsp;CN00000054 </td>
                        <td align="left">&nbsp;Sayali (Sayali Patil) </td>
                        <td align="left">
                          <div className="dateWrapper">
                            <div className="onlyDate">13</div>
                            <div className="monthYear">
                              Jan
                              <br />
                              2021
                            </div>
                          </div>
                        </td>
                        <td align="left">&nbsp;1,729.70</td>
                        <td align="center" className="actionlink">
                          <div className="actionCont" style={{ width: "29px" }}>
                            <div className="input-group-addon">
                              <Link
                                to="controller.php?page=credit_note&action=view&id=300"
                                data-toggle="tooltip"
                                data-original-title="View"
                                data-placement="top"
                              >
                                <i className="fa fa-eye" />
                              </Link>
                            </div>
                          </div>
                          <div className="input-group-addon">
                            <Link
                              to="javaScriptconfirm_del('controller.php?page=credit_note&action=delete&id=300&search_id=&search_agent=&search_payment_mode=&search_payments=');"
                              data-toggle="tooltip"
                              data-placement="top"
                              title
                              data-original-title="Delete"
                            >
                              <i className="fa fa-trash" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                      <tr className="phps_row_1 odd" role="row">
                        <td align="left">&nbsp;CN00000053 </td>
                        <td align="left">&nbsp;Sayali (Sayali Patil) </td>
                        <td align="left">
                          <div className="dateWrapper">
                            <div className="onlyDate">13</div>
                            <div className="monthYear">
                              Jan
                              <br />
                              2021
                            </div>
                          </div>
                        </td>
                        <td align="left">&nbsp;1,811.99</td>
                        <td align="center" className="actionlink">
                          <div className="actionCont" style={{ width: "29px" }}>
                            <div className="input-group-addon">
                              <Link
                                to="controller.php?page=credit_note&action=view&id=298"
                                data-toggle="tooltip"
                                data-original-title="View"
                                data-placement="top"
                              >
                                <i className="fa fa-eye" />
                              </Link>
                            </div>
                          </div>
                          <div className="input-group-addon">
                            <Link
                              to="javaScriptconfirm_del('controller.php?page=credit_note&action=delete&id=298&search_id=&search_agent=&search_payment_mode=&search_payments=');"
                              data-toggle="tooltip"
                              data-placement="top"
                              title
                              data-original-title="Delete"
                            >
                              <i className="fa fa-trash" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                      <tr className="phps_row_0 even" role="row">
                        <td align="left">&nbsp;CN00000052 </td>
                        <td align="left">&nbsp;Sayali (Sayali Patil) </td>
                        <td align="left">
                          <div className="dateWrapper">
                            <div className="onlyDate">12</div>
                            <div className="monthYear">
                              Jan
                              <br />
                              2021
                            </div>
                          </div>
                        </td>
                        <td align="left">&nbsp;702.15</td>
                        <td align="center" className="actionlink">
                          <div className="actionCont" style={{ width: "29px" }}>
                            <div className="input-group-addon">
                              <Link
                                to="controller.php?page=credit_note&action=view&id=296"
                                data-toggle="tooltip"
                                data-original-title="View"
                                data-placement="top"
                              >
                                <i className="fa fa-eye" />
                              </Link>
                            </div>
                          </div>
                          <div className="input-group-addon">
                            <Link
                              to="javaScriptconfirm_del('controller.php?page=credit_note&action=delete&id=296&search_id=&search_agent=&search_payment_mode=&search_payments=');"
                              data-toggle="tooltip"
                              data-placement="top"
                              title
                              data-original-title="Delete"
                            >
                              <i className="fa fa-trash" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                      <tr className="phps_row_1 odd" role="row">
                        <td align="left">&nbsp;CN00000051 </td>
                        <td align="left">&nbsp;Sayali (Sayali Patil) </td>
                        <td align="left">
                          <div className="dateWrapper">
                            <div className="onlyDate">12</div>
                            <div className="monthYear">
                              Jan
                              <br />
                              2021
                            </div>
                          </div>
                        </td>
                        <td align="left">&nbsp;1,053.23</td>
                        <td align="center" className="actionlink">
                          <div className="actionCont" style={{ width: "29px" }}>
                            <div className="input-group-addon">
                              <Link
                                to="controller.php?page=credit_note&action=view&id=295"
                                data-toggle="tooltip"
                                data-original-title="View"
                                data-placement="top"
                              >
                                <i className="fa fa-eye" />
                              </Link>
                            </div>
                          </div>
                          <div className="input-group-addon">
                            <Link
                              to="javaScriptconfirm_del('controller.php?page=credit_note&action=delete&id=295&search_id=&search_agent=&search_payment_mode=&search_payments=');"
                              data-toggle="tooltip"
                              data-placement="top"
                              title
                              data-original-title="Delete"
                            >
                              <i className="fa fa-trash" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                      <tr className="phps_row_0 even" role="row">
                        <td align="left">&nbsp;CN00000050 </td>
                        <td align="left">&nbsp;Sayali (Sayali Patil) </td>
                        <td align="left">
                          <div className="dateWrapper">
                            <div className="onlyDate">12</div>
                            <div className="monthYear">
                              Jan
                              <br />
                              2021
                            </div>
                          </div>
                        </td>
                        <td align="left">&nbsp;473.94</td>
                        <td align="center" className="actionlink">
                          <div className="actionCont" style={{ width: "29px" }}>
                            <div className="input-group-addon">
                              <Link
                                to="controller.php?page=credit_note&action=view&id=294"
                                data-toggle="tooltip"
                                data-original-title="View"
                                data-placement="top"
                              >
                                <i className="fa fa-eye" />
                              </Link>
                            </div>
                          </div>
                          <div className="input-group-addon">
                            <Link
                              to="javaScriptconfirm_del('controller.php?page=credit_note&action=delete&id=294&search_id=&search_agent=&search_payment_mode=&search_payments=');"
                              data-toggle="tooltip"
                              data-placement="top"
                              title
                              data-original-title="Delete"
                            >
                              <i className="fa fa-trash" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                      <tr className="phps_row_1 odd" role="row">
                        <td align="left">&nbsp;CN00000049 </td>
                        <td align="left">&nbsp;Sayali (Sayali Patil) </td>
                        <td align="left">
                          <div className="dateWrapper">
                            <div className="onlyDate">12</div>
                            <div className="monthYear">
                              Jan
                              <br />
                              2021
                            </div>
                          </div>
                        </td>
                        <td align="left">&nbsp;175.54</td>
                        <td align="center" className="actionlink">
                          <div className="actionCont" style={{ width: "29px" }}>
                            <div className="input-group-addon">
                              <Link
                                to="controller.php?page=credit_note&action=view&id=293"
                                data-toggle="tooltip"
                                data-original-title="View"
                                data-placement="top"
                              >
                                <i className="fa fa-eye" />
                              </Link>
                            </div>
                          </div>
                          <div className="input-group-addon">
                            <Link
                              to="javaScriptconfirm_del('controller.php?page=credit_note&action=delete&id=293&search_id=&search_agent=&search_payment_mode=&search_payments=');"
                              data-toggle="tooltip"
                              data-placement="top"
                              title
                              data-original-title="Delete"
                            >
                              <i className="fa fa-trash" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                      <tr className="phps_row_0 even" role="row">
                        <td align="left">&nbsp;CN00000048 </td>
                        <td align="left">&nbsp;Sayali (Sayali Patil) </td>
                        <td align="left">
                          <div className="dateWrapper">
                            <div className="onlyDate">12</div>
                            <div className="monthYear">
                              Jan
                              <br />
                              2021
                            </div>
                          </div>
                        </td>
                        <td align="left">&nbsp;702.15</td>
                        <td align="center" className="actionlink">
                          <div className="actionCont" style={{ width: "29px" }}>
                            <div className="input-group-addon">
                              <Link
                                to="controller.php?page=credit_note&action=view&id=292"
                                data-toggle="tooltip"
                                data-original-title="View"
                                data-placement="top"
                              >
                                <i className="fa fa-eye" />
                              </Link>
                            </div>
                          </div>
                          <div className="input-group-addon">
                            <Link
                              to="javaScriptconfirm_del('controller.php?page=credit_note&action=delete&id=292&search_id=&search_agent=&search_payment_mode=&search_payments=');"
                              data-toggle="tooltip"
                              data-placement="top"
                              title
                              data-original-title="Delete"
                            >
                              <i className="fa fa-trash" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                      <tr className="phps_row_1 odd" role="row">
                        <td align="left">&nbsp;CN00000047 </td>
                        <td align="left">&nbsp;Sayali (Sayali Patil) </td>
                        <td align="left">
                          <div className="dateWrapper">
                            <div className="onlyDate">12</div>
                            <div className="monthYear">
                              Jan
                              <br />
                              2021
                            </div>
                          </div>
                        </td>
                        <td align="left">&nbsp;1,053.22</td>
                        <td align="center" className="actionlink">
                          <div className="actionCont" style={{ width: "29px" }}>
                            <div className="input-group-addon">
                              <Link
                                to="controller.php?page=credit_note&action=view&id=290"
                                data-toggle="tooltip"
                                data-original-title="View"
                                data-placement="top"
                              >
                                <i className="fa fa-eye" />
                              </Link>
                            </div>
                          </div>
                          <div className="input-group-addon">
                            <Link
                              to="javaScriptconfirm_del('controller.php?page=credit_note&action=delete&id=290&search_id=&search_agent=&search_payment_mode=&search_payments=');"
                              data-toggle="tooltip"
                              data-placement="top"
                              title
                              data-original-title="Delete"
                            >
                              <i className="fa fa-trash" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                      <tr className="phps_row_0 even" role="row">
                        <td align="left">&nbsp;CN00000046 </td>
                        <td align="left">&nbsp;Flyron (Flyron Flyron) </td>
                        <td align="left">
                          <div className="dateWrapper">
                            <div className="onlyDate">12</div>
                            <div className="monthYear">
                              Jan
                              <br />
                              2021
                            </div>
                          </div>
                        </td>
                        <td align="left">&nbsp;11.66</td>
                        <td align="center" className="actionlink">
                          <div className="actionCont" style={{ width: "29px" }}>
                            <div className="input-group-addon">
                              <Link
                                to="controller.php?page=credit_note&action=view&id=289"
                                data-toggle="tooltip"
                                data-original-title="View"
                                data-placement="top"
                              >
                                <i className="fa fa-eye" />
                              </Link>
                            </div>
                          </div>
                          <div className="input-group-addon">
                            <Link
                              to="javaScriptconfirm_del('controller.php?page=credit_note&action=delete&id=289&search_id=&search_agent=&search_payment_mode=&search_payments=');"
                              data-toggle="tooltip"
                              data-placement="top"
                              title
                              data-original-title="Delete"
                            >
                              <i className="fa fa-trash" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                      <tr className="phps_row_1 odd" role="row">
                        <td align="left">&nbsp;CN00000045 </td>
                        <td align="left">&nbsp;Sayali (Sayali Patil) </td>
                        <td align="left">
                          <div className="dateWrapper">
                            <div className="onlyDate">12</div>
                            <div className="monthYear">
                              Jan
                              <br />
                              2021
                            </div>
                          </div>
                        </td>
                        <td align="left">&nbsp;908.74</td>
                        <td align="center" className="actionlink">
                          <div className="actionCont" style={{ width: "29px" }}>
                            <div className="input-group-addon">
                              <Link
                                to="controller.php?page=credit_note&action=view&id=287"
                                data-toggle="tooltip"
                                data-original-title="View"
                                data-placement="top"
                              >
                                <i className="fa fa-eye" />
                              </Link>
                            </div>
                          </div>
                          <div className="input-group-addon">
                            <Link
                              to="javaScriptconfirm_del('controller.php?page=credit_note&action=delete&id=287&search_id=&search_agent=&search_payment_mode=&search_payments=');"
                              data-toggle="tooltip"
                              data-placement="top"
                              title
                              data-original-title="Delete"
                            >
                              <i className="fa fa-trash" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                      <tr
                        className="phps_header bg-grey even"
                        role="row"
                        id="totalcolor"
                      >
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td style={{ color: "white" }} align="right">
                          Total
                        </td>
                        <td style={{ color: "white" }} align="right">
                          &nbsp;43,757.03
                        </td>
                        <td>&nbsp;</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
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
                  <Link className="page-link" to="#" aria-label="Next">
                    <span aria-hidden="true">»</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </form>
        </div>
      </div>
    </>
  );
};
export default AccountsAgentCreditSearch;
