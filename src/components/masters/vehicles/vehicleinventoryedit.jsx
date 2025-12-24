import React, { useState } from "react"; // Import React and useState

import Flatpickr from "react-flatpickr";

import { Link } from "react-router-dom";
import Header2 from "../../header2/header2";
import MultiSelect from "../../reactMultiSelect";
import {
  citiesByCountry,
  countries,
} from "../../../constants/Country-City-Data";

const searchSenderOptions = [
  { label: "--Select--", value: 0 },
  { label: "1booking_wh", value: "1booking_wh" },
  { label: "Agent_test", value: "agent_test" },
  { label: "Agent_Test_JV", value: "agent_test_jv" },
  { label: "ankita", value: "ankita" },
  { label: "asmita", value: "asmita" },
  { label: "v4demo", value: "v4demo" },
  { label: "hemangi15", value: "hemangi15" },
  { label: "demo_jb", value: "demo_jb" },
  { label: "jb_2", value: "jb_2" },
  { label: "jv_demo", value: "jv_demo" },
  { label: "jv_user1", value: "jv_user1" },
  { label: "kishorek", value: "kishorek" },
  { label: "Madhuri", value: "madhuri" },
  { label: "Milind_Qtech", value: "milind_qtech" },
  { label: "neeraj", value: "neeraj" },
  { label: "Paresh", value: "paresh" },
  { label: "otramsdemo2", value: "otramsdemo2" },
  { label: "otramsdemo1", value: "otramsdemo1" },
  { label: "otramsdemokw", value: "otramsdemokw" },
  { label: "OtramsDemo11", value: "otramsdemo11" },
  { label: "otramsdemo9", value: "otramsdemo9" },
  { label: "OtramsDemo23", value: "otramsdemo23" },
  { label: "hawallyparesh", value: "hawallyparesh" },
  { label: "Moreshwar_Test", value: "moreshwar_test" },
  { label: "Beta_Tdo", value: "beta_tdo" },
  { label: "user_test", value: "user_test" },
  { label: "test_user", value: "test_user" },
  { label: "test_user_JV", value: "test_user_jv" },
  { label: "Redapple", value: "redapple" },
  { label: "v3otramslive", value: "v3otramslive" },
  { label: "ryanrph", value: "ryanrph" },
  { label: "shivraj", value: "shivraj" },
  { label: "simple", value: "simple" },
  { label: "simplee", value: "simplee" },
  { label: "v3_otrams_wh", value: "v3_otrams_wh" },
  { label: "Worldavenue", value: "worldavenue" },
  { label: "Saya_test", value: "saya_test" },
  { label: "bi_testing", value: "bi_testing" },
  { label: "Sujay_test", value: "sujay_test" },
  { label: "TEST_JV", value: "test_jv" },
  { label: "TEST_JV_C", value: "test_jv_c" },
  { label: "TEST_JV_A", value: "test_jv_a" },
  { label: "kishore", value: "kishore" },
  { label: "otrams_syria", value: "otrams_syria" },
  { label: "swaralisales", value: "swaralisales" },
  { label: "Swaralisalesdemo", value: "swaralisalesdemo" },
  { label: "v4,demo", value: "v4,demo" },
  { label: "svss", value: "svss" },
  { label: "worldavennuejv", value: "worldavennuejv" },
  {
    label: "1 Booking WL (Do Not Edit)-1bookingwhagent -(Agent)",
    value: "1bookingwhagent",
  },
  { label: "abc-VisaSub -(Sub Agent)", value: "VisaSub" },
  { label: "ABM-newsub -(Sub Agent)", value: "newsub" },
  { label: "ABM-Subqtech -(Sub Agent)", value: "Subqtech" },
  { label: "BookItNow-BookItNow -(Agent)", value: "BookItNow" },
  { label: "ELiago-Eliago_ws -(Agent)", value: "Eliago_ws" },
  { label: "GoGoa-GoGoa -(Agent)", value: "GoGoa" },
  { label: "GRN Connect-grnconnect -(Agent)", value: "grnconnect" },
  { label: "Hexion-Hexion_ws -(Agent)", value: "Hexion_ws" },
  { label: "hhgh-brach_test -(Agent)", value: "brach_test" },
  { label: "JAISON JAMES-jaisonqtech -(Agent)", value: "jaisonqtech" },
  { label: "JV-JV_test -(Agent)", value: "JV_test" },
  { label: "LMN-PQR -(Sub Agent)", value: "PQR" },
  { label: "Lots of Hotels-asmiyu -(Sub Agent)", value: "asmiyu" },
  { label: "minal@123-sub agent -(Sub Agent)", value: "sub agent" },
  { label: "moavia_eilago-m.moavia -(Agent)", value: "m.moavia" },
  { label: "My Hotels-myhotels_ws -(Agent)", value: "myhotels_ws" },
  { label: "online Supplier-online_supp -(Agent)", value: "online_supp" },
  { label: "Qtech-allwinace -(Agent)", value: "allwinace" },
  { label: "qtech-asmiee -(Sub Agent)", value: "asmiee" },
  { label: "Qtech-odyssey_ws -(Agent)", value: "odyssey_ws" },
  { label: "Qtech-allwin_1122 -(Agent)", value: "allwin_1122" },
  { label: "Qtech Jaison-Qtechnew -(Agent)", value: "Qtechnew" },
  { label: "Qtech Software-QStdo_ws -(Agent)", value: "QStdo_ws" },
  { label: "Qtech Software PVT-wego_ws -(Agent)", value: "wego_ws" },
  { label: "Qtech@1234-agentsub -(Sub Agent)", value: "agentsub" },
  { label: "Qtechhhhhh-Qtechhhhhh -(Agent)", value: "Qtechhhhhh" },
  { label: "qtecj-sayali -(Sub Agent)", value: "sayali" },
  { label: "rohan white label-rohan_wl -(Agent)", value: "rohan_wl" },
  { label: "Rohit Travels-rohitmhtm -(Agent)", value: "rohitmhtm" },
  { label: "sdfdf-sub2 -(Sub Agent)", value: "sub2" },
  { label: "Shiv Travels-shiv -(Agent)", value: "shiv" },
  { label: "sqtech-sqtech -(Agent)", value: "sqtech" },
  { label: "Sub Company-subagentt2 -(Sub Agent)", value: "subagentt2" },
  { label: "suhaspatil-suhas1 -(Agent)", value: "suhas1" },
  { label: "Sujayq-Sujayq -(Agent)", value: "Sujayq" },
  { label: "Sujay_JV-TEST_JV_ -(Agent)", value: "TEST_JV_" },
  { label: "TDO-akbar -(Agent)", value: "akbar" },
  { label: "tdo webservice test-tdo_ws_test -(Agent)", value: "tdo_ws_test" },
  { label: "trtrt-cash_agent_branch -(Agent)", value: "cash_agent_branch" },
  { label: "Vartak &Vartak Tours-vartakk -(Agent)", value: "vartakk" },
  { label: "Vartak Holidazzle-rohan -(Agent)", value: "rohan" },
  { label: "Welcome@123-allwin_sub25 -(Sub Agent)", value: "allwin_sub25" },
];

const selVehicleType1Options = [
  { value: 0, label: " - Select Vehicle Type -" },
  { value: "LXS", label: "Luxury Sedan" },
  { value: "Q1", label: "Coaster" },
  { value: "BM01", label: "Super Luxury" },
  { value: "BS", label: "TANIA BUS" },
  { value: 8, label: "Local_Transfer_Vehicle" },
  { value: 9, label: "Sedan" },
  { value: 10, label: "Economy Car" },
  { value: 11, label: "Mini Van" },
  { value: 12, label: "Big Van" },
  { value: 20, label: "TT" },
  { value: 23, label: "inventory retest_1" },
  { value: 25, label: "inventory retest_2" },
  { value: 26, label: "vaibhav" },
  { value: 27, label: "test VEHICLE" },
  { value: 28, label: "car" },
  { value: 29, label: "swift zxi" },
];

const MastersVehiclesInventoryEdit = () => {
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
      <Header2 title="SEARCH" />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <div>
          <form>
            <div className="panel-body">
              <div className="row">
                <div className="col-md-2 form-group">
                  <label>Supplier</label>
                  <MultiSelect
                    options={searchSenderOptions}
                    isSearchable
                    placeholder=" Select Supplier "
                    className="custom-select"
                    noOptionsMessage={() => "No Supplier Found"}
                  />
                </div>
                <div className="col-md-2 form-group">
                  <label>Vehicle</label>
                  <MultiSelect
                    options={selVehicleType1Options}
                    isSearchable
                    placeholder=" Select Vehicle "
                    className="custom-select"
                    noOptionsMessage={() => "No Vehicle Found"}
                  />
                </div>
                <div className="col-md-2 form-group">
                  <label>Country</label>
                  <MultiSelect
                    options={countries}
                    isSearchable
                    placeholder="- Select Country -"
                    className="custom-select required"
                    onChange={handleCountryChange}
                    noOptionsMessage={() => "No Country Found"}
                  />
                </div>
                <div className="col-md-2 form-group">
                  <label>City</label>
                  <MultiSelect
                    //  options={Array.isArray(branchData.branchCity) ? branchData.branchCity : []}
                    options={citiesByCountry[branchData.branchCountry] || []}
                    isSearchable
                    placeholder="- Select City -"
                    className="custom-select required"
                    onChange={handleCityChange}
                    noOptionsMessage={() => "No City Found"}
                  />
                </div>
                <div className="col-md-2 form-group">
                  <label>Start Date </label> <br />
                  <p id="start_date_txt">12/09/2019</p>
                </div>
                <div className="col-md-2 form-group">
                  <label>End Date </label>
                  <br />
                  <p id="end_date_txt">31/12/2019</p>
                </div>
              </div>
            </div>
          </form>
          <form className="mt-3">
            <div className="panel-body">
              <div className="row">
                <div className="form-group col-md-3">
                  <label> Update Inventory </label>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-3">
                  <label>Inventory Date</label>
                  <div
                    className="input-daterange input-group date"
                    id="datetimepicker"
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
                      alt="clear"
                      title="clear"
                      onClick={handleTrashClick}
                    >
                      <i className="fa fa-trash" />
                    </span>
                  </div>
                </div>
                <input type="hidden" name="sel_avail_from" defaultValue={0} />
                <input type="hidden" name="sel_avail_to" defaultValue={24} />
                <div className="form-group col-md-3">
                  <label>Sale Type</label>
                  <br />
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      name="sale_policy"
                      id="sale_policy"
                      defaultValue="free_sale"
                    />
                    <label htmlFor="free_sale">Free Sale</label>
                  </div>
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      name="sale_policy"
                      id="sale_policy"
                      defaultValue="stop_sale"
                    />
                    <label htmlFor="appl_tue">Stop Sale</label>
                  </div>
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      name="sale_policy"
                      id="sale_policy"
                      defaultValue="default_sale"
                      defaultChecked
                    />
                    <label htmlFor="appl_tue">Default Sale</label>
                  </div>
                </div>
                <div className="form-group col-md-1">
                  <label>No Of Inventory </label>
                  <input
                    type="hidden"
                    name="inventory_type"
                    defaultValue="Private"
                  />
                  <input
                    type="text"
                    className="form-control required"
                    name="txt_no_of_inventory"
                    id="txt_no_of_inventory"
                    size={30}
                    maxLength={4}
                    onblur="extractNumber(this,2,false);"
                    onkeyup="extractNumber(this,2,false);"
                  />
                </div>
                <div className="form-group col-md-3">
                  <label>Inventory Type</label>
                  <br />
                  No of Vehicles
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-2">
                  <label>
                    Release Period (Hrs){" "}
                    <i
                      className="fa fa-info-circle pointer"
                      title
                      data-toggle="tooltip"
                      data-placement="top"
                      data-original-title="What is  Release Period? The minimum number of days you can book before the transfer Date."
                    />
                  </label>
                  <input
                    type="text"
                    className="form-control required"
                    placeholder="Week Day"
                    name="txt_rel_hrs_weekday"
                    id="txt_rel_hrs_weekday"
                    size={4}
                    maxLength={255}
                    onblur="extractNumber(this,1,false);"
                    onkeyup="extractNumber(this,1,false);"
                  />
                </div>
                <div className="form-group col-md-2">
                  <label>&nbsp;&nbsp;</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Week End"
                    name="txt_rel_hrs_weekend"
                    id="txt_rel_hrs_weekend"
                    size={4}
                    maxLength={255}
                    onblur="extractNumber(this,1,false);"
                    onkeyup="extractNumber(this,1,false);"
                  />
                </div>
                <div className="form-group col-md-2">
                  <br />
                  <button
                    type="button"
                    className="btn btn-dark btn-sm"
                    name="b1"
                    value="SUBMIT"
                    onclick="Javascript update_inventory(document.forms['update_vehicle_inventory_from'],0,'update');"
                  >
                    <i className="fa fa-check" />
                    &nbsp;Update
                  </button>
                </div>
              </div>
            </div>
          </form>
          <style
            dangerouslySetInnerHTML={{
              __html:
                '\n    /*!\n * FullCalendar v2.2.6 Stylesheet\n * Docs & License: http://arshaw.com/fullcalendar/\n * (c) 2013 Adam Shaw\n */\n\n\n.fc {\n\tdirection: ltr;\n\ttext-align: left;\n}\n\n.fc-rtl {\n\ttext-align: right;\n}\n\nbody .fc { /* extra precedence to overcome jqui */\n\tfont-size: 12px;\n}\n\n\n/* Colors\n--------------------------------------------------------------------------------------------------*/\n\n.fc-unthemed th,\n.fc-unthemed td,\n.fc-unthemed hr,\n.fc-unthemed thead,\n.fc-unthemed tbody,\n.fc-unthemed .fc-row,\n.fc-unthemed .fc-popover {\n\tborder-color: #ddd;\n}\n\n.fc-unthemed .fc-popover {\n\tbackground-color: #fff !important;\n}\n\n.fc-unthemed hr,\n.fc-unthemed .fc-popover .fc-header {\n\tbackground: #eee !important;\n}\n\n.fc-unthemed .fc-popover .fc-header .fc-close {\n\tcolor: #666 !important;\n}\n\n.fc-unthemed .fc-today {\n\tbackground: #fcf8e3 !important;\n}\n\n.fc-highlight { /* when user is selecting cells */\n\tbackground: #bce8f1 !important;\n\topacity: .3;\n\tfilter: alpha(opacity=30); /* for IE */\n}\n\n.fc-bgevent { /* default look for background events */\n\tbackground: rgb(143, 223, 130) !important;\n\topacity: .3;\n\tfilter: alpha(opacity=30); /* for IE */\n}\n\n.fc-nonbusiness { /* default look for non-business-hours areas */\n\t/* will inherit .fc-bgevent\'s styles */\n\tbackground: #ccc !important;\n}\n\n\n/* Icons (inline elements with styled text that mock arrow icons)\n--------------------------------------------------------------------------------------------------*/\n\n.fc-icon {\n\tdisplay: inline-block;\n\tfont-size: 2em;\n\tline-height: .5em;\n\theight: .5em; /* will make the total height 1em */\n\tfont-family: "Courier New", Courier, monospace;\n}\n\n.fc-icon-left-single-arrow:after {\n\tcontent: "\\02039";\n\tfont-weight: bold;\n}\n\n.fc-icon-right-single-arrow:after {\n\tcontent: "\\0203A";\n\tfont-weight: bold;\n}\n\n.fc-icon-left-double-arrow:after {\n\tcontent: "\\000AB";\n}\n\n.fc-icon-right-double-arrow:after {\n\tcontent: "\\000BB";\n}\n\n.fc-icon-x:after {\n\tcontent: "\\000D7";\n}\n\n\n/* Buttons (styled <button> tags, normalized to work cross-browser)\n--------------------------------------------------------------------------------------------------*/\n\n.fc button {\n\t/* force height to include the border and padding */\n\t-moz-box-sizing: border-box;\n\t-webkit-box-sizing: border-box;\n\tbox-sizing: border-box;\n\n\t/* dimensions */\n\tmargin: 0;\n\theight: 2.1em;\n\tpadding: 0 .6em;\n\n\t/* text & cursor */\n\tfont-size: 1em; /* normalize */\n\twhite-space: nowrap;\n\tcursor: pointer;\n}\n\n/* Firefox has an annoying inner border */\n.fc button::-moz-focus-inner { margin: 0; padding: 0; }\n\t\n.fc-state-default { /* non-theme */\n\tborder: 1px solid;\n}\n\n.fc-state-default.fc-corner-left { /* non-theme */\n\tborder-top-left-radius: 4px;\n\tborder-bottom-left-radius: 4px;\n}\n\n.fc-state-default.fc-corner-right { /* non-theme */\n\tborder-top-right-radius: 4px;\n\tborder-bottom-right-radius: 4px;\n}\n\n/* icons in buttons */\n\n.fc button .fc-icon { /* non-theme */\n\tposition: relative;\n\ttop: .05em; /* seems to be a good adjustment across browsers */\n\tmargin: 0 .1em;\n}\n\t\n/*\n  button states\n  borrowed from twitter bootstrap (http://twitter.github.com/bootstrap/)\n*/\n\n.fc-state-default {\n\tbackground-color: #f5f5f5;\n\tbackground-image: -moz-linear-gradient(top, #ffffff, #e6e6e6);\n\tbackground-image: -webkit-gradient(linear, 0 0, 0 100%, from(#ffffff), to(#e6e6e6));\n\tbackground-image: -webkit-linear-gradient(top, #ffffff, #e6e6e6);\n\tbackground-image: -o-linear-gradient(top, #ffffff, #e6e6e6);\n\tbackground-image: linear-gradient(to bottom, #ffffff, #e6e6e6);\n\tbackground-repeat: repeat-x;\n\tborder-color: #e6e6e6 #e6e6e6 #bfbfbf;\n\tborder-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);\n\tcolor: #333;\n\ttext-shadow: 0 1px 1px rgba(255, 255, 255, 0.75);\n\tbox-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);\n}\n\n.fc-state-hover,\n.fc-state-down,\n.fc-state-active,\n.fc-state-disabled {\n\tcolor: #333333;\n\tbackground-color: #e6e6e6;\n}\n\n.fc-state-hover {\n\tcolor: #333333;\n\ttext-decoration: none;\n\tbackground-position: 0 -15px;\n\t-webkit-transition: background-position 0.1s linear;\n\t   -moz-transition: background-position 0.1s linear;\n\t     -o-transition: background-position 0.1s linear;\n\t        transition: background-position 0.1s linear;\n}\n\n.fc-state-down,\n.fc-state-active {\n\tbackground-color: #cccccc;\n\tbackground-image: none;\n\tbox-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.05);\n}\n\n.fc-state-disabled {\n\tcursor: default;\n\tbackground-image: none;\n\topacity: 0.65;\n\tfilter: alpha(opacity=65);\n\tbox-shadow: none;\n}\n\n\n/* Buttons Groups\n--------------------------------------------------------------------------------------------------*/\n\n.fc-button-group {\n\tdisplay: inline-block;\n}\n\n/*\nevery button that is not first in a button group should scootch over one pixel and cover the\nprevious button\'s border...\n*/\n\n.fc .fc-button-group > * { /* extra precedence b/c buttons have margin set to zero */\n\tfloat: left;\n\tmargin: 0 0 0 -1px;\n}\n\n.fc .fc-button-group > :first-child { /* same */\n\tmargin-left: 0;\n}\n\n\n/* Popover\n--------------------------------------------------------------------------------------------------*/\n\n.fc-popover {\n\tposition: absolute;\n\tbox-shadow: 0 2px 6px rgba(0,0,0,.15);\n}\n\n.fc-popover .fc-header {\n\tpadding: 2px 4px;\n}\n\n.fc-popover .fc-header .fc-title {\n\tmargin: 0 2px;\n}\n\n.fc-popover .fc-header .fc-close {\n\tcursor: pointer;\n}\n\n.fc-ltr .fc-popover .fc-header .fc-title,\n.fc-rtl .fc-popover .fc-header .fc-close {\n\tfloat: left;\n}\n\n.fc-rtl .fc-popover .fc-header .fc-title,\n.fc-ltr .fc-popover .fc-header .fc-close {\n\tfloat: right;\n}\n\n/* unthemed */\n\n.fc-unthemed .fc-popover {\n\tborder-width: 1px;\n\tborder-style: solid;\n}\n\n.fc-unthemed .fc-popover .fc-header .fc-close {\n\tfont-size: 25px;\n\tmargin-top: 4px;\n}\n\n/* jqui themed */\n\n.fc-popover > .ui-widget-header + .ui-widget-content {\n\tborder-top: 0; /* where they meet, let the header have the border */\n}\n\n\n/* Misc Reusable Components\n--------------------------------------------------------------------------------------------------*/\n\n.fc hr {\n\theight: 0;\n\tmargin: 0;\n\tpadding: 0 0 2px; /* height is unreliable across browsers, so use padding */\n\tborder-style: solid;\n\tborder-width: 1px 0;\n}\n\n.fc-clear {\n\tclear: both;\n}\n\n.fc-bg,\n.fc-bgevent-skeleton,\n.fc-highlight-skeleton,\n.fc-helper-skeleton {\n\t/* these element should always cling to top-left/right corners */\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\tright: 0;\n}\n\n.fc-bg {\n\tbottom: 0; /* strech bg to bottom edge */\n}\n\n.fc-bg table {\n\theight: 100%; /* strech bg to bottom edge */\n}\n\n\n/* Tables\n--------------------------------------------------------------------------------------------------*/\n\n.fc table {\n\twidth: 1458px;\n\ttable-layout: fixed;\n\tborder-collapse: collapse;\n\tborder-spacing: 0;\n\tfont-size: 1em; /* normalize cross-browser */\n}\n\n.fc th {\n\ttext-align: center;\n    color: #333;\n    background-color: #f4f5f9;\n}\n\n.fc th,\n.fc td {\n\tborder-style: solid;\n\tborder-width: 1px;\n\tpadding: 0;\n\tvertical-align: top;\n}\n\n.fc td.fc-today {\n\tborder-style: double; /* overcome neighboring borders */\n}\n\n\n/* Fake Table Rows\n--------------------------------------------------------------------------------------------------*/\n\n.fc .fc-row { /* extra precedence to overcome themes w/ .ui-widget-content forcing a 1px border */\n\t/* no visible border by default. but make available if need be (scrollbar width compensation) */\n\tborder-style: solid;\n\tborder-width: 0;\n}\n\n.fc-row table {\n\t/* don\'t put left/right border on anything within a fake row.\n\t   the outer tbody will worry about this */\n\tborder-left: 0 hidden transparent;\n\tborder-right: 0 hidden transparent;\n\n\t/* no bottom borders on rows */\n\tborder-bottom: 0 hidden transparent; \n}\n\n.fc-row:first-child table {\n\tborder-top: 0 hidden transparent; /* no top border on first row */\n}\n\n\n/* Day Row (used within the header and the DayGrid)\n--------------------------------------------------------------------------------------------------*/\n\n.fc-row {\n\tposition: relative;\n}\n\n.fc-row .fc-bg {\n\tz-index: 1;\n}\n\n/* highlighting cells & background event skeleton */\n\n.fc-row .fc-bgevent-skeleton,\n.fc-row .fc-highlight-skeleton {\n\tbottom: 0; /* stretch skeleton to bottom of row */\n}\n\n.fc-row .fc-bgevent-skeleton table,\n.fc-row .fc-highlight-skeleton table {\n\theight: 100%; /* stretch skeleton to bottom of row */\n}\n\n.fc-row .fc-highlight-skeleton td,\n.fc-row .fc-bgevent-skeleton td {\n\tborder-color: transparent;\n}\n\n.fc-row .fc-bgevent-skeleton {\n\tz-index: 2;\n\n}\n\n.fc-row .fc-highlight-skeleton {\n\tz-index: 3;\n}\na:hover, a:focus {\n    color: #34495e !important;\n    text-decoration: none !important;\n    cursor: pointer;\n}\n.fc-past a{\ncolor: #333;\ntext-decoration: none;\n}\n.fc-content:hover{\n    color: white !important;\n}\n.fc-event-container:hover{\n    color: white !important;\n}\n\n/*\nrow content (which contains day/week numbers and events) as well as "helper" (which contains\ntemporary rendered events).\n*/\n\n.fc-row .fc-content-skeleton {\n\tposition: relative;\n\tz-index: 4;\n\tpadding-bottom: 2px; /* matches the space above the events */\n}\n\n.fc-row .fc-helper-skeleton {\n\tz-index: 5;\n}\n\n.fc-row .fc-content-skeleton td,\n.fc-row .fc-helper-skeleton td {\n\t/* see-through to the background below */\n\tbackground: none; /* in case <td>s are globally styled */\n\tborder-color: transparent;\n\n\t/* don\'t put a border between events and/or the day number */\n\tborder-bottom: 0;\n}\n\n.fc-row .fc-content-skeleton tbody td, /* cells with events inside (so NOT the day number cell) */\n.fc-row .fc-helper-skeleton tbody td {\n\t/* don\'t put a border between event cells */\n\tborder-top: 0;\n}\n\n\n/* Scrolling Container\n--------------------------------------------------------------------------------------------------*/\n\n.fc-scroller { /* this class goes on elements for guaranteed vertical scrollbars */\n\toverflow-y: scroll;\n\toverflow-x: hidden;\n}\n\n.fc-scroller > * { /* we expect an immediate inner element */\n\tposition: relative; /* re-scope all positions */\n\twidth: 100%; /* hack to force re-sizing this inner element when scrollbars appear/disappear */\n\toverflow: hidden; /* don\'t let negative margins or absolute positioning create further scroll */\n}\n\n\n/* Global Event Styles\n--------------------------------------------------------------------------------------------------*/\n\n.fc-event {\n\tposition: relative; /* for resize handle and other inner positioning */\n\tdisplay: block; /* make the <Link> tag block */\n\tfont-size: .85em;\n\tline-height: 1.3;\n\tborder-radius: 3px;\n\tborder: 1px solid #3a87ad; /* default BORDER color */\n\tbackground-color: #3a87ad; /* default BACKGROUND color */\n\tfont-weight: normal; /* undo jqui\'s ui-widget-header bold */\n}\n\n/* overpower some of bootstrap\'s and jqui\'s styles on <Link> tags */\n.fc-event,\n.fc-event:hover,\n.ui-widget .fc-event {\n\tcolor: #fff; /* default TEXT color */\n\ttext-decoration: none; /* if <Link> has an to */\n}\n\n.fc-event[to],\n.fc-event.fc-draggable {\n\tcursor: pointer; /* give events with links and draggable events a hand mouse pointer */\n}\n\n.fc-not-allowed, /* causes a "warning" cursor. applied on body */\n.fc-not-allowed .fc-event { /* to override an event\'s custom cursor */\n\tcursor: not-allowed;\n}\n.fc-past{\n    background-color: white !important;\n  \n}\n\n/* DayGrid events\n----------------------------------------------------------------------------------------------------\nWe use the full "fc-day-grid-event" class instead of using descendants because the event won\'t\nbe a descendant of the grid when it is being dragged.\n*/\n\n.fc-day-grid-event {\n\tmargin: 1px 2px 0; /* spacing between events and edges */\n\tpadding: 0 1px;\n}\n\n/* events that are continuing to/from another week. kill rounded corners and butt up against edge */\n\n.fc-ltr .fc-day-grid-event.fc-not-start,\n.fc-rtl .fc-day-grid-event.fc-not-end {\n\tmargin-left: 0;\n\tborder-left-width: 0;\n\tpadding-left: 1px; /* replace the border with padding */\n\tborder-top-left-radius: 0;\n\tborder-bottom-left-radius: 0;\n}\n\n.fc-ltr .fc-day-grid-event.fc-not-end,\n.fc-rtl .fc-day-grid-event.fc-not-start {\n\tmargin-right: 0;\n\tborder-right-width: 0;\n\tpadding-right: 1px; /* replace the border with padding */\n\tborder-top-right-radius: 0;\n\tborder-bottom-right-radius: 0;\n}\n\n.fc-day-grid-event > .fc-content { /* force events to be one-line tall */\n\twhite-space: nowrap;\n\toverflow: hidden;\n}\n\n.fc-day-grid-event .fc-time {\n\tfont-weight: bold;\n}\n\n/* resize handle (outside of fc-content, so can go outside of bounds) */\n\n.fc-day-grid-event .fc-resizer {\n\tposition: absolute;\n\ttop: 0;\n\tbottom: 0;\n\twidth: 7px;\n}\n\n.fc-ltr .fc-day-grid-event .fc-resizer {\n\tright: -3px;\n\tcursor: e-resize;\n}\n\n.fc-rtl .fc-day-grid-event .fc-resizer {\n\tleft: -3px;\n\tcursor: w-resize;\n}\n\n\n/* Event Limiting\n--------------------------------------------------------------------------------------------------*/\n\n/* "more" link that represents hidden events */\n\na.fc-more {\n\tmargin: 1px 3px;\n\tfont-size: .85em;\n\tcursor: pointer;\n\ttext-decoration: none;\n}\n\na.fc-more:hover {\n\ttext-decoration: underline;\n}\n\n.fc-limited { /* rows and cells that are hidden because of a "more" link */\n\tdisplay: none;\n}\n\n/* popover that appears when "more" link is clicked */\n\n.fc-day-grid .fc-row {\n\tz-index: 1; /* make the "more" popover one higher than this */\n}\n\n.fc-more-popover {\n\tz-index: 2;\n\twidth: 220px;\n}\n\n.fc-more-popover .fc-event-container {\n\tpadding: 10px;\n}\n\n/* Toolbar\n--------------------------------------------------------------------------------------------------*/\n\n.fc-toolbar {\n\ttext-align: center;\n\tmargin-bottom: 1em;\n}\n\n.fc-toolbar .fc-left {\n\tfloat: left;\n}\n\n.fc-toolbar .fc-right {\n\tfloat: right;\n}\n\n.fc-toolbar .fc-center {\n\tdisplay: inline-block;\n}\n\n/* the things within each left/right/center section */\n.fc .fc-toolbar > * > * { /* extra precedence to override button border margins */\n\tfloat: left;\n\tmargin-left: .75em;\n}\n\n/* the first thing within each left/center/right section */\n.fc .fc-toolbar > * > :first-child { /* extra precedence to override button border margins */\n\tmargin-left: 0;\n}\n\t\n/* title text */\n\n.fc-toolbar h2 {\n\tmargin: 0;\n}\n\n/* button layering (for border precedence) */\n\n.fc-toolbar button {\n\tposition: relative;\n}\n\n.fc-toolbar .fc-state-hover,\n.fc-toolbar .ui-state-hover {\n\tz-index: 2;\n}\n\t\n.fc-toolbar .fc-state-down {\n\tz-index: 3;\n}\n\n.fc-toolbar .fc-state-active,\n.fc-toolbar .ui-state-active {\n\tz-index: 4;\n}\n\n.fc-toolbar button:focus {\n\tz-index: 5;\n}\n\n\n/* View Structure\n--------------------------------------------------------------------------------------------------*/\n\n/* undo twitter bootstrap\'s box-sizing rules. normalizes positioning techniques */\n/* don\'t do this for the toolbar because we\'ll want bootstrap to style those buttons as some pt */\n.fc-view-container *,\n.fc-view-container *:before,\n.fc-view-container *:after {\n\t-webkit-box-sizing: content-box;\n\t   -moz-box-sizing: content-box;\n\t        box-sizing: content-box;\n}\n\n.fc-view, /* scope positioning and z-index\'s for everything within the view */\n.fc-view > table { /* so dragged elements can be above the view\'s main element */\n\tposition: relative;\n\tz-index: 1;\n\toverflow-x: scroll;\n}\n\n/* BasicView\n--------------------------------------------------------------------------------------------------*/\n\n/* day row structure */\n\n.fc-basicWeek-view .fc-content-skeleton,\n.fc-basicDay-view .fc-content-skeleton {\n\t/* we are sure there are no day numbers in these views, so... */\n\tpadding-top: 1px; /* add a pixel to make sure there are 2px padding above events */\n\tpadding-bottom: 1em; /* ensure a space at bottom of cell for user selecting/clicking */\n}\n\n.fc-basic-view tbody .fc-row {\n\tmin-height: 4em; /* ensure that all rows are at least this tall */\n}\n\n/* a "rigid" row will take up a constant amount of height because content-skeleton is absolute */\n\n.fc-row.fc-rigid {\n\toverflow: hidden;\n}\n\n.fc-row.fc-rigid .fc-content-skeleton {\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\tright: 0;\n}\n\n/* week and day number styling */\n\n.fc-basic-view .fc-week-number,\n.fc-basic-view .fc-day-number {\n\tpadding: 0 2px;\n}\n\n.fc-basic-view td.fc-week-number span,\n.fc-basic-view td.fc-day-number {\n\tpadding-top: 2px;\n\tpadding-bottom: 2px;\n}\n\n.fc-basic-view .fc-week-number {\n\ttext-align: center;\n}\n\n.fc-basic-view .fc-week-number span {\n\t/* work around the way we do column resizing and ensure a minimum width */\n\tdisplay: inline-block;\n\tmin-width: 1.25em;\n}\n\n.fc-ltr .fc-basic-view .fc-day-number {\n\ttext-align: right;\n}\n\n.fc-rtl .fc-basic-view .fc-day-number {\n\ttext-align: left;\n}\n\n.fc-day-number.fc-other-month {\n\topacity: 0.3;\n\tfilter: alpha(opacity=30); /* for IE */\n\t/* opacity with small font can sometimes look too faded\n\t   might want to set the \'color\' property instead\n\t   making day-numbers bold also fixes the problem */\n}\n\n/* AgendaView all-day area\n--------------------------------------------------------------------------------------------------*/\n\n.fc-agenda-view .fc-day-grid {\n\tposition: relative;\n\tz-index: 2; /* so the "more.." popover will be over the time grid */\n}\n\n.fc-agenda-view .fc-day-grid .fc-row {\n\tmin-height: 3em; /* all-day section will never get shorter than this */\n}\n\n.fc-agenda-view .fc-day-grid .fc-row .fc-content-skeleton {\n\tpadding-top: 1px; /* add a pixel to make sure there are 2px padding above events */\n\tpadding-bottom: 1em; /* give space underneath events for clicking/selecting days */\n}\n\n\n/* TimeGrid axis running down the side (for both the all-day area and the slot area)\n--------------------------------------------------------------------------------------------------*/\n\n.fc .fc-axis { /* .fc to overcome default cell styles */\n\tvertical-align: middle;\n\tpadding: 0 4px;\n\twhite-space: nowrap;\n}\n\n.fc-ltr .fc-axis {\n\ttext-align: right;\n}\n\n.fc-rtl .fc-axis {\n\ttext-align: left;\n}\n\n.ui-widget td.fc-axis {\n\tfont-weight: normal; /* overcome jqui theme making it bold */\n}\n\n\n/* TimeGrid Structure\n--------------------------------------------------------------------------------------------------*/\n\n.fc-time-grid-container, /* so scroll container\'s z-index is below all-day */\n.fc-time-grid { /* so slats/bg/content/etc positions get scoped within here */\n\tposition: relative;\n\tz-index: 1;\n}\n\n.fc-time-grid {\n\tmin-height: 100%; /* so if height setting is \'auto\', .fc-bg stretches to fill height */\n}\n\n.fc-time-grid table { /* don\'t put outer borders on slats/bg/content/etc */\n\tborder: 0 hidden transparent;\n}\n\n.fc-time-grid > .fc-bg {\n\tz-index: 1;\n}\n\n.fc-time-grid .fc-slats,\n.fc-time-grid > hr { /* the <hr> AgendaView injects when grid is shorter than scroller */\n\tposition: relative;\n\tz-index: 2;\n}\n\n.fc-time-grid .fc-bgevent-skeleton,\n.fc-time-grid .fc-content-skeleton {\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\tright: 0;\n}\n\n.fc-time-grid .fc-bgevent-skeleton {\n\tz-index: 3;\n}\n\n.fc-time-grid .fc-highlight-skeleton {\n\tz-index: 4;\n}\n\n.fc-time-grid .fc-content-skeleton {\n\tz-index: 5;\n}\n\n.fc-time-grid .fc-helper-skeleton {\n\tz-index: 6;\n}\n\n\n/* TimeGrid Slats (lines that run horizontally)\n--------------------------------------------------------------------------------------------------*/\n\n.fc-slats td {\n\theight: 1.5em;\n\tborder-bottom: 0; /* each cell is responsible for its top border */\n}\n\n.fc-slats .fc-minor td {\n\tborder-top-style: dotted;\n}\n\n.fc-slats .ui-widget-content { /* for jqui theme */\n\tbackground: none; /* see through to fc-bg */\n}\n\n\n/* TimeGrid Highlighting Slots\n--------------------------------------------------------------------------------------------------*/\n\n.fc-time-grid .fc-highlight-container { /* a div within a cell within the fc-highlight-skeleton */\n\tposition: relative; /* scopes the left/right of the fc-highlight to be in the column */\n}\n\n.fc-time-grid .fc-highlight {\n\tposition: absolute;\n\tleft: 0;\n\tright: 0;\n\t/* top and bottom will be in by JS */\n}\n\n\n/* TimeGrid Event Containment\n--------------------------------------------------------------------------------------------------*/\n\n.fc-time-grid .fc-event-container, /* a div within a cell within the fc-content-skeleton */\n.fc-time-grid .fc-bgevent-container { /* a div within a cell within the fc-bgevent-skeleton */\n\tposition: relative;\n}\n\n.fc-ltr .fc-time-grid .fc-event-container { /* space on the sides of events for LTR (default) */\n\tmargin: 0 2.5% 0 2px;\n}\n\n.fc-rtl .fc-time-grid .fc-event-container { /* space on the sides of events for RTL */\n\tmargin: 0 2px 0 2.5%;\n}\n\n.fc-time-grid .fc-event,\n.fc-time-grid .fc-bgevent {\n\tposition: absolute;\n\tz-index: 1; /* scope inner z-index\'s */\n}\n\n.fc-time-grid .fc-bgevent {\n\t/* background events always span full width */\n\tleft: 0;\n\tright: 0;\n}\n\n\n/* TimeGrid Event Styling\n----------------------------------------------------------------------------------------------------\nWe use the full "fc-time-grid-event" class instead of using descendants because the event won\'t\nbe a descendant of the grid when it is being dragged.\n*/\n\n.fc-time-grid-event.fc-not-start { /* events that are continuing from another day */\n\t/* replace space made by the top border with padding */\n\tborder-top-width: 0;\n\tpadding-top: 1px;\n\n\t/* remove top rounded corners */\n\tborder-top-left-radius: 0;\n\tborder-top-right-radius: 0;\n}\n\n.fc-time-grid-event.fc-not-end {\n\t/* replace space made by the top border with padding */\n\tborder-bottom-width: 0;\n\tpadding-bottom: 1px;\n\n\t/* remove bottom rounded corners */\n\tborder-bottom-left-radius: 0;\n\tborder-bottom-right-radius: 0;\n}\n\n.fc-time-grid-event {\n\toverflow: hidden; /* don\'t let the bg flow over rounded corners */\n}\n\n.fc-time-grid-event > .fc-content { /* contains the time and title, but no bg and resizer */\n\tposition: relative;\n\tz-index: 2; /* above the bg */\n}\n\n.fc-time-grid-event .fc-time,\n.fc-time-grid-event .fc-title {\n\tpadding: 0 1px;\n}\n\n.fc-time-grid-event .fc-time {\n\tfont-size: .85em;\n\twhite-space: nowrap;\n}\n\n.fc-time-grid-event .fc-bg {\n\tz-index: 1;\n\tbackground: #fff;\n\topacity: .25;\n\tfilter: alpha(opacity=25); /* for IE */\n}\n\n/* short mode, where time and title are on the same line */\n\n.fc-time-grid-event.fc-short .fc-content {\n\t/* don\'t wrap to second line (now that contents will be inline) */\n\twhite-space: nowrap;\n}\n\n.fc-time-grid-event.fc-short .fc-time,\n.fc-time-grid-event.fc-short .fc-title {\n\t/* put the time and title on the same line */\n\tdisplay: inline-block;\n\tvertical-align: top;\n}\n\n.fc-time-grid-event.fc-short .fc-time span {\n\tdisplay: none; /* don\'t display the full time text... */\n}\n\n.fc-time-grid-event.fc-short .fc-time:before {\n\tcontent: attr(data-start); /* ...instead, display only the start time */\n}\n\n.fc-time-grid-event.fc-short .fc-time:after {\n\tcontent: "\\000A0-\\000A0"; /* seperate with a dash, wrapped in nbsp\'s */\n}\n\n.fc-time-grid-event.fc-short .fc-title {\n\tfont-size: .85em; /* make the title text the same size as the time */\n\tpadding: 0; /* undo padding from above */\n}\n\n/* resizer */\n\n.fc-time-grid-event .fc-resizer {\n\tposition: absolute;\n\tz-index: 3; /* above content */\n\tleft: 0;\n\tright: 0;\n\tbottom: 0;\n\theight: 8px;\n\toverflow: hidden;\n\tline-height: 8px;\n\tfont-size: 11px;\n\tfont-family: monospace;\n\ttext-align: center;\n\tcursor: s-resize;\n}\n\n.fc-time-grid-event .fc-resizer:after {\n\tcontent: "=";\n}\n\n\n\n\n\n\n\n/* modify css */\n\n.fc-state-default {\n    background-color: #ffffff;\n    background-image: none;\n    background-repeat: repeat-x;\n    box-shadow: none;\n    color: inherit;\n    text-shadow: none\n}\n\n.fc-state-default {\n    border: 1px solid\n}\n\n.fc-button {\n    color: inherit;\n    border: 1px solid #e4e5e7;\n    cursor: pointer;\n    display: inline-block;\n    height: 1.9em;\n    line-height: 1.9em;\n    overflow: hidden;\n    padding: 0 0.6em;\n    position: relative;\n    white-space: nowrap\n}\n\n.fc-state-active {\n    background-color: #34495e;\n    border-color: #34495e;\n    color: #ffffff\n}\n\n.fc-header-title h2 {\n    font-size: 16px;\n    font-weight: 600;\n    color: inherit\n}\n\n.fc-content .fc-widget-header, .fc-content .fc-widget-content {\n    border-color: #e4e5e7;\n    font-weight: normal\n}\n\n.fc-border-separate tbody {\n    background-color: #F8F8F8\n}\n\n.fc-state-highlight {\n    background: none repeat scroll 0 0 #edf0f5\n}\n\n.fc button{\n\theight: 2.5em;\n}\n.fc-toolbar{\n\tmargin-top: 1em;\n}\n.fc-widget-header .fc-day-header span{\n\tfont-size: 13px;\n    text-transform: uppercase;\n}\n.fc-view, .fc-view > table{\n\twidth: 100%;\n}\n.fc-row .fc-bg table{\n\twidth: 100%;\n}\n.fc-row.fc-rigid .fc-content-skeleton table{\n\twidth:100%;\n}\n.fc .fc-row table{\n\twidth:100%;\n}\n.fc-widget-header .fc-day-header {\n    padding: 12px 0\n}\n\n.fc-ltr .fc-basic-view .fc-day-number {\n    text-align: center\n}\n.fc-content-skeleton .fc-day-top{\n\ttext-align: center;\n\tfont-size: 13px;\n\ttext-transform: uppercase;\n\tpadding: 6px;\n}\n.fc-content-skeleton .fc-event-container .fc-event{\n\tbackground: #3498db;\n\tpadding: 5px 10px;\n    font-size: 12px;\n    line-height: 1.5;\n    border-radius: 3px;\n    border-color: #3498db;\n    color:#ffffff;\n}\n.fc-day-grid-event{\n\tmargin: 2px 6px 0;\n}\n\n',
            }}
          />
          <form className="mt-3">
            <div className="panel-body">
              <div className="span9">
                <div id="calendar" className="fc fc-unthemed fc-ltr">
                  <div className="fc-toolbar fc-header-toolbar">
                    <div className="fc-left">
                      <div className="fc-button-group">
                        <button
                          type="button"
                          className="fc-prev-button fc-button fc-state-default fc-corner-left"
                        >
                          <span className="fc-icon fc-icon-left-single-arrow" />
                        </button>
                        <button
                          type="button"
                          className="fc-next-button fc-button fc-state-default fc-corner-right"
                        >
                          <span className="fc-icon fc-icon-right-single-arrow" />
                        </button>
                      </div>
                      <button
                        type="button"
                        className="fc-today-button fc-button fc-state-default fc-corner-left fc-corner-right"
                      >
                        today
                      </button>
                    </div>
                    <div className="fc-right">
                      <div className="fc-button-group">
                        <button
                          type="button"
                          className="fc-month-button fc-button fc-state-default fc-corner-left fc-state-active"
                        >
                          month
                        </button>
                        <button
                          type="button"
                          className="fc-agendaWeek-button fc-button fc-state-default"
                        >
                          week
                        </button>
                        <button
                          type="button"
                          className="fc-agendaDay-button fc-button fc-state-default"
                        >
                          day
                        </button>
                        <button
                          type="button"
                          className="fc-listWeek-button fc-button fc-state-default fc-corner-right"
                        >
                          list
                        </button>
                      </div>
                    </div>
                    <div className="fc-center">
                      <h2>September 2019</h2>
                    </div>
                    <div className="fc-clear" />
                  </div>
                  <div className="fc-view-container" style={{}}>
                    <div
                      className="fc-view fc-month-view fc-basic-view"
                      style={{}}
                    >
                      <table className>
                        <thead className="fc-head">
                          <tr>
                            <td className="fc-head-container fc-widget-header">
                              <div className="fc-row fc-widget-header">
                                <table className>
                                  <thead>
                                    <tr>
                                      <th className="fc-day-header fc-widget-header fc-sun">
                                        <span>Sun</span>
                                      </th>
                                      <th className="fc-day-header fc-widget-header fc-mon">
                                        <span>Mon</span>
                                      </th>
                                      <th className="fc-day-header fc-widget-header fc-tue">
                                        <span>Tue</span>
                                      </th>
                                      <th className="fc-day-header fc-widget-header fc-wed">
                                        <span>Wed</span>
                                      </th>
                                      <th className="fc-day-header fc-widget-header fc-thu">
                                        <span>Thu</span>
                                      </th>
                                      <th className="fc-day-header fc-widget-header fc-fri">
                                        <span>Fri</span>
                                      </th>
                                      <th className="fc-day-header fc-widget-header fc-sat">
                                        <span>Sat</span>
                                      </th>
                                    </tr>
                                  </thead>
                                </table>
                              </div>
                            </td>
                          </tr>
                        </thead>
                        <tbody className="fc-body">
                          <tr>
                            <td className="fc-widget-content">
                              <div
                                className="fc-scroller fc-day-grid-container"
                                style={{ overflow: "hidden", height: "1022px" }}
                              >
                                <div className="fc-day-grid fc-unselectable">
                                  <div
                                    className="fc-row fc-week fc-widget-content fc-rigid"
                                    style={{ height: "170px" }}
                                  >
                                    <div className="fc-bg">
                                      <table className>
                                        <tbody className="bg-white">
                                          <tr>
                                            <td
                                              className="fc-day fc-widget-content fc-sun fc-past"
                                              data-date="2019-09-01"
                                            />
                                            <td
                                              className="fc-day fc-widget-content fc-mon fc-past"
                                              data-date="2019-09-02"
                                            />
                                            <td
                                              className="fc-day fc-widget-content fc-tue fc-past"
                                              data-date="2019-09-03"
                                            />
                                            <td
                                              className="fc-day fc-widget-content fc-wed fc-past"
                                              data-date="2019-09-04"
                                            />
                                            <td
                                              className="fc-day fc-widget-content fc-thu fc-past"
                                              data-date="2019-09-05"
                                            />
                                            <td
                                              className="fc-day fc-widget-content fc-fri fc-past"
                                              data-date="2019-09-06"
                                            />
                                            <td
                                              className="fc-day fc-widget-content fc-sat fc-past"
                                              data-date="2019-09-07"
                                            />
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                    <div className="fc-content-skeleton">
                                      <table>
                                        <thead>
                                          <tr>
                                            <td
                                              className="fc-day-top fc-sun fc-past"
                                              data-date="2019-09-01"
                                            >
                                              <Link
                                                className="fc-day-number"
                                                data-goto='{"date":"2019-09-01","type":"day"}'
                                              >
                                                1
                                              </Link>
                                            </td>
                                            <td
                                              className="fc-day-top fc-mon fc-past"
                                              data-date="2019-09-02"
                                            >
                                              <Link
                                                className="fc-day-number"
                                                data-goto='{"date":"2019-09-02","type":"day"}'
                                              >
                                                2
                                              </Link>
                                            </td>
                                            <td
                                              className="fc-day-top fc-tue fc-past"
                                              data-date="2019-09-03"
                                            >
                                              <Link
                                                className="fc-day-number"
                                                data-goto='{"date":"2019-09-03","type":"day"}'
                                              >
                                                3
                                              </Link>
                                            </td>
                                            <td
                                              className="fc-day-top fc-wed fc-past"
                                              data-date="2019-09-04"
                                            >
                                              <Link
                                                className="fc-day-number"
                                                data-goto='{"date":"2019-09-04","type":"day"}'
                                              >
                                                4
                                              </Link>
                                            </td>
                                            <td
                                              className="fc-day-top fc-thu fc-past"
                                              data-date="2019-09-05"
                                            >
                                              <Link
                                                className="fc-day-number"
                                                data-goto='{"date":"2019-09-05","type":"day"}'
                                              >
                                                5
                                              </Link>
                                            </td>
                                            <td
                                              className="fc-day-top fc-fri fc-past"
                                              data-date="2019-09-06"
                                            >
                                              <Link
                                                className="fc-day-number"
                                                data-goto='{"date":"2019-09-06","type":"day"}'
                                              >
                                                6
                                              </Link>
                                            </td>
                                            <td
                                              className="fc-day-top fc-sat fc-past"
                                              data-date="2019-09-07"
                                            >
                                              <Link
                                                className="fc-day-number"
                                                data-goto='{"date":"2019-09-07","type":"day"}'
                                              >
                                                7
                                              </Link>
                                            </td>
                                          </tr>
                                        </thead>
                                        <tbody className="bg-white">
                                          <tr>
                                            <td />
                                            <td />
                                            <td />
                                            <td />
                                            <td />
                                            <td />
                                            <td />
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                  <div
                                    className="fc-row fc-week fc-widget-content fc-rigid"
                                    style={{ height: "170px" }}
                                  >
                                    <div className="fc-bg">
                                      <table className>
                                        <tbody className="bg-white">
                                          <tr>
                                            <td
                                              className="fc-day fc-widget-content fc-sun fc-past"
                                              data-date="2019-09-08"
                                            />
                                            <td
                                              className="fc-day fc-widget-content fc-mon fc-past"
                                              data-date="2019-09-09"
                                            />
                                            <td
                                              className="fc-day fc-widget-content fc-tue fc-past"
                                              data-date="2019-09-10"
                                            />
                                            <td
                                              className="fc-day fc-widget-content fc-wed fc-past"
                                              data-date="2019-09-11"
                                            />
                                            <td
                                              className="fc-day fc-widget-content fc-thu fc-past"
                                              data-date="2019-09-12"
                                            />
                                            <td
                                              className="fc-day fc-widget-content fc-fri fc-past"
                                              data-date="2019-09-13"
                                            />
                                            <td
                                              className="fc-day fc-widget-content fc-sat fc-past"
                                              data-date="2019-09-14"
                                            />
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                    <div className="fc-content-skeleton">
                                      <table>
                                        <thead>
                                          <tr>
                                            <td
                                              className="fc-day-top fc-sun fc-past"
                                              data-date="2019-09-08"
                                            >
                                              <Link
                                                className="fc-day-number"
                                                data-goto='{"date":"2019-09-08","type":"day"}'
                                              >
                                                8
                                              </Link>
                                            </td>
                                            <td
                                              className="fc-day-top fc-mon fc-past"
                                              data-date="2019-09-09"
                                            >
                                              <Link
                                                className="fc-day-number"
                                                data-goto='{"date":"2019-09-09","type":"day"}'
                                              >
                                                9
                                              </Link>
                                            </td>
                                            <td
                                              className="fc-day-top fc-tue fc-past"
                                              data-date="2019-09-10"
                                            >
                                              <Link
                                                className="fc-day-number"
                                                data-goto='{"date":"2019-09-10","type":"day"}'
                                              >
                                                10
                                              </Link>
                                            </td>
                                            <td
                                              className="fc-day-top fc-wed fc-past"
                                              data-date="2019-09-11"
                                            >
                                              <Link
                                                className="fc-day-number"
                                                data-goto='{"date":"2019-09-11","type":"day"}'
                                              >
                                                11
                                              </Link>
                                            </td>
                                            <td
                                              className="fc-day-top fc-thu fc-past"
                                              data-date="2019-09-12"
                                            >
                                              <Link
                                                className="fc-day-number"
                                                data-goto='{"date":"2019-09-12","type":"day"}'
                                              >
                                                12
                                              </Link>
                                            </td>
                                            <td
                                              className="fc-day-top fc-fri fc-past"
                                              data-date="2019-09-13"
                                            >
                                              <Link
                                                className="fc-day-number"
                                                data-goto='{"date":"2019-09-13","type":"day"}'
                                              >
                                                13
                                              </Link>
                                            </td>
                                            <td
                                              className="fc-day-top fc-sat fc-past"
                                              data-date="2019-09-14"
                                            >
                                              <Link
                                                className="fc-day-number"
                                                data-goto='{"date":"2019-09-14","type":"day"}'
                                              >
                                                14
                                              </Link>
                                            </td>
                                          </tr>
                                        </thead>
                                        <tbody className="bg-white">
                                          <tr>
                                            <td rowSpan={2} />
                                            <td rowSpan={2} />
                                            <td rowSpan={2} />
                                            <td rowSpan={2} />
                                            <td className="fc-event-container">
                                              <Link className="fc-day-grid-event fc-h-event fc-event fc-start fc-end">
                                                <div className="fc-content">
                                                  {" "}
                                                  <span className="fc-title">
                                                    RP WD- 1 Hrs WE-0 Hrs
                                                  </span>
                                                </div>
                                              </Link>
                                            </td>
                                            <td className="fc-event-container">
                                              <Link className="fc-day-grid-event fc-h-event fc-event fc-start fc-end">
                                                <div className="fc-content">
                                                  {" "}
                                                  <span className="fc-title">
                                                    RP WD- 1 Hrs WE-0 Hrs
                                                  </span>
                                                </div>
                                              </Link>
                                            </td>
                                            <td className="fc-event-container">
                                              <Link className="fc-day-grid-event fc-h-event fc-event fc-start fc-end">
                                                <div className="fc-content">
                                                  {" "}
                                                  <span className="fc-title">
                                                    RP WD- 1 Hrs WE-0 Hrs
                                                  </span>
                                                </div>
                                              </Link>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="fc-event-container">
                                              <Link className="fc-day-grid-event fc-h-event fc-event fc-start fc-end">
                                                <div className="fc-content">
                                                  <span className="fc-time">
                                                    12a - 12a
                                                  </span>{" "}
                                                  <span className="fc-title">
                                                    Total Inventory- 1
                                                  </span>
                                                </div>
                                              </Link>
                                            </td>
                                            <td className="fc-event-container">
                                              <Link className="fc-day-grid-event fc-h-event fc-event fc-start fc-end">
                                                <div className="fc-content">
                                                  <span className="fc-time">
                                                    12a - 12a
                                                  </span>{" "}
                                                  <span className="fc-title">
                                                    Total Inventory- 1
                                                  </span>
                                                </div>
                                              </Link>
                                            </td>
                                            <td className="fc-event-container">
                                              <Link className="fc-day-grid-event fc-h-event fc-event fc-start fc-end">
                                                <div className="fc-content">
                                                  <span className="fc-time">
                                                    12a - 12a
                                                  </span>{" "}
                                                  <span className="fc-title">
                                                    Total Inventory- 1
                                                  </span>
                                                </div>
                                              </Link>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                  <div
                                    className="fc-row fc-week fc-widget-content fc-rigid"
                                    style={{ height: "170px" }}
                                  >
                                    <div className="fc-bg">
                                      <table className>
                                        <tbody className="bg-white">
                                          <tr>
                                            <td
                                              className="fc-day fc-widget-content fc-sun fc-past"
                                              data-date="2019-09-15"
                                            />
                                            <td
                                              className="fc-day fc-widget-content fc-mon fc-past"
                                              data-date="2019-09-16"
                                            />
                                            <td
                                              className="fc-day fc-widget-content fc-tue fc-past"
                                              data-date="2019-09-17"
                                            />
                                            <td
                                              className="fc-day fc-widget-content fc-wed fc-past"
                                              data-date="2019-09-18"
                                            />
                                            <td
                                              className="fc-day fc-widget-content fc-thu fc-past"
                                              data-date="2019-09-19"
                                            />
                                            <td
                                              className="fc-day fc-widget-content fc-fri fc-past"
                                              data-date="2019-09-20"
                                            />
                                            <td
                                              className="fc-day fc-widget-content fc-sat fc-past"
                                              data-date="2019-09-21"
                                            />
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                    <div className="fc-content-skeleton">
                                      <table>
                                        <thead>
                                          <tr>
                                            <td
                                              className="fc-day-top fc-sun fc-past"
                                              data-date="2019-09-15"
                                            >
                                              <Link
                                                className="fc-day-number"
                                                data-goto='{"date":"2019-09-15","type":"day"}'
                                              >
                                                15
                                              </Link>
                                            </td>
                                            <td
                                              className="fc-day-top fc-mon fc-past"
                                              data-date="2019-09-16"
                                            >
                                              <Link
                                                className="fc-day-number"
                                                data-goto='{"date":"2019-09-16","type":"day"}'
                                              >
                                                16
                                              </Link>
                                            </td>
                                            <td
                                              className="fc-day-top fc-tue fc-past"
                                              data-date="2019-09-17"
                                            >
                                              <Link
                                                className="fc-day-number"
                                                data-goto='{"date":"2019-09-17","type":"day"}'
                                              >
                                                17
                                              </Link>
                                            </td>
                                            <td
                                              className="fc-day-top fc-wed fc-past"
                                              data-date="2019-09-18"
                                            >
                                              <Link
                                                className="fc-day-number"
                                                data-goto='{"date":"2019-09-18","type":"day"}'
                                              >
                                                18
                                              </Link>
                                            </td>
                                            <td
                                              className="fc-day-top fc-thu fc-past"
                                              data-date="2019-09-19"
                                            >
                                              <Link
                                                className="fc-day-number"
                                                data-goto='{"date":"2019-09-19","type":"day"}'
                                              >
                                                19
                                              </Link>
                                            </td>
                                            <td
                                              className="fc-day-top fc-fri fc-past"
                                              data-date="2019-09-20"
                                            >
                                              <Link
                                                className="fc-day-number"
                                                data-goto='{"date":"2019-09-20","type":"day"}'
                                              >
                                                20
                                              </Link>
                                            </td>
                                            <td
                                              className="fc-day-top fc-sat fc-past"
                                              data-date="2019-09-21"
                                            >
                                              <Link
                                                className="fc-day-number"
                                                data-goto='{"date":"2019-09-21","type":"day"}'
                                              >
                                                21
                                              </Link>
                                            </td>
                                          </tr>
                                        </thead>
                                        <tbody className="bg-white">
                                          <tr>
                                            <td className="fc-event-container">
                                              <Link className="fc-day-grid-event fc-h-event fc-event fc-start fc-end">
                                                <div className="fc-content">
                                                  {" "}
                                                  <span className="fc-title">
                                                    RP WD- 1 Hrs WE-0 Hrs
                                                  </span>
                                                </div>
                                              </Link>
                                            </td>
                                            <td className="fc-event-container">
                                              <Link className="fc-day-grid-event fc-h-event fc-event fc-start fc-end">
                                                <div className="fc-content">
                                                  {" "}
                                                  <span className="fc-title">
                                                    RP WD- 1 Hrs WE-0 Hrs
                                                  </span>
                                                </div>
                                              </Link>
                                            </td>
                                            <td className="fc-event-container">
                                              <Link className="fc-day-grid-event fc-h-event fc-event fc-start fc-end">
                                                <div className="fc-content">
                                                  {" "}
                                                  <span className="fc-title">
                                                    RP WD- 1 Hrs WE-0 Hrs
                                                  </span>
                                                </div>
                                              </Link>
                                            </td>
                                            <td className="fc-event-container">
                                              <Link className="fc-day-grid-event fc-h-event fc-event fc-start fc-end">
                                                <div className="fc-content">
                                                  {" "}
                                                  <span className="fc-title">
                                                    RP WD- 1 Hrs WE-0 Hrs
                                                  </span>
                                                </div>
                                              </Link>
                                            </td>
                                            <td className="fc-event-container">
                                              <Link className="fc-day-grid-event fc-h-event fc-event fc-start fc-end">
                                                <div className="fc-content">
                                                  {" "}
                                                  <span className="fc-title">
                                                    RP WD- 1 Hrs WE-0 Hrs
                                                  </span>
                                                </div>
                                              </Link>
                                            </td>
                                            <td className="fc-event-container">
                                              <Link className="fc-day-grid-event fc-h-event fc-event fc-start fc-end">
                                                <div className="fc-content">
                                                  {" "}
                                                  <span className="fc-title">
                                                    RP WD- 1 Hrs WE-0 Hrs
                                                  </span>
                                                </div>
                                              </Link>
                                            </td>
                                            <td className="fc-event-container">
                                              <Link className="fc-day-grid-event fc-h-event fc-event fc-start fc-end">
                                                <div className="fc-content">
                                                  {" "}
                                                  <span className="fc-title">
                                                    RP WD- 1 Hrs WE-0 Hrs
                                                  </span>
                                                </div>
                                              </Link>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="fc-event-container">
                                              <Link className="fc-day-grid-event fc-h-event fc-event fc-start fc-end">
                                                <div className="fc-content">
                                                  <span className="fc-time">
                                                    12a - 12a
                                                  </span>{" "}
                                                  <span className="fc-title">
                                                    Total Inventory- 1
                                                  </span>
                                                </div>
                                              </Link>
                                            </td>
                                            <td className="fc-event-container">
                                              <Link className="fc-day-grid-event fc-h-event fc-event fc-start fc-end">
                                                <div className="fc-content">
                                                  <span className="fc-time">
                                                    12a - 12a
                                                  </span>{" "}
                                                  <span className="fc-title">
                                                    Total Inventory- 1
                                                  </span>
                                                </div>
                                              </Link>
                                            </td>
                                            <td className="fc-event-container">
                                              <Link className="fc-day-grid-event fc-h-event fc-event fc-start fc-end">
                                                <div className="fc-content">
                                                  <span className="fc-time">
                                                    12a - 12a
                                                  </span>{" "}
                                                  <span className="fc-title">
                                                    Total Inventory- 1
                                                  </span>
                                                </div>
                                              </Link>
                                            </td>
                                            <td className="fc-event-container">
                                              <Link className="fc-day-grid-event fc-h-event fc-event fc-start fc-end">
                                                <div className="fc-content">
                                                  <span className="fc-time">
                                                    12a - 12a
                                                  </span>{" "}
                                                  <span className="fc-title">
                                                    Total Inventory- 1
                                                  </span>
                                                </div>
                                              </Link>
                                            </td>
                                            <td className="fc-event-container">
                                              <Link className="fc-day-grid-event fc-h-event fc-event fc-start fc-end">
                                                <div className="fc-content">
                                                  <span className="fc-time">
                                                    12a - 12a
                                                  </span>{" "}
                                                  <span className="fc-title">
                                                    Total Inventory- 1
                                                  </span>
                                                </div>
                                              </Link>
                                            </td>
                                            <td className="fc-event-container">
                                              <Link className="fc-day-grid-event fc-h-event fc-event fc-start fc-end">
                                                <div className="fc-content">
                                                  <span className="fc-time">
                                                    12a - 12a
                                                  </span>{" "}
                                                  <span className="fc-title">
                                                    Total Inventory- 1
                                                  </span>
                                                </div>
                                              </Link>
                                            </td>
                                            <td className="fc-event-container">
                                              <Link className="fc-day-grid-event fc-h-event fc-event fc-start fc-end">
                                                <div className="fc-content">
                                                  <span className="fc-time">
                                                    12a - 12a
                                                  </span>{" "}
                                                  <span className="fc-title">
                                                    Total Inventory- 1
                                                  </span>
                                                </div>
                                              </Link>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                  <div
                                    className="fc-row fc-week fc-widget-content fc-rigid"
                                    style={{ height: "170px" }}
                                  >
                                    <div className="fc-bg">
                                      <table className>
                                        <tbody className="bg-white">
                                          <tr>
                                            <td
                                              className="fc-day fc-widget-content fc-sun fc-past"
                                              data-date="2019-09-22"
                                            />
                                            <td
                                              className="fc-day fc-widget-content fc-mon fc-past"
                                              data-date="2019-09-23"
                                            />
                                            <td
                                              className="fc-day fc-widget-content fc-tue fc-past"
                                              data-date="2019-09-24"
                                            />
                                            <td
                                              className="fc-day fc-widget-content fc-wed fc-past"
                                              data-date="2019-09-25"
                                            />
                                            <td
                                              className="fc-day fc-widget-content fc-thu fc-past"
                                              data-date="2019-09-26"
                                            />
                                            <td
                                              className="fc-day fc-widget-content fc-fri fc-past"
                                              data-date="2019-09-27"
                                            />
                                            <td
                                              className="fc-day fc-widget-content fc-sat fc-past"
                                              data-date="2019-09-28"
                                            />
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                    <div className="fc-content-skeleton">
                                      <table>
                                        <thead>
                                          <tr>
                                            <td
                                              className="fc-day-top fc-sun fc-past"
                                              data-date="2019-09-22"
                                            >
                                              <Link
                                                className="fc-day-number"
                                                data-goto='{"date":"2019-09-22","type":"day"}'
                                              >
                                                22
                                              </Link>
                                            </td>
                                            <td
                                              className="fc-day-top fc-mon fc-past"
                                              data-date="2019-09-23"
                                            >
                                              <Link
                                                className="fc-day-number"
                                                data-goto='{"date":"2019-09-23","type":"day"}'
                                              >
                                                23
                                              </Link>
                                            </td>
                                            <td
                                              className="fc-day-top fc-tue fc-past"
                                              data-date="2019-09-24"
                                            >
                                              <Link
                                                className="fc-day-number"
                                                data-goto='{"date":"2019-09-24","type":"day"}'
                                              >
                                                24
                                              </Link>
                                            </td>
                                            <td
                                              className="fc-day-top fc-wed fc-past"
                                              data-date="2019-09-25"
                                            >
                                              <Link
                                                className="fc-day-number"
                                                data-goto='{"date":"2019-09-25","type":"day"}'
                                              >
                                                25
                                              </Link>
                                            </td>
                                            <td
                                              className="fc-day-top fc-thu fc-past"
                                              data-date="2019-09-26"
                                            >
                                              <Link
                                                className="fc-day-number"
                                                data-goto='{"date":"2019-09-26","type":"day"}'
                                              >
                                                26
                                              </Link>
                                            </td>
                                            <td
                                              className="fc-day-top fc-fri fc-past"
                                              data-date="2019-09-27"
                                            >
                                              <Link
                                                className="fc-day-number"
                                                data-goto='{"date":"2019-09-27","type":"day"}'
                                              >
                                                27
                                              </Link>
                                            </td>
                                            <td
                                              className="fc-day-top fc-sat fc-past"
                                              data-date="2019-09-28"
                                            >
                                              <Link
                                                className="fc-day-number"
                                                data-goto='{"date":"2019-09-28","type":"day"}'
                                              >
                                                28
                                              </Link>
                                            </td>
                                          </tr>
                                        </thead>
                                        <tbody className="bg-white">
                                          <tr>
                                            <td className="fc-event-container">
                                              <Link className="fc-day-grid-event fc-h-event fc-event fc-start fc-end">
                                                <div className="fc-content">
                                                  {" "}
                                                  <span className="fc-title">
                                                    RP WD- 1 Hrs WE-0 Hrs
                                                  </span>
                                                </div>
                                              </Link>
                                            </td>
                                            <td className="fc-event-container">
                                              <Link className="fc-day-grid-event fc-h-event fc-event fc-start fc-end">
                                                <div className="fc-content">
                                                  {" "}
                                                  <span className="fc-title">
                                                    RP WD- 1 Hrs WE-0 Hrs
                                                  </span>
                                                </div>
                                              </Link>
                                            </td>
                                            <td className="fc-event-container">
                                              <Link className="fc-day-grid-event fc-h-event fc-event fc-start fc-end">
                                                <div className="fc-content">
                                                  {" "}
                                                  <span className="fc-title">
                                                    RP WD- 1 Hrs WE-0 Hrs
                                                  </span>
                                                </div>
                                              </Link>
                                            </td>
                                            <td className="fc-event-container">
                                              <Link className="fc-day-grid-event fc-h-event fc-event fc-start fc-end">
                                                <div className="fc-content">
                                                  {" "}
                                                  <span className="fc-title">
                                                    RP WD- 1 Hrs WE-0 Hrs
                                                  </span>
                                                </div>
                                              </Link>
                                            </td>
                                            <td className="fc-event-container">
                                              <Link className="fc-day-grid-event fc-h-event fc-event fc-start fc-end">
                                                <div className="fc-content">
                                                  {" "}
                                                  <span className="fc-title">
                                                    RP WD- 1 Hrs WE-0 Hrs
                                                  </span>
                                                </div>
                                              </Link>
                                            </td>
                                            <td className="fc-event-container">
                                              <Link className="fc-day-grid-event fc-h-event fc-event fc-start fc-end">
                                                <div className="fc-content">
                                                  {" "}
                                                  <span className="fc-title">
                                                    RP WD- 1 Hrs WE-0 Hrs
                                                  </span>
                                                </div>
                                              </Link>
                                            </td>
                                            <td className="fc-event-container">
                                              <Link className="fc-day-grid-event fc-h-event fc-event fc-start fc-end">
                                                <div className="fc-content">
                                                  {" "}
                                                  <span className="fc-title">
                                                    RP WD- 1 Hrs WE-0 Hrs
                                                  </span>
                                                </div>
                                              </Link>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="fc-event-container">
                                              <Link className="fc-day-grid-event fc-h-event fc-event fc-start fc-end">
                                                <div className="fc-content">
                                                  <span className="fc-time">
                                                    12a - 12a
                                                  </span>{" "}
                                                  <span className="fc-title">
                                                    Total Inventory- 1
                                                  </span>
                                                </div>
                                              </Link>
                                            </td>
                                            <td className="fc-event-container">
                                              <Link className="fc-day-grid-event fc-h-event fc-event fc-start fc-end">
                                                <div className="fc-content">
                                                  <span className="fc-time">
                                                    12a - 12a
                                                  </span>{" "}
                                                  <span className="fc-title">
                                                    Total Inventory- 1
                                                  </span>
                                                </div>
                                              </Link>
                                            </td>
                                            <td className="fc-event-container">
                                              <Link className="fc-day-grid-event fc-h-event fc-event fc-start fc-end">
                                                <div className="fc-content">
                                                  <span className="fc-time">
                                                    12a - 12a
                                                  </span>{" "}
                                                  <span className="fc-title">
                                                    Total Inventory- 1
                                                  </span>
                                                </div>
                                              </Link>
                                            </td>
                                            <td className="fc-event-container">
                                              <Link className="fc-day-grid-event fc-h-event fc-event fc-start fc-end">
                                                <div className="fc-content">
                                                  <span className="fc-time">
                                                    12a - 12a
                                                  </span>{" "}
                                                  <span className="fc-title">
                                                    Total Inventory- 1
                                                  </span>
                                                </div>
                                              </Link>
                                            </td>
                                            <td className="fc-event-container">
                                              <Link className="fc-day-grid-event fc-h-event fc-event fc-start fc-end">
                                                <div className="fc-content">
                                                  <span className="fc-time">
                                                    12a - 12a
                                                  </span>{" "}
                                                  <span className="fc-title">
                                                    Total Inventory- 1
                                                  </span>
                                                </div>
                                              </Link>
                                            </td>
                                            <td className="fc-event-container">
                                              <Link className="fc-day-grid-event fc-h-event fc-event fc-start fc-end">
                                                <div className="fc-content">
                                                  <span className="fc-time">
                                                    12a - 12a
                                                  </span>{" "}
                                                  <span className="fc-title">
                                                    Total Inventory- 1
                                                  </span>
                                                </div>
                                              </Link>
                                            </td>
                                            <td className="fc-event-container">
                                              <Link className="fc-day-grid-event fc-h-event fc-event fc-start fc-end">
                                                <div className="fc-content">
                                                  <span className="fc-time">
                                                    12a - 12a
                                                  </span>{" "}
                                                  <span className="fc-title">
                                                    Total Inventory- 1
                                                  </span>
                                                </div>
                                              </Link>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                  <div
                                    className="fc-row fc-week fc-widget-content fc-rigid"
                                    style={{ height: "170px" }}
                                  >
                                    <div className="fc-bg">
                                      <table className>
                                        <tbody className="bg-white">
                                          <tr>
                                            <td
                                              className="fc-day fc-widget-content fc-sun fc-past"
                                              data-date="2019-09-29"
                                            />
                                            <td
                                              className="fc-day fc-widget-content fc-mon fc-past"
                                              data-date="2019-09-30"
                                            />
                                            <td
                                              className="fc-day fc-widget-content fc-tue fc-other-month fc-past"
                                              data-date="2019-10-01"
                                            />
                                            <td
                                              className="fc-day fc-widget-content fc-wed fc-other-month fc-past"
                                              data-date="2019-10-02"
                                            />
                                            <td
                                              className="fc-day fc-widget-content fc-thu fc-other-month fc-past"
                                              data-date="2019-10-03"
                                            />
                                            <td
                                              className="fc-day fc-widget-content fc-fri fc-other-month fc-past"
                                              data-date="2019-10-04"
                                            />
                                            <td
                                              className="fc-day fc-widget-content fc-sat fc-other-month fc-past"
                                              data-date="2019-10-05"
                                            />
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                    <div className="fc-content-skeleton">
                                      <table>
                                        <thead>
                                          <tr>
                                            <td
                                              className="fc-day-top fc-sun fc-past"
                                              data-date="2019-09-29"
                                            >
                                              <Link
                                                className="fc-day-number"
                                                data-goto='{"date":"2019-09-29","type":"day"}'
                                              >
                                                29
                                              </Link>
                                            </td>
                                            <td
                                              className="fc-day-top fc-mon fc-past"
                                              data-date="2019-09-30"
                                            >
                                              <Link
                                                className="fc-day-number"
                                                data-goto='{"date":"2019-09-30","type":"day"}'
                                              >
                                                30
                                              </Link>
                                            </td>
                                            <td
                                              className="fc-day-top fc-tue fc-other-month fc-past"
                                              data-date="2019-10-01"
                                            >
                                              <Link
                                                className="fc-day-number"
                                                data-goto='{"date":"2019-10-01","type":"day"}'
                                              >
                                                1
                                              </Link>
                                            </td>
                                            <td
                                              className="fc-day-top fc-wed fc-other-month fc-past"
                                              data-date="2019-10-02"
                                            >
                                              <Link
                                                className="fc-day-number"
                                                data-goto='{"date":"2019-10-02","type":"day"}'
                                              >
                                                2
                                              </Link>
                                            </td>
                                            <td
                                              className="fc-day-top fc-thu fc-other-month fc-past"
                                              data-date="2019-10-03"
                                            >
                                              <Link
                                                className="fc-day-number"
                                                data-goto='{"date":"2019-10-03","type":"day"}'
                                              >
                                                3
                                              </Link>
                                            </td>
                                            <td
                                              className="fc-day-top fc-fri fc-other-month fc-past"
                                              data-date="2019-10-04"
                                            >
                                              <Link
                                                className="fc-day-number"
                                                data-goto='{"date":"2019-10-04","type":"day"}'
                                              >
                                                4
                                              </Link>
                                            </td>
                                            <td
                                              className="fc-day-top fc-sat fc-other-month fc-past"
                                              data-date="2019-10-05"
                                            >
                                              <Link
                                                className="fc-day-number"
                                                data-goto='{"date":"2019-10-05","type":"day"}'
                                              >
                                                5
                                              </Link>
                                            </td>
                                          </tr>
                                        </thead>
                                        <tbody className="bg-white">
                                          <tr>
                                            <td className="fc-event-container">
                                              <Link className="fc-day-grid-event fc-h-event fc-event fc-start fc-end">
                                                <div className="fc-content">
                                                  {" "}
                                                  <span className="fc-title">
                                                    RP WD- 1 Hrs WE-0 Hrs
                                                  </span>
                                                </div>
                                              </Link>
                                            </td>
                                            <td className="fc-event-container">
                                              <Link className="fc-day-grid-event fc-h-event fc-event fc-start fc-end">
                                                <div className="fc-content">
                                                  {" "}
                                                  <span className="fc-title">
                                                    RP WD- 1 Hrs WE-0 Hrs
                                                  </span>
                                                </div>
                                              </Link>
                                            </td>
                                            <td className="fc-event-container">
                                              <Link className="fc-day-grid-event fc-h-event fc-event fc-start fc-end">
                                                <div className="fc-content">
                                                  {" "}
                                                  <span className="fc-title">
                                                    RP WD- 1 Hrs WE-0 Hrs
                                                  </span>
                                                </div>
                                              </Link>
                                            </td>
                                            <td className="fc-event-container">
                                              <Link className="fc-day-grid-event fc-h-event fc-event fc-start fc-end">
                                                <div className="fc-content">
                                                  {" "}
                                                  <span className="fc-title">
                                                    RP WD- 1 Hrs WE-0 Hrs
                                                  </span>
                                                </div>
                                              </Link>
                                            </td>
                                            <td className="fc-event-container">
                                              <Link className="fc-day-grid-event fc-h-event fc-event fc-start fc-end">
                                                <div className="fc-content">
                                                  {" "}
                                                  <span className="fc-title">
                                                    RP WD- 1 Hrs WE-0 Hrs
                                                  </span>
                                                </div>
                                              </Link>
                                            </td>
                                            <td className="fc-event-container">
                                              <Link className="fc-day-grid-event fc-h-event fc-event fc-start fc-end">
                                                <div className="fc-content">
                                                  {" "}
                                                  <span className="fc-title">
                                                    RP WD- 1 Hrs WE-0 Hrs
                                                  </span>
                                                </div>
                                              </Link>
                                            </td>
                                            <td className="fc-event-container">
                                              <Link className="fc-day-grid-event fc-h-event fc-event fc-start fc-end">
                                                <div className="fc-content">
                                                  {" "}
                                                  <span className="fc-title">
                                                    RP WD- 1 Hrs WE-0 Hrs
                                                  </span>
                                                </div>
                                              </Link>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="fc-event-container">
                                              <Link className="fc-day-grid-event fc-h-event fc-event fc-start fc-end">
                                                <div className="fc-content">
                                                  <span className="fc-time">
                                                    12a - 12a
                                                  </span>{" "}
                                                  <span className="fc-title">
                                                    Total Inventory- 1
                                                  </span>
                                                </div>
                                              </Link>
                                            </td>
                                            <td className="fc-event-container">
                                              <Link className="fc-day-grid-event fc-h-event fc-event fc-start fc-end">
                                                <div className="fc-content">
                                                  <span className="fc-time">
                                                    12a - 12a
                                                  </span>{" "}
                                                  <span className="fc-title">
                                                    Total Inventory- 1
                                                  </span>
                                                </div>
                                              </Link>
                                            </td>
                                            <td className="fc-event-container">
                                              <Link className="fc-day-grid-event fc-h-event fc-event fc-start fc-end">
                                                <div className="fc-content">
                                                  <span className="fc-time">
                                                    12a - 12a
                                                  </span>{" "}
                                                  <span className="fc-title">
                                                    Total Inventory- 1
                                                  </span>
                                                </div>
                                              </Link>
                                            </td>
                                            <td className="fc-event-container">
                                              <Link className="fc-day-grid-event fc-h-event fc-event fc-start fc-end">
                                                <div className="fc-content">
                                                  <span className="fc-time">
                                                    12a - 12a
                                                  </span>{" "}
                                                  <span className="fc-title">
                                                    Total Inventory- 1
                                                  </span>
                                                </div>
                                              </Link>
                                            </td>
                                            <td className="fc-event-container">
                                              <Link className="fc-day-grid-event fc-h-event fc-event fc-start fc-end">
                                                <div className="fc-content">
                                                  <span className="fc-time">
                                                    12a - 12a
                                                  </span>{" "}
                                                  <span className="fc-title">
                                                    Total Inventory- 1
                                                  </span>
                                                </div>
                                              </Link>
                                            </td>
                                            <td className="fc-event-container">
                                              <Link className="fc-day-grid-event fc-h-event fc-event fc-start fc-end">
                                                <div className="fc-content">
                                                  <span className="fc-time">
                                                    12a - 12a
                                                  </span>{" "}
                                                  <span className="fc-title">
                                                    Total Inventory- 1
                                                  </span>
                                                </div>
                                              </Link>
                                            </td>
                                            <td className="fc-event-container">
                                              <Link className="fc-day-grid-event fc-h-event fc-event fc-start fc-end">
                                                <div className="fc-content">
                                                  <span className="fc-time">
                                                    12a - 12a
                                                  </span>{" "}
                                                  <span className="fc-title">
                                                    Total Inventory- 1
                                                  </span>
                                                </div>
                                              </Link>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                  <div
                                    className="fc-row fc-week fc-widget-content fc-rigid"
                                    style={{ height: "172px" }}
                                  >
                                    <div className="fc-bg">
                                      <table className>
                                        <tbody className="bg-white">
                                          <tr>
                                            <td
                                              className="fc-day fc-widget-content fc-sun fc-other-month fc-past"
                                              data-date="2019-10-06"
                                            />
                                            <td
                                              className="fc-day fc-widget-content fc-mon fc-other-month fc-past"
                                              data-date="2019-10-07"
                                            />
                                            <td
                                              className="fc-day fc-widget-content fc-tue fc-other-month fc-past"
                                              data-date="2019-10-08"
                                            />
                                            <td
                                              className="fc-day fc-widget-content fc-wed fc-other-month fc-past"
                                              data-date="2019-10-09"
                                            />
                                            <td
                                              className="fc-day fc-widget-content fc-thu fc-other-month fc-past"
                                              data-date="2019-10-10"
                                            />
                                            <td
                                              className="fc-day fc-widget-content fc-fri fc-other-month fc-past"
                                              data-date="2019-10-11"
                                            />
                                            <td
                                              className="fc-day fc-widget-content fc-sat fc-other-month fc-past"
                                              data-date="2019-10-12"
                                            />
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                    <div className="fc-content-skeleton">
                                      <table>
                                        <thead>
                                          <tr>
                                            <td
                                              className="fc-day-top fc-sun fc-other-month fc-past"
                                              data-date="2019-10-06"
                                            >
                                              <Link
                                                className="fc-day-number"
                                                data-goto='{"date":"2019-10-06","type":"day"}'
                                              >
                                                6
                                              </Link>
                                            </td>
                                            <td
                                              className="fc-day-top fc-mon fc-other-month fc-past"
                                              data-date="2019-10-07"
                                            >
                                              <Link
                                                className="fc-day-number"
                                                data-goto='{"date":"2019-10-07","type":"day"}'
                                              >
                                                7
                                              </Link>
                                            </td>
                                            <td
                                              className="fc-day-top fc-tue fc-other-month fc-past"
                                              data-date="2019-10-08"
                                            >
                                              <Link
                                                className="fc-day-number"
                                                data-goto='{"date":"2019-10-08","type":"day"}'
                                              >
                                                8
                                              </Link>
                                            </td>
                                            <td
                                              className="fc-day-top fc-wed fc-other-month fc-past"
                                              data-date="2019-10-09"
                                            >
                                              <Link
                                                className="fc-day-number"
                                                data-goto='{"date":"2019-10-09","type":"day"}'
                                              >
                                                9
                                              </Link>
                                            </td>
                                            <td
                                              className="fc-day-top fc-thu fc-other-month fc-past"
                                              data-date="2019-10-10"
                                            >
                                              <Link
                                                className="fc-day-number"
                                                data-goto='{"date":"2019-10-10","type":"day"}'
                                              >
                                                10
                                              </Link>
                                            </td>
                                            <td
                                              className="fc-day-top fc-fri fc-other-month fc-past"
                                              data-date="2019-10-11"
                                            >
                                              <Link
                                                className="fc-day-number"
                                                data-goto='{"date":"2019-10-11","type":"day"}'
                                              >
                                                11
                                              </Link>
                                            </td>
                                            <td
                                              className="fc-day-top fc-sat fc-other-month fc-past"
                                              data-date="2019-10-12"
                                            >
                                              <Link
                                                className="fc-day-number"
                                                data-goto='{"date":"2019-10-12","type":"day"}'
                                              >
                                                12
                                              </Link>
                                            </td>
                                          </tr>
                                        </thead>
                                        <tbody className="bg-white">
                                          <tr>
                                            <td className="fc-event-container">
                                              <Link className="fc-day-grid-event fc-h-event fc-event fc-start fc-end">
                                                <div className="fc-content">
                                                  {" "}
                                                  <span className="fc-title">
                                                    RP WD- 1 Hrs WE-0 Hrs
                                                  </span>
                                                </div>
                                              </Link>
                                            </td>
                                            <td className="fc-event-container">
                                              <Link className="fc-day-grid-event fc-h-event fc-event fc-start fc-end">
                                                <div className="fc-content">
                                                  {" "}
                                                  <span className="fc-title">
                                                    RP WD- 1 Hrs WE-0 Hrs
                                                  </span>
                                                </div>
                                              </Link>
                                            </td>
                                            <td className="fc-event-container">
                                              <Link className="fc-day-grid-event fc-h-event fc-event fc-start fc-end">
                                                <div className="fc-content">
                                                  {" "}
                                                  <span className="fc-title">
                                                    RP WD- 1 Hrs WE-0 Hrs
                                                  </span>
                                                </div>
                                              </Link>
                                            </td>
                                            <td className="fc-event-container">
                                              <Link className="fc-day-grid-event fc-h-event fc-event fc-start fc-end">
                                                <div className="fc-content">
                                                  {" "}
                                                  <span className="fc-title">
                                                    RP WD- 1 Hrs WE-0 Hrs
                                                  </span>
                                                </div>
                                              </Link>
                                            </td>
                                            <td className="fc-event-container">
                                              <Link className="fc-day-grid-event fc-h-event fc-event fc-start fc-end">
                                                <div className="fc-content">
                                                  {" "}
                                                  <span className="fc-title">
                                                    RP WD- 1 Hrs WE-0 Hrs
                                                  </span>
                                                </div>
                                              </Link>
                                            </td>
                                            <td className="fc-event-container">
                                              <Link className="fc-day-grid-event fc-h-event fc-event fc-start fc-end">
                                                <div className="fc-content">
                                                  {" "}
                                                  <span className="fc-title">
                                                    RP WD- 1 Hrs WE-0 Hrs
                                                  </span>
                                                </div>
                                              </Link>
                                            </td>
                                            <td className="fc-event-container">
                                              <Link className="fc-day-grid-event fc-h-event fc-event fc-start fc-end">
                                                <div className="fc-content">
                                                  {" "}
                                                  <span className="fc-title">
                                                    RP WD- 1 Hrs WE-0 Hrs
                                                  </span>
                                                </div>
                                              </Link>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="fc-event-container">
                                              <Link className="fc-day-grid-event fc-h-event fc-event fc-start fc-end">
                                                <div className="fc-content">
                                                  <span className="fc-time">
                                                    12a - 12a
                                                  </span>{" "}
                                                  <span className="fc-title">
                                                    Total Inventory- 1
                                                  </span>
                                                </div>
                                              </Link>
                                            </td>
                                            <td className="fc-event-container">
                                              <Link className="fc-day-grid-event fc-h-event fc-event fc-start fc-end">
                                                <div className="fc-content">
                                                  <span className="fc-time">
                                                    12a - 12a
                                                  </span>{" "}
                                                  <span className="fc-title">
                                                    Total Inventory- 1
                                                  </span>
                                                </div>
                                              </Link>
                                            </td>
                                            <td className="fc-event-container">
                                              <Link className="fc-day-grid-event fc-h-event fc-event fc-start fc-end">
                                                <div className="fc-content">
                                                  <span className="fc-time">
                                                    12a - 12a
                                                  </span>{" "}
                                                  <span className="fc-title">
                                                    Total Inventory- 1
                                                  </span>
                                                </div>
                                              </Link>
                                            </td>
                                            <td className="fc-event-container">
                                              <Link className="fc-day-grid-event fc-h-event fc-event fc-start fc-end">
                                                <div className="fc-content">
                                                  <span className="fc-time">
                                                    12a - 12a
                                                  </span>{" "}
                                                  <span className="fc-title">
                                                    Total Inventory- 1
                                                  </span>
                                                </div>
                                              </Link>
                                            </td>
                                            <td className="fc-event-container">
                                              <Link className="fc-day-grid-event fc-h-event fc-event fc-start fc-end">
                                                <div className="fc-content">
                                                  <span className="fc-time">
                                                    12a - 12a
                                                  </span>{" "}
                                                  <span className="fc-title">
                                                    Total Inventory- 1
                                                  </span>
                                                </div>
                                              </Link>
                                            </td>
                                            <td className="fc-event-container">
                                              <Link className="fc-day-grid-event fc-h-event fc-event fc-start fc-end">
                                                <div className="fc-content">
                                                  <span className="fc-time">
                                                    12a - 12a
                                                  </span>{" "}
                                                  <span className="fc-title">
                                                    Total Inventory- 1
                                                  </span>
                                                </div>
                                              </Link>
                                            </td>
                                            <td className="fc-event-container">
                                              <Link className="fc-day-grid-event fc-h-event fc-event fc-start fc-end">
                                                <div className="fc-content">
                                                  <span className="fc-time">
                                                    12a - 12a
                                                  </span>{" "}
                                                  <span className="fc-title">
                                                    Total Inventory- 1
                                                  </span>
                                                </div>
                                              </Link>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
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
          </form>
        </div>
      </div>
    </>
  );
};
export default MastersVehiclesInventoryEdit;
