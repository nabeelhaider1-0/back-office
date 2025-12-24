import { Link } from "react-router-dom";
import Header2 from "../../header2/header2";
import Constants from "../../../constants/routes";
import MultiSelect from "../../reactMultiSelect";
import { flightproviders_options } from "../../../constants/contants";
import { useEffect, useState } from "react";
import {
  deleteFlightCancellationRules,
  flightGetCancellationRules,
  updateFlightCancellationRules,
} from "../../../Apis/API";
import loadingGif from "../../../assets/images/loadingblue.gif";
import Swal from "sweetalert2";
import { setFlightCancellationRuleDataRedux } from "../../../state/action/actions";
import { connect } from "react-redux";
const FlightCancellationSearchRule = ({
  setFlightCancellationRuleDataRedux,
}) => {
  const handleEditClick = (FlightCancellationRule) => {
    setFlightCancellationRuleDataRedux(FlightCancellationRule); // Dispatch the action to set the editBranchData in the Redux store
  };
  const [loading, setLoading] = useState(true); // Initially, set loading to true

  const [flightCancellationRuleData, setFlightCancellationRuleData] = useState(
    []
  );
  const [
    originalFlightCancellationRuleData,
    setOriginalFlightCancellationRuleData,
  ] = useState([]);
  const getFlightCancellationRules = async () => {
    try {
      setLoading(true); // Set loading to true when fetching data
      const response = await flightGetCancellationRules();

      if (response.data.statusCode === 200) {
        const CancellationFlightData =
          response && response.data.data ? response.data.data : [];

        // Handle the staff data as needed
        // For example, update state, perform further processing, etc.
        setFlightCancellationRuleData(CancellationFlightData);
        setOriginalFlightCancellationRuleData(CancellationFlightData);
      }

      // Handle successful response, e.g., set user state, redirect, etc.
    } catch (error) {
      // Handle errors
    } finally {
      setLoading(false); // Set loading to false after data is fetched (whether successful or not)
    }
  };
  useEffect(() => {
    getFlightCancellationRules();
  }, []);

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
        text: "Are You Sure You Want To Delete This Flight Cancellation Rule ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await deleteFlightCancellationRules(uuid);

            if (response.data.statusCode === 200) {
              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Flight Cancellation Rule has been deleted successfully.",
                icon: "success",
              });

              setFlightCancellationRuleData((prevFlightCancellationRuleData) =>
                prevFlightCancellationRuleData.filter(
                  (CancellationRule) => CancellationRule.uuid !== uuid
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
  const handleUpdateStatus = async (CancellationRuleData) => {
    // Check if the ruleData exists
    if (!CancellationRuleData || !CancellationRuleData.uuid) {
      return;
    }

    // Update the status of ruleData
    const updatedStatus =
      CancellationRuleData.status === "Active" ? "In Active" : "Active";
    let isActive = false;
    // Update flightRuleData with the updated status
    if (CancellationRuleData.status === "Active") {
      isActive = true;
    } else {
      isActive = false;
    }
    try {
      // Make an API call to update the staff's active status
      const apiBodyData = {
        flightProvider: CancellationRuleData.flightProvider,
        status: updatedStatus,
        agents: CancellationRuleData.agents,
        branch: CancellationRuleData.branch,
        officeIds: CancellationRuleData.officeIds,
      };
      const response = await updateFlightCancellationRules(
        CancellationRuleData.uuid,
        apiBodyData
      );

      // Check the response and handle it accordingly
      if (response.data.statusCode === 200) {
        const updatedFlightPCCRuleData = flightCancellationRuleData.map(
          (flightCancellationRule) => {
            // Check if the UUID matches
            if (flightCancellationRule.uuid === CancellationRuleData.uuid) {
              // Update the status
              return { ...flightCancellationRule, status: updatedStatus };
            }
            return flightCancellationRule; // Keep other rules unchanged
          }
        );

        setFlightCancellationRuleData(updatedFlightPCCRuleData);
        // Successfully updated staff's active status, update the UI or perform other actions

        // Show SweetAlert notification
        Swal.fire({
          icon: "success",
          title: "Success",
          text: `Flight Cancellation Rule is now ${
            isActive ? "In Active" : "Active"
          }.`,
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
  const [ruleName, setRuleName] = useState("");
  const [selectedFlightProvider, setSelectedFlightProvider] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const handleInputSearchChange = (event) => {
    const { value } = event.target;
    setSearchInput(value);

    // Perform filtering as the user types
    const filteredCRuleid = originalFlightCancellationRuleData.filter(
      (CRuleId) => CRuleId.addRule.toLowerCase().includes(value.toLowerCase())
    );

    setFlightCancellationRuleData(filteredCRuleid);
  };
  const handleSearch = () => {
    // Filter data based on ruleId and selectedRuleTypes
    const filteredData = originalFlightCancellationRuleData.filter((Crule) => {
      const idMatch = Crule.addRule
        .toLowerCase()
        .includes(ruleName.toLowerCase());
      const typeMatch =
        selectedFlightProvider.length === 0 ||
        Crule.flightProvider.some((selected) =>
          selectedFlightProvider.value.includes(selected)
        );
      return idMatch && typeMatch;
    });
    setFlightCancellationRuleData(filteredData);
  };

  const handleReset = () => {
    setRuleName("");
    setSelectedFlightProvider([]);
    setFlightCancellationRuleData(originalFlightCancellationRuleData);
  };
  return (
    <>
      <Header2
        title="ADD CANCELLATION RULE"
        linkText1="Search Cancellation Rule"
        linkText2="Add Cancellation Rule"
        link2={Constants.URLConstants.FLIGHTFLIGHTCANCELLATIONADDRULES}
      />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="panel-body">
            <div className="row">
              <div className="col-md-2 form-group">
                <label>Rule Name</label>
                <input
                  type="text"
                  name="rule_name"
                  id="rule_name"
                  autoComplete="off"
                  maxLength={50}
                  className="form-control form-control-sm test123"
                  value={ruleName}
                  onChange={(e) => setRuleName(e.target.value)}
                />
                <br />
              </div>
              <div className="col-md-2 form-group">
                <label>Flight Providers</label>
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
            </div>
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
              <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-5"></div>
                <div className="col-md-3 search_option">
                  <div
                    className="form-group col-md-2 "
                    style={{ textAlign: "right", paddingRight: "0px" }}
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
                      placeholder="Search Rule Name"
                      value={searchInput}
                      onChange={handleInputSearchChange}
                    />
                  </div>
                </div>
              </div>
              <div className="panel-body removeMargins">
                <div className="dataTables_scroll">
                  <div
                    id="search_transfer_wrapper"
                    className="dataTables_wrapper form-inline dt-bootstrap no-footer"
                  >
                    <div className="row">
                      <div className="col-sm-6" />
                      <div className="col-sm-6" />
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
                            id="search_rule_table1"
                            className="table table-bordered table-responsive dataTable no-footer  "
                          >
                            <thead>
                              <tr>
                                <th>Rule Name</th>
                                <th>Flight Provider</th>
                                <th>Cancellation Lead Time (HRS)</th>
                                <th className="no-sort">ACTIONS</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              {flightCancellationRuleData.map((rule) => (
                                <tr key={rule.uuid}>
                                  <td align="center">{rule.addRule}</td>
                                  <td align="center">
                                    {rule.flightProvider.join(" , ")}
                                  </td>
                                  <td align="center">{rule.leadTime}</td>
                                  <td align="center" className="actionlink">
                                    <div className="actionCont width_table">
                                      <div className="input-group-addon">
                                        {/* Edit link */}
                                        <Link
                                          to={
                                            Constants.URLConstants
                                              .FLIGHTFLIGHTCANCELLATIONEDITRULES
                                          }
                                          onClick={() => handleEditClick(rule)}
                                          data-toggle="tooltip"
                                          data-original-title="Edit"
                                          data-placement="top"
                                        >
                                          <i className="fa fa-pencil-square-o"></i>
                                        </Link>
                                      </div>
                                      <div className="input-group-addon">
                                        {rule.status === "Active" ? (
                                          <Link
                                            onClick={() => {
                                              handleUpdateStatus(rule);
                                            }}
                                          >
                                            <i className="fa fa-check-circle"></i>
                                          </Link>
                                        ) : (
                                          <Link
                                            onClick={() => {
                                              handleUpdateStatus(rule);
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
                                            handleDeleteClick(rule.uuid)
                                          }
                                        >
                                          <i className="fa fa-trash" />
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
          </>
        )}
      </div>
    </>
  );
};
export default connect(null, { setFlightCancellationRuleDataRedux })(
  FlightCancellationSearchRule
);
