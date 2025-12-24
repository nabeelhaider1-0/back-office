import { useEffect, useState } from "react";
import { flightproviders_options } from "../../../constants/contants";
import Header2 from "../../header2/header2";
import MultiSelect from "../../reactMultiSelect";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getAllAgents,
  getAllBranches,
  getAllflightOfficeID,
  updateFlightPCCRulesAll,
} from "../../../Apis/API";
import Constants from "../../../constants/routes";
import { Slide, toast } from "react-toastify";

const FlightPccEditRule = ({ data }) => {
  const [formData, setFormData] = useState({
    branch: "",
    agents: [],
    flightProvider: "",
    officeIds: [],
  });
  const [branches, setBranches] = useState();
  const [agents, setAgents] = useState();
  const [officeIds, setofficeIds] = useState();
  const navigateOnRefresh = useNavigate();

  function filterOptionsByValue(options, value) {
    const filteredOption = options.filter((option) => option.value === value);

    return filteredOption;
  }
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
        // Find the branch that matches the data's branch and set it as default
        const selectedBranch = options.find(
          (branch) => branch.value === data.branch.uuid
        );
        if (selectedBranch) {
          setFormData((prevState) => ({
            ...prevState,
            branch: selectedBranch,
          }));
        }
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
        setFormData((prevFormData) => {
          const updatedAgents = filterOptionsByAgents(options, data.agents);
          return {
            ...prevFormData,
            agents: updatedAgents,
          };
        });
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

        setofficeIds(optionsOffices);
        setFormData((prevFormData) => {
          const updatedOfficeids = filterOptionsForOfficeIds(
            optionsOffices,
            data.officeIds
          );
          return {
            ...prevFormData,
            officeIds: updatedOfficeids,
          };
        });
      }
    } catch (error) {}
  };

  useEffect(() => {
    getbranches();
    getAgents();
    getOfficeIds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      setFormData({
        flightProvider: filterOptionsByValue(
          flightproviders_options,
          data.flightProvider
        ),
        agents: [],
        officeIds: [],
      });
    } else {
      // If data is not available, navigate to the branch search page
      navigateOnRefresh(Constants.URLConstants.FLIGHTFLIGHTPCCSEARCHRULES);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, navigateOnRefresh]);
  const navigate = useNavigate();

  function extractValuesFromArray(arr, prop) {
    return arr.map((item) => item.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    formData.flightProvider = formData.flightProvider.value;
    formData.branch = formData.branch.value;
    formData.agents = extractValuesFromArray(formData.agents, "value");
    formData.officeIds = extractValuesFromArray(formData.officeIds, "value");

    try {
      const response = await updateFlightPCCRulesAll(data.uuid, formData);

      if (response.data.statusCode === 200) {
        setFormData({
          branch: "",
          agents: [],
          flightProvider: "",
          officeIds: [],
        });

        toast.success("PCC Rules Updated Successfully", {
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
        navigate(Constants.URLConstants.FLIGHTFLIGHTPCCSEARCHRULES);
      }
    } catch (error) {}
  };

  function filterOptionsByAgents(options, value) {
    if (!options || !value) {
      // Return a default option when either options or value is null or undefined
      return [{ value: "", label: "- Select -" }];
    }

    const optionsAgents = value.map((agent) => ({
      value: agent.uuid,
      label: agent.agentName,
    }));

    const filteredOptionMulti = options.filter((option) =>
      optionsAgents.some((agent) => agent.value === option.value)
    );

    return filteredOptionMulti;
  }
  function filterOptionsForOfficeIds(options, value) {
    if (!options || !value) {
      // Return a default option when either options or value is null or undefined
      return [{ value: "", label: "- Select -" }];
    }

    const optionsOffices = value.map((officeID) => ({
      value: officeID.uuid,
      label: officeID.officeID,
    }));

    const filteredOptionMulti = options.filter((option) =>
      optionsOffices.some((office) => office.value === option.value)
    );

    return filteredOptionMulti;
  }

  return (
    <>
      <Header2 title="EDIT AGENT OFFICE ID" linkText1="EDIT" />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="action" defaultValue="insert" />
          <div className="hpanel">
            <div className="panel-body">
              <div className="row mt-2">
                <div className="col-md-3 form-group " id="branchList">
                  <label>Branch</label>
                  <MultiSelect
                    options={branches}
                    isSearchable
                    placeholder="- Select Branch -"
                    noOptionsMessage={() => "No Branch Found"}
                    className="custom-select required"
                    value={formData.branch}
                    onChange={(selectedOption) =>
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        branch: selectedOption ? selectedOption : "",
                      }))
                    }
                  />
                </div>
                <div className="col-md-3 form-group " id="agentslist">
                  <label>Agent: </label>
                  <MultiSelect
                    options={agents}
                    isSearchable
                    isMulti
                    placeholder="- Select Agent -"
                    className="custom-select required"
                    noOptionsMessage={() => "No Agent Found"}
                    value={formData.agents}
                    onChange={(selectedOptions) => {
                      // Update state and use the callback function to log the updated state
                      setFormData((prevFormData) => {
                        const updatedAgents = selectedOptions.map(
                          (option) => option
                        );

                        return {
                          ...prevFormData,
                          agents: updatedAgents,
                        };
                      });
                    }}
                  />
                </div>

                <div className="col-md-3 form-group " id="supplierlist">
                  <label>Flight Provider: </label>

                  <MultiSelect
                    options={flightproviders_options}
                    isSearchable
                    placeholder="- Select Flight Providers -"
                    onChange={(selectedOption) =>
                      setFormData({
                        ...formData,
                        flightProvider: selectedOption ? selectedOption : "",
                      })
                    }
                    value={formData.flightProvider}
                    className="custom-select required"
                    noOptionsMessage={() => "No Flight Providers Found"}
                  />
                </div>
                <div className="col-md-3 form-group ">
                  <label>Office ID: </label>
                  <MultiSelect
                    options={officeIds}
                    isSearchable
                    isMulti
                    placeholder="- Select Office -"
                    className="custom-select required"
                    noOptionsMessage={() => "No Office Found"}
                    value={formData.officeIds}
                    onChange={(selectedOptions) => {
                      // Update state and use the callback function to log the updated state
                      setFormData((prevFormData) => {
                        const updatedofficeIds = selectedOptions.map(
                          (option) => option
                        );

                        return {
                          ...prevFormData,
                          officeIds: updatedofficeIds,
                        };
                      });
                    }}
                  />
                </div>
              </div>

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
const mapStateToProps = (state) => ({
  data: state.data,
});
export default connect(mapStateToProps)(FlightPccEditRule);
