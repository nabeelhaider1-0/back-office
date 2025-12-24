// src/components/bookings/ViewBookingComponents/AgentInfo.js
import React from "react";
import { Link } from "react-router-dom";
import minus from "../../../assets/images/minus_white_img.jpg";
import MultiSelect from "../../reactMultiSelect";
import { viewsearchbookings_managers_options } from "../../../constants/contants";

const AgentInfo = ({
  bookingId = "ESP0000001",
  agentRef = "WEGOAWS23223033",
  show_span_agent_ref,
  show_span,
  isEditing = false,
}) => {
  return (
    <>
      <tr className="phps_row_1 tblHeading" id={`acc4_${bookingId}`}>
        <td colSpan={4}>
          <img src={minus} id={`moreFilterBtn4_${bookingId}`} alt="cri" /> Agent
          Information
        </td>
      </tr>
      <tr id={`accCont4_${bookingId}`} className="accContent">
        <td colSpan={4}>
          <div className="contwrap" id={`r_4_${bookingId}`}>
            <table
              width="100%"
              cellPadding={2}
              cellSpacing={1}
              align="center"
              border={0}
              className="table table-bordered table-responsive table-box tableborder"
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
                              <div
                                className="input-group-addon"
                                style={{ marginLeft: "142px" }}
                              >
                                <Link
                                  to={`http://beta.tdonlines.com/agent_login.php?tms=1&action_type=login&txt_username=wego_ws&txt_password=dcb9e29be202e2ce1c9014f93b939acbfb1245ea9cde66456f228b71566c2f61&txt_agent_code=CD0316&FLAG=view&booking_id=${bookingId}&login_from_backend=yes&admin_user=Beta_Tdo&consultant_id=Beta_Tdo`}
                                  target="_blank"
                                >
                                  <i
                                    className="fa fa-sign-in"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Login Agent"
                                    aria-hidden="true"
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
                      id={`display_agent_ref_${bookingId}`}
                      style={{ display: isEditing ? "none" : "block" }}
                    >
                      <span
                        id={`voucher_agent_ref_${bookingId}`}
                        style={{
                          display: "table-cell",
                          verticalAlign: "middle",
                        }}
                      >
                        {agentRef}
                      </span>
                      <div
                        onClick={() => show_span_agent_ref("edit", bookingId)}
                        className="input-group-addon"
                        style={{ marginLeft: "177px" }}
                      >
                        <Link
                          onClick={() => show_span_agent_ref("edit", bookingId)}
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Edit"
                        >
                          <i
                            className="fa fa-pencil-square-o"
                            aria-hidden="true"
                          />
                        </Link>
                      </div>
                    </span>
                    <span
                      className="input-group date col-md-12 col-sm-12"
                      id={`edit_agent_ref_${bookingId}`}
                      style={{ display: isEditing ? "block" : "none" }}
                    >
                      <input
                        className="form-control"
                        type="text"
                        name={`agent_ref_${bookingId}`}
                        id={`agent_ref_${bookingId}`}
                        defaultValue={agentRef}
                      />
                      <div
                        onClick={() => show_span_agent_ref("save", bookingId)}
                        className="input-group-addon"
                      >
                        <Link
                          onClick={() => show_span_agent_ref("save", bookingId)}
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Save"
                        >
                          <h6>
                            <i className="fa fa-floppy-o" aria-hidden="true" />
                          </h6>
                        </Link>
                      </div>
                      <div
                        onClick={() => show_span_agent_ref("cancel", bookingId)}
                        className="input-group-addon"
                      >
                        <Link
                          onClick={() =>
                            show_span_agent_ref("cancel", bookingId)
                          }
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Cancel"
                        >
                          <h6>
                            <i className="fa fa-times" aria-hidden="true" />
                          </h6>
                        </Link>
                      </div>
                    </span>
                  </td>
                </tr>
                <tr className="phps_row_1">
                  <td width="25%">Consultant Name</td>
                  <td width="25%" />
                  <td width="25%">
                    <input
                      type="hidden"
                      defaultValue={bookingId}
                      name="temp_booking_id"
                      id="temp_booking_id"
                    />
                    Sales Manager
                  </td>
                  <td width="25%">
                    <div
                      className="input-group date col-md-12 col-sm-12"
                      id={`display_manager_${bookingId}`}
                    >
                      <span
                        id={`sales_manager_name_${bookingId}`}
                        style={{
                          display: "table-cell",
                          verticalAlign: "middle",
                        }}
                      >
                        <font color="#008000">-</font>
                      </span>
                      <div
                        className="input-group-addon"
                        onClick={() => show_span("edit", bookingId)}
                        style={{ marginLeft: "288px" }}
                      >
                        <span
                          data-toggle="tooltip"
                          data-placement="top"
                          title="edit"
                          alt="edit"
                          data-original-title="edit"
                        >
                          <i
                            className="fa fa-pencil-square-o"
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                    </div>
                    <span
                      id={`edit_manager_${bookingId}`}
                      className="input-group date col-md-12 col-sm-12"
                      style={{ display: "none" }}
                    >
                      <div className="dropdown bootstrap-select form-control show-menu-arrow">
                        <MultiSelect
                          options={viewsearchbookings_managers_options}
                          isMulti
                          isSearchable
                          placeholder="- Select Manager -"
                          noOptionsMessage={() => "No Option Found"}
                          className="custom-select"
                        />
                        <button
                          type="button"
                          className="btn dropdown-toggle btn-light bs-placeholder"
                          data-toggle="dropdown"
                          aria-owns={`bs-select-7_${bookingId}`}
                          aria-haspopup="listbox"
                          aria-expanded="false"
                          data-id={`sales_manager_${bookingId}`}
                          title="Select Manager"
                        >
                          <div className="filter-option">
                            <div className="filter-option-inner">
                              <div className="filter-option-inner-inner">
                                Select Manager
                              </div>
                            </div>
                          </div>
                        </button>
                        <div className="dropdown-menu">
                          <div className="bs-searchbox">
                            <input
                              type="search"
                              className="form-control"
                              autoComplete="off"
                              aria-label="Search"
                              aria-controls={`bs-select-7_${bookingId}`}
                              aria-autocomplete="list"
                            />
                          </div>
                          <div
                            className="inner show"
                            role="listbox"
                            id={`bs-select-7_${bookingId}`}
                            tabIndex={-1}
                          >
                            <ul
                              className="dropdown-menu inner show"
                              role="presentation"
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        className="input-group-addon"
                        onClick={() => show_span("save", bookingId)}
                      >
                        <Link
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Save"
                        >
                          <h6>
                            <i className="fa fa-floppy-o" aria-hidden="true" />
                          </h6>
                        </Link>
                      </div>
                      <div
                        className="input-group-addon"
                        onClick={() => show_span("cancel", bookingId)}
                      >
                        <Link
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Cancel"
                        >
                          <h6>
                            <i className="fa fa-times" aria-hidden="true" />
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
    </>
  );
};

export default AgentInfo;
