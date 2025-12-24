import { Link } from "react-router-dom";
import React, { useState } from "react";
import Flatpickr from "react-flatpickr";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";
import MultiSelect from "../reactMultiSelect";
import { selTimezoneOptions } from "../../constants/contants";

const MessagesMassMailCampaignStep5 = () => {
  const [startDate, setStartDate] = useState(null);

  const [isScheduleVisible, setScheduleVisible] = useState(false);

  const schedule = () => {
    setScheduleVisible(true);
  };

  const closeEvent = () => {
    setScheduleVisible(false);
  };

  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <Header2
          title="STEP 5 : EMAIL PREVIEW"
          linkText1="Campaigns"
          linkText2="Add Campaign"
          link1={Constants.URLConstants.MESSAGESMASSMAILCAMPAIGNANSEARCH}
        />

        <div>
          {/* First Row*/}
          <div className="panel-footer" style={{ backgroundColor: "#f5f5f5" }}>
            <style
              type="text/css"
              dangerouslySetInnerHTML={{
                __html:
                  "\n                .steps {\n                    display: inline-block;\n                }\n            ",
              }}
            />
            <div className="text-center">
              <Link to={Constants.URLConstants.MESSAGESMASSMAILCAMPAIGNANNEW}>
                <div className="btn btn-default bt btn-sm steps">
                  Step 1 : Add Name Campaign{" "}
                </div>
              </Link>
              <Link to={Constants.URLConstants.MESSAGESMASSMAILCAMPAIGNANSTEP2}>
                <div className="btn btn-default btn-sm steps">
                  Step 2 : Add Setup
                </div>
              </Link>
              <Link to={Constants.URLConstants.MESSAGESMASSMAILCAMPAIGNANSTEP3}>
                <div className="steps btn btn-default btn-sm">
                  Step 3 : Add Content
                </div>
              </Link>
              <Link to={Constants.URLConstants.MESSAGESMASSMAILCAMPAIGNANSTEP4}>
                <div className="steps btn btn-default btn-sm">
                  Step 4 : Preview
                </div>
              </Link>
              <Link to={Constants.URLConstants.MESSAGESMASSMAILCAMPAIGNANSTEP5}>
                <div className="steps btn btn-dark btn-sm">
                  Step 5 : Schedule
                </div>
              </Link>
            </div>
            <br />
          </div>
          <form>
            <div className="panel-body">
              {/* <div class=" col-md-12 row">
              
          </div> */}
              <div className="row">
                <div className="col-md-4 form-group phps_row_0">
                  <h5>List</h5>
                  <label>Your Campaign will be delivered to these list/s</label>
                  <div className="input-group col-xs-12 form-group">
                    <div className="float_left">
                      1. Qtech Profile
                      <br />
                    </div>
                    <a
                      href="campaigns.php?action=add_name_campaign&cid=3&name_search=&status_search="
                      className="input-group-addon"
                      data-toggle="tooltip"
                      data-placement="top"
                      data-original-title
                      title
                      style={{ marginLeft: "347px" }}
                    >
                      <h6 style={{ textAlign: "center" }}>
                        <i className="fa fa-pencil-square-o" />
                      </h6>
                    </a>
                  </div>
                </div>
                <div className="col-md-4 form-group phps_row_1">
                  <h5>Subject</h5>
                  <label>This is the subject you choose</label>
                  <div className="input-group col-xs-12 form-group">
                    test comapign{" "}
                    <a
                      href="campaigns.php?action=add_setup&cid=3&name_search=&status_search="
                      className="input-group-addon"
                      style={{ marginLeft: "347px" }}
                      data-toggle="tooltip"
                      data-placement="top"
                      data-original-title
                      title
                    >
                      <h6 style={{ textAlign: "center" }}>
                        <i className="fa fa-pencil-square-o" />
                      </h6>
                    </a>
                  </div>
                </div>
                <div className="col-md-4 form-group phps_row_0">
                  <h5>Email Type</h5>
                  <label />
                  <div className="input-group col-xs-12 form-group">
                    html
                    <a
                      href="campaigns.php?action=add_name_campaign&cid=3&name_search=&status_search="
                      className="input-group-addon"
                      style={{ marginLeft: "347px" }}
                    >
                      <h6 style={{ textAlign: "center" }}>
                        <i className="fa fa-pencil-square-o" />
                      </h6>
                    </a>
                  </div>
                </div>
              </div>
              <div style={{ clear: "both" }} />
              <hr />
              <div className="row">
                <div className="col-md-12 form-group ">
                  <h5>Sender Details</h5>
                </div>
                <div className="col-md-4 form-group phps_row_1">
                  <label>Sender Name</label>
                  <br />
                  nabeel
                </div>
                <div className="col-md-4 form-group phps_row_0">
                  <label>From Address</label>
                  <br />
                </div>
                <div className="col-md-4 form-group phps_row_1">
                  <label>Reply-to address</label>
                  <br />
                </div>
                <div className="col-md-4 form-group phps_row_0 mt-2" />
                <div className="col-md-4 form-group phps_row_0 mt-2">
                  <a
                    href="campaigns.php?action=add_setup&cid=3&name_search=&status_search="
                    className="btn btn-dark btn-sm"
                  >
                    <i
                      className="fa fa-pencil-square-o"
                      style={{ color: "#fff" }}
                    />
                    &nbsp;Edit
                  </a>
                </div>
              </div>
            </div>
          </form>
          <div
            className="panel-footer text-center form-group"
            style={{
              paddingTop: "10px",
              paddingBottom: "10px",
              backgroundColor: "#f5f5f5",
              borderTop: "0px",
              borderBottom: "1px solid #ddd",
            }}
          >
            <span id="btn_schedule" onClick={schedule}>
              <button
                type="button"
                className="btn btn-dark btn-sm"
                name="btn_schedule"
                value="Schedule"
              >
                <i className="fa fa-calendar" />
                &nbsp;Schedule
              </button>
              &nbsp;&nbsp;
            </span>

            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              id="btn_cancel"
              name="btn_cancel"
              value="Cancel"
              onclick="window.location='campaigns.php'"
            >
              <i className="fa fa-times" />
              &nbsp;Cancel
            </button>
          </div>
          <div
            id="div_schedule"
            style={{ display: isScheduleVisible ? "block" : "none" }}
          >
            <div
              className="panel-body"
              style={{
                backgroundColor: "#FF5015",
                paddingBottom: "1px",
                paddingTop: "4px",
              }}
            >
              <h5
                style={{ color: "white", fontSize: "15px", marginLeft: "20px" }}
              >
                Schedule Campaign
              </h5>
              <div
                className="float-end"
                id="schedule_dataButton"
                style={{ marginTop: "-23px", marginRight: "14px" }}
              >
                <Link
                  onClick={closeEvent}
                  alt="Close"
                  title="Close"
                  className="input-group-addon"
                  id="clease"
                >
                  <h6 style={{ textAlign: "center", marginTop: "-27px" }}>
                    <i className="fa fa-times" />
                    <style
                      dangerouslySetInnerHTML={{
                        __html:
                          "\n#clease{\n    padding: 6px 0px 0px 29px !important;\n    border: none !important;\n}\n",
                      }}
                    />
                  </h6>
                </Link>
              </div>
            </div>
            <div className="panel-body">
              <form style={{ paddingLeft: "23px" }}>
                <div className="col-md-12 form-group row">
                  <div
                    id="schedule_loading"
                    style={{
                      position: "absolute",
                      display: "none",
                      padding: "0px 0px 0px 450px",
                    }}
                  >
                    <center>
                      <img src="images/indicator.gif" alt="" />
                    </center>
                  </div>
                  <table width="100%">
                    <tbody className="bg-white">
                      <tr>
                        <td
                          width="50%"
                          style={{ borderRight: "1px dashed #999999" }}
                        >
                          <div
                            id="schedule_datadisplay"
                            style={{ display: "table-cell" }}
                          >
                            <div
                              className="form-group col-md-12 col-sm-12 col-xs-12 row"
                              style={{ textAlign: "left" }}
                            >
                              <label>Schedule Date</label>
                              <div className="row">
                                <div className="col-md-10 col-sm-12 col-xs-12 padR0">
                                  <div
                                    className="input-group date col-md-12 col-sm-12 col-xs-12"
                                    id="booking_to_date_cal1"
                                  >
                                    <Flatpickr
                                      value={startDate}
                                      onChange={(date) => setStartDate(date)}
                                      options={{ dateFormat: "Y-m-d" }}
                                      style={{ width: "150px" }}
                                    />
                                    <span className="input-group-addon">
                                      <i className="fa fa-th" />
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              className="col-md-12 form-group row mt-2"
                              style={{ textAlign: "left" }}
                            >
                              <label>Choose a time</label>
                              <div
                                className="input-group date col-md-12 col-xs-12"
                                id="booking_to_date_cal"
                              >
                                <MultiSelect
                                  options={selTimezoneOptions}
                                  isSearchable
                                  placeholder="- Select time -"
                                  noOptionsMessage={() => "No time Found"}
                                  className="custom-select w-75"
                                />
                                <br />
                                <br />
                              </div>
                            </div>
                            <div
                              className="col-md-12 form-group mt-2"
                              style={{ textAlign: "left" }}
                            >
                              <button
                                type="button"
                                className="btn btn-dark btn-sm"
                                id="btn_sch"
                                name="btn_sch"
                                value="Schedule"
                                onclick="check_prev_details(1);"
                              >
                                <i className="fa fa-calendar" />
                                &nbsp;Schedule
                              </button>
                            </div>
                          </div>
                        </td>
                        <td align="center">
                          <button
                            type="button"
                            className="btn btn-dark btn-sm"
                            id="btn_send"
                            name="btn_send"
                            value="Send Now"
                            onclick="check_prev_details(2);"
                          >
                            <i className="fa fa-send" />
                            &nbsp;Send Now
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MessagesMassMailCampaignStep5;
