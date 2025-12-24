import minus from "../../assets/images/minus_white_img.jpg";
import plus from "../../assets/images/plus_white_img.jpg";
import ratting from "../../assets/images/ratting.png";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";
import { add_options, salutations } from "../../constants/contants";
import MultiSelect from "../reactMultiSelect";

const SearchBookingTable = () => {
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
      <Header2 linkText1="Search Bookings" link1={"/"} />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item">
            <Link
              className="nav-link active"
              id="tabheading-tab"
              data-bs-toggle="tab"
              to="#tabheading"
              role="tab"
              aria-controls="tab1"
              aria-selected="true"
            >
              <i
                className="fa-solid fa-bed fa-sm"
                style={{ marginRight: "15px" }}
              />{" "}
              TD1129401
            </Link>
          </li>
        </ul>
        <form style={{ borderTop: "2px solid #FF5015" }}>
          <ul className="nav nav-tabs blueliner" id="myTab" role="tablist">
            <li className="nav-item">
              <Link
                className="nav-link active"
                id="tab1-tab"
                data-bs-toggle="tab"
                to="#tab1"
                role="tab"
                aria-controls="tab1"
                aria-selected="true"
              >
                Booking Details
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                id="tab2-tab"
                data-bs-toggle="tab"
                to="#tab2"
                role="tab"
                aria-controls="tab2"
                aria-selected="false"
              >
                Compose Message
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                id="tab3-tab"
                data-bs-toggle="tab"
                to="#tab3"
                role="tab"
                aria-controls="tab3"
                aria-selected="false"
              >
                Conversation
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                id="tab4-tab"
                data-bs-toggle="tab"
                to="#tab4"
                role="tab"
                aria-controls="tab4"
                aria-selected="false"
              >
                Note
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                id="tab5-tab"
                data-bs-toggle="tab"
                to="#tab5"
                role="tab"
                aria-controls="tab5"
                aria-selected="false"
              >
                Logs{" "}
              </Link>
            </li>
          </ul>
          <style
            dangerouslySetInnerHTML={{
              __html:
                "\n.blueliner{\nborder-bottom: 2px solid #FF5015!important;\n}\n",
            }}
          />

          {/* Tab Content */}
          <div className="tab-content" id="myTabContent">
            {/* Tab 1 Content */}
            <div
              className="tab-pane fade show active"
              id="tab1"
              role="tabpanel"
              aria-labelledby="tab1-tab"
            >
              <div className="row">
                <div className="form-group col-md-2">
                  <button className="btn btn-outline-secondary btn-sm openAllTab">
                    Expand All
                  </button>
                </div>
                <div
                  className="form-group col-md-10"
                  style={{ textAlign: "right" }}
                >
                  <div className="btn-group bookingOps" role="group">
                    <Link
                      className="btn btn-dark btn-sm"
                      to={Constants.URLConstants.BOOKINGSTABLEPAGEPRINTVOUCHER}
                      target="blank"
                    >
                      Print Voucher
                    </Link>
                    {/* code added by rakesh 10-10-2012 */}
                    <Link
                      className="btn btn-dark btn-sm"
                      to={Constants.URLConstants.BOOKINGSTABLEPAGEPRINTINVOICE}
                      target="blank"
                    >
                      Print Invoice
                    </Link>
                    {/* code modoifed by himanshu for GT-949 on 2-1-2014*/}
                    <Link
                      className="btn btn-dark btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#addhotel"
                      style={{ cursor: "hand" }}
                    >
                      Add Hotel Confirmation #
                    </Link>
                    <Link
                      className="btn btn-dark btn-sm"
                      to={Constants.URLConstants.BOOKINGSMODIFYTABLEPAGE}
                    >
                      Modify
                    </Link>
                    <Link className="btn btn-dark btn-sm">
                      <div data-bs-toggle="modal" data-bs-target="#cancelModal">
                        Cancel
                      </div>
                    </Link>
                    <Link
                      className="btn btn-dark btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#statusModal"
                    >
                      {" "}
                      Status History{" "}
                    </Link>
                    <Link
                      className="btn btn-dark btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#supplierinfoModal"
                    >
                      Supplier Info
                    </Link>
                    <Link
                      className="btn btn-dark btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#bookinghistoryModal"
                      title="Click to View Booking History"
                    >
                      Booking History
                    </Link>
                    <Link
                      className="btn btn-dark btn-sm"
                      to={Constants.URLConstants.BOOKINGSVIEWBOOKING}
                      target="_blank"
                    >
                      Print Details
                    </Link>
                    <Link
                      className="btn btn-dark btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#hotelsearchlogModal"
                      id="hotelSearchLogButton"
                    >
                      Hotel Search log
                    </Link>
                    {/*[start] code add by Virendra 17_08_2016  */}
                    {/*[end] code add by Virendra 17_08_2016  */}
                  </div>
                </div>
              </div>
              <div className="row" style={{ clear: "both" }}>
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
                                  <td
                                    colSpan={3}
                                    className="table-right-no-margin"
                                  >
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
                                    <strong>
                                      Deluxe Room [2 adults 0 Child]{" "}
                                    </strong>
                                    <br />
                                    Free cancellation up to 02:57:00 on 9th of
                                    September 2023 <br />
                                    If you cancel after 02:58:00 on 9th of
                                    September 2023 you will be charged USD
                                    370.27
                                    <hr />
                                    <br />
                                    <br />
                                    <strong>
                                      Deluxe Room [2 adults 0 Child]
                                    </strong>
                                    <br />
                                    Free cancellation up to 02:57:00 on 9th of
                                    September 2023 <br />
                                    If you cancel after 02:58:00 on 9th of
                                    September 2023 you will be charged USD
                                    370.27
                                    <hr />
                                    <br />
                                    <br />
                                    <strong>
                                      Deluxe Room [2 adults 0 Child]
                                    </strong>
                                    <br />
                                    Free cancellation up to 02:57:00 on 9th of
                                    September 2023 <br />
                                    If you cancel after 02:58:00 on 9th of
                                    September 2023 you will be charged USD
                                    370.27
                                  </td>
                                </tr>
                                {/*  4/6/2013 changed by vrushali */}
                                <tr className="phps_row_1">
                                  <td valign="top" width="25%">
                                    Contract Comment
                                  </td>
                                  <td colSpan={3} width="75%">
                                    {" "}
                                    Deluxe Room ROOM ONLY:For all rooms, a
                                    maximum of 1 child below 12 years old can
                                    stay free of charge when using existing
                                    bedding.. Estimated total amount of taxes
                                    &amp; fees for this booking:20.00 Utd. Arab
                                    Emir. Dirham payable on arrival. Check-in
                                    hour 15:00-00:00.Car park YES (With
                                    additional debit notes).Deluxe Room ROOM
                                    ONLY:For all rooms, a maximum of 1 child
                                    below 12 years old can stay free of charge
                                    when using existing bedding.. Estimated
                                    total amount of taxes &amp; fees for this
                                    booking:20.00 Utd. Arab Emir. Dirham payable
                                    on arrival. Check-in hour 15:00-00:00.Car
                                    park YES (With additional debit
                                    notes).Deluxe Room ROOM ONLY:For all rooms,
                                    a maximum of 1 child below 12 years old can
                                    stay free of charge when using existing
                                    bedding.. Estimated total amount of taxes
                                    &amp; fees for this booking:20.00 Utd. Arab
                                    Emir. Dirham payable on arrival. Check-in
                                    hour 15:00-00:00.Car park YES (With
                                    additional debit notes).
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
                                    __html:
                                      "\n.subHeader td{\ncolor: #fff;\n}\n",
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
                                                          data-original-index={
                                                            0
                                                          }
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
                                                        <li
                                                          data-original-index={
                                                            1
                                                          }
                                                        >
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
                                                        <li
                                                          data-original-index={
                                                            2
                                                          }
                                                        >
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
                                                        <li
                                                          data-original-index={
                                                            3
                                                          }
                                                        >
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
                                                        <li
                                                          data-original-index={
                                                            4
                                                          }
                                                        >
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
                                                        <li
                                                          data-original-index={
                                                            5
                                                          }
                                                        >
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
                                                    className="custom-select "
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
                                                          data-original-index={
                                                            0
                                                          }
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
                                                        <li
                                                          data-original-index={
                                                            1
                                                          }
                                                        >
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
                                                        <li
                                                          data-original-index={
                                                            2
                                                          }
                                                        >
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
                                                        <li
                                                          data-original-index={
                                                            3
                                                          }
                                                        >
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
                                                        <li
                                                          data-original-index={
                                                            4
                                                          }
                                                        >
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
                                                        <li
                                                          data-original-index={
                                                            5
                                                          }
                                                        >
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
                                                    className="custom-select "
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
                                                          data-original-index={
                                                            0
                                                          }
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
                                                        <li
                                                          data-original-index={
                                                            1
                                                          }
                                                        >
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
                                                        <li
                                                          data-original-index={
                                                            2
                                                          }
                                                        >
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
                                                        <li
                                                          data-original-index={
                                                            3
                                                          }
                                                        >
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
                                                        <li
                                                          data-original-index={
                                                            4
                                                          }
                                                        >
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
                                                        <li
                                                          data-original-index={
                                                            5
                                                          }
                                                        >
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
                                                    className="custom-select "
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
                                                          data-original-index={
                                                            0
                                                          }
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
                                                        <li
                                                          data-original-index={
                                                            1
                                                          }
                                                        >
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
                                                        <li
                                                          data-original-index={
                                                            2
                                                          }
                                                        >
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
                                                        <li
                                                          data-original-index={
                                                            3
                                                          }
                                                        >
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
                                                        <li
                                                          data-original-index={
                                                            4
                                                          }
                                                        >
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
                                                        <li
                                                          data-original-index={
                                                            5
                                                          }
                                                        >
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
                                                    className="custom-select "
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
                                                          data-original-index={
                                                            0
                                                          }
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
                                                        <li
                                                          data-original-index={
                                                            1
                                                          }
                                                        >
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
                                                        <li
                                                          data-original-index={
                                                            2
                                                          }
                                                        >
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
                                                        <li
                                                          data-original-index={
                                                            3
                                                          }
                                                        >
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
                                                        <li
                                                          data-original-index={
                                                            4
                                                          }
                                                        >
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
                                                        <li
                                                          data-original-index={
                                                            5
                                                          }
                                                        >
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
                                                    className="custom-select "
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
                                                          data-original-index={
                                                            0
                                                          }
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
                                                        <li
                                                          data-original-index={
                                                            1
                                                          }
                                                        >
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
                                                        <li
                                                          data-original-index={
                                                            2
                                                          }
                                                        >
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
                                                        <li
                                                          data-original-index={
                                                            3
                                                          }
                                                        >
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
                                                        <li
                                                          data-original-index={
                                                            4
                                                          }
                                                        >
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
                                                        <li
                                                          data-original-index={
                                                            5
                                                          }
                                                        >
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
                                      <select
                                        id="sales_manager_29401"
                                        name="sales_manager"
                                        className="selectpicker form-control show-menu-arrow bs-select-hidden"
                                        data-live-search="true"
                                      >
                                        <option value>Select Manager</option>
                                        <option
                                          label="rohan  vartak:v3otramslive"
                                          value="v3otramslive"
                                        >
                                          rohan vartak:v3otramslive
                                        </option>
                                        <option
                                          label="aniket  shewale:Aniket"
                                          value="Aniket"
                                        >
                                          aniket shewale:Aniket
                                        </option>
                                        <option
                                          label="aniket  shewale:aniket"
                                          value="aniket"
                                        >
                                          aniket shewale:aniket
                                        </option>
                                        <option
                                          label="sukanya  wagh:kishore"
                                          value="kishore"
                                        >
                                          sukanya wagh:kishore
                                        </option>
                                        <option
                                          label="hemangi  :hemangi"
                                          value="hemangi"
                                        >
                                          hemangi :hemangi
                                        </option>
                                        <option
                                          label="Local supplier  :localsupplier"
                                          value="localsupplier"
                                        >
                                          Local supplier :localsupplier
                                        </option>
                                        <option
                                          label="ITC Sheraton Chains  :Madhura"
                                          value="Madhura"
                                        >
                                          ITC Sheraton Chains :Madhura
                                        </option>
                                        <option
                                          label="hemangi  sawant:hemangi15"
                                          value="hemangi15"
                                        >
                                          hemangi sawant:hemangi15
                                        </option>
                                        <option
                                          label="nitin kumar jain:nitin"
                                          value="nitin"
                                        >
                                          nitin kumar jain:nitin
                                        </option>
                                        <option
                                          label="NITIN  nitin:Paresh"
                                          value="Paresh"
                                        >
                                          NITIN nitin:Paresh
                                        </option>
                                        <option
                                          label="Kishore kashyap Kashyap:kishorek"
                                          value="kishorek"
                                        >
                                          Kishore kashyap Kashyap:kishorek
                                        </option>
                                        <option
                                          label="Swarali test local supplier  :Swarali"
                                          value="Swarali"
                                        >
                                          Swarali test local supplier :Swarali
                                        </option>
                                        <option
                                          label="Swarali Demo Supplier  :Swaralidemo"
                                          value="Swaralidemo"
                                        >
                                          Swarali Demo Supplier :Swaralidemo
                                        </option>
                                        <option
                                          label="Sonam  Tripathi:v3_otrams_wh"
                                          value="v3_otrams_wh"
                                        >
                                          Sonam Tripathi:v3_otrams_wh
                                        </option>
                                        <option
                                          label="shivraj  shivraj:shivraj"
                                          value="shivraj"
                                        >
                                          shivraj shivraj:shivraj
                                        </option>
                                        <option
                                          label="testsupplier  :sanjoli"
                                          value="sanjoli"
                                        >
                                          testsupplier :sanjoli
                                        </option>
                                        <option
                                          label="Demo supplier  :demosupplier"
                                          value="demosupplier"
                                        >
                                          Demo supplier :demosupplier
                                        </option>
                                        <option
                                          label="simple  singh:simple"
                                          value="simple"
                                        >
                                          simple singh:simple
                                        </option>
                                        <option
                                          label="simple  singh:simplee"
                                          value="simplee"
                                        >
                                          simple singh:simplee
                                        </option>
                                        <option
                                          label="ananya  :ananya"
                                          value="ananya"
                                        >
                                          ananya :ananya
                                        </option>
                                        <option
                                          label="ananya1  :ananya1"
                                          value="ananya1"
                                        >
                                          ananya1 :ananya1
                                        </option>
                                        <option
                                          label="OtramsA  DemoA:otramsdemo1"
                                          value="otramsdemo1"
                                        >
                                          OtramsA DemoA:otramsdemo1
                                        </option>
                                        <option
                                          label="OtamsB  DemoB:otramsdemo2"
                                          value="otramsdemo2"
                                        >
                                          OtamsB DemoB:otramsdemo2
                                        </option>
                                        <option
                                          label="OtamsC  DemoC:otramsdemo29"
                                          value="otramsdemo29"
                                        >
                                          OtamsC DemoC:otramsdemo29
                                        </option>
                                        <option
                                          label="Swarali  Demo:otrams_syria"
                                          value="otrams_syria"
                                        >
                                          Swarali Demo:otrams_syria
                                        </option>
                                        <option
                                          label="OtramsE  DemoE:otramsdemo9"
                                          value="otramsdemo9"
                                        >
                                          OtramsE DemoE:otramsdemo9
                                        </option>
                                        <option
                                          label="jayesh  :jayesh"
                                          value="jayesh"
                                        >
                                          jayesh :jayesh
                                        </option>
                                        <option
                                          label="XmlOut_Supplier  :XmlOutSupplier"
                                          value="XmlOutSupplier"
                                        >
                                          XmlOut_Supplier :XmlOutSupplier
                                        </option>
                                        <option
                                          label="SaideepDemoALR  :DemoALR"
                                          value="DemoALR"
                                        >
                                          SaideepDemoALR :DemoALR
                                        </option>
                                        <option
                                          label="OtramsDemoA  DemoOtramsA:OtramsDemo11"
                                          value="OtramsDemo11"
                                        >
                                          OtramsDemoA DemoOtramsA:OtramsDemo11
                                        </option>
                                        <option
                                          label="OtramsF  DemF:OtramsDemo23"
                                          value="OtramsDemo23"
                                        >
                                          OtramsF DemF:OtramsDemo23
                                        </option>
                                        <option
                                          label="swaralisales  swaralisales:swaralisales"
                                          value="swaralisales"
                                        >
                                          swaralisales swaralisales:swaralisales
                                        </option>
                                        <option
                                          label="swaralisales  swaralisales:Swaralisalesdemo"
                                          value="Swaralisalesdemo"
                                        >
                                          swaralisales
                                          swaralisales:Swaralisalesdemo
                                        </option>
                                        <option
                                          label="ankita  rao:ankita"
                                          value="ankita"
                                        >
                                          ankita rao:ankita
                                        </option>
                                        <option
                                          label="OtramsDemo  KW:otramsdemokw"
                                          value="otramsdemokw"
                                        >
                                          OtramsDemo KW:otramsdemokw
                                        </option>
                                        <option
                                          label="Neeraj  yadav:neeraj"
                                          value="neeraj"
                                        >
                                          Neeraj yadav:neeraj
                                        </option>
                                        <option
                                          label="PrpductTest  :PrpductTest"
                                          value="PrpductTest"
                                        >
                                          PrpductTest :PrpductTest
                                        </option>
                                        <option
                                          label="Madhuri  Pawar:Madhuri"
                                          value="Madhuri"
                                        >
                                          Madhuri Pawar:Madhuri
                                        </option>
                                        <option
                                          label="swaraliastra  :astratesting"
                                          value="astratesting"
                                        >
                                          swaraliastra :astratesting
                                        </option>
                                        <option
                                          label="simple  :simply"
                                          value="simply"
                                        >
                                          simple :simply
                                        </option>
                                        <option
                                          label="omi_supplier  :omisupplier"
                                          value="omisupplier"
                                        >
                                          omi_supplier :omisupplier
                                        </option>
                                        <option
                                          label="Redapple  Redapple:Redapple"
                                          value="Redapple"
                                        >
                                          Redapple Redapple:Redapple
                                        </option>
                                        <option
                                          label="TestratgBALI  :mutiara"
                                          value="mutiara"
                                        >
                                          TestratgBALI :mutiara
                                        </option>
                                        <option
                                          label="Watergate Hotel Co.Ltd  :Centara"
                                          value="Centara"
                                        >
                                          Watergate Hotel Co.Ltd :Centara
                                        </option>
                                        <option
                                          label="ankitest123  :ankita123"
                                          value="ankita123"
                                        >
                                          ankitest123 :ankita123
                                        </option>
                                        <option
                                          label="Trainingsupplier  :swaralitraining"
                                          value="swaralitraining"
                                        >
                                          Trainingsupplier :swaralitraining
                                        </option>
                                        <option
                                          label="Transfer training supplier  :swaralitransfer"
                                          value="swaralitransfer"
                                        >
                                          Transfer training supplier
                                          :swaralitransfer
                                        </option>
                                        <option
                                          label="training tour supplier  :swaralitour"
                                          value="swaralitour"
                                        >
                                          training tour supplier :swaralitour
                                        </option>
                                        <option
                                          label="Mansi_test  :mansitest8"
                                          value="mansitest8"
                                        >
                                          Mansi_test :mansitest8
                                        </option>
                                        <option
                                          label="Ryan  RPH:ryanrph"
                                          value="ryanrph"
                                        >
                                          Ryan RPH:ryanrph
                                        </option>
                                        <option
                                          label="Jatin Test  :Jatinsup"
                                          value="Jatinsup"
                                        >
                                          Jatin Test :Jatinsup
                                        </option>
                                        <option
                                          label="test_ankita  :test_ankita"
                                          value="test_ankita"
                                        >
                                          test_ankita :test_ankita
                                        </option>
                                        <option
                                          label="Priyanka_supplier  :otrams"
                                          value="otrams"
                                        >
                                          Priyanka_supplier :otrams
                                        </option>
                                        <option
                                          label="santosh_test  :santosh_test"
                                          value="santosh_test"
                                        >
                                          santosh_test :santosh_test
                                        </option>
                                        <option
                                          label="V  Demo:v4,demo"
                                          value="v4,demo"
                                        >
                                          V Demo:v4,demo
                                        </option>
                                        <option
                                          label="Demo  BigBen:v4demo"
                                          value="v4demo"
                                        >
                                          Demo BigBen:v4demo
                                        </option>
                                        <option
                                          label="Arshad  :arshad"
                                          value="arshad"
                                        >
                                          Arshad :arshad
                                        </option>
                                        <option
                                          label="Paresh Kanti Parihar:hawallyparesh"
                                          value="hawallyparesh"
                                        >
                                          Paresh Kanti Parihar:hawallyparesh
                                        </option>
                                        <option
                                          label="Mazhar Testing  :mazhar"
                                          value="mazhar"
                                        >
                                          Mazhar Testing :mazhar
                                        </option>
                                        <option
                                          label="PP_test_Supplier  :pp_testt"
                                          value="pp_testt"
                                        >
                                          PP_test_Supplier :pp_testt
                                        </option>
                                        <option
                                          label="Neeraj  :neeraj123"
                                          value="neeraj123"
                                        >
                                          Neeraj :neeraj123
                                        </option>
                                        <option
                                          label="HotelsproLiquid  :HotelsproLiquid"
                                          value="HotelsproLiquid"
                                        >
                                          HotelsproLiquid :HotelsproLiquid
                                        </option>
                                        <option
                                          label="allwin-qtech  :allwin"
                                          value="allwin"
                                        >
                                          allwin-qtech :allwin
                                        </option>
                                        <option
                                          label="asmita  test:asmita"
                                          value="asmita"
                                        >
                                          asmita test:asmita
                                        </option>
                                        <option
                                          label="Mansi_test  :mansisupplier"
                                          value="mansisupplier"
                                        >
                                          Mansi_test :mansisupplier
                                        </option>
                                        <option
                                          label="suhassup  :suhassup"
                                          value="suhassup"
                                        >
                                          suhassup :suhassup
                                        </option>
                                        <option
                                          label="suhas mohan patil:bi_testing"
                                          value="bi_testing"
                                        >
                                          suhas mohan patil:bi_testing
                                        </option>
                                        <option
                                          label="samikshasupplier  :samikshasupplier"
                                          value="samikshasupplier"
                                        >
                                          samikshasupplier :samikshasupplier
                                        </option>
                                        <option
                                          label="Delhi Supp  :delhi"
                                          value="delhi"
                                        >
                                          Delhi Supp :delhi
                                        </option>
                                        <option
                                          label="HotelRunner  :HotelRunner"
                                          value="HotelRunner"
                                        >
                                          HotelRunner :HotelRunner
                                        </option>
                                        <option
                                          label="Tax supplier  :minal"
                                          value="minal"
                                        >
                                          Tax supplier :minal
                                        </option>
                                        <option
                                          label="Turkan  :turkan"
                                          value="turkan"
                                        >
                                          Turkan :turkan
                                        </option>
                                        <option
                                          label="Test Supplier  :prachi"
                                          value="prachi"
                                        >
                                          Test Supplier :prachi
                                        </option>
                                        <option
                                          label="Eros  :Eroskenya"
                                          value="Eroskenya"
                                        >
                                          Eros :Eroskenya
                                        </option>
                                        <option
                                          label="IBIS Seef  :IBISseef"
                                          value="IBISseef"
                                        >
                                          IBIS Seef :IBISseef
                                        </option>
                                        <option
                                          label="Hotel  Confirm:hotelconfirm"
                                          value="hotelconfirm"
                                        >
                                          Hotel Confirm:hotelconfirm
                                        </option>
                                        <option
                                          label="hotelconfirm  Live:hotelconfirm_live"
                                          value="hotelconfirm_live"
                                        >
                                          hotelconfirm Live:hotelconfirm_live
                                        </option>
                                        <option
                                          label="R Supplier  :Test"
                                          value="Test"
                                        >
                                          R Supplier :Test
                                        </option>
                                        <option
                                          label="NR Supplier  :NRTest"
                                          value="NRTest"
                                        >
                                          NR Supplier :NRTest
                                        </option>
                                        <option
                                          label="Vat_Test_Supplier  :demo@1234"
                                          value="demo@1234"
                                        >
                                          Vat_Test_Supplier :demo@1234
                                        </option>
                                        <option
                                          label="vaibhav  test:svss"
                                          value="svss"
                                        >
                                          vaibhav test:svss
                                        </option>
                                        <option
                                          label="ChkSupplier  :transferSupplier"
                                          value="transferSupplier"
                                        >
                                          ChkSupplier :transferSupplier
                                        </option>
                                        <option label="GSA  WL:gsa" value="gsa">
                                          GSA WL:gsa
                                        </option>
                                        <option
                                          label="Ahmed  Khan:hconfirm"
                                          value="hconfirm"
                                        >
                                          Ahmed Khan:hconfirm
                                        </option>
                                        <option
                                          label="packageSupplier  :packageSupplier"
                                          value="packageSupplier"
                                        >
                                          packageSupplier :packageSupplier
                                        </option>
                                        <option
                                          label="tdo  whitelabel:wl_tdo"
                                          value="wl_tdo"
                                        >
                                          tdo whitelabel:wl_tdo
                                        </option>
                                        <option
                                          label="RADISSON BLU HOTEL  :radissonblue"
                                          value="radissonblue"
                                        >
                                          RADISSON BLU HOTEL :radissonblue
                                        </option>
                                        <option
                                          label="nidaSupplier  :nidaSupplier"
                                          value="nidaSupplier"
                                        >
                                          nidaSupplier :nidaSupplier
                                        </option>
                                        <option
                                          label="samikshasam  :samikshasami"
                                          value="samikshasami"
                                        >
                                          samikshasam :samikshasami
                                        </option>
                                        <option
                                          label="nidaSupplier2  :nidaSupplier2"
                                          value="nidaSupplier2"
                                        >
                                          nidaSupplier2 :nidaSupplier2
                                        </option>
                                        <option
                                          label="Sayalione  :Sayalione"
                                          value="Sayalione"
                                        >
                                          Sayalione :Sayalione
                                        </option>
                                        <option
                                          label="Sayalitwo  :Sayalitwo"
                                          value="Sayalitwo"
                                        >
                                          Sayalitwo :Sayalitwo
                                        </option>
                                        <option
                                          label="Sayalithree  :Sayalithree"
                                          value="Sayalithree"
                                        >
                                          Sayalithree :Sayalithree
                                        </option>
                                        <option
                                          label="Sup1  :Sup1"
                                          value="Sup1"
                                        >
                                          Sup1 :Sup1
                                        </option>
                                        <option
                                          label="Sup2  :Sup2"
                                          value="Sup2"
                                        >
                                          Sup2 :Sup2
                                        </option>
                                        <option
                                          label="Suppliersone  :Supplier1"
                                          value="Supplier1"
                                        >
                                          Suppliersone :Supplier1
                                        </option>
                                        <option
                                          label="suppliertwo  :Suppliertwo"
                                          value="Suppliertwo"
                                        >
                                          suppliertwo :Suppliertwo
                                        </option>
                                        <option
                                          label="Qtech  :Qtech"
                                          value="Qtech"
                                        >
                                          Qtech :Qtech
                                        </option>
                                        <option
                                          label="Astraone  :Astraone"
                                          value="Astraone"
                                        >
                                          Astraone :Astraone
                                        </option>
                                        <option
                                          label="Astratwo  :Astratwo"
                                          value="Astratwo"
                                        >
                                          Astratwo :Astratwo
                                        </option>
                                        <option
                                          label="Plierone  :Plierone"
                                          value="Plierone"
                                        >
                                          Plierone :Plierone
                                        </option>
                                        <option
                                          label="Pliertwo  :Pliertwo"
                                          value="Pliertwo"
                                        >
                                          Pliertwo :Pliertwo
                                        </option>
                                        <option
                                          label="Plierthree  :Plierthree"
                                          value="Plierthree"
                                        >
                                          Plierthree :Plierthree
                                        </option>
                                        <option
                                          label="Sayali_Supp  :SayaliSup"
                                          value="SayaliSup"
                                        >
                                          Sayali_Supp :SayaliSup
                                        </option>
                                        <option
                                          label="Testingsupplier  :testing"
                                          value="testing"
                                        >
                                          Testingsupplier :testing
                                        </option>
                                        <option
                                          label="SayaSupp  :SayaSupp"
                                          value="SayaSupp"
                                        >
                                          SayaSupp :SayaSupp
                                        </option>
                                        <option
                                          label="Emaar Test  :emaar"
                                          value="emaar"
                                        >
                                          Emaar Test :emaar
                                        </option>
                                        <option
                                          label="Saya_SUPPLIER  :Sayali_SUPP"
                                          value="Sayali_SUPP"
                                        >
                                          Saya_SUPPLIER :Sayali_SUPP
                                        </option>
                                        <option
                                          label="expressentry  :expressentry"
                                          value="expressentry"
                                        >
                                          expressentry :expressentry
                                        </option>
                                        <option
                                          label="Al Expedia  :abcde"
                                          value="abcde"
                                        >
                                          Al Expedia :abcde
                                        </option>
                                        <option
                                          label="FlyronSupplier  :Flyron"
                                          value="Flyron"
                                        >
                                          FlyronSupplier :Flyron
                                        </option>
                                        <option
                                          label="sayalisupplier  :Sayali"
                                          value="Sayali"
                                        >
                                          sayalisupplier :Sayali
                                        </option>
                                        <option
                                          label="Sayali_Qtech  :Sayali_Test"
                                          value="Sayali_Test"
                                        >
                                          Sayali_Qtech :Sayali_Test
                                        </option>
                                        <option
                                          label="supplierPackage  :supplierPackage"
                                          value="supplierPackage"
                                        >
                                          supplierPackage :supplierPackage
                                        </option>
                                        <option
                                          label="SayuSupplier  :Sayu"
                                          value="Sayu"
                                        >
                                          SayuSupplier :Sayu
                                        </option>
                                        <option
                                          label="Sayali_Check_API  :Syali"
                                          value="Syali"
                                        >
                                          Sayali_Check_API :Syali
                                        </option>
                                        <option
                                          label="qtech  test:Moreshwar_Test"
                                          value="Moreshwar_Test"
                                        >
                                          qtech test:Moreshwar_Test
                                        </option>
                                        <option
                                          label="offline.supplier.mum  :offline.supplier.mum"
                                          value="offline.supplier.mum"
                                        >
                                          offline.supplier.mum
                                          :offline.supplier.mum
                                        </option>
                                        <option
                                          label="World Avenue  :world_avenue"
                                          value="world_avenue"
                                        >
                                          World Avenue :world_avenue
                                        </option>
                                        <option
                                          label="sssss  ppppp:Saya_test"
                                          value="Saya_test"
                                        >
                                          sssss ppppp:Saya_test
                                        </option>
                                        <option
                                          label="NEW J-Venture Sup  :world_avenue_new"
                                          value="world_avenue_new"
                                        >
                                          NEW J-Venture Sup :world_avenue_new
                                        </option>
                                        <option
                                          label="Sujay  Raut:Sujay_test"
                                          value="Sujay_test"
                                        >
                                          Sujay Raut:Sujay_test
                                        </option>
                                        <option
                                          label="Sujay  Raut:TEST_JV"
                                          value="TEST_JV"
                                        >
                                          Sujay Raut:TEST_JV
                                        </option>
                                        <option
                                          label="Sujay  Raut:TEST_JV_C"
                                          value="TEST_JV_C"
                                        >
                                          Sujay Raut:TEST_JV_C
                                        </option>
                                        <option
                                          label="Sujay  Raut:TEST_JV_A"
                                          value="TEST_JV_A"
                                        >
                                          Sujay Raut:TEST_JV_A
                                        </option>
                                        <option
                                          label="JV Hotel 1  :test_JV_H"
                                          value="test_JV_H"
                                        >
                                          JV Hotel 1 :test_JV_H
                                        </option>
                                        <option
                                          label="world  avenue:worldavennuejv"
                                          value="worldavennuejv"
                                        >
                                          world avenue:worldavennuejv
                                        </option>
                                        <option
                                          label="Qtech  Test:Beta_Tdo"
                                          value="Beta_Tdo"
                                        >
                                          Qtech Test:Beta_Tdo
                                        </option>
                                        <option
                                          label="Equatorial Plaza  :Eqkul"
                                          value="Eqkul"
                                        >
                                          Equatorial Plaza :Eqkul
                                        </option>
                                        <option
                                          label="Srinivas  Pogula:Worldavenue"
                                          value="Worldavenue"
                                        >
                                          Srinivas Pogula:Worldavenue
                                        </option>
                                        <option
                                          label="Agent  Test:Agent_test"
                                          value="Agent_test"
                                        >
                                          Agent Test:Agent_test
                                        </option>
                                        <option
                                          label="Agent  Test:Agent_Test_JV"
                                          value="Agent_Test_JV"
                                        >
                                          Agent Test:Agent_Test_JV
                                        </option>
                                        <option
                                          label="joint  venture:jv_demo"
                                          value="jv_demo"
                                        >
                                          joint venture:jv_demo
                                        </option>
                                        <option
                                          label="jb  demo:demo_jb"
                                          value="demo_jb"
                                        >
                                          jb demo:demo_jb
                                        </option>
                                        <option
                                          label="JB  Demo:jb_2"
                                          value="jb_2"
                                        >
                                          JB Demo:jb_2
                                        </option>
                                        <option
                                          label="test  jvv:test_jvv"
                                          value="test_jvv"
                                        >
                                          test jvv:test_jvv
                                        </option>
                                        <option
                                          label="jv  user:jv_user1"
                                          value="jv_user1"
                                        >
                                          jv user:jv_user1
                                        </option>
                                        <option
                                          label="Qtech  JointVenture:user_test"
                                          value="user_test"
                                        >
                                          Qtech JointVenture:user_test
                                        </option>
                                        <option
                                          label="Qtech  JointV:test_user"
                                          value="test_user"
                                        >
                                          Qtech JointV:test_user
                                        </option>
                                        <option
                                          label="Qtech  JointVent:test_user_JV"
                                          value="test_user_JV"
                                        >
                                          Qtech JointVent:test_user_JV
                                        </option>
                                        <option
                                          label="test  ron:test_ron1"
                                          value="test_ron1"
                                        >
                                          test ron:test_ron1
                                        </option>
                                        <option
                                          label="test  jv:test_jv111"
                                          value="test_jv111"
                                        >
                                          test jv:test_jv111
                                        </option>
                                        <option
                                          label="1bookin  Whitelabel:1booking_wh"
                                          value="1booking_wh"
                                        >
                                          1bookin Whitelabel:1booking_wh
                                        </option>
                                        <option
                                          label="Milind  Bhuwad:Milind_Qtech"
                                          value="Milind_Qtech"
                                        >
                                          Milind Bhuwad:Milind_Qtech
                                        </option>
                                      </select>
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
                                                  Kishore kashyap
                                                  Kashyap:kishorek
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
                                                  Swarali Demo Supplier
                                                  :Swaralidemo
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
                                                  XmlOut_Supplier
                                                  :XmlOutSupplier
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
                                                  Watergate Hotel Co.Ltd
                                                  :Centara
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
                                                  Trainingsupplier
                                                  :swaralitraining
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
                                                  Paresh Kanti
                                                  Parihar:hawallyparesh
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
                                                  HotelsproLiquid
                                                  :HotelsproLiquid
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
                                                  samikshasupplier
                                                  :samikshasupplier
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
                                                  packageSupplier
                                                  :packageSupplier
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
                                                  RADISSON BLU HOTEL
                                                  :radissonblue
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
                                                  supplierPackage
                                                  :supplierPackage
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
                                    __html:
                                      "\n.phps_header td{\ncolor: #fff;\n}\n",
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
                                  <td
                                    style={{ textAlign: "center !important" }}
                                  >
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
                                  <td
                                    style={{ textAlign: "center !important" }}
                                  >
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
                                  <td
                                    style={{ textAlign: "center !important" }}
                                  >
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
                                  <td
                                    width="25%"
                                    className="table-right-no-margin"
                                  >
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
            </div>
            {/* Tab 2 Content */}
            <div
              className="tab-pane fade"
              id="tab2"
              role="tabpanel"
              aria-labelledby="tab2-tab"
            >
              <div className="row">
                <div className="form-group col-md-9 col-sm-9 col-xs-8 phps_row_0">
                  <h5 style={{ fontSize: "14px" }}>
                    <b>To:</b>{" "}
                    <input
                      type="hidden"
                      name="rdReceiver"
                      defaultValue="A"
                      className="form-control"
                    />
                    Agent
                  </h5>
                </div>
                <div className="form-group col-md-9 phps_row_1">
                  <label>Subject: </label>
                  <input
                    type="text"
                    id="txt_msg_subject29401"
                    name="txt_msg_subject"
                    size={45}
                    maxLength={255}
                    className="form-control form-control-sm required"
                  />
                </div>
                <div className="col-md-9 form-group">
                  <label>Message: </label>
                  {/* <div class="summernote required" id="txtar_msg29401" name="txtar_msg"> 
					</div> */}
                  <textarea
                    id="txtar_msg29401"
                    className="form-control form-control-sm required"
                    name="txtar_msg"
                    rows={5}
                    cols={80}
                    defaultValue={""}
                  />
                </div>
                <div
                  className="form-group col-md-9 phps_row_0"
                  style={{ display: "none" }}
                >
                  <label>Branch: </label>
                  <MultiSelect
                    options={add_options}
                    isMulti
                    isSearchable
                    placeholder="- Select Branch -"
                    noOptionsMessage={() => "No Branch Found"}
                    className="custom-select "
                  />
                  <div className="btn-group bootstrap-select required form-control show-menu-arrow">
                    <button
                      type="button"
                      className="btn dropdown-toggle btn-default"
                      data-toggle="dropdown"
                      data-id="branch29401"
                      title="Mumbai Branch"
                    >
                      <span className="filter-option pull-left">
                        Mumbai Branch
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
                      <ul className="dropdown-menu inner" role="menu">
                        <li data-original-index={0} className="selected">
                          <Link
                            tabIndex={0}
                            className
                            style={{}}
                            data-tokens="null"
                          >
                            <span className="text">Mumbai Branch</span>
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
                            <span className="text">UAE Branch</span>
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
                            <span className="text">UK Head Office</span>
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
                            <span className="text">Head Office</span>
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
                            <span className="text">Dubai GSA</span>
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
                            <span className="text">London Branch</span>
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
                            <span className="text">Saudi Branch</span>
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
                            <span className="text">Dubai V3 Wh</span>
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
                            <span className="text">Pune Branch</span>
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
                            <span className="text">India - GSA</span>
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
                            <span className="text">Test Branch1</span>
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
                            <span className="text">test</span>
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
                            <span className="text">Test Branch</span>
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
                            <span className="text">Testffff</span>
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
                            <span className="text">FRANCHISE BRANCH</span>
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
                            <span className="text">Jcholidays</span>
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
                            <span className="text">Demo</span>
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
                            <span className="text">malaysia</span>
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
                            <span className="text">GSA Iraq</span>
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
                            <span className="text">Chennai</span>
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
                            <span className="text">Bangkok Branch</span>
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
                            <span className="text">suhas_branch</span>
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
                            <span className="text">Istanbul</span>
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
                            <span className="text">hyderabad</span>
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
                            <span className="text">hyderabad_suhas</span>
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
                            <span className="text">branch_suhas</span>
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
                            <span className="text">New Joint Branch</span>
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
                            <span className="text">Bahrain Branch</span>
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
                            <span className="text">Branch Bahrain</span>
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
                            <span className="text">testdddd</span>
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
                            <span className="text">Demo</span>
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
                            <span className="text">HotelConfirm</span>
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
                            <span className="text">HotelConfirm_Live</span>
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
                            <span className="text">Demo_Test_Branch</span>
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
                            <span className="text">Demo Branch</span>
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
                            <span className="text">GSA Branch</span>
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
                            <span className="text">Testpp</span>
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
                            <span className="text">GTest </span>
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
                            <span className="text">WA_Malaysia</span>
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
                            <span className="text">Bolton Branch</span>
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
                            <span className="text">World Avenue</span>
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
                            <span className="text">TEST_BRANCH_A</span>
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
                            <span className="text">TEST_BRANCH_JV_A</span>
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
                            <span className="text">TEST_BRANCH_JV_C</span>
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
                            <span className="text">world_avenue_malesia</span>
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
                            <span className="text">World Avenues Malaysia</span>
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
                            <span className="text">test_branch_jv</span>
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
                            <span className="text">1 Booking</span>
                            <span className="glyphicon glyphicon-ok check-mark" />
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <input
                    type="hidden"
                    name="sel_booking"
                    id="booking29401"
                    defaultValue={29401}
                    className="form-control"
                  />
                </div>
                <div className="col-md-12">
                  <br />
                  <button
                    className="btn btn-dark btn-sm sectHeader"
                    name="b1"
                    id="b1"
                    type="button"
                    onclick="Javascript submit_form(document.forms['add_message_form29401'],'29401');"
                  >
                    <i className="fa fa-floppy-o" />
                    &nbsp;Submit
                  </button>
                  {/*<td colspan=2 align=center class="phps_header"><input type='button' name='b1' id="b1" value='SUBMIT'
						onclick="Javascript submit_form(document.forms['add_message_form29401'],'29401');"></td>*/}
                </div>
              </div>
            </div>
            {/* Tab 3 Content */}
            <div
              className="tab-pane fade"
              id="tab3"
              role="tabpanel"
              aria-labelledby="tab3-tab"
            >
              <div className="form-group col-md-6 text-danger">
                <h5
                  style={{
                    fontSize: "14px",
                    color: "var(--color-white) !important",
                  }}
                >
                  There is no Conversation.
                </h5>
              </div>
            </div>
            {/* Tab 4 Content */}
            <div
              className="tab-pane fade"
              id="tab4"
              role="tabpanel"
              aria-labelledby="tab4-tab"
            >
              <div className="row notes">
                <div className="form-group col-md-12 phps_header">
                  <h4 className="tblHeading">Operation Notes</h4>
                  <div className="row" style={{ marginLeft: "20px" }}>
                    <div className="col-md-12">
                      <div className="form-group col-md-12">
                        {/*<Link to="add_note.php?booking_id=29401&reservation_id=OT19421&url=" target="_blank">Add Note</Link>*/}
                        <Link to="BookingRemindersNew.html">
                          <button
                            type="button"
                            className="btn btn-dark btn-sm sectHeader"
                          >
                            <i className="fa fa-plus" />
                            &nbsp;Add note
                          </button>
                        </Link>
                      </div>
                      <div className=" form-group phps_row_1 mt-2">
                        <div className="text-danger">
                          <h5
                            style={{
                              fontSize: "14px",
                              color: "var(--color-white) !important",
                            }}
                          >
                            Nothing posted yet.
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row notes">
                <div className="form-group col-md-12 phps_header">
                  <h4 className="tblHeading">Notes Posted By Agents</h4>
                  <div className="row" style={{ marginLeft: "20px" }}>
                    <div className="col-md-12">
                      <div className="form-group col-md-12">
                        <div className="text-danger">
                          <h5
                            style={{
                              fontSize: "14px",
                              color: "var(--color-white) !important",
                            }}
                          >
                            Nothing posted yet.
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Tab 5 Content */}
            <div
              className="tab-pane fade"
              id="tab5"
              role="tabpanel"
              aria-labelledby="tab5-tab"
            >
              <div className="row">
                <div className="form-group col-md-12 phps_header">
                  <h5>XML Logs</h5>
                  <div className="row mt-4">
                    <div className="form-group col-md-3">
                      <label>
                        <Link
                          to="https://hotelconfirm.tdonlines.com/project_folder/tdonline_protected/supplier_logs/h1/28_07_2023/request_availability_wego_ws_10_23_35_1690539815_92_0.json"
                          target="_blank"
                        >
                          <strong>AVAILABILITY_REQUEST</strong>
                        </Link>
                      </label>
                      <div>
                        <Link
                          to="https://hotelconfirm.tdonlines.com/project_folder/tdonline_protected/supplier_logs/h1/28_07_2023/request_availability_wego_ws_10_23_35_1690539815_92_0.json"
                          target="_blank"
                          style={{
                            color: "#565759 !important",
                            textDecoration: "none",
                          }}
                        >
                          28-Jul-2023 15:53:35
                        </Link>
                      </div>
                    </div>
                    <div className="form-group col-md-3">
                      <label>
                        <Link
                          to="https://hotelconfirm.tdonlines.com/project_folder/tdonline_protected/supplier_logs/h1/28_07_2023/response_availability_wego_ws_10_23_35_1690539815_92_0.json"
                          target="_blank"
                        >
                          <strong>AVAILABILITY_RESPONSE</strong>
                        </Link>
                      </label>
                      <div>
                        <Link
                          to="https://hotelconfirm.tdonlines.com/project_folder/tdonline_protected/supplier_logs/h1/28_07_2023/response_availability_wego_ws_10_23_35_1690539815_92_0.json"
                          target="_blank"
                          style={{
                            color: "#565759 !important",
                            textDecoration: "none",
                          }}
                        >
                          28-Jul-2023 15:53:36
                        </Link>
                      </div>
                    </div>
                    <div className="form-group col-md-3">
                      <label>
                        <Link
                          to="https://hotelconfirm.tdonlines.com/project_folder/tdonline_protected/supplier_logs/h1/28_07_2023/request_valuation_wego_ws_10_24_52_1690539892_59.json"
                          target="_blank"
                        >
                          <strong>VALUATION_REQUEST</strong>
                        </Link>
                      </label>
                      <div>
                        <Link
                          to="https://hotelconfirm.tdonlines.com/project_folder/tdonline_protected/supplier_logs/h1/28_07_2023/request_valuation_wego_ws_10_24_52_1690539892_59.json"
                          target="_blank"
                          style={{
                            color: "#565759 !important",
                            textDecoration: "none",
                          }}
                        >
                          28-Jul-2023 15:54:52
                        </Link>
                      </div>
                    </div>
                    <div className="form-group col-md-3">
                      <label>
                        <Link
                          to="https://hotelconfirm.tdonlines.com/project_folder/tdonline_protected/supplier_logs/h1/28_07_2023/response_valuation_wego_ws_10_24_52_1690539892_59.json"
                          target="_blank"
                        >
                          <strong>VALUATION_RESPONSE</strong>
                        </Link>
                      </label>
                      <div>
                        <Link
                          to="https://hotelconfirm.tdonlines.com/project_folder/tdonline_protected/supplier_logs/h1/28_07_2023/response_valuation_wego_ws_10_24_52_1690539892_59.json"
                          target="_blank"
                          style={{
                            color: "#565759 !important",
                            textDecoration: "none",
                          }}
                        >
                          28-Jul-2023 15:54:52
                        </Link>
                      </div>
                    </div>
                    <div className="form-group col-md-3 mt-2">
                      <label>
                        <Link
                          to="https://hotelconfirm.tdonlines.com/project_folder/tdonline_protected/supplier_logs/h1/28_07_2023/request_reservation_wego_ws_19421_1690539950_1.json"
                          target="_blank"
                        >
                          <strong>RESERVATION_REQUEST</strong>
                        </Link>
                      </label>
                      <div>
                        <Link
                          to="https://hotelconfirm.tdonlines.com/project_folder/tdonline_protected/supplier_logs/h1/28_07_2023/request_reservation_wego_ws_19421_1690539950_1.json"
                          target="_blank"
                          style={{
                            color: "#565759 !important",
                            textDecoration: "none",
                          }}
                        >
                          28-Jul-2023 15:55:50
                        </Link>
                      </div>
                    </div>
                    <div className="form-group col-md-3 mt-2">
                      <label>
                        <Link
                          to="https://hotelconfirm.tdonlines.com/project_folder/tdonline_protected/supplier_logs/h1/28_07_2023/response_reservation_wego_ws_19421_1690539950_1.json"
                          target="_blank"
                        >
                          <strong>RESERVATION_RESPONSE</strong>
                        </Link>
                      </label>
                      <div>
                        <Link
                          to="https://hotelconfirm.tdonlines.com/project_folder/tdonline_protected/supplier_logs/h1/28_07_2023/response_reservation_wego_ws_19421_1690539950_1.json"
                          target="_blank"
                          style={{
                            color: "#565759 !important",
                            textDecoration: "none",
                          }}
                        >
                          28-Jul-2023 15:55:55
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="form-group mt-4">
                    <h5>Booking Amount Log</h5>
                  </div>
                  <div className="row mt-2">
                    <div className="form-group col-md-3">
                      <label>Booking ID</label>
                      <div>TD1129401</div>
                    </div>
                    <div className="form-group col-md-3">
                      <label>Booking Cost</label>
                      <div>1110.81</div>
                    </div>
                    <div className="form-group col-md-3">
                      <label>Amount Adjusted</label>
                      <div>4165.538</div>
                    </div>
                    <div className="form-group col-md-3">
                      <label>Receipt Allocation</label>
                      <br />
                      --
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-md-3">
                      <label>Balance</label>
                      <div>1110.81</div>
                    </div>
                    <div className="form-group col-md-3">
                      <label>Log Type</label>
                      <div>Add Invoice</div>
                    </div>
                    <div className="form-group col-md-2">
                      <label>Create Date</label>
                      <div>28-Jul-2023 15:37:55</div>
                    </div>
                  </div>
                  <div className="form-group mt-4">
                    <h5>VCC XML Logs</h5>
                  </div>
                  <div className="row mt-4">
                    <div className="form-group col-md-12 text-danger">
                      <h5
                        style={{
                          fontSize: "14px",
                          color: "var(--color-white) !important",
                        }}
                      >
                        No Logs available for this booking.
                      </h5>
                    </div>
                  </div>
                  <div className="form-group mt-4">
                    <h5>Web Service Logs</h5>
                  </div>
                  <div className="row mt-2">
                    <div className="form-group col-md-3">
                      <label style={{ textTransform: "uppercase" }}>
                        <Link
                          to="https://hotelconfirm.tdonlines.com/project_folder/tdonline_protected/supplier_logs/wslog/wego_ws/28_07_2023/request_hotel_search_wego_ws_10_23_37_1690539817_7097693.txt"
                          target="_blank"
                        >
                          <strong>hotel_search_request</strong>
                        </Link>
                      </label>
                      <div>
                        <Link
                          to="https://hotelconfirm.tdonlines.com/project_folder/tdonline_protected/supplier_logs/wslog/wego_ws/28_07_2023/request_hotel_search_wego_ws_10_23_37_1690539817_7097693.txt"
                          target="_blank"
                          style={{
                            color: "#565759 !important",
                            textDecoration: "none",
                          }}
                        >
                          28-Jul-2023 15:53:34
                        </Link>
                      </div>
                    </div>
                    <div className="form-group col-md-3">
                      <label style={{ textTransform: "uppercase" }}>
                        <Link
                          to="https://hotelconfirm.tdonlines.com/project_folder/tdonline_protected/supplier_logs/wslog/wego_ws/28_07_2023/response_hotel_search_wego_ws_10_23_37_1690539817_7097693.txt"
                          target="_blank"
                        >
                          <strong>hotel_search_response</strong>
                        </Link>
                      </label>
                      <div>
                        <Link
                          to="https://hotelconfirm.tdonlines.com/project_folder/tdonline_protected/supplier_logs/wslog/wego_ws/28_07_2023/response_hotel_search_wego_ws_10_23_37_1690539817_7097693.txt"
                          target="_blank"
                          style={{
                            color: "#565759 !important",
                            textDecoration: "none",
                          }}
                        >
                          31-Jul-2023 17:12:41
                        </Link>
                      </div>
                    </div>
                    <div className="form-group col-md-3">
                      <label style={{ textTransform: "uppercase" }}>
                        <Link
                          to="https://hotelconfirm.tdonlines.com/project_folder/tdonline_protected/supplier_logs/wslog/wego_ws/28_07_2023/request_hotel_cancellation_policy_wego_ws_10_24_52_1690539892_4_124798_0_0_2518424.txt"
                          target="_blank"
                        >
                          <strong>hotel_cancellation_policy_request</strong>
                        </Link>
                      </label>
                      <div>
                        <Link
                          to="https://hotelconfirm.tdonlines.com/project_folder/tdonline_protected/supplier_logs/wslog/wego_ws/28_07_2023/request_hotel_cancellation_policy_wego_ws_10_24_52_1690539892_4_124798_0_0_2518424.txt"
                          target="_blank"
                          style={{
                            color: "#565759 !important",
                            textDecoration: "none",
                          }}
                        >
                          28-Jul-2023 15:54:51
                        </Link>
                      </div>
                    </div>
                    <div className="form-group col-md-3">
                      <label style={{ textTransform: "uppercase" }}>
                        <Link
                          to="https://hotelconfirm.tdonlines.com/project_folder/tdonline_protected/supplier_logs/wslog/wego_ws/28_07_2023/response_hotel_cancellation_policy_wego_ws_10_24_52_1690539892_4_124798_0_0_2518424.txt"
                          target="_blank"
                        >
                          <strong>hotel_cancellation_policy_response</strong>
                        </Link>
                      </label>
                      <div>
                        <Link
                          to="https://hotelconfirm.tdonlines.com/project_folder/tdonline_protected/supplier_logs/wslog/wego_ws/28_07_2023/response_hotel_cancellation_policy_wego_ws_10_24_52_1690539892_4_124798_0_0_2518424.txt"
                          target="_blank"
                          style={{
                            color: "#565759 !important",
                            textDecoration: "none",
                          }}
                        >
                          31-Jul-2023 17:12:41
                        </Link>
                      </div>
                    </div>
                    <div className="form-group col-md-3">
                      <label style={{ textTransform: "uppercase" }}>
                        <Link
                          to="https://hotelconfirm.tdonlines.com/project_folder/tdonline_protected/supplier_logs/wslog/wego_ws/28_07_2023/request_hotel_reservation_wego_ws_10_25_56_1690539956_5887053.txt"
                          target="_blank"
                        >
                          <strong>hotel_reservation_request</strong>
                        </Link>
                      </label>
                      <div>
                        <Link
                          to="https://hotelconfirm.tdonlines.com/project_folder/tdonline_protected/supplier_logs/wslog/wego_ws/28_07_2023/request_hotel_reservation_wego_ws_10_25_56_1690539956_5887053.txt"
                          target="_blank"
                          style={{
                            color: "#565759 !important",
                            textDecoration: "none",
                          }}
                        >
                          28-Jul-2023 15:55:50
                        </Link>
                      </div>
                    </div>
                    <div className="form-group col-md-3">
                      <label style={{ textTransform: "uppercase" }}>
                        <Link
                          to="https://hotelconfirm.tdonlines.com/project_folder/tdonline_protected/supplier_logs/wslog/wego_ws/28_07_2023/response_hotel_reservation_wego_ws_10_25_56_1690539956_5887053.txt"
                          target="_blank"
                        >
                          <strong>hotel_reservation_response</strong>
                        </Link>
                      </label>
                      <div>
                        <Link
                          to="https://hotelconfirm.tdonlines.com/project_folder/tdonline_protected/supplier_logs/wslog/wego_ws/28_07_2023/response_hotel_reservation_wego_ws_10_25_56_1690539956_5887053.txt"
                          target="_blank"
                          style={{
                            color: "#565759 !important",
                            textDecoration: "none",
                          }}
                        >
                          31-Jul-2023 17:12:41
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        {/* Add Hotel Modal */}
        <div
          className="modal fade"
          id="addhotel"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="color-lineorange" />
              <span
                className="fa fa-times-circle fa-4 closeBtn"
                data-bs-dismiss="modal"
              />
              <div className="modal-body">
                <form name="confirm_frm" method="get" id="confirm_frm">
                  <input
                    type="hidden"
                    name="action_name"
                    defaultValue="hotel_confirm_no"
                  />
                  <input type="hidden" name="action_type" defaultValue />
                  <input type="hidden" name="booking_id" defaultValue={29193} />
                  <input
                    type="hidden"
                    id="tempval"
                    name="tempval"
                    defaultValue="HOTEL_CONFIRMATION_NOT_MANDATORY"
                  />
                  <div className data-effect="fadeInUp" data-child="row">
                    <div className="row">
                      <div
                        className="col-lg-12"
                        style={{
                          width: "auto",
                          position: "initial",
                          float: "none",
                        }}
                      >
                        <div className="panel-body">
                          <div className="row">
                            <div className="panel-heading">
                              Booking Id - <b>TD2229193</b>
                            </div>
                          </div>
                          <div className="row">
                            <div className="form-group col-md-12">
                              <label>Enter Hotel Confirmation #</label>
                              <input
                                className="form-control form-control-sm required "
                                type="text"
                                name="txt_confirm"
                                defaultValue
                              />
                            </div>
                            <div className="form-group col-md-12">
                              <label>Date of Confirmation </label>
                              <div className="input-group date col-md-12 col-sm-12 col-xs-12">
                                <input
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  type="text"
                                  className="form-control form-control-sm"
                                  name="txt_confirm_date"
                                  defaultValue
                                  id="confirm_date"
                                  data-original-title
                                  title
                                />
                              </div>
                            </div>
                            <div className="form-group col-md-12">
                              <label>Hotel Staff Name</label>
                              <input
                                className="form-control form-control-sm"
                                type="text"
                                name="txt_staff_name"
                                defaultValue
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="form-group col-md-12">
                              <label>Remarks</label>
                              <textarea
                                name="txt_remarks"
                                rows={8}
                                className="col-md-12 form-control form-control-sm"
                                defaultValue={""}
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="form-group col-md-3">
                              <br />
                              <button
                                type="button"
                                className="btn btn-dark btn-sm"
                                data-dismiss="modal"
                                onclick="confirm_no()"
                                value="Submit"
                              >
                                <i className="fa fa-floppy-o" />
                                &nbsp;Submit
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n.fa.fa-times-circle.closeBtn {\n    font-size: 22px!important;\n    position: absolute;\n    float: right;\n    right: 0px;\n    top: 0px;\n    margin-right: -10px;\n    margin-top: -9px;\n    background-color: white;\n    border-radius: 15px;\n    color: #000!important;\n    cursor: pointer;\n}\n\n",
          }}
        />
        {/* Cancel Modal */}
        <div
          className="modal fade"
          id="cancelModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="color-lineorange" />
              <div className="modal-header">
                <span
                  className="fa fa-times-circle fa-4 closeBtn"
                  data-bs-dismiss="modal"
                />
                <div className="siteLogo">
                  <img
                    src="http://beta.tdonlines.com/project_folder/tdonline//images/logo.png"
                    style={{ width: "50%" }}
                    alt=""
                  />
                </div>
              </div>
              <div className="modal-body">
                <form
                  name="frm1"
                  action="get_cancellation_fee.php"
                  method="post"
                >
                  <div
                    className="modalForm"
                    data-child="row"
                    data-effect="fadeInUp"
                  >
                    <div className="row">
                      <div className="col-md-12 form-group">
                        <table className="table  datatable table-bordered  table-responsive">
                          <tbody className="bg-white">
                            <tr>
                              <td width="60%">Booking ID</td>
                              <td width="70%">TD2229193</td>
                            </tr>
                            <tr>
                              <td width="30%">Agent Cancellation Policy</td>
                              <td width="65%">
                                The latest deadline to cancel this booking
                                without charges is 22 Dec 2022 03:00.
                                <br />
                                Late amendment charges may apply.
                                <br />
                                <br />
                                100% charges will be applicable if cancelled
                                after 22 Dec 2022 03:00
                                <br /> The property makes no refunds for no
                                shows or early checkouts.
                                <br />
                              </td>
                            </tr>
                            <tr>
                              <td width="30%">Deadline Date</td>
                              <td width="65%">22-Dec-2022 05:30:00</td>
                            </tr>
                            <tr>
                              <td width="30%">
                                Total Cancellation Charges by Supplier
                              </td>
                              <td width="65%">
                                <input
                                  type="text"
                                  className="form-control form-control-sm display_inline form-width"
                                  name="supplier_cancellation_charge"
                                  id="supplier_cancellation_charge"
                                  defaultValue={0}
                                />
                                <div className="display_inline">USD</div>
                              </td>
                            </tr>
                            <tr>
                              <td width="30%">
                                Total Cancellation Charges Applicable to Agent
                              </td>
                              <td width="65%">
                                <input
                                  type="text"
                                  className="form-control form-control-sm display_inline form-width"
                                  name="cancellation_charge"
                                  defaultValue={0}
                                  id="cancellation_charge"
                                />
                                <div className="display_inline">USD</div>
                              </td>
                            </tr>
                            <tr>
                              <td
                                width="95%"
                                colSpan={2}
                                className="form-group"
                              >
                                Are you sure you want to proceed with the
                                cancellation?
                                <br />
                                <br />
                                <button
                                  type="button"
                                  className="btn btn-dark btn-sm"
                                  style={{ float: "left" }}
                                  onclick='JavaScriptcancel_booking("OT19026","29193","0","USD","0","USD","http://beta.tdonlines.com/tms/booking_detail.php?booking_id=29193&reservation_id=OT19026&service=hotel")'
                                >
                                  <i className="fa fa-check" />
                                  &nbsp;Yes
                                </button>
                                {/*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <button type='button' class='btn btn-primary' onclick='Javascriptself.close()'><h6>No</h6></button> */}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* Status History Modal */}
        <div
          className="modal fade"
          id="statusModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content" style={{ width: "670px" }}>
              <div className="color-lineorange" />
              <div className="modal-header">
                <span
                  className="fa fa-times-circle fa-4 closeBtn"
                  data-bs-dismiss="modal"
                />
                <div className="siteLogo">
                  <img
                    src="http://beta.tdonlines.com/project_folder/tdonline//images/logo.png"
                    style={{ width: "50%" }}
                    alt=""
                  />
                </div>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div
                    className="col-md-12"
                    style={{
                      width: "auto",
                      position: "initial",
                      float: "none",
                    }}
                  >
                    {/*<Link to="Javascriptwindow.close();"><U>CLOSE</U></Link>  */}
                    <div className="row">
                      <div className="col-sm-11">
                        <div className="panel-heading">
                          Booking Id - <b>TD1129407</b>
                        </div>
                      </div>
                      <div className="col-sm-1">
                        <div
                          className="input-group-addon pull-right"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          data-original-title="Print"
                        >
                          <Link
                            className="fa fa-print"
                            to="Javascriptself.print();"
                          />
                        </div>
                      </div>
                    </div>
                    <table
                      className="table table-bordered  table-bordered  table-responsive dataTable"
                      id="search_agents_table1"
                    >
                      <tbody className="bg-white">
                        <tr>
                          <td>Status</td>
                          <td width="25%">Modify Date</td>
                          <td>Memo</td>
                          <td>User</td>
                          <td>IP</td>
                        </tr>
                        <tr>
                          <td align="center" className="vouchered-invoiced">
                            <h5 className="label-heading">
                              <span className="tdd_label label-warning">
                                vouchered
                              </span>
                            </h5>
                            <h5 className="label-heading">
                              <span className="tdd_label label-primary">
                                <span className="fa fa-file-text-o" />
                                &nbsp;Invoiced
                              </span>
                            </h5>
                          </td>
                          <td>02-Aug-2023 10:19:24</td>
                          <td style={{ wordBreak: "break-word" }}>
                            Booking invoice by user id -316
                          </td>
                          <td>Bhargavi Pise</td>
                          <td>52.76.245.157</td>
                        </tr>
                        <tr>
                          <td align="center" className="vouchered">
                            <h5 className="label-heading">
                              <span className="tdd_label label-warning">
                                Vouchered
                              </span>
                            </h5>
                          </td>
                          <td>02-Aug-2023 10:19:24</td>
                          <td style={{ wordBreak: "break-word" }}>
                            Vouchered By Webservices..316
                          </td>
                          <td>Bhargavi Pise</td>
                          <td>52.76.245.157</td>
                        </tr>
                        <tr>
                          <td align="center" className="confirmed">
                            <h5 className="label-heading">
                              <span className="tdd_label label-success">
                                Confirmed
                              </span>
                            </h5>
                          </td>
                          <td>02-Aug-2023 10:19:23</td>
                          <td style={{ wordBreak: "break-word" }}>
                            Booking confirmed{" "}
                          </td>
                          <td>Bhargavi Pise</td>
                          <td>52.76.245.157</td>
                        </tr>
                        {/*  <tr>
                              <td width="8%">&nbsp;</td>
                              <td width="15%">&nbsp;</td>
                              <td width="52%">&nbsp;</td>
                                  <td >&nbsp;</td>
                                  <td >&nbsp;</td>
                            </tr>*/}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Supplier Info Modal */}
        <div
          className="modal fade"
          id="supplierinfoModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content" style={{ width: "670px" }}>
              <div className="color-lineorange" />
              <div className="modal-header">
                <span
                  className="fa fa-times-circle fa-4 closeBtn"
                  data-bs-dismiss="modal"
                />
                <div className="siteLogo">
                  <img
                    src="http://beta.tdonlines.com/project_folder/tdonline//images/logo.png"
                    style={{ width: "50%" }}
                    alt=""
                  />
                </div>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div
                    className="col-md-12"
                    style={{
                      width: "auto",
                      position: "initial",
                      float: "none",
                    }}
                  >
                    <div className="row">
                      <div className="col-md-6">
                        <div className="panel-heading">
                          Supplier Booking Detail
                        </div>
                      </div>
                      <div
                        className="col-sm-4"
                        style={{ paddingRight: "113px" }}
                      >
                        <div className="pull-right">
                          <input
                            className="form-control form-control-sm"
                            type="text"
                            name="txt_email"
                            id="txt_email"
                            placeholder="Email"
                            style={{ width: "219px" }}
                          />
                        </div>
                      </div>
                      <div className="col-sm-1">
                        <div className="pull-right">
                          <div className="input-group-addon">
                            <span
                              data-toggle="tooltip"
                              data-placement="bottom"
                              data-original-title="Print"
                              className="fa fa-print pointer"
                              id="print_but"
                              name="print"
                              onclick="print_details()"
                            >
                              {/*<input id='close' type=button name=close value='Close' onclick='Javascriptself.close()'>*/}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-1">
                        <div className="pull-right">
                          <div className="input-group-addon">
                            <span
                              data-toggle="tooltip"
                              data-placement="bottom"
                              data-original-title="Send Email"
                              className="fa fa-envelope pointer"
                              onclick="Javascriptsend_email()"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <table
                    id="tableres"
                    className="table  datatable table-bordered  table-responsive"
                  >
                    <tbody className="bg-white">
                      <tr className="phps_row_1">
                        <td>Booking Id</td>
                        <td>TD1129407</td>
                      </tr>
                      <tr className="phps_row_1">
                        <td>Booking Date</td>
                        <td>02-Aug-2023 10:19:20</td>
                      </tr>
                      <tr className="phps_row_1">
                        <td>Status</td>
                        <td>
                          <h5 className="label-heading">
                            <span className="tdd_label label-warning">
                              Vouchered
                            </span>
                          </h5>
                        </td>
                      </tr>
                      <tr className="phps_row_1">
                        <td>Voucher Id</td>
                        <td>20525</td>
                      </tr>
                      <tr className="phps_row_1">
                        <td>Voucher Date</td>
                        <td>02-Aug-2023</td>
                      </tr>
                      {/* code added by Anand on 12 Dec 2012 */}
                      <tr className="phps_row_1">
                        <td>Check In Date</td>
                        <td>12-Dec-2023</td>
                      </tr>
                      <tr className="phps_row_1">
                        <td>Check Out Date</td>
                        <td>13-Dec-2023</td>
                      </tr>
                      <tr className="phps_row_1">
                        <td>Number of Nights</td>
                        <td>1</td>
                      </tr>
                      <tr className="phps_row_1">
                        <td>Hotel Name</td>
                        <td>SWISSOTEL AL GHURAIR</td>
                      </tr>
                      <tr className="phps_row_1">
                        <td>Hotel Address</td>
                        <td>Umar Bin Al Kattab Road P.O. Box 185051</td>
                      </tr>
                      <tr className="phps_row_1">
                        <td align="left" valign="top">
                          Passenger Details
                        </td>
                        <td>
                          <table
                            width="100%"
                            className="table datatable table-bordered table-responsive"
                          >
                            <tbody className="bg-white">
                              <tr className="phps_header">
                                <td>&nbsp;Room Type</td>
                                <td>&nbsp;Passengers</td>
                              </tr>
                              <tr>
                                <td>Double classic HALF BOARD </td>
                                <td>
                                  Mr iswarya Mallikarjuna <br />
                                  Mr iswarya Mallikarjuna <br />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr className="phps_row_1">
                        <td>Supplier Rate</td>
                        <td>312.030&nbsp;EUR </td>
                      </tr>
                      <tr className="phps_row_1">
                        <td>Supplier Rate Break Up</td>
                        <td>
                          <table
                            width="100%"
                            className="table datatable table-bordered table-responsive"
                          >
                            <tbody className="bg-white">
                              <tr className="phps_header">
                                <td width="50%">Room Type</td>
                                <td width="25%">Room(s)</td>
                                <td width="25%">Break Up</td>
                              </tr>
                              <tr className="phps_row_1">
                                <td> Double classic HALF BOARD </td>
                                <td>1</td>
                                <td>
                                  <table
                                    width="100%"
                                    className="table datatable table-bordered table-responsive"
                                  >
                                    <tbody className="bg-white">
                                      <tr>
                                        <td>Day 1</td>
                                        <td>
                                          <span className="text-danger">
                                            312.03
                                          </span>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr className="phps_row_1">
                        <td>Supplier</td>
                        <td>Hotelbeds</td>
                      </tr>
                      <tr className="phps_row_1">
                        <td>Supplier Confirmation Number</td>
                        <td>148-1769200</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Booking History Modal */}
        <div
          className="modal fade"
          id="bookinghistoryModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content" style={{ width: "670px" }}>
              <div className="modal-header">
                <span
                  className="fa fa-times-circle fa-4 closeBtn"
                  data-bs-dismiss="modal"
                />
                <div className="siteLogo">
                  <img
                    src="http://beta.tdonlines.com/project_folder/tdonline//images/logo.png"
                    style={{ width: "50%" }}
                    alt=""
                  />
                </div>
              </div>
              <div className="modal-body">
                <div
                  className="modalForm"
                  data-child="row"
                  data-effect="fadeInUp"
                >
                  <div className="row">
                    <div
                      className="col-md-12"
                      style={{
                        width: "auto",
                        position: "initial",
                        float: "none",
                      }}
                    >
                      <div className="form-group" style={{ fontSize: "16px" }}>
                        Booking History
                      </div>
                      <h4
                        className="text-danger mt-3"
                        style={{
                          color: "var(--color-white) !important",
                          fontSize: "18px",
                          fontWeight: 400,
                          marginLeft: "122px",
                        }}
                      >
                        There are no modifications done on this booking.
                      </h4>
                      <table className="table  datatable table-bordered  table-responsive"></table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Hotel Search Log Modal */}
        <div
          className="modal fade"
          id="hotelsearchlogModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content" style={{ width: "670px" }}>
              <div className="color-line"></div>
              <div className="modal-header">
                <span
                  className="fa fa-times-circle fa-4 closeBtn"
                  data-bs-dismiss="modal"
                />
                <p>Hotel Search Log</p>
              </div>
              <div className="modal-body">
                <div
                  className="modalForm"
                  data-child="row"
                  data-effect="fadeInUp"
                >
                  <div className="row">
                    <div className="cont-box col-md-10">
                      <div className="ade-space pull-left">
                        <div className="float_left h_name hotel_name">
                          Swissotel Al Ghurair
                        </div>
                        <div className="clear" />
                        <div>
                          <img
                            src={ratting}
                            alt="Rating"
                            title="Rating"
                            border={0}
                            className="float_left rating"
                          />
                          <span className="float_left h_address">
                            <cite
                              className="pointer fc_lgt_gray no_bold"
                              to="Javascriptvoid(1);"
                              onclick='Javascriptwindow.open("view_map.php?latitude=25.269395683068&longitude=55.316653733097&hotel_name=SWISSOTEL AL GHURAIR&city=","win187892","width=550,height=575,scrollbars=1")'
                            >
                              Umar Bin Al Kattab Road P.O. Box 185051 &nbsp;{" "}
                            </cite>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div
                      id="record_1"
                      style={{}}
                      className="room-fields col-md-12"
                    >
                      <div className>
                        {/* <h2>Listed Rooms:</h2> */}
                        <br />
                        <div className="float_left h_name hotel_name">
                          Listed Rooms:
                        </div>
                        <div className="single mt-3">
                          <div className="blue-box  row pull-left col-md-6">
                            <div className="double-box">
                              <span
                                className="room-title"
                                id="short_187892_____"
                              >
                                Double classic BED AND BREAKFAST
                                <span style={{ color: "#ddd" }}>
                                  {" "}
                                  Supplier: hotelbeds
                                </span>
                              </span>
                            </div>
                          </div>
                          <div className="double-txt">
                            <div className="right-btn">
                              <div className="right  status_currency">
                                <div className=" pull-right">
                                  <div className="aed-small hotel_currncy">
                                    USD&nbsp;374.42{" "}
                                  </div>
                                  <div className="green-txt">Available</div>
                                </div>
                              </div>
                              <br className="clear" />
                            </div>
                          </div>
                          <div className="brd-sep" />
                          <div className="tot-box col-md-12">
                            <br className="clear" />
                          </div>
                          <div className="single">
                            <div className="blue-box  row pull-left col-md-6">
                              <div className="double-box">
                                <span
                                  className="room-title"
                                  id="short_187892_____"
                                >
                                  Double deluxe BED AND BREAKFAST
                                  <span style={{ color: "#ddd" }}>
                                    {" "}
                                    Supplier: hotelbeds
                                  </span>
                                </span>
                              </div>
                            </div>
                            <div className="double-txt">
                              <div className="right-btn">
                                <div className="right  status_currency">
                                  <div className=" pull-right">
                                    <div className="aed-small hotel_currncy">
                                      USD&nbsp;385.77
                                    </div>
                                    <div className="green-txt">Available</div>
                                  </div>
                                </div>
                                <br className="clear" />
                              </div>
                            </div>
                            <div className="brd-sep" />
                            <div className="tot-box col-md-12">
                              <br className="clear" />
                            </div>
                            <div className="single">
                              <div className="blue-box  row pull-left col-md-6">
                                <div className="double-box">
                                  <span
                                    className="room-title"
                                    id="short_187892_____"
                                  >
                                    Suite classic BED AND BREAKFAST
                                    <span style={{ color: "#ddd" }}>
                                      {" "}
                                      Supplier: hotelbeds
                                    </span>
                                  </span>
                                </div>
                              </div>
                              <div className="double-txt">
                                <div className="right-btn">
                                  <div className="right  status_currency">
                                    <div className=" pull-right">
                                      <div className="aed-small hotel_currncy">
                                        USD&nbsp;434.94
                                      </div>
                                      <div className="green-txt">Available</div>
                                    </div>
                                  </div>
                                  <br className="clear" />
                                </div>
                              </div>
                              <div className="brd-sep" />
                              <div className="tot-box col-md-12">
                                <br className="clear" />
                              </div>
                              <div className="single">
                                <div className="blue-box  row pull-left col-md-6">
                                  <div className="double-box">
                                    <span
                                      className="room-title"
                                      id="short_187892_____"
                                    >
                                      Double classic HALF BOARD
                                      <span style={{ color: "#ddd" }}>
                                        {" "}
                                        Supplier: hotelbeds
                                      </span>
                                    </span>
                                  </div>
                                </div>
                                <div className="double-txt">
                                  <div className="right-btn">
                                    <div className="right  status_currency">
                                      <div className=" pull-right">
                                        <div className="aed-small hotel_currncy">
                                          USD&nbsp;442.49{" "}
                                        </div>
                                        <div className="green-txt">
                                          Available
                                        </div>
                                      </div>
                                    </div>
                                    <br className="clear" />
                                  </div>
                                </div>
                                <div className="brd-sep" />
                                <div className="tot-box col-md-12">
                                  <br className="clear" />
                                </div>
                                <div className="single">
                                  <div className="blue-box  row pull-left col-md-6">
                                    <div className="double-box">
                                      <span
                                        className="room-title"
                                        id="short_187892_____"
                                      >
                                        Double deluxe HALF BOARD
                                        <span style={{ color: "#ddd" }}>
                                          {" "}
                                          Supplier: hotelbeds
                                        </span>
                                      </span>
                                    </div>
                                  </div>
                                  <div className="double-txt">
                                    <div className="right-btn">
                                      <div className="right  status_currency">
                                        <div className=" pull-right">
                                          <div className="aed-small hotel_currncy">
                                            USD&nbsp;453.84{" "}
                                          </div>
                                          <div className="green-txt">
                                            Available
                                          </div>
                                        </div>
                                      </div>
                                      <br className="clear" />
                                    </div>
                                  </div>
                                  <div className="brd-sep" />
                                  <div className="tot-box col-md-12">
                                    <br className="clear" />
                                  </div>
                                  <div className="single">
                                    <div className="blue-box  row pull-left col-md-6">
                                      <div className="double-box">
                                        <span
                                          className="room-title"
                                          id="short_187892_____"
                                        >
                                          CORNER SUITE BED AND BREAKFAST
                                          <span style={{ color: "#ddd" }}>
                                            {" "}
                                            Supplier: hotelbeds
                                          </span>
                                        </span>
                                      </div>
                                    </div>
                                    <div className="double-txt">
                                      <div className="right-btn">
                                        <div className="right  status_currency">
                                          <div className=" pull-right">
                                            <div className="aed-small hotel_currncy">
                                              USD&nbsp;457.63{" "}
                                            </div>
                                            <div className="green-txt">
                                              Available
                                            </div>
                                          </div>
                                        </div>
                                        <br className="clear" />
                                      </div>
                                    </div>
                                    <div className="brd-sep" />
                                    <div className="tot-box col-md-12">
                                      <br className="clear" />
                                    </div>
                                    <div className="single">
                                      <div className="blue-box  row pull-left col-md-6">
                                        <div className="double-box">
                                          <span
                                            className="room-title"
                                            id="short_187892_____"
                                          >
                                            Suite classic HALF BOARD
                                            <span style={{ color: "#ddd" }}>
                                              {" "}
                                              Supplier: hotelbeds
                                            </span>
                                          </span>
                                        </div>
                                      </div>
                                      <div className="double-txt">
                                        <div className="right-btn">
                                          <div className="right  status_currency">
                                            <div className=" pull-right">
                                              <div className="aed-small hotel_currncy">
                                                USD&nbsp;503{" "}
                                              </div>
                                              <div className="green-txt">
                                                Available
                                              </div>
                                            </div>
                                          </div>
                                          <br className="clear" />
                                        </div>
                                      </div>
                                      <div className="brd-sep" />
                                      <div className="tot-box col-md-12">
                                        <br className="clear" />
                                      </div>
                                      <div className="single">
                                        <div className="blue-box  row pull-left col-md-6">
                                          <div className="double-box">
                                            <span
                                              className="room-title"
                                              id="short_187892_____"
                                            >
                                              Double classic FULL BOARD
                                              <span style={{ color: "#ddd" }}>
                                                {" "}
                                                Supplier: hotelbeds
                                              </span>
                                            </span>
                                          </div>
                                        </div>
                                        <div className="double-txt">
                                          <div className="right-btn">
                                            <div className="right  status_currency">
                                              <div className=" pull-right">
                                                <div className="aed-small hotel_currncy">
                                                  USD&nbsp;510.56{" "}
                                                </div>
                                                <div className="green-txt">
                                                  Available
                                                </div>
                                              </div>
                                            </div>
                                            <br className="clear" />
                                          </div>
                                        </div>
                                        <div className="brd-sep" />
                                        <div className="tot-box col-md-12">
                                          <br className="clear" />
                                        </div>
                                        <div className="single">
                                          <div className="blue-box  row pull-left col-md-6">
                                            <div className="double-box">
                                              <span
                                                className="room-title"
                                                id="short_187892_____"
                                              >
                                                Double deluxe FULL BOARD
                                                <span style={{ color: "#ddd" }}>
                                                  Supplier: hotelbeds
                                                </span>
                                              </span>
                                            </div>
                                          </div>
                                          <div className="double-txt">
                                            <div className="right-btn">
                                              <div className="right  status_currency">
                                                <div className=" pull-right">
                                                  <div className="aed-small hotel_currncy">
                                                    USD&nbsp;521.91{" "}
                                                  </div>
                                                  <div className="green-txt">
                                                    Available
                                                  </div>
                                                </div>
                                              </div>
                                              <br className="clear" />
                                            </div>
                                          </div>
                                          <div className="brd-sep" />
                                          <div className="tot-box col-md-12">
                                            <br className="clear" />
                                          </div>
                                          <div className="single">
                                            <div className="blue-box  row pull-left col-md-6">
                                              <div className="double-box">
                                                <span
                                                  className="room-title"
                                                  id="short_187892_____"
                                                >
                                                  CORNER SUITE HALF BOARD
                                                  <span
                                                    style={{ color: "#ddd" }}
                                                  >
                                                    Supplier: hotelbeds
                                                  </span>
                                                </span>
                                              </div>
                                            </div>
                                            <div className="double-txt">
                                              <div className="right-btn">
                                                <div className="right  status_currency">
                                                  <div className=" pull-right">
                                                    <div className="aed-small hotel_currncy">
                                                      USD&nbsp;525.69
                                                    </div>
                                                    <div className="green-txt">
                                                      Available
                                                    </div>
                                                  </div>
                                                </div>
                                                <br className="clear" />
                                              </div>
                                            </div>
                                            <div className="brd-sep" />
                                            <div className="tot-box col-md-12">
                                              <br className="clear" />
                                            </div>
                                            <div className="single">
                                              <div className="blue-box  row pull-left col-md-6">
                                                <div className="double-box">
                                                  <span
                                                    className="room-title"
                                                    id="short_187892_____"
                                                  >
                                                    Suite classic FULL BOARD
                                                    <span
                                                      style={{ color: "#ddd" }}
                                                    >
                                                      Supplier: hotelbeds
                                                    </span>
                                                  </span>
                                                </div>
                                              </div>
                                              <div className="double-txt">
                                                <div className="right-btn">
                                                  <div className="right  status_currency">
                                                    <div className=" pull-right">
                                                      <div className="aed-small hotel_currncy">
                                                        USD&nbsp;571.07
                                                      </div>
                                                      <div className="green-txt">
                                                        Available
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <br className="clear" />
                                                </div>
                                              </div>
                                              <div className="brd-sep" />
                                              <div className="tot-box col-md-12">
                                                <br className="clear" />
                                              </div>
                                              <div className="single">
                                                <div className="blue-box  row pull-left col-md-6">
                                                  <div className="double-box">
                                                    <span
                                                      className="room-title"
                                                      id="short_187892_____"
                                                    >
                                                      CORNER SUITE FULL BOARD
                                                      <span
                                                        style={{
                                                          color: "#ddd",
                                                        }}
                                                      >
                                                        Supplier: hotelbeds
                                                      </span>
                                                    </span>
                                                  </div>
                                                </div>
                                                <div className="double-txt">
                                                  <div className="right-btn">
                                                    <div className="right  status_currency">
                                                      <div className=" pull-right">
                                                        <div className="aed-small hotel_currncy">
                                                          USD&nbsp;593.76
                                                        </div>
                                                        <div className="green-txt">
                                                          Available
                                                        </div>
                                                      </div>
                                                    </div>
                                                    <br className="clear" />
                                                  </div>
                                                </div>
                                                <div className="brd-sep" />
                                                <div className="tot-box col-md-12">
                                                  <br className="clear" />
                                                </div>
                                                <div className="single">
                                                  <div className="blue-box  row pull-left col-md-6">
                                                    <div className="double-box">
                                                      <span
                                                        className="room-title"
                                                        id="short_187892_____"
                                                      >
                                                        Family room standard BED
                                                        AND BREAKFAST
                                                        <span
                                                          style={{
                                                            color: "#ddd",
                                                          }}
                                                        >
                                                          Supplier: hotelbeds
                                                        </span>
                                                      </span>
                                                    </div>
                                                  </div>
                                                  <div className="double-txt">
                                                    <div className="right-btn">
                                                      <div className="right  status_currency">
                                                        <div className=" pull-right">
                                                          <div className="aed-small hotel_currncy">
                                                            USD&nbsp;625.93
                                                          </div>
                                                          <div className="green-txt">
                                                            Available
                                                          </div>
                                                        </div>
                                                      </div>
                                                      <br className="clear" />
                                                    </div>
                                                  </div>
                                                  <div className="brd-sep" />
                                                  <div className="tot-box col-md-12">
                                                    <br className="clear" />
                                                  </div>
                                                  <div className="single">
                                                    <div className="blue-box  row pull-left col-md-6">
                                                      <div className="double-box">
                                                        <span
                                                          className="room-title"
                                                          id="short_187892_____"
                                                        >
                                                          Family room standard
                                                          HALF BOARD
                                                          <span
                                                            style={{
                                                              color: "#ddd",
                                                            }}
                                                          >
                                                            Supplier: hotelbeds
                                                          </span>
                                                        </span>
                                                      </div>
                                                    </div>
                                                    <div className="double-txt">
                                                      <div className="right-btn">
                                                        <div className="right  status_currency">
                                                          <div className=" pull-right">
                                                            <div className="aed-small hotel_currncy">
                                                              USD&nbsp;694
                                                            </div>
                                                            <div className="green-txt">
                                                              Available
                                                            </div>
                                                          </div>
                                                        </div>
                                                        <br className="clear" />
                                                      </div>
                                                    </div>
                                                    <div className="brd-sep"></div>
                                                    <div className="tot-box col-md-12">
                                                      <br className="clear" />
                                                    </div>
                                                    <div className="single">
                                                      <div className="blue-box  row pull-left col-md-6">
                                                        <div className="double-box">
                                                          <span
                                                            className="room-title"
                                                            id="short_187892_____"
                                                          >
                                                            Family room standard
                                                            FULL BOARD
                                                            <span
                                                              style={{
                                                                color: "#ddd",
                                                              }}
                                                            >
                                                              Supplier:
                                                              hotelbeds
                                                            </span>
                                                          </span>
                                                        </div>
                                                      </div>
                                                      <div className="double-txt">
                                                        <div className="right-btn">
                                                          <div className="right  status_currency">
                                                            <div className=" pull-right">
                                                              <div className="aed-small hotel_currncy">
                                                                USD&nbsp;762.07
                                                              </div>
                                                              <div className="green-txt">
                                                                Available
                                                              </div>
                                                            </div>
                                                          </div>
                                                          <br className="clear" />
                                                        </div>
                                                      </div>
                                                      <div className="brd-sep"></div>
                                                      <div className="tot-box col-md-12">
                                                        <br className="clear" />
                                                      </div>
                                                      <div className="single">
                                                        <div className="blue-box  row pull-left col-md-6">
                                                          <div className="double-box">
                                                            <span
                                                              className="room-title"
                                                              id="short_187892_____"
                                                            >
                                                              FAMILY SUITE BED
                                                              AND BREAKFAST
                                                              <span
                                                                style={{
                                                                  color: "#ddd",
                                                                }}
                                                              >
                                                                Supplier:
                                                                hotelbeds
                                                              </span>
                                                            </span>
                                                          </div>
                                                        </div>
                                                        <div className="double-txt">
                                                          <div className="right-btn">
                                                            <div className="right  status_currency">
                                                              <div className=" pull-right">
                                                                <div className="aed-small hotel_currncy">
                                                                  USD&nbsp;775.31
                                                                </div>
                                                                <div className="green-txt">
                                                                  Available
                                                                </div>
                                                              </div>
                                                            </div>
                                                            <br className="clear" />
                                                          </div>
                                                        </div>
                                                        <div className="brd-sep"></div>
                                                        <div className="tot-box col-md-12">
                                                          <br className="clear" />
                                                        </div>
                                                        <div className="single">
                                                          <div className="blue-box  row pull-left col-md-6">
                                                            <div className="double-box">
                                                              <span
                                                                className="room-title"
                                                                id="short_187892_____"
                                                              >
                                                                FAMILY SUITE
                                                                HALF BOARD
                                                                <span
                                                                  style={{
                                                                    color:
                                                                      "#ddd",
                                                                  }}
                                                                >
                                                                  Supplier:
                                                                  hotelbeds
                                                                </span>
                                                              </span>
                                                            </div>
                                                          </div>
                                                          <div className="double-txt">
                                                            <div className="right-btn">
                                                              <div className="right  status_currency">
                                                                <div className=" pull-right">
                                                                  <div className="aed-small hotel_currncy">
                                                                    USD&nbsp;843.38
                                                                  </div>
                                                                  <div className="green-txt">
                                                                    Available
                                                                  </div>
                                                                </div>
                                                              </div>
                                                              <br className="clear" />
                                                            </div>
                                                          </div>
                                                          <div className="brd-sep"></div>
                                                          <div className="tot-box col-md-12">
                                                            <br className="clear" />
                                                          </div>
                                                          <div className="single">
                                                            <div className="blue-box  row pull-left col-md-6">
                                                              <div className="double-box">
                                                                <span
                                                                  className="room-title"
                                                                  id="short_187892_____"
                                                                >
                                                                  FAMILY SUITE
                                                                  FULL BOARD
                                                                  <span
                                                                    style={{
                                                                      color:
                                                                        "#ddd",
                                                                    }}
                                                                  >
                                                                    Supplier:
                                                                    hotelbeds
                                                                  </span>
                                                                </span>
                                                              </div>
                                                            </div>
                                                            <div className="double-txt">
                                                              <div className="right-btn">
                                                                <div className="right  status_currency">
                                                                  <div className=" pull-right">
                                                                    <div className="aed-small hotel_currncy">
                                                                      USD&nbsp;911.45
                                                                    </div>
                                                                    <div className="green-txt">
                                                                      Available
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                                <br className="clear" />
                                                              </div>
                                                            </div>
                                                            <div className="brd-sep"></div>
                                                            <div className="tot-box col-md-12">
                                                              <br className="clear" />
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
export default SearchBookingTable;
