import Flatpickr from "react-flatpickr";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header2 from "../header2/header2";
import MultiSelect from "../reactMultiSelect";
import { citiesByCountry, countries } from "../../constants/Country-City-Data";

const selectedServiceOptions = [
  { label: "All", value: "all" },
  { label: "Hotel", value: "hotel" },
  { label: "Activity", value: "sightseeing" },
  { label: "Transfer", value: "transfer" },
];

const maxResultsOptions = [
  { value: 50, label: "50" },
  { value: 100, label: "100" },
  { value: 150, label: "150" },
  { value: 200, label: "200" },
  { value: 250, label: "250" },
  { value: 300, label: "300" },
  { value: 350, label: "350" },
  { value: 400, label: "400" },
  { value: 450, label: "450" },
  { value: 500, label: "500" },
  { value: 550, label: "550" },
  { value: 600, label: "600" },
  { value: 650, label: "650" },
  { value: 700, label: "700" },
  { value: 750, label: "750" },
  { value: 800, label: "800" },
  { value: 850, label: "850" },
  { value: 900, label: "900" },
  { value: 950, label: "950" },
  { value: 1000, label: "1000" },
  { value: 1050, label: "1050" },
  { value: 1100, label: "1100" },
  { value: 1150, label: "1150" },
  { value: 1200, label: "1200" },
  { value: 1250, label: "1250" },
  { value: 1300, label: "1300" },
  { value: 1350, label: "1350" },
  { value: 1400, label: "1400" },
  { value: 1450, label: "1450" },
  { value: 1500, label: "1500" },
];

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

const statusOptions = [
  { label: "Confirmed", value: "confirmed" },
  { label: "Vouchered", value: "vouchered" },
  { label: "Cancelled", value: "cancelled" },
];

// In your React component, you can use the options array like

const agentOptions = [
  { label: "1 Booking [CD0203-hcnida] [Ahmed-Khan]", value: 203 },
  {
    label: "1 Booking WL (Do Not Edit) [CD0312-1bookingwhagent] [Ahmed-Khan]",
    value: 312,
  },
  { label: "abc [CD0237-VisaSub] [saya-patil]", value: 237 },
  { label: "ABM [CD0235-newsub] [sayali-Patil]", value: 235 },
  { label: "ABM [CD0239-Subqtech] [Sayali-Patil]", value: 239 },
  { label: "BookItNow [CD0318-BookItNow] [Godrey-Pereira]", value: 318 },
  { label: "ELiago [CD0280-Eliago_ws] [Bhargavi-Test]", value: 280 },
  { label: "GoGoa [CA0298-GoGoa] [Goa-Travel]", value: 298 },
  { label: "GRN Connect [CD0314-grnconnect] [Bhargavi-Testa]", value: 314 },
  { label: "Hexion [CD0304-Hexion_ws] [Bhargavi-Testa]", value: 304 },
  { label: "hhgh [CD0268-brach_test] [ghgh-ghgh]", value: 268 },
  { label: "JAISON JAMES [CA0308-jaisonqtech] [Jaison-James]", value: 308 },
  { label: "JV [CA0305-JV_test] [JV-test]", value: 305 },
  { label: "LMN [CD0123-PQR] [Minal-PQR]", value: 123 },
  { label: "Lots of Hotels [CD0046-asmiyu] [asmita-qtech]", value: 46 },
  { label: "minal@123 [CD0116-sub agent] [abc-xyz]", value: 116 },
  { label: "moavia_eilago [CD0313-m.moavia] [Mohammad-Moavia]", value: 313 },
  { label: "My Hotels [CD0272-myhotels_ws] [Joy-Beck]", value: 272 },
  { label: "online Supplier [CA0175-online_supp] [Testt-Demo]", value: 175 },
  { label: "Qtech [CA0017-allwinace] [Allwin-Pillai]", value: 17 },
  { label: "qtech [CD0045-asmiee] [asmita-qtech]", value: 45 },
  { label: "Qtech [CA0310-odyssey_ws] [Bhargavi-Testa]", value: 310 },
  { label: "Qtech [CD0113-allwin_1122] [Allwin-Pillai]", value: 113 },
  { label: "Qtech Jaison [CD0238-Qtechnew] [Jaison-James]", value: 238 },
  { label: "Qtech Software [CD0315-QStdo_ws] [Bhargavi-Pise]", value: 315 },
  { label: "Qtech Software PVT [CD0316-wego_ws] [Bhargavi-Pise]", value: 316 },
  { label: "Qtech@1234 [CD0309-agentsub] [sub-agentqtech]", value: 309 },
  { label: "Qtechhhhhh [CA0299-Qtechhhhhh] [Qtechhhhhh-Testt]", value: 299 },
  { label: "qtecj [CD0217-sayali] [Test-Qtech]", value: 217 },
  { label: "rohan white label [CD0211-rohan_wl] [white-label]", value: 211 },
  { label: "Rohit Travels [CA0317-rohitmhtm] [Rohit-Sapkota]", value: 317 },
  { label: "sdfdf [CD0214-sub2] [fgfg-dgffgf]", value: 214 },
  { label: "sqtech [CD0291-sqtech] [Sujay-Test]", value: 291 },
  { label: "Sub Company [CD0037-subagentt2] [Sub-Agent]", value: 37 },
  { label: "suhaspatil [CA0013-suhas1] [suhas-patil]", value: 13 },
  { label: "Sujayq [CA0290-Sujayq] [Sujay-q]", value: 290 },
  { label: "Sujay_JV [CD0294-TEST_JV_] [Sujay-Raut]", value: 294 },
  { label: "TDO [CD0307-akbar] [Bhargavi-Testa]", value: 307 },
  {
    label: "tdo webservice test [CD0311-tdo_ws_test] [Tdo-Webservice]",
    value: 311,
  },
  { label: "trtrt [CA0269-cash_agent_branch] [trtt-fgfgf]", value: 269 },
  { label: "Vartak &Vartak Tours [CA0285-vartakk] [Ron-Vartak]", value: 285 },
  { label: "Vartak Holidazzle [CD0195-rohan] [rohan-vartak]", value: 195 },
  { label: "Welcome@123 [CD0090-allwin_sub25] [Allwin-Pillai]", value: 90 },
];

const supplierTypeOptions = [
  { value: 0, label: " - Select -" },
  { value: "online", label: "ONLINE" },
  { value: "offline", label: "OFFLINE" },
];

const salesManagerOptions = [
  { value: 0, label: " - Select -" },
  // Add more options here if needed
];

const ReportsManagementBusinessByAgent = () => {
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

  const [showBookingDate, setShowBookingDate] = useState(false);

  const toggleBookingDate = () => {
    setShowBookingDate(!showBookingDate);
  };

  const [showServiceDate, setShowserviceDate] = useState(false);

  const toggleServiceDate = () => {
    setShowserviceDate(!showServiceDate);
  };

  const [showVoucherDate, setVoucherDate] = useState(false);

  const toggleVoucherDate = () => {
    setVoucherDate(!showVoucherDate);
  };

  const [isFormVisible, setFormVisibility] = useState(false);

  const toggleFormVisibility = () => {
    setFormVisibility(!isFormVisible);
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
      <Header2 title="AGENT WISE BUSINESS REPORT" />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <form>
          <div className="panel-body">
            <div className="row">
              <div className="form-group col-md-3">
                <label htmlFor="exampleInputEmail1">Services</label>
                <MultiSelect
                  options={selectedServiceOptions}
                  isSearchable
                  placeholder="- All -"
                  className="custom-select"
                  noOptionsMessage={() => "No Services Found"}
                />
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="exampleInputEmail1">Results per page</label>
                <MultiSelect
                  options={maxResultsOptions}
                  isSearchable
                  placeholder=" 50 "
                  className="custom-select"
                  noOptionsMessage={() => "No Results Found"}
                />
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="exampleInputEmail1">Branches</label>
                <MultiSelect
                  options={branchOptions}
                  isSearchable
                  placeholder=" All Branches "
                  className="custom-select"
                  noOptionsMessage={() => "No Branch Found"}
                />
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="exampleInputEmail1">Agent</label>
                <MultiSelect
                  options={agentOptions}
                  isSearchable
                  placeholder=" Select Agent "
                  className="custom-select"
                  noOptionsMessage={() => "No Agent Found"}
                />
              </div>

              {/* Added by brynal start */}
              <div className="form-group col-md-3">
                <label htmlFor="exampleInputEmail1">Status</label>
                <MultiSelect
                  options={statusOptions}
                  isSearchable
                  placeholder=" Status "
                  className="custom-select"
                  noOptionsMessage={() => "No Status Found"}
                />
              </div>
              {/* Added by brynal end */}
              <div className="form-group col-md-3 mt-2">
                <label>Country </label>
                <MultiSelect
                  options={countries}
                  isSearchable
                  placeholder="- Select Country -"
                  className="custom-select"
                  onChange={handleCountryChange}
                  noOptionsMessage={() => "No Country Found"}
                />
              </div>
              <div className="form-group col-md-3 mt-2">
                <label>City</label>
                <MultiSelect
                  //  options={Array.isArray(branchData.branchCity) ? branchData.branchCity : []}
                  options={citiesByCountry[branchData.branchCountry] || []}
                  isSearchable
                  placeholder="- Select City -"
                  className="custom-select"
                  onChange={handleCityChange}
                  noOptionsMessage={() => "No City Found"}
                />
              </div>
              <div className="form-group col-md-3 mt-2">
                <label>Supplier Type</label>
                <MultiSelect
                  options={supplierTypeOptions}
                  isSearchable
                  placeholder=" - Select - "
                  className="custom-select"
                  noOptionsMessage={() => "No Supplier Found"}
                />
              </div>
              <div className="form-group col-md-3 mt-2">
                <label>Sales Manager</label>
                <MultiSelect
                  options={salesManagerOptions}
                  isSearchable
                  placeholder=" - Select - "
                  className="custom-select"
                  noOptionsMessage={() => "No Manager Found"}
                />
              </div>
            </div>

            <div className="row mt-2">
              <div className="form-group col-md-3">
                <div
                  className="checkbox checkbox-success"
                  style={{ display: "inline-block" }}
                >
                  <input
                    type="checkbox"
                    defaultValue={1}
                    name="chk_booking_date"
                    id="chk_booking_date"
                    onChange={toggleBookingDate}
                  />
                  <label htmlFor="chk_booking_date"> Booking Date</label>
                </div>
                &nbsp;&nbsp;
                <div
                  name="booking_date"
                  id="booking_date"
                  style={{ display: showBookingDate ? "block" : "none" }}
                >
                  <div
                    className="input-daterange input-group date"
                    id="datetimepicker1"
                  >
                    <Flatpickr
                      value={startDate}
                      onChange={(date) => setStartDate(date)}
                      options={{ dateFormat: "Y-m-d" }}
                      style={{ width: "131px" }}
                    />

                    <span class="input-group-addon">to</span>
                    <Flatpickr
                      value={endDate}
                      onChange={(date) => setEndDate(date)}
                      options={{ dateFormat: "Y-m-d" }}
                      style={{ width: "131px" }}
                    />
                    <span
                      className="input-group-addon"
                      onClick={handleTrashClick}
                    >
                      <i className="fa fa-trash" />
                    </span>
                  </div>
                </div>
              </div>
              <div className="form-group col-md-3">
                <div
                  className="checkbox checkbox-success"
                  style={{ display: "inline-block" }}
                >
                  <input
                    type="checkbox"
                    defaultValue={1}
                    name="chk_service_date"
                    id="chk_service_date"
                    onChange={toggleServiceDate}
                  />
                  <label htmlFor="chk_service_date">Service Date</label>
                </div>
                &nbsp;&nbsp;
                <div
                  name="service_date"
                  id="service_date"
                  style={{ display: showServiceDate ? "block" : "none" }}
                >
                  <div
                    className="input-daterange input-group date"
                    id="datetimepicker2"
                  >
                    <Flatpickr
                      value={startDate1}
                      onChange={(date) => setStartDate1(date)}
                      options={{ dateFormat: "Y-m-d" }}
                      style={{ width: "131px" }}
                    />

                    <span class="input-group-addon">to</span>
                    <Flatpickr
                      value={endDate1}
                      onChange={(date) => setEndDate1(date)}
                      options={{ dateFormat: "Y-m-d" }}
                      style={{ width: "131px" }}
                    />
                    <span
                      className="input-group-addon"
                      onClick={handleTrashClick1}
                    >
                      <i className="fa fa-trash" />
                    </span>
                  </div>
                </div>
              </div>
              <div className="form-group col-md-3">
                <div
                  className="checkbox checkbox-success"
                  style={{ display: "inline-block" }}
                >
                  <input
                    type="checkbox"
                    defaultValue={1}
                    id="chk_check_out_date"
                    name="chk_check_out_date"
                    onChange={toggleVoucherDate}
                  />
                  <label htmlFor="check_out">Voucher Date</label>
                </div>
                <div
                  name="check_out_date"
                  id="check_out_date"
                  style={{ display: showVoucherDate ? "block" : "none" }}
                >
                  <div
                    className="input-daterange input-group date"
                    id="datetimepicker3"
                  >
                    <Flatpickr
                      value={startDate2}
                      onChange={(date) => setStartDate2(date)}
                      options={{ dateFormat: "Y-m-d" }}
                      style={{ width: "131px" }}
                    />

                    <span class="input-group-addon">to</span>
                    <Flatpickr
                      value={endDate2}
                      onChange={(date) => setEndDate2(date)}
                      options={{ dateFormat: "Y-m-d" }}
                      style={{ width: "131px" }}
                    />
                    <span
                      className="input-group-addon"
                      onClick={handleTrashClick2}
                    >
                      <i className="fa fa-trash" />
                    </span>
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="form-group col-md-12">
                  <div className="col-md-2 ">
                    <button
                      type="button"
                      name="sbt1"
                      className="btn btn-dark btn-sm"
                      value="View Report"
                      onClick={toggleFormVisibility}
                    >
                      <i className="fa fa-eye" />
                      &nbsp;&nbsp;View Report
                    </button>
                  </div>
                  <div id="mesID" style={{ display: "none" }} />
                </div>
              </div>
            </div>
          </div>
        </form>

        <br />

        <form
          id="hideornot"
          style={{ display: isFormVisible ? "block" : "none" }}
        >
          <div className="panel-body removeMargins">
            <div className="dataTables_scroll">
              <div className="row">
                <div className="col-md-12">
                  <div
                    valign="top"
                    onclick="callAjaxSubmit(2,'');"
                    title="Click to download XL sheet "
                    className="btn btn-dark btn-sm form-group"
                    style={{ marginBottom: "-42px" }}
                  >
                    <i className="fa fa-download" />
                    &nbsp;Download Excel
                  </div>
                </div>
              </div>
              <div
                id="search_transfer_wrapper"
                className="dataTables_wrapper form-inline dt-bootstrap no-footer"
              >
                <div className="row">
                  <div className="col-sm-10" />
                  <div className="col-sm-2">
                    <div
                      id="search_transfer_filter"
                      className="dataTables_filter"
                    >
                      {" "}
                      <label>
                        <h5 style={{ display: "inline" }}>
                          <i
                            className="fa fa-search srchWithinPg"
                            id="magnifier"
                            data-toggle="tooltip"
                            data-placement="top"
                            data-original-title="Search within this table"
                          />
                        </h5>
                        <input
                          type="search"
                          className="form-control input-sm"
                          placeholder
                          aria-controls="search_creadit_note"
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <div
                      className="doubleScroll-scroll-wrapper"
                      id="wrapper1"
                      style={{
                        height: "20px",
                        overflow: "scroll hidden",
                        width: "1320px",
                      }}
                    >
                      <div
                        className="suwala-doubleScroll-scroll"
                        style={{ height: "20px", width: "1320px" }}
                      />
                    </div>
                    <div id="wrapper2" style={{ overflow: "auto" }}>
                      <table
                        id="search_transfer"
                        className="table table-bordered   table-responsive alignTbl dataTable no-footer"
                        role="grid"
                        aria-describedby="search_transfer_info"
                      >
                        <thead>
                          <tr role="row">
                            <th
                              className="sorting"
                              tabIndex={0}
                              aria-controls="search_transfer"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Agent
                  
                      
                  
                  
                      
                  
              : activate to sort column ascending"
                              style={{ width: "613.2px" }}
                            >
                              Agent
                              <Link>
                                <img
                                  src="images/up_arrow.gif"
                                  alt=""
                                  border={0}
                                  height={5}
                                  width={9}
                                />
                              </Link>
                              <Link>
                                <img
                                  src="images/down_arrow.gif"
                                  alt=""
                                  border={0}
                                  height={5}
                                  width={9}
                                />
                              </Link>
                            </th>
                            <th
                              className="sorting"
                              tabIndex={0}
                              aria-controls="search_transfer"
                              rowSpan={1}
                              colSpan={1}
                              aria-label=" Agent Code
                  
                      
                  
                  
                      
                  
              : activate to sort column ascending"
                              style={{ width: "79.2px" }}
                            >
                              {" "}
                              Agent Code
                              <Link>
                                <img
                                  src="images/up_arrow.gif"
                                  alt=""
                                  border={0}
                                  height={5}
                                  width={9}
                                />
                              </Link>
                              <Link>
                                <img
                                  src="images/down_arrow.gif"
                                  alt=""
                                  border={0}
                                  height={5}
                                  width={9}
                                />
                              </Link>
                            </th>
                            <th
                              className="sorting"
                              tabIndex={0}
                              aria-controls="search_transfer"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Consultant Name
                  
                      
                  
                  
                      
                  
              : activate to sort column ascending"
                              style={{ width: "119.2px" }}
                            >
                              Consultant Name
                              <Link>
                                <img
                                  src="images/up_arrow.gif"
                                  alt=""
                                  border={0}
                                  height={5}
                                  width={9}
                                />
                              </Link>
                              <Link>
                                <img
                                  src="images/down_arrow.gif"
                                  alt=""
                                  border={0}
                                  height={5}
                                  width={9}
                                />
                              </Link>
                            </th>
                            <th
                              className="numAlign sorting"
                              tabIndex={0}
                              aria-controls="search_transfer"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Gross Sales
                  
                  
                  
                      
                  
              : activate to sort column ascending"
                              style={{ width: "86.2px" }}
                            >
                              Gross Sales
                              <Link>
                                <img
                                  src="images/up_arrow.gif"
                                  alt=""
                                  border={0}
                                  height={5}
                                  width={9}
                                />
                              </Link>
                              <Link>
                                <img
                                  src="images/down_arrow.gif"
                                  alt=""
                                  border={0}
                                  height={5}
                                  width={9}
                                />
                              </Link>
                            </th>
                            <th
                              className="no-sort sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Agent Currency"
                              style={{ width: "110.2px" }}
                            >
                              Agent Currency
                            </th>
                            <th
                              className="numAlign sorting"
                              tabIndex={0}
                              aria-controls="search_transfer"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Gross Sales in 
                                                      USD
                                                      
                      
                  
                  
                      
                  
              : activate to sort column ascending"
                              style={{ width: "129.2px" }}
                            >
                              Gross Sales in USD
                              <Link>
                                <img
                                  src="images/up_arrow.gif"
                                  alt=""
                                  border={0}
                                  height={5}
                                  width={9}
                                />
                              </Link>
                              <Link>
                                <img
                                  src="images/down_arrow.gif"
                                  alt=""
                                  border={0}
                                  height={5}
                                  width={9}
                                />
                              </Link>
                            </th>
                            <th
                              className="numAlign sorting"
                              tabIndex={0}
                              aria-controls="search_transfer"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Bookings
                  
                      
                  
                  
                      
                  
              : activate to sort column ascending"
                              style={{ width: "66.2px" }}
                            >
                              Bookings
                              <Link>
                                <img
                                  src="images/up_arrow.gif"
                                  alt=""
                                  border={0}
                                  height={5}
                                  width={9}
                                />
                              </Link>
                              <Link>
                                <img
                                  src="images/down_arrow.gif"
                                  alt=""
                                  border={0}
                                  height={5}
                                  width={9}
                                />
                              </Link>
                            </th>
                            <th
                              className="numAlign sorting"
                              tabIndex={0}
                              aria-controls="search_transfer"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Master Bookings 
                  
                  
              : activate to sort column ascending"
                              style={{ width: "119px" }}
                            >
                              Master Bookings
                              <Link>
                                <img
                                  src="images/up_arrow.gif"
                                  alt=""
                                  border={0}
                                  height={5}
                                  width={9}
                                />
                              </Link>
                              <Link>
                                <img
                                  src="images/down_arrow.gif"
                                  alt=""
                                  border={0}
                                  height={5}
                                  width={9}
                                />
                              </Link>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          <tr className="odd" role="row">
                            <td align="center">Nik travels ( NIk dev )</td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td className="numAlign" align="center">
                              20243062.10
                            </td>
                            <td align="center">SAR</td>
                            <td className="numAlign" align="center">
                              20014597.724
                            </td>
                            <td className="numAlign" align="center">
                              10
                            </td>
                            <td className="numAlign" align="center" />
                          </tr>
                          <tr className="even" role="row">
                            <td align="center">fgfg ( aaaa fgfg )</td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td className="numAlign" align="center">
                              316874.34
                            </td>
                            <td align="center">BHD</td>
                            <td className="numAlign" align="center">
                              3168743.440
                            </td>
                            <td className="numAlign" align="center">
                              305
                            </td>
                            <td className="numAlign" align="center" />
                          </tr>
                          <tr className="odd" role="row">
                            <td align="center">sayali ( Sayali Patil )</td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td className="numAlign" align="center">
                              257941.97
                            </td>
                            <td align="center">BHD</td>
                            <td className="numAlign" align="center">
                              2579419.690
                            </td>
                            <td className="numAlign" align="center">
                              196
                            </td>
                            <td className="numAlign" align="center" />
                          </tr>
                          <tr className="even" role="row">
                            <td align="center">sayali ( s p )</td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td className="numAlign" align="center">
                              11023986.13
                            </td>
                            <td align="center">INR</td>
                            <td className="numAlign" align="center">
                              714370.444
                            </td>
                            <td className="numAlign" align="center">
                              8726
                            </td>
                            <td className="numAlign" align="center" />
                          </tr>
                          <tr className="odd" role="row">
                            <td align="center">swingi ( prafull shirke )</td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td className="numAlign" align="center">
                              664600.66
                            </td>
                            <td align="center">SAR</td>
                            <td className="numAlign" align="center">
                              664600.660
                            </td>
                            <td className="numAlign" align="center">
                              382
                            </td>
                            <td className="numAlign" align="center" />
                          </tr>
                          <tr className="even" role="row">
                            <td align="center">Nida ( Snehal Testt )</td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td className="numAlign" align="center">
                              10402490.57
                            </td>
                            <td align="center">INR</td>
                            <td className="numAlign" align="center">
                              609369.717
                            </td>
                            <td className="numAlign" align="center">
                              8146
                            </td>
                            <td className="numAlign" align="center" />
                          </tr>
                          <tr className="odd" role="row">
                            <td align="center">
                              Vartak Holidazzle ( rohan vartak )
                            </td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td className="numAlign" align="center">
                              3493240.24
                            </td>
                            <td align="center">INR</td>
                            <td className="numAlign" align="center">
                              146758.900
                            </td>
                            <td className="numAlign" align="center">
                              290
                            </td>
                            <td className="numAlign" align="center" />
                          </tr>
                          <tr className="even" role="row">
                            <td align="center">Nida ( Nida Ansari )</td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td className="numAlign" align="center">
                              30188.04
                            </td>
                            <td align="center">BHD</td>
                            <td className="numAlign" align="center">
                              111043.942
                            </td>
                            <td className="numAlign" align="center">
                              42
                            </td>
                            <td className="numAlign" align="center" />
                          </tr>
                          <tr className="odd" role="row">
                            <td align="center">qtech ( prafull shirke )</td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td className="numAlign" align="center">
                              108499.92
                            </td>
                            <td align="center">SAR</td>
                            <td className="numAlign" align="center">
                              108499.921
                            </td>
                            <td className="numAlign" align="center">
                              99
                            </td>
                            <td className="numAlign" align="center" />
                          </tr>
                          <tr className="even" role="row">
                            <td align="center">qtech ( prafull shirke )</td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td className="numAlign" align="center">
                              100730.75
                            </td>
                            <td align="center">SAR</td>
                            <td className="numAlign" align="center">
                              100730.755
                            </td>
                            <td className="numAlign" align="center">
                              92
                            </td>
                            <td className="numAlign" align="center" />
                          </tr>
                          <tr className="odd" role="row">
                            <td align="center">ELiago ( Bhargavi Test )</td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td className="numAlign" align="center">
                              1491458.66
                            </td>
                            <td align="center">INR</td>
                            <td className="numAlign" align="center">
                              93395.028
                            </td>
                            <td className="numAlign" align="center">
                              284
                            </td>
                            <td className="numAlign" align="center" />
                          </tr>
                          <tr className="even" role="row">
                            <td align="center">sayali ( Sayali Patil )</td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td className="numAlign" align="center">
                              2124977.69
                            </td>
                            <td align="center">INR</td>
                            <td className="numAlign" align="center">
                              86495.951
                            </td>
                            <td className="numAlign" align="center">
                              217
                            </td>
                            <td className="numAlign" align="center" />
                          </tr>
                          <tr className="odd" role="row">
                            <td align="center">
                              Qtech Software PVT ( Bhargavi Pise )
                            </td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td className="numAlign" align="center">
                              85244.55
                            </td>
                            <td align="center">SAR</td>
                            <td className="numAlign" align="center">
                              85244.550
                            </td>
                            <td className="numAlign" align="center">
                              41
                            </td>
                            <td className="numAlign" align="center" />
                          </tr>
                          <tr className="even" role="row">
                            <td align="center">qtech ( asmita kapadi )</td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td className="numAlign" align="center">
                              1234205.03
                            </td>
                            <td align="center">SAR</td>
                            <td className="numAlign" align="center">
                              77576.697
                            </td>
                            <td className="numAlign" align="center">
                              179
                            </td>
                            <td className="numAlign" align="center" />
                          </tr>
                          <tr className="odd" role="row">
                            <td align="center"> ( )</td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td className="numAlign" align="center">
                              853135.68
                            </td>
                            <td align="center">SAR</td>
                            <td className="numAlign" align="center">
                              75065.336
                            </td>
                            <td className="numAlign" align="center">
                              355
                            </td>
                            <td className="numAlign" align="center" />
                          </tr>
                          <tr className="even" role="row">
                            <td align="center">Neeraj ( Neeraj Yadav )</td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td className="numAlign" align="center">
                              513500.86
                            </td>
                            <td align="center">INR</td>
                            <td className="numAlign" align="center">
                              71363.705
                            </td>
                            <td className="numAlign" align="center">
                              138
                            </td>
                            <td className="numAlign" align="center" />
                          </tr>
                          <tr className="odd" role="row">
                            <td align="center">Qtech ( Allwin Pillai )</td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td className="numAlign" align="center">
                              18465.65
                            </td>
                            <td align="center">USD</td>
                            <td className="numAlign" align="center">
                              70631.127
                            </td>
                            <td className="numAlign" align="center">
                              191
                            </td>
                            <td className="numAlign" align="center" />
                          </tr>
                          <tr className="even" role="row">
                            <td align="center">Sayali ( Sayali Patil )</td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td className="numAlign" align="center">
                              65852.46
                            </td>
                            <td align="center">USD</td>
                            <td className="numAlign" align="center">
                              64913.566
                            </td>
                            <td className="numAlign" align="center">
                              269
                            </td>
                            <td className="numAlign" align="center" />
                          </tr>
                          <tr className="odd" role="row">
                            <td align="center">sayaagent ( Sayali Patil )</td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td className="numAlign" align="center">
                              13084.97
                            </td>
                            <td align="center">USD</td>
                            <td className="numAlign" align="center">
                              48312.373
                            </td>
                            <td className="numAlign" align="center">
                              58
                            </td>
                            <td className="numAlign" align="center" />
                          </tr>
                          <tr className="even" role="row">
                            <td align="center">svstravels ( vaibhavd test )</td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td className="numAlign" align="center">
                              35939.51
                            </td>
                            <td align="center">SAR</td>
                            <td className="numAlign" align="center">
                              35939.510
                            </td>
                            <td className="numAlign" align="center">
                              29
                            </td>
                            <td className="numAlign" align="center" />
                          </tr>
                          <tr className="odd" role="row">
                            <td align="center">Qtech ( Allwin Pillai )</td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td className="numAlign" align="center">
                              8803.64
                            </td>
                            <td align="center">USD</td>
                            <td className="numAlign" align="center">
                              33581.612
                            </td>
                            <td className="numAlign" align="center">
                              54
                            </td>
                            <td className="numAlign" align="center" />
                          </tr>
                          <tr className="even" role="row">
                            <td align="center">Fly TDO ( Fly TDO )</td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td className="numAlign" align="center">
                              548653.47
                            </td>
                            <td align="center">INR</td>
                            <td className="numAlign" align="center">
                              30262.112
                            </td>
                            <td className="numAlign" align="center">
                              25
                            </td>
                            <td className="numAlign" align="center" />
                          </tr>
                          <tr className="odd" role="row">
                            <td align="center">
                              GLOBAL TRAVEL SOLUTION ( Bhargavi Pise )
                            </td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td className="numAlign" align="center">
                              26971.30
                            </td>
                            <td align="center">SAR</td>
                            <td className="numAlign" align="center">
                              26971.299
                            </td>
                            <td className="numAlign" align="center">
                              14
                            </td>
                            <td className="numAlign" align="center" />
                          </tr>
                          <tr className="even" role="row">
                            <td align="center">qtech ( suhas qtech )</td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td className="numAlign" align="center">
                              25173.12
                            </td>
                            <td align="center">SAR</td>
                            <td className="numAlign" align="center">
                              25173.122
                            </td>
                            <td className="numAlign" align="center">
                              43
                            </td>
                            <td className="numAlign" align="center" />
                          </tr>
                          <tr className="odd" role="row">
                            <td align="center">TDO ( Bhargavi Testa )</td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td className="numAlign" align="center">
                              393223.74
                            </td>
                            <td align="center">INR</td>
                            <td className="numAlign" align="center">
                              23153.014
                            </td>
                            <td className="numAlign" align="center">
                              8
                            </td>
                            <td className="numAlign" align="center" />
                          </tr>
                          <tr className="even" role="row">
                            <td align="center">Sayali ( Sayali Patil )</td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td className="numAlign" align="center">
                              19075.21
                            </td>
                            <td align="center">SAR</td>
                            <td className="numAlign" align="center">
                              19075.207
                            </td>
                            <td className="numAlign" align="center">
                              57
                            </td>
                            <td className="numAlign" align="center" />
                          </tr>
                          <tr className="odd" role="row">
                            <td align="center">Test ( Main Agent )</td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td className="numAlign" align="center">
                              2043042.74
                            </td>
                            <td align="center">SAR</td>
                            <td className="numAlign" align="center">
                              18577.204
                            </td>
                            <td className="numAlign" align="center">
                              43
                            </td>
                            <td className="numAlign" align="center" />
                          </tr>
                          <tr className="even" role="row">
                            <td align="center">sqtech ( Sujay Test )</td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td className="numAlign" align="center">
                              29290.84
                            </td>
                            <td align="center">SAR</td>
                            <td className="numAlign" align="center">
                              17434.394
                            </td>
                            <td className="numAlign" align="center">
                              111
                            </td>
                            <td className="numAlign" align="center" />
                          </tr>
                          <tr className="odd" role="row">
                            <td align="center">Main ( Main Agent )</td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td className="numAlign" align="center">
                              261888.83
                            </td>
                            <td align="center">INR</td>
                            <td className="numAlign" align="center">
                              15728.415
                            </td>
                            <td className="numAlign" align="center">
                              23
                            </td>
                            <td className="numAlign" align="center" />
                          </tr>
                          <tr className="even" role="row">
                            <td align="center">sayali ( Sayali Patil )</td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td className="numAlign" align="center">
                              348572.20
                            </td>
                            <td align="center">INR</td>
                            <td className="numAlign" align="center">
                              15516.832
                            </td>
                            <td className="numAlign" align="center">
                              112
                            </td>
                            <td className="numAlign" align="center" />
                          </tr>
                          <tr className="odd" role="row">
                            <td align="center">Qtech ( Nida Ansari )</td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td className="numAlign" align="center">
                              3094.80
                            </td>
                            <td align="center">BHD</td>
                            <td className="numAlign" align="center">
                              15002.510
                            </td>
                            <td className="numAlign" align="center">
                              256
                            </td>
                            <td className="numAlign" align="center" />
                          </tr>
                          <tr className="even" role="row">
                            <td align="center">sayali ( sayali Patil )</td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td className="numAlign" align="center">
                              16212.83
                            </td>
                            <td align="center">SAR</td>
                            <td className="numAlign" align="center">
                              13036.572
                            </td>
                            <td className="numAlign" align="center">
                              66
                            </td>
                            <td className="numAlign" align="center" />
                          </tr>
                          <tr className="odd" role="row">
                            <td align="center">CHECK ( fgfg fgfg )</td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td className="numAlign" align="center">
                              211747.84
                            </td>
                            <td align="center">SAR</td>
                            <td className="numAlign" align="center">
                              12717.067
                            </td>
                            <td className="numAlign" align="center">
                              36
                            </td>
                            <td className="numAlign" align="center" />
                          </tr>
                          <tr className="even" role="row">
                            <td align="center">Moliquel ( Bhargavi Pise )</td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td className="numAlign" align="center">
                              12193.61
                            </td>
                            <td align="center">SAR</td>
                            <td className="numAlign" align="center">
                              12193.606
                            </td>
                            <td className="numAlign" align="center">
                              25
                            </td>
                            <td className="numAlign" align="center" />
                          </tr>
                          <tr className="odd" role="row">
                            <td align="center">rcom ( suhas patil )</td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td className="numAlign" align="center">
                              178862.62
                            </td>
                            <td align="center">SAR</td>
                            <td className="numAlign" align="center">
                              11256.804
                            </td>
                            <td className="numAlign" align="center">
                              48
                            </td>
                            <td className="numAlign" align="center" />
                          </tr>
                          <tr className="even" role="row">
                            <td align="center">
                              Holidays Special ( Faiz Alam )
                            </td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td className="numAlign" align="center">
                              302348.39
                            </td>
                            <td align="center">INR</td>
                            <td className="numAlign" align="center">
                              10799.085
                            </td>
                            <td className="numAlign" align="center">
                              37
                            </td>
                            <td className="numAlign" align="center" />
                          </tr>
                          <tr className="odd" role="row">
                            <td align="center">Main ( Main Main )</td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td className="numAlign" align="center">
                              175915.79
                            </td>
                            <td align="center">INR</td>
                            <td className="numAlign" align="center">
                              10565.080
                            </td>
                            <td className="numAlign" align="center">
                              195
                            </td>
                            <td className="numAlign" align="center" />
                          </tr>
                          <tr className="even" role="row">
                            <td align="center">Red Apple ( Bhargavi Pise )</td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td className="numAlign" align="center">
                              162149.42
                            </td>
                            <td align="center">SAR</td>
                            <td className="numAlign" align="center">
                              10104.732
                            </td>
                            <td className="numAlign" align="center">
                              8
                            </td>
                            <td className="numAlign" align="center" />
                          </tr>
                          <tr className="odd" role="row">
                            <td align="center">flyron ( flyron flyron )</td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td className="numAlign" align="center">
                              1688.65
                            </td>
                            <td align="center">BHD</td>
                            <td className="numAlign" align="center">
                              9821.176
                            </td>
                            <td className="numAlign" align="center">
                              21
                            </td>
                            <td className="numAlign" align="center" />
                          </tr>
                          <tr className="even" role="row">
                            <td align="center">My Hotels ( Joy Beck )</td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td className="numAlign" align="center">
                              9765.00
                            </td>
                            <td align="center">SAR</td>
                            <td className="numAlign" align="center">
                              9765.004
                            </td>
                            <td className="numAlign" align="center">
                              7
                            </td>
                            <td className="numAlign" align="center" />
                          </tr>
                          <tr className="odd" role="row">
                            <td align="center">Qtech ( Rohan Vartak )</td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td className="numAlign" align="center">
                              2423.91
                            </td>
                            <td align="center">USD</td>
                            <td className="numAlign" align="center">
                              8942.850
                            </td>
                            <td className="numAlign" align="center">
                              7
                            </td>
                            <td className="numAlign" align="center" />
                          </tr>
                          <tr className="even" role="row">
                            <td align="center">
                              Agoda XML (DO NOT CHANGE SUPPLIER SETTINGS) (
                              Agoda DO NOT CHANGE SUPPLIER SETTINGS XML )
                            </td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td className="numAlign" align="center">
                              2113.86
                            </td>
                            <td align="center">USD</td>
                            <td className="numAlign" align="center">
                              8085.515
                            </td>
                            <td className="numAlign" align="center">
                              2
                            </td>
                            <td className="numAlign" align="center" />
                          </tr>
                          <tr className="odd" role="row">
                            <td align="center">Qtech ( Allwin Pillai )</td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td className="numAlign" align="center">
                              2147.84
                            </td>
                            <td align="center">USD</td>
                            <td className="numAlign" align="center">
                              7944.009
                            </td>
                            <td className="numAlign" align="center">
                              11
                            </td>
                            <td className="numAlign" align="center" />
                          </tr>
                          <tr className="even" role="row">
                            <td align="center">tech ( yachana asdads )</td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td className="numAlign" align="center">
                              10942.39
                            </td>
                            <td align="center">SAR</td>
                            <td className="numAlign" align="center">
                              7773.711
                            </td>
                            <td className="numAlign" align="center">
                              49
                            </td>
                            <td className="numAlign" align="center" />
                          </tr>
                          <tr className="odd" role="row">
                            <td align="center">Main ( Main Agent )</td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td className="numAlign" align="center">
                              107451.05
                            </td>
                            <td align="center">INR</td>
                            <td className="numAlign" align="center">
                              6453.252
                            </td>
                            <td className="numAlign" align="center">
                              13
                            </td>
                            <td className="numAlign" align="center" />
                          </tr>
                          <tr className="even" role="row">
                            <td align="center">
                              Qtech-Agency ( Allwin Pillai )
                            </td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td className="numAlign" align="center">
                              1668.33
                            </td>
                            <td align="center">USD</td>
                            <td className="numAlign" align="center">
                              6350.718
                            </td>
                            <td className="numAlign" align="center">
                              14
                            </td>
                            <td className="numAlign" align="center" />
                          </tr>
                          <tr className="odd" role="row">
                            <td align="center">easy ( suhas patil )</td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td className="numAlign" align="center">
                              94109.73
                            </td>
                            <td align="center">SAR</td>
                            <td className="numAlign" align="center">
                              5934.705
                            </td>
                            <td className="numAlign" align="center">
                              15
                            </td>
                            <td className="numAlign" align="center" />
                          </tr>
                          <tr className="even" role="row">
                            <td align="center">Agentt ( Agentt Agentt )</td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td className="numAlign" align="center">
                              97455.26
                            </td>
                            <td align="center">INR</td>
                            <td className="numAlign" align="center">
                              5903.862
                            </td>
                            <td className="numAlign" align="center">
                              9
                            </td>
                            <td className="numAlign" align="center" />
                          </tr>
                          <tr className="odd" role="row">
                            <td align="center">Row Travels ( Minal Avhad )</td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td className="numAlign" align="center">
                              95877.29
                            </td>
                            <td align="center">SAR</td>
                            <td className="numAlign" align="center">
                              5618.414
                            </td>
                            <td className="numAlign" align="center">
                              6
                            </td>
                            <td className="numAlign" align="center" />
                          </tr>
                          <tr className="even" role="row">
                            <td align="center">Agent ( Main Agent )</td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td align="center">
                              <font color="#008000">-</font>
                            </td>
                            <td className="numAlign" align="center">
                              91676.96
                            </td>
                            <td align="center">INR</td>
                            <td className="numAlign" align="center">
                              5538.637
                            </td>
                            <td className="numAlign" align="center">
                              6
                            </td>
                            <td className="numAlign" align="center" />
                          </tr>
                        </tbody>
                        <tbody className="bg-white">
                          <tr className="row_header bg-grey">
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>Total &nbsp;</td>
                            <td className="numAlign">USD 29336353.56</td>
                            {/* <td>USD</td> */}
                            <td className="numAlign">21370</td>
                            <td className="numAlign" />
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-md-12">
                  <div
                    valign="top"
                    onclick="callAjaxSubmit(2,'');"
                    title="Click to download XL sheet "
                    className="btn btn-dark btn-sm form-group"
                  >
                    <i className="fa fa-download" />
                    &nbsp;Download Excel
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default ReportsManagementBusinessByAgent;
