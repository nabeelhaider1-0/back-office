import { useEffect, useState } from "react";

import Header2 from "../header2/header2";
import MultiSelect from "../reactMultiSelect";
import { getAllBranches, getDATA, postDATA } from "../../Apis/API";
import {
  ErrorApiAlert,
  SuccessApiToast,
} from "../../constants/globalfunctions";
import ApiRoutes from "../../constants/ApiRoutes";

const CustomersAgentAdvanceOfflineSetting = () => {
  const [formData, setFormData] = useState({
    branches: [],
    agents: [],
    offlinesuppliers: [],
    markup: "",
  });

  const [formBData, setFormBData] = useState({
    branches: [],
    agents: [],
    offlinesuppliers: [],
    localexcludeorinclude: true,
  });

  const [supplierOptions, setSupplierOptions] = useState([]);
  const [branches, setBranches] = useState();
  const [allBranches, setAllBranches] = useState();
  const [selectedAgentsOpions, setSelectedAgentsOpions] = useState([]);
  const [agents, setAgents] = useState();

  const [supplierBOptions, setSupplierBOptions] = useState([]);
  const [branchesB, setBranchesB] = useState();
  const [allBranchesB, setAllBranchesB] = useState();
  const [selectedAgentsBOpions, setSelectedAgentsBOpions] = useState([]);
  const [agentsB, setBAgents] = useState();
  const getofflinesuppliers = async () => {
    try {
      // Set loading to true when fetching data
      const response = await getDATA(ApiRoutes.SUPPLIERS.OFFLINE.SUPPLIER);
      if (response.data.statusCode === 200) {
        const offlinesuppliers =
          response && response.data.data ? response.data.data : [];

        const options = offlinesuppliers.map((op) => ({
          value: op.uuid,
          label: op.supplierName,
        }));
        setSupplierOptions(options);
        setSupplierBOptions(options);
      }

      // Handle successful authentication, e.g., set user state, redirect, etc.
    } catch (error) {
      ErrorApiAlert("Error Fetching Offline Suppliers");
    } finally {
      // Set loading to false after data is fetched (whether successful or not)
    }
  };

  const handleRadioChange = (e) => {
    const value = e.target.value === "true"; // Convert 'true' or 'false' to boolean
    setFormBData((prevState) => ({
      ...prevState,
      localexcludeorinclude: value,
    }));
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
        setAllBranches(branches);
        setBranchesB(options);
        setAllBranchesB(branches);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getbranches();
    getofflinesuppliers();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLeadTimeSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await postDATA(
        formData,
        ApiRoutes.SUPPLIERS.OFFLINE.MARKUPS
      );
      if (response.data.statusCode === 200) {
        SuccessApiToast("Markups Updated Successfully");
      }
    } catch (error) {
      ErrorApiAlert("Error Updating Markups");
    }
  };

  const handleExcludeIncludeSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await postDATA(
        formBData,
        ApiRoutes.SUPPLIERS.OFFLINE.LOCAL_EXCLUDE_OR_INCLUDE
      );
      if (response.data.statusCode === 200) {
        SuccessApiToast("Exclude Include  Updated Successfully");
      }
    } catch (error) {
      ErrorApiAlert("Error Updating Exclude Include");
    }
  };

  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <Header2 title="AGENT SETTING" linkText1="Advanced Agent Setting" />
        <div>
          {/* First Row*/}
          <form name="frm_addd" onSubmit={(e) => handleLeadTimeSubmit(e)}>
            <input type="hidden" name="action_name" id="action_name" />
            <div className="panel-body">
              <input type="hidden" name="sector_id" id="sector_id" />
              <div className="form-group">
                <h5>Add Markup</h5>
              </div>
              <div className="row form-group">
                <div className="col-md-3 form-group">
                  <label>Branch</label>
                  <MultiSelect
                    options={branches}
                    isSearchable
                    isMulti
                    placeholder="- Select Branch -"
                    noOptionsMessage={() => "No Branch Found"}
                    className="custom-select required"
                    onChange={(selectedOptions) => {
                      // Initialize an empty array to store filtered agents
                      const filteredAgents = [];

                      // Loop through each selected option
                      selectedOptions.forEach((selectedOption) => {
                        // Find the branch in allBranches matching the selected option's value
                        const selectedBranch = allBranches.find(
                          (branch) => branch.uuid === selectedOption.value
                        );

                        if (selectedBranch) {
                          // If the branch is found, map over its agents list
                          selectedBranch.agent.forEach((agent) => {
                            // Push each agent to the filteredAgents array
                            filteredAgents.push({
                              value: agent.uuid,
                              label: agent.agentName,
                            });
                          });
                        }
                      });

                      // Set agents options in the new state
                      setAgents(filteredAgents);

                      // Update formData
                      setFormData({
                        ...formData,
                        branches: selectedOptions.map((option) => option.value),
                      });
                      const updatedSelectedAgentsOptions = [];

                      selectedAgentsOpions.forEach((option) => {
                        if (filteredAgents.includes(option.value)) {
                          updatedSelectedAgentsOptions.push(option);
                        }
                      });

                      // Update selectedAgentsOptions state
                      setSelectedAgentsOpions(updatedSelectedAgentsOptions);
                    }}
                    required
                  />
                </div>
                <div className="form-group col-md-3" id="city_div">
                  <label>Agents</label>
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
                    required
                  />
                </div>
                <div className="col-md-3 form-group">
                  <label>Supplier</label>
                  <MultiSelect
                    options={supplierOptions}
                    isSearchable
                    isMulti
                    placeholder="- Select Supplier -"
                    className="custom-select required"
                    noOptionsMessage={() => "No Supplier Found"}
                    onChange={(selectedOptions) => {
                      setFormData({
                        ...formData,
                        offlinesuppliers: selectedOptions.map(
                          (option) => option.value
                        ),
                      });
                    }}
                    required
                  />
                </div>

                <div className="col-md-3 form-group">
                  <label>Markup % </label>

                  <input
                    type="number"
                    name="markup"
                    id="markup"
                    className="form-control form-control-sm"
                    onChange={handleInputChange}
                    pattern="^\d+(\.\d{1,2})?$"
                    title="Enter a valid number with up to two decimal places"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-3 form-group">
                  <button
                    type="submit"
                    name="Add"
                    value="Add Markup"
                    className="btn btn-dark btn-sm"
                  >
                    <i className="fa fa-plus" />
                    &nbsp;Add Markup
                  </button>
                </div>
              </div>
            </div>
          </form>
          <br />
          {/*2nd Row*/}
          <form
            id="exclude_online_supplier_form"
            onSubmit={(e) => handleExcludeIncludeSubmit(e)}
          >
            <div className="panel-body">
              <div className="form-group mt-4">
                <h5>Exclude/Include Supplier</h5>
              </div>
              <div className="row form-group">
                <div className="col-md-3 form-group">
                  <label>Branch</label>
                  <MultiSelect
                    options={branchesB}
                    isSearchable
                    isMulti
                    placeholder="- Select Branch -"
                    noOptionsMessage={() => "No Branch Found"}
                    className="custom-select required"
                    onChange={(selectedOptions) => {
                      // Initialize an empty array to store filtered agents
                      const filteredAgents = [];

                      // Loop through each selected option
                      selectedOptions.forEach((selectedOption) => {
                        // Find the branch in allBranches matching the selected option's value
                        const selectedBranch = allBranchesB.find(
                          (branch) => branch.uuid === selectedOption.value
                        );

                        if (selectedBranch) {
                          // If the branch is found, map over its agents list
                          selectedBranch.agent.forEach((agent) => {
                            // Push each agent to the filteredAgents array
                            filteredAgents.push({
                              value: agent.uuid,
                              label: agent.agentName,
                            });
                          });
                        }
                      });

                      // Set agents options in the new state
                      setBAgents(filteredAgents);

                      // Update formData
                      setFormBData({
                        ...formBData,
                        branches: selectedOptions.map((option) => option.value),
                      });
                      const updatedSelectedAgentsOptions = [];

                      selectedAgentsBOpions.forEach((option) => {
                        if (filteredAgents.includes(option.value)) {
                          updatedSelectedAgentsOptions.push(option);
                        }
                      });

                      // Update selectedAgentsOptions state
                      setSelectedAgentsBOpions(updatedSelectedAgentsOptions);
                    }}
                    required
                  />
                </div>
                <div className="form-group col-md-3" id="city_div">
                  <label>Agents</label>
                  <MultiSelect
                    options={agentsB}
                    isSearchable
                    isMulti
                    value={selectedAgentsBOpions}
                    placeholder="- Select Agent -"
                    className="custom-select required"
                    noOptionsMessage={() => "No Agent Found"}
                    onChange={(selectedOptions) => {
                      setFormBData({
                        ...formBData,
                        agents: selectedOptions.map((option) => option.value),
                      });
                      setSelectedAgentsBOpions(
                        selectedOptions.map((option) => option)
                      );
                    }}
                    required
                  />
                </div>
                <div className="col-md-3 form-group">
                  <label>Supplier</label>
                  <MultiSelect
                    options={supplierBOptions}
                    isSearchable
                    isMulti
                    placeholder="- Select Supplier -"
                    className="custom-select required"
                    noOptionsMessage={() => "No Supplier Found"}
                    onChange={(selectedOptions) => {
                      setFormBData({
                        ...formBData,
                        offlinesuppliers: selectedOptions.map(
                          (option) => option.value
                        ),
                      });
                    }}
                    required
                  />
                </div>
                <div className="col-md-3 form-group">
                  <label>Exclude/Include Supplier</label>
                  <div>
                    <div className="radioline1 mt-2">
                      <div className="radio radio-success radio-inline">
                        <input
                          id="exclude"
                          name="exclude_supplier"
                          value={false}
                          type="radio"
                          checked={formBData.localexcludeorinclude === false}
                          onChange={handleRadioChange}
                        />
                        <label htmlFor="ntapp">Exclude</label>
                      </div>
                      <div className="radio radio-success radio-inline">
                        <input
                          id="include"
                          name="exclude_supplier"
                          value={true}
                          type="radio"
                          checked={formBData.localexcludeorinclude === true}
                          onChange={handleRadioChange}
                        />
                        <label htmlFor="app">Include</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-3 mb-5">
                <input
                  type="hidden"
                  name="type"
                  defaultValue="exclude_online_supplier"
                  id="type"
                />
                <div className="col-md-3 form-group">
                  <button
                    type="submit"
                    className="btn btn-outline-secondary btn-sm"
                    id="exclude_online_supplier"
                  >
                    <i className="fa fa-plus" />
                    &nbsp;Exclude/Include Supplier
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default CustomersAgentAdvanceOfflineSetting;
