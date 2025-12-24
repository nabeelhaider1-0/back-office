/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";

import Header2 from "../header2/header2";
import MultiSelect from "../reactMultiSelect";
import Constants from "../../constants/routes";
import React, { useEffect, useState } from "react";
import { Slide, toast } from "react-toastify";
import LOGO from "../../assets/images/logo.png";
import { delDATA, getDATA, postDATA, putDATA } from "../../Apis/API";
import {
  deleteConfirmation,
  ErrorApiAlert,
  SimpleAlert,
  SuccessApiToast,
} from "../../constants/globalfunctions";

import { setEditSubAgent } from "../../state/action/actions";
import { connect } from "react-redux";

import loadingGif from "../../assets/images/loadingblue.gif";
import ApiRoutes from "../../constants/ApiRoutes";

const CustomersAgentSearchUsers = ({ setEditSubAgent }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleEdditClick = (agent) => {
    setEditSubAgent(agent);
  };
  const [formData, setFormData] = useState({
    selectedAgent: "",
    agencyName: "",
    username: "",
    contactPerson: "",
    email: "",
  });
  const [agentsData, setAgentsData] = useState([]);
  const [originalAgentsData, setOriginalAgentsData] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleInputSearchChange = (event) => {
    const { value } = event.target;
    setSearchInput(value);

    // Perform filtering as the user types
    const filtereData = originalAgentsData.filter((data) =>
      data.agencyName.toLowerCase().includes(value.toLowerCase())
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

  const [agencyOptions, setAgencyOptions] = useState([]);
  const updateAgentPassword = (uuid, password, agentsData) => {
    return agentsData.map((agent) => {
      if (agent.uuid === uuid) {
        return { ...agent, actualpassword: password };
      }

      if (agent.subAgents && agent.subAgents.length > 0) {
        const updatedSubAgents = agent.subAgents.map((subAgent) =>
          subAgent.uuid === uuid
            ? { ...subAgent, actualpassword: password }
            : subAgent
        );
        return { ...agent, subAgents: updatedSubAgents };
      }

      return agent;
    });
  };

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
        const updatedOriginalAgentData = updateAgentPassword(
          uuid,
          password,
          originalAgentsData
        );
        setOriginalAgentsData(updatedOriginalAgentData);
        setAgentsData(updatedOriginalAgentData);
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

  const updateAgentStatus = (uuid, status, agentsData) => {
    return agentsData.map((agent) => {
      if (agent.uuid === uuid) {
        return { ...agent, status: status };
      }

      if (agent.subAgents && agent.subAgents.length > 0) {
        const updatedSubAgents = agent.subAgents.map((subAgent) =>
          subAgent.uuid === uuid ? { ...subAgent, status: status } : subAgent
        );
        return { ...agent, subAgents: updatedSubAgents };
      }

      return agent;
    });
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
        const updatedOriginalAgentData = updateAgentStatus(
          uuid,
          status,
          originalAgentsData
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

  const getAgents = async () => {
    try {
      setLoading(true);
      // Set loading to true when fetching data
      const response = await getDATA(ApiRoutes.CUSTOMER_AGENTS.AGENT);
      if (response.data.statusCode === 200) {
        const agents = response && response.data.data ? response.data.data : [];

        setAgentsData(agents || []); // Set data.subAgents or an empty array if null/undefined
        setOriginalAgentsData(agents || []);
        const uniqueAgencyNamesWithSubAgents = [];

        // Iterate through agents to collect unique agency names with sub-agents
        agents.forEach((agent) => {
          if (agent.subAgents && agent.subAgents.length > 0) {
            if (!uniqueAgencyNamesWithSubAgents.includes(agent.agencyName)) {
              uniqueAgencyNamesWithSubAgents.push(agent.agencyName);
            }
          }
        });

        // Format unique agency names as options
        const uniqueAgencyOptions = uniqueAgencyNamesWithSubAgents.map(
          (agencyName) => ({ label: agencyName, value: agencyName })
        );
        // Add a default option
        uniqueAgencyOptions.unshift({ label: "-Select Agent-", value: "" });

        // Set the options to state (assuming you have a state setter for agency options)
        setAgencyOptions(uniqueAgencyOptions);
      }

      // Handle successful authentication, e.g., set user state, redirect, etc.
    } catch (error) {
      ErrorApiAlert("Error Fetching Agents");
    } finally {
      setLoading(false); // Set loading to false after data is fetched (whether successful or not)
    }
  };
  useEffect(() => {
    getAgents();
  }, []);

  // Check if subAgents is null, undefined, or empty

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
  const filterAgentsData = (uuid, agentsData) => {
    return agentsData
      .map((agent) => {
        if (agent.subAgents && agent.subAgents.length > 0) {
          agent.subAgents = agent.subAgents.filter(
            (subAgent) => subAgent.uuid !== uuid
          );
        }
        return agent;
      })
      .filter(
        (agent) =>
          agent.uuid !== uuid || (agent.subAgents && agent.subAgents.length > 0)
      );
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
        setAgentsData((agents) => filterAgentsData(uuid, agents));
        setOriginalAgentsData((agents) => filterAgentsData(uuid, agents));
      } else {
      }
    } catch (error) {
      // console.error("Error occurred:", error);
    }
  };

  const agentHasSubAgents = (agent) =>
    agent.subAgents && agent.subAgents.length > 0;
  const hasAnySubAgents = agentsData.some(agentHasSubAgents);

  //
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      selectedAgent: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const filteredAgents = originalAgentsData.reduce((result, agent) => {
      // Normalize form data for comparison
      const lowerSelectedAgent = formData.selectedAgent.trim().toLowerCase();
      const lowerAgencyName = formData.agencyName.trim().toLowerCase();
      const lowerUsername = formData.username.trim().toLowerCase();
      const lowerContactPerson = formData.contactPerson.trim().toLowerCase();
      const lowerEmail = formData.email.trim().toLowerCase();

      // Check if the main agent matches the selectedAgent criteria
      const matchesSelectedAgent = lowerSelectedAgent
        ? agent.agencyName.toLowerCase().includes(lowerSelectedAgent)
        : true;

      // If no additional criteria are provided and selectedAgent is matched, return main agent
      if (
        !lowerAgencyName &&
        !lowerUsername &&
        !lowerContactPerson &&
        !lowerEmail
      ) {
        if (matchesSelectedAgent) {
          result.push(agent);
        }
        return result;
      }

      // Filter sub-agents if additional criteria are provided
      const filteredSubAgents = agent.subAgents
        ? agent.subAgents.filter((subAgent) => {
            const lowerSubAgencyName = subAgent.companyname
              ? subAgent.companyname.toLowerCase()
              : "";
            const lowerSubUsername = subAgent.userName
              ? subAgent.userName.toLowerCase()
              : "";
            const lowerSubContactPerson =
              subAgent.firstName && subAgent.lastName
                ? `${subAgent.firstName} ${subAgent.middleName || ""} ${
                    subAgent.lastName
                  }`
                    .replace(/\s+/g, " ")
                    .trim()
                    .toLowerCase()
                : "";
            const lowerSubEmail = subAgent.email
              ? subAgent.email.toLowerCase()
              : "";

            // Check if sub-agent matches all provided criteria
            const matchesSubAgencyName = lowerAgencyName
              ? lowerSubAgencyName.includes(lowerAgencyName)
              : true;
            const matchesSubUsername = lowerUsername
              ? lowerSubUsername.includes(lowerUsername)
              : true;
            const matchesSubContactPerson = lowerContactPerson
              ? lowerSubContactPerson.includes(lowerContactPerson)
              : true;
            const matchesSubEmail = lowerEmail
              ? lowerSubEmail.includes(lowerEmail)
              : true;

            return (
              matchesSubAgencyName &&
              matchesSubUsername &&
              matchesSubContactPerson &&
              matchesSubEmail
            );
          })
        : [];

      // Return main agent if it matches the selectedAgent and/or has matching sub-agents
      if (matchesSelectedAgent && filteredSubAgents.length > 0) {
        result.push({ ...agent, subAgents: filteredSubAgents });
      }

      return result;
    }, []);

    // Console logs for debugging

    setAgentsData(filteredAgents);
  };

  const resetform = async () => {
    setFormData({
      selectedAgent: "",
      agencyName: "",
      username: "",
      contactPerson: "",
      email: "",
    });
    setAgentsData(originalAgentsData);
  };
  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <Header2 title="VIEW USERS" linkText1="View Users" />

        {/* First Row*/}
        <form onSubmit={handleSubmit}>
          <div className="row mt-2">
            <div className="col-md-2 form-group">
              <label>Agent</label>
              <MultiSelect
                options={agencyOptions}
                isSearchable
                placeholder="Select Agent"
                noOptionsMessage={() => "No Agent Found"}
                className="custom-select"
                onChange={handleSelectChange}
                value={agencyOptions.find(
                  (option) => option.value === formData.selectedAgent
                )}
              />
            </div>
            <div className="col-md-2 mt-1 form-group">
              <label>Agency Name</label>
              <input
                type="text"
                className="form-control form-control-sm"
                name="agencyName"
                value={formData.agencyName}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-2 mt-1 form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control form-control-sm"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-2 mt-1 form-group">
              <label>Contact Person</label>
              <input
                type="text"
                className="form-control form-control-sm"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-2 mt-1 form-group">
              <label>Email</label>
              <input
                type="text"
                className="form-control form-control-sm"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-2 form-group">
              <span id="submit_td">
                <button type="submit" className="btn btn-dark btn-sm">
                  <i className="fa fa-search" aria-hidden="true"></i> Search
                </button>
              </span>
              &nbsp;&nbsp;
              <button
                className="btn btn-outline-secondary btn-sm"
                type="reset"
                id="reset"
                name="reset"
                value="Reset"
                onClick={() => resetform()}
                data
              >
                <i className="fa fa-repeat" /> &nbsp;Reset
              </button>
            </div>
          </div>
        </form>
        <br />
        {/* 3rd Row */}
        {loading && (
          <div className="text-center">
            <img src={loadingGif} alt="Loading..." height={250} />
          </div>
        )}
        {!loading && (
          <>
            <form style={{ paddingRight: "12px", paddingBottom: "1px" }}>
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
                        placeholder="Agent"
                        value={searchInput}
                        onChange={handleInputSearchChange}
                      />
                    </div>
                  </div>
                </div>
                {hasAnySubAgents ? (
                  <div className="col-sm-12 mt-2">
                    <div id="wrapper2" style={{ overflow: "auto" }}>
                      <table
                        id="search_agents_table1"
                        className="table   table-responsive dataTable no-footer table-bordered"
                        role="grid"
                        aria-describedby="search_agents_table1_info"
                      >
                        <thead>
                          <tr role="row">
                            <th
                              className="no-sort sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Agent"
                              style={{ width: "94px" }}
                            >
                              Agent
                            </th>
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
                              aria-label="Email"
                              style={{ width: "133px" }}
                            >
                              Email
                            </th>
                            <th
                              className="no-sort sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Status"
                              style={{ width: "100px" }}
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
                          {agentsData.map((agent, agentIndex) => (
                            <React.Fragment key={agentIndex}>
                              {agentHasSubAgents(agent)
                                ? agent.subAgents.map((subagnt, subIndex) => (
                                    <tr
                                      key={subIndex}
                                      className={
                                        "phps_row_" +
                                        (subIndex % 2 === 0
                                          ? "0 even"
                                          : "1 odd")
                                      }
                                      role="row"
                                    >
                                      <td>{agent.agencyName}</td>
                                      <td>
                                        {subagnt.companyname
                                          ? subagnt.companyname
                                          : "-"}
                                      </td>
                                      <td>
                                        {subagnt.userName
                                          ? subagnt.userName
                                          : "-"}
                                      </td>
                                      <td>
                                        {subagnt.firstName && subagnt.lastName
                                          ? `${subagnt.firstName} ${subagnt.middleName} ${subagnt.lastName}`
                                              .replace(/\s+/g, " ")
                                              .trim()
                                          : "-"}
                                      </td>
                                      <td>{subagnt.email}</td>
                                      <td>
                                        <h5>
                                          <span
                                            className={`td_label ${
                                              subagnt.status
                                                ? "label-success"
                                                : "label-default"
                                            }`}
                                          >
                                            {subagnt.status
                                              ? "Active"
                                              : "In Active"}
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
                                                  handleUpdateStatus(
                                                    subagnt.uuid,
                                                    false
                                                  );
                                                }}
                                              >
                                                <i className="fa fa-check-circle"></i>
                                              </Link>
                                            ) : (
                                              <Link
                                                to="#"
                                                onClick={() => {
                                                  handleUpdateStatus(
                                                    subagnt.uuid,
                                                    true
                                                  );
                                                }}
                                              >
                                                <i className="fa fa-times-circle"></i>
                                              </Link>
                                            )}
                                          </div>
                                          <div
                                            className="input-group-addon"
                                            id="ad_3"
                                          >
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
                                  ))
                                : null}
                            </React.Fragment>
                          ))}
                        </tbody>
                      </table>
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
              </div>
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
                    <div
                      className="panel-heading"
                      style={{ paddingLeft: "12px" }}
                    >
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
                              onChange={(e) =>
                                setConfirmPassword(e.target.value)
                              }
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
          </>
        )}
      </div>
    </>
  );
};

export default connect(null, { setEditSubAgent })(CustomersAgentSearchUsers);
