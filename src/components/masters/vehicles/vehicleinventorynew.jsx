import React, { useState, } from "react"; // Import React and useState

import Flatpickr from "react-flatpickr";
import Header2 from "../../header2/header2";
import Constants from "../../../constants/routes";
import MultiSelect from "../../reactMultiSelect";
import { citiesByCountry, countries } from "../../../constants/Country-City-Data";




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
  { label: "1 Booking WL (Do Not Edit)-1bookingwhagent -(Agent)", value: "1bookingwhagent" },
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
  { value: 0, label: ' - Select Vehicle Type -' },
  { value: 'LXS', label: 'Luxury Sedan' },
  { value: 'Q1', label: 'Coaster' },
  { value: 'BM01', label: 'Super Luxury' },
  { value: 'BS', label: 'TANIA BUS' },
  { value: 8, label: 'Local_Transfer_Vehicle' },
  { value: 9, label: 'Sedan' },
  { value: 10, label: 'Economy Car' },
  { value: 11, label: 'Mini Van' },
  { value: 12, label: 'Big Van' },
  { value: 20, label: 'TT' },
  { value: 23, label: 'inventory retest_1' },
  { value: 25, label: 'inventory retest_2' },
  { value: 26, label: 'vaibhav' },
  { value: 27, label: 'test VEHICLE' },
  { value: 28, label: 'car' },
  { value: 29, label: 'swift zxi' },
];





const MastersVehiclesInventoryNew = () => {
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
      <Header2
        title="ADD VEHICLE TYPE INVENTORY"
        linkText1="Search Vehicle Type Inventory"
        linkText2="Add Vehicle Type Inventory"
        link1={Constants.URLConstants.MASTERSVEHICLESINVENTORYSEARCH}

      />
      <div class="container-fluid pt-0 p-4" id="content-pad">


        <form action="vehicle_type_inventory.php" method="post" name="add_vehicle_type_inventory_form" id="add_vehicle_type_inventory_form">
          <input type="hidden" name="action" defaultValue="insert" />
          <div className="panel-body">
            <div className="row">
              <div className="form-group col-md-3">
                <label>Supplier</label>
                <MultiSelect
                  options={searchSenderOptions}
                  isSearchable
                  placeholder=" Select Supplier "
                  className="custom-select required"
                  noOptionsMessage={() => "No Supplier Found"}
                />
              </div>
              <div className="form-group col-md-3">
                <label>Vehicle Type</label>
                <MultiSelect
                  options={selVehicleType1Options}
                  isSearchable
                  placeholder=" Select Vehicle "
                  className="custom-select required"
                  noOptionsMessage={() => "No Vehicle Found"}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="form-group col-md-3">
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
              <div className="form-group col-md-3">
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
            </div>
            <div className="row mt-2">
              <div className="form-group col-md-3">
                <label>Date</label>
                <div className="input-daterange input-group date" id="datetimepicker">
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
                  <span className="input-group-addon" id="dateTBtn" onClick={handleTrashClick}>
                    <i className="fa fa-trash" />
                  </span>
                </div>
              </div>
              <input type="hidden" name="sel_avail_from" defaultValue={0} />
              <input type="hidden" name="sel_avail_to" defaultValue={24} />
            </div>
            <div className="row mt-2">
              <div className="form-group col-md-3">
                <label>Sale Type</label><br />
                <div className="radioline1 mt-2">
                  <div className="radio radio-success radio-inline">
                    <input type="radio" name="sale_policy" id="sale_policy" defaultValue="free_sale" />
                    <label htmlFor="free_sale">Free Sale</label>
                  </div>
                  <div className="radio radio-success radio-inline">
                    <input type="radio" name="sale_policy" id="app" defaultValue="stop_sale" />
                    <label htmlFor="appl_tue">Stop Sale</label>
                  </div>
                  <div className="radio radio-success radio-inline">
                    <input type="radio" name="sale_policy" id="app" defaultValue="default_sale" defaultChecked />
                    <label htmlFor="appl_tue">Default Sale</label>
                  </div>
                </div>
              </div>
              {/* <div class="form-group col-md-1">
                  <label>No Of Inventory</label>
                  <input type='text' class="form-control" name='txt_no_of_inventory' value='' id='txt_no_of_inventory' size='30' maxlength='255' onBlur="extractNumber(this,2,false);" onKeyUp="extractNumber(this,2,false);">
              </div>	 */}
              {/* <div class="form-group col-md-2">
                  <label>Release Period (Hrs) <i class="fa fa-info-circle pointer" title="What is  Release Period? The minimum number of days you can book before the transfer Date." data-toggle="tooltip" data-placement="top" ></i></label>
                  <input type='text' class="form-control required" name='txt_rel_hrs' id='txt_rel_hrs' size='4' maxlength='255' onBlur="extractNumber(this,1,false);" onKeyUp="extractNumber(this,1,false);">
                                  
              </div>	 */}
            </div>
            <div className="row" id="default_sale_inventory_div">
              <div className="form-group col-md-5">
                <label>Inventory Type</label><br />
                <div className="radioline1 mt-2">
                  <div className="radio radio-success radio-inline">
                    <input type="radio" name="inventory_type" id defaultValue="Private" defaultChecked />
                    <label htmlFor="free_sale">No of Vehicles</label>
                  </div>
                  <div className="radio radio-success radio-inline">
                    <input type="radio" name="inventory_type" id="app" defaultValue="SIC Basis" />
                    <label htmlFor="appl_tue">No of passengers per vehicle</label>
                  </div>
                  <div className="radio radio-success radio-inline">
                    <input type="radio" name="inventory_type" id="app" defaultValue="Private Per Pax" />
                    <label htmlFor="appl_tue">Private Per Pax (For Sightseeing Vehicle)</label>
                  </div>
                </div>
              </div>
              <div className="form-group col-md-1">
                <label>Inventory</label>
                <input type="text" className="form-control form-control-sm" name="txt_no_of_inventory" id="txt_no_of_inventory" size={30} maxLength={255} onblur="extractNumber(this,2,false);" onkeyup="extractNumber(this,2,false);" />
              </div>
            </div>
            <div className="row mt-2">
              <div className="form-group col-md-3">
                <label>Release Period (Hrs) <i className="fa fa-info-circle pointer" title data-toggle="tooltip" data-placement="top" data-original-title="What is  Release Period? The minimum number of days you can book before the transfer Date." /></label>
                <input type="text" className="form-control form-control-sm required" placeholder="Week Day" name="txt_rel_hrs_weekday" id="txt_rel_hrs_weekday" size={4} maxLength={255} onblur="extractNumber(this,1,false);" onkeyup="extractNumber(this,1,false);" />
              </div>
              <div className="form-group col-md-3">
                <label>&nbsp;&nbsp;</label>
                <input type="text" className="form-control form-control-sm" placeholder="Week End" name="txt_rel_hrs_weekend" id="txt_rel_hrs_weekend" size={4} maxLength={255} onblur="extractNumber(this,1,false);" onkeyup="extractNumber(this,1,false);" />
              </div>
            </div>
            <div className="row mt-2">
              <div className="form-group col-md-12">
                <button type="button" className="btn btn-dark btn-sm" name="b1" value="SUBMIT" onclick="Javascriptsubmit_form(document.forms['add_vehicle_type_inventory_form'],0,'add');">
                  <i className="fa fa-check" />&nbsp;Submit
                </button>
              </div>
            </div>
          </div>
        </form>




      </div>
    </>
  );
};
export default MastersVehiclesInventoryNew;
