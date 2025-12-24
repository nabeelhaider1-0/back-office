import React, { useEffect } from "react";
import logo from "../../assets/images/logo.png";
import userlogo from "../../assets/images/user.png";
import { Link } from "react-router-dom";
import Constants from "../../constants/routes";

const HotelInventoryAppSellPolicy = ({ setShowHeaderAndMenuBar }) => {
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
          <nav
            className="navbar navbar-expand-lg navbar-light bg-light"
            style={{ backgroundColor: "white" }}
          >
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
                    <Link className="dropdown-item" to="hotelInventoryapp.html">
                      Manage Rates
                    </Link>
                    <Link
                      className="dropdown-item"
                      to="hotelInventoryExcludeNationality.html"
                    >
                      Exclude Nationality
                    </Link>
                    <Link
                      className="dropdown-item"
                      to="hotelInventoryExcludeCountryofResidence.html"
                    >
                      Exclude Country of Residence
                    </Link>
                    <Link
                      className="dropdown-item"
                      to="hotelInventorydeleterates.html"
                    >
                      Delete Rates
                    </Link>
                    <Link
                      className="dropdown-item"
                      to="hotelInventoryoldroomrates.html"
                    >
                      Old Room Rates
                    </Link>
                  </div>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="hotelInventoryappbookingDetails.html"
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
                      to="hotelInventoryappMasterHotelsetting.html"
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
                          to="hotelInventoryappMasterAdd.html"
                        >
                          Add
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="hotelInventoryappMasterSearch.html"
                        >
                          Search
                        </Link>
                      </li>
                    </ul>
                    <Link
                      className="dropdown-item"
                      to="hotelInventoryappMasterHotelMappinhg.html"
                    >
                      Map Hotel Rooms
                    </Link>
                  </div>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="hotelInventoryPolicies.html">
                    Policies
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="hotelInventoryappSupplment.html"
                  >
                    Supplements
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="hotelInventoryappManageSeason.html"
                  >
                    Manage Seasons
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="hotelInventoryappExtrabeds.html"
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
                      to="hotelInventoryappSearchoffer.html"
                    >
                      Search
                    </Link>
                    <Link
                      className="dropdown-item"
                      to="hotelInventoryappcreateoffer.html"
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
                      to="hotelInventoryappReportsArrival.html"
                    >
                      Arivals
                    </Link>
                    <Link
                      className="dropdown-item"
                      to="hotelInventoryappReportExpiringRates.html"
                    >
                      Expiring Rates
                    </Link>
                    <Link
                      className="dropdown-item"
                      to="hotelInventoryappReportRecentChanges.html"
                    >
                      Recent Changes
                    </Link>
                  </div>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="hotelInventoryappContracts.html"
                  >
                    Contracts
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="hotelInventoryapptariffwriter.html"
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
                    SELL POLICY
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
                <div className="col-md-4 mt-2">
                  <div className="labelTitle2">
                    MANAGE INVENTORY ALLOCATION AND RELEASE PERIOD FOR
                  </div>
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
            <div className="row marginbottomnew mt-3 mb-2">
              <ul className="breadcrumb">
                <li>
                  <Link to={Constants.URLConstants.HOTELINVENTORYAPP}>
                    Rates
                  </Link>
                </li>
                <li>
                  <Link to={Constants.URLConstants.HOTELINVENTORYAPPALLOCATION}>
                    Allocation
                  </Link>
                </li>
                <li className="active">
                  <Link to={Constants.URLConstants.HOTELINVENTORYAPPSELLPOLICY}>
                    Sell Policy
                  </Link>
                </li>
              </ul>
            </div>
            {/* First Row*/}
            <form
              style={{
                borderTop: "2px solid #62cb31",
                marginTop: "-19px",
                paddingTop: "12px",
              }}
            >
              <div className="panel-body form-group">
                <div className="row">
                  <div className="col-lg-3 col-md-3 col-sm-3 form-group">
                    <div className="col-md-12 NoPaddingAll text-left">
                      <label className="novisible">&nbsp;</label>
                    </div>
                    <div className="input-group col-md-12 col-xs-12">
                      <div className="btn-group text-center m-b-md">
                        <Link
                          className="btn btn-sm btn-primary ng-pristine ng-untouched ng-valid ng-not-empty"
                          ng-click="SetActionType('update')"
                          id="Actiontype_update"
                          ng-model="ActionType"
                          data-toggle="tab"
                        >
                          Add/Update Sell Policy
                        </Link>
                        <Link
                          className="btn btn-sm ng-pristine ng-untouched ng-valid ng-not-empty"
                          ng-click="SetActionType('view')"
                          id="Actiontype_view"
                          ng-model="ActionType"
                          data-toggle="tab"
                        >
                          View Sell Policy
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-lg-2 col-md-3 col-sm-3 form-group"
                    ng-show="InventoryModelMultiple"
                  >
                    <label>Inventory Room Category</label>
                    <select
                      data-container="body"
                      data-actions-box="true"
                      data-live-search="true"
                      id="inventory"
                      ng-change="setInventory();"
                      className="selectpicker form-control form-control-sm form_element required inventoryoption ng-pristine ng-untouched ng-valid ng-empty bs-select-hidden"
                      ng-model="InventoryModel"
                    >
                      {/* ngRepeat: x in Inventory */}
                      <option
                        value={26}
                        ng-repeat="x in Inventory"
                        className="ng-binding ng-scope"
                      >
                        Classic
                      </option>
                      {/* end ngRepeat: x in Inventory */}
                    </select>
                  </div>
                  <div
                    className="col-lg-2 col-md-3 col-sm-3 form-group ng-hide"
                    ng-show="!InventoryModelMultiple"
                  >
                    <label>Inventory Room Category</label>
                    <select
                      ng-options="x.inventory_room_class for x in Inventory track by x.inventory_class_id"
                      ng-change="setInventory();"
                      data-container="body"
                      data-max-options={1}
                      data-live-search="true"
                      id="inventorysingle"
                      className="selectpicker form-control form-control-sm form_element required inventoryoptionsingle ng-pristine ng-untouched ng-valid ng-not-empty bs-select-hidden"
                      ng-model="InventoryModelSingle"
                    >
                      <option
                        value
                        data-hidden="true"
                        className
                        selected="selected"
                      >
                        Select Inventory Room Category
                      </option>
                      <option label="Classic" value={26}>
                        Classic
                      </option>
                    </select>
                  </div>
                  <div
                    className="col-lg-2 col-md-3 col-sm-3 form-group"
                    ng-show="InventoryModelMultiple"
                  >
                    <label>Room Category</label>
                    <select
                      data-actions-box="true"
                      data-live-search="true"
                      id="room_category"
                      className="selectpicker form-control form-control-sm form_element ng-pristine ng-untouched ng-valid ng-empty bs-select-hidden"
                      ng-model="roomCategory"
                    >
                      <option value data-hidden="true">
                        Select Room Category
                      </option>
                      {/* ngRepeat: (inventoryLabel,inventoryContent) in roomClassCategory */}
                    </select>
                  </div>
                  <div
                    className="col-lg-2 col-md-3 col-sm-3 form-group ng-hide"
                    ng-show="!InventoryModelMultiple"
                  >
                    <label>Room Category</label>
                    <select
                      ng-options="x.room_category_name for x in roomClassCategory track by x.room_class_id"
                      ng-change="FetchSellPolicyCalender();"
                      data-container="body"
                      data-max-options={1}
                      data-live-search="true"
                      id="room_category_single"
                      className="selectpicker form-control form-control-sm form_element ng-pristine ng-untouched ng-valid ng-not-empty bs-select-hidden"
                      ng-model="roomCategorySingle"
                    >
                      <option value className selected="selected">
                        Select Room Category
                      </option>
                    </select>
                  </div>
                  <div
                    className="col-lg-2 col-md-3 col-sm-4 form-group"
                    ng-show="ActionUpdateDisp"
                  >
                    <label>Enter Rate For</label>
                    <br />
                    <div className="btn-group text-center m-b-md lpt_cls">
                      <Link
                        className="btn btn-sm btn-success ng-pristine ng-untouched ng-valid ng-empty"
                        ng-click="validity($event,'WEWD')"
                        data-toggle="tab"
                        ng-model="Days"
                      >
                        Weekday/Weekend
                      </Link>
                      <Link
                        className="btn btn-sm btn-default ng-pristine ng-untouched ng-valid ng-empty"
                        ng-click="validity($event,'All')"
                        data-toggle="tab"
                        ng-model="Hours"
                      >
                        All
                      </Link>
                    </div>
                  </div>
                  <div
                    className="col-lg-2 col-md-3 col-sm-3 form-group rateUnik ng-hide"
                    ng-show="excelUploadWithRateType"
                  >
                    <label>Rate Type</label>
                    <br />
                    <select
                      className="selectpicker form_element show-menu-arrow form-control form-control-sm required ng-pristine ng-untouched ng-valid ng-empty bs-select-hidden"
                      ng-model="roomRatesType"
                      data-container="body"
                      data-live-search="true"
                    >
                      <option value="? undefined:undefined ?" />
                      {/* ngRepeat: rateType in RateTypeForRatesInsert */}
                      <option
                        ng-repeat="rateType in RateTypeForRatesInsert"
                        value="checkin"
                        className="ng-binding ng-scope"
                      >
                        Check In
                      </option>
                      {/* end ngRepeat: rateType in RateTypeForRatesInsert */}
                      <option
                        ng-repeat="rateType in RateTypeForRatesInsert"
                        value="stay"
                        className="ng-binding ng-scope"
                      >
                        Stay
                      </option>
                      {/* end ngRepeat: rateType in RateTypeForRatesInsert */}
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div
                    className="col-lg-3 col-md-4 col-sm-5 col-xs-9 form-group MultipleSeasonHideDates"
                    ng-show="ActionUpdateDisp"
                  >
                    <label>Validity Period From</label>
                    <div className=" MultiplePeriodClone">
                      <div
                        id="datePickPeriod_1"
                        className="input-group date input-daterange CloneInputMargin CloneElement"
                      >
                        <input
                          type="text"
                          name="from_date[1]"
                          ng-model="from_date"
                          id="from"
                          className="form-control date_range_input date_range_picker_from ng-pristine ng-untouched ng-valid ng-empty"
                          date="dd-MM-yyyy"
                        />
                        <span className="input-group-addon">To</span>
                        <input
                          type="text"
                          name="to_date[1]"
                          ng-model="to_date"
                          id="to"
                          className="form-control date_range_input date_range_picker_to ng-pristine ng-untouched ng-valid ng-empty"
                          date="dd-MM-yyyy"
                        />
                        <span id="ftrashbtn" className="input-group-addon">
                          <i className="fa fa-trash" />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-lg-1 col-md-2 col-sm-2 col-xs-3 MultipleSeasonHideDates"
                    ng-show="ActionUpdateDisp"
                  >
                    <label htmlFor>&nbsp;</label>
                    <br />
                    <Link
                      className="btn btn-sm adddates"
                      ng-click="create_clone()"
                    >
                      <i id="addmore" className="fa fa-plus" />
                    </Link>
                    <Link
                      ng-show="RemoveClone"
                      className="btn btn-sm btn-default removebtn ng-hide"
                      ng-click="remove_clone()"
                    >
                      <i
                        name="removebtn"
                        id="removebtn"
                        className="fa fa-minus"
                      />
                    </Link>
                  </div>
                  <div
                    className="col-md-3 col-sm-4 col-xs-12 MultipleSeasonDates"
                    style={{ display: "none" }}
                    ng-show="ActionUpdateDisp"
                  >
                    <label>Validity Period Season</label>
                    <div
                      id="datePeriod_0"
                      className="input-group date input-daterange CloneInputMargin CloneElement"
                    >
                      <input
                        type="text"
                        defaultValue="period_from"
                        name="multi_from_date[0]"
                        ng-model="multi_from_date"
                        className="form-control date_range_input date_range_picker_from ng-pristine ng-untouched ng-valid ng-empty"
                        date="dd-MM-yyyy"
                      />
                      <span className="input-group-addon">To</span>
                      <input
                        type="text"
                        defaultValue="period_to"
                        name="multi_to_date[0]"
                        ng-model="multi_to_date"
                        className="form-control date_range_input date_range_picker_to ng-pristine ng-untouched ng-valid ng-empty"
                        date="dd-MM-yyyy"
                      />
                    </div>
                    <div className="MultipleDatesClone" />
                  </div>
                  <div
                    className="col-md-3 col-sm-4 col-xs-12 form-group"
                    id="step12"
                    ng-show="multipleDatesSeason && ActionUpdateDisp"
                  >
                    <div className="col-md-12">
                      <div className="col-lg-2 col-md-2 col-sm-4 col-xs-2 MultipleSeasonHideDates">
                        <br />
                        <h5>OR</h5>
                      </div>
                      <div className="col-lg-10 col-md-10 col-sm-8 col-xs-10">
                        <label>Season</label>
                        <select
                          data-container="body"
                          ng-model="season_list"
                          ng-change="multichangedate();"
                          className="selectpicker form_element form-control form-control-sm ng-pristine ng-untouched ng-valid ng-empty bs-select-hidden"
                        >
                          <option value>- Select -</option>
                          {/* ngRepeat: x in seasonlist */}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-lg-2 col-md-2 col-sm-4 form-group ng-hide"
                    ng-show="!ActionUpdateDisp"
                  >
                    <label>Month - Year</label>
                    <div className="input-group date input-daterange date_picker_inputs">
                      <input
                        type="text"
                        defaultValue="view_period_from"
                        name="view_period_from"
                        ng-model="view_period_from"
                        className="form-control date_range_picker_from_view ng-pristine ng-untouched ng-valid ng-not-empty"
                        date="MM-yyyy"
                        id="dtepicker"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div
                    className="col-md-12 form-group clear"
                    ng-show="ActionUpdateDisp"
                  >
                    <div className>
                      <label className="label_week ng-binding">
                        Weekday&nbsp; : ( <i className="fa fa-hand-o-up" /> Sell
                        Policy &nbsp; )
                      </label>
                      <div className="btn-group gapMeTop selector_btn">
                        <Link
                          className="btn btn-xs btn-success default fontsizeforgroup"
                          data-toggle="tab"
                          ng-click="setPolicy('WD',0)"
                        >
                          Default
                        </Link>
                        <Link
                          className="btn btn-xs btn-default stopcell fontsizeforgroup"
                          data-toggle="tab"
                          ng-click="setPolicy('WD',1)"
                        >
                          Stop Sell{" "}
                        </Link>
                        <Link
                          className="btn btn-xs btn-default partial fontsizeforgroup"
                          data-toggle="tab"
                          ng-click="setPolicy('WD',2)"
                        >
                          Partial Sell
                        </Link>
                        <Link
                          className="btn btn-xs btn-default freesell fontsizeforgroup"
                          data-toggle="tab"
                          ng-click="setPolicy('WD',3)"
                        >
                          Free Sell
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-md-12 form-group"
                    ng-show="period=='WEWD' && ActionUpdateDisp"
                  >
                    <div className>
                      <label className="label_week">
                        Weekend&nbsp; : ( <i className="fa fa-hand-o-up" /> Sell
                        Policy &nbsp; )
                      </label>
                      <div className="btn-group gapMeTop selector_btn">
                        <Link
                          className="btn btn-xs btn-success default fontsizeforgroup"
                          data-toggle="tab"
                          ng-click="setPolicy('WE',0)"
                        >
                          Default
                        </Link>
                        <Link
                          className="btn btn-xs btn-default stopcell fontsizeforgroup"
                          data-toggle="tab"
                          ng-click="setPolicy('WE',1)"
                        >
                          Stop Sell{" "}
                        </Link>
                        <Link
                          className="btn btn-xs btn-default partial fontsizeforgroup"
                          data-toggle="tab"
                          ng-click="setPolicy('WE',2)"
                        >
                          Partial Sell
                        </Link>
                        <Link
                          className="btn btn-xs btn-default freesell fontsizeforgroup"
                          data-toggle="tab"
                          ng-click="setPolicy('WE',3)"
                        >
                          Free Sell
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="row"
                  ng-show="(InventoryModel.length=='0' || !InventoryModel) && ActionUpdateDisp"
                >
                  <div className="col-md-12">
                    <h5
                      className="mesID1 alert alert-danger text-center"
                      style={{
                        color: "var(--color-red) !important",
                        fontWeight: 500,
                      }}
                    >
                      Please Select Inventory Room Category to Add Sell Policy.
                    </h5>
                  </div>
                </div>
                <div
                  className="row ng-hide"
                  ng-show="InventoryModel.length!='0' && ActionUpdateDisp"
                >
                  <div className="btn_class col-md-4">
                    <button
                      type="button"
                      className="btn w-xs btn-primary"
                      ng-click="proceed('save');"
                    >
                      Save
                    </button>
                  </div>
                </div>
                <div className="m-t-md ng-hide" ng-show="!ActionUpdateDisp">
                  <div id="calendar" className="fc fc-ltr fc-unthemed">
                    <div className="fc-toolbar">
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
                      </div>
                      <div className="fc-right" />
                      <div className="fc-center">
                        <h2>September 2023</h2>
                      </div>
                      <div className="fc-clear" />
                    </div>
                    <div className="fc-view-container">
                      <div className="fc-view fc-month-view fc-basic-view">
                        <table>
                          <thead>
                            <tr>
                              <td className="fc-widget-header">
                                <div className="fc-row fc-widget-header">
                                  <table>
                                    <thead>
                                      <tr>
                                        <th className="fc-day-header fc-widget-header fc-sun">
                                          Sun
                                        </th>
                                        <th className="fc-day-header fc-widget-header fc-mon">
                                          Mon
                                        </th>
                                        <th className="fc-day-header fc-widget-header fc-tue">
                                          Tue
                                        </th>
                                        <th className="fc-day-header fc-widget-header fc-wed">
                                          Wed
                                        </th>
                                        <th className="fc-day-header fc-widget-header fc-thu">
                                          Thu
                                        </th>
                                        <th className="fc-day-header fc-widget-header fc-fri">
                                          Fri
                                        </th>
                                        <th className="fc-day-header fc-widget-header fc-sat">
                                          Sat
                                        </th>
                                      </tr>
                                    </thead>
                                  </table>
                                </div>
                              </td>
                            </tr>
                          </thead>
                          <tbody className="bg-white">
                            <tr>
                              <td className="fc-widget-content">
                                <div className="fc-day-grid-container">
                                  <div className="fc-day-grid">
                                    <div
                                      className="fc-row fc-week fc-widget-content"
                                      style={{ height: "167px" }}
                                    >
                                      <div className="fc-bg">
                                        <table>
                                          <tbody className="bg-white">
                                            <tr>
                                              <td
                                                className="fc-day fc-widget-content fc-sun fc-other-month fc-past"
                                                data-date="2023-08-27"
                                              />
                                              <td
                                                className="fc-day fc-widget-content fc-mon fc-other-month fc-past"
                                                data-date="2023-08-28"
                                              />
                                              <td
                                                className="fc-day fc-widget-content fc-tue fc-other-month fc-past"
                                                data-date="2023-08-29"
                                              />
                                              <td
                                                className="fc-day fc-widget-content fc-wed fc-other-month fc-past"
                                                data-date="2023-08-30"
                                              />
                                              <td
                                                className="fc-day fc-widget-content fc-thu fc-other-month fc-past"
                                                data-date="2023-08-31"
                                              />
                                              <td
                                                className="fc-day fc-widget-content fc-fri fc-today fc-state-highlight"
                                                data-date="2023-09-01"
                                              />
                                              <td
                                                className="fc-day fc-widget-content fc-sat fc-future"
                                                data-date="2023-09-02"
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
                                                className="fc-day-number fc-sun fc-other-month fc-past"
                                                data-date="2023-08-27"
                                              >
                                                27
                                              </td>
                                              <td
                                                className="fc-day-number fc-mon fc-other-month fc-past"
                                                data-date="2023-08-28"
                                              >
                                                28
                                              </td>
                                              <td
                                                className="fc-day-number fc-tue fc-other-month fc-past"
                                                data-date="2023-08-29"
                                              >
                                                29
                                              </td>
                                              <td
                                                className="fc-day-number fc-wed fc-other-month fc-past"
                                                data-date="2023-08-30"
                                              >
                                                30
                                              </td>
                                              <td
                                                className="fc-day-number fc-thu fc-other-month fc-past"
                                                data-date="2023-08-31"
                                              >
                                                31
                                              </td>
                                              <td
                                                className="fc-day-number fc-fri fc-today fc-state-highlight"
                                                data-date="2023-09-01"
                                              >
                                                1
                                              </td>
                                              <td
                                                className="fc-day-number fc-sat fc-future"
                                                data-date="2023-09-02"
                                              >
                                                2
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
                                              <td className="fc-event-container">
                                                <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                <div
                                                  id="invertory_box_2023-9-1"
                                                  className="fc-unthemed fc-today"
                                                >
                                                  <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                  <div className="pull-left form-group1 buttons widthforelementsincalendar1">
                                                    <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                    <div className="btn-group selector_btn">
                                                      <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                      <Link
                                                        className="btn default btn-success fontsizeforgroup stop_sale_button_0_ stop_sale_button_0_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Default
                                                      </Link>
                                                      <Link
                                                        className="btn stopcell btn-default fontsizeforgroup stop_sale_button_1_ stop_sale_button_1_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Stop Sell{" "}
                                                      </Link>
                                                      <Link
                                                        className="btn partial btn-default fontsizeforgroup stop_sale_button_2_ stop_sale_button_2_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Partial Sell
                                                      </Link>
                                                      <Link
                                                        className="btn freesell btn-default fontsizeforgroup stop_sale_button_3_ stop_sale_button_3_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Free Sell
                                                      </Link>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="clearfix" />
                                              </td>
                                              <td className="fc-event-container">
                                                <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                <div
                                                  id="invertory_box_2023-9-2"
                                                  className
                                                >
                                                  <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                  <div className="pull-left form-group1 buttons widthforelementsincalendar1">
                                                    <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                    <div className="btn-group selector_btn">
                                                      <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                      <Link
                                                        className="btn default btn-success fontsizeforgroup stop_sale_button_0_ stop_sale_button_0_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Default
                                                      </Link>
                                                      <Link
                                                        className="btn stopcell btn-default fontsizeforgroup stop_sale_button_1_ stop_sale_button_1_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Stop Sell{" "}
                                                      </Link>
                                                      <Link
                                                        className="btn partial btn-default fontsizeforgroup stop_sale_button_2_ stop_sale_button_2_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Partial Sell
                                                      </Link>
                                                      <Link
                                                        className="btn freesell btn-default fontsizeforgroup stop_sale_button_3_ stop_sale_button_3_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Free Sell
                                                      </Link>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="clearfix" />
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                    <div
                                      className="fc-row fc-week fc-widget-content"
                                      style={{ height: "167px" }}
                                    >
                                      <div className="fc-bg">
                                        <table>
                                          <tbody className="bg-white">
                                            <tr>
                                              <td
                                                className="fc-day fc-widget-content fc-sun fc-future"
                                                data-date="2023-09-03"
                                              />
                                              <td
                                                className="fc-day fc-widget-content fc-mon fc-future"
                                                data-date="2023-09-04"
                                              />
                                              <td
                                                className="fc-day fc-widget-content fc-tue fc-future"
                                                data-date="2023-09-05"
                                              />
                                              <td
                                                className="fc-day fc-widget-content fc-wed fc-future"
                                                data-date="2023-09-06"
                                              />
                                              <td
                                                className="fc-day fc-widget-content fc-thu fc-future"
                                                data-date="2023-09-07"
                                              />
                                              <td
                                                className="fc-day fc-widget-content fc-fri fc-future"
                                                data-date="2023-09-08"
                                              />
                                              <td
                                                className="fc-day fc-widget-content fc-sat fc-future"
                                                data-date="2023-09-09"
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
                                                className="fc-day-number fc-sun fc-future"
                                                data-date="2023-09-03"
                                              >
                                                3
                                              </td>
                                              <td
                                                className="fc-day-number fc-mon fc-future"
                                                data-date="2023-09-04"
                                              >
                                                4
                                              </td>
                                              <td
                                                className="fc-day-number fc-tue fc-future"
                                                data-date="2023-09-05"
                                              >
                                                5
                                              </td>
                                              <td
                                                className="fc-day-number fc-wed fc-future"
                                                data-date="2023-09-06"
                                              >
                                                6
                                              </td>
                                              <td
                                                className="fc-day-number fc-thu fc-future"
                                                data-date="2023-09-07"
                                              >
                                                7
                                              </td>
                                              <td
                                                className="fc-day-number fc-fri fc-future"
                                                data-date="2023-09-08"
                                              >
                                                8
                                              </td>
                                              <td
                                                className="fc-day-number fc-sat fc-future"
                                                data-date="2023-09-09"
                                              >
                                                9
                                              </td>
                                            </tr>
                                          </thead>
                                          <tbody className="bg-white">
                                            <tr>
                                              <td className="fc-event-container">
                                                <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                <div
                                                  id="invertory_box_2023-9-3"
                                                  className
                                                >
                                                  <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                  <div className="pull-left form-group1 buttons widthforelementsincalendar1">
                                                    <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                    <div className="btn-group selector_btn">
                                                      <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                      <Link
                                                        className="btn default btn-success fontsizeforgroup stop_sale_button_0_ stop_sale_button_0_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Default
                                                      </Link>
                                                      <Link
                                                        className="btn stopcell btn-default fontsizeforgroup stop_sale_button_1_ stop_sale_button_1_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Stop Sell{" "}
                                                      </Link>
                                                      <Link
                                                        className="btn partial btn-default fontsizeforgroup stop_sale_button_2_ stop_sale_button_2_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Partial Sell
                                                      </Link>
                                                      <Link
                                                        className="btn freesell btn-default fontsizeforgroup stop_sale_button_3_ stop_sale_button_3_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Free Sell
                                                      </Link>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="clearfix" />
                                              </td>
                                              <td className="fc-event-container">
                                                <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                <div
                                                  id="invertory_box_2023-9-4"
                                                  className
                                                >
                                                  <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                  <div className="pull-left form-group1 buttons widthforelementsincalendar1">
                                                    <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                    <div className="btn-group selector_btn">
                                                      <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                      <Link
                                                        className="btn default btn-success fontsizeforgroup stop_sale_button_0_ stop_sale_button_0_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Default
                                                      </Link>
                                                      <Link
                                                        className="btn stopcell btn-default fontsizeforgroup stop_sale_button_1_ stop_sale_button_1_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Stop Sell{" "}
                                                      </Link>
                                                      <Link
                                                        className="btn partial btn-default fontsizeforgroup stop_sale_button_2_ stop_sale_button_2_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Partial Sell
                                                      </Link>
                                                      <Link
                                                        className="btn freesell btn-default fontsizeforgroup stop_sale_button_3_ stop_sale_button_3_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Free Sell
                                                      </Link>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="clearfix" />
                                              </td>
                                              <td className="fc-event-container">
                                                <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                <div
                                                  id="invertory_box_2023-9-5"
                                                  className
                                                >
                                                  <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                  <div className="pull-left form-group1 buttons widthforelementsincalendar1">
                                                    <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                    <div className="btn-group selector_btn">
                                                      <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                      <Link
                                                        className="btn default btn-success fontsizeforgroup stop_sale_button_0_ stop_sale_button_0_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Default
                                                      </Link>
                                                      <Link
                                                        className="btn stopcell btn-default fontsizeforgroup stop_sale_button_1_ stop_sale_button_1_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Stop Sell{" "}
                                                      </Link>
                                                      <Link
                                                        className="btn partial btn-default fontsizeforgroup stop_sale_button_2_ stop_sale_button_2_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Partial Sell
                                                      </Link>
                                                      <Link
                                                        className="btn freesell btn-default fontsizeforgroup stop_sale_button_3_ stop_sale_button_3_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Free Sell
                                                      </Link>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="clearfix" />
                                              </td>
                                              <td className="fc-event-container">
                                                <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                <div
                                                  id="invertory_box_2023-9-6"
                                                  className
                                                >
                                                  <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                  <div className="pull-left form-group1 buttons widthforelementsincalendar1">
                                                    <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                    <div className="btn-group selector_btn">
                                                      <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                      <Link
                                                        className="btn default btn-success fontsizeforgroup stop_sale_button_0_ stop_sale_button_0_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Default
                                                      </Link>
                                                      <Link
                                                        className="btn stopcell btn-default fontsizeforgroup stop_sale_button_1_ stop_sale_button_1_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Stop Sell{" "}
                                                      </Link>
                                                      <Link
                                                        className="btn partial btn-default fontsizeforgroup stop_sale_button_2_ stop_sale_button_2_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Partial Sell
                                                      </Link>
                                                      <Link
                                                        className="btn freesell btn-default fontsizeforgroup stop_sale_button_3_ stop_sale_button_3_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Free Sell
                                                      </Link>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="clearfix" />
                                              </td>
                                              <td className="fc-event-container">
                                                <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                <div
                                                  id="invertory_box_2023-9-7"
                                                  className
                                                >
                                                  <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                  <div className="pull-left form-group1 buttons widthforelementsincalendar1">
                                                    <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                    <div className="btn-group selector_btn">
                                                      <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                      <Link
                                                        className="btn default btn-success fontsizeforgroup stop_sale_button_0_ stop_sale_button_0_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Default
                                                      </Link>
                                                      <Link
                                                        className="btn stopcell btn-default fontsizeforgroup stop_sale_button_1_ stop_sale_button_1_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Stop Sell{" "}
                                                      </Link>
                                                      <Link
                                                        className="btn partial btn-default fontsizeforgroup stop_sale_button_2_ stop_sale_button_2_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Partial Sell
                                                      </Link>
                                                      <Link
                                                        className="btn freesell btn-default fontsizeforgroup stop_sale_button_3_ stop_sale_button_3_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Free Sell
                                                      </Link>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="clearfix" />
                                              </td>
                                              <td className="fc-event-container">
                                                <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                <div
                                                  id="invertory_box_2023-9-8"
                                                  className
                                                >
                                                  <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                  <div className="pull-left form-group1 buttons widthforelementsincalendar1">
                                                    <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                    <div className="btn-group selector_btn">
                                                      <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                      <Link
                                                        className="btn default btn-success fontsizeforgroup stop_sale_button_0_ stop_sale_button_0_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Default
                                                      </Link>
                                                      <Link
                                                        className="btn stopcell btn-default fontsizeforgroup stop_sale_button_1_ stop_sale_button_1_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Stop Sell{" "}
                                                      </Link>
                                                      <Link
                                                        className="btn partial btn-default fontsizeforgroup stop_sale_button_2_ stop_sale_button_2_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Partial Sell
                                                      </Link>
                                                      <Link
                                                        className="btn freesell btn-default fontsizeforgroup stop_sale_button_3_ stop_sale_button_3_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Free Sell
                                                      </Link>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="clearfix" />
                                              </td>
                                              <td className="fc-event-container">
                                                <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                <div
                                                  id="invertory_box_2023-9-9"
                                                  className
                                                >
                                                  <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                  <div className="pull-left form-group1 buttons widthforelementsincalendar1">
                                                    <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                    <div className="btn-group selector_btn">
                                                      <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                      <Link
                                                        className="btn default btn-success fontsizeforgroup stop_sale_button_0_ stop_sale_button_0_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Default
                                                      </Link>
                                                      <Link
                                                        className="btn stopcell btn-default fontsizeforgroup stop_sale_button_1_ stop_sale_button_1_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Stop Sell{" "}
                                                      </Link>
                                                      <Link
                                                        className="btn partial btn-default fontsizeforgroup stop_sale_button_2_ stop_sale_button_2_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Partial Sell
                                                      </Link>
                                                      <Link
                                                        className="btn freesell btn-default fontsizeforgroup stop_sale_button_3_ stop_sale_button_3_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Free Sell
                                                      </Link>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="clearfix" />
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                    <div
                                      className="fc-row fc-week fc-widget-content"
                                      style={{ height: "167px" }}
                                    >
                                      <div className="fc-bg">
                                        <table>
                                          <tbody className="bg-white">
                                            <tr>
                                              <td
                                                className="fc-day fc-widget-content fc-sun fc-future"
                                                data-date="2023-09-10"
                                              />
                                              <td
                                                className="fc-day fc-widget-content fc-mon fc-future"
                                                data-date="2023-09-11"
                                              />
                                              <td
                                                className="fc-day fc-widget-content fc-tue fc-future"
                                                data-date="2023-09-12"
                                              />
                                              <td
                                                className="fc-day fc-widget-content fc-wed fc-future"
                                                data-date="2023-09-13"
                                              />
                                              <td
                                                className="fc-day fc-widget-content fc-thu fc-future"
                                                data-date="2023-09-14"
                                              />
                                              <td
                                                className="fc-day fc-widget-content fc-fri fc-future"
                                                data-date="2023-09-15"
                                              />
                                              <td
                                                className="fc-day fc-widget-content fc-sat fc-future"
                                                data-date="2023-09-16"
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
                                                className="fc-day-number fc-sun fc-future"
                                                data-date="2023-09-10"
                                              >
                                                10
                                              </td>
                                              <td
                                                className="fc-day-number fc-mon fc-future"
                                                data-date="2023-09-11"
                                              >
                                                11
                                              </td>
                                              <td
                                                className="fc-day-number fc-tue fc-future"
                                                data-date="2023-09-12"
                                              >
                                                12
                                              </td>
                                              <td
                                                className="fc-day-number fc-wed fc-future"
                                                data-date="2023-09-13"
                                              >
                                                13
                                              </td>
                                              <td
                                                className="fc-day-number fc-thu fc-future"
                                                data-date="2023-09-14"
                                              >
                                                14
                                              </td>
                                              <td
                                                className="fc-day-number fc-fri fc-future"
                                                data-date="2023-09-15"
                                              >
                                                15
                                              </td>
                                              <td
                                                className="fc-day-number fc-sat fc-future"
                                                data-date="2023-09-16"
                                              >
                                                16
                                              </td>
                                            </tr>
                                          </thead>
                                          <tbody className="bg-white">
                                            <tr>
                                              <td className="fc-event-container">
                                                <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                <div
                                                  id="invertory_box_2023-9-10"
                                                  className
                                                >
                                                  <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                  <div className="pull-left form-group1 buttons widthforelementsincalendar1">
                                                    <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                    <div className="btn-group selector_btn">
                                                      <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                      <Link
                                                        className="btn default btn-success fontsizeforgroup stop_sale_button_0_ stop_sale_button_0_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Default
                                                      </Link>
                                                      <Link
                                                        className="btn stopcell btn-default fontsizeforgroup stop_sale_button_1_ stop_sale_button_1_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Stop Sell{" "}
                                                      </Link>
                                                      <Link
                                                        className="btn partial btn-default fontsizeforgroup stop_sale_button_2_ stop_sale_button_2_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Partial Sell
                                                      </Link>
                                                      <Link
                                                        className="btn freesell btn-default fontsizeforgroup stop_sale_button_3_ stop_sale_button_3_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Free Sell
                                                      </Link>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="clearfix" />
                                              </td>
                                              <td className="fc-event-container">
                                                <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                <div
                                                  id="invertory_box_2023-9-11"
                                                  className
                                                >
                                                  <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                  <div className="pull-left form-group1 buttons widthforelementsincalendar1">
                                                    <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                    <div className="btn-group selector_btn">
                                                      <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                      <Link
                                                        className="btn default btn-success fontsizeforgroup stop_sale_button_0_ stop_sale_button_0_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Default
                                                      </Link>
                                                      <Link
                                                        className="btn stopcell btn-default fontsizeforgroup stop_sale_button_1_ stop_sale_button_1_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Stop Sell{" "}
                                                      </Link>
                                                      <Link
                                                        className="btn partial btn-default fontsizeforgroup stop_sale_button_2_ stop_sale_button_2_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Partial Sell
                                                      </Link>
                                                      <Link
                                                        className="btn freesell btn-default fontsizeforgroup stop_sale_button_3_ stop_sale_button_3_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Free Sell
                                                      </Link>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="clearfix" />
                                              </td>
                                              <td className="fc-event-container">
                                                <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                <div
                                                  id="invertory_box_2023-9-12"
                                                  className
                                                >
                                                  <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                  <div className="pull-left form-group1 buttons widthforelementsincalendar1">
                                                    <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                    <div className="btn-group selector_btn">
                                                      <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                      <Link
                                                        className="btn default btn-success fontsizeforgroup stop_sale_button_0_ stop_sale_button_0_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Default
                                                      </Link>
                                                      <Link
                                                        className="btn stopcell btn-default fontsizeforgroup stop_sale_button_1_ stop_sale_button_1_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Stop Sell{" "}
                                                      </Link>
                                                      <Link
                                                        className="btn partial btn-default fontsizeforgroup stop_sale_button_2_ stop_sale_button_2_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Partial Sell
                                                      </Link>
                                                      <Link
                                                        className="btn freesell btn-default fontsizeforgroup stop_sale_button_3_ stop_sale_button_3_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Free Sell
                                                      </Link>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="clearfix" />
                                              </td>
                                              <td className="fc-event-container">
                                                <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                <div
                                                  id="invertory_box_2023-9-13"
                                                  className
                                                >
                                                  <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                  <div className="pull-left form-group1 buttons widthforelementsincalendar1">
                                                    <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                    <div className="btn-group selector_btn">
                                                      <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                      <Link
                                                        className="btn default btn-success fontsizeforgroup stop_sale_button_0_ stop_sale_button_0_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Default
                                                      </Link>
                                                      <Link
                                                        className="btn stopcell btn-default fontsizeforgroup stop_sale_button_1_ stop_sale_button_1_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Stop Sell{" "}
                                                      </Link>
                                                      <Link
                                                        className="btn partial btn-default fontsizeforgroup stop_sale_button_2_ stop_sale_button_2_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Partial Sell
                                                      </Link>
                                                      <Link
                                                        className="btn freesell btn-default fontsizeforgroup stop_sale_button_3_ stop_sale_button_3_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Free Sell
                                                      </Link>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="clearfix" />
                                              </td>
                                              <td className="fc-event-container">
                                                <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                <div
                                                  id="invertory_box_2023-9-14"
                                                  className
                                                >
                                                  <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                  <div className="pull-left form-group1 buttons widthforelementsincalendar1">
                                                    <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                    <div className="btn-group selector_btn">
                                                      <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                      <Link
                                                        className="btn default btn-success fontsizeforgroup stop_sale_button_0_ stop_sale_button_0_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Default
                                                      </Link>
                                                      <Link
                                                        className="btn stopcell btn-default fontsizeforgroup stop_sale_button_1_ stop_sale_button_1_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Stop Sell{" "}
                                                      </Link>
                                                      <Link
                                                        className="btn partial btn-default fontsizeforgroup stop_sale_button_2_ stop_sale_button_2_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Partial Sell
                                                      </Link>
                                                      <Link
                                                        className="btn freesell btn-default fontsizeforgroup stop_sale_button_3_ stop_sale_button_3_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Free Sell
                                                      </Link>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="clearfix" />
                                              </td>
                                              <td className="fc-event-container">
                                                <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                <div
                                                  id="invertory_box_2023-9-15"
                                                  className
                                                >
                                                  <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                  <div className="pull-left form-group1 buttons widthforelementsincalendar1">
                                                    <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                    <div className="btn-group selector_btn">
                                                      <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                      <Link
                                                        className="btn default btn-success fontsizeforgroup stop_sale_button_0_ stop_sale_button_0_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Default
                                                      </Link>
                                                      <Link
                                                        className="btn stopcell btn-default fontsizeforgroup stop_sale_button_1_ stop_sale_button_1_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Stop Sell{" "}
                                                      </Link>
                                                      <Link
                                                        className="btn partial btn-default fontsizeforgroup stop_sale_button_2_ stop_sale_button_2_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Partial Sell
                                                      </Link>
                                                      <Link
                                                        className="btn freesell btn-default fontsizeforgroup stop_sale_button_3_ stop_sale_button_3_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Free Sell
                                                      </Link>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="clearfix" />
                                              </td>
                                              <td className="fc-event-container">
                                                <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                <div
                                                  id="invertory_box_2023-9-16"
                                                  className
                                                >
                                                  <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                  <div className="pull-left form-group1 buttons widthforelementsincalendar1">
                                                    <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                    <div className="btn-group selector_btn">
                                                      <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                      <Link
                                                        className="btn default btn-success fontsizeforgroup stop_sale_button_0_ stop_sale_button_0_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Default
                                                      </Link>
                                                      <Link
                                                        className="btn stopcell btn-default fontsizeforgroup stop_sale_button_1_ stop_sale_button_1_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Stop Sell{" "}
                                                      </Link>
                                                      <Link
                                                        className="btn partial btn-default fontsizeforgroup stop_sale_button_2_ stop_sale_button_2_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Partial Sell
                                                      </Link>
                                                      <Link
                                                        className="btn freesell btn-default fontsizeforgroup stop_sale_button_3_ stop_sale_button_3_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Free Sell
                                                      </Link>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="clearfix" />
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                    <div
                                      className="fc-row fc-week fc-widget-content"
                                      style={{ height: "167px" }}
                                    >
                                      <div className="fc-bg">
                                        <table>
                                          <tbody className="bg-white">
                                            <tr>
                                              <td
                                                className="fc-day fc-widget-content fc-sun fc-future"
                                                data-date="2023-09-17"
                                              />
                                              <td
                                                className="fc-day fc-widget-content fc-mon fc-future"
                                                data-date="2023-09-18"
                                              />
                                              <td
                                                className="fc-day fc-widget-content fc-tue fc-future"
                                                data-date="2023-09-19"
                                              />
                                              <td
                                                className="fc-day fc-widget-content fc-wed fc-future"
                                                data-date="2023-09-20"
                                              />
                                              <td
                                                className="fc-day fc-widget-content fc-thu fc-future"
                                                data-date="2023-09-21"
                                              />
                                              <td
                                                className="fc-day fc-widget-content fc-fri fc-future"
                                                data-date="2023-09-22"
                                              />
                                              <td
                                                className="fc-day fc-widget-content fc-sat fc-future"
                                                data-date="2023-09-23"
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
                                                className="fc-day-number fc-sun fc-future"
                                                data-date="2023-09-17"
                                              >
                                                17
                                              </td>
                                              <td
                                                className="fc-day-number fc-mon fc-future"
                                                data-date="2023-09-18"
                                              >
                                                18
                                              </td>
                                              <td
                                                className="fc-day-number fc-tue fc-future"
                                                data-date="2023-09-19"
                                              >
                                                19
                                              </td>
                                              <td
                                                className="fc-day-number fc-wed fc-future"
                                                data-date="2023-09-20"
                                              >
                                                20
                                              </td>
                                              <td
                                                className="fc-day-number fc-thu fc-future"
                                                data-date="2023-09-21"
                                              >
                                                21
                                              </td>
                                              <td
                                                className="fc-day-number fc-fri fc-future"
                                                data-date="2023-09-22"
                                              >
                                                22
                                              </td>
                                              <td
                                                className="fc-day-number fc-sat fc-future"
                                                data-date="2023-09-23"
                                              >
                                                23
                                              </td>
                                            </tr>
                                          </thead>
                                          <tbody className="bg-white">
                                            <tr>
                                              <td className="fc-event-container">
                                                <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                <div
                                                  id="invertory_box_2023-9-17"
                                                  className
                                                >
                                                  <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                  <div className="pull-left form-group1 buttons widthforelementsincalendar1">
                                                    <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                    <div className="btn-group selector_btn">
                                                      <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                      <Link
                                                        className="btn default btn-success fontsizeforgroup stop_sale_button_0_ stop_sale_button_0_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Default
                                                      </Link>
                                                      <Link
                                                        className="btn stopcell btn-default fontsizeforgroup stop_sale_button_1_ stop_sale_button_1_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Stop Sell{" "}
                                                      </Link>
                                                      <Link
                                                        className="btn partial btn-default fontsizeforgroup stop_sale_button_2_ stop_sale_button_2_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Partial Sell
                                                      </Link>
                                                      <Link
                                                        className="btn freesell btn-default fontsizeforgroup stop_sale_button_3_ stop_sale_button_3_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Free Sell
                                                      </Link>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="clearfix" />
                                              </td>
                                              <td className="fc-event-container">
                                                <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                <div
                                                  id="invertory_box_2023-9-18"
                                                  className
                                                >
                                                  <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                  <div className="pull-left form-group1 buttons widthforelementsincalendar1">
                                                    <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                    <div className="btn-group selector_btn">
                                                      <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                      <Link
                                                        className="btn default btn-success fontsizeforgroup stop_sale_button_0_ stop_sale_button_0_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Default
                                                      </Link>
                                                      <Link
                                                        className="btn stopcell btn-default fontsizeforgroup stop_sale_button_1_ stop_sale_button_1_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Stop Sell{" "}
                                                      </Link>
                                                      <Link
                                                        className="btn partial btn-default fontsizeforgroup stop_sale_button_2_ stop_sale_button_2_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Partial Sell
                                                      </Link>
                                                      <Link
                                                        className="btn freesell btn-default fontsizeforgroup stop_sale_button_3_ stop_sale_button_3_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Free Sell
                                                      </Link>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="clearfix" />
                                              </td>
                                              <td className="fc-event-container">
                                                <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                <div
                                                  id="invertory_box_2023-9-19"
                                                  className
                                                >
                                                  <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                  <div className="pull-left form-group1 buttons widthforelementsincalendar1">
                                                    <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                    <div className="btn-group selector_btn">
                                                      <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                      <Link
                                                        className="btn default btn-success fontsizeforgroup stop_sale_button_0_ stop_sale_button_0_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Default
                                                      </Link>
                                                      <Link
                                                        className="btn stopcell btn-default fontsizeforgroup stop_sale_button_1_ stop_sale_button_1_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Stop Sell{" "}
                                                      </Link>
                                                      <Link
                                                        className="btn partial btn-default fontsizeforgroup stop_sale_button_2_ stop_sale_button_2_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Partial Sell
                                                      </Link>
                                                      <Link
                                                        className="btn freesell btn-default fontsizeforgroup stop_sale_button_3_ stop_sale_button_3_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Free Sell
                                                      </Link>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="clearfix" />
                                              </td>
                                              <td className="fc-event-container">
                                                <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                <div
                                                  id="invertory_box_2023-9-20"
                                                  className
                                                >
                                                  <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                  <div className="pull-left form-group1 buttons widthforelementsincalendar1">
                                                    <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                    <div className="btn-group selector_btn">
                                                      <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                      <Link
                                                        className="btn default btn-success fontsizeforgroup stop_sale_button_0_ stop_sale_button_0_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Default
                                                      </Link>
                                                      <Link
                                                        className="btn stopcell btn-default fontsizeforgroup stop_sale_button_1_ stop_sale_button_1_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Stop Sell{" "}
                                                      </Link>
                                                      <Link
                                                        className="btn partial btn-default fontsizeforgroup stop_sale_button_2_ stop_sale_button_2_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Partial Sell
                                                      </Link>
                                                      <Link
                                                        className="btn freesell btn-default fontsizeforgroup stop_sale_button_3_ stop_sale_button_3_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Free Sell
                                                      </Link>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="clearfix" />
                                              </td>
                                              <td className="fc-event-container">
                                                <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                <div
                                                  id="invertory_box_2023-9-21"
                                                  className
                                                >
                                                  <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                  <div className="pull-left form-group1 buttons widthforelementsincalendar1">
                                                    <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                    <div className="btn-group selector_btn">
                                                      <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                      <Link
                                                        className="btn default btn-success fontsizeforgroup stop_sale_button_0_ stop_sale_button_0_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Default
                                                      </Link>
                                                      <Link
                                                        className="btn stopcell btn-default fontsizeforgroup stop_sale_button_1_ stop_sale_button_1_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Stop Sell{" "}
                                                      </Link>
                                                      <Link
                                                        className="btn partial btn-default fontsizeforgroup stop_sale_button_2_ stop_sale_button_2_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Partial Sell
                                                      </Link>
                                                      <Link
                                                        className="btn freesell btn-default fontsizeforgroup stop_sale_button_3_ stop_sale_button_3_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Free Sell
                                                      </Link>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="clearfix" />
                                              </td>
                                              <td className="fc-event-container">
                                                <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                <div
                                                  id="invertory_box_2023-9-22"
                                                  className
                                                >
                                                  <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                  <div className="pull-left form-group1 buttons widthforelementsincalendar1">
                                                    <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                    <div className="btn-group selector_btn">
                                                      <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                      <Link
                                                        className="btn default btn-success fontsizeforgroup stop_sale_button_0_ stop_sale_button_0_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Default
                                                      </Link>
                                                      <Link
                                                        className="btn stopcell btn-default fontsizeforgroup stop_sale_button_1_ stop_sale_button_1_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Stop Sell{" "}
                                                      </Link>
                                                      <Link
                                                        className="btn partial btn-default fontsizeforgroup stop_sale_button_2_ stop_sale_button_2_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Partial Sell
                                                      </Link>
                                                      <Link
                                                        className="btn freesell btn-default fontsizeforgroup stop_sale_button_3_ stop_sale_button_3_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Free Sell
                                                      </Link>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="clearfix" />
                                              </td>
                                              <td className="fc-event-container">
                                                <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                <div
                                                  id="invertory_box_2023-9-23"
                                                  className
                                                >
                                                  <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                  <div className="pull-left form-group1 buttons widthforelementsincalendar1">
                                                    <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                    <div className="btn-group selector_btn">
                                                      <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                      <Link
                                                        className="btn default btn-success fontsizeforgroup stop_sale_button_0_ stop_sale_button_0_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Default
                                                      </Link>
                                                      <Link
                                                        className="btn stopcell btn-default fontsizeforgroup stop_sale_button_1_ stop_sale_button_1_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Stop Sell{" "}
                                                      </Link>
                                                      <Link
                                                        className="btn partial btn-default fontsizeforgroup stop_sale_button_2_ stop_sale_button_2_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Partial Sell
                                                      </Link>
                                                      <Link
                                                        className="btn freesell btn-default fontsizeforgroup stop_sale_button_3_ stop_sale_button_3_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Free Sell
                                                      </Link>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="clearfix" />
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                    <div
                                      className="fc-row fc-week fc-widget-content"
                                      style={{ height: "167px" }}
                                    >
                                      <div className="fc-bg">
                                        <table>
                                          <tbody className="bg-white">
                                            <tr>
                                              <td
                                                className="fc-day fc-widget-content fc-sun fc-future"
                                                data-date="2023-09-24"
                                              />
                                              <td
                                                className="fc-day fc-widget-content fc-mon fc-future"
                                                data-date="2023-09-25"
                                              />
                                              <td
                                                className="fc-day fc-widget-content fc-tue fc-future"
                                                data-date="2023-09-26"
                                              />
                                              <td
                                                className="fc-day fc-widget-content fc-wed fc-future"
                                                data-date="2023-09-27"
                                              />
                                              <td
                                                className="fc-day fc-widget-content fc-thu fc-future"
                                                data-date="2023-09-28"
                                              />
                                              <td
                                                className="fc-day fc-widget-content fc-fri fc-future"
                                                data-date="2023-09-29"
                                              />
                                              <td
                                                className="fc-day fc-widget-content fc-sat fc-future"
                                                data-date="2023-09-30"
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
                                                className="fc-day-number fc-sun fc-future"
                                                data-date="2023-09-24"
                                              >
                                                24
                                              </td>
                                              <td
                                                className="fc-day-number fc-mon fc-future"
                                                data-date="2023-09-25"
                                              >
                                                25
                                              </td>
                                              <td
                                                className="fc-day-number fc-tue fc-future"
                                                data-date="2023-09-26"
                                              >
                                                26
                                              </td>
                                              <td
                                                className="fc-day-number fc-wed fc-future"
                                                data-date="2023-09-27"
                                              >
                                                27
                                              </td>
                                              <td
                                                className="fc-day-number fc-thu fc-future"
                                                data-date="2023-09-28"
                                              >
                                                28
                                              </td>
                                              <td
                                                className="fc-day-number fc-fri fc-future"
                                                data-date="2023-09-29"
                                              >
                                                29
                                              </td>
                                              <td
                                                className="fc-day-number fc-sat fc-future"
                                                data-date="2023-09-30"
                                              >
                                                30
                                              </td>
                                            </tr>
                                          </thead>
                                          <tbody className="bg-white">
                                            <tr>
                                              <td className="fc-event-container">
                                                <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                <div
                                                  id="invertory_box_2023-9-24"
                                                  className
                                                >
                                                  <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                  <div className="pull-left form-group1 buttons widthforelementsincalendar1">
                                                    <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                    <div className="btn-group selector_btn">
                                                      <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                      <Link
                                                        className="btn default btn-success fontsizeforgroup stop_sale_button_0_ stop_sale_button_0_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Default
                                                      </Link>
                                                      <Link
                                                        className="btn stopcell btn-default fontsizeforgroup stop_sale_button_1_ stop_sale_button_1_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Stop Sell{" "}
                                                      </Link>
                                                      <Link
                                                        className="btn partial btn-default fontsizeforgroup stop_sale_button_2_ stop_sale_button_2_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Partial Sell
                                                      </Link>
                                                      <Link
                                                        className="btn freesell btn-default fontsizeforgroup stop_sale_button_3_ stop_sale_button_3_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Free Sell
                                                      </Link>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="clearfix" />
                                              </td>
                                              <td className="fc-event-container">
                                                <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                <div
                                                  id="invertory_box_2023-9-25"
                                                  className
                                                >
                                                  <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                  <div className="pull-left form-group1 buttons widthforelementsincalendar1">
                                                    <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                    <div className="btn-group selector_btn">
                                                      <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                      <Link
                                                        className="btn default btn-success fontsizeforgroup stop_sale_button_0_ stop_sale_button_0_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Default
                                                      </Link>
                                                      <Link
                                                        className="btn stopcell btn-default fontsizeforgroup stop_sale_button_1_ stop_sale_button_1_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Stop Sell{" "}
                                                      </Link>
                                                      <Link
                                                        className="btn partial btn-default fontsizeforgroup stop_sale_button_2_ stop_sale_button_2_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Partial Sell
                                                      </Link>
                                                      <Link
                                                        className="btn freesell btn-default fontsizeforgroup stop_sale_button_3_ stop_sale_button_3_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Free Sell
                                                      </Link>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="clearfix" />
                                              </td>
                                              <td className="fc-event-container">
                                                <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                <div
                                                  id="invertory_box_2023-9-26"
                                                  className
                                                >
                                                  <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                  <div className="pull-left form-group1 buttons widthforelementsincalendar1">
                                                    <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                    <div className="btn-group selector_btn">
                                                      <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                      <Link
                                                        className="btn default btn-success fontsizeforgroup stop_sale_button_0_ stop_sale_button_0_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Default
                                                      </Link>
                                                      <Link
                                                        className="btn stopcell btn-default fontsizeforgroup stop_sale_button_1_ stop_sale_button_1_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Stop Sell{" "}
                                                      </Link>
                                                      <Link
                                                        className="btn partial btn-default fontsizeforgroup stop_sale_button_2_ stop_sale_button_2_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Partial Sell
                                                      </Link>
                                                      <Link
                                                        className="btn freesell btn-default fontsizeforgroup stop_sale_button_3_ stop_sale_button_3_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Free Sell
                                                      </Link>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="clearfix" />
                                              </td>
                                              <td className="fc-event-container">
                                                <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                <div
                                                  id="invertory_box_2023-9-27"
                                                  className
                                                >
                                                  <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                  <div className="pull-left form-group1 buttons widthforelementsincalendar1">
                                                    <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                    <div className="btn-group selector_btn">
                                                      <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                      <Link
                                                        className="btn default btn-success fontsizeforgroup stop_sale_button_0_ stop_sale_button_0_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Default
                                                      </Link>
                                                      <Link
                                                        className="btn stopcell btn-default fontsizeforgroup stop_sale_button_1_ stop_sale_button_1_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Stop Sell{" "}
                                                      </Link>
                                                      <Link
                                                        className="btn partial btn-default fontsizeforgroup stop_sale_button_2_ stop_sale_button_2_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Partial Sell
                                                      </Link>
                                                      <Link
                                                        className="btn freesell btn-default fontsizeforgroup stop_sale_button_3_ stop_sale_button_3_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Free Sell
                                                      </Link>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="clearfix" />
                                              </td>
                                              <td className="fc-event-container">
                                                <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                <div
                                                  id="invertory_box_2023-9-28"
                                                  className
                                                >
                                                  <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                  <div className="pull-left form-group1 buttons widthforelementsincalendar1">
                                                    <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                    <div className="btn-group selector_btn">
                                                      <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                      <Link
                                                        className="btn default btn-success fontsizeforgroup stop_sale_button_0_ stop_sale_button_0_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Default
                                                      </Link>
                                                      <Link
                                                        className="btn stopcell btn-default fontsizeforgroup stop_sale_button_1_ stop_sale_button_1_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Stop Sell{" "}
                                                      </Link>
                                                      <Link
                                                        className="btn partial btn-default fontsizeforgroup stop_sale_button_2_ stop_sale_button_2_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Partial Sell
                                                      </Link>
                                                      <Link
                                                        className="btn freesell btn-default fontsizeforgroup stop_sale_button_3_ stop_sale_button_3_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Free Sell
                                                      </Link>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="clearfix" />
                                              </td>
                                              <td className="fc-event-container">
                                                <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                <div
                                                  id="invertory_box_2023-9-29"
                                                  className
                                                >
                                                  <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                  <div className="pull-left form-group1 buttons widthforelementsincalendar1">
                                                    <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                    <div className="btn-group selector_btn">
                                                      <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                      <Link
                                                        className="btn default btn-success fontsizeforgroup stop_sale_button_0_ stop_sale_button_0_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Default
                                                      </Link>
                                                      <Link
                                                        className="btn stopcell btn-default fontsizeforgroup stop_sale_button_1_ stop_sale_button_1_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Stop Sell{" "}
                                                      </Link>
                                                      <Link
                                                        className="btn partial btn-default fontsizeforgroup stop_sale_button_2_ stop_sale_button_2_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Partial Sell
                                                      </Link>
                                                      <Link
                                                        className="btn freesell btn-default fontsizeforgroup stop_sale_button_3_ stop_sale_button_3_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Free Sell
                                                      </Link>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="clearfix" />
                                              </td>
                                              <td className="fc-event-container">
                                                <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                <div
                                                  id="invertory_box_2023-9-30"
                                                  className
                                                >
                                                  <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                  <div className="pull-left form-group1 buttons widthforelementsincalendar1">
                                                    <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                    <div className="btn-group selector_btn">
                                                      <Link className="fc-day-grid-event fc-event fc-start fc-end"></Link>
                                                      <Link
                                                        className="btn default btn-success fontsizeforgroup stop_sale_button_0_ stop_sale_button_0_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Default
                                                      </Link>
                                                      <Link
                                                        className="btn stopcell btn-default fontsizeforgroup stop_sale_button_1_ stop_sale_button_1_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Stop Sell{" "}
                                                      </Link>
                                                      <Link
                                                        className="btn partial btn-default fontsizeforgroup stop_sale_button_2_ stop_sale_button_2_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Partial Sell
                                                      </Link>
                                                      <Link
                                                        className="btn freesell btn-default fontsizeforgroup stop_sale_button_3_ stop_sale_button_3_"
                                                        data-toggle="tab"
                                                        disabled
                                                      >
                                                        Free Sell
                                                      </Link>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="clearfix" />
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                    <div
                                      className="fc-row fc-week fc-widget-content"
                                      style={{ height: "167px" }}
                                    >
                                      <div className="fc-bg">
                                        <table>
                                          <tbody className="bg-white">
                                            <tr>
                                              <td
                                                className="fc-day fc-widget-content fc-sun fc-other-month fc-future"
                                                data-date="2023-10-01"
                                              />
                                              <td
                                                className="fc-day fc-widget-content fc-mon fc-other-month fc-future"
                                                data-date="2023-10-02"
                                              />
                                              <td
                                                className="fc-day fc-widget-content fc-tue fc-other-month fc-future"
                                                data-date="2023-10-03"
                                              />
                                              <td
                                                className="fc-day fc-widget-content fc-wed fc-other-month fc-future"
                                                data-date="2023-10-04"
                                              />
                                              <td
                                                className="fc-day fc-widget-content fc-thu fc-other-month fc-future"
                                                data-date="2023-10-05"
                                              />
                                              <td
                                                className="fc-day fc-widget-content fc-fri fc-other-month fc-future"
                                                data-date="2023-10-06"
                                              />
                                              <td
                                                className="fc-day fc-widget-content fc-sat fc-other-month fc-future"
                                                data-date="2023-10-07"
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
                                                className="fc-day-number fc-sun fc-other-month fc-future"
                                                data-date="2023-10-01"
                                              >
                                                1
                                              </td>
                                              <td
                                                className="fc-day-number fc-mon fc-other-month fc-future"
                                                data-date="2023-10-02"
                                              >
                                                2
                                              </td>
                                              <td
                                                className="fc-day-number fc-tue fc-other-month fc-future"
                                                data-date="2023-10-03"
                                              >
                                                3
                                              </td>
                                              <td
                                                className="fc-day-number fc-wed fc-other-month fc-future"
                                                data-date="2023-10-04"
                                              >
                                                4
                                              </td>
                                              <td
                                                className="fc-day-number fc-thu fc-other-month fc-future"
                                                data-date="2023-10-05"
                                              >
                                                5
                                              </td>
                                              <td
                                                className="fc-day-number fc-fri fc-other-month fc-future"
                                                data-date="2023-10-06"
                                              >
                                                6
                                              </td>
                                              <td
                                                className="fc-day-number fc-sat fc-other-month fc-future"
                                                data-date="2023-10-07"
                                              >
                                                7
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

        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n\n\n@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap');\n@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');\n\n\nheader,.form-group label,#firstNav,textarea{\n  font-family: \"MONTSERRAT\";\n}\ntextarea{\n  font-size: 12px !important;\n    font-family: 'Montserrat'!important;\n}\nheader span{\n  font-weight: normal;\n}\np{\n  font-size: 11px!important;\n}\n::placeholder{\n  font-size: 12px;\n}\nbody{\n  margin: 0px !important;\n  padding:0px !important;\n  overflow-x: hidden; /* Hide horizontal scrollbar */\n  background-color: rgb(237,240,245)!important;\n}\n.color-line {\n  background: #f7f9fa;\n  height: 6px;\n  background-image: -webkit-linear-gradient(left, #34495e, #34495e 25%, #9b59b6 25%, #9b59b6 35%, #3498db 35%, #3498db 45%, #62cb31 45%, #62cb31 55%, #ffb606 55%, #ffb606 65%, #e67e22 65%, #e67e22 75%, #e74c3c 85%, #e74c3c 85%, #c0392b 85%, #c0392b 100%);\n  background-image: -moz-linear-gradient(left, #34495e, #34495e 25%, #9b59b6 25%, #9b59b6 35%, #3498db 35%, #3498db 45%, #62cb31 45%, #62cb31 55%, #ffb606 55%, #ffb606 65%, #e67e22 65%, #e67e22 75%, #e74c3c 85%, #e74c3c 85%, #c0392b 85%, #c0392b 100%);\n  background-image: -ms-linear-gradient(left, #34495e, #34495e 25%, #9b59b6 25%, #9b59b6 35%, #3498db 35%, #3498db 45%, #62cb31 45%, #62cb31 55%, #ffb606 55%, #ffb606 65%, #e67e22 65%, #e67e22 75%, #e74c3c 85%, #e74c3c 85%, #c0392b 85%, #c0392b 100%);\n  background-image: linear-gradient(to right, #34495e, #34495e 25%, #9b59b6 25%, #9b59b6 35%, #3498db 35%, #3498db 45%, #62cb31 45%, #62cb31 55%, #ffb606 55%, #ffb606 65%, #e67e22 65%, #e67e22 75%, #e74c3c 85%, #e74c3c 85%, #c0392b 85%, #c0392b 100%);\n  background-size: 100% 6px;\n  background-position: 50% 100%;\n  background-repeat: no-repeat;\n}\n\n.color-lineorange {\n  background: #f7f9fa;\n  height: 6px;\n  background: #ffb606;\n  background-size: 100% 6px;\n  background-position: 50% 100%;\n  background-repeat: no-repeat;\n}\n.color-linegreen {\n  background: #f7f9fa;\n  height: 6px;\n  background: #62cb31;\n  background-size: 100% 6px;\n  background-position: 50% 100%;\n  background-repeat: no-repeat;\n}\n\n#content-pad{\n  padding: 0px 15px 50px 15px!important;\n \n}\nform{\n  background: white!important;\n  padding-left: 13px;\n  padding-top: 6px;\n  padding-bottom:25px;\n  padding-right: 30px;\n}\n\n.navbar {\n  --bs-navbar-padding-y: -0.5rem !important;\n}\n\n#navbarSupportedContent {\n  flex: inherit;\n\n}\n.navbar-toggler{\n  float: right;\n}\n.cancelNot1 h2{\n  text-shadow: 1px 1px 1px #000;\n}\n\n.navbar-collapse {\n  margin-right: 70px;\n}\n#firstNav{\n  background-color: rgb(255,255,255)!important;\n}\n\n#secondNav {\n  background-color: #FF5015;\n  height: 39px;\n}\n\n#drip {\n  float: left;\n  background-color: #FF5015;\n  border-right: 1px solid #ddd;\n}\n\n\n#drip:hover a{\n  background: rgb(255, 255, 255);\n  color: #6a6c6f;\n  padding-left:10px;\n  padding-right:10px;\n  margin:auto;\n}\n\n\n\n\n\n#dripmenu {\n  display:none;\n  position: absolute;\n  background-color: #f9f9f9;\n  min-width: 160px;\n  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);\n  z-index: 1;\n}\n\n#dripmenu a {\n  float: none;\n  color: #6a6c6f;\n  padding: 12px 16px;\n  font-size: 11px;\n  text-decoration: none;\n  display: block;\n  text-align: left;\n}\n\n#dripmenu a:hover {\n  background-color: #ddd;\n\n}\n\n#drip:hover #dripmenu {\n  display: block;\n  padding-top: 0px;\n  padding-bottom: 0px;\n}\n\n.dropdown-menu .dropdown-submenu {\n  display: none;\n  position: absolute;\n  left: 100%;\n  top: 40px;\n  padding-top: 0px;\n  padding-bottom: 0px;\n}\n\n#customerSub {\n  top: 10px;\n}\n\n#agentsub {\n  top: 0px;\n}\n#subscribersub {\n  top: 40px;\n}\n#accountsub {\n  top: 68px;\n}\n#accountsub1 {\n  top: 90px;\n  left: -153px;}\n\n#mappingsub {\n  top: 80px;\n}\n\n#mappinggsub {\n  top: 118px;\n}\n#mappingggsub {\n  top: 128px;\n}\n#transsub {\n  top: 162px;\n}\n#exchangesub {\n  top: 158px;\n}\n\n#trxsub {\n  top: 200px;\n}\n\n#suppsub {\n  top: 240px;\n}\n\n#marksub {\n  top: 320px;\n}\n\n#mealsub {\n  top: 290px;\n}\n\n#marketsub {\n  top: 370px;\n}\n\n#paysub {\n  top: 400px;\n}\n\n#banksub {\n  top: 480px;\n}\n\n#cursub {\n  top: 530px;\n}\n\n#taxsub {\n  top: 570px;\n}\n\n#loyaltysub {\n  top: 610px;\n}\n\n#vehiclesub {\n  top: 740px;\n}\n\n.dropdown-menu .dropdown-submenu-left {\n  right: 100%;\n  left: auto;\n}\n\n.dropdown-menu>li:hover>.dropdown-submenu {\n  display: block;\n}\n\n\nheader {\n\n  color:#6a6c6f;\n  font-weight: 400;\n  padding: 10px 4px 4px;\n  transition: all .3s;\n  border: 1px solid transparent;\n  background-color: #edf0f5!important;\n}\n\n.cancelNot1 {\n  background: #FFA0A0;\n  padding: 10px;\n}\n\n\n\nthead {\n  background-color: #FF5015;\n  font-size: 11px;\n  color: #f9f9f9;\n}\n\nth {\n  font-size: 10px;\n  text-align: center !important;\n}\n\ntd {\n  font-size: 10px;\n  text-align: center !important;\n  color: #6A6C6F;\n}\ntd a:hover{\ntext-decoration: underline !important;\n}\n\n.dateWrapper {\n  text-align: center;\n  margin: 0px auto;\n  width: 32px;\n}\n\n.dateWrapper .onlyDate {\n  background-color: #fff;\n  border-radius: 5px 5px 0px 0px;\n  font-size: 13pt;\n  padding: 0px;\n  border: 1px solid #bcb9b9;\n  font-weight: 600;\n}\n\n.dateWrapper .monthYear {\n  background-color: rgb(160, 157, 157);\n  border-radius: 0px 0px 5px 5px;\n  color: #fff;\n  font-size: 6.5pt;\n  padding: 1px 5px;\n  line-height: 11px;\n}\n#magnifier{\n\nposition: relative;\n\nright: 30px;\ntop: 27px;\n\n\n}\n#magnifiers\n{\n\n  position: relative;\n  \n  right: 62px;\n  top: 27px;\n  \n  \n  }\n.table.dataTable span.label {\n  text-transform: capitalize;\n}\n.fnt-colr h5 {\n  display: inline-block;\n}\n.td_label {\n  display: inline-block;\n  padding: 5px;\n  font-size: 9px;\n  line-height: 1;\n  color: #fff;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: baseline;\n  border-radius: 0.25em;\n  margin-top: 15px;\n}\n.bootstrap-select .dropdown-toggle .filter-option-inner-inner {\n  font-size: 12px;\n}\n.label-success {\n  background-color: #62cb31;\n}\n.label-primary{\n  background-color: #FF5015;\n}\n\n.label-default {\n  background-color: #777;\n}\n.label-info {\n  background-color: #5bc0de;\n}\n.iconCont {\n  width: 59px;\n  margin: 0px auto;\n}\n\n.label-danger {\n  background-color: #d9534f;\n}\n\n.label-warning {\n  background-color: #f0ad4e;\n}\n\n.table.dataTable tr td:last-child,\n.table.dataTable tr th:last-child {\n  border-right: 0px solid #ddd !important;\n}\n\n.table.dataTable .input-group-addon,\n.modalForm .input-group-addon {\n  padding: 0px !important;\n  width: 29px !important;\n  height: 29px;\n  float: left;\n  border: 1px solid #e4e5e7 !important;\n  background: #f7f8fa;\n  border-color: #e4e5e7 !important;\n  font-size: 14px;\n  font-weight: normal;\n  line-height: 2;\n  color: #555;\n  text-align: center;\n}\n\n.table.dataTable .input-group-addon:hover,\n.modalForm .input-group-addon:hover {\n  background-color: #CCC;\n  border: 1px solid rgb(160, 157, 157) !important;\n  cursor: pointer;\n}\n\n.table.dataTable .actionlink {\n  white-space: nowrap;\n}\n\n.table.dataTable .actionlink .actionCont {\n  width: 87px;\n  margin: 0px auto;\n  text-align: center;\n}\n\n.table>thead>tr>td {\n  color: white;\n}\n\n.input-group-addon {\n  width: auto !important;\n  padding: 5px !important;\n  width: 36px !important;\n  height: 31px;\n  border: 1px solid #e4e5e7 !important;\n  cursor: pointer!important;\n}\n\n.input-group-addon {\n  background: #f7f8fa;\n  /* border-color: #e4e5e7 !important; */\n}\n\n.table>tbody>tr>td {\n  font-size: 9pt !important;\n  text-transform: uppercase !important;\n  vertical-align: middle !important;\n  font-weight: normal !important;\n\n}\n\n.width_table {\n  width: 183px !important;\n  position: relative;\n  display: inline-block;\n}\n\n.width_table {\n  width: 150px !important;\n}\n\n.contLeft {\n  height: 59px;\n  overflow: hidden;\n  width: 146px;\n  float: left;\n}\n.nav-tabs .nav-link{\n  background-color: white !important;\n}\n.add-more-vehicle {\n  background: #FF5015 !important;\n  padding-left: 140px!important;\n  padding-top: 28px !important;\n}\n.remove-vehicle {\n  background: #e4e5e7 !important;\n  padding-left: 140px!important;\n  padding-top: 28px !important;\n}\n.plusIco a {\n  top: 34px;\n  position: relative;\n  width: 20px;\n  height: 20px;\n  display: inline-block;\n  line-height: 20px;\n  background: #FF5015;\n  color: #fff !important;\n  font-size: 11px;\n  margin-left: 5px;\n  cursor: pointer;\n}\n\n.fa-stack {\n  display: inline;\n}\n\n.input-group-addon a {\n  color: #555;\n}\n\n.fa:hover {\n  color: #555 !important;\n}\n.panel-body-essen {\n  border: #e3e3e3 solid 1px;\n  padding: 5px 15px 10px 15px;\n  margin-bottom: 15px;\n}\n\n.input-daterange .input-group-addon {\n  width: auto;\n  min-width: 16px;\n  padding: 4px 10px;\n  font-weight: 400;\n  line-height: 1.428571;\n  text-align: center;\n  text-shadow: 0 1px 0 #fff;\n  vertical-align: middle;\n  background-color: #eee;\n  border: solid #ccc;\n  border-width: 1px 0;\n  margin-left: -5px;\n  margin-right: -5px;\n  cursor: pointer;\n}\n\n.input-group-addon:not(:first-child):not(:last-child),\n.input-group-btn:not(:first-child):not(:last-child),\n.input-group .form-control:not(:first-child):not(:last-child) {\n  border-radius: 0;\n}\n\n.input-daterange span.input-group-addon,\n.input-group span.input-group-addon {\n  font-size: 12px;\n  text-transform: uppercase;\n  text-align: center;\n  font-weight: 600;\n  cursor: pointer;\n}\n\n.countSect {\n  padding-right: 10px;\n  padding-left: 23px;\n}\n\n.notifText h6 {\n  line-height: 20px;\n  color: #000;\n}\n\ninput[type=\"file\"] {\n  display: block !important;\n  position: absolute;\n  top: 0px;\n  right: 0;\n  opacity: 0;\n  font-size: 100px;\n  filter: alpha(opacity=0);\n  cursor: pointer;\n  width: 27px !important;\n  left: 0px;\n  height: 27px;\n}\n\n.input-group span * {\n  text-transform: none;\n}\n\n.btn-group, .btn-group-vertical {\n  vertical-align: 20px!important;\n}\n\n\n.uniqFile {\n  cursor: pointer !important;\n  position: relative;\n  display: table;\n  border-collapse: separate;\n}\n\n.input-group .input-group-addon {\n  cursor: pointer !important;\n}\n\n.input-group-addon:last-child {\n  border-left: 0;\n}\n.alert-danger{\n  background-color: #f2dede;\n}\n\n#tickschecks {\n  display: contents;\n  font-size: 21px;\n}\n#tickscheckss {\n  display: flex;\n  font-size: 21px;\n}\n\n#tickscheck {\n  margin-left: 23px;\n}\n\n#tickspc {\n  margin-left: 13px;\n}\n\n.text-danger {\n  color: #e74c3c;\n}\n\n.glyphicon {\n  position: relative;\n  top: 1px;\n  display: inline-block;\n  font-family: 'Glyphicons Halflings';\n  font-style: normal;\n  font-weight: normal;\n  line-height: 1;\n  -webkit-font-smoothing: antialiased;\n}\n\n\n.boxview {\n  text-align: center;\n  text-decoration: none;\n  color: #fff;\n  height: 39px;\n  width: auto;\n  font-size: 10.2px;\n  display: block;\n  line-height: 40px;\n  margin: 0px 10px 0px 10px;\n}\n.form-group label{\nfont-size: 11px;\nfont-weight: 600;\ncolor: #4e4b4b;\nmargin-bottom: 6px;\n}\ntextarea[readonly] {\n  cursor: not-allowed;\n  background-color: #eee;\n  opacity: 1;\n}\n\n.nav-tabs {\n  border-bottom: 1px solid #e4e5e7 !important;\n}\n.nav-tabs > li {\n  float: left;\n  margin-bottom: -1px;\n}\n.nav-tabs li.active a {\n  background-color: #FF5015;\n  color: #fff;\n}\n\np{\n  font-size: 12px;\n  font-weight: 500;\n  color: #6a6c6f !important;\n  }\n.col-md-3{\n  font-size: 12px;\n  font-weight: 600;\ncolor:#6a6c6f !important;\n}\n.col-md-1,.col-md-2,.col-md-4,.col-md-5 span{\n  font-size: 12px;\n}\n.form-group h5,h6{\n  color: #6a6c6f;\n  font-weight: 400;\n}\nlabel h5{\n  color: #6a6c6f !important;\n  font-weight: 400;\n}\n#heading{\n  color: #6a6c6f !important;\n  font-weight: 400;\n}\n\n.btn-dark {\n  background-color: #34495e !important;\n  border-color: #34495e !important;\n  color: #FFFFFF;\n  font-size: 12px!important;\n}\n\n.bootstrap-select.form-control-sm .dropdown-toggle {\n  background:transparent;\n  border: 0.1px solid rgb(214, 207, 207)!important;\n}\n.checkbox label{\n  padding-left: 5px;\n  vertical-align: 4px;\n  position: relative;\n \n}\n.radio label{\n  padding-left: 3px;\n  vertical-align: 4px;\n  position: relative;\n}\n.card{\n  border-radius: 0!important;\n}\n\n.btn-dark:hover {\n  background-color: #3f5872 !important;\n  border-color: #3f5872 !important;\n  color: #FFFFFF;\n}\n\n\n.form-control.required.bootstrap-select > button {\n  border-left: 2px solid red!important;\n  border-radius: 0px 4px 4px 0px;\n}\ninput.required{\n  border-left: 2px solid red!important;\n  border-radius: 0px 4px 4px 0px;\n}\ntextarea.required{\n  border-left: 2px solid red!important;\n  border-radius: 0px 4px 4px 0px;\n}\n\n.fa-times-circle.fa-xs {\n  color: #6a7490 !important;\n  vertical-align: -2px;\n}\n.fa-check-circle.fa-xs {\n  color: #ffffff!important;\n  vertical-align:-2px;\n}\n.btn-group{\n  padding-bottom: 5px;\n}\n\n.form-control:focus {\n  color: #212529;\n  background-color: beige!important;\n  outline: 0;\n  box-shadow:none!important;\n  border-color: #d5d5d5!important;\n}\n\n\n.bs-placeholder{\n  background: transparent;\n}\n\n#tree1 {\n  margin: 0px;\n  padding: 0px;\n}\n\n.dd {\n  position: relative;\n  display: block;\n  margin: 0;\n  padding: 0;\n  list-style: none;\n  font-size: 13px;\n  line-height: 20px;\n}\n\n.dd-list {\n  display: block;\n  position: relative;\n  margin: 0;\n  padding: 0;\n  list-style: none;\n}\n\n.dd-item {\n  display: block;\n  position: relative;\n  margin: 0;\n  padding: 0;\n  min-height: 20px;\n  font-size: 14 px;\n  line-height: 20px;\n}\n\n.dd-list .dd-list {\n  padding-left: 30px;\n}\n\n.dd-item>button {\n  display: none;\n  display: block;\n  position: relative;\n  cursor: pointer;\n  float: left;\n  width: 25px;\n  height: 25px;\n  margin: 5px 0;\n  padding: 0;\n  text-indent: 100%;\n  white-space: nowrap;\n  overflow: hidden;\n  border: 0;\n  background: transparent;\n  font-size: 12px;\n  line-height: 1;\n  text-align: center;\n  font-weight: bold;\n}\n\n.dd-handle {\n  display: block;\n  margin: 5px 0;\n  font-size: 10px;\n  padding: 6px 10px;\n  color: #333;\n  text-decoration: none;\n  border: 1px solid #e4e5e7;\n  background: #f7f9fa;\n  -webkit-border-radius: 3px;\n  border-radius: 3px;\n  cursor: pointer;\n  box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  font-family: \"MONTSERRAT\";\n  font-weight: 600;\n}\n.dd-item > button {\n  display: block;\n  position: relative;\n  cursor: pointer;\n  float: left;\n  width: 25px;\n  height: 25px;\n  margin: 5px 0;\n  padding: 0;\n  text-indent: 100%;\n  white-space: nowrap;\n  overflow: hidden;\n  border: 0;\n  background: transparent;\n  font-size: 12px;\n  line-height: 1;\n  text-align: center;\n  font-weight: bold;\n}\n\n.radioline {\n  display: contents;\n}\n.radioline1{\n  display: flex;\n}\n\n#app {\n  margin-left: 13px;\n}\n\n#tax_type_output {\n  margin-left: 13px;\n}\n\n#supplier_register_no {\n  margin-left: 13px;\n}\n\n#supplier_register_overseas {\n  margin-left: 13px;\n}\n\n#consumed_out {\n  margin-left: 13px;\n}\n#create_date{\n  margin-left: 13px;\n}\n\n.fa-times-circle {\n  color: red !important;\n}\n\n.fa-check-circle {\n  color: green !important;\n}\n\n.subUsers {\n  position: relative;\n}\n\n.supScript {\n  font-size: 10px;\n  line-height: 12px;\n  padding: 2px 5px;\n  position: absolute;\n  right: 9px;\n  top: -9px;\n  z-index: 1;\n}\n\n#diline {\n  display: inline;\n}\n\n.input-group span * {\n  text-transform: none;\n}\n\n.glyphicon {\n  position: relative;\n  top: 1px;\n  display: inline-block;\n  font-family: 'Glyphicons Halflings';\n  font-style: normal;\n  font-weight: normal;\n  line-height: 1;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n#totalcolor {\n  background-color: #A09D9D !important;\n}\n.restrictMsg {\n  color: #FF5015;\n  font-size: 22px;\n  font-weight: 500;\n  line-height: 35px;\n}\n.restrictMsg1 {\n\n  font-size: 18px;\n  font-weight: 400;\n  line-height: 35px;\n}\n\n.btn-group, .btn-group-vertical {\n  position: relative;\n  display: inline-block;\n  vertical-align: middle;\n}\n.btn-group > .btn:first-child:not(:last-child):not(.dropdown-toggle) {\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n}\n\n.btn-group .btn.btn-xs {\n  padding: 2px 7px;\n}\n.btn-group > .btn:first-child {\n  margin-left: 0;\n}\n.btn-group > .btn, .btn-group-vertical > .btn {\n  position: relative;\n  float: left;\n}\n.btn-xs {\n  border-radius: 3px!important;\n  font-size: 11px!important;\n  line-height: 1.5!important;\n  padding: 1px 7px!important;\n}\n\n.btn-xs:hover{\n    padding: 2px 7px !important;\n}\n\n.btn-default {\n  background-color: #fff!important;\n  border-color: #e4e5e7!important;\n  color: #6a6c6f!important;\n}\n.doubleScroll-scroll-wrapper {\n  width: auto!important;\n  /* height: 0px !important; */\n  overflow-x: auto !important;}\n\n  #scrollCont, .scrollCont, .scrollCont1, #scrollCont1 {\n    /* overflow-x: auto!important; */\n    overflow-x: auto !important;\n    border: 1px solid #ccc !important;}\n\n    .nav-tabs {\n      border-bottom: 1px solid #e4e5e7;\n  }\n\n  #tbl_tour td b {\n    border: 1px solid #6a6c6f !important;\n    border-radius: 0.4em;\n    padding: 3px 5px;\n    margin-left: 5px;\n    font-weight: normal;\n}\n\ninput[type=radio]{\n  accent-color:#15a215;\n  height: 16px;\n  width: 20px;\n}\ninput[type=checkbox]{\n  accent-color:#15a215;\n  height: 16px;\n  width: 20px;\n}\n.checkbox-info input[type=checkbox]{\n  accent-color:#3498db !important;\n  height: 16px;\n  width: 20px;\n}\n\n#services_note {\n  color: #197ef7 !important;\n  font-size: 13px !important;}\n\n\n  kbd {\n    padding: 2px 4px !important;\n    font-size: 12px !important;\n    color: #fff !important;\n    background-color: #333 !important;\n    border-radius: 3px !important;\n    -webkit-box-shadow: inset 0 -1px 0 rgba(0, 0, 0, .25) !important;\n    box-shadow: inset 0 -1px 0 rgba(0, 0, 0, .25) !important;\n}\n.btn-success {\n  background-color: #62cb31 !important;\n  border-color: #62cb31 !important;\n  color: #FFFFFF !important;\n}\n.btn-success:hover{\n  background-color: #74d348 !important;\n  border-color: #74d348 !important;\n  color: #FFFFFF !important;\n}\n\n.btn-danger {\n  background-color: #e74c3c !important;\n  border-color: #e74c3c !important;\n  color: #FFFFFF !important;\n}\n.btn-danger:hover {\n  background-color: #ea6557 !important;\n  border-color: #ea6557 !important;\n  color: #FFFFFF !important;\n}\n.btn-deactivate{\n  background-color:#dddddd !important;\n  border-color: #dddddd !important;\n  color: #767170!important;\n}\n.btn-deactivate:hover {\n  background-color:#dddddd !important;\n  border-color: #dddddd !important;\n  color: #333 !important;\n}\n\n.nav-tabs .nav-link.active {\nbackground-color:#FF5015 !important;\ncolor: white !important;\n}\n.nav-tabs .nav-link {\n  color:#888e9f !important;\n  font-size: 12px !important;\n  font-family: \"MONTSERRAT\";\n\n  }\n  \n.tab-content{\nborder-left:1px solid #ddcfcf;\nborder-bottom:1px solid #ddcfcf;\nborder-right:1px solid #ddcfcf;\npadding-left: 18px;\npadding-right: 18px;\npadding-top: 12px;\npadding-bottom: 10px;\nfont-family: \"MONTSERRAT\";\n\n}\nlabel a{\ncolor:#565759 !important;\ntext-decoration: none\n}\n\n.tblHeading td, h4.tblHeading, a.tblHeading {\n  background-color: rgba(216, 211, 211, 0.59);\n  color: #000;\n  font-size: 13px;\n  padding: 6px!important;\n  border: 2px solid #D0CFCF!important;\n}\n\n.bookingOps a{\n  border-right: 3px solid white !important;\n  font-size: 10px !important;\n}\n.bookingOps a:hover{\n  border-right: 3px solid white !important;\n\n}\n\ntr.tblHeading {\n  cursor: pointer;\n}\n.bookingTbl > tbody > tr > td {\n  font-size: 9pt !important;\n  text-transform: uppercase !important;\n  vertical-align: middle!important;\n  font-weight: normal!important;\n  font-family: \"roboto\" !important;\n  text-align: left !important;\n \n}\n.bookingTbl > tbody > tr:nth-of-type(odd) {\n  background-color: #e2dfdf;\n}\n.tdd_label {\n  display: inline-block;\n  padding: 5px;\n  font-size: 10px;\n  line-height: 1;\n  color: #fff !important;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: baseline;\n  border-radius: 0.25em;\n}1\n\n.siteLogo {\n  padding: 10px 25px;\n  border-bottom: 1px solid #ddd;\n  -webkit-box-shadow: 0 8px 6px -6px #DCDCDC;\n  -moz-box-shadow: 0 8px 6px -6px #DCDCDC;\n  box-shadow: 0 8px 6px -6px #DCDCDC;\n  margin-bottom: 10px;}\n  .room-fields {\n    border-top: 1px solid #efefef;\n    margin-top: 20px !important;\n}\n.hotel_name {\n  font-size: 16px;\n  font-weight: 600;}\n\n\n    .double-box {\n      background: #20B7CF;\n      height: auto;\n      min-height: 60px;\n      color: white;\n      font-size: 12px;\n      padding-top: 16px;\n      padding-left: 13px;\n      padding-bottom: 5px;\n  }\n  .tot-box {\n    height: 30px;\n    font-size: 16px;\n    border-bottom: 1px solid #dddcdc;\n    background: #efefef;\n    margin-left: -12px;\n    width: 650px !important;\n}\n.double-txt{\n  float: right;\n  margin-top: -57px;\n}\n.hotel_currncy {\n  font-weight: 100;\n  font-size: 16px;\n}\n\n.green-txt {\n  color: green;\n  font-size: 12px;\n  text-align: right;\n}\n\n.tooltip-inner {\n  font-size: 11px; /* Adjust this value to decrease or increase the font size */\n}\ninput{\n  font-size: 11px !important;\n  font-family: 'Montserrat' !important;\n}\nselect{\n  font-size: 11px !important;\n    font-family: 'Montserrat' !important;\n}\n\n.bootstrap-select .dropdown-menu li a span.text {\n  font-size: 11px;\n}\n\nul.mailbox-list {\n  list-style: none;\n  padding: 0;\n}\nul.mailbox-list li.active a {\n  /* background: #f7f9fa; */\n  border: 1px solid #e4e5e7;\n  font-weight: 600;\n  border-radius: 3px;\n}\nul.mailbox-list li a {\n  padding: 10px 15px;\n  display: block;\n}\n.pagination-sm >li >a{\n  font-size: 12px;\n}\n.note-icon-caret{\n  display: none;\n}\n.blue-box {\n  background: #34495e;\n  min-height: 55px;\n  display: table;\n  table-layout: fixed;\n  width: 100%;\n  padding: -1px 10px 15px 10px;\n}\n.lightBlue-box {\n  background: #3498DB;\n  min-height: 55px;\n  display: table;\n  table-layout: fixed;\n  width: 100%;\n}\n.blue-box1 {\n  background: #34495e;\n  min-height: 55px;\n  padding: 3px 10px 15px 10px;\n}\n.labelTitle2 {\n  padding: 5px 0px 0px 15px;\n  text-transform: uppercase;\n  font-family: Montserrat;\n  font-weight: 700;\n  font-size: 12px;\n  color: #ffffff;\n}\n.labelTitle3 {\n  padding: 17px 0px 0px 15px;\n  text-transform: uppercase;\n  font-family: Montserrat;\n  font-weight: 700;\n  font-size: 12px;\n  color: #ffffff;\n}\n.labelTitle1 {\n  padding: 17px 0px 0px 0px;\n  font-family: Montserrat;\n  font-weight: 400;\n  font-size: 12px;\n  color: #ffffff;\n}\n.labelTitle {\n  display: table-cell;\n  vertical-align: middle;\n  width: 208px;\n  height: 55px;\n  padding: 0px 0px 0px 15px;\n  position: relative;\n  text-transform: uppercase;\n  font-family: Montserrat;\n  font-weight: 700;\n  font-size: 12px;\n  color: #ffffff;\n}\n#triangle-down {\n  display: block!important;\n}\n\n@media print {\n\n#noprint{\n  display: none;\n}\n\n}\n\n\n@media only screen and (min-width:960px) {\n  #tdotext{\n    display: none;\n  }\n}\n\n  @media only screen and (max-width:960px) {\n    #firstNav{\n      display: none;\n    }\n    #drip{\n    float:none;\n    border-bottom: 1px solid #ddd;\n}\n    #navbarSupportedContent{\n      \n      padding: 21px 0px;\n      position: relative;\n      z-index: 1;\n    }\n    .boxview{\n      text-align: left;\n    }\n    .input-group-addon {\n      height: 31px;\n    }\n    #drip:hover #dripmenu {\n      display: contents;\n    }\n    .dropdown-menu>li:hover>.dropdown-submenu {\n      display:contents;\n    }\n    #secondNav{\n      padding-left: 10px;\n    }\n    .color-line{\n      display: none;\n    }\n    #searchbookingTable{\n      margin: 0 !important;\n      padding: 0 !important;\n    }\n  #accc,.actionlink1{\n    display: none;\n  }\n  #searchbookingTable{\n    width: 13   00px;\n  }\n}\n\n\n\n",
          }}
        />

        <style
          dangerouslySetInnerHTML={{
            __html:
              '\n        #sizing li a {\n            font-size: 12px;\n            color: #34495e;\n        }\n\n\n        .btn-primary {\n            background-color: #34495e;\n            border-color: #34495e;\n            color: #FFFFFF;\n            font-size: 13px;\n\n        }\n\n        .btn-primary:hover {\n            background-color: #3f5872 !important;\n            border-color: #3f5872 !important;\n            color: #FFFFFF !important;\n            outline: none !important;\n        }\n\n        .ng-hide {\n            display: none;\n        }\n\n        .h-bg-navy-blue {\n            background: #34495e;\n        }\n\n        .adddates {\n            background: #74D348;\n            color: white;\n        }\n\n        .adddates:hover {\n            background: #74D348;\n        }\n\n        .bootstrap-select.show-menu-arrow.open>.dropdown-toggle,\n        .bootstrap-select.show-menu-arrow.show>.dropdown-toggle {\n            z-index: 1;\n        }\n\n\n\n        th {\n            text-align: left !important;\n            width: 200px;\n            vertical-align: middle !important;\n            text-transform: uppercase;\n            font-size: 12px;\n\n        }\n\n        td {\n            background-color: #FFFFFF !important;\n        }\n\n        #voucherStartdatepicker {\n            background-color: white;\n        }\n\n        #voucherEndDatepicker {\n            background-color: white;\n        }\n\n\n\n\n        .breadcrumb {\n            font-weight: 500 !important;\n            font-size: 12px;\n            text-transform: uppercase;\n            list-style: none;\n            padding-left: 12px;\n\n        }\n\n\n\n\n\n        .breadcrumb li {\n            display: inline-block;\n            margin-bottom: .2em;\n        }\n\n        .breadcrumb li a {\n            background-color: #34495e;\n            box-sizing: border-box;\n            color: #fff;\n            display: block;\n            max-height: 2em;\n            padding: .5em 1em .5em 1.5em;\n            position: relative;\n            text-decoration: none;\n            transition: .25s;\n        }\n        input[type="text"]{\n            background-color: white !important;\n        }\n        .breadcrumb li.active a {\n            background-color: #62cb31;\n            box-sizing: border-box;\n            color: #fff;\n            display: block;\n            max-height: 2em;\n            padding: .5em 1em .5em 1.5em;\n            position: relative;\n            text-decoration: none;\n            transition: .25s;\n        }\n\n        .breadcrumb li.active a::after {\n            border-top: 1em solid transparent;\n            border-bottom: 1em solid transparent;\n            border-left: 1em solid #62cb31;\n            content: "";\n            position: absolute;\n            top: 0;\n            right: -1em;\n            transition: .25s;\n            z-index: 1;\n        }\n\n\n        .breadcrumb li a:before {\n            border-top: 1em solid transparent;\n            border-bottom: 1em solid transparent;\n            border-left: 1em solid #fff;\n            content: "";\n            position: absolute;\n            top: 0;\n            right: -1.25em;\n            z-index: 1;\n        }\n\n        .breadcrumb li a:after {\n            border-top: 1em solid transparent;\n            border-bottom: 1em solid transparent;\n            border-left: 1em solid #34495e;\n            content: "";\n            position: absolute;\n            top: 0;\n            right: -1em;\n            transition: .25s;\n            z-index: 1;\n        }\n\n        .breadcrumb li a:hover {\n            background-color: #3f5872;\n        }\n\n        .breadcrumb li.active a:hover {\n            background-color: #74d348;\n        }\n\n        .breadcrumb li.active a:hover:after {\n            border-left-color: #74d348;\n        }\n\n\n        .breadcrumb li a:hover:after {\n            border-left-color: #3f5872;\n        }\n\n        .stats h4,\n        h5,\n        h6 {\n            margin: 5px 0;\n        }\n\n        h5,\n        .h5 {\n            font-size: 14px;\n        }\n\n        h4,\n        .h4,\n        h5,\n        .h5,\n        h6,\n        .h6 {\n            margin-top: 10px;\n            margin-bottom: 10px;\n        }\n\n        h1,\n        h2,\n        h3,\n        h4,\n        h5,\n        h6,\n        .h1,\n        .h2,\n        .h3,\n        .h4,\n        .h5,\n        .h6 {\n            font-family: inherit;\n            font-weight: 500;\n            line-height: 1.1;\n            color: inherit;\n        }\n\n        .hpanel .alert {\n            margin-bottom: 0;\n            border-radius: 0;\n            border: 1px solid #e4e5e7 !important;\n            border-bottom: none;\n        }\n\n        .alert-danger {\n            color: #a94442 !important;\n            background-color: #f2dede !important;\n            border-color: #ebccd1 !important;\n        }\n\n        .alert {\n            padding: 15px;\n            margin-bottom: 20px;\n            border: 1px solid transparent;\n            border-radius: 4px;\n        }\n\n        .text-center {\n            text-align: center;\n        }\n\n        .rateUnik {\n            padding-right: 15px;\n            padding-left: 15px;\n            float: left;\n        }\n\n        .checkbox.checkbox-inline {\n            margin-top: 0;\n        }\n\n        .uniqhpanel .checkbox-inline {\n            margin-right: 10px;\n        }\n\n        .checkbox {\n            padding-left: 20px;\n        }\n\n        .radio-inline,\n        .checkbox-inline {\n            display: inline-block;\n            padding-left: 20px;\n            margin-bottom: 0;\n            font-weight: normal;\n            vertical-align: middle;\n            cursor: pointer;\n        }\n        .form-group label {\n    font-size: 13px!important;\n    font-family: "Roboto", Helvetica, Arial, sans-serif;\n    font-weight: 300;\n    color: #6e717f;\n}\n.label_week {\n    margin-top: 4px;\n    vertical-align: top;\n}\n.btn-group, .btn-group-vertical {\n    padding-bottom: 1px;\n}\n\n.gapMeTop {\n    margin-top: 6px;\n}\n    ',
          }}
        />
      </div>
    </>
  );
};
export default HotelInventoryAppSellPolicy;
