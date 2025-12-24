import React, { useState } from "react";

import { Link } from "react-router-dom";
import Header2 from "../../header2/header2";
import Constants from "../../../constants/routes";
import MultiSelect from "../../reactMultiSelect";
import {
  citiesByCountry,
  countries,
} from "../../../constants/Country-City-Data";

const MastersPackagesEdit = () => {
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

  const [activeTab, setActiveTab] = useState("subtab1");

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const tabData = [
    { id: "subtab1", label: "Essential Information" },
    { id: "subtab2", label: "Details" },
    { id: "subtab3", label: "Itinerary" },
    { id: "subtab4", label: "Dates & Prices" },
    { id: "subtab5", label: "Cancellation Policy" },
    { id: "subtab6", label: "Terms & Policies" },
    { id: "subtab7", label: "Inclusion & Exclusions" },
  ];
  return (
    <>
      <Header2
        title="EDIT PACKAGE"
        linkText1="Search Packages"
        link1={Constants.URLConstants.MASTERSPACKAGESSEARCH}
      />
      <style
        dangerouslySetInnerHTML={{
          __html: "\n.nav-item{\n    cursor: pointer !important;\n}\n",
        }}
      />

      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n        h4 {\n            font-size: 13px;\n            white-space: nowrap;\n            overflow: hidden;\n            text-overflow: ellipsis;\n        }\n\n        h4 {\n\n            font-weight: 700;\n            text-transform: capitalize;\n        }\n\n        h4,\n        .h4,\n        h5,\n        .h5,\n        h6,\n        .h6 {\n            margin-top: 10px;\n            margin-bottom: 10px;\n        }\n        .panel-group .panel-heading {\n    padding: 13px 15px;\n    background: #edf0f5;\n}\n.panel-default {\n    border-color: #ddd;\n}\n.panel-group .panel {\n    margin-bottom: 0;\n    border-radius: 4px;\n}\n\n.form-control, .form-control:focus, .has-error .form-control:focus, .has-success .form-control:focus, .has-warning .form-control:focus, .navbar-collapse, .navbar-form, .navbar-form-custom .form-control:focus, .navbar-form-custom .form-control:hover, .open .btn.dropdown-toggle, .panel, .popover, .progress, .progress-bar {\n    box-shadow: none;\n}\n.panel {\n\n    background-color: #fff;\n    border: 1px solid grey;\n}\n.navlink{\ncursor:pointer;\n}\n    ",
        }}
      />

      <div class="container-fluid pt-0 p-4" id="content-pad">
        <div
          className="tab-pane fade show active"
          id="products"
          role="tabpanel"
          aria-labelledby="products-tab"
        >
          <ul className="nav nav-tabs" id="productsSubTabs" role="tablist">
            {tabData.map((tab) => (
              <li className="nav-item" key={tab.id}>
                <Link
                  className={`nav-link ${activeTab === tab.id ? "active" : ""}`}
                  onClick={() => handleTabClick(tab.id)}
                  role="tab"
                  aria-controls={tab.id}
                  aria-selected={activeTab === tab.id}
                >
                  {tab.label}
                </Link>
              </li>
            ))}
          </ul>
          <form
            style={{ borderTop: "2px solid #FF5015!important", padding: "0px" }}
          >
            <div
              className="tab-content"
              id="productsSubTabContent"
              style={{
                paddingLeft: "11px",
                paddingRight: "0px",
                paddingTop: "5px",
                paddingBottom: "6px",
              }}
            >
              {tabData.map((tab) => (
                <div
                  key={tab.id}
                  className={`tab-pane fade show ${
                    activeTab === tab.id ? "active" : ""
                  }`}
                  id={tab.id}
                  role="tabpanel"
                  aria-labelledby={`${tab.id}-tab`}
                >
                  {/* Essential Information */}

                  {tab.id === "subtab1" && (
                    <div>
                      <div>
                        <div className="panel-body-essen">
                          <div className="row mt-4 form-group">
                            <div className="col-md-12">
                              <h5>Essential Information</h5>
                            </div>
                          </div>
                          <div className="row">
                            <div className="form-group col-md-3 pack_code">
                              <label>Package Code</label>
                              <input
                                type="text"
                                name="code"
                                size={15}
                                maxLength={100}
                                placeholder="Package code"
                                className="form-control form-control-sm required test123"
                                id="package_code"
                              />
                            </div>
                            <div className="form-group col-md-3">
                              <div className="checkbox checkbox-success checkbox-inline">
                                <br />
                                <input
                                  id="autogenerate"
                                  type="checkbox"
                                  name="autogenerate"
                                  onclick="autogenerate_func()"
                                />
                                <label htmlFor="autogenerate">
                                  Autogenerate
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="panel-body-essen">
                          <div className="row mt-4 form-group">
                            <div className="col-md-12">
                              <h5>
                                Type<sup>*</sup>
                              </h5>
                            </div>
                          </div>
                          <div className="row mt-3">
                            <div className="form-group col-md-2 static">
                              <div className="radio radio-success radio-inline">
                                <input
                                  id="static"
                                  type="radio"
                                  className="essential_required"
                                  name="type"
                                  defaultValue="static"
                                />
                                <label htmlFor="static">Static</label>
                              </div>
                            </div>
                            {/* <div class="form-group col-md-2">
                                                  <div class="radio radio-success radio-inline">
                                                      <input id="fixed_series_departure" class="essential_required" type='radio' name='type' value='fixed'>
                                                      <label for="fixed_series_departure">Fixed/Series Departure</label>
                                                  </div>
                                              </div> */}
                            {/* <div class="form-group col-md-2 semi-dynamic">
                                                  <div class="radio radio-success radio-inline">
                                                      <input id="semi_dynamic" class="essential_required" type='radio' name='type' value='semi-dynamic'>
                                                      <label for="semi_dynamic">Semi Dynamic</label>
                                                  </div>
                                              </div> */}
                            {/* <div class="form-group col-md-2">
                                                  <div class="radio radio-success radio-inline">
                                                      <input id="dynamic" class="essential_required" type='radio' name='type' value='dynamic'>
                                                      <label for="dynamic">Dynamic</label>
                                                  </div>
                                              </div> */}
                          </div>
                        </div>
                        <div className="panel-body-essen">
                          <div className="row mt-4 form-group">
                            <div className="col-md-12">
                              <h5>
                                Sub Type<sup>*</sup>
                              </h5>
                            </div>
                          </div>
                          <div className="row">
                            <div className="form-group col-md-2">
                              <div className="checkbox checkbox-success checkbox-inline">
                                <br />
                                <input
                                  id="inbound"
                                  className="essential_required"
                                  type="checkbox"
                                  name="sub_type[]"
                                  defaultValue="inbound"
                                />
                                <label htmlFor="inbound">Inbound</label>
                              </div>
                            </div>
                            <div className="form-group col-md-2">
                              <div className="checkbox checkbox-success checkbox-inline">
                                <br />
                                <input
                                  id="outbound"
                                  className="essential_required"
                                  type="checkbox"
                                  name="sub_type[]"
                                  defaultValue="outbound"
                                />
                                <label htmlFor="outbound">Outbound</label>
                              </div>
                            </div>
                            <div className="form-group col-md-2">
                              <div className="checkbox checkbox-success checkbox-inline">
                                <br />
                                <input
                                  id="domestic"
                                  className="essential_required"
                                  type="checkbox"
                                  name="sub_type[]"
                                  defaultValue="domestic"
                                />
                                <label htmlFor="domestic">Domestic</label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="panel-body-essen">
                          <div className="row mt-4 form-group">
                            <div className="col-md-12">
                              <h5>
                                Services Included<sup>*</sup>
                              </h5>
                            </div>
                          </div>
                          <div className="row" id="services_div">
                            <div className="form-group col-md-2">
                              <div className="checkbox checkbox-success checkbox-inline">
                                <br />
                                <input
                                  id="services_1"
                                  type="checkbox"
                                  className="essential_required"
                                  name="services[]"
                                  defaultValue={1}
                                />
                                <label htmlFor="services_1">&nbsp;Hotel</label>
                              </div>
                            </div>
                            <div className="form-group col-md-2">
                              <div className="checkbox checkbox-success checkbox-inline">
                                <br />
                                <input
                                  id="services_2"
                                  type="checkbox"
                                  className="essential_required"
                                  name="services[]"
                                  defaultValue={2}
                                />
                                <label htmlFor="services_2">
                                  &nbsp;Activity
                                </label>
                              </div>
                            </div>
                            <div className="form-group col-md-2">
                              <div className="checkbox checkbox-success checkbox-inline">
                                <br />
                                <input
                                  id="services_3"
                                  type="checkbox"
                                  className="essential_required"
                                  name="services[]"
                                  defaultValue={3}
                                />
                                <label htmlFor="services_3">
                                  &nbsp;Transfer
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="row" id="lang_div"></div>
                        </div>
                        <div className="panel-body-essen">
                          <div className="row mt-4 form-group">
                            <div className="col-md-12">
                              <h5>Activity Type</h5>
                            </div>
                          </div>
                          <div className="row" id="transfer_type">
                            <div className="form-group col-md-2">
                              <div className="radio radio-success radio-inline">
                                <br />
                                <input
                                  id="activity_sic"
                                  type="radio"
                                  className
                                  name="activity_package_type"
                                  defaultValue="sic"
                                />
                                <label htmlFor="activity_sic">SIC</label>
                              </div>
                            </div>
                            <div className="form-group col-md-2">
                              <div className="radio radio-success radio-inline">
                                <br />
                                <input
                                  id="activity_private"
                                  type="radio"
                                  className
                                  name="activity_package_type"
                                  defaultValue="private"
                                />
                                <label htmlFor="activity_private">
                                  Private
                                </label>
                              </div>
                            </div>
                            <div className="form-group col-md-2">
                              <div className="radio radio-success radio-inline">
                                <br />
                                <input
                                  id="activity_private_per_pax"
                                  type="radio"
                                  className
                                  name="activity_package_type"
                                  defaultValue="private_per_pax"
                                />
                                <label htmlFor="activity_private_per_pax">
                                  Private per pax
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="panel-body-essen">
                          <div className="row mt-4 form-group">
                            <div className="col-md-12">
                              <h5>Transfer Type</h5>
                            </div>
                          </div>
                          <div className="row" id="transfer_type">
                            <div className="form-group col-md-2">
                              <div className="radio radio-success radio-inline">
                                <br />
                                <input
                                  id="transfer_sic"
                                  type="radio"
                                  className
                                  name="transfer_package_type"
                                  defaultValue="sic"
                                />
                                <label htmlFor="transfer_sic">SIC</label>
                              </div>
                            </div>
                            <div className="form-group col-md-2">
                              <div className="radio radio-success radio-inline">
                                <br />
                                <input
                                  id="transfer_private"
                                  type="radio"
                                  className
                                  name="transfer_package_type"
                                  defaultValue="private"
                                />
                                <label htmlFor="transfer_private">
                                  Private
                                </label>
                              </div>
                            </div>
                            <div className="form-group col-md-2">
                              <div className="radio radio-success radio-inline">
                                <br />
                                <input
                                  id="transfer_private_per_pax"
                                  type="radio"
                                  className
                                  name="transfer_package_type"
                                  defaultValue="private_per_pax"
                                />
                                <label htmlFor="transfer_private_per_pax">
                                  Private per pax
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="panel-body-essen">
                          <div className="row mt-4 form-group">
                            <div className="col-md-12">
                              <h5>
                                Category Theme<sup>*</sup>
                              </h5>
                            </div>
                          </div>
                          <div className="row" id="theme_div">
                            <div className="form-group col-md-2">
                              <div className="checkbox checkbox-success checkbox-inline">
                                <br />
                                <input
                                  id="theme_7"
                                  type="checkbox"
                                  className="essential_required"
                                  name="theme[]"
                                  defaultValue={7}
                                />
                                <label htmlFor="theme_7">&nbsp;Adventure</label>
                              </div>
                            </div>
                            <div className="form-group col-md-2">
                              <div className="checkbox checkbox-success checkbox-inline">
                                <br />
                                <input
                                  id="theme_17"
                                  type="checkbox"
                                  className="essential_required"
                                  name="theme[]"
                                  defaultValue={17}
                                />
                                <label htmlFor="theme_17">&nbsp;asdfg</label>
                              </div>
                            </div>
                            <div className="form-group col-md-2">
                              <div className="checkbox checkbox-success checkbox-inline">
                                <br />
                                <input
                                  id="theme_15"
                                  type="checkbox"
                                  className="essential_required"
                                  name="theme[]"
                                  defaultValue={15}
                                />
                                <label htmlFor="theme_15">&nbsp;bbb</label>
                              </div>
                            </div>
                            <div className="form-group col-md-2">
                              <div className="checkbox checkbox-success checkbox-inline">
                                <br />
                                <input
                                  id="theme_8"
                                  type="checkbox"
                                  className="essential_required"
                                  name="theme[]"
                                  defaultValue={8}
                                />
                                <label htmlFor="theme_8">
                                  &nbsp;Exhibition
                                </label>
                              </div>
                            </div>
                            <div className="form-group col-md-2">
                              <div className="checkbox checkbox-success checkbox-inline">
                                <br />
                                <input
                                  id="theme_9"
                                  type="checkbox"
                                  className="essential_required"
                                  name="theme[]"
                                  defaultValue={9}
                                />
                                <label htmlFor="theme_9">&nbsp;Family</label>
                              </div>
                            </div>
                            <div className="form-group col-md-2">
                              <div className="checkbox checkbox-success checkbox-inline">
                                <br />
                                <input
                                  id="theme_14"
                                  type="checkbox"
                                  className="essential_required"
                                  name="theme[]"
                                  defaultValue={14}
                                />
                                <label htmlFor="theme_14">&nbsp;ggg</label>
                              </div>
                            </div>
                            <div className="form-group col-md-2">
                              <div className="checkbox checkbox-success checkbox-inline">
                                <br />
                                <input
                                  id="theme_21"
                                  type="checkbox"
                                  className="essential_required"
                                  name="theme[]"
                                  defaultValue={21}
                                />
                                <label htmlFor="theme_21">&nbsp;gggg</label>
                              </div>
                            </div>
                            <div className="form-group col-md-2">
                              <div className="checkbox checkbox-success checkbox-inline">
                                <br />
                                <input
                                  id="theme_10"
                                  type="checkbox"
                                  className="essential_required"
                                  name="theme[]"
                                  defaultValue={10}
                                />
                                <label htmlFor="theme_10">
                                  &nbsp;Historical
                                </label>
                              </div>
                            </div>
                            <div className="form-group col-md-2">
                              <div className="checkbox checkbox-success checkbox-inline">
                                <br />
                                <input
                                  id="theme_5"
                                  type="checkbox"
                                  className="essential_required"
                                  name="theme[]"
                                  defaultValue={5}
                                />
                                <label htmlFor="theme_5">
                                  &nbsp;Mumbai Dhamaal
                                </label>
                              </div>
                            </div>
                            <div className="form-group col-md-2">
                              <div className="checkbox checkbox-success checkbox-inline">
                                <br />
                                <input
                                  id="theme_13"
                                  type="checkbox"
                                  className="essential_required"
                                  name="theme[]"
                                  defaultValue={13}
                                />
                                <label htmlFor="theme_13">
                                  &nbsp;Mumbai VadaPav
                                </label>
                              </div>
                            </div>
                            <div className="form-group col-md-2">
                              <div className="checkbox checkbox-success checkbox-inline">
                                <br />
                                <input
                                  id="theme_11"
                                  type="checkbox"
                                  className="essential_required"
                                  name="theme[]"
                                  defaultValue={11}
                                />
                                <label htmlFor="theme_11">&nbsp;Nature</label>
                              </div>
                            </div>
                            <div className="form-group col-md-2">
                              <div className="checkbox checkbox-success checkbox-inline">
                                <br />
                                <input
                                  id="theme_16"
                                  type="checkbox"
                                  className="essential_required"
                                  name="theme[]"
                                  defaultValue={16}
                                />
                                <label htmlFor="theme_16">
                                  &nbsp;New theme
                                </label>
                              </div>
                            </div>
                            <div className="form-group col-md-2">
                              <div className="checkbox checkbox-success checkbox-inline">
                                <br />
                                <input
                                  id="theme_19"
                                  type="checkbox"
                                  className="essential_required"
                                  name="theme[]"
                                  defaultValue={19}
                                />
                                <label htmlFor="theme_19">&nbsp;sayali</label>
                              </div>
                            </div>
                            <div className="form-group col-md-2">
                              <div className="checkbox checkbox-success checkbox-inline">
                                <br />
                                <input
                                  id="theme_20"
                                  type="checkbox"
                                  className="essential_required"
                                  name="theme[]"
                                  defaultValue={20}
                                />
                                <label htmlFor="theme_20">
                                  &nbsp;Theme_one
                                </label>
                              </div>
                            </div>
                            <div className="form-group col-md-2">
                              <div className="checkbox checkbox-success checkbox-inline">
                                <br />
                                <input
                                  id="theme_18"
                                  type="checkbox"
                                  className="essential_required"
                                  name="theme[]"
                                  defaultValue={18}
                                />
                                <label htmlFor="theme_18">
                                  &nbsp;xfcdgvhjk
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="row mt-4 form-group">
                            <div className="col-md-12">
                              <button
                                type="button"
                                name="add"
                                id="button"
                                value="Add"
                                className="btn btn-dark btn-sm form-group"
                              >
                                <i className="fa fa-plus" />
                                &nbsp;Add New Themes
                              </button>
                            </div>
                          </div>
                          <div className="container"></div>
                        </div>
                        <div className="panel-body-essen">
                          <div className="row mt-4 form-group">
                            <div className="col-md-12">
                              <h5>
                                Physical Level<sup>*</sup>
                              </h5>
                            </div>
                          </div>
                          <div className="row" id="physical_level_div">
                            <div className="form-group col-md-2">
                              <div className="radio radio-success radio-inline">
                                <input
                                  id="pl_4"
                                  type="radio"
                                  name="physical_level"
                                  className="essential_required"
                                  defaultValue={4}
                                />
                                <label htmlFor="pl_4">&nbsp;Challenging</label>
                              </div>
                            </div>
                            <div className="form-group col-md-2">
                              <div className="radio radio-success radio-inline">
                                <input
                                  id="pl_5"
                                  type="radio"
                                  name="physical_level"
                                  className="essential_required"
                                  defaultValue={5}
                                />
                                <label htmlFor="pl_5">&nbsp;Extreme</label>
                              </div>
                            </div>
                            <div className="form-group col-md-2">
                              <div className="radio radio-success radio-inline">
                                <input
                                  id="pl_10"
                                  type="radio"
                                  name="physical_level"
                                  className="essential_required"
                                  defaultValue={10}
                                />
                                <label htmlFor="pl_10">&nbsp;ggd</label>
                              </div>
                            </div>
                            <div className="form-group col-md-2">
                              <div className="radio radio-success radio-inline">
                                <input
                                  id="pl_9"
                                  type="radio"
                                  name="physical_level"
                                  className="essential_required"
                                  defaultValue={9}
                                />
                                <label htmlFor="pl_9">&nbsp;HIGH</label>
                              </div>
                            </div>
                            <div className="form-group col-md-2">
                              <div className="radio radio-success radio-inline">
                                <input
                                  id="pl_8"
                                  type="radio"
                                  name="physical_level"
                                  className="essential_required"
                                  defaultValue={8}
                                />
                                <label htmlFor="pl_8">&nbsp;Intermediate</label>
                              </div>
                            </div>
                            <div className="form-group col-md-2">
                              <div className="radio radio-success radio-inline">
                                <input
                                  id="pl_6"
                                  type="radio"
                                  name="physical_level"
                                  className="essential_required"
                                  defaultValue={6}
                                />
                                <label htmlFor="pl_6">&nbsp;Low</label>
                              </div>
                            </div>
                            <div className="form-group mt-2 col-md-2">
                              <div className="radio radio-success radio-inline">
                                <input
                                  id="pl_2"
                                  type="radio"
                                  name="physical_level"
                                  className="essential_required"
                                  defaultValue={2}
                                />
                                <label htmlFor="pl_2">&nbsp;Moderate</label>
                              </div>
                            </div>
                            <div className="form-group mt-2 col-md-2">
                              <div className="radio radio-success radio-inline">
                                <input
                                  id="pl_11"
                                  type="radio"
                                  name="physical_level"
                                  className="essential_required"
                                  defaultValue={11}
                                />
                                <label htmlFor="pl_11">&nbsp;Test</label>
                              </div>
                            </div>
                          </div>
                          <div className="row mt-4">
                            <div className="col-md-12">
                              <button
                                type="button"
                                name="add"
                                id="edit_level"
                                data-target="#phy_modal"
                                data-toggle="modal"
                                value="Add"
                                className="btn btn-dark btn-sm form-group"
                              >
                                <i className="fa fa-plus" />
                                &nbsp;Add New Levels
                              </button>
                              <div className="container"></div>
                            </div>
                          </div>
                        </div>
                        <div className="panel-body-essen">
                          <div className="row mt-4">
                            <div className="form-group col-md-5">
                              <h4>Tags</h4>
                              <input
                                type="text"
                                name="code"
                                size={40}
                                maxLength={100}
                                placeholder
                                id="package_code"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="panel-body-essen">
                          <div className="row mt-4 form-group">
                            <div className="col-md-12">
                              <h5>Age Group</h5>
                            </div>
                          </div>
                          <div className="row">
                            <div className="form-group col-md-2">
                              <br />
                              <div className="radio radio-success radio-inline">
                                <input
                                  id="all_ages"
                                  type="radio"
                                  className="essential_required"
                                  name="age"
                                  defaultValue="all"
                                  defaultChecked="checked"
                                />
                                <label htmlFor="all_ages">All Ages</label>
                              </div>
                            </div>
                            <div className="form-group col-md-2">
                              <br />
                              <div className="radio radio-success radio-inline">
                                <input
                                  id="select_age"
                                  type="radio"
                                  className="essential_required"
                                  name="age"
                                  defaultValue="group"
                                />
                                <label htmlFor="select_age">Select Age</label>
                              </div>
                            </div>
                            <div
                              className="form-group col-md-3 select_age_div2"
                              id="select_age_div"
                              style={{ display: "none" }}
                            >
                              <label>&nbsp;</label>
                              <label>From (age) </label>{" "}
                              <span id="age_from"> 1</span>-
                              <span id="age_to">100</span>
                              <input
                                type="hidden"
                                name="from_age"
                                id="from_age"
                                defaultValue={0}
                              />
                              <input
                                type="hidden"
                                name="to_age"
                                id="to_age"
                                defaultValue={100}
                              />
                              <div
                                id="ageslider"
                                className="ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all"
                              >
                                <div
                                  className="ui-slider-range ui-widget-header ui-corner-all"
                                  style={{ left: "0%", width: "100%" }}
                                />
                                <span
                                  className="ui-slider-handle ui-state-default ui-corner-all"
                                  tabIndex={0}
                                  style={{ left: "0%" }}
                                />
                                <span
                                  className="ui-slider-handle ui-state-default ui-corner-all"
                                  tabIndex={0}
                                  style={{ left: "100%" }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="panel-body-essen">
                          <div className="form-group">
                            <div className="row mt-4 form-group">
                              <div className="col-md-2">
                                <h5>No. of Days : </h5>
                              </div>
                              <div className="col-md-2">
                                <h5>Min No. of Adult : </h5>
                              </div>
                              <div className="col-md-2">
                                <h5>Max No. of Adult : </h5>
                              </div>
                              <div className="col-md-2">
                                <h5>Min No. of Child : </h5>
                              </div>
                              <div className="col-md-2">
                                <h5>Max No. of Child : </h5>
                              </div>
                            </div>
                            <div className="row">
                              <div className="form-group col-md-2">
                                <input
                                  type="text"
                                  name="days"
                                  id="days"
                                  className="form-control essential_required required"
                                  onkeypress="return isNumber(event)"
                                />
                                {/* <div id="dayslider"></div> */}
                              </div>
                              <div className="form-group col-md-2">
                                <input
                                  type="text"
                                  name="min_adult"
                                  id="min_adult"
                                  className="form-control essential_required required"
                                  onkeypress="return isNumber(event)"
                                />
                              </div>
                              <div className="form-group col-md-2">
                                <input
                                  type="text"
                                  name="max_adult"
                                  id="max_adult"
                                  className="form-control essential_required required"
                                  onkeypress="return isNumber(event)"
                                />
                              </div>
                              <div className="form-group col-md-2">
                                <input
                                  type="text"
                                  name="min_child"
                                  id="min_child"
                                  className="form-control essential_required required"
                                  onkeypress="return isNumber(event)"
                                />
                              </div>
                              <div className="form-group col-md-2">
                                <input
                                  type="text"
                                  name="max_child"
                                  id="max_child"
                                  className="form-control essential_required required"
                                  onkeypress="return isNumber(event)"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="panel-body-essen">
                          <div className="row mt-4 form-group">
                            <div className="col-md-12">
                              <h5>Destinations</h5>
                            </div>
                          </div>
                          <div className="row">
                            <div className="form-group col-md-3">
                              <label>Countries</label>
                              <MultiSelect
                                options={countries}
                                isSearchable
                                placeholder="- Select Country -"
                                className="custom-select required"
                                onChange={handleCountryChange}
                                noOptionsMessage={() => "No Country Found"}
                              />
                            </div>
                            <div className="form-group col-md-3">
                              <label>Cities</label>
                              <MultiSelect
                                //  options={Array.isArray(branchData.branchCity) ? branchData.branchCity : []}
                                options={
                                  citiesByCountry[branchData.branchCountry] ||
                                  []
                                }
                                isSearchable
                                placeholder="- Select City -"
                                className="custom-select required"
                                onChange={handleCityChange}
                                noOptionsMessage={() => "No City Found"}
                              />
                            </div>
                          </div>
                          <div className="row mt-2">
                            <div className="col-md-12">
                              <div className>
                                <div className="dataTables_scroll">
                                  <table
                                    id="visa_requirements_table"
                                    className="table   table-responsive"
                                    style={{ display: "none" }}
                                  >
                                    <thead>
                                      <tr className="bg-primary">
                                        <th>Country</th>
                                        <th>City</th>
                                        <th>Visa Included</th>
                                        <th>Show Visa Requirements</th>
                                        <th>Actions</th>
                                      </tr>
                                    </thead>
                                    <tbody id="visa_requirements_tr"></tbody>
                                  </table>
                                </div>
                                <br />
                                <div className="row">
                                  <div className="form-group col-md-12">
                                    <button
                                      type="button"
                                      name="continue"
                                      id="button"
                                      value="continue"
                                      className="btn btn-dark btn-sm form-group"
                                      onclick="package_info_submit()"
                                    >
                                      Continue&nbsp;
                                      <i className="fa fa-arrow-right" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Details */}

                  {tab.id === "subtab2" && (
                    <div className="hpanel">
                      <form
                        id="package_details_info"
                        name="package_details_info"
                        className="ng-pristine ng-valid"
                      >
                        <div className="form-group">
                          <h4>Package Details</h4>
                        </div>
                        <div className="row">
                          <div className="form-group col-md-3">
                            <label>Name</label>
                            <input
                              type="text"
                              name="package_name"
                              placeholder="Package name"
                              id="package_name"
                              size={15}
                              maxLength={100}
                              className="form-control form-control-sm detail_required required"
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <label>Short Description</label>
                            <div>
                              <textarea id="tiny" defaultValue={""} />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <label>Long Description</label>
                            <div>
                              <textarea id="tiny1" defaultValue={""} />
                            </div>
                          </div>
                        </div>
                        <div className="panel-body-essen">
                          <div className="form-group">
                            <h4>Useful Information</h4>
                          </div>
                          <div className="row" id="useful_info">
                            <div className="form-group col-md-3">
                              <div
                                className="checkbox checkbox-success checkbox-inline"
                                id={2}
                              >
                                <br />
                                <input
                                  id={2}
                                  type="checkbox"
                                  name="useful_info"
                                  className="useful_info"
                                  defaultValue={2}
                                />
                                <label htmlFor={2}>test</label>
                                <i
                                  className="fa fa-info-circle"
                                  id={2}
                                  onclick="get_use_details(this)"
                                  style={{ marginLeft: "10px" }}
                                />
                              </div>
                            </div>
                            <div className="form-group col-md-3">
                              <div
                                className="checkbox checkbox-success checkbox-inline"
                                id={3}
                              >
                                <br />
                                <input
                                  id={3}
                                  type="checkbox"
                                  name="useful_info"
                                  className="useful_info"
                                  defaultValue={3}
                                />
                                <label htmlFor={3}>Information</label>
                                <i
                                  className="fa fa-info-circle"
                                  id={3}
                                  onclick="get_use_details(this)"
                                  style={{ marginLeft: "10px" }}
                                />
                              </div>
                            </div>
                            <div className="form-group col-md-3">
                              <div
                                className="checkbox checkbox-success checkbox-inline"
                                id={9}
                              >
                                <br />
                                <input
                                  id={9}
                                  type="checkbox"
                                  name="useful_info"
                                  className="useful_info"
                                  defaultValue={9}
                                />
                                <label htmlFor={9}>Add new information</label>
                                <i
                                  className="fa fa-info-circle"
                                  id={9}
                                  onclick="get_use_details(this)"
                                  style={{ marginLeft: "10px" }}
                                />
                              </div>
                            </div>
                            <div className="form-group col-md-3">
                              <div
                                className="checkbox checkbox-success checkbox-inline"
                                id={11}
                              >
                                <br />
                                <input
                                  id={11}
                                  type="checkbox"
                                  name="useful_info"
                                  className="useful_info"
                                  defaultValue={11}
                                />
                                <label htmlFor={11}>Checkinf Info</label>
                                <i
                                  className="fa fa-info-circle"
                                  id={11}
                                  onclick="get_use_details(this)"
                                  style={{ marginLeft: "10px" }}
                                />
                              </div>
                            </div>
                            <div className="form-group col-md-3">
                              <div
                                className="checkbox checkbox-success checkbox-inline"
                                id={12}
                              >
                                <br />
                                <input
                                  id={12}
                                  type="checkbox"
                                  name="useful_info"
                                  className="useful_info"
                                  defaultValue={12}
                                />
                                <label htmlFor={12}>Checking Testing.</label>
                                <i
                                  className="fa fa-info-circle"
                                  id={12}
                                  onclick="get_use_details(this)"
                                  style={{ marginLeft: "10px" }}
                                />
                              </div>
                            </div>
                            <div className="form-group col-md-3">
                              <div
                                className="checkbox checkbox-success checkbox-inline"
                                id={13}
                              >
                                <br />
                                <input
                                  id={13}
                                  type="checkbox"
                                  name="useful_info"
                                  className="useful_info"
                                  defaultValue={13}
                                />
                                <label htmlFor={13}>testing work</label>
                                <i
                                  className="fa fa-info-circle"
                                  id={13}
                                  onclick="get_use_details(this)"
                                  style={{ marginLeft: "10px" }}
                                />
                              </div>
                            </div>
                            <div className="form-group col-md-3">
                              <div
                                className="checkbox checkbox-success checkbox-inline"
                                id={14}
                              >
                                <br />
                                <input
                                  id={14}
                                  type="checkbox"
                                  name="useful_info"
                                  className="useful_info"
                                  defaultValue={14}
                                />
                                <label htmlFor={14}>test check</label>
                                <i
                                  className="fa fa-info-circle"
                                  id={14}
                                  onclick="get_use_details(this)"
                                  style={{ marginLeft: "10px" }}
                                />
                              </div>
                            </div>
                            <div className="form-group col-md-3">
                              <div
                                className="checkbox checkbox-success checkbox-inline"
                                id={15}
                              >
                                <br />
                                <input
                                  id={15}
                                  type="checkbox"
                                  name="useful_info"
                                  className="useful_info"
                                  defaultValue={15}
                                />
                                <label htmlFor={15}>testing</label>
                                <i
                                  className="fa fa-info-circle"
                                  id={15}
                                  onclick="get_use_details(this)"
                                  style={{ marginLeft: "10px" }}
                                />
                              </div>
                            </div>
                          </div>
                          <button
                            type="button"
                            name="add"
                            id="edit_info"
                            data-target="#use_modal"
                            data-toggle="modal"
                            value="Add"
                            className="btn btn-dark btn-sm form-group mt-2"
                          >
                            <i className="fa fa-plus" />
                            &nbsp;Add New Information
                          </button>
                          <br />
                          <div className="container"></div>
                          {/* modal for usefull info details */}
                        </div>
                        <div className="panel-body-essen">
                          <div className="form-group">
                            <h4>Gallery Image</h4>
                          </div>
                          <button
                            type="button"
                            name="continue"
                            id="img_btn"
                            className="btn btn-dark btn-sm form-group"
                            data-target="#gallery_modal"
                            data-toggle="modal"
                          >
                            <i className="fa fa-plus" />
                            Add New Images&nbsp;
                          </button>
                          <div className="container"></div>
                          <div className="row" id="destination_block">
                            <div className="col-md-12">
                              <div className>
                                <div
                                  className="form-group"
                                  id="destination_nme64440"
                                >
                                  <h4>Mumbai</h4>
                                </div>
                                <div className="searchable-container">
                                  <div className="items">
                                    <div className="info-block block-info clearfix">
                                      <div
                                        data-toggle="buttons"
                                        className="btn-group bizmoduleselect"
                                        id="img_list_dest64440"
                                      >
                                        <label
                                          className="btn btn-default imageButtons64440"
                                          id="imageLabel15"
                                        >
                                          <div
                                            className="bizcontent"
                                            id="img_15"
                                            style={{
                                              backgroundRepeat: "no-repeat",
                                              backgroundSize: "cover",
                                              backgroundImage:
                                                "url(http://beta.tdonlines.com/project_folder/tdonline/uploads/package_images//gallery/Image_134251.png)",
                                            }}
                                          >
                                            <input
                                              type="checkbox"
                                              name="selected_img[]"
                                              id="selected_img_15"
                                              className="selected_img"
                                              autoComplete="off"
                                              defaultValue={15}
                                            />
                                            <span className="glyphicon glyphicon-ok glyphicon-lg" />
                                          </div>
                                        </label>
                                        <label
                                          className="btn btn-default imageButtons64440"
                                          id="imageLabel3"
                                        >
                                          <div
                                            className="bizcontent"
                                            id="img_3"
                                            style={{
                                              backgroundRepeat: "no-repeat",
                                              backgroundSize: "cover",
                                              backgroundImage:
                                                "url(http://beta.tdonlines.com/project_folder/tdonline/uploads/package_images//gallery/Image_102029.png)",
                                            }}
                                          >
                                            <input
                                              type="checkbox"
                                              name="selected_img[]"
                                              id="selected_img_3"
                                              className="selected_img"
                                              autoComplete="off"
                                              defaultValue={3}
                                            />
                                            <span className="glyphicon glyphicon-ok glyphicon-lg" />
                                          </div>
                                        </label>
                                        <label
                                          className="btn btn-default imageButtons64440"
                                          id="imageLabel4"
                                        >
                                          <div
                                            className="bizcontent"
                                            id="img_4"
                                            style={{
                                              backgroundRepeat: "no-repeat",
                                              backgroundSize: "cover",
                                              backgroundImage:
                                                "url(http://beta.tdonlines.com/project_folder/tdonline/uploads/package_images//gallery/Image_112822.png)",
                                            }}
                                          >
                                            <input
                                              type="checkbox"
                                              name="selected_img[]"
                                              id="selected_img_4"
                                              className="selected_img"
                                              autoComplete="off"
                                              defaultValue={4}
                                            />
                                            <span className="glyphicon glyphicon-ok glyphicon-lg" />
                                          </div>
                                        </label>
                                        <label
                                          className="btn btn-default imageButtons64440"
                                          id="imageLabel7"
                                        >
                                          <div
                                            className="bizcontent"
                                            id="img_7"
                                            style={{
                                              backgroundRepeat: "no-repeat",
                                              backgroundSize: "cover",
                                              backgroundImage:
                                                "url(http://beta.tdonlines.com/project_folder/tdonline/uploads/package_images//gallery/Image_120447.png)",
                                            }}
                                          >
                                            <input
                                              type="checkbox"
                                              name="selected_img[]"
                                              id="selected_img_7"
                                              className="selected_img"
                                              autoComplete="off"
                                              defaultValue={7}
                                            />
                                            <span className="glyphicon glyphicon-ok glyphicon-lg" />
                                          </div>
                                        </label>
                                        <label
                                          className="btn btn-default imageButtons64440"
                                          id="imageLabel8"
                                        >
                                          <div
                                            className="bizcontent"
                                            id="img_8"
                                            style={{
                                              backgroundRepeat: "no-repeat",
                                              backgroundSize: "cover",
                                              backgroundImage:
                                                "url(http://beta.tdonlines.com/project_folder/tdonline/uploads/package_images//gallery/Image_121803.png)",
                                            }}
                                          >
                                            <input
                                              type="checkbox"
                                              name="selected_img[]"
                                              id="selected_img_8"
                                              className="selected_img"
                                              autoComplete="off"
                                              defaultValue={8}
                                            />
                                            <span className="glyphicon glyphicon-ok glyphicon-lg" />
                                          </div>
                                        </label>
                                        <label
                                          className="btn btn-default imageButtons64440"
                                          id="imageLabel12"
                                        >
                                          <div
                                            className="bizcontent"
                                            id="img_12"
                                            style={{
                                              backgroundRepeat: "no-repeat",
                                              backgroundSize: "cover",
                                              backgroundImage:
                                                "url(http://beta.tdonlines.com/project_folder/tdonline/uploads/package_images//gallery/Image_123745.png)",
                                            }}
                                          >
                                            <input
                                              type="checkbox"
                                              name="selected_img[]"
                                              id="selected_img_12"
                                              className="selected_img"
                                              autoComplete="off"
                                              defaultValue={12}
                                            />
                                            <span className="glyphicon glyphicon-ok glyphicon-lg" />
                                          </div>
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <button
                              type="button"
                              name="continue"
                              id="detail_button"
                              onclick="update_details()"
                              value="continue"
                              className="btn btn-dark btn-sm form-group"
                            >
                              Continue&nbsp;
                              <i className="fa fa-arrow-right" />
                            </button>
                            &nbsp;
                            <button
                              type="button"
                              name="save_as_draft_details_btn"
                              id="save_as_draft_details_btn"
                              value="save_as_draft"
                              className="btn btn-dark btn-sm form-group"
                              onclick="save_as_draft_details()"
                            >
                              <i className="fa fa-floppy-o"> </i>
                              &nbsp;Save as Draft
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* Itinerary */}

                  {tab.id === "subtab3" && (
                    <div className="tab-pane active" id="3a">
                      <div className="form-group">
                        <h4>Itinerary</h4>
                      </div>
                      <hr />
                      <div className="row form-group">
                        <div className="col-md-6">
                          <div className="pull-left">
                            <h6 className="pack_code">
                              <span
                                className="pack_head"
                                style={{ fontSize: "14px", fontWeight: 600 }}
                              >
                                Package Code :
                              </span>
                              <span>938523</span>
                            </h6>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="pull-right packages_selected_lang" />
                        </div>
                      </div>
                      <br />
                      <div
                        className="panel-group"
                        id="accordion"
                        role="tablist"
                        aria-multiselectable="true"
                      >
                        {/* ngRepeat: number in days */}
                        <div
                          className="panel panel-default ng-scope"
                          ng-init="dayIndex=$index"
                          ng-repeat="number in days"
                        >
                          <div
                            className="panel-heading"
                            ng-click="tab_click(dayIndex + 1);"
                            role="tab"
                            id="heading1"
                          >
                            <h4 className="panel-title">
                              <Link
                                role="button"
                                data-bs-toggle="collapse"
                                data-bs-parent="#accordion"
                                to="#collapse1"
                                aria-expanded="true"
                                aria-controls="collapseOne"
                                className="ng-binding"
                              >
                                Day 1
                              </Link>
                            </h4>
                          </div>
                          <div
                            id="collapse1"
                            className="panel-collapse collapse in"
                            role="tabpanel"
                            aria-labelledby="heading1"
                          >
                            <form
                              name="itinerary_form1"
                              id="itinerary_form1"
                              className="ng-valid ng-dirty ng-valid-parse"
                            >
                              <input
                                type="hidden"
                                id="itinerary_day"
                                defaultValue={1}
                                name="itinerary_day"
                              />
                              <div
                                className="panel-body noMargin removeMargins"
                                style={{ marginBottom: "0px" }}
                              >
                                <div className="row">
                                  <div className="form-group col-md-4">
                                    <label>Destination</label>
                                    <select
                                      data-live-search="true"
                                      ng-model="destination"
                                      name="destination_1[]"
                                      className="destinations_day_wise required selectpicker show-menu-arrow form-control itinerary_required ng-untouched ng-valid ng-empty bs-select-hidden ng-dirty ng-valid-parse"
                                      id="destination_1"
                                      ng-change="destination_click($index+1,'click')"
                                      multiple
                                    >
                                      <option value={64440}>Mumbai</option>
                                    </select>
                                    <div className="btn-group bootstrap-select show-tick destinations_day_wise required show-menu-arrow form-control itinerary_required ng-pristine ng-untouched ng-valid ng-empty">
                                      <button
                                        type="button"
                                        className="btn dropdown-toggle btn-default"
                                        data-toggle="dropdown"
                                        data-id="destination_1"
                                        title="Nothing selected"
                                      >
                                        <span className="filter-option pull-left">
                                          Nothing selected
                                        </span>
                                        &nbsp;
                                        <span className="caret" />
                                      </button>
                                      <div className="dropdown-menu open">
                                        <div className="bs-searchbox">
                                          <input
                                            type="text"
                                            className="form-control"
                                            autoComplete="off"
                                          />
                                        </div>
                                        <ul
                                          className="dropdown-menu inner"
                                          role="menu"
                                        >
                                          <li
                                            data-original-index={0}
                                            className="active"
                                          >
                                            <Link
                                              tabIndex={0}
                                              className
                                              style={{}}
                                              data-tokens="null"
                                            >
                                              <span className="text">
                                                Mumbai
                                              </span>
                                              <span className="glyphicon glyphicon-ok check-mark" />
                                            </Link>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="form-group col-md-4">
                                    <label>Meeting Point</label>
                                    <input
                                      type="text"
                                      name="meeting_point_itinery_1"
                                      size={15}
                                      id="meeting_point_itinery_1"
                                      maxLength={100}
                                      className="form-control itinerary_required required"
                                      placeholder="Meeting Point and Details"
                                    />
                                  </div>
                                  <div className="form-group col-md-4">
                                    <label>
                                      Meeting Point Address (
                                      <small>Used for Maps</small>)
                                    </label>
                                    <input
                                      type="text"
                                      name="meeting_point_address_itinery_1"
                                      id="meeting_point_address_itinery1"
                                      size={15}
                                      maxLength={100}
                                      className="form-control meeting_point_places itinerary_required required pac-target-input"
                                      placeholder="Meeting Point Address"
                                      autoComplete="off"
                                    />
                                  </div>
                                  <input
                                    type="hidden"
                                    id="latitude1"
                                    name="latitude1"
                                  />
                                  <input
                                    type="hidden"
                                    id="longitude1"
                                    name="longitude1"
                                  />
                                </div>
                                <div className="row">
                                  <div className="form-group col-md-12">
                                    <label>Day Description</label>
                                    <textarea
                                      name="day_description1"
                                      id="day_description1"
                                      className="form-control summernote itinerary_required"
                                      rows={5}
                                      defaultValue={""}
                                    />
                                  </div>
                                </div>
                                {/* Stay in */}
                                {/* ngIf: service_hotel */}
                                <div
                                  className="row panel-body2 ng-scope"
                                  ng-if="service_hotel"
                                  id="stay_in_parent_div1"
                                  style={{ display: "none" }}
                                >
                                  <div className="row col-md-12">
                                    <h4>
                                      Stay in{" "}
                                      <small>
                                        {" "}
                                        ( Required for Accomodation )
                                      </small>{" "}
                                    </h4>
                                  </div>
                                  {/* ngRepeat: d in scope_selected_dest */}
                                  {/* Stay In  */}
                                  {/* Hotel */}
                                  {/* ngIf: service_hotel */}
                                  <div
                                    className="row ng-scope"
                                    ng-if="service_hotel"
                                    id="acc_on_stayin1"
                                    style={{ display: "none" }}
                                  >
                                    <input
                                      type="hidden"
                                      id="hotel_count1"
                                      name="hotel_count1"
                                      data-day={1}
                                    />
                                    <div className="form-group col-md-12">
                                      <h4>Accomodation</h4>
                                    </div>
                                    <div className="form-group col-md-12 row">
                                      <div className="form-group col-md-2">
                                        <div className="radio radio-success radio-inline">
                                          <input
                                            id="accomodation_none1"
                                            className="radio-select"
                                            type="radio"
                                            name="accomodation1"
                                            data-params={1}
                                            defaultValue="none"
                                            onchange='newValue("none",this)'
                                            defaultChecked
                                          />
                                          <label htmlFor="accomodation_none1">
                                            None
                                          </label>
                                        </div>
                                      </div>
                                      {/* ngIf: package_type == 'static' || package_type == 'semi-dynamic' || package_type == 'fixed' */}
                                      <div
                                        className="form-group col-md-4 ng-scope"
                                        ng-if="package_type == 'static' || package_type == 'semi-dynamic' || package_type == 'fixed'"
                                      >
                                        <div className="radio radio-success radio-inline">
                                          <input
                                            id="contracted_inventory1"
                                            className="radio-select dyn_radio"
                                            type="radio"
                                            name="accomodation1"
                                            data-params={1}
                                            defaultValue="contracted"
                                            onchange='newValue("contracted",this)'
                                          />
                                          <label htmlFor="contracted_inventory1">
                                            Fixed Inventory
                                          </label>
                                        </div>
                                      </div>
                                      {/* end ngIf: package_type == 'static' || package_type == 'semi-dynamic' || package_type == 'fixed' */}
                                    </div>
                                    {/* ngIf: package_type == 'static' || package_type == 'semi-dynamic' || package_type == 'fixed' */}
                                    <div
                                      className="form-group row all_acc_div1 contracted_div1"
                                      ng-if="package_type == 'static' || package_type == 'semi-dynamic' || package_type == 'fixed'"
                                      style={{ display: "none" }}
                                    >
                                      <div className="col-md-10">
                                        {/* ngIf: package_type == 'static' */}
                                        {/* ngIf: package_type == 'static' */}
                                        {/* ngIf: package_type == 'semi-dynamic' */}
                                        <div
                                          className="col-md-1 form-group ng-scope"
                                          ng-if="package_type == 'semi-dynamic'"
                                        >
                                          <label>Sequence</label>
                                          <input
                                            type="text"
                                            className="form-control required itinerary_required "
                                            onkeypress="return isNumber(event)"
                                            name="hotel_sequence_0_1"
                                            data-index={0}
                                            data-params={1}
                                            id="hotel_sequence_0_1"
                                          />
                                        </div>
                                        {/* end ngIf: package_type == 'semi-dynamic' */}
                                        {/* ngIf: package_type == 'semi-dynamic' */}
                                        <div
                                          className="col-md-2 form-group ng-scope"
                                          ng-if="package_type == 'semi-dynamic'"
                                        >
                                          <label htmlFor="contracted_supplier_id_0_1">
                                            Supplier
                                          </label>
                                          <select
                                            data-index={0}
                                            data-live-search="true"
                                            name="supplier_id_0_1"
                                            data-params={1}
                                            onchange="contractedHotelSupplierChange('',this);"
                                            id="contracted_supplier_id_0_1"
                                            className="selectpicker required show-menu-arrow form-control offline_supplier offline_supplier1 required itinerary_required"
                                          />
                                        </div>
                                        {/* end ngIf: package_type == 'semi-dynamic' */}
                                        {/* ngIf: package_type == 'static' */}
                                        {/* ngIf: package_type == 'semi-dynamic' */}
                                        <div
                                          className="col-md-2 form-group contracted_hotel_div ng-scope"
                                          id="contracted_hotel_div_0_1"
                                          style={{ display: "none" }}
                                          ng-if="package_type == 'semi-dynamic'"
                                          data-params={1}
                                        >
                                          <label
                                            htmlFor="contracted_hotel_id_0_1"
                                            className="hotel_count1"
                                          >
                                            Contracted Hotel
                                          </label>
                                          <select
                                            data-index={0}
                                            data-live-search="true"
                                            name="hotel_id_0_1"
                                            data-params={1}
                                            id="contracted_hotel_id_0_1"
                                            className="selectpicker required show-menu-arrow form-control contracted_hotel itinerary_required required"
                                            onchange="inventoryRoomCategory(this)"
                                          />
                                          <div className="col-md-2">
                                            &nbsp;{" "}
                                          </div>
                                        </div>
                                        {/* end ngIf: package_type == 'semi-dynamic' */}
                                      </div>{" "}
                                      {/* ngIf: package_type == 'fixed' */}
                                    </div>
                                    {/* end ngIf: package_type == 'static' || package_type == 'semi-dynamic' || package_type == 'fixed' */}
                                    <div
                                      className="row form-group hotel_clone_div"
                                      data-day={1}
                                      style={{ display: "none" }}
                                    >
                                      <div className="col-md-10">
                                        <div className="col-md-1">
                                          <label>Sequence</label>
                                          <input
                                            type="text"
                                            className="required itinerary_required form-control  hotel-sequence hotel-sequence1"
                                          />
                                        </div>
                                        <div className="col-md-2">
                                          <label>Supplier</label>
                                          <select
                                            data-live-search="true"
                                            onchange="contractedHotelSupplierChange('',this);"
                                            className="required form-control hotel_supplier_clone hotel_supplier_clone_1 required itinerary_required"
                                          />
                                        </div>
                                        <div
                                          className="col-md-2 contracted_hotel_div"
                                          style={{ display: "none" }}
                                        >
                                          <label className="hotel_count1">
                                            Contracted Hotel
                                          </label>
                                          <select
                                            data-live-search="true"
                                            className="required  form-control contracted_hotel_clone contracted_hotel_clone_1 itinerary_required required"
                                            onchange="inventoryRoomCategory(this)"
                                          />
                                        </div>
                                        <div
                                          className="col-md-2 all_transfer_div select_age_div25 inventory_room_div"
                                          style={{ display: "none" }}
                                        >
                                          <label>Inventory Room Category</label>
                                          <select
                                            data-live-search="true"
                                            className="form-control itinerary_required required inventory_room_category_clone inventory_room_category_clone_1"
                                          >
                                            <option val value="Select Category">
                                              Select Category
                                            </option>
                                          </select>
                                        </div>
                                        <div
                                          className="col-md-2 all_transfer_div select_age_div25 room_meal_div"
                                          style={{ display: "none" }}
                                        >
                                          <label>Select Room Meal Basis</label>
                                          <select
                                            data-live-search="true"
                                            className="form-control itinerary_required required inventory_room_meal_clone inventory_room_meal_clone_1"
                                          >
                                            <option val value="Select Category">
                                              Select Category
                                            </option>
                                          </select>
                                        </div>
                                        {/* ngIf: package_type == 'semi-dynamic' */}
                                        <div
                                          className="col-md-1 all_transfer_div select_age_div25 optional_hotel_div ng-scope"
                                          ng-if=" package_type == 'semi-dynamic'"
                                        >
                                          <div className="col-md-12">
                                            <div className="checkbox checkbox-success checkbox-inline mrgin_tp">
                                              <input
                                                className="optional_hotel optional_hotel_1"
                                                type="checkbox"
                                                defaultValue="Y"
                                              />
                                              <label>Optional</label>
                                            </div>
                                          </div>
                                        </div>
                                        {/* end ngIf: package_type == 'semi-dynamic' */}
                                      </div>
                                      <div className="col-md-2">
                                        {" "}
                                        <span
                                          className="input-group-addon minus"
                                          data-day={1}
                                          data-row
                                          id="minus_hotel"
                                          onclick="remove_hotel(this);"
                                        >
                                          <i className="fa fa-minus" />
                                        </span>
                                      </div>
                                    </div>
                                    <div
                                      className="row contracted_hotel_div1 all_hotel_div1"
                                      id="extra_hotel1"
                                    />
                                  </div>
                                  {/* end ngIf: service_hotel */}
                                  {/* Hotel */}
                                  {/* repeat according to destination */}
                                  {/* ngRepeat: d in scope_selected_dest */}
                                  <div className="row">
                                    <div className="col-md-12">
                                      <button
                                        ng-show="$last"
                                        type="button"
                                        name="continue"
                                        id="button_save_itinerary"
                                        value="continue"
                                        className="btn btn-primary form-group"
                                        ng-click='save_itinerary_daywise("",dayIndex + 1,"","noneradio");'
                                      >
                                        <h6>
                                          Continue&nbsp;
                                          <i className="fa fa-arrow-right" />
                                        </h6>
                                      </button>
                                      &nbsp;
                                      {/* ngIf: !$last */}
                                    </div>
                                  </div>
                                </div>
                                {/* end ngIf: service_hotel */}
                              </div>
                            </form>
                          </div>
                        </div>
                        {/* end ngRepeat: number in days */}
                      </div>
                      <div className="tab-pane" id="4a">
                        <form
                          method="post"
                          name="date_price_form"
                          id="date_price_form"
                          className="ng-pristine ng-valid"
                        >
                          <input
                            type="hidden"
                            name="insert"
                            id="insert"
                            defaultValue="insert"
                          />
                          <input
                            type="hidden"
                            name="validity_date_count"
                            id="validity_date_count"
                          />
                          <input
                            type="hidden"
                            name="min_value_inventory_hidden"
                            id="min_value_inventory_hidden"
                          />
                          <input
                            type="hidden"
                            name="max_value_inventory_hidden"
                            id="max_value_inventory_hidden"
                          />
                          <input
                            type="hidden"
                            name="currency_json"
                            id="currency_json"
                          />
                          <input type="hidden" name="rate_id" id="rate_id" />
                          <div className="form-group">
                            <h4>Dates and Price</h4>
                          </div>
                          <hr />
                          <div className="form-group">
                            <div className="form-group col-md-12">
                              <div className="col-md-2">
                                <div className="radio radio-success radio-inline">
                                  <input
                                    id="open_dates"
                                    type="radio"
                                    name="dates_and_price"
                                    defaultValue="open"
                                    defaultChecked="checked"
                                    onclick='showDateDiv("open")'
                                    className
                                  />
                                  <label htmlFor="open_dates">Open Dates</label>
                                </div>
                              </div>
                              <div className="col-md-2">
                                <div className="radio radio-success radio-inline">
                                  <input
                                    id="series_dates"
                                    type="radio"
                                    name="dates_and_price"
                                    onclick='showDateDiv("series")'
                                    defaultValue="series"
                                    className
                                  />
                                  <label htmlFor="series_dates">
                                    Series Departure
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <br />
                          <div
                            id="exTab1"
                            style={{ display: "block", padding: "0px 20px" }}
                          >
                            <div>
                              <br />
                              <div className="tab-pane active" id="1a_date">
                                <div className="panel-body-essen">
                                  <div className="form-group">
                                    <h4>Start Date and End Date</h4>
                                  </div>{" "}
                                  <br />
                                  <div className="row">
                                    <div className="form-group col-md-2">
                                      <div className="radio radio-success radio-inline">
                                        <input
                                          id="period"
                                          type="radio"
                                          name="period_season"
                                          defaultValue="period"
                                          defaultChecked
                                          className
                                        />
                                        <label htmlFor="period">Period</label>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row add_more_dates_div">
                                    <div
                                      className="form-group col-md-3 validity_div"
                                      id="validity_div_id0"
                                    >
                                      <div
                                        className="input-daterange input-group date validity_date"
                                        id="validity0"
                                      >
                                        <input
                                          className="form-control input_valid_from required"
                                          name="validity_from0"
                                          id="validity_from0"
                                          type="text"
                                        />{" "}
                                        <span className="input-group-addon">
                                          to
                                        </span>
                                        <input
                                          className="form-control input_valid_to"
                                          name="validity_to0"
                                          id="validity_to0"
                                          type="text"
                                        />
                                        <span
                                          className="input-group-addon clear_func"
                                          alt="clear"
                                          title="clear"
                                          onclick="clear1('validity_to0')"
                                        >
                                          <i className="fa fa-trash" />
                                        </span>
                                      </div>
                                    </div>
                                    <div
                                      className="form-group col-md-3 seasons_div"
                                      id="select_age_div"
                                      style={{ display: "none" }}
                                    >
                                      <br />
                                      <select
                                        data-live-search="true"
                                        name="seasons[]"
                                        className="selectpicker required show-menu-arrow form-control bs-select-hidden"
                                        multiple
                                        id="seasons_dropdown"
                                        data-actions-box="true"
                                      >
                                        <option value={0}>
                                          Select Options
                                        </option>
                                      </select>
                                    </div>
                                    <div className="form-group col-md-2 plus_dates">
                                      {" "}
                                      <span className="input-group">
                                        <span
                                          className="input-group-addon"
                                          id="plus"
                                          onclick="add_more_dates_func();"
                                        >
                                          <i className="fa fa-plus" />
                                        </span>
                                        <span
                                          className="input-group-addon"
                                          id="minus"
                                          onclick="remove_more_dates_func()"
                                        >
                                          <i className="fa fa-minus" />
                                        </span>
                                      </span>
                                    </div>
                                  </div>
                                  <div className="extra_dates_div row" />
                                  <div
                                    className="row interval-div"
                                    style={{ display: "none" }}
                                  >
                                    <div className="form-group col-md-2">
                                      <div className="radio radio-success radio-inline">
                                        <input
                                          id="daily"
                                          type="radio"
                                          name="fixed_departures"
                                          defaultValue="daily"
                                          className
                                          onchange="periodSelect(this)"
                                        />
                                        <label htmlFor="daily">Daily</label>
                                      </div>
                                    </div>
                                    <div className="form-group col-md-2">
                                      <div className="radio radio-success radio-inline">
                                        <input
                                          id="weekly"
                                          type="radio"
                                          name="fixed_departures"
                                          defaultValue="weekly"
                                          onchange="periodSelect(this)"
                                          className
                                        />
                                        <label htmlFor="weekly">Weekly</label>
                                      </div>
                                      <br />
                                      <div
                                        id="weekly_limit"
                                        className="periodselect"
                                        style={{ display: "none" }}
                                      >
                                        <select
                                          data-live-search="true"
                                          name="weekly[]"
                                          id="weekly_dropdown"
                                          className="selectpicker show-menu-arrow form-control bs-select-hidden"
                                          multiple
                                          data-actions-box="true"
                                        >
                                          <option value disabled>
                                            Select Options
                                          </option>
                                          <option value={7}>Sunday</option>
                                          <option value={1}>Monday</option>
                                          <option value={2}>Tuesday</option>
                                          <option value={3}>Wednesday</option>
                                          <option value={4}>Thursday</option>
                                          <option value={5}>Friday</option>
                                          <option value={6}>Saturday</option>
                                        </select>
                                      </div>
                                    </div>
                                    <div className="form-group col-md-2">
                                      <div className="radio radio-success radio-inline">
                                        <input
                                          id="monthly"
                                          type="radio"
                                          name="fixed_departures"
                                          defaultValue="monthly"
                                          onchange="periodSelect(this)"
                                          className
                                        />
                                        <label htmlFor="monthly">Monthly</label>
                                      </div>
                                      <br />
                                      <div
                                        id="monthly_limit"
                                        className="periodselect"
                                        style={{ display: "none" }}
                                      >
                                        <select
                                          data-live-search="true"
                                          name="monthly[]"
                                          id="monthly_dropdown"
                                          className="selectpicker show-menu-arrow form-control bs-select-hidden"
                                          multiple
                                          data-actions-box="true"
                                        >
                                          <option value disabled>
                                            Select Options
                                          </option>
                                          <option value={1}>1</option>
                                          <option value={2}>2</option>
                                          <option value={3}>3</option>
                                          <option value={4}>4</option>
                                          <option value={5}>5</option>
                                          <option value={6}>6</option>
                                          <option value={7}>7</option>
                                          <option value={8}>8</option>
                                          <option value={9}>9</option>
                                          <option value={10}>10</option>
                                          <option value={11}>11</option>
                                          <option value={12}>12</option>
                                          <option value={13}>13</option>
                                          <option value={14}>14</option>
                                          <option value={15}>15</option>
                                          <option value={16}>16</option>
                                          <option value={17}>17</option>
                                          <option value={18}>18</option>
                                          <option value={19}>19</option>
                                          <option value={20}>20</option>
                                          <option value={21}>21</option>
                                          <option value={22}>22</option>
                                          <option value={23}>23</option>
                                          <option value={24}>24</option>
                                          <option value={25}>25</option>
                                          <option value={26}>26</option>
                                          <option value={27}>27</option>
                                          <option value={28}>28</option>
                                          <option value={29}>29</option>
                                          <option value={30}>30</option>
                                          <option value={31}>31</option>
                                        </select>
                                      </div>
                                      {/* <input class="form-control" name="month" id="month_limit" type="text" readonly> */}
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="panel-body-essen"
                                  style={{ display: "none" }}
                                >
                                  <div className="row fixed_depart">
                                    <div className="form-group col-md-12">
                                      <h4>Fixed Departures</h4>
                                    </div>
                                    <div className="form-group col-md-1">
                                      <div className="checkbox checkbox-success checkbox-inline">
                                        <input
                                          id="fd_mon1"
                                          type="checkbox"
                                          name="fd_week[]"
                                          defaultValue="mon"
                                          className
                                        />
                                        <label htmlFor="fd_mon1">Mon</label>
                                      </div>
                                    </div>
                                    <div className="form-group col-md-1">
                                      <div className="checkbox checkbox-success checkbox-inline">
                                        <input
                                          id="fd_tue1"
                                          type="checkbox"
                                          name="fd_week[]"
                                          defaultValue="tue"
                                          className
                                        />
                                        <label htmlFor="fd_tue1">Tue</label>
                                      </div>
                                    </div>
                                    <div className="form-group col-md-1">
                                      <div className="checkbox checkbox-success checkbox-inline">
                                        <input
                                          id="fd_wed1"
                                          type="checkbox"
                                          name="fd_week[]"
                                          defaultValue="wed"
                                          className
                                        />
                                        <label htmlFor="fd_wed1">Wed</label>
                                      </div>
                                    </div>
                                    <div className="form-group col-md-1">
                                      <div className="checkbox checkbox-success checkbox-inline">
                                        <input
                                          id="fd_thu1"
                                          type="checkbox"
                                          name="fd_week[]"
                                          defaultValue="thurs"
                                          className
                                        />
                                        <label htmlFor="fd_thu1">Thu</label>
                                      </div>
                                    </div>
                                    <div className="form-group col-md-1">
                                      <div className="checkbox checkbox-success checkbox-inline">
                                        <input
                                          id="fd_fri1"
                                          type="checkbox"
                                          name="fd_week[]"
                                          defaultValue="fri"
                                          className
                                        />
                                        <label htmlFor="fd_fri1">Fri</label>
                                      </div>
                                    </div>
                                    <div className="form-group col-md-1">
                                      <div className="checkbox checkbox-success checkbox-inline">
                                        <input
                                          id="fd_sat1"
                                          type="checkbox"
                                          name="fd_week[]"
                                          defaultValue="sat"
                                          className
                                        />
                                        <label htmlFor="fd_sat1">Sat</label>
                                      </div>
                                    </div>
                                    <div className="form-group col-md-1">
                                      <div className="checkbox checkbox-success checkbox-inline">
                                        <input
                                          id="fd_sun1"
                                          type="checkbox"
                                          name="fd_week[]"
                                          defaultValue="sun"
                                          className
                                        />
                                        <label htmlFor="fd_sun1">Sun</label>
                                      </div>
                                    </div>
                                    <div className="form-group col-md-2">
                                      <button
                                        type="button"
                                        name="select_from_calendar"
                                        id="select_from_calendar"
                                        value="Add"
                                        className="btn btn-primary form-group"
                                      >
                                        <h6>
                                          <i className="fa fa-check-circle" />
                                          &nbsp;Select From Calendar
                                        </h6>
                                      </button>
                                    </div>
                                    <div
                                      className="form-group col-md-3"
                                      id="select_from_calendar_div"
                                      style={{ display: "none" }}
                                    >
                                      <div
                                        className="input-daterange input-group date validity_date"
                                        id="validity0"
                                      >
                                        <input
                                          className="form-control date_price_required input_valid_from"
                                          defaultValue="26-09-2017"
                                          name="fixed_depart_from_date"
                                          id="validity_from0"
                                          type="text"
                                        />{" "}
                                        <span className="input-group-addon">
                                          to
                                        </span>
                                        <input
                                          className="form-control date_price_required input_valid_to"
                                          defaultValue="27-09-2017"
                                          name="fixed_depart_to_date"
                                          id="validity_to0"
                                          type="text"
                                        />{" "}
                                        <span
                                          className="input-group-addon clear_func"
                                          alt="clear"
                                          title="clear"
                                          onclick="clear1('validity_to0')"
                                        >
                                          <i className="fa fa-trash" />
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="panel-body-essen">
                                  <div className="row">
                                    <div className="col-md-12">
                                      <div className="row form-group">
                                        <div className="col-md-12">
                                          <h4>Release Period</h4>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="form-group col-md-2">
                                          <div className="radio radio-success radio-inline">
                                            <input
                                              id="release_period_days"
                                              type="radio"
                                              name="days_or_hours"
                                              defaultValue="day"
                                              defaultChecked
                                            />
                                            <label htmlFor="release_period_days">
                                              In Days
                                            </label>
                                            <input
                                              type="text"
                                              className="form-control required form-group days_text row"
                                              name="days_text"
                                              id="day_resp"
                                              placeholder="days"
                                              defaultValue={0}
                                              onkeypress="return isNumber(event)"
                                            />
                                          </div>
                                        </div>
                                        <div className="form-group col-md-2">
                                          <div className="radio radio-success radio-inline">
                                            <input
                                              id="release_period_hours"
                                              type="radio"
                                              name="days_or_hours"
                                              defaultValue="hour"
                                            />
                                            <label htmlFor="release_period_hours">
                                              In Hours
                                            </label>
                                            <input
                                              type="text"
                                              className="form-control required hours_text"
                                              name="hours_text"
                                              placeholder="Hours"
                                              style={{ display: "none" }}
                                              onkeypress="return isNumber(event)"
                                            />
                                          </div>
                                        </div>
                                        (Use 0 for no release period)
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {/* ngIf: !dynamicCheck */}
                                <div
                                  ng-if="!dynamicCheck"
                                  className="hide-for-dynamic panel-body-essen ng-scope"
                                >
                                  <div className="row form-group col-md-12">
                                    <h4>Occupancy</h4>
                                  </div>
                                  <div className="row occupancy_div" />
                                </div>
                                {/* end ngIf: !dynamicCheck */}
                                {/* ngIf: !dynamicCheck */}
                                <div
                                  ng-if="!dynamicCheck"
                                  className="hide-for-dynamic panel-body-essen ng-scope"
                                >
                                  <div className="row form-group">
                                    <div className="form-group col-md-12">
                                      <h4>Others</h4>
                                    </div>
                                    <div className="col-md-3">
                                      <label>Primary Currency</label>
                                      <select
                                        data-live-search="true"
                                        name="primary_currency"
                                        id="primary_currency"
                                        className="selectpicker show-menu-arrow form-control form-control-sm required bs-select-hidden"
                                        onchange="currency_change(this)"
                                      >
                                        <option value>Select Options</option>
                                      </select>
                                    </div>
                                  </div>
                                  <br />
                                  <div
                                    className="row form-group"
                                    id="rateByDiv"
                                  >
                                    <div
                                      className="form-group col-md-6"
                                      id="rate_type_parent"
                                    >
                                      <div className="form-group col-md-12 no-padd">
                                        <h4>Rate Type</h4>
                                      </div>
                                      <div
                                        className="form-group col-md-6 no-padd"
                                        id="single_rate_div"
                                      >
                                        <div className="radio radio-success radio-inline">
                                          <input
                                            id="single_rate"
                                            type="radio"
                                            name="rates_single_rate"
                                            defaultValue="single"
                                            className
                                            onclick='ratesClick("click");'
                                            defaultChecked
                                          />
                                          <label htmlFor="single_rate">
                                            Single Rate
                                          </label>
                                        </div>
                                      </div>
                                      {/* ngIf: package_activity_type!="private" || package_transfer_type!="private" */}
                                      <div
                                        className="form-group col-md-6 no-padd ng-scope"
                                        id="by_number_of_pax_div"
                                        ng-if='package_activity_type!="private" || package_transfer_type!="private"'
                                      >
                                        <div className="radio radio-success radio-inline">
                                          <input
                                            id="by_number_of_pax"
                                            type="radio"
                                            name="rates_single_rate"
                                            className
                                            defaultValue="no_of_pax"
                                            onclick='ratesClick("click");'
                                          />
                                          <label htmlFor="by_number_of_pax">
                                            By Number of Pax
                                          </label>
                                        </div>
                                      </div>
                                      {/* end ngIf: package_activity_type!="private" || package_transfer_type!="private" */}
                                    </div>
                                    <div
                                      className="form-group col-md-6"
                                      id="rate_by_parent"
                                    >
                                      <div className="form-group col-md-12 no-padd">
                                        <h4>Rate By</h4>
                                      </div>
                                      <div
                                        className="form-group col-md-4 no-padd"
                                        id="ratebypackage_div"
                                      >
                                        <div className="radio radio-success radio-inline">
                                          <input
                                            id="rate_by_package"
                                            type="radio"
                                            name="rate_by_type"
                                            defaultValue="package"
                                            onclick='ratesClick("click");'
                                          />
                                          <label htmlFor="rate_by_package">
                                            Rate by Package
                                          </label>
                                        </div>
                                      </div>
                                      <div
                                        className="form-group col-md-4 no-padd"
                                        id="ratebyservice_div"
                                      >
                                        <div className="radio radio-success radio-inline">
                                          <input
                                            id="rate_by_service"
                                            type="radio"
                                            name="rate_by_type"
                                            defaultValue="service"
                                            defaultChecked
                                            onclick='ratesClick("click");'
                                          />
                                          <label htmlFor="rate_by_service">
                                            Rate by Service
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <br />
                                  <div
                                    className="form-group row pax_range_full_div"
                                    style={{ display: "none" }}
                                  >
                                    <div className="pax_range" id="pax_range">
                                      <div
                                        className="form-group col-md-3 range_div"
                                        id="pax_range_div0"
                                      >
                                        <label
                                          style={{
                                            width: "100%",
                                            float: "left",
                                          }}
                                        >
                                          Pax Range
                                        </label>
                                        <input
                                          className="form-control min_pax_range"
                                          id="pax_range_min_0"
                                          type="text"
                                          readOnly
                                          style={{
                                            width: "40%",
                                            float: "left",
                                          }}
                                        />{" "}
                                        <span
                                          style={{
                                            width: "10%",
                                            float: "left",
                                            margin: "0px 5% 0px 5%",
                                            textAlign: "center",
                                          }}
                                        >
                                          TO
                                        </span>
                                        <input
                                          className="form-control max_pax_range"
                                          id="pax_range_max_0"
                                          type="text"
                                          onblur="checkMaxVal(this);"
                                          style={{
                                            width: "40%",
                                            float: "left",
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div className="new_pax_range" />
                                    <div
                                      className="form-group col-md-3"
                                      id="pax_btns"
                                    >
                                      <br />
                                      <div className="form-group col-md-2">
                                        {" "}
                                        <span className="input-group">
                                          <span
                                            className="input-group-addon"
                                            id="plus"
                                            onclick="add_more_paxrange_func();"
                                            style={{
                                              padding: "6px 12px!important",
                                            }}
                                          >
                                            <i className="fa fa-plus" />
                                          </span>
                                          <span
                                            className="input-group-addon"
                                            id="minus"
                                            onclick="remove_more_paxrange_func()"
                                            style={{
                                              padding: "6px 12px!important",
                                            }}
                                          >
                                            <i className="fa fa-minus" />
                                          </span>
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <Link
                                    type="button"
                                    className="btn btn-dark btn-sm"
                                    id="matrix_rate"
                                    onclick="ratesClick('click')"
                                  >
                                    <i className="fa fa-plus" />
                                    Add Rates
                                  </Link>
                                  <Link
                                    type="button"
                                    className="btn btn-dark btn-sm"
                                    id="cancel_rate"
                                    onclick="cancelClick()"
                                  >
                                    <i className="fa fa-trash" />
                                    Cancel Rates
                                  </Link>
                                  <hr />
                                  <div className="add_rates">
                                    <div className="row">
                                      <div
                                        className="form-group col-md-2"
                                        style={{ display: "none" }}
                                      >
                                        <div className="checkbox checkbox-success checkbox-inline">
                                          <br />
                                          <input
                                            id="see_currency"
                                            type="checkbox"
                                            name="sell_currency"
                                            defaultValue="Y"
                                          />
                                          <label htmlFor="see_currency">
                                            See only in these currencies
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      className="row form-group col-md-12 pax_table_header"
                                      style={{ display: "none" }}
                                    >
                                      <h4>Price</h4>
                                    </div>
                                    <div
                                      id="for_package"
                                      style={{ display: "none" }}
                                    >
                                      <div
                                        className="multiple_ranges"
                                        id="multiple_ranges0"
                                      >
                                        <div
                                          className="form-group row pax_range_full_div"
                                          style={{ display: "none" }}
                                        >
                                          <div className="form-group col-md-8">
                                            <h4>
                                              <span
                                                className="min_range_table"
                                                id="min_range_pax0"
                                              >
                                                1
                                              </span>{" "}
                                              to{" "}
                                              <span
                                                className="max_range_table"
                                                id="max_range_pax0"
                                              />{" "}
                                              pax
                                            </h4>
                                          </div>
                                        </div>
                                        <div className="form-group table_for_rates" />
                                      </div>
                                      <div className="multiple_ranges_new_div" />
                                      {/* Rate By Packages child extrabed start*/}
                                      {/* ngIf: !paxSelected */}
                                      <div
                                        className="dataTables_scroll ng-scope"
                                        ng-if="!paxSelected"
                                      >
                                        {/* ngIf: itinerary_hotel */}
                                        {/* ngIf: itinerary_hotel */}
                                      </div>
                                      {/* end ngIf: !paxSelected */}
                                      {/*Rate By Packages child extrabed extrabed end*/}
                                    </div>
                                    <div
                                      id="pax_package"
                                      style={{ display: "none" }}
                                    >
                                      <label>
                                        Valid From:{" "}
                                        <span
                                          ng-bind="getDateMonth(paxPackageTable.valid_from)"
                                          className="ng-binding"
                                        >
                                          NaN undefined NaN
                                        </span>
                                      </label>
                                      <label>
                                        To:{" "}
                                        <span
                                          ng-bind="getDateMonth(paxPackageTable.valid_to)"
                                          className="ng-binding"
                                        >
                                          NaN undefined NaN
                                        </span>
                                      </label>
                                      {/* ngRepeat: rangesLoop in paxPackageTable.ranges track by $index */}
                                    </div>
                                    <div
                                      id="for_service"
                                      style={{ display: "none" }}
                                    >
                                      <div id="servicePaxBox">
                                        {/* table for Rate by Services > Number of Pax > On click of Edit button And On click of Add Rates (starts here) */}
                                        {/* ngRepeat: paxLoop in paxCount track by $index */}
                                        {/* table for Rate by Services > Number of Pax > On click of Edit button And On click of Add Rates (ends here) */}
                                        {/* table for Rate by Services > Single Rate > On click of Edit button And On click of Add Rates (starts here) */}
                                        {/* ngRepeat: (keyDay,valueDay) in itineraryResponse.days track by $index */}
                                        {/* table for Rate by Services > Single Rate > On click of Edit button And On click of Add Rates (ends here) */}
                                      </div>
                                    </div>
                                    <hr
                                      className="pax_table_header"
                                      style={{ display: "none" }}
                                    />
                                  </div>
                                </div>
                                {/* end ngIf: !dynamicCheck */}
                                <div className="row col-md-12">
                                  <div className="form-group">
                                    <Link
                                      type="button"
                                      onclick="add_dates_prices_func('add')"
                                      className="btn btn-dark btn-sm form-group"
                                      id="continue_date_price"
                                    >
                                      Continue&nbsp;
                                      <i className="fa fa-arrow-right" />
                                    </Link>
                                    &nbsp;
                                    {/* ngIf: !dynamicCheck */}
                                    <button
                                      ng-if="!dynamicCheck"
                                      type="button"
                                      name="add_another_rate_btn"
                                      id="add_another_rate_btn"
                                      value
                                      className="hide-for-dynamic btn btn-dark btn-sm form-group ng-scope"
                                      onclick="add_dates_prices_func('continue')"
                                    >
                                      <i className="fa fa-floppy-o" />
                                      &nbsp;Add rates for another date
                                    </button>
                                    {/* end ngIf: !dynamicCheck */}&nbsp;
                                  </div>
                                </div>
                                {/* ngIf: dynamicCheck */}
                                {/* Rate by Package edit view*/}
                                {/* ngIf: !dynamicCheck */}
                                <div
                                  ng-if="!dynamicCheck"
                                  className="hide-for-dynamic ng-scope"
                                  id="outer"
                                  style={{ width: "100%", float: "left" }}
                                >
                                  <h3
                                    id="table_text_header"
                                    style={{ display: "none" }}
                                  >
                                    Edit Dates and Price details
                                  </h3>
                                  <div className="panel-body11">
                                    {/* ngRepeat: d in paxDatatable track by $index */}
                                    {/* service table without pax starts here for onload */}
                                    {/* ngRepeat: d in serviceDatatable track by $index */}
                                    {/* service table without pax ends here for onload */}
                                    {/* table for Rate by Services > Number of Pax > On Load (starts here) */}
                                    {/* ngRepeat: d in serviceDatatable track by $index */}
                                    {/* table for Rate by Services > Number of Pax > On Load (ends here) */}
                                  </div>
                                </div>
                                {/* end ngIf: !dynamicCheck */}
                              </div>
                            </div>
                          </div>
                          <div className="tab-pane" id="2a_date" />
                        </form>
                      </div>
                      <div className="tab-pane" id="5a">
                        <div className="form-group">
                          <h4>Cancellation Policy</h4>
                        </div>
                        <form
                          name="add_cancellaltion_policy"
                          id="add_cancellaltion_policy"
                          className="ng-pristine ng-valid"
                        >
                          <input
                            type="hidden"
                            name="definer_cancellation"
                            id="definer_cancellation"
                            defaultValue="CANCELLATION_POLICY_DEADLINE"
                          />
                          <input
                            type="hidden"
                            name="multiple_cancellation"
                            id="multiple_cancellation"
                            defaultValue="Y"
                          />
                          <div className="row panel-body2 padd-top-30">
                            <div className="form-group row">
                              <div className="form-group col-md-2">
                                <div className="radio radio-success radio-inline">
                                  <input
                                    id="select_a_policy1"
                                    className="cancellation_policy_required required"
                                    type="radio"
                                    name="select_a_policy"
                                    onclick="show1()"
                                    defaultValue="select"
                                  />
                                  <label htmlFor="select_a_policy1">
                                    Select a Policy
                                  </label>
                                </div>
                              </div>
                              <div className="form-group col-md-2">
                                <div className="radio radio-success radio-inline">
                                  <input
                                    id="create_a_new_policy1"
                                    type="radio"
                                    className="cancellation_policy_required"
                                    name="select_a_policy"
                                    onclick="show2()"
                                    defaultValue="create"
                                  />
                                  <label htmlFor="create_a_new_policy1">
                                    Create a New Policy
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div
                              className="form-group row"
                              id="select_existing_policy"
                              style={{ display: "none" }}
                            >
                              <div className="form-group col-md-3 select_age_div14">
                                <select
                                  data-live-search="true"
                                  className="form-control cancellation_policy_required required selectpicker bs-select-hidden"
                                  id="cancellation_policy_list"
                                  name="cancellation_policy_list"
                                  style={{ display: "inline-block" }}
                                >
                                  <option value>Select policy</option>
                                </select>
                                <div className="btn-group bootstrap-select form-control cancellation_policy_required required">
                                  <button
                                    type="button"
                                    className="btn dropdown-toggle btn-default"
                                    data-toggle="dropdown"
                                    data-id="cancellation_policy_list"
                                    title="Select policy"
                                  >
                                    <span className="filter-option pull-left">
                                      Select policy
                                    </span>
                                    &nbsp;
                                    <span className="caret" />
                                  </button>
                                  <div className="dropdown-menu open">
                                    <div className="bs-searchbox">
                                      <input
                                        type="text"
                                        className="form-control"
                                        autoComplete="off"
                                      />
                                    </div>
                                    <ul
                                      className="dropdown-menu inner"
                                      role="menu"
                                    >
                                      <li
                                        data-original-index={0}
                                        className="selected active"
                                      >
                                        <Link
                                          tabIndex={0}
                                          className
                                          style={{}}
                                          data-tokens="null"
                                        >
                                          <span className="text">
                                            Select policy
                                          </span>
                                          <span className="glyphicon glyphicon-ok check-mark" />
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              className="form-group add_policy_package"
                              id="add_policy_package"
                              style={{ display: "none" }}
                            >
                              <div className="row">
                                <div className="form-group col-md-3">
                                  <label>Policy Name</label>
                                  <input
                                    type="text"
                                    name="policy_name"
                                    id="policy_name"
                                    size={15}
                                    maxLength={100}
                                    className="form-control required"
                                  />
                                </div>
                                <div className="form-group col-md-3">
                                  <label>From (days)</label>{" "}
                                  <span id="from"> 1</span>-
                                  <span id="to">100</span>
                                  <div
                                    id="slider"
                                    className="ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all"
                                  >
                                    <div
                                      className="ui-slider-range ui-widget-header ui-corner-all"
                                      style={{ left: "0%", width: "100%" }}
                                    />
                                    <span
                                      className="ui-slider-handle ui-state-default ui-corner-all"
                                      tabIndex={0}
                                      style={{ left: "0%" }}
                                    />
                                    <span
                                      className="ui-slider-handle ui-state-default ui-corner-all"
                                      tabIndex={0}
                                      style={{ left: "100%" }}
                                    />
                                  </div>
                                  <input
                                    type="hidden"
                                    id="to_val"
                                    name="to_val"
                                    defaultValue={100}
                                  />
                                  <input
                                    type="hidden"
                                    id="from_val"
                                    name="from_val"
                                    defaultValue={0}
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div
                                  className="form-group col-md-2"
                                  style={{ display: "none" }}
                                >
                                  <div className="radio radio-success radio-inline">
                                    <input
                                      id="percentage_cp"
                                      type="radio"
                                      name="cp"
                                      className
                                      defaultValue="percent"
                                      defaultChecked="checked"
                                    />
                                    <label htmlFor="percentage_cp">
                                      Percentage
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <br />
                              <div className="row">
                                <div className="form-group col-md-2">
                                  <label>Percent</label>
                                  <input
                                    type="text"
                                    name="percent_amt"
                                    id="percent_amt"
                                    size={15}
                                    maxLength={100}
                                    className="form-control required"
                                    onkeypress="return isNumber(event)"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                        <div className="row">
                          <div
                            className="form-group col-md-2 single_policy"
                            id="single_policy"
                          >
                            <button
                              type="button"
                              name="add"
                              id="button"
                              value="Add"
                              onclick="add_multiple_policy_in_list()"
                              className="btn btn-dark btn-sm form-group"
                            >
                              <i className="fa fa-plus" />
                              &nbsp;Add
                            </button>
                          </div>
                          <div
                            className="form-group col-md-2 multiple_policy"
                            id="multiple_policy"
                            style={{ display: "none" }}
                          >
                            <button
                              type="button"
                              name="add"
                              id="button"
                              value="Add"
                              onclick="update_policy_in_list()"
                              className="btn btn-dark btn-sm form-group"
                            >
                              <i className="fa fa-plus" />
                              &nbsp;Create
                            </button>
                          </div>
                        </div>
                        <div className="package_cancellation_policy_list">
                          <div className="panel-body removeMargins">
                            <div className="dataTables_scroll">
                              <div
                                id="cancellation_table1_wrapper"
                                className="dataTables_wrapper form-inline dt-bootstrap no-footer"
                              >
                                <div className="row">
                                  <div className="col-sm-6" />
                                  <div className="col-sm-6" />
                                </div>
                                <div className="row">
                                  <div className="col-sm-12">
                                    <table
                                      id="cancellation_table1"
                                      className="table   table-responsive dataTable no-footer"
                                      style={{ display: "none" }}
                                      role="grid"
                                      aria-describedby="cancellation_table1_info"
                                    >
                                      <thead>
                                        <tr className="bg-primary" role="row">
                                          <th
                                            className="sorting_disabled"
                                            rowSpan={1}
                                            colSpan={1}
                                            style={{ width: "0px" }}
                                          >
                                            From
                                          </th>
                                          <th
                                            className="sorting_disabled"
                                            rowSpan={1}
                                            colSpan={1}
                                            style={{ width: "0px" }}
                                          >
                                            To
                                          </th>
                                          <th
                                            className="sorting_disabled"
                                            rowSpan={1}
                                            colSpan={1}
                                            style={{ width: "0px" }}
                                          >
                                            Charge
                                          </th>
                                          <th
                                            className="sorting_disabled"
                                            rowSpan={1}
                                            colSpan={1}
                                            style={{ width: "0px" }}
                                          >
                                            Action
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody id="cancellation_listing">
                                        <tr className="odd">
                                          <td
                                            valign="top"
                                            colSpan={4}
                                            className="dataTables_empty"
                                          >
                                            No data available in table
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-6">
                                    <div
                                      className="dataTables_info"
                                      id="cancellation_table1_info"
                                      role="status"
                                      aria-live="polite"
                                    >
                                      Showing 0 to 0 of 0 entries
                                    </div>
                                  </div>
                                  <div className="col-sm-6" />
                                </div>
                              </div>
                            </div>
                            <br />
                            <div className="row">
                              <div className="form-group col-md-12">
                                <button
                                  type="button"
                                  name="continue"
                                  id="button"
                                  onclick="add_policy()"
                                  value="continue"
                                  className="btn btn-dark btn-sm form-group"
                                >
                                  Continue&nbsp;
                                  <i className="fa fa-arrow-right" />
                                </button>
                                &nbsp;
                                <button
                                  type="button"
                                  name="save_as_drafts_cancellation_btn"
                                  id="save_as_drafts_cancellation_btn"
                                  value="save_as_draft"
                                  className="btn btn-dark btn-sm form-group"
                                  onclick="save_as_drafts_cancellation()"
                                >
                                  <i className="fa fa-floppy-o" />
                                  &nbsp;Save as Draft
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="tab-pane" id="6a">
                        <form
                          id="terms_policies_form"
                          name="terms_policies_form"
                          className="ng-pristine ng-valid"
                        >
                          <div className="row">
                            <br />
                            <div className="col-md-12">
                              <div
                                className="pull-right"
                                id="term_policy_lang"
                              />
                            </div>
                          </div>
                          {/* Cancellation */}
                          <div className="form-group">
                            <h4>Terms Policies</h4>
                          </div>
                          <hr className="mr_bt" />
                          <div className="row">
                            <div className="form-group col-md-12">
                              <label style={{ visibility: "hidden" }}>
                                Cancellation Policy
                              </label>
                              <div>
                                <textarea id="tiny2" defaultValue={""} />
                              </div>
                            </div>
                          </div>
                          {/* Cancellation */}
                          {/* Important Notes */}
                          <div className="form-group">
                            <h4>Important Notes</h4>
                          </div>
                          <hr className="mr_bt" />
                          <div className="row">
                            <div className="form-group col-md-12">
                              <label style={{ visibility: "hidden" }}>
                                Important Notes
                              </label>
                              <div>
                                <textarea id="tiny3" defaultValue={""} />
                              </div>
                            </div>
                          </div>
                          {/* Important Notes */}
                          {/* Important Notes */}
                          <div className="form-group">
                            <h4>Other Terms &amp; Conditions</h4>
                          </div>
                          <hr className="mr_bt" />
                          <div className="row">
                            <div className="form-group col-md-12">
                              <label style={{ visibility: "hidden" }}>
                                Other Terms &amp; Conditions
                              </label>
                              <div>
                                <textarea id="tiny4" defaultValue={""} />
                              </div>
                            </div>
                          </div>
                          {/* Important Notes */}
                          <br />
                          <div className="row">
                            <div className="col-md-12">
                              <button
                                type="button"
                                name="continue"
                                id="button"
                                onclick="update_term_policy()"
                                value="continue"
                                className="btn btn-dark btn-sm form-group"
                              >
                                Continue&nbsp;
                                <i className="fa fa-arrow-right" />
                              </button>
                              &nbsp;
                              <button
                                type="button"
                                name="save_as_drafts_term_btn"
                                id="save_as_drafts_term_btn"
                                value="save_as_draft"
                                className="btn btn-dark btn-sm form-group"
                                onclick="save_as_drafts_term()"
                              >
                                <i className="fa fa-floppy-o" />
                                &nbsp;Save as Draft
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                      <div className="tab-pane" id="7a">
                        <form
                          className="inclusion_exclusion_data ng-pristine ng-valid"
                          id="inclusion_exclusion_data"
                        >
                          <div className="row">
                            <br />
                            <div className="col-md-12">
                              <div className="pull-right packages_selected_lang" />
                            </div>
                          </div>
                          {/* Cancellation */}
                          <div className="form-group">
                            <h3>Inclusions</h3>
                          </div>
                          <hr />
                          {/* Inclusions */}
                          <div className="row">
                            <div className="form-group col-md-12">
                              <h4>Insurance</h4>
                              <div>
                                <textarea id="tiny5" defaultValue={""} />
                              </div>
                            </div>
                            <div className="form-group col-md-12">
                              <h4>Tour Guide</h4>
                              <div>
                                <textarea id="tiny6" defaultValue={""} />
                              </div>
                            </div>
                            <div className="form-group col-md-12">
                              <div className="row">
                                <div className="col-md-3 form-group">
                                  <h4>Preset Inclusions</h4>
                                  <select
                                    data-live-search="true"
                                    className="selectpicker form-control form-control-sm multiple  bs-select-hidden"
                                    multiple
                                    name="inclusion_list[]"
                                    id="inclusion_list"
                                    data-actions-box="true"
                                  >
                                    <option value>Select</option>
                                  </select>
                                </div>
                              </div>
                              <button
                                type="button"
                                name="add"
                                id="button"
                                value="Add"
                                className="btn btn-dark btn-sm form-group"
                                data-target="#inModal"
                                data-toggle="modal"
                              >
                                <i className="fa fa-plus" />
                                &nbsp;Add Preset inclusions
                              </button>
                            </div>
                            <div className="container"></div>
                            <div className="form-group col-md-12">
                              <h4>Other Inclusions</h4>
                              <div>
                                <textarea id="tiny7" defaultValue={""} />
                              </div>
                            </div>
                          </div>
                          <div className="form-group">
                            <h3>Exclusions</h3>
                          </div>
                          <hr />
                          {/* Inclusions */}
                          {/* Exclusions */}
                          <div className="row">
                            <div className="form-group col-md-12">
                              <h4>Tour Guide</h4>
                              <div>
                                <textarea id="tiny8" defaultValue={""} />
                              </div>
                            </div>
                            <div className="form-group col-md-12">
                              <h4>Tips and Porterage</h4>
                              <div>
                                <textarea id="tiny9" defaultValue={""} />
                              </div>
                            </div>
                            <div className="form-group col-md-12">
                              <div className="row">
                                <div className="col-md-3 form-group">
                                  <h4>Preset Exclusions</h4>
                                  <select
                                    data-live-search="true"
                                    className="selectpicker form-control form-control-sm multiple   bs-select-hidden"
                                    multiple
                                    name="exclusion_list[]"
                                    id="exclusion_list"
                                    data-actions-box="true"
                                  >
                                    <option value>Select</option>
                                  </select>
                                </div>
                              </div>
                              <button
                                type="button"
                                name="add"
                                id="button"
                                value="Add"
                                className="btn btn-dark btn-sm form-group"
                                data-target="#exModal"
                                data-toggle="modal"
                              >
                                <i className="fa fa-plus" />
                                &nbsp;Add Preset exclusions
                              </button>
                            </div>
                            <div className="container"></div>
                            <div className="form-group col-md-12">
                              <h4>Other Exclusions</h4>
                              <div>
                                <textarea id="tiny10" defaultValue={""} />
                              </div>
                            </div>
                          </div>
                          {/* Exclusions */}
                        </form>
                        <br />
                        <div className="row">
                          <div className="col-md-12">
                            <button
                              type="button"
                              name="continue"
                              id="button"
                              onclick="update_inclusion_exclusion()"
                              value="continue"
                              className="btn btn-dark btn-sm form-group"
                            >
                              <i className="fa fa-floppy-o" />
                              &nbsp;Save
                            </button>
                            &nbsp;
                          </div>
                        </div>
                      </div>
                      <div className="tab-pane" id="8a">
                        <br />
                        <div className="row">
                          <div className="col-md-12">
                            <div className="pull-right packages_selected_lang" />
                          </div>
                        </div>
                        <div className="form-group">
                          <h4>Reviews</h4>
                        </div>
                        <hr />
                        <form
                          name="add_review_form"
                          id="add_review_form"
                          className="ng-pristine ng-valid"
                        >
                          <div className="row">
                            <div className="form-group col-md-3">
                              <label>Name</label>
                              <input
                                type="text"
                                name="review_cust_name"
                                id="review_cust_name"
                                className="form-control review_required required"
                              />
                            </div>
                            <div className="form-group col-md-3">
                              <label>Nationality</label>
                              <select
                                data-live-search="true"
                                name="select_nationality_review"
                                id="select_nationality_review"
                                className="show-menu-arrow form-control review_required required"
                              >
                                <option value>Select Nationality</option>
                              </select>
                            </div>
                          </div>
                          <div className="row">
                            <div className="form-group col-md-3">
                              <label>Package Date</label>
                              <div
                                className="input-group date col-md-12 col-sm-12 col-xs-12"
                                id="period_date4"
                              >
                                <input
                                  id="datepicker1"
                                  name="review_date"
                                  className="review_required form-control review_date required"
                                  type="text"
                                />{" "}
                                <span className="input-group-addon">
                                  <i className="fa fa-th" />
                                </span>
                              </div>
                            </div>
                            <div className="form-group col-md-3">
                              <label>Ratings</label>
                              <div className="star_rating" id="star_rating">
                                <div className="jr-ratenode jr-nomal" />
                                <div className="jr-ratenode jr-nomal " />
                                <div className="jr-ratenode jr-nomal " />
                                <div className="jr-ratenode jr-nomal " />
                                <div className="jr-ratenode jr-nomal " />
                                <input
                                  type="hidden"
                                  name="rating"
                                  id="rating"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-12">
                              <label>Reviews</label>
                              <div>
                                <textarea id="tiny11" defaultValue={""} />
                              </div>
                            </div>
                          </div>
                          <br />
                          <div className="row">
                            <div className="form-group col-md-3">
                              <label>Image</label>
                              <span className="uniqFile input-group">
                                <span className="input-group-addon fa fa-upload myInputFile">
                                  <input
                                    type="file"
                                    id="review_img"
                                    name="review_img"
                                    size={40}
                                  />
                                </span>
                              </span>
                              <img
                                src="project_folder/tdonline/uploads/package_images/"
                                id="show_review_image"
                                width={50}
                                height={50}
                                alt="cri"
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="form-group col-md-12">
                              <br />
                              <button
                                type="button"
                                name="add"
                                id="review_button"
                                onclick="update_review()"
                                value="Update"
                                className="btn btn-dark btn-sm form-group"
                              >
                                <i className="fa fa-plus" />
                                &nbsp;Update
                              </button>
                            </div>
                          </div>
                        </form>
                        <div className="panel-body removeMargins">
                          <table
                            id="reviews_table"
                            className="table   table-responsive"
                          >
                            <thead>
                              <tr>
                                <th>
                                  <div className="checkbox checkbox-success checkbox-inline">
                                    <input
                                      id="single"
                                      type="checkbox"
                                      name="occupancy"
                                    />
                                    <label htmlFor="single">&nbsp;</label>
                                  </div>
                                </th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Nationality</th>
                                <th>Tour Date</th>
                                <th>Rating</th>
                                <th>Review</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody id="reviews_table_body"></tbody>
                          </table>
                          <br />
                          <br />
                          <div className="form-group"></div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Dates & Prices */}

                  {tab.id === "subtab4" && (
                    <div>
                      <div className="row form-group">
                        <div className="col-md-12">
                          <h4>{tab.label}</h4>
                        </div>
                      </div>
                      <form
                        method="post"
                        name="date_price_form"
                        id="date_price_form"
                        className="ng-pristine ng-valid"
                      >
                        <hr />

                        <br />
                        {/* <div id="exTab1" style="display:block; padding:0px 20px;" ng-init='parentIndex=$index' ng-repeat='response in dateprice_resp'>	 */}
                        <div
                          className="panel-group"
                          id="accordion1"
                          role="tablist"
                          aria-multiselectable="true"
                        >
                          {/* ngRepeat: response in datepriceresp */}
                        </div>
                      </form>
                    </div>
                  )}

                  {/* Cancellation Policy */}

                  {tab.id === "subtab5" && (
                    <div>
                      <div className="row form-group">
                        <div className="col-md-12">
                          <h4>{tab.label}</h4>
                        </div>
                      </div>
                      <div className="tab-content panel-body clearfix removeMargins">
                        <div
                          className="tab-pane ng-scope"
                          id="1a"
                          ng-controller="essentialInfoController"
                        >
                          <form
                            id="package_info"
                            name="package_info"
                            className="ng-pristine ng-valid"
                          >
                            <input
                              type="hidden"
                              name="insert"
                              defaultValue="insert"
                            />
                            <input
                              type="hidden"
                              name="tags_data"
                              id="tags_data"
                            />
                            <input
                              type="hidden"
                              name="destinations"
                              id="destinations"
                            />
                            <div className="row form-group">
                              <div className="col-md-12">
                                <h4>Essential Information</h4>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-12">
                                <table
                                  width="100%"
                                  cellPadding={2}
                                  cellSpacing={1}
                                  align="center"
                                  border={0}
                                  className="table  table-responsive table-box tableborder"
                                >
                                  <tbody className="bg-white">
                                    <tr>
                                      <td width="25%" align="left">
                                        <b>Package Code</b>
                                      </td>
                                      <td width="25%">
                                        <div
                                          id="package_code"
                                          ng-bind="packageArrObj.code"
                                          className="ng-binding"
                                        >
                                          938523
                                        </div>
                                      </td>
                                      <td width="25%" align="left">
                                        <b>Type</b>
                                      </td>
                                      <td width="25%">
                                        <div
                                          id="type"
                                          ng-bind="packageArrObj.type"
                                          className="ng-binding"
                                        >
                                          semi-dynamic
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td width="25%" align="left">
                                        <b>Sub Type</b>
                                      </td>
                                      <td width="25%">
                                        <div
                                          id="sub_type"
                                          ng-bind="packageArrObj.sub_type"
                                          className="ng-binding"
                                        >
                                          inbound
                                        </div>
                                      </td>
                                      <td width="25%" align="left">
                                        <b>Services Included</b>
                                      </td>
                                      <td width="25%">
                                        <div id="services">
                                          Hotel
                                          <br />
                                          Activity
                                          <br />
                                          Transfer
                                          <br />
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td width="25%" align="left">
                                        <b>Category Theme</b>
                                      </td>
                                      <td width="25%">
                                        <div id="theme">
                                          Mumbai Dhamaal
                                          <br />
                                          Adventure
                                          <br />
                                          Family
                                          <br />
                                          Historical
                                          <br />
                                        </div>
                                      </td>
                                      <td width="25%" align="left">
                                        <b>Physical Level</b>
                                      </td>
                                      <td width="25%">
                                        <div id="physical_level">
                                          ggd
                                          <br />
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td width="25%" align="left">
                                        <b>Tags</b>
                                      </td>
                                      <td width="25%">
                                        <div id="tags_suggest_box">
                                          {/* ngRepeat: tags in tagsArrObj track by $index */}
                                          {/* ngIf: tagsArrObj.length==0 */}
                                          <p
                                            className="tags ng-scope"
                                            ng-if="tagsArrObj.length==0"
                                          >
                                            -
                                          </p>
                                          {/* end ngIf: tagsArrObj.length==0 */}
                                        </div>
                                      </td>
                                      <td width="25%" align="left">
                                        <b>Age Group</b>
                                      </td>
                                      <td width="25%">
                                        {/* ngIf: age.age=="group" */}
                                        {/* ngIf: age.age!="group" */}
                                        <div
                                          ng-if='age.age!="group"'
                                          className="ng-scope"
                                        >
                                          <div
                                            ng-bind="age.age"
                                            className="ng-binding"
                                          >
                                            all
                                          </div>
                                        </div>
                                        {/* end ngIf: age.age!="group" */}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td width="25%" align="left">
                                        <b>No. of Days</b>
                                      </td>
                                      <td width="25%">
                                        <div
                                          id="days"
                                          ng-bind="packageArrObj.days"
                                          className="ng-binding"
                                        >
                                          1
                                        </div>
                                      </td>
                                      <td width="25%" align="left">
                                        <b>Package Type</b>
                                      </td>
                                      <td width="25%">
                                        <div
                                          id="package_type"
                                          ng-bind="packageArrObj.package_type"
                                          className="ng-binding"
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td width="25%" align="left">
                                        <b>Min Adult</b>
                                      </td>
                                      <td width="25%">
                                        <div
                                          ng-bind="packageArrObj.min_adult"
                                          className="ng-binding"
                                        >
                                          1
                                        </div>
                                      </td>
                                      <td width="25%" align="left">
                                        <b>Max Adult</b>
                                      </td>
                                      <td width="25%">
                                        <div
                                          ng-bind="packageArrObj.max_adult"
                                          className="ng-binding"
                                        >
                                          10
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td width="25%" align="left">
                                        <b>Min Child</b>
                                      </td>
                                      <td width="25%">
                                        <div
                                          ng-bind="packageArrObj.min_child"
                                          className="ng-binding"
                                        >
                                          0
                                        </div>
                                      </td>
                                      <td width="25%" align="left">
                                        <b>Max Child</b>
                                      </td>
                                      <td width="25%">
                                        <div
                                          ng-bind="packageArrObj.max_child"
                                          className="ng-binding"
                                        >
                                          0
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                            <div className="row form-group">
                              <div className="col-md-12">
                                <h4>Destinations</h4>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-12">
                                <div className="dataTables_scroll">
                                  <table
                                    id="visa_requirements_table"
                                    className="table   table-responsive"
                                  >
                                    <thead>
                                      <tr className="bg-primary">
                                        <th>Country</th>
                                        <th>City</th>
                                        <th>Visa Included</th>
                                        <th>Show Visa Requirements</th>
                                      </tr>
                                    </thead>
                                    <tbody id="visa_requirements_tr">
                                      {/* ngRepeat: cityInfo in destinationArrObj */}
                                      <tr
                                        className="dest ng-scope"
                                        ng-repeat="cityInfo in destinationArrObj"
                                      >
                                        <td
                                          className="country_id ng-binding"
                                          id={106}
                                        >
                                          India
                                        </td>
                                        <td
                                          className="city_id ng-binding"
                                          id={64440}
                                        >
                                          Mumbai
                                        </td>
                                        <td id="no" className="ng-binding">
                                          no
                                        </td>
                                        <td id className="ng-binding">
                                          no
                                        </td>
                                      </tr>
                                      {/* end ngRepeat: cityInfo in destinationArrObj */}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                        <div className="tab-pane" id="2a">
                          <input
                            type="hidden"
                            name="img_location"
                            id="img_location"
                            defaultValue="project_folder/tdonline/uploads/package_images/"
                          />
                          <form
                            id="package_details_info"
                            name="package_details_info"
                            className="ng-pristine ng-valid"
                          >
                            <div className="form-group">
                              <h4>Package Details</h4>
                            </div>
                            <div className="row">
                              <div className="col-md-12">
                                <table
                                  width="100%"
                                  cellPadding={2}
                                  cellSpacing={1}
                                  align="center"
                                  border={0}
                                  className="table  table-responsive table-box tableborder"
                                >
                                  <tbody className="bg-white">
                                    <tr>
                                      <td width="25%" align="left">
                                        <b>Package Code</b>
                                      </td>
                                      <td width="25%">
                                        <div className="pull-left pack_code">
                                          938523
                                        </div>
                                        {/* <div class="pull-right packages_selected_lang"></div> */}
                                      </td>
                                      <td width="25%" align="left">
                                        <b>Name</b>
                                      </td>
                                      <td width="25%">
                                        <div
                                          name="package_name"
                                          id="package_name"
                                        >
                                          fgffg
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td width="25%" align="left">
                                        <b>Short Description</b>
                                      </td>
                                      <td width="25%">
                                        <div
                                          name="short_description"
                                          id="short_description"
                                        >
                                          <p>gfggfg</p>
                                          <p></p>
                                          <p>&nbsp;</p>
                                          <p />
                                        </div>
                                      </td>
                                      <td width="25%" align="left">
                                        <b>Long Description</b>
                                      </td>
                                      <td width="25%">
                                        <div
                                          name="long_description"
                                          id="long_description"
                                        >
                                          <p>sdsds</p>
                                          <p></p>
                                          <p>&nbsp;</p>
                                          <p />
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td width="25%" align="left">
                                        <b>Useful Information</b>
                                      </td>
                                      <td width="25%">
                                        <div id="useful_info" />
                                      </td>
                                      <td width="25%" align="left"></td>
                                      <td width="25%"></td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                            <div
                              className="panel-body-essen"
                              style={{ display: "none" }}
                            >
                              <div className="form-group">
                                <h4>Gallery Image</h4>
                              </div>
                              <div className="row" id="destination_block">
                                <div className="col-md-12">
                                  <div className>
                                    <div className="form-group">
                                      <h4>Mumbai</h4>
                                    </div>
                                    <div className="searchable-container">
                                      <div className="items">
                                        <div className="info-block block-info clearfix">
                                          <div
                                            data-toggle="buttons"
                                            className="btn-group bizmoduleselect"
                                            id="img_list_dest64440"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                        <div className="tab-pane" id="3a">
                          <div className="form-group">
                            <h4>Itinerary</h4>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-md-6">
                              <div className="pull-left">
                                <h6 className="pack_code">938523</h6>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="pull-right packages_selected_lang"></div>
                            </div>
                          </div>
                          <br />
                          <div
                            className="panel-group"
                            id="accordion"
                            role="tablist"
                            aria-multiselectable="true"
                          >
                            {/* ngRepeat: (key,value) in itinerary_resp */}
                            <div
                              className="panel panel-default ng-scope"
                              ng-init="dayIndex=$index"
                              ng-repeat="(key,value) in itinerary_resp"
                            >
                              <div
                                className="panel-heading"
                                role="tab"
                                id="heading1"
                                data-toggle="collapse"
                                data-parent="#accordion"
                                data-target="#collapse1"
                                aria-expanded="true"
                                aria-controls="collapseOne"
                              >
                                <h4 className="panel-title">
                                  <Link
                                    role="button"
                                    data-toggle="collapse"
                                    data-parent="#accordion"
                                    to="#collapse1"
                                    aria-expanded="true"
                                    aria-controls="collapse1"
                                    className="ng-binding"
                                  >
                                    Day 1
                                  </Link>
                                </h4>
                              </div>
                              <div
                                id="collapse1"
                                className="panel-collapse collapse in"
                                role="tabpanel"
                                aria-labelledby="heading1"
                              >
                                <form
                                  name="itinerary_form1"
                                  id="itinerary_form1"
                                  className="ng-pristine ng-valid"
                                >
                                  <div
                                    className="panel-body noMargin removeMargins"
                                    style={{ marginBottom: "0px" }}
                                  >
                                    <div className="row">
                                      <div className="col-md-12">
                                        <table
                                          width="100%"
                                          cellPadding={2}
                                          cellSpacing={1}
                                          align="center"
                                          border={0}
                                          className="table  table-responsive table-box tableborder"
                                        >
                                          <tbody className="bg-white">
                                            <tr>
                                              <td width="25%" align="left">
                                                <b>Destination</b>
                                              </td>
                                              <td width="25%">
                                                {/* ngRepeat: destination in value.Destinations */}
                                              </td>
                                              <td width="25%" align="left"></td>
                                              <td width="25%"></td>
                                            </tr>
                                            <tr>
                                              <td width="25%" align="left">
                                                <b>Start Meeting Point</b>
                                              </td>
                                              <td width="25%">
                                                <label
                                                  ng-bind="ifNoData(value.start_point)"
                                                  className="ng-binding"
                                                >
                                                  24by7
                                                </label>
                                              </td>
                                              <td width="25%" align="left">
                                                <b>Start Point Address</b>
                                              </td>
                                              <td width="25%">
                                                <label
                                                  ng-bind="ifNoData(value.meeting_details)"
                                                  className="ng-binding"
                                                >
                                                  hotel
                                                </label>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td width="25%" align="left">
                                                <b>End Meeting Point</b>
                                              </td>
                                              <td width="25%">
                                                <label
                                                  ng-bind="ifNoData(value.end_point)"
                                                  className="ng-binding"
                                                >
                                                  24by7
                                                </label>
                                              </td>
                                              <td width="25%" align="left">
                                                <b>End Point Address</b>
                                              </td>
                                              <td width="25%">
                                                <label
                                                  ng-bind="ifNoData(value.end_meeting_details)"
                                                  className="ng-binding"
                                                >
                                                  hotel
                                                </label>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td width="25%" align="left">
                                                <b>Day Description</b>
                                              </td>
                                              <td width="25%" colSpan={3}>
                                                <label
                                                  ng-bind="ifNoData(value.day_description)"
                                                  className="ng-binding"
                                                >
                                                  Day1
                                                </label>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td width="25%" align="left">
                                                <b>Stay in</b>
                                              </td>
                                              <td width="25%">
                                                <label
                                                  ng-bind="ifNoData(value.hotels.stay_in_name)"
                                                  className="ng-binding"
                                                >
                                                  -
                                                </label>
                                              </td>
                                              <td width="25%" align="left">
                                                <b>
                                                  Accomodation{" "}
                                                  {/* ngIf: value.hotels.length>0 || value.hotels!="" */}
                                                  <span
                                                    ng-if='value.hotels.length>0 || value.hotels!=""'
                                                    className="ng-scope"
                                                  >
                                                    [Fixed Hotels]{" "}
                                                  </span>
                                                  {/* end ngIf: value.hotels.length>0 || value.hotels!="" */}
                                                </b>
                                                {/* ngIf: value.hotels.length==0 || value.hotels=="" */}
                                              </td>
                                              <td width="25%">
                                                <div className="row all_acc_div1  fixed_hotel_div1">
                                                  {/* ngIf: value.hotels.all_ratings!="" */}
                                                  <div
                                                    className="row ng-scope"
                                                    ng-if='value.hotels.all_ratings!=""'
                                                  >
                                                    <div className="col-md-12">
                                                      <div className="col-md-10">
                                                        <b>
                                                          Hotel Ratings{" "}
                                                          {/* ngIf: value.hotels.all_ratings!="N" */}
                                                          <span
                                                            ng-if='value.hotels.all_ratings!="N"'
                                                            className="ng-scope"
                                                          >
                                                            (All rating hotels
                                                            has been included){" "}
                                                          </span>
                                                          {/* end ngIf: value.hotels.all_ratings!="N" */}
                                                        </b>{" "}
                                                        <br />
                                                        {/* ngIf: value.hotels.all_ratings!="N" */}
                                                        <span
                                                          ng-if='value.hotels.all_ratings!="N"'
                                                          ng-bind="removeAbbr(value.hotels.all_ratings)"
                                                          className="ng-binding ng-scope"
                                                        />
                                                        {/* end ngIf: value.hotels.all_ratings!="N" */}
                                                        {/* ngIf: value.hotels.all_ratings=="N" */}
                                                      </div>
                                                    </div>
                                                  </div>
                                                  {/* end ngIf: value.hotels.all_ratings!="" */}{" "}
                                                  <br />
                                                  <div className="row">
                                                    <div className="col-md-12">
                                                      <div className="col-md-10">
                                                        <b>Multiple Hotels</b>{" "}
                                                        <br />
                                                        {/* ngRepeat: hotel_name in getArray(value.hotels.hotel_name) */}
                                                        <div
                                                          ng-init="hotelCnt=$index"
                                                          ng-repeat="hotel_name in getArray(value.hotels.hotel_name)"
                                                          className="ng-binding ng-scope"
                                                        >
                                                          1 ]{" "}
                                                          <span
                                                            ng-bind="ifNoData(hotel_name)"
                                                            className="ng-binding"
                                                          >
                                                            -
                                                          </span>
                                                        </div>
                                                        {/* end ngRepeat: hotel_name in getArray(value.hotels.hotel_name) */}
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td width="25%" align="left">
                                                <b>Stay in</b>
                                              </td>
                                              <td width="25%" colSpan={3}>
                                                <label
                                                  ng-bind="ifNoData(value.hotels.stay_in_name)"
                                                  className="ng-binding"
                                                >
                                                  -
                                                </label>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td width="25%" align="left">
                                                <b>Supplier</b>
                                              </td>
                                              <td width="25%">
                                                {/* ngIf: value.hotels.length==0 || value.hotels=="" */}
                                                {/* ngIf: value.hotels.length>0 || value.hotels!="" */}
                                                <span
                                                  className="row all_acc_div1  fixed_hotel_div1"
                                                  ng-if='value.hotels.length>0 || value.hotels!=""'
                                                >
                                                  {/* ngIf: value.hotels.suppliername */}
                                                  {/* ngIf: !value.hotels.suppliername */}
                                                  <span
                                                    ng-if="!value.hotels.suppliername"
                                                    className="ng-scope"
                                                  >
                                                    {" "}
                                                    -{" "}
                                                  </span>
                                                  {/* end ngIf: !value.hotels.suppliername */}
                                                </span>
                                                {/* end ngIf: value.hotels.length>0 || value.hotels!="" */}
                                              </td>
                                              <td width="25%" align="left">
                                                <b>Accomodation</b>
                                              </td>
                                              <td width="25%">
                                                {/* ngIf: value.hotels.length==0 || value.hotels=="" */}
                                                {/* ngIf: value.hotels.length>0 || value.hotels!="" */}
                                                <span
                                                  className="row all_acc_div1  fixed_hotel_div1"
                                                  ng-if='value.hotels.length>0 || value.hotels!=""'
                                                >
                                                  {/* ngIf: value.hotels.hotel_name */}
                                                  {/* ngIf: !value.hotels.hotel_name */}
                                                  <span
                                                    ng-if="!value.hotels.hotel_name"
                                                    className="ng-scope"
                                                  >
                                                    {" "}
                                                    -{" "}
                                                  </span>
                                                  {/* end ngIf: !value.hotels.hotel_name */}
                                                </span>
                                                {/* end ngIf: value.hotels.length>0 || value.hotels!="" */}
                                              </td>
                                            </tr>
                                            <tr>
                                              <td width="25%" align="left">
                                                <b>Inventory Room</b>
                                              </td>
                                              <td width="25%">
                                                <label
                                                  ng-bind="ifNoData(value.hotels.inventory_room_class)"
                                                  className="ng-binding"
                                                >
                                                  -
                                                </label>
                                              </td>
                                              <td width="25%" align="left">
                                                <b>Room Basis</b>
                                              </td>
                                              <td width="25%">
                                                <label
                                                  ng-bind="ifNoData(value.hotels.room_basis)"
                                                  className="ng-binding"
                                                >
                                                  -
                                                </label>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                    {/* ngRepeat: destination in value.Destinations */}
                                  </div>
                                </form>
                              </div>
                            </div>
                            {/* end ngRepeat: (key,value) in itinerary_resp */}
                          </div>
                        </div>
                        <div
                          className="tab-pane ng-scope"
                          id="4a"
                          ng-controller="datepriceController"
                        >
                          <form
                            method="post"
                            name="date_price_form"
                            id="date_price_form"
                            className="ng-pristine ng-valid"
                          >
                            <div className="form-group">
                              <h4>Dates and Price</h4>
                            </div>
                            <hr />
                            {/* <div class="row">
                                      <div class="col-md-12">
                                          <div class="radio radio-success radio-inline">
                                              <input id="open_dates" type='radio' name='dates_and_price' value='open' checked="checked" class="date_price_required">
                                              <label for="open_dates">Open Dates</label>
                                          </div>
                                          <div class="radio radio-success radio-inline">
                                              <input id="serious_departure" type='radio' name='dates_and_price' value='series' class="date_price_required">
                                              <label for="serious_departure">Series Departure</label>
                                          </div>
                                      </div>
                                  </div> */}
                            <br />
                            {/* <div id="exTab1" style="display:block; padding:0px 20px;" ng-init='parentIndex=$index' ng-repeat='response in dateprice_resp'>	 */}
                            <div
                              className="panel-group"
                              id="accordion1"
                              role="tablist"
                              aria-multiselectable="true"
                            >
                              {/* ngRepeat: response in datepriceresp */}
                            </div>
                            {/* <div class="tab-pane" id="2a_date">
                  
                                  </div> */}
                          </form>
                        </div>
                        <div className="tab-pane active" id="5a">
                          <div className="form-group">
                            <h4>Cancellation Policy</h4>
                          </div>
                          <form
                            name="add_cancellaltion_policy"
                            id="add_cancellaltion_policy"
                            className="ng-pristine ng-valid"
                          >
                            <div className="policy">
                              <div id="can_policy" />
                            </div>
                          </form>
                        </div>
                        <div className="tab-pane" id="6a">
                          <form
                            id="terms_policies_form"
                            name="terms_policies_form"
                            className="ng-pristine ng-valid"
                          >
                            <div className="row">
                              <br />
                              <div className="col-md-12">
                                <div
                                  className="pull-right"
                                  id="term_policy_lang"
                                ></div>
                              </div>
                            </div>
                            {/* Cancellation */}
                            <div className="form-group">
                              <h4>Cancellation Policy</h4>
                            </div>
                            <hr className="mr_bt" />
                            <div className="row">
                              <div className="form-group col-md-12">
                                <label style={{ visibility: "hidden" }}>
                                  Cancellation Policy
                                </label>
                                <div name="cancellation" id="cancellation" />
                              </div>
                            </div>
                            {/* Cancellation */}
                            {/* Important Notes */}
                            <div className="form-group">
                              <h4>Important Notes</h4>
                            </div>
                            <hr className="mr_bt" />
                            <div className="row">
                              <div className="form-group col-md-12">
                                <label style={{ visibility: "hidden" }}>
                                  Important Notes
                                </label>
                                <div
                                  name="important_notes"
                                  id="important_notes"
                                />
                              </div>
                            </div>
                            {/* Important Notes */}
                            {/* Important Notes */}
                            <div className="form-group">
                              <h4>Other Terms &amp; Conditions</h4>
                            </div>
                            <hr className="mr_bt" />
                            <div className="row">
                              <div className="form-group col-md-12">
                                <label style={{ visibility: "hidden" }}>
                                  {" "}
                                  Other Terms &amp; Conditions
                                </label>
                                <div
                                  name="other_terms_conditions"
                                  id="other_terms_conditions"
                                />
                              </div>
                            </div>
                            {/* Important Notes */}
                            <br />
                          </form>
                        </div>
                        <div className="tab-pane" id="7a">
                          <form
                            className="inclusion_exclusion_data ng-pristine ng-valid"
                            id="inclusion_exclusion_data"
                          >
                            <div className="row">
                              <div className="form-group col-md-12">
                                <h4
                                  style={{
                                    backgroundColor: "#FF5015",
                                    padding: "10px 20px",
                                    color: "#FFF",
                                  }}
                                >
                                  Inclusions
                                </h4>
                              </div>
                            </div>
                            {/* Inclusions */}
                            <div className="row">
                              <div className="form-group col-md-3">
                                <label>Insurance</label>
                                <div name="insurance" id="insurance" />
                              </div>
                              <div className="form-group col-md-3">
                                <label>Tour Guide</label>
                                <div name="tour_guide" id="tour_guide" />
                              </div>
                              <div className="form-group col-md-3">
                                <label>Preset Inclusions</label>
                                <div
                                  name="inclusion_list"
                                  id="inclusion_list"
                                />
                              </div>
                              <div className="form-group col-md-3">
                                <label>Other Inclusions</label>
                                <div
                                  name="other_inclusions"
                                  id="other_inclusions"
                                />
                              </div>
                            </div>
                            <hr />
                            {/* Inclusions */}
                            {/* Exclusions */}
                            <div className="row">
                              <div className="form-group col-md-12">
                                <h4
                                  style={{
                                    backgroundColor: "#FF5015",
                                    padding: "10px 20px",
                                    color: "#FFF",
                                  }}
                                >
                                  Exclusions
                                </h4>
                              </div>
                            </div>
                            <div className="row">
                              <div className="form-group col-md-3">
                                <label>Tour Guide</label>
                                <div
                                  name="tour_guide_exclusion"
                                  id="tour_guide_exclusion"
                                />
                              </div>
                              {/* <div class="form-group col-md-3">
                                              <label>Entrance Fees</label>
                                              <div name='entrance_fees' id="entrance_fees"></div>
                                          </div> */}
                              <div className="form-group col-md-3">
                                <label>Tips and Porterage</label>
                                <div
                                  name="tips_and_porterage"
                                  id="tips_and_porterage"
                                />
                              </div>
                              <div className="form-group col-md-3">
                                <label>Preset Exclusions</label>
                                <div
                                  name="exclusion_list"
                                  id="exclusion_list"
                                />
                              </div>
                              <div className="form-group col-md-3">
                                <label>Other Exclusions</label>
                                <div
                                  name="other_exclusions"
                                  id="other_exclusions"
                                />
                              </div>
                            </div>
                            {/* Exclusions */}
                          </form>
                        </div>
                        <div className="tab-pane" id="8a">
                          <br />
                          <div className="row">
                            <div className="col-md-12">
                              <div className="pull-right packages_selected_lang"></div>
                            </div>
                          </div>
                          <div className="form-group">
                            <h4>Reviews</h4>
                          </div>
                          <hr />
                          <form
                            name="add_review_form"
                            id="add_review_form"
                            className="ng-pristine ng-valid"
                          >
                            <div className="row">
                              <div className="form-group col-md-3">
                                <label>Name</label>
                                <input
                                  type="text"
                                  name="review_cust_name"
                                  id="review_cust_name"
                                  className="form-control review_required required"
                                />
                              </div>
                              <div className="form-group col-md-3">
                                <label>Nationality</label>
                                <select
                                  name="select_nationality_review"
                                  id="select_nationality_review"
                                  className="show-menu-arrow form-control review_required required"
                                >
                                  <option value>Select Nationality</option>
                                </select>
                              </div>
                            </div>
                            <div className="row">
                              <div className="form-group col-md-3">
                                <label>Package Date</label>
                                <div
                                  className="input-group date col-md-12 col-sm-12 col-xs-12"
                                  id="period_date4"
                                >
                                  <input
                                    id="datepicker1"
                                    name="review_date"
                                    className="review_required form-control review_date required"
                                    type="text"
                                  />
                                  <span className="input-group-addon">
                                    <i className="glyphicon glyphicon-th" />
                                  </span>
                                </div>
                              </div>
                              <div className="form-group col-md-3">
                                <label>Ratings</label>
                                <div className="star_rating" id="star_rating">
                                  <div className="jr-ratenode jr-nomal" />
                                  <div className="jr-ratenode jr-nomal " />
                                  <div className="jr-ratenode jr-nomal " />
                                  <div className="jr-ratenode jr-nomal " />
                                  <div className="jr-ratenode jr-nomal " />
                                  <input
                                    type="hidden"
                                    name="rating"
                                    id="rating"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-12">
                                <label>Reviews</label>
                                <div
                                  id="mceu_13"
                                  className="mce-tinymce mce-container mce-panel"
                                  hidefocus={1}
                                  tabIndex={-1}
                                  role="application"
                                  style={{
                                    visibility: "hidden",
                                    borderWidth: "1px",
                                  }}
                                >
                                  <div
                                    id="mceu_13-body"
                                    className="mce-container-body mce-stack-layout"
                                  >
                                    <div
                                      id="mceu_14"
                                      className="mce-container mce-menubar mce-toolbar mce-first mce-stack-layout-item"
                                      role="menubar"
                                      style={{ borderWidth: "0px 0px 1px" }}
                                    >
                                      <div
                                        id="mceu_14-body"
                                        className="mce-container-body mce-flow-layout"
                                      >
                                        <div
                                          id="mceu_15"
                                          className="mce-widget mce-btn mce-menubtn mce-first mce-flow-layout-item"
                                          tabIndex={-1}
                                          aria-labelledby="mceu_15"
                                          role="menuitem"
                                          aria-haspopup="true"
                                        >
                                          <button
                                            id="mceu_15-open"
                                            role="presentation"
                                            type="button"
                                            tabIndex={-1}
                                          >
                                            <span>File</span>{" "}
                                            <i className="mce-caret" />
                                          </button>
                                        </div>
                                        <div
                                          id="mceu_16"
                                          className="mce-widget mce-btn mce-menubtn mce-flow-layout-item"
                                          tabIndex={-1}
                                          aria-labelledby="mceu_16"
                                          role="menuitem"
                                          aria-haspopup="true"
                                        >
                                          <button
                                            id="mceu_16-open"
                                            role="presentation"
                                            type="button"
                                            tabIndex={-1}
                                          >
                                            <span>Edit</span>{" "}
                                            <i className="mce-caret" />
                                          </button>
                                        </div>
                                        <div
                                          id="mceu_17"
                                          className="mce-widget mce-btn mce-menubtn mce-flow-layout-item"
                                          tabIndex={-1}
                                          aria-labelledby="mceu_17"
                                          role="menuitem"
                                          aria-haspopup="true"
                                        >
                                          <button
                                            id="mceu_17-open"
                                            role="presentation"
                                            type="button"
                                            tabIndex={-1}
                                          >
                                            <span>View</span>{" "}
                                            <i className="mce-caret" />
                                          </button>
                                        </div>
                                        <div
                                          id="mceu_18"
                                          className="mce-widget mce-btn mce-menubtn mce-last mce-flow-layout-item"
                                          tabIndex={-1}
                                          aria-labelledby="mceu_18"
                                          role="menuitem"
                                          aria-haspopup="true"
                                        >
                                          <button
                                            id="mceu_18-open"
                                            role="presentation"
                                            type="button"
                                            tabIndex={-1}
                                          >
                                            <span>Format</span>{" "}
                                            <i className="mce-caret" />
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      id="mceu_19"
                                      className="mce-toolbar-grp mce-container mce-panel mce-stack-layout-item"
                                      hidefocus={1}
                                      tabIndex={-1}
                                      role="group"
                                    >
                                      <div
                                        id="mceu_19-body"
                                        className="mce-container-body mce-stack-layout"
                                      >
                                        <div
                                          id="mceu_20"
                                          className="mce-container mce-toolbar mce-first mce-last mce-stack-layout-item"
                                          role="toolbar"
                                        >
                                          <div
                                            id="mceu_20-body"
                                            className="mce-container-body mce-flow-layout"
                                          >
                                            <div
                                              id="mceu_21"
                                              className="mce-container mce-first mce-flow-layout-item mce-btn-group"
                                              role="group"
                                            >
                                              <div id="mceu_21-body">
                                                <div
                                                  id="mceu_0"
                                                  className="mce-widget mce-btn mce-first mce-disabled"
                                                  tabIndex={-1}
                                                  aria-labelledby="mceu_0"
                                                  role="button"
                                                  aria-label="Undo"
                                                  aria-disabled="true"
                                                >
                                                  <button
                                                    role="presentation"
                                                    type="button"
                                                    tabIndex={-1}
                                                  >
                                                    <i className="mce-ico mce-i-undo" />
                                                  </button>
                                                </div>
                                                <div
                                                  id="mceu_1"
                                                  className="mce-widget mce-btn mce-last mce-disabled"
                                                  tabIndex={-1}
                                                  aria-labelledby="mceu_1"
                                                  role="button"
                                                  aria-label="Redo"
                                                  aria-disabled="true"
                                                >
                                                  <button
                                                    role="presentation"
                                                    type="button"
                                                    tabIndex={-1}
                                                  >
                                                    <i className="mce-ico mce-i-redo" />
                                                  </button>
                                                </div>
                                              </div>
                                            </div>
                                            <div
                                              id="mceu_22"
                                              className="mce-container mce-flow-layout-item mce-btn-group"
                                              role="group"
                                            >
                                              <div id="mceu_22-body">
                                                <div
                                                  id="mceu_2"
                                                  className="mce-widget mce-btn mce-menubtn mce-first mce-last"
                                                  tabIndex={-1}
                                                  aria-labelledby="mceu_2"
                                                  role="button"
                                                  aria-haspopup="true"
                                                >
                                                  <button
                                                    id="mceu_2-open"
                                                    role="presentation"
                                                    type="button"
                                                    tabIndex={-1}
                                                  >
                                                    <span>Formats</span>{" "}
                                                    <i className="mce-caret" />
                                                  </button>
                                                </div>
                                              </div>
                                            </div>
                                            <div
                                              id="mceu_23"
                                              className="mce-container mce-flow-layout-item mce-btn-group"
                                              role="group"
                                            >
                                              <div id="mceu_23-body">
                                                <div
                                                  id="mceu_3"
                                                  className="mce-widget mce-btn mce-first"
                                                  tabIndex={-1}
                                                  aria-labelledby="mceu_3"
                                                  role="button"
                                                  aria-label="Bold"
                                                >
                                                  <button
                                                    role="presentation"
                                                    type="button"
                                                    tabIndex={-1}
                                                  >
                                                    <i className="mce-ico mce-i-bold" />
                                                  </button>
                                                </div>
                                                <div
                                                  id="mceu_4"
                                                  className="mce-widget mce-btn mce-last"
                                                  tabIndex={-1}
                                                  aria-labelledby="mceu_4"
                                                  role="button"
                                                  aria-label="Italic"
                                                >
                                                  <button
                                                    role="presentation"
                                                    type="button"
                                                    tabIndex={-1}
                                                  >
                                                    <i className="mce-ico mce-i-italic" />
                                                  </button>
                                                </div>
                                              </div>
                                            </div>
                                            <div
                                              id="mceu_24"
                                              className="mce-container mce-flow-layout-item mce-btn-group"
                                              role="group"
                                            >
                                              <div id="mceu_24-body">
                                                <div
                                                  id="mceu_5"
                                                  className="mce-widget mce-btn mce-first"
                                                  tabIndex={-1}
                                                  aria-labelledby="mceu_5"
                                                  role="button"
                                                  aria-label="Align left"
                                                >
                                                  <button
                                                    role="presentation"
                                                    type="button"
                                                    tabIndex={-1}
                                                  >
                                                    <i className="mce-ico mce-i-alignleft" />
                                                  </button>
                                                </div>
                                                <div
                                                  id="mceu_6"
                                                  className="mce-widget mce-btn"
                                                  tabIndex={-1}
                                                  aria-labelledby="mceu_6"
                                                  role="button"
                                                  aria-label="Align center"
                                                >
                                                  <button
                                                    role="presentation"
                                                    type="button"
                                                    tabIndex={-1}
                                                  >
                                                    <i className="mce-ico mce-i-aligncenter" />
                                                  </button>
                                                </div>
                                                <div
                                                  id="mceu_7"
                                                  className="mce-widget mce-btn"
                                                  tabIndex={-1}
                                                  aria-labelledby="mceu_7"
                                                  role="button"
                                                  aria-label="Align right"
                                                >
                                                  <button
                                                    role="presentation"
                                                    type="button"
                                                    tabIndex={-1}
                                                  >
                                                    <i className="mce-ico mce-i-alignright" />
                                                  </button>
                                                </div>
                                                <div
                                                  id="mceu_8"
                                                  className="mce-widget mce-btn mce-last"
                                                  tabIndex={-1}
                                                  aria-labelledby="mceu_8"
                                                  role="button"
                                                  aria-label="Justify"
                                                >
                                                  <button
                                                    role="presentation"
                                                    type="button"
                                                    tabIndex={-1}
                                                  >
                                                    <i className="mce-ico mce-i-alignjustify" />
                                                  </button>
                                                </div>
                                              </div>
                                            </div>
                                            <div
                                              id="mceu_25"
                                              className="mce-container mce-flow-layout-item mce-btn-group"
                                              role="group"
                                            >
                                              <div id="mceu_25-body">
                                                <div
                                                  id="mceu_9"
                                                  className="mce-widget mce-btn mce-first"
                                                  tabIndex={-1}
                                                  aria-labelledby="mceu_9"
                                                  role="button"
                                                  aria-label="Bullet list"
                                                >
                                                  <button
                                                    role="presentation"
                                                    type="button"
                                                    tabIndex={-1}
                                                  >
                                                    <i className="mce-ico mce-i-bullist" />
                                                  </button>
                                                </div>
                                                <div
                                                  id="mceu_10"
                                                  className="mce-widget mce-btn"
                                                  tabIndex={-1}
                                                  aria-labelledby="mceu_10"
                                                  role="button"
                                                  aria-label="Numbered list"
                                                >
                                                  <button
                                                    role="presentation"
                                                    type="button"
                                                    tabIndex={-1}
                                                  >
                                                    <i className="mce-ico mce-i-numlist" />
                                                  </button>
                                                </div>
                                                <div
                                                  id="mceu_11"
                                                  className="mce-widget mce-btn"
                                                  tabIndex={-1}
                                                  aria-labelledby="mceu_11"
                                                  role="button"
                                                  aria-label="Decrease indent"
                                                >
                                                  <button
                                                    role="presentation"
                                                    type="button"
                                                    tabIndex={-1}
                                                  >
                                                    <i className="mce-ico mce-i-outdent" />
                                                  </button>
                                                </div>
                                                <div
                                                  id="mceu_12"
                                                  className="mce-widget mce-btn mce-last"
                                                  tabIndex={-1}
                                                  aria-labelledby="mceu_12"
                                                  role="button"
                                                  aria-label="Increase indent"
                                                >
                                                  <button
                                                    role="presentation"
                                                    type="button"
                                                    tabIndex={-1}
                                                  >
                                                    <i className="mce-ico mce-i-indent" />
                                                  </button>
                                                </div>
                                              </div>
                                            </div>
                                            <div
                                              id="mceu_26"
                                              className="mce-container mce-last mce-flow-layout-item mce-btn-group"
                                              role="group"
                                            >
                                              <div id="mceu_26-body" />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      id="mceu_27"
                                      className="mce-edit-area mce-container mce-panel mce-stack-layout-item"
                                      hidefocus={1}
                                      tabIndex={-1}
                                      role="group"
                                      style={{ borderWidth: "1px 0px 0px" }}
                                    >
                                      <iframe
                                        id="review_description_ifr"
                                        frameBorder={0}
                                        allowTransparency="true"
                                        title="Rich Text Area. Press ALT-F9 for menu. Press ALT-F10 for toolbar. Press ALT-0 for help"
                                        src='javascript""'
                                        style={{
                                          width: "100%",
                                          height: "100px",
                                          display: "block",
                                        }}
                                      />
                                    </div>
                                    <div
                                      id="mceu_28"
                                      className="mce-statusbar mce-container mce-panel mce-last mce-stack-layout-item"
                                      hidefocus={1}
                                      tabIndex={-1}
                                      role="group"
                                      style={{ borderWidth: "1px 0px 0px" }}
                                    >
                                      <div
                                        id="mceu_28-body"
                                        className="mce-container-body mce-flow-layout"
                                      >
                                        <div
                                          id="mceu_29"
                                          className="mce-path mce-first mce-flow-layout-item"
                                        >
                                          <div
                                            className="mce-path-item mce-last"
                                            data-index={0}
                                            tabIndex={-1}
                                            id="mceu_29-0"
                                            aria-level={0}
                                          >
                                            p
                                          </div>
                                        </div>
                                        <div
                                          id="mceu_30"
                                          className="mce-last mce-flow-layout-item mce-resizehandle"
                                        >
                                          <i className="mce-ico mce-i-resize" />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <textarea
                                  name="review_description"
                                  id="review_description"
                                  className="form-control review_required required"
                                  rows={5}
                                  aria-hidden="true"
                                  style={{ display: "none" }}
                                  defaultValue={""}
                                />
                              </div>
                            </div>
                            <br />
                            <div className="row">
                              <div className="form-group col-md-3">
                                <label>Image</label>
                                <span className="uniqFile input-group">
                                  <span className="input-group-addon fa fa-upload myInputFile">
                                    <input
                                      type="file"
                                      id="review_img"
                                      name="review_img"
                                      size={40}
                                    />
                                  </span>
                                </span>
                                <img
                                  src="project_folder/tdonline/uploads/package_images/"
                                  id="show_review_image"
                                  width={50}
                                  height={50}
                                  alt="cri"
                                />
                              </div>
                            </div>
                            <div className="row">
                              <div className="form-group col-md-12">
                                <br />
                                <button
                                  type="button"
                                  name="add"
                                  id="review_button"
                                  onclick="update_review()"
                                  value="Update"
                                  className="btn btn-primary form-group"
                                >
                                  <h6>
                                    <i className="fa fa-plus" />
                                    &nbsp;Update
                                  </h6>
                                </button>
                              </div>
                            </div>
                          </form>
                          <div className="panel-body removeMargins">
                            <table
                              id="reviews_table"
                              className="table   table-responsive"
                            >
                              <thead>
                                <tr className="bg-primary">
                                  <th>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        id="single"
                                        type="checkbox"
                                        name="occupancy"
                                      />
                                      <label htmlFor="single">&nbsp;</label>
                                    </div>
                                  </th>
                                  <th>Image</th>
                                  <th>Name</th>
                                  <th>Nationality</th>
                                  <th>Tour Date</th>
                                  <th>Rating</th>
                                  <th>Review</th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody id="reviews_table_body"></tbody>
                            </table>
                            <br />
                            <br />
                            <div className="form-group"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Term & Policies */}

                  {tab.id === "subtab6" && (
                    <div>
                      <div className="row form-group">
                        <div className="col-md-12">
                          <h4>{tab.label}</h4>
                        </div>
                      </div>
                      <form
                        id="terms_policies_form"
                        name="terms_policies_form"
                        className="ng-pristine ng-valid"
                      >
                        <div className="row">
                          <br />
                          <div className="col-md-12">
                            <div
                              className="pull-right"
                              id="term_policy_lang"
                            ></div>
                          </div>
                        </div>
                        {/* Cancellation */}
                        <div className="form-group">
                          <h4>Cancellation Policy</h4>
                        </div>
                        <hr className="mr_bt" />
                        <div className="row">
                          <div className="form-group col-md-12">
                            <label style={{ visibility: "hidden" }}>
                              Cancellation Policy
                            </label>
                            <div name="cancellation" id="cancellation" />
                          </div>
                        </div>
                        {/* Cancellation */}
                        {/* Important Notes */}
                        <div className="form-group">
                          <h4>Important Notes</h4>
                        </div>
                        <hr className="mr_bt" />
                        <div className="row">
                          <div className="form-group col-md-12">
                            <label style={{ visibility: "hidden" }}>
                              Important Notes
                            </label>
                            <div name="important_notes" id="important_notes" />
                          </div>
                        </div>
                        {/* Important Notes */}
                        {/* Important Notes */}
                        <div className="form-group">
                          <h4>Other Terms &amp; Conditions</h4>
                        </div>
                        <hr className="mr_bt" />
                        <div className="row">
                          <div className="form-group col-md-12">
                            <label style={{ visibility: "hidden" }}>
                              {" "}
                              Other Terms &amp; Conditions
                            </label>
                            <div
                              name="other_terms_conditions"
                              id="other_terms_conditions"
                            />
                          </div>
                        </div>
                        {/* Important Notes */}
                        <br />
                      </form>
                    </div>
                  )}

                  {/* Inclusion & Exclusions */}
                  {tab.id === "subtab7" && (
                    <div>
                      <div className="row form-group">
                        <div className="col-md-12">
                          <h4>{tab.label}</h4>
                        </div>
                      </div>
                      <form
                        className="inclusion_exclusion_data ng-pristine ng-valid"
                        id="inclusion_exclusion_data"
                      >
                        <div className="row">
                          <div className="form-group col-md-12">
                            <h4
                              style={{
                                backgroundColor: "#FF5015",
                                padding: "10px 20px",
                                color: "#FFF",
                              }}
                            >
                              Inclusions
                            </h4>
                          </div>
                        </div>
                        {/* Inclusions */}
                        <div className="row">
                          <div className="form-group col-md-3">
                            <label>Insurance</label>
                            <div name="insurance" id="insurance" />
                          </div>
                          <div className="form-group col-md-3">
                            <label>Tour Guide</label>
                            <div name="tour_guide" id="tour_guide" />
                          </div>
                          <div className="form-group col-md-3">
                            <label>Preset Inclusions</label>
                            <div name="inclusion_list" id="inclusion_list" />
                          </div>
                          <div className="form-group col-md-3">
                            <label>Other Inclusions</label>
                            <div
                              name="other_inclusions"
                              id="other_inclusions"
                            />
                          </div>
                        </div>
                        <hr />
                        {/* Inclusions */}
                        {/* Exclusions */}
                        <div className="row">
                          <div className="form-group col-md-12">
                            <h4
                              style={{
                                backgroundColor: "#FF5015",
                                padding: "10px 20px",
                                color: "#FFF",
                              }}
                            >
                              Exclusions
                            </h4>
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-group col-md-3">
                            <label>Tour Guide</label>
                            <div
                              name="tour_guide_exclusion"
                              id="tour_guide_exclusion"
                            />
                          </div>
                          {/* <div class="form-group col-md-3">
                                                  <label>Entrance Fees</label>
                                                  <div name='entrance_fees' id="entrance_fees"></div>
                                              </div> */}
                          <div className="form-group col-md-3">
                            <label>Tips and Porterage</label>
                            <div
                              name="tips_and_porterage"
                              id="tips_and_porterage"
                            />
                          </div>
                          <div className="form-group col-md-3">
                            <label>Preset Exclusions</label>
                            <div name="exclusion_list" id="exclusion_list" />
                          </div>
                          <div className="form-group col-md-3">
                            <label>Other Exclusions</label>
                            <div
                              name="other_exclusions"
                              id="other_exclusions"
                            />
                          </div>
                        </div>
                        {/* Exclusions */}
                      </form>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </form>
          {/* End */}
        </div>
      </div>
    </>
  );
};
export default MastersPackagesEdit;
