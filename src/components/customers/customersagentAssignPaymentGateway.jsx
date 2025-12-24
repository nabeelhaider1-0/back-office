/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Constants from "../../constants/routes";
import Header2 from "../header2/header2";
import { getDATA, putDATA } from "../../Apis/API"; // Import postDATA for making API calls

import loadingGif from "../../assets/images/loadingblue.gif";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  ErrorApiAlert,
  SuccessApiToast,
} from "../../constants/globalfunctions";
import ApiRoutes from "../../constants/ApiRoutes";

const CustomersAgentAssignPayementGateway = ({ data }) => {
  const [paymentgateWayData, setpaymentgateWayData] = useState([]);
  const [originalpaymentgateWayData, setOriginalpaymentgateWayDataa] = useState(
    []
  );
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [checkedGateways, setCheckedGateways] = useState({});
  const [markupValues, setMarkupValues] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
    } else {
      // If data is not available, navigate to the branch search page
      navigate(Constants.URLConstants.CUSTOMERSAGENTSSEARCHBUTTON);
    }
  }, [data, navigate]);

  const handleInputSearchChange = (event) => {
    const { value } = event.target;
    setSearchInput(value);

    // Perform filtering as the user types
    const filtereData = originalpaymentgateWayData.filter((pmt) =>
      pmt.paymentGatewayName.toLowerCase().includes(value.toLowerCase())
    );

    setpaymentgateWayData(filtereData);
  };

  const getpaymentGateways = async () => {
    try {
      setLoading(true);
      // Set loading to true when fetching data
      const response = await getDATA(ApiRoutes.PAYMENT_GATEWAYS.GATEWAY);
      if (response.data.statusCode === 200) {
        const gateways =
          response && response.data.data ? response.data.data : [];

        setpaymentgateWayData(gateways);
        setOriginalpaymentgateWayDataa(gateways);
        // Mark checkboxes based on agentPaymentGateways data
        const initialCheckedGateways = {};
        const initialMarkupValues = {};
        gateways.forEach((gateway) => {
          const matchedAgentGateway = data.agentPaymentGateways.find(
            (agentGateway) => agentGateway.paymentGateway.uuid === gateway.uuid
          );
          if (matchedAgentGateway) {
            initialCheckedGateways[gateway.uuid] = true;
            initialMarkupValues[gateway.uuid] =
              matchedAgentGateway.assignedPaymentMarkup || "";
          } else {
            initialCheckedGateways[gateway.uuid] = false;
            initialMarkupValues[gateway.uuid] = "";
          }
        });
        setCheckedGateways(initialCheckedGateways);
        setMarkupValues(initialMarkupValues);
      }

      // Handle successful authentication, e.g., set user state, redirect, etc.
    } catch (error) {
      ErrorApiAlert("Error Fetching Payment Gateways");
    } finally {
      setLoading(false);
      // Set loading to false after data is fetched (whether successful or not)
    }
  };

  useEffect(() => {
    getpaymentGateways();
  }, []);

  const handleCheckboxChange = (uuid) => {
    setCheckedGateways((prevState) => ({
      ...prevState,
      [uuid]: !prevState[uuid],
    }));
  };

  const handleMarkupChange = (uuid, value) => {
    setMarkupValues((prevState) => ({
      ...prevState,
      [uuid]: value,
    }));
  };

  const handleSave = async () => {
    const selectedGateways = Object.keys(checkedGateways)
      .filter((uuid) => checkedGateways[uuid])
      .map((uuid) => ({
        uuid,
        assignedPaymentMarkup: markupValues[uuid],
      }));

    try {
      const response = await putDATA(
        ApiRoutes.CUSTOMER_AGENTS.AGENT_PAYMENT_GATEWAYS,
        data.uuid,
        { paymentGateways: selectedGateways }
      );

      if (response.data.statusCode === 200) {
        SuccessApiToast("Payment Gateways updated successfully");
        // If data is not available, navigate to the branch search page
        navigate(Constants.URLConstants.CUSTOMERSAGENTSSEARCHBUTTON);
      } else {
        ErrorApiAlert("Error updating Payment Gateways");
      }
    } catch (error) {
      ErrorApiAlert("Error updating Payment Gateways");
    }
  };

  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <Header2
          title="ASSIGN PAYMENT GATEWAY"
          linkText1=" Search Agent"
          linkText2="Assign Payment Gateway"
          link1={Constants.URLConstants.CUSTOMERSAGENTSSEARCHBUTTON}
        />

        {/* First Row*/}
        <div
          className="panel-body"
          style={{
            backgroundColor: "#FF5015",
            paddingBottom: "1px",
            paddingTop: "4px",
          }}
        >
          <div className="row">
            <div className="col-md-12">
              <h5
                style={{ color: "white", fontSize: "15px", marginLeft: "20px" }}
              >
                Agent :{" "}
                {data.agentName && data.agentName !== null
                  ? data.agentName
                  : ""}
              </h5>
            </div>
          </div>
        </div>
        {loading && (
          <div className="text-center">
            <img src={loadingGif} alt="Loading..." height={250} />
          </div>
        )}
        {!loading && (
          <>
            <form>
              <div className="panel-body removeMargins">
                <div className="dataTables_scroll form-group">
                  <div
                    id="search_transfer_wrapper"
                    className="dataTables_wrapper form-inline dt-bootstrap no-footer"
                  >
                    <div className="row mt-2">
                      <div className="col-sm-10"></div>
                      <div className="col-sm-2">
                        <div
                          id="search_creadit_note_filter"
                          className="dataTables_filter"
                        >
                          <label>
                            <h5 style={{ display: "inline" }}>
                              <i
                                className="fa fa-search srchWithinPg"
                                id="magnifier"
                                data-toggle="tooltip"
                                data-placement="top"
                                data-original-title="Search within this table"
                                aria-hidden="true"
                              />
                            </h5>
                            <input
                              type="text"
                              className="tablesearch form-control form-control-sm search_new"
                              placeholder="Name"
                              value={searchInput}
                              onChange={handleInputSearchChange}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12">
                        <div id="wrapper2" style={{ overflow: "auto" }}>
                          <table
                            id="tableres"
                            className="table table-bordered   table-responsive dataTable no-footer"
                            role="grid"
                            aria-describedby="tableres_info"
                          >
                            <thead>
                              <tr role="row">
                                <th
                                  style={{ width: "213.2px" }}
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                >
                                  Select
                                </th>
                                <th
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "800px" }}
                                >
                                  Payment Gateway Name
                                </th>
                                <th
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "600px" }}
                                >
                                  Agent Payment Gateway Markup (%)
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              {paymentgateWayData.map((gateway, index) => (
                                <tr
                                  key={index}
                                  className={
                                    "phps_row_" +
                                    (index % 2 === 0 ? "0 even" : "1 odd")
                                  }
                                  role="row"
                                >
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        name="chk[]"
                                        value={gateway.uuid}
                                        checked={
                                          !!checkedGateways[gateway.uuid]
                                        }
                                        onChange={() =>
                                          handleCheckboxChange(gateway.uuid)
                                        }
                                      />
                                      <label htmlFor={gateway.uuid} />
                                    </div>
                                  </td>
                                  <td>{gateway.paymentGatewayName}</td>
                                  <td>
                                    <div className="col-sm-10 text-center">
                                      <input
                                        type="number"
                                        name={`paymentgateway[paymentgatewaymarkuppercent][${index}]`}
                                        className="form-control col-md-16"
                                        id={`paymentgateway${index}`}
                                        placeholder=""
                                        maxLength={10}
                                        style={{ marginLeft: "25px" }}
                                        value={markupValues[gateway.uuid] || ""}
                                        onChange={(e) =>
                                          handleMarkupChange(
                                            gateway.uuid,
                                            e.target.value
                                          )
                                        }
                                      />
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-group mt-3">
                  <button
                    className="btn btn-dark btn-sm"
                    type="button"
                    onClick={handleSave}
                  >
                    <i className="fa fa-floppy-o" aria-hidden="true" />
                    &nbsp;Save
                  </button>
                </div>
                <input
                  type="hidden"
                  name="available_suppliers"
                  defaultValue={865}
                />
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps)(CustomersAgentAssignPayementGateway);
