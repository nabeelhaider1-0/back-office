import { useEffect, useState } from "react";
import { flightproviders_options } from "../../../constants/contants";
import Header2 from "../../header2/header2";
import MultiSelect from "../../reactMultiSelect";
import {
  flightAddPccOfficeID,
  flightAddPccRuless,
  getAllBranches,
  getAllflightOfficeID,
} from "../../../Apis/API";
import Swal from "sweetalert2";
import { Slide, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Constants from "../../../constants/routes";

const FlightPccAddRule = () => {
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);

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
  const [allBranches, setAllBranches] = useState();
  const [selectedAgentsOpions, setSelectedAgentsOpions] = useState([]);
  const [officeIds, setofficeIds] = useState();

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
        setAllBranches(branches);
      }
    } catch (error) {}
  };

  const getOfficeIds = async () => {
    try {
      const response = await getAllflightOfficeID();

      if (response.data.statusCode === 200) {
        const officeIDS = response.data.data || [];

        const optionsOffices = officeIDS.map((OfficeID) => ({
          value: OfficeID.uuid,
          label: OfficeID.officeID,
        }));

        setofficeIds(optionsOffices); // Set branches in the new state
      }
    } catch (error) {}
  };
  useEffect(() => {
    getbranches();
    getOfficeIds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // Event handler for form inputs change
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === "checkbox") {
      const updatedValues = checked
        ? [...formData[name], value]
        : formData[name].filter((item) => item !== value);
      setFormData({ ...formData, [name]: updatedValues });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const checkRequired = (data, apiType) => {
    if (apiType === "flightAddPccOfficeID") {
      if (data.pccName === "" || data.pccName === undefined) {
        Swal.fire(
          "PCC Name is required",
          "Please fill in the required fields",
          "error"
        );
        return false;
      }
      if (data.flightProvider === "" || data.flightProvider === undefined) {
        Swal.fire(
          "Flight Provider is required",
          "Please fill in the required fields",
          "error"
        );
        return false;
      }
      if (data.officeID === "" || data.officeID === undefined) {
        Swal.fire(
          "Office ID is required",
          "Please fill in the required fields",
          "error"
        );
        return false;
      }
      if (data.username === "" || data.username === undefined) {
        Swal.fire(
          "User Name is required",
          "Please fill in the required fields",
          "error"
        );
        return false;
      }
      if (data.password === "" || data.password === undefined) {
        Swal.fire(
          "Password is required",
          "Please fill in the required fields",
          "error"
        );
        return false;
      }
      if (data.domain === "" || data.domain === undefined) {
        Swal.fire(
          "Domain is required",
          "Please fill in the required fields",
          "error"
        );
        return false;
      }
      return true;
    } else if (apiType === "flightAddPccRules") {
      if (data.branch === "" || data.branch === undefined) {
        Swal.fire(
          "Branch Name is required",
          "Please fill in the required fields",
          "error"
        );
        return false;
      }
      if (data.agents === "" || data.agents === undefined) {
        Swal.fire(
          "Agents are required",
          "Please fill in the required fields",
          "error"
        );
        return false;
      }
      if (data.flightProvider === "" || data.flightProvider === undefined) {
        Swal.fire(
          "Flight Provider is required",
          "Please fill in the required fields",
          "error"
        );
        return false;
      }
      if (data.officeIds === "" || data.officeIds === undefined) {
        Swal.fire(
          "Office Ids are required",
          "Please fill in the required fields",
          "error"
        );
        return false;
      }
      return true;
    }
  };
  const navigate = useNavigate();
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (showAdditionalFields) {
      // creating office ID
      const flightPCCRuleOfficeIdData = {
        pccName: formData.pccName,
        officeID: formData.officeID,
        username: formData.username,
        password: formData.password,
        status: formData.status,
        flightProvider: formData.flightProvider,
        domain: formData.domain,
      };
      const isSuccessfull = checkRequired(
        flightPCCRuleOfficeIdData,
        "flightAddPccOfficeID"
      );
      if (isSuccessfull) {
        try {
          const response = await flightAddPccOfficeID(
            flightPCCRuleOfficeIdData
          );

          if (response.data.statusCode === 200) {
            toast.success("Office ID Added Successfully", {
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
            getOfficeIds();

            setFormData({
              pccName: "",
              officeID: "",
              username: "",
              password: "",
              flightProvider: "",
              status: "Active",
            });
            navigate(Constants.URLConstants.FLIGHTFLIGHTPCCSEARCHRULES);
          }
        } catch (error) {}
      }
    } else {
      // create Agent Specifc
      const flightAddPccRules = {
        flightProvider: formData.flightProvider,
        status: formData.status,
        agents: formData.agents,
        branch: formData.branch,
        officeIds: formData.officeIds,
      };
      const isSuccessfull = checkRequired(
        flightAddPccRules,
        "flightAddPccRules"
      );
      if (isSuccessfull) {
        try {
          const response = await flightAddPccRuless(flightAddPccRules);

          if (response.data.statusCode === 200) {
            toast.success("Flight PCC Rules Added Successfully", {
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

            setFormData({
              branch: "",
              agents: [],
              flightProvider: "",
              status: "Active",
              officeIds: [],
            });
            navigate(Constants.URLConstants.FLIGHTFLIGHTPCCSEARCHRULES);
          }
        } catch (error) {}
      }
    }
  };
  return (
    <>
      <Header2 title="ADD OFFICE ID" linkText1="Add" />
      <div className="container-fluid pt-0 p-4" id="content-pad">
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
                  className="col-md-3 form-group"
                  style={{ display: showAdditionalFields ? "block" : "none" }}
                >
                  <label>Status:</label>
                  <br />
                  <div className="radioline1">
                    <div className="radio radio-success radio-inline">
                      <input
                        type="radio"
                        id="status_active"
                        value="Active"
                        checked={formData.status === "Active"}
                        onChange={handleInputChange}
                        name="status"
                      />
                      <label htmlFor="status_active">Active</label>
                    </div>
                    <div className="radio radio-success radio-inline">
                      <input
                        type="radio"
                        id="status_inactive"
                        value="In Active"
                        checked={formData.status === "In Active"}
                        onChange={handleInputChange}
                        name="status"
                      />
                      <label htmlFor="status_inactive">In Active</label>
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-3 form-group"
                  style={{ display: !showAdditionalFields ? "block" : "none" }}
                >
                  <label>Status:</label>
                  <br />
                  <div className="radioline1">
                    <div className="radio radio-success radio-inline">
                      <input
                        type="radio"
                        id="status_active"
                        value="Active"
                        checked={formData.status === "Active"}
                        onChange={handleInputChange}
                        name="status"
                      />
                      <label htmlFor="status_active">Active</label>
                    </div>
                    <div className="radio radio-success radio-inline">
                      <input
                        type="radio"
                        id="status_inactive"
                        value="In Active"
                        checked={formData.status === "In Active"}
                        onChange={handleInputChange}
                        name="status"
                      />
                      <label htmlFor="status_inactive">In Active</label>
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
                    onChange={(selectedOption) => {
                      // Clear agents state
                      setAgents(null);
                      setSelectedAgentsOpions(null);

                      // Filter allBranches based on selected option value
                      const selectedBranch = allBranches.find(
                        (branch) => branch.uuid === selectedOption.value
                      );

                      if (selectedBranch) {
                        // Map over the agents list of the matched branch
                        const options = selectedBranch.agent.map((agent) => ({
                          value: agent.uuid,
                          label: agent.agentName,
                        }));

                        // Set agents options in the new state
                        setAgents(options);
                      }

                      // Update formData
                      setFormData({
                        ...formData,
                        branch: selectedOption ? selectedOption.value : "",
                      });
                    }}
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
                    value={selectedAgentsOpions}
                    placeholder="- Select Agent -"
                    className="custom-select required"
                    noOptionsMessage={() => "No Agent Found"}
                    onChange={(selectedOptions) => {
                      setFormData({
                        ...formData,
                        agents: selectedOptions.map((option) => option.value),
                      });
                      setSelectedAgentsOpions(
                        selectedOptions.map((option) => option)
                      );
                    }}
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
                    value={formData.pccName}
                    onChange={handleInputChange}
                    type="text"
                    maxLength={180}
                    className="form-control form-control-sm  required"
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
                    className="custom-select required"
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
                      className="custom-select required"
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
                    placeholder="- Select Flight Providers -"
                    onChange={(selectedOption) =>
                      setFormData({
                        ...formData,
                        flightProvider: selectedOption
                          ? selectedOption.value
                          : "",
                      })
                    }
                    className="custom-select required"
                    noOptionsMessage={() => "No Flight Providers Found"}
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
                      value={formData.officeID}
                      onChange={handleInputChange}
                      type="text"
                      maxLength={180}
                      className="form-control form-control-sm  required"
                    />
                  </div>
                </div>
              </div>
              <br />
              <div
                className="row"
                style={{ display: showAdditionalFields ? "block" : "none" }}
              >
                <div className="row">
                  <div className="col-md-3 form-group " id="username">
                    <label>Username: </label>
                    <input
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      type="text"
                      maxLength={180}
                      className="form-control  required"
                    />
                  </div>
                  <div className="col-md-3 form-group " id="password">
                    <label>Password: </label>
                    <input
                      value={formData.password}
                      onChange={handleInputChange}
                      name="password"
                      type="text"
                      maxLength={180}
                      className="form-control  required"
                    />
                  </div>
                  <div className="col-md-3 form-group " id="domain">
                    <label>Domain: </label>
                    <input
                      value={formData.domain}
                      onChange={handleInputChange}
                      name="domain"
                      type="text"
                      className="form-control  required"
                    />
                  </div>
                </div>
              </div>
              <br />

              <div className="row">
                <div className="form-group col-md-12">
                  <br />
                  <button
                    type="submit"
                    className="btn btn-dark btn-sm"
                    onclick="Javascript submit_form(document.forms['flight_office_id_form'])"
                  >
                    <i className="fa fa-floppy-o" />
                    &nbsp;Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default FlightPccAddRule;
