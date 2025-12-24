import Header2 from "../header2/header2";
import React, { useState } from "react"; // Import React and useState
import Flatpickr from "react-flatpickr";

import {
  accounts_serviceOptions,
  add_options,
  consumedLocationOptions,
  inputTaxOptions,
  outputTaxOptions,
} from "../../constants/contants";
import MultiSelect from "../reactMultiSelect";
import { countries } from "../../constants/Country-City-Data";
import Constants from "../../constants/routes";

const AccountsTaxSetupTaxConfigurationNew = () => {
  const [startDate, setStartDate] = useState(null); // State for the start date
  const [endDate, setEndDate] = useState(null);
  const handleTrashClick = () => {
    // Function to clear both start and end dates
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <Header2
          title="ADD TAX CONFIGURATION"
          linkText1="Search Tax Configuration"
          linkText2="Add Tax Configuration"
          link1={Constants.URLConstants.ACCOUNTSTAXSETUPTAXCONFUGRATIONSEARCH}
        />

        <form>
          {/* First Row*/}
          <div className="row">
            <div className="col-md-3">
              <div className="form-group">
                <label>Country :</label>
                <MultiSelect
                  options={countries}
                  isSearchable
                  placeholder="- Select Country-"
                  noOptionsMessage={() => "No Country Found"}
                  className="custom-select"
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label>Branch :</label>
                <MultiSelect
                  options={add_options}
                  isMulti
                  isSearchable
                  placeholder="- Select Branch -"
                  noOptionsMessage={() => "No Branch Found"}
                  className="custom-select"
                />
              </div>
            </div>
          </div>
          {/* 2nd Row */}
          <div className="row mt-3">
            <div className="col-md-3 form-group">
              <label>Date :</label>
              <div className="input-group date input-daterange" id="date">
                <style
                  dangerouslySetInnerHTML={{
                    __html: "\n#flow{\npadding-right: 77px !important;\n}\n",
                  }}
                />
                <span className="input-group-addon" id="flow">
                  Valid&nbsp;From
                </span>
                <Flatpickr
                  value={startDate}
                  onChange={(date) => setStartDate(date)}
                  options={{ dateFormat: "Y-m-d" }}
                  style={{ width: "100px" }}
                />
                <span className="input-group-addon">to</span>
                <Flatpickr
                  value={endDate}
                  onChange={(date) => setEndDate(date)}
                  options={{ dateFormat: "Y-m-d" }}
                  style={{ width: "100px" }}
                />
                <span className="input-group-addon" onClick={handleTrashClick}>
                  <i className="fa fa-trash" />
                </span>
              </div>
            </div>
            <div className="form-group col-md-3">
              <label>Supplier Status :</label>
              <div className="radioline1">
                <div className="radio radio-success radio-inline">
                  {" "}
                  <input
                    type="radio"
                    id="supplier_register_yes"
                    name="supplier_registered"
                    defaultValue={1}
                    defaultChecked
                  />
                  <label htmlFor="supplier_register_yes">Registered</label>
                </div>
                <div className="radio radio-success radio-inline">
                  {" "}
                  <input
                    type="radio"
                    id="supplier_register_no"
                    name="supplier_registered"
                    defaultValue={0}
                  />
                  <label htmlFor="supplier_register_no">
                    Local Unregistered
                  </label>
                </div>
                <br />
                <div className="radio radio-success radio-inline">
                  <input
                    type="radio"
                    id="supplier_register_overseas"
                    name="supplier_registered"
                    defaultValue={2}
                  />
                  <label htmlFor="supplier_register_overseas">
                    International
                  </label>
                </div>
              </div>
            </div>
          </div>
          {/* Row */}
          <div className="row">
            <input type="hidden" name="supplier_country" defaultValue={0} />{" "}
            {/* Temp */}
            <input
              type="hidden"
              name="supplier_type"
              defaultValue="external"
            />{" "}
            {/* Temp */}
          </div>
          {/* 3rd Row */}
          <div className="row mt-3">
            <div className="form-group col-md-3">
              <label>Services :</label>
              <MultiSelect
                options={accounts_serviceOptions}
                isSearchable
                placeholder="- Select Services-"
                noOptionsMessage={() => "No Services Found"}
                className="custom-select"
              />
            </div>
          </div>
          {/* 4th Row */}
          <div className="row mt-3">
            <input type="hidden" name="exempted" defaultValue={0} />{" "}
            {/* Temp */}
            <div className="form-group col-md-3">
              <label>Service Consumed :</label>
              <div className="radioline1 mt-2">
                <div className="radio radio-success radio-inline">
                  <input
                    type="radio"
                    id="consumed_in"
                    name="consumed"
                    defaultValue="IB"
                    defaultChecked
                  />
                  <label htmlFor="consumed_in">Inbound</label>
                </div>
                <div className="radio radio-success radio-inline">
                  <input
                    type="radio"
                    id="consumed_out"
                    name="consumed"
                    defaultValue="OB"
                  />
                  <label htmlFor="consumed_out">Outbound</label>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group location">
                <label htmlFor="city">Location :</label>
                <input type="hidden" id="stored_consumed_location" data-json />
                <MultiSelect
                  options={consumedLocationOptions}
                  isSearchable
                  isMulti
                  placeholder="- Select Location-"
                  noOptionsMessage={() => "No Location Found"}
                  className="custom-select"
                />
              </div>
            </div>
          </div>
          {/* Row */}
          <div className="row">
            <input type="hidden" name="system" defaultValue="b2b" />{" "}
            {/* Temp */}
            <input type="hidden" name="type" defaultValue="IN" /> {/* Temp */}
          </div>
          {/* 5th Row */}
          <div className="row mt-3">
            <div className="form-group col-md-3">
              <label htmlFor="input_tax_id">Input Tax Code :</label>
              <MultiSelect
                options={inputTaxOptions}
                isSearchable
                placeholder="- Select Input-"
                noOptionsMessage={() => "No Input Found"}
                className="custom-select"
              />
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="input_tax_amt">Input Tax Percentage :</label>
              <input
                className="form-control form-control-sm"
                id="input_tax_amt"
                type="textbox"
                name="input_tax_amt"
                readOnly
              />
            </div>
          </div>
          {/* 6th Row */}
          <div className="row mt-3">
            <div className="form-group col-md-3">
              <label htmlFor="output_tax_id">Output Tax Code :</label>
              <MultiSelect
                options={outputTaxOptions}
                isSearchable
                placeholder="- Select Output-"
                noOptionsMessage={() => "No Output Found"}
                className="custom-select"
              />
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="output_tax_amt">Output Tax Percentage :</label>
              <input
                className="form-control form-control-sm"
                id="output_tax_amt"
                type="textbox"
                name="output_tax_amt"
                readOnly
              />
            </div>
          </div>
          {/* 7th Row */}
          <div className="row mt-3 mb-4">
            <div className="form-group col-md-12">
              <input
                type="hidden"
                name="action"
                defaultValue="tax_config_add_controller"
              />
              <button
                type="submit"
                className="btn btn-dark btn-sm"
                value="Submit"
                id="submit_button"
              >
                <i className="fa fa-floppy-o" />
                &nbsp;Save
              </button>
              &nbsp;&nbsp;
              <button
                type="reset"
                className="btn btn-outline-secondary btn-sm"
                value="Reset"
              >
                <i className="fa fa-repeat" />
                &nbsp;Reset
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default AccountsTaxSetupTaxConfigurationNew;
