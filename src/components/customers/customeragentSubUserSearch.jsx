import React, { useEffect, useState } from "react";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { setEditSubAgent } from "../../state/action/actions";
import { Slide, toast } from "react-toastify";
import LOGO from "../../assets/images/logo.png";
import { delDATA, postDATA, putDATA } from "../../Apis/API";
import {
  deleteConfirmation,
  ErrorApiAlert,
  SimpleAlert,
  SuccessApiToast,
} from "../../constants/globalfunctions";
import ApiRoutes from "../../constants/ApiRoutes";

const CustomeragentSubUserSearch = ({ data, setEditSubAgent }) => {
  const [searchInput, setSearchInput] = useState("");
  const navigateOnRefresh = useNavigate();
  const handleEdditClick = (agent) => {
    setEditSubAgent(agent);
  };
  const [agentsData, setAgentsData] = useState([]);
  const [originalAgentsData, setOriginalAgentsData] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleInputSearchChange = (event) => {
    const { value } = event.target;
    setSearchInput(value);

    // Perform filtering as the user types
    const filtereData = originalAgentsData.filter((data) =>
      data.userName.toLowerCase().includes(value.toLowerCase())
    );

    setAgentsData(filtereData);
  };
  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
  };

  const [uuid, setUuid] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    // Check if password fields are empty
    if (!password || !confirmPassword) {
      toast.error("Please fill in both password fields.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match ", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
      return;
    }

    try {
      const response = await putDATA(
        ApiRoutes.CUSTOMER_AGENTS.UPDATE_SUB_AGENT,
        uuid,
        { password: password, updatepassword: true }
      );

      if (response.data.statusCode === 200) {
        SuccessApiToast("Password Updated Successfully");
        const updatedOriginalAgentData = originalAgentsData.map((agent) =>
          agent.uuid === uuid ? { ...agent, actualpassword: password } : agent
        );
        // Set the updated original transfer data back to state
        setOriginalAgentsData(updatedOriginalAgentData);
        // Also, update the transfer data displayed on the page
        setAgentsData(updatedOriginalAgentData);
        setPassword("");
        setConfirmPassword("");
        setUuid("");
      }
    } catch (error) {
      ErrorApiAlert("Error Updating Password");
    }
  };
  const handleUpdateStatus = async (uuid, status) => {
    try {
      // Make an API call to update the staff's active status

      const response = await putDATA(
        ApiRoutes.CUSTOMER_AGENTS.UPDATE_SUB_AGENT,
        uuid,
        { status: status, updatepassword: false }
      );

      // Check the response and handle it accordingly
      if (response.data.statusCode === 200) {
        // Successfully updated staff's active status, update the UI or perform other action
        // Show SweetAlert notification
        SimpleAlert(
          "success",
          "Success",
          `Sub Agent is now ${status === true ? "Active" : "In Active"}`
        );

        // Find the transfer with the matching UUID in the original data
        const updatedOriginalAgentData = originalAgentsData.map((agent) =>
          agent.uuid === uuid ? { ...agent, status: status } : agent
        );
        // Set the updated original transfer data back to state
        setOriginalAgentsData(updatedOriginalAgentData);
        // Also, update the transfer data displayed on the page
        setAgentsData(updatedOriginalAgentData);
        // You may want to fetch the updated staff data or update the local state accordingly
      } else {
        // Handle other response statuses or errors

        // Show SweetAlert notification for error

        SimpleAlert("error", "Error", "Failed to update Sub Agent status");
      }
    } catch (error) {
      // Handle errors from the API call

      SimpleAlert("error", "Error", "An unexpected error occurred.");
    }
  };
  const handlePasswordChangeClick = (uuid, username, password) => {
    setUuid(uuid);
    setUsername(username);
    setPassword(password);
  };
  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      setAgentsData(data.subAgents || []); // Set data.subAgents or an empty array if null/undefined
      setOriginalAgentsData(data.subAgents || []);
    } else {
      navigateOnRefresh(Constants.URLConstants.CUSTOMERSAGENTSSEARCHBUTTON);
    }
  }, [data, navigateOnRefresh]);

  // Check if subAgents is null, undefined, or empty
  const hasSubAgents = data.subAgents && data.subAgents.length > 0;
  const handleEmailSend = async (e, requestBody) => {
    e.preventDefault();

    try {
      const response = await postDATA(
        requestBody,
        ApiRoutes.CUSTOMER_AGENTS.SUB_AGENT_EMAILS
      );
      if (response.data.statusCode === 200) {
        SuccessApiToast("Email Sent Successfully");
      }
    } catch (error) {
      ErrorApiAlert("Error Sending  Email");
    }
  };
  const handleDeleteClick = async (uuid) => {
    try {
      const isDeleted = await deleteConfirmation(
        "Are You Sure You Want To Delete This Sub Agent?",
        "warning",
        "OK",
        "Cancel",
        uuid,
        delDATA, // Pass delDATA function as an argument
        "Sub Agent has been deleted successfully.",
        ApiRoutes.CUSTOMER_AGENTS.DELETE_SUB_AGENT
      );

      if (isDeleted) {
        setAgentsData((agent) => agent.filter((r) => r.uuid !== uuid));

        setOriginalAgentsData((agent) => agent.filter((r) => r.uuid !== uuid));
      } else {
      }
    } catch (error) {
      // console.error("Error occurred:", error);
    }
  };
  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <Header2
          title="VIEW USER DETAILS"
          linkText1="Search Agent"
          linkText2="View Agent"
          link1={Constants.URLConstants.CUSTOMERSAGENTSSEARCHBUTTON}
        />

        <form style={{ paddingRight: "12px", paddingBottom: "1px" }}>
          <div className="col-md-2 form-group">
            <label>&nbsp;</label>
            <br />
            <Link
              to={Constants.URLConstants.CUSTOMERAGENTSUBUSERNEW}
              className="btn btn-outline-secondary btn-sm form-group search"
              name="submit1"
            >
              <i className="fa fa-plus" /> Add User
            </Link>
          </div>
          <br />
          <br />

          {hasSubAgents ? (
            <div className="row">
              <div className="row">
                <div className="col-md-3" />
                <div className="col-md-3" />
                <div className="col-md-4" />
                <div className="col-md-2">
                  <style
                    dangerouslySetInnerHTML={{
                      __html:
                        "\n                                    .table tr[visible='false'],\n                                    .no-result {\n                                        display: none;\n                                        border: 1px solid #ddd;\n                                        padding: 10px;\n                                        margin-top: -2px;\n                                    }\n\n                                    .table tr[visible='true'] {\n                                        display: table-row;\n                                    }\n\n                                    .counter {\n                                        padding: 8px;\n                                        color: #ccc;\n                                    }\n\n                                    .search_new {\n                                        float: right;\n                                        height: 35px;\n                                        margin-bottom: 0px;\n                                        padding-left: 5px;\n                                    }\n                                ",
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
                      placeholder="User Name"
                      value={searchInput}
                      onChange={handleInputSearchChange}
                    />
                  </div>
                </div>
              </div>
              <div className="col-sm-12 mt-2">
                <div id="wrapper2" style={{ overflow: "auto" }}>
                  <table
                    id="search_agents_table1"
                    className="table   table-responsive dataTable no-footer table-bordered "
                    role="grid"
                    aria-describedby="search_agents_table1_info"
                  >
                    <thead>
                      <tr role="row">
                        <th
                          className="no-sort sorting_disabled"
                          rowSpan={1}
                          colSpan={1}
                          aria-label="Agency Name"
                          style={{ width: "94px" }}
                        >
                          Agency Name
                        </th>
                        <th
                          className="no-sort sorting_disabled"
                          rowSpan={1}
                          colSpan={1}
                          aria-label="User Name"
                          style={{ width: "94px" }}
                        >
                          User Name
                        </th>
                        <th
                          className="no-sort sorting_disabled"
                          rowSpan={1}
                          colSpan={1}
                          aria-label="Contact Person"
                          style={{ width: "114px" }}
                        >
                          Contact Person
                        </th>
                        <th
                          className="no-sort sorting_disabled"
                          rowSpan={1}
                          colSpan={1}
                          aria-label="Status"
                          style={{ width: "133px" }}
                        >
                          Status
                        </th>
                        <th
                          className="no-sort sorting_disabled"
                          rowSpan={1}
                          colSpan={1}
                          aria-label="Actions"
                          style={{ width: "205px" }}
                        >
                          &nbsp;Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {agentsData.map((subagnt, index) => (
                        <React.Fragment key={index}>
                          <tr
                            className={
                              "phps_row_" +
                              (index % 2 === 0 ? "0 even" : "1 odd")
                            }
                            role="row"
                          >
                            <td>
                              {subagnt.companyname ? subagnt.companyname : "-"}
                            </td>
                            <td>{subagnt.userName ? subagnt.userName : "-"}</td>
                            <td>
                              {subagnt.firstName && subagnt.lastName
                                ? `${subagnt.firstName} ${subagnt.middleName} ${subagnt.lastName}`
                                    .replace(/\s+/g, " ")
                                    .trim()
                                : "-"}
                            </td>
                            <td>
                              <h5>
                                <span
                                  className={`td_label ${
                                    subagnt.status
                                      ? "label-success"
                                      : "label-default"
                                  }`}
                                >
                                  {subagnt.status ? "Active" : "In Active"}
                                </span>
                              </h5>
                            </td>
                            <td className="actionlink">
                              <div className="actionCont ">
                                {/* Action links */}
                                <div className="input-group-addon">
                                  <Link
                                    data-bs-toggle="tooltip"
                                    title="Edit"
                                    data-placement="top"
                                    to={
                                      Constants.URLConstants
                                        .CUSTOMERAGENTSUBUSEREDIT
                                    }
                                    onClick={() => {
                                      handleEdditClick(subagnt);
                                    }}
                                  >
                                    <i className="fa fa-pencil-square-o" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    data-bs-toggle="modal"
                                    data-bs-target="#myModal"
                                    title="Change Password"
                                    data-placement="top"
                                    onClick={() =>
                                      handlePasswordChangeClick(
                                        subagnt.uuid,
                                        subagnt.userName,
                                        subagnt.actualpassword
                                      )
                                    }
                                  >
                                    <i className="fa fa-key" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to="https://beta.tdonlines.com/agnt_search.php"
                                    onClick={() => {
                                      /* Add click handler logic if needed */
                                    }}
                                    data-bs-toggle="tooltip"
                                    title="Login as Admin"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-user" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title="Click To Deactivate"
                                >
                                  {subagnt.status ? (
                                    <Link
                                      to="#"
                                      onClick={() => {
                                        handleUpdateStatus(subagnt.uuid, false);
                                      }}
                                    >
                                      <i className="fa fa-check-circle"></i>
                                    </Link>
                                  ) : (
                                    <Link
                                      to="#"
                                      onClick={() => {
                                        handleUpdateStatus(subagnt.uuid, true);
                                      }}
                                    >
                                      <i className="fa fa-times-circle"></i>
                                    </Link>
                                  )}
                                </div>
                                <div className="input-group-addon" id="ad_3">
                                  <Link
                                    to="#"
                                    onClick={(event) => {
                                      handleEmailSend(event, {
                                        uuid: subagnt.uuid,
                                        emailType: "acknowledgement",
                                      });
                                    }}
                                  >
                                    <i
                                      className="fa fa fa-envelope-o"
                                      title="Acknowledgement Email"
                                      data-placement="top"
                                    />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to="#"
                                    onClick={() =>
                                      handleDeleteClick(subagnt.uuid)
                                    }
                                  >
                                    <i className="fa fa-trash" />{" "}
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="panel-body">
              <div
                className="alert alert-danger text-center"
                style={{
                  color: "var(--color-white) !important",
                  backgroundColor: "#f2dede !important",
                  fontWeight: "normal !important",
                  fontSize: "12px !important",
                }}
              >
                <h5
                  style={{
                    fontWeight: "normal",
                    fontSize: "16px",
                    color: "#A94442",
                  }}
                >
                  No User for this Agent.
                </h5>
              </div>
            </div>
          )}
        </form>
        <div
          class="modal fade"
          id="myModal"
          tabindex="-1"
          role="dialog"
          aria-hidden="true"
        >
          <div class="modal-dialog" style={{ width: "500px" }}>
            <div className="modal-content">
              <div className="modal-body">
                <span
                  class="fa fa-times-circle fa-4 closeBtn"
                  data-bs-dismiss="modal"
                ></span>
                <div className="siteLogo">
                  <img src={LOGO} alt="" style={{ width: "110px" }} />
                </div>
                <hr />
                <div className="panel-heading" style={{ paddingLeft: "12px" }}>
                  CHANGE PASSWORD
                </div>
                <div className="panel-body">
                  <form onSubmit={(e) => handleUpdatePassword(e, uuid)}>
                    <div className="row">
                      <div className="form-group col-md-12">
                        <label>Username</label>
                        <div
                          style={{
                            fontFamily: "Montserrat",
                            textTransform: "uppercase",
                          }}
                        >
                          {username}
                        </div>
                      </div>
                      <div
                        className="form-group col-md-12"
                        style={{ position: "relative" }}
                      >
                        <label>Password</label>
                        <input
                          className="required form-control form-control-sm"
                          type={showPassword ? "text" : "password"}
                          name="txt_password"
                          id="txt_password"
                          size="45"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          maxlength="15"
                        />
                        <span
                          className={`password-togglee ${
                            showPassword ? "show" : ""
                          }`}
                          onClick={handleTogglePassword}
                        >
                          <i
                            className={`far fa-eye${
                              showPassword ? "-slash" : ""
                            }`}
                          ></i>
                        </span>
                      </div>
                      <div
                        className="form-group col-md-12"
                        style={{ position: "relative" }}
                      >
                        <label>Confirm Password</label>
                        <input
                          className="required form-control form-control-sm"
                          type={showConfirmPassword ? "text" : "password"}
                          name="txt_confirm_password"
                          size="45"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          maxlength="15"
                        />
                        <span
                          className={`password-togglee ${
                            showConfirmPassword ? "show" : ""
                          }`}
                          onClick={handleToggleConfirmPassword}
                        >
                          <i
                            className={`far fa-eye${
                              showConfirmPassword ? "-slash" : ""
                            }`}
                          ></i>
                        </span>
                      </div>
                    </div>
                    <div className="form-group col-md-12 mt-2">
                      <button
                        className="btn btn-dark btn-sm"
                        type="submit"
                        name="b1"
                      >
                        <i className="fa fa-floppy-o"></i>
                        &nbsp;&nbsp;Save
                      </button>
                      <span id="loading" style={{ display: "none" }}>
                        <img src="images/loading.gif" alt="" />
                      </span>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { setEditSubAgent })(
  CustomeragentSubUserSearch
);
