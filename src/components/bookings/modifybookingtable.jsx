import minus from "../../assets/images/minus_white_img.jpg";
import plus from "../../assets/images/plus_white_img.jpg";
import React, { useState } from "react";
import Flatpickr from "react-flatpickr";

import { Link } from "react-router-dom";
import MultiSelect from "../reactMultiSelect";
import {
  managersOptions,
  room_options,
  salutations,
  selDaysOptions,
} from "../../constants/contants";
import Constants from "../../constants/routes";
import Header2 from "../header2/header2";

const ModifyBookingTable = () => {
  const [startDate, setStartDate] = useState(null); // State for the start date
  const [endDate, setEndDate] = useState(null); // State for the end date

  const handleTrashClick = () => {
    // Function to clear both start and end dates
    setStartDate(null);
    setEndDate(null);
  };

  const [isContentVisible1, setContentVisibility1] = useState(false);
  const [isContentVisible2, setContentVisibility2] = useState(false);
  const [isContentVisible3, setContentVisibility3] = useState(false);
  const [isContentVisible4, setContentVisibility4] = useState(false);
  const [isContentVisible5, setContentVisibility5] = useState(false);
  const [isContentVisible6, setContentVisibility6] = useState(false);

  const toggleContentVisibility = (index) => {
    if (index === 1) {
      setContentVisibility1(!isContentVisible1);
    } else if (index === 2) {
      setContentVisibility2(!isContentVisible2);
    } else if (index === 3) {
      setContentVisibility3(!isContentVisible3);
    } else if (index === 4) {
      setContentVisibility4(!isContentVisible4);
    } else if (index === 5) {
      setContentVisibility5(!isContentVisible5);
    } else if (index === 6) {
      setContentVisibility6(!isContentVisible6);
    }
    // Add more conditions for other buttons if needed
  };

  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <form>
          <div className="row mt-5" style={{ clear: "both" }}>
            <div className="col-md-12">
              <table
                width="100%"
                cellPadding={2}
                cellSpacing={1}
                align="center"
                border={0}
                className="table  table-responsive table-box tableborder bookingTbl"
              >
                {/* <tr class="phps_header">
                                  <td valign="bottom" class="bg-primary" colspan="4"><h4>Booking Details</h4></td>
                              </tr> */}
                <tbody className="bg-white">
                  <tr className="phps_row_1 tblHeading">
                    <td colSpan={4}>
                      <img
                        src={isContentVisible1 ? minus : plus}
                        id="moreFilterBtn"
                        onClick={() => toggleContentVisibility(1)}
                        alt="cri"
                      />
                      &nbsp;&nbsp;Booking Information
                    </td>
                  </tr>
                  <tr className="phps_row_0 accContent" id="accCont1">
                    <td colSpan={4}>
                      <div
                        className={`contwrap ${
                          isContentVisible1 ? "expand" : "hidden"
                        }`}
                        id="r_1"
                      >
                        <table
                          width="100%"
                          cellPadding={2}
                          cellSpacing={1}
                          align="left"
                          border={0}
                          className="table table-bordered  table-responsive table-box tableborder"
                        >
                          <tbody className="bg-white">
                            <tr>
                              <td nowrap width="25%">
                                Booking ID
                              </td>
                              <td width="75%" colSpan={3}>
                                <div>TD1129401</div>
                              </td>
                            </tr>
                            <tr className="phps_row_1">
                              <td width="25%">Current Status</td>
                              <td width="25%">
                                <h5 className="label-heading">
                                  <span className="tdd_label label-warning">
                                    Vouchered
                                  </span>
                                </h5>
                                <span className="tdd_label label-primary uniqClass">
                                  <span className="fa fa-file-text-o" />
                                  &nbsp;Invoiced
                                </span>
                                {/* code by himanshu for show ammendment */}
                                {/* code by himanshu for show ammendment */}
                              </td>
                              <td width="25%">Voucher ID</td>
                              <td width="25%">
                                <span
                                  className="input-group date col-md-12 col-sm-12 col-xs-12"
                                  id="display_voucher_id29401"
                                >
                                  <span
                                    id="voucher_id_show29401"
                                    style={{
                                      display: "table-cell",
                                      verticalAlign: "middle",
                                    }}
                                  >
                                    84772
                                  </span>
                                  {/*mg src="images/edit.gif" style='cursor:pointer;border:0;'  title="edit" alt="edit" onClick='show_span_id("edit");'/> */}
                                  <div
                                    onclick='show_span_id("edit","29401");'
                                    className="input-group-addon"
                                    style={{ marginLeft: "255px" }}
                                  >
                                    <Link
                                      onclick='show_span_id("edit","29401");'
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title
                                      data-original-title="Edit"
                                    >
                                      <i className="fa fa-pencil-square-o" />
                                    </Link>
                                  </div>
                                </span>
                                <span
                                  id="edit_voucher_id29401"
                                  style={{ display: "none" }}
                                >
                                  <span className="input-group date col-md-12 col-sm-12 col-xs-12">
                                    <input
                                      className="form-control"
                                      type="text"
                                      name="voucher_id29401"
                                      id="voucher_id29401"
                                      defaultValue={84772}
                                    />
                                    <div
                                      onclick="show_span_id('save','29401');"
                                      className="input-group-addon"
                                    >
                                      <Link
                                        onclick="show_span_id('save','29401');"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title
                                        data-original-title="Save"
                                      >
                                        <i className="fa fa-floppy-o" />
                                      </Link>
                                    </div>
                                    <div
                                      onclick="show_span_id('cancel','29401')"
                                      className="input-group-addon"
                                    >
                                      <Link
                                        onclick="show_span_id('cancel','29401')"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title
                                        data-original-title="Cancel"
                                      >
                                        <i className="fa fa-times" />
                                      </Link>
                                    </div>
                                  </span>
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td>Booking Date</td>
                              <td>28-Jul-2023</td>
                              <td>
                                Deadline Date&nbsp;
                                <i
                                  className="fa fa-info-circle"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="NOTE : As per Admin's Time Zone"
                                />
                              </td>
                              <td>09-Sep-2023 05:29:00</td>
                            </tr>
                            <tr className="phps_row_0">
                              <td>Reservation ID</td>
                              <td>OT19421</td>
                            </tr>
                            <tr className="phps_row_1">
                              <td>Payment Gateway</td>
                              <td>No</td>
                              <td>Pay@hotel</td>
                              <td>No</td>
                            </tr>
                            <tr className="phps_row_0">
                              <td>Check In Date</td>
                              <td>11-Sep-2023</td>
                              <td>Check Out Date</td>
                              <td>12-Sep-2023</td>
                            </tr>
                            <tr className="phps_row_1">
                              <td>Remark:</td>
                              <td />

                              <td># of Nights</td>
                              <td>1</td>
                            </tr>
                            <tr className="phps_row_0">
                              <td>Hotel</td>
                              <td>THE ADDRESS DUBAI MARINA</td>
                              <td>Telephone #</td>
                              <td />
                            </tr>
                            <tr className="phps_row_1">
                              <td>Address</td>
                              <td colSpan={3} className="table-right-no-margin">
                                Al Marsa Street 66 Dubai Marina
                              </td>
                            </tr>
                            <tr className="phps_row_0">
                              <td>City</td>
                              <td>Dubai</td>
                              <td>Country</td>
                              <td>United Arab Emirates</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                  <tr className="phps_row_1 tblHeading" id="acc2">
                    <td colSpan={4}>
                      <img
                        src={isContentVisible2 ? minus : plus}
                        id="moreFilterBtn2"
                        onClick={() => toggleContentVisibility(2)}
                        alt="cri"
                      />
                      &nbsp;&nbsp;Terms and Conditions
                    </td>
                  </tr>
                  <tr id="accCont2" className="accContent">
                    <td colSpan={4}>
                      <div
                        className={`contwrap ${
                          isContentVisible2 ? "expand" : "hidden"
                        }`}
                        id="r_2"
                      >
                        <table
                          width="100%"
                          cellPadding={2}
                          cellSpacing={1}
                          align="center"
                          border={0}
                          className="table table-bordered  table-responsive table-box tableborder"
                        >
                          <tbody className="bg-white">
                            <tr className="phps_row_0">
                              <td valign="top" width="25%">
                                Agent Cancellation Policy&nbsp;
                                <i
                                  className="fa fa-info-circle"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="NOTE : The Cancellation Policy is as per the Agent's Time Zone"
                                />
                              </td>
                              <td colSpan={3} width="75%">
                                <strong>Deluxe Room [2 adults 0 Child] </strong>
                                <br />
                                Free cancellation up to 02:57:00 on 9th of
                                September 2023 <br />
                                If you cancel after 02:58:00 on 9th of September
                                2023 you will be charged USD 370.27
                                <hr />
                                <br />
                                <br />
                                <strong>Deluxe Room [2 adults 0 Child]</strong>
                                <br />
                                Free cancellation up to 02:57:00 on 9th of
                                September 2023 <br />
                                If you cancel after 02:58:00 on 9th of September
                                2023 you will be charged USD 370.27
                                <hr />
                                <br />
                                <br />
                                <strong>Deluxe Room [2 adults 0 Child]</strong>
                                <br />
                                Free cancellation up to 02:57:00 on 9th of
                                September 2023 <br />
                                If you cancel after 02:58:00 on 9th of September
                                2023 you will be charged USD 370.27
                              </td>
                            </tr>
                            {/*  4/6/2013 changed by vrushali */}
                            <tr className="phps_row_1">
                              <td valign="top" width="25%">
                                Contract Comment
                              </td>
                              <td colSpan={3} width="75%">
                                {" "}
                                Deluxe Room ROOM ONLY:For all rooms, a maximum
                                of 1 child below 12 years old can stay free of
                                charge when using existing bedding.. Estimated
                                total amount of taxes &amp; fees for this
                                booking:20.00 Utd. Arab Emir. Dirham payable on
                                arrival. Check-in hour 15:00-00:00.Car park YES
                                (With additional debit notes).Deluxe Room ROOM
                                ONLY:For all rooms, a maximum of 1 child below
                                12 years old can stay free of charge when using
                                existing bedding.. Estimated total amount of
                                taxes &amp; fees for this booking:20.00 Utd.
                                Arab Emir. Dirham payable on arrival. Check-in
                                hour 15:00-00:00.Car park YES (With additional
                                debit notes).Deluxe Room ROOM ONLY:For all
                                rooms, a maximum of 1 child below 12 years old
                                can stay free of charge when using existing
                                bedding.. Estimated total amount of taxes &amp;
                                fees for this booking:20.00 Utd. Arab Emir.
                                Dirham payable on arrival. Check-in hour
                                15:00-00:00.Car park YES (With additional debit
                                notes).
                              </td>
                            </tr>
                            <tr className="phps_row_0">
                              <td width="25%">Special Comment</td>
                              <td colSpan={3} width="75%">
                                <span
                                  id="display_voucher_remark_29401"
                                  className="input-group col-md-12 col-sm-12"
                                >
                                  <span
                                    id="voucher_remark_show_29401"
                                    style={{
                                      display: "table-cell",
                                      verticalAlign: "middle",
                                    }}
                                  >
                                    <font color="#008000">-</font>
                                  </span>
                                  {/* <img src="images/edit.gif" style='cursor:pointer;border:0;'  title="edit" alt="edit" onClick='show_span_remark("edit","29401");'/> */}
                                  <div
                                    className="input-group-addon"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title
                                    data-original-title="Edit"
                                    onclick='show_span_remark("edit","29401");'
                                    style={{ marginLeft: "980px" }}
                                  >
                                    <Link>
                                      <h6>
                                        <i className="fa fa-pencil-square-o" />
                                      </h6>
                                    </Link>
                                  </div>
                                </span>
                                <span
                                  className="input-group date col-md-12 col-sm-12"
                                  id="edit_voucher_remark_"
                                  style={{ display: "none" }}
                                >
                                  <textarea
                                    className="form-control"
                                    rows={5}
                                    cols={30}
                                    name="voucher_remark_"
                                    id="voucher_remark_29401"
                                    defaultValue={""}
                                  />
                                  <div
                                    className="input-group-addon"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title
                                    data-original-title="Save"
                                    onclick="show_span_remark('save','29401');"
                                  >
                                    <Link>
                                      <h6>
                                        <i className="fa fa-floppy-o" />
                                      </h6>
                                    </Link>
                                  </div>
                                  <div
                                    className="input-group-addon"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title
                                    data-original-title="Cancel"
                                    onclick="show_span_remark('cancel','29401')"
                                  >
                                    <Link>
                                      <h6>
                                        <i className="fa fa-times" />
                                      </h6>
                                    </Link>
                                  </div>
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                  <tr className="phps_row_1 tblHeading" id="acc3">
                    <td colSpan={4}>
                      <img
                        src={isContentVisible3 ? minus : plus}
                        id="moreFilterBtn3"
                        onClick={() => toggleContentVisibility(3)}
                        alt="cri"
                      />
                      &nbsp;&nbsp;Passenger Details
                    </td>
                  </tr>
                  <tr className="phps_row_0 accContent" id="accCont3">
                    <td colSpan={4}>
                      <div
                        className={`contwrap ${
                          isContentVisible3 ? "expand" : "hidden"
                        }`}
                        id="r_3"
                      >
                        <table className="table table-bordered   table-responsive text-center agent-text">
                          <thead>
                            <style
                              dangerouslySetInnerHTML={{
                                __html: "\n.subHeader td{\ncolor: #fff;\n}\n",
                              }}
                            />

                            <tr className="subHeader">
                              <td width="25%">&nbsp;Room Type</td>
                              <td width="25%">&nbsp;Room(s)</td>
                              <td>&nbsp;Passengers</td>
                              <td>&nbsp;Nationality</td>
                            </tr>
                          </thead>
                          <tbody className="bg-white">
                            <tr>
                              <td width="20%">
                                {" "}
                                Deluxe Room ROOM ONLY <br />
                              </td>
                              <td width="15%">&nbsp;&nbsp;1</td>
                              <td width="30%">
                                <table
                                  border={0}
                                  width="100%"
                                  className="agent-text"
                                >
                                  <tbody className="bg-white">
                                    <tr>
                                      <td style={{ borderBottom: "none" }}>
                                        <div id="edit000">
                                          <div
                                            className="col-xs-11 text-left"
                                            style={{
                                              margin: "0px",
                                              padding: "8px 0px 0px 0px",
                                              height: "20px",
                                              wordWrap: "break-word",
                                            }}
                                          >
                                            <span id="update_salutations000">
                                              Mr
                                            </span>
                                            &nbsp;
                                            <span id="update_first_name000">
                                              iswarya
                                            </span>
                                            &nbsp;
                                            <span id="update_last_name000">
                                              Mallikarjuna
                                            </span>
                                          </div>
                                          <div
                                            className="col-xs-1"
                                            style={{
                                              margin: "0px",
                                              padding: "0px",
                                              height: "20px",
                                            }}
                                          >
                                            <div
                                              className="input-group-addon"
                                              data-toggle="tooltip"
                                              data-placement="top"
                                              title
                                              data-original-title="Edit"
                                            >
                                              <Link onclick="edit_pessenger('00','0','002')">
                                                <i className="fa fa-pencil-square-o" />
                                              </Link>
                                            </div>
                                          </div>
                                        </div>
                                        <div
                                          id="update000"
                                          style={{
                                            display: "none",
                                            position: "relative",
                                          }}
                                        >
                                          <div
                                            id="loading000"
                                            style={{
                                              position: "absolute",
                                              display: "none",
                                            }}
                                          >
                                            <img
                                              src="/cpfv3/images/ajax_pagination_loading.gif"
                                              alt=""
                                            />
                                          </div>
                                          <input
                                            type="hidden"
                                            id="id000"
                                            defaultValue={17526}
                                          />
                                          <div className="col-md-2 col-sm-12">
                                            <div className="row">
                                              <MultiSelect
                                                options={salutations}
                                                isMulti
                                                isSearchable
                                                placeholder="- Title -"
                                                noOptionsMessage={() =>
                                                  "No Option Found"
                                                }
                                                className="custom-select required"
                                              />
                                              <div className="btn-group bootstrap-select box form-control show-menu-arrow">
                                                <button
                                                  type="button"
                                                  className="btn dropdown-toggle btn-default"
                                                  data-toggle="dropdown"
                                                  data-id="salutations000"
                                                  title="Mr"
                                                >
                                                  <span className="filter-option pull-left">
                                                    Mr
                                                  </span>
                                                  &nbsp;
                                                  <span className="caret" />
                                                </button>
                                                <div className="dropdown-menu open">
                                                  <div className="bs-searchbox">
                                                    <input
                                                      type="text"
                                                      className="form-control"
                                                      autoComplete="off"
                                                    />
                                                  </div>
                                                  <ul
                                                    className="dropdown-menu inner"
                                                    role="menu"
                                                  >
                                                    <li
                                                      data-original-index={0}
                                                      className="selected"
                                                    >
                                                      <Link
                                                        tabIndex={0}
                                                        className
                                                        style={{}}
                                                        data-tokens="null"
                                                      >
                                                        <span className="text">
                                                          Mr
                                                        </span>
                                                        <span className="glyphicon glyphicon-ok check-mark" />
                                                      </Link>
                                                    </li>
                                                    <li data-original-index={1}>
                                                      <Link
                                                        tabIndex={0}
                                                        className
                                                        style={{}}
                                                        data-tokens="null"
                                                      >
                                                        <span className="text">
                                                          Ms
                                                        </span>
                                                        <span className="glyphicon glyphicon-ok check-mark" />
                                                      </Link>
                                                    </li>
                                                    <li data-original-index={2}>
                                                      <Link
                                                        tabIndex={0}
                                                        className
                                                        style={{}}
                                                        data-tokens="null"
                                                      >
                                                        <span className="text">
                                                          Mrs
                                                        </span>
                                                        <span className="glyphicon glyphicon-ok check-mark" />
                                                      </Link>
                                                    </li>
                                                    <li data-original-index={3}>
                                                      <Link
                                                        tabIndex={0}
                                                        className
                                                        style={{}}
                                                        data-tokens="null"
                                                      >
                                                        <span className="text">
                                                          Dr
                                                        </span>
                                                        <span className="glyphicon glyphicon-ok check-mark" />
                                                      </Link>
                                                    </li>
                                                    <li data-original-index={4}>
                                                      <Link
                                                        tabIndex={0}
                                                        className
                                                        style={{}}
                                                        data-tokens="null"
                                                      >
                                                        <span className="text">
                                                          Master
                                                        </span>
                                                        <span className="glyphicon glyphicon-ok check-mark" />
                                                      </Link>
                                                    </li>
                                                    <li data-original-index={5}>
                                                      <Link
                                                        tabIndex={0}
                                                        className
                                                        style={{}}
                                                        data-tokens="null"
                                                      >
                                                        <span className="text">
                                                          Miss
                                                        </span>
                                                        <span className="glyphicon glyphicon-ok check-mark" />
                                                      </Link>
                                                    </li>
                                                  </ul>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-md-4 col-sm-12">
                                            <div className="row">
                                              <input
                                                type="text"
                                                defaultValue="iswarya"
                                                id="first_name000"
                                                title="first Name"
                                                className="box form-control required"
                                                maxLength={50}
                                              />
                                            </div>
                                          </div>
                                          <div className="col-md-6 col-sm-12">
                                            <div className="row">
                                              <div className="input-group col-md-12 col-sm-12">
                                                <input
                                                  type="text"
                                                  defaultValue="Mallikarjuna"
                                                  id="last_name000"
                                                  title="Last Name"
                                                  className="box form-control required"
                                                  maxLength={50}
                                                />
                                                <div
                                                  className="input-group-addon"
                                                  data-toggle="tooltip"
                                                  data-placement="top"
                                                  title
                                                  data-original-title="Save"
                                                >
                                                  <Link onclick="update_passenger('00','0','2',true,'29401')">
                                                    <h6>
                                                      <i className="fa fa-floppy-o" />
                                                    </h6>
                                                  </Link>
                                                </div>
                                                <div
                                                  className="input-group-addon"
                                                  data-toggle="tooltip"
                                                  data-placement="top"
                                                  title
                                                  data-original-title="Cancel"
                                                >
                                                  <Link onclick="cancel_passenger('00','0','2')">
                                                    <h6>
                                                      <i className="fa fa-times" />
                                                    </h6>
                                                  </Link>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div style={{ clear: "both" }} />
                                        <br />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td style={{ borderBottom: "none" }}>
                                        <div id="edit001">
                                          <div
                                            className="col-xs-11 text-left"
                                            style={{
                                              margin: "0px",
                                              padding: "8px 0px 0px 0px",
                                              height: "20px",
                                              wordWrap: "break-word",
                                            }}
                                          >
                                            <span id="update_salutations001">
                                              Mr
                                            </span>
                                            &nbsp;
                                            <span id="update_first_name001">
                                              iswarya
                                            </span>
                                            &nbsp;
                                            <span id="update_last_name001">
                                              Mallikarjuna
                                            </span>
                                          </div>
                                          <div
                                            className="col-xs-1"
                                            style={{
                                              margin: "0px",
                                              padding: "0px",
                                              height: "20px",
                                            }}
                                          >
                                            <div
                                              className="input-group-addon"
                                              data-toggle="tooltip"
                                              data-placement="top"
                                              title
                                              data-original-title="Edit"
                                            >
                                              <Link onclick="edit_pessenger('00','1','002')">
                                                <i className="fa fa-pencil-square-o" />
                                              </Link>
                                            </div>
                                          </div>
                                        </div>
                                        <div
                                          id="update001"
                                          style={{
                                            display: "none",
                                            position: "relative",
                                          }}
                                        >
                                          <div
                                            id="loading001"
                                            style={{
                                              position: "absolute",
                                              display: "none",
                                            }}
                                          >
                                            <img
                                              src="/cpfv3/images/ajax_pagination_loading.gif"
                                              alt=""
                                            />
                                          </div>
                                          <input
                                            type="hidden"
                                            id="id001"
                                            defaultValue={17527}
                                          />
                                          <div className="col-md-2 col-sm-12">
                                            <div className="row">
                                              <MultiSelect
                                                options={salutations}
                                                isMulti
                                                isSearchable
                                                placeholder="- Title -"
                                                noOptionsMessage={() =>
                                                  "No Option Found"
                                                }
                                                className="custom-select required"
                                              />
                                              <div className="btn-group bootstrap-select box form-control show-menu-arrow">
                                                <button
                                                  type="button"
                                                  className="btn dropdown-toggle btn-default"
                                                  data-toggle="dropdown"
                                                  data-id="salutations001"
                                                  title="Mr"
                                                >
                                                  <span className="filter-option pull-left">
                                                    Mr
                                                  </span>
                                                  &nbsp;
                                                  <span className="caret" />
                                                </button>
                                                <div className="dropdown-menu open">
                                                  <div className="bs-searchbox">
                                                    <input
                                                      type="text"
                                                      className="form-control"
                                                      autoComplete="off"
                                                    />
                                                  </div>
                                                  <ul
                                                    className="dropdown-menu inner"
                                                    role="menu"
                                                  >
                                                    <li
                                                      data-original-index={0}
                                                      className="selected"
                                                    >
                                                      <Link
                                                        tabIndex={0}
                                                        className
                                                        style={{}}
                                                        data-tokens="null"
                                                      >
                                                        <span className="text">
                                                          Mr
                                                        </span>
                                                        <span className="glyphicon glyphicon-ok check-mark" />
                                                      </Link>
                                                    </li>
                                                    <li data-original-index={1}>
                                                      <Link
                                                        tabIndex={0}
                                                        className
                                                        style={{}}
                                                        data-tokens="null"
                                                      >
                                                        <span className="text">
                                                          Ms
                                                        </span>
                                                        <span className="glyphicon glyphicon-ok check-mark" />
                                                      </Link>
                                                    </li>
                                                    <li data-original-index={2}>
                                                      <Link
                                                        tabIndex={0}
                                                        className
                                                        style={{}}
                                                        data-tokens="null"
                                                      >
                                                        <span className="text">
                                                          Mrs
                                                        </span>
                                                        <span className="glyphicon glyphicon-ok check-mark" />
                                                      </Link>
                                                    </li>
                                                    <li data-original-index={3}>
                                                      <Link
                                                        tabIndex={0}
                                                        className
                                                        style={{}}
                                                        data-tokens="null"
                                                      >
                                                        <span className="text">
                                                          Dr
                                                        </span>
                                                        <span className="glyphicon glyphicon-ok check-mark" />
                                                      </Link>
                                                    </li>
                                                    <li data-original-index={4}>
                                                      <Link
                                                        tabIndex={0}
                                                        className
                                                        style={{}}
                                                        data-tokens="null"
                                                      >
                                                        <span className="text">
                                                          Master
                                                        </span>
                                                        <span className="glyphicon glyphicon-ok check-mark" />
                                                      </Link>
                                                    </li>
                                                    <li data-original-index={5}>
                                                      <Link
                                                        tabIndex={0}
                                                        className
                                                        style={{}}
                                                        data-tokens="null"
                                                      >
                                                        <span className="text">
                                                          Miss
                                                        </span>
                                                        <span className="glyphicon glyphicon-ok check-mark" />
                                                      </Link>
                                                    </li>
                                                  </ul>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-md-4 col-sm-12">
                                            <div className="row">
                                              <input
                                                type="text"
                                                defaultValue="iswarya"
                                                id="first_name001"
                                                title="first Name"
                                                className="box form-control required"
                                                maxLength={50}
                                              />
                                            </div>
                                          </div>
                                          <div className="col-md-6 col-sm-12">
                                            <div className="row">
                                              <div className="input-group col-md-12 col-sm-12">
                                                <input
                                                  type="text"
                                                  defaultValue="Mallikarjuna"
                                                  id="last_name001"
                                                  title="Last Name"
                                                  className="box form-control required"
                                                  maxLength={50}
                                                />
                                                <div
                                                  className="input-group-addon"
                                                  data-toggle="tooltip"
                                                  data-placement="top"
                                                  title
                                                  data-original-title="Save"
                                                >
                                                  <Link onclick="update_passenger('00','1','2',false,'29401')">
                                                    <h6>
                                                      <i className="fa fa-floppy-o" />
                                                    </h6>
                                                  </Link>
                                                </div>
                                                <div
                                                  className="input-group-addon"
                                                  data-toggle="tooltip"
                                                  data-placement="top"
                                                  title
                                                  data-original-title="Cancel"
                                                >
                                                  <Link onclick="cancel_passenger('00','1','2')">
                                                    <h6>
                                                      <i className="fa fa-times" />
                                                    </h6>
                                                  </Link>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div style={{ clear: "both" }} />
                                        <br />
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                              <td>Mali</td>
                            </tr>
                            <tr>
                              <td width="20%">
                                {" "}
                                Deluxe Room ROOM ONLY <br />
                              </td>
                              <td width="15%">&nbsp;&nbsp;1</td>
                              <td width="30%">
                                <table
                                  border={0}
                                  width="100%"
                                  className="agent-text"
                                >
                                  <tbody className="bg-white">
                                    <tr>
                                      <td style={{ borderBottom: "none" }}>
                                        <div id="edit010">
                                          <div
                                            className="col-xs-11 text-left"
                                            style={{
                                              margin: "0px",
                                              padding: "8px 0px 0px 0px",
                                              height: "20px",
                                              wordWrap: "break-word",
                                            }}
                                          >
                                            <span id="update_salutations010">
                                              Mr
                                            </span>
                                            &nbsp;
                                            <span id="update_first_name010">
                                              iswarya
                                            </span>
                                            &nbsp;
                                            <span id="update_last_name010">
                                              Mallikarjuna
                                            </span>
                                          </div>
                                          <div
                                            className="col-xs-1"
                                            style={{
                                              margin: "0px",
                                              padding: "0px",
                                              height: "20px",
                                            }}
                                          >
                                            <div
                                              className="input-group-addon"
                                              data-toggle="tooltip"
                                              data-placement="top"
                                              title
                                              data-original-title="Edit"
                                            >
                                              <Link onclick="edit_pessenger('01','0','012')">
                                                <i className="fa fa-pencil-square-o" />
                                              </Link>
                                            </div>
                                          </div>
                                        </div>
                                        <div
                                          id="update010"
                                          style={{
                                            display: "none",
                                            position: "relative",
                                          }}
                                        >
                                          <div
                                            id="loading010"
                                            style={{
                                              position: "absolute",
                                              display: "none",
                                            }}
                                          >
                                            <img
                                              src="/cpfv3/images/ajax_pagination_loading.gif"
                                              alt=""
                                            />
                                          </div>
                                          <input
                                            type="hidden"
                                            id="id010"
                                            defaultValue={17528}
                                          />
                                          <div className="col-md-2 col-sm-12">
                                            <div className="row">
                                              <MultiSelect
                                                options={salutations}
                                                isMulti
                                                isSearchable
                                                placeholder="- Title -"
                                                noOptionsMessage={() =>
                                                  "No Option Found"
                                                }
                                                className="custom-select required"
                                              />
                                              <div className="btn-group bootstrap-select box form-control show-menu-arrow">
                                                <button
                                                  type="button"
                                                  className="btn dropdown-toggle btn-default"
                                                  data-toggle="dropdown"
                                                  data-id="salutations010"
                                                  title="Mr"
                                                >
                                                  <span className="filter-option pull-left">
                                                    Mr
                                                  </span>
                                                  &nbsp;
                                                  <span className="caret" />
                                                </button>
                                                <div className="dropdown-menu open">
                                                  <div className="bs-searchbox">
                                                    <input
                                                      type="text"
                                                      className="form-control"
                                                      autoComplete="off"
                                                    />
                                                  </div>
                                                  <ul
                                                    className="dropdown-menu inner"
                                                    role="menu"
                                                  >
                                                    <li
                                                      data-original-index={0}
                                                      className="selected"
                                                    >
                                                      <Link
                                                        tabIndex={0}
                                                        className
                                                        style={{}}
                                                        data-tokens="null"
                                                      >
                                                        <span className="text">
                                                          Mr
                                                        </span>
                                                        <span className="glyphicon glyphicon-ok check-mark" />
                                                      </Link>
                                                    </li>
                                                    <li data-original-index={1}>
                                                      <Link
                                                        tabIndex={0}
                                                        className
                                                        style={{}}
                                                        data-tokens="null"
                                                      >
                                                        <span className="text">
                                                          Ms
                                                        </span>
                                                        <span className="glyphicon glyphicon-ok check-mark" />
                                                      </Link>
                                                    </li>
                                                    <li data-original-index={2}>
                                                      <Link
                                                        tabIndex={0}
                                                        className
                                                        style={{}}
                                                        data-tokens="null"
                                                      >
                                                        <span className="text">
                                                          Mrs
                                                        </span>
                                                        <span className="glyphicon glyphicon-ok check-mark" />
                                                      </Link>
                                                    </li>
                                                    <li data-original-index={3}>
                                                      <Link
                                                        tabIndex={0}
                                                        className
                                                        style={{}}
                                                        data-tokens="null"
                                                      >
                                                        <span className="text">
                                                          Dr
                                                        </span>
                                                        <span className="glyphicon glyphicon-ok check-mark" />
                                                      </Link>
                                                    </li>
                                                    <li data-original-index={4}>
                                                      <Link
                                                        tabIndex={0}
                                                        className
                                                        style={{}}
                                                        data-tokens="null"
                                                      >
                                                        <span className="text">
                                                          Master
                                                        </span>
                                                        <span className="glyphicon glyphicon-ok check-mark" />
                                                      </Link>
                                                    </li>
                                                    <li data-original-index={5}>
                                                      <Link
                                                        tabIndex={0}
                                                        className
                                                        style={{}}
                                                        data-tokens="null"
                                                      >
                                                        <span className="text">
                                                          Miss
                                                        </span>
                                                        <span className="glyphicon glyphicon-ok check-mark" />
                                                      </Link>
                                                    </li>
                                                  </ul>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-md-4 col-sm-12">
                                            <div className="row">
                                              <input
                                                type="text"
                                                defaultValue="iswarya"
                                                id="first_name010"
                                                title="first Name"
                                                className="box form-control required"
                                                maxLength={50}
                                              />
                                            </div>
                                          </div>
                                          <div className="col-md-6 col-sm-12">
                                            <div className="row">
                                              <div className="input-group col-md-12 col-sm-12">
                                                <input
                                                  type="text"
                                                  defaultValue="Mallikarjuna"
                                                  id="last_name010"
                                                  title="Last Name"
                                                  className="box form-control required"
                                                  maxLength={50}
                                                />
                                                <div
                                                  className="input-group-addon"
                                                  data-toggle="tooltip"
                                                  data-placement="top"
                                                  title
                                                  data-original-title="Save"
                                                >
                                                  <Link onclick="update_passenger('01','0','2',true,'29401')">
                                                    <h6>
                                                      <i className="fa fa-floppy-o" />
                                                    </h6>
                                                  </Link>
                                                </div>
                                                <div
                                                  className="input-group-addon"
                                                  data-toggle="tooltip"
                                                  data-placement="top"
                                                  title
                                                  data-original-title="Cancel"
                                                >
                                                  <Link onclick="cancel_passenger('01','0','2')">
                                                    <h6>
                                                      <i className="fa fa-times" />
                                                    </h6>
                                                  </Link>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div style={{ clear: "both" }} />
                                        <br />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td style={{ borderBottom: "none" }}>
                                        <div id="edit011">
                                          <div
                                            className="col-xs-11 text-left"
                                            style={{
                                              margin: "0px",
                                              padding: "8px 0px 0px 0px",
                                              height: "20px",
                                              wordWrap: "break-word",
                                            }}
                                          >
                                            <span id="update_salutations011">
                                              Mr
                                            </span>
                                            &nbsp;
                                            <span id="update_first_name011">
                                              iswarya
                                            </span>
                                            &nbsp;
                                            <span id="update_last_name011">
                                              Mallikarjuna
                                            </span>
                                          </div>
                                          <div
                                            className="col-xs-1"
                                            style={{
                                              margin: "0px",
                                              padding: "0px",
                                              height: "20px",
                                            }}
                                          >
                                            <div
                                              className="input-group-addon"
                                              data-toggle="tooltip"
                                              data-placement="top"
                                              title
                                              data-original-title="Edit"
                                            >
                                              <Link onclick="edit_pessenger('01','1','012')">
                                                <i className="fa fa-pencil-square-o" />
                                              </Link>
                                            </div>
                                          </div>
                                        </div>
                                        <div
                                          id="update011"
                                          style={{
                                            display: "none",
                                            position: "relative",
                                          }}
                                        >
                                          <div
                                            id="loading011"
                                            style={{
                                              position: "absolute",
                                              display: "none",
                                            }}
                                          >
                                            <img
                                              src="/cpfv3/images/ajax_pagination_loading.gif"
                                              alt=""
                                            />
                                          </div>
                                          <input
                                            type="hidden"
                                            id="id011"
                                            defaultValue={17529}
                                          />
                                          <div className="col-md-2 col-sm-12">
                                            <div className="row">
                                              <MultiSelect
                                                options={salutations}
                                                isMulti
                                                isSearchable
                                                placeholder="- Title -"
                                                noOptionsMessage={() =>
                                                  "No Option Found"
                                                }
                                                className="custom-select required"
                                              />
                                              <div className="btn-group bootstrap-select box form-control show-menu-arrow">
                                                <button
                                                  type="button"
                                                  className="btn dropdown-toggle btn-default"
                                                  data-toggle="dropdown"
                                                  data-id="salutations011"
                                                  title="Mr"
                                                >
                                                  <span className="filter-option pull-left">
                                                    Mr
                                                  </span>
                                                  &nbsp;
                                                  <span className="caret" />
                                                </button>
                                                <div className="dropdown-menu open">
                                                  <div className="bs-searchbox">
                                                    <input
                                                      type="text"
                                                      className="form-control"
                                                      autoComplete="off"
                                                    />
                                                  </div>
                                                  <ul
                                                    className="dropdown-menu inner"
                                                    role="menu"
                                                  >
                                                    <li
                                                      data-original-index={0}
                                                      className="selected"
                                                    >
                                                      <Link
                                                        tabIndex={0}
                                                        className
                                                        style={{}}
                                                        data-tokens="null"
                                                      >
                                                        <span className="text">
                                                          Mr
                                                        </span>
                                                        <span className="glyphicon glyphicon-ok check-mark" />
                                                      </Link>
                                                    </li>
                                                    <li data-original-index={1}>
                                                      <Link
                                                        tabIndex={0}
                                                        className
                                                        style={{}}
                                                        data-tokens="null"
                                                      >
                                                        <span className="text">
                                                          Ms
                                                        </span>
                                                        <span className="glyphicon glyphicon-ok check-mark" />
                                                      </Link>
                                                    </li>
                                                    <li data-original-index={2}>
                                                      <Link
                                                        tabIndex={0}
                                                        className
                                                        style={{}}
                                                        data-tokens="null"
                                                      >
                                                        <span className="text">
                                                          Mrs
                                                        </span>
                                                        <span className="glyphicon glyphicon-ok check-mark" />
                                                      </Link>
                                                    </li>
                                                    <li data-original-index={3}>
                                                      <Link
                                                        tabIndex={0}
                                                        className
                                                        style={{}}
                                                        data-tokens="null"
                                                      >
                                                        <span className="text">
                                                          Dr
                                                        </span>
                                                        <span className="glyphicon glyphicon-ok check-mark" />
                                                      </Link>
                                                    </li>
                                                    <li data-original-index={4}>
                                                      <Link
                                                        tabIndex={0}
                                                        className
                                                        style={{}}
                                                        data-tokens="null"
                                                      >
                                                        <span className="text">
                                                          Master
                                                        </span>
                                                        <span className="glyphicon glyphicon-ok check-mark" />
                                                      </Link>
                                                    </li>
                                                    <li data-original-index={5}>
                                                      <Link
                                                        tabIndex={0}
                                                        className
                                                        style={{}}
                                                        data-tokens="null"
                                                      >
                                                        <span className="text">
                                                          Miss
                                                        </span>
                                                        <span className="glyphicon glyphicon-ok check-mark" />
                                                      </Link>
                                                    </li>
                                                  </ul>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-md-4 col-sm-12">
                                            <div className="row">
                                              <input
                                                type="text"
                                                defaultValue="iswarya"
                                                id="first_name011"
                                                title="first Name"
                                                className="box form-control required"
                                                maxLength={50}
                                              />
                                            </div>
                                          </div>
                                          <div className="col-md-6 col-sm-12">
                                            <div className="row">
                                              <div className="input-group col-md-12 col-sm-12">
                                                <input
                                                  type="text"
                                                  defaultValue="Mallikarjuna"
                                                  id="last_name011"
                                                  title="Last Name"
                                                  className="box form-control required"
                                                  maxLength={50}
                                                />
                                                <div
                                                  className="input-group-addon"
                                                  data-toggle="tooltip"
                                                  data-placement="top"
                                                  title
                                                  data-original-title="Save"
                                                >
                                                  <Link onclick="update_passenger('01','1','2',false,'29401')">
                                                    <h6>
                                                      <i className="fa fa-floppy-o" />
                                                    </h6>
                                                  </Link>
                                                </div>
                                                <div
                                                  className="input-group-addon"
                                                  data-toggle="tooltip"
                                                  data-placement="top"
                                                  title
                                                  data-original-title="Cancel"
                                                >
                                                  <Link onclick="cancel_passenger('01','1','2')">
                                                    <h6>
                                                      <i className="fa fa-times" />
                                                    </h6>
                                                  </Link>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div style={{ clear: "both" }} />
                                        <br />
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                              <td>Mali</td>
                            </tr>
                            <tr>
                              <td width="20%">
                                {" "}
                                Deluxe Room ROOM ONLY <br />
                              </td>
                              <td width="15%">&nbsp;&nbsp;1</td>
                              <td width="30%">
                                <table
                                  border={0}
                                  width="100%"
                                  className="agent-text"
                                >
                                  <tbody className="bg-white">
                                    <tr>
                                      <td style={{ borderBottom: "none" }}>
                                        <div id="edit020">
                                          <div
                                            className="col-xs-11 text-left"
                                            style={{
                                              margin: "0px",
                                              padding: "8px 0px 0px 0px",
                                              height: "20px",
                                              wordWrap: "break-word",
                                            }}
                                          >
                                            <span id="update_salutations020">
                                              Mr
                                            </span>
                                            &nbsp;
                                            <span id="update_first_name020">
                                              iswarya
                                            </span>
                                            &nbsp;
                                            <span id="update_last_name020">
                                              Mallikarjuna
                                            </span>
                                          </div>
                                          <div
                                            className="col-xs-1"
                                            style={{
                                              margin: "0px",
                                              padding: "0px",
                                              height: "20px",
                                            }}
                                          >
                                            <div
                                              className="input-group-addon"
                                              data-toggle="tooltip"
                                              data-placement="top"
                                              title
                                              data-original-title="Edit"
                                            >
                                              <Link onclick="edit_pessenger('02','0','022')">
                                                <i className="fa fa-pencil-square-o" />
                                              </Link>
                                            </div>
                                          </div>
                                        </div>
                                        <div
                                          id="update020"
                                          style={{
                                            display: "none",
                                            position: "relative",
                                          }}
                                        >
                                          <div
                                            id="loading020"
                                            style={{
                                              position: "absolute",
                                              display: "none",
                                            }}
                                          >
                                            <img
                                              src="/cpfv3/images/ajax_pagination_loading.gif"
                                              alt=""
                                            />
                                          </div>
                                          <input
                                            type="hidden"
                                            id="id020"
                                            defaultValue={17530}
                                          />
                                          <div className="col-md-2 col-sm-12">
                                            <div className="row">
                                              <MultiSelect
                                                options={salutations}
                                                isMulti
                                                isSearchable
                                                placeholder="- Title -"
                                                noOptionsMessage={() =>
                                                  "No Option Found"
                                                }
                                                className="custom-select required"
                                              />
                                              <div className="btn-group bootstrap-select box form-control show-menu-arrow">
                                                <button
                                                  type="button"
                                                  className="btn dropdown-toggle btn-default"
                                                  data-toggle="dropdown"
                                                  data-id="salutations020"
                                                  title="Mr"
                                                >
                                                  <span className="filter-option pull-left">
                                                    Mr
                                                  </span>
                                                  &nbsp;
                                                  <span className="caret" />
                                                </button>
                                                <div className="dropdown-menu open">
                                                  <div className="bs-searchbox">
                                                    <input
                                                      type="text"
                                                      className="form-control"
                                                      autoComplete="off"
                                                    />
                                                  </div>
                                                  <ul
                                                    className="dropdown-menu inner"
                                                    role="menu"
                                                  >
                                                    <li
                                                      data-original-index={0}
                                                      className="selected"
                                                    >
                                                      <Link
                                                        tabIndex={0}
                                                        className
                                                        style={{}}
                                                        data-tokens="null"
                                                      >
                                                        <span className="text">
                                                          Mr
                                                        </span>
                                                        <span className="glyphicon glyphicon-ok check-mark" />
                                                      </Link>
                                                    </li>
                                                    <li data-original-index={1}>
                                                      <Link
                                                        tabIndex={0}
                                                        className
                                                        style={{}}
                                                        data-tokens="null"
                                                      >
                                                        <span className="text">
                                                          Ms
                                                        </span>
                                                        <span className="glyphicon glyphicon-ok check-mark" />
                                                      </Link>
                                                    </li>
                                                    <li data-original-index={2}>
                                                      <Link
                                                        tabIndex={0}
                                                        className
                                                        style={{}}
                                                        data-tokens="null"
                                                      >
                                                        <span className="text">
                                                          Mrs
                                                        </span>
                                                        <span className="glyphicon glyphicon-ok check-mark" />
                                                      </Link>
                                                    </li>
                                                    <li data-original-index={3}>
                                                      <Link
                                                        tabIndex={0}
                                                        className
                                                        style={{}}
                                                        data-tokens="null"
                                                      >
                                                        <span className="text">
                                                          Dr
                                                        </span>
                                                        <span className="glyphicon glyphicon-ok check-mark" />
                                                      </Link>
                                                    </li>
                                                    <li data-original-index={4}>
                                                      <Link
                                                        tabIndex={0}
                                                        className
                                                        style={{}}
                                                        data-tokens="null"
                                                      >
                                                        <span className="text">
                                                          Master
                                                        </span>
                                                        <span className="glyphicon glyphicon-ok check-mark" />
                                                      </Link>
                                                    </li>
                                                    <li data-original-index={5}>
                                                      <Link
                                                        tabIndex={0}
                                                        className
                                                        style={{}}
                                                        data-tokens="null"
                                                      >
                                                        <span className="text">
                                                          Miss
                                                        </span>
                                                        <span className="glyphicon glyphicon-ok check-mark" />
                                                      </Link>
                                                    </li>
                                                  </ul>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-md-4 col-sm-12">
                                            <div className="row">
                                              <input
                                                type="text"
                                                defaultValue="iswarya"
                                                id="first_name020"
                                                title="first Name"
                                                className="box form-control required"
                                                maxLength={50}
                                              />
                                            </div>
                                          </div>
                                          <div className="col-md-6 col-sm-12">
                                            <div className="row">
                                              <div className="input-group col-md-12 col-sm-12">
                                                <input
                                                  type="text"
                                                  defaultValue="Mallikarjuna"
                                                  id="last_name020"
                                                  title="Last Name"
                                                  className="box form-control required"
                                                  maxLength={50}
                                                />
                                                <div
                                                  className="input-group-addon"
                                                  data-toggle="tooltip"
                                                  data-placement="top"
                                                  title
                                                  data-original-title="Save"
                                                >
                                                  <Link onclick="update_passenger('02','0','2',true,'29401')">
                                                    <h6>
                                                      <i className="fa fa-floppy-o" />
                                                    </h6>
                                                  </Link>
                                                </div>
                                                <div
                                                  className="input-group-addon"
                                                  data-toggle="tooltip"
                                                  data-placement="top"
                                                  title
                                                  data-original-title="Cancel"
                                                >
                                                  <Link onclick="cancel_passenger('02','0','2')">
                                                    <h6>
                                                      <i className="fa fa-times" />
                                                    </h6>
                                                  </Link>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div style={{ clear: "both" }} />
                                        <br />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td style={{ borderBottom: "none" }}>
                                        <div id="edit021">
                                          <div
                                            className="col-xs-11 text-left"
                                            style={{
                                              margin: "0px",
                                              padding: "8px 0px 0px 0px",
                                              height: "20px",
                                              wordWrap: "break-word",
                                            }}
                                          >
                                            <span id="update_salutations021">
                                              Mr
                                            </span>
                                            &nbsp;
                                            <span id="update_first_name021">
                                              iswarya
                                            </span>
                                            &nbsp;
                                            <span id="update_last_name021">
                                              Mallikarjuna
                                            </span>
                                          </div>
                                          <div
                                            className="col-xs-1"
                                            style={{
                                              margin: "0px",
                                              padding: "0px",
                                              height: "20px",
                                            }}
                                          >
                                            <div
                                              className="input-group-addon"
                                              data-toggle="tooltip"
                                              data-placement="top"
                                              title
                                              data-original-title="Edit"
                                            >
                                              <Link onclick="edit_pessenger('02','1','022')">
                                                <i className="fa fa-pencil-square-o" />
                                              </Link>
                                            </div>
                                          </div>
                                        </div>
                                        <div
                                          id="update021"
                                          style={{
                                            display: "none",
                                            position: "relative",
                                          }}
                                        >
                                          <div
                                            id="loading021"
                                            style={{
                                              position: "absolute",
                                              display: "none",
                                            }}
                                          >
                                            <img
                                              src="/cpfv3/images/ajax_pagination_loading.gif"
                                              alt=""
                                            />
                                          </div>
                                          <input
                                            type="hidden"
                                            id="id021"
                                            defaultValue={17531}
                                          />
                                          <div className="col-md-2 col-sm-12">
                                            <div className="row">
                                              <MultiSelect
                                                options={salutations}
                                                isMulti
                                                isSearchable
                                                placeholder="- Title -"
                                                noOptionsMessage={() =>
                                                  "No Option Found"
                                                }
                                                className="custom-select required"
                                              />
                                              <div className="btn-group bootstrap-select box form-control show-menu-arrow">
                                                <button
                                                  type="button"
                                                  className="btn dropdown-toggle btn-default"
                                                  data-toggle="dropdown"
                                                  data-id="salutations021"
                                                  title="Mr"
                                                >
                                                  <span className="filter-option pull-left">
                                                    Mr
                                                  </span>
                                                  &nbsp;
                                                  <span className="caret" />
                                                </button>
                                                <div className="dropdown-menu open">
                                                  <div className="bs-searchbox">
                                                    <input
                                                      type="text"
                                                      className="form-control"
                                                      autoComplete="off"
                                                    />
                                                  </div>
                                                  <ul
                                                    className="dropdown-menu inner"
                                                    role="menu"
                                                  >
                                                    <li
                                                      data-original-index={0}
                                                      className="selected"
                                                    >
                                                      <Link
                                                        tabIndex={0}
                                                        className
                                                        style={{}}
                                                        data-tokens="null"
                                                      >
                                                        <span className="text">
                                                          Mr
                                                        </span>
                                                        <span className="glyphicon glyphicon-ok check-mark" />
                                                      </Link>
                                                    </li>
                                                    <li data-original-index={1}>
                                                      <Link
                                                        tabIndex={0}
                                                        className
                                                        style={{}}
                                                        data-tokens="null"
                                                      >
                                                        <span className="text">
                                                          Ms
                                                        </span>
                                                        <span className="glyphicon glyphicon-ok check-mark" />
                                                      </Link>
                                                    </li>
                                                    <li data-original-index={2}>
                                                      <Link
                                                        tabIndex={0}
                                                        className
                                                        style={{}}
                                                        data-tokens="null"
                                                      >
                                                        <span className="text">
                                                          Mrs
                                                        </span>
                                                        <span className="glyphicon glyphicon-ok check-mark" />
                                                      </Link>
                                                    </li>
                                                    <li data-original-index={3}>
                                                      <Link
                                                        tabIndex={0}
                                                        className
                                                        style={{}}
                                                        data-tokens="null"
                                                      >
                                                        <span className="text">
                                                          Dr
                                                        </span>
                                                        <span className="glyphicon glyphicon-ok check-mark" />
                                                      </Link>
                                                    </li>
                                                    <li data-original-index={4}>
                                                      <Link
                                                        tabIndex={0}
                                                        className
                                                        style={{}}
                                                        data-tokens="null"
                                                      >
                                                        <span className="text">
                                                          Master
                                                        </span>
                                                        <span className="glyphicon glyphicon-ok check-mark" />
                                                      </Link>
                                                    </li>
                                                    <li data-original-index={5}>
                                                      <Link
                                                        tabIndex={0}
                                                        className
                                                        style={{}}
                                                        data-tokens="null"
                                                      >
                                                        <span className="text">
                                                          Miss
                                                        </span>
                                                        <span className="glyphicon glyphicon-ok check-mark" />
                                                      </Link>
                                                    </li>
                                                  </ul>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-md-4 col-sm-12">
                                            <div className="row">
                                              <input
                                                type="text"
                                                defaultValue="iswarya"
                                                id="first_name021"
                                                title="first Name"
                                                className="box form-control required"
                                                maxLength={50}
                                              />
                                            </div>
                                          </div>
                                          <div className="col-md-6 col-sm-12">
                                            <div className="row">
                                              <div className="input-group col-md-12 col-sm-12">
                                                <input
                                                  type="text"
                                                  defaultValue="Mallikarjuna"
                                                  id="last_name021"
                                                  title="Last Name"
                                                  className="box form-control required"
                                                  maxLength={50}
                                                />
                                                <div
                                                  className="input-group-addon"
                                                  data-toggle="tooltip"
                                                  data-placement="top"
                                                  title
                                                  data-original-title="Save"
                                                >
                                                  <Link onclick="update_passenger('02','1','2',false,'29401')">
                                                    <h6>
                                                      <i className="fa fa-floppy-o" />
                                                    </h6>
                                                  </Link>
                                                </div>
                                                <div
                                                  className="input-group-addon"
                                                  data-toggle="tooltip"
                                                  data-placement="top"
                                                  title
                                                  data-original-title="Cancel"
                                                >
                                                  <Link onclick="cancel_passenger('02','1','2')">
                                                    <h6>
                                                      <i className="fa fa-times" />
                                                    </h6>
                                                  </Link>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div style={{ clear: "both" }} />
                                        <br />
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                              <td>Mali</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                  <tr className="phps_row_1 tblHeading" id="acc4">
                    <td colSpan={4}>
                      <img
                        src={isContentVisible4 ? minus : plus}
                        id="moreFilterBtn4"
                        onClick={() => toggleContentVisibility(4)}
                        alt="cri"
                      />
                      &nbsp;&nbsp;Agent Information
                    </td>
                  </tr>
                  <tr id="accCont4" className="accContent">
                    <td colSpan={4}>
                      <div
                        className={`contwrap ${
                          isContentVisible4 ? "expand" : "hidden"
                        }`}
                        id="r_4"
                      >
                        <table
                          width="100%"
                          cellPadding={2}
                          cellSpacing={1}
                          align="center"
                          border={0}
                          className="table table-bordered  table-responsive table-box tableborder"
                        >
                          <tbody className="bg-white">
                            <tr className="phps_row_0">
                              <td width="25%">Agent</td>
                              <td width="25%">
                                <table
                                  border={0}
                                  cellPadding={1}
                                  cellSpacing={0}
                                  width="100%"
                                  className="agent-text"
                                >
                                  <tbody className="bg-white">
                                    <tr className="phps_row_1">
                                      <td style={{ borderBottom: "none" }}>
                                        <div className="input-group date col-md-12 col-sm-12">
                                          <span>
                                            Qtech Software PVT - CD0316
                                            <br />
                                            Bhargavi Pise
                                          </span>
                                          {/* code added by himanshu for GT-748 on 23-10-2013 */}
                                          <div
                                            className="input-group-addon"
                                            style={{ marginLeft: "142px" }}
                                          >
                                            <Link
                                              to="http://beta.tdonlines.com/agent_login.php?tms=1&action_type=login&txt_username=wego_ws&txt_password=dcb9e29be202e2ce1c9014f93b939acbfb1245ea9cde66456f228b71566c2f61&txt_agent_code=CD0316&FLAG=view&booking_id=29401&login_from_backend=yes&admin_user=Beta_Tdo&consultant_id=Beta_Tdo"
                                              target="_blank"
                                            >
                                              {/* <img src="images/login_agent.jpg" border=0> */}
                                              <i
                                                className="fa fa-sign-in"
                                                data-toggle="tooltip"
                                                data-placement="top"
                                                data-original-title="Login Agent"
                                              />
                                            </Link>
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                              <td width="25%">Agent Reference #</td>
                              <td width="25%">
                                <span
                                  className="input-group date col-md-12 col-sm-12"
                                  id="display_agent_ref_29401"
                                >
                                  <span
                                    id="voucher_agent_ref_29401"
                                    style={{
                                      display: "table-cell",
                                      verticalAlign: "middle",
                                    }}
                                  >
                                    WEGOAWS23223033
                                  </span>
                                  <div
                                    onclick='show_span_agent_ref("edit","29401");'
                                    className="input-group-addon"
                                    style={{ marginLeft: "177px" }}
                                  >
                                    <Link
                                      onclick='show_span_agent_ref("edit","29401");'
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title
                                      data-original-title="Edit"
                                    >
                                      <i className="fa fa-pencil-square-o" />
                                    </Link>
                                  </div>
                                </span>
                                <span
                                  className="input-group date col-md-12 col-sm-12"
                                  id="edit_agent_ref_29401"
                                  style={{ display: "none" }}
                                >
                                  <input
                                    className="form-control"
                                    type="text"
                                    name="agent_ref_29401"
                                    id="agent_ref_29401"
                                    defaultValue="WEGOAWS23223033"
                                  />
                                  <div
                                    onclick="show_span_agent_ref('save','29401');"
                                    className="input-group-addon"
                                  >
                                    <Link
                                      onclick="show_span_agent_ref('save','29401');"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title
                                      data-original-title="Save"
                                    >
                                      <h6>
                                        <i className="fa fa-floppy-o" />
                                      </h6>
                                    </Link>
                                  </div>
                                  <div
                                    onclick="show_span_agent_ref('cancel','29401')"
                                    className="input-group-addon"
                                  >
                                    <Link
                                      onclick="show_span_agent_ref('cancel','29401')"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title
                                      data-original-title="Cancel"
                                    >
                                      <h6>
                                        <i className="fa fa-times" />
                                      </h6>
                                    </Link>
                                  </div>
                                </span>
                              </td>
                            </tr>
                            <tr className="phps_row_1">
                              <td width="25%">Consultant Name&nbsp;</td>
                              <td width="25%" />
                              <td width="25%">
                                <input
                                  type="hidden"
                                  defaultValue={29401}
                                  name="temp_booking_id"
                                  id="temp_booking_id"
                                />
                                Sales Manager&nbsp;
                              </td>
                              <td width="25%">
                                <div
                                  className="input-group date col-md-12 col-sm-12"
                                  id="display_manager_29401"
                                >
                                  <span
                                    id="sales_manager_name_29401"
                                    style={{
                                      display: "table-cell",
                                      verticalAlign: "middle",
                                    }}
                                  >
                                    <font color="#008000">-</font>
                                  </span>
                                  <div
                                    className="input-group-addon"
                                    onclick='show_span("edit","29401");'
                                    style={{ marginLeft: "288px" }}
                                  >
                                    {/* <img src="images/edit.gif" style='cursor:pointer;border:0;'  title="edit" alt="edit" onClick='show_span("edit","29401");'/> */}
                                    <span
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title
                                      alt="edit"
                                      data-original-title="edit"
                                    >
                                      <i className="fa fa-pencil-square-o" />
                                    </span>
                                  </div>
                                </div>
                                <span
                                  id="edit_manager_29401"
                                  className="input-group date col-md-12 col-sm-12"
                                  style={{ display: "none" }}
                                >
                                  <MultiSelect
                                    options={managersOptions}
                                    isSearchable
                                    placeholder="--Select--"
                                    noOptionsMessage={() => "No Manager Found"}
                                    className="custom-select"
                                  />
                                  <div className="btn-group bootstrap-select input-group-btn form-control show-menu-arrow">
                                    <button
                                      type="button"
                                      className="btn dropdown-toggle btn-default"
                                      data-toggle="dropdown"
                                      data-id="sales_manager_29401"
                                      title="Select Manager"
                                    >
                                      <span className="filter-option pull-left">
                                        Select Manager
                                      </span>
                                      &nbsp;
                                      <span className="caret" />
                                    </button>
                                    <div className="dropdown-menu open">
                                      <div className="bs-searchbox">
                                        <input
                                          type="text"
                                          className="form-control"
                                          autoComplete="off"
                                        />
                                      </div>
                                      <ul
                                        className="dropdown-menu inner"
                                        role="menu"
                                      >
                                        <li
                                          data-original-index={0}
                                          className="selected"
                                        >
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              Select Manager
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={1}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              rohan vartak:v3otramslive
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={2}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              aniket shewale:Aniket
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={3}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              aniket shewale:aniket
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={4}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              sukanya wagh:kishore
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={5}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              hemangi :hemangi
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={6}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              Local supplier :localsupplier
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={7}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              ITC Sheraton Chains :Madhura
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={8}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              hemangi sawant:hemangi15
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={9}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              nitin kumar jain:nitin
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={10}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              NITIN nitin:Paresh
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={11}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              Kishore kashyap Kashyap:kishorek
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={12}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              Swarali test local supplier
                                              :Swarali
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={13}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              Swarali Demo Supplier :Swaralidemo
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={14}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              Sonam Tripathi:v3_otrams_wh
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={15}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              shivraj shivraj:shivraj
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={16}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              testsupplier :sanjoli
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={17}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              Demo supplier :demosupplier
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={18}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              simple singh:simple
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={19}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              simple singh:simplee
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={20}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              ananya :ananya
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={21}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              ananya1 :ananya1
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={22}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              OtramsA DemoA:otramsdemo1
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={23}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              OtamsB DemoB:otramsdemo2
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={24}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              OtamsC DemoC:otramsdemo29
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={25}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              Swarali Demo:otrams_syria
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={26}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              OtramsE DemoE:otramsdemo9
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={27}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              jayesh :jayesh
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={28}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              XmlOut_Supplier :XmlOutSupplier
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={29}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              SaideepDemoALR :DemoALR
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={30}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              OtramsDemoA
                                              DemoOtramsA:OtramsDemo11
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={31}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              OtramsF DemF:OtramsDemo23
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={32}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              swaralisales
                                              swaralisales:swaralisales
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={33}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              swaralisales
                                              swaralisales:Swaralisalesdemo
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={34}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              ankita rao:ankita
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={35}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              OtramsDemo KW:otramsdemokw
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={36}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              Neeraj yadav:neeraj
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={37}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              PrpductTest :PrpductTest
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={38}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              Madhuri Pawar:Madhuri
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={39}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              swaraliastra :astratesting
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={40}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              simple :simply
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={41}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              omi_supplier :omisupplier
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={42}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              Redapple Redapple:Redapple
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={43}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              TestratgBALI :mutiara
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={44}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              Watergate Hotel Co.Ltd :Centara
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={45}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              ankitest123 :ankita123
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={46}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              Trainingsupplier :swaralitraining
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={47}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              Transfer training supplier
                                              :swaralitransfer
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={48}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              training tour supplier
                                              :swaralitour
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={49}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              Mansi_test :mansitest8
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={50}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              Ryan RPH:ryanrph
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={51}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              Jatin Test :Jatinsup
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={52}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              test_ankita :test_ankita
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={53}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              Priyanka_supplier :otrams
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={54}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              santosh_test :santosh_test
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={55}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              V Demo:v4,demo
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={56}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              Demo BigBen:v4demo
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={57}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              Arshad :arshad
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={58}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              Paresh Kanti Parihar:hawallyparesh
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={59}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              Mazhar Testing :mazhar
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={60}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              PP_test_Supplier :pp_testt
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={61}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              Neeraj :neeraj123
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={62}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              HotelsproLiquid :HotelsproLiquid
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={63}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              allwin-qtech :allwin
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={64}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              asmita test:asmita
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={65}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              Mansi_test :mansisupplier
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={66}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              suhassup :suhassup
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={67}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              suhas mohan patil:bi_testing
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={68}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              samikshasupplier :samikshasupplier
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={69}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              Delhi Supp :delhi
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={70}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              HotelRunner :HotelRunner
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={71}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              Tax supplier :minal
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={72}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              Turkan :turkan
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={73}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              Test Supplier :prachi
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={74}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              Eros :Eroskenya
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={75}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              IBIS Seef :IBISseef
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={76}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              Hotel Confirm:hotelconfirm
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={77}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              hotelconfirm
                                              Live:hotelconfirm_live
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={78}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              R Supplier :Test
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={79}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              NR Supplier :NRTest
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={80}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              Vat_Test_Supplier :demo@1234
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={81}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              vaibhav test:svss
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={82}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              ChkSupplier :transferSupplier
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={83}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              GSA WL:gsa
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={84}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              Ahmed Khan:hconfirm
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={85}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              packageSupplier :packageSupplier
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={86}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              tdo whitelabel:wl_tdo
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={87}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              RADISSON BLU HOTEL :radissonblue
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={88}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              nidaSupplier :nidaSupplier
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={89}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              samikshasam :samikshasami
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={90}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              nidaSupplier2 :nidaSupplier2
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={91}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              Sayalione :Sayalione
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={92}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              Sayalitwo :Sayalitwo
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={93}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              Sayalithree :Sayalithree
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={94}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              Sup1 :Sup1
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={95}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              Sup2 :Sup2
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={96}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              Suppliersone :Supplier1
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={97}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              suppliertwo :Suppliertwo
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={98}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              Qtech :Qtech
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={99}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              Astraone :Astraone
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={100}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              Astratwo :Astratwo
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={101}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              Plierone :Plierone
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={102}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              Pliertwo :Pliertwo
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={103}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              Plierthree :Plierthree
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={104}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              Sayali_Supp :SayaliSup
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={105}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              Testingsupplier :testing
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={106}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              SayaSupp :SayaSupp
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={107}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              Emaar Test :emaar
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={108}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              Saya_SUPPLIER :Sayali_SUPP
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={109}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              expressentry :expressentry
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={110}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              Al Expedia :abcde
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={111}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              FlyronSupplier :Flyron
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={112}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              sayalisupplier :Sayali
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={113}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              Sayali_Qtech :Sayali_Test
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={114}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              supplierPackage :supplierPackage
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={115}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              SayuSupplier :Sayu
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={116}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              Sayali_Check_API :Syali
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={117}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              qtech test:Moreshwar_Test
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={118}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              offline.supplier.mum
                                              :offline.supplier.mum
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={119}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              World Avenue :world_avenue
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={120}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              sssss ppppp:Saya_test
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={121}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              NEW J-Venture Sup
                                              :world_avenue_new
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={122}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              Sujay Raut:Sujay_test
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={123}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              Sujay Raut:TEST_JV
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={124}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              Sujay Raut:TEST_JV_C
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={125}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              Sujay Raut:TEST_JV_A
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={126}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              JV Hotel 1 :test_JV_H
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={127}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              world avenue:worldavennuejv
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={128}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              Qtech Test:Beta_Tdo
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={129}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              Equatorial Plaza :Eqkul
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={130}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              Srinivas Pogula:Worldavenue
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={131}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              Agent Test:Agent_test
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={132}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              Agent Test:Agent_Test_JV
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={133}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              joint venture:jv_demo
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={134}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              jb demo:demo_jb
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={135}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              JB Demo:jb_2
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={136}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              test jvv:test_jvv
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={137}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              jv user:jv_user1
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={138}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              Qtech JointVenture:user_test
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={139}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              Qtech JointV:test_user
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={140}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              Qtech JointVent:test_user_JV
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={141}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              test ron:test_ron1
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={142}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              test jv:test_jv111
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={143}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              1bookin Whitelabel:1booking_wh
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                        <li data-original-index={144}>
                                          <Link
                                            tabIndex={0}
                                            className
                                            style={{}}
                                            data-tokens="null"
                                          >
                                            <span className="text">
                                              Milind Bhuwad:Milind_Qtech
                                            </span>
                                            <span className="glyphicon glyphicon-ok check-mark" />
                                          </Link>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div
                                    className="input-group-addon"
                                    onclick="show_span('save','29401');"
                                  >
                                    <Link
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title
                                      data-original-title="Save"
                                    >
                                      <h6>
                                        <i className="fa fa-floppy-o" />
                                      </h6>
                                    </Link>
                                  </div>
                                  <div
                                    className="input-group-addon"
                                    onclick="show_span('cancel','29401')"
                                  >
                                    <Link
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title
                                      data-original-title="Cancel"
                                    >
                                      <h6>
                                        <i className="fa fa-times" />
                                      </h6>
                                    </Link>
                                  </div>
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                  <tr className="phps_row_0 tblHeading" id="acc5">
                    <td colSpan={2} width="50%">
                      <img
                        src={isContentVisible5 ? minus : plus}
                        id="moreFilterBtn5"
                        onClick={() => toggleContentVisibility(5)}
                        alt="cri"
                      />
                      &nbsp;&nbsp;Rate Information
                    </td>
                    <td colSpan={2} width="50%">
                      Approx. Revenue &nbsp;-{" "}
                      <span className="tdd_label label-success">
                        USD &nbsp;212.099
                      </span>
                    </td>
                  </tr>
                  <tr id="accCont5" className="accContent">
                    <td colSpan={4}>
                      <div
                        className={`contwrap ${
                          isContentVisible5 ? "expand" : "hidden"
                        }`}
                        id="r_5"
                      >
                        <h6 className="header2"> Agent Rate Break Up</h6>
                        <table
                          cellPadding={0}
                          cellSpacing={0}
                          width="100%"
                          className="table table-bordered   table-responsive agent-text"
                        >
                          <thead>
                            <style
                              dangerouslySetInnerHTML={{
                                __html: "\n.phps_header td{\ncolor: #fff;\n}\n",
                              }}
                            />

                            <tr className="phps_header">
                              <td
                                width="25%"
                                style={{ textAlign: "center !important" }}
                              >
                                Room Type
                              </td>
                              <td
                                align="center"
                                width="25%"
                                style={{ textAlign: "center !important" }}
                              >
                                Room(s)
                              </td>
                              <td
                                align="center"
                                width="40%"
                                style={{ textAlign: "center !important" }}
                              >
                                Break Up
                              </td>
                            </tr>
                          </thead>
                          <tbody className="bg-white">
                            <tr>
                              <td
                                align="left"
                                style={{
                                  padding: "10px",
                                  textAlign: "center !important",
                                }}
                              >
                                Deluxe Room ROOM ONLY{" "}
                              </td>
                              <td style={{ textAlign: "center !important" }}>
                                1
                              </td>
                              <td
                                width="100%"
                                style={{ textAlign: "center !important" }}
                              >
                                <table width="100%">
                                  <tbody className="bg-white">
                                    <tr>
                                      <td
                                        align="center"
                                        className="para padd_5"
                                        style={{ borderBottom: "0px" }}
                                      >
                                        Day 1<br />
                                        <span style={{ color: "#d23600" }}>
                                          370.27
                                        </span>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td
                                align="left"
                                style={{
                                  padding: "10px",
                                  textAlign: "center !important",
                                }}
                              >
                                Deluxe Room ROOM ONLY{" "}
                              </td>
                              <td style={{ textAlign: "center !important" }}>
                                1
                              </td>
                              <td
                                width="100%"
                                style={{ textAlign: "center !important" }}
                              >
                                <table width="100%">
                                  <tbody className="bg-white">
                                    <tr>
                                      <td
                                        align="center"
                                        className="para padd_5"
                                        style={{ borderBottom: "0px" }}
                                      >
                                        Day 1<br />
                                        <span style={{ color: "#d23600" }}>
                                          370.27
                                        </span>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td
                                align="left"
                                style={{
                                  padding: "10px",
                                  textAlign: "center !important",
                                }}
                              >
                                Deluxe Room ROOM ONLY{" "}
                              </td>
                              <td style={{ textAlign: "center !important" }}>
                                1
                              </td>
                              <td
                                width="100%"
                                style={{ textAlign: "center !important" }}
                              >
                                <table width="100%">
                                  <tbody className="bg-white">
                                    <tr>
                                      <td
                                        align="center"
                                        className="para padd_5"
                                        style={{ borderBottom: "0px" }}
                                      >
                                        Day 1<br />
                                        <span style={{ color: "#d23600" }}>
                                          370.27
                                        </span>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <table
                          width="100%"
                          cellPadding={2}
                          cellSpacing={1}
                          align="center"
                          border={0}
                          className="table  table-responsive table-box tableborder"
                        >
                          {/* Loyalty Program Module */}
                          <tbody className="bg-white">
                            <tr className="phps_row_1">
                              <td width="25%">
                                Booking cost in Agent Currency
                              </td>
                              <td colSpan={3} width="75%">
                                4,165.54 SAR | (1110.810 * 3.75)
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <table
                          width="100%"
                          cellPadding={2}
                          cellSpacing={1}
                          align="center"
                          border={0}
                          className="table  table-responsive table-box tableborder"
                        >
                          <tbody className="bg-white">
                            <tr className="phps_row_0">
                              <td width="25%">Agent Rate</td>
                              <td width="25%">
                                USD 1110.810 (EUR-&gt;USD = 1.14734) Markup:
                                23.600 %
                              </td>
                              <td width="25%">Agent Rate Discount</td>
                              <td width="25%" className="table-right-no-margin">
                                USD&nbsp;&nbsp;0.000
                              </td>
                            </tr>
                            <tr className="phps_row_1">
                              <td width="25%">Payment Gateway (Yes/No)</td>
                              <td width="25%">No</td>
                              <td width="25%">Payment Gateway Charges</td>
                              <td width="25%">USD 0.000 </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                  <tr className="phps_row_0 tblHeading" id="acc7">
                    <td colSpan={4}>
                      <img
                        src={isContentVisible6 ? minus : plus}
                        id="moreFilterBtn6"
                        onClick={() => toggleContentVisibility(6)}
                        alt="cri"
                      />
                      &nbsp;&nbsp;Supplier Information
                    </td>
                  </tr>
                  <tr className="phps_row_1 accContent" id="accCont7">
                    <td colSpan={4}>
                      <div
                        className={`contwrap ${
                          isContentVisible6 ? "expand" : "hidden"
                        }`}
                        id="r_6"
                      >
                        <table
                          width="100%"
                          cellPadding={2}
                          cellSpacing={1}
                          align="center"
                          border={0}
                          className="table table-bordered  table-responsive table-box tableborder"
                        >
                          <tbody className="bg-white">
                            <tr className="phps_row_0">
                              <td width="25%">Supplier</td>
                              <td width="25%">HOTELBEDS </td>
                              <td width="25%">Supplier Confirmation #</td>
                              <td width="25%"> 148-2944144</td>
                            </tr>
                            <tr className="phps_row_1">
                              <td width="25%">Supplier Profile</td>
                              <td width="25%">hotelbeds</td>
                              <td width="25%">Supplier Itenirary Id</td>
                              <td width="25%">148-2944144</td>
                            </tr>
                            <tr className="phps_row_0"></tr>
                          </tbody>
                        </table>
                        <br />
                        <h6 className="header2">Supplier Rate Break up</h6>
                        <table
                          width="100%"
                          cellPadding={0}
                          cellSpacing={0}
                          className="table table-bordered   table-responsive tableborder"
                          style={{ fontSize: "12px !important" }}
                        >
                          <thead>
                            <tr className="phps_header">
                              <td
                                width="25%"
                                style={{ textAlign: "center !important" }}
                              >
                                Room Type
                              </td>
                              <td
                                align="center"
                                width="25%"
                                style={{ textAlign: "center !important" }}
                              >
                                Room(s)
                              </td>
                              <td
                                align="center"
                                width="40%"
                                style={{ textAlign: "center !important" }}
                              >
                                Break Up
                              </td>
                            </tr>
                          </thead>
                          <tbody className="bg-white">
                            <tr>
                              <td
                                align="left"
                                style={{
                                  padding: "10px",
                                  textAlign: "center !important",
                                }}
                              >
                                Deluxe Room ROOM ONLY{" "}
                              </td>
                              <td
                                align="center"
                                style={{ textAlign: "center !important" }}
                              >
                                1
                              </td>
                              <td width="100%">
                                <table width="100%">
                                  <tbody className="bg-white">
                                    <tr>
                                      <td
                                        align="center"
                                        className="para padd_5"
                                        style={{ borderBottom: "0px" }}
                                      >
                                        Day 1<br />
                                        <span style={{ color: "#d23600" }}>
                                          261.10
                                        </span>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                            {/* <tr>
                                                      <td colspan="5"height"1px"></td>
                                                  </tr> */}
                            <tr>
                              <td
                                align="left"
                                style={{
                                  padding: "10px",
                                  textAlign: "center !important",
                                }}
                              >
                                Deluxe Room ROOM ONLY{" "}
                              </td>
                              <td
                                align="center"
                                style={{ textAlign: "center !important" }}
                              >
                                1
                              </td>
                              <td width="100%">
                                <table width="100%">
                                  <tbody className="bg-white">
                                    <tr>
                                      <td
                                        align="center"
                                        className="para padd_5"
                                        style={{ borderBottom: "0px" }}
                                      >
                                        Day 1<br />
                                        <span style={{ color: "#d23600" }}>
                                          261.10
                                        </span>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                            {/* <tr>
                                                      <td colspan="5"height"1px"></td>
                                                  </tr> */}
                            <tr>
                              <td
                                align="left"
                                style={{
                                  padding: "10px",
                                  textAlign: "center !important",
                                }}
                              >
                                Deluxe Room ROOM ONLY{" "}
                              </td>
                              <td
                                align="center"
                                style={{ textAlign: "center !important" }}
                              >
                                1
                              </td>
                              <td width="100%">
                                <table width="100%">
                                  <tbody className="bg-white">
                                    <tr>
                                      <td
                                        align="center"
                                        className="para padd_5"
                                        style={{ borderBottom: "0px" }}
                                      >
                                        Day 1<br />
                                        <span style={{ color: "#d23600" }}>
                                          261.10
                                        </span>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                            {/* <tr>
                                                      <td colspan="5"height"1px"></td>
                                                  </tr> */}
                          </tbody>
                          <tbody className="bg-white"></tbody>
                        </table>
                        <table
                          width="100%"
                          cellPadding={2}
                          cellSpacing={1}
                          align="center"
                          border={0}
                          className="table  table-responsive table-box tableborder"
                        >
                          <tbody className="bg-white">
                            <tr className="phps_row_1">
                              <td width="25%">Supplier Rate</td>
                              <td width="25%">
                                783.300 EUR X 1.14734 = 898.711422 USD
                              </td>
                              <td width="25%">Supplier Discount Rate</td>
                              <td width="25%">EUR 0.000 </td>
                            </tr>
                            <tr></tr>
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </form>
        <Header2 title="BOOKING MODIFICATION" />
        <form>
          <div className="panel-body">
            <div className="row">
              <div className="form-group col-md-3">
                <label htmlFor="exampleInputEmail1">Check-in / Check-out</label>
                <div
                  className="input-daterange input-group date"
                  id="checkinOut"
                >
                  <Flatpickr
                    value={startDate}
                    onChange={(date) => setStartDate(date)}
                    options={{ dateFormat: "Y-m-d" }}
                  />

                  <span class="input-group-addon">to</span>
                  <Flatpickr
                    value={endDate}
                    onChange={(date) => setEndDate(date)}
                    options={{ dateFormat: "Y-m-d" }}
                  />
                  <span
                    className="input-group-addon"
                    id="checkTrashBtn"
                    onClick={handleTrashClick}
                  >
                    <i className="fa fa-trash" />
                  </span>
                </div>
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="exampleInputEmail1">Total Nights</label>
                <br />
                <MultiSelect
                  options={selDaysOptions}
                  isMulti
                  isSearchable
                  placeholder="- Select -"
                  noOptionsMessage={() => "No Options Found"}
                  className="custom-select"
                />
              </div>
            </div>
            <div className="form-group col-md-12 row mt-3">
              <h5>Room Type</h5>
            </div>
            <div className="form-group col-md-12 row">
              <div className="add_more_rooms">
                <div className="remove_room row">
                  <div
                    className="form-group col-md-3 rooms"
                    name="rooms"
                    id="rooms"
                  >
                    <MultiSelect
                      options={room_options}
                      isSearchable
                      isMulti
                      placeholder="Select Room"
                      className="custom-select"
                      noOptionsMessage={() => "No Options Found"}
                    />
                  </div>
                  <div
                    className="form-group col-md-3 numbr"
                    id="numbr"
                    name="numbr"
                  >
                    <MultiSelect
                      options={selDaysOptions}
                      isMulti
                      isSearchable
                      placeholder="- Select -"
                      noOptionsMessage={() => "No Options Found"}
                      className="custom-select"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <span
                      className="input-group-addon repeat"
                      style={{ cursor: "pointer" }}
                    >
                      <i className="fa fa-plus" />
                    </span>
                    <span
                      className="input-group-addon rmv"
                      style={{ cursor: "pointer" }}
                    >
                      <i className="fa fa-minus" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div className="form-group">
              <Link to={Constants.URLConstants.GOTOMODIFYBOOKING}>
                {" "}
                <button
                  className="btn btn-dark btn-sm"
                  type="button"
                  name="modify"
                  value="Go to Modify"
                  onclick="javascriptsearch_frm();"
                >
                  <i className="fa fa-share" />
                  &nbsp;Go to Modify
                </button>
              </Link>
              &nbsp;&nbsp;
              <button
                className="btn btn-outline-secondary btn-sm"
                type="button"
                name="cancel"
                value="Cancel"
                onclick="javascriptcallCancel();"
              >
                <i className="fa fa-times" />
                &nbsp;Cancel
              </button>
            </div>
          </div>
        </form>
        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n\n.hidden{\n  display: none;\n}\n.expand{\n  display: block;\n}\n\n",
          }}
        />
        {/* END */}`
      </div>
    </>
  );
};
export default ModifyBookingTable;
