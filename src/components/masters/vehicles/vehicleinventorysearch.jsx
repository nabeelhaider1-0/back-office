import { Link } from "react-router-dom";

import { useState } from "react";
import Header2 from "../../header2/header2";
import Constants from "../../../constants/routes";
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

const MastersVehiclesInventorySearch = () => {
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
        title="INVENTORY SEARCH FOR VEHICLE TYPE"
        linkText1="Search Vehicle Type Inventory"
        linkText2="Add Vehicle Type Inventory"
        link2={Constants.URLConstants.MASTERSVEHICLESINVENTORYNEW}
      />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <div>
          <form
            name="search_vehicle_inventory_from"
            method="get"
            action="vehicle_type_invenory.php"
          >
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
                    className="custom-select"
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
                    className="custom-select"
                    onChange={handleCityChange}
                    noOptionsMessage={() => "No City Found"}
                  />
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-md-12 form-group">
                  <button
                    type="button"
                    className="btn btn-dark btn-sm"
                    value="Search"
                    id="btn-submit"
                  >
                    <i className="fa fa-search" />
                    &nbsp;Search
                  </button>
                </div>
              </div>
            </div>
          </form>
          <br />
          <form>
            <div className="panel-body removeMargins">
              <div className="dataTables_scroll">
                <div
                  id="tbl_inventory_wrapper"
                  className="dataTables_wrapper form-inline dt-bootstrap no-footer"
                >
                  <div className="row mt-1">
                    <div id="tt" className="col-md-4" />
                    <div className="col-md-4 dtPaging">
                      {/*Pagination panel*/}
                      <nav aria-label="Page navigation example">
                        <ul className="pagination pagination-sm justify-content-center">
                          <li className="page-item">
                            <Link
                              className="page-link"
                              to="#"
                              aria-label="Next"
                            >
                              <span aria-hidden="true">«PREVIOUS</span>
                            </Link>
                          </li>
                          <li className="page-item active">
                            <Link className="page-link" to="#">
                              1
                            </Link>
                          </li>
                          <li className="page-item">
                            <Link
                              className="page-link"
                              to="#"
                              aria-label="Next"
                            >
                              <span aria-hidden="true">NEXT»</span>
                            </Link>
                          </li>
                        </ul>
                      </nav>
                    </div>
                    <div className="col-md-2" />
                    <div className="col-md-2">
                      <div
                        id="tbl_inventory_filter"
                        className="dataTables_filter"
                      >
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
                    <div
                      id="search_controller_wrapper"
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
                              width: "1510px",
                            }}
                          >
                            <div
                              className="suwala-doubleScroll-scroll"
                              style={{ height: "20px", width: "1510px" }}
                            />
                          </div>
                          <div id="wrapper2" style={{ overflow: "auto" }}>
                            <table
                              id="tbl_inventory"
                              className="table table-bordered   table-responsive dataTable no-footer"
                              role="grid"
                              style={{ width: "1510px" }}
                            >
                              <thead>
                                <tr role="row">
                                  <th
                                    className="sorting_desc"
                                    tabIndex={0}
                                    aria-controls="tbl_inventory"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-sort="descending"
                                    aria-label="&nbsp;Supplier: activate to sort column ascending"
                                    style={{ width: "254.2px" }}
                                  >
                                    &nbsp;Supplier
                                  </th>
                                  <th
                                    className="sorting"
                                    tabIndex={0}
                                    aria-controls="tbl_inventory"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="&nbsp;Vehicle Type: activate to sort column ascending"
                                    style={{ width: "434.2px" }}
                                  >
                                    &nbsp;Vehicle Type
                                  </th>
                                  <th
                                    className="sorting"
                                    tabIndex={0}
                                    aria-controls="tbl_inventory"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="&nbsp;Country: activate to sort column ascending"
                                    style={{ width: "385.2px" }}
                                  >
                                    &nbsp;Country
                                  </th>
                                  <th
                                    className="sorting"
                                    tabIndex={0}
                                    aria-controls="tbl_inventory"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="&nbsp;City: activate to sort column ascending"
                                    style={{ width: "190.2px" }}
                                  >
                                    &nbsp;City
                                  </th>
                                  <th
                                    className="sorting_disabled"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="&nbsp;Actions"
                                    style={{ width: "125px" }}
                                  >
                                    &nbsp;Actions
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white">
                                <tr role="row" className="odd">
                                  <td className="sorting_1">QtechTest</td>
                                  <td>Luxury Sedan</td>
                                  <td>India</td>
                                  <td>Mumbai</td>
                                  <td>
                                    <div className="actionCont">
                                      <div
                                        className="input-group-addon"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Edit/View"
                                      >
                                        {" "}
                                        <Link
                                          to={
                                            Constants.URLConstants
                                              .MASTERSVEHICLESINVENTORYEDIT
                                          }
                                          target="_blank"
                                        >
                                          {" "}
                                          <i className="fa fa-pencil-square-o" />{" "}
                                        </Link>
                                      </div>
                                      <div
                                        className="input-group-addon"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Delete"
                                      >
                                        {" "}
                                        <Link to="javascript confirm_delete('vehicle_type_inventory.php?action=delete&id=93cc85015497722509d0c348f1d36017&Search=Y');">
                                          <i className="fa fa-trash" />{" "}
                                        </Link>{" "}
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td className="sorting_1">QtechTest</td>
                                  <td>vaibhav</td>
                                  <td>Bangladesh</td>
                                  <td>Dhaka</td>
                                  <td>
                                    <div className="actionCont">
                                      <div
                                        className="input-group-addon"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Edit/View"
                                      >
                                        {" "}
                                        <Link
                                          to={
                                            Constants.URLConstants
                                              .MASTERSVEHICLESINVENTORYEDIT
                                          }
                                          target="_blank"
                                        >
                                          {" "}
                                          <i className="fa fa-pencil-square-o" />{" "}
                                        </Link>
                                      </div>
                                      <div
                                        className="input-group-addon"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Delete"
                                      >
                                        {" "}
                                        <Link to="javascript confirm_delete('vehicle_type_inventory.php?action=delete&id=93d5333712843cfc25b4200ce628f878&Search=Y');">
                                          <i className="fa fa-trash" />{" "}
                                        </Link>{" "}
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td className="sorting_1">QtechTest</td>
                                  <td>inventory retest_2</td>
                                  <td>United Arab Emirates</td>
                                  <td>Sharjah</td>
                                  <td>
                                    <div className="actionCont">
                                      <div
                                        className="input-group-addon"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Edit/View"
                                      >
                                        {" "}
                                        <Link
                                          to={
                                            Constants.URLConstants
                                              .MASTERSVEHICLESINVENTORYEDIT
                                          }
                                          target="_blank"
                                        >
                                          {" "}
                                          <i className="fa fa-pencil-square-o" />{" "}
                                        </Link>
                                      </div>
                                      <div
                                        className="input-group-addon"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Delete"
                                      >
                                        {" "}
                                        <Link to="javascript confirm_delete('vehicle_type_inventory.php?action=delete&id=9e667a4db87b65338a128b2c0c43d391&Search=Y');">
                                          <i className="fa fa-trash" />{" "}
                                        </Link>{" "}
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td className="sorting_1">allwin-qtech</td>
                                  <td>Local_Transfer_Vehicle</td>
                                  <td>Belgium</td>
                                  <td>Brussels</td>
                                  <td>
                                    <div className="actionCont">
                                      <div
                                        className="input-group-addon"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Edit/View"
                                      >
                                        {" "}
                                        <Link
                                          to={
                                            Constants.URLConstants
                                              .MASTERSVEHICLESINVENTORYEDIT
                                          }
                                          target="_blank"
                                        >
                                          {" "}
                                          <i className="fa fa-pencil-square-o" />{" "}
                                        </Link>
                                      </div>
                                      <div
                                        className="input-group-addon"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Delete"
                                      >
                                        {" "}
                                        <Link to="javascript confirm_delete('vehicle_type_inventory.php?action=delete&id=1b95b7167d5bd7b34513a588f50740f0&Search=Y');">
                                          <i className="fa fa-trash" />{" "}
                                        </Link>{" "}
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                                <tr role="row" className="odd">
                                  <td className="sorting_1">allwin-qtech</td>
                                  <td>Big Van</td>
                                  <td>Belgium</td>
                                  <td>Brussels</td>
                                  <td>
                                    <div className="actionCont">
                                      <div
                                        className="input-group-addon"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Edit/View"
                                      >
                                        {" "}
                                        <Link
                                          to={
                                            Constants.URLConstants
                                              .MASTERSVEHICLESINVENTORYEDIT
                                          }
                                          target="_blank"
                                        >
                                          {" "}
                                          <i className="fa fa-pencil-square-o" />{" "}
                                        </Link>
                                      </div>
                                      <div
                                        className="input-group-addon"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Delete"
                                      >
                                        {" "}
                                        <Link to="javascript confirm_delete('vehicle_type_inventory.php?action=delete&id=374084b0499ab0444819770eb9e94e38&Search=Y');">
                                          <i className="fa fa-trash" />{" "}
                                        </Link>{" "}
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                                <tr role="row" className="even">
                                  <td className="sorting_1">allwin-qtech</td>
                                  <td>Sedan</td>
                                  <td>India</td>
                                  <td>Mumbai</td>
                                  <td>
                                    <div className="actionCont">
                                      <div
                                        className="input-group-addon"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Edit/View"
                                      >
                                        {" "}
                                        <Link
                                          to={
                                            Constants.URLConstants
                                              .MASTERSVEHICLESINVENTORYEDIT
                                          }
                                          target="_blank"
                                        >
                                          {" "}
                                          <i className="fa fa-pencil-square-o" />{" "}
                                        </Link>
                                      </div>
                                      <div
                                        className="input-group-addon"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Delete"
                                      >
                                        {" "}
                                        <Link to="javascript confirm_delete('vehicle_type_inventory.php?action=delete&id=6a1c2413b54f604e18699dd4a16d35f8&Search=Y');">
                                          <i className="fa fa-trash" />{" "}
                                        </Link>{" "}
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <br />
                      <br />
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
export default MastersVehiclesInventorySearch;
