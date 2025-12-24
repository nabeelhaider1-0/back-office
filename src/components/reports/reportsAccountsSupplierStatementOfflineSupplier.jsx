import Header2 from "../header2/header2";
import Flatpickr from "react-flatpickr";
import React, { useState } from "react";

import {
  invoiceStatusOptions,
  supplierOptions,
} from "../../constants/contants";
import MultiSelect from "../reactMultiSelect";

const ReportsAccountsSupplierStatementOfflineSupplier = () => {
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
      <Header2 title="LOCAL SUPPLIER STATEMENT" />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <div>
          <form>
            <div className="panel-body">
              <div className="row">
                <div className="form-group col-md-3">
                  <label>Offline Suppliers</label>
                  <MultiSelect
                    options={supplierOptions}
                    isSearchable
                    placeholder=" Select Supplier "
                    className="custom-select"
                    noOptionsMessage={() => "No Supplier Found"}
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
                  <div className="col-md-4">
                    <a
                      title="Click to download XL sheet"
                      href="/tms/new_report.php?report=supplier_statement_local&a=&run=1&sel_offline_supplier=S000000214%3AINR&txt_booking_id=&sel_paid_unpaid=onlypending&booking_from_date=&booking_to_date=&service_from_date=&service_to_date=&sel_max_results=&download=1"
                      className="btn btn-dark btn-sm form-group topBtn"
                    >
                      <i className="fa fa-download" />
                      &nbsp;&nbsp;Download Excel
                    </a>
                    &nbsp;&nbsp;
                    <a
                      title="Click to print XL sheet"
                      href="/tms/new_report.php?report=supplier_statement_local&a=&run=1&sel_offline_supplier=S000000214%3AINR&txt_booking_id=&sel_paid_unpaid=onlypending&booking_from_date=&booking_to_date=&service_from_date=&service_to_date=&sel_max_results=&print=1"
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
                  <div className="col-md-3 search_option">
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
                    <table
                      id="search_agents_table1"
                      className="table table-bordered   table-responsive alignTbl dataTable"
                    >
                      <thead>
                        <tr>
                          <th className>
                            Booking Date
                            <a href="new_report.php?sort_by=create_date&direction=up&report=supplier_statement_local&a=&run=1&sel_offline_supplier=S000000214%3AINR&txt_booking_id=&sel_paid_unpaid=onlypending&booking_from_date=&booking_to_date=&service_from_date=&service_to_date=&sel_max_results=">
                              <img
                                src="images/up_arrow.gif"
                                alt=""
                                border={0}
                                height={5}
                                width={9}
                              />
                            </a>
                            <a href="new_report.php?sort_by=create_date&direction=down&report=supplier_statement_local&a=&run=1&sel_offline_supplier=S000000214%3AINR&txt_booking_id=&sel_paid_unpaid=onlypending&booking_from_date=&booking_to_date=&service_from_date=&service_to_date=&sel_max_results=">
                              <img
                                src="images/down_arrow.gif"
                                alt=""
                                border={0}
                                height={5}
                                width={9}
                              />
                            </a>
                          </th>
                          <th className=" no-sort ">Service Date</th>
                          <th className>
                            Booking Id
                            <a href="new_report.php?sort_by=id&direction=up&report=supplier_statement_local&a=&run=1&sel_offline_supplier=S000000214%3AINR&txt_booking_id=&sel_paid_unpaid=onlypending&booking_from_date=&booking_to_date=&service_from_date=&service_to_date=&sel_max_results=">
                              <img
                                src="images/up_arrow.gif"
                                alt=""
                                border={0}
                                height={5}
                                width={9}
                              />
                            </a>
                            <a href="new_report.php?sort_by=id&direction=down&report=supplier_statement_local&a=&run=1&sel_offline_supplier=S000000214%3AINR&txt_booking_id=&sel_paid_unpaid=onlypending&booking_from_date=&booking_to_date=&service_from_date=&service_to_date=&sel_max_results=">
                              <img
                                src="images/down_arrow.gif"
                                alt=""
                                border={0}
                                height={5}
                                width={9}
                              />
                            </a>
                          </th>
                          <th className=" no-sort ">Voucher Id.</th>
                          <th className=" no-sort ">Type</th>
                          <th className=" no-sort ">Service Type</th>
                          <th className>
                            Pax Name
                            <a href="new_report.php?sort_by=lead_name&direction=up&report=supplier_statement_local&a=&run=1&sel_offline_supplier=S000000214%3AINR&txt_booking_id=&sel_paid_unpaid=onlypending&booking_from_date=&booking_to_date=&service_from_date=&service_to_date=&sel_max_results=">
                              <img
                                src="images/up_arrow.gif"
                                alt=""
                                border={0}
                                height={5}
                                width={9}
                              />
                            </a>
                            <a href="new_report.php?sort_by=lead_name&direction=down&report=supplier_statement_local&a=&run=1&sel_offline_supplier=S000000214%3AINR&txt_booking_id=&sel_paid_unpaid=onlypending&booking_from_date=&booking_to_date=&service_from_date=&service_to_date=&sel_max_results=">
                              <img
                                src="images/down_arrow.gif"
                                alt=""
                                border={0}
                                height={5}
                                width={9}
                              />
                            </a>
                          </th>
                          <th className="numAlign no-sort ">Debit</th>
                          <th className="numAlign no-sort ">Credit</th>
                          <th className="numAlign no-sort ">Balance</th>
                          <th className="numAlign no-sort ">
                            Cumulative Balance
                          </th>
                          <th className=" no-sort ">Currency</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        <tr>
                          <td align="center" className="brdr">
                            1
                          </td>
                          <td align="center" className="brdr" />
                          <td align="center" className="brdr" />
                          <td align="center" className="brdr" />
                          <td align="center" className="brdr" />
                          <td align="center" className="brdr" />
                          <td align="center" className="brdr" />
                          <td align="center" className="brdr" />
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
                          <td align="center" />
                          <td align="center" />
                          <td align="center">Sale</td>
                          <td align="center">visa</td>
                          <td align="center"> Prachi sdfsdf</td>
                          <td align="center" />
                          <td align="center" />
                          <td align="center" />
                          <td align="center" />
                          <td className="numAlign">100.00&nbsp;</td>
                          <td className="numAlign">0.00&nbsp;</td>
                          <td className="numAlign">100.00&nbsp;</td>
                          <td className="numAlign">100.00&nbsp;</td>
                          <td>INR</td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr
                          className="row_header"
                          style={{ backgroundColor: "#a09d9d" }}
                        >
                          <td height={20}>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td className="numAlign" style={{ color: "white" }}>
                            100.00&nbsp;
                          </td>
                          <td className="numAlign" style={{ color: "white" }}>
                            0.00&nbsp;
                          </td>
                          <td className="numAlign" style={{ color: "white" }}>
                            100.00&nbsp;
                          </td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                        </tr>
                      </tfoot>
                    </table>
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
export default ReportsAccountsSupplierStatementOfflineSupplier;
