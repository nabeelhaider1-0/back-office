import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { days_options } from "../../constants/contants";
import Header2 from "../header2/header2";
import MultiSelect from "../reactMultiSelect";
import { connect } from "react-redux";
import Constants from "../../constants/routes";
import { putDATA } from "../../Apis/API";
import {
  ErrorApiAlert,
  SuccessApiToast,
} from "../../constants/globalfunctions";
import ApiRoutes from "../../constants/ApiRoutes"

const CustomersAgentInvoicingRules = ({ data }) => {
  const navigateOnRefresh = useNavigate();
  const [selectedOption, setSelectedOption] = useState("Voucher Date");
  const [selectedDays, setSelectedDays] = useState([]);

  useEffect(() => {
    if (!data || Object.keys(data).length === 0) {
      navigateOnRefresh(Constants.URLConstants.CUSTOMERSAGENTSSEARCHBUTTON);
    } else if (data.invoicingRules) {
      const { invoiceOn, beforeServiceDateDays } = data.invoicingRules;
      setSelectedOption(invoiceOn || "Voucher Date");
      if (invoiceOn === "Before Service Date" && beforeServiceDateDays) {
        setSelectedDays(
          days_options.find((day) => day.value === beforeServiceDateDays)
        );
      }
    }
  }, [data, navigateOnRefresh]);

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleMultiSelectChange = (selected) => {
    setSelectedDays(selected);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const requestBody = {
      invoiceOn: selectedOption,
    };
    if (selectedOption === "Before Service Date") {
      requestBody.beforeServiceDateDays = selectedDays.value;
    }

    try {
      const response = await putDATA(ApiRoutes.CUSTOMER_AGENTS.AGENT, data.uuid, {
        invoicingRules: requestBody,
      });
      if (response.data.statusCode === 200) {
        SuccessApiToast("Invoicing Rules Updated Successfully");
        navigateOnRefresh(Constants.URLConstants.CUSTOMERSAGENTSSEARCHBUTTON);
      }
    } catch (error) {
      ErrorApiAlert("Error Updating Invoicing Rules");
    }
  };

  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <Header2 title="INVOICING RULES" />

        {/* First Row */}
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
                {data.agencyName && data.agentName && data.status !== undefined
                  ? `${data.agencyName} / ${data.agentName} / ${
                      data.status ? "Active" : "In Active"
                    }`
                  : ""}
              </h5>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="panel-body">
            <div className="row">
              <div className="form-group col-md-12">
                <label>Invoice on</label>
                <div className="radioline1">
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      value="Deadline date"
                      name="credit_id"
                      onChange={handleRadioChange}
                      id="check_expiration_date"
                      checked={selectedOption === "Deadline date"}
                    />
                    <label htmlFor="check_expiration_date">Deadline date</label>
                  </div>
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      value="Voucher Date"
                      name="credit_id"
                      onChange={handleRadioChange}
                      id="check_on_voucher_date"
                      checked={selectedOption === "Voucher Date"}
                    />
                    <label htmlFor="check_on_voucher_date">Voucher Date</label>
                  </div>
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      value="Service Date"
                      name="credit_id"
                      onChange={handleRadioChange}
                      id="check_service_date"
                      checked={selectedOption === "Service Date"}
                    />
                    <label htmlFor="check_service_date">Service Date</label>
                  </div>
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      value="Before Service Date"
                      name="credit_id"
                      onChange={handleRadioChange}
                      id="check_before_check_in"
                      checked={selectedOption === "Before Service Date"}
                    />
                    <label htmlFor="check_before_check_in">
                      Before Service Date
                    </label>
                  </div>
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      value="Check Out Date"
                      name="credit_id"
                      onChange={handleRadioChange}
                      id="check_check_out_date"
                      checked={selectedOption === "Check Out Date"}
                    />
                    <label htmlFor="check_check_out_date">Check Out Date</label>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="row mt-2 ml-2"
              id="show_days"
              style={{
                display:
                  selectedOption === "Before Service Date" ? "block" : "none",
              }}
            >
              <div className="form-group col-md-2">
                <label>&nbsp;&nbsp;Day(s) before Service Date</label>
                <MultiSelect
                  options={days_options}
                  isSearchable
                  placeholder="- Select Day -"
                  noOptionsMessage={() => "No Days Found"}
                  className="custom-select"
                  value={selectedDays}
                  onChange={handleMultiSelectChange}
                  required={
                    selectedOption === "Before Service Date" ? true : false
                  }
                />
              </div>
            </div>
            <br />
            <div className="form-group col-md-12">
              <button className="btn btn-dark btn-sm save" type="submit">
                <i className="fa fa-floppy-o" aria-hidden="true" />
                &nbsp;&nbsp;Save
              </button>
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

export default connect(mapStateToProps)(CustomersAgentInvoicingRules);
