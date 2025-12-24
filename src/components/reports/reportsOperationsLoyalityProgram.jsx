import Flatpickr from "react-flatpickr";
import React, { useState } from "react";
import plus from "../../assets/images/plus_white_img.jpg";
import { Link } from "react-router-dom";
import MultiSelect from "../reactMultiSelect";
import Header2 from "../header2/header2";

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

const loyaltyTierOptions = [
  { value: "", label: "ALL" },
  { value: 26, label: "Diamond" },
  { value: 30, label: "FASHION ITEMS LOYALITY" },
  { value: 2, label: "Gold" },
  { value: 6, label: "Gold-Test" },
  { value: 27, label: "Golden Star" },
  { value: 14, label: "Hotel_tier" },
  { value: 15, label: "Hotel_tier_01" },
  { value: 17, label: "Hote_tier02" },
  { value: 16, label: "Loyalty_1" },
  { value: 24, label: "Loyal_tier" },
  { value: 20, label: "Mtest_tier1" },
  { value: 23, label: "New" },
  { value: 10, label: "new1" },
  { value: 25, label: "new_m" },
  { value: 11, label: "Nida_Tier_Test" },
  { value: 19, label: "PriyankaTest" },
  { value: 28, label: "Raj_test" },
  { value: 4, label: "Sell More Earn More" },
  { value: 1, label: "silver" },
  { value: 31, label: "silver_1" },
  { value: 29, label: "Swapnil_Tier" },
  { value: 5, label: "tarika_test_tier" },
  { value: 12, label: "Test_Tier_01" },
  { value: 13, label: "Test_tier_02" },
  { value: 7, label: "tier 1" },
  { value: 18, label: "Tier_03" },
];

const AgencyOptions = [
  { value: "", label: "Select Agent" },
  { value: 162, label: "Agent [CD0162-NewAgent] [Abc-xyz]" },
  { value: 171, label: "Agent [CD0171-agent_agent] [Main-Agent]" },
  { value: 172, label: "Agentt [CD0172-agentt_agentt] [Agentt-Agentt]" },
  { value: 248, label: "Holidays Special [CD0248-alamfaiz] [Faiz-Alam]" },
  { value: 150, label: "Main [CD0150-loyalty_main] [Main-Agent]" },
  { value: 155, label: "Main [CD0155-package_main] [Main-Package]" },
  { value: 160, label: "Main [CD0160-new_main_loyalty] [Main-Agent]" },
  { value: 161, label: "Main [CD0161-nida_main] [Main-Main]" },
  { value: 164, label: "Main [CD0164-loyal_main] [Main-Agent]" },
  {
    value: 208,
    label: "Mumbai Pune Mumbai - Qtech [CD0208-ganesh] [Ganesh-Salunkhe]",
  },
  { value: 2, label: "Neeraj [CD0002-neeraj] [Neeraj-Yadav]" },
  { value: 167, label: "New [CD0167-new_new] [New-New]" },
  { value: 183, label: "Nida [CD0183-Snehal02] [Snehal-Testt]" },
  { value: 1, label: "qtech [CD0001-asmita_test] [asmita-kapadi]" },
  { value: 257, label: "Qtech [CA0257-nida_multichk] [Nida-Ansari]" },
  { value: 4, label: "Qtech [CD0004-allwin] [Allwin-Pillai]" },
  { value: 23, label: "Qtech [CD0023-allwint] [Allwin-Pillai]" },
  { value: 310, label: "Qtech [CA0310-odyssey_ws] [Bhargavi-Testa]" },
  { value: 71, label: "Qtech [CD0071-allwin_loyaltyP] [Allwin-Pillai]" },
  { value: 82, label: "Qtech [CD0082-allwin_tt] [Allwin-Pillai]" },
  { value: 113, label: "Qtech [CD0113-allwin_1122] [Allwin-Pillai]" },
  { value: 159, label: "Qtech [CD0159-Loyal_agent] [LAgent-Test]" },
  { value: 173, label: "Qtech [CD0173-AgentMin] [Abc-Xyz]" },
  { value: 174, label: "Qtech [CD0174-Agent_Loyal] [Loyalty-Module]" },
  {
    value: 176,
    label: "Qtech [CD0176-MTest] [minal-minal.avhad@qtechsoftware.com]",
  },
  { value: 180, label: "Qtech [CD0180-Staffagent] [Minal-Test]" },
  { value: 182, label: "Qtech [CD0182-snehal06] [SnehalTest-Test]" },
  { value: 205, label: "Qtech [CD0205-supernew] [Qtech-test]" },
  { value: 156, label: "Qtechsoftware [CD0156-LoyaltyModule] [Loyalty-Agent]" },
  { value: 7, label: "rcom [CD0007-suhas] [suhas-patil]" },
  { value: 255, label: "sayali [CD0255-Sayali_BHDTest] [Sayali-Patil]" },
  { value: 291, label: "sqtech [CD0291-sqtech] [Sujay-Test]" },
  { value: 48, label: "Test [CD0048-nida_agent] [Main-Agent]" },
  { value: 195, label: "Vartak Holidazzle [CD0195-rohan] [rohan-vartak]" },
];

const subAgentOptions = [
  { value: "", label: "Select Sub Agent" },
  // Add additional sub-agent options if needed
];

const ReportsOperationsLoyalityProgram = () => {
  const [startDate, setStartDate] = useState(null); // State for the start date
  const [endDate, setEndDate] = useState(null); // State for the end date

  const handleTrashClick = () => {
    // Function to clear both start and end dates
    setStartDate(null);
    setEndDate(null);
  };

  const [isData1Visible, setIsData1Visible] = useState(false);

  const toggleData1Visibility = () => {
    setIsData1Visible(!isData1Visible);
  };
  const [isData1Visible1, setIsData1Visible1] = useState(false);

  const toggleData1Visibility1 = () => {
    setIsData1Visible1(!isData1Visible1);
  };
  const [isData1Visible2, setIsData1Visible2] = useState(false);

  const toggleData1Visibility2 = () => {
    setIsData1Visible2(!isData1Visible2);
  };
  const [isData1Visible3, setIsData1Visible3] = useState(false);

  const toggleData1Visibility3 = () => {
    setIsData1Visible3(!isData1Visible3);
  };
  const [isData1Visible4, setIsData1Visible4] = useState(false);

  const toggleData1Visibility4 = () => {
    setIsData1Visible4(!isData1Visible4);
  };

  const [isFormVisible, setFormVisibility] = useState(false);

  const toggleFormVisibility = () => {
    setFormVisibility(!isFormVisible);
  };

  return (
    <>
      <Header2 title="LOYALTY PROGRAM REPORT" />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <div>
          <form>
            <div className="panel-body">
              <div className="row">
                <div className="form-group col-md-3">
                  <label>Loyalty Tier</label>
                  <div>
                    <MultiSelect
                      options={loyaltyTierOptions}
                      isSearchable
                      placeholder=" Select Tier "
                      className="custom-select"
                      noOptionsMessage={() => "No Tier Found"}
                    />
                  </div>
                </div>
                <div className="form-group col-md-3">
                  <label>Agency</label>
                  <div>
                    <MultiSelect
                      options={AgencyOptions}
                      isSearchable
                      placeholder=" Select Agent "
                      className="custom-select"
                      noOptionsMessage={() => "No Agency Found"}
                    />
                  </div>
                </div>
                <div className="form-group col-md-3">
                  <label>Sub Agent</label>
                  <input
                    type="hidden"
                    name="subAgentAgency"
                    id="subAgentAgency"
                    defaultValue
                  />
                  <MultiSelect
                    options={subAgentOptions}
                    isSearchable
                    placeholder=" Select Sub Agent "
                    className="custom-select"
                    noOptionsMessage={() => "No Sub Agent Found"}
                  />
                </div>
                <div className="form-group col-md-3">
                  <label>Branch</label>
                  <div>
                    <MultiSelect
                      options={branchOptions}
                      isSearchable
                      placeholder=" All Branches "
                      className="custom-select"
                      noOptionsMessage={() => "No Branch Found"}
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-3 form-group">
                  <label>Redemption Date</label>
                  <div
                    className="input-group date input-daterange"
                    id="receiptDate"
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
                <div className="col-md-3 form-group">
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      name="typeOption"
                      id="typeOption"
                      defaultValue="earn"
                      defaultChecked
                    />
                    <label>Points Earned</label>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input
                      type="radio"
                      name="typeOption"
                      id="app"
                      defaultValue="debit"
                    />
                    <label>Points Redeemed</label>
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="form-group col-md-12">
                  <div className="col-md-2 ">
                    <button
                      type="button"
                      name="sbt1"
                      className="btn btn-outline-secondary btn-sm"
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
          </form>
          <br />
          <form
            id="hideornot"
            style={{ display: isFormVisible ? "block" : "none" }}
          >
            <style
              dangerouslySetInnerHTML={{
                __html:
                  '\n    td a{\n        text-decoration: none;\n        color: black;\n    }\n    td a:hover{\n        text-decoration: none!important;\n        color: black !important;\n    }\n    td{\n        font-size: 9pt !important;\n    text-transform: uppercase !important;\n    vertical-align: middle!important;\n    font-weight: normal!important;\n    font-family: "roboto" !important;\n    }\n    \n',
              }}
            />
            <div className="panel-body removeMargins">
              <table
                style={{ width: "14.7%" }}
                border={0}
                cellSpacing={0}
                cellPadding={0}
              >
                <tbody className="bg-white">
                  <tr>
                    <td
                      valign="top"
                      className="fc_blue bold pointer pdd_5"
                      style={{ width: "40px", paddingBottom: "5px" }}
                    >
                      <u>
                        <Link
                          id="dwn"
                          className="btn btn-outline-secondary btn-sm form-group"
                          to="/tms/loyalty_tier.php?action=loyaltyReport&run=1&loyaltyTierId=&agentId=&subAgentAgency=&subAgentFilter=&sel_branch=&typeOption=earn&redemption_date_start=&redemption_date_end=&download=1&sel_parent_agent=165"
                          target="_blank"
                          title="Click to download XL sheet"
                        >
                          <i className="fa fa-download" />
                          &nbsp;&nbsp;Download Excel
                        </Link>{" "}
                      </u>
                      <u>
                        <Link
                          id="dwn"
                          className="btn btn-dark btn-sm form-group"
                          to="/tms/loyalty_tier.php?action=loyaltyReport&run=1&loyaltyTierId=&agentId=&subAgentAgency=&subAgentFilter=&sel_branch=&typeOption=earn&redemption_date_start=&redemption_date_end=&print=1"
                          target="_blank"
                          title
                        >
                          <i className="fa fa-print" />
                          &nbsp;Print
                        </Link>{" "}
                      </u>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="table-responsive" style={{ marginLeft: "-50px" }}>
                <table
                  width="100%"
                  cellPadding={5}
                  border={0}
                  style={{ fontSize: "13px", marginBottom: "0px" }}
                  className="table table-responsive"
                >
                  <tbody className="bg-white">
                    <tr align="left">
                      <td>
                        <Link
                          className="unique_agent"
                          onClick={toggleData1Visibility}
                          data-unique={165}
                          style={{ textDecoration: "none" }}
                        >
                          <img src={plus} alt="plusi" />
                        </Link>{" "}
                        &nbsp;Comp[CD0165-sub_loyalty][Sub Agent]
                      </td>
                      <td>LOYALTY TIER ASSIGNED : &nbsp;Nida_Tier_Test </td>
                      <td>AVAILABLE POINTS :&nbsp;1808.42</td>
                      <td>POINTS REDEEMED TILL NOW :&nbsp;1530.778</td>
                      <td>TOTAL POINTS EARNED :&nbsp;3339.198</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div
                className="datapop data_1 table-responsive"
                style={{ display: isData1Visible ? "block" : "none" }}
              >
                <table
                  width="98%"
                  border={0}
                  cellSpacing={0}
                  cellPadding={0}
                  className="table table-responsive dataTable table-bordered   alignTbl"
                >
                  <thead>
                    <tr className="row_header">
                      <th
                        align="center"
                        className="bold padd_5 brdr"
                        width={15}
                      >
                        #
                      </th>
                      <th align="center" className="bold padd_5 brdr">
                        Booking ID
                      </th>
                      <th align="center" className="bold padd_5 brdr">
                        Booking Amount
                      </th>
                      <th align="center" className="bold padd_5 brdr">
                        Points Earned
                      </th>
                      <th align="center" className="bold padd_5 brdr">
                        Redemption Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    <tr className="phps_row_0">
                      <td align="center" className="brdr" width={15}>
                        1
                      </td>
                      <td height="20px" align="center" className="brdr">
                        <Link
                          title="Online Booking"
                          data-toggle="tooltip"
                          data-placement="top"
                          to="booking_detail.php?booking_id=2244&reservationId=OT1994&service=hotel#TD1802244"
                        >
                          TD1802244{" "}
                        </Link>
                      </td>
                      <td align="center" className="brdr">
                        13640.95 &nbsp;&nbsp; INR
                      </td>
                      <td align="center" className="brdr">
                        682.047
                      </td>
                      <td align="center" className="brdr">
                        18-Jun-2019
                      </td>
                    </tr>
                    <tr className="phps_row_0">
                      <td align="center" className="brdr" width={15}>
                        2
                      </td>
                      <td height="20px" align="center" className="brdr">
                        <Link
                          title="Online Booking"
                          data-toggle="tooltip"
                          data-placement="top"
                          to="booking_detail.php?booking_id=2243&reservationId=OT1992&service=hotel#TD1602243"
                        >
                          TD1602243{" "}
                        </Link>
                      </td>
                      <td align="center" className="brdr">
                        920.263 &nbsp;&nbsp; INR
                      </td>
                      <td align="center" className="brdr">
                        9.203
                      </td>
                      <td align="center" className="brdr">
                        13-May-2019
                      </td>
                    </tr>
                    <tr className="phps_row_0">
                      <td align="center" className="brdr" width={15}>
                        3
                      </td>
                      <td height="20px" align="center" className="brdr">
                        <Link
                          title="Online Booking"
                          data-toggle="tooltip"
                          data-placement="top"
                          to="booking_detail.php?booking_id=2247&reservationId=OT1996&service=hotel#TD1802247"
                        >
                          TD1802247{" "}
                        </Link>
                      </td>
                      <td align="center" className="brdr">
                        13640.95 &nbsp;&nbsp; INR
                      </td>
                      <td align="center" className="brdr">
                        682.047
                      </td>
                      <td align="center" className="brdr">
                        18-Jun-2019
                      </td>
                    </tr>
                    <tr className="phps_row_0">
                      <td align="center" className="brdr" width={15}>
                        4
                      </td>
                      <td height="20px" align="center" className="brdr">
                        <Link
                          title="Online Booking"
                          data-toggle="tooltip"
                          data-placement="top"
                          to="booking_detail.php?booking_id=2248&reservationId=OT1997&service=hotel#TD1802248"
                        >
                          TD1802248{" "}
                        </Link>
                      </td>
                      <td align="center" className="brdr">
                        13640.95 &nbsp;&nbsp; INR
                      </td>
                      <td align="center" className="brdr">
                        682.047
                      </td>
                      <td align="center" className="brdr">
                        18-Jun-2019
                      </td>
                    </tr>
                    <tr className="phps_row_0">
                      <td align="center" className="brdr" width={15}>
                        5
                      </td>
                      <td height="20px" align="center" className="brdr">
                        <Link
                          title="Online Booking"
                          data-toggle="tooltip"
                          data-placement="top"
                          to="booking_detail.php?booking_id=2252&reservationId=OT2001&service=hotel#TD1802252"
                        >
                          TD1802252{" "}
                        </Link>
                      </td>
                      <td align="center" className="brdr">
                        13640.95 &nbsp;&nbsp; INR
                      </td>
                      <td align="center" className="brdr">
                        682.047
                      </td>
                      <td align="center" className="brdr">
                        18-Jun-2019
                      </td>
                    </tr>
                    <tr className="phps_row_0">
                      <td align="center" className="brdr" width={15}>
                        6
                      </td>
                      <td height="20px" align="center" className="brdr">
                        <Link
                          title="Online Booking"
                          data-toggle="tooltip"
                          data-placement="top"
                          to="booking_detail.php?booking_id=2305&reservationId=OT2080&service=hotel#TD1802305"
                        >
                          TD1802305{" "}
                        </Link>
                      </td>
                      <td align="center" className="brdr">
                        12036.13 &nbsp;&nbsp; INR
                      </td>
                      <td align="center" className="brdr">
                        601.807
                      </td>
                      <td align="center" className="brdr">
                        18-Jun-2019
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="table-responsive" style={{ marginLeft: "-64px" }}>
                <table
                  width="100%"
                  cellPadding={5}
                  border={0}
                  style={{ fontSize: "13px", marginBottom: "0px" }}
                  className="table table-responsive"
                >
                  <tbody className="bg-white">
                    <tr align="left">
                      <td>
                        <Link
                          className="unique_agent"
                          onClick={toggleData1Visibility1}
                          data-unique={164}
                          style={{ textDecoration: "none" }}
                        >
                          <img src={plus} alt="plusi" />
                        </Link>{" "}
                        &nbsp;Main[CD0164-loyal_main][Main Agent]
                      </td>
                      <td>LOYALTY TIER ASSIGNED : &nbsp;Nida_Tier_Test </td>
                      <td>AVAILABLE POINTS :&nbsp;0</td>
                      <td>POINTS REDEEMED TILL NOW :&nbsp;8.953</td>
                      <td>TOTAL POINTS EARNED :&nbsp;8.953</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div
                className="datapop data_2 table-responsive"
                style={{ display: isData1Visible1 ? "block" : "none" }}
              >
                <table
                  width="98%"
                  border={0}
                  cellSpacing={0}
                  cellPadding={0}
                  className="table table-responsive dataTable table-bordered   alignTbl"
                >
                  <thead>
                    <tr className="row_header">
                      <th
                        align="center"
                        className="bold padd_5 brdr"
                        width={15}
                      >
                        #
                      </th>
                      <th align="center" className="bold padd_5 brdr">
                        Booking ID
                      </th>
                      <th align="center" className="bold padd_5 brdr">
                        Booking Amount
                      </th>
                      <th align="center" className="bold padd_5 brdr">
                        Points Earned
                      </th>
                      <th align="center" className="bold padd_5 brdr">
                        Redemption Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    <tr className="phps_row_0">
                      <td align="center" className="brdr" width={15}>
                        1
                      </td>
                      <td height="20px" align="center" className="brdr">
                        <Link
                          title="Online Booking"
                          data-toggle="tooltip"
                          data-placement="top"
                          to="booking_detail.php?booking_id=2229&reservationId=OT1979&service=hotel#TD1602229"
                        >
                          TD1602229{" "}
                        </Link>
                      </td>
                      <td align="center" className="brdr">
                        895.27 &nbsp;&nbsp; INR
                      </td>
                      <td align="center" className="brdr">
                        8.953
                      </td>
                      <td align="center" className="brdr" />
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="table-responsive" style={{ marginLeft: "-58px" }}>
                <table
                  width="100%"
                  cellPadding={5}
                  border={0}
                  style={{ fontSize: "13px", marginBottom: "0px" }}
                  className="table table-responsive"
                >
                  <tbody className="bg-white">
                    <tr align="left">
                      <td>
                        <Link
                          className="unique_agent"
                          onClick={toggleData1Visibility2}
                          data-unique={162}
                          style={{ textDecoration: "none" }}
                        >
                          <img src={plus} alt="plusi" />
                        </Link>{" "}
                        &nbsp;Agent[CD0162-NewAgent][Abc Xyz]
                      </td>
                      <td>LOYALTY TIER ASSIGNED : &nbsp;Mtest_tier1 </td>
                      <td>AVAILABLE POINTS :&nbsp;5.557</td>
                      <td>POINTS REDEEMED TILL NOW :&nbsp;65.506</td>
                      <td>TOTAL POINTS EARNED :&nbsp;71.063</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div
                className="datapop data_3 table-responsive"
                style={{ display: isData1Visible2 ? "block" : "none" }}
              >
                <table
                  width="98%"
                  border={0}
                  cellSpacing={0}
                  cellPadding={0}
                  className="table table-responsive dataTable table-bordered   alignTbl"
                >
                  <thead>
                    <tr className="row_header">
                      <th
                        align="center"
                        className="bold padd_5 brdr"
                        width={15}
                      >
                        #
                      </th>
                      <th align="center" className="bold padd_5 brdr">
                        Booking ID
                      </th>
                      <th align="center" className="bold padd_5 brdr">
                        Booking Amount
                      </th>
                      <th align="center" className="bold padd_5 brdr">
                        Points Earned
                      </th>
                      <th align="center" className="bold padd_5 brdr">
                        Redemption Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    <tr className="phps_row_0">
                      <td align="center" className="brdr" width={15}>
                        1
                      </td>
                      <td height="20px" align="center" className="brdr">
                        <Link
                          title="Online Booking"
                          data-toggle="tooltip"
                          data-placement="top"
                          to="booking_detail.php?booking_id=2224&reservationId=OT1962&service=hotel#02224"
                        >
                          02224{" "}
                        </Link>
                      </td>
                      <td align="center" className="brdr">
                        42.25 &nbsp;&nbsp; USD
                      </td>
                      <td align="center" className="brdr">
                        4.225
                      </td>
                      <td align="center" className="brdr">
                        15-May-2019
                      </td>
                    </tr>
                    <tr className="phps_row_0">
                      <td align="center" className="brdr" width={15}>
                        2
                      </td>
                      <td height="20px" align="center" className="brdr">
                        <Link
                          title="Online Booking"
                          data-toggle="tooltip"
                          data-placement="top"
                          to="booking_detail.php?booking_id=2214&reservationId=OT1943&service=hotel#TD1602214"
                        >
                          TD1602214{" "}
                        </Link>
                      </td>
                      <td align="center" className="brdr">
                        20.48 &nbsp;&nbsp; USD
                      </td>
                      <td align="center" className="brdr">
                        2.048
                      </td>
                      <td align="center" className="brdr">
                        10-May-2019
                      </td>
                    </tr>
                    <tr className="phps_row_0">
                      <td align="center" className="brdr" width={15}>
                        3
                      </td>
                      <td height="20px" align="center" className="brdr">
                        <Link
                          title="Online Booking"
                          data-toggle="tooltip"
                          data-placement="top"
                          to="booking_detail.php?booking_id=2215&reservationId=OT1945&service=hotel#02215"
                        >
                          02215{" "}
                        </Link>
                      </td>
                      <td align="center" className="brdr">
                        45.59 &nbsp;&nbsp; USD
                      </td>
                      <td align="center" className="brdr">
                        4.559
                      </td>
                      <td align="center" className="brdr">
                        10-May-2019
                      </td>
                    </tr>
                    <tr className="phps_row_0">
                      <td align="center" className="brdr" width={15}>
                        4
                      </td>
                      <td height="20px" align="center" className="brdr">
                        <Link
                          title="Online Booking"
                          data-toggle="tooltip"
                          data-placement="top"
                          to="booking_detail.php?booking_id=2274&reservationId=OT2034&service=hotel#TD1802274"
                        >
                          TD1802274{" "}
                        </Link>
                      </td>
                      <td align="center" className="brdr">
                        183.6 &nbsp;&nbsp; USD
                      </td>
                      <td align="center" className="brdr">
                        18.36
                      </td>
                      <td align="center" className="brdr">
                        15-May-2019
                      </td>
                    </tr>
                    <tr className="phps_row_0">
                      <td align="center" className="brdr" width={15}>
                        5
                      </td>
                      <td height="20px" align="center" className="brdr">
                        <Link
                          title="Online Booking"
                          data-toggle="tooltip"
                          data-placement="top"
                          to="booking_detail.php?booking_id=2277&reservationId=OT2047&service=hotel#TD1802277"
                        >
                          TD1802277{" "}
                        </Link>
                      </td>
                      <td align="center" className="brdr">
                        208.08 &nbsp;&nbsp; USD
                      </td>
                      <td align="center" className="brdr">
                        20.808
                      </td>
                      <td align="center" className="brdr">
                        15-May-2019
                      </td>
                    </tr>
                    <tr className="phps_row_0">
                      <td align="center" className="brdr" width={15}>
                        6
                      </td>
                      <td height="20px" align="center" className="brdr">
                        <Link
                          title="Online Booking"
                          data-toggle="tooltip"
                          data-placement="top"
                          to="booking_detail.php?booking_id=2298&reservationId=OT2070&service=hotel#TD1602298"
                        >
                          TD1602298{" "}
                        </Link>
                      </td>
                      <td align="center" className="brdr">
                        65.52 &nbsp;&nbsp; USD
                      </td>
                      <td align="center" className="brdr">
                        6.552
                      </td>
                      <td align="center" className="brdr">
                        16-May-2019
                      </td>
                    </tr>
                    <tr className="phps_row_0">
                      <td align="center" className="brdr" width={15}>
                        7
                      </td>
                      <td height="20px" align="center" className="brdr">
                        <Link
                          title="Online Booking"
                          data-toggle="tooltip"
                          data-placement="top"
                          to="booking_detail.php?booking_id=2301&reservationId=OT2076&service=hotel#02301"
                        >
                          02301{" "}
                        </Link>
                      </td>
                      <td align="center" className="brdr">
                        32.35 &nbsp;&nbsp; USD
                      </td>
                      <td align="center" className="brdr">
                        3.235
                      </td>
                      <td align="center" className="brdr">
                        15-May-2019
                      </td>
                    </tr>
                    <tr className="phps_row_0">
                      <td align="center" className="brdr" width={15}>
                        8
                      </td>
                      <td height="20px" align="center" className="brdr">
                        <Link
                          title="Online Booking"
                          data-toggle="tooltip"
                          data-placement="top"
                          to="booking_detail.php?booking_id=2306&reservationId=OT2081&service=hotel#02306"
                        >
                          02306{" "}
                        </Link>
                      </td>
                      <td align="center" className="brdr">
                        53.41 &nbsp;&nbsp; USD
                      </td>
                      <td align="center" className="brdr">
                        5.341
                      </td>
                      <td align="center" className="brdr">
                        16-May-2019
                      </td>
                    </tr>
                    <tr className="phps_row_0">
                      <td align="center" className="brdr" width={15}>
                        9
                      </td>
                      <td height="20px" align="center" className="brdr">
                        <Link
                          title="Online Booking"
                          data-toggle="tooltip"
                          data-placement="top"
                          to="booking_detail.php?booking_id=2307&reservationId=OT2082&service=hotel#02307"
                        >
                          02307{" "}
                        </Link>
                      </td>
                      <td align="center" className="brdr">
                        59.35 &nbsp;&nbsp; USD
                      </td>
                      <td align="center" className="brdr">
                        5.935
                      </td>
                      <td align="center" className="brdr">
                        16-May-2019
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="table-responsive" style={{ marginLeft: "-62px" }}>
                <table
                  width="100%"
                  cellPadding={5}
                  border={0}
                  style={{ fontSize: "13px", marginBottom: "0px" }}
                  className="table table-responsive"
                >
                  <tbody className="bg-white">
                    <tr align="left">
                      <td>
                        <Link
                          className="unique_agent"
                          onClick={toggleData1Visibility3}
                          data-unique={163}
                          style={{ textDecoration: "none" }}
                        >
                          <img src={plus} alt="plusi" />
                        </Link>{" "}
                        &nbsp;Qtech[CD0163-Muser][Abc Xyz]
                      </td>
                      <td>LOYALTY TIER ASSIGNED : &nbsp;Mtest_tier1 </td>
                      <td>AVAILABLE POINTS :&nbsp;0</td>
                      <td>POINTS REDEEMED TILL NOW :&nbsp;7.008</td>
                      <td>TOTAL POINTS EARNED :&nbsp;7.008</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div
                className="datapop data_4 table-responsive"
                style={{ display: isData1Visible3 ? "block" : "none" }}
              >
                <table
                  width="98%"
                  border={0}
                  cellSpacing={0}
                  cellPadding={0}
                  className="table table-responsive dataTable table-bordered   alignTbl"
                >
                  <thead>
                    <tr className="row_header">
                      <th
                        align="center"
                        className="bold padd_5 brdr"
                        width={15}
                      >
                        #
                      </th>
                      <th align="center" className="bold padd_5 brdr">
                        Booking ID
                      </th>
                      <th align="center" className="bold padd_5 brdr">
                        Booking Amount
                      </th>
                      <th align="center" className="bold padd_5 brdr">
                        Points Earned
                      </th>
                      <th align="center" className="bold padd_5 brdr">
                        Redemption Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    <tr className="phps_row_0">
                      <td align="center" className="brdr" width={15}>
                        1
                      </td>
                      <td height="20px" align="center" className="brdr">
                        <Link
                          title="Online Booking"
                          data-toggle="tooltip"
                          data-placement="top"
                          to="booking_detail.php?booking_id=2223&reservationId=OT1961&service=hotel#02223"
                        >
                          02223{" "}
                        </Link>
                      </td>
                      <td align="center" className="brdr">
                        56.04 &nbsp;&nbsp; USD
                      </td>
                      <td align="center" className="brdr">
                        5.604
                      </td>
                      <td align="center" className="brdr">
                        10-May-2019
                      </td>
                    </tr>
                    <tr className="phps_row_0">
                      <td align="center" className="brdr" width={15}>
                        2
                      </td>
                      <td height="20px" align="center" className="brdr">
                        <Link
                          title="Online Booking"
                          data-toggle="tooltip"
                          data-placement="top"
                          to="booking_detail.php?booking_id=2269&reservationId=OT2023&service=hotel#TD1602269"
                        >
                          TD1602269{" "}
                        </Link>
                      </td>
                      <td align="center" className="brdr">
                        14.04 &nbsp;&nbsp; USD
                      </td>
                      <td align="center" className="brdr">
                        1.404
                      </td>
                      <td align="center" className="brdr">
                        18-Jun-2019
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="table-responsive" style={{ marginLeft: "-63px" }}>
                <table
                  width="100%"
                  cellPadding={5}
                  border={0}
                  style={{ fontSize: "13px", marginBottom: "0px" }}
                  className="table table-responsive"
                >
                  <tbody className="bg-white">
                    <tr align="left">
                      <td>
                        <Link
                          className="unique_agent"
                          onClick={toggleData1Visibility4}
                          data-unique={156}
                          style={{ textDecoration: "none" }}
                        >
                          <img src={plus} alt="plusi" />
                        </Link>
                        &nbsp;Qtechsoftware[CD0156-LoyaltyModule][Loyalty Agent]
                      </td>
                      <td>LOYALTY TIER ASSIGNED : &nbsp;PriyankaTest </td>
                      <td>AVAILABLE POINTS :&nbsp;0</td>
                      <td>POINTS REDEEMED TILL NOW :&nbsp;64.78</td>
                      <td>TOTAL POINTS EARNED :&nbsp;64.78</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div
                className="datapop data_5 table-responsive"
                style={{ display: isData1Visible4 ? "block" : "none" }}
              >
                <table
                  width="98%"
                  border={0}
                  cellSpacing={0}
                  cellPadding={0}
                  className="table table-responsive dataTable table-bordered   alignTbl"
                >
                  <thead>
                    <tr className="row_header">
                      <th
                        align="center"
                        className="bold padd_5 brdr"
                        width={15}
                      >
                        #
                      </th>
                      <th align="center" className="bold padd_5 brdr">
                        Booking ID
                      </th>
                      <th align="center" className="bold padd_5 brdr">
                        Booking Amount
                      </th>
                      <th align="center" className="bold padd_5 brdr">
                        Points Earned
                      </th>
                      <th align="center" className="bold padd_5 brdr">
                        Redemption Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    <tr className="phps_row_0">
                      <td align="center" className="brdr" width={15}>
                        1
                      </td>
                      <td height="20px" align="center" className="brdr">
                        <Link
                          title="Online Booking"
                          data-toggle="tooltip"
                          data-placement="top"
                          to="booking_detail.php?booking_id=2209&reservationId=OT1928&service=hotel#02209"
                        >
                          02209{" "}
                        </Link>
                      </td>
                      <td align="center" className="brdr">
                        45.42 &nbsp;&nbsp; USD
                      </td>
                      <td align="center" className="brdr">
                        45.42
                      </td>
                      <td align="center" className="brdr">
                        24-May-2019
                      </td>
                    </tr>
                    <tr className="phps_row_0">
                      <td align="center" className="brdr" width={15}>
                        2
                      </td>
                      <td height="20px" align="center" className="brdr">
                        <Link
                          title="Online Booking"
                          data-toggle="tooltip"
                          data-placement="top"
                          to="booking_detail.php?booking_id=2210&reservationId=OT1929&service=hotel#02210"
                        >
                          02210{" "}
                        </Link>
                      </td>
                      <td align="center" className="brdr">
                        19.36 &nbsp;&nbsp; USD
                      </td>
                      <td align="center" className="brdr">
                        19.36
                      </td>
                      <td align="center" className="brdr">
                        24-May-2019
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="table-responsive" style={{ marginLeft: "-54px" }}>
                <table
                  width="100%"
                  cellPadding={5}
                  border={0}
                  style={{ fontSize: "13px", marginBottom: "0px" }}
                  className="table table-responsive"
                >
                  <tbody className="bg-white">
                    <tr align="left">
                      <td>
                        <Link
                          className="unique_agent"
                          onClick={() =>
                            document
                              .querySelector(".data_6")
                              .classList.toggle("slide-toggle")
                          }
                          data-unique={161}
                          style={{ textDecoration: "none" }}
                        >
                          <img src={plus} alt="plusi" />
                        </Link>{" "}
                        &nbsp;Main[CD0161-nida_main][Main Main]
                      </td>
                      <td>LOYALTY TIER ASSIGNED : &nbsp;Nida_Tier_Test </td>
                      <td>AVAILABLE POINTS :&nbsp;130</td>
                      <td>POINTS REDEEMED TILL NOW :&nbsp;12.234</td>
                      <td>TOTAL POINTS EARNED :&nbsp;142.234</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div
                className="datapop data_6 table-responsive"
                style={{ display: "none" }}
              >
                <table
                  width="100%"
                  border={0}
                  cellSpacing={0}
                  cellPadding={0}
                  className="table table-responsive dataTable table-bordered   alignTbl"
                >
                  <thead>
                    <tr className="row_header">
                      <th
                        align="center"
                        className="bold padd_5 brdr"
                        width={15}
                      >
                        #
                      </th>
                      <th align="center" className="bold padd_5 brdr">
                        Booking ID
                      </th>
                      <th align="center" className="bold padd_5 brdr">
                        Booking Amount
                      </th>
                      <th align="center" className="bold padd_5 brdr">
                        Points Earned
                      </th>
                      <th align="center" className="bold padd_5 brdr">
                        Redemption Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    <tr className="phps_row_0">
                      <td align="center" className="brdr" width={15}>
                        1
                      </td>
                      <td height="20px" align="center" className="brdr">
                        <Link
                          title="Online Booking"
                          data-toggle="tooltip"
                          data-placement="top"
                          to="booking_detail.php?booking_id=2208&reservationId=OT1926&service=hotel#TD1602208"
                        >
                          TD1602208{" "}
                        </Link>
                      </td>
                      <td align="center" className="brdr">
                        1342.36 &nbsp;&nbsp; INR
                      </td>
                      <td align="center" className="brdr">
                        13.424
                      </td>
                      <td align="center" className="brdr">
                        10-May-2019
                      </td>
                    </tr>
                    <tr className="phps_row_0">
                      <td align="center" className="brdr" width={15}>
                        2
                      </td>
                      <td height="20px" align="center" className="brdr">
                        <Link
                          title="Online Booking"
                          data-toggle="tooltip"
                          data-placement="top"
                          to="booking_detail.php?booking_id=2205&reservationId=OT1916&service=hotel#TD1602205"
                        >
                          TD1602205{" "}
                        </Link>
                      </td>
                      <td align="center" className="brdr">
                        895.27 &nbsp;&nbsp; INR
                      </td>
                      <td align="center" className="brdr">
                        8.953
                      </td>
                      <td align="center" className="brdr">
                        10-May-2019
                      </td>
                    </tr>
                    <tr className="phps_row_0">
                      <td align="center" className="brdr" width={15}>
                        3
                      </td>
                      <td height="20px" align="center" className="brdr">
                        <Link
                          title="Online Booking"
                          data-toggle="tooltip"
                          data-placement="top"
                          to="booking_detail.php?booking_id=2204&reservationId=OT1914&service=hotel#TD1602204"
                        >
                          TD1602204{" "}
                        </Link>
                      </td>
                      <td align="center" className="brdr">
                        895.27 &nbsp;&nbsp; INR
                      </td>
                      <td align="center" className="brdr">
                        8.953
                      </td>
                      <td align="center" className="brdr">
                        10-May-2019
                      </td>
                    </tr>
                    <tr className="phps_row_0">
                      <td align="center" className="brdr" width={15}>
                        4
                      </td>
                      <td height="20px" align="center" className="brdr">
                        <Link
                          title="Online Booking"
                          data-toggle="tooltip"
                          data-placement="top"
                          to="booking_detail.php?booking_id=2201&reservationId=OT1912&service=hotel#TD1602201"
                        >
                          TD1602201{" "}
                        </Link>
                      </td>
                      <td align="center" className="brdr">
                        895.27 &nbsp;&nbsp; INR
                      </td>
                      <td align="center" className="brdr">
                        8.953
                      </td>
                      <td align="center" className="brdr">
                        09-May-2019
                      </td>
                    </tr>
                    <tr className="phps_row_0">
                      <td align="center" className="brdr" width={15}>
                        5
                      </td>
                      <td height="20px" align="center" className="brdr">
                        <Link
                          title="Online Booking"
                          data-toggle="tooltip"
                          data-placement="top"
                          to="booking_detail.php?booking_id=2198&reservationId=OT1910&service=hotel#TD1602198"
                        >
                          TD1602198{" "}
                        </Link>
                      </td>
                      <td align="center" className="brdr">
                        895.27 &nbsp;&nbsp; INR
                      </td>
                      <td align="center" className="brdr">
                        8.953
                      </td>
                      <td align="center" className="brdr">
                        09-May-2019
                      </td>
                    </tr>
                    <tr className="phps_row_0">
                      <td align="center" className="brdr" width={15}>
                        6
                      </td>
                      <td height="20px" align="center" className="brdr">
                        <Link
                          title="Online Booking"
                          data-toggle="tooltip"
                          data-placement="top"
                          to="booking_detail.php?booking_id=2640&reservationId=OT2292&service=hotel#TD902640"
                        >
                          TD902640{" "}
                        </Link>
                      </td>
                      <td align="center" className="brdr">
                        150 &nbsp;&nbsp; INR
                      </td>
                      <td align="center" className="brdr">
                        7.5
                      </td>
                      <td align="center" className="brdr">
                        18-Jun-2019
                      </td>
                    </tr>
                    <tr className="phps_row_0">
                      <td align="center" className="brdr" width={15}>
                        7
                      </td>
                      <td height="20px" align="center" className="brdr">
                        <Link
                          title="Online Booking"
                          data-toggle="tooltip"
                          data-placement="top"
                          to="booking_detail.php?booking_id=2644&reservationId=OT2293&service=hotel#TD902644"
                        >
                          TD902644{" "}
                        </Link>
                      </td>
                      <td align="center" className="brdr">
                        150 &nbsp;&nbsp; INR
                      </td>
                      <td align="center" className="brdr">
                        7.5
                      </td>
                      <td align="center" className="brdr">
                        18-Jun-2019
                      </td>
                    </tr>
                    <tr className="phps_row_0">
                      <td align="center" className="brdr" width={15}>
                        8
                      </td>
                      <td height="20px" align="center" className="brdr">
                        <Link
                          title="Online Booking"
                          data-toggle="tooltip"
                          data-placement="top"
                          to="booking_detail.php?booking_id=2656&reservationId=OT2297&service=hotel#TD802656"
                        >
                          TD802656{" "}
                        </Link>
                      </td>
                      <td align="center" className="brdr">
                        10 &nbsp;&nbsp; INR
                      </td>
                      <td align="center" className="brdr">
                        0.5
                      </td>
                      <td align="center" className="brdr">
                        18-Jun-2019
                      </td>
                    </tr>
                    <tr className="phps_row_0">
                      <td align="center" className="brdr" width={15}>
                        9
                      </td>
                      <td height="20px" align="center" className="brdr">
                        <Link
                          title="Online Booking"
                          data-toggle="tooltip"
                          data-placement="top"
                          to="booking_detail.php?booking_id=2733&reservationId=OT2350&service=hotel#TD902733"
                        >
                          TD902733{" "}
                        </Link>
                      </td>
                      <td align="center" className="brdr">
                        150 &nbsp;&nbsp; INR
                      </td>
                      <td align="center" className="brdr">
                        7.5
                      </td>
                      <td align="center" className="brdr">
                        18-Jun-2019
                      </td>
                    </tr>
                    <tr className="phps_row_0">
                      <td align="center" className="brdr" width={15}>
                        10
                      </td>
                      <td height="20px" align="center" className="brdr">
                        <Link
                          title="Online Booking"
                          data-toggle="tooltip"
                          data-placement="top"
                          to="booking_detail.php?booking_id=2772&reservationId=OT2374&service=hotel#TD802772"
                        >
                          TD802772{" "}
                        </Link>
                      </td>
                      <td align="center" className="brdr">
                        1200 &nbsp;&nbsp; INR
                      </td>
                      <td align="center" className="brdr">
                        60
                      </td>
                      <td align="center" className="brdr">
                        23-Mar-2023
                      </td>
                    </tr>
                    <tr className="phps_row_0">
                      <td align="center" className="brdr" width={15}>
                        11
                      </td>
                      <td height="20px" align="center" className="brdr">
                        <Link
                          title="Online Booking"
                          data-toggle="tooltip"
                          data-placement="top"
                          to="booking_detail.php?booking_id=2810&reservationId=OT2391&service=hotel#TD902810"
                        >
                          TD902810{" "}
                        </Link>
                      </td>
                      <td align="center" className="brdr">
                        200 &nbsp;&nbsp; INR
                      </td>
                      <td align="center" className="brdr">
                        10
                      </td>
                      <td align="center" className="brdr">
                        23-Mar-2023
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="table-responsive" style={{ marginLeft: "-45px" }}>
                <table
                  width="100%"
                  cellPadding={5}
                  border={0}
                  style={{ fontSize: "13px", marginBottom: "0px" }}
                  className="table table-responsive"
                >
                  <tbody className="bg-white">
                    <tr align="left">
                      <td>
                        <Link
                          className="unique_agent"
                          onclick="$('.data_7').slideToggle();"
                          data-unique={171}
                          style={{ textDecoration: "none" }}
                        >
                          <img src={plus} alt="plusi" />
                        </Link>{" "}
                        &nbsp;Agent[CD0171-agent_agent][Main Agent]
                      </td>
                      <td>LOYALTY TIER ASSIGNED : &nbsp;Nida_Tier_Test </td>
                      <td>AVAILABLE POINTS :&nbsp;2315.688</td>
                      <td>POINTS REDEEMED TILL NOW :&nbsp;1543.792</td>
                      <td>TOTAL POINTS EARNED :&nbsp;3859.48</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div
                className="datapop data_7 table-responsive"
                style={{ display: "none" }}
              >
                <table
                  width="100%"
                  border={0}
                  cellSpacing={0}
                  cellPadding={0}
                  className="table table-responsive dataTable table-bordered   alignTbl"
                >
                  <thead>
                    <tr className="row_header">
                      <th
                        align="center"
                        className="bold padd_5 brdr"
                        width={15}
                      >
                        #
                      </th>
                      <th align="center" className="bold padd_5 brdr">
                        Booking ID
                      </th>
                      <th align="center" className="bold padd_5 brdr">
                        Booking Amount
                      </th>
                      <th align="center" className="bold padd_5 brdr">
                        Points Earned
                      </th>
                      <th align="center" className="bold padd_5 brdr">
                        Redemption Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    <tr className="phps_row_0">
                      <td align="center" className="brdr" width={15}>
                        1
                      </td>
                      <td height="20px" align="center" className="brdr">
                        <Link
                          title="Online Booking"
                          data-toggle="tooltip"
                          data-placement="top"
                          to="booking_detail.php?booking_id=2328&reservationId=OT2103&service=hotel#TD1802328"
                        >
                          TD1802328{" "}
                        </Link>
                      </td>
                      <td align="center" className="brdr">
                        15437.92 &nbsp;&nbsp; INR
                      </td>
                      <td align="center" className="brdr">
                        771.896
                      </td>
                      <td align="center" className="brdr">
                        17-May-2019
                      </td>
                    </tr>
                    <tr className="phps_row_0">
                      <td align="center" className="brdr" width={15}>
                        2
                      </td>
                      <td height="20px" align="center" className="brdr">
                        <Link
                          title="Online Booking"
                          data-toggle="tooltip"
                          data-placement="top"
                          to="booking_detail.php?booking_id=2329&reservationId=OT2104&service=hotel#TD1802329"
                        >
                          TD1802329{" "}
                        </Link>
                      </td>
                      <td align="center" className="brdr">
                        15437.92 &nbsp;&nbsp; INR
                      </td>
                      <td align="center" className="brdr">
                        771.896
                      </td>
                      <td align="center" className="brdr">
                        17-May-2019
                      </td>
                    </tr>
                    <tr className="phps_row_0">
                      <td align="center" className="brdr" width={15}>
                        3
                      </td>
                      <td height="20px" align="center" className="brdr">
                        <Link
                          title="Online Booking"
                          data-toggle="tooltip"
                          data-placement="top"
                          to="booking_detail.php?booking_id=2331&reservationId=OT2106&service=hotel#TD1802331"
                        >
                          TD1802331{" "}
                        </Link>
                      </td>
                      <td align="center" className="brdr">
                        15437.92 &nbsp;&nbsp; INR
                      </td>
                      <td align="center" className="brdr">
                        771.896
                      </td>
                      <td align="center" className="brdr">
                        18-May-2019
                      </td>
                    </tr>
                    <tr className="phps_row_0">
                      <td align="center" className="brdr" width={15}>
                        4
                      </td>
                      <td height="20px" align="center" className="brdr">
                        <Link
                          title="Online Booking"
                          data-toggle="tooltip"
                          data-placement="top"
                          to="booking_detail.php?booking_id=2332&reservationId=OT2107&service=hotel#TD1802332"
                        >
                          TD1802332{" "}
                        </Link>
                      </td>
                      <td align="center" className="brdr">
                        15437.92 &nbsp;&nbsp; INR
                      </td>
                      <td align="center" className="brdr">
                        771.896
                      </td>
                      <td align="center" className="brdr">
                        18-May-2019
                      </td>
                    </tr>
                    <tr className="phps_row_0">
                      <td align="center" className="brdr" width={15}>
                        5
                      </td>
                      <td height="20px" align="center" className="brdr">
                        <Link
                          title="Online Booking"
                          data-toggle="tooltip"
                          data-placement="top"
                          to="booking_detail.php?booking_id=2333&reservationId=OT2109&service=hotel#TD1802333"
                        >
                          TD1802333{" "}
                        </Link>
                      </td>
                      <td align="center" className="brdr">
                        15437.92 &nbsp;&nbsp; INR
                      </td>
                      <td align="center" className="brdr">
                        771.896
                      </td>
                      <td align="center" className="brdr">
                        18-Jun-2019
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="table-responsive" style={{ marginLeft: "-41px" }}>
                <table
                  width="100%"
                  cellPadding={5}
                  border={0}
                  style={{ fontSize: "13px", marginBottom: "0px" }}
                  className="table table-responsive"
                >
                  <tbody className="bg-white">
                    <tr align="left">
                      <td>
                        <Link
                          className="unique_agent"
                          onclick="$('.data_8').slideToggle();"
                          data-unique={172}
                          style={{ textDecoration: "none" }}
                        >
                          <img src={plus} alt="plusi" />
                        </Link>
                        &nbsp;Agentt[CD0172-agentt_agentt][Agentt Agentt]
                      </td>
                      <td>LOYALTY TIER ASSIGNED : &nbsp;Nida_Tier_Test </td>
                      <td>AVAILABLE POINTS :&nbsp;4937.476</td>
                      <td>POINTS REDEEMED TILL NOW :&nbsp;-1928.441</td>
                      <td>TOTAL POINTS EARNED :&nbsp;3009.035</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div
                className="datapop data_8 table-responsive"
                style={{ display: "none" }}
              >
                <table
                  width="98%"
                  border={0}
                  cellSpacing={0}
                  cellPadding={0}
                  className="table table-responsive dataTable table-bordered   alignTbl"
                >
                  <thead>
                    <tr className="row_header">
                      <th
                        align="center"
                        className="bold padd_5 brdr"
                        width={15}
                      >
                        #
                      </th>
                      <th align="center" className="bold padd_5 brdr">
                        Booking ID
                      </th>
                      <th align="center" className="bold padd_5 brdr">
                        Booking Amount
                      </th>
                      <th align="center" className="bold padd_5 brdr">
                        Points Earned
                      </th>
                      <th align="center" className="bold padd_5 brdr">
                        Redemption Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    <tr className="phps_row_0">
                      <td align="center" className="brdr" width={15}>
                        1
                      </td>
                      <td height="20px" align="center" className="brdr">
                        <Link
                          title="Online Booking"
                          data-toggle="tooltip"
                          data-placement="top"
                          to="booking_detail.php?booking_id=2334&reservationId=OT2110&service=hotel#TD1802334"
                        >
                          TD1802334{" "}
                        </Link>
                      </td>
                      <td align="center" className="brdr">
                        12036.13 &nbsp;&nbsp; INR
                      </td>
                      <td align="center" className="brdr">
                        601.807
                      </td>
                      <td align="center" className="brdr">
                        17-May-2019
                      </td>
                    </tr>
                    <tr className="phps_row_0">
                      <td align="center" className="brdr" width={15}>
                        2
                      </td>
                      <td height="20px" align="center" className="brdr">
                        <Link
                          title="Online Booking"
                          data-toggle="tooltip"
                          data-placement="top"
                          to="booking_detail.php?booking_id=2335&reservationId=OT2111&service=hotel#TD1802335"
                        >
                          TD1802335{" "}
                        </Link>
                      </td>
                      <td align="center" className="brdr">
                        12036.13 &nbsp;&nbsp; INR
                      </td>
                      <td align="center" className="brdr">
                        601.807
                      </td>
                      <td align="center" className="brdr">
                        17-May-2019
                      </td>
                    </tr>
                    <tr className="phps_row_0">
                      <td align="center" className="brdr" width={15}>
                        3
                      </td>
                      <td height="20px" align="center" className="brdr">
                        <Link
                          title="Online Booking"
                          data-toggle="tooltip"
                          data-placement="top"
                          to="booking_detail.php?booking_id=2336&reservationId=OT2112&service=hotel#TD1802336"
                        >
                          TD1802336{" "}
                        </Link>
                      </td>
                      <td align="center" className="brdr">
                        12036.13 &nbsp;&nbsp; INR
                      </td>
                      <td align="center" className="brdr">
                        601.807
                      </td>
                      <td align="center" className="brdr">
                        18-May-2019
                      </td>
                    </tr>
                    <tr className="phps_row_0">
                      <td align="center" className="brdr" width={15}>
                        4
                      </td>
                      <td height="20px" align="center" className="brdr">
                        <Link
                          title="Online Booking"
                          data-toggle="tooltip"
                          data-placement="top"
                          to="booking_detail.php?booking_id=2356&reservationId=OT2132&service=hotel#TD1802356"
                        >
                          TD1802356{" "}
                        </Link>
                      </td>
                      <td align="center" className="brdr">
                        12036.13 &nbsp;&nbsp; INR
                      </td>
                      <td align="center" className="brdr">
                        601.807
                      </td>
                      <td align="center" className="brdr">
                        22-May-2019
                      </td>
                    </tr>
                    <tr className="phps_row_0">
                      <td align="center" className="brdr" width={15}>
                        5
                      </td>
                      <td height="20px" align="center" className="brdr">
                        <Link
                          title="Online Booking"
                          data-toggle="tooltip"
                          data-placement="top"
                          to="booking_detail.php?booking_id=2361&reservationId=OT2137&service=hotel#TD1802361"
                        >
                          TD1802361{" "}
                        </Link>
                      </td>
                      <td align="center" className="brdr">
                        12036.13 &nbsp;&nbsp; INR
                      </td>
                      <td align="center" className="brdr">
                        601.807
                      </td>
                      <td align="center" className="brdr">
                        18-Jun-2019
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="table-responsive" style={{ marginLeft: "-59px" }}>
                <table
                  width="100%"
                  cellPadding={5}
                  border={0}
                  style={{ fontSize: "13px", marginBottom: "0px" }}
                  className="table table-responsive"
                >
                  <tbody className="bg-white">
                    <tr align="left">
                      <td>
                        <Link
                          className="unique_agent"
                          onclick="$('.data_9').slideToggle();"
                          data-unique={173}
                          style={{ textDecoration: "none" }}
                        >
                          <img src={plus} alt="plusi" />
                        </Link>{" "}
                        &nbsp;Qtech[CD0173-AgentMin][Abc Xyz]
                      </td>
                      <td>LOYALTY TIER ASSIGNED : &nbsp;New </td>
                      <td>AVAILABLE POINTS :&nbsp;266.445</td>
                      <td>POINTS REDEEMED TILL NOW :&nbsp;71.61</td>
                      <td>TOTAL POINTS EARNED :&nbsp;338.055</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div
                className="datapop data_9 table-responsive"
                style={{ display: "none" }}
              >
                <table
                  width="98%"
                  border={0}
                  cellSpacing={0}
                  cellPadding={0}
                  className="table table-responsive dataTable table-bordered   alignTbl"
                >
                  <thead>
                    <tr className="row_header">
                      <th
                        align="center"
                        className="bold padd_5 brdr"
                        width={15}
                      >
                        #
                      </th>
                      <th align="center" className="bold padd_5 brdr">
                        Booking ID
                      </th>
                      <th align="center" className="bold padd_5 brdr">
                        Booking Amount
                      </th>
                      <th align="center" className="bold padd_5 brdr">
                        Points Earned
                      </th>
                      <th align="center" className="bold padd_5 brdr">
                        Redemption Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    <tr className="phps_row_0">
                      <td align="center" className="brdr" width={15}>
                        1
                      </td>
                      <td height="20px" align="center" className="brdr">
                        <Link
                          title="Online Booking"
                          data-toggle="tooltip"
                          data-placement="top"
                          to="booking_detail.php?booking_id=2344&reservationId=OT2120&service=hotel#02344"
                        >
                          02344{" "}
                        </Link>
                      </td>
                      <td align="center" className="brdr">
                        125.81 &nbsp;&nbsp; SAR
                      </td>
                      <td align="center" className="brdr">
                        62.905
                      </td>
                      <td align="center" className="brdr">
                        18-May-2019
                      </td>
                    </tr>
                    <tr className="phps_row_0">
                      <td align="center" className="brdr" width={15}>
                        2
                      </td>
                      <td height="20px" align="center" className="brdr">
                        <Link
                          title="Online Booking"
                          data-toggle="tooltip"
                          data-placement="top"
                          to="booking_detail.php?booking_id=2346&reservationId=OT2122&service=hotel#02346"
                        >
                          02346{" "}
                        </Link>
                      </td>
                      <td align="center" className="brdr">
                        125.81 &nbsp;&nbsp; SAR
                      </td>
                      <td align="center" className="brdr">
                        62.905
                      </td>
                      <td align="center" className="brdr">
                        18-May-2019
                      </td>
                    </tr>
                    <tr className="phps_row_0">
                      <td align="center" className="brdr" width={15}>
                        3
                      </td>
                      <td height="20px" align="center" className="brdr">
                        <Link
                          title="Online Booking"
                          data-toggle="tooltip"
                          data-placement="top"
                          to="booking_detail.php?booking_id=2347&reservationId=OT2123&service=hotel#02347"
                        >
                          02347{" "}
                        </Link>
                      </td>
                      <td align="center" className="brdr">
                        160.28 &nbsp;&nbsp; SAR
                      </td>
                      <td align="center" className="brdr">
                        80.14
                      </td>
                      <td align="center" className="brdr">
                        18-May-2019
                      </td>
                    </tr>
                    <tr className="phps_row_0">
                      <td align="center" className="brdr" width={15}>
                        4
                      </td>
                      <td height="20px" align="center" className="brdr">
                        <Link
                          title="Online Booking"
                          data-toggle="tooltip"
                          data-placement="top"
                          to="booking_detail.php?booking_id=2355&reservationId=OT2131&service=hotel#02355"
                        >
                          02355{" "}
                        </Link>
                      </td>
                      <td align="center" className="brdr">
                        138.4 &nbsp;&nbsp; SAR
                      </td>
                      <td align="center" className="brdr">
                        69.2
                      </td>
                      <td align="center" className="brdr">
                        18-May-2019
                      </td>
                    </tr>
                    <tr className="phps_row_0">
                      <td align="center" className="brdr" width={15}>
                        5
                      </td>
                      <td height="20px" align="center" className="brdr">
                        <Link
                          title="Online Booking"
                          data-toggle="tooltip"
                          data-placement="top"
                          to="booking_detail.php?booking_id=2358&reservationId=OT2134&service=hotel#02358"
                        >
                          02358{" "}
                        </Link>
                      </td>
                      <td align="center" className="brdr">
                        125.81 &nbsp;&nbsp; SAR
                      </td>
                      <td align="center" className="brdr">
                        62.905
                      </td>
                      <td align="center" className="brdr">
                        18-May-2019
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="table-responsive" style={{ marginLeft: "-42px" }}>
                <table
                  width="100%"
                  cellPadding={5}
                  border={0}
                  style={{ fontSize: "13px", marginBottom: "0px" }}
                  className="table table-responsive"
                >
                  <tbody className="bg-white">
                    <tr align="left">
                      <td>
                        <Link
                          className="unique_agent"
                          onclick="$('.data_10').slideToggle();"
                          data-unique={2}
                          style={{ textDecoration: "none" }}
                        >
                          <img src={plus} alt="plusi" />
                        </Link>{" "}
                        &nbsp;Neeraj[CD0002-neeraj][Neeraj Yadav]
                      </td>
                      <td>LOYALTY TIER ASSIGNED : &nbsp;Nida_Tier_Test </td>
                      <td>AVAILABLE POINTS :&nbsp;7629.864</td>
                      <td>POINTS REDEEMED TILL NOW :&nbsp;-999.987</td>
                      <td>TOTAL POINTS EARNED :&nbsp;6629.877</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div
                className="datapop data_10 table-responsive"
                style={{ display: "none" }}
              >
                <table
                  width="98%"
                  border={0}
                  cellSpacing={0}
                  cellPadding={0}
                  className="table table-responsive dataTable table-bordered   alignTbl"
                >
                  <thead>
                    <tr className="row_header">
                      <th
                        align="center"
                        className="bold padd_5 brdr"
                        width={15}
                      >
                        #
                      </th>
                      <th align="center" className="bold padd_5 brdr">
                        Booking ID
                      </th>
                      <th align="center" className="bold padd_5 brdr">
                        Booking Amount
                      </th>
                      <th align="center" className="bold padd_5 brdr">
                        Points Earned
                      </th>
                      <th align="center" className="bold padd_5 brdr">
                        Redemption Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    <tr className="phps_row_0">
                      <td align="center" className="brdr" width={15}>
                        1
                      </td>
                      <td height="20px" align="center" className="brdr">
                        <Link
                          title="Online Booking"
                          data-toggle="tooltip"
                          data-placement="top"
                          to="booking_detail.php?booking_id=2393&reservationId=OT2169&service=hotel#TD1802393"
                        >
                          TD1802393{" "}
                        </Link>
                      </td>
                      <td align="center" className="brdr">
                        12036.13 &nbsp;&nbsp; INR
                      </td>
                      <td align="center" className="brdr">
                        601.807
                      </td>
                      <td align="center" className="brdr">
                        22-May-2019
                      </td>
                    </tr>
                    <tr className="phps_row_0">
                      <td align="center" className="brdr" width={15}>
                        2
                      </td>
                      <td height="20px" align="center" className="brdr">
                        <Link
                          title="Online Booking"
                          data-toggle="tooltip"
                          data-placement="top"
                          to="booking_detail.php?booking_id=2394&reservationId=OT2170&service=hotel#TD1802394"
                        >
                          TD1802394{" "}
                        </Link>
                      </td>
                      <td align="center" className="brdr">
                        12036.13 &nbsp;&nbsp; INR
                      </td>
                      <td align="center" className="brdr">
                        601.807
                      </td>
                      <td align="center" className="brdr">
                        22-May-2019
                      </td>
                    </tr>
                    <tr className="phps_row_0">
                      <td align="center" className="brdr" width={15}>
                        3
                      </td>
                      <td height="20px" align="center" className="brdr">
                        <Link
                          title="Online Booking"
                          data-toggle="tooltip"
                          data-placement="top"
                          to="booking_detail.php?booking_id=2392&reservationId=OT2168&service=hotel#TD1802392"
                        >
                          TD1802392{" "}
                        </Link>
                      </td>
                      <td align="center" className="brdr">
                        12036.13 &nbsp;&nbsp; INR
                      </td>
                      <td align="center" className="brdr">
                        601.807
                      </td>
                      <td align="center" className="brdr">
                        22-May-2019
                      </td>
                    </tr>
                    <tr className="phps_row_0">
                      <td align="center" className="brdr" width={15}>
                        4
                      </td>
                      <td height="20px" align="center" className="brdr">
                        <Link
                          title="Online Booking"
                          data-toggle="tooltip"
                          data-placement="top"
                          to="booking_detail.php?booking_id=2348&reservationId=OT2124&service=hotel#TD1802348"
                        >
                          TD1802348{" "}
                        </Link>
                      </td>
                      <td align="center" className="brdr">
                        12036.13 &nbsp;&nbsp; INR
                      </td>
                      <td align="center" className="brdr">
                        601.807
                      </td>
                      <td align="center" className="brdr">
                        18-May-2019
                      </td>
                    </tr>
                    <tr className="phps_row_0">
                      <td align="center" className="brdr" width={15}>
                        5
                      </td>
                      <td height="20px" align="center" className="brdr">
                        <Link
                          title="Online Booking"
                          data-toggle="tooltip"
                          data-placement="top"
                          to="booking_detail.php?booking_id=2390&reservationId=OT2166&service=hotel#TD1802390"
                        >
                          TD1802390{" "}
                        </Link>
                      </td>
                      <td align="center" className="brdr">
                        12036.13 &nbsp;&nbsp; INR
                      </td>
                      <td align="center" className="brdr">
                        601.807
                      </td>
                      <td align="center" className="brdr">
                        22-May-2019
                      </td>
                    </tr>
                    <tr className="phps_row_0">
                      <td align="center" className="brdr" width={15}>
                        6
                      </td>
                      <td height="20px" align="center" className="brdr">
                        <Link
                          title="Online Booking"
                          data-toggle="tooltip"
                          data-placement="top"
                          to="booking_detail.php?booking_id=2360&reservationId=OT2136&service=hotel#TD1802360"
                        >
                          TD1802360{" "}
                        </Link>
                      </td>
                      <td align="center" className="brdr">
                        12036.13 &nbsp;&nbsp; INR
                      </td>
                      <td align="center" className="brdr">
                        601.807
                      </td>
                      <td align="center" className="brdr">
                        18-Jun-2019
                      </td>
                    </tr>
                    <tr className="phps_row_0">
                      <td align="center" className="brdr" width={15}>
                        7
                      </td>
                      <td height="20px" align="center" className="brdr">
                        <Link
                          title="Online Booking"
                          data-toggle="tooltip"
                          data-placement="top"
                          to="booking_detail.php?booking_id=2397&reservationId=OT2173&service=hotel#TD1802397"
                        >
                          TD1802397{" "}
                        </Link>
                      </td>
                      <td align="center" className="brdr">
                        12036.13 &nbsp;&nbsp; INR
                      </td>
                      <td align="center" className="brdr">
                        601.807
                      </td>
                      <td align="center" className="brdr">
                        22-May-2019
                      </td>
                    </tr>
                    <tr className="phps_row_0">
                      <td align="center" className="brdr" width={15}>
                        8
                      </td>
                      <td height="20px" align="center" className="brdr">
                        <Link
                          title="Online Booking"
                          data-toggle="tooltip"
                          data-placement="top"
                          to="booking_detail.php?booking_id=2398&reservationId=OT2174&service=hotel#TD1802398"
                        >
                          TD1802398{" "}
                        </Link>
                      </td>
                      <td align="center" className="brdr">
                        12036.13 &nbsp;&nbsp; INR
                      </td>
                      <td align="center" className="brdr">
                        601.807
                      </td>
                      <td align="center" className="brdr">
                        22-May-2019
                      </td>
                    </tr>
                    <tr className="phps_row_0">
                      <td align="center" className="brdr" width={15}>
                        9
                      </td>
                      <td height="20px" align="center" className="brdr">
                        <Link
                          title="Online Booking"
                          data-toggle="tooltip"
                          data-placement="top"
                          to="booking_detail.php?booking_id=2400&reservationId=OT2176&service=hotel#TD1802400"
                        >
                          TD1802400{" "}
                        </Link>
                      </td>
                      <td align="center" className="brdr">
                        12036.13 &nbsp;&nbsp; INR
                      </td>
                      <td align="center" className="brdr">
                        601.807
                      </td>
                      <td align="center" className="brdr">
                        22-May-2019
                      </td>
                    </tr>
                    <tr className="phps_row_0">
                      <td align="center" className="brdr" width={15}>
                        10
                      </td>
                      <td height="20px" align="center" className="brdr">
                        <Link
                          title="Online Booking"
                          data-toggle="tooltip"
                          data-placement="top"
                          to="booking_detail.php?booking_id=2407&reservationId=OT2183&service=hotel#TD1802407"
                        >
                          TD1802407{" "}
                        </Link>
                      </td>
                      <td align="center" className="brdr">
                        12036.13 &nbsp;&nbsp; INR
                      </td>
                      <td align="center" className="brdr">
                        601.807
                      </td>
                      <td align="center" className="brdr">
                        24-May-2019
                      </td>
                    </tr>
                    <tr className="phps_row_0">
                      <td align="center" className="brdr" width={15}>
                        11
                      </td>
                      <td height="20px" align="center" className="brdr">
                        <Link
                          title="Online Booking"
                          data-toggle="tooltip"
                          data-placement="top"
                          to="booking_detail.php?booking_id=2408&reservationId=OT2184&service=hotel#TD1802408"
                        >
                          TD1802408{" "}
                        </Link>
                      </td>
                      <td align="center" className="brdr">
                        12036.13 &nbsp;&nbsp; INR
                      </td>
                      <td align="center" className="brdr">
                        601.807
                      </td>
                      <td align="center" className="brdr">
                        24-May-2019
                      </td>
                    </tr>
                    <tr className="phps_row_0">
                      <td align="center" className="brdr" width={15}>
                        12
                      </td>
                      <td height="20px" align="center" className="brdr">
                        <Link
                          title="Online Booking"
                          data-toggle="tooltip"
                          data-placement="top"
                          to="booking_detail.php?booking_id=2814&reservationId=OT2392&service=hotel#TD902814"
                        >
                          TD902814{" "}
                        </Link>
                      </td>
                      <td align="center" className="brdr">
                        200 &nbsp;&nbsp; INR
                      </td>
                      <td align="center" className="brdr">
                        10
                      </td>
                      <td align="center" className="brdr">
                        23-Mar-2023
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="table-responsive" style={{ marginLeft: "-60px" }}>
                <table
                  width="100%"
                  cellPadding={5}
                  border={0}
                  style={{ fontSize: "13px", marginBottom: "0px" }}
                  className="table table-responsive"
                >
                  <tbody className="bg-white">
                    <tr align="left">
                      <td>
                        <Link
                          className="unique_agent"
                          onclick="$('.data_11').slideToggle();"
                          data-unique={174}
                          style={{ textDecoration: "none" }}
                        >
                          <img src={plus} alt="plusi" />
                        </Link>
                        &nbsp;Qtech[CD0174-Agent_Loyal][Loyalty Module]
                      </td>
                      <td>LOYALTY TIER ASSIGNED : &nbsp;Loyal_tier </td>
                      <td>AVAILABLE POINTS :&nbsp;0</td>
                      <td>POINTS REDEEMED TILL NOW :&nbsp;261.05</td>
                      <td>TOTAL POINTS EARNED :&nbsp;261.05</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div
                className="datapop data_11 table-responsive"
                style={{ display: "none" }}
              >
                <table
                  width="100%"
                  border={0}
                  cellSpacing={0}
                  cellPadding={0}
                  className="table table-responsive dataTable table-bordered   alignTbl"
                >
                  <thead>
                    <tr className="row_header">
                      <th
                        align="center"
                        className="bold padd_5 brdr"
                        width={15}
                      >
                        #
                      </th>
                      <th align="center" className="bold padd_5 brdr">
                        Booking ID
                      </th>
                      <th align="center" className="bold padd_5 brdr">
                        Booking Amount
                      </th>
                      <th align="center" className="bold padd_5 brdr">
                        Points Earned
                      </th>
                      <th align="center" className="bold padd_5 brdr">
                        Redemption Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    <tr className="phps_row_0">
                      <td align="center" className="brdr" width={15}>
                        1
                      </td>
                      <td height="20px" align="center" className="brdr">
                        <Link
                          title="Online Booking"
                          data-toggle="tooltip"
                          data-placement="top"
                          to="booking_detail.php?booking_id=2414&reservationId=OT2190&service=hotel#TD1802414"
                        >
                          TD1802414{" "}
                        </Link>
                      </td>
                      <td align="center" className="brdr">
                        13052.52 &nbsp;&nbsp; INR
                      </td>
                      <td align="center" className="brdr">
                        130.525
                      </td>
                      <td align="center" className="brdr">
                        24-May-2019
                      </td>
                    </tr>
                    <tr className="phps_row_0">
                      <td align="center" className="brdr" width={15}>
                        2
                      </td>
                      <td height="20px" align="center" className="brdr">
                        <Link
                          title="Online Booking"
                          data-toggle="tooltip"
                          data-placement="top"
                          to="booking_detail.php?booking_id=2419&reservationId=OT2195&service=hotel#TD1802419"
                        >
                          TD1802419{" "}
                        </Link>
                      </td>
                      <td align="center" className="brdr">
                        13052.52 &nbsp;&nbsp; INR
                      </td>
                      <td align="center" className="brdr">
                        130.525
                      </td>
                      <td align="center" className="brdr">
                        24-May-2019
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="table-responsive" style={{ marginLeft: "-62px" }}>
                <table
                  width="100%"
                  cellPadding={5}
                  border={0}
                  style={{ fontSize: "13px", marginBottom: "0px" }}
                  className="table table-responsive"
                >
                  <tbody className="bg-white">
                    <tr align="left">
                      <td>
                        <Link
                          className="unique_agent"
                          onclick="$('.data_12').slideToggle();"
                          data-unique={182}
                          style={{ textDecoration: "none" }}
                        >
                          <img src={plus} alt="plusi" />
                        </Link>
                        &nbsp;Qtech[CD0182-snehal06][SnehalTest Test]
                      </td>
                      <td>LOYALTY TIER ASSIGNED : &nbsp;Gold-Test </td>
                      <td>AVAILABLE POINTS :&nbsp;0</td>
                      <td>POINTS REDEEMED TILL NOW :&nbsp;3.568</td>
                      <td>TOTAL POINTS EARNED :&nbsp;3.568</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div
                className="datapop data_12 table-responsive"
                style={{ display: "none" }}
              >
                <table
                  width="98%"
                  border={0}
                  cellSpacing={0}
                  cellPadding={0}
                  className="table table-responsive dataTable table-bordered   alignTbl"
                >
                  <thead>
                    <tr className="row_header">
                      <th
                        align="center"
                        className="bold padd_5 brdr"
                        width={15}
                      >
                        #
                      </th>
                      <th align="center" className="bold padd_5 brdr">
                        Booking ID
                      </th>
                      <th align="center" className="bold padd_5 brdr">
                        Booking Amount
                      </th>
                      <th align="center" className="bold padd_5 brdr">
                        Points Earned
                      </th>
                      <th align="center" className="bold padd_5 brdr">
                        Redemption Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    <tr className="phps_row_0">
                      <td align="center" className="brdr" width={15}>
                        1
                      </td>
                      <td height="20px" align="center" className="brdr">
                        <Link
                          title="Online Booking"
                          data-toggle="tooltip"
                          data-placement="top"
                          to="booking_detail.php?booking_id=2706&reservationId=OT2322&service=hotel#02706"
                        >
                          02706{" "}
                        </Link>
                      </td>
                      <td align="center" className="brdr">
                        1228.2 &nbsp;&nbsp; INR
                      </td>
                      <td align="center" className="brdr">
                        1.967
                      </td>
                      <td align="center" className="brdr">
                        18-Jun-2019
                      </td>
                    </tr>
                    <tr className="phps_row_0">
                      <td align="center" className="brdr" width={15}>
                        2
                      </td>
                      <td height="20px" align="center" className="brdr">
                        <Link
                          title="Online Booking"
                          data-toggle="tooltip"
                          data-placement="top"
                          to="booking_detail.php?booking_id=2714&reservationId=OT2338&service=hotel#TD802714"
                        >
                          TD802714{" "}
                        </Link>
                      </td>
                      <td align="center" className="brdr">
                        1000 &nbsp;&nbsp; INR
                      </td>
                      <td align="center" className="brdr">
                        1.601
                      </td>
                      <td align="center" className="brdr">
                        18-Jun-2019
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default ReportsOperationsLoyalityProgram;
