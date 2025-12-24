
import Flatpickr from "react-flatpickr";
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Header2 from "../header2/header2";
import MultiSelect from "../reactMultiSelect";
import { citiesByCountry, countries } from "../../constants/Country-City-Data";



const selectedServiceOptions = [
  { label: 'All', value: 'all' },
  { label: 'Hotel', value: 'hotel' },
  { label: 'Activity', value: 'sightseeing' },
  { label: 'Transfer', value: 'transfer' },
  { label: 'Misc', value: 'misc' },
  { label: 'Airline', value: 'Airline' },
  { label: 'Packages', value: 'packages' },
  { label: 'Visa', value: 'visa' },
  { label: 'Event', value: 'event' },
  { label: 'Offline', value: 'offline' },
];


const supplierOptions = [
  { label: ' - Select Supplier -', value: '0' },
  { label: 'Dotw', value: '1' },
  { label: 'Restel', value: '2' },
  { label: 'Hotelbeds', value: '3' },
  { label: 'visa', value: '4' },
  { label: 'Whitesands', value: '5' },
  { label: 'Miki', value: '6' },
  { label: 'Travco', value: '7' },
  { label: 'EgyptExpress', value: '8' },
  { label: 'Contracted Transfer', value: '10' },
  { label: 'Contracted Sightseeing', value: '11' },
  { label: 'expedia', value: '12' },
  { label: 'expediapackage', value: '13' },
  { label: 'Groups', value: '14' },
  { label: 'Misc', value: '15' },
  { label: 'Hotelbeds Sightseeing (TEST)', value: '17' },
  { label: 'Redapple Travel', value: '18' },
  { label: 'Dhisco', value: '19' },
  { label: 'Agoda', value: '20' },
  { label: 'priceline Mor', value: '21' },
  { label: 'Contracted Flight', value: '22' },
  { label: 'Contracted Hotels', value: '23' },
  { label: 'Minal_Qtech_Test', value: '24' },
  { label: 'Snehal Testing', value: '25' },
  { label: 'Amadeus Flight', value: '26' },
  { label: 'Sabre Flight', value: '27' },
  { label: 'Hotelbeds Transfer', value: '29' },
  { label: 'tboholidays', value: '30' },
  { label: 'Mystifly', value: '31' },
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
  { label: "1 Booking", value: 49 }
];

const agentOptions = [
  { label: '1 Booking [CD0203-hcnida] [Ahmed-Khan]', value: 203 },
  { label: '1 Booking WL (Do Not Edit) [CD0312-1bookingwhagent] [Ahmed-Khan]', value: 312 },
  { label: 'abc [CD0237-VisaSub] [saya-patil]', value: 237 },
  { label: 'ABM [CD0235-newsub] [sayali-Patil]', value: 235 },
  { label: 'ABM [CD0239-Subqtech] [Sayali-Patil]', value: 239 },
  { label: 'BookItNow [CD0318-BookItNow] [Godrey-Pereira]', value: 318 },
  { label: 'ELiago [CD0280-Eliago_ws] [Bhargavi-Test]', value: 280 },
  { label: 'GoGoa [CA0298-GoGoa] [Goa-Travel]', value: 298 },
  { label: 'GRN Connect [CD0314-grnconnect] [Bhargavi-Testa]', value: 314 },
  { label: 'Hexion [CD0304-Hexion_ws] [Bhargavi-Testa]', value: 304 },
  { label: 'hhgh [CD0268-brach_test] [ghgh-ghgh]', value: 268 },
  { label: 'JAISON JAMES [CA0308-jaisonqtech] [Jaison-James]', value: 308 },
  { label: 'JV [CA0305-JV_test] [JV-test]', value: 305 },
  { label: 'LMN [CD0123-PQR] [Minal-PQR]', value: 123 },
  { label: 'Lots of Hotels [CD0046-asmiyu] [asmita-qtech]', value: 46 },
  { label: 'minal@123 [CD0116-sub agent] [abc-xyz]', value: 116 },
  { label: 'moavia_eilago [CD0313-m.moavia] [Mohammad-Moavia]', value: 313 },
  { label: 'My Hotels [CD0272-myhotels_ws] [Joy-Beck]', value: 272 },
  { label: 'online Supplier [CA0175-online_supp] [Testt-Demo]', value: 175 },
  { label: 'Qtech [CA0017-allwinace] [Allwin-Pillai]', value: 17 },
  { label: 'qtech [CD0045-asmiee] [asmita-qtech]', value: 45 },
  { label: 'Qtech [CA0310-odyssey_ws] [Bhargavi-Testa]', value: 310 },
  { label: 'Qtech [CD0113-allwin_1122] [Allwin-Pillai]', value: 113 },
  { label: 'Qtech Jaison [CD0238-Qtechnew] [Jaison-James]', value: 238 },
  { label: 'Qtech Software [CD0315-QStdo_ws] [Bhargavi-Pise]', value: 315 },
  { label: 'Qtech Software PVT [CD0316-wego_ws] [Bhargavi-Pise]', value: 316 },
  { label: 'Qtech@1234 [CD0309-agentsub] [sub-agentqtech]', value: 309 },
  { label: 'Qtechhhhhh [CA0299-Qtechhhhhh] [Qtechhhhhh-Testt]', value: 299 },
  { label: 'qtecj [CD0217-sayali] [Test-Qtech]', value: 217 },
  { label: 'rohan white label [CD0211-rohan_wl] [white-label]', value: 211 },
  { label: 'Rohit Travels [CA0317-rohitmhtm] [Rohit-Sapkota]', value: 317 },
  { label: 'sdfdf [CD0214-sub2] [fgfg-dgffgf]', value: 214 },
  { label: 'sqtech [CD0291-sqtech] [Sujay-Test]', value: 291 },
  { label: 'Sub Company [CD0037-subagentt2] [Sub-Agent]', value: 37 },
  { label: 'suhaspatil [CA0013-suhas1] [suhas-patil]', value: 13 },
  { label: 'Sujayq [CA0290-Sujayq] [Sujay-q]', value: 290 },
  { label: 'Sujay_JV [CD0294-TEST_JV_] [Sujay-Raut]', value: 294 },
  { label: 'TDO [CD0307-akbar] [Bhargavi-Testa]', value: 307 },
  { label: 'tdo webservice test [CD0311-tdo_ws_test] [Tdo-Webservice]', value: 311 },
  { label: 'trtrt [CA0269-cash_agent_branch] [trtt-fgfgf]', value: 269 },
  { label: 'Vartak &Vartak Tours [CA0285-vartakk] [Ron-Vartak]', value: 285 },
  { label: 'Vartak Holidazzle [CD0195-rohan] [rohan-vartak]', value: 195 },
  { label: 'Welcome@123 [CD0090-allwin_sub25] [Allwin-Pillai]', value: 90 },
];







const ReportsManagementSalesComparison = () => {

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



  const [branchData1, setBranchData1] = useState({

    branchCountry1: "",
    branchCity1: "",

  });



  const handleCountryChange1 = (selectedCountry) => {
    setBranchData1((prevData) => ({
      ...prevData,
      branchCountry1: selectedCountry.value,
      branchCity1: "", // Reset city when country changes
    }));
  };

  const handleCityChange1 = (selectedCity) => {
    setBranchData((prevData) => ({
      ...prevData,
      branchCity1: selectedCity.value,
    }));
  };











  return (
    <>
      <Header2 title="SALES COMPARISON" linkText1="Sales Comparison" />
      <div class="container-fluid pt-0 p-4" id="content-pad">



        <div>
          {/* First Row*/}
          <div className="panel-footer" style={{ padding: '8px 4px', backgroundColor: '#f5f5f5', borderTop: '1px solid #ddd', borderBottomRightRadius: '3px', borderBottomLeftRadius: '3px' }}>
            <div className="row">
              <div className="col-md-6">
                <div className="radioline1" style={{ fontSize: '12px', fontFamily: 'MONTSERRAT' }}>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <div className="radio radio-success radio-inline">
                    <input type="radio" name="date_type" id="create_date" defaultValue="create_date" defaultChecked="checked" onchange="get_booking_date_type(this.value);" className="test123" /><label htmlFor="create_date">&nbsp;Booking Date</label>&nbsp;&nbsp;
                  </div>
                  <div className="radio radio-success radio-inline">
                    <input type="radio" name="date_type" id="service_date" defaultValue="service_date" onchange="get_booking_date_type(this.value);" /><label htmlFor="service_date">&nbsp;Service
                      Date</label>&nbsp;&nbsp;
                  </div>
                  <div className="radio radio-success radio-inline">
                    <input type="radio" name="date_type" id="expiration_date" defaultValue="expiration_date" onchange="get_booking_date_type(this.value);" /><label htmlFor="expiration_date">&nbsp;Deadline
                      Date</label>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="float-end">
                  <div className="btn-group" style={{ marginBottom: '-15px', verticalAlign: 'bottom !important' }}>
                    <Link className="btn btn-xs btn-default" data-toggle="tab" onclick="period('daily')">Daily</Link>
                    <Link className="btn btn-xs btn-default" data-toggle="tab" onclick="period('weekly')">Weekly</Link>
                    <Link className="btn btn-xs btn-default" data-toggle="tab" onclick="period('monthly')">Monthly</Link>
                    <Link className="btn btn-xs btn-default" data-toggle="tab" onclick="period('quarterly')">Quarterly</Link>
                    <Link className="btn btn-xs btn-default" data-toggle="tab" onclick="period('yearly')">Yearly</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <form name="sale_comparison_search" method="POST" id="sale_comparison_search">
            <input type="hidden" name="period" id="period" />
            <div className="panel-body form-group">
              <div className="row">
                <div className="col-md-5">
                  <div className="row mt-3">
                    <div className="col-md-12 text-center">
                      <h6>Trend 1</h6>
                      <hr style={{ clear: 'both', float: 'none', color: '#a5a3a3' }} />
                    </div>
                    <div className="form-group col-md-12">
                      <label id="date_range_1">Booking Date 1</label>
                      <div id="datetimepicker6" className="input-daterange input-group date col-md-12 col-sm-12 col-xs-12">
                        <Flatpickr
                          value={startDate}
                          onChange={(date) => setStartDate(date)}
                          options={{ dateFormat: "Y-m-d" }}
                          style={{ width: '131px' }}
                        />

                        <span class="input-group-addon">to</span>
                        <Flatpickr
                          value={endDate}
                          onChange={(date) => setEndDate(date)}
                          options={{ dateFormat: "Y-m-d" }}
                          style={{ width: '131px' }}
                        />
                        <span onClick={handleTrashClick} title="clear" alt="clear" className="input-group-addon" id="b1TrashBtn">
                          <i className="fa fa-trash" />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="form-group col-md-3">
                      <label>Country</label>
                      <MultiSelect
                        options={countries}
                        isSearchable
                        placeholder="- Select -"
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
                        placeholder="- Select -"
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
                        placeholder=" - Select - "
                        className="custom-select"
                        noOptionsMessage={() => "No Branch Found"}
                      />
                    </div>
                    <div className="form-group col-md-3">
                      <label>Supplier</label>
                      <MultiSelect
                        options={supplierOptions}
                        isSearchable
                        placeholder=" - Select - "
                        className="custom-select"
                        noOptionsMessage={() => "No Branch Found"}
                      />
                    </div>
                    <div className="form-group col-md-3 mt-3">
                      <label>Services Type</label>
                      <MultiSelect
                        options={selectedServiceOptions}
                        isSearchable
                        placeholder=" -Select- "
                        className="custom-select"
                        noOptionsMessage={() => "No Branch Found"}
                      />
                    </div>
                    <div className="form-group col-md-12 mt-3">
                      <label>Agent</label>
                      <MultiSelect
                        options={agentOptions}
                        isSearchable
                        placeholder=" Select Agent "
                        className="custom-select"
                        noOptionsMessage={() => "No Agent Found"}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-2 row text-center vcenter" style={{ margin: 'auto', paddingLeft: '56px', paddingRight: '56px' }}><button className="text-center btn btn-dark btn-sm w-sm" type="button" onclick="flipValues()">
                  <i className="fa fa-exchange" />
                </button> </div>
                <div className="col-md-5">
                  <div className="row mt-3">
                    <div className="col-md-12 text-center">
                      <h6>Trend 2</h6>
                      <hr style={{ clear: 'both', float: 'none', color: '#a5a3a3' }} />
                    </div>
                    <div className="form-group col-md-12">
                      <label id="date_range_2">Booking Date 2</label>
                      <div id="datetimepicker7" className="input-daterange input-group date col-md-12 col-sm-12 col-xs-12">
                        <Flatpickr
                          value={startDate1}
                          onChange={(date) => setStartDate1(date)}
                          options={{ dateFormat: "Y-m-d" }}
                          style={{ width: '131px' }}
                        />

                        <span class="input-group-addon">to</span>
                        <Flatpickr
                          value={endDate1}
                          onChange={(date) => setEndDate1(date)}
                          options={{ dateFormat: "Y-m-d" }}
                          style={{ width: '131px' }}
                        />
                        <span onClick={handleTrashClick1} title="clear" alt="clear" className="input-group-addon" id="b2TrashBtn">
                          <i className="fa fa-trash" />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="form-group col-md-3">
                      <label>Country</label>
                      <MultiSelect
                        options={countries}
                        isSearchable
                        placeholder="- Select -"
                        className="custom-select"
                        onChange={handleCountryChange1}
                        noOptionsMessage={() => "No Country Found"}

                      />
                    </div>
                    <div className="form-group col-md-3">
                      <label>City</label>
                      <MultiSelect
                        //  options={Array.isArray(branchData.branchCity) ? branchData.branchCity : []}
                        options={citiesByCountry[branchData1.branchCountry1] || []}
                        isSearchable
                        placeholder="- Select -"
                        className="custom-select"
                        onChange={handleCityChange1}
                        noOptionsMessage={() => "No City Found"}

                      />
                    </div>
                    <div className="form-group col-md-3">
                      <label>Branch</label>
                      <MultiSelect
                        options={branchOptions}
                        isSearchable
                        placeholder=" - Select - "
                        className="custom-select"
                        noOptionsMessage={() => "No Branch Found"}
                      />
                    </div>
                    <div className="form-group col-md-3">
                      <label>Supplier</label>
                      <MultiSelect
                        options={supplierOptions}
                        isSearchable
                        placeholder=" - Select - "
                        className="custom-select"
                        noOptionsMessage={() => "No Branch Found"}
                      />
                    </div>
                    <div className="form-group col-md-3 mt-3">
                      <label>Services Type</label>
                      <MultiSelect
                        options={selectedServiceOptions}
                        isSearchable
                        placeholder=" -Select- "
                        className="custom-select"
                        noOptionsMessage={() => "No Branch Found"}
                      />
                    </div>
                    <div className="form-group col-md-12 mt-3">
                      <label>Agent</label>
                      <MultiSelect
                        options={agentOptions}
                        isSearchable
                        placeholder=" Select Agent "
                        className="custom-select"
                        noOptionsMessage={() => "No Agent Found"}
                      />
                    </div>
                  </div>
                </div>
                <div style={{ clear: 'both' }} />
                <br />
                <div className="row mt-3" style={{ borderTop: '2px dotted #ddd' }}>
                  <br />
                  <div className="col-md-5" />
                  <div className="col-md-2 row text-center" style={{ margin: 'auto', marginTop: '14px', paddingLeft: '49px', paddingRight: '49px', marginLeft: '15px' }}>
                    <button id="id_generate_report" className="btn btn-dark btn-sm" type="button" onclick="search_report();">
                      <i className="fa fa-search" />&nbsp;Generate Report
                    </button>
                  </div>
                  <div className="col-md-5" />
                </div>
              </div>
            </div>
          </form>
        </div>





      </div>
    </>
  );
};
export default ReportsManagementSalesComparison;
