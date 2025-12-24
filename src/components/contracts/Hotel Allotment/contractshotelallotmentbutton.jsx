import Flatpickr from "react-flatpickr";
import React, { useState } from "react";

import { Link } from "react-router-dom";
import Header2 from "../../header2/header2";
import MultiSelect from "../../reactMultiSelect";
import Constants from "../../../constants/routes";
import {
  advance_suppliers_options,
  contractshotelOptions,
  insertUpdateTypeOptions,
  inventoryClassOptions,
  monthOptions,
  yearOptions,
} from "../../../constants/contants";

const ContractsHotelAllotmentButton = () => {
  const [startDate, setStartDate] = useState(null); // State for the start date
  const [endDate, setEndDate] = useState(null); // State for the end date

  return (
    <>
      <Header2 title="ALLOTMENT MAP" />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <div>
          <form>
            <div className="row">
              <div className="form-group col-md-6">
                <label>Supplier</label>
                <MultiSelect
                  options={advance_suppliers_options}
                  isSearchable
                  placeholder="- Select Supplier -"
                  className="custom-select required"
                  noOptionsMessage={() => "No Supplier Found"}
                />
              </div>
              <div className="form-group col-md-6">
                <label>Hotel</label>
                <MultiSelect
                  options={contractshotelOptions}
                  isSearchable
                  placeholder="- Select Hotel -"
                  className="custom-select required"
                  noOptionsMessage={() => "No Hotel Found"}
                />
              </div>
              <div className="col-md-12 form-group">
                {/* <div class="panel-body"> */}
                <div className="row mt-3">
                  <div className="col-md-2">
                    <input
                      type="hidden"
                      id="sel_rate_profile"
                      name="sel_rate_profile"
                      defaultValue={0}
                      className="form-control form-control-sm"
                    />
                  </div>
                  <div className="col-md-2 ">
                    <input
                      type="hidden"
                      id="sel_inventory_class"
                      name="sel_inventory_class"
                      defaultValue={0}
                      className="form-control form-control-sm"
                    />
                  </div>
                  <div className="col-md-2 ">
                    <input
                      type="hidden"
                      id="sel_roomclass"
                      name="sel_roomclass"
                      defaultValue={0}
                      className="form-control form-control-sm"
                    />
                  </div>
                  <div className="col-md-2 ">
                    <input
                      type="hidden"
                      id="sel_roombasis"
                      name="sel_roombasis"
                      defaultValue={0}
                      className="form-control form-control-sm"
                    />
                  </div>
                  <div className="col-md-2 ">
                    <input
                      type="hidden"
                      id="action_type"
                      name="action_type"
                      defaultValue
                      className="form-control form-control-sm"
                    />
                  </div>
                </div>
                {/* </div> */}
              </div>
              <div className="form-group col-md-3">
                <label>Month</label>
                <MultiSelect
                  options={monthOptions}
                  isSearchable
                  placeholder="- Select Month -"
                  className="custom-select"
                  noOptionsMessage={() => "No Month Found"}
                />
              </div>
              <div className="form-group col-md-3">
                <label>Year</label>
                <MultiSelect
                  options={yearOptions}
                  isSearchable
                  placeholder="- Select Year -"
                  className="custom-select"
                  noOptionsMessage={() => "No Year Found"}
                />
              </div>
              <div className="form-group col-md-3">
                <label>Inventory Room Category</label>
                <MultiSelect
                  options={inventoryClassOptions}
                  isSearchable
                  placeholder="- Select-"
                  className="custom-select"
                  noOptionsMessage={() => "No Inventory Room Found"}
                />
              </div>
              <div className="form-group col-md-3">
                <label>Insert/ Update</label>
                <MultiSelect
                  options={insertUpdateTypeOptions}
                  isSearchable
                  placeholder="- Select-"
                  className="custom-select"
                  noOptionsMessage={() => "No Insert/ Update Found"}
                />
              </div>
              {/* <div class="form-group col-md-6">
          <label>View</label>
          <select class="selectpicker form-control show-menu-arrow" name='sel_view' id='sel_view'>							
              <option value='1'>General View</option>
              <option value='2'>Supplement View</option>
              <option value='3'>Rate View</option>
          </select>
      </div> */}
              <div className="form-group col-md-6 mt-3">
                <label>View</label>
                <br />
                <div className="radioline1 mt-3">
                  <div className="checkbox checkbox-success checkbox-inline">
                    <input
                      type="checkbox"
                      name="chk_view"
                      defaultValue="rate_view"
                      id="Rate"
                      onclick="JavascriptshowHideContent('showhide_rate_view', 'view')"
                      defaultChecked
                    />
                    <label htmlFor="Rate">Rate</label>
                  </div>
                  <div className="checkbox checkbox-success checkbox-inline">
                    <input
                      type="checkbox"
                      name="chk_view"
                      defaultValue="availibility_view"
                      id="app"
                      onclick="JavascriptshowHideContent('showhide_availibility_view', 'view')"
                    />
                    <label htmlFor="Inventory Allocation">
                      Inventory Allocation
                    </label>
                  </div>
                  <div className="checkbox checkbox-success checkbox-inline">
                    <input
                      type="checkbox"
                      name="chk_view"
                      defaultValue="minimumstay_view"
                      id="app"
                      onclick="JavascriptshowHideContent('showhide_minimumstay_view', 'view')"
                    />
                    <label htmlFor="Minimum Stay">Minimum Stay</label>
                  </div>
                  <div className="checkbox checkbox-success checkbox-inline">
                    <input
                      type="checkbox"
                      name="chk_view"
                      defaultValue="releaseperiod_view"
                      id="app"
                      onclick="JavascriptshowHideContent('showhide_releaseperiod_view', 'view')"
                    />
                    <label htmlFor="Release Period">Release Period</label>
                  </div>
                  <div className="checkbox checkbox-success checkbox-inline">
                    <input
                      type="checkbox"
                      name="chk_view"
                      defaultValue="stopsell_view"
                      id="app"
                      onclick="JavascriptshowHideContent('showhide_stopsell_view', 'view')"
                    />
                    <label htmlFor="Stop Sell">Stop Sell</label>
                  </div>
                </div>
              </div>
              <div className="form-group col-md-6 mt-3">
                <label>I wish to modify rates</label>
                <br />
                <div className="radioline1 mt-3">
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      name="rates_manipulation_type"
                      defaultValue="betweendates"
                      onclick="getRatesManipulationType()"
                      defaultChecked="checked"
                      id="between"
                    />
                    <label htmlFor="between">
                      Between dates and application days
                    </label>
                  </div>
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      name="rates_manipulation_type"
                      defaultValue="monthly"
                      onclick="getRatesManipulationType()"
                      id="app"
                    />
                    <label htmlFor="Monthly">Monthly</label>
                  </div>
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      name="rates_manipulation_type"
                      defaultValue="weekly"
                      onclick="getRatesManipulationType()"
                      id="app"
                    />
                    <label htmlFor="Weekly">Weekly</label>
                  </div>
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      name="rates_manipulation_type"
                      defaultValue="daybyday"
                      onclick="getRatesManipulationType()"
                      id="app"
                    />
                    <label htmlFor="day">Day By Day</label>
                  </div>
                </div>
              </div>
            </div>
            {/* 2nd Row */}
            <div className="row mt-4">
              <div className="col-md-12 form-group">
                <Link
                  to={Constants.URLConstants.CONTRACTSHOTELSALLOTMENTBUTTON}
                  className="btn btn-dark btn-sm"
                  type="button"
                  onclick="JavascriptcallSearch(document.forms['search_hotel_from']);"
                >
                  <i className="fa fa-search" />
                  &nbsp;Search
                </Link>
              </div>
            </div>
          </form>
          <form className="mt-2">
            <div className="panel-body">
              <div className=" form-group col-md-12">
                <h5>Market Profile</h5>
              </div>
              <div id="rateprofilefilterdiv">
                <div className="radioline1 form-group col-md-12">
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      id="app"
                      defaultValue={67}
                      name="chk_rateprofile"
                      defaultChecked
                      onclick="JavascriptsetFilter('rate_profile');"
                    />
                    <label htmlFor="AFRICAN MARKET">AFRICAN MARKET</label>
                  </div>
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      id="app"
                      defaultValue={31}
                      name="chk_rateprofile"
                      onclick="JavascriptsetFilter('rate_profile');"
                    />
                    <label htmlFor="APAC">APAC</label>
                  </div>
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      id="app"
                      defaultValue={68}
                      name="chk_rateprofile"
                      onclick="JavascriptsetFilter('rate_profile');"
                    />
                    <label htmlFor="CIS- RUSSIA MARKET">
                      CIS- RUSSIA MARKET
                    </label>
                  </div>
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      id="app"
                      defaultValue={69}
                      name="chk_rateprofile"
                      onclick="JavascriptsetFilter('rate_profile');"
                    />
                    <label htmlFor="EUROPE MARKET">EUROPE MARKET</label>
                  </div>
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      id="app"
                      defaultValue={70}
                      name="chk_rateprofile"
                      onclick="JavascriptsetFilter('rate_profile');"
                    />
                    <label htmlFor="FAR EAST">FAR EAST</label>
                  </div>
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      id="app"
                      defaultValue={71}
                      name="chk_rateprofile"
                      onclick="JavascriptsetFilter('rate_profile');"
                    />
                    <label htmlFor="GCC- MARKET">GCC- MARKET</label>
                  </div>
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      id="app"
                      defaultValue={72}
                      name="chk_rateprofile"
                      onclick="JavascriptsetFilter('rate_profile');"
                    />
                    <label htmlFor="GCC-UAE&SA">GCC-UAE&amp;SA</label>
                  </div>
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      id="app"
                      defaultValue={73}
                      name="chk_rateprofile"
                      onclick="JavascriptsetFilter('rate_profile');"
                    />
                    <label htmlFor="SUB-C MARKET">SUB-C MARKET</label>
                  </div>
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      id="app"
                      defaultValue={74}
                      name="chk_rateprofile"
                      onclick="JavascriptsetFilter('rate_profile');"
                    />
                    <label htmlFor="USA MARKET">USA MARKET</label>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <form className="mt-2">
            <div className="panel-body">
              <div className="form-group col-md-12">
                <h5>Allocation Room Category</h5>
              </div>
              <div className="row" id="inventoryroomclassfilterdiv">
                <div
                  className="form-group col-md-12"
                  style={{ display: "contents" }}
                >
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      name="chk_inventoryroomclass"
                      id="app"
                      defaultValue={26}
                      onclick="JavascriptsetFilter('inventory_room_class');setFilter('retrive_multiple_room_class');"
                      defaultChecked="checked"
                    />
                    <label htmlFor="Classic">Classic</label>
                  </div>
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      name="chk_inventoryroomclass"
                      id="app"
                      defaultValue={39}
                      onclick="JavascriptsetFilter('inventory_room_class');setFilter('retrive_multiple_room_class');"
                    />
                    <label htmlFor="Classic Suite">Classic Suite</label>
                  </div>
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      name="chk_inventoryroomclass"
                      id="app"
                      defaultValue={33}
                      onclick="JavascriptsetFilter('inventory_room_class');setFilter('retrive_multiple_room_class');"
                    />
                    <label htmlFor="Deluxe">Deluxe</label>
                  </div>
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      name="chk_inventoryroomclass"
                      id="app"
                      defaultValue={54}
                      onclick="JavascriptsetFilter('inventory_room_class');setFilter('retrive_multiple_room_class');"
                    />
                    <label htmlFor="Deluxe room">Deluxe room</label>
                  </div>
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      name="chk_inventoryroomclass"
                      id="app"
                      defaultValue={52}
                      onclick="JavascriptsetFilter('inventory_room_class');setFilter('retrive_multiple_room_class');"
                    />
                    <label htmlFor="Exclusive plus triple">
                      Exclusive plus triple
                    </label>
                  </div>
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      name="chk_inventoryroomclass"
                      id="app"
                      defaultValue={53}
                      onclick="JavascriptsetFilter('inventory_room_class');setFilter('retrive_multiple_room_class');"
                    />
                    <label htmlFor="Exclusive plus triple extrabed">
                      Exclusive plus triple extrabed
                    </label>
                  </div>
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      name="chk_inventoryroomclass"
                      id="app"
                      defaultValue={3}
                      onclick="JavascriptsetFilter('inventory_room_class');setFilter('retrive_multiple_room_class');"
                    />
                    <label htmlFor="Executive">Executive</label>
                  </div>
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      name="chk_inventoryroomclass"
                      id="app"
                      defaultValue={37}
                      onclick="JavascriptsetFilter('inventory_room_class');setFilter('retrive_multiple_room_class');"
                    />
                    <label htmlFor="Premium">Premium</label>
                  </div>
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      name="chk_inventoryroomclass"
                      id="app"
                      defaultValue={35}
                      onclick="JavascriptsetFilter('inventory_room_class');setFilter('retrive_multiple_room_class');"
                    />
                    <label htmlFor="Premiunm">Premiunm</label>
                  </div>
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      name="chk_inventoryroomclass"
                      id="app"
                      defaultValue={29}
                      onclick="JavascriptsetFilter('inventory_room_class');setFilter('retrive_multiple_room_class');"
                    />
                    <label htmlFor="Qtech classic">Qtech classic</label>
                  </div>
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      name="chk_inventoryroomclass"
                      id="app"
                      defaultValue={34}
                      onclick="JavascriptsetFilter('inventory_room_class');setFilter('retrive_multiple_room_class');"
                    />
                    <label htmlFor="Royal">Royal</label>
                  </div>
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      name="chk_inventoryroomclass"
                      id="app"
                      defaultValue={50}
                      onclick="JavascriptsetFilter('inventory_room_class');setFilter('retrive_multiple_room_class');"
                    />
                    <label htmlFor="Single">Single</label>
                  </div>
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      name="chk_inventoryroomclass"
                      id="app"
                      defaultValue={11}
                      onclick="JavascriptsetFilter('inventory_room_class');setFilter('retrive_multiple_room_class');"
                    />
                    <label htmlFor="Special Executive">Special Executive</label>
                  </div>
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      name="chk_inventoryroomclass"
                      id="app"
                      defaultValue={2}
                      onclick="JavascriptsetFilter('inventory_room_class');setFilter('retrive_multiple_room_class');"
                    />
                    <label htmlFor="Standard">Standard</label>
                  </div>
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      name="chk_inventoryroomclass"
                      id="Standard ER"
                      defaultValue={40}
                      onclick="JavascriptsetFilter('inventory_room_class');setFilter('retrive_multiple_room_class');"
                    />
                    <label htmlFor="Standard ER">Standard ER</label>
                  </div>
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      name="chk_inventoryroomclass"
                      id="app"
                      defaultValue={21}
                      onclick="JavascriptsetFilter('inventory_room_class');setFilter('retrive_multiple_room_class');"
                    />
                    <label htmlFor="Standard Triple">Standard Triple</label>
                  </div>
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      name="chk_inventoryroomclass"
                      id="app"
                      defaultValue={41}
                      onclick="JavascriptsetFilter('inventory_room_class');setFilter('retrive_multiple_room_class');"
                    />
                    <label htmlFor="StandardTest">StandardTest</label>
                  </div>
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      name="chk_inventoryroomclass"
                      id="app"
                      defaultValue={36}
                      onclick="JavascriptsetFilter('inventory_room_class');setFilter('retrive_multiple_room_class');"
                    />
                    <label htmlFor="Super Deluxe">Super Deluxe</label>
                  </div>
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      name="chk_inventoryroomclass"
                      id="app"
                      defaultValue={10}
                      onclick="JavascriptsetFilter('inventory_room_class');setFilter('retrive_multiple_room_class');"
                    />
                    <label htmlFor="Superior Deluxe">Superior Deluxe</label>
                  </div>
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      name="chk_inventoryroomclass"
                      id="app"
                      defaultValue={42}
                      onclick="JavascriptsetFilter('inventory_room_class');setFilter('retrive_multiple_room_class');"
                    />
                    <label htmlFor="test qtech">test qtech</label>
                  </div>
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      name="chk_inventoryroomclass"
                      id="app"
                      defaultValue={15}
                      onclick="JavascriptsetFilter('inventory_room_class');setFilter('retrive_multiple_room_class');"
                    />
                    <label htmlFor="Triple Standard ESC">
                      Triple Standard ESC
                    </label>
                  </div>
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      name="chk_inventoryroomclass"
                      id="app"
                      defaultValue={14}
                      onclick="JavascriptsetFilter('inventory_room_class');setFilter('retrive_multiple_room_class');"
                    />
                    <label htmlFor="twin deluxe room">twin deluxe room</label>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <form className="mt-2">
            <div className="panel-body">
              <div className="form-group col-md-12">
                <h5>Room Category</h5>
              </div>
              <div id="roomclassfilterdiv">
                <div className="form-group col-md-12 row">
                  <div className="col-md-3">
                    <div className="radio radio-success radio-inline">
                      <input
                        type="radio"
                        name="chk_roomclass"
                        id="app"
                        defaultValue={12}
                        onclick="JavascriptsetFilter('room_class');"
                        defaultChecked
                      />
                      <label htmlFor>Double</label>
                      <br />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="radio radio-success radio-inline">
                      <input
                        type="radio"
                        name="chk_roomclass"
                        id
                        defaultValue={15}
                        onclick="JavascriptsetFilter('room_class');"
                      />
                      <label htmlFor>One Club</label>
                      <br />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="radio radio-success radio-inline">
                      <input
                        type="radio"
                        name="chk_roomclass"
                        id
                        defaultValue={14}
                        onclick="JavascriptsetFilter('room_class');"
                      />
                      <label htmlFor>Quad</label>
                      <br />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="radio radio-success radio-inline">
                      <input
                        type="radio"
                        name="chk_roomclass"
                        id
                        defaultValue={11}
                        onclick="JavascriptsetFilter('room_class');"
                      />
                      <label htmlFor>Single</label>
                      <br />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="radio radio-success radio-inline">
                      <input
                        type="radio"
                        name="chk_roomclass"
                        id="app"
                        defaultValue={13}
                        onclick="JavascriptsetFilter('room_class');"
                      />
                      <label htmlFor>Triple</label>
                      <br />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <form className="mt-2">
            <div className="panel-body">
              <div className="form-group col-md-12">
                <h5>Room Basis</h5>
              </div>
              <div className="row" id="roombasisfilterdiv">
                <div
                  className="form-group col-md-12"
                  style={{ display: "contents" }}
                >
                  <div className="radio radio-success radio-inline col-md-2">
                    <input
                      type="radio"
                      name="chk_roombasis"
                      id="app"
                      defaultValue={2}
                      onclick="JavascriptsetFilterRoomBasis();"
                      defaultChecked="checked"
                    />
                    <label htmlFor="Half Board">Half Board</label>
                  </div>
                  <div className="radio radio-success radio-inline col-md-2">
                    <input
                      type="radio"
                      name="chk_roombasis"
                      id="app"
                      defaultValue={3}
                      onclick="JavascriptsetFilterRoomBasis();"
                    />
                    <label htmlFor="Breakfast">Breakfast</label>
                  </div>
                  <div className="radio radio-success radio-inline col-md-2">
                    <input
                      type="radio"
                      name="chk_roombasis"
                      id="app"
                      defaultValue={5}
                      onclick="JavascriptsetFilterRoomBasis();"
                    />
                    <label htmlFor="ULTRA All">ULTRA All</label>
                  </div>
                  <div className="radio radio-success radio-inline col-md-2">
                    <input
                      type="radio"
                      name="chk_roombasis"
                      id="app"
                      defaultValue={6}
                      onclick="JavascriptsetFilterRoomBasis();"
                    />
                    <label htmlFor="Superior">Superior</label>
                  </div>
                  <div className="radio radio-success radio-inline col-md-2">
                    <input
                      type="radio"
                      name="chk_roombasis"
                      id="app"
                      defaultValue={7}
                      onclick="JavascriptsetFilterRoomBasis();"
                    />
                    <label htmlFor="Bed & Breakfast">Bed &amp; Breakfast</label>
                  </div>
                  <div className="radio radio-success radio-inline col-md-2">
                    <input
                      type="radio"
                      name="chk_roombasis"
                      id="app"
                      defaultValue={9}
                      onclick="JavascriptsetFilterRoomBasis();"
                    />
                    <label htmlFor="Breakfast and dinner">
                      Breakfast and dinner
                    </label>
                  </div>
                  <div className="radio radio-success radio-inline col-md-2">
                    <input
                      type="radio"
                      name="chk_roombasis"
                      id="app"
                      defaultValue={10}
                      onclick="JavascriptsetFilterRoomBasis();"
                    />
                    <label htmlFor="buffet breakfast">buffet breakfast</label>
                  </div>
                  <div className="radio radio-success radio-inline col-md-2">
                    <input
                      type="radio"
                      name="chk_roombasis"
                      id="app"
                      defaultValue={11}
                      onclick="JavascriptsetFilterRoomBasis();"
                    />
                    <label htmlFor="Breakfast Included">
                      Breakfast Included
                    </label>
                  </div>
                  <div className="radio radio-success radio-inline col-md-2">
                    <input
                      type="radio"
                      name="chk_roombasis"
                      id="app"
                      defaultValue={30}
                      onclick="JavascriptsetFilterRoomBasis();"
                    />
                    <label htmlFor="BB">BB</label>
                  </div>
                  <div className="radio radio-success radio-inline col-md-2">
                    <input
                      type="radio"
                      name="chk_roombasis"
                      id="app"
                      defaultValue={31}
                      onclick="JavascriptsetFilterRoomBasis();"
                    />
                    <label htmlFor="Bed Only">Bed Only</label>
                  </div>
                  <div className="radio radio-success radio-inline col-md-2">
                    <input
                      type="radio"
                      name="chk_roombasis"
                      id="app"
                      defaultValue={32}
                      onclick="JavascriptsetFilterRoomBasis();"
                    />
                    <label htmlFor="Dinner Buffet">Dinner Buffet</label>
                  </div>
                  <div className="radio radio-success radio-inline col-md-2">
                    <input
                      type="radio"
                      name="chk_roombasis"
                      id="app"
                      defaultValue={33}
                      onclick="JavascriptsetFilterRoomBasis();"
                    />
                    <label htmlFor="Room Only.">Room Only.</label>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <form className="mt-2">
            <div className="panel-body">
              <div className="form-group col-md-12" id="app">
                <h5>Legend</h5>
              </div>
              <div
                className="form-group col-md-12"
                id="app"
                style={{
                  fontSize: "11px",
                  color: "#6a6c6f",
                  fontFamily: "MONTSERRAT",
                }}
              >
                <b>R/N : </b> Rate per Night
                <br />
                <b>RP : </b> Release Period
                <br />
                <b>IA : </b> Inventory Allocation
                <br />
                <b>CI :</b> Consumed Inventory
                <br />
                <b>BI :</b> Balance Inventory
                <br />
                <b>SS :</b> Stop Sell(Full , Partial)
                <br />
                <b>FS :</b> Free Sell
                <br />
                <b>SN :</b> Supplement Name
                <br />
                <b>SR :</b> Supplement Rate
                <br />
              </div>
            </div>
          </form>
          <form className="mt-2">
            <div className="panel-body removeMargins">
              {/* <pre>Array
  (
      [12] => Classic/Double
  )
  1</pre> */}
              {/* //////////////////////////////////////////////  */}
              <div className="form-group col-md-12 row">
                <h5>Between dates and application days</h5>
              </div>
              <div className="row">
                <div className=" form-group col-md-3">
                  <label>Date</label>
                  <div className="input-daterange input-group date" id="date">
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
                <div className="form-group col-md-4">
                  <label>Application Days</label>
                  <br />
                  <div className="radioline1">
                    <div className="checkbox checkbox-success checkbox-inline">
                      <input
                        type="checkbox"
                        id="Mo"
                        defaultValue={1}
                        name="chk_application_days[]"
                      />
                      <label htmlFor="Mo">Mo</label>
                    </div>
                    <div className="checkbox checkbox-success checkbox-inline">
                      <input
                        type="checkbox"
                        id="app"
                        defaultValue={2}
                        name="chk_application_days[]"
                      />
                      <label htmlFor="Tu">Tu</label>
                    </div>
                    <div className="checkbox checkbox-success checkbox-inline">
                      <input
                        type="checkbox"
                        id="app"
                        defaultValue={3}
                        name="chk_application_days[]"
                      />
                      <label htmlFor="We">We</label>
                    </div>
                    <div className="checkbox checkbox-success checkbox-inline">
                      <input
                        type="checkbox"
                        id="app"
                        defaultValue={4}
                        name="chk_application_days[]"
                      />
                      <label htmlFor="Th">Th</label>
                    </div>
                    <div className="checkbox checkbox-success checkbox-inline">
                      <input
                        type="checkbox"
                        id="app"
                        defaultValue={5}
                        name="chk_application_days[]"
                      />
                      <label htmlFor="Fr">Fr</label>
                    </div>
                    <div className="checkbox checkbox-success checkbox-inline">
                      <input
                        type="checkbox"
                        id="app"
                        defaultValue={6}
                        name="chk_application_days[]"
                      />
                      <label htmlFor="Sa">Sa</label>
                    </div>
                    <div className="checkbox checkbox-success checkbox-inline">
                      <input
                        type="checkbox"
                        id="app"
                        defaultValue={7}
                        name="chk_application_days[]"
                      />
                      <label htmlFor="Su">Su</label>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <div className>
                <div className="row pd_tp">
                  <div className="row">
                    <div className="col-md-5 col_hide">&nbsp;</div>
                    <div className="col-md-5 col_hide">
                      <div className="form-group" />
                    </div>
                    <div className="col-md-2">
                      <style
                        dangerouslySetInnerHTML={{
                          __html:
                            "\n                                    .table tr[visible='false'],\n                                    .no-result {\n                                        display: none;\n                                        border: 1px solid #ddd;\n                                        padding: 10px;\n                                        margin-top: -2px;\n                                    }\n\n                                    .table tr[visible='true'] {\n                                        display: table-row;\n                                    }\n\n                                    .counter {\n                                        padding: 8px;\n                                        color: #ccc;\n                                    }\n\n                                    .search_new {\n                                        float: right;\n                                        height: 35px;\n                                        margin-bottom: 0px;\n                                        padding-left: 5px;\n                                    }\n                                ",
                        }}
                      />
                      <div
                        className="form-group col-md-2 new_search_icon"
                        style={{ textAlign: "right", paddingRight: "0px" }}
                      >
                        <h5>
                          <i
                            className="fa-fa-search srchWithinPg"
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
                </div>
                <div
                  id="search_agents_table1_wrapper"
                  className="dataTables_wrapper form-inline dt-bootstrap no-footer"
                >
                  <div className="row">
                    <div className="col-sm-6" />
                    <div className="col-sm-6" />
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
                        <div id="scrollCont">
                          <div id="scrollCont">
                            <div id="scrollCont">
                              <div id="scrollCont">
                                <div id="scrollCont">
                                  <div id="scrollCont">
                                    <div id="scrollCont">
                                      <div id="scrollCont">
                                        <table
                                          id="search_agents_table1"
                                          className="table table-bordered  table-responsive dataTable no-footer"
                                          role="grid"
                                          aria-describedby="search_agents_table1_info"
                                        >
                                          <thead>
                                            <tr role="row">
                                              <th
                                                className="sorting_asc"
                                                tabIndex={0}
                                                aria-controls="search_agents_table1"
                                                rowSpan={1}
                                                colSpan={1}
                                                aria-sort="ascending"
                                                aria-label="RATE: activate to sort column descending"
                                                style={{ width: "385.2px" }}
                                              >
                                                RATE
                                              </th>
                                              <th
                                                className="sorting"
                                                tabIndex={0}
                                                aria-controls="search_agents_table1"
                                                rowSpan={1}
                                                colSpan={1}
                                                aria-label="IA: activate to sort column ascending"
                                                style={{ width: "162.2px" }}
                                              >
                                                IA
                                              </th>
                                              <th
                                                className="sorting"
                                                tabIndex={0}
                                                aria-controls="search_agents_table1"
                                                rowSpan={1}
                                                colSpan={1}
                                                aria-label="RP: activate to sort column ascending"
                                                style={{ width: "162.2px" }}
                                              >
                                                RP
                                              </th>
                                              <th
                                                className="sorting"
                                                tabIndex={0}
                                                aria-controls="search_agents_table1"
                                                rowSpan={1}
                                                colSpan={1}
                                                aria-label="MS: activate to sort column ascending"
                                                style={{ width: "162.2px" }}
                                              >
                                                MS
                                              </th>
                                              <th
                                                className="sorting"
                                                tabIndex={0}
                                                aria-controls="search_agents_table1"
                                                rowSpan={1}
                                                colSpan={1}
                                                aria-label="SS: activate to sort column ascending"
                                                style={{ width: "477px" }}
                                              >
                                                SS
                                              </th>
                                            </tr>
                                          </thead>
                                          <tbody className="bg-white">
                                            <tr role="row" className="odd">
                                              <td className="sorting_1">
                                                <div className="col-xs-12">
                                                  <div className="input-group col-xs-12 form-group">
                                                    <div className="row">
                                                      <input
                                                        className="form-control"
                                                        type="text"
                                                        defaultValue
                                                        name="betweenapplicationrates_12"
                                                        onkeyup="extractNumber(this,3,false);"
                                                        onblur="extractNumber(this,3,false);"
                                                        autoComplete="off"
                                                        style={{
                                                          marginLeft: "23px",
                                                        }}
                                                      />
                                                      <div
                                                        style={{
                                                          padding:
                                                            "0px 0px !important",
                                                          marginLeft: "109%",
                                                          marginTop: "-30px",
                                                        }}
                                                        className="input-group-addon"
                                                      >
                                                        AED
                                                      </div>
                                                      <input
                                                        type="hidden"
                                                        defaultValue="AED"
                                                        name="betweenapplicationcurrency_12"
                                                      />
                                                    </div>
                                                  </div>
                                                </div>
                                              </td>
                                              <td>
                                                <input
                                                  type="text"
                                                  size={6}
                                                  defaultValue
                                                  name="betweenapplicationavailability_12"
                                                  onkeyup="extractNumber(this,0,false);"
                                                  onblur="extractNumber(this,0,false);"
                                                  autoComplete="off"
                                                  className="form-control"
                                                />
                                              </td>
                                              <td>
                                                <input
                                                  type="text"
                                                  size={6}
                                                  defaultValue
                                                  name="betweenapplicationtimelimit_12"
                                                  onkeyup="extractNumber(this,0,false);"
                                                  onblur="extractNumber(this,0,false);"
                                                  autoComplete="off"
                                                  className="form-control"
                                                />
                                              </td>
                                              <td>
                                                <input
                                                  type="text"
                                                  size={6}
                                                  defaultValue
                                                  name="betweenapplicationminstay_12"
                                                  onkeyup="extractNumber(this,0,false);"
                                                  onblur="extractNumber(this,0,false);"
                                                  autoComplete="off"
                                                  className="form-control"
                                                />
                                              </td>
                                              <td>
                                                <div
                                                  className="radioline1"
                                                  style={{
                                                    textAlign: "center",
                                                  }}
                                                >
                                                  <div className="radio radio-success radio-inline">
                                                    <input
                                                      type="radio"
                                                      name="betweenapplicationstopsale_12"
                                                      defaultValue={1}
                                                      id="app"
                                                    />
                                                    <label htmlFor="1s">
                                                      FSS
                                                    </label>
                                                  </div>
                                                  <div className="radio radio-success radio-inline">
                                                    <input
                                                      type="radio"
                                                      name="betweenapplicationstopsale_12"
                                                      defaultValue={2}
                                                      id="app"
                                                    />
                                                    <label htmlFor={2}>
                                                      PSS
                                                    </label>
                                                  </div>
                                                  <div className="radio radio-success radio-inline">
                                                    <input
                                                      type="radio"
                                                      name="betweenapplicationstopsale_12"
                                                      defaultValue={3}
                                                      id="app"
                                                    />
                                                    <label htmlFor={3}>
                                                      FRS
                                                    </label>
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
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-group no-result">
                  <h5 className="text-center">No Result Found.</h5>
                </div>
              </div>
              <br />
              <div className="col-md-12 form-group">
                <button
                  type="button"
                  onclick="JavascriptsaveCalenderRates();"
                  value="Submit"
                  className="btn btn-dark btn-sm"
                >
                  <i className="fa fa-floppy-o" />
                  &nbsp;Save
                </button>
              </div>
              {/* /////////////////////////////////////////////// */}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default ContractsHotelAllotmentButton;
