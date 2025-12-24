import Flatpickr from "react-flatpickr";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import MultiSelect from "../../reactMultiSelect";
import {
  addrule_currencyOptions,
  hours_options,
  infantAgeUpperOptions,
  rateProfileOptions,
  tours_hours_15dif_options,
} from "../../../constants/contants";

const ContractsToursAndActivitiesAddRates = ({ setShowHeaderAndMenuBar }) => {
  // Update the state to hide Header and MenuBar
  React.useEffect(() => {
    setShowHeaderAndMenuBar(false);
    // Cleanup function to reset the state when the component unmounts
    return () => setShowHeaderAndMenuBar(true);
  }, [setShowHeaderAndMenuBar]);

  const [startDate, setStartDate] = useState(null); // State for the start date
  const [endDate, setEndDate] = useState(null); // State for the end date
  const handleTrashClick = () => {
    // Function to clear both start and end dates
    setStartDate(null);
    setEndDate(null);
  };

  const [startDate1, setStartDate1] = useState(null); // State for the start date
  const [endDate1, setEndDate1] = useState(null); // State for the end date
  const handleTrashClick1 = () => {
    // Function to clear both start and end dates
    setStartDate1(null);
    setEndDate1(null);
  };

  const [startDate2, setStartDate2] = useState(null); // State for the start date
  const [endDate2, setEndDate2] = useState(null); // State for the end date
  const handleTrashClick2 = () => {
    // Function to clear both start and end dates
    setStartDate2(null);
    setEndDate2(null);
  };

  const [startDate3, setStartDate3] = useState(null); // State for the start date
  const [endDate3, setEndDate3] = useState(null); // State for the end date
  const handleTrashClick3 = () => {
    // Function to clear both start and end dates
    setStartDate3(null);
    setEndDate3(null);
  };

  const [showBlock1, setShowBlock1] = useState(false);

  const handleShowBlock1 = () => {
    setShowBlock1(true);
  };

  return (
    <>
      <div>
        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n        .form-control[disabled],\n        .form-control[readonly],\n        fieldset[disabled] .form-control {\n            cursor: not-allowed;\n            background-color: #eee;\n            opacity: 1;\n        }\n    ",
          }}
        />
        {/*    Panel Body        */}
        <div
          className="siteLogo mb-2"
          style={{ paddingLeft: "22px", paddingTop: "8px" }}
        >
          <img
            src="http://beta.tdonlines.com/project_folder/tdonline//images/logo.png"
            alt=""
            style={{ width: "105px" }}
          />
        </div>
        <hr />
        <div className="container-fluid pt-0 p-4" id="content-pad">
          <ul className="nav nav-tabs" id="mainTabs" role="tablist">
            <li className="nav-item">
              <Link
                className="nav-link active"
                id="products-tab"
                data-bs-toggle="tab"
                to="#products"
                role="tab"
                aria-controls="products"
                aria-selected="true"
              >
                ActivityRate
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                id="services-tab"
                data-bs-toggle="tab"
                to="#services"
                role="tab"
                aria-controls="services"
                aria-selected="false"
              >
                Inventory Allocation
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                id="cancellation-tab"
                data-bs-toggle="tab"
                to="#cancellation"
                role="tab"
                aria-controls="cancellation"
                aria-selected="false"
              >
                Cancellation Policy
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                id="stop-tab"
                data-bs-toggle="tab"
                to="#stop"
                role="tab"
                aria-controls="stop"
                aria-selected="false"
              >
                Stop Sell
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                id="PAD-tab"
                data-bs-toggle="tab"
                to="#PAD"
                role="tab"
                aria-controls="PAD"
                aria-selected="false"
              >
                Pick-up &amp; Drop-off
              </Link>
            </li>
          </ul>
          <form style={{ borderTop: "2px solid #FF5015", padding: "0px" }}>
            <div className="tab-content" id="mainTabContent">
              {/* Products Tab */}
              <div
                className="tab-pane fade show active"
                id="products"
                role="tabpanel"
                aria-labelledby="products-tab"
              >
                <ul
                  className="nav nav-tabs"
                  id="productsSubTabs"
                  role="tablist"
                >
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      id="subtab1-tab"
                      data-bs-toggle="tab"
                      to="#subtab1"
                      role="tab"
                      aria-controls="subtab1"
                      aria-selected="true"
                    >
                      Add / Edit Activity Rate
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      id="subtab2-tab"
                      data-bs-toggle="tab"
                      to="#subtab2"
                      role="tab"
                      aria-controls="subtab2"
                      aria-selected="false"
                    >
                      View Activity Rate
                    </Link>
                  </li>
                </ul>
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
                  <div
                    className="tab-pane fade show active"
                    id="subtab1"
                    role="tabpanel"
                    aria-labelledby="subtab1-tab"
                  >
                    <div className="col-md-12 form-group row mt-2">
                      <h5 style={{ fontSize: "18px" }}>
                        Activity RATE DETAILS
                      </h5>
                    </div>
                    <div className="col-md-12 form-group row mt-2">
                      <div className="col-md-2 form-group">
                        <label>Activity Type</label>
                        <input
                          id="activity_type"
                          readOnly
                          className="form-control form-control-sm"
                          type="text"
                          defaultValue="Activities"
                        />
                      </div>
                      <div className="col-md-2 form-group">
                        <label>Activity Sub Type</label>
                        <input
                          id="activity_sub_type"
                          readOnly
                          className="form-control form-control-sm"
                          type="text"
                        />
                      </div>
                      <div className="col-md-2 form-group">
                        <label>Activity Category</label>
                        <input
                          id="activity_category"
                          readOnly
                          className="form-control form-control-sm"
                          type="text"
                          defaultValue="Adventure Trip"
                        />
                      </div>
                    </div>
                    <div className="col-md-12 form-group row mt-2">
                      <input
                        type="hidden"
                        name="sel_countries"
                        id="country"
                        disabled="disabled"
                        defaultValue="India"
                      />
                      <input
                        type="hidden"
                        name="sel_city"
                        id="city"
                        size={40}
                        disabled="disabled"
                        defaultValue="Mumbai"
                      />
                      <div className="form-group col-md-2 phps_row_0">
                        <label>Activity Name</label>
                        <input
                          className="form-control form-control-sm required"
                          type="text"
                          name="sel_tours"
                          id="sel_tours"
                          size={60}
                          defaultValue="supp2Tour1"
                          disabled="disabled"
                        />
                        <input
                          className="form-control"
                          type="hidden"
                          id="supplier_id"
                          name="supplier_id"
                          defaultValue="S000000860"
                        />
                      </div>
                      <div className="form-group col-md-5 phps_row_1">
                        <label>Availaible on days</label>
                        <br />
                        <div className="radioline1">
                          <div className="checkbox checkbox-success checkbox-inline">
                            <input
                              type="checkbox"
                              name="chk_all_days"
                              id="chk_all_days"
                              defaultValue="all"
                            />
                            <label htmlFor="chk_all_days">All</label>
                            &nbsp;&nbsp;
                          </div>
                          <div className="checkbox checkbox-success checkbox-inline avalaible_days">
                            <input
                              type="checkbox"
                              id="availaible_Mo"
                              name="chk_weekday[]"
                              defaultValue="Mo"
                            />
                            <label htmlFor="Mo">Mon</label>
                          </div>
                          &nbsp;&nbsp;
                          <div className="checkbox checkbox-success checkbox-inline avalaible_days">
                            <input
                              type="checkbox"
                              id="availaible_Tu"
                              name="chk_weekday[]"
                              defaultValue="Tu"
                            />
                            <label htmlFor="Tu">Tue</label>
                          </div>
                          &nbsp;&nbsp;
                          <div className="checkbox checkbox-success checkbox-inline avalaible_days">
                            <input
                              type="checkbox"
                              id="availaible_We"
                              name="chk_weekday[]"
                              defaultValue="We"
                            />
                            <label htmlFor="We">Wed</label>
                          </div>
                          &nbsp;&nbsp;
                          <div className="checkbox checkbox-success checkbox-inline avalaible_days">
                            <input
                              type="checkbox"
                              id="availaible_Th"
                              name="chk_weekday[]"
                              defaultValue="Th"
                            />
                            <label htmlFor="Th">Thu</label>
                          </div>
                          &nbsp;&nbsp;
                          <div className="checkbox checkbox-success checkbox-inline avalaible_days">
                            <input
                              type="checkbox"
                              id="availaible_Fr"
                              name="chk_weekday[]"
                              defaultValue="Fr"
                            />
                            <label htmlFor="Fr">Fri</label>
                          </div>
                          &nbsp;&nbsp;
                          <div className="checkbox checkbox-success checkbox-inline avalaible_days">
                            <input
                              type="checkbox"
                              id="availaible_Sa"
                              name="chk_weekday[]"
                              defaultValue="Sa"
                            />
                            <label htmlFor="Sa">Sat</label>
                          </div>
                          &nbsp;&nbsp;
                          <div className="checkbox checkbox-success checkbox-inline avalaible_days">
                            <input
                              type="checkbox"
                              id="availaible_Su"
                              name="chk_weekday[]"
                              defaultValue="Su"
                            />
                            <label htmlFor="Su">Sun</label>
                          </div>
                          &nbsp;&nbsp;
                        </div>
                      </div>
                    </div>
                    <div
                      className="panel-body mt-3"
                      style={{
                        backgroundColor: "#FF5015",
                        paddingBottom: "1px",
                        paddingTop: "4px",
                        marginLeft: "-11px",
                      }}
                    >
                      <h5
                        style={{
                          color: "#fff",
                          fontSize: "15px",
                          marginTop: "4px",
                          marginLeft: "20px",
                        }}
                      >
                        Activity Slots
                      </h5>
                    </div>
                    <div className="row mt-2">
                      <div className="col-md-12 form-group">
                        <div className="col-md-2 form-group">
                          <label>
                            Activity Duation :&nbsp;&nbsp;1.0 Hrs
                            <input
                              type="hidden"
                              id="tour_duration"
                              name="tour_duration"
                              defaultValue={1.0}
                            />
                          </label>
                          <br />
                          <div className="checkbox checkbox-success checkbox-inline form-group">
                            <input
                              type="checkbox"
                              name="chk_all_slots"
                              id="chk_all_slots"
                              defaultValue="all"
                              onclick="change_slots();"
                            />
                            <label htmlFor="chk_all_slots">All</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-12 form-group">
                        <div className="col-md-6" id="SlotPickers">
                          <label>Activity Time (Hours:Minutes)</label>
                          <div
                            className="SlotContainer input-group col-md-12 marginBtm10"
                            id="SlotClone_0"
                          >
                            <MultiSelect
                              options={hours_options}
                              isSearchable
                              placeholder="- Select Hours  -"
                              className="custom-select required"
                              noOptionsMessage={() => "No Options Found"}
                            />

                            <MultiSelect
                              options={tours_hours_15dif_options}
                              isSearchable
                              placeholder="- Select -"
                              className="custom-select required"
                              noOptionsMessage={() => "No Options Found"}
                            />

                            <span
                              className="input-group-addon"
                              style={{ color: "#fff" }}
                            >
                              to
                            </span>

                            <MultiSelect
                              options={hours_options}
                              isSearchable
                              placeholder="- Select Hours  -"
                              className="custom-select required"
                              noOptionsMessage={() => "No Options Found"}
                            />

                            <MultiSelect
                              options={tours_hours_15dif_options}
                              isSearchable
                              placeholder="- Select -"
                              className="custom-select required"
                              noOptionsMessage={() => "No Options Found"}
                            />
                          </div>
                        </div>
                        <div className="form-group col-md-6">
                          <span
                            className="input-group"
                            style={{ marginTop: "20px" }}
                          >
                            <span
                              className="input-group-addon"
                              id="plus_ts"
                              onclick="MakeSlotClone();"
                              style={{ marginLeft: "104%", marginTop: "-52px" }}
                            >
                              <i className="fa fa-plus" />
                            </span>
                            <span
                              className="input-group-addon"
                              id="minus_ts"
                              onclick="RemoveSlotClone()"
                              style={{ display: "none" }}
                            >
                              <i className="fa fa-minus" />
                            </span>
                          </span>
                          <input
                            type="hidden"
                            name="last_ts_shown"
                            id="last_ts_shown"
                            defaultValue={1}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-md-5 phps_row_0">
                        <label>Select Weekend Days</label>
                        <br />
                        <div className="radioline1">
                          <div className="checkbox checkbox-success checkbox-inline selected_weekdays">
                            <input
                              type="checkbox"
                              id="select_weekend_Mo"
                              name="chk_weekend[]"
                              defaultValue="Mo"
                            />
                            <label htmlFor="Mo">Mon</label>
                          </div>
                          &nbsp;&nbsp;
                          <div className="checkbox checkbox-success checkbox-inline selected_weekdays">
                            <input
                              type="checkbox"
                              id="select_weekend_Tu"
                              name="chk_weekend[]"
                              defaultValue="Tu"
                            />
                            <label htmlFor="Tu">Tue</label>
                          </div>
                          &nbsp;&nbsp;
                          <div className="checkbox checkbox-success checkbox-inline selected_weekdays">
                            <input
                              type="checkbox"
                              id="select_weekend_We"
                              name="chk_weekend[]"
                              defaultValue="We"
                            />
                            <label htmlFor="We">Wed</label>
                          </div>
                          &nbsp;&nbsp;
                          <div className="checkbox checkbox-success checkbox-inline selected_weekdays">
                            <input
                              type="checkbox"
                              id="select_weekend_Th"
                              name="chk_weekend[]"
                              defaultValue="Th"
                            />
                            <label htmlFor="Th">Thu</label>
                          </div>
                          &nbsp;&nbsp;
                          <div className="checkbox checkbox-success checkbox-inline selected_weekdays">
                            <input
                              type="checkbox"
                              id="select_weekend_Fr"
                              name="chk_weekend[]"
                              defaultValue="Fr"
                            />
                            <label htmlFor="Fr">Fri</label>
                          </div>
                          &nbsp;&nbsp;
                          <div className="checkbox checkbox-success checkbox-inline selected_weekdays">
                            <input
                              type="checkbox"
                              id="select_weekend_Sa"
                              name="chk_weekend[]"
                              defaultValue="Sa"
                            />
                            <label htmlFor="Sa">Sat</label>
                          </div>
                          &nbsp;&nbsp;
                          <div className="checkbox checkbox-success checkbox-inline selected_weekdays">
                            <input
                              type="checkbox"
                              id="select_weekend_Su"
                              name="chk_weekend[]"
                              defaultValue="Su"
                            />
                            <label htmlFor="Su">Sun</label>
                          </div>
                          &nbsp;&nbsp;
                        </div>
                      </div>
                      <div className="col-md-2 form-group">
                        <label>Release Period</label>
                        <div className="col-md-6 input-group phps_row_1">
                          <input
                            type="text"
                            name="release_period"
                            id="release_period"
                            size={5}
                            maxLength={10}
                            onblur="extractNumber(this,0,false);"
                            onkeyup="extractNumber(this,0,false);"
                            className="required form-control"
                            data-html="true"
                            data-toggle="tooltip"
                            data-original-title="<b style=margin-bottom:10px;><u>What is  Release Period?</u></b><br><br>      The minimum number of days you can book before the check in date.<br><ul><li>A typical example of an allotment scenario is:<ul><li>Your company obtained a 3-room allotment from ABC hotel with a release period of 7 days between the periods of 1st March 2004 to 31st March 2004</li><li>A client need to book a room on the 15th of March to check in on the 18th of March ; the system would consider the booking as out of allotment and need a manual confirmation and informs both the client and the administrators of the situation.</li><li>If there is no Release Period in the contract, kindly enter the value as 0 Hrs</li></ul>"
                          />
                          <span className="input-group-addon">Hrs</span>
                        </div>
                      </div>
                    </div>
                    <div
                      className="panel-body mt-3"
                      style={{
                        backgroundColor: "#FF5015",
                        paddingBottom: "1px",
                        paddingTop: "4px",
                        marginLeft: "-11px",
                      }}
                    >
                      <h5
                        style={{
                          color: "#fff",
                          fontSize: "15px",
                          marginTop: "4px",
                          marginLeft: "20px",
                        }}
                      >
                        Activity Rate Period/Profile
                      </h5>
                    </div>
                    <div className="row mt-3">
                      <input
                        type="hidden"
                        name="last_shown"
                        id="last_shown"
                        defaultValue={1}
                      />
                      <div className="col-md-4 form-group TourPeriodPickers">
                        <label>Period</label>
                        <div
                          className="ToursDatepicker input-group date marginBtm10"
                          id="TourPeriodPickers_0"
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
                            className="input-group-addon ClearDates"
                            id="aTrashBtn"
                            onClick={handleTrashClick}
                          >
                            <i className="fa fa-trash" />
                          </span>
                        </div>
                      </div>
                      <div className="col-md-1 form-group">
                        <span
                          className="input-group"
                          style={{ marginTop: "20px" }}
                        >
                          <span
                            className="input-group-addon"
                            id="plus"
                            onclick="MakePeriodClone();"
                          >
                            <i className="fa fa-plus" />
                          </span>
                          <span
                            className="input-group-addon"
                            id="minus"
                            onclick="RemovePeriodClone()"
                            style={{ display: "none" }}
                          >
                            <i className="fa fa-minus" />
                          </span>
                        </span>
                      </div>
                      <div className="col-md-2 form-group">
                        <label>Currency</label>
                        <MultiSelect
                          options={addrule_currencyOptions}
                          isSearchable
                          placeholder="- Select Currency -"
                          className="custom-select"
                          noOptionsMessage={() => "No Currency Found"}
                        />
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="form-group col-md-2 phps_row_0">
                        <label>Market Profile</label>
                        <MultiSelect
                          options={rateProfileOptions}
                          isSearchable
                          placeholder="- Select Profile -"
                          className="custom-select"
                          noOptionsMessage={() => "No Profile Found"}
                        />
                      </div>
                      <div className="form-group col-md-2 sel_exclude_nationality_container phps_row_1">
                        <label>Exclude Nationality</label>
                        <select
                          className="form-control form-control-sm  selectpicker show-menu-arrow bs-select-hidden"
                          name="sel_exclude_nationality[]"
                          id="sel_exclude_nationality"
                          rows={1}
                          data-live-search="true"
                          data-actions-box="true"
                        />
                      </div>
                      <div className="form-group col-md-2 phps_row_0">
                        <label>Child Age Lower Limit(Yrs.)</label>
                        <br />
                        <MultiSelect
                          options={infantAgeUpperOptions}
                          isSearchable
                          placeholder="- Select Child Age -"
                          className="custom-select"
                          noOptionsMessage={() => "No Child Age Found"}
                        />
                      </div>
                      <div className="form-group col-md-2 phps_row_1">
                        <label>Child Age Upper Limit(Yrs.)</label>
                        <MultiSelect
                          options={infantAgeUpperOptions}
                          isSearchable
                          placeholder="- Select Child Age -"
                          className="custom-select"
                          noOptionsMessage={() => "No Child Age Found"}
                        />
                      </div>
                    </div>
                    <div
                      className="panel-body mt-3"
                      style={{
                        backgroundColor: "#FF5015",
                        paddingBottom: "1px",
                        paddingTop: "4px",
                        marginLeft: "-11px",
                      }}
                    >
                      <h5
                        style={{
                          color: "#fff",
                          fontSize: "15px",
                          marginTop: "4px",
                          marginLeft: "20px",
                        }}
                      >
                        Rates Row
                      </h5>
                    </div>
                    <div className="row mt-3">
                      <div
                        className="col-md-1 form-group"
                        style={{ marginTop: "20px" }}
                      >
                        <span className="input-group">
                          <span
                            onclick="MakeAdultRateClone(0);"
                            className="input-group-addon"
                            id="adultplus"
                          >
                            <i className="fa fa-plus" />
                          </span>
                          <span
                            onclick="RemoveAdultRateClone(0);"
                            className="input-group-addon"
                            id="adultminus"
                            style={{ display: "none" }}
                          >
                            <i className="fa fa-minus" />
                          </span>
                        </span>
                      </div>
                      <div className="col-md-2 paddingLeft30">
                        <label>Adult From</label>
                        <input
                          className="form-control form-control-sm show-menu-arrow required"
                          name="adult_from_00[]"
                          readOnly="readonly"
                          data-row={0}
                          id="adult_from_00"
                          rows={1}
                        />
                      </div>
                      <div className="col-md-1 paddingLeft30">
                        <label>Adult To</label>
                        <input
                          className="form-control form-control-sm show-menu-arrow required calculateApproxrate"
                          name="adult_to_00[]"
                          data-row={0}
                          id="adult_to_00"
                          onblur="extractNumber(this,3,false);"
                          onkeyup="extractNumber(this,3,false); max_limit_check(0)"
                          minLength={1}
                          maxLength={3}
                          rows={1}
                        />
                      </div>
                      <div className="col-md-2 paddingLeft20">
                        <label>Weekday Rate(Per Pax)</label>
                        <input
                          type="text"
                          className="form-control calculateApproxrate"
                          name="txt_weekday_rate_adult_00[]"
                          id="txt_weekday_rate_adult_000"
                          size={10}
                          onblur="extractNumber(this,3,false);"
                          onkeyup="extractNumber(this,3,false);"
                          placeholder="Adult"
                        />
                      </div>
                      <div className="col-md-2 paddingLeft20">
                        <label>Weekend rate(Per Pax)</label>
                        <input
                          type="text"
                          className="form-control form-control-sm calculateApproxrate"
                          name="txt_weekend_rate_adult_00[]"
                          id="txt_weekend_rate_adult_000"
                          size={10}
                          onblur="extractNumber(this,3,false);"
                          onkeyup="extractNumber(this,3,false);"
                          placeholder="Adult"
                        />
                      </div>
                      <div className="col-md-2 paddingLeft20">
                        <label>Approx Total Rate(Weekday)</label>
                      </div>
                      <div className="col-md-2 paddingLeft20">
                        <label>Approx Total Rate(Weekend)</label>
                      </div>
                    </div>
                    <style
                      dangerouslySetInnerHTML={{
                        __html:
                          "\n                                .row-divider {\n                                    border: 1px solid #FF5015;\n                                    margin: 25px 0 0;\n                                    width: 100%;\n                                }\n                            ",
                      }}
                    />
                    <div
                      id="sicdivchild0"
                      name="sicdivchild0"
                      style={{ display: "block" }}
                    >
                      <div className="row row-divider" />
                      <div className="row row-spacer">
                        <div className="form-group col-md-12 phps_row_0 mt-3">
                          <div className="input-group col-md-3 marginBtm0">
                            <div className="checkbox checkbox-success checkbox-inline marginBtm0">
                              <input
                                type="checkbox"
                                className="child_rate_type"
                                defaultValue="Group"
                                name="child_rate_type0[]"
                                id="child_rate_type_individual0"
                              />
                              <label htmlFor="child_rate_type_individual">
                                Child Rates
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div id="child_rates_individual_div_0">
                        <div
                          className="row child_rates_individual"
                          style={{ display: "none" }}
                        >
                          <div className="form-group col-md-12 phps_row_1 marginBtm20">
                            <div className="col-md-1">
                              <label>Child Charge</label>
                            </div>
                            <div className="col-md-3">
                              <div className="radio radio-success radio-inline childratecontent">
                                <input
                                  type="radio"
                                  defaultChecked
                                  name="child_rates00[]"
                                  id="childratespercentage00"
                                  defaultValue="percentage"
                                />
                                <label htmlFor="childratespercentage">
                                  Percentage
                                </label>
                                &nbsp;&nbsp;
                              </div>
                              <div className="radio radio-success radio-inline childratecontent">
                                <input
                                  type="radio"
                                  name="child_rates00[]"
                                  id="childratesamount00"
                                  defaultValue="amount"
                                />
                                <label htmlFor="childratesamount">Amount</label>
                                &nbsp;&nbsp;
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="row child_rates_individual"
                          style={{ display: "none" }}
                        >
                          <div className="form-group col-md-12 phps_row_0">
                            <div
                              className="col-md-1 form-group"
                              style={{ marginTop: "20px" }}
                            >
                              <span className="input-group">
                                <span
                                  className="input-group-addon"
                                  onclick="MakeChildRateClone(0);"
                                  id="pluschild"
                                >
                                  <i className="fa fa-plus" />
                                </span>
                                <span
                                  className="input-group-addon"
                                  onclick="RemoveChildRateClone(0);"
                                  id="minuschild"
                                  style={{ display: "none" }}
                                >
                                  <i className="fa fa-minus" />
                                </span>
                              </span>
                            </div>
                            <div
                              className="col-md-10 form-group ChildRateContainer"
                              id="ChildRateContainer0"
                            >
                              <div className="row">
                                <div className="col-md-2 paddingLeft30">
                                  <label>Child Age From</label>
                                </div>
                                <div className="col-md-2 paddingLeft30">
                                  <label>Child Age To</label>
                                </div>
                                <div className="col-md-2 paddingLeft20">
                                  <label id="child_rate_type_text">
                                    Child Rate % on Adult
                                  </label>
                                </div>
                              </div>
                              <div className="row" id="ChildAgeSelectPicker_00">
                                <div className="col-md-12 form-group">
                                  <div className="col-md-2 form-group">
                                    <select
                                      className="form-control selectpicker show-menu-arrow required bs-select-hidden"
                                      name="child_from_00[]"
                                      id="child_from_00"
                                      data-row={0}
                                      rows={1}
                                      data-live-search="true"
                                    />
                                  </div>
                                  <div className="col-md-2 form-group">
                                    <select
                                      className="form-control selectpicker show-menu-arrow required bs-select-hidden"
                                      name="child_to_00[]"
                                      id="child_to_00"
                                      data-row={0}
                                      rows={1}
                                      data-live-search="true"
                                    />
                                  </div>
                                  <div className="col-md-2 form-group">
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="txt_weekday_rate_child_00[]"
                                      id="txt_weekday_rate_child_00"
                                      size={10}
                                      onblur="extractNumber(this,3,false);"
                                      onkeyup="extractNumber(this,3,false);"
                                      placeholder="Child"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-3 phps_row_0">
                        <input
                          name="txt_markup_per"
                          size={2}
                          maxLength={3}
                          onblur="extractNumber(this,2,false);"
                          onkeyup="extractNumber(this,2,false);"
                          type="hidden"
                        />
                        <input
                          type="hidden"
                          name="txt_adults_allowed"
                          id="txt_adults_allowed"
                          readOnly="readonly"
                          size={2}
                          maxLength={3}
                          onblur="extractNumber(this,0,false);"
                          onkeyup="extractNumber(this,0,false);"
                        />
                        <input
                          type="hidden"
                          name="txt_children_allowed"
                          id="txt_children_allowed"
                          readOnly="readonly"
                          size={2}
                          maxLength={10}
                          onblur="extractNumber(this,0,false);"
                          onkeyup="extractNumber(this,0,false);"
                        />
                        <button
                          type="button"
                          className="btn btn-dark btn-sm form-group"
                          name="b1"
                          id="b1"
                          value="SUBMIT"
                          onclick="Javascriptreturn submit_form(document.forms['tours_add_rate_form']);"
                        >
                          <i className="fa fa-floppy-o" />
                          &nbsp;&nbsp;Submit
                        </button>
                        &nbsp;&nbsp;
                        <button
                          type="button"
                          className="btn btn-outline-secondary btn-sm form-group"
                          name="b2"
                          id="b2"
                          value="CLOSE"
                          onclick="Javascriptself.close();"
                        >
                          <i className="fa fa-times" />
                          &nbsp;&nbsp;Close
                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="subtab2"
                    role="tabpanel"
                    aria-labelledby="subtab2-tab"
                  >
                    <div className="row">
                      <div className="hpanel">
                        <input
                          type="hidden"
                          name="tranfer_id"
                          id="transfer_id"
                        />
                        <input
                          type="hidden"
                          name="supplier_id"
                          id="supplier_id"
                        />
                        <div className="dataTables_scroll">
                          <div
                            className="alert alert-danger text-center form-group"
                            style={{
                              backgroundColor: "#f2dede",
                              marginLeft: "-11px",
                              marginTop: "-5px",
                              padding: "13px",
                            }}
                          >
                            <h5
                              style={{
                                color: "var(--color-white) !important",
                                fontSize: "16px",
                              }}
                            >
                              Rates not available.
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Services Tab */}
              <div
                className="tab-pane fade"
                id="services"
                role="tabpanel"
                aria-labelledby="services-tab"
              >
                <ul
                  className="nav nav-tabs"
                  id="servicesSubTabs"
                  role="tablist"
                >
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      id="subtab3-tab"
                      data-bs-toggle="tab"
                      to="#subtab3"
                      role="tab"
                      aria-controls="subtab3"
                      aria-selected="true"
                    >
                      Add Inventory
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      id="subtab4-tab"
                      data-bs-toggle="tab"
                      to="#subtab4"
                      role="tab"
                      aria-controls="subtab4"
                      aria-selected="true"
                    >
                      View Inventory
                    </Link>
                  </li>
                </ul>
                <div className="tab-content" id="servicesSubTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="subtab3"
                    role="tabpanel"
                    aria-labelledby="subtab3-tab"
                  >
                    <div
                      id="invtabs-1"
                      className="form-group tab-pane ui-tabs-panel ui-widget-content ui-corner-bottom active"
                      aria-labelledby="ui-id-12"
                      role="tabpanel"
                      aria-hidden="false"
                      style={{ display: "block" }}
                    >
                      <h5 style={{ fontSize: "18px" }}>Add Inventory</h5>
                      <div className="row">
                        <div className="col-md-3 form-group">
                          <label>Activity Type</label>
                          <input
                            id="activity_type"
                            readOnly
                            className="form-control form-control-sm"
                            type="text"
                            defaultValue="Activities"
                          />
                        </div>
                        <div className="col-md-3 form-group">
                          <label>Activity Sub Type</label>
                          <input
                            id="activity_sub_type"
                            readOnly
                            className="form-control form-control-sm"
                            type="text"
                          />
                        </div>
                        <div className="col-md-3 form-group">
                          <label>Activity Category</label>
                          <input
                            id="activity_category"
                            readOnly
                            className="form-control form-control-sm"
                            type="text"
                            defaultValue="Adventure Trip"
                          />
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="form-group col-md-3">
                          <label>Activity Name</label>
                          <input
                            className="form-control form-control-sm required"
                            type="text"
                            name="sel_tours"
                            id="sel_tours"
                            size={60}
                            defaultValue="supp2Tour1"
                            disabled="disabled"
                          />
                        </div>
                        <div className="form-group col-md-3 TourPeriodPickersInventories">
                          <label>Date</label>
                          <div
                            className="input-daterange input-group date TourPeriodPickersInventory toursInventoryRow"
                            id="TourPeriodPickersInventory_0"
                          >
                            <Flatpickr
                              value={startDate1}
                              onChange={(date) => setStartDate1(date)}
                              options={{ dateFormat: "Y-m-d" }}
                              style={{ width: "130px" }}
                            />

                            <span class="input-group-addon">to</span>
                            <Flatpickr
                              value={endDate1}
                              onChange={(date) => setEndDate1(date)}
                              options={{ dateFormat: "Y-m-d" }}
                              style={{ width: "130px" }}
                            />
                            <span
                              className="input-group-addon"
                              id="cTrashBtn"
                              onClick={handleTrashClick1}
                            >
                              <i className="fa fa-trash" />
                            </span>
                          </div>
                        </div>
                        <div className="col-md-1 form-group">
                          <span
                            className="input-group"
                            style={{ marginTop: "20px" }}
                          >
                            <span
                              className="input-group-addon"
                              id="plus"
                              onclick="MakePeriodClone();"
                            >
                              <i className="fa fa-plus" />
                            </span>
                            <span
                              className="input-group-addon"
                              id="minus"
                              onclick="RemovePeriodClone()"
                            >
                              <i className="fa fa-minus" />
                            </span>
                          </span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-group col-md-5">
                          <div id="inv_div" />
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="form-group col-md-3">
                          <button
                            type="button"
                            className="btn btn-dark btn-sm"
                            name="inv_submitb1"
                            id="inv_submitb1"
                            value="ADD"
                            onclick="Javascriptreturn add_inv_form(document.forms['addinvForm']);"
                          >
                            <i className="fa fa-plus" />
                            &nbsp;Add
                          </button>
                          <span id="loading" style={{ display: "none" }}>
                            <img src="images/loading.gif" alt="" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade show active"
                    id="subtab4"
                    role="tabpanel"
                    aria-labelledby="subtab4-tab"
                  >
                    <div
                      id="invtabs-2"
                      className=" form-group tab-pane ui-tabs-panel ui-widget-content ui-corner-bottom active"
                      aria-labelledby="viewInventory"
                      role="tabpanel"
                      aria-hidden="false"
                      style={{ display: "block" }}
                    >
                      <h5 style={{ fontSize: "18px" }}>View Inventory</h5>
                      <form
                        action="/tms/tours.php"
                        id="viewinvForm"
                        name="viewinvForm"
                        method="post"
                        className="form-group"
                      >
                        <input type="hidden" name="action" />
                        <input type="hidden" name="id" defaultValue={4} />
                        <input
                          type="hidden"
                          name="supplier_id"
                          defaultValue="S000000860"
                        />
                        <input
                          type="hidden"
                          name="view_original_inv_from_date"
                          id="view_original_inv_from_date"
                        />
                        <input
                          type="hidden"
                          name="view_original_inv_to_date"
                          id="view_original_inv_to_date"
                        />
                        <div className="row">
                          <div className="col-md-3 form-group">
                            <label>Activity Name</label>
                            <input
                              className="form-control form-control-sm required"
                              type="text"
                              name="sel_tours"
                              id="sel_tours"
                              defaultValue="supp2Tour1"
                              disabled="disabled"
                            />
                          </div>
                          <div className="col-md-3">
                            <label>Date</label>
                            <div
                              className="input-daterange input-group date"
                              id="datetimepicker4"
                            >
                              <Flatpickr
                                value={startDate2}
                                onChange={(date) => setStartDate2(date)}
                                options={{ dateFormat: "Y-m-d" }}
                                style={{ width: "130px" }}
                              />

                              <span class="input-group-addon">to</span>
                              <Flatpickr
                                value={endDate2}
                                onChange={(date) => setEndDate2(date)}
                                options={{ dateFormat: "Y-m-d" }}
                                style={{ width: "130px" }}
                              />
                              <span
                                className="input-group-addon"
                                id="bTrashBtn"
                                onClick={handleTrashClick2}
                              >
                                <i className="fa fa-trash" />
                              </span>
                            </div>
                          </div>
                          <br />
                          <div className="col-md-12 mt-2">
                            <label>Activity Slot</label>
                            <div id="slot_div">--</div>
                          </div>
                          <div className="col-md-12">
                            <br />
                            <button
                              type="button"
                              name="inv_viewb2"
                              id="inv_viewb2"
                              value="VIEW"
                              className="btn btn-dark btn-sm"
                              onclick="Javascriptreturn view_inv_form(document.forms['viewinvForm']);"
                            >
                              <i className="fa fa-eye" />
                              &nbsp;View
                            </button>
                          </div>
                        </div>
                      </form>
                      <div id="invDetails" />
                    </div>
                  </div>
                </div>
              </div>
              {/* Cancellation Tab */}
              <div
                className="tab-pane fade"
                id="cancellation"
                role="tabpanel"
                aria-labelledby="cancellation-tab"
              >
                <ul
                  className="nav nav-tabs"
                  id="servicesSubTabs"
                  role="tablist"
                >
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      id="subtab5-tab"
                      data-bs-toggle="tab"
                      to="#subtab5"
                      role="tab"
                      aria-controls="subtab5"
                      aria-selected="true"
                    >
                      Add Cancellation Policy
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      id="subtab6-tab"
                      data-bs-toggle="tab"
                      to="#subtab6"
                      role="tab"
                      aria-controls="subtab6"
                      aria-selected="true"
                    >
                      View Cancellation Policy
                    </Link>
                  </li>
                </ul>
                <div className="tab-content" id="CancellationSubTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="subtab5"
                    role="tabpanel"
                    aria-labelledby="subtab5-tab"
                  >
                    <div
                      id="canceltabs-1"
                      aria-labelledby="cancelationsadd"
                      className="form-group ui-tabs-panel ui-widget-content ui-corner-bottom active"
                      role="tabpanel"
                      aria-hidden="false"
                      style={{ display: "block" }}
                    >
                      <h5 style={{ fontSize: "18px" }}>
                        Add Cancellation Policy
                      </h5>
                      <form
                        action="tours_add_cancellation_policy.php"
                        method="post"
                        name="tours_cancellation_form"
                        id="tours_cancellation_form"
                      >
                        <input
                          type="hidden"
                          id="sel_supplier"
                          name="sel_supplier"
                          defaultValue="S000000860"
                        />
                        <input
                          type="hidden"
                          name="id"
                          id="id"
                          defaultValue={4}
                        />
                        <input
                          type="hidden"
                          name="action_name"
                          id="action_name"
                        />
                        <input
                          type="hidden"
                          name="transfer_included"
                          id="transfer_included"
                          defaultValue="N"
                        />
                        <div className style={{ fontSize: "12px" }}>
                          Activity rates are not added for supp2Tour1
                        </div>
                      </form>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="subtab6"
                    role="tabpanel"
                    aria-labelledby="subtab6-tab"
                  >
                    <h5 className="form-group" style={{ fontSize: "18px" }}>
                      View Cancellation Policy{" "}
                    </h5>
                    <div className="row">
                      <div className="hpanel">
                        <form
                          method="POST"
                          action="search_trans_tariff.php"
                          name="search_trans_tariff"
                          id="search_trans_tariff"
                        >
                          <input
                            type="hidden"
                            name="tranfer_id"
                            id="transfer_id"
                          />
                          <input
                            type="hidden"
                            name="supplier_id"
                            id="supplier_id"
                          />
                          <div className="dataTables_scroll">
                            <div
                              className="alert alert-danger text-center form-group"
                              style={{
                                backgroundColor: "#f2dede",
                                marginLeft: "-11px",
                                marginTop: "-5px",
                                padding: "13px",
                              }}
                            >
                              <h5
                                style={{
                                  color: "var(--color-white) !important",
                                  fontSize: "16px",
                                }}
                              >
                                Cancellation policy not available.
                              </h5>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Stop sell Tab */}
              <div
                className="tab-pane fade"
                id="stop"
                role="tabpanel"
                aria-labelledby="stop-tab"
              >
                <ul className="nav nav-tabs" id="stopSubTabs" role="tablist">
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      id="subtab7-tab"
                      data-bs-toggle="tab"
                      to="#subtab7"
                      role="tab"
                      aria-controls="subtab7"
                      aria-selected="true"
                    >
                      Add Stop Sell
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      id="subtab8-tab"
                      data-bs-toggle="tab"
                      to="#subtab8"
                      role="tab"
                      aria-controls="subtab8"
                      aria-selected="true"
                    >
                      View Stop Sell
                    </Link>
                  </li>
                </ul>
                <div className="tab-content" id="CancellationSubTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="subtab7"
                    role="tabpanel"
                    aria-labelledby="subtab7-tab"
                  >
                    <div
                      id="invtabs-1"
                      className="form-group tab-pane ui-tabs-panel ui-widget-content ui-corner-bottom active"
                      aria-labelledby="ui-id-12"
                      role="tabpanel"
                      aria-hidden="false"
                      style={{ display: "block" }}
                    >
                      <h5 style={{ fontSize: "18px" }}>Add Stop Sell</h5>
                      <div className="row">
                        <div className="col-md-3 form-group">
                          <label>Activity Type</label>
                          <input
                            id="activity_type"
                            readOnly
                            className="form-control form-control-sm"
                            type="text"
                            defaultValue="Activities"
                          />
                        </div>
                        <div className="col-md-3 form-group">
                          <label>Activity Sub Type</label>
                          <input
                            id="activity_sub_type"
                            readOnly
                            className="form-control form-control-sm"
                            type="text"
                          />
                        </div>
                        <div className="col-md-3 form-group">
                          <label>Activity Category</label>
                          <input
                            id="activity_category"
                            readOnly
                            className="form-control form-control-sm"
                            type="text"
                            defaultValue="Adventure Trip"
                          />
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="form-group col-md-3">
                          <label>Activity Name</label>
                          <input
                            className="form-control form-control-sm required"
                            type="text"
                            name="sel_tours"
                            id="sel_tours"
                            size={60}
                            defaultValue="supp2Tour1"
                            disabled="disabled"
                          />
                        </div>
                        <div className="form-group col-md-3 TourPeriodPickersInventories">
                          <label>Date</label>
                          <div
                            className="input-daterange input-group date TourPeriodPickersInventory toursInventoryRow"
                            id="TourPeriodPickersInventory_0"
                          >
                            <Flatpickr
                              value={startDate3}
                              onChange={(date) => setStartDate3(date)}
                              options={{ dateFormat: "Y-m-d" }}
                              style={{ width: "130px" }}
                            />

                            <span class="input-group-addon">to</span>
                            <Flatpickr
                              value={endDate3}
                              onChange={(date) => setEndDate3(date)}
                              options={{ dateFormat: "Y-m-d" }}
                              style={{ width: "130px" }}
                            />
                            <span
                              className="input-group-addon"
                              id="cTrashBtn"
                              onClick={handleTrashClick3}
                            >
                              <i className="fa fa-trash" aria-hidden="true" />
                            </span>
                          </div>
                        </div>
                        <div className="col-md-1 form-group">
                          <span
                            className="input-group"
                            style={{ marginTop: "20px" }}
                          >
                            <span
                              className="input-group-addon"
                              id="plus"
                              onclick="MakePeriodClone();"
                            >
                              <i className="fa fa-plus" aria-hidden="true" />
                            </span>
                            <span
                              className="input-group-addon"
                              id="minus"
                              onclick="RemovePeriodClone()"
                            >
                              <i className="fa fa-minus" aria-hidden="true" />
                            </span>
                          </span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-group col-md-5">
                          <div id="inv_div" />
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="form-group col-md-3">
                          <button
                            type="button"
                            className="btn btn-dark btn-sm"
                            name="inv_submitb1"
                            id="inv_submitb1"
                            value="ADD"
                            onclick="Javascriptreturn add_inv_form(document.forms['addinvForm']);"
                          >
                            <i className="fa fa-floppy-o" aria-hidden="true" />
                            &nbsp;Save
                          </button>
                          <span id="loading" style={{ display: "none" }}>
                            <img src="images/loading.gif" alt="" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="subtab8"
                    role="tabpanel"
                    aria-labelledby="subtab8-tab"
                  >
                    <h5 className="form-group" style={{ fontSize: "18px" }}>
                      View/Edit Stop Sale{" "}
                    </h5>
                    <div className="row">
                      <div className="hpanel">
                        <form
                          method="POST"
                          action="search_trans_tariff.php"
                          name="search_trans_tariff"
                          id="search_trans_tariff"
                        >
                          <input
                            type="hidden"
                            name="tranfer_id"
                            id="transfer_id"
                          />
                          <input
                            type="hidden"
                            name="supplier_id"
                            id="supplier_id"
                          />
                          <div className="dataTables_scroll">
                            <div
                              className="alert alert-danger text-center form-group"
                              style={{
                                backgroundColor: "#f2dede",
                                marginLeft: "-11px",
                                marginTop: "-5px",
                                padding: "13px",
                              }}
                            >
                              <h5
                                style={{
                                  color: "var(--color-white) !important",
                                  fontSize: "16px",
                                }}
                              >
                                No data found.
                              </h5>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Pickdroptap Tab */}
              <div
                className="tab-pane fade"
                id="PAD"
                role="tabpanel"
                aria-labelledby="PAD-tab"
              >
                <ul className="nav nav-tabs" id="PADSubTabs" role="tablist">
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      id="subtab9-tab"
                      data-bs-toggle="tab"
                      to="#subtab9"
                      role="tab"
                      aria-controls="subtab9"
                      aria-selected="true"
                    >
                      Add Pick-up &amp; Drop-off Points
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      id="subtab10-tab"
                      data-bs-toggle="tab"
                      to="#subtab10"
                      role="tab"
                      aria-controls="subtab10"
                      aria-selected="true"
                    >
                      View / Edit Pick-up &amp; Drop-off Points
                    </Link>
                  </li>
                </ul>
                <div className="tab-content" id="PADSubTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="subtab9"
                    role="tabpanel"
                    aria-labelledby="subtab9-tab"
                  >
                    <div
                      id="invtabs-1"
                      className="form-group tab-pane ui-tabs-panel ui-widget-content ui-corner-bottom active"
                      aria-labelledby="ui-id-12"
                      role="tabpanel"
                      aria-hidden="false"
                      style={{ display: "block" }}
                    >
                      <h5 style={{ fontSize: "18px" }}>
                        Add Pick-up &amp; Drop-off Points
                      </h5>
                      <div id="non_transfer_box">
                        <div className="row">
                          <div className="form-group col-md-3 phps_row_1">
                            <label>Pick-up &amp; Drop-off Point</label>
                            <input
                              className="form-control form-control-sm input_style1 required"
                              size={40}
                              type="text"
                              name="txt_add_pick_up_0"
                              id="txt_add_pick_up_0"
                            />
                            <input
                              type="hidden"
                              name="no_of_pick_up"
                              id="no_of_pick_up"
                              defaultValue={1}
                            />
                          </div>
                          <div className="form-group col-md-3 phps_row_0">
                            <label>Location Type </label>
                            <br />
                            <div className="radioline1">
                              <div className="radio radio-success radio-inline">
                                <input
                                  id="location_type_0"
                                  type="radio"
                                  name="location_type_0"
                                  defaultValue="pick-up"
                                />
                                <label htmlFor>Pickup</label>
                              </div>
                              <div className="radio radio-success radio-inline">
                                <input
                                  id="app"
                                  type="radio"
                                  name="location_type_0"
                                  defaultValue="drop-off"
                                />
                                <label htmlFor>Dropoff</label>
                              </div>
                              <div className="radio radio-success radio-inline">
                                <input
                                  id="app"
                                  type="radio"
                                  name="location_type_0"
                                  defaultValue="both"
                                />
                                <label htmlFor>Both</label>
                              </div>
                            </div>
                          </div>
                          <div className="form-group col-md-3 phps_row_1">
                            <span
                              className="input-group"
                              style={{ marginTop: "20px" }}
                            >
                              <span
                                className="input-group-addon"
                                id="plus_pick"
                                onclick="plus_pick_up();"
                              >
                                <i className="fa fa-plus" />
                              </span>
                              <span
                                className="input-group-addon"
                                id="minus_pick"
                                onclick="minus_pick_up()"
                              >
                                <i className="fa fa-minus" />
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-group col-md-6">
                            <div id="pick_up_id" />
                          </div>
                        </div>
                        <div className="row mt-3">
                          <div className="form-group col-md-3 phps_row_0">
                            <span id="loading" style={{ display: "none" }}>
                              <img src="images/loading.gif" alt="" />
                            </span>
                            <button
                              type="button"
                              className="btn btn-dark btn-sm"
                              name="save_button"
                              id="submit_button"
                              value="Save"
                              onclick="Javascript return submit_add_pick_up_form();"
                            >
                              <i className="fa fa-floppy-o" />
                              &nbsp;Save
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="subtab10"
                    role="tabpanel"
                    aria-labelledby="subtab10-tab"
                  >
                    <div
                      className="ediiit"
                      id="edii"
                      style={{ display: showBlock1 ? "block" : "none" }}
                    >
                      <div
                        id="invtabs-1"
                        className="form-group tab-pane ui-tabs-panel ui-widget-content ui-corner-bottom active"
                        aria-labelledby="ui-id-12"
                        role="tabpanel"
                        aria-hidden="false"
                        style={{ display: "block" }}
                      >
                        <h5 style={{ fontSize: "18px" }}>
                          Edit Pick-up &amp; Drop-off Point
                        </h5>
                      </div>
                      <div id="non_transfer_box">
                        <div className="row">
                          <div className="form-group col-md-3 phps_row_1">
                            <label />
                            <input
                              className="form-control form-control-sm input_style1 required"
                              size={40}
                              type="text"
                              name="txt_add_pick_up_0"
                              id="txt_add_pick_up_0"
                              placeholder="mumbai"
                            />
                            <input
                              type="hidden"
                              name="no_of_pick_up"
                              id="no_of_pick_up"
                              defaultValue={1}
                            />
                          </div>
                          <div className="form-group col-md-3 phps_row_0">
                            <label>Location Type </label>
                            <br />
                            <div className="radioline1">
                              <div className="radio radio-success radio-inline">
                                <input
                                  id="location_type_0"
                                  type="radio"
                                  name="location_type_0"
                                  defaultValue="pick-up"
                                />
                                <label htmlFor>Pickup</label>
                              </div>
                              <div className="radio radio-success radio-inline">
                                <input
                                  id="app"
                                  type="radio"
                                  name="location_type_0"
                                  defaultValue="drop-off"
                                />
                                <label htmlFor>Dropoff</label>
                              </div>
                              <div className="radio radio-success radio-inline">
                                <input
                                  id="app"
                                  type="radio"
                                  name="location_type_0"
                                  defaultValue="both"
                                  defaultChecked
                                />
                                <label htmlFor>Both</label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-group col-md-6">
                            <div id="pick_up_id" />
                          </div>
                        </div>
                        <div className="row mt-3">
                          <div className="form-group col-md-3 phps_row_0">
                            <span id="loading" style={{ display: "none" }}>
                              <img src="images/loading.gif" alt="" />
                            </span>
                            <button
                              type="button"
                              className="btn btn-dark btn-sm"
                              name="save_button"
                              id="submit_button"
                              value="Save"
                              onclick="Javascript return submit_add_pick_up_form();"
                            >
                              <i className="fa fa-floppy-o" />
                              &nbsp;Save
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="row"
                      id="ediittable"
                      style={{ display: showBlock1 ? "none" : "block" }}
                    >
                      <div
                        id="invtabs-1"
                        className="form-group tab-pane ui-tabs-panel ui-widget-content ui-corner-bottom active"
                        aria-labelledby="ui-id-12"
                        role="tabpanel"
                        aria-hidden="false"
                        style={{ display: "block" }}
                      >
                        <h5 style={{ fontSize: "18px" }}>
                          View / Edit Pick-up &amp; Drop-off Points
                        </h5>
                      </div>
                      <div className="col-sm-12">
                        <div
                          className="doubleScroll-scroll-wrapper"
                          id="wrapper2"
                          style={{
                            height: "20px",
                            overflow: "scroll hidden",
                            width: "1320px",
                          }}
                        >
                          <div
                            className="suwala-doubleScroll-scroll"
                            style={{ height: "20px", width: "1320px" }}
                          ></div>
                        </div>
                        <div id="wrapper2" style={{ overflow: "auto" }}>
                          <table
                            id="view_pick_up_form1"
                            className="table table-bordered   table-responsive dataTable no-footer"
                            role="grid"
                            aria-describedby="view_pick_up_form1_info"
                          >
                            <thead>
                              <tr className="phps_row_1" role="row">
                                <th
                                  className="sorting_asc"
                                  tabIndex={0}
                                  aria-controls="view_pick_up_form1"
                                  rowSpan={1}
                                  colSpan={1}
                                  aria-sort="ascending"
                                  aria-label="Pick-up &amp; Drop-off Point: activate to sort column descending"
                                  style={{ width: "605.2px" }}
                                >
                                  Pick-up &amp; Drop-off Point
                                </th>
                                <th
                                  className="sorting"
                                  tabIndex={0}
                                  aria-controls="view_pick_up_form1"
                                  rowSpan={1}
                                  colSpan={1}
                                  aria-label="Location Type: activate to sort column ascending"
                                  style={{ width: "372.2px" }}
                                >
                                  Location Type
                                </th>
                                <th
                                  className="no-sort sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  aria-label="Action"
                                  style={{ width: "420px" }}
                                >
                                  Action
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              <tr
                                className="phps_row_0 odd"
                                id="row0"
                                role="row"
                              >
                                <td className="sorting_1">mumbai</td>
                                <td>both</td>
                                <td className="actionlink">
                                  <div className="actionCont">
                                    <div
                                      className="input-group-addon"
                                      id="showBlock1"
                                      onClick={handleShowBlock1}
                                    >
                                      <Link to="#;" title="Edit">
                                        <i className="fa fa-pencil-square-o" />
                                      </Link>
                                    </div>
                                    <div className="input-group-addon">
                                      <Link
                                        to="#"
                                        onclick="delete_pick_point('30');"
                                        title="Delete"
                                      >
                                        <i className="fa fa-trash" />
                                      </Link>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* END */}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default ContractsToursAndActivitiesAddRates;
