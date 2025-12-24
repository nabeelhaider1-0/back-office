/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Constants from "../../constants/routes";
import Header2 from "../header2/header2";
import { useNavigate } from "react-router-dom";
import {
  ErrorApiAlert,
  SuccessApiToast,
} from "../../constants/globalfunctions";
import { putDATA } from "../../Apis/API";
import ApiRoutes from "../../constants/ApiRoutes"

const CustomersAgentReportAcessSetting = ({ data }) => {
  const navigate = useNavigate();

  const [checkedReports, setCheckedReports] = useState({
    Invoices: false,
    Vouchers: false,
    "Agent Receipts": false,
    "Customer Statement": false, // Add any other reports you may have
  });

  // Handle checkbox change
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setCheckedReports((prevChecked) => ({
      ...prevChecked,
      [value]: checked,
    }));
  };

  // Handle save button click
  const handleSave = async () => {
    try {
      // Perform save operation (example using putDATA)
      const selectedReports = Object.keys(checkedReports).filter(
        (report) => checkedReports[report]
      );

      const response = await putDATA(
        ApiRoutes.CUSTOMER_AGENTS.AGENT,
        data.uuid, // Assuming data.uuid is the agent's UUID for identification
        { reportaccesssettings: selectedReports }
      );

      if (response.data.statusCode === 200) {
        SuccessApiToast("Report Access settings saved successfully");
        navigate(Constants.URLConstants.CUSTOMERSAGENTSSEARCHBUTTON);
        // Perform any necessary actions after successful save
      } else {
        ErrorApiAlert("Failed to save Report Access settings");
      }
    } catch (error) {
      ErrorApiAlert("Error saving Report Access settings");
    }
  };

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      // Initialize checked state based on reportaccesssettings
      const defaultChecked = {};
      data.reportaccesssettings.forEach((report) => {
        if (checkedReports.hasOwnProperty(report)) {
          defaultChecked[report] = true;
        }
      });
      setCheckedReports((prevChecked) => ({
        ...prevChecked,
        ...defaultChecked,
      }));
    } else {
      // If data is not available, navigate to the branch search page
      navigate(Constants.URLConstants.CUSTOMERSAGENTSSEARCHBUTTON);
    }
  }, [data, navigate]);

  return (
    <div className="container-fluid pt-0 p-4" id="content-pad">
      <Header2
        title="ASSIGN REPORT ACCESS"
        linkText1="List Agents"
        linkText2="Report Access"
        link1={Constants.URLConstants.CUSTOMERSAGENTSSEARCHBUTTON}
      />

      {/* Agent Info Row */}
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
              {data.agentName && data.agentName !== null ? data.agentName : ""}
            </h5>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <form>
        <div className="panel-body">
          <div className="row">
            {/* Checkboxes */}
            {Object.keys(checkedReports).map((report, index) => (
              <div className="form-group col-md-2" key={index}>
                <div className="checkbox checkbox-success checkbox-inline">
                  <input
                    type="checkbox"
                    name="report[]"
                    id={`check_${report
                      .replace(/\s+/g, "_")
                      .toLowerCase()}_report`}
                    className="case"
                    value={report}
                    checked={checkedReports[report]}
                    onChange={handleCheckboxChange}
                  />
                  <label
                    htmlFor={`check_${report
                      .replace(/\s+/g, "_")
                      .toLowerCase()}_report`}
                  >
                    {report}
                  </label>
                </div>
              </div>
            ))}
          </div>
          {/* Save Button */}
          <div className="form-group col-md-12 mt-2">
            <button
              className="btn btn-dark btn-sm"
              type="button"
              name="Save"
              value="Save"
              onClick={handleSave}
            >
              <i className="fa fa-floppy-o" aria-hidden="true" />
              &nbsp;&nbsp;Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps)(CustomersAgentReportAcessSetting);
