import { Link } from "react-router-dom";
import Header2 from "../../header2/header2";
import Constants from "../../../constants/routes";
import MultiSelect from "../../reactMultiSelect";
import { flightproviders_options } from "../../../constants/contants";
import loadingGif from "../../../assets/images/loadingblue.gif";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  setFlightPCCRuleDataRedux,
  setFlightOfficeIdDataRedux,
} from "../../../state/action/actions";
import { connect } from "react-redux";
import {
  deleteFlightOfficeID,
  deleteFlightPCCRules,
  flightAddPccOfficeID,
  flightAddPccRuless,
  flightGetPccRules,
  getAllAgents,
  getAllBranches,
  getAllflightOfficeID,
  updateFlightOfficeID,
  updateFlightPCCRules,
} from "../../../Apis/API";

const FlightPccSearchRule = ({
  setFlightPCCRuleDataRedux,
  setFlightOfficeIdDataRedux,
}) => {
  const handleViewClick = (FlightPCCRule) => {
    setFlightPCCRuleDataRedux(FlightPCCRule); // Dispatch the action to set the editBranchData in the Redux store
  };
  const handleViewOfficeIdClick = (officeId) => {
    setFlightOfficeIdDataRedux(officeId); // Dispatch the action to set the editBranchData in the Redux store
  };

  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [loading, setLoading] = useState(true); // Initially, set loading to true

  const handleRadioChange = (e) => {
    setShowAdditionalFields(e.target.value === "office_id");
  };

  const [formData, setFormData] = useState({
    branch: "",
    agents: [],
    pccName: "",
    officeID: "",
    username: "",
    domain: "",
    password: "",
    flightProvider: "",
    status: "Active",
    officeIds: [],
  });
  const [branches, setBranches] = useState();
  const [agents, setAgents] = useState();
  const [officeIds, setofficeIds] = useState();
  const [officeIdsTable, setofficeIdsTable] = useState([]);
  const [pccRuleTable, setPccRuleTable] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [originalFlightOfficeIDData, setOriginalFlightOfficeIDData] = useState(
    []
  );
  const handleInputSearchChange = (event) => {
    const { value } = event.target;
    setSearchInput(value);

    // Perform filtering as the user types
    const filteredOid = originalFlightOfficeIDData.filter((ORuleId) =>
      ORuleId.pccName.toLowerCase().includes(value.toLowerCase())
    );

    setofficeIdsTable(filteredOid);
  };
  const getbranches = async () => {
    try {
      const response = await getAllBranches();

      if (response.data.statusCode === 200) {
        const branches = response.data.data || [];

        const options = branches.map((branch) => ({
          value: branch.uuid,
          label: branch.branchName,
        }));

        setBranches(options); // Set branches in the new state
      }
    } catch (error) {}
  };

  const getAgents = async () => {
    try {
      const response = await getAllAgents();

      if (response.data.statusCode === 200) {
        const agents = response.data.data || [];

        const options = agents.map((agent) => ({
          value: agent.uuid,
          label: agent.agentName,
        }));

        setAgents(options); // Set branches in the new state
      }
    } catch (error) {}
  };
  const getOfficeIds = async () => {
    try {
      setLoading(true); // Set loading to true when fetching data
      const response = await getAllflightOfficeID();

      if (response.data.statusCode === 200) {
        const officeIDS = response.data.data || [];
        const officeIDSTable =
          response && response.data.data ? response.data.data : [];
        setofficeIdsTable(officeIDSTable);
        const optionsOffices = officeIDS.map((OfficeID) => ({
          value: OfficeID.uuid,
          label: OfficeID.officeID,
        }));
        setOriginalFlightOfficeIDData(officeIDS);
        setofficeIds(optionsOffices); // Set branches in the new state
      }
    } catch (error) {
    } finally {
      setLoading(false); // Set loading to false after data is fetched (whether successful or not)
    }
  };
  const getPccRules = async () => {
    try {
      setLoading(true); // Set loading to true when fetching data
      const response = await flightGetPccRules();

      if (response.data.statusCode === 200) {
        const PccRulesData =
          response && response.data.data ? response.data.data : [];
        setPccRuleTable(PccRulesData);
      }
    } catch (error) {
    } finally {
      setLoading(false); // Set loading to false after data is fetched (whether successful or not)
    }
  };
  useEffect(() => {
    getbranches();
    getAgents();
    getPccRules();
    getOfficeIds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (showAdditionalFields) {
      // creating office ID
      const flightPCCRuleOfficeIdData = {
        pccName: formData.pccName,
        officeID: formData.officeID,
        username: formData.username,
        password: formData.password,
        flightProvider: formData.flightProvider,
        domain: formData.domain,
      };

      try {
        const response = await flightAddPccOfficeID(flightPCCRuleOfficeIdData);

        if (response.data.statusCode === 200) {
          getOfficeIds();

          setFormData({
            pccName: "",
            officeID: "",
            username: "",
            password: "",
            flightProvider: "",
          });
        }
      } catch (error) {}
    } else {
      // create Agent Specifc
      const flightAddPccRules = {
        flightProvider: formData.flightProvider,
        status: formData.status,
        agents: formData.agents,
        branch: formData.branch,
        officeIds: formData.officeIds,
      };

      try {
        const response = await flightAddPccRuless(flightAddPccRules);

        if (response.data.statusCode === 200) {
          setFormData({
            branch: "",
            agents: [],
            flightProvider: "",
            status: "Active",
            officeIds: [],
          });
        }
      } catch (error) {}
    }
  };
  const handleDeleteClick = async (uuid) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-warning swal-confirm",
        cancelButton: "btn btn-default swal-cancel",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        text: "Are You Sure You Want To Delete This Flight PCC Rule ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await deleteFlightPCCRules(uuid);

            if (response.data.statusCode === 200) {
              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Flight PCC Rule has been deleted successfully.",
                icon: "success",
              });

              setPccRuleTable((prevFlightPCCRuleData) =>
                prevFlightPCCRuleData.filter((pccRule) => pccRule.uuid !== uuid)
              );
            }
          } catch (error) {
            swalWithBootstrapButtons.fire({
              title: "Error On Deletion",
              icon: "error",
            });
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            icon: "error",
          });
        }
      });
  };
  const handleDeleteOfficeid = async (uuid) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-warning swal-confirm",
        cancelButton: "btn btn-default swal-cancel",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        text: "Are You Sure You Want To Delete This Office ID?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await deleteFlightOfficeID(uuid);

            if (response.data.statusCode === 200) {
              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Office ID has been deleted successfully.",
                icon: "success",
              });

              setofficeIdsTable((prevFlighOfficeId) =>
                prevFlighOfficeId.filter(
                  (officeIdRule) => officeIdRule.uuid !== uuid
                )
              );
            }
          } catch (error) {
            swalWithBootstrapButtons.fire({
              title: "Error On Deletion",
              icon: "error",
            });
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            icon: "error",
          });
        }
      });
  };

  const handleUpdateStatus = async (PCCRuleData) => {
    // Check if the ruleData exists
    if (!PCCRuleData || !PCCRuleData.uuid) {
      return;
    }

    // Update the status of ruleData
    const updatedStatus =
      PCCRuleData.status === "Active" ? "In Active" : "Active";
    let isActive = false;
    // Update flightRuleData with the updated status
    if (PCCRuleData.status === "Active") {
      isActive = true;
    } else {
      isActive = false;
    }
    try {
      // Make an API call to update the staff's active status
      const apiBodyData = {
        flightProvider: PCCRuleData.flightProvider,
        status: updatedStatus,
        agents: PCCRuleData.agents,
        branch: PCCRuleData.branch,
        officeIds: PCCRuleData.officeIds,
      };
      const response = await updateFlightPCCRules(
        PCCRuleData.uuid,
        apiBodyData
      );

      // Check the response and handle it accordingly
      if (response.data.statusCode === 200) {
        const updatedFlightPCCRuleData = pccRuleTable.map((flightPCCRule) => {
          // Check if the UUID matches
          if (flightPCCRule.uuid === PCCRuleData.uuid) {
            // Update the status
            return { ...flightPCCRule, status: updatedStatus };
          }
          return flightPCCRule; // Keep other rules unchanged
        });
        // Set the updated flightRuleData in the state
        setPccRuleTable(updatedFlightPCCRuleData);
        // Successfully updated staff's active status, update the UI or perform other actions

        // Show SweetAlert notification
        Swal.fire({
          icon: "success",
          title: "Success",
          text: `Flight Rule is now ${isActive ? "In Active" : "Active"}.`,
        });

        // You may want to fetch the updated staff data or update the local state accordingly
      } else {
        // Handle other response statuses or errors

        // Show SweetAlert notification for error
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to update Rule  status.",
        });
      }
    } catch (error) {
      // Handle errors from the API call

      // Show SweetAlert notification for error
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An unexpected error occurred.",
      });
    }
  };
  const handleUpdateOfficeIdStatus = async (officeData) => {
    // Check if the ruleData exists
    if (!officeData || !officeData.uuid) {
      return;
    }

    // Update the status of ruleData
    const updatedStatus1 =
      officeData.status === "Active" ? "In Active" : "Active";
    let isActive = false;
    // Update flightRuleData with the updated status
    if (officeData.status === "Active") {
      isActive = true;
    } else {
      isActive = false;
    }
    try {
      // Make an API call to update the staff's active status
      const apiBodyData1 = {
        flightProvider: officeData.flightProvider,
        status: updatedStatus1,
        pccName: officeData.pccName,
        officeID: officeData.officeID,
        username: officeData.username,
        password: officeData.password,
        domain: officeData.domain,
      };

      const response = await updateFlightOfficeID(
        officeData.uuid,
        apiBodyData1
      );

      // Check the response and handle it accordingly
      if (response.data.statusCode === 200) {
        const updatedFlightOfficeRuleData = officeIdsTable.map(
          (flightOfficeRule) => {
            // Check if the UUID matches
            if (flightOfficeRule.uuid === officeData.uuid) {
              // Update the status
              return { ...flightOfficeRule, status: updatedStatus1 };
            }
            return flightOfficeRule; // Keep other rules unchanged
          }
        );
        // Set the updated flightRuleData in the state
        setofficeIdsTable(updatedFlightOfficeRuleData);
        // Successfully updated staff's active status, update the UI or perform other actions

        // Show SweetAlert notification
        Swal.fire({
          icon: "success",
          title: "Success",
          text: `Office ID is now ${isActive ? "In Active" : "Active"}.`,
        });

        // You may want to fetch the updated staff data or update the local state accordingly
      } else {
        // Handle other response statuses or errors

        // Show SweetAlert notification for error
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to update Rule  status.",
        });
      }
    } catch (error) {
      // Handle errors from the API call

      // Show SweetAlert notification for error
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An unexpected error occurred.",
      });
    }
  };

  const [pccName, setPCCName] = useState("");
  const [officeIDNAME, setOfficeIDNAME] = useState("");
  const [selectedFlightProvider, setSelectedFlightProvider] = useState([]);
  const handleSearch = () => {
    // Filter data based on ruleId and selectedRuleTypes
    const filteredData = originalFlightOfficeIDData.filter((Orule) => {
      const idMatch = Orule.pccName
        .toLowerCase()
        .includes(pccName.toLowerCase());
      const idMatch1 = Orule.officeID
        .toLowerCase()
        .includes(officeIDNAME.toLowerCase());
      const typeMatch =
        selectedFlightProvider.length === 0 ||
        (Array.isArray(Orule.flightProvider) &&
          Orule.flightProvider.some((selected) =>
            selectedFlightProvider.value.includes(selected)
          ));

      return idMatch && idMatch1 && typeMatch;
    });
    setofficeIdsTable(filteredData);
  };

  const handleReset = () => {
    setPCCName("");
    setOfficeIDNAME("");
    setSelectedFlightProvider([]);
    setofficeIdsTable(originalFlightOfficeIDData);
  };

  return (
    <>
      <Header2
        title="SEARCH OFFICE ID"
        linkText1="Search"
        linkText2="Add"
        link2={Constants.URLConstants.FLIGHTFLIGHTPCCADDRULES}
      />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <form onSubmit={handleFormSubmit}>
          <input type="hidden" name="action" defaultValue="insert" />
          <div className="hpanel">
            <div className="panel-body">
              <div className="row mt-2">
                <div className="col-md-3 form-group " id="officeid_type">
                  <label htmlFor="id_agent">Office Id Type</label>
                  <br />
                  <br />
                  <div className="radioline1 mt-2">
                    <div className="radio radio-success radio-inline">
                      <input
                        type="radio"
                        name="officeid_type"
                        id="id_default"
                        value="office_id"
                        onChange={handleRadioChange}
                      />
                      <label htmlFor="id_default">Add Office ID</label>
                    </div>
                    <div className="radio radio-success radio-inline">
                      <input
                        type="radio"
                        name="officeid_type"
                        id="id_agent"
                        value="agent"
                        defaultChecked="checked"
                        onChange={handleRadioChange}
                      />
                      <label htmlFor="id_agent">Agent Specific</label>
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-3 form-group "
                  id="branchList"
                  style={{ display: !showAdditionalFields ? "block" : "none" }}
                >
                  <label>Branch</label>
                  <MultiSelect
                    options={branches}
                    isSearchable
                    placeholder="- Select Branch -"
                    noOptionsMessage={() => "No Branch Found"}
                    className="custom-select required"
                    onChange={(selectedOption) =>
                      setFormData({
                        ...formData,
                        branch: selectedOption ? selectedOption.value : "",
                      })
                    }
                  />
                </div>
                <div
                  className="col-md-3 form-group "
                  id="agentslist"
                  style={{ display: !showAdditionalFields ? "block" : "none" }}
                >
                  <label>Agent: </label>
                  <MultiSelect
                    options={agents}
                    isSearchable
                    isMulti
                    placeholder="- Select Agent -"
                    className="custom-select"
                    noOptionsMessage={() => "No Agent Found"}
                    onChange={(selectedOptions) =>
                      setFormData({
                        ...formData,
                        agents: selectedOptions.map((option) => option.value),
                      })
                    }
                  />
                </div>
                <div
                  className="col-md-3 form-group "
                  id="PccName"
                  style={{ display: showAdditionalFields ? "block" : "none" }}
                >
                  <label>Pcc Name: </label>
                  <input
                    name="pccName"
                    value={pccName}
                    onChange={(e) => setPCCName(e.target.value)}
                    type="text"
                    maxLength={180}
                    className="form-control form-control-sm"
                  />
                </div>
              </div>
              <br />
              <div className="row">
                <div
                  className="col-md-3 form-group "
                  id="supplierlist"
                  style={{ display: !showAdditionalFields ? "block" : "none" }}
                >
                  <label>Flight Provider: </label>

                  <MultiSelect
                    options={flightproviders_options}
                    isSearchable
                    placeholder="- Select Flight Providers -"
                    onChange={(selectedOption) =>
                      setFormData({
                        ...formData,
                        flightProvider: selectedOption
                          ? selectedOption.value
                          : "",
                      })
                    }
                    className="custom-select "
                    noOptionsMessage={() => "No Flight Providers Found"}
                  />
                </div>
                <div
                  className="col-md-3 form-group "
                  id="aofficeid"
                  style={{ display: !showAdditionalFields ? "block" : "none" }}
                >
                  <label>Office ID: </label>
                  <div id="Select_officeid">
                    <MultiSelect
                      options={officeIds}
                      isSearchable
                      isMulti
                      placeholder="- Select Office -"
                      className="custom-select"
                      noOptionsMessage={() => "No Office Found"}
                      onChange={(selectedOptions) =>
                        setFormData({
                          ...formData,
                          officeIds: selectedOptions.map(
                            (option) => option.value
                          ),
                        })
                      }
                    />
                  </div>
                </div>
                <div
                  className="col-md-3 form-group "
                  id="supplierlist"
                  style={{ display: showAdditionalFields ? "block" : "none" }}
                >
                  <label>Flight Provider: </label>

                  <MultiSelect
                    options={flightproviders_options}
                    isSearchable
                    placeholder="- Select Flight Provider -"
                    className="custom-select"
                    value={selectedFlightProvider}
                    onChange={setSelectedFlightProvider}
                    noOptionsMessage={() => "No Flight Provider Found"}
                  />
                </div>
                <div
                  className="col-md-3 form-group "
                  id="aofficeid"
                  style={{ display: showAdditionalFields ? "block" : "none" }}
                >
                  <label>Office ID: </label>
                  <div id="Select_officeid">
                    <input
                      id="officeId"
                      name="officeID"
                      value={officeIDNAME}
                      onChange={(e) => setOfficeIDNAME(e.target.value)}
                      type="text"
                      maxLength={180}
                      className="form-control form-control-sm"
                    />
                  </div>
                </div>
              </div>
              <br />
              <br />

              <div className="row">
                <div className="col-md-2 form-group">
                  <span id="submit_td">
                    <button
                      className="btn btn-dark btn-sm"
                      type="button"
                      name="submit"
                      value="search"
                      onClick={handleSearch}
                    >
                      <i className="fa fa-search" /> Search
                    </button>
                  </span>
                  &nbsp;&nbsp;
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    type="button"
                    id="reset"
                    name="reset"
                    value="Reset"
                    onClick={handleReset}
                  >
                    <i className="fa fa-repeat" /> &nbsp;Reset
                  </button>
                </div>
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
            <div style={{ display: !showAdditionalFields ? "block" : "none" }}>
              <label>
                <h5>AGENTS OFFICE IDS</h5>
              </label>
              <form>
                <div className="panel-body removeMargins">
                  <div className="dataTables_scroll">
                    <div
                      id="search_transfer_wrapper"
                      className="dataTables_wrapper form-inline dt-bootstrap no-footer"
                    >
                      <div className="row pd_tp">
                        <div className="row mt-4">
                          <div className="col-md-5"></div>
                          <div className="col-md-5">
                            <div className="form-group">
                              <div className="col-md-5">
                                {/*Pagination panel*/}
                                {/* <nav aria-label="Page navigation example">
                                  <ul className="pagination pagination-sm justify-content-center">
                                    <li className="page-item active">
                                      <Link className="page-link" to="#">
                                        1
                                      </Link>
                                    </li>
                                    <li className="page-item">
                                      <Link className="page-link" to="#">
                                        2
                                      </Link>
                                    </li>
                                    <li className="page-item">
                                      <Link className="page-link" to="#">
                                        3
                                      </Link>
                                    </li>
                                    <li className="page-item">
                                      <Link className="page-link" to="#">
                                        4
                                      </Link>
                                    </li>
                                    <li className="page-item">
                                      <Link className="page-link" to="#">
                                        5
                                      </Link>
                                    </li>
                                    <li className="page-item">
                                      <Link className="page-link" to="#">
                                        6
                                      </Link>
                                    </li>
                                    <li className="page-item">
                                      <Link className="page-link" to="#">
                                        7
                                      </Link>
                                    </li>
                                    <li className="page-item">
                                      <Link className="page-link" to="#">
                                        8
                                      </Link>
                                    </li>
                                    <li className="page-item">
                                      <Link className="page-link" to="#">
                                        9
                                      </Link>
                                    </li>
                                    <li className="page-item">
                                      <Link className="page-link" to="#">
                                        10
                                      </Link>
                                    </li>
                                    <li className="page-item">
                                      <Link
                                        className="page-link"
                                        to="#"
                                        aria-label="Next"
                                      >
                                        <span aria-hidden="true">NEXT»</span>
                                      </Link>
                                    </li>
                                  </ul>
                                </nav> */}
                              </div>
                            </div>
                          </div>

                          <style
                            dangerouslySetInnerHTML={{
                              __html:
                                "\n                                    .table tr[visible='false'],\n                                    .no-result {\n                                        display: none;\n                                        border: 1px solid #ddd;\n                                        padding: 10px;\n                                        margin-top: -2px;\n                                    }\n\n                                    .table tr[visible='true'] {\n                                        display: table-row;\n                                    }\n\n                                    .counter {\n                                        padding: 8px;\n                                        color: #ccc;\n                                    }\n\n                                    .search_new {\n                                        float: right;\n                                        height: 35px;\n                                        margin-bottom: 0px;\n                                        padding-left: 5px;\n                                    }\n                                ",
                            }}
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-sm-12">
                          <div
                            className="doubleScroll-scroll-wrapper"
                            id="wrapper1"
                            style={{
                              height: "20px",
                              overflow: "scroll hidden",
                              width: "1290px",
                            }}
                          >
                            <div
                              className="suwala-doubleScroll-scroll"
                              style={{ height: "20px", width: "1290px" }}
                            />
                          </div>
                          <div id="wrapper2" style={{ overflow: "auto" }}>
                            <table
                              id="tableres"
                              className="table table-bordered   table-responsive dataTable no-footer"
                            >
                              <thead>
                                <tr>
                                  <th>Agent</th>
                                  <th>Office Id</th>
                                  <th>Flight Provider</th>
                                  <th>Supplier</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody className="bg-white">
                                {pccRuleTable.map((pccRule, index) => (
                                  <tr key={index}>
                                    <td>
                                      {pccRule.agents
                                        .map((agent) => agent.agentName)
                                        .join(" , ")}
                                    </td>
                                    <td>
                                      {pccRule.officeIds
                                        .map((office) => office.officeID)
                                        .join(", ")}
                                    </td>
                                    <td>{pccRule.flightProvider}</td>
                                    <td>
                                      {/* Populate with the supplier data if available */}
                                    </td>
                                    <td align="center" className="actionlink">
                                      <div className="actionCont width_table">
                                        <div className="input-group-addon">
                                          <Link
                                            to={
                                              Constants.URLConstants
                                                .FLIGHTFLIGHTPCCEDITRULES
                                            }
                                            onClick={() =>
                                              handleViewClick(pccRule)
                                            }
                                            data-toggle="tooltip"
                                            data-original-title="Edit"
                                            data-placement="top"
                                          >
                                            <i className="fa fa-pencil-square-o"></i>
                                          </Link>
                                        </div>
                                        <div className="input-group-addon">
                                          <Link
                                            to={
                                              Constants.URLConstants
                                                .FLIGHTFLIGHTPCCVIEWRULES
                                            }
                                            onClick={() =>
                                              handleViewClick(pccRule)
                                            }
                                            data-toggle="tooltip"
                                            data-original-title="View"
                                            data-placement="top"
                                          >
                                            <i className="fa fa-eye" />
                                          </Link>
                                        </div>
                                        <div className="input-group-addon">
                                          {pccRule.status === "Active" ? (
                                            <Link
                                              onClick={() => {
                                                handleUpdateStatus(pccRule);
                                              }}
                                            >
                                              <i className="fa fa-check-circle"></i>
                                            </Link>
                                          ) : (
                                            <Link
                                              onClick={() => {
                                                handleUpdateStatus(pccRule);
                                              }}
                                            >
                                              <i className="fa fa-times-circle"></i>
                                            </Link>
                                          )}
                                        </div>
                                        <div className="input-group-addon">
                                          <Link
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Delete"
                                            data-original-title="Delete"
                                            onClick={() =>
                                              handleDeleteClick(pccRule.uuid)
                                            }
                                          >
                                            <i className="fa fa-trash" />
                                          </Link>
                                        </div>
                                        <div className="input-group-addon">
                                          <Link
                                            to={`flight_officeid.php?action=inactive&status_type=label_status&officeid_type=agent&id=${pccRule.uuid}`}
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Click To Deactivate Label"
                                            data-original-title="Click To Deactivate Label"
                                          >
                                            <i
                                              className="fa fa-tags"
                                              style={{ color: "#2b8600" }}
                                            />
                                          </Link>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <br />
                      <br />
                      <br />
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div style={{ display: showAdditionalFields ? "block" : "none" }}>
              <label>
                <h5>OFFICE IDS</h5>
              </label>
              <form>
                <div className="panel-body removeMargins">
                  <div className="dataTables_scroll">
                    <div
                      id="search_transfer_wrapper"
                      className="dataTables_wrapper form-inline dt-bootstrap no-footer"
                    >
                      <div className="row pd_tp">
                        <div className="row mt-4">
                          <div className="col-md-5"></div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <div className="col-md-5">
                                {/*Pagination panel*/}
                                {/* <nav aria-label="Page navigation example">
                                  <ul className="pagination pagination-sm justify-content-center">
                                    <li className="page-item active">
                                      <Link className="page-link" to="#">
                                        1
                                      </Link>
                                    </li>
                                    <li className="page-item">
                                      <Link className="page-link" to="#">
                                        2
                                      </Link>
                                    </li>
                                    <li className="page-item">
                                      <Link className="page-link" to="#">
                                        3
                                      </Link>
                                    </li>
                                    <li className="page-item">
                                      <Link className="page-link" to="#">
                                        4
                                      </Link>
                                    </li>
                                    <li className="page-item">
                                      <Link className="page-link" to="#">
                                        5
                                      </Link>
                                    </li>
                                    <li className="page-item">
                                      <Link className="page-link" to="#">
                                        6
                                      </Link>
                                    </li>
                                    <li className="page-item">
                                      <Link className="page-link" to="#">
                                        7
                                      </Link>
                                    </li>
                                    <li className="page-item">
                                      <Link className="page-link" to="#">
                                        8
                                      </Link>
                                    </li>
                                    <li className="page-item">
                                      <Link className="page-link" to="#">
                                        9
                                      </Link>
                                    </li>
                                    <li className="page-item">
                                      <Link className="page-link" to="#">
                                        10
                                      </Link>
                                    </li>
                                    <li className="page-item">
                                      <Link
                                        className="page-link"
                                        to="#"
                                        aria-label="Next"
                                      >
                                        <span aria-hidden="true">NEXT»</span>
                                      </Link>
                                    </li>
                                  </ul>
                                </nav> */}
                              </div>
                            </div>
                          </div>
                          <div className="col-md-3 search_option">
                            <div
                              className="form-group col-md-2 "
                              style={{
                                textAlign: "right",
                                paddingRight: "0px",
                              }}
                            >
                              <h5 style={{ display: "inline" }}>
                                <i
                                  class="fa fa-search srchWithinPg"
                                  id="magnifiers"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Search within this table"
                                  aria-hidden="true"
                                ></i>
                              </h5>
                            </div>
                            <div className="form-group col-md-10 bookingsrc">
                              <input
                                type="text"
                                className="tablesearch form-control form-control-sm search_new"
                                placeholder="Search PCC Name"
                                value={searchInput}
                                onChange={handleInputSearchChange}
                              />
                            </div>
                          </div>

                          <style
                            dangerouslySetInnerHTML={{
                              __html:
                                "\n                                    .table tr[visible='false'],\n                                    .no-result {\n                                        display: none;\n                                        border: 1px solid #ddd;\n                                        padding: 10px;\n                                        margin-top: -2px;\n                                    }\n\n                                    .table tr[visible='true'] {\n                                        display: table-row;\n                                    }\n\n                                    .counter {\n                                        padding: 8px;\n                                        color: #ccc;\n                                    }\n\n                                    .search_new {\n                                        float: right;\n                                        height: 35px;\n                                        margin-bottom: 0px;\n                                        padding-left: 5px;\n                                    }\n                                ",
                            }}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12">
                          <div
                            className="doubleScroll-scroll-wrapper"
                            id="wrapper1"
                            style={{
                              height: "20px",
                              overflow: "scroll hidden",
                              width: "1290px",
                            }}
                          >
                            <div
                              className="suwala-doubleScroll-scroll"
                              style={{ height: "20px", width: "1290px" }}
                            />
                          </div>
                          <div id="wrapper2" style={{ overflow: "auto" }}>
                            <table
                              id="tableres"
                              className="table table-bordered   table-responsive dataTable no-footer"
                            >
                              <thead>
                                <tr>
                                  <th>Pcc Name</th>
                                  <th>Office Id</th>
                                  <th>Flight Provider</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody className="bg-white">
                                {officeIdsTable.map((office, index) => (
                                  <tr key={index}>
                                    <td>{office.pccName}</td>
                                    <td>{office.officeID}</td>
                                    <td>{office.flightProvider}</td>
                                    <td align="center" className="actionlink">
                                      <div className="actionCont width_table">
                                        <div className="input-group-addon">
                                          <Link
                                            to={
                                              Constants.URLConstants
                                                .FLIGHTEDITOFFICEIDS
                                            }
                                            onClick={() =>
                                              handleViewOfficeIdClick(office)
                                            }
                                            data-toggle="tooltip"
                                            data-original-title="Edit"
                                            data-placement="top"
                                          >
                                            <i className="fa fa-pencil-square-o"></i>
                                          </Link>
                                        </div>

                                        <div className="input-group-addon">
                                          <Link
                                            to={
                                              Constants.URLConstants
                                                .FLIGHTVIEWOFFICEIDS
                                            }
                                            onClick={() =>
                                              handleViewOfficeIdClick(office)
                                            }
                                            data-toggle="tooltip"
                                            data-original-title="View"
                                            data-placement="top"
                                          >
                                            <i className="fa fa-eye"></i>
                                          </Link>
                                        </div>
                                        <div className="input-group-addon">
                                          {office.status === "Active" ? (
                                            <Link
                                              onClick={() => {
                                                handleUpdateOfficeIdStatus(
                                                  office
                                                );
                                              }}
                                            >
                                              <i className="fa fa-check-circle"></i>
                                            </Link>
                                          ) : (
                                            <Link
                                              onClick={() => {
                                                handleUpdateOfficeIdStatus(
                                                  office
                                                );
                                              }}
                                            >
                                              <i className="fa fa-times-circle"></i>
                                            </Link>
                                          )}
                                        </div>

                                        <div className="input-group-addon">
                                          <Link
                                            href={`flight_officeid.php?action=delete&officeid_type=office_id&id=${office.uuid}`}
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Delete"
                                            data-original-title="Delete"
                                            onClick={() =>
                                              handleDeleteOfficeid(office.uuid)
                                            }
                                          >
                                            <i className="fa fa-trash"></i>
                                          </Link>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <br />
                      <br />
                      <br />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default connect(null, {
  setFlightPCCRuleDataRedux,
  setFlightOfficeIdDataRedux,
})(FlightPccSearchRule);
