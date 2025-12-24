import minus from "../../assets/images/minus_white_img.jpg";
import plus from "../../assets/images/plus_white_img.jpg";
import React, { useState } from "react";
import Flatpickr from "react-flatpickr";
import Header2 from "../header2/header2";
import {
  addrule_currencyOptions,
  advance_suppliers_options,
  goto_supplier_options,
  nationalityOptions,
  salutations,
  supplierProfileOptions,
  suppliersOnlineOptions,
} from "../../constants/contants";
import MultiSelect from "../reactMultiSelect";

const GOtoModifyBooking = () => {
  const [isContentVisible1, setContentVisibility1] = useState(false);
  const toggleContentVisibility = (index) => {
    if (index === 1) {
      setContentVisibility1(!isContentVisible1);
    }
  };

  const [startDate, setStartDate] = useState(null); // State for the start date
  const [startDate1, setStartDate1] = useState(null); // State for the start date
  const [startDate2, setStartDate2] = useState(null); // State for the start date
  const [startDate3, setStartDate3] = useState(null); // State for the start date
  const [endDate, setEndDate] = useState(null); // State for the end date
  const [endDate2, setEndDate2] = useState(null); // State for the end date

  const handleTrashClick = () => {
    // Function to clear both start and end dates
    setStartDate1(null);
  };
  const handleTrashClick1 = () => {
    // Function to clear both start and end dates
    setStartDate3(null);
  };

  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <Header2
          title="MODIFY BOOKING DETAILS"
          linkText1="Search Bookings"
          linkText2="Booking Modification"
          link1="/"
        />

        <div>
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
                  style={{
                    color: "white",
                    fontSize: "15px",
                    marginLeft: "20px",
                  }}
                >
                  Booking Id : TD1129412
                </h5>
              </div>
            </div>
          </div>
          <form>
            <div className="panel-body">
              <div className="row">
                <div className="form-group col-md-3 phps_row_1">
                  <label>Country</label>
                  <br />
                  United Arab Emirates
                </div>
                <div className="form-group col-md-3 phps_row_0">
                  <label>City</label>
                  <br />
                  Dubai
                </div>
                <div className="form-group col-md-3 phps_row_1">
                  <label>Hotel</label>
                  <input
                    type="text"
                    name="sel_hotels_name"
                    defaultValue="SWISSOTEL AL GHURAIR"
                    className="form-control form-control-sm test123"
                  />
                </div>
                <div className="form-group col-md-3 phps_row_0">
                  <label>Booking Current Status</label>
                  <br />
                  Vouchered
                </div>
              </div>
              <div className="row form-group mt-1">
                <div className="col-md-12 phps_row_1">
                  <label>Hotel Address</label>
                  <textarea
                    name="hotel_address1"
                    className="form-control"
                    id="hotel_address1"
                    rows={4}
                    cols={40}
                    defaultValue={"Umar Bin Al Kattab Road P.O. Box 185051"}
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="form-group col-md-3 phps_row_0">
                  <label>Hotel Phone</label>
                  <input
                    type="text"
                    name="hotel_phone"
                    id="hotel_phone"
                    className="form-control form-control-sm"
                    maxLength={15}
                  />
                  {/* required */}
                </div>
                <div className="form-group col-md-3 phps_row_1">
                  <label>Booking Status</label>
                  <input
                    type="hidden"
                    name="previous_status"
                    defaultValue="vouchered"
                    className="form-control form-control-sm"
                  />
                  <select
                    name="sel_booking_status"
                    className="required selectpicker show-menu-arrow form-control form-control-sm bs-select-hidden"
                    onchange="change_status();check_status(this.value)"
                    id="sel_booking_status"
                    data-live-search="true"
                  >
                    <option value>--Select Status--</option>
                    <option value>Vouchered</option>
                  </select>
                </div>
                <div className="form-group col-md-3 phps_row_0">
                  <label>Check-in / Check-out</label>
                  <div className="input-group date readonly col-md-12" id>
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
                  </div>
                </div>
                <div className="form-group col-md-3 phps_row_1">
                  <label>Total Nights</label>
                  <input
                    type="text"
                    name="total_night"
                    defaultValue={1}
                    className="required form-control form-control-sm"
                    readOnly="readonly"
                  />
                </div>
              </div>
              <div className="form-group row mt-2 mb-4">
                <div className="form-group col-md-3 phps_row_0">
                  {/* <div id="conf_no"></div> */}
                  <label>Confirmation Number/Supplier ref#</label>
                  <input
                    type="text"
                    name="confirmation_number"
                    defaultValue="148-2950740"
                    maxLength={100}
                    className="form-control form-control-sm"
                  />
                </div>
                <div className="form-group col-md-3 phps_row_1">
                  <label>Agent Reference</label>
                  <input
                    type="text"
                    name="agent_ref_no"
                    defaultValue="WegoRef04123"
                    maxLength={100}
                    className="form-control form-control-sm"
                  />
                </div>
              </div>
              <div
                className="form-group panel-body"
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
                    <h5>Passenger Details</h5>
                  </div>
                  <div className="form-group col-md-3 phps_row_0">
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
                  <div className="col-md-12 phps_row_1">
                    <div className="row">
                      <div className="col-md-12 form-group">
                        <img
                          src={isContentVisible1 ? minus : plus}
                          id="moreFilterBtn"
                          alt="cri"
                          onClick={() => toggleContentVisibility(1)}
                          style={{ cursor: "pointer" }}
                        />
                        &nbsp;
                        <label>
                          <b>Single</b>
                        </label>
                        <br />
                      </div>
                    </div>
                    <style
                      dangerouslySetInnerHTML={{
                        __html:
                          "\n\n.hidden{\n  display: none;\n}\n.expand{\n  display: block;\n}\n\n",
                      }}
                    />
                    <div
                      className={`datapop data_1 ${
                        isContentVisible1 ? "expand" : "hidden"
                      }`}
                      id="r_1"
                    >
                      <div style={{ paddingLeft: "50px" }}>
                        <label>
                          <b>Room 1</b>
                        </label>
                      </div>
                      <div className="row">
                        <div className="form-group col-md-2">
                          {/* <label>Pax 1</label> */}
                          <div style={{ paddingLeft: "120px" }}>
                            <label>Pax 1</label>
                          </div>
                        </div>
                        {/* code changed by rakesh for salutations */}
                        <div className="form-group col-md-2 phps_row_0">
                          {/* Code added by Navin for displaying child salutation start */}
                          <MultiSelect
                            options={salutations}
                            isMulti
                            isSearchable
                            placeholder="- Title -"
                            noOptionsMessage={() => "No Option Found"}
                            className="custom-select required"
                          />
                          {/* Code added by Navin for displaying child salutation end*/}
                        </div>
                        {/* code changed by rakesh for salutations */}
                        <div className="form-group col-md-3 phps_row_1">
                          <input
                            name="single_first_name[]"
                            placeholder="First Name"
                            id="first_name_0"
                            type="text"
                            defaultValue="Bilal"
                            size={15}
                            className="required first form-control form-control-sm"
                          />
                        </div>
                        <div className="form-group col-md-3 phps_row_0">
                          <div className="input-group date col-md-12 col-xs-12">
                            <input
                              name="single_last_name[]"
                              placeholder="Last Name"
                              id="last_name_0"
                              type="text"
                              defaultValue="Hussain"
                              size={15}
                              className="required last form-control form-control-sm"
                            />
                            {/* code modified by himanshu for GT-672 on 9-11-2013 */}
                          </div>
                        </div>
                        <input name="single_age[]" id="age_0" type="hidden" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="form-group col-md-12 phps_row_1">
                  <h5>Supplier Type</h5>
                  <div className="radioline1">
                    <div className="radio radio-success radio-inline">
                      <input
                        id="rdSupplierType1"
                        type="radio"
                        name="rdSupplierType"
                        defaultValue="O"
                        onclick="checkSuppType(this.value);"
                        defaultChecked="checked"
                      />
                      <label htmlFor="rdSupplierType1">Online Supplier</label>
                    </div>
                    <div className="radio radio-success radio-inline">
                      <input
                        id="app"
                        type="radio"
                        name="rdSupplierType"
                        defaultValue="L"
                        onclick="checkSuppType(this.value);"
                      />
                      <label htmlFor="rdSupplierType2">Local Supplier</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-12 phps_row_0">
                  <div
                    id="onlineSupp"
                    style={{ width: "100%", display: "block" }}
                  >
                    <div className="row">
                      <div className="form-group col-md-3">
                        <label>Supplier</label>
                        <MultiSelect
                          options={suppliersOnlineOptions}
                          isMulti
                          isSearchable
                          placeholder="- Select -"
                          noOptionsMessage={() => "No Supplier Found"}
                          className="custom-select required"
                        />
                      </div>
                      <div className="form-group col-md-3">
                        <label>Supplier Profile</label>

                        <MultiSelect
                          options={goto_supplier_options}
                          isMulti
                          isSearchable
                          placeholder="- Select -"
                          noOptionsMessage={() => "No Options Found"}
                          className="custom-select required"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    id="localSupp"
                    style={{ width: "100%", display: "none" }}
                  >
                    <div className="row">
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
                        <MultiSelect
                          options={supplierProfileOptions}
                          isSearchable
                          isMulti
                          placeholder="- Select Supplier -"
                          className="custom-select required"
                          noOptionsMessage={() => "No Supplier Found"}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-2 ">
                <div className="form-group col-md-3">
                  <label>Supplier Currency</label>
                  <MultiSelect
                    options={addrule_currencyOptions}
                    isMulti
                    isSearchable
                    placeholder="- Select Currency -"
                    noOptionsMessage={() => "No Currency Found"}
                    className="custom-select required"
                  />
                  \
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
                  <input
                    type="text"
                    className="required form-control form-control-sm"
                    id="applied_multiplier"
                    name="applied_multiplier"
                    defaultValue="1.14734"
                    onblur="get_modification_value(this)"
                    onkeyup="extractNumber(this,5,false);"
                  />
                  <span id="nc1"> EUR </span> To <span id="dc1">USD </span>
                </div>
                <div className="form-group col-md-3">
                  <label>Current Rate</label>
                  <br />
                  <span id="currency_conversion_1">1.14734</span>
                </div>
                <div style={{ display: "none" }}>
                  <div className="form-group col-md-3">
                    <label>Basecurrency Multiplier</label>
                    <input
                      type="text"
                      name="basecurrency_multiplier"
                      className="form-control form-control-sm"
                      id="basecurrency_multiplier"
                      onblur="extractNumber(this,5,false);"
                      defaultValue="3.75"
                      onkeyup="extractNumber(this,6,false);"
                    />
                    <span id="dc2">USD </span> To USD To SAR Current Rate
                    <div id="currency_conversion_2">1</div>
                  </div>
                  <div className="form-group col-md-3">
                    <label>Basecurrency Multiplier Native</label>
                    <input
                      type="text"
                      name="basecurrency_multiplier_native"
                      className="form-control form-control-sm"
                      id="basecurrency_multiplier_native"
                      onblur="extractNumber(this,5,false);"
                      defaultValue="4.30262"
                      onkeyup="extractNumber(this,6,false);"
                    />
                    <span id="nc2"> EUR </span> To SAR Current Rate-:{" "}
                    <div id="currency_conversion_3"> 1.14734</div>
                  </div>
                  <div className="form-group col-md-3">
                    <label>Booking Currency To Agent Currency Multiplier</label>
                    <input
                      type="text"
                      name="agent_currency_multiplier"
                      className="form-control form-control-sm"
                      id="agent_currency_multiplier"
                      defaultValue="3.75"
                      onblur="extractNumber(this,5,false);"
                      onkeyup="extractNumber(this,6,false);"
                    />
                    <span id="dc4"> USD </span> To <span id="dc5">SAR</span>
                    Current Rate- <div id="currency_conversion_4">3.75</div>
                  </div>
                </div>
              </div>
              <div className="row mt-2">
                <div className="form-group col-md-3">
                  <label>Markup Type</label>
                  <div className="radioline1">
                    <div className="radio radio-success radio-inline">
                      <input
                        type="radio"
                        id="percentage"
                        name="rdMarkupType"
                        defaultValue="P"
                        onclick="checkMarkupType(this.value);"
                        defaultChecked="checked"
                      />
                      <label htmlFor="percentage">Percentage</label>
                    </div>
                    <div className="radio radio-success radio-inline">
                      <input
                        type="radio"
                        name="rdMarkupType"
                        id="app"
                        defaultValue="A"
                        onclick="checkMarkupType(this.value);"
                      />
                      <label htmlFor="amount">Amount</label>
                    </div>
                  </div>
                </div>
                <div
                  className="form-group col-md-3"
                  id="amountmarkup"
                  style={{ display: "none" }}
                >
                  <label>Markup Amount</label>
                  <input
                    type="text"
                    name="amount_markup"
                    id="amount_markup"
                    defaultValue
                    onclick="checksupplieramount()"
                    onchange="get_markup_by_amount()"
                    className="form-control"
                  />
                </div>
                <div className="form-group col-md-3">
                  <label>Agent Markup</label>
                  <div className="input-group date col-md-12 col-xs-12">
                    <input
                      type="text"
                      name="txt_agent_markup"
                      id="txt_agent_markup"
                      className="form-control"
                      defaultValue="23.596798270365"
                      size={5}
                      onchange="cal_total_markup();"
                      onblur="extractNumber(this,2,true);"
                      onkeyup="extractNumber(this,2,true);"
                    />
                    <span className="input-group-addon">%</span>
                  </div>
                </div>
                <div className="form-group col-md-3">
                  <label>Total Markup</label>
                  <div className="input-group date col-md-12 col-xs-12">
                    <input
                      type="text"
                      readOnly="readonly"
                      name="txt_markup"
                      id="txt_markup"
                      className="form-control"
                      defaultValue="23.596798270365"
                      size={5}
                      onblur="extractNumber(this,3,false);get_modification_value(this);"
                      onkeyup="extractNumber(this,3,false);"
                    />
                    <span className="input-group-addon">%</span>
                    <input
                      type="hidden"
                      name="txt_wh_markup"
                      defaultValue={0}
                      size={5}
                    />
                  </div>
                </div>
              </div>
              <hr />
              <div className=" form-group col-md-12 phps_row_0">
                <h5>Room Rates (Per room supplier rate)</h5>
                <table id="search_sup" className="table   table-responsive">
                  <input
                    type="hidden"
                    name="room_type[]"
                    defaultValue="single"
                  />
                  <tbody className="bg-white">
                    <tr>
                      <th
                        style={{
                          backgroundColor: "#FF5015",
                          color: "white",
                          textAlign: "left !important",
                          fontSize: "12px",
                        }}
                      >
                        Single Room
                      </th>
                    </tr>
                    <tr>
                      <td colSpan={3}>
                        <div className="row">
                          <div
                            className="form-group col-md-3"
                            style={{ textAlign: "left !important" }}
                          >
                            <label>Room Description</label>
                            {/* code modified by himanshu for Romm description auto filled on 9-11-2013*/}
                            <input
                              type="text"
                              name="single_description"
                              defaultValue="Double deluxe BED AND BREAKFAST   "
                              size={50}
                              className="form-control required"
                            />
                          </div>
                          <div className="col-md-3">
                            <input
                              type="hidden"
                              name="single_code"
                              defaultValue
                              className="form-control"
                            />
                          </div>
                          <div
                            className="form-group col-md-3"
                            style={{ textAlign: "left !important" }}
                          >
                            <label>Number of Rooms</label>
                            <input
                              type="text"
                              name="single_number_of_rooms"
                              defaultValue={1}
                              size={5}
                              readOnly="readonly"
                              className="form-control"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3}>
                        <div className="row">
                          <div
                            className="form-group col-md-3"
                            style={{ textAlign: "left !important" }}
                          >
                            <label>Date</label>
                          </div>
                          <div
                            className="form-group col-md-3"
                            style={{ textAlign: "left !important" }}
                          >
                            <label>&nbsp;Supplier Room Rate </label>
                          </div>
                          <div
                            className="form-group col-md-3"
                            style={{ textAlign: "left !important" }}
                          >
                            <label>&nbsp;Agent Room Rate </label>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3}>
                        <div className="row">
                          <div
                            className="form-group col-md-3"
                            style={{ textAlign: "left !important" }}
                          >
                            17-09-2023
                          </div>
                          <div
                            className="form-group col-md-3"
                            style={{ textAlign: "left !important" }}
                          >
                            <div className="input-group col-md-12 col-sm-12">
                              <input
                                type="text"
                                id="supplier_rate"
                                name="single_native_rate[]"
                                defaultValue="78.67"
                                size={10}
                                onblur="extractNumber(this,3,false);"
                                onkeyup="extractNumber(this,3,false);$('#supplier_rate_copy').hide();"
                                onchange="get_modification_value(this);cal_total_markup_after_rate_edit(this);"
                                className="single form-control form-control-sm required"
                              />
                              {/* code modified by himanshu for copy link option on 19-11-2013 */}
                            </div>
                          </div>
                          <div
                            className="form-group col-md-3"
                            style={{ textAlign: "left !important" }}
                          >
                            <div className="input-group col-md-12 col-sm-12">
                              <input
                                type="text"
                                id="single_display_rate0"
                                name="single_display_rate[]"
                                defaultValue="111.56"
                                size={10}
                                onblur="extractNumber(this,3,false);"
                                onkeyup="extractNumber(this,3,false);$('#agent_rate_copy').hide();"
                                onchange="markup_change_with_selling_rate(this)"
                                className="agentrate form-control"
                              />
                            </div>
                          </div>
                          <input
                            type="hidden"
                            id="single_wh_display_rate0"
                            name="single_wh_display_rate[]"
                            defaultValue="111.56"
                            size={10}
                            className="form-control form-control-sm"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3}>
                        <div className="row">
                          <div
                            className="form-group col-md-3"
                            style={{ textAlign: "left !important" }}
                          />
                          <div
                            className="form-group col-md-3"
                            style={{ textAlign: "left !important" }}
                          >
                            <label>Supplier rate :</label>{" "}
                            <span id="total_supplier_rate">78.67</span>
                            <span id="nc4">EUR</span>
                          </div>
                          <div
                            className="form-group col-md-3"
                            style={{ textAlign: "left !important" }}
                          >
                            <div className="row">
                              <div className="col-md-12">
                                <label>Agent rate :</label>{" "}
                                <span id="total_agent_rate">111.56</span>
                                <span id="dc8">USD</span>
                              </div>
                              <div
                                className="col-md-12"
                                style={{ display: "none" }}
                              >
                                <label>Wh Agent rate</label>
                                <span id="wh_total_display_rate">
                                  111.56
                                </span>{" "}
                                <span id="dc5"> USD</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3}>
                        <div className="row">
                          <div
                            className="form-group col-md-3"
                            style={{ textAlign: "left !important" }}
                          >
                            <label>Supplier Discount</label>
                          </div>
                          <div
                            className="form-group col-md-3"
                            style={{ textAlign: "left !important" }}
                          >
                            <input
                              type="text"
                              name="native_discount"
                              defaultValue={0.0}
                              onchange="get_modification_value(this)"
                              size={5}
                              onblur="extractNumber(this,3,false);"
                              onkeyup="extractNumber(this,3,false);"
                              maxLength={6}
                              className="form-control form-control-sm"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3}>
                        <div className="row">
                          <div
                            className="form-group col-md-3"
                            style={{ textAlign: "left !important" }}
                          >
                            <label>Agent Display Discount</label>
                          </div>
                          <div
                            className="form-group col-md-3"
                            style={{ textAlign: "left !important" }}
                          >
                            <input
                              type="text"
                              name="display_discount"
                              id="display_discount"
                              defaultValue={0.0}
                              onchange="get_modification_value(this)"
                              size={5}
                              onblur="extractNumber(this,3,false);"
                              onkeyup="extractNumber(this,3,false);"
                              maxLength={6}
                              className="form-control"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3}>
                        <div className="row">
                          <div
                            className="form-group col-md-3"
                            style={{ textAlign: "left !important" }}
                          >
                            <label>Total Supplier Rate Of 1 Room(s)</label>
                          </div>
                          <div
                            className="form-group col-md-3"
                            style={{ textAlign: "left !important" }}
                          >
                            <span id="total_native_rate">78.67</span>{" "}
                            <span id="nc4">EUR</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3}>
                        <div className="row">
                          <div
                            className="form-group col-md-3"
                            style={{ textAlign: "left !important" }}
                          >
                            <label>Total Agent Rate Of 1 Room(s) </label>
                          </div>
                          <div
                            className="form-group col-md-3"
                            style={{ textAlign: "left !important" }}
                          >
                            <span id="total_display_rate">111.56</span>
                            <span id="dc6"> USD</span>
                            &nbsp;
                            <i
                              className="fa fa-info-circle"
                              title
                              data-toggle="tooltip"
                              data-placement="top"
                              data-original-title="Service Tax is included in Total Booking Cost."
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3}>
                        <div className="row">
                          <div
                            className="form-group col-md-3"
                            style={{ textAlign: "left !important" }}
                          >
                            <label>Applicable Tax</label>
                          </div>
                          <div
                            className="form-group col-md-3"
                            style={{ textAlign: "left !important" }}
                          >
                            <div className="input-group col-md-12 col-sm-12">
                              <input
                                type="text"
                                name="applicable_tax"
                                id="applicable_tax"
                                defaultValue
                                className="form-control form-control-sm"
                                readOnly
                              />
                              <span className="input-group-addon">
                                <span id="dc7">USD</span>{" "}
                              </span>
                            </div>
                          </div>
                          <div className="col-md-6" id="tax" />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3}>
                        <div className="row">
                          <div
                            className="form-group col-md-3"
                            style={{ textAlign: "left !important" }}
                          >
                            <label>Payment Gateway Charges Of 1 Room(s)</label>
                          </div>
                          <div
                            className="form-group col-md-3"
                            style={{ textAlign: "left !important" }}
                          >
                            <div className="input-group col-md-12 col-sm-12">
                              <input
                                type="text"
                                name="additional_charge"
                                defaultValue={0.0}
                                className="form-control form-control-sm"
                              />
                              <span className="input-group-addon">
                                <span id="dc7">USD</span>{" "}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <hr />
              <div
                className="form-group panel-body mb-3"
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
                    <h5>Passport Details</h5>
                  </div>
                  <div className="form-group col-md-3 phps_row_1">
                    <label>Passport Number</label>
                    <input
                      type="text"
                      name="passport_number"
                      id="passport_number"
                      size={15}
                      className="form-control form-control-sm"
                    />
                  </div>
                </div>
              </div>
              <div
                className="form-group panel-body"
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
                    <h5>Flight Details</h5>
                  </div>
                  <div className="form-group col-md-3 phps_row_0">
                    <label>Flight Number</label>
                    <input
                      type="text"
                      name="flight_number"
                      id="flight_number"
                      maxLength={5}
                      className="form-control form-control-sm"
                    />
                  </div>
                  <div className="form-group col-md-3 phps_row_1">
                    <label>PNR</label>
                    <input
                      type="text"
                      name="flight_pnr_number"
                      id="flight_pnr_number"
                      maxLength={20}
                      className="form-control form-control-sm"
                    />
                  </div>
                  <div className="form-group col-md-3 phps_row_0">
                    <label>Arrival Destination</label>
                    <input
                      type="text"
                      name="flight_arrival_destination"
                      id="flight_arrival_destination"
                      className="form-control form-control-sm"
                    />
                  </div>
                  <div className="form-group col-md-3 phps_row_1">
                    <label>Arrival Date</label>
                    <div
                      className="input-group date col-md-12 col-xs-12 col-sm-12 flt_arrival_date"
                      id="flt_arrival_date"
                    >
                      <Flatpickr
                        value={startDate3}
                        onChange={(date) => setStartDate3(date)}
                        options={{ dateFormat: "Y-m-d" }}
                      />
                      <span className="input-group-addon">
                        <i className="fa fa-th" />
                      </span>
                      <span
                        className="input-group-addon pointer"
                        id="flightTrashBtn"
                        onClick={handleTrashClick1}
                      >
                        <i className="fa fa-trash" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-2">
                <div className="form-group col-md-12 phps_row_0">
                  <label>Special Remark</label>
                  <textarea
                    id="special_remark_other"
                    name="special_remark_other"
                    rows={4}
                    cols={70}
                    className="form-control form-control-sm"
                    defaultValue={""}
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="form-group col-md-12 phps_row_0">
                  <label>Emergency Contact</label>
                  <textarea
                    id="special_remark_other"
                    name="special_remark_other"
                    rows={4}
                    cols={70}
                    className="form-control form-control-sm"
                    defaultValue={""}
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="form-group col-md-3 phps_row_0">
                  <label>Cancellation date</label>
                  <div className="input-group date col-md-12 col-xs-12 col-sm-12">
                    <input
                      id="expiration_date"
                      data-bs-toggle="tooltip"
                      data-placement="top"
                      title="If you Modify Expiration Date, also change in cancellation policy."
                      className="form-control form-control-sm required"
                      name="expiration_date"
                      type="text"
                      size={25}
                      defaultValue="15/09/2023 05:29:00"
                      onkeypress="copyExpirationDate()"
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-2">
                <div className="form-group col-md-12 phps_row_1">
                  <label>Cancellation Policy (Policy for agents)</label>
                  <textarea
                    id="cancellation_policy"
                    name="cancellation_policy"
                    rows={4}
                    className="form-control form-control-sm"
                    cols={60}
                    defaultValue={
                      "<strong>Double Deluxe [1 adults 0 Child] </strong><br>Free cancellation up to  02:57:00 on  15th of September 2023 <br/>If you cancel after 02:58:00 on 15th of September 2023  you will be charged USD 111.56\t\t\t\t\t"
                    }
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="form-group col-md-12 phps_row_0">
                  <label>
                    Supplier Cancellation Policy (Policy provided by supplier
                    for internal use)
                  </label>
                  <textarea
                    name="supplier_cancellation_policy"
                    rows={4}
                    cols={70}
                    className="form-control"
                    defaultValue={""}
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="form-group col-md-12 phps_row_1">
                  <label>
                    Comment Contract (Terms and conditions provided by supplier
                    will be displayed on booking)
                  </label>
                  <textarea
                    name="remark"
                    rows={5}
                    cols={70}
                    className="form-control form-control-sm"
                    defaultValue={
                      " Double deluxe  BED AND BREAKFAST:*The Half Board/Full Board supplement will not be able applicable on the 24th December Christmas Eve Dinner, 25th December Christmas Day Brunch and 31st December 2023 New Year’s Eve Dinner*One extra bed will be provided for children between 4 - 11.99 years old, 2nd child will share the existing bedding with the parents.*Complimentary shuttle service to La Mer Beach.Effective from today- 01 August 2022.Kindly note that Half Board and Full Board basis shall be honored as a Set-Menu on Theme Nights i.e., Friday Grill Night and Saturday Seafood Night, should the guests wish to avail the Theme Nights instead of the Set Menu; an additional Supplement of AED 99 per person per meal will apply on top of the HB & FB Supplements.  Estimated total amount of taxes & fees for this booking:20.00 Utd. Arab Emir. Dirham payable on arrival.  No alcohol is served.Check-in hour 15:00-.Car park YES (Without additional debit notes).Single-Use Plastic Free."
                    }
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="form-group col-md-12 phps_row_0">
                  <label>Remark (Important notes for backoffice team)</label>
                  <textarea
                    name="special_remark"
                    rows={4}
                    cols={70}
                    className="form-control form-control-sm"
                    defaultValue={""}
                  />
                </div>
              </div>
              <br />
              <div className="row">
                <div className="form-group col-md-12 phps_row_1">
                  <h5>Email To</h5>
                  <div className="radioline1 mt-1">
                    <div className="checkbox checkbox-success checkbox-inline">
                      <input
                        id="mailtoagent"
                        type="checkbox"
                        name="mailtoagent"
                        defaultValue={1}
                      />
                      <label htmlFor="mailtoagent">Agent and Consultant</label>
                    </div>
                    <div className="checkbox checkbox-success checkbox-inline">
                      <input
                        id="app"
                        type="checkbox"
                        name="mailtocommon"
                        defaultValue={1}
                      />
                      <label htmlFor="mailtocommon">Email Settings</label>
                    </div>
                    <div className="checkbox checkbox-success checkbox-inline">
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
              <br />
              <div className="row">
                <div className="form-group col-md-3 phps_row_0">
                  <span id="loading" style={{ display: "none" }}>
                    <img src="/cpfv3/images/loading.gif" alt="" />
                  </span>
                  <span id="save_button" style={{ display: "block" }}>
                    <button
                      type="button"
                      className="btn btn-dark btn-sm"
                      name="b1"
                      id="b1"
                      value="Save"
                      onclick="Javascript submit_form(document.forms['modify_booking_form']);"
                    >
                      <i className="fa fa-floppy-o" />
                      &nbsp;Save
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </form>
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
                  style={{
                    color: "white",
                    fontSize: "15px",
                    marginLeft: "20px",
                  }}
                >
                  Booking Id : TD1129412
                </h5>
              </div>
            </div>
          </div>
          <form>
            <div className="panel-body">
              <div className="row">
                <div className="form-group col-md-3 phps_row_1">
                  <label>Country</label>
                  <br />
                  United Arab Emirates
                </div>
                <div className="form-group col-md-3 phps_row_0">
                  <label>City</label>
                  <br />
                  Dubai
                </div>
                <div className="form-group col-md-3 phps_row_1">
                  <label>Hotel</label>
                  <input
                    type="text"
                    name="sel_hotels_name"
                    defaultValue="SWISSOTEL AL GHURAIR"
                    className="form-control form-control-sm test123"
                  />
                </div>
                <div className="form-group col-md-3 phps_row_0">
                  <label>Booking Current Status</label>
                  <br />
                  Vouchered
                </div>
              </div>
              <div className="row form-group mt-1">
                <div className="col-md-12 phps_row_1">
                  <label>Hotel Address</label>
                  <textarea
                    name="hotel_address1"
                    className="form-control"
                    id="hotel_address1"
                    rows={4}
                    cols={40}
                    defaultValue={"Umar Bin Al Kattab Road P.O. Box 185051"}
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="form-group col-md-3 phps_row_0">
                  <label>Hotel Phone</label>
                  <input
                    type="text"
                    name="hotel_phone"
                    id="hotel_phone"
                    className="form-control form-control-sm"
                    maxLength={15}
                  />
                  {/* required */}
                </div>
                <div className="form-group col-md-3 phps_row_1">
                  <label>Booking Status</label>
                  <input
                    type="hidden"
                    name="previous_status"
                    defaultValue="vouchered"
                    className="form-control form-control-sm"
                  />
                  <select
                    name="sel_booking_status"
                    className="required selectpicker show-menu-arrow form-control form-control-sm bs-select-hidden"
                    onchange="change_status();check_status(this.value)"
                    id="sel_booking_status"
                    data-live-search="true"
                  >
                    <option value>--Select Status--</option>
                    <option value>Vouchered</option>
                  </select>
                </div>
                <div className="form-group col-md-3 phps_row_0">
                  <label>Check-in / Check-out</label>
                  <div className="input-group date readonly col-md-12" id>
                    <Flatpickr
                      value={startDate2}
                      onChange={(date) => setStartDate2(date)}
                      options={{ dateFormat: "Y-m-d" }}
                    />

                    <span class="input-group-addon">to</span>
                    <Flatpickr
                      value={endDate2}
                      onChange={(date) => setEndDate2(date)}
                      options={{ dateFormat: "Y-m-d" }}
                    />
                  </div>
                </div>
                <div className="form-group col-md-3 phps_row_1">
                  <label>Total Nights</label>
                  <input
                    type="text"
                    name="total_night"
                    defaultValue={1}
                    className="required form-control form-control-sm"
                    readOnly="readonly"
                  />
                </div>
              </div>
              <div className="form-group row mt-2 mb-4">
                <div className="form-group col-md-3 phps_row_0">
                  {/* <div id="conf_no"></div> */}
                  <label>Confirmation Number/Supplier ref#</label>
                  <input
                    type="text"
                    name="confirmation_number"
                    defaultValue="148-2950740"
                    maxLength={100}
                    className="form-control form-control-sm"
                  />
                </div>
                <div className="form-group col-md-3 phps_row_1">
                  <label>Agent Reference</label>
                  <input
                    type="text"
                    name="agent_ref_no"
                    defaultValue="WegoRef04123"
                    maxLength={100}
                    className="form-control form-control-sm"
                  />
                </div>
              </div>
              <div
                className="form-group panel-body"
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
                    <h5>Passenger Details</h5>
                  </div>
                  <div className="form-group col-md-3 phps_row_0">
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
                  <div className="col-md-12 phps_row_1">
                    <div className="row">
                      <div className="col-md-12 form-group">
                        <img
                          src="minus_white_img.jpg"
                          alt="cri"
                          id="moreFilterBtn"
                          style={{ cursor: "pointer" }}
                        />
                        &nbsp;
                        <label>
                          <b>Single</b>
                        </label>
                        <br />
                      </div>
                    </div>
                    <div
                      className="datapop data_1"
                      style={{ display: "block" }}
                      id="r_1"
                    >
                      <div style={{ paddingLeft: "50px" }}>
                        <label>
                          <b>Room 1</b>
                        </label>
                      </div>
                      <div className="row">
                        <div className="form-group col-md-2">
                          {/* <label>Pax 1</label> */}
                          <div style={{ paddingLeft: "120px" }}>
                            <label>Pax 1</label>
                          </div>
                        </div>
                        {/* code changed by rakesh for salutations */}
                        <div className="form-group col-md-2 phps_row_0">
                          {/* Code added by Navin for displaying child salutation start */}
                          <MultiSelect
                            options={salutations}
                            isMulti
                            isSearchable
                            placeholder="- Title -"
                            noOptionsMessage={() => "No Option Found"}
                            className="custom-select required"
                          />
                          {/* Code added by Navin for displaying child salutation end*/}
                        </div>
                        {/* code changed by rakesh for salutations */}
                        <div className="form-group col-md-3 phps_row_1">
                          <input
                            name="single_first_name[]"
                            placeholder="First Name"
                            id="first_name_0"
                            type="text"
                            defaultValue="Bilal"
                            size={15}
                            className="required first form-control form-control-sm"
                          />
                        </div>
                        <div className="form-group col-md-3 phps_row_0">
                          <div className="input-group date col-md-12 col-xs-12">
                            <input
                              name="single_last_name[]"
                              placeholder="Last Name"
                              id="last_name_0"
                              type="text"
                              defaultValue="Hussain"
                              size={15}
                              className="required last form-control form-control-sm"
                            />
                            {/* code modified by himanshu for GT-672 on 9-11-2013 */}
                          </div>
                        </div>
                        <input name="single_age[]" id="age_0" type="hidden" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="form-group col-md-12 phps_row_1">
                  <h5>Supplier Type</h5>
                  <div className="radioline1">
                    <div className="radio radio-success radio-inline">
                      <input
                        id="rdSupplierType1"
                        type="radio"
                        name="rdSupplierType"
                        defaultValue="O"
                        onclick="checkSuppType(this.value);"
                        defaultChecked="checked"
                      />
                      <label htmlFor="rdSupplierType1">Online Supplier</label>
                    </div>
                    <div className="radio radio-success radio-inline">
                      <input
                        id="app"
                        type="radio"
                        name="rdSupplierType"
                        defaultValue="L"
                        onclick="checkSuppType(this.value);"
                      />
                      <label htmlFor="rdSupplierType2">Local Supplier</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-12 phps_row_0">
                  <div
                    id="onlineSupp"
                    style={{ width: "100%", display: "block" }}
                  >
                    <div className="row">
                      <div className="form-group col-md-3">
                        <label>Supplier</label>
                        <MultiSelect
                          options={suppliersOnlineOptions}
                          isMulti
                          isSearchable
                          placeholder="- Select -"
                          noOptionsMessage={() => "No Supplier Found"}
                          className="custom-select required"
                        />
                      </div>
                      <div className="form-group col-md-3">
                        <label>Supplier Profile</label>

                        <MultiSelect
                          options={goto_supplier_options}
                          isMulti
                          isSearchable
                          placeholder="- Select -"
                          noOptionsMessage={() => "No Options Found"}
                          className="custom-select required"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    id="localSupp"
                    style={{ width: "100%", display: "none" }}
                  >
                    <div className="row">
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
                        <MultiSelect
                          options={supplierProfileOptions}
                          isSearchable
                          isMulti
                          placeholder="- Select Supplier -"
                          className="custom-select required"
                          noOptionsMessage={() => "No Supplier Found"}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-2 ">
                <div className="form-group col-md-3">
                  <label>Supplier Currency</label>
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
                  <input
                    type="text"
                    className="required form-control form-control-sm"
                    id="applied_multiplier"
                    name="applied_multiplier"
                    defaultValue="1.14734"
                    onblur="get_modification_value(this)"
                    onkeyup="extractNumber(this,5,false);"
                  />
                  <span id="nc1"> EUR </span> To <span id="dc1">USD </span>
                </div>
                <div className="form-group col-md-3">
                  <label>Current Rate</label>
                  <br />
                  <span id="currency_conversion_1">1.14734</span>
                </div>
                <div style={{ display: "none" }}>
                  <div className="form-group col-md-3">
                    <label>Basecurrency Multiplier</label>
                    <input
                      type="text"
                      name="basecurrency_multiplier"
                      className="form-control form-control-sm"
                      id="basecurrency_multiplier"
                      onblur="extractNumber(this,5,false);"
                      defaultValue="3.75"
                      onkeyup="extractNumber(this,6,false);"
                    />
                    <span id="dc2">USD </span> To USD To SAR Current Rate
                    <div id="currency_conversion_2">1</div>
                  </div>
                  <div className="form-group col-md-3">
                    <label>Basecurrency Multiplier Native</label>
                    <input
                      type="text"
                      name="basecurrency_multiplier_native"
                      className="form-control form-control-sm"
                      id="basecurrency_multiplier_native"
                      onblur="extractNumber(this,5,false);"
                      defaultValue="4.30262"
                      onkeyup="extractNumber(this,6,false);"
                    />
                    <span id="nc2"> EUR </span> To SAR Current Rate-:{" "}
                    <div id="currency_conversion_3"> 1.14734</div>
                  </div>
                  <div className="form-group col-md-3">
                    <label>Booking Currency To Agent Currency Multiplier</label>
                    <input
                      type="text"
                      name="agent_currency_multiplier"
                      className="form-control form-control-sm"
                      id="agent_currency_multiplier"
                      defaultValue="3.75"
                      onblur="extractNumber(this,5,false);"
                      onkeyup="extractNumber(this,6,false);"
                    />
                    <span id="dc4"> USD </span> To <span id="dc5">SAR</span>
                    Current Rate- <div id="currency_conversion_4">3.75</div>
                  </div>
                </div>
              </div>
              <div className="row mt-2">
                <div className="form-group col-md-3">
                  <label>Markup Type</label>
                  <div className="radioline1">
                    <div className="radio radio-success radio-inline">
                      <input
                        type="radio"
                        id="percentage"
                        name="rdMarkupType"
                        defaultValue="P"
                        onclick="checkMarkupType(this.value);"
                        defaultChecked="checked"
                      />
                      <label htmlFor="percentage">Percentage</label>
                    </div>
                    <div className="radio radio-success radio-inline">
                      <input
                        type="radio"
                        name="rdMarkupType"
                        id="app"
                        defaultValue="A"
                        onclick="checkMarkupType(this.value);"
                      />
                      <label htmlFor="amount">Amount</label>
                    </div>
                  </div>
                </div>
                <div
                  className="form-group col-md-3"
                  id="amountmarkup"
                  style={{ display: "none" }}
                >
                  <label>Markup Amount</label>
                  <input
                    type="text"
                    name="amount_markup"
                    id="amount_markup"
                    onclick="checksupplieramount()"
                    onchange="get_markup_by_amount()"
                    className="form-control"
                  />
                </div>
                <div className="form-group col-md-3">
                  <label>Agent Markup</label>
                  <div className="input-group date col-md-12 col-xs-12">
                    <input
                      type="text"
                      name="txt_agent_markup"
                      id="txt_agent_markup"
                      className="form-control"
                      defaultValue="23.596798270365"
                      size={5}
                      onchange="cal_total_markup();"
                      onblur="extractNumber(this,2,true);"
                      onkeyup="extractNumber(this,2,true);"
                    />
                    <span className="input-group-addon">%</span>
                  </div>
                </div>
                <div className="form-group col-md-3">
                  <label>Total Markup</label>
                  <div className="input-group date col-md-12 col-xs-12">
                    <input
                      type="text"
                      readOnly="readonly"
                      name="txt_markup"
                      id="txt_markup"
                      className="form-control"
                      defaultValue="23.596798270365"
                      size={5}
                      onblur="extractNumber(this,3,false);get_modification_value(this);"
                      onkeyup="extractNumber(this,3,false);"
                    />
                    <span className="input-group-addon">%</span>
                    <input
                      type="hidden"
                      name="txt_wh_markup"
                      defaultValue={0}
                      size={5}
                    />
                  </div>
                </div>
              </div>
              <hr />
              <div className=" form-group col-md-12 phps_row_0">
                <h5>Room Rates (Per room supplier rate)</h5>
                <table id="search_sup" className="table   table-responsive">
                  <input
                    type="hidden"
                    name="room_type[]"
                    defaultValue="single"
                  />
                  <tbody className="bg-white">
                    <tr>
                      <th
                        style={{
                          backgroundColor: "#FF5015",
                          color: "white",
                          textAlign: "left !important",
                          fontSize: "12px",
                        }}
                      >
                        Single Room
                      </th>
                    </tr>
                    <tr>
                      <td colSpan={3}>
                        <div className="row">
                          <div
                            className="form-group col-md-3"
                            style={{ textAlign: "left !important" }}
                          >
                            <label>Room Description</label>
                            {/* code modified by himanshu for Romm description auto filled on 9-11-2013*/}
                            <input
                              type="text"
                              name="single_description"
                              defaultValue="Double deluxe BED AND BREAKFAST   "
                              size={50}
                              className="form-control required"
                            />
                          </div>
                          <div className="col-md-3">
                            <input
                              type="hidden"
                              name="single_code"
                              className="form-control"
                            />
                          </div>
                          <div
                            className="form-group col-md-3"
                            style={{ textAlign: "left !important" }}
                          >
                            <label>Number of Rooms</label>
                            <input
                              type="text"
                              name="single_number_of_rooms"
                              defaultValue={1}
                              size={5}
                              readOnly="readonly"
                              className="form-control"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3}>
                        <div className="row">
                          <div
                            className="form-group col-md-3"
                            style={{ textAlign: "left !important" }}
                          >
                            <label>Date</label>
                          </div>
                          <div
                            className="form-group col-md-3"
                            style={{ textAlign: "left !important" }}
                          >
                            <label>&nbsp;Supplier Room Rate </label>
                          </div>
                          <div
                            className="form-group col-md-3"
                            style={{ textAlign: "left !important" }}
                          >
                            <label>&nbsp;Agent Room Rate </label>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3}>
                        <div className="row">
                          <div
                            className="form-group col-md-3"
                            style={{ textAlign: "left !important" }}
                          >
                            17-09-2023
                          </div>
                          <div
                            className="form-group col-md-3"
                            style={{ textAlign: "left !important" }}
                          >
                            <div className="input-group col-md-12 col-sm-12">
                              <input
                                type="text"
                                id="supplier_rate"
                                name="single_native_rate[]"
                                defaultValue="78.67"
                                size={10}
                                onblur="extractNumber(this,3,false);"
                                onkeyup="extractNumber(this,3,false);$('#supplier_rate_copy').hide();"
                                onchange="get_modification_value(this);cal_total_markup_after_rate_edit(this);"
                                className="single form-control form-control-sm required"
                              />
                              {/* code modified by himanshu for copy link option on 19-11-2013 */}
                            </div>
                          </div>
                          <div
                            className="form-group col-md-3"
                            style={{ textAlign: "left !important" }}
                          >
                            <div className="input-group col-md-12 col-sm-12">
                              <input
                                type="text"
                                id="single_display_rate0"
                                name="single_display_rate[]"
                                defaultValue="111.56"
                                size={10}
                                onblur="extractNumber(this,3,false);"
                                onkeyup="extractNumber(this,3,false);$('#agent_rate_copy').hide();"
                                onchange="markup_change_with_selling_rate(this)"
                                className="agentrate form-control"
                              />
                            </div>
                          </div>
                          <input
                            type="hidden"
                            id="single_wh_display_rate0"
                            name="single_wh_display_rate[]"
                            defaultValue="111.56"
                            size={10}
                            className="form-control form-control-sm"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3}>
                        <div className="row">
                          <div
                            className="form-group col-md-3"
                            style={{ textAlign: "left !important" }}
                          />
                          <div
                            className="form-group col-md-3"
                            style={{ textAlign: "left !important" }}
                          >
                            <label>Supplier rate :</label>{" "}
                            <span id="total_supplier_rate">78.67</span>
                            <span id="nc4">EUR</span>
                          </div>
                          <div
                            className="form-group col-md-3"
                            style={{ textAlign: "left !important" }}
                          >
                            <div className="row">
                              <div className="col-md-12">
                                <label>Agent rate :</label>{" "}
                                <span id="total_agent_rate">111.56</span>
                                <span id="dc8">USD</span>
                              </div>
                              <div
                                className="col-md-12"
                                style={{ display: "none" }}
                              >
                                <label>Wh Agent rate</label>
                                <span id="wh_total_display_rate">
                                  111.56
                                </span>{" "}
                                <span id="dc5"> USD</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3}>
                        <div className="row">
                          <div
                            className="form-group col-md-3"
                            style={{ textAlign: "left !important" }}
                          >
                            <label>Supplier Discount</label>
                          </div>
                          <div
                            className="form-group col-md-3"
                            style={{ textAlign: "left !important" }}
                          >
                            <input
                              type="text"
                              name="native_discount"
                              defaultValue={0.0}
                              onchange="get_modification_value(this)"
                              size={5}
                              onblur="extractNumber(this,3,false);"
                              onkeyup="extractNumber(this,3,false);"
                              maxLength={6}
                              className="form-control form-control-sm"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3}>
                        <div className="row">
                          <div
                            className="form-group col-md-3"
                            style={{ textAlign: "left !important" }}
                          >
                            <label>Agent Display Discount</label>
                          </div>
                          <div
                            className="form-group col-md-3"
                            style={{ textAlign: "left !important" }}
                          >
                            <input
                              type="text"
                              name="display_discount"
                              id="display_discount"
                              defaultValue={0.0}
                              onchange="get_modification_value(this)"
                              size={5}
                              onblur="extractNumber(this,3,false);"
                              onkeyup="extractNumber(this,3,false);"
                              maxLength={6}
                              className="form-control"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3}>
                        <div className="row">
                          <div
                            className="form-group col-md-3"
                            style={{ textAlign: "left !important" }}
                          >
                            <label>Total Supplier Rate Of 1 Room(s)</label>
                          </div>
                          <div
                            className="form-group col-md-3"
                            style={{ textAlign: "left !important" }}
                          >
                            <span id="total_native_rate">78.67</span>{" "}
                            <span id="nc4">EUR</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3}>
                        <div className="row">
                          <div
                            className="form-group col-md-3"
                            style={{ textAlign: "left !important" }}
                          >
                            <label>Total Agent Rate Of 1 Room(s) </label>
                          </div>
                          <div
                            className="form-group col-md-3"
                            style={{ textAlign: "left !important" }}
                          >
                            <span id="total_display_rate">111.56</span>
                            <span id="dc6"> USD</span>
                            &nbsp;
                            <i
                              className="fa fa-info-circle"
                              title
                              data-toggle="tooltip"
                              data-placement="top"
                              data-original-title="Service Tax is included in Total Booking Cost."
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3}>
                        <div className="row">
                          <div
                            className="form-group col-md-3"
                            style={{ textAlign: "left !important" }}
                          >
                            <label>Applicable Tax</label>
                          </div>
                          <div
                            className="form-group col-md-3"
                            style={{ textAlign: "left !important" }}
                          >
                            <div className="input-group col-md-12 col-sm-12">
                              <input
                                type="text"
                                name="applicable_tax"
                                id="applicable_tax"
                                className="form-control form-control-sm"
                                readOnly
                              />
                              <span className="input-group-addon">
                                <span id="dc7">USD</span>{" "}
                              </span>
                            </div>
                          </div>
                          <div className="col-md-6" id="tax" />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3}>
                        <div className="row">
                          <div
                            className="form-group col-md-3"
                            style={{ textAlign: "left !important" }}
                          >
                            <label>Payment Gateway Charges Of 1 Room(s)</label>
                          </div>
                          <div
                            className="form-group col-md-3"
                            style={{ textAlign: "left !important" }}
                          >
                            <div className="input-group col-md-12 col-sm-12">
                              <input
                                type="text"
                                name="additional_charge"
                                defaultValue={0.0}
                                className="form-control form-control-sm"
                              />
                              <span className="input-group-addon">
                                <span id="dc7">USD</span>{" "}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <hr />
              <div
                className="form-group panel-body mb-3"
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
                    <h5>Passport Details</h5>
                  </div>
                  <div className="form-group col-md-3 phps_row_1">
                    <label>Passport Number</label>
                    <input
                      type="text"
                      name="passport_number"
                      id="passport_number"
                      size={15}
                      className="form-control form-control-sm"
                    />
                  </div>
                </div>
              </div>
              <div
                className="form-group panel-body"
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
                    <h5>Flight Details</h5>
                  </div>
                  <div className="form-group col-md-3 phps_row_0">
                    <label>Flight Number</label>
                    <input
                      type="text"
                      name="flight_number"
                      id="flight_number"
                      maxLength={5}
                      className="form-control form-control-sm"
                    />
                  </div>
                  <div className="form-group col-md-3 phps_row_1">
                    <label>PNR</label>
                    <input
                      type="text"
                      name="flight_pnr_number"
                      id="flight_pnr_number"
                      maxLength={20}
                      className="form-control form-control-sm"
                    />
                  </div>
                  <div className="form-group col-md-3 phps_row_0">
                    <label>Arrival Destination</label>
                    <input
                      type="text"
                      name="flight_arrival_destination"
                      id="flight_arrival_destination"
                      className="form-control form-control-sm"
                    />
                  </div>
                  <div className="form-group col-md-3 phps_row_1">
                    <label>Arrival Date</label>
                    <div
                      className="input-group date col-md-12 col-xs-12 col-sm-12 flt_arrival_date"
                      id="flt_arrival_date"
                    >
                      <Flatpickr
                        value={startDate1}
                        onChange={(date) => setStartDate1(date)}
                        options={{ dateFormat: "Y-m-d" }}
                      />
                      <span className="input-group-addon">
                        <i className="fa fa-th" />
                      </span>
                      <span
                        className="input-group-addon pointer"
                        id="flightTrashBtn"
                        onClick={handleTrashClick}
                      >
                        <i className="fa fa-trash" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-2">
                <div className="form-group col-md-12 phps_row_0">
                  <label>Special Remark</label>
                  <textarea
                    id="special_remark_other"
                    name="special_remark_other"
                    rows={4}
                    cols={70}
                    className="form-control form-control-sm"
                    defaultValue={""}
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="form-group col-md-12 phps_row_0">
                  <label>Emergency Contact</label>
                  <textarea
                    id="special_remark_other"
                    name="special_remark_other"
                    rows={4}
                    cols={70}
                    className="form-control form-control-sm"
                    defaultValue={""}
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="form-group col-md-3 phps_row_0">
                  <label>Cancellation date</label>
                  <div className="input-group date col-md-12 col-xs-12 col-sm-12">
                    <input
                      id="expiration_date"
                      data-bs-toggle="tooltip"
                      data-placement="top"
                      title="If you Modify Expiration Date, also change in cancellation policy."
                      className="form-control form-control-sm required"
                      name="expiration_date"
                      type="text"
                      size={25}
                      defaultValue="15/09/2023 05:29:00"
                      onkeypress="copyExpirationDate()"
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-2">
                <div className="form-group col-md-12 phps_row_1">
                  <label>Cancellation Policy (Policy for agents)</label>
                  <textarea
                    id="cancellation_policy"
                    name="cancellation_policy"
                    rows={4}
                    className="form-control form-control-sm"
                    cols={60}
                    defaultValue={
                      "<strong>Double Deluxe [1 adults 0 Child] </strong><br>Free cancellation up to  02:57:00 on  15th of September 2023 <br/>If you cancel after 02:58:00 on 15th of September 2023  you will be charged USD 111.56\t\t\t\t\t"
                    }
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="form-group col-md-12 phps_row_0">
                  <label>
                    Supplier Cancellation Policy (Policy provided by supplier
                    for internal use)
                  </label>
                  <textarea
                    name="supplier_cancellation_policy"
                    rows={4}
                    cols={70}
                    className="form-control"
                    defaultValue={""}
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="form-group col-md-12 phps_row_1">
                  <label>
                    Comment Contract (Terms and conditions provided by supplier
                    will be displayed on booking)
                  </label>
                  <textarea
                    name="remark"
                    rows={5}
                    cols={70}
                    className="form-control form-control-sm"
                    defaultValue={
                      " Double deluxe  BED AND BREAKFAST:*The Half Board/Full Board supplement will not be able applicable on the 24th December Christmas Eve Dinner, 25th December Christmas Day Brunch and 31st December 2023 New Year’s Eve Dinner*One extra bed will be provided for children between 4 - 11.99 years old, 2nd child will share the existing bedding with the parents.*Complimentary shuttle service to La Mer Beach.Effective from today- 01 August 2022.Kindly note that Half Board and Full Board basis shall be honored as a Set-Menu on Theme Nights i.e., Friday Grill Night and Saturday Seafood Night, should the guests wish to avail the Theme Nights instead of the Set Menu; an additional Supplement of AED 99 per person per meal will apply on top of the HB & FB Supplements.  Estimated total amount of taxes & fees for this booking:20.00 Utd. Arab Emir. Dirham payable on arrival.  No alcohol is served.Check-in hour 15:00-.Car park YES (Without additional debit notes).Single-Use Plastic Free."
                    }
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="form-group col-md-12 phps_row_0">
                  <label>Remark (Important notes for backoffice team)</label>
                  <textarea
                    name="special_remark"
                    rows={4}
                    cols={70}
                    className="form-control form-control-sm"
                    defaultValue={""}
                  />
                </div>
              </div>
              <br />
              <div className="row">
                <div className="form-group col-md-12 phps_row_1">
                  <h5>Email To</h5>
                  <div className="radioline1 mt-1">
                    <div className="checkbox checkbox-success checkbox-inline">
                      <input
                        id="mailtoagent"
                        type="checkbox"
                        name="mailtoagent"
                        defaultValue={1}
                      />
                      <label htmlFor="mailtoagent">Agent and Consultant</label>
                    </div>
                    <div className="checkbox checkbox-success checkbox-inline">
                      <input
                        id="app"
                        type="checkbox"
                        name="mailtocommon"
                        defaultValue={1}
                      />
                      <label htmlFor="mailtocommon">Email Settings</label>
                    </div>
                    <div className="checkbox checkbox-success checkbox-inline">
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
              <br />
              <div className="row">
                <div className="form-group col-md-3 phps_row_0">
                  <span id="loading" style={{ display: "none" }}>
                    <img src="/cpfv3/images/loading.gif" alt="" />
                  </span>
                  <span id="save_button" style={{ display: "block" }}>
                    <button
                      type="button"
                      className="btn btn-dark btn-sm"
                      name="b1"
                      id="b1"
                      value="Save"
                      onclick="Javascript submit_form(document.forms['modify_booking_form']);"
                    >
                      <i className="fa fa-floppy-o" />
                      &nbsp;Save
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default GOtoModifyBooking;
