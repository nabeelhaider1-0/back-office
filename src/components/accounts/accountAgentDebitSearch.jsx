import React, { useState } from "react"; // Import React and useState
import Flatpickr from "react-flatpickr";
import { Link } from "react-router-dom";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";
import MultiSelect from "../reactMultiSelect";
import { addrule_agent_options } from "../../constants/contants";

const AccountsAgentDebitSearch = () => {
  const [startDate, setStartDate] = useState(null); // State for the start date
  const handleTrashClick = () => {
    // Function to clear both start and end dates
    setStartDate(null);
  };

  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <Header2
          title="SEARCH DEBIT NOTE"
          linkText1="Search Debit Notes"
          linkText2="Add Debit Note"
          link1={Constants.URLConstants.ACCOUNTSAGENTDEBITNEW}
        />

        <div>
          {/* First Row*/}
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
                <label>Debit Note Date</label>
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
                        style={{ width: "273.6px" }}
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
            {/*2nd Row*/}
            <div className="row mt-3">
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
              <div className="col-md-6 form-group"></div>
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
                    id="search_debit_note"
                    className="table   table-responsive dataTable no-footer table-bordered"
                    role="grid"
                    aria-describedby="search_debit_note_info"
                  >
                    <thead>
                      <tr role="row">
                        <th
                          className="sorting_disabled"
                          rowSpan={1}
                          colSpan={1}
                          style={{ width: "197px" }}
                        >
                          Document #
                        </th>
                        <th
                          className="sorting_disabled"
                          rowSpan={1}
                          colSpan={1}
                          style={{ width: "516px" }}
                        >
                          Agent
                        </th>
                        <th
                          className="sorting_disabled"
                          rowSpan={1}
                          colSpan={1}
                          style={{ width: "235px" }}
                        >
                          Debit Note Date
                        </th>
                        <th
                          className="sorting_disabled"
                          rowSpan={1}
                          colSpan={1}
                          style={{ width: "183px" }}
                        >
                          Received
                        </th>
                        <th
                          className="sorting_disabled"
                          rowSpan={1}
                          colSpan={1}
                          style={{ width: "127px" }}
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      <tr className="phps_row_1 odd" role="row">
                        <td>DN00000009 </td>
                        <td>Vartak Holidazzle (Rohan Vartak)</td>
                        <td>
                          <div className="dateWrapper">
                            <div className="onlyDate">08</div>
                            <div className="monthYear">
                              Jun
                              <br />
                              2021
                            </div>
                          </div>
                        </td>
                        <td>-500.00</td>
                        <td className="actionlink">
                          <div className="actionCont" style={{ width: "29px" }}>
                            <div className="input-group-addon">
                              <Link
                                to={
                                  Constants.URLConstants.ACCOUNTSAGENTDEBITVIEW
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
                              to="javaScriptconfirm_del('controller.php?page=debit_note&action=delete&id=462&search_id=&search_agent=&search_payment_mode=&search_payments=');"
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
                        <td>DN00000008 </td>
                        <td>Vartak Holidazzle (Rohan Vartak)</td>
                        <td>
                          <div className="dateWrapper">
                            <div className="onlyDate">03</div>
                            <div className="monthYear">
                              Jun
                              <br />
                              2021
                            </div>
                          </div>
                        </td>
                        <td>-1,778.21</td>
                        <td className="actionlink">
                          <div className="actionCont" style={{ width: "29px" }}>
                            <div className="input-group-addon">
                              <Link
                                to="accountsviewdebit.html"
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
                              to="javaScriptconfirm_del('controller.php?page=debit_note&action=delete&id=453&search_id=&search_agent=&search_payment_mode=&search_payments=');"
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
                        <td>DN00000007 </td>
                        <td>Holidays Special (Faiz Alam)</td>
                        <td>
                          <div className="dateWrapper">
                            <div className="onlyDate">05</div>
                            <div className="monthYear">
                              May
                              <br />
                              2020
                            </div>
                          </div>
                        </td>
                        <td>0.08</td>
                        <td className="actionlink">
                          <div className="actionCont" style={{ width: "29px" }}>
                            <div className="input-group-addon">
                              <Link
                                to="accountsviewdebit.html"
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
                              to="javaScriptconfirm_del('controller.php?page=debit_note&action=delete&id=185&search_id=&search_agent=&search_payment_mode=&search_payments=');"
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
                        <td>DN00000006 </td>
                        <td>Holidays Special (Faiz Alam)</td>
                        <td>
                          <div className="dateWrapper">
                            <div className="onlyDate">23</div>
                            <div className="monthYear">
                              Mar
                              <br />
                              2020
                            </div>
                          </div>
                        </td>
                        <td>-5,000.00</td>
                        <td className="actionlink">
                          <div className="actionCont" style={{ width: "29px" }}>
                            <div className="input-group-addon">
                              <Link
                                to="accountsviewdebit.html"
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
                              to="javaScriptconfirm_del('controller.php?page=debit_note&action=delete&id=181&search_id=&search_agent=&search_payment_mode=&search_payments=');"
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
                        <td>DN00000005 </td>
                        <td>Holidays Special (Faiz Alam)</td>
                        <td>
                          <div className="dateWrapper">
                            <div className="onlyDate">21</div>
                            <div className="monthYear">
                              Mar
                              <br />
                              2020
                            </div>
                          </div>
                        </td>
                        <td>-25,000.00</td>
                        <td className="actionlink">
                          <div className="actionCont" style={{ width: "29px" }}>
                            <div className="input-group-addon">
                              <Link
                                to="accountsviewdebit.html"
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
                              to="javaScriptconfirm_del('controller.php?page=debit_note&action=delete&id=179&search_id=&search_agent=&search_payment_mode=&search_payments=');"
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
                        <td>DN00000004 </td>
                        <td>Holidays Special (Faiz Alam)</td>
                        <td>
                          <div className="dateWrapper">
                            <div className="onlyDate">18</div>
                            <div className="monthYear">
                              Mar
                              <br />
                              2020
                            </div>
                          </div>
                        </td>
                        <td>-45,448.95</td>
                        <td className="actionlink">
                          <div className="actionCont" style={{ width: "29px" }}>
                            <div className="input-group-addon">
                              <Link
                                to="accountsviewdebit.html"
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
                              to="javaScriptconfirm_del('controller.php?page=debit_note&action=delete&id=175&search_id=&search_agent=&search_payment_mode=&search_payments=');"
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
                        <td>DN00000003 </td>
                        <td>Holidays Special (Faiz Alam)</td>
                        <td>
                          <div className="dateWrapper">
                            <div className="onlyDate">17</div>
                            <div className="monthYear">
                              Mar
                              <br />
                              2020
                            </div>
                          </div>
                        </td>
                        <td>-15,000.00</td>
                        <td className="actionlink">
                          <div className="actionCont" style={{ width: "29px" }}>
                            <div className="input-group-addon">
                              <Link
                                to="accountsviewdebit.html"
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
                              to="javaScriptconfirm_del('controller.php?page=debit_note&action=delete&id=170&search_id=&search_agent=&search_payment_mode=&search_payments=');"
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
                        <td>DN00000002 </td>
                        <td>Qtech (SnehalTest Test)</td>
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
                        <td>-421.68</td>
                        <td className="actionlink">
                          <div className="actionCont" style={{ width: "29px" }}>
                            <div className="input-group-addon">
                              <Link
                                to="accountsviewdebit.html"
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
                              to="javaScriptconfirm_del('controller.php?page=debit_note&action=delete&id=132&search_id=&search_agent=&search_payment_mode=&search_payments=');"
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
                        <td>DN00000001 </td>
                        <td>Qtech (Asmita Kapadi)</td>
                        <td>
                          <div className="dateWrapper">
                            <div className="onlyDate">02</div>
                            <div className="monthYear">
                              Apr
                              <br />
                              2018
                            </div>
                          </div>
                        </td>
                        <td>-2,948.58</td>
                        <td className="actionlink">
                          <div className="actionCont" style={{ width: "29px" }}>
                            <div className="input-group-addon">
                              <Link
                                to="accountsviewdebit.html"
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
                              to="javaScriptconfirm_del('controller.php?page=debit_note&action=delete&id=31&search_id=&search_agent=&search_payment_mode=&search_payments=');"
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
                        <td style={{ color: "white" }}>Total</td>
                        <td style={{ color: "white" }}>-96,097.34</td>
                        <td>&nbsp;</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default AccountsAgentDebitSearch;
