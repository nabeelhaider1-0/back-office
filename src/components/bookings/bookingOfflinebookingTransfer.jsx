import React, { useState } from "react"; // Import React and useState
import Flatpickr from "react-flatpickr";
import Header2 from "../header2/header2";
import {
  addrule_currencyOptions,
  advance_suppliers_options,
  country_options,
  hmmm_options,
  mm_options,
  nationalityOptions,
  pickup_options,
  vhno_options,
} from "../../constants/contants";
import MultiSelect from "../reactMultiSelect";

const BookingAddOfflineTransfer = () => {
  const [startDate, setStartDate] = useState(null); // State for the start date

  const handleTrashClick = () => {
    // Function to clear both start and end dates
    setStartDate(null);
  };

  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <Header2
          title="ADD OFFLINE TRANSFER BOOKING"
          linkText1="Search Bookings"
          linkText2="Add Offline Transfer Booking"
          link1="/"
        />

        <div>
          <ul
            className="nav nav-tabs"
            id="myTab"
            role="tablist"
            style={{ borderBottom: "2px solid #FF5015!important" }}
          >
            <li className="nav-item">
              <a
                className="nav-link active"
                id="tab1-tab"
                data-bs-toggle="tab"
                href="#tab1"
                role="tab"
                aria-controls="tab1"
                aria-selected="true"
              >
                Add Offline Trasfer Booking
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="tab2-tab"
                data-bs-toggle="tab"
                href="#tab2"
                role="tab"
                aria-controls="tab2"
                aria-selected="false"
              >
                Pick-up &amp; Drop-off
              </a>
            </li>
          </ul>
          <form>
            {/* Tab Content */}
            <div className="tab-content" id="myTabContent">
              {/* Tab 1 Content */}
              <div
                className="tab-pane fade show active"
                id="tab1"
                role="tabpanel"
                aria-labelledby="tab1-tab"
              >
                <div className="panel-body1">
                  <div className="row">
                    <div className="form-group col-md-12">
                      <h5>Booking Details</h5>
                    </div>
                  </div>
                  <div
                    className="panel-body form-group"
                    style={{
                      border: "1px solid #e4e5e7",
                      paddingTop: "7px",
                      paddingBottom: "23px",
                      paddingLeft: "13px",
                      paddingRight: "20px",
                    }}
                  >
                    <div className="row">
                      <div className="form-group col-md-3">
                        <label>Booking Date</label>
                        <br />
                        27-Jul-2023 11:25:55
                      </div>
                      <div className="form-group col-md-3">
                        <label>Agent Information</label>
                        <br />
                        <input
                          id="agent_suggest_box"
                          type="text"
                          name="agent_id1"
                          className="form-control form-control-sm required ui-autocomplete-input test123"
                          data-toggle="tooltip"
                          data-placement="top"
                          title
                          autoComplete="off"
                          data-original-title="Please Specify Agency Name, Either Agent Code or username or Agent Firstname."
                        />
                        <input type="hidden" name="agent_id" id="agent_id" />
                      </div>
                      <div id="sub_user">
                        <div id="add_sub_user" className="row" />
                      </div>
                      <div id="sub_agent">
                        <div id="add_sub_agent" className="row" />
                      </div>
                      <div className="form-group col-md-3 mt-1">
                        <label>Credit Value</label>
                        <div id="id_credit_value">0</div>
                      </div>
                      <div className="form-group col-md-3 mt-1">
                        <label>Credit Usage</label>
                        <div id="id_credit_usage">0</div>
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="form-group col-md-3">
                        <label>Nationality</label>
                        <MultiSelect
                          options={nationalityOptions}
                          isMulti
                          isSearchable
                          placeholder="- Select Nationality -"
                          noOptionsMessage={() => "No Country Found"}
                          className="custom-select required"
                        />
                      </div>
                      <div className="form-group col-md-3">
                        <label>Country</label>
                        <MultiSelect
                          options={country_options}
                          isMulti
                          isSearchable
                          placeholder="- Select a country -"
                          noOptionsMessage={() => "No Country Found"}
                          className="custom-select required"
                        />
                      </div>
                      <div className="form-group col-md-3">
                        <label>City</label>
                        <input type="hidden" name="sel_city_name" />
                        <select
                          name="sel_city"
                          id="city"
                          className="required selectpicker form-control form-control-sm show-menu-arrow bs-select-hidden"
                          onchange="set_city_name();"
                          data-live-search-style="startsWith"
                          data-live-search="true"
                        >
                          <option value={0}>Select</option>
                        </select>
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="form-group col-md-3">
                        <label>Transfer Date</label>
                        <div
                          className="input-group date col-md-12 col-sm-12 col-xs-12"
                          id="booking_to_date_cal"
                        >
                          <Flatpickr
                            value={startDate}
                            onChange={(date) => setStartDate(date)}
                            options={{ dateFormat: "Y-m-d" }}
                            style={{ width: "290px" }}
                          />
                          <span className="input-group-addon dateIcon">
                            <i className="fa fa-th" />
                          </span>
                          <span
                            className="input-group-addon"
                            id="checkTrashBtn"
                            onClick={handleTrashClick}
                          >
                            <i className="fa fa-trash" />
                          </span>
                        </div>
                      </div>
                      <div className="form-group col-md-3">
                        <label>Booking Status</label>
                        <input type="hidden" name="previous_status" />
                        <select
                          name="sel_booking_status"
                          className="required dropdown_medium selectpicker form-control form-control-sm show-menu-arrow bs-select-hidden"
                          id="sel_booking_status"
                          data-live-search="true"
                        >
                          <option value>Select Status</option>
                          <option label="On Request" value="on_request">
                            On Request
                          </option>
                          <option label="Confirmed" value="confirmed">
                            Confirmed
                          </option>
                        </select>
                      </div>
                      <div className="form-group col-md-3">
                        <label>Agent Reference #</label>
                        <div className="input-group date col-md-12  col-xs-12">
                          <input
                            className="form-control form-control-sm"
                            type="text"
                            name="agent_ref_no"
                            id="agent_ref_no"
                          />
                        </div>
                      </div>
                      <div className="form-group col-md-3">
                        <label>Confirmation Number</label>
                        <input
                          type="text"
                          name="confirmation_number"
                          className="form-control form-control-sm"
                        />
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="form-group col-md-3">
                        <label>Supplier Type</label>
                        <br />
                        <div className="radioline1">
                          <div className="radio radio-success radio-inline">
                            <input
                              type="radio"
                              id="local"
                              name="rdSupplierType"
                              defaultValue="L"
                              onclick="checkSuppType(this.value);"
                              defaultChecked="checked"
                            />
                            <label htmlFor="local">Local Supplier</label>
                          </div>
                          {/* <div className="radio radio-success radio-inline">
                            <input
                              type="radio"
                              id="app"
                              name="rdSupplierType"
                              defaultValue="O"
                              onclick="checkSuppType(this.value);"
                            />
                            <label htmlFor="online">Online Supplier</label>
                          </div> */}
                        </div>
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="form-group col-md-3">
                        <label>Supplier</label>
                        <MultiSelect
                          options={advance_suppliers_options}
                          isMulti
                          isSearchable
                          placeholder="- Select -"
                          noOptionsMessage={() => "No Supplier Found"}
                          className="custom-select required"
                        />
                      </div>
                      <div className="form-group col-md-3">
                        <label>Supplier Profile</label>
                        <select
                          className="required dropdown_medium selectpicker form-control form-control-sm show-menu-arrow bs-select-hidden"
                          name="sel_supplierProfileL"
                          id="sel_supplierProfileL"
                          onchange="fetchSupplierRateForVehicle();"
                          data-live-search="true"
                        >
                          <option value={0}>Select Supplier Profile</option>
                          <option label="Dubai Market" value={15}>
                            Dubai Market
                          </option>
                          <option label="Transfer" value={59}>
                            Transfer
                          </option>
                        </select>
                      </div>
                      <div className="form-group col-md-3" id="select_transfer">
                        <label>System Transfer</label>
                        <div className="input-group col-md-12 col-xs-6">
                          <select
                            name="select_transfer"
                            id="transferSelect"
                            className="required selectpicker form-control form-control-sm show-menu-arrow bs-select-hidden"
                            onchange="fetchSupplierRateForVehicle();"
                            data-live-search="true"
                          />
                          <span className="input-group-addon">OR </span>
                        </div>
                      </div>
                      <div
                        className="form-group col-md-3"
                        id="transfer_name_online"
                      >
                        <label>Transfer Name</label>
                        <div className="input-group col-md-12 col-xs-6">
                          <input
                            type="text"
                            name="transfer_name"
                            id="transfer_name"
                            className="required form-control form-control-sm show-menu-arrow"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="form-group col-md-3">
                        <label>Supplier Currency </label>
                        <MultiSelect
                          options={addrule_currencyOptions}
                          isMulti
                          isSearchable
                          placeholder="- Select Currency -"
                          noOptionsMessage={() => "No Currency Found"}
                          className="custom-select required"
                        />
                      </div>
                      <div className="form-group col-md-3">
                        <label>Agent Currency</label>
                        <MultiSelect
                          options={addrule_currencyOptions}
                          isMulti
                          isSearchable
                          placeholder="- Select Currency -"
                          noOptionsMessage={() => "No Currency Found"}
                          className="custom-select required"
                        />
                      </div>
                      <div className="form-group col-md-3">
                        <label>Applied Multiplier</label>
                        <div className="input-group date col-md-12 col-xs-12">
                          <input
                            className="form-control form-control-sm"
                            type="text"
                            name="applied_multiplier"
                            id="applied_multiplier"
                            onblur="get_modification()"
                            onkeyup="extractNumber(this,5,false);"
                          />
                          <span className="input-group-addon">
                            &nbsp;
                            <span id="nc1" /> To <span id="dc1" />
                            &nbsp;
                          </span>
                        </div>
                      </div>
                      <div className="form-group col-md-3">
                        <label>Current Exchange Rate</label>
                        <br />
                        <span id="currency_conversion_1" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-md-12">
                        <input type="hidden" name="chk_area" id="chk_area" />
                        <div
                          className="form-group col-md-3"
                          id="area_code"
                          style={{ display: "none" }}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div style={{ display: "none" }}>
                        <div className="form-group col-md-3">
                          <label>
                            Basecurrency Multiplier (<span id="dc2" /> To USD :-{" "}
                            <span id="currency_conversion_2" />)
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            name="basecurrency_multiplier"
                            id="basecurrency_multiplier"
                            onblur="extractNumber(this,5,false);"
                            onkeyup="extractNumber(this,6,false);"
                          />
                        </div>
                        <div className="form-group col-md-3">
                          <label>
                            Basecurrency Multiplier Native (
                            <span id="nc2"> </span> To USD :-{" "}
                            <span id="currency_conversion_3" />)
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            name="basecurrency_multiplier_native"
                            id="basecurrency_multiplier_native"
                            onblur="extractNumber(this,5,false);"
                            onkeyup="extractNumber(this,6,false);"
                          />
                        </div>
                        <div className="form-group col-md-3">
                          <label>
                            Booking Currency To Agent Currency Multiplier (
                            <span id="dc4"> </span> To <span id="dc5" /> :-{" "}
                            <span id="currency_conversion_4" />)
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            name="agent_currency_multiplier"
                            id="agent_currency_multiplier"
                            onblur="extractNumber(this,5,false);"
                            onkeyup="extractNumber(this,6,false);"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="form-group col-md-3">
                        <label>Agent Markup</label>
                        <div className="input-group date col-md-12 col-xs-12">
                          <input
                            className="form-control form-control-sm"
                            type="text"
                            name="txt_agent_markup"
                            id="txt_agent_markup"
                            size={5}
                            onchange="cal_total_markup();"
                            onblur="extractNumber(this,2,false);"
                            onkeyup="extractNumber(this,2,false);"
                          />
                          <span className="input-group-addon">%</span>
                        </div>
                      </div>
                      <div style={{ display: "none" }} id="sub_agent_markup">
                        <div className="form-group col-md-3">
                          <label>Sub Agent Markup</label>
                          <div className="input-group date col-md-12  col-xs-12">
                            <input
                              className="form-control form-control-sm"
                              type="text"
                              name="txt_sub_agent_markup"
                              id="txt_sub_agent_markup"
                              size={5}
                              onchange="cal_total_markup();"
                              onblur="extractNumber(this,2,false);"
                              onkeyup="extractNumber(this,2,false);"
                            />
                            <span className="input-group-addon">%</span>
                          </div>
                        </div>
                      </div>
                      <div className="form-group col-md-3">
                        <label>Total Markup</label>
                        <div className="input-group date col-md-12  col-xs-12">
                          <input
                            className="form-control form-control-sm"
                            readOnly
                            type="text"
                            name="txt_markup"
                            id="txt_markup"
                            size={5}
                            onblur="get_modification(this)"
                            onkeyup="extractNumber(this,2,false);"
                          />
                          <span className="input-group-addon">%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="form-group col-md-12">
                      <h5>Leader Details</h5>
                    </div>
                    <div
                      className="panel-body form-group"
                      style={{
                        border: "1px solid #e4e5e7",
                        paddingTop: "7px",
                        paddingBottom: "23px",
                        paddingLeft: "13px",
                        paddingRight: "20px",
                      }}
                    >
                      <div className="row">
                        <div className="form-group col-md-3 col-sm-3">
                          <label>Leader Salutation</label>
                          <select
                            title="Select Salutation"
                            className="selectpicker show-menu-arrow form-control form-control-sm required bs-select-hidden"
                            name="leader_salutation"
                            id="leader_salutation"
                            data-live-search="true"
                          >
                            <option className="bs-title-option" value>
                              Select Salutation
                            </option>
                          </select>
                        </div>
                        <div className="form-group col-md-3 col-sm-3">
                          <label>Leader First Name</label>
                          <input
                            className="form-control form-control-sm required"
                            type="text"
                            name="leader_first_name"
                            id="leader_first_name"
                            placeholder="Leader First Name"
                          />
                        </div>
                        <div className="form-group col-md-3 col-sm-3">
                          <label>Leader Last Name</label>
                          <input
                            className="form-control form-control-sm required"
                            type="text"
                            name="leader_last_name"
                            id="leader_last_name"
                            placeholder="Leader Last Name"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="form-group col-md-3">
                      <h5>Vehicle #</h5>

                      <MultiSelect
                        options={vhno_options}
                        isMulti
                        isSearchable
                        placeholder="- Select -"
                        noOptionsMessage={() => "No Options Found"}
                        className="custom-select required"
                      />
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="form-group col-md-12">
                      <h5>Vehicle Details</h5>
                      <div
                        className="panel-body form-group"
                        style={{
                          border: "1px solid #e4e5e7",
                          paddingTop: "7px",
                          paddingBottom: "23px",
                          paddingLeft: "13px",
                          paddingRight: "20px",
                        }}
                      >
                        <div className="row">
                          <div className="col-md-12 form-group">
                            <div
                              className="vehicle_container"
                              id="vehicle_container"
                            >
                              <div
                                className="row vehicleDetails"
                                id="vehicleSelectedDefault"
                              >
                                <div className="form-group col-md-3">
                                  <label>Vehicle Type</label>
                                  <div className="input-group col-md-12 col-xs-12">
                                    <select
                                      name="sel_vehicle_type[]"
                                      className="required selectpicker form-control form-control-sm show-menu-arrow sel_vehicle_type bs-select-hidden"
                                      id="sel_vehicle_type_0"
                                      onchange="fetchTransferOutOfSupplement();"
                                      data-live-search="true"
                                    >
                                      <option value>Select Vehicle Type</option>
                                    </select>
                                    <span
                                      className="input-group-addon pointer show_other_vehicles"
                                      data-vehicleno={0}
                                    >
                                      <i className="fa fa-plus" />
                                    </span>
                                    <span
                                      className="input-group-addon pointer delete_other_vehicles"
                                      data-vehicleno={0}
                                    >
                                      <i className="fa fa-minus" />
                                    </span>
                                  </div>
                                </div>
                                <div className="form-group col-md-3">
                                  <label>No. of Adults</label>
                                  <input
                                    name="no_adults[]"
                                    id="no_adults_0"
                                    type="text"
                                    className="required textstyle form-control form-control-sm required"
                                    size={5}
                                    onblur="extractNumber(this,0,false);"
                                    onkeyup="extractNumber(this,0,false);"
                                    onchange="get_modification(this,'getSupplierRate')"
                                    maxLength={2}
                                  />
                                </div>
                                <div className="form-group col-md-3">
                                  <label>No. of Children</label>
                                  <input
                                    name="no_children[]"
                                    id="no_children_0"
                                    type="text"
                                    className="textstyle form-control form-control-sm"
                                    size={5}
                                    onblur="extractNumber(this,0,false);"
                                    onkeyup="extractNumber(this,0,false);"
                                    onchange="get_modification(this,'getSupplierRate')"
                                    maxLength={2}
                                  />
                                </div>
                                <div className="form-group col-md-3">
                                  <label>Lead Name</label>
                                  <input
                                    name="lead_name[]"
                                    id="lead_name_0"
                                    type="text"
                                    className="required textstyle form-control form-control-sm required"
                                    size={50}
                                  />
                                </div>
                              </div>
                              <div className="row mt-2">
                                <div className="form-group col-md-3">
                                  <label>Parking Fee</label>
                                  <input
                                    name="parking_fee[]"
                                    id="parking_fee_0"
                                    type="text"
                                    className="textstyle form-control form-control-sm"
                                    size={10}
                                    onblur="extractNumber(this,2,false);"
                                    onkeyup="extractNumber(this,2,false);"
                                    onchange="get_modification(this)"
                                    defaultValue={0}
                                  />
                                </div>
                                <div className="form-group col-md-3">
                                  <label>Driver Tips</label>
                                  <input
                                    name="driver_tips[]"
                                    id="driver_tips_0"
                                    type="text"
                                    className="textstyle form-control form-control-sm"
                                    size={10}
                                    onblur="extractNumber(this,2,false);"
                                    onkeyup="extractNumber(this,2,false);"
                                    onchange="get_modification(this)"
                                    defaultValue={0}
                                  />
                                </div>
                                <div className="form-group col-md-3">
                                  <label>Representative Cost</label>
                                  <input
                                    name="representative_cost[]"
                                    id="representative_cost_0"
                                    type="text"
                                    className="textstyle form-control form-control-sm"
                                    size={10}
                                    onblur="extractNumber(this,2,false);"
                                    onkeyup="extractNumber(this,2,false);"
                                    onchange="get_modification(this)"
                                    defaultValue={0}
                                  />
                                </div>
                                <div className="form-group col-md-3">
                                  <label>Guide Cost</label>
                                  <input
                                    name="guide_cost[]"
                                    id="guide_cost_0"
                                    type="text"
                                    className="textstyle form-control form-control-sm"
                                    size={10}
                                    onblur="extractNumber(this,2,false);"
                                    onkeyup="extractNumber(this,2,false);"
                                    onchange="get_modification(this)"
                                    defaultValue={0}
                                  />
                                </div>
                              </div>
                              <div className="row mt-2">
                                <div className="form-group col-md-3">
                                  <label>Touristic Entrance Fees</label>
                                  <input
                                    name="touristic_fee[]"
                                    id="touristic_fee_0"
                                    type="text"
                                    className="textstyle form-control form-control-sm"
                                    size={10}
                                    onblur="extractNumber(this,2,false);"
                                    onkeyup="extractNumber(this,2,false);"
                                    onchange="get_modification(this)"
                                    defaultValue={0}
                                  />
                                </div>
                                <div
                                  id="per_person_rate_0"
                                  style={{ display: "none" }}
                                >
                                  <div className="form-group col-md-3">
                                    <label>Adult Rate</label>
                                    <input
                                      name="adult_rate[]"
                                      id="adult_rate_0"
                                      type="text"
                                      className="required form-control form-control-sm"
                                      size={10}
                                      onblur="extractNumber(this,2,false);"
                                      onkeyup="extractNumber(this,2,false);"
                                      onchange="get_modification(this,'getSupplierRate')"
                                      defaultValue={0}
                                    />
                                  </div>
                                  <div className="form-group col-md-3">
                                    <label>Child Rate</label>
                                    <input
                                      name="child_rate[]"
                                      id="child_rate_0"
                                      type="text"
                                      className="textstyle form-control form-control-sm"
                                      size={10}
                                      onblur="extractNumber(this,2,false);"
                                      onkeyup="extractNumber(this,2,false);"
                                      onchange="get_modification(this,'getSupplierRate')"
                                      defaultValue={0}
                                    />
                                  </div>
                                </div>
                                <div className="form-group col-md-3">
                                  <label>Vehicle Supplier Rate</label>
                                  <input
                                    name="native_rate[]"
                                    id="native_rate_0"
                                    type="text"
                                    className="textstyle required form-control form-control-sm"
                                    size={10}
                                    onblur="extractNumber(this,2,true);"
                                    onkeyup="extractNumber(this,2,true);"
                                    onchange="get_modification(this)"
                                    defaultValue={0}
                                  />
                                </div>
                                <div className="form-group col-md-3">
                                  <label>Agent Rate</label>
                                  <input
                                    name="display_rate[]"
                                    id="display_rate_0"
                                    type="text"
                                    className="textstyle form-control form-control-sm"
                                    size={10}
                                    onchange="get_modification(this,'agent_rate');"
                                  />
                                </div>
                                <div className="form-group col-md-3">
                                  <label>Supplier Surcharge</label>
                                  <input
                                    name="native_surcharge[]"
                                    id="native_surcharge_0"
                                    type="text"
                                    className="textstyle form-control form-control-sm"
                                    size={10}
                                    onblur="extractNumber(this,2,true);"
                                    onkeyup="extractNumber(this,2,true);"
                                    onchange="get_modification(this)"
                                  />
                                </div>
                              </div>
                              <div className="form-group col-md-3 mt-2">
                                <label>Agent Surcharge</label>
                                <input
                                  name="display_surcharge[]"
                                  id="display_surcharge_0"
                                  type="text"
                                  className="textstyle form-control form-control-sm"
                                  size={10}
                                  readOnly
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="form-group col-md-12">
                      <h5>Rate Information</h5>
                      <div
                        className="panel-body form-group"
                        style={{
                          border: "1px solid #e4e5e7",
                          paddingTop: "7px",
                          paddingBottom: "23px",
                          paddingLeft: "13px",
                          paddingRight: "20px",
                        }}
                      >
                        <div className="row">
                          <div className="form-group col-md-3">
                            <label>Supplier Surcharge</label>
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              id="total_native_surcharge"
                              name="total_native_surcharge"
                              size={10}
                              readOnly
                            />
                          </div>
                          <div className="form-group col-md-3">
                            <label>Supplier Rate</label>
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              id="total_native_rate"
                              name="total_native_rate"
                              size={10}
                              readOnly
                            />
                          </div>
                          <div className="form-group col-md-3">
                            <label>
                              Total Supplier Rate (Supplier surcharge + Supplier
                              Rate)
                            </label>
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              id="native_surcharge_and_rates"
                              name="native_surcharge_and_rates"
                              size={10}
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="row mt-2">
                          <div className="form-group col-md-3">
                            <label>Agent Surcharge</label>
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              id="total_display_surcharge"
                              name="total_display_surcharge"
                              size={10}
                              readOnly
                            />
                          </div>
                          <div className="form-group col-md-3">
                            <label>Agent Rate</label>
                            <div className="input-group date col-md-12 col-xs-12">
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                id="total_display_rate"
                                name="total_display_rate"
                                size={10}
                                readOnly
                              />
                              <span className="input-group-addon">
                                <span id="dc6">N/A</span>
                              </span>
                            </div>
                          </div>
                          <div className="form-group col-md-3">
                            <label>Apply Tax</label>
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              id="applicable_tax"
                              name="applicable_tax"
                              size={10}
                              readOnly
                            />
                            <div id="tax_details" />
                          </div>
                          <div className="form-group col-md-3">
                            <label>
                              Total Agent Rates (Agent Surcharge + Agent Rate)
                            </label>
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              id="display_surcharge_and_rates"
                              name="display_surcharge_and_rates"
                              size={10}
                              readOnly="readonly"
                            />
                          </div>
                        </div>
                        <div className="row mt-2">
                          <div className="form-group col-md-3">
                            <label>Agent Cancellation Deadline</label>
                            <input
                              className="form-control form-control-sm"
                              data-toggle="tooltip"
                              data-placement="top"
                              title
                              id="expiration_date"
                              name="expiration_date"
                              type="text"
                              size={25}
                              defaultValue="24-07-2023 05:30:00"
                              data-original-title="If you Modify Cancellation Deadline, also change in cancellation policy."
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="form-group col-md-12">
                      <label>Meeting Point</label>
                      <textarea
                        name="meeting_point"
                        className="form-control form-control-sm"
                        rows={4}
                        cols={70}
                        defaultValue={""}
                      />
                    </div>
                    <div className="form-group col-md-12 mt-2">
                      <label>Cancellation Policy</label>
                      <textarea
                        name="cancellation_policy"
                        className="form-control form-control-sm"
                        rows={4}
                        cols={70}
                        defaultValue={
                          "Cancellations or changes made 3 day/s prior to check in ( Noon local hotel time ) will be subject to 1 night/s fee.  No- Show/Early Departure is subjected to 1 night/s Fee"
                        }
                      />
                    </div>
                    <div className="form-group col-md-12 mt-2">
                      <label>Supplier Cancellation Policy </label>
                      <textarea
                        className="form-control form-control-sm supplier_readonly"
                        id="supplier_cancellation_policy"
                        name="supplier_cancellation_policy"
                        rows={4}
                        cols={70}
                        readOnly
                        defaultValue={""}
                      />
                    </div>
                    <div className="form-group col-md-12 mt-2">
                      <label>Remark</label>
                      <textarea
                        name="remark"
                        rows={4}
                        className="form-control form-control-sm"
                        cols={70}
                        defaultValue={""}
                      />
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="form-group col-md-12">
                      <h5>Email To</h5>
                      <div
                        className="panel-body form-group"
                        style={{
                          border: "1px solid #e4e5e7",
                          paddingTop: "7px",
                          paddingBottom: "23px",
                          paddingLeft: "13px",
                          paddingRight: "20px",
                        }}
                      >
                        <div className="row">
                          <div className="form-group col-md-12">
                            <div className="radioline1 mt-1">
                              <div className="checkbox checkbox-success checkbox-inline">
                                <input
                                  id="chk1"
                                  type="checkbox"
                                  name="mailtoagent"
                                  defaultValue={1}
                                />
                                <label htmlFor="chk1">Agent</label>
                              </div>
                              <div className="checkbox checkbox-success checkbox-inline">
                                <input
                                  id="app"
                                  type="checkbox"
                                  name="mailtocommon"
                                  defaultValue={1}
                                />
                                <label htmlFor="chk2">Common</label>
                              </div>
                              <div className="checkbox checkbox-success checkbox-inline btnPadd">
                                <input
                                  id="app"
                                  type="checkbox"
                                  name="mailtosupplier"
                                  defaultValue={1}
                                />
                                <label htmlFor="mailtosupplier">Supplier</label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-group row mt-3">
                    <div className="col-md-12">
                      <span id="loading" style={{ display: "none" }}>
                        <img src="/cpfv3/images/loading.gif" alt="Loading" />
                      </span>
                      <button
                        type="button"
                        className="btn btn-dark btn-sm"
                        name="save_offline_transfer"
                        id="save_offline_transfer"
                        value="Save"
                        onclick="Javascript submit_form(document.forms['transfer_form']);"
                      >
                        <i className="fa fa-floppy-o" />
                        &nbsp;Save
                      </button>
                    </div>
                  </div>
                </div>
                {/* Tab 2 Content */}
              </div>
              <div
                className="tab-pane fade"
                id="tab2"
                role="tabpanel"
                aria-labelledby="tab2-tab"
              >
                <div className="panel-body2">
                  <div className="row">
                    <div className="form-group col-md-3">
                      <label>Transfer Duration (Format - 1 hr 30 mins)</label>
                      <br />
                      <MultiSelect
                        options={hmmm_options}
                        isSearchable
                        isMulti
                        placeholder="-"
                        className="custom-select required"
                        noOptionsMessage={() => "No Time Found"}
                      />

                      <MultiSelect
                        options={mm_options}
                        isSearchable
                        isMulti
                        placeholder="-"
                        className="custom-select required"
                        noOptionsMessage={() => "No Time Found"}
                      />

                      <input
                        type="hidden"
                        name="trans_duration"
                        id="trans_duration"
                        defaultValue="1 hr 00 min"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-md-6">
                      <div className="panel-body">
                        <div className="form-group">
                          <label>Pick Up</label>

                          <MultiSelect
                            options={pickup_options}
                            isSearchable
                            isMulti
                            placeholder="Select pick-up"
                            className="custom-select "
                            noOptionsMessage={() => "No Option Found"}
                          />
                        </div>
                        <div
                          id="pickup_airport"
                          style={{ display: "none", width: "100%" }}
                        >
                          <div className="row">
                            <div className="form-group col-md-6">
                              <label>Pick up from</label>
                              <select
                                name="pickup_airport_code"
                                id="pickup_airport_code"
                                className="required selectpicker form-control form-control-sm show-menu-arrow bs-select-hidden"
                                data-live-search="true"
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label>Arriving from</label>
                              <select
                                name="pickup_sel_arr_from"
                                id="pickup_sel_arr_from"
                                className="selectpicker form-control form-control-sm show-menu-arrow bs-select-hidden"
                                data-live-search="true"
                              >
                                <option value>--</option>
                              </select>
                            </div>
                            <div className="form-group col-md-6">
                              <label>Flight Number and Airline Code </label>
                              <input
                                type="text"
                                name="pickup_flight_number"
                                className="required form-control form-control-sm"
                                id="pickup_flight_number"
                                maxLength={15}
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label>
                                Estimated time of arrival (Hours : Minutes)
                              </label>
                              <br />
                              <MultiSelect
                                options={hmmm_options}
                                isSearchable
                                isMulti
                                placeholder="-"
                                className="custom-select required"
                                noOptionsMessage={() => "No Time Found"}
                              />

                              <MultiSelect
                                options={mm_options}
                                isSearchable
                                isMulti
                                placeholder="-"
                                className="custom-select required"
                                noOptionsMessage={() => "No Time Found"}
                              />
                            </div>
                          </div>
                        </div>
                        <div
                          id="pickup_accom"
                          style={{ display: "none", width: "100%" }}
                        >
                          <div className="row">
                            <div className="form-group col-md-6">
                              <label>Pick up time (Hours : Minutes)</label>
                              <br />
                              <MultiSelect
                                options={hmmm_options}
                                isSearchable
                                isMulti
                                placeholder="-"
                                className="custom-select required"
                                noOptionsMessage={() => "No Time Found"}
                              />

                              <MultiSelect
                                options={mm_options}
                                isSearchable
                                isMulti
                                placeholder="-"
                                className="custom-select required"
                                noOptionsMessage={() => "No Time Found"}
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label>Pick up from</label>
                              <select
                                name="sel_pickup_from_hotel"
                                id="sel_pickup_from_hotel"
                                className="required selectpicker form-control form-control-sm show-menu-arrow bs-select-hidden"
                                data-live-search="true"
                              >
                                <option value>--</option>
                                <option label value={0} />
                              </select>
                            </div>
                          </div>
                          <div className="row">
                            <div className="form-group col-md-12">
                              <div className>
                                <div className="clear" />
                                <div className="form-group col-md-12 checkbox checkbox-success checkbox-inline">
                                  <input
                                    type="checkbox"
                                    name="chk_pickup"
                                    id="pickup"
                                    defaultValue={1}
                                    onclick="callmedisplay_pickup();"
                                  />
                                  <label htmlFor="pickup">
                                    Click here for an alternative address{" "}
                                  </label>
                                </div>
                              </div>
                              <div className="clear" />
                              <div
                                id="address_display_pickup"
                                className="row"
                                style={{ display: "none" }}
                              >
                                <div className="form-group col-md-12">
                                  <h5>Pick up from</h5>
                                </div>
                                <div className="form-group col-md-12">
                                  <label>Address 1</label>
                                  <input
                                    type="textbox"
                                    name="txt_pickup_hotel_address1"
                                    className="required form-control form-control-sm"
                                    maxLength={40}
                                  />
                                </div>
                                <div className="form-group col-md-12">
                                  <label>Address 2</label>
                                  <input
                                    type="textbox"
                                    name="txt_pickup_hotel_address2"
                                    className="required form-control form-control-sm"
                                    maxLength={40}
                                  />
                                </div>
                                <div className="form-group col-md-6">
                                  <label>City</label>
                                  <input
                                    type="textbox"
                                    className="form-control form-control-sm"
                                    name="txt_pickup_hotel_city"
                                    id="txt_pickup_hotel_city"
                                    readOnly
                                  />
                                  <input
                                    type="hidden"
                                    className="form-control form-control-sm"
                                    name="sel_pickup_hotel_city"
                                    id="sel_pickup_hotel_city"
                                  />
                                </div>
                                <div className="form-group col-md-6">
                                  <label>Country</label>
                                  <br />
                                  <input
                                    type="textbox"
                                    name="txt_pickup_hotel_country"
                                    id="txt_pickup_hotel_country"
                                    className="required form-control form-control-sm"
                                    maxLength={20}
                                  />
                                </div>
                                <div className="form-group col-md-6">
                                  <label>Postcode/Zipcode</label>
                                  <input
                                    type="textbox"
                                    name="txt_pickup_hotel_postcode"
                                    id="txt_pickup_hotel_postcode"
                                    className="required form-control form-control-sm"
                                    maxLength={25}
                                    onblur="extractNumber(this,2,false);"
                                    onkeyup="extractNumber(this,2,false);"
                                  />
                                </div>
                                <div className="form-group col-md-6">
                                  <label>Phone Number</label>
                                  <input
                                    type="textbox"
                                    name="txt_pickup_hotel_phone"
                                    id="txt_pickup_hotel_phone"
                                    className="required form-control form-control-sm"
                                    maxLength={15}
                                    onblur="extractNumber(this,2,false);"
                                    onkeyup="extractNumber(this,2,false);"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          id="pickup_port"
                          style={{ display: "none", width: "100%" }}
                        >
                          <div className="row">
                            <div className="form-group col-md-6">
                              <label>Pickup Time (Hours : Minutes)</label>
                              <br />
                              <MultiSelect
                                options={hmmm_options}
                                isSearchable
                                isMulti
                                placeholder="-"
                                className="custom-select required"
                                noOptionsMessage={() => "No Time Found"}
                              />

                              <MultiSelect
                                options={mm_options}
                                isSearchable
                                isMulti
                                placeholder="-"
                                className="custom-select required"
                                noOptionsMessage={() => "No Time Found"}
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label>Arriving From</label>
                              <input
                                type="text"
                                name="txt_pickup_port_arriving_from"
                                className="required form-control form-control-sm"
                                maxLength={100}
                              />
                            </div>
                          </div>
                        </div>
                        <div
                          id="pickup_station"
                          style={{ display: "none", width: "100%" }}
                        >
                          <div className="row">
                            <div className="form-group col-md-6">
                              <label>Arriving From </label>
                              <select
                                className="required selectpicker form-control form-control-sm show-menu-arrow bs-select-hidden"
                                name="sel_pickup_station_arriving_from"
                                id="sel_pickup_station_arriving_from"
                                data-live-search="true"
                              >
                                <option value>- Select a station -</option>
                              </select>
                            </div>
                            <div className="form-group col-md-6">
                              <label>Train Name/Number </label>
                              <input
                                className="required form-control form-control-sm"
                                type="text"
                                name="txt_pickup_station_train_name"
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label>Arrival Station </label>
                              <select
                                className="required selectpicker form-control form-control-sm show-menu-arrow bs-select-hidden"
                                name="sel_pickup_station_arriving_station"
                                id="sel_pickup_station_arriving_station"
                                data-live-search="true"
                              >
                                <option value>- Select a station -</option>
                              </select>
                            </div>
                            <div className="form-group col-md-6">
                              <label>
                                Estimated Time of Arrival (Hours : Minutes)
                              </label>
                              <br />
                              <MultiSelect
                                options={hmmm_options}
                                isSearchable
                                isMulti
                                placeholder="-"
                                className="custom-select required"
                                noOptionsMessage={() => "No Time Found"}
                              />

                              <MultiSelect
                                options={mm_options}
                                isSearchable
                                isMulti
                                placeholder="-"
                                className="custom-select required"
                                noOptionsMessage={() => "No Time Found"}
                              />
                            </div>
                          </div>
                        </div>
                        <div
                          id="pickup_other"
                          style={{ display: "none", width: "100%" }}
                        >
                          <div className="row">
                            <div className="form-group col-md-6">
                              <label>Pick Up Time (Hours : Minutes)</label>
                              <br />
                              <MultiSelect
                                options={hmmm_options}
                                isSearchable
                                isMulti
                                placeholder="-"
                                className="custom-select required"
                                noOptionsMessage={() => "No Time Found"}
                              />

                              <MultiSelect
                                options={mm_options}
                                isSearchable
                                isMulti
                                placeholder="-"
                                className="custom-select required"
                                noOptionsMessage={() => "No Time Found"}
                              />
                            </div>
                            <div className="form-group col-md-12">
                              <label>Address 1</label>
                              <input
                                type="text"
                                name="txt_pickup_other_address1"
                                className="required form-control form-control-sm"
                                maxLength={35}
                              />
                            </div>
                            <div className="form-group col-md-12">
                              <label>Address 2</label>
                              <input
                                type="text"
                                name="txt_pickup_other_address2"
                                className="required form-control form-control-sm"
                                maxLength={35}
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label>Town/City</label>
                              <br />
                              <input
                                type="text"
                                name="txt_pickup_other_city"
                                className="required form-control form-control-sm"
                                maxLength={50}
                              />
                              <input
                                type="hidden"
                                name="txt_pickup_other_city_code"
                                id="txt_pickup_other_city_code"
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label>Country/State </label>
                              <input
                                type="text"
                                name="txt_pickup_other_country"
                                className="required form-control form-control-sm"
                                maxLength={50}
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label>Postcode/Zipcode </label>
                              <input
                                type="text"
                                name="txt_pickup_other_postcode"
                                className="required form-control form-control-sm"
                                maxLength={10}
                                onblur="extractNumber(this,2,false);"
                                onkeyup="extractNumber(this,2,false);"
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label>Phone Number </label>
                              <input
                                type="text"
                                name="txt_pickup_other_phone"
                                className="required form-control form-control-sm"
                                maxLength={15}
                                onblur="extractNumber(this,2,false);"
                                onkeyup="extractNumber(this,2,false);"
                              />
                            </div>
                          </div>
                        </div>
                        <div
                          id="pickup_terminal"
                          style={{ display: "none", width: "100%" }}
                        >
                          <div className="row">
                            <div className="form-group col-md-6">
                              <label>Arrival Terminal</label>
                              <br />
                              <select
                                name="pickup_code"
                                id="pickup_code"
                                className="required selectpicker form-control form-control-sm show-menu-arrow bs-select-hidden"
                                data-live-search="true"
                              >
                                <option value>- Select a Terminal -</option>
                              </select>
                            </div>
                            <div className="form-group col-md-6">
                              <label>
                                Estimated Time of Arrival (Hours : Minutes)
                              </label>
                              <br />
                              <MultiSelect
                                options={hmmm_options}
                                isSearchable
                                isMulti
                                placeholder="-"
                                className="custom-select required"
                                noOptionsMessage={() => "No Time Found"}
                              />

                              <MultiSelect
                                options={mm_options}
                                isSearchable
                                isMulti
                                placeholder="-"
                                className="custom-select required"
                                noOptionsMessage={() => "No Time Found"}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group col-md-6">
                      <div className="panel-body">
                        <div className="form-group">
                          <label>Drop Off</label>
                          <MultiSelect
                            options={pickup_options}
                            isSearchable
                            isMulti
                            placeholder="Select drop-off"
                            className="custom-select "
                            noOptionsMessage={() => "No Option Found"}
                          />
                        </div>
                        <div
                          id="drop_off_airport"
                          style={{ display: "none", width: "100%" }}
                        >
                          <div className="row">
                            <div className="form-group col-md-6">
                              <label>Drop off to : </label>
                              <select
                                name="dropoff_airport_code"
                                id="dropoff_airport_code"
                                className="required select_style selectpicker form-control form-control-sm show-menu-arrow bs-select-hidden"
                                data-live-search="true"
                              >
                                <option value>--</option>
                              </select>
                            </div>
                            <div className="form-group col-md-6">
                              <label>Flight Destination </label>
                              <select
                                name="drop_off_sel_arr_from"
                                id="drop_off_sel_arr_from"
                                className="select_style selectpicker form-control form-control-sm show-menu-arrow bs-select-hidden"
                                data-live-search="true"
                              >
                                <option value>--</option>
                              </select>
                            </div>
                            <div className="form-group col-md-6">
                              <label>Flight Number and Airline Code </label>
                              <input
                                type="text"
                                name="drop_off_flight_number"
                                maxLength={15}
                                className="required form-control form-control-sm"
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label>Time of Departure (Hours : Minutes)</label>
                              <br />
                              <MultiSelect
                                options={hmmm_options}
                                isSearchable
                                isMulti
                                placeholder="-"
                                className="custom-select required"
                                noOptionsMessage={() => "No Time Found"}
                              />

                              <MultiSelect
                                options={mm_options}
                                isSearchable
                                isMulti
                                placeholder="-"
                                className="custom-select required"
                                noOptionsMessage={() => "No Time Found"}
                              />
                            </div>
                          </div>
                        </div>
                        <div
                          id="drop_off_accom"
                          style={{ display: "none", width: "100%" }}
                        >
                          <div className="row">
                            <div className="form-group col-md-6">
                              <label> </label>
                              <select
                                name="sel_drop_off_from_hotel"
                                id="sel_drop_off_from_hotel"
                                className="required selectpicker form-control form-control-sm show-menu-arrow bs-select-hidden"
                                data-live-search="true"
                              >
                                <option value>--</option>
                                <option label value={0} />
                              </select>
                            </div>
                          </div>
                          <div className="row">
                            <div className="form-group col-md-12">
                              <div className>
                                <div className="clear" />
                                <div className="form-group col-md-12 checkbox checkbox-success checkbox-inline">
                                  <input
                                    type="checkbox"
                                    name="chk_dropoff"
                                    id="dropoff"
                                    defaultValue={1}
                                    onclick="callmedisplay_dropoff();"
                                  />
                                  <label htmlFor="dropoff">
                                    Click here for an alternative address{" "}
                                  </label>
                                </div>
                              </div>
                              <div className="clear" />
                              <div
                                id="address_display_dropoff"
                                className="row"
                                style={{ display: "none" }}
                              >
                                <div className="form-group col-md-12">
                                  <h5>Select Drop Off </h5>
                                </div>
                                <div className="form-group col-md-12">
                                  <label>Address 1</label>
                                  <input
                                    type="textbox"
                                    name="txt_dropoff_hotel_address1"
                                    id="txt_dropoff_hotel_address1"
                                    className="required form-control form-control-sm"
                                    maxLength={40}
                                  />
                                </div>
                                <div className="form-group col-md-12">
                                  <label>Address 2</label>
                                  <input
                                    type="textbox"
                                    name="txt_dropoff_hotel_address2"
                                    id="txt_dropoff_hotel_address2"
                                    className="required form-control form-control-sm"
                                    maxLength={40}
                                  />
                                </div>
                                <div className="form-group col-md-6">
                                  <label>City</label>
                                  <input
                                    type="textbox"
                                    name="txt_dropoff_hotel_city"
                                    id="txt_dropoff_hotel_city"
                                    className="required form-control form-control-sm"
                                    maxLength={20}
                                  />
                                  <input
                                    type="hidden"
                                    className="form-control form-control-sm"
                                    name="sel_dropoff_hotel_city"
                                    id="sel_dropoff_hotel_city"
                                  />
                                </div>
                                <div className="form-group col-md-6">
                                  <label>Country</label>
                                  <br />
                                  <input
                                    type="textbox"
                                    name="txt_dropoff_hotel_country"
                                    id="txt_dropoff_hotel_country"
                                    className="required form-control form-control-sm"
                                    maxLength={20}
                                  />
                                </div>
                                <div className="form-group col-md-6">
                                  <label>Postcode/Zipcode</label>
                                  <input
                                    type="textbox"
                                    name="txt_dropoff_hotel_postcode"
                                    id="txt_dropoff_hotel_postcode"
                                    className="required form-control form-control-sm"
                                    maxLength={25}
                                    onblur="extractNumber(this,2,false);"
                                    onkeyup="extractNumber(this,2,false);"
                                  />
                                </div>
                                <div className="form-group col-md-6">
                                  <label>Phone Number</label>
                                  <input
                                    type="textbox"
                                    name="txt_dropoff_hotel_phone"
                                    id="txt_dropoff_hotel_phone"
                                    className="required form-control form-control-sm"
                                    maxLength={15}
                                    onblur="extractNumber(this,2,false);"
                                    onkeyup="extractNumber(this,2,false);"
                                  />
                                </div>
                                <br />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          id="drop_off_port"
                          style={{ display: "none", width: "100%" }}
                        >
                          <div className="row">
                            <div className="form-group col-md-6">
                              <label>Shipping Destination</label>
                              <input
                                type="text"
                                name="txt_dropoff_port_shipdestination"
                                className="required form-control form-control-sm"
                                maxLength={15}
                              />
                            </div>
                          </div>
                        </div>
                        <div
                          id="drop_off_station"
                          style={{ display: "none", width: "100%" }}
                        >
                          <div className="row">
                            <div className="form-group col-md-6">
                              <label>Train Destination</label>
                              <select
                                name="txt_dropoff_station_destination"
                                id="txt_dropoff_station_destination"
                                className="selectpicker form-control form-control-sm required show-menu-arrow bs-select-hidden"
                                data-live-search="true"
                              >
                                <option value>- Select Destination -</option>
                              </select>
                            </div>
                            <div className="form-group col-md-6">
                              <label>Train Name/Number</label>
                              <input
                                type="text"
                                name="txt_dropoff_station_train"
                                className="required form-control form-control-sm"
                                maxLength={20}
                                size={28}
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label>Departure Station</label>
                              <select
                                name="sel_dropoff_station"
                                id="sel_dropoff_station"
                                className="required selectpicker form-control form-control-sm show-menu-arrow bs-select-hidden"
                                data-live-search="true"
                              >
                                <option value>
                                  - Select Departure station -
                                </option>
                              </select>
                            </div>
                            <div className="form-group col-md-6">
                              <label>Time of Departure (Hours : Minutes)</label>
                              <br />
                              <MultiSelect
                                options={hmmm_options}
                                isSearchable
                                isMulti
                                placeholder="-"
                                className="custom-select required"
                                noOptionsMessage={() => "No Time Found"}
                              />

                              <MultiSelect
                                options={mm_options}
                                isSearchable
                                isMulti
                                placeholder="-"
                                className="custom-select required"
                                noOptionsMessage={() => "No Time Found"}
                              />
                            </div>
                          </div>
                        </div>
                        <div
                          id="drop_off_other"
                          style={{ display: "none", width: "100%" }}
                        >
                          <div className="row">
                            <div className="form-group col-md-6">
                              <label>Time of Departure (Hours : Minutes)</label>
                              <br />
                              <MultiSelect
                                options={hmmm_options}
                                isSearchable
                                isMulti
                                placeholder="-"
                                className="custom-select required"
                                noOptionsMessage={() => "No Time Found"}
                              />

                              <MultiSelect
                                options={mm_options}
                                isSearchable
                                isMulti
                                placeholder="-"
                                className="custom-select required"
                                noOptionsMessage={() => "No Time Found"}
                              />
                            </div>
                            <div className="form-group col-md-12">
                              <label>Address 1</label>
                              <input
                                type="text"
                                name="txt_dropoff_other_address1"
                                maxLength={35}
                                className="required form-control form-control-sm"
                              />
                            </div>
                            <div className="form-group col-md-12">
                              <label>Address 2</label>
                              <input
                                type="text"
                                name="txt_dropoff_other_address2"
                                maxLength={35}
                                className="required form-control form-control-sm"
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label>Town/City</label>
                              <br />
                              <input
                                type="text"
                                name="txt_dropoff_other_city"
                                maxLength={35}
                                className="required form-control form-control-sm"
                              />
                              <input
                                type="hidden"
                                name="txt_dropoff_other_city_code"
                                id="txt_dropoff_other_city_code"
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label>Country/State</label>
                              <input
                                type="text"
                                name="txt_dropoff_other_country"
                                maxLength={35}
                                className="required form-control form-control-sm"
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label>Postcode/Zipcode</label>
                              <input
                                type="text"
                                name="txt_dropoff_other_postcode"
                                maxLength={15}
                                className="required form-control form-control-sm"
                                onblur="extractNumber(this,2,false);"
                                onkeyup="extractNumber(this,2,false);"
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label>Phone Number</label>
                              <input
                                type="text"
                                name="txt_dropoff_other_phone"
                                maxLength={15}
                                className="required form-control form-control-sm"
                                onblur="extractNumber(this,2,false);"
                                onkeyup="extractNumber(this,2,false);"
                              />
                            </div>
                          </div>
                        </div>
                        <div
                          id="drop_off_terminal"
                          style={{ display: "none", width: "100%" }}
                        >
                          <div className="row">
                            <div className="form-group col-md-6">
                              <label>Departure Terminal</label>
                              <select
                                name="dropoff_code"
                                id="dropoff_code"
                                className="required selectpicker form-control form-control-sm show-menu-arrow bs-select-hidden"
                                data-live-search="true"
                              >
                                <option value>- Select Terminal -</option>
                              </select>
                            </div>
                            <div className="form-group col-md-6">
                              <label>Time of Departure (Hours : Minutes)</label>
                              <br />
                              <MultiSelect
                                options={hmmm_options}
                                isSearchable
                                isMulti
                                placeholder="-"
                                className="custom-select required"
                                noOptionsMessage={() => "No Time Found"}
                              />

                              <MultiSelect
                                options={mm_options}
                                isSearchable
                                isMulti
                                placeholder="-"
                                className="custom-select required"
                                noOptionsMessage={() => "No Time Found"}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default BookingAddOfflineTransfer;
