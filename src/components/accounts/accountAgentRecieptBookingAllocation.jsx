import React, { useState } from "react"; // Import React and useState
import Flatpickr from "react-flatpickr";

import plus from "../../assets/images/plus_blue.jpg";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";
const AccountsAgentRecieptAllocation = () => {
  const [startDate, setStartDate] = useState(null); // State for the start date
  const [endDate, setEndDate] = useState(null);
  const [startDate1, setStartDate1] = useState(null); // State for the start date
  const [endDate1, setEndDate1] = useState(null);
  const [startDate2, setStartDate2] = useState(null); // State for the start date
  const [endDate2, setEndDate2] = useState(null);
  const handleTrashClick = () => {
    // Function to clear both start and end dates
    setStartDate(null);
    setEndDate(null);
  };
  const handleTrashClick1 = () => {
    // Function to clear both start and end dates
    setStartDate1(null);
    setEndDate1(null);
  };
  const handleTrashClick2 = () => {
    // Function to clear both start and end dates
    setStartDate2(null);
    setEndDate2(null);
  };

  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <Header2
          title="RECEIPTS BOOKING ALLOCATION OF SQTECH [ SQTECH - CD0291 ]"
          linkText1="Search Reciepts"
          linkText2="Add Reciepts"
          link1={Constants.URLConstants.ACCOUNTSAGENTRECIEPTNEW}
        />

        <div>
          {/* First Row*/}
          <form>
            <div className="panel-body">
              <div className="row form-group">
                <div className="col-sm-2 form-group">
                  <label>Booking ID</label>
                  <span
                    className="form-group"
                    style={{
                      float: "right",
                      fontSize: "12px",
                      marginTop: "5px",
                    }}
                  >
                    (eg.: l001234<b>,</b>l001234)
                  </span>
                  <input
                    type="text"
                    name="txt_booking_id"
                    id="txt_booking_id"
                    size={40}
                    className="form-control input_text test123"
                  />
                </div>
                <div className="col-sm-2 form-group">
                  <label htmlFor="txt_invoice_number">Invoice Number</label>{" "}
                  <input
                    type="text"
                    name="txt_invoice_number"
                    id="txt_invoice_number"
                    size={40}
                    className="form-control input_text"
                  />
                </div>
                <div className="col-md-4 form-group">
                  <label>Status Date</label>
                  <div
                    className="input-group date input-daterange"
                    name="status_in_date"
                    id="status_in_date"
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
                <div className="col-md-4 form-group">
                  <label>Invoice Date</label>
                  <div
                    className="input-group date input-daterange"
                    name="invoice_in_date"
                    id="invoice_in_date"
                  >
                    <Flatpickr
                      value={startDate1}
                      onChange={(date) => setStartDate1(date)}
                      options={{ dateFormat: "Y-m-d" }}
                    />
                    <span className="input-group-addon">to</span>
                    <Flatpickr
                      value={endDate1}
                      onChange={(date) => setEndDate1(date)}
                      options={{ dateFormat: "Y-m-d" }}
                    />
                    <span
                      className="input-group-addon"
                      onClick={handleTrashClick1}
                    >
                      <i className="fa fa-trash" />
                    </span>
                  </div>
                </div>
                <div className="col-md-4 form-group">
                  <label>Service Date</label>
                  <div
                    className="input-group date input-daterange"
                    name="invoice_in_date"
                    id="service_in_date"
                  >
                    <Flatpickr
                      value={startDate2}
                      onChange={(date) => setStartDate2(date)}
                      options={{ dateFormat: "Y-m-d" }}
                    />
                    <span className="input-group-addon">to</span>
                    <Flatpickr
                      value={endDate2}
                      onChange={(date) => setEndDate2(date)}
                      options={{ dateFormat: "Y-m-d" }}
                    />
                    <span
                      className="input-group-addon"
                      onClick={handleTrashClick2}
                    >
                      <i className="fa fa-trash" />
                    </span>
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-sm-3 form-group">
                  <button
                    type="button"
                    name="sbt1"
                    className="btn btn-dark btn-sm"
                    value="Submit"
                    onclick="$('[name=\'receipts_date_result\']').submit()"
                  >
                    <i className="fa fa-search" />
                    &nbsp;Search
                  </button>
                </div>
              </div>
            </div>
          </form>
          <style
            dangerouslySetInnerHTML={{
              __html:
                '\n            .bg-grey {\n                background-color: #A09D9D !important;\n                color: #fff !important;\n            }\n\n            .bg-grey td {\n\n                color: #fff !important;\n            }\n\n.fa-chevron-down{\n\n    font-size: 14px;\n    cursor: pointer;\n}\n.fa-chevron-down:hover{\n    color: white !important;\n}\n\n.panel-heading {\n    font-family: "MONTSERRAT";\n    font-size: 14pt;\n    text-transform: uppercase;\n    padding: 10px 15px;\n    border-bottom: 1px solid transparent;\n    border-top-left-radius: 3px;\n    border-top-right-radius: 3px;\n}\n.panel-group .panel-heading {\n    background-color: #eff1f2;\n}\n\n.btm_mar {\n    margin-bottom: 4px;\n}\n.panel-default {\n    border-color: #ddd;\n}\n.panel-collapse{\n    padding: 10px 15px;\n    border-bottom: 1px solid transparent;\n    border-top-left-radius: 3px;\n    border-top-right-radius: 3px;\n}\n\n\n        ',
            }}
          />
          <div
            className="panel-bodyform-group tblHeading removeMargins mt-2"
            style={{
              backgroundColor: "#FF5015",
              paddingBottom: "1px",
              paddingTop: "4px",
            }}
            id="acc602"
          >
            <div className="row">
              <div className="col-md-12">
                <h5
                  style={{
                    color: "white",
                    fontSize: "15px",
                    marginLeft: "20px",
                  }}
                >
                  {" "}
                  <img className="whiteIcon" src={plus} alt="plusi" />
                  &nbsp;&nbsp;Booking(s) allocated to Receipt #&nbsp;
                  <strong>Rcpt00000602</strong>
                </h5>
              </div>
            </div>
          </div>
          <form>
            <div
              className="panel-body removeMargins"
              id="accCont602"
              style={{ padding: "0px 12px" }}
            >
              <div
                className="dataTables_scroll contwrap"
                style={{ display: "block" }}
              >
                 
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm"
                  style={{ color: "#fff !important", marginTop: "10px" }}
                  id="download_excel"
                >
                  <i className="fa fa-file-excel-o" />
                  &nbsp;Download
                </button>
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
                        style={{ height: "20px", overflow: "scroll hidden" }}
                      >
                        <div
                          className="suwala-doubleScroll-scroll"
                          style={{ height: "20px" }}
                        />
                      </div>
                      <div id="scrollCont1" style={{ overflow: "auto" }}>
                        <table
                          id="search_sup"
                          className="table table-bordered   table-responsive dataTable no-footer"
                          role="grid"
                          aria-describedby="search_sup_info"
                        >
                          <thead>
                            <tr role="row">
                              <th
                                className="sorting_disabled"
                                rowSpan={1}
                                colSpan={1}
                                style={{ width: "0px" }}
                              >
                                Booking Id
                              </th>
                              <th
                                className="sorting_disabled"
                                rowSpan={1}
                                colSpan={1}
                                style={{ width: "0px" }}
                              >
                                Invoice No
                              </th>
                              <th
                                className="sorting_disabled"
                                rowSpan={1}
                                colSpan={1}
                                style={{ width: "0px" }}
                              >
                                Booking Amount
                              </th>
                              <th
                                className="sorting_disabled"
                                rowSpan={1}
                                colSpan={1}
                                style={{ width: "0px" }}
                              >
                                Payment Date
                              </th>
                              <th
                                className="sorting_disabled"
                                rowSpan={1}
                                colSpan={1}
                                style={{ width: "0px" }}
                              >
                                Amount Allocated
                              </th>
                              <th
                                className="sorting_disabled"
                                rowSpan={1}
                                colSpan={1}
                                style={{ width: "0px" }}
                              >
                                Delete
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white">
                            <tr className="phps_row_0 odd" role="row">
                              <td>&nbsp;TD1129349</td>
                              <td>&nbsp;2023/12599</td>
                              <td align="right"> SAR&nbsp;114.321</td>
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
                              <td align="right">SAR&nbsp;114.320&nbsp;</td>
                              <td className="actionlink">
                                <div
                                  className="actionCont"
                                  style={{ width: "29px" }}
                                >
                                  <div
                                    className="input-group-addon"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Delete"
                                  >
                                    <a
                                      href="javaScript confirm_del('controller.php?page=receipt&action=delete_allocation&id=543&rec_id=602&agent_id=291&agent_id=291&currency_code=SAR');"
                                      title="clear"
                                      alt="clear"
                                    >
                                      <i
                                        className="fa fa-trash"
                                        title="clear"
                                        alt="clear"
                                      />
                                      {/* <img src="images/delete.gif" border=0 alt="Delete"> */}
                                    </a>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                          <tbody className="bg-white">
                            <tr className="phps_header bg-grey" height={22}>
                              <td align="right">&nbsp;</td>
                              <td align="right">&nbsp;</td>
                              <td align="right">&nbsp;</td>
                              <td align="right">&nbsp;Total&nbsp;&nbsp;</td>
                              <td align="right">SAR&nbsp;114.32&nbsp;</td>
                              <td align="right">&nbsp;</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <br />
              </div>
            </div>
          </form>
          <br />
          <form>
            <div className="panel-body removeMargins">
              <input type="hidden" name="total_count" defaultValue={23} />
              <input type="hidden" name="action" />
              <input type="hidden" name="rec_id" defaultValue={602} />
              <input type="hidden" name="currency_code" defaultValue="SAR" />
              <input type="hidden" name="agent_id" defaultValue={291} />
              <input type="hidden" name="Rec_amount" defaultValue="114.321" />
              <input type="hidden" name="amountRemain" defaultValue="0.001" />
              <input type="hidden" name="allocating_page" defaultValue={1} />
              <br />
              <div className="row">
                <div className="col-lg-1" style={{ marginBottom: "35px" }}>
                  <span
                    className="btn btn-outline-secondary btn-sm"
                    id="expand-all"
                  >
                    Expand all
                  </span>
                </div>
                <div className="col-lg-10"></div>
                <div className="col-lg-12">
                  <div className="panel-group btm_mar">
                    <div
                      className="panel panel-default "
                      id="panel-2022-12215"
                      invoice_number="2022-12215"
                    >
                      <div className="panel-heading">
                        <table
                          className="table   table-responsive invoice-table"
                          style={{ marginBottom: "0px" }}
                        >
                          <thead>
                            <tr>
                              <th width="5%" style={{ marginTop: "8px" }}>
                                <div className="checkbox checkbox-success checkbox-inline">
                                  <input
                                    type="checkbox"
                                    id="chk-2022-12215"
                                    className="chk-invoice"
                                    name="invoices[2022/12215][chk]"
                                    defaultValue="2022/12215"
                                    invoice_number="2022-12215"
                                    onchange="total_allocation_amount_invoice_set(this);total_allocation_amount($('amt-2022-12215'));"
                                  />
                                  <label />
                                  <i
                                    className="fa fa-chevron-down collapsed"
                                    data-bs-toggle="collapse"
                                    href="#panel-body-2022-12215"
                                    aria-expanded="false"
                                  />
                                </div>
                              </th>
                              <th
                                width="18%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12215"
                              >
                                Invoice Number 2022/12215
                              </th>
                              {/*<th width="10%" style="text-align: left !important"  data-bs-toggle="collapse" href="#panel-body-2022-12215">
                                                      <span>Super PNR [OT18368]</span>
                                                  </th>*/}
                              <th
                                width="8%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12215"
                              >
                                <span>Sectors [1]</span>
                              </th>
                              <th
                                width="18%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12215"
                              >
                                <span>Invoice amount: 375.000</span>
                                <input
                                  defaultValue={375}
                                  className="inv-pending-amount"
                                  invoice_number="2022-12215"
                                  type="hidden"
                                />
                              </th>
                              <th
                                width="15%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12215"
                              >
                                <span>Allocated: 0.000</span>
                              </th>
                              <th
                                width="15%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12215"
                              >
                                <span>Unallocated: 375.000</span>
                              </th>
                              <th width="10%">
                                <span
                                  style={{
                                    float: "right",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  Allocate Amount:
                                </span>
                              </th>
                              <th>
                                <input
                                  type="text"
                                  style={{ color: "black" }}
                                  className="invoice-amt"
                                  id="amt-2022-12215"
                                  invoice_number="2022-12215"
                                  name="invoices[2022/12215][amount]"
                                  onblur="extractNumber(this,3,true),checkAmount(375,this);total_allocation_amount(this);"
                                />
                              </th>
                            </tr>
                          </thead>
                        </table>
                      </div>
                      <div
                        id="panel-body-2022-12215"
                        className="panel-collapse collapse"
                        aria-expanded="false"
                        style={{ height: "0px" }}
                      >
                        <div
                          className="panel-body removeMargins"
                          style={{ margin: 0 }}
                        >
                          <table id className="table   table-responsive">
                            <thead>
                              <tr
                                style={{
                                  background: "#bce0ff",
                                  color: "black",
                                  fontFamily: "MONTSERRAT",
                                }}
                              >
                                <th style={{ textAlign: "center" }}>
                                  <div className="checkbox checkbox-success checkbox-inline">
                                    <input
                                      type="checkbox"
                                      className="select-all"
                                      invoice_number="2022-12215"
                                      onclick=" return checkAll(this);"
                                    />{" "}
                                    <label />
                                  </div>
                                </th>
                                <th style={{ textAlign: "center" }}>Service</th>
                                <th style={{ textAlign: "center" }}>
                                  Booking ID
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Invoice No.
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Pax Name
                                </th>
                                <th>Supplier</th>
                                <th style={{ textAlign: "center" }}>Type</th>
                                <th style={{ textAlign: "center" }}>
                                  Service Date
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Total Amount
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Received
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Pending Amount
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Allocation
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              <tr className="phps_row_1" id="tr-14352">
                                <td align="center">
                                  <div className="checkbox checkbox-success checkbox-inline">
                                    <input
                                      type="checkbox"
                                      name="invoices[2022/12215][bookings][chk][]"
                                      id="chk[]"
                                      rowid={14352}
                                      className="row_chkbox"
                                      bcode="TD828986"
                                      defaultValue={14352}
                                      onclick="total_allocation_amount_set(this);"
                                      onchange="total_allocation_amount($('#tr-14352 .booking_w_amt'));"
                                      invoice_number="2022-12215"
                                    />{" "}
                                    <label />
                                    {/*                                                                <input type='hidden' name="2022-12215['bookings']['14352']" */}
                                    {/*                                                                    value='28986'> <input type='hidden' */}
                                    {/*                                                                    name='booking_rate_id[]' value='14352'> <input */}
                                    {/*                                                                    type='hidden' name='source_type[]' */}
                                    {/*                                                                    value='localsystem'> <input */}
                                    {/*                                                                    type='hidden' name='serviceType[]' */}
                                    {/*                                                                    value='hotel'> */}
                                  </div>
                                </td>
                                <td align="center">
                                  {/* hotel */}
                                  <h4
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Hotel"
                                  >
                                    <i className="fa fa-bed" />
                                  </h4>
                                </td>
                                <td align="center">TD828986</td>
                                <td align="center">2022/12215</td>
                                <td align="center">Mr sssss lllll</td>
                                <td align="center">localsystem</td>
                                <td align="center">Sale</td>
                                <td align="center">
                                  <div className="dateWrapper">
                                    <div className="onlyDate">26</div>
                                    <div className="monthYear">
                                      May <br />
                                      2022
                                    </div>
                                  </div>
                                </td>
                                <td align="center">
                                  375.000
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12215][bookings][14352][total_amount]"
                                    defaultValue={375.0}
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12215][bookings][14352][booking_id]"
                                    defaultValue={28986}
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12215][bookings][14352][source_type]"
                                    defaultValue="localsystem"
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12215][bookings][14352][serviceType]"
                                    defaultValue="hotel"
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12215][bookings][14352][pending_amount]"
                                    defaultValue={375.0}
                                  />
                                </td>
                                <td align="center">0.000</td>
                                <td align="center">
                                  375.000
                                  <input
                                    id="pnd_amt_14352"
                                    className="pending-amt"
                                    defaultValue={375.0}
                                    type="hidden"
                                  />
                                </td>
                                <td align="center">
                                  <div className="form-group">
                                    <input
                                      type="text"
                                      className="form-control col-md-12 booking_w_amt"
                                      rowid={14352}
                                      name="invoices[2022/12215][bookings][14352][amount]"
                                      size={10}
                                      invoice_number="2022-12215"
                                      onblur="extractNumber(this,3,true),checkAmount(375.000,this);total_allocation_amount();extractNumber(this,3,true);"
                                    />
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="panel-group btm_mar">
                    <div
                      className="panel panel-default "
                      id="panel-2022-12216"
                      invoice_number="2022-12216"
                    >
                      <div className="panel-heading">
                        <table
                          className="table   table-responsive invoice-table"
                          style={{ marginBottom: "0px" }}
                        >
                          <thead>
                            <tr>
                              <th width="5%" style={{ marginTop: "8px" }}>
                                <div className="checkbox checkbox-success checkbox-inline">
                                  <input
                                    type="checkbox"
                                    id="chk-2022-12216"
                                    className="chk-invoice"
                                    name="invoices[2022/12216][chk]"
                                    defaultValue="2022/12216"
                                    invoice_number="2022-12216"
                                    onchange="total_allocation_amount_invoice_set(this);total_allocation_amount($('amt-2022-12216'));"
                                  />
                                  <label />
                                  <i
                                    className="fa fa-chevron-down"
                                    data-bs-toggle="collapse"
                                    href="#panel-body-2022-12216"
                                  />{" "}
                                </div>
                              </th>
                              <th
                                width="18%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12216"
                              >
                                Invoice Number 2022/12216
                              </th>
                              {/*<th width="10%" style="text-align: left !important"  data-bs-toggle="collapse" href="#panel-body-2022-12216">
                                                      <span>Super PNR [OT18409]</span>
                                                  </th>*/}
                              <th
                                width="8%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12216"
                              >
                                <span>Sectors [1]</span>
                              </th>
                              <th
                                width="18%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12216"
                              >
                                <span>Invoice amount: 138.600</span>
                                <input
                                  defaultValue="138.6"
                                  className="inv-pending-amount"
                                  invoice_number="2022-12216"
                                  type="hidden"
                                />
                              </th>
                              <th
                                width="15%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12216"
                              >
                                <span>Allocated: 0.000</span>
                              </th>
                              <th
                                width="15%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12216"
                              >
                                <span>Unallocated: 138.600</span>
                              </th>
                              <th width="10%">
                                <span
                                  style={{
                                    float: "right",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  Allocate Amount:
                                </span>
                              </th>
                              <th>
                                <input
                                  type="text"
                                  style={{ color: "black" }}
                                  className="invoice-amt"
                                  id="amt-2022-12216"
                                  invoice_number="2022-12216"
                                  name="invoices[2022/12216][amount]"
                                  onblur="extractNumber(this,3,true),checkAmount(138.6,this);total_allocation_amount(this);"
                                />
                              </th>
                            </tr>
                          </thead>
                        </table>
                      </div>
                      <div
                        id="panel-body-2022-12216"
                        className="panel-collapse collapse"
                      >
                        <div
                          className="panel-body removeMargins"
                          style={{ margin: 0 }}
                        >
                          <table id className="table   table-responsive">
                            <thead>
                              <tr
                                style={{
                                  background: "#bce0ff",
                                  color: "black",
                                  fontFamily: "MONTSERRAT",
                                }}
                              >
                                <th style={{ textAlign: "center" }}>
                                  <div className="checkbox checkbox-success checkbox-inline">
                                    <input
                                      type="checkbox"
                                      className="select-all"
                                      invoice_number="2022-12216"
                                      onclick=" return checkAll(this);"
                                    />{" "}
                                    <label />
                                  </div>
                                </th>
                                <th style={{ textAlign: "center" }}>Service</th>
                                <th style={{ textAlign: "center" }}>
                                  Booking ID
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Invoice No.
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Pax Name
                                </th>
                                <th>Supplier</th>
                                <th style={{ textAlign: "center" }}>Type</th>
                                <th style={{ textAlign: "center" }}>
                                  Service Date
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Total Amount
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Received
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Pending Amount
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Allocation
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              <tr className="phps_row_0" id="tr-14354">
                                <td align="center">
                                  <div className="checkbox checkbox-success checkbox-inline">
                                    <input
                                      type="checkbox"
                                      name="invoices[2022/12216][bookings][chk][]"
                                      id="chk[]"
                                      rowid={14354}
                                      className="row_chkbox"
                                      bcode="TD2228990"
                                      defaultValue={14354}
                                      onclick="total_allocation_amount_set(this);"
                                      onchange="total_allocation_amount($('#tr-14354 .booking_w_amt'));"
                                      invoice_number="2022-12216"
                                    />{" "}
                                    <label />
                                    {/*                                                                <input type='hidden' name="2022-12216['bookings']['14354']" */}
                                    {/*                                                                    value='28990'> <input type='hidden' */}
                                    {/*                                                                    name='booking_rate_id[]' value='14354'> <input */}
                                    {/*                                                                    type='hidden' name='source_type[]' */}
                                    {/*                                                                    value='agoda'> <input */}
                                    {/*                                                                    type='hidden' name='serviceType[]' */}
                                    {/*                                                                    value='hotel'> */}
                                  </div>
                                </td>
                                <td align="center">
                                  {/* hotel */}
                                  <h4
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Hotel"
                                  >
                                    <i className="fa fa-bed" />
                                  </h4>
                                </td>
                                <td align="center">TD2228990</td>
                                <td align="center">2022/12216</td>
                                <td align="center">Mr ABC Test</td>
                                <td align="center">agoda</td>
                                <td align="center">Sale</td>
                                <td align="center">
                                  <div className="dateWrapper">
                                    <div className="onlyDate">29</div>
                                    <div className="monthYear">
                                      Jun <br />
                                      2022
                                    </div>
                                  </div>
                                </td>
                                <td align="center">
                                  138.600
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12216][bookings][14354][total_amount]"
                                    defaultValue="138.600"
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12216][bookings][14354][booking_id]"
                                    defaultValue={28990}
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12216][bookings][14354][source_type]"
                                    defaultValue="agoda"
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12216][bookings][14354][serviceType]"
                                    defaultValue="hotel"
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12216][bookings][14354][pending_amount]"
                                    defaultValue="138.600"
                                  />
                                </td>
                                <td align="center">0.000</td>
                                <td align="center">
                                  138.600
                                  <input
                                    id="pnd_amt_14354"
                                    className="pending-amt"
                                    defaultValue="138.600"
                                    type="hidden"
                                  />
                                </td>
                                <td align="center">
                                  <div className="form-group">
                                    <input
                                      type="text"
                                      className="form-control col-md-12 booking_w_amt"
                                      rowid={14354}
                                      name="invoices[2022/12216][bookings][14354][amount]"
                                      size={10}
                                      invoice_number="2022-12216"
                                      onblur="extractNumber(this,3,true),checkAmount(138.600,this);total_allocation_amount();extractNumber(this,3,true);"
                                    />
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="panel-group btm_mar">
                    <div
                      className="panel panel-default "
                      id="panel-2022-12232"
                      invoice_number="2022-12232"
                    >
                      <div className="panel-heading">
                        <table
                          className="table   table-responsive invoice-table"
                          style={{ marginBottom: "0px" }}
                        >
                          <thead>
                            <tr>
                              <th width="5%" style={{ marginTop: "8px" }}>
                                <div className="checkbox checkbox-success checkbox-inline">
                                  <input
                                    type="checkbox"
                                    id="chk-2022-12232"
                                    className="chk-invoice"
                                    name="invoices[2022/12232][chk]"
                                    defaultValue="2022/12232"
                                    invoice_number="2022-12232"
                                    onchange="total_allocation_amount_invoice_set(this);total_allocation_amount($('amt-2022-12232'));"
                                  />
                                  <label />
                                  <i
                                    className="fa fa-chevron-down"
                                    data-bs-toggle="collapse"
                                    href="#panel-body-2022-12232"
                                  />{" "}
                                </div>
                              </th>
                              <th
                                width="18%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12232"
                              >
                                Invoice Number 2022/12232
                              </th>
                              {/*<th width="10%" style="text-align: left !important"  data-bs-toggle="collapse" href="#panel-body-2022-12232">
                                                      <span>Super PNR [OT18486]</span>
                                                  </th>*/}
                              <th
                                width="8%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12232"
                              >
                                <span>Sectors [1]</span>
                              </th>
                              <th
                                width="18%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12232"
                              >
                                <span>Invoice amount: 136.350</span>
                                <input
                                  defaultValue="136.35"
                                  className="inv-pending-amount"
                                  invoice_number="2022-12232"
                                  type="hidden"
                                />
                              </th>
                              <th
                                width="15%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12232"
                              >
                                <span>Allocated: 0.000</span>
                              </th>
                              <th
                                width="15%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12232"
                              >
                                <span>Unallocated: 136.350</span>
                              </th>
                              <th width="10%">
                                <span
                                  style={{
                                    float: "right",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  Allocate Amount:
                                </span>
                              </th>
                              <th>
                                <input
                                  type="text"
                                  style={{ color: "black" }}
                                  className="invoice-amt"
                                  id="amt-2022-12232"
                                  invoice_number="2022-12232"
                                  name="invoices[2022/12232][amount]"
                                  onblur="extractNumber(this,3,true),checkAmount(136.35,this);total_allocation_amount(this);"
                                />
                              </th>
                            </tr>
                          </thead>
                        </table>
                      </div>
                      <div
                        id="panel-body-2022-12232"
                        className="panel-collapse collapse"
                      >
                        <div
                          className="panel-body removeMargins"
                          style={{ margin: 0 }}
                        >
                          <table id className="table   table-responsive">
                            <thead>
                              <tr
                                style={{
                                  background: "#bce0ff",
                                  color: "black",
                                  fontFamily: "MONTSERRAT",
                                }}
                              >
                                <th style={{ textAlign: "center" }}>
                                  <div className="checkbox checkbox-success checkbox-inline">
                                    <input
                                      type="checkbox"
                                      className="select-all"
                                      invoice_number="2022-12232"
                                      onclick=" return checkAll(this);"
                                    />{" "}
                                    <label />
                                  </div>
                                </th>
                                <th style={{ textAlign: "center" }}>Service</th>
                                <th style={{ textAlign: "center" }}>
                                  Booking ID
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Invoice No.
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Pax Name
                                </th>
                                <th>Supplier</th>
                                <th style={{ textAlign: "center" }}>Type</th>
                                <th style={{ textAlign: "center" }}>
                                  Service Date
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Total Amount
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Received
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Pending Amount
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Allocation
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              <tr className="phps_row_1" id="tr-14370">
                                <td align="center">
                                  <div className="checkbox checkbox-success checkbox-inline">
                                    <input
                                      type="checkbox"
                                      name="invoices[2022/12232][bookings][chk][]"
                                      id="chk[]"
                                      rowid={14370}
                                      className="row_chkbox"
                                      bcode={29013}
                                      defaultValue={14370}
                                      onclick="total_allocation_amount_set(this);"
                                      onchange="total_allocation_amount($('#tr-14370 .booking_w_amt'));"
                                      invoice_number="2022-12232"
                                    />{" "}
                                    <label />
                                    {/*                                                                <input type='hidden' name="2022-12232['bookings']['14370']" */}
                                    {/*                                                                    value='29013'> <input type='hidden' */}
                                    {/*                                                                    name='booking_rate_id[]' value='14370'> <input */}
                                    {/*                                                                    type='hidden' name='source_type[]' */}
                                    {/*                                                                    value='tboholidays'> <input */}
                                    {/*                                                                    type='hidden' name='serviceType[]' */}
                                    {/*                                                                    value='hotel'> */}
                                  </div>
                                </td>
                                <td align="center">
                                  {/* hotel */}
                                  <h4
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Hotel"
                                  >
                                    <i className="fa fa-bed" />
                                  </h4>
                                </td>
                                <td align="center">29013</td>
                                <td align="center">2022/12232</td>
                                <td align="center">Mr Rohan Vartak</td>
                                <td align="center">tboholidays</td>
                                <td align="center">Sale</td>
                                <td align="center">
                                  <div className="dateWrapper">
                                    <div className="onlyDate">25</div>
                                    <div className="monthYear">
                                      Jun <br />
                                      2022
                                    </div>
                                  </div>
                                </td>
                                <td align="center">
                                  136.350
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12232][bookings][14370][total_amount]"
                                    defaultValue="136.350"
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12232][bookings][14370][booking_id]"
                                    defaultValue={29013}
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12232][bookings][14370][source_type]"
                                    defaultValue="tboholidays"
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12232][bookings][14370][serviceType]"
                                    defaultValue="hotel"
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12232][bookings][14370][pending_amount]"
                                    defaultValue="136.350"
                                  />
                                </td>
                                <td align="center">0.000</td>
                                <td align="center">
                                  136.350
                                  <input
                                    id="pnd_amt_14370"
                                    className="pending-amt"
                                    defaultValue="136.350"
                                    type="hidden"
                                  />
                                </td>
                                <td align="center">
                                  <div className="form-group">
                                    <input
                                      type="text"
                                      className="form-control col-md-12 booking_w_amt"
                                      rowid={14370}
                                      name="invoices[2022/12232][bookings][14370][amount]"
                                      size={10}
                                      invoice_number="2022-12232"
                                      onblur="extractNumber(this,3,true),checkAmount(136.350,this);total_allocation_amount();extractNumber(this,3,true);"
                                    />
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="panel-group btm_mar">
                    <div
                      className="panel panel-default "
                      id="panel-2022-12234"
                      invoice_number="2022-12234"
                    >
                      <div className="panel-heading">
                        <table
                          className="table   table-responsive invoice-table"
                          style={{ marginBottom: "0px" }}
                        >
                          <thead>
                            <tr>
                              <th width="5%" style={{ marginTop: "8px" }}>
                                <div className="checkbox checkbox-success checkbox-inline">
                                  <input
                                    type="checkbox"
                                    id="chk-2022-12234"
                                    className="chk-invoice"
                                    name="invoices[2022/12234][chk]"
                                    defaultValue="2022/12234"
                                    invoice_number="2022-12234"
                                    onchange="total_allocation_amount_invoice_set(this);total_allocation_amount($('amt-2022-12234'));"
                                  />
                                  <label />
                                  <i
                                    className="fa fa-chevron-down"
                                    data-bs-toggle="collapse"
                                    href="#panel-body-2022-12234"
                                  />{" "}
                                </div>
                              </th>
                              <th
                                width="18%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12234"
                              >
                                Invoice Number 2022/12234
                              </th>
                              {/*<th width="10%" style="text-align: left !important"  data-bs-toggle="collapse" href="#panel-body-2022-12234">
                                                      <span>Super PNR [OT18487]</span>
                                                  </th>*/}
                              <th
                                width="8%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12234"
                              >
                                <span>Sectors [1]</span>
                              </th>
                              <th
                                width="18%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12234"
                              >
                                <span>Invoice amount: 140.890</span>
                                <input
                                  defaultValue="140.89"
                                  className="inv-pending-amount"
                                  invoice_number="2022-12234"
                                  type="hidden"
                                />
                              </th>
                              <th
                                width="15%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12234"
                              >
                                <span>Allocated: 0.000</span>
                              </th>
                              <th
                                width="15%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12234"
                              >
                                <span>Unallocated: 140.890</span>
                              </th>
                              <th width="10%">
                                <span
                                  style={{
                                    float: "right",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  Allocate Amount:
                                </span>
                              </th>
                              <th>
                                <input
                                  type="text"
                                  style={{ color: "black" }}
                                  className="invoice-amt"
                                  id="amt-2022-12234"
                                  invoice_number="2022-12234"
                                  name="invoices[2022/12234][amount]"
                                  onblur="extractNumber(this,3,true),checkAmount(140.89,this);total_allocation_amount(this);"
                                />
                              </th>
                            </tr>
                          </thead>
                        </table>
                      </div>
                      <div
                        id="panel-body-2022-12234"
                        className="panel-collapse collapse"
                      >
                        <div
                          className="panel-body removeMargins"
                          style={{ margin: 0 }}
                        >
                          <table id className="table   table-responsive">
                            <thead>
                              <tr
                                style={{
                                  background: "#bce0ff",
                                  color: "black",
                                  fontFamily: "MONTSERRAT",
                                }}
                              >
                                <th style={{ textAlign: "center" }}>
                                  <div className="checkbox checkbox-success checkbox-inline">
                                    <input
                                      type="checkbox"
                                      className="select-all"
                                      invoice_number="2022-12234"
                                      onclick=" return checkAll(this);"
                                    />{" "}
                                    <label />
                                  </div>
                                </th>
                                <th style={{ textAlign: "center" }}>Service</th>
                                <th style={{ textAlign: "center" }}>
                                  Booking ID
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Invoice No.
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Pax Name
                                </th>
                                <th>Supplier</th>
                                <th style={{ textAlign: "center" }}>Type</th>
                                <th style={{ textAlign: "center" }}>
                                  Service Date
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Total Amount
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Received
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Pending Amount
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Allocation
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              <tr className="phps_row_0" id="tr-14372">
                                <td align="center">
                                  <div className="checkbox checkbox-success checkbox-inline">
                                    <input
                                      type="checkbox"
                                      name="invoices[2022/12234][bookings][chk][]"
                                      id="chk[]"
                                      rowid={14372}
                                      className="row_chkbox"
                                      bcode={29014}
                                      defaultValue={14372}
                                      onclick="total_allocation_amount_set(this);"
                                      onchange="total_allocation_amount($('#tr-14372 .booking_w_amt'));"
                                      invoice_number="2022-12234"
                                    />{" "}
                                    <label />
                                    {/*                                                                <input type='hidden' name="2022-12234['bookings']['14372']" */}
                                    {/*                                                                    value='29014'> <input type='hidden' */}
                                    {/*                                                                    name='booking_rate_id[]' value='14372'> <input */}
                                    {/*                                                                    type='hidden' name='source_type[]' */}
                                    {/*                                                                    value='tboholidays'> <input */}
                                    {/*                                                                    type='hidden' name='serviceType[]' */}
                                    {/*                                                                    value='hotel'> */}
                                  </div>
                                </td>
                                <td align="center">
                                  {/* hotel */}
                                  <h4
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Hotel"
                                  >
                                    <i className="fa fa-bed" />
                                  </h4>
                                </td>
                                <td align="center">29014</td>
                                <td align="center">2022/12234</td>
                                <td align="center">Mr Rohan Vartak</td>
                                <td align="center">tboholidays</td>
                                <td align="center">Sale</td>
                                <td align="center">
                                  <div className="dateWrapper">
                                    <div className="onlyDate">24</div>
                                    <div className="monthYear">
                                      Jul <br />
                                      2022
                                    </div>
                                  </div>
                                </td>
                                <td align="center">
                                  140.890
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12234][bookings][14372][total_amount]"
                                    defaultValue="140.890"
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12234][bookings][14372][booking_id]"
                                    defaultValue={29014}
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12234][bookings][14372][source_type]"
                                    defaultValue="tboholidays"
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12234][bookings][14372][serviceType]"
                                    defaultValue="hotel"
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12234][bookings][14372][pending_amount]"
                                    defaultValue="140.890"
                                  />
                                </td>
                                <td align="center">0.000</td>
                                <td align="center">
                                  140.890
                                  <input
                                    id="pnd_amt_14372"
                                    className="pending-amt"
                                    defaultValue="140.890"
                                    type="hidden"
                                  />
                                </td>
                                <td align="center">
                                  <div className="form-group">
                                    <input
                                      type="text"
                                      className="form-control col-md-12 booking_w_amt"
                                      rowid={14372}
                                      name="invoices[2022/12234][bookings][14372][amount]"
                                      size={10}
                                      invoice_number="2022-12234"
                                      onblur="extractNumber(this,3,true),checkAmount(140.890,this);total_allocation_amount();extractNumber(this,3,true);"
                                    />
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="panel-group btm_mar">
                    <div
                      className="panel panel-default "
                      id="panel-2022-12242"
                      invoice_number="2022-12242"
                    >
                      <div className="panel-heading">
                        <table
                          className="table   table-responsive invoice-table"
                          style={{ marginBottom: "0px" }}
                        >
                          <thead>
                            <tr>
                              <th width="5%" style={{ marginTop: "8px" }}>
                                <div className="checkbox checkbox-success checkbox-inline">
                                  <input
                                    type="checkbox"
                                    id="chk-2022-12242"
                                    className="chk-invoice"
                                    name="invoices[2022/12242][chk]"
                                    defaultValue="2022/12242"
                                    invoice_number="2022-12242"
                                    onchange="total_allocation_amount_invoice_set(this);total_allocation_amount($('amt-2022-12242'));"
                                  />
                                  <label />
                                  <i
                                    className="fa fa-chevron-down"
                                    data-bs-toggle="collapse"
                                    href="#panel-body-2022-12242"
                                  />{" "}
                                </div>
                              </th>
                              <th
                                width="18%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12242"
                              >
                                Invoice Number 2022/12242
                              </th>
                              {/*<th width="10%" style="text-align: left !important"  data-bs-toggle="collapse" href="#panel-body-2022-12242">
                                                      <span>Super PNR [OT18493]</span>
                                                  </th>*/}
                              <th
                                width="8%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12242"
                              >
                                <span>Sectors [1]</span>
                              </th>
                              <th
                                width="18%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12242"
                              >
                                <span>Invoice amount: 171.990</span>
                                <input
                                  defaultValue="171.99"
                                  className="inv-pending-amount"
                                  invoice_number="2022-12242"
                                  type="hidden"
                                />
                              </th>
                              <th
                                width="15%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12242"
                              >
                                <span>Allocated: 0.000</span>
                              </th>
                              <th
                                width="15%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12242"
                              >
                                <span>Unallocated: 171.990</span>
                              </th>
                              <th width="10%">
                                <span
                                  style={{
                                    float: "right",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  Allocate Amount:
                                </span>
                              </th>
                              <th>
                                <input
                                  type="text"
                                  style={{ color: "black" }}
                                  className="invoice-amt"
                                  id="amt-2022-12242"
                                  invoice_number="2022-12242"
                                  name="invoices[2022/12242][amount]"
                                  onblur="extractNumber(this,3,true),checkAmount(171.99,this);total_allocation_amount(this);"
                                />
                              </th>
                            </tr>
                          </thead>
                        </table>
                      </div>
                      <div
                        id="panel-body-2022-12242"
                        className="panel-collapse collapse"
                      >
                        <div
                          className="panel-body removeMargins"
                          style={{ margin: 0 }}
                        >
                          <table id className="table   table-responsive">
                            <thead>
                              <tr
                                style={{
                                  background: "#bce0ff",
                                  color: "black",
                                  fontFamily: "MONTSERRAT",
                                }}
                              >
                                <th style={{ textAlign: "center" }}>
                                  <div className="checkbox checkbox-success checkbox-inline">
                                    <input
                                      type="checkbox"
                                      className="select-all"
                                      invoice_number="2022-12242"
                                      onclick=" return checkAll(this);"
                                    />{" "}
                                    <label />
                                  </div>
                                </th>
                                <th style={{ textAlign: "center" }}>Service</th>
                                <th style={{ textAlign: "center" }}>
                                  Booking ID
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Invoice No.
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Pax Name
                                </th>
                                <th>Supplier</th>
                                <th style={{ textAlign: "center" }}>Type</th>
                                <th style={{ textAlign: "center" }}>
                                  Service Date
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Total Amount
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Received
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Pending Amount
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Allocation
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              <tr className="phps_row_1" id="tr-14380">
                                <td align="center">
                                  <div className="checkbox checkbox-success checkbox-inline">
                                    <input
                                      type="checkbox"
                                      name="invoices[2022/12242][bookings][chk][]"
                                      id="chk[]"
                                      rowid={14380}
                                      className="row_chkbox"
                                      bcode="TD1129019"
                                      defaultValue={14380}
                                      onclick="total_allocation_amount_set(this);"
                                      onchange="total_allocation_amount($('#tr-14380 .booking_w_amt'));"
                                      invoice_number="2022-12242"
                                    />{" "}
                                    <label />
                                    {/*                                                                <input type='hidden' name="2022-12242['bookings']['14380']" */}
                                    {/*                                                                    value='29019'> <input type='hidden' */}
                                    {/*                                                                    name='booking_rate_id[]' value='14380'> <input */}
                                    {/*                                                                    type='hidden' name='source_type[]' */}
                                    {/*                                                                    value='hotelbeds'> <input */}
                                    {/*                                                                    type='hidden' name='serviceType[]' */}
                                    {/*                                                                    value='hotel'> */}
                                  </div>
                                </td>
                                <td align="center">
                                  {/* hotel */}
                                  <h4
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Hotel"
                                  >
                                    <i className="fa fa-bed" />
                                  </h4>
                                </td>
                                <td align="center">TD1129019</td>
                                <td align="center">2022/12242</td>
                                <td align="center">Mr sujay Raut</td>
                                <td align="center">hotelbeds</td>
                                <td align="center">Sale</td>
                                <td align="center">
                                  <div className="dateWrapper">
                                    <div className="onlyDate">23</div>
                                    <div className="monthYear">
                                      Aug <br />
                                      2022
                                    </div>
                                  </div>
                                </td>
                                <td align="center">
                                  171.990
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12242][bookings][14380][total_amount]"
                                    defaultValue="171.990"
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12242][bookings][14380][booking_id]"
                                    defaultValue={29019}
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12242][bookings][14380][source_type]"
                                    defaultValue="hotelbeds"
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12242][bookings][14380][serviceType]"
                                    defaultValue="hotel"
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12242][bookings][14380][pending_amount]"
                                    defaultValue="171.990"
                                  />
                                </td>
                                <td align="center">0.000</td>
                                <td align="center">
                                  171.990
                                  <input
                                    id="pnd_amt_14380"
                                    className="pending-amt"
                                    defaultValue="171.990"
                                    type="hidden"
                                  />
                                </td>
                                <td align="center">
                                  <div className="form-group">
                                    <input
                                      type="text"
                                      className="form-control col-md-12 booking_w_amt"
                                      rowid={14380}
                                      name="invoices[2022/12242][bookings][14380][amount]"
                                      size={10}
                                      invoice_number="2022-12242"
                                      onblur="extractNumber(this,3,true),checkAmount(171.990,this);total_allocation_amount();extractNumber(this,3,true);"
                                    />
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="panel-group btm_mar">
                    <div
                      className="panel panel-default "
                      id="panel-2022-12244"
                      invoice_number="2022-12244"
                    >
                      <div className="panel-heading">
                        <table
                          className="table   table-responsive invoice-table"
                          style={{ marginBottom: "0px" }}
                        >
                          <thead>
                            <tr>
                              <th width="5%" style={{ marginTop: "8px" }}>
                                <div className="checkbox checkbox-success checkbox-inline">
                                  <input
                                    type="checkbox"
                                    id="chk-2022-12244"
                                    className="chk-invoice"
                                    name="invoices[2022/12244][chk]"
                                    defaultValue="2022/12244"
                                    invoice_number="2022-12244"
                                    onchange="total_allocation_amount_invoice_set(this);total_allocation_amount($('amt-2022-12244'));"
                                  />
                                  <label />
                                  <i
                                    className="fa fa-chevron-down"
                                    data-bs-toggle="collapse"
                                    href="#panel-body-2022-12244"
                                  />
                                </div>
                              </th>
                              <th
                                width="18%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12244"
                              >
                                Invoice Number 2022/12244
                              </th>
                              {/*<th width="10%" style="text-align: left !important"  data-bs-toggle="collapse" href="#panel-body-2022-12244">
                                                      <span>Super PNR [OT18494]</span>
                                                  </th>*/}
                              <th
                                width="8%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12244"
                              >
                                <span>Sectors [1]</span>
                              </th>
                              <th
                                width="18%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12244"
                              >
                                <span>Invoice amount: 10,416.580</span>
                                <input
                                  defaultValue="10416.58"
                                  className="inv-pending-amount"
                                  invoice_number="2022-12244"
                                  type="hidden"
                                />
                              </th>
                              <th
                                width="15%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12244"
                              >
                                <span>Allocated: 0.000</span>
                              </th>
                              <th
                                width="15%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12244"
                              >
                                <span>Unallocated: 10,416.580</span>
                              </th>
                              <th width="10%">
                                <span
                                  style={{
                                    float: "right",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  Allocate Amount:
                                </span>
                              </th>
                              <th>
                                <input
                                  type="text"
                                  style={{ color: "black" }}
                                  className="invoice-amt"
                                  id="amt-2022-12244"
                                  invoice_number="2022-12244"
                                  name="invoices[2022/12244][amount]"
                                  onblur="extractNumber(this,3,true),checkAmount(10416.58,this);total_allocation_amount(this);"
                                />
                              </th>
                            </tr>
                          </thead>
                        </table>
                      </div>
                      <div
                        id="panel-body-2022-12244"
                        className="panel-collapse collapse"
                      >
                        <div
                          className="panel-body removeMargins"
                          style={{ margin: 0 }}
                        >
                          <table id className="table   table-responsive">
                            <thead>
                              <tr
                                style={{
                                  background: "#bce0ff",
                                  color: "black",
                                  fontFamily: "MONTSERRAT",
                                }}
                              >
                                <th style={{ textAlign: "center" }}>
                                  <div className="checkbox checkbox-success checkbox-inline">
                                    <input
                                      type="checkbox"
                                      className="select-all"
                                      invoice_number="2022-12244"
                                      onclick=" return checkAll(this);"
                                    />{" "}
                                    <label />
                                  </div>
                                </th>
                                <th style={{ textAlign: "center" }}>Service</th>
                                <th style={{ textAlign: "center" }}>
                                  Booking ID
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Invoice No.
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Pax Name
                                </th>
                                <th>Supplier</th>
                                <th style={{ textAlign: "center" }}>Type</th>
                                <th style={{ textAlign: "center" }}>
                                  Service Date
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Total Amount
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Received
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Pending Amount
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Allocation
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              <tr className="phps_row_0" id="tr-14382">
                                <td align="center">
                                  <div className="checkbox checkbox-success checkbox-inline">
                                    <input
                                      type="checkbox"
                                      name="invoices[2022/12244][bookings][chk][]"
                                      id="chk[]"
                                      rowid={14382}
                                      className="row_chkbox"
                                      bcode="TD1129020"
                                      defaultValue={14382}
                                      onclick="total_allocation_amount_set(this);"
                                      onchange="total_allocation_amount($('#tr-14382 .booking_w_amt'));"
                                      invoice_number="2022-12244"
                                    />{" "}
                                    <label />
                                    {/*                                                                <input type='hidden' name="2022-12244['bookings']['14382']" */}
                                    {/*                                                                    value='29020'> <input type='hidden' */}
                                    {/*                                                                    name='booking_rate_id[]' value='14382'> <input */}
                                    {/*                                                                    type='hidden' name='source_type[]' */}
                                    {/*                                                                    value='hotelbeds'> <input */}
                                    {/*                                                                    type='hidden' name='serviceType[]' */}
                                    {/*                                                                    value='hotel'> */}
                                  </div>
                                </td>
                                <td align="center">
                                  {/* hotel */}
                                  <h4
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Hotel"
                                  >
                                    <i className="fa fa-bed" />
                                  </h4>
                                </td>
                                <td align="center">TD1129020</td>
                                <td align="center">2022/12244</td>
                                <td align="center">Mr Sujay Test</td>
                                <td align="center">hotelbeds</td>
                                <td align="center">Sale</td>
                                <td align="center">
                                  <div className="dateWrapper">
                                    <div className="onlyDate">23</div>
                                    <div className="monthYear">
                                      Aug <br />
                                      2022
                                    </div>
                                  </div>
                                </td>
                                <td align="center">
                                  10,416.580
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12244][bookings][14382][total_amount]"
                                    defaultValue="10416.580"
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12244][bookings][14382][booking_id]"
                                    defaultValue={29020}
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12244][bookings][14382][source_type]"
                                    defaultValue="hotelbeds"
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12244][bookings][14382][serviceType]"
                                    defaultValue="hotel"
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12244][bookings][14382][pending_amount]"
                                    defaultValue="10416.580"
                                  />
                                </td>
                                <td align="center">0.000</td>
                                <td align="center">
                                  10,416.580
                                  <input
                                    id="pnd_amt_14382"
                                    className="pending-amt"
                                    defaultValue="10416.580"
                                    type="hidden"
                                  />
                                </td>
                                <td align="center">
                                  <div className="form-group">
                                    <input
                                      type="text"
                                      className="form-control col-md-12 booking_w_amt"
                                      rowid={14382}
                                      name="invoices[2022/12244][bookings][14382][amount]"
                                      size={10}
                                      invoice_number="2022-12244"
                                      onblur="extractNumber(this,3,true),checkAmount(10416.580,this);total_allocation_amount();extractNumber(this,3,true);"
                                    />
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="panel-group btm_mar">
                    <div
                      className="panel panel-default "
                      id="panel-2022-12250"
                      invoice_number="2022-12250"
                    >
                      <div className="panel-heading">
                        <table
                          className="table   table-responsive invoice-table"
                          style={{ marginBottom: "0px" }}
                        >
                          <thead>
                            <tr>
                              <th width="5%" style={{ marginTop: "8px" }}>
                                <div className="checkbox checkbox-success checkbox-inline">
                                  <input
                                    type="checkbox"
                                    id="chk-2022-12250"
                                    className="chk-invoice"
                                    name="invoices[2022/12250][chk]"
                                    defaultValue="2022/12250"
                                    invoice_number="2022-12250"
                                    onchange="total_allocation_amount_invoice_set(this);total_allocation_amount($('amt-2022-12250'));"
                                  />
                                  <label />
                                  <i
                                    className="fa fa-chevron-down"
                                    data-bs-toggle="collapse"
                                    href="#panel-body-2022-12250"
                                  />{" "}
                                </div>
                              </th>
                              <th
                                width="18%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12250"
                              >
                                Invoice Number 2022/12250
                              </th>
                              {/*<th width="10%" style="text-align: left !important"  data-bs-toggle="collapse" href="#panel-body-2022-12250">
                                                      <span>Super PNR [OT18520]</span>
                                                  </th>*/}
                              <th
                                width="8%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12250"
                              >
                                <span>Sectors [1]</span>
                              </th>
                              <th
                                width="18%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12250"
                              >
                                <span>Invoice amount: 127.940</span>
                                <input
                                  defaultValue="127.94"
                                  className="inv-pending-amount"
                                  invoice_number="2022-12250"
                                  type="hidden"
                                />
                              </th>
                              <th
                                width="15%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12250"
                              >
                                <span>Allocated: 0.000</span>
                              </th>
                              <th
                                width="15%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12250"
                              >
                                <span>Unallocated: 127.940</span>
                              </th>
                              <th width="10%">
                                <span
                                  style={{
                                    float: "right",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  Allocate Amount:
                                </span>
                              </th>
                              <th>
                                <input
                                  type="text"
                                  style={{ color: "black" }}
                                  className="invoice-amt"
                                  id="amt-2022-12250"
                                  invoice_number="2022-12250"
                                  name="invoices[2022/12250][amount]"
                                  onblur="extractNumber(this,3,true),checkAmount(127.94,this);total_allocation_amount(this);"
                                />
                              </th>
                            </tr>
                          </thead>
                        </table>
                      </div>
                      <div
                        id="panel-body-2022-12250"
                        className="panel-collapse collapse"
                      >
                        <div
                          className="panel-body removeMargins"
                          style={{ margin: 0 }}
                        >
                          <table id className="table   table-responsive">
                            <thead>
                              <tr
                                style={{
                                  background: "#bce0ff",
                                  color: "black",
                                  fontFamily: "MONTSERRAT",
                                }}
                              >
                                <th style={{ textAlign: "center" }}>
                                  <div className="checkbox checkbox-success checkbox-inline">
                                    <input
                                      type="checkbox"
                                      className="select-all"
                                      invoice_number="2022-12250"
                                      onclick=" return checkAll(this);"
                                    />{" "}
                                    <label />
                                  </div>
                                </th>
                                <th style={{ textAlign: "center" }}>Service</th>
                                <th style={{ textAlign: "center" }}>
                                  Booking ID
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Invoice No.
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Pax Name
                                </th>
                                <th>Supplier</th>
                                <th style={{ textAlign: "center" }}>Type</th>
                                <th style={{ textAlign: "center" }}>
                                  Service Date
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Total Amount
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Received
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Pending Amount
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Allocation
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              <tr className="phps_row_1" id="tr-14388">
                                <td align="center">
                                  <div className="checkbox checkbox-success checkbox-inline">
                                    <input
                                      type="checkbox"
                                      name="invoices[2022/12250][bookings][chk][]"
                                      id="chk[]"
                                      rowid={14388}
                                      className="row_chkbox"
                                      bcode="TD1129030"
                                      defaultValue={14388}
                                      onclick="total_allocation_amount_set(this);"
                                      onchange="total_allocation_amount($('#tr-14388 .booking_w_amt'));"
                                      invoice_number="2022-12250"
                                    />{" "}
                                    <label />
                                    {/*                                                                <input type='hidden' name="2022-12250['bookings']['14388']" */}
                                    {/*                                                                    value='29030'> <input type='hidden' */}
                                    {/*                                                                    name='booking_rate_id[]' value='14388'> <input */}
                                    {/*                                                                    type='hidden' name='source_type[]' */}
                                    {/*                                                                    value='hotelbeds'> <input */}
                                    {/*                                                                    type='hidden' name='serviceType[]' */}
                                    {/*                                                                    value='hotel'> */}
                                  </div>
                                </td>
                                <td align="center">
                                  {/* hotel */}
                                  <h4
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Hotel"
                                  >
                                    <i className="fa fa-bed" />
                                  </h4>
                                </td>
                                <td align="center">TD1129030</td>
                                <td align="center">2022/12250</td>
                                <td align="center">Mr Sujay Raut</td>
                                <td align="center">hotelbeds</td>
                                <td align="center">Sale</td>
                                <td align="center">
                                  <div className="dateWrapper">
                                    <div className="onlyDate">15</div>
                                    <div className="monthYear">
                                      Dec <br />
                                      2022
                                    </div>
                                  </div>
                                </td>
                                <td align="center">
                                  127.940
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12250][bookings][14388][total_amount]"
                                    defaultValue="127.940"
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12250][bookings][14388][booking_id]"
                                    defaultValue={29030}
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12250][bookings][14388][source_type]"
                                    defaultValue="hotelbeds"
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12250][bookings][14388][serviceType]"
                                    defaultValue="hotel"
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12250][bookings][14388][pending_amount]"
                                    defaultValue="127.940"
                                  />
                                </td>
                                <td align="center">0.000</td>
                                <td align="center">
                                  127.940
                                  <input
                                    id="pnd_amt_14388"
                                    className="pending-amt"
                                    defaultValue="127.940"
                                    type="hidden"
                                  />
                                </td>
                                <td align="center">
                                  <div className="form-group">
                                    <input
                                      type="text"
                                      className="form-control col-md-12 booking_w_amt"
                                      rowid={14388}
                                      name="invoices[2022/12250][bookings][14388][amount]"
                                      size={10}
                                      invoice_number="2022-12250"
                                      onblur="extractNumber(this,3,true),checkAmount(127.940,this);total_allocation_amount();extractNumber(this,3,true);"
                                    />
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="panel-group btm_mar">
                    <div
                      className="panel panel-default "
                      id="panel-2022-12258"
                      invoice_number="2022-12258"
                    >
                      <div className="panel-heading">
                        <table
                          className="table   table-responsive invoice-table"
                          style={{ marginBottom: "0px" }}
                        >
                          <thead>
                            <tr>
                              <th width="5%" style={{ marginTop: "8px" }}>
                                <div className="checkbox checkbox-success checkbox-inline">
                                  <input
                                    type="checkbox"
                                    id="chk-2022-12258"
                                    className="chk-invoice"
                                    name="invoices[2022/12258][chk]"
                                    defaultValue="2022/12258"
                                    invoice_number="2022-12258"
                                    onchange="total_allocation_amount_invoice_set(this);total_allocation_amount($('amt-2022-12258'));"
                                  />
                                  <label />
                                  <i
                                    className="fa fa-chevron-down"
                                    data-bs-toggle="collapse"
                                    href="#panel-body-2022-12258"
                                  />
                                </div>
                              </th>
                              <th
                                width="18%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12258"
                              >
                                Invoice Number 2022/12258
                              </th>
                              {/*<th width="10%" style="text-align: left !important"  data-bs-toggle="collapse" href="#panel-body-2022-12258">
                                                      <span>Super PNR [OT18569]</span>
                                                  </th>*/}
                              <th
                                width="8%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12258"
                              >
                                <span>Sectors [1]</span>
                              </th>
                              <th
                                width="18%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12258"
                              >
                                <span>Invoice amount: 208.300</span>
                                <input
                                  defaultValue="208.3"
                                  className="inv-pending-amount"
                                  invoice_number="2022-12258"
                                  type="hidden"
                                />
                              </th>
                              <th
                                width="15%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12258"
                              >
                                <span>Allocated: 0.000</span>
                              </th>
                              <th
                                width="15%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12258"
                              >
                                <span>Unallocated: 208.300</span>
                              </th>
                              <th width="10%">
                                <span
                                  style={{
                                    float: "right",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  Allocate Amount:
                                </span>
                              </th>
                              <th>
                                <input
                                  type="text"
                                  style={{ color: "black" }}
                                  className="invoice-amt"
                                  id="amt-2022-12258"
                                  invoice_number="2022-12258"
                                  name="invoices[2022/12258][amount]"
                                  onblur="extractNumber(this,3,true),checkAmount(208.3,this);total_allocation_amount(this);"
                                />
                              </th>
                            </tr>
                          </thead>
                        </table>
                      </div>
                      <div
                        id="panel-body-2022-12258"
                        className="panel-collapse collapse"
                      >
                        <div
                          className="panel-body removeMargins"
                          style={{ margin: 0 }}
                        >
                          <table id className="table   table-responsive">
                            <thead>
                              <tr
                                style={{
                                  background: "#bce0ff",
                                  color: "black",
                                  fontFamily: "MONTSERRAT",
                                }}
                              >
                                <th style={{ textAlign: "center" }}>
                                  <div className="checkbox checkbox-success checkbox-inline">
                                    <input
                                      type="checkbox"
                                      className="select-all"
                                      invoice_number="2022-12258"
                                      onclick=" return checkAll(this);"
                                    />{" "}
                                    <label />
                                  </div>
                                </th>
                                <th style={{ textAlign: "center" }}>Service</th>
                                <th style={{ textAlign: "center" }}>
                                  Booking ID
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Invoice No.
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Pax Name
                                </th>
                                <th>Supplier</th>
                                <th style={{ textAlign: "center" }}>Type</th>
                                <th style={{ textAlign: "center" }}>
                                  Service Date
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Total Amount
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Received
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Pending Amount
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Allocation
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              <tr className="phps_row_0" id="tr-14396">
                                <td align="center">
                                  <div className="checkbox checkbox-success checkbox-inline">
                                    <input
                                      type="checkbox"
                                      name="invoices[2022/12258][bookings][chk][]"
                                      id="chk[]"
                                      rowid={14396}
                                      className="row_chkbox"
                                      bcode="TD829053"
                                      defaultValue={14396}
                                      onclick="total_allocation_amount_set(this);"
                                      onchange="total_allocation_amount($('#tr-14396 .booking_w_amt'));"
                                      invoice_number="2022-12258"
                                    />{" "}
                                    <label />
                                    {/*                                                                <input type='hidden' name="2022-12258['bookings']['14396']" */}
                                    {/*                                                                    value='29053'> <input type='hidden' */}
                                    {/*                                                                    name='booking_rate_id[]' value='14396'> <input */}
                                    {/*                                                                    type='hidden' name='source_type[]' */}
                                    {/*                                                                    value='localsystem'> <input */}
                                    {/*                                                                    type='hidden' name='serviceType[]' */}
                                    {/*                                                                    value='hotel'> */}
                                  </div>
                                </td>
                                <td align="center">
                                  {/* hotel */}
                                  <h4
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Hotel"
                                  >
                                    <i className="fa fa-bed" />
                                  </h4>
                                </td>
                                <td align="center">TD829053</td>
                                <td align="center">2022/12258</td>
                                <td align="center">Mr test Booking</td>
                                <td align="center">localsystem</td>
                                <td align="center">Sale</td>
                                <td align="center">
                                  <div className="dateWrapper">
                                    <div className="onlyDate">24</div>
                                    <div className="monthYear">
                                      Aug <br />
                                      2022
                                    </div>
                                  </div>
                                </td>
                                <td align="center">
                                  208.300
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12258][bookings][14396][total_amount]"
                                    defaultValue="208.300"
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12258][bookings][14396][booking_id]"
                                    defaultValue={29053}
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12258][bookings][14396][source_type]"
                                    defaultValue="localsystem"
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12258][bookings][14396][serviceType]"
                                    defaultValue="hotel"
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12258][bookings][14396][pending_amount]"
                                    defaultValue="208.300"
                                  />
                                </td>
                                <td align="center">0.000</td>
                                <td align="center">
                                  208.300
                                  <input
                                    id="pnd_amt_14396"
                                    className="pending-amt"
                                    defaultValue="208.300"
                                    type="hidden"
                                  />
                                </td>
                                <td align="center">
                                  <div className="form-group">
                                    <input
                                      type="text"
                                      className="form-control col-md-12 booking_w_amt"
                                      rowid={14396}
                                      name="invoices[2022/12258][bookings][14396][amount]"
                                      size={10}
                                      invoice_number="2022-12258"
                                      onblur="extractNumber(this,3,true),checkAmount(208.300,this);total_allocation_amount();extractNumber(this,3,true);"
                                    />
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="panel-group btm_mar">
                    <div
                      className="panel panel-default "
                      id="panel-2022-12260"
                      invoice_number="2022-12260"
                    >
                      <div className="panel-heading">
                        <table
                          className="table   table-responsive invoice-table"
                          style={{ marginBottom: "0px" }}
                        >
                          <thead>
                            <tr>
                              <th width="5%" style={{ marginTop: "8px" }}>
                                <div className="checkbox checkbox-success checkbox-inline">
                                  <input
                                    type="checkbox"
                                    id="chk-2022-12260"
                                    className="chk-invoice"
                                    name="invoices[2022/12260][chk]"
                                    defaultValue="2022/12260"
                                    invoice_number="2022-12260"
                                    onchange="total_allocation_amount_invoice_set(this);total_allocation_amount($('amt-2022-12260'));"
                                  />
                                  <label />
                                  <i
                                    className="fa fa-chevron-down"
                                    data-bs-toggle="collapse"
                                    href="#panel-body-2022-12260"
                                  />{" "}
                                </div>
                              </th>
                              <th
                                width="18%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12260"
                              >
                                Invoice Number 2022/12260
                              </th>
                              {/*<th width="10%" style="text-align: left !important"  data-bs-toggle="collapse" href="#panel-body-2022-12260">
                                                      <span>Super PNR [OT18578]</span>
                                                  </th>*/}
                              <th
                                width="8%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12260"
                              >
                                <span>Sectors [1]</span>
                              </th>
                              <th
                                width="18%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12260"
                              >
                                <span>Invoice amount: 104.152</span>
                                <input
                                  defaultValue="104.152"
                                  className="inv-pending-amount"
                                  invoice_number="2022-12260"
                                  type="hidden"
                                />
                              </th>
                              <th
                                width="15%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12260"
                              >
                                <span>Allocated: 0.000</span>
                              </th>
                              <th
                                width="15%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12260"
                              >
                                <span>Unallocated: 104.152</span>
                              </th>
                              <th width="10%">
                                <span
                                  style={{
                                    float: "right",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  Allocate Amount:
                                </span>
                              </th>
                              <th>
                                <input
                                  type="text"
                                  style={{ color: "black" }}
                                  className="invoice-amt"
                                  id="amt-2022-12260"
                                  invoice_number="2022-12260"
                                  name="invoices[2022/12260][amount]"
                                  onblur="extractNumber(this,3,true),checkAmount(104.152,this);total_allocation_amount(this);"
                                />
                              </th>
                            </tr>
                          </thead>
                        </table>
                      </div>
                      <div
                        id="panel-body-2022-12260"
                        className="panel-collapse collapse"
                      >
                        <div
                          className="panel-body removeMargins"
                          style={{ margin: 0 }}
                        >
                          <table id className="table   table-responsive">
                            <thead>
                              <tr
                                style={{
                                  background: "#bce0ff",
                                  color: "black",
                                  fontFamily: "MONTSERRAT",
                                }}
                              >
                                <th style={{ textAlign: "center" }}>
                                  <div className="checkbox checkbox-success checkbox-inline">
                                    <input
                                      type="checkbox"
                                      className="select-all"
                                      invoice_number="2022-12260"
                                      onclick=" return checkAll(this);"
                                    />{" "}
                                    <label />
                                  </div>
                                </th>
                                <th style={{ textAlign: "center" }}>Service</th>
                                <th style={{ textAlign: "center" }}>
                                  Booking ID
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Invoice No.
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Pax Name
                                </th>
                                <th>Supplier</th>
                                <th style={{ textAlign: "center" }}>Type</th>
                                <th style={{ textAlign: "center" }}>
                                  Service Date
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Total Amount
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Received
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Pending Amount
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Allocation
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              <tr className="phps_row_1" id="tr-14398">
                                <td align="center">
                                  <div className="checkbox checkbox-success checkbox-inline">
                                    <input
                                      type="checkbox"
                                      name="invoices[2022/12260][bookings][chk][]"
                                      id="chk[]"
                                      rowid={14398}
                                      className="row_chkbox"
                                      bcode="TD829062"
                                      defaultValue={14398}
                                      onclick="total_allocation_amount_set(this);"
                                      onchange="total_allocation_amount($('#tr-14398 .booking_w_amt'));"
                                      invoice_number="2022-12260"
                                    />{" "}
                                    <label />
                                    {/*                                                                <input type='hidden' name="2022-12260['bookings']['14398']" */}
                                    {/*                                                                    value='29062'> <input type='hidden' */}
                                    {/*                                                                    name='booking_rate_id[]' value='14398'> <input */}
                                    {/*                                                                    type='hidden' name='source_type[]' */}
                                    {/*                                                                    value='localsystem'> <input */}
                                    {/*                                                                    type='hidden' name='serviceType[]' */}
                                    {/*                                                                    value='hotel'> */}
                                  </div>
                                </td>
                                <td align="center">
                                  {/* hotel */}
                                  <h4
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Hotel"
                                  >
                                    <i className="fa fa-bed" />
                                  </h4>
                                </td>
                                <td align="center">TD829062</td>
                                <td align="center">2022/12260</td>
                                <td align="center">Mr Qtech Test</td>
                                <td align="center">localsystem</td>
                                <td align="center">Sale</td>
                                <td align="center">
                                  <div className="dateWrapper">
                                    <div className="onlyDate">02</div>
                                    <div className="monthYear">
                                      Sep <br />
                                      2022
                                    </div>
                                  </div>
                                </td>
                                <td align="center">
                                  104.152
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12260][bookings][14398][total_amount]"
                                    defaultValue="104.152"
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12260][bookings][14398][booking_id]"
                                    defaultValue={29062}
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12260][bookings][14398][source_type]"
                                    defaultValue="localsystem"
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12260][bookings][14398][serviceType]"
                                    defaultValue="hotel"
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12260][bookings][14398][pending_amount]"
                                    defaultValue="104.152"
                                  />
                                </td>
                                <td align="center">0.000</td>
                                <td align="center">
                                  104.152
                                  <input
                                    id="pnd_amt_14398"
                                    className="pending-amt"
                                    defaultValue="104.152"
                                    type="hidden"
                                  />
                                </td>
                                <td align="center">
                                  <div className="form-group">
                                    <input
                                      type="text"
                                      className="form-control col-md-12 booking_w_amt"
                                      rowid={14398}
                                      name="invoices[2022/12260][bookings][14398][amount]"
                                      size={10}
                                      invoice_number="2022-12260"
                                      onblur="extractNumber(this,3,true),checkAmount(104.152,this);total_allocation_amount();extractNumber(this,3,true);"
                                    />
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="panel-group btm_mar">
                    <div
                      className="panel panel-default "
                      id="panel-2022-12274"
                      invoice_number="2022-12274"
                    >
                      <div className="panel-heading">
                        <table
                          className="table   table-responsive invoice-table"
                          style={{ marginBottom: "0px" }}
                        >
                          <thead>
                            <tr>
                              <th width="5%" style={{ marginTop: "8px" }}>
                                <div className="checkbox checkbox-success checkbox-inline">
                                  <input
                                    type="checkbox"
                                    id="chk-2022-12274"
                                    className="chk-invoice"
                                    name="invoices[2022/12274][chk]"
                                    defaultValue="2022/12274"
                                    invoice_number="2022-12274"
                                    onchange="total_allocation_amount_invoice_set(this);total_allocation_amount($('amt-2022-12274'));"
                                  />
                                  <label />
                                  <i
                                    className="fa fa-chevron-down"
                                    data-bs-toggle="collapse"
                                    href="#panel-body-2022-12274"
                                  />
                                </div>
                              </th>
                              <th
                                width="18%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12274"
                              >
                                Invoice Number 2022/12274
                              </th>
                              {/*<th width="10%" style="text-align: left !important"  data-bs-toggle="collapse" href="#panel-body-2022-12274">
                                                      <span>Super PNR [OT18585]</span>
                                                  </th>*/}
                              <th
                                width="8%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12274"
                              >
                                <span>Sectors [1]</span>
                              </th>
                              <th
                                width="18%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12274"
                              >
                                <span>Invoice amount: 208.304</span>
                                <input
                                  defaultValue="208.304"
                                  className="inv-pending-amount"
                                  invoice_number="2022-12274"
                                  type="hidden"
                                />
                              </th>
                              <th
                                width="15%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12274"
                              >
                                <span>Allocated: 0.000</span>
                              </th>
                              <th
                                width="15%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12274"
                              >
                                <span>Unallocated: 208.304</span>
                              </th>
                              <th width="10%">
                                <span
                                  style={{
                                    float: "right",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  Allocate Amount:
                                </span>
                              </th>
                              <th>
                                <input
                                  type="text"
                                  style={{ color: "black" }}
                                  className="invoice-amt"
                                  id="amt-2022-12274"
                                  invoice_number="2022-12274"
                                  name="invoices[2022/12274][amount]"
                                  onblur="extractNumber(this,3,true),checkAmount(208.304,this);total_allocation_amount(this);"
                                />
                              </th>
                            </tr>
                          </thead>
                        </table>
                      </div>
                      <div
                        id="panel-body-2022-12274"
                        className="panel-collapse collapse"
                      >
                        <div
                          className="panel-body removeMargins"
                          style={{ margin: 0 }}
                        >
                          <table id className="table   table-responsive">
                            <thead>
                              <tr
                                style={{
                                  background: "#bce0ff",
                                  color: "black",
                                  fontFamily: "MONTSERRAT",
                                }}
                              >
                                <th style={{ textAlign: "center" }}>
                                  <div className="checkbox checkbox-success checkbox-inline">
                                    <input
                                      type="checkbox"
                                      className="select-all"
                                      invoice_number="2022-12274"
                                      onclick=" return checkAll(this);"
                                    />{" "}
                                    <label />
                                  </div>
                                </th>
                                <th style={{ textAlign: "center" }}>Service</th>
                                <th style={{ textAlign: "center" }}>
                                  Booking ID
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Invoice No.
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Pax Name
                                </th>
                                <th>Supplier</th>
                                <th style={{ textAlign: "center" }}>Type</th>
                                <th style={{ textAlign: "center" }}>
                                  Service Date
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Total Amount
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Received
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Pending Amount
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Allocation
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              <tr className="phps_row_0" id="tr-14412">
                                <td align="center">
                                  <div className="checkbox checkbox-success checkbox-inline">
                                    <input
                                      type="checkbox"
                                      name="invoices[2022/12274][bookings][chk][]"
                                      id="chk[]"
                                      rowid={14412}
                                      className="row_chkbox"
                                      bcode="TD829069"
                                      defaultValue={14412}
                                      onclick="total_allocation_amount_set(this);"
                                      onchange="total_allocation_amount($('#tr-14412 .booking_w_amt'));"
                                      invoice_number="2022-12274"
                                    />{" "}
                                    <label />
                                    {/*                                                                <input type='hidden' name="2022-12274['bookings']['14412']" */}
                                    {/*                                                                    value='29069'> <input type='hidden' */}
                                    {/*                                                                    name='booking_rate_id[]' value='14412'> <input */}
                                    {/*                                                                    type='hidden' name='source_type[]' */}
                                    {/*                                                                    value='localsystem'> <input */}
                                    {/*                                                                    type='hidden' name='serviceType[]' */}
                                    {/*                                                                    value='hotel'> */}
                                  </div>
                                </td>
                                <td align="center">
                                  {/* hotel */}
                                  <h4
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Hotel"
                                  >
                                    <i className="fa fa-bed" />
                                  </h4>
                                </td>
                                <td align="center">TD829069</td>
                                <td align="center">2022/12274</td>
                                <td align="center">Mr test Booking</td>
                                <td align="center">localsystem</td>
                                <td align="center">Sale</td>
                                <td align="center">
                                  <div className="dateWrapper">
                                    <div className="onlyDate">28</div>
                                    <div className="monthYear">
                                      Sep <br />
                                      2022
                                    </div>
                                  </div>
                                </td>
                                <td align="center">
                                  208.304
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12274][bookings][14412][total_amount]"
                                    defaultValue="208.304"
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12274][bookings][14412][booking_id]"
                                    defaultValue={29069}
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12274][bookings][14412][source_type]"
                                    defaultValue="localsystem"
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12274][bookings][14412][serviceType]"
                                    defaultValue="hotel"
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12274][bookings][14412][pending_amount]"
                                    defaultValue="208.304"
                                  />
                                </td>
                                <td align="center">0.000</td>
                                <td align="center">
                                  208.304
                                  <input
                                    id="pnd_amt_14412"
                                    className="pending-amt"
                                    defaultValue="208.304"
                                    type="hidden"
                                  />
                                </td>
                                <td align="center">
                                  <div className="form-group">
                                    <input
                                      type="text"
                                      className="form-control col-md-12 booking_w_amt"
                                      rowid={14412}
                                      name="invoices[2022/12274][bookings][14412][amount]"
                                      size={10}
                                      invoice_number="2022-12274"
                                      onblur="extractNumber(this,3,true),checkAmount(208.304,this);total_allocation_amount();extractNumber(this,3,true);"
                                    />
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="panel-group btm_mar">
                    <div
                      className="panel panel-default "
                      id="panel-2022-12276"
                      invoice_number="2022-12276"
                    >
                      <div className="panel-heading">
                        <table
                          className="table   table-responsive invoice-table"
                          style={{ marginBottom: "0px" }}
                        >
                          <thead>
                            <tr>
                              <th width="5%" style={{ marginTop: "8px" }}>
                                <div className="checkbox checkbox-success checkbox-inline">
                                  <input
                                    type="checkbox"
                                    id="chk-2022-12276"
                                    className="chk-invoice"
                                    name="invoices[2022/12276][chk]"
                                    defaultValue="2022/12276"
                                    invoice_number="2022-12276"
                                    onchange="total_allocation_amount_invoice_set(this);total_allocation_amount($('amt-2022-12276'));"
                                  />
                                  <label />
                                  <i
                                    className="fa fa-chevron-down"
                                    data-bs-toggle="collapse"
                                    href="#panel-body-2022-12276"
                                  />{" "}
                                </div>
                              </th>
                              <th
                                width="18%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12276"
                              >
                                Invoice Number 2022/12276
                              </th>
                              {/*<th width="10%" style="text-align: left !important"  data-bs-toggle="collapse" href="#panel-body-2022-12276">
                                                      <span>Super PNR [OT18587]</span>
                                                  </th>*/}
                              <th
                                width="8%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12276"
                              >
                                <span>Sectors [1]</span>
                              </th>
                              <th
                                width="18%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12276"
                              >
                                <span>Invoice amount: 225.457</span>
                                <input
                                  defaultValue="225.457"
                                  className="inv-pending-amount"
                                  invoice_number="2022-12276"
                                  type="hidden"
                                />
                              </th>
                              <th
                                width="15%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12276"
                              >
                                <span>Allocated: 0.000</span>
                              </th>
                              <th
                                width="15%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12276"
                              >
                                <span>Unallocated: 225.457</span>
                              </th>
                              <th width="10%">
                                <span
                                  style={{
                                    float: "right",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  Allocate Amount:
                                </span>
                              </th>
                              <th>
                                <input
                                  type="text"
                                  style={{ color: "black" }}
                                  className="invoice-amt"
                                  id="amt-2022-12276"
                                  invoice_number="2022-12276"
                                  name="invoices[2022/12276][amount]"
                                  onblur="extractNumber(this,3,true),checkAmount(225.457,this);total_allocation_amount(this);"
                                />
                              </th>
                            </tr>
                          </thead>
                        </table>
                      </div>
                      <div
                        id="panel-body-2022-12276"
                        className="panel-collapse collapse"
                      >
                        <div
                          className="panel-body removeMargins"
                          style={{ margin: 0 }}
                        >
                          <table id className="table   table-responsive">
                            <thead>
                              <tr
                                style={{
                                  background: "#bce0ff",
                                  color: "black",
                                  fontFamily: "MONTSERRAT",
                                }}
                              >
                                <th style={{ textAlign: "center" }}>
                                  <div className="checkbox checkbox-success checkbox-inline">
                                    <input
                                      type="checkbox"
                                      className="select-all"
                                      invoice_number="2022-12276"
                                      onclick=" return checkAll(this);"
                                    />{" "}
                                    <label />
                                  </div>
                                </th>
                                <th style={{ textAlign: "center" }}>Service</th>
                                <th style={{ textAlign: "center" }}>
                                  Booking ID
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Invoice No.
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Pax Name
                                </th>
                                <th>Supplier</th>
                                <th style={{ textAlign: "center" }}>Type</th>
                                <th style={{ textAlign: "center" }}>
                                  Service Date
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Total Amount
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Received
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Pending Amount
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Allocation
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              <tr className="phps_row_1" id="tr-14414">
                                <td align="center">
                                  <div className="checkbox checkbox-success checkbox-inline">
                                    <input
                                      type="checkbox"
                                      name="invoices[2022/12276][bookings][chk][]"
                                      id="chk[]"
                                      rowid={14414}
                                      className="row_chkbox"
                                      bcode="TD1129071"
                                      defaultValue={14414}
                                      onclick="total_allocation_amount_set(this);"
                                      onchange="total_allocation_amount($('#tr-14414 .booking_w_amt'));"
                                      invoice_number="2022-12276"
                                    />{" "}
                                    <label />
                                    {/*                                                                <input type='hidden' name="2022-12276['bookings']['14414']" */}
                                    {/*                                                                    value='29071'> <input type='hidden' */}
                                    {/*                                                                    name='booking_rate_id[]' value='14414'> <input */}
                                    {/*                                                                    type='hidden' name='source_type[]' */}
                                    {/*                                                                    value='hotelbeds'> <input */}
                                    {/*                                                                    type='hidden' name='serviceType[]' */}
                                    {/*                                                                    value='hotel'> */}
                                  </div>
                                </td>
                                <td align="center">
                                  {/* hotel */}
                                  <h4
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Hotel"
                                  >
                                    <i className="fa fa-bed" />
                                  </h4>
                                </td>
                                <td align="center">TD1129071</td>
                                <td align="center">2022/12276</td>
                                <td align="center">Mr Qtech Test</td>
                                <td align="center">hotelbeds</td>
                                <td align="center">Sale</td>
                                <td align="center">
                                  <div className="dateWrapper">
                                    <div className="onlyDate">15</div>
                                    <div className="monthYear">
                                      Dec <br />
                                      2022
                                    </div>
                                  </div>
                                </td>
                                <td align="center">
                                  225.457
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12276][bookings][14414][total_amount]"
                                    defaultValue="225.457"
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12276][bookings][14414][booking_id]"
                                    defaultValue={29071}
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12276][bookings][14414][source_type]"
                                    defaultValue="hotelbeds"
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12276][bookings][14414][serviceType]"
                                    defaultValue="hotel"
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12276][bookings][14414][pending_amount]"
                                    defaultValue="225.457"
                                  />
                                </td>
                                <td align="center">0.000</td>
                                <td align="center">
                                  225.457
                                  <input
                                    id="pnd_amt_14414"
                                    className="pending-amt"
                                    defaultValue="225.457"
                                    type="hidden"
                                  />
                                </td>
                                <td align="center">
                                  <div className="form-group">
                                    <input
                                      type="text"
                                      className="form-control col-md-12 booking_w_amt"
                                      rowid={14414}
                                      name="invoices[2022/12276][bookings][14414][amount]"
                                      size={10}
                                      invoice_number="2022-12276"
                                      onblur="extractNumber(this,3,true),checkAmount(225.457,this);total_allocation_amount();extractNumber(this,3,true);"
                                    />
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="panel-group btm_mar">
                    <div
                      className="panel panel-default "
                      id="panel-2022-12278"
                      invoice_number="2022-12278"
                    >
                      <div className="panel-heading">
                        <table
                          className="table   table-responsive invoice-table"
                          style={{ marginBottom: "0px" }}
                        >
                          <thead>
                            <tr>
                              <th width="5%" style={{ marginTop: "8px" }}>
                                <div className="checkbox checkbox-success checkbox-inline">
                                  <input
                                    type="checkbox"
                                    id="chk-2022-12278"
                                    className="chk-invoice"
                                    name="invoices[2022/12278][chk]"
                                    defaultValue="2022/12278"
                                    invoice_number="2022-12278"
                                    onchange="total_allocation_amount_invoice_set(this);total_allocation_amount($('amt-2022-12278'));"
                                  />
                                  <label />
                                  <i
                                    className="fa fa-chevron-down"
                                    data-bs-toggle="collapse"
                                    href="#panel-body-2022-12278"
                                  />{" "}
                                </div>
                              </th>
                              <th
                                width="18%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12278"
                              >
                                Invoice Number 2022/12278
                              </th>
                              {/*<th width="10%" style="text-align: left !important"  data-bs-toggle="collapse" href="#panel-body-2022-12278">
                                                      <span>Super PNR [OT18588]</span>
                                                  </th>*/}
                              <th
                                width="8%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12278"
                              >
                                <span>Sectors [1]</span>
                              </th>
                              <th
                                width="18%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12278"
                              >
                                <span>Invoice amount: 87.386</span>
                                <input
                                  defaultValue="87.386"
                                  className="inv-pending-amount"
                                  invoice_number="2022-12278"
                                  type="hidden"
                                />
                              </th>
                              <th
                                width="15%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12278"
                              >
                                <span>Allocated: 0.000</span>
                              </th>
                              <th
                                width="15%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12278"
                              >
                                <span>Unallocated: 87.386</span>
                              </th>
                              <th width="10%">
                                <span
                                  style={{
                                    float: "right",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  Allocate Amount:
                                </span>
                              </th>
                              <th>
                                <input
                                  type="text"
                                  style={{ color: "black" }}
                                  className="invoice-amt"
                                  id="amt-2022-12278"
                                  invoice_number="2022-12278"
                                  name="invoices[2022/12278][amount]"
                                  onblur="extractNumber(this,3,true),checkAmount(87.386,this);total_allocation_amount(this);"
                                />
                              </th>
                            </tr>
                          </thead>
                        </table>
                      </div>
                      <div
                        id="panel-body-2022-12278"
                        className="panel-collapse collapse"
                      >
                        <div
                          className="panel-body removeMargins"
                          style={{ margin: 0 }}
                        >
                          <table id className="table   table-responsive">
                            <thead>
                              <tr
                                style={{
                                  background: "#bce0ff",
                                  color: "black",
                                  fontFamily: "MONTSERRAT",
                                }}
                              >
                                <th style={{ textAlign: "center" }}>
                                  <div className="checkbox checkbox-success checkbox-inline">
                                    <input
                                      type="checkbox"
                                      className="select-all"
                                      invoice_number="2022-12278"
                                      onclick=" return checkAll(this);"
                                    />{" "}
                                    <label />
                                  </div>
                                </th>
                                <th style={{ textAlign: "center" }}>Service</th>
                                <th style={{ textAlign: "center" }}>
                                  Booking ID
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Invoice No.
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Pax Name
                                </th>
                                <th>Supplier</th>
                                <th style={{ textAlign: "center" }}>Type</th>
                                <th style={{ textAlign: "center" }}>
                                  Service Date
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Total Amount
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Received
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Pending Amount
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Allocation
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              <tr className="phps_row_0" id="tr-14416">
                                <td align="center">
                                  <div className="checkbox checkbox-success checkbox-inline">
                                    <input
                                      type="checkbox"
                                      name="invoices[2022/12278][bookings][chk][]"
                                      id="chk[]"
                                      rowid={14416}
                                      className="row_chkbox"
                                      bcode="TD1129072"
                                      defaultValue={14416}
                                      onclick="total_allocation_amount_set(this);"
                                      onchange="total_allocation_amount($('#tr-14416 .booking_w_amt'));"
                                      invoice_number="2022-12278"
                                    />{" "}
                                    <label />
                                    {/*                                                                <input type='hidden' name="2022-12278['bookings']['14416']" */}
                                    {/*                                                                    value='29072'> <input type='hidden' */}
                                    {/*                                                                    name='booking_rate_id[]' value='14416'> <input */}
                                    {/*                                                                    type='hidden' name='source_type[]' */}
                                    {/*                                                                    value='hotelbeds'> <input */}
                                    {/*                                                                    type='hidden' name='serviceType[]' */}
                                    {/*                                                                    value='hotel'> */}
                                  </div>
                                </td>
                                <td align="center">
                                  {/* hotel */}
                                  <h4
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Hotel"
                                  >
                                    <i className="fa fa-bed" />
                                  </h4>
                                </td>
                                <td align="center">TD1129072</td>
                                <td align="center">2022/12278</td>
                                <td align="center">Mr test Booking</td>
                                <td align="center">hotelbeds</td>
                                <td align="center">Sale</td>
                                <td align="center">
                                  <div className="dateWrapper">
                                    <div className="onlyDate">22</div>
                                    <div className="monthYear">
                                      Dec <br />
                                      2022
                                    </div>
                                  </div>
                                </td>
                                <td align="center">
                                  87.386
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12278][bookings][14416][total_amount]"
                                    defaultValue="87.386"
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12278][bookings][14416][booking_id]"
                                    defaultValue={29072}
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12278][bookings][14416][source_type]"
                                    defaultValue="hotelbeds"
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12278][bookings][14416][serviceType]"
                                    defaultValue="hotel"
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12278][bookings][14416][pending_amount]"
                                    defaultValue="87.386"
                                  />
                                </td>
                                <td align="center">0.000</td>
                                <td align="center">
                                  87.386
                                  <input
                                    id="pnd_amt_14416"
                                    className="pending-amt"
                                    defaultValue="87.386"
                                    type="hidden"
                                  />
                                </td>
                                <td align="center">
                                  <div className="form-group">
                                    <input
                                      type="text"
                                      className="form-control col-md-12 booking_w_amt"
                                      rowid={14416}
                                      name="invoices[2022/12278][bookings][14416][amount]"
                                      size={10}
                                      invoice_number="2022-12278"
                                      onblur="extractNumber(this,3,true),checkAmount(87.386,this);total_allocation_amount();extractNumber(this,3,true);"
                                    />
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="panel-group btm_mar">
                    <div
                      className="panel panel-default "
                      id="panel-2022-12280"
                      invoice_number="2022-12280"
                    >
                      <div className="panel-heading">
                        <table
                          className="table   table-responsive invoice-table"
                          style={{ marginBottom: "0px" }}
                        >
                          <thead>
                            <tr>
                              <th width="5%" style={{ marginTop: "8px" }}>
                                <div className="checkbox checkbox-success checkbox-inline">
                                  <input
                                    type="checkbox"
                                    id="chk-2022-12280"
                                    className="chk-invoice"
                                    name="invoices[2022/12280][chk]"
                                    defaultValue="2022/12280"
                                    invoice_number="2022-12280"
                                    onchange="total_allocation_amount_invoice_set(this);total_allocation_amount($('amt-2022-12280'));"
                                  />
                                  <label />
                                  <i
                                    className="fa fa-chevron-down"
                                    data-bs-toggle="collapse"
                                    href="#panel-body-2022-12280"
                                  />
                                </div>
                              </th>
                              <th
                                width="18%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12280"
                              >
                                Invoice Number 2022/12280
                              </th>
                              {/*<th width="10%" style="text-align: left !important"  data-bs-toggle="collapse" href="#panel-body-2022-12280">
                                                      <span>Super PNR [OT18590]</span>
                                                  </th>*/}
                              <th
                                width="8%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12280"
                              >
                                <span>Sectors [1]</span>
                              </th>
                              <th
                                width="18%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12280"
                              >
                                <span>Invoice amount: 57.526</span>
                                <input
                                  defaultValue="57.526"
                                  className="inv-pending-amount"
                                  invoice_number="2022-12280"
                                  type="hidden"
                                />
                              </th>
                              <th
                                width="15%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12280"
                              >
                                <span>Allocated: 0.000</span>
                              </th>
                              <th
                                width="15%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12280"
                              >
                                <span>Unallocated: 57.526</span>
                              </th>
                              <th width="10%">
                                <span
                                  style={{
                                    float: "right",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  Allocate Amount:
                                </span>
                              </th>
                              <th>
                                <input
                                  type="text"
                                  style={{ color: "black" }}
                                  className="invoice-amt"
                                  id="amt-2022-12280"
                                  invoice_number="2022-12280"
                                  name="invoices[2022/12280][amount]"
                                  onblur="extractNumber(this,3,true),checkAmount(57.526,this);total_allocation_amount(this);"
                                />
                              </th>
                            </tr>
                          </thead>
                        </table>
                      </div>
                      <div
                        id="panel-body-2022-12280"
                        className="panel-collapse collapse"
                      >
                        <div
                          className="panel-body removeMargins"
                          style={{ margin: 0 }}
                        >
                          <table id className="table   table-responsive">
                            <thead>
                              <tr
                                style={{
                                  background: "#bce0ff",
                                  color: "black",
                                  fontFamily: "MONTSERRAT",
                                }}
                              >
                                <th style={{ textAlign: "center" }}>
                                  <div className="checkbox checkbox-success checkbox-inline">
                                    <input
                                      type="checkbox"
                                      className="select-all"
                                      invoice_number="2022-12280"
                                      onclick=" return checkAll(this);"
                                    />{" "}
                                    <label />
                                  </div>
                                </th>
                                <th style={{ textAlign: "center" }}>Service</th>
                                <th style={{ textAlign: "center" }}>
                                  Booking ID
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Invoice No.
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Pax Name
                                </th>
                                <th>Supplier</th>
                                <th style={{ textAlign: "center" }}>Type</th>
                                <th style={{ textAlign: "center" }}>
                                  Service Date
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Total Amount
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Received
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Pending Amount
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Allocation
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              <tr className="phps_row_1" id="tr-14418">
                                <td align="center">
                                  <div className="checkbox checkbox-success checkbox-inline">
                                    <input
                                      type="checkbox"
                                      name="invoices[2022/12280][bookings][chk][]"
                                      id="chk[]"
                                      rowid={14418}
                                      className="row_chkbox"
                                      bcode="TD1129074"
                                      defaultValue={14418}
                                      onclick="total_allocation_amount_set(this);"
                                      onchange="total_allocation_amount($('#tr-14418 .booking_w_amt'));"
                                      invoice_number="2022-12280"
                                    />{" "}
                                    <label />
                                    {/*                                                                <input type='hidden' name="2022-12280['bookings']['14418']" */}
                                    {/*                                                                    value='29074'> <input type='hidden' */}
                                    {/*                                                                    name='booking_rate_id[]' value='14418'> <input */}
                                    {/*                                                                    type='hidden' name='source_type[]' */}
                                    {/*                                                                    value='hotelbeds'> <input */}
                                    {/*                                                                    type='hidden' name='serviceType[]' */}
                                    {/*                                                                    value='hotel'> */}
                                  </div>
                                </td>
                                <td align="center">
                                  {/* hotel */}
                                  <h4
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Hotel"
                                  >
                                    <i className="fa fa-bed" />
                                  </h4>
                                </td>
                                <td align="center">TD1129074</td>
                                <td align="center">2022/12280</td>
                                <td align="center">Mr test Booking</td>
                                <td align="center">hotelbeds</td>
                                <td align="center">Sale</td>
                                <td align="center">
                                  <div className="dateWrapper">
                                    <div className="onlyDate">27</div>
                                    <div className="monthYear">
                                      Apr <br />
                                      2023
                                    </div>
                                  </div>
                                </td>
                                <td align="center">
                                  57.526
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12280][bookings][14418][total_amount]"
                                    defaultValue="57.526"
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12280][bookings][14418][booking_id]"
                                    defaultValue={29074}
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12280][bookings][14418][source_type]"
                                    defaultValue="hotelbeds"
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12280][bookings][14418][serviceType]"
                                    defaultValue="hotel"
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12280][bookings][14418][pending_amount]"
                                    defaultValue="57.526"
                                  />
                                </td>
                                <td align="center">0.000</td>
                                <td align="center">
                                  57.526
                                  <input
                                    id="pnd_amt_14418"
                                    className="pending-amt"
                                    defaultValue="57.526"
                                    type="hidden"
                                  />
                                </td>
                                <td align="center">
                                  <div className="form-group">
                                    <input
                                      type="text"
                                      className="form-control col-md-12 booking_w_amt"
                                      rowid={14418}
                                      name="invoices[2022/12280][bookings][14418][amount]"
                                      size={10}
                                      invoice_number="2022-12280"
                                      onblur="extractNumber(this,3,true),checkAmount(57.526,this);total_allocation_amount();extractNumber(this,3,true);"
                                    />
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="panel-group btm_mar">
                    <div
                      className="panel panel-default "
                      id="panel-2022-12282"
                      invoice_number="2022-12282"
                    >
                      <div className="panel-heading">
                        <table
                          className="table   table-responsive invoice-table"
                          style={{ marginBottom: "0px" }}
                        >
                          <thead>
                            <tr>
                              <th width="5%" style={{ marginTop: "8px" }}>
                                <div className="checkbox checkbox-success checkbox-inline">
                                  <input
                                    type="checkbox"
                                    id="chk-2022-12282"
                                    className="chk-invoice"
                                    name="invoices[2022/12282][chk]"
                                    defaultValue="2022/12282"
                                    invoice_number="2022-12282"
                                    onchange="total_allocation_amount_invoice_set(this);total_allocation_amount($('amt-2022-12282'));"
                                  />
                                  <label />
                                  <i
                                    className="fa fa-chevron-down"
                                    data-bs-toggle="collapse"
                                    href="#panel-body-2022-12282"
                                  />{" "}
                                </div>
                              </th>
                              <th
                                width="18%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12282"
                              >
                                Invoice Number 2022/12282
                              </th>
                              {/*<th width="10%" style="text-align: left !important"  data-bs-toggle="collapse" href="#panel-body-2022-12282">
                                                      <span>Super PNR [OT18591]</span>
                                                  </th>*/}
                              <th
                                width="8%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12282"
                              >
                                <span>Sectors [1]</span>
                              </th>
                              <th
                                width="18%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12282"
                              >
                                <span>Invoice amount: 69.530</span>
                                <input
                                  defaultValue="69.53"
                                  className="inv-pending-amount"
                                  invoice_number="2022-12282"
                                  type="hidden"
                                />
                              </th>
                              <th
                                width="15%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12282"
                              >
                                <span>Allocated: 0.000</span>
                              </th>
                              <th
                                width="15%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12282"
                              >
                                <span>Unallocated: 69.530</span>
                              </th>
                              <th width="10%">
                                <span
                                  style={{
                                    float: "right",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  Allocate Amount:
                                </span>
                              </th>
                              <th>
                                <input
                                  type="text"
                                  style={{ color: "black" }}
                                  className="invoice-amt"
                                  id="amt-2022-12282"
                                  invoice_number="2022-12282"
                                  name="invoices[2022/12282][amount]"
                                  onblur="extractNumber(this,3,true),checkAmount(69.53,this);total_allocation_amount(this);"
                                />
                              </th>
                            </tr>
                          </thead>
                        </table>
                      </div>
                      <div
                        id="panel-body-2022-12282"
                        className="panel-collapse collapse"
                      >
                        <div
                          className="panel-body removeMargins"
                          style={{ margin: 0 }}
                        >
                          <table id className="table   table-responsive">
                            <thead>
                              <tr
                                style={{
                                  background: "#bce0ff",
                                  color: "black",
                                  fontFamily: "MONTSERRAT",
                                }}
                              >
                                <th style={{ textAlign: "center" }}>
                                  <div className="checkbox checkbox-success checkbox-inline">
                                    <input
                                      type="checkbox"
                                      className="select-all"
                                      invoice_number="2022-12282"
                                      onclick=" return checkAll(this);"
                                    />{" "}
                                    <label />
                                  </div>
                                </th>
                                <th style={{ textAlign: "center" }}>Service</th>
                                <th style={{ textAlign: "center" }}>
                                  Booking ID
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Invoice No.
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Pax Name
                                </th>
                                <th>Supplier</th>
                                <th style={{ textAlign: "center" }}>Type</th>
                                <th style={{ textAlign: "center" }}>
                                  Service Date
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Total Amount
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Received
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Pending Amount
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Allocation
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              <tr className="phps_row_0" id="tr-14420">
                                <td align="center">
                                  <div className="checkbox checkbox-success checkbox-inline">
                                    <input
                                      type="checkbox"
                                      name="invoices[2022/12282][bookings][chk][]"
                                      id="chk[]"
                                      rowid={14420}
                                      className="row_chkbox"
                                      bcode="TD1129075"
                                      defaultValue={14420}
                                      onclick="total_allocation_amount_set(this);"
                                      onchange="total_allocation_amount($('#tr-14420 .booking_w_amt'));"
                                      invoice_number="2022-12282"
                                    />{" "}
                                    <label />
                                    {/*                                                                <input type='hidden' name="2022-12282['bookings']['14420']" */}
                                    {/*                                                                    value='29075'> <input type='hidden' */}
                                    {/*                                                                    name='booking_rate_id[]' value='14420'> <input */}
                                    {/*                                                                    type='hidden' name='source_type[]' */}
                                    {/*                                                                    value='hotelbeds'> <input */}
                                    {/*                                                                    type='hidden' name='serviceType[]' */}
                                    {/*                                                                    value='hotel'> */}
                                  </div>
                                </td>
                                <td align="center">
                                  {/* hotel */}
                                  <h4
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Hotel"
                                  >
                                    <i className="fa fa-bed" />
                                  </h4>
                                </td>
                                <td align="center">TD1129075</td>
                                <td align="center">2022/12282</td>
                                <td align="center">Mr test Booking</td>
                                <td align="center">hotelbeds</td>
                                <td align="center">Sale</td>
                                <td align="center">
                                  <div className="dateWrapper">
                                    <div className="onlyDate">13</div>
                                    <div className="monthYear">
                                      Apr <br />
                                      2023
                                    </div>
                                  </div>
                                </td>
                                <td align="center">
                                  69.530
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12282][bookings][14420][total_amount]"
                                    defaultValue="69.530"
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12282][bookings][14420][booking_id]"
                                    defaultValue={29075}
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12282][bookings][14420][source_type]"
                                    defaultValue="hotelbeds"
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12282][bookings][14420][serviceType]"
                                    defaultValue="hotel"
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12282][bookings][14420][pending_amount]"
                                    defaultValue="69.530"
                                  />
                                </td>
                                <td align="center">0.000</td>
                                <td align="center">
                                  69.530
                                  <input
                                    id="pnd_amt_14420"
                                    className="pending-amt"
                                    defaultValue="69.530"
                                    type="hidden"
                                  />
                                </td>
                                <td align="center">
                                  <div className="form-group">
                                    <input
                                      type="text"
                                      className="form-control col-md-12 booking_w_amt"
                                      rowid={14420}
                                      name="invoices[2022/12282][bookings][14420][amount]"
                                      size={10}
                                      invoice_number="2022-12282"
                                      onblur="extractNumber(this,3,true),checkAmount(69.530,this);total_allocation_amount();extractNumber(this,3,true);"
                                    />
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="panel-group btm_mar">
                    <div
                      className="panel panel-default "
                      id="panel-2022-12318"
                      invoice_number="2022-12318"
                    >
                      <div className="panel-heading">
                        <table
                          className="table   table-responsive invoice-table"
                          style={{ marginBottom: "0px" }}
                        >
                          <thead>
                            <tr>
                              <th width="5%" style={{ marginTop: "8px" }}>
                                <div className="checkbox checkbox-success checkbox-inline">
                                  <input
                                    type="checkbox"
                                    id="chk-2022-12318"
                                    className="chk-invoice"
                                    name="invoices[2022/12318][chk]"
                                    defaultValue="2022/12318"
                                    invoice_number="2022-12318"
                                    onchange="total_allocation_amount_invoice_set(this);total_allocation_amount($('amt-2022-12318'));"
                                  />
                                  <label />
                                  <i
                                    className="fa fa-chevron-down"
                                    data-bs-toggle="collapse"
                                    href="#panel-body-2022-12318"
                                  />
                                </div>
                              </th>
                              <th
                                width="18%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12318"
                              >
                                Invoice Number 2022/12318
                              </th>
                              {/*<th width="10%" style="text-align: left !important"  data-bs-toggle="collapse" href="#panel-body-2022-12318">
                                                      <span>Super PNR [OT18774]</span>
                                                  </th>*/}
                              <th
                                width="8%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12318"
                              >
                                <span>Sectors [1]</span>
                              </th>
                              <th
                                width="18%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12318"
                              >
                                <span>Invoice amount: 193.575</span>
                                <input
                                  defaultValue="193.575"
                                  className="inv-pending-amount"
                                  invoice_number="2022-12318"
                                  type="hidden"
                                />
                              </th>
                              <th
                                width="15%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12318"
                              >
                                <span>Allocated: 0.000</span>
                              </th>
                              <th
                                width="15%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12318"
                              >
                                <span>Unallocated: 193.575</span>
                              </th>
                              <th width="10%">
                                <span
                                  style={{
                                    float: "right",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  Allocate Amount:
                                </span>
                              </th>
                              <th>
                                <input
                                  type="text"
                                  style={{ color: "black" }}
                                  className="invoice-amt"
                                  id="amt-2022-12318"
                                  invoice_number="2022-12318"
                                  name="invoices[2022/12318][amount]"
                                  onblur="extractNumber(this,3,true),checkAmount(193.575,this);total_allocation_amount(this);"
                                />
                              </th>
                            </tr>
                          </thead>
                        </table>
                      </div>
                      <div
                        id="panel-body-2022-12318"
                        className="panel-collapse collapse"
                      >
                        <div
                          className="panel-body removeMargins"
                          style={{ margin: 0 }}
                        >
                          <table id className="table   table-responsive">
                            <thead>
                              <tr
                                style={{
                                  background: "#bce0ff",
                                  color: "black",
                                  fontFamily: "MONTSERRAT",
                                }}
                              >
                                <th style={{ textAlign: "center" }}>
                                  <div className="checkbox checkbox-success checkbox-inline">
                                    <input
                                      type="checkbox"
                                      className="select-all"
                                      invoice_number="2022-12318"
                                      onclick=" return checkAll(this);"
                                    />{" "}
                                    <label />
                                  </div>
                                </th>
                                <th style={{ textAlign: "center" }}>Service</th>
                                <th style={{ textAlign: "center" }}>
                                  Booking ID
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Invoice No.
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Pax Name
                                </th>
                                <th>Supplier</th>
                                <th style={{ textAlign: "center" }}>Type</th>
                                <th style={{ textAlign: "center" }}>
                                  Service Date
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Total Amount
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Received
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Pending Amount
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Allocation
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              <tr className="phps_row_1" id="tr-14456">
                                <td align="center">
                                  <div className="checkbox checkbox-success checkbox-inline">
                                    <input
                                      type="checkbox"
                                      name="invoices[2022/12318][bookings][chk][]"
                                      id="chk[]"
                                      rowid={14456}
                                      className="row_chkbox"
                                      bcode={29116}
                                      defaultValue={14456}
                                      onclick="total_allocation_amount_set(this);"
                                      onchange="total_allocation_amount($('#tr-14456 .booking_w_amt'));"
                                      invoice_number="2022-12318"
                                    />{" "}
                                    <label />
                                    {/*                                                                <input type='hidden' name="2022-12318['bookings']['14456']" */}
                                    {/*                                                                    value='29116'> <input type='hidden' */}
                                    {/*                                                                    name='booking_rate_id[]' value='14456'> <input */}
                                    {/*                                                                    type='hidden' name='source_type[]' */}
                                    {/*                                                                    value='tboholidays'> <input */}
                                    {/*                                                                    type='hidden' name='serviceType[]' */}
                                    {/*                                                                    value='hotel'> */}
                                  </div>
                                </td>
                                <td align="center">
                                  {/* hotel */}
                                  <h4
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Hotel"
                                  >
                                    <i className="fa fa-bed" />
                                  </h4>
                                </td>
                                <td align="center">29116</td>
                                <td align="center">2022/12318</td>
                                <td align="center">Mr qtech Testbooking</td>
                                <td align="center">tboholidays</td>
                                <td align="center">Sale</td>
                                <td align="center">
                                  <div className="dateWrapper">
                                    <div className="onlyDate">24</div>
                                    <div className="monthYear">
                                      Mar <br />
                                      2023
                                    </div>
                                  </div>
                                </td>
                                <td align="center">
                                  193.575
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12318][bookings][14456][total_amount]"
                                    defaultValue="193.575"
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12318][bookings][14456][booking_id]"
                                    defaultValue={29116}
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12318][bookings][14456][source_type]"
                                    defaultValue="tboholidays"
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12318][bookings][14456][serviceType]"
                                    defaultValue="hotel"
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12318][bookings][14456][pending_amount]"
                                    defaultValue="193.575"
                                  />
                                </td>
                                <td align="center">0.000</td>
                                <td align="center">
                                  193.575
                                  <input
                                    id="pnd_amt_14456"
                                    className="pending-amt"
                                    defaultValue="193.575"
                                    type="hidden"
                                  />
                                </td>
                                <td align="center">
                                  <div className="form-group">
                                    <input
                                      type="text"
                                      className="form-control col-md-12 booking_w_amt"
                                      rowid={14456}
                                      name="invoices[2022/12318][bookings][14456][amount]"
                                      size={10}
                                      invoice_number="2022-12318"
                                      onblur="extractNumber(this,3,true),checkAmount(193.575,this);total_allocation_amount();extractNumber(this,3,true);"
                                    />
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="panel-group btm_mar">
                    <div
                      className="panel panel-default "
                      id="panel-2022-12352"
                      invoice_number="2022-12352"
                    >
                      <div className="panel-heading">
                        <table
                          className="table   table-responsive invoice-table"
                          style={{ marginBottom: "0px" }}
                        >
                          <thead>
                            <tr>
                              <th width="5%" style={{ marginTop: "8px" }}>
                                <div className="checkbox checkbox-success checkbox-inline">
                                  <input
                                    type="checkbox"
                                    id="chk-2022-12352"
                                    className="chk-invoice"
                                    name="invoices[2022/12352][chk]"
                                    defaultValue="2022/12352"
                                    invoice_number="2022-12352"
                                    onchange="total_allocation_amount_invoice_set(this);total_allocation_amount($('amt-2022-12352'));"
                                  />
                                  <label />
                                  <i
                                    className="fa fa-chevron-down"
                                    data-bs-toggle="collapse"
                                    href="#panel-body-2022-12352"
                                  />
                                </div>
                              </th>
                              <th
                                width="18%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12352"
                              >
                                Invoice Number 2022/12352
                              </th>
                              {/*<th width="10%" style="text-align: left !important"  data-bs-toggle="collapse" href="#panel-body-2022-12352">
                                                      <span>Super PNR [OT18933]</span>
                                                  </th>*/}
                              <th
                                width="8%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12352"
                              >
                                <span>Sectors [1]</span>
                              </th>
                              <th
                                width="18%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12352"
                              >
                                <span>Invoice amount: 263.780</span>
                                <input
                                  defaultValue="263.78"
                                  className="inv-pending-amount"
                                  invoice_number="2022-12352"
                                  type="hidden"
                                />
                              </th>
                              <th
                                width="15%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12352"
                              >
                                <span>Allocated: 0.000</span>
                              </th>
                              <th
                                width="15%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2022-12352"
                              >
                                <span>Unallocated: 263.780</span>
                              </th>
                              <th width="10%">
                                <span
                                  style={{
                                    float: "right",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  Allocate Amount:
                                </span>
                              </th>
                              <th>
                                <input
                                  type="text"
                                  style={{ color: "black" }}
                                  className="invoice-amt"
                                  id="amt-2022-12352"
                                  invoice_number="2022-12352"
                                  name="invoices[2022/12352][amount]"
                                  onblur="extractNumber(this,3,true),checkAmount(263.78,this);total_allocation_amount(this);"
                                />
                              </th>
                            </tr>
                          </thead>
                        </table>
                      </div>
                      <div
                        id="panel-body-2022-12352"
                        className="panel-collapse collapse"
                      >
                        <div
                          className="panel-body removeMargins"
                          style={{ margin: 0 }}
                        >
                          <table id className="table   table-responsive">
                            <thead>
                              <tr
                                style={{
                                  background: "#bce0ff",
                                  color: "black",
                                  fontFamily: "MONTSERRAT",
                                }}
                              >
                                <th style={{ textAlign: "center" }}>
                                  <div className="checkbox checkbox-success checkbox-inline">
                                    <input
                                      type="checkbox"
                                      className="select-all"
                                      invoice_number="2022-12352"
                                      onclick=" return checkAll(this);"
                                    />{" "}
                                    <label />
                                  </div>
                                </th>
                                <th style={{ textAlign: "center" }}>Service</th>
                                <th style={{ textAlign: "center" }}>
                                  Booking ID
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Invoice No.
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Pax Name
                                </th>
                                <th>Supplier</th>
                                <th style={{ textAlign: "center" }}>Type</th>
                                <th style={{ textAlign: "center" }}>
                                  Service Date
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Total Amount
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Received
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Pending Amount
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Allocation
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              <tr className="phps_row_0" id="tr-14494">
                                <td align="center">
                                  <div className="checkbox checkbox-success checkbox-inline">
                                    <input
                                      type="checkbox"
                                      name="invoices[2022/12352][bookings][chk][]"
                                      id="chk[]"
                                      rowid={14494}
                                      className="row_chkbox"
                                      bcode="TD1529148"
                                      defaultValue={14494}
                                      onclick="total_allocation_amount_set(this);"
                                      onchange="total_allocation_amount($('#tr-14494 .booking_w_amt'));"
                                      invoice_number="2022-12352"
                                    />{" "}
                                    <label />
                                    {/*                                                                <input type='hidden' name="2022-12352['bookings']['14494']" */}
                                    {/*                                                                    value='29148'> <input type='hidden' */}
                                    {/*                                                                    name='booking_rate_id[]' value='14494'> <input */}
                                    {/*                                                                    type='hidden' name='source_type[]' */}
                                    {/*                                                                    value='expediapackage'> <input */}
                                    {/*                                                                    type='hidden' name='serviceType[]' */}
                                    {/*                                                                    value='hotel'> */}
                                  </div>
                                </td>
                                <td align="center">
                                  {/* hotel */}
                                  <h4
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Hotel"
                                  >
                                    <i className="fa fa-bed" />
                                  </h4>
                                </td>
                                <td align="center">TD1529148</td>
                                <td align="center">2022/12352</td>
                                <td align="center">Mr Sanket sADVVB</td>
                                <td align="center">expediapackage</td>
                                <td align="center">Sale</td>
                                <td align="center">
                                  <div className="dateWrapper">
                                    <div className="onlyDate">23</div>
                                    <div className="monthYear">
                                      Dec <br />
                                      2022
                                    </div>
                                  </div>
                                </td>
                                <td align="center">
                                  263.780
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12352][bookings][14494][total_amount]"
                                    defaultValue="263.780"
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12352][bookings][14494][booking_id]"
                                    defaultValue={29148}
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12352][bookings][14494][source_type]"
                                    defaultValue="expediapackage"
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12352][bookings][14494][serviceType]"
                                    defaultValue="hotel"
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2022/12352][bookings][14494][pending_amount]"
                                    defaultValue="263.780"
                                  />
                                </td>
                                <td align="center">0.000</td>
                                <td align="center">
                                  263.780
                                  <input
                                    id="pnd_amt_14494"
                                    className="pending-amt"
                                    defaultValue="263.780"
                                    type="hidden"
                                  />
                                </td>
                                <td align="center">
                                  <div className="form-group">
                                    <input
                                      type="text"
                                      className="form-control col-md-12 booking_w_amt"
                                      rowid={14494}
                                      name="invoices[2022/12352][bookings][14494][amount]"
                                      size={10}
                                      invoice_number="2022-12352"
                                      onblur="extractNumber(this,3,true),checkAmount(263.780,this);total_allocation_amount();extractNumber(this,3,true);"
                                    />
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="panel-group btm_mar">
                    <div
                      className="panel panel-default "
                      id="panel-2023-12396"
                      invoice_number="2023-12396"
                    >
                      <div className="panel-heading">
                        <table
                          className="table   table-responsive invoice-table"
                          style={{ marginBottom: "0px" }}
                        >
                          <thead>
                            <tr>
                              <th width="5%" style={{ marginTop: "8px" }}>
                                <div className="checkbox checkbox-success checkbox-inline">
                                  <input
                                    type="checkbox"
                                    id="chk-2023-12396"
                                    className="chk-invoice"
                                    name="invoices[2023/12396][chk]"
                                    defaultValue="2023/12396"
                                    invoice_number="2023-12396"
                                    onchange="total_allocation_amount_invoice_set(this);total_allocation_amount($('amt-2023-12396'));"
                                  />
                                  <label />
                                  <i
                                    className="fa fa-chevron-down"
                                    data-bs-toggle="collapse"
                                    href="#panel-body-2023-12396"
                                  />{" "}
                                </div>
                              </th>
                              <th
                                width="18%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2023-12396"
                              >
                                Invoice Number 2023/12396
                              </th>
                              {/*<th width="10%" style="text-align: left !important"  data-bs-toggle="collapse" href="#panel-body-2023-12396">
                                                      <span>Super PNR [OT19169]</span>
                                                  </th>*/}
                              <th
                                width="8%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2023-12396"
                              >
                                <span>Sectors [1]</span>
                              </th>
                              <th
                                width="18%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2023-12396"
                              >
                                <span>Invoice amount: 110.790</span>
                                <input
                                  defaultValue="110.79"
                                  className="inv-pending-amount"
                                  invoice_number="2023-12396"
                                  type="hidden"
                                />
                              </th>
                              <th
                                width="15%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2023-12396"
                              >
                                <span>Allocated: 0.000</span>
                              </th>
                              <th
                                width="15%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2023-12396"
                              >
                                <span>Unallocated: 110.790</span>
                              </th>
                              <th width="10%">
                                <span
                                  style={{
                                    float: "right",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  Allocate Amount:
                                </span>
                              </th>
                              <th>
                                <input
                                  type="text"
                                  style={{ color: "black" }}
                                  className="invoice-amt"
                                  id="amt-2023-12396"
                                  invoice_number="2023-12396"
                                  name="invoices[2023/12396][amount]"
                                  onblur="extractNumber(this,3,true),checkAmount(110.79,this);total_allocation_amount(this);"
                                />
                              </th>
                            </tr>
                          </thead>
                        </table>
                      </div>
                      <div
                        id="panel-body-2023-12396"
                        className="panel-collapse collapse"
                      >
                        <div
                          className="panel-body removeMargins"
                          style={{ margin: 0 }}
                        >
                          <table id className="table   table-responsive">
                            <thead>
                              <tr
                                style={{
                                  background: "#bce0ff",
                                  color: "black",
                                  fontFamily: "MONTSERRAT",
                                }}
                              >
                                <th style={{ textAlign: "center" }}>
                                  <div className="checkbox checkbox-success checkbox-inline">
                                    <input
                                      type="checkbox"
                                      className="select-all"
                                      invoice_number="2023-12396"
                                      onclick=" return checkAll(this);"
                                    />{" "}
                                    <label />
                                  </div>
                                </th>
                                <th style={{ textAlign: "center" }}>Service</th>
                                <th style={{ textAlign: "center" }}>
                                  Booking ID
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Invoice No.
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Pax Name
                                </th>
                                <th>Supplier</th>
                                <th style={{ textAlign: "center" }}>Type</th>
                                <th style={{ textAlign: "center" }}>
                                  Service Date
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Total Amount
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Received
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Pending Amount
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Allocation
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              <tr className="phps_row_1" id="tr-14547">
                                <td align="center">
                                  <div className="checkbox checkbox-success checkbox-inline">
                                    <input
                                      type="checkbox"
                                      name="invoices[2023/12396][bookings][chk][]"
                                      id="chk[]"
                                      rowid={14547}
                                      className="row_chkbox"
                                      bcode="TD1129214"
                                      defaultValue={14547}
                                      onclick="total_allocation_amount_set(this);"
                                      onchange="total_allocation_amount($('#tr-14547 .booking_w_amt'));"
                                      invoice_number="2023-12396"
                                    />{" "}
                                    <label />
                                    {/*                                                                <input type='hidden' name="2023-12396['bookings']['14547']" */}
                                    {/*                                                                    value='29214'> <input type='hidden' */}
                                    {/*                                                                    name='booking_rate_id[]' value='14547'> <input */}
                                    {/*                                                                    type='hidden' name='source_type[]' */}
                                    {/*                                                                    value='hotelbeds'> <input */}
                                    {/*                                                                    type='hidden' name='serviceType[]' */}
                                    {/*                                                                    value='hotel'> */}
                                  </div>
                                </td>
                                <td align="center">
                                  {/* hotel */}
                                  <h4
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Hotel"
                                  >
                                    <i className="fa fa-bed" />
                                  </h4>
                                </td>
                                <td align="center">TD1129214</td>
                                <td align="center">2023/12396</td>
                                <td align="center">Mr Sujay test</td>
                                <td align="center">hotelbeds</td>
                                <td align="center">Sale</td>
                                <td align="center">
                                  <div className="dateWrapper">
                                    <div className="onlyDate">20</div>
                                    <div className="monthYear">
                                      Mar <br />
                                      2023
                                    </div>
                                  </div>
                                </td>
                                <td align="center">
                                  110.790
                                  <input
                                    type="hidden"
                                    name="invoices[2023/12396][bookings][14547][total_amount]"
                                    defaultValue="110.790"
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2023/12396][bookings][14547][booking_id]"
                                    defaultValue={29214}
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2023/12396][bookings][14547][source_type]"
                                    defaultValue="hotelbeds"
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2023/12396][bookings][14547][serviceType]"
                                    defaultValue="hotel"
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2023/12396][bookings][14547][pending_amount]"
                                    defaultValue="110.790"
                                  />
                                </td>
                                <td align="center">0.000</td>
                                <td align="center">
                                  110.790
                                  <input
                                    id="pnd_amt_14547"
                                    className="pending-amt"
                                    defaultValue="110.790"
                                    type="hidden"
                                  />
                                </td>
                                <td align="center">
                                  <div className="form-group">
                                    <input
                                      type="text"
                                      className="form-control col-md-12 booking_w_amt"
                                      rowid={14547}
                                      name="invoices[2023/12396][bookings][14547][amount]"
                                      size={10}
                                      invoice_number="2023-12396"
                                      onblur="extractNumber(this,3,true),checkAmount(110.790,this);total_allocation_amount();extractNumber(this,3,true);"
                                    />
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="panel-group btm_mar">
                    <div
                      className="panel panel-default "
                      id="panel-2023-12449"
                      invoice_number="2023-12449"
                    >
                      <div className="panel-heading">
                        <table
                          className="table   table-responsive invoice-table"
                          style={{ marginBottom: "0px" }}
                        >
                          <thead>
                            <tr>
                              <th width="5%" style={{ marginTop: "8px" }}>
                                <div className="checkbox checkbox-success checkbox-inline">
                                  <input
                                    type="checkbox"
                                    id="chk-2023-12449"
                                    className="chk-invoice"
                                    name="invoices[2023/12449][chk]"
                                    defaultValue="2023/12449"
                                    invoice_number="2023-12449"
                                    onchange="total_allocation_amount_invoice_set(this);total_allocation_amount($('amt-2023-12449'));"
                                  />
                                  <label />
                                  <i
                                    className="fa fa-chevron-down"
                                    data-bs-toggle="collapse"
                                    href="#panel-body-2023-12449"
                                  />{" "}
                                </div>
                              </th>
                              <th
                                width="18%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2023-12449"
                              >
                                Invoice Number 2023/12449
                              </th>
                              {/*<th width="10%" style="text-align: left !important"  data-bs-toggle="collapse" href="#panel-body-2023-12449">
                                                      <span>Super PNR [OT19246]</span>
                                                  </th>*/}
                              <th
                                width="8%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2023-12449"
                              >
                                <span>Sectors [1]</span>
                              </th>
                              <th
                                width="18%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2023-12449"
                              >
                                <span>Invoice amount: 123.743</span>
                                <input
                                  defaultValue="123.743"
                                  className="inv-pending-amount"
                                  invoice_number="2023-12449"
                                  type="hidden"
                                />
                              </th>
                              <th
                                width="15%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2023-12449"
                              >
                                <span>Allocated: 0.000</span>
                              </th>
                              <th
                                width="15%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2023-12449"
                              >
                                <span>Unallocated: 123.743</span>
                              </th>
                              <th width="10%">
                                <span
                                  style={{
                                    float: "right",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  Allocate Amount:
                                </span>
                              </th>
                              <th>
                                <input
                                  type="text"
                                  style={{ color: "black" }}
                                  className="invoice-amt"
                                  id="amt-2023-12449"
                                  invoice_number="2023-12449"
                                  name="invoices[2023/12449][amount]"
                                  onblur="extractNumber(this,3,true),checkAmount(123.743,this);total_allocation_amount(this);"
                                />
                              </th>
                            </tr>
                          </thead>
                        </table>
                      </div>
                      <div
                        id="panel-body-2023-12449"
                        className="panel-collapse collapse"
                      >
                        <div
                          className="panel-body removeMargins"
                          style={{ margin: 0 }}
                        >
                          <table id className="table   table-responsive">
                            <thead>
                              <tr
                                style={{
                                  background: "#bce0ff",
                                  color: "black",
                                  fontFamily: "MONTSERRAT",
                                }}
                              >
                                <th style={{ textAlign: "center" }}>
                                  <div className="checkbox checkbox-success checkbox-inline">
                                    <input
                                      type="checkbox"
                                      className="select-all"
                                      invoice_number="2023-12449"
                                      onclick=" return checkAll(this);"
                                    />{" "}
                                    <label />
                                  </div>
                                </th>
                                <th style={{ textAlign: "center" }}>Service</th>
                                <th style={{ textAlign: "center" }}>
                                  Booking ID
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Invoice No.
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Pax Name
                                </th>
                                <th>Supplier</th>
                                <th style={{ textAlign: "center" }}>Type</th>
                                <th style={{ textAlign: "center" }}>
                                  Service Date
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Total Amount
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Received
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Pending Amount
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Allocation
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              <tr className="phps_row_0" id="tr-14599">
                                <td align="center">
                                  <div className="checkbox checkbox-success checkbox-inline">
                                    <input
                                      type="checkbox"
                                      name="invoices[2023/12449][bookings][chk][]"
                                      id="chk[]"
                                      rowid={14599}
                                      className="row_chkbox"
                                      bcode="TD1129262"
                                      defaultValue={14599}
                                      onclick="total_allocation_amount_set(this);"
                                      onchange="total_allocation_amount($('#tr-14599 .booking_w_amt'));"
                                      invoice_number="2023-12449"
                                    />{" "}
                                    <label />
                                    {/*                                                                <input type='hidden' name="2023-12449['bookings']['14599']" */}
                                    {/*                                                                    value='29262'> <input type='hidden' */}
                                    {/*                                                                    name='booking_rate_id[]' value='14599'> <input */}
                                    {/*                                                                    type='hidden' name='source_type[]' */}
                                    {/*                                                                    value='hotelbeds'> <input */}
                                    {/*                                                                    type='hidden' name='serviceType[]' */}
                                    {/*                                                                    value='hotel'> */}
                                  </div>
                                </td>
                                <td align="center">
                                  {/* hotel */}
                                  <h4
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Hotel"
                                  >
                                    <i className="fa fa-bed" />
                                  </h4>
                                </td>
                                <td align="center">TD1129262</td>
                                <td align="center">2023/12449</td>
                                <td align="center">Mr shiv chauhan</td>
                                <td align="center">hotelbeds</td>
                                <td align="center">Sale</td>
                                <td align="center">
                                  <div className="dateWrapper">
                                    <div className="onlyDate">17</div>
                                    <div className="monthYear">
                                      Aug <br />
                                      2023
                                    </div>
                                  </div>
                                </td>
                                <td align="center">
                                  123.743
                                  <input
                                    type="hidden"
                                    name="invoices[2023/12449][bookings][14599][total_amount]"
                                    defaultValue="123.743"
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2023/12449][bookings][14599][booking_id]"
                                    defaultValue={29262}
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2023/12449][bookings][14599][source_type]"
                                    defaultValue="hotelbeds"
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2023/12449][bookings][14599][serviceType]"
                                    defaultValue="hotel"
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2023/12449][bookings][14599][pending_amount]"
                                    defaultValue="123.743"
                                  />
                                </td>
                                <td align="center">0.000</td>
                                <td align="center">
                                  123.743
                                  <input
                                    id="pnd_amt_14599"
                                    className="pending-amt"
                                    defaultValue="123.743"
                                    type="hidden"
                                  />
                                </td>
                                <td align="center">
                                  <div className="form-group">
                                    <input
                                      type="text"
                                      className="form-control col-md-12 booking_w_amt"
                                      rowid={14599}
                                      name="invoices[2023/12449][bookings][14599][amount]"
                                      size={10}
                                      invoice_number="2023-12449"
                                      onblur="extractNumber(this,3,true),checkAmount(123.743,this);total_allocation_amount();extractNumber(this,3,true);"
                                    />
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="panel-group btm_mar">
                    <div
                      className="panel panel-default "
                      id="panel-2023-12459"
                      invoice_number="2023-12459"
                    >
                      <div className="panel-heading">
                        <table
                          className="table   table-responsive invoice-table"
                          style={{ marginBottom: "0px" }}
                        >
                          <thead>
                            <tr>
                              <th width="5%" style={{ marginTop: "8px" }}>
                                <div className="checkbox checkbox-success checkbox-inline">
                                  <input
                                    type="checkbox"
                                    id="chk-2023-12459"
                                    className="chk-invoice"
                                    name="invoices[2023/12459][chk]"
                                    defaultValue="2023/12459"
                                    invoice_number="2023-12459"
                                    onchange="total_allocation_amount_invoice_set(this);total_allocation_amount($('amt-2023-12459'));"
                                  />
                                  <label />
                                  <i
                                    className="fa fa-chevron-down"
                                    data-bs-toggle="collapse"
                                    href="#panel-body-2023-12459"
                                  />{" "}
                                </div>
                              </th>
                              <th
                                width="18%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2023-12459"
                              >
                                Invoice Number 2023/12459
                              </th>
                              {/*<th width="10%" style="text-align: left !important"  data-bs-toggle="collapse" href="#panel-body-2023-12459">
                                                      <span>Super PNR [OT19248]</span>
                                                  </th>*/}
                              <th
                                width="8%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2023-12459"
                              >
                                <span>Sectors [1]</span>
                              </th>
                              <th
                                width="18%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2023-12459"
                              >
                                <span>Invoice amount: 134.070</span>
                                <input
                                  defaultValue="-134.07"
                                  className="inv-pending-amount"
                                  invoice_number="2023-12459"
                                  type="hidden"
                                />
                              </th>
                              <th
                                width="15%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2023-12459"
                              >
                                <span>Allocated: 268.140</span>
                              </th>
                              <th
                                width="15%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2023-12459"
                              >
                                <span>Unallocated: -134.070</span>
                              </th>
                              <th width="10%">
                                <span
                                  style={{
                                    float: "right",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  Allocate Amount:
                                </span>
                              </th>
                              <th>
                                <input
                                  type="text"
                                  style={{ color: "black" }}
                                  className="invoice-amt"
                                  id="amt-2023-12459"
                                  invoice_number="2023-12459"
                                  name="invoices[2023/12459][amount]"
                                  onblur="extractNumber(this,3,true),checkAmount(-134.07,this);total_allocation_amount(this);"
                                />
                              </th>
                            </tr>
                          </thead>
                        </table>
                      </div>
                      <div
                        id="panel-body-2023-12459"
                        className="panel-collapse collapse"
                      >
                        <div
                          className="panel-body removeMargins"
                          style={{ margin: 0 }}
                        >
                          <table id className="table   table-responsive">
                            <thead>
                              <tr
                                style={{
                                  background: "#bce0ff",
                                  color: "black",
                                  fontFamily: "MONTSERRAT",
                                }}
                              >
                                <th style={{ textAlign: "center" }}>
                                  <div className="checkbox checkbox-success checkbox-inline">
                                    <input
                                      type="checkbox"
                                      className="select-all"
                                      invoice_number="2023-12459"
                                      onclick=" return checkAll(this);"
                                    />{" "}
                                    <label />
                                  </div>
                                </th>
                                <th style={{ textAlign: "center" }}>Service</th>
                                <th style={{ textAlign: "center" }}>
                                  Booking ID
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Invoice No.
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Pax Name
                                </th>
                                <th>Supplier</th>
                                <th style={{ textAlign: "center" }}>Type</th>
                                <th style={{ textAlign: "center" }}>
                                  Service Date
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Total Amount
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Received
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Pending Amount
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Allocation
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              <tr className="phps_row_1" id="tr-14609">
                                <td align="center">
                                  <div className="checkbox checkbox-success checkbox-inline">
                                    <input
                                      type="checkbox"
                                      name="invoices[2023/12459][bookings][chk][]"
                                      id="chk[]"
                                      rowid={14609}
                                      className="row_chkbox"
                                      bcode="TD1129264"
                                      defaultValue={14609}
                                      onclick="total_allocation_amount_set(this);"
                                      onchange="total_allocation_amount($('#tr-14609 .booking_w_amt'));"
                                      invoice_number="2023-12459"
                                    />{" "}
                                    <label />
                                    {/*                                                                <input type='hidden' name="2023-12459['bookings']['14609']" */}
                                    {/*                                                                    value='29264'> <input type='hidden' */}
                                    {/*                                                                    name='booking_rate_id[]' value='14609'> <input */}
                                    {/*                                                                    type='hidden' name='source_type[]' */}
                                    {/*                                                                    value='hotelbeds'> <input */}
                                    {/*                                                                    type='hidden' name='serviceType[]' */}
                                    {/*                                                                    value='hotel'> */}
                                  </div>
                                </td>
                                <td align="center">
                                  {/* hotel */}
                                  <h4
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Hotel"
                                  >
                                    <i className="fa fa-bed" />
                                  </h4>
                                </td>
                                <td align="center">TD1129264</td>
                                <td align="center">2023/12459</td>
                                <td align="center">Mr shiv chauhan</td>
                                <td align="center">hotelbeds</td>
                                <td align="center">Sale</td>
                                <td align="center">
                                  <div className="dateWrapper">
                                    <div className="onlyDate">27</div>
                                    <div className="monthYear">
                                      Aug <br />
                                      2023
                                    </div>
                                  </div>
                                </td>
                                <td align="center">
                                  134.070
                                  <input
                                    type="hidden"
                                    name="invoices[2023/12459][bookings][14609][total_amount]"
                                    defaultValue="134.070"
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2023/12459][bookings][14609][booking_id]"
                                    defaultValue={29264}
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2023/12459][bookings][14609][source_type]"
                                    defaultValue="hotelbeds"
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2023/12459][bookings][14609][serviceType]"
                                    defaultValue="hotel"
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2023/12459][bookings][14609][pending_amount]"
                                    defaultValue="-134.070"
                                  />
                                </td>
                                <td align="center">268.140</td>
                                <td align="center">
                                  -134.070
                                  <input
                                    id="pnd_amt_14609"
                                    className="pending-amt"
                                    defaultValue="-134.070"
                                    type="hidden"
                                  />
                                </td>
                                <td align="center">
                                  <div className="form-group">
                                    <input
                                      type="text"
                                      className="form-control col-md-12 booking_w_amt"
                                      rowid={14609}
                                      name="invoices[2023/12459][bookings][14609][amount]"
                                      size={10}
                                      invoice_number="2023-12459"
                                      onblur="extractNumber(this,3,true),checkAmount(-134.070,this);total_allocation_amount();extractNumber(this,3,true);"
                                    />
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="panel-group btm_mar">
                    <div
                      className="panel panel-default "
                      id="panel-2023-12461"
                      invoice_number="2023-12461"
                    >
                      <div className="panel-heading">
                        <table
                          className="table   table-responsive invoice-table"
                          style={{ marginBottom: "0px" }}
                        >
                          <thead>
                            <tr>
                              <th width="5%" style={{ marginTop: "8px" }}>
                                <div className="checkbox checkbox-success checkbox-inline">
                                  <input
                                    type="checkbox"
                                    id="chk-2023-12461"
                                    className="chk-invoice"
                                    name="invoices[2023/12461][chk]"
                                    defaultValue="2023/12461"
                                    invoice_number="2023-12461"
                                    onchange="total_allocation_amount_invoice_set(this);total_allocation_amount($('amt-2023-12461'));"
                                  />
                                  <label />
                                  <i
                                    className="fa fa-chevron-down"
                                    data-bs-toggle="collapse"
                                    href="#panel-body-2023-12461"
                                  />{" "}
                                </div>
                              </th>
                              <th
                                width="18%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2023-12461"
                              >
                                Invoice Number 2023/12461
                              </th>
                              {/*<th width="10%" style="text-align: left !important"  data-bs-toggle="collapse" href="#panel-body-2023-12461">
                                                      <span>Super PNR [OT19253]</span>
                                                  </th>*/}
                              <th
                                width="8%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2023-12461"
                              >
                                <span>Sectors [1]</span>
                              </th>
                              <th
                                width="18%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2023-12461"
                              >
                                <span>Invoice amount: 166.296</span>
                                <input
                                  defaultValue="166.296"
                                  className="inv-pending-amount"
                                  invoice_number="2023-12461"
                                  type="hidden"
                                />
                              </th>
                              <th
                                width="15%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2023-12461"
                              >
                                <span>Allocated: 0.000</span>
                              </th>
                              <th
                                width="15%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2023-12461"
                              >
                                <span>Unallocated: 166.296</span>
                              </th>
                              <th width="10%">
                                <span
                                  style={{
                                    float: "right",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  Allocate Amount:
                                </span>
                              </th>
                              <th>
                                <input
                                  type="text"
                                  style={{ color: "black" }}
                                  className="invoice-amt"
                                  id="amt-2023-12461"
                                  invoice_number="2023-12461"
                                  name="invoices[2023/12461][amount]"
                                  onblur="extractNumber(this,3,true),checkAmount(166.296,this);total_allocation_amount(this);"
                                />
                              </th>
                            </tr>
                          </thead>
                        </table>
                      </div>
                      <div
                        id="panel-body-2023-12461"
                        className="panel-collapse collapse"
                      >
                        <div
                          className="panel-body removeMargins"
                          style={{ margin: 0 }}
                        >
                          <table id className="table   table-responsive">
                            <thead>
                              <tr
                                style={{
                                  background: "#bce0ff",
                                  color: "black",
                                  fontFamily: "MONTSERRAT",
                                }}
                              >
                                <th style={{ textAlign: "center" }}>
                                  <div className="checkbox checkbox-success checkbox-inline">
                                    <input
                                      type="checkbox"
                                      className="select-all"
                                      invoice_number="2023-12461"
                                      onclick=" return checkAll(this);"
                                    />{" "}
                                    <label />
                                  </div>
                                </th>
                                <th style={{ textAlign: "center" }}>Service</th>
                                <th style={{ textAlign: "center" }}>
                                  Booking ID
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Invoice No.
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Pax Name
                                </th>
                                <th>Supplier</th>
                                <th style={{ textAlign: "center" }}>Type</th>
                                <th style={{ textAlign: "center" }}>
                                  Service Date
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Total Amount
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Received
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Pending Amount
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Allocation
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              <tr className="phps_row_0" id="tr-14611">
                                <td align="center">
                                  <div className="checkbox checkbox-success checkbox-inline">
                                    <input
                                      type="checkbox"
                                      name="invoices[2023/12461][bookings][chk][]"
                                      id="chk[]"
                                      rowid={14611}
                                      className="row_chkbox"
                                      bcode="TD1129269"
                                      defaultValue={14611}
                                      onclick="total_allocation_amount_set(this);"
                                      onchange="total_allocation_amount($('#tr-14611 .booking_w_amt'));"
                                      invoice_number="2023-12461"
                                    />{" "}
                                    <label />
                                    {/*                                                                <input type='hidden' name="2023-12461['bookings']['14611']" */}
                                    {/*                                                                    value='29269'> <input type='hidden' */}
                                    {/*                                                                    name='booking_rate_id[]' value='14611'> <input */}
                                    {/*                                                                    type='hidden' name='source_type[]' */}
                                    {/*                                                                    value='hotelbeds'> <input */}
                                    {/*                                                                    type='hidden' name='serviceType[]' */}
                                    {/*                                                                    value='hotel'> */}
                                  </div>
                                </td>
                                <td align="center">
                                  {/* hotel */}
                                  <h4
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Hotel"
                                  >
                                    <i className="fa fa-bed" />
                                  </h4>
                                </td>
                                <td align="center">TD1129269</td>
                                <td align="center">2023/12461</td>
                                <td align="center">Ms shivani chauhan</td>
                                <td align="center">hotelbeds</td>
                                <td align="center">Sale</td>
                                <td align="center">
                                  <div className="dateWrapper">
                                    <div className="onlyDate">24</div>
                                    <div className="monthYear">
                                      Sep <br />
                                      2023
                                    </div>
                                  </div>
                                </td>
                                <td align="center">
                                  166.296
                                  <input
                                    type="hidden"
                                    name="invoices[2023/12461][bookings][14611][total_amount]"
                                    defaultValue="166.296"
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2023/12461][bookings][14611][booking_id]"
                                    defaultValue={29269}
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2023/12461][bookings][14611][source_type]"
                                    defaultValue="hotelbeds"
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2023/12461][bookings][14611][serviceType]"
                                    defaultValue="hotel"
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2023/12461][bookings][14611][pending_amount]"
                                    defaultValue="166.296"
                                  />
                                </td>
                                <td align="center">0.000</td>
                                <td align="center">
                                  166.296
                                  <input
                                    id="pnd_amt_14611"
                                    className="pending-amt"
                                    defaultValue="166.296"
                                    type="hidden"
                                  />
                                </td>
                                <td align="center">
                                  <div className="form-group">
                                    <input
                                      type="text"
                                      className="form-control col-md-12 booking_w_amt"
                                      rowid={14611}
                                      name="invoices[2023/12461][bookings][14611][amount]"
                                      size={10}
                                      invoice_number="2023-12461"
                                      onblur="extractNumber(this,3,true),checkAmount(166.296,this);total_allocation_amount();extractNumber(this,3,true);"
                                    />
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="panel-group btm_mar">
                    <div
                      className="panel panel-default "
                      id="panel-2023-12469"
                      invoice_number="2023-12469"
                    >
                      <div className="panel-heading">
                        <table
                          className="table   table-responsive invoice-table"
                          style={{ marginBottom: "0px" }}
                        >
                          <thead>
                            <tr>
                              <th width="5%" style={{ marginTop: "8px" }}>
                                <div className="checkbox checkbox-success checkbox-inline">
                                  <input
                                    type="checkbox"
                                    id="chk-2023-12469"
                                    className="chk-invoice"
                                    name="invoices[2023/12469][chk]"
                                    defaultValue="2023/12469"
                                    invoice_number="2023-12469"
                                    onchange="total_allocation_amount_invoice_set(this);total_allocation_amount($('amt-2023-12469'));"
                                  />
                                  <label />
                                  <i
                                    className="fa fa-chevron-down"
                                    data-bs-toggle="collapse"
                                    href="#panel-body-2023-12469"
                                  />{" "}
                                </div>
                              </th>
                              <th
                                width="18%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2023-12469"
                              >
                                Invoice Number 2023/12469
                              </th>
                              {/*<th width="10%" style="text-align: left !important"  data-bs-toggle="collapse" href="#panel-body-2023-12469">
                                                      <span>Super PNR [OT19258]</span>
                                                  </th>*/}
                              <th
                                width="8%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2023-12469"
                              >
                                <span>Sectors [1]</span>
                              </th>
                              <th
                                width="18%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2023-12469"
                              >
                                <span>Invoice amount: 114.321</span>
                                <input
                                  defaultValue="114.321"
                                  className="inv-pending-amount"
                                  invoice_number="2023-12469"
                                  type="hidden"
                                />
                              </th>
                              <th
                                width="15%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2023-12469"
                              >
                                <span>Allocated: 0.000</span>
                              </th>
                              <th
                                width="15%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2023-12469"
                              >
                                <span>Unallocated: 114.321</span>
                              </th>
                              <th width="10%">
                                <span
                                  style={{
                                    float: "right",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  Allocate Amount:
                                </span>
                              </th>
                              <th>
                                <input
                                  type="text"
                                  style={{ color: "black" }}
                                  className="invoice-amt"
                                  id="amt-2023-12469"
                                  invoice_number="2023-12469"
                                  name="invoices[2023/12469][amount]"
                                  onblur="extractNumber(this,3,true),checkAmount(114.321,this);total_allocation_amount(this);"
                                />
                              </th>
                            </tr>
                          </thead>
                        </table>
                      </div>
                      <div
                        id="panel-body-2023-12469"
                        className="panel-collapse collapse"
                      >
                        <div
                          className="panel-body removeMargins"
                          style={{ margin: 0 }}
                        >
                          <table id className="table   table-responsive">
                            <thead>
                              <tr
                                style={{
                                  background: "#bce0ff",
                                  color: "black",
                                  fontFamily: "MONTSERRAT",
                                }}
                              >
                                <th style={{ textAlign: "center" }}>
                                  <div className="checkbox checkbox-success checkbox-inline">
                                    <input
                                      type="checkbox"
                                      className="select-all"
                                      invoice_number="2023-12469"
                                      onclick=" return checkAll(this);"
                                    />{" "}
                                    <label />
                                  </div>
                                </th>
                                <th style={{ textAlign: "center" }}>Service</th>
                                <th style={{ textAlign: "center" }}>
                                  Booking ID
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Invoice No.
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Pax Name
                                </th>
                                <th>Supplier</th>
                                <th style={{ textAlign: "center" }}>Type</th>
                                <th style={{ textAlign: "center" }}>
                                  Service Date
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Total Amount
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Received
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Pending Amount
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Allocation
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              <tr className="phps_row_1" id="tr-14619">
                                <td align="center">
                                  <div className="checkbox checkbox-success checkbox-inline">
                                    <input
                                      type="checkbox"
                                      name="invoices[2023/12469][bookings][chk][]"
                                      id="chk[]"
                                      rowid={14619}
                                      className="row_chkbox"
                                      bcode="TD1129274"
                                      defaultValue={14619}
                                      onclick="total_allocation_amount_set(this);"
                                      onchange="total_allocation_amount($('#tr-14619 .booking_w_amt'));"
                                      invoice_number="2023-12469"
                                    />{" "}
                                    <label />
                                    {/*                                                                <input type='hidden' name="2023-12469['bookings']['14619']" */}
                                    {/*                                                                    value='29274'> <input type='hidden' */}
                                    {/*                                                                    name='booking_rate_id[]' value='14619'> <input */}
                                    {/*                                                                    type='hidden' name='source_type[]' */}
                                    {/*                                                                    value='hotelbeds'> <input */}
                                    {/*                                                                    type='hidden' name='serviceType[]' */}
                                    {/*                                                                    value='hotel'> */}
                                  </div>
                                </td>
                                <td align="center">
                                  {/* hotel */}
                                  <h4
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Hotel"
                                  >
                                    <i className="fa fa-bed" />
                                  </h4>
                                </td>
                                <td align="center">TD1129274</td>
                                <td align="center">2023/12469</td>
                                <td align="center">Mr Siya test</td>
                                <td align="center">hotelbeds</td>
                                <td align="center">Sale</td>
                                <td align="center">
                                  <div className="dateWrapper">
                                    <div className="onlyDate">07</div>
                                    <div className="monthYear">
                                      Jul <br />
                                      2023
                                    </div>
                                  </div>
                                </td>
                                <td align="center">
                                  114.321
                                  <input
                                    type="hidden"
                                    name="invoices[2023/12469][bookings][14619][total_amount]"
                                    defaultValue="114.321"
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2023/12469][bookings][14619][booking_id]"
                                    defaultValue={29274}
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2023/12469][bookings][14619][source_type]"
                                    defaultValue="hotelbeds"
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2023/12469][bookings][14619][serviceType]"
                                    defaultValue="hotel"
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2023/12469][bookings][14619][pending_amount]"
                                    defaultValue="114.321"
                                  />
                                </td>
                                <td align="center">0.000</td>
                                <td align="center">
                                  114.321
                                  <input
                                    id="pnd_amt_14619"
                                    className="pending-amt"
                                    defaultValue="114.321"
                                    type="hidden"
                                  />
                                </td>
                                <td align="center">
                                  <div className="form-group">
                                    <input
                                      type="text"
                                      className="form-control col-md-12 booking_w_amt"
                                      rowid={14619}
                                      name="invoices[2023/12469][bookings][14619][amount]"
                                      size={10}
                                      invoice_number="2023-12469"
                                      onblur="extractNumber(this,3,true),checkAmount(114.321,this);total_allocation_amount();extractNumber(this,3,true);"
                                    />
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="panel-group btm_mar">
                    <div
                      className="panel panel-default "
                      id="panel-2023-12471"
                      invoice_number="2023-12471"
                    >
                      <div className="panel-heading">
                        <table
                          className="table   table-responsive invoice-table"
                          style={{ marginBottom: "0px" }}
                        >
                          <thead>
                            <tr>
                              <th width="5%" style={{ marginTop: "8px" }}>
                                <div className="checkbox checkbox-success checkbox-inline">
                                  <input
                                    type="checkbox"
                                    id="chk-2023-12471"
                                    className="chk-invoice"
                                    name="invoices[2023/12471][chk]"
                                    defaultValue="2023/12471"
                                    invoice_number="2023-12471"
                                    onchange="total_allocation_amount_invoice_set(this);total_allocation_amount($('amt-2023-12471'));"
                                  />
                                  <label />
                                  <i
                                    className="fa fa-chevron-down"
                                    data-bs-toggle="collapse"
                                    href="#panel-body-2023-12471"
                                  />
                                </div>
                              </th>
                              <th
                                width="18%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2023-12471"
                              >
                                Invoice Number 2023/12471
                              </th>
                              {/*<th width="10%" style="text-align: left !important"  data-bs-toggle="collapse" href="#panel-body-2023-12471">
                                                      <span>Super PNR [OT19259]</span>
                                                  </th>*/}
                              <th
                                width="8%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2023-12471"
                              >
                                <span>Sectors [1]</span>
                              </th>
                              <th
                                width="18%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2023-12471"
                              >
                                <span>Invoice amount: 115.525</span>
                                <input
                                  defaultValue="115.525"
                                  className="inv-pending-amount"
                                  invoice_number="2023-12471"
                                  type="hidden"
                                />
                              </th>
                              <th
                                width="15%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2023-12471"
                              >
                                <span>Allocated: 0.000</span>
                              </th>
                              <th
                                width="15%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2023-12471"
                              >
                                <span>Unallocated: 115.525</span>
                              </th>
                              <th width="10%">
                                <span
                                  style={{
                                    float: "right",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  Allocate Amount:
                                </span>
                              </th>
                              <th>
                                <input
                                  type="text"
                                  style={{ color: "black" }}
                                  className="invoice-amt"
                                  id="amt-2023-12471"
                                  invoice_number="2023-12471"
                                  name="invoices[2023/12471][amount]"
                                  onblur="extractNumber(this,3,true),checkAmount(115.525,this);total_allocation_amount(this);"
                                />
                              </th>
                            </tr>
                          </thead>
                        </table>
                      </div>
                      <div
                        id="panel-body-2023-12471"
                        className="panel-collapse collapse"
                      >
                        <div
                          className="panel-body removeMargins"
                          style={{ margin: 0 }}
                        >
                          <table id className="table   table-responsive">
                            <thead>
                              <tr
                                style={{
                                  background: "#bce0ff",
                                  color: "black",
                                  fontFamily: "MONTSERRAT",
                                }}
                              >
                                <th style={{ textAlign: "center" }}>
                                  <div className="checkbox checkbox-success checkbox-inline">
                                    <input
                                      type="checkbox"
                                      className="select-all"
                                      invoice_number="2023-12471"
                                      onclick=" return checkAll(this);"
                                    />{" "}
                                    <label />
                                  </div>
                                </th>
                                <th style={{ textAlign: "center" }}>Service</th>
                                <th style={{ textAlign: "center" }}>
                                  Booking ID
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Invoice No.
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Pax Name
                                </th>
                                <th>Supplier</th>
                                <th style={{ textAlign: "center" }}>Type</th>
                                <th style={{ textAlign: "center" }}>
                                  Service Date
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Total Amount
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Received
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Pending Amount
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Allocation
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              <tr className="phps_row_0" id="tr-14621">
                                <td align="center">
                                  <div className="checkbox checkbox-success checkbox-inline">
                                    <input
                                      type="checkbox"
                                      name="invoices[2023/12471][bookings][chk][]"
                                      id="chk[]"
                                      rowid={14621}
                                      className="row_chkbox"
                                      bcode="TD1129275"
                                      defaultValue={14621}
                                      onclick="total_allocation_amount_set(this);"
                                      onchange="total_allocation_amount($('#tr-14621 .booking_w_amt'));"
                                      invoice_number="2023-12471"
                                    />{" "}
                                    <label />
                                    {/*                                                                <input type='hidden' name="2023-12471['bookings']['14621']" */}
                                    {/*                                                                    value='29275'> <input type='hidden' */}
                                    {/*                                                                    name='booking_rate_id[]' value='14621'> <input */}
                                    {/*                                                                    type='hidden' name='source_type[]' */}
                                    {/*                                                                    value='hotelbeds'> <input */}
                                    {/*                                                                    type='hidden' name='serviceType[]' */}
                                    {/*                                                                    value='hotel'> */}
                                  </div>
                                </td>
                                <td align="center">
                                  {/* hotel */}
                                  <h4
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Hotel"
                                  >
                                    <i className="fa fa-bed" />
                                  </h4>
                                </td>
                                <td align="center">TD1129275</td>
                                <td align="center">2023/12471</td>
                                <td align="center">Mr sham test</td>
                                <td align="center">hotelbeds</td>
                                <td align="center">Sale</td>
                                <td align="center">
                                  <div className="dateWrapper">
                                    <div className="onlyDate">05</div>
                                    <div className="monthYear">
                                      Aug <br />
                                      2023
                                    </div>
                                  </div>
                                </td>
                                <td align="center">
                                  115.525
                                  <input
                                    type="hidden"
                                    name="invoices[2023/12471][bookings][14621][total_amount]"
                                    defaultValue="115.525"
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2023/12471][bookings][14621][booking_id]"
                                    defaultValue={29275}
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2023/12471][bookings][14621][source_type]"
                                    defaultValue="hotelbeds"
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2023/12471][bookings][14621][serviceType]"
                                    defaultValue="hotel"
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2023/12471][bookings][14621][pending_amount]"
                                    defaultValue="115.525"
                                  />
                                </td>
                                <td align="center">0.000</td>
                                <td align="center">
                                  115.525
                                  <input
                                    id="pnd_amt_14621"
                                    className="pending-amt"
                                    defaultValue="115.525"
                                    type="hidden"
                                  />
                                </td>
                                <td align="center">
                                  <div className="form-group">
                                    <input
                                      type="text"
                                      className="form-control col-md-12 booking_w_amt"
                                      rowid={14621}
                                      name="invoices[2023/12471][bookings][14621][amount]"
                                      size={10}
                                      invoice_number="2023-12471"
                                      onblur="extractNumber(this,3,true),checkAmount(115.525,this);total_allocation_amount();extractNumber(this,3,true);"
                                    />
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="panel-group btm_mar">
                    <div
                      className="panel panel-default "
                      id="panel-2023-12554"
                      invoice_number="2023-12554"
                    >
                      <div className="panel-heading">
                        <table
                          className="table   table-responsive invoice-table"
                          style={{ marginBottom: "0px" }}
                        >
                          <thead>
                            <tr>
                              <th width="5%" style={{ marginTop: "8px" }}>
                                <div className="checkbox checkbox-success checkbox-inline">
                                  <input
                                    type="checkbox"
                                    id="chk-2023-12554"
                                    className="chk-invoice"
                                    name="invoices[2023/12554][chk]"
                                    defaultValue="2023/12554"
                                    invoice_number="2023-12554"
                                    onchange="total_allocation_amount_invoice_set(this);total_allocation_amount($('amt-2023-12554'));"
                                  />
                                  <label />
                                  <i
                                    className="fa fa-chevron-down"
                                    data-bs-toggle="collapse"
                                    href="#panel-body-2023-12554"
                                  />
                                </div>
                              </th>
                              <th
                                width="18%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2023-12554"
                              >
                                Invoice Number 2023/12554
                              </th>
                              {/*<th width="10%" style="text-align: left !important"  data-bs-toggle="collapse" href="#panel-body-2023-12554">
                                                      <span>Super PNR [OT19315]</span>
                                                  </th>*/}
                              <th
                                width="8%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2023-12554"
                              >
                                <span>Sectors [1]</span>
                              </th>
                              <th
                                width="18%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2023-12554"
                              >
                                <span>Invoice amount: 114.321</span>
                                <input
                                  defaultValue="114.321"
                                  className="inv-pending-amount"
                                  invoice_number="2023-12554"
                                  type="hidden"
                                />
                              </th>
                              <th
                                width="15%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2023-12554"
                              >
                                <span>Allocated: 0.000</span>
                              </th>
                              <th
                                width="15%"
                                style={{ textAlign: "left !important" }}
                                data-bs-toggle="collapse"
                                href="#panel-body-2023-12554"
                              >
                                <span>Unallocated: 114.321</span>
                              </th>
                              <th width="10%">
                                <span
                                  style={{
                                    float: "right",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  Allocate Amount:
                                </span>
                              </th>
                              <th>
                                <input
                                  type="text"
                                  style={{ color: "black" }}
                                  className="invoice-amt"
                                  id="amt-2023-12554"
                                  invoice_number="2023-12554"
                                  name="invoices[2023/12554][amount]"
                                  onblur="extractNumber(this,3,true),checkAmount(114.321,this);total_allocation_amount(this);"
                                />
                              </th>
                            </tr>
                          </thead>
                        </table>
                      </div>
                      <div
                        id="panel-body-2023-12554"
                        className="panel-collapse collapse"
                      >
                        <div
                          className="panel-body removeMargins"
                          style={{ margin: 0 }}
                        >
                          <table id className="table   table-responsive">
                            <thead>
                              <tr
                                style={{
                                  background: "#bce0ff",
                                  color: "black",
                                  fontFamily: "MONTSERRAT",
                                }}
                              >
                                <th style={{ textAlign: "center" }}>
                                  <div className="checkbox checkbox-success checkbox-inline">
                                    <input
                                      type="checkbox"
                                      className="select-all"
                                      invoice_number="2023-12554"
                                      onclick=" return checkAll(this);"
                                    />{" "}
                                    <label />
                                  </div>
                                </th>
                                <th style={{ textAlign: "center" }}>Service</th>
                                <th style={{ textAlign: "center" }}>
                                  Booking ID
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Invoice No.
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Pax Name
                                </th>
                                <th>Supplier</th>
                                <th style={{ textAlign: "center" }}>Type</th>
                                <th style={{ textAlign: "center" }}>
                                  Service Date
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Total Amount
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Received
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Pending Amount
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Allocation
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              <tr className="phps_row_1" id="tr-14705">
                                <td align="center">
                                  <div className="checkbox checkbox-success checkbox-inline">
                                    <input
                                      type="checkbox"
                                      name="invoices[2023/12554][bookings][chk][]"
                                      id="chk[]"
                                      rowid={14705}
                                      className="row_chkbox"
                                      bcode="TD1129322"
                                      defaultValue={14705}
                                      onclick="total_allocation_amount_set(this);"
                                      onchange="total_allocation_amount($('#tr-14705 .booking_w_amt'));"
                                      invoice_number="2023-12554"
                                    />{" "}
                                    <label />
                                    {/*                                                                <input type='hidden' name="2023-12554['bookings']['14705']" */}
                                    {/*                                                                    value='29322'> <input type='hidden' */}
                                    {/*                                                                    name='booking_rate_id[]' value='14705'> <input */}
                                    {/*                                                                    type='hidden' name='source_type[]' */}
                                    {/*                                                                    value='hotelbeds'> <input */}
                                    {/*                                                                    type='hidden' name='serviceType[]' */}
                                    {/*                                                                    value='hotel'> */}
                                  </div>
                                </td>
                                <td align="center">
                                  {/* hotel */}
                                  <h4
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Hotel"
                                  >
                                    <i className="fa fa-bed" />
                                  </h4>
                                </td>
                                <td align="center">TD1129322</td>
                                <td align="center">2023/12554</td>
                                <td align="center">Mr Ayansh test</td>
                                <td align="center">hotelbeds</td>
                                <td align="center">Sale</td>
                                <td align="center">
                                  <div className="dateWrapper">
                                    <div className="onlyDate">18</div>
                                    <div className="monthYear">
                                      Aug <br />
                                      2023
                                    </div>
                                  </div>
                                </td>
                                <td align="center">
                                  114.321
                                  <input
                                    type="hidden"
                                    name="invoices[2023/12554][bookings][14705][total_amount]"
                                    defaultValue="114.321"
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2023/12554][bookings][14705][booking_id]"
                                    defaultValue={29322}
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2023/12554][bookings][14705][source_type]"
                                    defaultValue="hotelbeds"
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2023/12554][bookings][14705][serviceType]"
                                    defaultValue="hotel"
                                  />
                                  <input
                                    type="hidden"
                                    name="invoices[2023/12554][bookings][14705][pending_amount]"
                                    defaultValue="114.321"
                                  />
                                </td>
                                <td align="center">0.000</td>
                                <td align="center">
                                  114.321
                                  <input
                                    id="pnd_amt_14705"
                                    className="pending-amt"
                                    defaultValue="114.321"
                                    type="hidden"
                                  />
                                </td>
                                <td align="center">
                                  <div className="form-group">
                                    <input
                                      type="text"
                                      className="form-control col-md-12 booking_w_amt"
                                      rowid={14705}
                                      name="invoices[2023/12554][bookings][14705][amount]"
                                      size={10}
                                      invoice_number="2023-12554"
                                      onblur="extractNumber(this,3,true),checkAmount(114.321,this);total_allocation_amount();extractNumber(this,3,true);"
                                    />
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12"></div>
                </div>
              </div>
              <div className="fixedBtn">
                <div className="text-center">
                  <button
                    type="button"
                    className="btn btn-default pull-left"
                    value="Allocate"
                    name="Allocate"
                    id="Allocate"
                    style={{ float: "left" }}
                    onclick="javascriptvalidate_chk(document.forms['receipts_booking_allocation'],'edit_data_single_invoice');"
                  >
                    <i className="fa fa-check" />
                    &nbsp;Allocate
                  </button>
                  <img
                    id="allocate_loader"
                    src="images/loading.gif"
                    style={{ display: "none" }}
                    alt="cri"
                  />{" "}
                  <span id="allocationDisp">
                    Reciept <strong>Rcpt00000602</strong> has SAR{" "}
                    <span id="amt_remaning">0.001</span>pending allocations.
                  </span>{" "}
                  <span
                    className="amt pull-right"
                    id="allocated-amount"
                    style={{ display: "none" }}
                  >
                    {" "}
                    Allocated Amount-0.000
                  </span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default AccountsAgentRecieptAllocation;
