import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";
import MultiSelect from "../reactMultiSelect";
import {
  agentTypeOptions,
  documentsType,
  statusOptions,
} from "../../constants/contants";

import { delDATA, getDATA, postDATA, putDATA } from "../../Apis/API";
import {
  deleteConfirmation,
  ErrorApiAlert,
  PaginationSetter,
  RequiredFieldAlert,
  SimpleAlert,
  SuccessApiToast,
} from "../../constants/globalfunctions";
import loadingGif from "../../assets/images/loadingblue.gif";
import * as XLSX from "xlsx"; // Import xlsx library
import { setEditAgent } from "../../state/action/actions";
import { connect } from "react-redux";
import uploadFile from "../../constants/filesuploader";
import ApiRoutes from "../../constants/ApiRoutes";

const CustomersAgentSearchButton = ({ setEditAgent }) => {
  const [expandedRows, setExpandedRows] = useState([]);
  const [agentsData, setAgentsData] = useState([]);
  const [originalAgentsData, setOriginalAgentsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [cityoptions, setCityOptions] = useState([]);
  const [consultantoptions, setConsultantOptions] = useState([]);
  const [salesmanageroptions, setSalesManagerOptions] = useState([]);
  const [branchoptions, setBranchOptions] = useState([]);
  const [countryoptions, setCountryOptions] = useState([]);
  const handleEdditClick = (agent) => {
    setEditAgent(agent);
  };
  const getAgents = async () => {
    try {
      setLoading(true);
      // Set loading to true when fetching data
      const response = await getDATA(ApiRoutes.CUSTOMER_AGENTS.AGENT);
      if (response.data.statusCode === 200) {
        const agents = response && response.data.data ? response.data.data : [];

        setOriginalAgentsData(agents);
        setAgentsData(agents);
        let uniqueCities = [];
        let uniqueCountries = [];
        let uniqueConsultant = [];
        let uniqueSalesManager = [];
        let uniqueBranches = [];
        // Loop through transfers to collect unique values
        agents.forEach((agent) => {
          // Collect unique cities
          let consultantName =
            agent.consultant &&
            agent.consultant.firstName &&
            agent.consultant.lastName
              ? `${agent.consultant.firstName} ${agent.consultant.middleName} ${agent.consultant.lastName}`
                  .replace(/\s+/g, " ")
                  .trim()
              : "-";
          let salesmanagerName =
            agent.salesmanager &&
            agent.salesmanager.firstName &&
            agent.salesmanager.lastName
              ? `${agent.salesmanager.firstName} ${agent.salesmanager.middleName} ${agent.salesmanager.lastName}`
                  .replace(/\s+/g, " ")
                  .trim()
              : "-";

          if (!uniqueConsultant.includes(consultantName)) {
            uniqueConsultant.push(consultantName);
          }
          if (!uniqueSalesManager.includes(salesmanagerName)) {
            uniqueSalesManager.push(salesmanagerName);
          }
          if (!uniqueCities.includes(agent.city)) {
            uniqueCities.push(agent.city);
          }
          if (!uniqueBranches.includes(agent.branch.branchName)) {
            uniqueBranches.push(agent.branch.branchName);
          }

          // Collect unique countries
          if (!uniqueCountries.includes(agent.country)) {
            uniqueCountries.push(agent.country);
          }
        });
        // Format unique cities as an array of objects
        const uniqueCitiesOptions = uniqueCities.map((city) => ({
          label: city,
          value: city,
        }));
        // Add a default option
        uniqueCitiesOptions.unshift({ label: "-Select City-", value: "" });
        const uniqueConsultantOptions = uniqueConsultant.map((c) => ({
          label: c,
          value: c,
        }));

        const uniquesalesOptions = uniqueSalesManager.map((c) => ({
          label: c,
          value: c,
        }));
        // Format unique countries as an array of objects
        const uniqueCountriesOptions = uniqueCountries.map((country) => ({
          label: country,
          value: country,
        }));
        const uniqueBranchesOptions = uniqueBranches.map((b) => ({
          label: b,
          value: b,
        }));
        // Add a default option
        uniqueCountriesOptions.unshift({
          label: "-Select Country-",
          value: "",
        });
        uniqueConsultantOptions.unshift({
          label: "-Select Consultant-",
          value: "",
        });
        uniquesalesOptions.unshift({
          label: "-Select SalesManager-",
          value: "",
        });
        uniqueBranchesOptions.unshift({
          label: "-Select SalesManager-",
          value: "",
        });
        setCountryOptions(uniqueCountriesOptions);
        setCityOptions(uniqueCitiesOptions);
        setConsultantOptions(uniqueConsultantOptions);
        setBranchOptions(uniqueBranchesOptions);
        setSalesManagerOptions(uniquesalesOptions);
      }

      // Handle successful authentication, e.g., set user state, redirect, etc.
    } catch (error) {
      ErrorApiAlert("Error Fetching Agents");
    } finally {
      setLoading(false);
      // Set loading to false after data is fetched (whether successful or not)
    }
  };
  useEffect(() => {
    getAgents();
  }, []);

  const { currentdata, noofPages } = PaginationSetter(currentPage, agentsData);
  const totalPages = noofPages;
  const currentagents = currentdata;
  // Function to change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const toggleRowExpansion = (index) => {
    const isRowExpanded = expandedRows.includes(index);
    if (isRowExpanded) {
      setExpandedRows(expandedRows.filter((rowIndex) => rowIndex !== index));
    } else {
      setExpandedRows([...expandedRows, index]);
    }
  };

  const handleInputSearchChange = (event) => {
    const { value } = event.target;
    setSearchInput(value);

    // Perform filtering as the user types
    const filtereData = originalAgentsData.filter((data) =>
      data.agentName.toLowerCase().includes(value.toLowerCase())
    );

    setAgentsData(filtereData);
  };
  const handleDownload = () => {
    // Extract data from the table
    const dataToExport = originalAgentsData.map((agnt) => ({
      Type: agnt.agentType ? agnt.agentType : "-",
      SalesManager:
        agnt.salesmanager &&
        agnt.salesmanager.firstName &&
        agnt.salesmanager.lastName
          ? `${agnt.salesmanager.firstName} ${agnt.salesmanager.middleName} ${agnt.salesmanager.lastName}`
              .replace(/\s+/g, " ")
              .trim()
          : "-",
      Consultant:
        agnt.consultant && agnt.consultant.firstName && agnt.consultant.lastName
          ? `${agnt.consultant.firstName} ${agnt.consultant.middleName} ${agnt.consultant.lastName}`
              .replace(/\s+/g, " ")
              .trim()
          : "-",
      Branch: agnt.branch.branchName,
      Country: agnt.country,
      Agency: agnt.agencyName,
      Username: agnt.userName,
      ContactPerson: agnt
        ? `${agnt.agentName}`.replace(/\s+/g, " ").trim()
        : "-",
      Status: agnt.status ? "Active" : "In Active",
      Users: agnt.users,
    }));

    // Convert data to Excel file
    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "AgentList");

    // Generate a download link for the Excel file
    XLSX.writeFile(wb, "AgentList.xlsx");
  };

  //

  const handleEmailSend = async (e, requestBody) => {
    e.preventDefault();

    try {
      const response = await postDATA(
        requestBody,
        ApiRoutes.CUSTOMER_AGENTS.AGENT_EMAILS
      );
      if (response.data.statusCode === 200) {
        SuccessApiToast("Email Sent Successfully");
      }
    } catch (error) {
      ErrorApiAlert("Error Sending  Email");
    }
  };

  // Handle form submission logic here

  const handleUpdateStatus = async (uuid, status) => {
    try {
      // Make an API call to update the staff's active status

      const response = await putDATA(ApiRoutes.CUSTOMER_AGENTS.AGENT, uuid, {
        status: status,
        updatepassword: false,
      });

      // Check the response and handle it accordingly
      if (response.data.statusCode === 200) {
        // Successfully updated staff's active status, update the UI or perform other action
        // Show SweetAlert notification
        SimpleAlert(
          "success",
          "Success",
          `Agent is now ${status === true ? "Active" : "In Active"}`
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

        SimpleAlert("error", "Error", "Failed to update Agent status");
      }
    } catch (error) {
      // Handle errors from the API call

      SimpleAlert("error", "Error", "An unexpected error occurred.");
    }
  };

  const handleDeleteClick = async (uuid) => {
    try {
      const isDeleted = await deleteConfirmation(
        "Are You Sure You Want To Delete This Agent?",
        "warning",
        "OK",
        "Cancel",
        uuid,
        delDATA, // Pass delDATA function as an argument
        "Agent has been deleted successfully.",
        ApiRoutes.CUSTOMER_AGENTS.AGENT
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

  // MODAL STATES
  const UploadDocument = async (event) => {
    event.preventDefault();

    if (!documentsData.documentType) {
      RequiredFieldAlert(
        "Document Type is required",
        "Please fill in the required fields",
        "error"
      );

      return;
    }
    if (!selectedFile) {
      RequiredFieldAlert(
        "Attachment is required",
        "Please fill in the required fields",
        "error"
      );
      return;
    }
    const resp = await uploadFile(selectedFile);
    if (resp.success === true) {
      setDocumentsData((prevState) => ({
        ...prevState,
        doclink: resp.imagelink,
      }));
    } else {
    }
    if (!documentsData.doclink) {
      RequiredFieldAlert(
        "Attachment is required",
        "Error In Uploading the File try To Resubmit",
        "error"
      );
      return;
    }
    try {
      const response = await putDATA(
        ApiRoutes.CUSTOMER_AGENTS.AGENT_DOCUMENTS,
        selectedAgent.uuid,
        documentsData
      );
      if (response.data.statusCode === 200) {
        SuccessApiToast("Documents Updated Successfully");
        handleCloseModal();
      }
    } catch (error) {
      ErrorApiAlert("Error Updating Documents");
    }
  };
  const handleSingleSelectChange = (selectedOption, name) => {
    setDocumentsData((prevState) => ({
      ...prevState,
      [name]: selectedOption.value, // Assuming the option object has a 'value' property
    }));
  };
  const [showModal, setShowModal] = useState(false);
  const [documentsData, setDocumentsData] = useState({
    documentType: "",
    description: "",
    doclink: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInput = async (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const [selectedAgent, setSelectedAgent] = useState("");
  const handleButtonClick = (agnt) => {
    setSelectedAgent(agnt);
    setShowModal(true);
  };
  const handleDocumentInputChange = (event) => {
    const { name, value } = event.target;
    setDocumentsData({
      ...documentsData,
      [name]: value,
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedFile(null);
    setSelectedAgent("");
    setDocumentsData({ documentType: "", description: "", doclink: "" });
  };

  // MODAL STATES END
  const [formState, setFormState] = useState({
    agency_name_search: "",
    username_search: "",
    person_name_search: "",
    email_search: "",
    agentType: [],
    status: [],
    consultant: [],
    branch: [],
    salesManager: [],
    country: [],
    city: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleMultiSelectChange = (name, selectedOptions) => {
    setFormState((prevState) => ({
      ...prevState,
      [name]: selectedOptions,
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const filteredAgents = originalAgentsData.filter((transfer) => {
      // Safely accessing and converting properties to lowercase
      const lowerCountry = transfer.country
        ? transfer.country.toLowerCase()
        : "";
      const lowerCity = transfer.city ? transfer.city.toLowerCase() : "";
      const lowersalesmanagerName =
        transfer.salesmanager &&
        transfer.salesmanager.firstName &&
        transfer.salesmanager.lastName
          ? `${transfer.salesmanager.firstName} ${
              transfer.salesmanager.middleName || ""
            } ${transfer.salesmanager.lastName}`
              .replace(/\s+/g, " ")
              .trim()
              .toLowerCase()
          : "";
      const lowerBranchName =
        transfer.branch && transfer.branch.branchName
          ? transfer.branch.branchName.toLowerCase()
          : "";
      const lowerconsultantName =
        transfer.consultant &&
        transfer.consultant.firstName &&
        transfer.consultant.lastName
          ? `${transfer.consultant.firstName} ${
              transfer.consultant.middleName || ""
            } ${transfer.consultant.lastName}`
              .replace(/\s+/g, " ")
              .trim()
              .toLowerCase()
          : "";
      const lowerStatus = transfer.status
        ? transfer.status === true
          ? "a"
          : "i"
        : transfer.status === false
        ? "i"
        : "";
      const loweragencyEmail = transfer.agencyEmail
        ? transfer.agencyEmail.toLowerCase()
        : "";
      const lowerAgentName = transfer.agentName
        ? transfer.agentName.toLowerCase()
        : "";
      const lowerUserName = transfer.userName
        ? transfer.userName.toLowerCase()
        : "";
      const loweragencyName = transfer.agencyName
        ? transfer.agencyName.toLowerCase()
        : "";
      const loweragentType = transfer.agentType
        ? transfer.agentType.trim().toLowerCase()
        : "";

      // Debugging values

      const matchesAgencyName = formState.agency_name_search
        ? loweragencyName.includes(
            formState.agency_name_search.trim().toLowerCase()
          )
        : false;
      const matchesCountry = formState.country
        ? formState.country.value &&
          lowerCountry.includes(formState.country.value.trim().toLowerCase())
        : false;
      const matchesCity = formState.city
        ? formState.city.value &&
          lowerCity.includes(formState.city.value.toLowerCase())
        : false;
      const matchesSalesManager = formState.salesManager
        ? formState.salesManager.value &&
          lowersalesmanagerName.includes(
            formState.salesManager.value.toLowerCase()
          )
        : false;
      const matchesBranch = formState.branch
        ? formState.branch.value &&
          lowerBranchName.includes(formState.branch.value.toLowerCase())
        : false;
      const matchesConsultant = formState.consultant
        ? formState.consultant.value &&
          lowerconsultantName.includes(formState.consultant.value.toLowerCase())
        : false;
      const matchesStatus = formState.status
        ? formState.status.value &&
          lowerStatus.includes(formState.status.value.toLowerCase())
        : false;
      const matchesAgentType = formState.agentType
        ? formState.agentType.value &&
          loweragentType.includes(
            formState.agentType.value.trim().toLowerCase()
          )
        : false;
      const matchesAgencyEmail = formState.email_search
        ? loweragencyEmail.includes(formState.email_search.trim().toLowerCase())
        : false;
      const matchesAgentName = formState.person_name_search
        ? lowerAgentName.includes(
            formState.person_name_search.trim().toLowerCase()
          )
        : false;
      const matchesUserName = formState.username_search
        ? lowerUserName.includes(formState.username_search.trim().toLowerCase())
        : false;

      // Return true if any search criteria match
      const matchesAnyCriteria =
        matchesAgencyName ||
        matchesCountry ||
        matchesCity ||
        matchesSalesManager ||
        matchesBranch ||
        matchesConsultant ||
        matchesStatus ||
        matchesAgentType ||
        matchesAgencyEmail ||
        matchesAgentName ||
        matchesUserName;

      if (matchesAnyCriteria) {
      }

      return matchesAnyCriteria;
    });

    setAgentsData(filteredAgents);
  };

  const resetform = async () => {
    setFormState({
      agency_name_search: "",
      username_search: "",
      person_name_search: "",
      email_search: "",
      agentType: [],
      status: [],
      consultant: [],
      branch: [],
    });
    setAgentsData(originalAgentsData);
  };
  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <Header2
          title=""
          linkText1=" Search Agent"
          linkText2=" Create New Agent"
          link2={Constants.URLConstants.CUSTOMERSAGENTSNEW}
        />

        <form onSubmit={handleFormSubmit}>
          <div className="row mt-2">
            <div className="col-md-2 form-group">
              <label>Type</label>
              <MultiSelect
                options={agentTypeOptions}
                isSearchable
                placeholder="--Select--"
                noOptionsMessage={() => "No Agent Type Found"}
                className="custom-select"
                value={formState.agentType}
                onChange={(selected) =>
                  handleMultiSelectChange("agentType", selected)
                }
              />
            </div>
            <div className="col-md-2 form-group">
              <label>Agency</label>
              <input
                className="form-control form-control-sm"
                type="text"
                name="agency_name_search"
                value={formState.agency_name_search}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-2 form-group">
              <label>Username</label>
              <input
                className="form-control form-control-sm"
                type="text"
                name="username_search"
                value={formState.username_search}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-2 form-group">
              <label>Contact Person</label>
              <input
                className="form-control form-control-sm"
                type="text"
                name="person_name_search"
                value={formState.person_name_search}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-2 form-group">
              <label>Email</label>
              <input
                type="text"
                className="form-control form-control-sm"
                name="email_search"
                value={formState.email_search}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-md-2 form-group">
              <label>Status</label>
              <MultiSelect
                options={statusOptions}
                isSearchable
                placeholder="--Select--"
                noOptionsMessage={() => "No Status Found"}
                className="custom-select"
                value={formState.status}
                onChange={(selected) =>
                  handleMultiSelectChange("status", selected)
                }
              />
            </div>
            <div className="col-md-2 form-group">
              <label>Consultant</label>
              <MultiSelect
                options={consultantoptions}
                isSearchable
                placeholder="--Select--"
                noOptionsMessage={() => "No Consultant Found"}
                className="custom-select"
                value={formState.consultant}
                onChange={(selected) =>
                  handleMultiSelectChange("consultant", selected)
                }
              />
            </div>
            <div className="col-md-2 form-group">
              <label>Branch</label>
              <MultiSelect
                options={branchoptions}
                isSearchable
                placeholder="--Select--"
                noOptionsMessage={() => "No Branch Found"}
                className="custom-select"
                value={formState.branch}
                onChange={(selected) =>
                  handleMultiSelectChange("branch", selected)
                }
              />
            </div>
            <div className="col-md-2 form-group">
              <label>Sales Manager</label>
              <MultiSelect
                options={salesmanageroptions}
                isSearchable
                placeholder="--Select--"
                noOptionsMessage={() => "No Manager Found"}
                className="custom-select"
                value={formState.salesManager}
                onChange={(selected) =>
                  handleMultiSelectChange("salesManager", selected)
                }
              />
            </div>
            <div className="col-md-2 form-group">
              <label>Country</label>
              <MultiSelect
                options={countryoptions}
                isSearchable
                placeholder="--Select--"
                noOptionsMessage={() => "No Country Found"}
                className="custom-select"
                value={formState.country}
                onChange={(selected) =>
                  handleMultiSelectChange("country", selected)
                }
              />
            </div>
            <div className="col-md-2 form-group">
              <label>City</label>
              <MultiSelect
                options={cityoptions}
                isSearchable
                placeholder="--Select--"
                className="custom-select"
                value={formState.city}
                onChange={(selected) =>
                  handleMultiSelectChange("city", selected)
                }
                noOptionsMessage={() => "No City Found"}
              />
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
          </div>
        </form>

        <br />
        {loading && (
          <div className="text-center">
            <img src={loadingGif} alt="Loading..." height={250} />
          </div>
        )}
        {!loading && (
          <>
            <form>
              <div className="row mt-2">
                <div className="col-md-3 form-group">
                  <Link
                    type="button"
                    className="btn btn-outline-secondary btn-sm form-group"
                    onClick={handleDownload}
                  >
                    <i className="fa fa-download" aria-hidden="true" />
                    &nbsp;Download Agent List
                  </Link>
                </div>
                <div className="col-md-1 form-group"></div>
                <div className="col-md-4 form-group">
                  {/*Pagination panel*/}
                  <nav aria-label="Page navigation example">
                    <ul className="pagination pagination-sm justify-content-center mt-4">
                      {Array.from({ length: totalPages }).map((_, index) => (
                        <li key={index} className="page-item">
                          <Link
                            to="#"
                            className="page-link"
                            onClick={() => paginate(index + 1)}
                            style={{
                              backgroundColor:
                                currentPage === index + 1
                                  ? "#FF5015"
                                  : "transparent",
                              color:
                                currentPage === index + 1 ? "white" : "black", // Highlighting logic
                              // Add more styles as needed
                            }}
                          >
                            {index + 1}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </div>
              {/* 4th Row */}
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
              {/* Table Creation */}
              <div className="row mt-2">
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
                      id="search_agents_table1"
                      className="table   table-responsive dataTable no-footer table-bordered "
                      role="grid"
                      aria-describedby="search_agents_table1_info"
                    >
                      <thead>
                        <tr role="row">
                          {/* <th className="sorting" tabIndex={0} aria-controls="search_agents_table1" rowSpan={1} colSpan={1} aria-label="Code: activate to sort column ascending" style={{width: '38px'}}>Code</th> */}
                          <th
                            className="sorting"
                            tabIndex={0}
                            aria-controls="search_agents_table1"
                            rowSpan={1}
                            colSpan={1}
                            aria-label="Type: activate to sort column ascending"
                            style={{ width: "36px" }}
                          >
                            Type/ID
                          </th>
                          <th
                            className="no-sort sorting_disabled"
                            rowSpan={1}
                            colSpan={1}
                            aria-label="Sales Manager"
                            style={{ width: "94px" }}
                          >
                            Sales Manager
                          </th>
                          <th
                            className="no-sort sorting_disabled"
                            rowSpan={1}
                            colSpan={1}
                            aria-label="Consultant"
                            style={{ width: "94px" }}
                          >
                            Consultant
                          </th>
                          <th
                            className="no-sort sorting_disabled"
                            rowSpan={1}
                            colSpan={1}
                            aria-label="Branch"
                            style={{ width: "114px" }}
                          >
                            Branch
                          </th>
                          <th
                            className="no-sort sorting_disabled"
                            rowSpan={1}
                            colSpan={1}
                            aria-label="Country"
                            style={{ width: "133px" }}
                          >
                            Country
                          </th>
                          <th
                            className="sorting"
                            tabIndex={0}
                            aria-controls="search_agents_table1"
                            rowSpan={1}
                            colSpan={1}
                            aria-label="Agency: activate to sort column ascending"
                            style={{ width: "152px" }}
                          >
                            Agency
                          </th>
                          <th
                            className="sorting"
                            tabIndex={0}
                            aria-controls="search_agents_table1"
                            rowSpan={1}
                            colSpan={1}
                            aria-label="&nbsp;Username: activate to sort column ascending"
                            style={{ width: "105px" }}
                          >
                            &nbsp;Username
                          </th>
                          <th
                            className="sorting"
                            tabIndex={0}
                            aria-controls="search_agents_table1"
                            rowSpan={1}
                            colSpan={1}
                            aria-label="&nbsp;Contact Person: activate to sort column ascending"
                            style={{ width: "117px" }}
                          >
                            &nbsp;Contact Person
                          </th>
                          <th
                            className="sorting"
                            tabIndex={0}
                            aria-controls="search_agents_table1"
                            rowSpan={1}
                            colSpan={1}
                            aria-label="&nbsp;Status: activate to sort column ascending"
                            style={{ width: "89px" }}
                          >
                            &nbsp;Status
                          </th>
                          <th
                            className="no-sort sorting_disabled"
                            rowSpan={1}
                            colSpan={1}
                            aria-label="Users"
                            style={{ width: "35px" }}
                          >
                            Users
                          </th>
                          <th
                            className="no-sort sorting_disabled"
                            rowSpan={1}
                            colSpan={1}
                            aria-label="&nbsp;Actions"
                            style={{ width: "205px" }}
                          >
                            &nbsp;Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {currentagents.map((agnt, index) => (
                          <React.Fragment key={index}>
                            <tr
                              className={
                                "phps_row_" +
                                (index % 2 === 0 ? "0 even" : "1 odd")
                              }
                              role="row"
                            >
                              <td> {agnt.agentType ? agnt.agentType : "-"} </td>
                              <td>
                                {" "}
                                {agnt.salesmanager &&
                                agnt.salesmanager.firstName &&
                                agnt.salesmanager.lastName
                                  ? `${agnt.salesmanager.firstName} ${agnt.salesmanager.middleName} ${agnt.salesmanager.lastName}`
                                      .replace(/\s+/g, " ")
                                      .trim()
                                  : "-"}
                              </td>
                              <td>
                                {agnt.consultant &&
                                agnt.consultant.firstName &&
                                agnt.consultant.lastName
                                  ? `${agnt.consultant.firstName} ${agnt.consultant.middleName} ${agnt.consultant.lastName}`
                                      .replace(/\s+/g, " ")
                                      .trim()
                                  : "-"}
                              </td>
                              <td>{agnt.branch.branchName}</td>
                              <td>{agnt.country}</td>
                              <td>{agnt.agencyName}</td>
                              <td>{agnt.userName}</td>
                              <td>
                                {" "}
                                {agnt
                                  ? `${agnt.agentName}`
                                      .replace(/\s+/g, " ")
                                      .trim()
                                  : "-"}
                              </td>
                              <td>
                                <h5>
                                  <span
                                    className={`td_label ${
                                      agnt.status
                                        ? "label-success"
                                        : "label-default"
                                    }`}
                                  >
                                    {agnt.status ? "Active" : "In Active"}
                                  </span>
                                </h5>
                              </td>
                              <td>
                                <div className="subUsers">
                                  {/* Determine the number of sub-users */}
                                  <span
                                    className={`td_label ${
                                      agnt.subAgents &&
                                      agnt.subAgents.length > 0
                                        ? "label-success"
                                        : "label-default"
                                    } supScript`}
                                  >
                                    {agnt.subAgents && agnt.subAgents.length > 0
                                      ? agnt.subAgents.length
                                      : "0"}
                                  </span>
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .CUSTOMERAGENTSUBUSERSEARCH
                                    }
                                    onClick={() => {
                                      handleEdditClick(agnt);
                                    }}
                                  >
                                    <i
                                      className="fa fa-users"
                                      alt={`${
                                        agnt.subAgents &&
                                        agnt.subAgents.length > 0
                                          ? agnt.subAgents.length
                                          : "0"
                                      } sub user`}
                                      title={`${
                                        agnt.subAgents &&
                                        agnt.subAgents.length > 0
                                          ? agnt.subAgents.length
                                          : "0"
                                      } sub user`}
                                      style={{
                                        fontSize: "25px",
                                        color: "black",
                                      }}
                                    />
                                  </Link>
                                </div>
                              </td>

                              <td className="actionlink">
                                <div className="actionCont width_table">
                                  <div
                                    className={`contLeft action1 ${
                                      expandedRows.includes(index)
                                        ? "expanded"
                                        : ""
                                    }`}
                                  >
                                    <div className="input-group-addon">
                                      <Link
                                        data-bs-toggle="tooltip"
                                        title="Edit"
                                        data-placement="top"
                                        to={
                                          Constants.URLConstants
                                            .CUSTOMERSAGENTSEDIT
                                        }
                                        onClick={() => {
                                          handleEdditClick(agnt);
                                        }}
                                      >
                                        <i className="fa fa-pencil-square-o" />
                                      </Link>
                                    </div>
                                    <div className="input-group-addon">
                                      <Link
                                        data-bs-toggle="tooltip"
                                        title="Exclude Countries"
                                        data-placement="top"
                                        to={
                                          Constants.URLConstants
                                            .CUSTOMERSAGENTSEXCLUDECOUNTRIES
                                        }
                                        onClick={() => {
                                          handleEdditClick(agnt);
                                        }}
                                      >
                                        <i className="fa fa-globe" />
                                      </Link>
                                    </div>
                                    <div className="input-group-addon">
                                      <Link
                                        data-bs-toggle="tooltip"
                                        title="Change Password"
                                        data-placement="top"
                                        to={
                                          Constants.URLConstants
                                            .CUSTOMERSAGENTSCHANGEPASSWORD
                                        }
                                        onClick={() => {
                                          handleEdditClick(agnt);
                                        }}
                                      >
                                        <i className="fa fa-key" />
                                      </Link>
                                    </div>
                                    <div className="input-group-addon">
                                      <Link
                                        data-bs-toggle="tooltip"
                                        title="View"
                                        data-placement="top"
                                        to={
                                          Constants.URLConstants
                                            .CUSTOMERSAGENTSVIEW
                                        }
                                        onClick={() => {
                                          handleEdditClick(agnt);
                                        }}
                                      >
                                        <i className="fa fa-eye" />
                                      </Link>
                                    </div>
                                    <div className="input-group-addon">
                                      {" "}
                                      <Link
                                        data-bs-toggle="tooltip"
                                        title="Online Supplier Settings"
                                        data-placement="top"
                                        to={
                                          Constants.URLConstants
                                            .CUSTOMERSAGENTSONLINESUPPLIERSETTING
                                        }
                                      >
                                        <i className="fa fa-cogs" />
                                      </Link>
                                    </div>
                                    <div className="input-group-addon">
                                      <Link
                                        data-bs-toggle="tooltip"
                                        title="Offline Supplier Settings"
                                        data-placement="top"
                                        to={
                                          Constants.URLConstants
                                            .CUSTOMERSAGENTSOFFLINESUPPLIERSETTING
                                        }
                                      >
                                        <i className="fa fa-wrench" />
                                      </Link>
                                    </div>
                                    <div
                                      className="input-group-addon"
                                      data-toggle="tooltip"
                                      data-original-title="Upload Document"
                                      data-placement="top"
                                    >
                                      <Link
                                        data-toggle="modal"
                                        data-target="#uploadDocument"
                                        onClick={() => handleButtonClick(agnt)}
                                      >
                                        <i className="fa fa-upload" />
                                      </Link>
                                    </div>
                                    <div className="input-group-addon">
                                      <Link
                                        data-bs-toggle="tooltip"
                                        title="Online Supplier Service Tax Settings"
                                        data-placement="top"
                                        to={
                                          Constants.URLConstants
                                            .CUSTOMERSAGENTSONLINESUPPLIERSERVICETAXSETTING
                                        }
                                        target="_blank"
                                      >
                                        <i className="fa fa-calculator" />
                                      </Link>
                                    </div>
                                    <div className="input-group-addon">
                                      <Link
                                        data-bs-toggle="tooltip"
                                        title="Login as this Agent"
                                        data-placement="top"
                                        to="https://beta.tdonlines.com/agnt_search.php"
                                        onclick="ag_login('http://beta.tdonlines.com/agent_login.php?action_type=login&consultant_id=Beta_Tdo&txt_username=wego_ws&txt_password=dcb9e29be202e2ce1c9014f93b939acbfb1245ea9cde66456f228b71566c2f61&txt_agent_code=CD0316&FLAG=AS_AG&txt_pseudo_iata=&chk=833cd8c0e698745b16dac196a511327c3b30258a0d9b96710745d28eca932533&consult_eid=ZVlNM3dXa3E2SGIrWC9vNUM4Q2hsdz09&tms=1&backoffice_user=Beta_Tdo')"
                                      >
                                        <i className="fa fa-sign-in" />
                                      </Link>
                                    </div>
                                    <div className="input-group-addon">
                                      <Link
                                        to="https://beta.tdonlines.com/agnt_search.php"
                                        onclick="ag_login('http://beta.tdonlines.com/agent_login.php?action_type=login&consultant_id=Beta_Tdo&id=316&txt_username=wego_ws&txt_password=dcb9e29be202e2ce1c9014f93b939acbfb1245ea9cde66456f228b71566c2f61&txt_agent_code=CD0316&a=1&FLAG=AS_AD&can_debug=&txt_pseudo_iata=&admin_login=yes&hash=2465fa564eab6838f56212b9a783b1f1&chk=833cd8c0e698745b16dac196a511327c3b30258a0d9b96710745d28eca932533&consult_eid=ZVlNM3dXa3E2SGIrWC9vNUM4Q2hsdz09&tms=1&backoffice_user=Beta_Tdo')"
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
                                      title=""
                                      data-original-title="Click To Deactivate"
                                    >
                                      {agnt.status === true ? (
                                        <Link
                                          onClick={() => {
                                            handleUpdateStatus(
                                              agnt.uuid,
                                              false
                                            );
                                          }}
                                        >
                                          <i className="fa fa-check-circle"></i>
                                        </Link>
                                      ) : (
                                        <Link
                                          onClick={() => {
                                            handleUpdateStatus(agnt.uuid, true);
                                          }}
                                        >
                                          <i className="fa fa-times-circle"></i>
                                        </Link>
                                      )}
                                    </div>
                                    <div
                                      className="input-group-addon"
                                      id="ad_2"
                                    >
                                      <Link
                                        to={
                                          Constants.URLConstants
                                            .CUSTOMERSAGENTSSEARCHBUTTON
                                        }
                                        onClick={(event) => {
                                          handleEmailSend(event, {
                                            uuid: agnt.uuid,
                                            emailType: "welcome",
                                          });
                                        }}
                                      >
                                        <i
                                          className="fa fa-envelope-o"
                                          title="Send Registration Email"
                                          data-placement="top"
                                        />
                                      </Link>
                                    </div>
                                    <div
                                      className="input-group-addon"
                                      id="ad_3"
                                    >
                                      <Link
                                        to={
                                          Constants.URLConstants
                                            .CUSTOMERSAGENTSSEARCHBUTTON
                                        }
                                        onClick={(event) => {
                                          handleEmailSend(event, {
                                            uuid: agnt.uuid,
                                            emailType: "confirmation",
                                          });
                                        }}
                                      >
                                        <i
                                          className="fa fa-envelope"
                                          title="Send Confirmation Email"
                                          data-placement="top"
                                        />
                                      </Link>
                                    </div>
                                    <div
                                      className="input-group-addon"
                                      id="ad_4"
                                    >
                                      <Link
                                        to={
                                          Constants.URLConstants
                                            .CUSTOMERSAGENTSINVOICINGRULES
                                        }
                                        data-bs-toggle="tooltip"
                                        title="Invoicing Rules"
                                        data-placement="top"
                                        onClick={() => {
                                          handleEdditClick(agnt);
                                        }}
                                      >
                                        <i className="fa fa-usd" />
                                      </Link>
                                    </div>
                                    <div
                                      className="input-group-addon"
                                      id="ad_5"
                                    >
                                      <Link
                                        data-bs-toggle="tooltip"
                                        title="Assign Payment Gateway"
                                        data-placement="top"
                                        to={
                                          Constants.URLConstants
                                            .CUSTOMERSAGENTSASSIGNPAYEMENTGATEWAY
                                        }
                                        onClick={() => {
                                          handleEdditClick(agnt);
                                        }}
                                      >
                                        <i className="fa fa-credit-card" />
                                      </Link>
                                    </div>
                                    <div
                                      className="input-group-addon"
                                      id="ad_6"
                                    >
                                      <Link
                                        data-bs-toggle="tooltip"
                                        title="Report Access Settings"
                                        data-placement="top"
                                        to={
                                          Constants.URLConstants
                                            .CUSTOMERSAGENTSREPORTACESSSETTING
                                        }
                                        onClick={() => {
                                          handleEdditClick(agnt);
                                        }}
                                      >
                                        <i className="fa fa-file-text-o" />
                                      </Link>
                                    </div>
                                    <div
                                      className="input-group-addon"
                                      id="ad_7"
                                    >
                                      <Link
                                        data-bs-toggle="tooltip"
                                        title="Loyalty Tier Settings"
                                        data-placement="top"
                                        to={
                                          Constants.URLConstants
                                            .CUSTOMERSAGENTSLOYALITYTIERSETTING
                                        }
                                        onClick={() => {
                                          handleEdditClick(agnt);
                                        }}
                                      >
                                        <i className="fa fa-gift" />
                                      </Link>
                                    </div>
                                    <div
                                      className="input-group-addon"
                                      id="ad_8"
                                    >
                                      <Link
                                        to={
                                          Constants.URLConstants
                                            .CUSTOMERSAGENTSTAXREGISTRATION
                                        }
                                        data-bs-toggle="tooltip"
                                        data-placement="top"
                                        title="Tax Registration"
                                        onClick={() => {
                                          handleEdditClick(agnt);
                                        }}
                                      >
                                        <i
                                          className="fa fa-cogs"
                                          aria-hidden="true"
                                        />
                                      </Link>
                                    </div>
                                    <div className="input-group-addon">
                                      <Link
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title
                                        data-original-title="Delete"
                                        onClick={() =>
                                          handleDeleteClick(agnt.uuid)
                                        }
                                      >
                                        <i className="fa fa-trash" />{" "}
                                      </Link>
                                    </div>
                                    <div
                                      className="input-group-addon"
                                      id="ad_9"
                                    >
                                      <Link
                                        data-bs-toggle="tooltip"
                                        title="Credit Logs"
                                        data-placement="top"
                                        to={
                                          Constants.URLConstants
                                            .CUSTOMERSAGENTSCREDITLOG
                                        }
                                        onClick={() => {
                                          handleEdditClick(agnt);
                                        }}
                                      >
                                        <i className="fa fa-money" />
                                      </Link>
                                    </div>
                                    {agnt.creditLimit &&
                                    agnt.creditLimit != null ? (
                                      <div
                                        className="input-group-addon"
                                        id="ad_10"
                                      >
                                        <Link
                                          data-bs-toggle="tooltip"
                                          title="Credit View"
                                          data-placement="top"
                                          to={
                                            Constants.URLConstants
                                              .CUSTOMERSAGENTSCREDITVIEW
                                          }
                                          onClick={() => {
                                            handleEdditClick(agnt);
                                          }}
                                        >
                                          <sub>
                                            <i
                                              className="fa fa-eye"
                                              style={{
                                                marginRight: "-7px",
                                                fontSize: "14px",
                                              }}
                                            />
                                          </sub>
                                          <i className="fa fa-credit-card" />
                                        </Link>
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                    <div
                                      className="input-group-addon"
                                      id="ad_11"
                                    >
                                      <Link
                                        data-bs-toggle="tooltip"
                                        title="Credit Limit"
                                        data-placement="top"
                                        to={
                                          Constants.URLConstants
                                            .CUSTOMERSAGENTSCREDITLIMIT
                                        }
                                        onClick={() => {
                                          handleEdditClick(agnt);
                                        }}
                                      >
                                        {/* <sub><i class="fa fa-ban" style="margin-right:-7px; font-size:14px;"></i></sub> */}
                                        <i className="fa fa-credit-card" />
                                      </Link>
                                    </div>
                                    <div
                                      className="input-group-addon"
                                      id="ad_12"
                                    >
                                      <Link
                                        data-bs-toggle="tooltip"
                                        title="Payment Gateway Log"
                                        data-placement="top"
                                        to={
                                          Constants.URLConstants
                                            .CUSTOMERSAGENTSASSIGNPAYEMENTGATEWAYLOGS
                                        }
                                        target="_blank"
                                      >
                                        <i className="fa fa-file" />
                                      </Link>
                                    </div>
                                    <div
                                      className="input-group-addon"
                                      id="ad_13"
                                    >
                                      <Link
                                        data-bs-toggle="tooltip"
                                        title="Shortcut"
                                        data-placement="top"
                                        to="http://beta.tdonlines.com/tms/download_shortcut.php?username=wego_ws&password=dcb9e29be202e2ce1c9014f93b939acbfb1245ea9cde66456f228b71566c2f61&code=CD0316&shortcut=1"
                                        target="_blank"
                                      >
                                        <i className="fa fa-save" />
                                      </Link>
                                    </div>
                                    {/* <div class="input-group-addon">
                                      <Link  to='#' id='316' data-bs-toggle="modal" data-target="#agent_logs">
                                          <i class="fa fa-binoculars" data-bs-toggle="tooltip" title="Logs" data-placement="top"></i>
                                      </Link>
                                  </div> */}
                                    {/* <div className="input-group-addon" id="ad_14">
                      <Link data-bs-toggle="tooltip" title="Agent Last Login" data-placement="top" to={Constants.URLConstants.CUSTOMERSAGENTSLASTLOGIN} target="_blank">
                        <i className="fa fa-clock-o" />
                      </Link>
                    </div> */}
                                  </div>
                                  <div
                                    className="plusIco plusIco1"
                                    onClick={() => toggleRowExpansion(index)}
                                  >
                                    <Link>
                                      <i
                                        className={`fa ${
                                          expandedRows.includes(index)
                                            ? "fa-minus"
                                            : "fa-plus"
                                        }`}
                                        data-bs-toggle="tooltip"
                                        title="More Options"
                                        data-placement="top"
                                      />
                                    </Link>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                    {showModal && (
                      <div className="modal-wrapper-theme">
                        <div
                          className="modal-theme"
                          style={{ height: "400px" }}
                        >
                          <div className="modal-header-theme">
                            <h5 className="modal-title-theme">
                              AGENT DOCUMENTS FOR{" "}
                              {selectedAgent.agentName.toUpperCase()}
                            </h5>
                            <button
                              type="button"
                              className="close-theme"
                              aria-label="Close"
                              onClick={handleCloseModal}
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body-theme ">
                            {/* Form with text fields, textarea, checkbox, and add button */}

                            <form id="addnewthemeform">
                              {/* <input type="hidden" name="action" defaultValue="insert" /> */}
                              <div className="panel-body">
                                {/* <div className="message" style={{ display: 'none' }}></div> */}
                                <div className="row">
                                  <div className="form-group col-md-6">
                                    <label>Document Type</label>
                                    <MultiSelect
                                      options={documentsType}
                                      isSearchable
                                      name="documentType"
                                      placeholder="- Select Option -"
                                      onChange={(selectedOption) =>
                                        handleSingleSelectChange(
                                          selectedOption,
                                          "documentType"
                                        )
                                      }
                                      className="custom-select required "
                                      noOptionsMessage={() =>
                                        "No Document Type Found"
                                      }
                                    />
                                  </div>

                                  <div className="form-group col-md-6 ml-5">
                                    <label>Attachment</label>
                                    <span className="uniqFile input-group">
                                      <span className="input-group-addon fa fa-upload myInputFile">
                                        <input
                                          type="file"
                                          name="docfile"
                                          size={39}
                                          className="file_font"
                                          accept="*"
                                          onChange={handleFileInput}
                                        />
                                      </span>
                                    </span>
                                  </div>
                                </div>
                                <div className="form-group col-md-12">
                                  <label>Description</label>
                                  <textarea
                                    className="form-control form-control-sm"
                                    rows={4}
                                    cols={50}
                                    name="description"
                                    id="description"
                                    value={documentsData.description}
                                    onChange={(event) =>
                                      handleDocumentInputChange(event)
                                    }
                                  />
                                </div>

                                <button
                                  className="btn btn-outline-secondary btn-sm form-group mt-3"
                                  type="button"
                                  onClick={(event) => UploadDocument(event)}
                                >
                                  <i className="fa fa-upload" />
                                  &nbsp;Upload
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default connect(null, { setEditAgent })(CustomersAgentSearchButton);
