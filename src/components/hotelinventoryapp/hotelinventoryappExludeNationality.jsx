import React, { useEffect } from "react";
import logo from "../../assets/images/logo.png";
import userlogo from "../../assets/images/user.png";
import { Link } from "react-router-dom";
import Constants from "../../constants/routes";

const HotelInventoryAppExcludeNationality = ({ setShowHeaderAndMenuBar }) => {
  // Update the state to hide Header and MenuBar
  useEffect(() => {
    setShowHeaderAndMenuBar(false);
    // Cleanup function to reset the state when the component unmounts
    return () => setShowHeaderAndMenuBar(true);
  }, [setShowHeaderAndMenuBar]);

  return (
    <>
      <div>
        <div className="color-line"></div>
        {/*-                                    NAv BAr Secton            */}
        <section>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <style
              dangerouslySetInnerHTML={{
                __html: "\n.bg-light{\nbackground-color:#fff !important;\n}\n",
              }}
            />
            <Link
              className="navbar-brand"
              to="#"
              style={{ paddingLeft: "23px", backgroundColor: "#f7f9fa" }}
            >
              <img
                src={logo}
                alt="Logo"
                height={50}
                style={{ width: "100px" }}
              />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav mr-auto" id="sizing">
                <li className="nav-item ">
                  <Link
                    className="nav-link"
                    to={Constants.URLConstants.HOTELINVENTORYAPPDASHBOARD}
                  >
                    Dashboard{" "}
                  </Link>
                </li>
                <li className="nav-item active dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Rates<span className="sr-only">(current)</span>
                  </Link>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <Link
                      className="dropdown-item"
                      to={Constants.URLConstants.HOTELINVENTORYAPP}
                    >
                      Manage Rates
                    </Link>
                    <Link
                      className="dropdown-item"
                      to={
                        Constants.URLConstants
                          .HOTELINVENTORYAPPEXCLUDENATIONALITY
                      }
                    >
                      Exclude Nationality
                    </Link>
                    <Link
                      className="dropdown-item"
                      to={
                        Constants.URLConstants.HOTELINVENTORYAPPEXCLUDECOUNTRY
                      }
                    >
                      Exclude Country of Residence
                    </Link>
                    <Link
                      className="dropdown-item"
                      to={Constants.URLConstants.HOTELINVENTORYAPPDELETERATES}
                    >
                      Delete Rates
                    </Link>
                    <Link
                      className="dropdown-item"
                      to={Constants.URLConstants.HOTELINVENTORYAPPOLDROOMRATES}
                    >
                      Old Room Rates
                    </Link>
                  </div>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to={Constants.URLConstants.HOTELINVENTORYAPPBOOKINGDETAILS}
                  >
                    Bookings
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Masters
                  </Link>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <Link
                      className="dropdown-item"
                      to={Constants.URLConstants.HOTELINVENTORYAPPHOTELSETTING}
                    >
                      Hotel Setting
                    </Link>
                    <Link
                      className="dropdown-item dropdown-toggle"
                      to="#"
                      id="roomCategoryDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Room Category
                    </Link>
                    <ul className="dropdown-menu dropdown-submenu" id="dru">
                      <li>
                        <Link
                          className="dropdown-item"
                          to={Constants.URLConstants.HOTELINVENTORYAPPMASTERADD}
                        >
                          Add
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to={
                            Constants.URLConstants.HOTELINVENTORYAPPMASTERSEARCH
                          }
                        >
                          Search
                        </Link>
                      </li>
                    </ul>
                    <Link
                      className="dropdown-item"
                      to={
                        Constants.URLConstants.HOTELINVENTORYAPPHOTELROOMMAPPING
                      }
                    >
                      Map Hotel Rooms
                    </Link>
                  </div>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to={Constants.URLConstants.HOTELINVENTORYAPPPOLICIES}
                  >
                    Policies
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to={Constants.URLConstants.HOTELINVENTORYAPPSUPPLIEMENTS}
                  >
                    Supplements
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to={Constants.URLConstants.HOTELINVENTORYAPPMANAGESEASON}
                  >
                    Manage Seasons
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to={Constants.URLConstants.HOTELINVENTORYAPPEXTRABED}
                  >
                    Extra-bed
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Offer
                  </Link>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <Link
                      className="dropdown-item"
                      to={Constants.URLConstants.HOTELINVENTORYAPPSEARCHOFFER}
                    >
                      Search
                    </Link>
                    <Link
                      className="dropdown-item"
                      to={Constants.URLConstants.HOTELINVENTORYAPPCREATEOFFER}
                    >
                      Create
                    </Link>
                  </div>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Reports
                  </Link>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <Link
                      className="dropdown-item"
                      to={Constants.URLConstants.HOTELINVENTORYAPPARRIVAL}
                    >
                      Arivals
                    </Link>
                    <Link
                      className="dropdown-item"
                      to={Constants.URLConstants.HOTELINVENTORYAPPEXPIRINGRATES}
                    >
                      Expiring Rates
                    </Link>
                    <Link
                      className="dropdown-item"
                      to={Constants.URLConstants.HOTELINVENTORYAPPRECENTCHANGES}
                    >
                      Recent Changes
                    </Link>
                  </div>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to={Constants.URLConstants.HOTELINVENTORYAPPCONTRACTS}
                  >
                    Contracts
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to={Constants.URLConstants.HOTELINVENTORYAPPTARIFFWRITER}
                  >
                    Tariff Writer
                  </Link>
                </li>
              </ul>
              <ul className="navbar-nav ml-auto" style={{ marginLeft: "auto" }}>
                <li className="nav-item">
                  <Link className="nav-link" to="#">
                    <img
                      src={userlogo}
                      alt="Account Logo"
                      height={45}
                      style={{
                        width: "41px",
                        padding: "8px",
                        border: "1px solid #eaebec",
                        borderRadius: "50%",
                      }}
                    />
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="#">
                    <i className="fa-solid fa-right-from-bracket" />
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </section>
        {/*    3rd Header for search booking          */}

        <div>
          {/*    3rd Header for search booking          */}
          <section>
            <header>
              <div className="row pt-0  pb-0 p-4">
                <div className="col-md-12">
                  <h5
                    style={{
                      fontSize: "30px",
                      fontWeight: 700,
                      margin: "0px",
                      padding: "0px",
                      textTransform: "uppercase",
                    }}
                  >
                    EXCLUDE NATIONALITY
                  </h5>
                </div>
              </div>
            </header>
          </section>

          {/*    Panel Body        */}
          <div
            className="container-fluid pt-0 p-4"
            id="content-pad"
            style={{ paddingLeft: "30px !important" }}
          >
            <div className="blue-box1 mt-3">
              <div className="row">
                <div className="col-md-2 mt-2">
                  <div className="labelTitle2">EXCLUDE NATIONALITY FOR</div>
                </div>
                <div className="col-md-4">
                  <select
                    className="selectpicker mt-2 form-control form-control-sm show-menu-arrow bs-select-hidden"
                    id="sel_branch"
                    name="sel_branch"
                    title="-Select-"
                    onchange="getAgentList(this.value)"
                    data-live-search="true"
                  >
                    <option className="bs-title-option" value />
                    <option label="Mumbai Branch" value={1}>
                      Mumbai Branch
                    </option>
                    <option label="UAE Branch" value={2}>
                      UAE Branch
                    </option>
                    <option label="UK Head Office" value={3}>
                      UK Head Office
                    </option>
                    <option label="Head Office" value={4}>
                      Head Office
                    </option>
                    <option label="Dubai GSA" value={5}>
                      Dubai GSA
                    </option>
                    <option label="London Branch" value={6}>
                      London Branch
                    </option>
                    <option label="Saudi Branch" value={7}>
                      Saudi Branch
                    </option>
                    <option label="Dubai V3 Wh" value={8}>
                      Dubai V3 Wh
                    </option>
                    <option label="Pune Branch" value={9}>
                      Pune Branch
                    </option>
                    <option label="India - GSA" value={10}>
                      India - GSA
                    </option>
                    <option label="Test Branch1" value={11}>
                      Test Branch1
                    </option>
                    <option label="Test Branch" value={13}>
                      Test Branch
                    </option>
                    <option label="Testffff" value={14}>
                      Testffff
                    </option>
                    <option label="FRANCHISE BRANCH" value={15}>
                      FRANCHISE BRANCH
                    </option>
                    <option label="Jcholidays" value={16}>
                      Jcholidays
                    </option>
                    <option label="Demo" value={17}>
                      Demo
                    </option>
                    <option label="malaysia" value={19}>
                      malaysia
                    </option>
                    <option label="GSA Iraq" value={20}>
                      GSA Iraq
                    </option>
                    <option label="Chennai" value={21}>
                      Chennai
                    </option>
                    <option label="Bangkok Branch" value={22}>
                      Bangkok Branch
                    </option>
                    <option label="suhas_branch" value={23}>
                      suhas_branch
                    </option>
                    <option label="Istanbul" value={24}>
                      Istanbul
                    </option>
                    <option label="hyderabad" value={25}>
                      hyderabad
                    </option>
                    <option label="hyderabad_suhas" value={26}>
                      hyderabad_suhas
                    </option>
                    <option label="branch_suhas" value={27}>
                      branch_suhas
                    </option>
                    <option label="New Joint Branch" value={28}>
                      New Joint Branch
                    </option>
                    <option label="Bahrain Branch" value={29}>
                      Bahrain Branch
                    </option>
                    <option label="Branch Bahrain" value={30}>
                      Branch Bahrain
                    </option>
                    <option label="testdddd" value={31}>
                      testdddd
                    </option>
                    <option label="Demo" value={32}>
                      Demo
                    </option>
                    <option label="HotelConfirm" value={33}>
                      HotelConfirm
                    </option>
                    <option label="HotelConfirm_Live" value={34}>
                      HotelConfirm_Live
                    </option>
                    <option label="GSA Branch" value={37}>
                      GSA Branch
                    </option>
                    <option label="Testpp" value={38}>
                      Testpp
                    </option>
                    <option label="Bolton Branch" value={41}>
                      Bolton Branch
                    </option>
                    <option label="World Avenue" value={42}>
                      World Avenue
                    </option>
                    <option label="TEST_BRANCH_A" value={43}>
                      TEST_BRANCH_A
                    </option>
                    <option label="TEST_BRANCH_JV_A" value={44}>
                      TEST_BRANCH_JV_A
                    </option>
                    <option label="TEST_BRANCH_JV_C" value={45}>
                      TEST_BRANCH_JV_C
                    </option>
                    <option label="world_avenue_malesia" value={46}>
                      world_avenue_malesia
                    </option>
                    <option label="World Avenues Malaysia" value={47}>
                      World Avenues Malaysia
                    </option>
                    <option label="test_branch_jv" value={48}>
                      test_branch_jv
                    </option>
                    <option label="1 Booking" value={49}>
                      1 Booking
                    </option>
                  </select>
                </div>
              </div>
            </div>
            {/* 2nd Form */}
            <form
              className="mt-3"
              style={{ paddingTop: "16px", paddingBottom: "20px" }}
            >
              <div className="panel-body noTopBorder">
                <div className="row">
                  <div className="col-md-12 " id="step5">
                    <div className="table-responsive">
                      <table className="table table-bordered  deleteratetable">
                        <thead>
                          <tr className="h-bg-navy-blue fontWhite">
                            <th ng-show="SpoRatesDelete" className="ng-hide">
                              SPO Offer
                            </th>
                            <th ng-show="SpoRatesDelete" className="ng-hide">
                              Inventory Class
                            </th>
                            <th>Rate Profile</th>
                            <th>Room Category</th>
                            <th>Meal Basis</th>
                            <th
                              ng-show="AgentWiseRates && !SpoRatesDelete"
                              className="ng-hide"
                            >
                              Agent Rate Type
                            </th>
                            <th
                              ng-show="fitPackageRateType && actionType == 'delete' && !SpoRatesDelete"
                              className="ng-hide"
                            >
                              Rate Type
                            </th>
                            <th>
                              <div
                                className="btn-group text-center m-b-md"
                                id="wizardControl1"
                              >
                                <Link
                                  ng-click="setDateType('period')"
                                  className="btn btn-sm btn-success"
                                  data-target="#step11"
                                  data-bs-toggle="tab"
                                >
                                  Period
                                </Link>
                                <Link
                                  ng-click="setDateType('season')"
                                  className="btn btn-sm btn-default"
                                  data-target="#step21"
                                  data-bs-toggle="tab"
                                >
                                  Season
                                </Link>
                              </div>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          <tr>
                            <td
                              ng-show="SpoRatesDelete"
                              className="text-center width15Percent ng-hide"
                            >
                              <select
                                data-live-search="true"
                                data-container="body"
                                id="cSpoOfferName"
                                ng-model="SpoOfferNameModel"
                                className="selectpicker show-menu-arrow form-control form-control-sm form_element required spooffernameFilter ng-pristine ng-untouched ng-valid bs-select-hidden ng-empty"
                              >
                                <option value>Please Select</option>
                                {/* ngRepeat: spoOffername in aSpoOfferName */}
                              </select>
                            </td>
                            <td
                              ng-show="SpoRatesDelete"
                              className="text-center width15Percent ng-hide"
                            >
                              <select
                                name="SpoInventory"
                                data-actions-box="true"
                                data-live-search="true"
                                data-container="body"
                                id="cInventoryRoomClassID"
                                ng-model="InventoryRoomClassModel"
                                className="selectpicker show-menu-arrow form-control form-control-sm form_element required spooffernameFilter ng-pristine ng-untouched ng-valid bs-select-hidden ng-empty"
                              >
                                <option data-hidden="true" value>
                                  Please Select Inventory Class
                                </option>
                                {/* ngRepeat: (id,inventory_room_class) in aInventoryClass */}
                              </select>
                            </td>
                            <td className="text-center width15Percent">
                              <select
                                data-actions-box="true"
                                data-live-search="true"
                                data-container="body"
                                id="cMarketProfileID"
                                ng-model="marketProfileModel"
                                className="selectpicker show-menu-arrow form-control form-control-sm form_element required ng-pristine ng-untouched ng-valid bs-select-hidden ng-empty"
                              >
                                <option data-hidden="true" value>
                                  - Please Select -
                                </option>
                                {/* ngRepeat: x in aSupplierProfile */}
                                <option
                                  value={67}
                                  ng-repeat="x in aSupplierProfile"
                                  className="ng-binding ng-scope"
                                >
                                  AFRICAN MARKET
                                </option>
                                {/* end ngRepeat: x in aSupplierProfile */}
                                <option
                                  value={31}
                                  ng-repeat="x in aSupplierProfile"
                                  className="ng-binding ng-scope"
                                >
                                  APAC
                                </option>
                                {/* end ngRepeat: x in aSupplierProfile */}
                                <option
                                  value={68}
                                  ng-repeat="x in aSupplierProfile"
                                  className="ng-binding ng-scope"
                                >
                                  CIS- RUSSIA MARKET
                                </option>
                                {/* end ngRepeat: x in aSupplierProfile */}
                                <option
                                  value={69}
                                  ng-repeat="x in aSupplierProfile"
                                  className="ng-binding ng-scope"
                                >
                                  EUROPE MARKET
                                </option>
                                {/* end ngRepeat: x in aSupplierProfile */}
                                <option
                                  value={70}
                                  ng-repeat="x in aSupplierProfile"
                                  className="ng-binding ng-scope"
                                >
                                  FAR EAST
                                </option>
                                {/* end ngRepeat: x in aSupplierProfile */}
                                <option
                                  value={71}
                                  ng-repeat="x in aSupplierProfile"
                                  className="ng-binding ng-scope"
                                >
                                  GCC- MARKET
                                </option>
                                {/* end ngRepeat: x in aSupplierProfile */}
                                <option
                                  value={72}
                                  ng-repeat="x in aSupplierProfile"
                                  className="ng-binding ng-scope"
                                >
                                  GCC-UAE&amp;SA
                                </option>
                                {/* end ngRepeat: x in aSupplierProfile */}
                                <option
                                  value={73}
                                  ng-repeat="x in aSupplierProfile"
                                  className="ng-binding ng-scope"
                                >
                                  SUB-C MARKET
                                </option>
                                {/* end ngRepeat: x in aSupplierProfile */}
                                <option
                                  value={74}
                                  ng-repeat="x in aSupplierProfile"
                                  className="ng-binding ng-scope"
                                >
                                  USA MARKET
                                </option>
                                {/* end ngRepeat: x in aSupplierProfile */}
                              </select>
                            </td>
                            <td className="text-center width15Percent">
                              <select
                                data-actions-box="true"
                                data-live-search="true"
                                data-container="body"
                                id="cRoomClassID"
                                ng-model="RoomClassModel"
                                className="selectpicker show-menu-arrow form-control form-control-sm form_element required ng-pristine ng-untouched ng-valid bs-select-hidden ng-empty"
                              >
                                <option data-hidden="true" value>
                                  - Please Select -
                                </option>
                                {/* ngRepeat: x in aRoomClass */}
                                <option
                                  value={123}
                                  ng-repeat="x in aRoomClass"
                                  className="ng-binding ng-scope"
                                >
                                  Classic - Triple{" "}
                                </option>
                                {/* end ngRepeat: x in aRoomClass */}
                              </select>
                            </td>
                            <td className="text-center width15Percent">
                              <select
                                data-actions-box="true"
                                data-live-search="true"
                                data-container="body"
                                id="cRoomBasisID"
                                ng-model="RoomBasisModel"
                                className="selectpicker show-menu-arrow form-control form-control-sm form_element required ng-pristine ng-untouched ng-valid bs-select-hidden ng-empty"
                              >
                                <option data-hidden="true" value>
                                  - Please Select -
                                </option>
                                {/* ngRepeat: x in aRoomBasis */}
                                <option
                                  value={2}
                                  ng-repeat="x in aRoomBasis"
                                  className="ng-binding ng-scope"
                                >
                                  Half Board
                                </option>
                                {/* end ngRepeat: x in aRoomBasis */}
                                <option
                                  value={3}
                                  ng-repeat="x in aRoomBasis"
                                  className="ng-binding ng-scope"
                                >
                                  Breakfast
                                </option>
                                {/* end ngRepeat: x in aRoomBasis */}
                                <option
                                  value={5}
                                  ng-repeat="x in aRoomBasis"
                                  className="ng-binding ng-scope"
                                >
                                  ULTRA All
                                </option>
                                {/* end ngRepeat: x in aRoomBasis */}
                                <option
                                  value={6}
                                  ng-repeat="x in aRoomBasis"
                                  className="ng-binding ng-scope"
                                >
                                  Superior
                                </option>
                                {/* end ngRepeat: x in aRoomBasis */}
                                <option
                                  value={7}
                                  ng-repeat="x in aRoomBasis"
                                  className="ng-binding ng-scope"
                                >
                                  Bed &amp;amp; Breakfast
                                </option>
                                {/* end ngRepeat: x in aRoomBasis */}
                                <option
                                  value={9}
                                  ng-repeat="x in aRoomBasis"
                                  className="ng-binding ng-scope"
                                >
                                  Breakfast and dinner
                                </option>
                                {/* end ngRepeat: x in aRoomBasis */}
                                <option
                                  value={10}
                                  ng-repeat="x in aRoomBasis"
                                  className="ng-binding ng-scope"
                                >
                                  buffet breakfast
                                </option>
                                {/* end ngRepeat: x in aRoomBasis */}
                                <option
                                  value={11}
                                  ng-repeat="x in aRoomBasis"
                                  className="ng-binding ng-scope"
                                >
                                  Breakfast Included
                                </option>
                                {/* end ngRepeat: x in aRoomBasis */}
                                <option
                                  value={30}
                                  ng-repeat="x in aRoomBasis"
                                  className="ng-binding ng-scope"
                                >
                                  BB
                                </option>
                                {/* end ngRepeat: x in aRoomBasis */}
                                <option
                                  value={31}
                                  ng-repeat="x in aRoomBasis"
                                  className="ng-binding ng-scope"
                                >
                                  Bed Only
                                </option>
                                {/* end ngRepeat: x in aRoomBasis */}
                                <option
                                  value={32}
                                  ng-repeat="x in aRoomBasis"
                                  className="ng-binding ng-scope"
                                >
                                  Dinner Buffet
                                </option>
                                {/* end ngRepeat: x in aRoomBasis */}
                                <option
                                  value={33}
                                  ng-repeat="x in aRoomBasis"
                                  className="ng-binding ng-scope"
                                >
                                  Room Only.
                                </option>
                                {/* end ngRepeat: x in aRoomBasis */}
                              </select>
                            </td>
                            <td
                              className="text-center width15Percent ng-hide"
                              ng-show="AgentWiseRates && !SpoRatesDelete"
                            >
                              <select
                                data-container="body"
                                data-actions-box="true"
                                id="agentProfileID"
                                data-live-search="true"
                                ng-model="AgentProfileModel"
                                className="selectpicker form_element show-menu-arrow form-control form-control-sm ng-pristine ng-untouched ng-valid bs-select-hidden ng-empty"
                              >
                                <option value data-hidden="true">
                                  - Please Select -
                                </option>
                                {/* ngRepeat: x in agentProfiles */}
                              </select>
                            </td>
                            <td
                              className="text-center width15Percent ng-hide"
                              ng-show="fitPackageRateType && actionType == 'delete' && !SpoRatesDelete"
                            >
                              <select
                                id="fitPackageRateType"
                                ng-options="opt as opt.ratetypeName for opt in fitPackageRateTypeList"
                                className="selectpicker form_element show-menu-arrow form-control form-control-sm required ng-pristine ng-untouched ng-valid bs-select-hidden ng-not-empty"
                                ng-model="fitPackageRateSelected"
                                data-container="body"
                                data-live-search="true"
                              >
                                <option value="?" selected="selected" />
                              </select>
                            </td>
                            <td className="text-center width15Percent">
                              <div
                                id="datePick"
                                className="input-group date input-daterange"
                                ng-show="dateType=='period'"
                              >
                                <input
                                  type="text"
                                  ng-model="from_date"
                                  id="date1"
                                  name="date1"
                                  className="form-control form-control-sm form_element required ng-pristine ng-untouched ng-valid ng-empty"
                                  date="dd-MM-yyyy"
                                />
                                <span className="input-group-addon">To</span>
                                <input
                                  type="text"
                                  ng-model="to_date"
                                  id="date2"
                                  name="date2"
                                  className="form-control form-control-sm form_element required ng-pristine ng-untouched ng-valid ng-empty"
                                  date="dd-MM-yyyy"
                                />
                              </div>
                              <span
                                className="form-group ng-hide"
                                ng-show="dateType=='season'"
                              >
                                <select
                                  id="SelectSeason"
                                  data-container="body"
                                  ng-change="setDate();"
                                  ng-model="SeasonModel"
                                  className="selectpicker show-menu-arrow form-control form_element seasonLists required ng-pristine ng-untouched ng-valid bs-select-hidden ng-empty"
                                >
                                  <option value>Select Season</option>
                                  {/* ngRepeat: x in seasonlist */}
                                </select>
                                <div className="btn-group bootstrap-select show-menu-arrow form-control form_element seasonLists required ng-pristine ng-untouched ng-valid ng-empty">
                                  <button
                                    type="button"
                                    className="btn dropdown-toggle btn-default"
                                    data-toggle="dropdown"
                                    data-id="SelectSeason"
                                    title="Select Season"
                                  >
                                    <span className="filter-option pull-left">
                                      Select Season
                                    </span>
                                    &nbsp;
                                    <span className="caret" />
                                  </button>
                                  <div className="dropdown-menu open">
                                    <ul
                                      className="dropdown-menu inner"
                                      role="menu"
                                    >
                                      <li
                                        data-original-index={0}
                                        className="selected"
                                      >
                                        <Link
                                          tabIndex={0}
                                          className
                                          data-tokens="null"
                                        >
                                          <span className="text">
                                            Select Season
                                          </span>
                                          <span className="glyphicon glyphicon-ok check-mark" />
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <form className="mt-3" style={{ borderTop: "1px solid green" }}>
              <div
                className="panel-body hgreen"
                ng-hide="actionType == 'delete'"
                ng-show="tab=='Add'"
              >
                <div className="row">
                  <div className="col-md-12 form-group labelblack">
                    <label>Countries</label>&nbsp;
                    <i
                      className="fa fa-info-circle"
                      data-toggle="tooltip"
                      data-placement="top"
                      title
                      data-original-title="This Mapping Is To Exclude Countries From Current Market Profile"
                    />
                  </div>
                  <div
                    className="form-group col-md-5 col-sm-5"
                    ng-show="type=='Nationality'"
                  >
                    <select
                      name="sel_countries"
                      id="sel_countries"
                      className="form-control ng-pristine ng-untouched ng-valid ng-empty"
                      style={{ height: "200px" }}
                      size={15}
                      ng-model="sel_countries"
                    >
                      {/* ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={97}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Afghanistan
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={402}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        African
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={43}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Albania
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={142}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Algerian
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={1}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        American
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={44}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Andorran
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={143}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        ANGOLA
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={230}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Antiguan - Barbudan
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={29}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Argentina
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={45}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Armenian
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={231}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Aruban
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={196}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Australian
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={46}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Austrian
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={47}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Azerbaijani
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={3}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Bahamian
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={98}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Bahraini
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={99}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Bangladeshi
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={4}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Barbadian
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={145}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Batswana
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={48}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Belarusian
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={49}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Belgian
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={5}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Belizean
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={144}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Benin
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={6}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Bermuda
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={100}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Bhutan
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={30}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Bolivian
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={416}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Bonaire, Sint Eustatius and Saba(Dutch)
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={50}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Bosnia and Herzegovina
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={31}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Brazilian
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={95}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        British
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={7}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        British Virgin Islands
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={101}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Bruneian
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={51}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Bulgarian
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={146}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        BURKINA FASO
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={147}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Burundi
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={102}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Cambodian
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={148}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Cameroonian
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={2}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Canadian
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={413}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Carribean(Saint-Kitts&amp;Nevis)
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={8}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Cayman Islands
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={150}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Central African Republic
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={151}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Chad
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={32}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Chilean
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={103}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Chinese
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={33}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Colombian
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={153}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Congolese
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={9}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Costa Rican
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={52}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Croatian
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={10}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Cuba
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={415}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Curacao(Dutch)
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={53}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Cypriot
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={54}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Czech
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={55}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Danish
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={154}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Djibouti
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={11}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Dominica
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={12}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Dominican (Dominican Republic)
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={419}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Dutch
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={104}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        East Timor
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={34}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Ecuador
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={155}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Egyptian
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={138}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Emirati
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={156}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Equatorial Guinea
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={157}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Eritrea
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={56}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Estonian
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={158}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Ethiopia
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={35}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Falkland Islands
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={198}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Fiji
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={57}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Finnish
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={58}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        French
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={36}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        French Guiana
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={199}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        French Polynesia
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={159}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Gabon
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={160}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Gambian
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={59}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Georgian
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={60}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        German
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={161}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Ghanaian
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={61}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Gibraltarian
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={62}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Greece
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={404}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        GREEK
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={14}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Greenland
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={15}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Grenadian
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={16}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Guadeloupe
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={200}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Guam
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={17}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Guatemalan
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={63}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Guernsey
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={162}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Guinea
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={163}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Guinea-Bissau
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={37}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Guyana
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={18}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Haiti
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={19}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Honduras
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={105}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Hong Kong
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={64}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Hungarian
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={65}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Icelander
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={106}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Indian
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={107}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Indonesian
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={108}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Iranian
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={109}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        IRAQI
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={66}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Irish
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={67}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Isle of Man
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={110}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Israeli
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={68}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Italian
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={164}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Ivory Coast
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={20}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Jamaican
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={111}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Japanese
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={69}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Jersey
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={112}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Jordanian
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={113}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Kazakhstani
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={165}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Kenyan
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={201}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Kiribati
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={131}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        KOREAN
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={70}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Kosovo
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={114}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Kuwaiti
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={115}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Kyrgyzstan
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={116}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Lao
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={71}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Latvian
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={117}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Lebanese
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={166}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Lesotho
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={167}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Liberia
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={168}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Libyan
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={72}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Liechtenstein
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={73}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Lithuanian
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={74}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Luxembourger
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={118}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Macau
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={75}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Macedonia
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={169}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Madagascar
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={170}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Malawi
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={119}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Malaysian
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={120}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Maldivian
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={171}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Mali
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={76}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Maltese
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={202}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Marshall Islands
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={21}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Martiniquais
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={172}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Mauritania
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={173}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Mauritius
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={22}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Mexican
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={203}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Micronesia
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={77}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Moldova
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={78}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Monacan
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={121}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Mongolia
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={79}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Montenegrin
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={23}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Montserrat
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={174}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Moroccan
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={175}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Mozambican
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={122}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Myanmar (Burma)
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={176}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Namibian
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={204}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Nauru
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={123}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Nepalese
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={80}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Netherlander
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={205}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        New Caledonia
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={197}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        New Zealander
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={412}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        NewZealand
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={24}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Nicaragua
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={177}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Niger
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={178}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Nigerian
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={124}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        North Korea
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={422}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Northern Ireland(British)
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={414}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Northern Mariana Islands(American)
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={81}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Norwegian
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={125}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Omani
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={126}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Pakistani
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={418}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Palaun
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={228}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Palestinia
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={25}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Panamanian
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={206}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Papua New Guinea
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={38}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Paraguayan
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={39}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Peruvian
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={127}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Philippine
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={82}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Polish
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={83}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Portuguese
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={26}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Puerto Rican
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={128}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Qatari
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={152}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Republic of the Congo
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={179}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Reunion
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={84}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Romanian
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={85}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Russian
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={180}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Rwanda
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={400}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        SAINT BARTHELEMY
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={401}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Saint Lucia
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={417}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Saint Martin(Carribean)
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={13}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Salvadoran
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={207}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Samoa
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={86}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        San Marino
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={181}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Sao Tome and Principe
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={129}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Saudi
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={421}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Scotland(British)
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={182}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Senegalese
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={87}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Serbian
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={183}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Seychelles
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={184}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Sierra Leone
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={130}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Singaporean
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={88}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Slovakian
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={89}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Slovenian
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={208}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Solomon Islands
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={185}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Somalia
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={186}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        South African
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={90}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Spanish
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={132}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Sri Lankan
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={187}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Sudan
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={403}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Sudanese
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={40}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Suriname
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={188}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Swaziland
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={91}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Swedish
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={92}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Swiss
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={133}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Syrian Arab Republic
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={134}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Taiwan
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={135}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Tajikistan
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={189}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Tanzanian
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={136}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Thai
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={190}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Togo
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={209}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Tonga
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={27}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Trinidad and Tobago
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={191}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Tunisian
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={93}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Turkish
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={411}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        TURKISH CYPRIOT
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={137}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Turkmenistan
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={410}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Turks and Caicos Islands
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={210}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Tuvalu
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={192}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Ugandan
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={94}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Ukrainian
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={28}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        United States Virgin Islands
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={41}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Uruguayan
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={139}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Uzbekistan
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={211}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Vanuatu
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={96}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Vatican City
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={42}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Venezuelan
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={149}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Verdean
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={140}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Vietnamese
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={420}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Wales (British)
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={212}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Wallis and Futuna
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={193}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Western Sahara
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={141}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Yemen
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={194}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Zambian
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={195}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Zimbabwe
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                    </select>
                    <br />
                    <button
                      type="button"
                      data-content="select_all_left_active"
                      className="ActionBoxLeft btn btn-primary btn-sm form-group"
                    >
                      Select All Countries
                    </button>
                  </div>
                  <div
                    className="form-group col-md-5 col-sm-5 ng-hide"
                    ng-show="type=='Residence'"
                  >
                    <select
                      name="sel_countries"
                      id="sel_countries"
                      className="form-control ng-pristine ng-untouched ng-valid ng-empty"
                      style={{ height: "200px" }}
                      size={15}
                      ng-model="sel_countries"
                    >
                      {/* ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={97}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Afghanistan
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={402}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Comoros
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={43}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Albania
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={142}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Algeria
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={1}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        United States
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={44}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Andorra
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={143}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Angola
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={230}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Antigua and Barbuda
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={29}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Argentina
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={45}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Armenia
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={231}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Aruba
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={196}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Australia
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={46}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Austria
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={47}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Azerbaijan
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={3}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Bahamas
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={98}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Bahrain
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={99}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Bangladesh
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={4}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Barbados
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={145}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Botswana
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={48}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Belarus
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={49}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Belgium
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={5}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Belize
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={144}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Benin
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={6}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Bermuda
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={100}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Bhutan
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={30}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Bolivia
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={416}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Bonaire, Sint Eustatius and Saba
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={50}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Bosnia and Herzegovina
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={31}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Brazil
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={95}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        United Kingdom
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={7}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        British Virgin Islands
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={101}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Brunei
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={51}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Bulgaria
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={146}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Burkina Faso
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={147}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Burundi
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={102}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Cambodia
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={148}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Cameroon
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={2}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Canada
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={413}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Saint Kitts and Nevis
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={8}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Cayman Islands
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={150}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Central African Republic
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={151}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Chad
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={32}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Chile
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={103}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        China
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={33}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Colombia
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={153}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Congo-Kinshasa
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={9}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Costa Rica
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={52}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Croatia
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={10}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Cuba
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={415}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Curacao
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={53}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Cyprus
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={54}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Czech Republic
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={55}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Denmark
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={154}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Djibouti
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={11}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Dominica
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={12}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Dominican Republic
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={419}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Saint Vincent and The Grenadines
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={104}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        East Timor
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={34}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Ecuador
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={155}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Egypt
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={138}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        United Arab Emirates
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={156}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Equatorial Guinea
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={157}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Eritrea
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={56}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Estonia
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={158}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Ethiopia
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={35}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Falkland Islands
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={198}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Fiji
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={57}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Finland
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={58}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        France
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={36}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        French Guiana
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={199}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        French Polynesia
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={159}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Gabon
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={160}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Gambia
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={59}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Georgia
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={60}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Germany
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={161}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Ghana
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={61}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Gibraltar
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={62}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Greece
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={404}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Greece Islands
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={14}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Greenland
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={15}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Grenada
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={16}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Guadeloupe
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={200}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Guam
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={17}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Guatemala
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={63}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Guernsey
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={162}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Guinea
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={163}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Guinea-Bissau
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={37}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Guyana
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={18}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Haiti
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={19}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Honduras
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={105}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Hong Kong
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={64}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Hungary
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={65}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Iceland
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={106}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        India
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={107}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Indonesia
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={108}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Iran
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={109}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Iraq
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={66}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Ireland
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={67}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Isle of Man
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={110}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Israel
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={68}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Italy
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={164}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Ivory Coast
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={20}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Jamaica
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={111}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Japan
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={69}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Jersey
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={112}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Jordan
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={113}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Kazakhstan
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={165}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Kenya
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={201}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Kiribati
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={131}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        South Korea
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={70}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Kosovo
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={114}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Kuwait
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={115}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Kyrgyzstan
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={116}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Laos
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={71}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Latvia
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={117}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Lebanon
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={166}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Lesotho
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={167}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Liberia
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={168}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Libya
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={72}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Liechtenstein
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={73}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Lithuania
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={74}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Luxembourg
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={118}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Macau
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={75}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Macedonia
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={169}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Madagascar
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={170}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Malawi
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={119}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Malaysia
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={120}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Maldives
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={171}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Mali
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={76}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Malta
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={202}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Marshall Islands
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={21}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Martinique
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={172}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Mauritania
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={173}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Mauritius
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={22}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Mexico
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={203}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Micronesia
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={77}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Moldova
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={78}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Monaco
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={121}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Mongolia
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={79}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Montenegro
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={23}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Montserrat
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={174}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Morocco
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={175}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Mozambique
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={122}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Myanmar (Burma)
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={176}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Namibia
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={204}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Nauru
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={123}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Nepal
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={80}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Netherlands
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={205}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        New Caledonia
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={197}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        New Zealand
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={412}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Cook Islands
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={24}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Nicaragua
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={177}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Niger
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={178}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Nigeria
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={124}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        North Korea
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={422}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Northern Ireland
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={414}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Northern Mariana Islands
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={81}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Norway
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={125}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Oman
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={126}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Pakistan
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={418}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Palau
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={228}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Palestine
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={25}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Panama
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={206}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Papua New Guinea
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={38}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Paraguay
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={39}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Peru
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={127}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Philippines
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={82}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Poland
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={83}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Portugal
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={26}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Puerto Rico
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={128}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Qatar
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={152}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Congo-Brazzaville
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={179}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Reunion
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={84}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Romania
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={85}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Russia
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={180}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Rwanda
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={400}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Saint Barthelemy
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={401}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Saint Lucia
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={417}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Saint Martin
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={13}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        El Salvador
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={207}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Samoa
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={86}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        San Marino
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={181}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Sao Tome and Principe
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={129}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Saudi Arabia
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={421}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Scotland
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={182}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Senegal
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={87}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Serbia
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={183}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Seychelles
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={184}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Sierra Leone
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={130}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Singapore
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={88}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Slovakia
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={89}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Slovenia
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={208}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Solomon Islands
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={185}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Somalia
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={186}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        South Africa
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={90}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Spain
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={132}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Sri Lanka
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={187}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Sudan
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={403}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        South Sudan
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={40}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Suriname
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={188}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Swaziland
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={91}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Sweden
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={92}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Switzerland
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={133}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Syria
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={134}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Taiwan
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={135}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Tajikistan
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={189}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Tanzania
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={136}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Thailand
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={190}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Togo
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={209}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Tonga
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={27}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Trinidad and Tobago
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={191}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Tunisia
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={93}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Turkey
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={411}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Northern Cyprus
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={137}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Turkmenistan
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={410}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Turks and Caicos Islands
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={210}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Tuvalu
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={192}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Uganda
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={94}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Ukraine
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={28}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        United States Virgin Islands
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={41}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Uruguay
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={139}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Uzbekistan
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={211}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Vanuatu
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={96}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Vatican City
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={42}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Venezuela
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={149}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Cape Verde
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={140}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Vietnam
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={420}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Wales
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={212}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Wallis and Futuna
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={193}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Western Sahara
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={141}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Yemen
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={194}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Zambia
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                      <option
                        ng-repeat="x in ::countries"
                        value={195}
                        ng-selected="false"
                        className="ng-binding ng-scope"
                      >
                        Zimbabwe
                      </option>
                      {/* end ngRepeat: x in ::countries */}
                    </select>
                    <br />
                    <button
                      type="button"
                      data-content="select_all_left_active"
                      className="ActionBoxLeft btn btn-primary form-group"
                    >
                      Select All Countries
                    </button>
                  </div>
                  <div className="col-md-2 text-center col-sm-2">
                    <input
                      className="btn w-xs btn-primary"
                      ng-click="left_to_right();"
                      defaultValue=">>"
                      style={{
                        marginTop: "2em",
                        paddingLeft: "30px",
                        paddingRight: "30px",
                      }}
                      type="button"
                    />
                    <br />
                    <br />
                    <input
                      className="btn w-xs btn-primary"
                      ng-click="right_to_left();"
                      defaultValue="<<"
                      style={{
                        marginTop: "3em",
                        paddingLeft: "30px",
                        paddingRight: "30px",
                      }}
                      type="button"
                    />
                  </div>
                  <div className="form-group col-md-5 col-sm-5">
                    <select
                      name="sel_right_members[]"
                      id="sel_right_members[]"
                      ng-model="exclude"
                      className="form-control sel_right_members ng-pristine ng-untouched ng-valid ng-empty"
                      style={{ height: "200px" }}
                      size={15}
                    />
                    <br />
                    <button
                      type="button"
                      data-content="select_all_right_active"
                      className="ActionBoxRight btn btn-primary btn-sm form-group"
                    >
                      Select All Countries
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  name="b1"
                  className="btn btn-primary btn-sm form-group"
                  ng-click="save();"
                >
                  <i className="fa fa-floppy-o" />
                  &nbsp;Save
                </button>
              </div>
            </form>
          </div>
        </div>

        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n\n\n@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap');\n@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');\n\n\nheader,.form-group label,#firstNav,textarea{\n  font-family: \"MONTSERRAT\";\n}\ntextarea{\n  font-size: 12px !important;\n    font-family: 'Montserrat'!important;\n}\nheader span{\n  font-weight: normal;\n}\np{\n  font-size: 11px!important;\n}\n::placeholder{\n  font-size: 12px;\n}\nbody{\n  margin: 0px !important;\n  padding:0px !important;\n  overflow-x: hidden; /* Hide horizontal scrollbar */\n  background-color: rgb(237,240,245)!important;\n}\n.color-line {\n  background: #f7f9fa;\n  height: 6px;\n  background-image: -webkit-linear-gradient(left, #34495e, #34495e 25%, #9b59b6 25%, #9b59b6 35%, #3498db 35%, #3498db 45%, #62cb31 45%, #62cb31 55%, #ffb606 55%, #ffb606 65%, #e67e22 65%, #e67e22 75%, #e74c3c 85%, #e74c3c 85%, #c0392b 85%, #c0392b 100%);\n  background-image: -moz-linear-gradient(left, #34495e, #34495e 25%, #9b59b6 25%, #9b59b6 35%, #3498db 35%, #3498db 45%, #62cb31 45%, #62cb31 55%, #ffb606 55%, #ffb606 65%, #e67e22 65%, #e67e22 75%, #e74c3c 85%, #e74c3c 85%, #c0392b 85%, #c0392b 100%);\n  background-image: -ms-linear-gradient(left, #34495e, #34495e 25%, #9b59b6 25%, #9b59b6 35%, #3498db 35%, #3498db 45%, #62cb31 45%, #62cb31 55%, #ffb606 55%, #ffb606 65%, #e67e22 65%, #e67e22 75%, #e74c3c 85%, #e74c3c 85%, #c0392b 85%, #c0392b 100%);\n  background-image: linear-gradient(to right, #34495e, #34495e 25%, #9b59b6 25%, #9b59b6 35%, #3498db 35%, #3498db 45%, #62cb31 45%, #62cb31 55%, #ffb606 55%, #ffb606 65%, #e67e22 65%, #e67e22 75%, #e74c3c 85%, #e74c3c 85%, #c0392b 85%, #c0392b 100%);\n  background-size: 100% 6px;\n  background-position: 50% 100%;\n  background-repeat: no-repeat;\n}\n\n.color-lineorange {\n  background: #f7f9fa;\n  height: 6px;\n  background: #ffb606;\n  background-size: 100% 6px;\n  background-position: 50% 100%;\n  background-repeat: no-repeat;\n}\n.color-linegreen {\n  background: #f7f9fa;\n  height: 6px;\n  background: #62cb31;\n  background-size: 100% 6px;\n  background-position: 50% 100%;\n  background-repeat: no-repeat;\n}\n\n#content-pad{\n  padding: 0px 15px 50px 15px!important;\n \n}\nform{\n  background: white!important;\n  padding-left: 13px;\n  padding-top: 6px;\n  padding-bottom:25px;\n  padding-right: 30px;\n}\n\n.navbar {\n  --bs-navbar-padding-y: -0.5rem !important;\n}\n\n#navbarSupportedContent {\n  flex: inherit;\n\n}\n.navbar-toggler{\n  float: right;\n}\n.cancelNot1 h2{\n  text-shadow: 1px 1px 1px #000;\n}\n\n.navbar-collapse {\n  margin-right: 70px;\n}\n#firstNav{\n  background-color: rgb(255,255,255)!important;\n}\n\n#secondNav {\n  background-color: #FF5015;\n  height: 39px;\n}\n\n#drip {\n  float: left;\n  background-color: #FF5015;\n  border-right: 1px solid #ddd;\n}\n\n\n#drip:hover a{\n  background: rgb(255, 255, 255);\n  color: #6a6c6f;\n  padding-left:10px;\n  padding-right:10px;\n  margin:auto;\n}\n\n\n\n\n\n#dripmenu {\n  display:none;\n  position: absolute;\n  background-color: #f9f9f9;\n  min-width: 160px;\n  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);\n  z-index: 1;\n}\n\n#dripmenu a {\n  float: none;\n  color: #6a6c6f;\n  padding: 12px 16px;\n  font-size: 11px;\n  text-decoration: none;\n  display: block;\n  text-align: left;\n}\n\n#dripmenu a:hover {\n  background-color: #ddd;\n\n}\n\n#drip:hover #dripmenu {\n  display: block;\n  padding-top: 0px;\n  padding-bottom: 0px;\n}\n\n.dropdown-menu .dropdown-submenu {\n  display: none;\n  position: absolute;\n  left: 100%;\n  top: 40px;\n  padding-top: 0px;\n  padding-bottom: 0px;\n}\n\n#customerSub {\n  top: 10px;\n}\n\n#agentsub {\n  top: 0px;\n}\n#subscribersub {\n  top: 40px;\n}\n#accountsub {\n  top: 68px;\n}\n#accountsub1 {\n  top: 90px;\n  left: -153px;}\n\n#mappingsub {\n  top: 80px;\n}\n\n#mappinggsub {\n  top: 118px;\n}\n#mappingggsub {\n  top: 128px;\n}\n#transsub {\n  top: 162px;\n}\n#exchangesub {\n  top: 158px;\n}\n\n#trxsub {\n  top: 200px;\n}\n\n#suppsub {\n  top: 240px;\n}\n\n#marksub {\n  top: 320px;\n}\n\n#mealsub {\n  top: 290px;\n}\n\n#marketsub {\n  top: 370px;\n}\n\n#paysub {\n  top: 400px;\n}\n\n#banksub {\n  top: 480px;\n}\n\n#cursub {\n  top: 530px;\n}\n\n#taxsub {\n  top: 570px;\n}\n\n#loyaltysub {\n  top: 610px;\n}\n\n#vehiclesub {\n  top: 740px;\n}\n\n.dropdown-menu .dropdown-submenu-left {\n  right: 100%;\n  left: auto;\n}\n\n.dropdown-menu>li:hover>.dropdown-submenu {\n  display: block;\n}\n\n\nheader {\n\n  color:#6a6c6f;\n  font-weight: 400;\n  padding: 10px 4px 4px;\n  transition: all .3s;\n  border: 1px solid transparent;\n  background-color: #edf0f5!important;\n}\n\n.cancelNot1 {\n  background: #FFA0A0;\n  padding: 10px;\n}\n\n\n\nthead {\n  background-color: #FF5015;\n  font-size: 11px;\n  color: #f9f9f9;\n}\n\nth {\n  font-size: 10px;\n  text-align: center !important;\n}\n\ntd {\n  font-size: 10px;\n  text-align: center !important;\n  color: #6A6C6F;\n}\ntd a:hover{\ntext-decoration: underline !important;\n}\n\n.dateWrapper {\n  text-align: center;\n  margin: 0px auto;\n  width: 32px;\n}\n\n.dateWrapper .onlyDate {\n  background-color: #fff;\n  border-radius: 5px 5px 0px 0px;\n  font-size: 13pt;\n  padding: 0px;\n  border: 1px solid #bcb9b9;\n  font-weight: 600;\n}\n\n.dateWrapper .monthYear {\n  background-color: rgb(160, 157, 157);\n  border-radius: 0px 0px 5px 5px;\n  color: #fff;\n  font-size: 6.5pt;\n  padding: 1px 5px;\n  line-height: 11px;\n}\n#magnifier{\n\nposition: relative;\n\nright: 30px;\ntop: 27px;\n\n\n}\n#magnifiers\n{\n\n  position: relative;\n  \n  right: 62px;\n  top: 27px;\n  \n  \n  }\n.table.dataTable span.label {\n  text-transform: capitalize;\n}\n.fnt-colr h5 {\n  display: inline-block;\n}\n.td_label {\n  display: inline-block;\n  padding: 5px;\n  font-size: 9px;\n  line-height: 1;\n  color: #fff;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: baseline;\n  border-radius: 0.25em;\n  margin-top: 15px;\n}\n.bootstrap-select .dropdown-toggle .filter-option-inner-inner {\n  font-size: 12px;\n}\n.label-success {\n  background-color: #62cb31;\n}\n.label-primary{\n  background-color: #FF5015;\n}\n\n.label-default {\n  background-color: #777;\n}\n.label-info {\n  background-color: #5bc0de;\n}\n.iconCont {\n  width: 59px;\n  margin: 0px auto;\n}\n\n.label-danger {\n  background-color: #d9534f;\n}\n\n.label-warning {\n  background-color: #f0ad4e;\n}\n\n.table.dataTable tr td:last-child,\n.table.dataTable tr th:last-child {\n  border-right: 0px solid #ddd !important;\n}\n\n.table.dataTable .input-group-addon,\n.modalForm .input-group-addon {\n  padding: 0px !important;\n  width: 29px !important;\n  height: 29px;\n  float: left;\n  border: 1px solid #e4e5e7 !important;\n  background: #f7f8fa;\n  border-color: #e4e5e7 !important;\n  font-size: 14px;\n  font-weight: normal;\n  line-height: 2;\n  color: #555;\n  text-align: center;\n}\n\n.table.dataTable .input-group-addon:hover,\n.modalForm .input-group-addon:hover {\n  background-color: #CCC;\n  border: 1px solid rgb(160, 157, 157) !important;\n  cursor: pointer;\n}\n\n.table.dataTable .actionlink {\n  white-space: nowrap;\n}\n\n.table.dataTable .actionlink .actionCont {\n  width: 87px;\n  margin: 0px auto;\n  text-align: center;\n}\n\n.table>thead>tr>td {\n  color: white;\n}\n\n.input-group-addon {\n  width: auto !important;\n  padding: 5px !important;\n  width: 36px !important;\n  height: 31px;\n  border: 1px solid #e4e5e7 !important;\n  cursor: pointer!important;\n}\n\n.input-group-addon {\n  background: #f7f8fa;\n  /* border-color: #e4e5e7 !important; */\n}\n\n.table>tbody>tr>td {\n  font-size: 9pt !important;\n  text-transform: uppercase !important;\n  vertical-align: middle !important;\n  font-weight: normal !important;\n\n}\n\n.width_table {\n  width: 183px !important;\n  position: relative;\n  display: inline-block;\n}\n\n.width_table {\n  width: 150px !important;\n}\n\n.contLeft {\n  height: 59px;\n  overflow: hidden;\n  width: 146px;\n  float: left;\n}\n.nav-tabs .nav-link{\n  background-color: white !important;\n}\n.add-more-vehicle {\n  background: #FF5015 !important;\n  padding-left: 140px!important;\n  padding-top: 28px !important;\n}\n.remove-vehicle {\n  background: #e4e5e7 !important;\n  padding-left: 140px!important;\n  padding-top: 28px !important;\n}\n.plusIco a {\n  top: 34px;\n  position: relative;\n  width: 20px;\n  height: 20px;\n  display: inline-block;\n  line-height: 20px;\n  background: #FF5015;\n  color: #fff !important;\n  font-size: 11px;\n  margin-left: 5px;\n  cursor: pointer;\n}\n\n.fa-stack {\n  display: inline;\n}\n\n.input-group-addon a {\n  color: #555;\n}\n\n.fa:hover {\n  color: #555 !important;\n}\n.panel-body-essen {\n  border: #e3e3e3 solid 1px;\n  padding: 5px 15px 10px 15px;\n  margin-bottom: 15px;\n}\n\n.input-daterange .input-group-addon {\n  width: auto;\n  min-width: 16px;\n  padding: 4px 10px;\n  font-weight: 400;\n  line-height: 1.428571;\n  text-align: center;\n  text-shadow: 0 1px 0 #fff;\n  vertical-align: middle;\n  background-color: #eee;\n  border: solid #ccc;\n  border-width: 1px 0;\n  margin-left: -5px;\n  margin-right: -5px;\n  cursor: pointer;\n}\n\n.input-group-addon:not(:first-child):not(:last-child),\n.input-group-btn:not(:first-child):not(:last-child),\n.input-group .form-control:not(:first-child):not(:last-child) {\n  border-radius: 0;\n}\n\n.input-daterange span.input-group-addon,\n.input-group span.input-group-addon {\n  font-size: 12px;\n  text-transform: uppercase;\n  text-align: center;\n  font-weight: 600;\n  cursor: pointer;\n}\n\n.countSect {\n  padding-right: 10px;\n  padding-left: 23px;\n}\n\n.notifText h6 {\n  line-height: 20px;\n  color: #000;\n}\n\ninput[type=\"file\"] {\n  display: block !important;\n  position: absolute;\n  top: 0px;\n  right: 0;\n  opacity: 0;\n  font-size: 100px;\n  filter: alpha(opacity=0);\n  cursor: pointer;\n  width: 27px !important;\n  left: 0px;\n  height: 27px;\n}\n\n.input-group span * {\n  text-transform: none;\n}\n\n.btn-group, .btn-group-vertical {\n  vertical-align: 20px!important;\n}\n\n\n.uniqFile {\n  cursor: pointer !important;\n  position: relative;\n  display: table;\n  border-collapse: separate;\n}\n\n.input-group .input-group-addon {\n  cursor: pointer !important;\n}\n\n.input-group-addon:last-child {\n  border-left: 0;\n}\n.alert-danger{\n  background-color: #f2dede;\n}\n\n#tickschecks {\n  display: contents;\n  font-size: 21px;\n}\n#tickscheckss {\n  display: flex;\n  font-size: 21px;\n}\n\n#tickscheck {\n  margin-left: 23px;\n}\n\n#tickspc {\n  margin-left: 13px;\n}\n\n.text-danger {\n  color: #e74c3c;\n}\n\n.glyphicon {\n  position: relative;\n  top: 1px;\n  display: inline-block;\n  font-family: 'Glyphicons Halflings';\n  font-style: normal;\n  font-weight: normal;\n  line-height: 1;\n  -webkit-font-smoothing: antialiased;\n}\n\n\n.boxview {\n  text-align: center;\n  text-decoration: none;\n  color: #fff;\n  height: 39px;\n  width: auto;\n  font-size: 10.2px;\n  display: block;\n  line-height: 40px;\n  margin: 0px 10px 0px 10px;\n}\n.form-group label{\nfont-size: 11px;\nfont-weight: 600;\ncolor: #4e4b4b;\nmargin-bottom: 6px;\n}\ntextarea[readonly] {\n  cursor: not-allowed;\n  background-color: #eee;\n  opacity: 1;\n}\n\n.nav-tabs {\n  border-bottom: 1px solid #e4e5e7 !important;\n}\n.nav-tabs > li {\n  float: left;\n  margin-bottom: -1px;\n}\n.nav-tabs li.active a {\n  background-color: #FF5015;\n  color: #fff;\n}\n\np{\n  font-size: 12px;\n  font-weight: 500;\n  color: #6a6c6f !important;\n  }\n.col-md-3{\n  font-size: 12px;\n  font-weight: 600;\ncolor:#6a6c6f !important;\n}\n.col-md-1,.col-md-2,.col-md-4,.col-md-5 span{\n  font-size: 12px;\n}\n.form-group h5,h6{\n  color: #6a6c6f;\n  font-weight: 400;\n}\nlabel h5{\n  color: #6a6c6f !important;\n  font-weight: 400;\n}\n#heading{\n  color: #6a6c6f !important;\n  font-weight: 400;\n}\n\n.btn-dark {\n  background-color: #34495e !important;\n  border-color: #34495e !important;\n  color: #FFFFFF;\n  font-size: 12px!important;\n}\n\n.bootstrap-select.form-control-sm .dropdown-toggle {\n  background:transparent;\n  border: 0.1px solid rgb(214, 207, 207)!important;\n}\n.checkbox label{\n  padding-left: 5px;\n  vertical-align: 4px;\n  position: relative;\n \n}\n.radio label{\n  padding-left: 3px;\n  vertical-align: 4px;\n  position: relative;\n}\n.card{\n  border-radius: 0!important;\n}\n\n.btn-dark:hover {\n  background-color: #3f5872 !important;\n  border-color: #3f5872 !important;\n  color: #FFFFFF;\n}\n\n\n.form-control.required.bootstrap-select > button {\n  border-left: 2px solid red!important;\n  border-radius: 0px 4px 4px 0px;\n}\ninput.required{\n  border-left: 2px solid red!important;\n  border-radius: 0px 4px 4px 0px;\n}\ntextarea.required{\n  border-left: 2px solid red!important;\n  border-radius: 0px 4px 4px 0px;\n}\n\n.fa-times-circle.fa-xs {\n  color: #6a7490 !important;\n  vertical-align: -2px;\n}\n.fa-check-circle.fa-xs {\n  color: #ffffff!important;\n  vertical-align:-2px;\n}\n.btn-group{\n  padding-bottom: 5px;\n}\n\n.form-control:focus {\n  color: #212529;\n  background-color: beige!important;\n  outline: 0;\n  box-shadow:none!important;\n  border-color: #d5d5d5!important;\n}\n\n\n.bs-placeholder{\n  background: transparent;\n}\n\n#tree1 {\n  margin: 0px;\n  padding: 0px;\n}\n\n.dd {\n  position: relative;\n  display: block;\n  margin: 0;\n  padding: 0;\n  list-style: none;\n  font-size: 13px;\n  line-height: 20px;\n}\n\n.dd-list {\n  display: block;\n  position: relative;\n  margin: 0;\n  padding: 0;\n  list-style: none;\n}\n\n.dd-item {\n  display: block;\n  position: relative;\n  margin: 0;\n  padding: 0;\n  min-height: 20px;\n  font-size: 14 px;\n  line-height: 20px;\n}\n\n.dd-list .dd-list {\n  padding-left: 30px;\n}\n\n.dd-item>button {\n  display: none;\n  display: block;\n  position: relative;\n  cursor: pointer;\n  float: left;\n  width: 25px;\n  height: 25px;\n  margin: 5px 0;\n  padding: 0;\n  text-indent: 100%;\n  white-space: nowrap;\n  overflow: hidden;\n  border: 0;\n  background: transparent;\n  font-size: 12px;\n  line-height: 1;\n  text-align: center;\n  font-weight: bold;\n}\n\n.dd-handle {\n  display: block;\n  margin: 5px 0;\n  font-size: 10px;\n  padding: 6px 10px;\n  color: #333;\n  text-decoration: none;\n  border: 1px solid #e4e5e7;\n  background: #f7f9fa;\n  -webkit-border-radius: 3px;\n  border-radius: 3px;\n  cursor: pointer;\n  box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  font-family: \"MONTSERRAT\";\n  font-weight: 600;\n}\n.dd-item > button {\n  display: block;\n  position: relative;\n  cursor: pointer;\n  float: left;\n  width: 25px;\n  height: 25px;\n  margin: 5px 0;\n  padding: 0;\n  text-indent: 100%;\n  white-space: nowrap;\n  overflow: hidden;\n  border: 0;\n  background: transparent;\n  font-size: 12px;\n  line-height: 1;\n  text-align: center;\n  font-weight: bold;\n}\n\n.radioline {\n  display: contents;\n}\n.radioline1{\n  display: flex;\n}\n\n#app {\n  margin-left: 13px;\n}\n\n#tax_type_output {\n  margin-left: 13px;\n}\n\n#supplier_register_no {\n  margin-left: 13px;\n}\n\n#supplier_register_overseas {\n  margin-left: 13px;\n}\n\n#consumed_out {\n  margin-left: 13px;\n}\n#create_date{\n  margin-left: 13px;\n}\n\n.fa-times-circle {\n  color: red !important;\n}\n\n.fa-check-circle {\n  color: green !important;\n}\n\n.subUsers {\n  position: relative;\n}\n\n.supScript {\n  font-size: 10px;\n  line-height: 12px;\n  padding: 2px 5px;\n  position: absolute;\n  right: 9px;\n  top: -9px;\n  z-index: 1;\n}\n\n#diline {\n  display: inline;\n}\n\n.input-group span * {\n  text-transform: none;\n}\n\n.glyphicon {\n  position: relative;\n  top: 1px;\n  display: inline-block;\n  font-family: 'Glyphicons Halflings';\n  font-style: normal;\n  font-weight: normal;\n  line-height: 1;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n#totalcolor {\n  background-color: #A09D9D !important;\n}\n.restrictMsg {\n  color: #FF5015;\n  font-size: 22px;\n  font-weight: 500;\n  line-height: 35px;\n}\n.restrictMsg1 {\n\n  font-size: 18px;\n  font-weight: 400;\n  line-height: 35px;\n}\n\n.btn-group, .btn-group-vertical {\n  position: relative;\n  display: inline-block;\n  vertical-align: middle;\n}\n.btn-group > .btn:first-child:not(:last-child):not(.dropdown-toggle) {\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n}\n\n.btn-group .btn.btn-xs {\n  padding: 2px 7px;\n}\n.btn-group > .btn:first-child {\n  margin-left: 0;\n}\n.btn-group > .btn, .btn-group-vertical > .btn {\n  position: relative;\n  float: left;\n}\n.btn-xs {\n  border-radius: 3px!important;\n  font-size: 11px!important;\n  line-height: 1.5!important;\n  padding: 1px 7px!important;\n}\n\n.btn-xs:hover{\n    padding: 2px 7px !important;\n}\n\n.btn-default {\n  background-color: #fff!important;\n  border-color: #e4e5e7!important;\n  color: #6a6c6f!important;\n}\n.doubleScroll-scroll-wrapper {\n  width: auto!important;\n  /* height: 0px !important; */\n  overflow-x: auto !important;}\n\n  #scrollCont, .scrollCont, .scrollCont1, #scrollCont1 {\n    /* overflow-x: auto!important; */\n    overflow-x: auto !important;\n    border: 1px solid #ccc !important;}\n\n    .nav-tabs {\n      border-bottom: 1px solid #e4e5e7;\n  }\n\n  #tbl_tour td b {\n    border: 1px solid #6a6c6f !important;\n    border-radius: 0.4em;\n    padding: 3px 5px;\n    margin-left: 5px;\n    font-weight: normal;\n}\n\ninput[type=radio]{\n  accent-color:#15a215;\n  height: 16px;\n  width: 20px;\n}\ninput[type=checkbox]{\n  accent-color:#15a215;\n  height: 16px;\n  width: 20px;\n}\n.checkbox-info input[type=checkbox]{\n  accent-color:#3498db !important;\n  height: 16px;\n  width: 20px;\n}\n\n#services_note {\n  color: #197ef7 !important;\n  font-size: 13px !important;}\n\n\n  kbd {\n    padding: 2px 4px !important;\n    font-size: 12px !important;\n    color: #fff !important;\n    background-color: #333 !important;\n    border-radius: 3px !important;\n    -webkit-box-shadow: inset 0 -1px 0 rgba(0, 0, 0, .25) !important;\n    box-shadow: inset 0 -1px 0 rgba(0, 0, 0, .25) !important;\n}\n.btn-success {\n  background-color: #62cb31 !important;\n  border-color: #62cb31 !important;\n  color: #FFFFFF !important;\n}\n.btn-success:hover{\n  background-color: #74d348 !important;\n  border-color: #74d348 !important;\n  color: #FFFFFF !important;\n}\n\n.btn-danger {\n  background-color: #e74c3c !important;\n  border-color: #e74c3c !important;\n  color: #FFFFFF !important;\n}\n.btn-danger:hover {\n  background-color: #ea6557 !important;\n  border-color: #ea6557 !important;\n  color: #FFFFFF !important;\n}\n.btn-deactivate{\n  background-color:#dddddd !important;\n  border-color: #dddddd !important;\n  color: #767170!important;\n}\n.btn-deactivate:hover {\n  background-color:#dddddd !important;\n  border-color: #dddddd !important;\n  color: #333 !important;\n}\n\n.nav-tabs .nav-link.active {\nbackground-color:#FF5015 !important;\ncolor: white !important;\n}\n.nav-tabs .nav-link {\n  color:#888e9f !important;\n  font-size: 12px !important;\n  font-family: \"MONTSERRAT\";\n\n  }\n  \n.tab-content{\nborder-left:1px solid #ddcfcf;\nborder-bottom:1px solid #ddcfcf;\nborder-right:1px solid #ddcfcf;\npadding-left: 18px;\npadding-right: 18px;\npadding-top: 12px;\npadding-bottom: 10px;\nfont-family: \"MONTSERRAT\";\n\n}\nlabel a{\ncolor:#565759 !important;\ntext-decoration: none\n}\n\n.tblHeading td, h4.tblHeading, a.tblHeading {\n  background-color: rgba(216, 211, 211, 0.59);\n  color: #000;\n  font-size: 13px;\n  padding: 6px!important;\n  border: 2px solid #D0CFCF!important;\n}\n\n.bookingOps a{\n  border-right: 3px solid white !important;\n  font-size: 10px !important;\n}\n.bookingOps a:hover{\n  border-right: 3px solid white !important;\n\n}\n\ntr.tblHeading {\n  cursor: pointer;\n}\n.bookingTbl > tbody > tr > td {\n  font-size: 9pt !important;\n  text-transform: uppercase !important;\n  vertical-align: middle!important;\n  font-weight: normal!important;\n  font-family: \"roboto\" !important;\n  text-align: left !important;\n \n}\n.bookingTbl > tbody > tr:nth-of-type(odd) {\n  background-color: #e2dfdf;\n}\n.tdd_label {\n  display: inline-block;\n  padding: 5px;\n  font-size: 10px;\n  line-height: 1;\n  color: #fff !important;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: baseline;\n  border-radius: 0.25em;\n}1\n\n.siteLogo {\n  padding: 10px 25px;\n  border-bottom: 1px solid #ddd;\n  -webkit-box-shadow: 0 8px 6px -6px #DCDCDC;\n  -moz-box-shadow: 0 8px 6px -6px #DCDCDC;\n  box-shadow: 0 8px 6px -6px #DCDCDC;\n  margin-bottom: 10px;}\n  .room-fields {\n    border-top: 1px solid #efefef;\n    margin-top: 20px !important;\n}\n.hotel_name {\n  font-size: 16px;\n  font-weight: 600;}\n\n\n    .double-box {\n      background: #20B7CF;\n      height: auto;\n      min-height: 60px;\n      color: white;\n      font-size: 12px;\n      padding-top: 16px;\n      padding-left: 13px;\n      padding-bottom: 5px;\n  }\n  .tot-box {\n    height: 30px;\n    font-size: 16px;\n    border-bottom: 1px solid #dddcdc;\n    background: #efefef;\n    margin-left: -12px;\n    width: 650px !important;\n}\n.double-txt{\n  float: right;\n  margin-top: -57px;\n}\n.hotel_currncy {\n  font-weight: 100;\n  font-size: 16px;\n}\n\n.green-txt {\n  color: green;\n  font-size: 12px;\n  text-align: right;\n}\n\n.tooltip-inner {\n  font-size: 11px; /* Adjust this value to decrease or increase the font size */\n}\ninput{\n  font-size: 11px !important;\n  font-family: 'Montserrat' !important;\n}\nselect{\n  font-size: 11px !important;\n    font-family: 'Montserrat' !important;\n}\n\n.bootstrap-select .dropdown-menu li a span.text {\n  font-size: 11px;\n}\n\nul.mailbox-list {\n  list-style: none;\n  padding: 0;\n}\nul.mailbox-list li.active a {\n  /* background: #f7f9fa; */\n  border: 1px solid #e4e5e7;\n  font-weight: 600;\n  border-radius: 3px;\n}\nul.mailbox-list li a {\n  padding: 10px 15px;\n  display: block;\n}\n.pagination-sm >li >a{\n  font-size: 12px;\n}\n.note-icon-caret{\n  display: none;\n}\n.blue-box {\n  background: #34495e;\n  min-height: 55px;\n  display: table;\n  table-layout: fixed;\n  width: 100%;\n  padding: -1px 10px 15px 10px;\n}\n.lightBlue-box {\n  background: #3498DB;\n  min-height: 55px;\n  display: table;\n  table-layout: fixed;\n  width: 100%;\n}\n.blue-box1 {\n  background: #34495e;\n  min-height: 55px;\n  padding: 3px 10px 15px 10px;\n}\n.labelTitle2 {\n  padding: 5px 0px 0px 15px;\n  text-transform: uppercase;\n  font-family: Montserrat;\n  font-weight: 700;\n  font-size: 12px;\n  color: #ffffff;\n}\n.labelTitle3 {\n  padding: 17px 0px 0px 15px;\n  text-transform: uppercase;\n  font-family: Montserrat;\n  font-weight: 700;\n  font-size: 12px;\n  color: #ffffff;\n}\n.labelTitle1 {\n  padding: 17px 0px 0px 0px;\n  font-family: Montserrat;\n  font-weight: 400;\n  font-size: 12px;\n  color: #ffffff;\n}\n.labelTitle {\n  display: table-cell;\n  vertical-align: middle;\n  width: 208px;\n  height: 55px;\n  padding: 0px 0px 0px 15px;\n  position: relative;\n  text-transform: uppercase;\n  font-family: Montserrat;\n  font-weight: 700;\n  font-size: 12px;\n  color: #ffffff;\n}\n#triangle-down {\n  display: block!important;\n}\n\n@media print {\n\n#noprint{\n  display: none;\n}\n\n}\n\n\n@media only screen and (min-width:960px) {\n  #tdotext{\n    display: none;\n  }\n}\n\n  @media only screen and (max-width:960px) {\n    #firstNav{\n      display: none;\n    }\n    #drip{\n    float:none;\n    border-bottom: 1px solid #ddd;\n}\n    #navbarSupportedContent{\n      \n      padding: 21px 0px;\n      position: relative;\n      z-index: 1;\n    }\n    .boxview{\n      text-align: left;\n    }\n    .input-group-addon {\n      height: 31px;\n    }\n    #drip:hover #dripmenu {\n      display: contents;\n    }\n    .dropdown-menu>li:hover>.dropdown-submenu {\n      display:contents;\n    }\n    #secondNav{\n      padding-left: 10px;\n    }\n    .color-line{\n      display: none;\n    }\n    #searchbookingTable{\n      margin: 0 !important;\n      padding: 0 !important;\n    }\n  #accc,.actionlink1{\n    display: none;\n  }\n  #searchbookingTable{\n    width: 13   00px;\n  }\n}\n\n\n\n",
          }}
        />

        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n        #sizing li a {\n            font-size: 12px;\n            color: #34495e;\n        }\n\n\n        .btn-primary {\n            background-color: #34495e;\n            border-color: #34495e;\n            color: #FFFFFF;\n            font-size: 13px;\n        }\n\n        .btn-primary:hover {\n            background-color: #3f5872 !important;\n            border-color: #3f5872 !important;\n            color: #FFFFFF !important;\n            outline: none !important;\n        }\n\n        #date1 {\n            background-color: white;\n        }\n\n        #date2 {\n            background-color: white;\n        }\n\n        .ng-hide {\n            display: none;\n        }\n\n        .h-bg-navy-blue {\n            background: #34495e;\n        }\n\n        .adddates {\n            background: #74D348;\n            color: white;\n        }\n\n        .adddates:hover {\n            background: #74D348;\n        }\n\n        .bootstrap-select.show-menu-arrow.open>.dropdown-toggle,\n        .bootstrap-select.show-menu-arrow.show>.dropdown-toggle {\n            z-index: 1;\n        }\n\n        th {\n            text-align: left !important;\n            width: 200px;\n            vertical-align: middle !important;\n            padding: 7px 8px !important;\n            font-size: 12px;\n        }\n\n        td {\n            background-color: #FFFFFF !important;\n        }\n    ",
          }}
        />
      </div>
    </>
  );
};
export default HotelInventoryAppExcludeNationality;
