import { Link } from "react-router-dom";
import Header2 from "../../header2/header2";
import Constants from "../../../constants/routes";
import MultiSelect from "../../reactMultiSelect";
import { ruleTypeOptions } from "../../../constants/contants";
import { useEffect, useState } from "react";
import {
  deleteFlightRules,
  getAllFlightRules,
  updateFlightRules,
} from "../../../Apis/API";
import loadingGif from "../../../assets/images/loadingblue.gif";
import Swal from "sweetalert2";
import { setFlightRuleDataRedux } from "../../../state/action/actions";
import { connect } from "react-redux";

const FlightSearchRule = ({ setFlightRuleDataRedux }) => {
  const handleEdditClick = (FlightRule) => {
    setFlightRuleDataRedux(FlightRule); // Dispatch the action to set the editBranchData in the Redux store
  };

  const [loading, setLoading] = useState(true); // Initially, set loading to true

  const [flightRuleData, setFlightRuleData] = useState([]);
  const [originalFlightRuleData, setOriginalflightRuleData] = useState([]);

  const [searchInput, setSearchInput] = useState("");

  const handleInputSearchChange = (event) => {
    const { value } = event.target;
    setSearchInput(value);

    // Perform filtering as the user types
    const filteredRuleid = originalFlightRuleData.filter((ruleId) =>
      ruleId.ruleIdentifier.toLowerCase().includes(value.toLowerCase())
    );

    setFlightRuleData(filteredRuleid);
  };
  const [ruleId, setRuleId] = useState("");
  const [selectedRuleTypes, setSelectedRuleTypes] = useState([]);

  const handleSearch = () => {
    // Filter data based on ruleId and selectedRuleTypes
    const filteredData = originalFlightRuleData.filter((rule) => {
      const idMatch = rule.ruleIdentifier
        .toLowerCase()
        .includes(ruleId.toLowerCase());
      const typeMatch =
        selectedRuleTypes.length === 0 ||
        rule.ruleType.some((selected) =>
          selectedRuleTypes.value.includes(selected)
        );
      return idMatch && typeMatch;
    });
    setFlightRuleData(filteredData);
  };

  const handleReset = () => {
    setRuleId("");
    setSelectedRuleTypes([]);
    setFlightRuleData(originalFlightRuleData);
  };

  const getFlightRules = async () => {
    try {
      setLoading(true); // Set loading to true when fetching data
      const response = await getAllFlightRules();

      if (response.data.statusCode === 200) {
        const FlightData =
          response && response.data.data ? response.data.data : [];

        // Handle the staff data as needed
        // For example, update state, perform further processing, etc.
        setFlightRuleData(FlightData);
        setOriginalflightRuleData(FlightData);
      }

      // Handle successful response, e.g., set user state, redirect, etc.
    } catch (error) {
      // Handle errors
    } finally {
      setLoading(false); // Set loading to false after data is fetched (whether successful or not)
    }
  };

  useEffect(() => {
    getFlightRules();
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
        text: "Are You Sure You Want To Delete This Flight Rule ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await deleteFlightRules(uuid);

            if (response.data.statusCode === 200) {
              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Flight Rule has been deleted successfully.",
                icon: "success",
              });

              setFlightRuleData((prevFlightRuleData) =>
                prevFlightRuleData.filter((fRule) => fRule.uuid !== uuid)
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

  const handleUpdateStatus = async (ruleData) => {
    // Check if the ruleData exists
    if (!ruleData || !ruleData.uuid) {
      return;
    }

    // Update the status of ruleData
    ruleData.status = ruleData.status === "Active" ? "In Active" : "Active";
    let isActive = false;
    // Update flightRuleData with the updated status
    if (ruleData.status === "Active") {
      isActive = true;
    } else {
      isActive = false;
    }
    try {
      // Make an API call to update the staff's active status
      const apiBodyData = {
        ruleIdentifier: ruleData.ruleIdentifier,
        ruleType: ruleData.ruleType,
        markupDiscount: ruleData.markupDiscount,
        status: ruleData.status,
        currency: ruleData.currency,
        fromCountry: ruleData.fromCountry,
        fromAirport: ruleData.fromAirport,
        toCountry: ruleData.toCountry,
        toAirport: ruleData.toAirport,
        airline: ruleData.airline,
        classofTravel: ruleData.classofTravel,
        fareClass: ruleData.fareClass,
        flightProvider: ruleData.flightProvider,
        bookingPolicy: ruleData.bookingPolicy,
        journeyType: ruleData.journeyType,
        availableSeatFrom: ruleData.availableSeatFrom,
        availableSeatTo: ruleData.availableSeatTo,
        lastMinute: ruleData.lastMinute,
        bookingDateFrom: ruleData.bookingDateFrom,
        bookingDateTo: ruleData.bookingDateTo,
        travelDateFrom: ruleData.travelDateFrom,
        travelDateTo: ruleData.travelDateTo,
        paxRangeFrom: ruleData.paxRangeFrom,
        paxRangeTo: ruleData.paxRangeTo,
      };
      const response = await updateFlightRules(ruleData.uuid, apiBodyData);

      // Check the response and handle it accordingly
      if (response.data.statusCode === 200) {
        const updatedFlightRuleData = flightRuleData.map((flightRule) => {
          // Check if the UUID matches
          if (flightRule.uuid === ruleData.uuid) {
            // Update the status
            return { ...flightRule, status: ruleData.status };
          }
          return flightRule; // Keep other rules unchanged
        });
        // Set the updated flightRuleData in the state
        setFlightRuleData(updatedFlightRuleData);
        // Successfully updated staff's active status, update the UI or perform other actions

        // Show SweetAlert notification
        Swal.fire({
          icon: "success",
          title: "Success",
          text: `Flight Rule is now ${isActive ? "Active" : "In Active"}.`,
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
  return (
    <>
      <Header2
        title="SEARCH RULE"
        linkText1="Search rule"
        linkText2="Add Rule"
        link2={Constants.URLConstants.FLIGHTFLIGHTADDRULES}
      />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="panel-body">
            <div className="row">
              <div className="col-md-2 form-group">
                <label>Rule Id</label>
                <input
                  className="form-control form-control-sm test123"
                  type="text"
                  id="rule_identifier"
                  name="rule_identifier"
                  value={ruleId}
                  onChange={(e) => setRuleId(e.target.value)}
                />
              </div>
              <div className="col-md-2 form-group">
                <label>Rule Type</label>
                <MultiSelect
                  options={ruleTypeOptions}
                  isSearchable
                  name="rule_type"
                  value={selectedRuleTypes}
                  onChange={setSelectedRuleTypes}
                  placeholder="- Select Rule Type -"
                  className="custom-select"
                  noOptionsMessage={() => "No Rule Type Found"}
                />
              </div>

              <br />
              <div className="row mt-2">
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
            <form>
              <div className="panel-body removeMargins">
                <div className="dataTables_scroll">
                  <div className="row pd_tp">
                    <div className="row mt-4">
                      <div className="col-md-5"></div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <div className="col-md-5">
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
                                  <Link
                                    className="page-link"
                                    to="#"
                                    aria-label="Next"
                                  >
                                    <span aria-hidden="true">»</span>
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
                            placeholder="Rule ID"
                            value={searchInput}
                            onChange={handleInputSearchChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
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
                            className="table   table-responsive dataTable no-footer table table-bordered"
                            role="grid"
                            aria-describedby="search_sup_info"
                          >
                            <thead>
                              <tr>
                                <th>RULE ID</th>
                                <th>RULE TYPE</th>
                                <th className="no-sort">ACTIONS</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              {flightRuleData.map((rule, index) => (
                                <tr key={index}>
                                  <td
                                    align="center"
                                    style={{ textTransform: "capitalize" }}
                                  >
                                    <font style={{ fontWeight: "bold" }}>
                                      {rule.ruleIdentifier}
                                    </font>
                                  </td>
                                  <td align="center">
                                    &nbsp;{rule.ruleType.join(" , ")}
                                  </td>
                                  <td align="center" className="actionlink">
                                    <div className="actionCont width_table">
                                      {/* Assuming Constants.URLConstants.FLIGHTFLIGHTEDITRULES, FLIGHTFLIGHTVIEWRULES, FLIGHTFLIGHTADDRULES are defined */}
                                      <div className="input-group-addon">
                                        <Link
                                          to={
                                            Constants.URLConstants
                                              .FLIGHTFLIGHTEDITRULES
                                          }
                                          data-toggle="tooltip"
                                          data-original-title="Edit"
                                          data-placement="top"
                                          onClick={() => handleEdditClick(rule)}
                                        >
                                          <i className="fa fa-pencil-square-o" />
                                        </Link>
                                      </div>
                                      <div
                                        className="input-group-addon"
                                        data-toggle="tooltip"
                                        data-original-title="View"
                                        data-placement="top"
                                      >
                                        <Link
                                          to={
                                            Constants.URLConstants
                                              .FLIGHTFLIGHTVIEWRULES
                                          }
                                          onClick={() => handleEdditClick(rule)}
                                        >
                                          <i className="fa fa-eye" />
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
                                      <div
                                        className="input-group-addon"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title
                                        data-original-title="Delete"
                                        onClick={() =>
                                          handleDeleteClick(rule.uuid)
                                        }
                                      >
                                        <Link>
                                          <i className="fa fa-trash" />
                                        </Link>
                                      </div>
                                      <div className="input-group-addon">
                                        <Link
                                          to={
                                            Constants.URLConstants
                                              .FLIGHTFLIGHTCLONERULES
                                          }
                                          data-toggle="tooltip"
                                          data-original-title="Copy"
                                          data-placement="top"
                                          onClick={() => handleEdditClick(rule)}
                                        >
                                          <i className="fa fa-files-o" />
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
                    <div className="row">
                      <div className="col-sm-6">
                        <div
                          className="dataTables_info"
                          id="search_transfer_info"
                          role="status"
                          aria-live="polite"
                        ></div>
                      </div>
                      <div className="col-sm-6" />
                    </div>
                  </div>
                  <br />
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
};
export default connect(null, { setFlightRuleDataRedux })(FlightSearchRule);
