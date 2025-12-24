import { Link } from "react-router-dom";
import Header2 from "../../header2/header2";
import Constants from "../../../constants/routes";
import MultiSelect from "../../reactMultiSelect";
import { countries } from "../../../constants/Country-City-Data";
import {
  Journey_options,
  addrule_agent_options,
  isDefaultOptions,
} from "../../../constants/contants";
import { useEffect, useState } from "react";
import {
  deleteFlightQCTRules,
  flightGetQCTRules,
  updateFlightQCTRules,
} from "../../../Apis/API";
import loadingGif from "../../../assets/images/loadingblue.gif";
import { setFlightQCTRuleDataRedux } from "../../../state/action/actions";
import { connect } from "react-redux";
import Swal from "sweetalert2";

const FlightQctSearchRule = ({ setFlightQCTRuleDataRedux }) => {
  const handleViewEditClick = (FlightQCTRule) => {
    setFlightQCTRuleDataRedux(FlightQCTRule); // Dispatch the action to set the editBranchData in the Redux store
  };

  const [loading, setLoading] = useState(true); // Initially, set loading to true

  const [flightQCTRuleData, setFlightQCTRuleData] = useState([]);
  const [originalFlightQCTRuleData, setOriginalflightQCTRuleData] = useState(
    []
  );
  const getFlightQCTRules = async () => {
    try {
      setLoading(true); // Set loading to true when fetching data
      const response = await flightGetQCTRules();

      if (response.data.statusCode === 200) {
        const QCTFlightData =
          response && response.data.data ? response.data.data : [];

        // Handle the staff data as needed
        // For example, update state, perform further processing, etc.
        setFlightQCTRuleData(QCTFlightData);
        setOriginalflightQCTRuleData(QCTFlightData);
      }

      // Handle successful response, e.g., set user state, redirect, etc.
    } catch (error) {
      // Handle errors
    } finally {
      setLoading(false); // Set loading to false after data is fetched (whether successful or not)
    }
  };
  useEffect(() => {
    getFlightQCTRules();
  }, []);
  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const formattedDate = `${padWithZero(date.getMonth() + 1)}/${padWithZero(
      date.getDate()
    )}/${date.getFullYear()}`;
    const formattedTime = `${padWithZero(date.getHours())}:${padWithZero(
      date.getMinutes()
    )}:${padWithZero(date.getSeconds())}`;
    return `${formattedDate} ${formattedTime}`;
  }

  function padWithZero(number) {
    return number.toString().padStart(2, "0");
  }
  const [searchInput, setSearchInput] = useState("");
  const handleInputSearchChange = (event) => {
    const { value } = event.target;
    setSearchInput(value);

    // Perform filtering as the user types
    const filteredQCTRuleid = originalFlightQCTRuleData.filter((QCTRuleId) =>
      QCTRuleId.agents.some((agent) =>
        agent.agentName.toLowerCase().includes(value.toLowerCase())
      )
    );

    setFlightQCTRuleData(filteredQCTRuleid);
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
        text: "Are You Sure You Want To Delete This Flight QCT Rule ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await deleteFlightQCTRules(uuid);

            if (response.data.statusCode === 200) {
              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Flight QCT Rule has been deleted successfully.",
                icon: "success",
              });

              setFlightQCTRuleData((prevFlightQCTRuleData) =>
                prevFlightQCTRuleData.filter((qctRule) => qctRule.uuid !== uuid)
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

  const handleUpdateStatus = async (QCTRuleData) => {
    // Check if the ruleData exists
    if (!QCTRuleData || !QCTRuleData.uuid) {
      return;
    }

    // Update the status of ruleData
    const updatedStatus =
      QCTRuleData.status === "Active" ? "In Active" : "Active";
    let isActive = false;
    // Update flightRuleData with the updated status
    if (QCTRuleData.status === "Active") {
      isActive = true;
    } else {
      isActive = false;
    }
    try {
      // Make an API call to update the staff's active status
      const apiBodyData = {
        flightProvider: QCTRuleData.flightProvider,
        status: updatedStatus,
        agents: QCTRuleData.agents,
        branch: QCTRuleData.branch,
        officeIds: QCTRuleData.officeIds,
      };
      const response = await updateFlightQCTRules(
        QCTRuleData.uuid,
        apiBodyData
      );

      // Check the response and handle it accordingly
      if (response.data.statusCode === 200) {
        const updatedFlightPCCRuleData = flightQCTRuleData.map(
          (flightQCTRule) => {
            // Check if the UUID matches
            if (flightQCTRule.uuid === QCTRuleData.uuid) {
              // Update the status
              return { ...flightQCTRule, status: updatedStatus };
            }
            return flightQCTRule; // Keep other rules unchanged
          }
        );
        // Set the updated flightRuleData in the state
        setFlightQCTRuleData(updatedFlightPCCRuleData);
        // Successfully updated staff's active status, update the UI or perform other actions

        // Show SweetAlert notification
        Swal.fire({
          icon: "success",
          title: "Success",
          text: `Flight QCT Rule is now ${isActive ? "In Active" : "Active"}.`,
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
  const [ticketing, setTicketing] = useState("");
  const [booking, setBooking] = useState("");
  const [queue, setQueue] = useState("");

  const handleSearch = () => {
    // Filter data based on ruleId and selectedRuleTypes
    const filteredData = originalFlightQCTRuleData.filter((qctrule) => {
      const idMatch = qctrule.ticketingPCC
        .toLowerCase()
        .includes(ticketing.toLowerCase());
      const idMatch2 = qctrule.bookingPCC
        .toLowerCase()
        .includes(booking.toLowerCase());
      const idMatch3 = qctrule.queueIdentifier
        .toLowerCase()
        .includes(queue.toLowerCase());
      return idMatch && idMatch2 && idMatch3;
    });
    setFlightQCTRuleData(filteredData);
  };

  const handleReset = () => {
    setTicketing("");
    setBooking("");
    setQueue("");
    setFlightQCTRuleData(originalFlightQCTRuleData);
  };
  return (
    <>
      <Header2
        title="SEARCH QCT RULE"
        linkText1="Search QCT Rule"
        linkText2="Add QCT Rule"
        link2={Constants.URLConstants.FLIGHTFLIGHTQCTADDRULES}
      />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="panel-body">
            <div className="row">
              <div className="col-md-2 form-group">
                <label>Ticketing PCC Id</label>
                <input
                  className="form-control form-control-sm test123"
                  type="text"
                  id="pcc_id"
                  name="pcc_id"
                  value={ticketing}
                  maxLength={50}
                  onChange={(e) => setTicketing(e.target.value)}
                />
              </div>
              <div className="col-md-2 form-group">
                <label>Booking PCC Id</label>
                <input
                  className="form-control form-control-sm"
                  type="text"
                  id="booking_pcc_id"
                  name="booking_pcc_id"
                  value={booking}
                  onChange={(e) => setBooking(e.target.value)}
                  maxLength={50}
                />
              </div>
              <div className="col-md-2 form-group">
                <label>Queue Identifier</label>
                <input
                  className="form-control form-control-sm"
                  type="text"
                  id="queue_id"
                  name="queue_id"
                  value={queue}
                  onChange={(e) => setQueue(e.target.value)}
                  maxLength={50}
                />
              </div>
              <div className="col-md-2 form-group">
                <label>Search Type</label>
                <MultiSelect
                  options={Journey_options}
                  isSearchable
                  isMulti
                  placeholder="- Select Search -"
                  className="custom-select"
                  noOptionsMessage={() => "No Search Found"}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-2 form-group">
                <label>Rule Type</label>
                <MultiSelect
                  options={isDefaultOptions}
                  isSearchable
                  placeholder="- Select Rule -"
                  className="custom-select"
                  noOptionsMessage={() => "No Rule Found"}
                />
              </div>
              <div className="col-md-2 form-group">
                <label>Agents</label>
                <MultiSelect
                  options={addrule_agent_options}
                  isSearchable
                  placeholder="- Select Agent -"
                  className="custom-select"
                  noOptionsMessage={() => "No Agent Found"}
                />
              </div>
              <div className="col-md-2 form-group">
                <label>From Country</label>
                <MultiSelect
                  options={countries}
                  isSearchable
                  isMulti
                  placeholder="- Select Country -"
                  className="custom-select"
                  noOptionsMessage={() => "No Country Found"}
                />
              </div>
              <div className="col-md-2 form-group">
                <label>To Country</label>
                <MultiSelect
                  options={countries}
                  isSearchable
                  isMulti
                  placeholder="- Select Country -"
                  className="custom-select"
                  noOptionsMessage={() => "No Country Found"}
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
                      placeholder="Search Agent"
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
                            className="table table-bordered   table-responsive dataTable no-footer"
                            role="grid"
                          >
                            <thead>
                              <tr>
                                <th>Agent</th>
                                <th>Booking PCC</th>
                                <th>Ticketing PCC</th>
                                <th>Queue Identifier</th>
                                <th>Flight Provider</th>
                                <th>Valid Dates</th>
                                <th>Rule Type</th>
                                <th>Last Updated On</th>
                                <th className="no-sort">ACTIONS</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              {flightQCTRuleData.map((rule, index) => (
                                <tr key={index}>
                                  <td>
                                    {rule.agents
                                      .map((agent) => agent.agentName)
                                      .join(", ")}
                                  </td>
                                  <td>{rule.bookingPCC}</td>
                                  <td>{rule.ticketingPCC}</td>
                                  <td>{rule.queueIdentifier}</td>
                                  <td>{rule.flightProvider.join(", ")}</td>
                                  <td>
                                    {rule.DateFrom} - {rule.DateTo}
                                  </td>
                                  <td>
                                    {rule.ruleType && (
                                      <h5>
                                        <span className="td_label label-success">
                                          {rule.ruleType}
                                        </span>
                                      </h5>
                                    )}
                                  </td>
                                  <td>
                                    {formatTimestamp(rule.timestamps.updatedAt)}
                                  </td>
                                  <td align="center" className="actionlink">
                                    <div className="actionCont width_table">
                                      <div className="input-group-addon">
                                        <Link
                                          to={
                                            Constants.URLConstants
                                              .FLIGHTFLIGHTQCTEDITRULES
                                          }
                                          onClick={() =>
                                            handleViewEditClick(rule)
                                          }
                                          data-toggle="tooltip"
                                          data-original-title="Edit"
                                          data-placement="top"
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
                                              .FLIGHTFLIGHTQCTVIEWRULES
                                          }
                                          onClick={() =>
                                            handleViewEditClick(rule)
                                          }
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
                                      {/* <div
                                        className="input-group-addon"
                                        data-toggle="tooltip"
                                        data-original-title="click to redirect"
                                        data-placement="top"
                                      >
                                        <Link
                                          to={
                                            Constants.URLConstants
                                              .FLIGHTFLIGHTQCTUPDATELOACATION
                                          }
                                          target="_blank"
                                          data-toggle="tooltip"
                                          data-original-title="Flight QCT Direction"
                                        >
                                          <i className="fa fa-external-link" />
                                        </Link>
                                      </div> */}
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
export default connect(null, { setFlightQCTRuleDataRedux })(
  FlightQctSearchRule
);
