import Flatpickr from "react-flatpickr";
import React, { useState } from "react";
import Header2 from "../header2/header2";
import MultiSelect from "../reactMultiSelect";
import { citiesByCountry, countries } from "../../constants/Country-City-Data";

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

const offlineSupplier = [
  { value: "", label: " - All Suppliers - " },
  { value: "S000000489", label: "Aamir Ul Islam Transportor" },
  { value: "S000000214", label: "ABERDEEN ALTENS HOTEL" },
  { value: "S000000012", label: "Across Spain" },
  { value: "S000000195", label: "Adaaran prestige" },
  { value: "S000000645", label: "Adagio Abu Dhabi Al Bustan" },
  { value: "S000000334", label: "ADDRESS BOULEVARD" },
  { value: "S000000336", label: "Address Dubai Marina" },
  { value: "S000000090", label: "Address Hotels Dubai" },
  { value: "S000000337", label: "Address Montgomerie" },
  { value: "S000000841", label: "Address Sky View Hotel" },
  { value: "S000000754", label: "Adrasan Klados Hotel" },
  { value: "S000000115", label: "Advanced Rent A Car" },
  { value: "S000000123", label: "Air Asia" },
  { value: "S000000681", label: "Akman Butik Otel" },
  { value: "S000000076", label: "Al-Riyadh Travel & Tourism" },
  { value: "S000000752", label: "Alacatı Suites" },
  { value: "S000000728", label: "Alakapı Butik Otel" },
  { value: "S000000512", label: "Al Areen Palace & Spa" },
  { value: "S000000257", label: "Al Azhar palace" },
  { value: "S000000331", label: "Al Bander Hotel & Resort" },
  { value: "S000000594", label: "Al Diar Capital" },
  { value: "S000000615", label: "Al Diar Dana" },
  { value: "S000000598", label: "Al Diar Mina" },
  { value: "S000000611", label: "Al Diar Sawa Hotel Apartments" },
  { value: "S000000738", label: "Alesha Suite Hotel" },
  { value: "S000000880", label: "Al Expedia" },
  { value: "S000000515", label: "Al Faisaliah Hotel" },
  { value: "S000000243", label: "Al fanat international apartments" },
  { value: "S000000044", label: "Al Hamra Hotel Jeddah" },
  { value: "S000000806", label: "Al Ibrahim Palace" },
  { value: "S000000182", label: "Al Jawhara Gardens Hotel" },
  { value: "S000000835", label: "Al khaleej grand hotel dubai" },
  { value: "S000000180", label: "ALKHALEEJ PLAZA" },
  { value: "S000000744", label: "Al Khoory Apartment" },
  { value: "S000000740", label: "Al Khoory Atrium" },
  { value: "S000000741", label: "AL Khoory Executive hotel" },
  { value: "S000000743", label: "Al Khoory Inn" },
  {
    value: "S000000272",
    label: "ALLEGROITALIA ESPRESSO BOLOGNA VIALE A. MASINI, 4/3 BOLOGNA",
  },
  { value: "S000000003", label: "allwin-qtech" },
  { value: "S000000642", label: "Al Maha Arjaan, Abu Dhabi" },
  { value: "S000000643", label: "Al Manzel Hotel Apartments" },
  { value: "S000000816", label: "Al Marwa Rayhaan by Rotana" },
  { value: "S000000093", label: "Al Marzooq Bakery" },
  { value: "S000000371", label: "Almina Hotel" },
  { value: "S000000192", label: "Al Nawras Tower" },
  { value: "S000000127", label: "Alpenchalets Reiteralm by Alps Residence" },
  { value: "S000000582", label: "Al raha beach" },
  { value: "S000000488", label: "Al raya hotel apartments" },
  { value: "S000000528", label: "Al Riyadh Travel Abha" },
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

const consultantOptions = [
  { value: "", label: "Select Consultant Name" },
  // Add more consultant options as needed
];

const ReportsManagementBusinessByOfflineSupplier = () => {
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

  const [showStatusDate, setStatusDate] = useState(false);

  const toggleStatusDateDate = () => {
    setStatusDate(!showStatusDate);
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
      <Header2 title="LOCAL SUPPLIER WISE BUSINESS REPORT" />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <form>
          <div className="panel-body">
            <div className="row">
              <div className="form-group col-md-3">
                <label>Country</label>
                <MultiSelect
                  options={countries}
                  isSearchable
                  placeholder="- Select Country -"
                  className="custom-select"
                  onChange={handleCountryChange}
                  noOptionsMessage={() => "No Country Found"}
                />
              </div>
              <div className="form-group col-md-3">
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
              <div className="form-group col-md-3">
                <label>Branch</label>
                <MultiSelect
                  options={branchOptions}
                  isSearchable
                  placeholder=" All Branches "
                  className="custom-select"
                  noOptionsMessage={() => "No Branch Found"}
                />
              </div>
              <div className="form-group col-md-3" id="offline_supplier">
                <label>Offline Suppliers</label>
                <MultiSelect
                  options={offlineSupplier}
                  isSearchable
                  placeholder=" Offline Suppliers "
                  className="custom-select"
                  noOptionsMessage={() => "No Offline Suppliers Found"}
                />
              </div>
              <div className="form-group col-md-3 mt-2">
                <label>Results per page</label>
                <MultiSelect
                  options={maxResultsOptions}
                  isSearchable
                  placeholder=" 50 "
                  className="custom-select"
                  noOptionsMessage={() => "No Results Found"}
                />
              </div>
              <div className="form-group col-md-3 mt-2">
                <label>Master Reference</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="reservation_id"
                  size={50}
                />
              </div>
              <div className="form-group col-md-3 mt-2">
                <label>Consultant Name</label>
                <MultiSelect
                  options={consultantOptions}
                  isSearchable
                  placeholder=" Select Consultant "
                  className="custom-select"
                  noOptionsMessage={() => "No Consultant Found"}
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
                    onChange={toggleStatusDateDate}
                  />
                  <label htmlFor="check_out">Status Date</label>
                </div>
                <div
                  name="check_out_date"
                  id="check_out_date"
                  style={{ display: showStatusDate ? "block" : "none" }}
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
          <style
            dangerouslySetInnerHTML={{
              __html:
                "\n                td a {\n                    color: black;\n                    text-decoration: none;\n                }\n\n                td a:hover {\n                    color: black !important;\n                    text-decoration: none !important;\n                }\n            ",
            }}
          />
          <div className="panel-body removeMargins">
            <div className="dataTables_scroll">
              <div className="row mt-2">
                <div className="col-md-5 col_hide">
                  <div className="col-md-12">
                    <a
                      className="btn btn-dark btn-sm form-group"
                      href="/tms/reports.php?run=1&report=city_wise_sales&sel_country=0&sel_city=0&sel_agent=&sel_agent_name=&sel_branch=&sel_selected_service=all&sel_max_results=50&reservation_id=&consultant_name=&booking_from_date=16-07-2023&booking_to_date=16-08-2023&service_from_date=16-07-2023&service_to_date=16-08-2023&sbt1=View+Report&download=1"
                    >
                      <i className="fa fa-download" />
                      &nbsp;Download Excel
                    </a>
                    &nbsp;&nbsp;
                    <a
                      className="btn btn-dark btn-sm form-group"
                      href="/tms/reports.php?run=1&report=city_wise_sales&sel_country=0&sel_city=0&sel_agent=&sel_agent_name=&sel_branch=&sel_selected_service=all&sel_max_results=50&reservation_id=&consultant_name=&booking_from_date=16-07-2023&booking_to_date=16-08-2023&service_from_date=16-07-2023&service_to_date=16-08-2023&sbt1=View+Report&print=1"
                      target="_blank"
                    >
                      <i className="fa fa-print" />
                      &nbsp;Print
                    </a>
                  </div>
                </div>
                <div className="col-md-5 col_hide">
                  <div className="form-group" />
                </div>
                <div className="col-md-2">
                  <style
                    dangerouslySetInnerHTML={{
                      __html:
                        "\n                                .table tr[visible='false'],\n                                .no-result {\n                                    display: none;\n                                    border: 1px solid #ddd;\n                                    padding: 10px;\n                                    margin-top: -2px;\n                                }\n\n                                .table tr[visible='true'] {\n                                    display: table-row;\n                                }\n\n                                .counter {\n                                    padding: 8px;\n                                    color: #ccc;\n                                }\n\n                                .search_new {\n                                    float: right;\n                                    height: 35px;\n                                    margin-bottom: 0px;\n                                    padding-left: 5px;\n                                }\n                            ",
                    }}
                  />
                  <div
                    className="form-group col-md-2 new_search_icon"
                    style={{ textAlign: "right", paddingRight: "0px" }}
                  >
                    <h5 style={{ display: "inline" }}>
                      <i
                        className="fa fa-search srchWithinPg"
                        id="magnifiers"
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="Search within this table"
                      />
                    </h5>
                  </div>
                  <div className="form-group col-md-10 bookingsrc">
                    <input
                      type="text"
                      className="tablesearch form-control form-control-sm search_new"
                      placeholder="Search"
                    />
                  </div>
                </div>
              </div>
              <div
                id="search_transfer_wrapper"
                className="dataTables_wrapper form-inline dt-bootstrap no-footer"
              >
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
                        id="search_agents_table1"
                        className="table table-bordered   table-responsive dataTable"
                        style={{ width: "100%" }}
                        role="grid"
                        aria-describedby="search_agents_table1_info"
                      >
                        <thead>
                          <tr role="row">
                            <th
                              style={{
                                color: "rgb(255, 255, 255)",
                                fontWeight: 400,
                                fontSize: "12px",
                                padding: "7px",
                                width: "240.2px",
                              }}
                              className="row_header sorting"
                              tabIndex={0}
                              aria-controls="search_agents_table1"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="
                                                  
                                                  Supplier &nbsp;								
                                                      
                                                  &nbsp;
                                                  
                                                      
                                                  
                                                                          : activate to sort column ascending"
                            >
                              Supplier &nbsp;{" "}
                              <a href="/tms/reports.php?run=0  Edit&report=local_supplier_wise_business&&sort_by=company_name&order=ASC&action_type=list_members"></a>
                              &nbsp;
                              <a href="/tms/reports.php?run=0  Edit&report=local_supplier_wise_business&&sort_by=company_name&order=DESC&action_type=list_members"></a>
                            </th>
                            <th
                              style={{
                                color: "rgb(255, 255, 255)",
                                fontWeight: 400,
                                fontSize: "12px",
                                padding: "7px",
                                width: "428.2px",
                              }}
                              className="row_header   no-sort sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="
                                                  
                                                  Gross Sale (In Supplier currency) &nbsp;							"
                            >
                              Gross Sale (In Supplier currency) &nbsp;{" "}
                            </th>
                            <th
                              style={{
                                color: "rgb(255, 255, 255)",
                                fontWeight: 400,
                                fontSize: "12px",
                                padding: "7px",
                                width: "249.2px",
                              }}
                              className="row_header   no-sort sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="
                                                  
                                                  Supplier Currency &nbsp;							"
                            >
                              Supplier Currency &nbsp;{" "}
                            </th>
                            <th
                              style={{
                                color: "rgb(255, 255, 255)",
                                fontWeight: 400,
                                fontSize: "12px",
                                padding: "7px",
                                width: "158.2px",
                              }}
                              className="row_header   no-sort sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="
                                                  
                                                  Gross Sale &nbsp;							"
                            >
                              Gross Sale &nbsp;{" "}
                            </th>
                            <th
                              style={{
                                color: "rgb(255, 255, 255)",
                                fontWeight: 400,
                                fontSize: "12px",
                                padding: "7px",
                                width: "141.2px",
                              }}
                              className="row_header   no-sort sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="
                                                  
                                                  Currency &nbsp;							"
                            >
                              Currency &nbsp;{" "}
                            </th>
                            <th
                              style={{
                                color: "rgb(255, 255, 255)",
                                fontWeight: 400,
                                fontSize: "12px",
                                padding: "7px",
                                width: "188px",
                              }}
                              className="row_header    numeric-comma sorting"
                              tabIndex={0}
                              aria-controls="search_agents_table1"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="
                                                  
                                                  Total Nights &nbsp;								
                                                      
                                                  &nbsp;
                                                  
                                                      
                                                  
                                                                          : activate to sort column ascending"
                            >
                              Total Nights &nbsp;{" "}
                              <a href="/tms/reports.php?run=0  Edit&report=local_supplier_wise_business&&sort_by=total_nights&order=ASC&action_type=list_members"></a>
                              &nbsp;
                              <a href="/tms/reports.php?run=0  Edit&report=local_supplier_wise_business&&sort_by=total_nights&order=DESC&action_type=list_members"></a>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          <tr role="row" className="odd">
                            {/*  <td align="center" class="report_row1" align="right" style="border: 1px solid #9799a0;">1</td> */}
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row1 "
                              align="left"
                            >
                              QtechTest - AED&nbsp;
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row1 "
                              align="right"
                            >
                              600&nbsp;
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row1 "
                              align="right"
                            >
                              AED&nbsp;
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row1 "
                              align="right"
                            >
                              548.26&nbsp;
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row1 "
                              align="right"
                            >
                              USD&nbsp;
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row1 "
                              align="right"
                            >
                              4&nbsp;
                            </td>
                          </tr>
                          <tr role="row" className="even">
                            {/*  <td align="center" class="report_row2" align="right" style="border: 1px solid #9799a0;">2</td> */}
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row2 "
                              align="left"
                            >
                              QtechTest - AUD&nbsp;
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row2 "
                              align="right"
                            >
                              1100&nbsp;
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row2 "
                              align="right"
                            >
                              AUD&nbsp;
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row2 "
                              align="right"
                            >
                              1303&nbsp;
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row2 "
                              align="right"
                            >
                              USD&nbsp;
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row2 "
                              align="right"
                            >
                              2&nbsp;
                            </td>
                          </tr>
                          <tr role="row" className="odd">
                            {/*  <td align="center" class="report_row1" align="right" style="border: 1px solid #9799a0;">3</td> */}
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row1 "
                              align="left"
                            >
                              QtechTest - INR&nbsp;
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row1 "
                              align="right"
                            >
                              3330&nbsp;
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row1 "
                              align="right"
                            >
                              INR&nbsp;
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row1 "
                              align="right"
                            >
                              199.64&nbsp;
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row1 "
                              align="right"
                            >
                              USD&nbsp;
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row1 "
                              align="right"
                            >
                              42&nbsp;
                            </td>
                          </tr>
                          <tr role="row" className="even">
                            {/*  <td align="center" class="report_row2" align="right" style="border: 1px solid #9799a0;">4</td> */}
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row2 "
                              align="left"
                            >
                              QtechTest - SAR&nbsp;
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row2 "
                              align="right"
                            >
                              9652&nbsp;
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row2 "
                              align="right"
                            >
                              SAR&nbsp;
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row2 "
                              align="right"
                            >
                              2573.9&nbsp;
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row2 "
                              align="right"
                            >
                              USD&nbsp;
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row2 "
                              align="right"
                            >
                              1&nbsp;
                            </td>
                          </tr>
                          <tr role="row" className="odd">
                            {/*  <td align="center" class="report_row1" align="right" style="border: 1px solid #9799a0;">5</td> */}
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row1 "
                              align="left"
                            >
                              QtechTest - USD&nbsp;
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row1 "
                              align="right"
                            >
                              168352&nbsp;
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row1 "
                              align="right"
                            >
                              USD&nbsp;
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row1 "
                              align="right"
                            >
                              643663.9&nbsp;
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row1 "
                              align="right"
                            >
                              USD&nbsp;
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row1 "
                              align="right"
                            >
                              1150&nbsp;
                            </td>
                          </tr>
                          <tr role="row" className="even">
                            {/*  <td align="center" class="report_row2" align="right" style="border: 1px solid #9799a0;">6</td> */}
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row2 "
                              align="left"
                            >
                              Nirvana Tour - AED&nbsp;
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row2 "
                              align="right"
                            >
                              64272.22&nbsp;
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row2 "
                              align="right"
                            >
                              AED&nbsp;
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row2 "
                              align="right"
                            >
                              51898.66&nbsp;
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row2 "
                              align="right"
                            >
                              USD&nbsp;
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row2 "
                              align="right"
                            >
                              242&nbsp;
                            </td>
                          </tr>
                          <tr role="row" className="odd">
                            {/*  <td align="center" class="report_row1" align="right" style="border: 1px solid #9799a0;">7</td> */}
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row1 "
                              align="left"
                            >
                              Nirvana Tour - AUD&nbsp;
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row1 "
                              align="right"
                            >
                              600&nbsp;
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row1 "
                              align="right"
                            >
                              AUD&nbsp;
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row1 "
                              align="right"
                            >
                              565.47&nbsp;
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row1 "
                              align="right"
                            >
                              USD&nbsp;
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row1 "
                              align="right"
                            >
                              6&nbsp;
                            </td>
                          </tr>
                          <tr role="row" className="even">
                            {/*  <td align="center" class="report_row2" align="right" style="border: 1px solid #9799a0;">8</td> */}
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row2 "
                              align="left"
                            >
                              Nirvana Tour - USD&nbsp;
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row2 "
                              align="right"
                            >
                              15358&nbsp;
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row2 "
                              align="right"
                            >
                              USD&nbsp;
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row2 "
                              align="right"
                            >
                              51344.5&nbsp;
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row2 "
                              align="right"
                            >
                              USD&nbsp;
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row2 "
                              align="right"
                            >
                              142&nbsp;
                            </td>
                          </tr>
                          <tr role="row" className="odd">
                            {/*  <td align="center" class="report_row1" align="right" style="border: 1px solid #9799a0;">9</td> */}
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row1 "
                              align="left"
                            >
                              allwin-qtech - AED&nbsp;
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row1 "
                              align="right"
                            >
                              16500&nbsp;
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row1 "
                              align="right"
                            >
                              AED&nbsp;
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row1 "
                              align="right"
                            >
                              17175.84&nbsp;
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row1 "
                              align="right"
                            >
                              USD&nbsp;
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row1 "
                              align="right"
                            >
                              61&nbsp;
                            </td>
                          </tr>
                          <tr role="row" className="even">
                            {/*  <td align="center" class="report_row2" align="right" style="border: 1px solid #9799a0;">10</td> */}
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row2 "
                              align="left"
                            >
                              allwin-qtech - INR&nbsp;
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row2 "
                              align="right"
                            >
                              388264.6&nbsp;
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row2 "
                              align="right"
                            >
                              INR&nbsp;
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row2 "
                              align="right"
                            >
                              22687.34&nbsp;
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row2 "
                              align="right"
                            >
                              USD&nbsp;
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                                padding: "7px",
                              }}
                              className="report_row2 "
                              align="right"
                            >
                              3399&nbsp;
                            </td>
                          </tr>
                        </tbody>
                        <tfoot>
                          <tr className="bg-grey">
                            <td
                              style={{
                                textAlign: "center",
                                padding: "7px",
                                fontSize: "13px",
                              }}
                              className="row_header"
                              rowSpan={1}
                              colSpan={1}
                            ></td>
                            <td
                              style={{
                                textAlign: "center",
                                padding: "7px",
                                fontSize: "13px",
                              }}
                              className="row_header"
                              rowSpan={1}
                              colSpan={1}
                            ></td>
                            <td
                              style={{
                                textAlign: "center",
                                padding: "7px",
                                fontSize: "13px",
                              }}
                              className="row_header"
                              rowSpan={1}
                              colSpan={1}
                            ></td>
                            <td
                              style={{
                                textAlign: "center",
                                padding: "7px",
                                fontSize: "13px",
                              }}
                              className="row_header"
                              rowSpan={1}
                              colSpan={1}
                            ></td>
                            <td
                              style={{
                                textAlign: "center",
                                padding: "7px",
                                fontSize: "13px",
                              }}
                              className="row_header"
                              rowSpan={1}
                              colSpan={1}
                            ></td>
                            <td
                              style={{
                                textAlign: "center",
                                padding: "7px",
                                fontSize: "13px",
                              }}
                              className="row_header"
                              rowSpan={1}
                              colSpan={1}
                            ></td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-md-4">
                  <div className="col-md-12">
                    <a
                      className="btn btn-dark btn-sm form-group"
                      href="/tms/reports.php?run=1&report=city_wise_sales&sel_country=0&sel_city=0&sel_agent=&sel_agent_name=&sel_branch=&sel_selected_service=all&sel_max_results=50&reservation_id=&consultant_name=&booking_from_date=16-07-2023&booking_to_date=16-08-2023&service_from_date=16-07-2023&service_to_date=16-08-2023&sbt1=View+Report&download=1"
                    >
                      <i className="fa fa-download" />
                      &nbsp;Download Excel
                    </a>
                    &nbsp;&nbsp;
                    <a
                      className="btn btn-dark btn-sm form-group"
                      href="/tms/reports.php?run=1&report=city_wise_sales&sel_country=0&sel_city=0&sel_agent=&sel_agent_name=&sel_branch=&sel_selected_service=all&sel_max_results=50&reservation_id=&consultant_name=&booking_from_date=16-07-2023&booking_to_date=16-08-2023&service_from_date=16-07-2023&service_to_date=16-08-2023&sbt1=View+Report&print=1"
                      target="_blank"
                    >
                      <i className="fa fa-print" />
                      &nbsp;Print
                    </a>
                  </div>
                </div>
                <div className="col-md-7" />
                <div className="col-md-1">
                  <a
                    className="btn btn-dark btn-sm form-group pull-right"
                    href="/tms/reports.php?run=0  Edit&report=online_supplier_wise_business&&Total=10&Start=10"
                  >
                    <i className="fa fa-arrow-right" />
                    &nbsp;Next
                  </a>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default ReportsManagementBusinessByOfflineSupplier;
