import React, { useState } from "react"; // Import React and useState
import Flatpickr from "react-flatpickr";
import Header2 from "../../header2/header2";
import MultiSelect from "../../reactMultiSelect";
import { countries } from "../../../constants/Country-City-Data";
import Constants from "../../../constants/routes";

const branchOptions = [
  { label: "--Select--", value: "" },
  { label: "Mumbai Branch", value: 1 },
  { label: "UAE Branch", value: 2 },
  { label: "UK Head Office", value: 3 },
  { label: "Head Office", value: 4 },
  { label: "Dubai GSA", value: 5 },
  { label: "London Branch", value: 6 },
  { label: "Saudi Branch", value: 7 },
  { label: "Dubai V3 Wh", value: 8 },
  { label: "Pune Branch", value: 9 },
  { label: "India - GSA", value: 10 },
  { label: "Test Branch1", value: 11 },
  { label: "test", value: 12 },
  { label: "Test Branch", value: 13 },
  { label: "Testffff", value: 14 },
  { label: "FRANCHISE BRANCH", value: 15 },
  { label: "Jcholidays", value: 16 },
  { label: "Demo", value: 17 },
  { label: "malaysia", value: 19 },
  { label: "GSA Iraq", value: 20 },
  { label: "Chennai", value: 21 },
  { label: "Bangkok Branch", value: 22 },
  { label: "suhas_branch", value: 23 },
  { label: "Istanbul", value: 24 },
  { label: "hyderabad", value: 25 },
  { label: "hyderabad_suhas", value: 26 },
  { label: "branch_suhas", value: 27 },
  { label: "New Joint Branch", value: 28 },
  { label: "Bahrain Branch", value: 29 },
  { label: "Branch Bahrain", value: 30 },
  { label: "testdddd", value: 31 },
  { label: "Demo", value: 32 },
  { label: "HotelConfirm", value: 33 },
  { label: "HotelConfirm_Live", value: 34 },
  { label: "Demo_Test_Branch", value: 35 },
  { label: "Demo Branch", value: 36 },
  { label: "GSA Branch", value: 37 },
  { label: "Testpp", value: 38 },
  { label: "GTest", value: 39 },
  { label: "WA_Malaysia", value: 40 },
  { label: "Bolton Branch", value: 41 },
  { label: "World Avenue", value: 42 },
  { label: "TEST_BRANCH_A", value: 43 },
  { label: "TEST_BRANCH_JV_A", value: 44 },
  { label: "TEST_BRANCH_JV_C", value: 45 },
  { label: "world_avenue_malesia", value: 46 },
  { label: "World Avenues Malaysia", value: 47 },
  { label: "test_branch_jv", value: 48 },
  { label: "1 Booking", value: 49 },
];

const serviceOptions = [
  { label: "Hotel", value: 1 },
  { label: "Transfer", value: 3 },
  { label: "Misc", value: 4 },
  { label: "Airline", value: 5 },
  { label: "Packages", value: 6 },
  { label: "Groups", value: 7 },
  { label: "Visa", value: 8 },
  { label: "Offline", value: 9 },
  { label: "Other", value: 10 },
  { label: "Tickets", value: 11 },
  { label: "Activities", value: 17 },
  { label: "Transportation", value: 18 },
  { label: "Tour", value: 19 },
  { label: "Food", value: 20 },
  { label: "Flight Ticket", value: 22 },
  { label: "Golf", value: 23 },
  { label: "Insurance Premium Tax", value: 24 },
];

const consumedLocationOptions = [
  // Add your location options here as objects
  // For example:
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  // ...
];

const outputTaxOptions = [
  { value: 0, label: "Select Output Tax" },
  { value: 2, label: "CGST" },
  { value: 9, label: "IntDesCustomer" },
  { value: 12, label: "Ron Out-Tax" },
];

const inputTaxOptions = [
  { value: 0, label: "Select Input Tax" },
  { value: 1, label: "Sam test" },
  { value: 5, label: "Tax-Minal (Inbound)" },
  { value: 6, label: "SGST" },
  { value: 7, label: "SPGST" },
  { value: 8, label: "IntSupGST" },
  { value: 10, label: "Test Tax" },
  { value: 11, label: "Service Tax" },
  { value: 13, label: "Ron In-Tax" },
];

const MastersTaxConfigurationEdit = () => {
  const [startDate, setStartDate] = useState(null); // State for the start date
  const [endDate, setEndDate] = useState(null); // State for the end date

  const handleTrashClick = () => {
    // Function to clear both start and end dates
    setStartDate(null);
    setEndDate(null);
  };
  return (
    <>
      <Header2
        title="EDIT TAX CONFIGURATION"
        linkText1="Search Tax Configuration "
        linkText2="Edit Tax Configuration "
        link1={Constants.URLConstants.MASTERSTAXCONFIGURATIONSEARCH}
      />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <form>
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
                  options={branchOptions}
                  isMulti
                  isSearchable
                  placeholder="- Select Branch -"
                  noOptionsMessage={() => "No Branch Found"}
                  className="custom-select"
                />
              </div>
            </div>
          </div>
          <style
            dangerouslySetInnerHTML={{
              __html: "\n#validfrom{\npadding-right:85px !important\n}\n",
            }}
          />
          {/* 2nd Row */}
          <div className="row mt-3">
            <div className="col-md-4 form-group">
              <label>Date :</label>
              <div className="input-group date input-daterange" id="date">
                <span className="input-group-addon" id="validfrom">
                  Valid&nbsp;From
                </span>
                <Flatpickr
                  value={startDate}
                  onChange={(date) => setStartDate(date)}
                  options={{ dateFormat: "Y-m-d" }}
                />

                <span class="input-group-addon">to</span>
                <Flatpickr
                  value={endDate}
                  onChange={(date) => setEndDate(date)}
                  options={{ dateFormat: "Y-m-d" }}
                />
                <span
                  className="input-group-addon"
                  id="tcTrashBtn"
                  onClick={handleTrashClick}
                >
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
                options={serviceOptions}
                isSearchable
                placeholder="- Select Services-"
                noOptionsMessage={() => "No Services Found"}
                className="custom-select"
              />
            </div>
          </div>
          {/* 4th Row */}
          <div className="row mt-3">
            {/* <div class="form-group col-md-3">
     <label>Exempted:</label>
     <div class="">
         <div class="radio radio-success radio-inline">
             <input type="radio" id="exempted_yes" name="exempted" value="1"  checked  >
             <label for="exempted_yes">Yes</label>
         </div>
         <div class="radio radio-success radio-inline">
             <input type="radio" id="exempted_no" name="exempted" value="0"   >
             <label for="exempted_no">No</label>
         </div>
     </div>
 </div> */}
            <input type="hidden" name="exempted" defaultValue={0} />{" "}
            {/* Temp */}
            <div className="form-group col-md-3">
              <label>Service Consumed :</label>
              <div className="radioline1">
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
                defaultValue
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
                defaultValue
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
export default MastersTaxConfigurationEdit;
