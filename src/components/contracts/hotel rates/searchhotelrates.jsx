import Flatpickr from "react-flatpickr";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header2 from "../../header2/header2";
import MultiSelect from "../../reactMultiSelect";
import {
  citiesByCountry,
  countries,
} from "../../../constants/Country-City-Data";
import Constants from "../../../constants/routes";
import {
  addrule_currencyOptions,
  hotel_rating_options,
  meal_options,
  offlineHotelSuppliersOptions,
  supplierProfileOptions,
} from "../../../constants/contants";

const ContractsHotelsRatesSearch = () => {
  const [startDate, setStartDate] = useState(null); // State for the start date
  const [endDate, setEndDate] = useState(null); // State for the end date

  const handleTrashClick = () => {
    // Function to clear both start and end dates
    setStartDate(null);
    setEndDate(null);
  };

  const [branchData, setBranchData] = useState({
    branchCountry: "",
    branchCity: "",
  });

  const handleCountryChange = (selectedCountry) => {
    setBranchData((prevData) => ({
      ...prevData,
      branchCountry: selectedCountry.value,
      branchCity: "", // Reset city when country changes
    }));
  };

  const handleCityChange = (selectedCity) => {
    setBranchData((prevData) => ({
      ...prevData,
      branchCity: selectedCity.value,
    }));
  };

  return (
    <>
      <Header2 title="SEARCH LOCAL HOTEL" linkText1="List Hotels" />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <div>
          <form>
            <div className="row">
              <div className="col-md-3 form-group">
                <label>Hotel Name</label>
                <input
                  type="text"
                  className="form-control form-control-sm test123"
                  name="Search_hotel_name"
                />
              </div>
              <div className="col-md-3 form-group">
                <label>Supplier</label>
                <MultiSelect
                  options={offlineHotelSuppliersOptions}
                  isSearchable
                  placeholder="- Select Supplier -"
                  className="custom-select"
                  noOptionsMessage={() => "No Supplier Found"}
                />
              </div>
              <div className="col-md-3 form-group">
                <label>Hotel Rating</label>
                <MultiSelect
                  options={hotel_rating_options}
                  isSearchable
                  placeholder="- Select Hotel Rating -"
                  className="custom-select"
                  noOptionsMessage={() => "No Hotel Rating Found"}
                />
              </div>
              <div className="col-md-3 form-group">
                <label>Contract Date</label>
                <div
                  className="input-group date input-daterange"
                  id="contract_date"
                >
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
                    id="tTrashBtn"
                    onClick={handleTrashClick}
                  >
                    <i className="fa fa-trash" />
                  </span>
                </div>
              </div>
              <div className="col-md-3 form-group mt-3">
                <label>Room Rates</label>
                <br />
                <div className="radioline1 mt-1">
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      name="rrAdd"
                      id="rrAddAll"
                      defaultValue="all"
                      defaultChecked="checked"
                    />
                    <label htmlFor="rrAddAll">All</label>
                  </div>
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      name="rrAdd"
                      defaultValue="yes"
                      id="app"
                    />
                    <label htmlFor="rrAddYes">Yes</label>
                  </div>
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      name="rrAdd"
                      defaultValue="no"
                      id="app"
                    />
                    <label htmlFor="rrAddNo">No</label>
                  </div>
                </div>
              </div>
              <div className="col-md-3 form-group mt-3">
                <label>Allotment</label>
                <br />
                <div className="radioline1 mt-1">
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      name="rrAllotmentAdd"
                      id="rrAllotmentAdd"
                      defaultValue="all"
                      defaultChecked="checked"
                    />
                    <label htmlFor="rrAllotmentAdd">All</label>
                  </div>
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      name="rrAllotmentAdd"
                      defaultValue="yes"
                      id="app"
                    />
                    <label htmlFor="rrAllotmentYes">Yes</label>
                  </div>
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      name="rrAllotmentAdd"
                      defaultValue="no"
                      id="app"
                    />
                    <label htmlFor="rrAllotmentNo">No</label>
                  </div>
                </div>
              </div>
              <div className="col-md-3 form-group mt-3">
                <label>Package</label>
                <br />
                <div className="radioline1 mt-1">
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      name="is_package"
                      defaultValue="all"
                      defaultChecked="checked"
                      id="no1"
                    />
                    <label htmlFor="no1">All</label>
                  </div>
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      name="is_package"
                      defaultValue="yes"
                      id="app"
                    />
                    <label htmlFor="yes1">Yes</label>
                  </div>
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      name="is_package"
                      defaultValue="no"
                      id="app"
                    />
                    <label htmlFor="no1">No</label>
                  </div>
                </div>
              </div>
              <div className="col-md-3 form-group mt-3">
                <label>Country</label>
                <MultiSelect
                  options={countries}
                  isSearchable
                  placeholder="- Select Country -"
                  className="custom-select"
                  noOptionsMessage={() => "No Country Found"}
                  onChange={handleCountryChange}
                />
              </div>
              <div className="col-md-3 form-group mt-3">
                <label>City</label>
                <MultiSelect
                  options={citiesByCountry[branchData.branchCountry] || []}
                  isSearchable
                  placeholder="- Select City -"
                  className="custom-select"
                  onChange={handleCityChange}
                  noOptionsMessage={() => "No City Found"}
                />
              </div>
              <div className="col-md-3 form-group mt-3">
                <label>Currency</label>
                <MultiSelect
                  options={addrule_currencyOptions}
                  isSearchable
                  placeholder="- Select Currency -"
                  className="custom-select"
                  noOptionsMessage={() => "No Currency Found"}
                />
              </div>
              <div className="col-md-3 form-group mt-3">
                <label>Room Meal Basis</label>
                <MultiSelect
                  options={meal_options}
                  isSearchable
                  placeholder="- Select Room Meal -"
                  className="custom-select"
                  noOptionsMessage={() => "No Room Meal Found"}
                />
              </div>
              <div className="col-md-3 form-group mt-3">
                <label>Rate Profile</label>
                <MultiSelect
                  options={supplierProfileOptions}
                  isSearchable
                  placeholder="- Select Rate -"
                  className="custom-select"
                  noOptionsMessage={() => "No Rate Found"}
                />
              </div>
            </div>
            {/* 2nd Row */}
            <div className="row mt-4">
              <div className="col-md-12 form-group">
                <Link
                  to={Constants.URLConstants.CONTRACTSHOTELSRATESSEARCHBUTTON}
                >
                  <button
                    className="btn btn-dark btn-sm"
                    type="button"
                    onclick="javascriptcallSearch(document.forms['search_hotel_from']);"
                  >
                    <i className="fa fa-search" />
                    &nbsp;Search
                  </button>
                </Link>
                <button
                  className="btn btn-outline-secondary btn-sm mx-1"
                  type="button"
                  onclick="downloadReport();"
                >
                  <i className="fa fa-download" />
                  &nbsp; Hotel Rate Report
                </button>
              </div>
            </div>
          </form>
          <br />
          <form style={{ paddingTop: "10px", paddingBottom: "1px" }}>
            <div className="panel-body">
              <div
                className="alert alert-danger text-center form-group"
                style={{
                  background: "#f2dede",
                  paddingTop: "13px",
                  paddingBottom: "13px",
                }}
              >
                <h6 style={{ color: "var(--color-white) !important" }}>
                  No Such Hotels.
                </h6>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default ContractsHotelsRatesSearch;
