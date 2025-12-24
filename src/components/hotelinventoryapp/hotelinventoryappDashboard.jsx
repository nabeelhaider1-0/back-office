import React, { useEffect } from "react";
import logo from "../../assets/images/logo.png";
import userlogo from "../../assets/images/user.png";
import star from "../../assets/images/star.png";
import eye from "../../assets/images/eye.png";
import greendot from "../../assets/images/green_dot.png";
import greydot from "../../assets/images/grey_dot.png";
import money from "../../assets/images/moneyBundle.png";
import pie from "../../assets/images/pieChart.png";
import bedico from "../../assets/images/bedIco.png";
import calendarico from "../../assets/images/calenderIco.png";
import hotelico from "../../assets/images/hotelInfo.png";
import giftico from "../../assets/images/giftIco.png";
import graphico from "../../assets/images/graphIco.png";
import noteico from "../../assets/images/noteIco.png";
import bellico from "../../assets/images/bellIco.png";
import fileico from "../../assets/images/fileIco.png";
import { Link } from "react-router-dom";
import Constants from "../../constants/routes";

const HotelInventoryAppDashboard = ({ setShowHeaderAndMenuBar }) => {
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
                    DASHBOARD
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
            <div className="row" id="hotel_property">
              <div className="col-lg-6 col-md-12 col-sm-12">
                <div className="white-box-3">
                  <div className="blue-heading-box">
                    <div className="blue-heading-box-01">
                      <div className="labelTitle1 ng-binding">
                        hotel details for
                      </div>
                    </div>
                    <div
                      className="blue-heading-box-02"
                      style={{ paddingRight: "28px" }}
                    >
                      <span className="col-xs-12 col-sm-12 col-md-12">
                        <select
                          name="Search_hotel_rate_profile"
                          className="form-control selectpicker form-control-sm show-menu-arrow bs-select-hidden"
                          data-live-search="true"
                        >
                          <option value={0}>Select Rate Profile</option>
                          <option label="APAC" value={31}>
                            APAC
                          </option>
                          <option label="AFRICAN MARKET" value={67}>
                            AFRICAN MARKET
                          </option>
                          <option label="CIS- RUSSIA MARKET" value={68}>
                            CIS- RUSSIA MARKET
                          </option>
                          <option label="EUROPE MARKET" value={69}>
                            EUROPE MARKET
                          </option>
                          <option label="FAR EAST" value={70}>
                            FAR EAST
                          </option>
                          <option label="GCC- MARKET" value={71}>
                            GCC- MARKET
                          </option>
                          <option label="GCC-UAE&SA" value={72}>
                            GCC-UAE&amp;SA
                          </option>
                          <option label="SUB-C MARKET" value={73}>
                            SUB-C MARKET
                          </option>
                          <option label="USA MARKET" value={74}>
                            USA MARKET
                          </option>
                        </select>
                      </span>
                    </div>
                  </div>
                  <div
                    className="hotel-main-box propertyPic"
                    style={{ height: "302px" }}
                    data-ng-init="fn_load()"
                  >
                    <div className="row">
                      <div className="map-box pull-right marg_hack">
                        <Link
                          ng-show="supplier_rights.edit_hotel=='1'"
                          to="#property_edit/38216"
                          className="editlink ng-hide"
                        >
                          <button className="btn btn-default editbtn ng-binding">
                            EDIT ALL
                            <i className="fa fa-pencil-square-o 2x" />
                          </button>
                        </Link>
                      </div>
                    </div>
                    <div className="row">
                      <div className="blue-box-01">
                        <Link>
                          <div
                            style={{
                              backgroundImage:
                                'url("http://beta.tdonlines.com/project_folder/tdonline/uploads/hotel_images/upload/http://www3.hilton.com/resources/media/hi/BOMAPHI/en_US/img/shared/full_page_image_gallery/main/HL_wintergarden_19_675x359_FitToBoxSmallDimension_Center.jpg")',
                              height: "184px",
                              backgroundRepeat: "no-repeat",
                              backgroundSize: "cover",
                              backgroundPosition: "center bottom",
                            }}
                            onerror="this.src='images/imagenotavailable.jpg';"
                          />
                        </Link>
                        <input
                          type="hidden"
                          id="hotel_id"
                          defaultValue={38216}
                        />
                      </div>
                      <div className="blue-box-02">
                        <button
                          className="btn btn-sm btn-default ng-binding"
                          id="abc"
                        >
                          1234 TESTING - SINGAPORE
                        </button>
                        <div className="col-md-121">
                          <div className="star_rating">
                            {/* ngRepeat: dat in (products_page[0] | range) track by $index */}
                            <img
                              src={star}
                              width={10}
                              className="star_rating1 ng-scope"
                              alt="star"
                              ng-repeat="dat in (products_page[0] | range) track by $index"
                            />
                            {/* end ngRepeat: dat in (products_page[0] | range) track by $index */}
                            <img
                              src={star}
                              width={10}
                              className="star_rating1 ng-scope"
                              alt="star"
                              ng-repeat="dat in (products_page[0] | range) track by $index"
                            />
                            {/* end ngRepeat: dat in (products_page[0] | range) track by $index */}
                            <br />
                          </div>
                          <div className="address_details">
                            <span className="address_edit">
                              <p
                                editable-text="xAddress"
                                onbeforesave="updateupdateData($data,xId,'address')"
                                className="ng-scope ng-binding editable editable-click editable-empty"
                              />
                            </span>
                            <p>
                              <span ng-show="xPhone" className="ng-hide">
                                <i className="fa fa-phone" />
                                &nbsp;&nbsp;
                                <span
                                  editable-tel="xPhone"
                                  onbeforesave="updateupdateData($data,xId,'phone')"
                                  className="ng-scope ng-binding editable editable-click editable-empty"
                                />
                              </span>
                              <span ng-show="xFax" className="ng-hide">
                                |&nbsp;&nbsp;
                                <i className="fa fa-fax" />
                                &nbsp;&nbsp;
                                <span
                                  editable-text="xFax"
                                  onbeforesave="updateupdateData($data,xId,'fax')"
                                  className="ng-scope ng-binding editable editable-click editable-empty"
                                />
                                &nbsp;&nbsp;
                              </span>
                              <span ng-show="xEmail" className="ng-hide">
                                |&nbsp;&nbsp;
                                <i className="fa fa-envelope" />
                                &nbsp;&nbsp;
                                <span
                                  editable-email="xEmail"
                                  onbeforesave="updateupdateData($data,xId,'email')"
                                  className="ng-scope ng-binding editable editable-click editable-empty"
                                />
                              </span>
                            </p>
                          </div>
                          <div className="tab1Font">
                            <span
                              editable-textarea="xShort_desc"
                              onbeforesave="updateupdateData($data,xId,'short_desc')"
                              className="ng-scope ng-binding editable editable-click editable-empty"
                            ></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="white-box-3">
                  <div className="blue-box headTitle">
                    <span className="labelTitle ng-binding">
                      hotel views &amp; bookings
                    </span>
                    <span className="labelImg imgWid">
                      <img src={eye} alt="ankh" />
                    </span>
                  </div>
                  <div className="hotel-main-box">
                    <div className="row">
                      <div className="col-md-4 amnt text text-success ng-binding">
                        0
                      </div>
                      <div className="col-md-8 text-right well well-sm">
                        <span className="ng-binding">
                          <img src={greydot} alt="grey" />
                          Bookings
                        </span>
                        &nbsp;&nbsp;&nbsp;
                        <span className="ng-binding">
                          <img src={greendot} alt="green" /> Views
                        </span>
                      </div>
                      <div className="col-md-12">
                        <div className="row">
                          <canvas
                            id="barOptions"
                            className="col-md-12"
                            height={203}
                            width={525}
                            style={{ width: "420px", height: "163px" }}
                          />
                        </div>
                        <div className="row">
                          <div
                            className="col-md-12"
                            style={{ display: "flex" }}
                          >
                            {/* ngRepeat: x in propertyview.propertyCount */}
                            <span
                              className="col-md-4 ng-scope"
                              ng-repeat="x in propertyview.propertyCount"
                            >
                              <small className="stat-label ng-binding">
                                Today
                              </small>
                              <br />
                              <span className="boldMe ng-binding">
                                <img src={greendot} alt="cri" />0
                              </span>
                              {/* ngIf: x.b_data == x.s_data */}
                              <span
                                ng-if="x.b_data == x.s_data"
                                className="ng-scope"
                              />
                              {/* end ngIf: x.b_data == x.s_data */}
                              {/* ngIf: x.s_data > x.b_data */}
                              {/* ngIf: x.s_data < x.b_data */}
                              <br />
                              <span className="boldMe ng-binding">
                                <img src={greydot} alt="grey" />0
                              </span>
                            </span>
                            {/* end ngRepeat: x in propertyview.propertyCount */}
                            <span
                              className="col-md-4 ng-scope"
                              ng-repeat="x in propertyview.propertyCount"
                            >
                              <small className="stat-label ng-binding">
                                Last Week
                              </small>
                              <br />
                              <span className="boldMe ng-binding">
                                <img src={greendot} alt="green" />0
                              </span>
                              {/* ngIf: x.b_data == x.s_data */}
                              <span
                                ng-if="x.b_data == x.s_data"
                                className="ng-scope"
                              />
                              {/* end ngIf: x.b_data == x.s_data */}
                              {/* ngIf: x.s_data > x.b_data */}
                              {/* ngIf: x.s_data < x.b_data */}
                              <br />
                              <span className="boldMe ng-binding">
                                <img src={greydot} alt="grey" />0
                              </span>
                            </span>
                            {/* end ngRepeat: x in propertyview.propertyCount */}
                            <span
                              className="col-md-4 ng-scope"
                              ng-repeat="x in propertyview.propertyCount"
                            >
                              <small className="stat-label ng-binding">
                                Last Month
                              </small>
                              <br />
                              <span className="boldMe ng-binding">
                                <img src={greendot} alt="green" />0
                              </span>
                              {/* ngIf: x.b_data == x.s_data */}
                              <span
                                ng-if="x.b_data == x.s_data"
                                className="ng-scope"
                              />
                              {/* end ngIf: x.b_data == x.s_data */}
                              {/* ngIf: x.s_data > x.b_data */}
                              {/* ngIf: x.s_data < x.b_data */}
                              <br />
                              <span className="boldMe ng-binding">
                                <img src={greydot} alt="grey" />0
                              </span>
                            </span>
                            {/* end ngRepeat: x in propertyview.propertyCount */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="white-box-3">
                  <div className="blue-box headTitle">
                    <span className="labelTitle ng-binding">
                      payment status
                    </span>
                    <span className="labelImg imgWid">
                      <img src={money} alt="cri" />
                    </span>
                  </div>
                  <div className="hotel-main-box">
                    <div className="row">
                      <div className="col-xs-12 text-right well well-sm">
                        <span className="ng-binding">
                          <img src={greydot} alt="grey" /> Full Payment
                        </span>
                        &nbsp;&nbsp;&nbsp;
                        <span className="ng-binding">
                          <img src={greendot} alt="green" /> Partial Payment
                        </span>
                      </div>
                      <div className="col-md-12">
                        <div className="row">
                          <canvas
                            id="lineOptions"
                            className="col-md-12"
                            height={191}
                            width={420}
                            style={{ width: "336px", height: "153px" }}
                          />
                        </div>
                        &nbsp;
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="clearfix visible-lg-block visible-md-block" />
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="white-box-3">
                  <div className="blue-box headTitle">
                    <span className="labelTitle ng-binding">
                      booking status
                    </span>
                    <span className="labelImg imgWid">
                      <img src={pie} alt="cri" />
                    </span>
                  </div>
                  <div className="hotel-main-box">
                    <div className="row martop">
                      <div className="booking-status-box-01 Mobile01">
                        <canvas
                          id="donut"
                          height={312}
                          className="donut_chart"
                          width={468}
                          style={{ width: "375px", height: "250px" }}
                        />
                      </div>
                      <div className="booking-status-box-02 Mobile02">
                        <div id="js-legend" className="chart-legend">
                          <ul className="doughnut-legend">
                            <li>
                              <span style={{ backgroundColor: "#FFB605" }} />
                              CANCELLED
                            </li>
                            <li>
                              <span style={{ backgroundColor: "#64CD35" }} />
                              CONFIRMED
                            </li>
                            <li>
                              <span style={{ backgroundColor: "#3299D4" }} />
                              ON REQUEST
                            </li>
                            <li>
                              <span style={{ backgroundColor: "#E64A3B" }} />
                              REJECTED
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="panel-footer text-right">&nbsp;</div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6">
                <div className="white-box-3" id="Arrivalbox">
                  <div className="cities-green headTitle">
                    <div className="arrivals-box-01">
                      <span className="labelTitle arr_wdt ng-binding">
                        arrivals
                      </span>
                    </div>
                    <div className="arrivals-box-02">
                      <div className="arrivals-box-02-11 label_wh_grn ng-binding">
                        0
                      </div>
                      <div className="arrivals-box-02-12 label_grn_wh ng-binding">
                        Total Arrivals
                      </div>
                      <div className="arrivals-box-02-13">
                        <img src={bedico} alt="cri" />
                      </div>
                    </div>
                  </div>
                  <div
                    className="hotel-main-box"
                    style={{ paddingBottom: "122px" }}
                  >
                    <div className="row">
                      <div className="col-md-12 col-sm-12">
                        <div
                          active="activearrival"
                          justified="true"
                          className="ng-isolate-scope"
                        >
                          <ul
                            className="nav nav-tabs nav-justified"
                            ng-class="{'nav-stacked': vertical, 'nav-justified': justified}"
                            ng-transclude
                          >
                            <li
                              ng-class="[{active: active, disabled: disabled}, classes]"
                              className="uib-tab nav-item ng-scope ng-isolate-scope active"
                              index={0}
                              heading="Today's Arrivals"
                              ng-click="show_today(Arrival_today)"
                            >
                              <Link
                                to
                                ng-click="select($event)"
                                className="nav-link ng-binding"
                                uib-tab-heading-transclude
                              >
                                Today's Arrivals
                              </Link>
                            </li>
                            <li
                              ng-class="[{active: active, disabled: disabled}, classes]"
                              className="uib-tab nav-item ng-scope ng-isolate-scope"
                              index={1}
                              heading="Yesterday's Arrivals"
                              ng-click="show_yesterday(Arrival_yesterday)"
                            >
                              <Link
                                to
                                ng-click="select($event)"
                                className="nav-link ng-binding"
                                uib-tab-heading-transclude
                              >
                                Yesterday's Arrivals
                              </Link>
                            </li>
                            <li
                              ng-class="[{active: active, disabled: disabled}, classes]"
                              className="uib-tab nav-item ng-scope ng-isolate-scope"
                              index={2}
                              heading="Tomorrow's Arrivals"
                              ng-click="show_tommorrow(Arrival_tommorrow)"
                            >
                              <Link
                                to
                                ng-click="select($event)"
                                className="nav-link ng-binding"
                                uib-tab-heading-transclude
                              >
                                Tomorrow's Arrivals
                              </Link>
                            </li>
                          </ul>
                          <div className="tab-content">
                            {/* ngRepeat: tab in tabset.tabs */}
                            <div
                              className="tab-pane ng-scope active"
                              ng-repeat="tab in tabset.tabs"
                              ng-class="{active: tabset.active === tab.index}"
                              uib-tab-content-transclude="tab"
                            >
                              <table className="table table-responsive   ng-scope">
                                <tbody ng-init="limit=4">
                                  {/* ngRepeat: x in Arrival_today  | limitTo:limit */}
                                </tbody>
                              </table>
                              <div
                                className="text-center ng-scope"
                                ng-show="!Arrival_today"
                              >
                                <h4 className="ng-binding">
                                  No Arrivals For Today
                                </h4>
                              </div>
                            </div>
                            {/* end ngRepeat: tab in tabset.tabs */}
                            <div
                              className="tab-pane ng-scope"
                              ng-repeat="tab in tabset.tabs"
                              ng-class="{active: tabset.active === tab.index}"
                              uib-tab-content-transclude="tab"
                            >
                              <table className="table table-responsive   ng-scope">
                                <tbody ng-init="limit=4">
                                  {/* ngRepeat: x in Arrival_yesterday | limitTo:limit */}
                                </tbody>
                              </table>
                              <div
                                className="text-center ng-scope"
                                ng-show="!Arrival_yesterday"
                              >
                                <h4 className="ng-binding">
                                  No Arrivals For Yesterday
                                </h4>
                              </div>
                            </div>
                            {/* end ngRepeat: tab in tabset.tabs */}
                            <div
                              className="tab-pane ng-scope"
                              ng-repeat="tab in tabset.tabs"
                              ng-class="{active: tabset.active === tab.index}"
                              uib-tab-content-transclude="tab"
                            >
                              <table className="table table-responsive   ng-scope">
                                <tbody ng-init="limit=4">
                                  {/* ngRepeat: x in Arrival_tommorrow | limitTo:limit */}
                                </tbody>
                              </table>
                              <div
                                className="text-center ng-scope"
                                ng-show="!Arrival_tommorrow"
                              >
                                <h4 className="ng-binding">
                                  No Arrivals For Tommorrow
                                </h4>
                              </div>
                            </div>
                            {/* end ngRepeat: tab in tabset.tabs */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="panel-footer text-right">
                    <Link
                      to="#arrival"
                      className="text text-info ng-binding ng-hide"
                      ng-show="Arrival_tommorrow || Arrival_yesterday || Arrival_today"
                      ng-click="show_arrivals_id()"
                    >
                      View All Arrivals
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="white-box-3" id="Expirebox">
                  <div className="expiring-box headTitle">
                    <span className="labelTitle ng-binding">
                      expiring rates
                    </span>
                    <span className="labelImg imgWid">
                      <img src={calendarico} alt="cri" />
                    </span>
                  </div>
                  <div
                    className="hotel-main-box"
                    style={{ paddingBottom: "152px" }}
                  >
                    <div className="row">
                      <div className="col-md-12">
                        <div
                          active="activeexpire"
                          justified="true"
                          className="ng-isolate-scope"
                        >
                          <ul
                            className="nav nav-tabs nav-justified"
                            ng-class="{'nav-stacked': vertical, 'nav-justified': justified}"
                            ng-transclude
                          >
                            <li
                              ng-class="[{active: active, disabled: disabled}, classes]"
                              className="uib-tab nav-item ng-scope ng-isolate-scope active"
                              index={0}
                              heading="Today"
                            >
                              <Link
                                to
                                ng-click="select($event)"
                                className="nav-link ng-binding"
                                uib-tab-heading-transclude
                              >
                                Today
                              </Link>
                            </li>
                            <li
                              ng-class="[{active: active, disabled: disabled}, classes]"
                              className="uib-tab nav-item ng-scope ng-isolate-scope"
                              index={1}
                              heading="1 Months"
                            >
                              <Link
                                to
                                ng-click="select($event)"
                                className="nav-link ng-binding"
                                uib-tab-heading-transclude
                              >
                                1 Months
                              </Link>
                            </li>
                            <li
                              ng-class="[{active: active, disabled: disabled}, classes]"
                              className="uib-tab nav-item ng-scope ng-isolate-scope"
                              index={2}
                              heading="3 Months"
                            >
                              <Link
                                to
                                ng-click="select($event)"
                                className="nav-link ng-binding"
                                uib-tab-heading-transclude
                              >
                                3 Months
                              </Link>
                            </li>
                            <li
                              ng-class="[{active: active, disabled: disabled}, classes]"
                              className="uib-tab nav-item ng-scope ng-isolate-scope"
                              index={3}
                              heading="6 Months"
                            >
                              <Link
                                to
                                ng-click="select($event)"
                                className="nav-link ng-binding"
                                uib-tab-heading-transclude
                              >
                                6 Months
                              </Link>
                            </li>
                            <li
                              ng-class="[{active: active, disabled: disabled}, classes]"
                              className="uib-tab nav-item ng-scope ng-isolate-scope"
                              index={4}
                              heading="1 Year"
                            >
                              <Link
                                to
                                ng-click="select($event)"
                                className="nav-link ng-binding"
                                uib-tab-heading-transclude
                              >
                                1 Year
                              </Link>
                            </li>
                          </ul>
                          <div className="tab-content">
                            {/* ngRepeat: tab in tabset.tabs */}
                            <div
                              className="tab-pane ng-scope active"
                              ng-repeat="tab in tabset.tabs"
                              ng-class="{active: tabset.active === tab.index}"
                              uib-tab-content-transclude="tab"
                            >
                              <table
                                id="step1"
                                className="table table-responsive   ng-scope"
                              >
                                <tbody className="bg-white">
                                  {/* ngRepeat: x in expiringRatesDetails.todayExpiring | limitTo:3 */}
                                </tbody>
                              </table>
                              <div
                                className="text-center ng-scope ng-hide"
                                ng-show="!expiringRatesDetails.todayExpiring"
                              >
                                <h4 className="ng-binding">
                                  No Records Available
                                </h4>
                              </div>
                            </div>
                            {/* end ngRepeat: tab in tabset.tabs */}
                            <div
                              className="tab-pane ng-scope"
                              ng-repeat="tab in tabset.tabs"
                              ng-class="{active: tabset.active === tab.index}"
                              uib-tab-content-transclude="tab"
                            >
                              <table
                                id="step2"
                                className="table table-responsive   ng-scope"
                              >
                                <tbody className="bg-white">
                                  {/* ngRepeat: x in expiringRatesDetails.oneMonthExpiring | limitTo:3 */}
                                </tbody>
                              </table>
                              <div
                                className="text-center ng-scope ng-hide"
                                ng-show="!expiringRatesDetails.oneMonthExpiring"
                              >
                                <h4 className="ng-binding">
                                  No Records Available
                                </h4>
                              </div>
                            </div>
                            {/* end ngRepeat: tab in tabset.tabs */}
                            <div
                              className="tab-pane ng-scope"
                              ng-repeat="tab in tabset.tabs"
                              ng-class="{active: tabset.active === tab.index}"
                              uib-tab-content-transclude="tab"
                            >
                              <table
                                id="step3"
                                className="table table-responsive   ng-scope"
                              >
                                <tbody className="bg-white">
                                  {/* ngRepeat: x in expiringRatesDetails.threeMonthExpiring | limitTo:3 */}
                                </tbody>
                              </table>
                              <div
                                className="text-center ng-scope ng-hide"
                                ng-show="!expiringRatesDetails.threeMonthExpiring"
                              >
                                <h4 className="ng-binding">
                                  No Records Available
                                </h4>
                              </div>
                            </div>
                            {/* end ngRepeat: tab in tabset.tabs */}
                            <div
                              className="tab-pane ng-scope"
                              ng-repeat="tab in tabset.tabs"
                              ng-class="{active: tabset.active === tab.index}"
                              uib-tab-content-transclude="tab"
                            >
                              <table
                                id="step4"
                                className="table table-responsive   ng-scope"
                              >
                                <tbody className="bg-white">
                                  {/* ngRepeat: x in expiringRatesDetails.sixMonthExpiring | limitTo:3 */}
                                </tbody>
                              </table>
                              <div
                                className="text-center ng-scope ng-hide"
                                ng-show="!expiringRatesDetails.sixMonthExpiring"
                              >
                                <h4 className="ng-binding">
                                  No Records Available
                                </h4>
                              </div>
                            </div>
                            {/* end ngRepeat: tab in tabset.tabs */}
                            <div
                              className="tab-pane ng-scope"
                              ng-repeat="tab in tabset.tabs"
                              ng-class="{active: tabset.active === tab.index}"
                              uib-tab-content-transclude="tab"
                            >
                              <table
                                id="step5"
                                className="table table-responsive   ng-scope"
                              >
                                <tbody className="bg-white">
                                  {/* ngRepeat: x in expiringRatesDetails.oneYearExpiring | limitTo:3 */}
                                </tbody>
                              </table>
                              <div
                                className="text-center ng-scope ng-hide"
                                ng-show="!expiringRatesDetails.oneYearExpiring"
                              >
                                <h4 className="ng-binding">
                                  No Records Available
                                </h4>
                              </div>
                            </div>
                            {/* end ngRepeat: tab in tabset.tabs */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="panel-footer text-right">
                    <Link className="text text-info ng-binding" to="#expiring">
                      View All Expiring Rates
                    </Link>
                  </div>
                </div>
              </div>
              <div className="clearfix visible-lg-block" />
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="white-box-3">
                  <div className="blue-box headTitle">
                    <span className="labelTitle ng-binding">
                      hotel information
                    </span>
                    <span className="labelImg imgWid">
                      <img src={hotelico} alt="cri" />
                    </span>
                  </div>
                  <div className="hotel-main-box">
                    <div className="row">
                      <div className="col-md-12 col-sm-6">
                        <div className=" headTitle">
                          <span className="ng-binding">
                            1234 Testing - Singapore
                          </span>
                        </div>
                        <span className="percnt ng-binding">
                          37.5%&nbsp;
                          <span className="complt ng-binding">COMPLETE</span>
                        </span>
                      </div>
                      <div className="col-md-12 col-sm-6">
                        {/* ngRepeat: (key,value) in xCompletionDetails */}
                        <div
                          className="checkbox checkbox-circle checkbox-inline font_style ng-scope"
                          ng-repeat="(key,value) in xCompletionDetails"
                        >
                          <input
                            type="checkbox"
                            ng-model="checkbox"
                            ng-true-value={1}
                            ng-false-value={0}
                            ng-checked="value == 1"
                            disabled
                            className="ng-pristine ng-untouched ng-valid ng-empty"
                            defaultChecked="checked"
                          />
                          <label htmlFor="checkbox1" className="ng-binding">
                            &nbsp;Name
                          </label>
                        </div>
                        {/* end ngRepeat: (key,value) in xCompletionDetails */}
                        <div
                          className="checkbox checkbox-circle checkbox-inline font_style ng-scope"
                          ng-repeat="(key,value) in xCompletionDetails"
                        >
                          <input
                            type="checkbox"
                            ng-model="checkbox"
                            ng-true-value={1}
                            ng-false-value={0}
                            ng-checked="value == 1"
                            disabled
                            className="ng-pristine ng-untouched ng-valid ng-empty"
                          />
                          <label htmlFor="checkbox1" className="ng-binding">
                            &nbsp;Address
                          </label>
                        </div>
                        {/* end ngRepeat: (key,value) in xCompletionDetails */}
                        <div
                          className="checkbox checkbox-circle checkbox-inline font_style ng-scope"
                          ng-repeat="(key,value) in xCompletionDetails"
                        >
                          <input
                            type="checkbox"
                            ng-model="checkbox"
                            ng-true-value={1}
                            ng-false-value={0}
                            ng-checked="value == 1"
                            disabled
                            className="ng-pristine ng-untouched ng-valid ng-empty"
                          />
                          <label htmlFor="checkbox1" className="ng-binding">
                            &nbsp;Description
                          </label>
                        </div>
                        {/* end ngRepeat: (key,value) in xCompletionDetails */}
                        <div
                          className="checkbox checkbox-circle checkbox-inline font_style ng-scope"
                          ng-repeat="(key,value) in xCompletionDetails"
                        >
                          <input
                            type="checkbox"
                            ng-model="checkbox"
                            ng-true-value={1}
                            ng-false-value={0}
                            ng-checked="value == 1"
                            disabled
                            className="ng-pristine ng-untouched ng-valid ng-empty"
                          />
                          <label htmlFor="checkbox1" className="ng-binding">
                            &nbsp;Phone
                          </label>
                        </div>
                        {/* end ngRepeat: (key,value) in xCompletionDetails */}
                        <div
                          className="checkbox checkbox-circle checkbox-inline font_style ng-scope"
                          ng-repeat="(key,value) in xCompletionDetails"
                        >
                          <input
                            type="checkbox"
                            ng-model="checkbox"
                            ng-true-value={1}
                            ng-false-value={0}
                            ng-checked="value == 1"
                            disabled
                            className="ng-pristine ng-untouched ng-valid ng-empty"
                            defaultChecked="checked"
                          />
                          <label htmlFor="checkbox1" className="ng-binding">
                            &nbsp;Image
                          </label>
                        </div>
                        {/* end ngRepeat: (key,value) in xCompletionDetails */}
                        <div
                          className="checkbox checkbox-circle checkbox-inline font_style ng-scope"
                          ng-repeat="(key,value) in xCompletionDetails"
                        >
                          <input
                            type="checkbox"
                            ng-model="checkbox"
                            ng-true-value={1}
                            ng-false-value={0}
                            ng-checked="value == 1"
                            disabled
                            className="ng-pristine ng-untouched ng-valid ng-empty"
                          />
                          <label htmlFor="checkbox1" className="ng-binding">
                            &nbsp;Hotel Amenities
                          </label>
                        </div>
                        {/* end ngRepeat: (key,value) in xCompletionDetails */}
                        <div
                          className="checkbox checkbox-circle checkbox-inline font_style ng-scope"
                          ng-repeat="(key,value) in xCompletionDetails"
                        >
                          <input
                            type="checkbox"
                            ng-model="checkbox"
                            ng-true-value={1}
                            ng-false-value={0}
                            ng-checked="value == 1"
                            disabled
                            className="ng-pristine ng-untouched ng-valid ng-empty"
                            defaultChecked="checked"
                          />
                          <label htmlFor="checkbox1" className="ng-binding">
                            &nbsp;Location
                          </label>
                        </div>
                        {/* end ngRepeat: (key,value) in xCompletionDetails */}
                        <div
                          className="checkbox checkbox-circle checkbox-inline font_style ng-scope"
                          ng-repeat="(key,value) in xCompletionDetails"
                        >
                          <input
                            type="checkbox"
                            ng-model="checkbox"
                            ng-true-value={1}
                            ng-false-value={0}
                            ng-checked="value == 1"
                            disabled
                            className="ng-pristine ng-untouched ng-valid ng-empty"
                          />
                          <label htmlFor="checkbox1" className="ng-binding">
                            &nbsp;Room Details
                          </label>
                        </div>
                        {/* end ngRepeat: (key,value) in xCompletionDetails */}
                        <br />
                        <div className="col-md-12 mobile_no_paddiing">
                          <span className="corPanel period ng-binding">
                            <span className="label label-info">
                              &nbsp;&nbsp;Tip&nbsp;&nbsp;
                            </span>{" "}
                            Hotels with complete details get more bookings.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="panel-footer text-right">
                    <Link to="#" className="text text-info">
                      &nbsp;
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="white-box-3" id="offerbox">
                  <div className="blue-box headTitle">
                    <span className="labelTitle ng-binding">
                      offer and deals
                    </span>
                    <span className="labelImg imgWid">
                      <img src={giftico} alt="cri" />
                    </span>
                  </div>
                  <div
                    className="hotel-main-box class_height"
                    style={{ paddingBottom: "106px" }}
                  >
                    <div className="row">
                      <div className="col-md-12">
                        <div
                          active="activeoffer"
                          justified="true"
                          className="ng-isolate-scope"
                        >
                          <ul
                            className="nav nav-tabs nav-justified"
                            ng-class="{'nav-stacked': vertical, 'nav-justified': justified}"
                            ng-transclude
                          >
                            <li
                              ng-class="[{active: active, disabled: disabled}, classes]"
                              className="uib-tab nav-item ng-scope ng-isolate-scope active"
                              index={0}
                              heading="Recent Promotions"
                            >
                              <Link
                                to
                                ng-click="select($event)"
                                className="nav-link ng-binding"
                                uib-tab-heading-transclude
                              >
                                Recent Promotions
                              </Link>
                            </li>
                            <li
                              ng-class="[{active: active, disabled: disabled}, classes]"
                              className="uib-tab nav-item ng-scope ng-isolate-scope"
                              index={1}
                              heading="Expiring Promotions"
                            >
                              <Link
                                to
                                ng-click="select($event)"
                                className="nav-link ng-binding"
                                uib-tab-heading-transclude
                              >
                                Expiring Promotions
                              </Link>
                            </li>
                          </ul>
                          <div className="tab-content">
                            {/* ngRepeat: tab in tabset.tabs */}
                            <div
                              className="tab-pane ng-scope active"
                              ng-repeat="tab in tabset.tabs"
                              ng-class="{active: tabset.active === tab.index}"
                              uib-tab-content-transclude="tab"
                            >
                              <table
                                id="step411"
                                className="tab-pane active table table-responsive   ng-scope"
                              >
                                <tbody className="bg-white">
                                  {/* ngRepeat: (key,value) in offer_deal_RecentDetails | limitTo:2 */}
                                </tbody>
                              </table>
                            </div>
                            {/* end ngRepeat: tab in tabset.tabs */}
                            <div
                              className="tab-pane ng-scope"
                              ng-repeat="tab in tabset.tabs"
                              ng-class="{active: tabset.active === tab.index}"
                              uib-tab-content-transclude="tab"
                            >
                              <table
                                id="step412"
                                className="tab-pane table table-responsive   ng-scope"
                              >
                                <tbody className="bg-white">
                                  {/* ngRepeat: (key,value) in offer_deal_ExpDetails | limitTo:2 */}
                                </tbody>
                              </table>
                            </div>
                            {/* end ngRepeat: tab in tabset.tabs */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 period">
                        <h5 className="fontGreenPn">Add Promotions</h5>
                        <div className="form-group pull-left">
                          <Link to="#addoffer">
                            <button
                              type="button"
                              className="btn btn-sm btn-outline btn-primary ng-binding"
                            >
                              CREATE A DEAL
                            </button>
                          </Link>
                        </div>
                        <div className="form-group  pull-right">
                          <Link to="#viewoffer">
                            <button
                              type="button"
                              className="btn btn-sm btn-outline btn-info ng-binding"
                            >
                              MANAGE OFFERS
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="panel-footer text-right">
                    <Link className="text text-info ng-binding" to="#viewoffer">
                      View All Offers
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="white-box-3" id="yeildbox">
                  <div className="blue-box headTitle">
                    <span className="labelTitle ng-binding">yield</span>
                    <span className="labelImg imgWid">
                      <img src={graphico} alt="cri" />
                    </span>
                  </div>
                  <div
                    className="hotel-main-box"
                    style={{ paddingBottom: "100px" }}
                  >
                    <div className="row">
                      <div className="col-md-12">
                        <div
                          active="activeyield"
                          justified="true"
                          className="ng-isolate-scope"
                        >
                          <ul
                            className="nav nav-tabs nav-justified"
                            ng-class="{'nav-stacked': vertical, 'nav-justified': justified}"
                            ng-transclude
                          >
                            {/* ngRepeat: x in Yield */}
                            <li
                              ng-class="[{active: active, disabled: disabled}, classes]"
                              className="uib-tab nav-item ng-scope ng-isolate-scope active"
                              index="$index+1"
                              heading="Today"
                              ng-repeat="x in Yield"
                            >
                              <Link
                                to
                                ng-click="select($event)"
                                className="nav-link ng-binding"
                                uib-tab-heading-transclude
                              >
                                Today
                              </Link>
                            </li>
                            {/* end ngRepeat: x in Yield */}
                            <li
                              ng-class="[{active: active, disabled: disabled}, classes]"
                              className="uib-tab nav-item ng-scope ng-isolate-scope"
                              index="$index+1"
                              heading="1 Months"
                              ng-repeat="x in Yield"
                            >
                              <Link
                                to
                                ng-click="select($event)"
                                className="nav-link ng-binding"
                                uib-tab-heading-transclude
                              >
                                1 Months
                              </Link>
                            </li>
                            {/* end ngRepeat: x in Yield */}
                            <li
                              ng-class="[{active: active, disabled: disabled}, classes]"
                              className="uib-tab nav-item ng-scope ng-isolate-scope"
                              index="$index+1"
                              heading="3 Months"
                              ng-repeat="x in Yield"
                            >
                              <Link
                                to
                                ng-click="select($event)"
                                className="nav-link ng-binding"
                                uib-tab-heading-transclude
                              >
                                3 Months
                              </Link>
                            </li>
                            {/* end ngRepeat: x in Yield */}
                            <li
                              ng-class="[{active: active, disabled: disabled}, classes]"
                              className="uib-tab nav-item ng-scope ng-isolate-scope"
                              index="$index+1"
                              heading="6 Months"
                              ng-repeat="x in Yield"
                            >
                              <Link
                                to
                                ng-click="select($event)"
                                className="nav-link ng-binding"
                                uib-tab-heading-transclude
                              >
                                6 Months
                              </Link>
                            </li>
                            {/* end ngRepeat: x in Yield */}
                            <li
                              ng-class="[{active: active, disabled: disabled}, classes]"
                              className="uib-tab nav-item ng-scope ng-isolate-scope"
                              index="$index+1"
                              heading="1 Year"
                              ng-repeat="x in Yield"
                            >
                              <Link
                                to
                                ng-click="select($event)"
                                className="nav-link ng-binding"
                                uib-tab-heading-transclude
                              >
                                1 Year
                              </Link>
                            </li>
                            {/* end ngRepeat: x in Yield */}
                          </ul>
                          <div className="tab-content">
                            {/* ngRepeat: tab in tabset.tabs */}
                            <div
                              className="tab-pane ng-scope active"
                              ng-repeat="tab in tabset.tabs"
                              ng-class="{active: tabset.active === tab.index}"
                              uib-tab-content-transclude="tab"
                            >
                              <div className="panel-body1 table-responsive ng-scope">
                                {/* ngRepeat: (key,value) in x.data */}
                                <div className="col-md-12 col-sm-6 col-xs-12 gapMe">
                                  <div className=" panel-body1 table-responsive">
                                    <table className="table table-responsive ">
                                      <thead>
                                        <tr>
                                          <th width className="heading_tiltle">
                                            Highest Selling Hotels
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody className="bg-white">
                                        {/* ngRepeat: (key,value) in x.data | limitTo:3 */}
                                        <tr ng-show="x.data.length <= 0">
                                          <td>
                                            <h5>No Hotels.</h5>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* end ngRepeat: tab in tabset.tabs */}
                            <div
                              className="tab-pane ng-scope"
                              ng-repeat="tab in tabset.tabs"
                              ng-class="{active: tabset.active === tab.index}"
                              uib-tab-content-transclude="tab"
                            >
                              <div className="panel-body1 table-responsive ng-scope">
                                {/* ngRepeat: (key,value) in x.data */}
                                <div className="col-md-12 col-sm-6 col-xs-12 gapMe">
                                  <div className=" panel-body1 table-responsive">
                                    <table className="table table-responsive ">
                                      <thead>
                                        <tr>
                                          <th width className="heading_tiltle">
                                            Highest Selling Hotels
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody className="bg-white">
                                        {/* ngRepeat: (key,value) in x.data | limitTo:3 */}
                                        <tr ng-show="x.data.length <= 0">
                                          <td>
                                            <h5>No Hotels.</h5>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* end ngRepeat: tab in tabset.tabs */}
                            <div
                              className="tab-pane ng-scope"
                              ng-repeat="tab in tabset.tabs"
                              ng-class="{active: tabset.active === tab.index}"
                              uib-tab-content-transclude="tab"
                            >
                              <div className="panel-body1 table-responsive ng-scope">
                                {/* ngRepeat: (key,value) in x.data */}
                                <div className="col-md-12 col-sm-6 col-xs-12 gapMe">
                                  <div className=" panel-body1 table-responsive">
                                    <table className="table table-responsive ">
                                      <thead>
                                        <tr>
                                          <th width className="heading_tiltle">
                                            Highest Selling Hotels
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody className="bg-white">
                                        {/* ngRepeat: (key,value) in x.data | limitTo:3 */}
                                        <tr ng-show="x.data.length <= 0">
                                          <td>
                                            <h5>No Hotels.</h5>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* end ngRepeat: tab in tabset.tabs */}
                            <div
                              className="tab-pane ng-scope"
                              ng-repeat="tab in tabset.tabs"
                              ng-class="{active: tabset.active === tab.index}"
                              uib-tab-content-transclude="tab"
                            >
                              <div className="panel-body1 table-responsive ng-scope">
                                {/* ngRepeat: (key,value) in x.data */}
                                <div className="col-md-12 col-sm-6 col-xs-12 gapMe">
                                  <div className=" panel-body1 table-responsive">
                                    <table className="table table-responsive ">
                                      <thead>
                                        <tr>
                                          <th width className="heading_tiltle">
                                            Highest Selling Hotels
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody className="bg-white">
                                        {/* ngRepeat: (key,value) in x.data | limitTo:3 */}
                                        <tr ng-show="x.data.length <= 0">
                                          <td>
                                            <h5>No Hotels.</h5>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* end ngRepeat: tab in tabset.tabs */}
                            <div
                              className="tab-pane ng-scope"
                              ng-repeat="tab in tabset.tabs"
                              ng-class="{active: tabset.active === tab.index}"
                              uib-tab-content-transclude="tab"
                            >
                              <div className="panel-body1 table-responsive ng-scope">
                                {/* ngRepeat: (key,value) in x.data */}
                                <div className="col-md-12 col-sm-6 col-xs-12 gapMe">
                                  <div className=" panel-body1 table-responsive">
                                    <table className="table table-responsive ">
                                      <thead>
                                        <tr>
                                          <th width className="heading_tiltle">
                                            Highest Selling Hotels
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody className="bg-white">
                                        {/* ngRepeat: (key,value) in x.data | limitTo:3 */}
                                        <tr ng-show="x.data.length <= 0">
                                          <td>
                                            <h5>No Hotels.</h5>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* end ngRepeat: tab in tabset.tabs */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="panel-footer text-right">
                    <Link className="text text-info">&nbsp;</Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-12 col-sm-6">
                <div className="white-box-3" id="contractbox">
                  <div className="blue-box headTitle">
                    <span className="labelTitle ng-binding">contracts</span>
                    <span className="labelImg imgWid">
                      <img src={noteico} alt="cri" />
                    </span>
                  </div>
                  <div
                    className="hotel-main-box"
                    style={{ paddingBottom: "152px" }}
                  >
                    <div className="row">
                      <div className="col-md-12">
                        <div
                          active="activeJustified"
                          justified="true"
                          className="ng-isolate-scope"
                        >
                          <ul
                            className="nav nav-tabs nav-justified"
                            ng-class="{'nav-stacked': vertical, 'nav-justified': justified}"
                            ng-transclude
                          >
                            <li
                              ng-class="[{active: active, disabled: disabled}, classes]"
                              className="uib-tab nav-item ng-scope ng-isolate-scope active"
                              data-toggle="tab"
                              index={0}
                              heading="Recent Contracts"
                            >
                              <Link
                                to
                                ng-click="select($event)"
                                className="nav-link ng-binding"
                                uib-tab-heading-transclude
                              >
                                Recent Contracts
                              </Link>
                            </li>
                            <li
                              ng-class="[{active: active, disabled: disabled}, classes]"
                              className="col-xs-6 uib-tab nav-item ng-scope ng-isolate-scope"
                              index={1}
                              data-toggle="tab"
                              heading="Expiring Contracts"
                            >
                              <Link
                                to
                                ng-click="select($event)"
                                className="nav-link ng-binding"
                                uib-tab-heading-transclude
                              >
                                Expiring Contracts
                              </Link>
                            </li>
                          </ul>
                          <div className="tab-content">
                            {/* ngRepeat: tab in tabset.tabs */}
                            <div
                              className="tab-pane ng-scope active"
                              ng-repeat="tab in tabset.tabs"
                              ng-class="{active: tabset.active === tab.index}"
                              uib-tab-content-transclude="tab"
                            >
                              <table
                                id="step401"
                                className="tab-pane active table table-responsive   ng-scope"
                              >
                                <tbody className="bg-white">
                                  {/* ngRepeat: x in recentcontractdetails | limitTo:3 */}
                                </tbody>
                              </table>
                              <span
                                ng-hide="recentcontractdetails"
                                className="ng-scope ng-hide"
                              >
                                No Recent Contracts
                              </span>
                              <span className="col-md-121 period ng-scope">
                                <Link to="#contract">
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-outline btn-info ng-binding"
                                  >
                                    UPLOAD NEW CONTRACT
                                  </button>{" "}
                                </Link>
                              </span>
                            </div>
                            {/* end ngRepeat: tab in tabset.tabs */}
                            <div
                              className="tab-pane ng-scope"
                              ng-repeat="tab in tabset.tabs"
                              ng-class="{active: tabset.active === tab.index}"
                              uib-tab-content-transclude="tab"
                            >
                              <table
                                id="step402"
                                className="tab-pane table table-responsive   ng-scope"
                              >
                                <tbody className="bg-white">
                                  {/* ngRepeat: x in expiringcontractdetails | limitTo:3 */}
                                </tbody>
                              </table>
                              <span className="col-md-121 period ng-scope">
                                <Link to="#contract">
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-outline btn-info ng-binding"
                                  >
                                    UPLOAD NEW CONTRACT
                                  </button>{" "}
                                </Link>
                              </span>
                            </div>
                            {/* end ngRepeat: tab in tabset.tabs */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="panel-footer text-right">
                    <Link className="text text-info ng-binding" to="#contract">
                      View All Contracts
                    </Link>
                  </div>
                </div>
              </div>
              <div className="clearfix visible-lg-block" />
              <div className="col-lg-9 col-md-12 col-sm-12">
                <div className="white-box-3">
                  <div id="wrapDIV">
                    <div className="cities-green headTitle">
                      <span className="labelTitle ng-binding">Bookings</span>
                      <span className="labelImg imgWid">
                        <img src={bellico} alt="cri" />
                      </span>
                    </div>
                    <div
                      className="hotel-main-box"
                      style={{ paddingBottom: "152px" }}
                    >
                      <div className="row form-group">
                        <div className="col-md-12">
                          <div className="panel-body1 table-responsive">
                            <table className="table table-responsive  ">
                              <thead>
                                <tr
                                  ng-show="bookDetails.length>0"
                                  className="ng-hide"
                                >
                                  <th className="leade ng-binding">
                                    Booking ID
                                  </th>
                                  <th className="ng-binding">Status</th>
                                  <th className="ser ng-binding">
                                    Service Date
                                  </th>
                                  <th className="ng-binding">Leader</th>
                                  <th className="ng-binding">Room Category</th>
                                  <th className="last1 ng-binding">Value</th>
                                </tr>
                              </thead>
                              <tbody className="bg-white">
                                {/* ngRepeat: x in bookDetails | limitTo:4 */}
                                <tr ng-show="bookDetails.length==0" className>
                                  <td
                                    colSpan={6}
                                    className="ng-binding"
                                    style={{ paddingRight: "749px" }}
                                  >
                                    No Bookings for Divarius Hotel Residence -
                                    Paris.
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="panel-footer text-right">
                    <Link
                      className="text text-info ng-binding ng-hide"
                      to="#booking_list"
                      ng-show="bookDetails.length>0"
                    >
                      View All Bookings
                    </Link>
                  </div>
                </div>
              </div>
              <div id="myModal" className="modal fade" role="dialog">
                <div className="modal-dialog" style={{ width: "67%" }}>
                  <div
                    className="modal-lg modal-content"
                    style={{ width: "100%" }}
                  >
                    <div className>
                      <div id="paraID" />
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-default"
                        ng-click="dismissdata('#paraID')"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12">
                <div className="white-box-3">
                  <div className="lightBlue-box headTitle">
                    <span className="labelTitle ng-binding">
                      recent changes
                    </span>
                    <span className="labelImg imgWid">
                      <img src={fileico} alt="cri" />
                    </span>
                  </div>
                  <div
                    className="hotel-main-box"
                    style={{ paddingBottom: "90px" }}
                  >
                    <div className="row">
                      <div className="table-box">
                        <div className=" panel-body1 table-responsive">
                          <table className="table table-responsive  ">
                            <tbody className="bg-white">
                              {/* ngRepeat: x in recentChanges | limitTo:2 */}
                              <tr
                                ng-repeat="x in recentChanges | limitTo:2"
                                className="ng-scope"
                              >
                                <td width="70%">
                                  <span className="text headTitle ng-binding">
                                    Inventory Room Category Added Single
                                  </span>
                                  <br />
                                  <i className="period text-info ng-binding">
                                    Added on May 15, 2020
                                  </i>
                                </td>
                              </tr>
                              {/* end ngRepeat: x in recentChanges | limitTo:2 */}
                              <tr
                                ng-repeat="x in recentChanges | limitTo:2"
                                className="ng-scope"
                              >
                                <td width="70%">
                                  <span className="text headTitle ng-binding">
                                    cancellation policy of Hotel_Policy deleted
                                    by- allwin-qtech
                                  </span>
                                  <br />
                                  <i className="period text-info ng-binding">
                                    Added on May 15, 2020
                                  </i>
                                </td>
                              </tr>
                              {/* end ngRepeat: x in recentChanges | limitTo:2 */}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="panel-footer text-right">
                    <Link to="#logs" className="text text-info ng-binding">
                      View All Changes
                    </Link>
                  </div>
                </div>
              </div>
            </div>
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
              '\n        #sizing li a {\n            font-size: 12px;\n            color: #34495e;\n        }\n\n\n        a {\n            cursor: pointer;\n            color: #34495e;\n        }\n\n        .ng-hide {\n            display: none;\n        }\n\n        .h-bg-navy-blue {\n            background: #34495e;\n        }\n\n        .adddates {\n            background: #74D348;\n            color: white;\n        }\n\n        .adddates:hover {\n            background: #74D348;\n        }\n\n        .bootstrap-select.show-menu-arrow.open>.dropdown-toggle,\n        .bootstrap-select.show-menu-arrow.show>.dropdown-toggle {\n            z-index: 1;\n        }\n\n \n\n        th {\n            text-align: left !important;\n            width: 200px;\n            vertical-align: middle !important;\n            text-transform: uppercase;\n            font-size: 12px;\n\n        }\n\n        td {\n            background-color: #FFFFFF !important;\n        }\n\n        #voucherStartdatepicker {\n            background-color: white;\n        }\n\n        #voucherEndDatepicker {\n            background-color: white;\n        }\n\n\n\n\n        .breadcrumb {\n            font-weight: 500 !important;\n            font-size: 12px;\n            text-transform: uppercase;\n            list-style: none;\n            padding-left: 12px;\n\n        }\n\n\n\n\n\n        .breadcrumb li {\n            display: inline-block;\n            margin-bottom: .2em;\n        }\n\n        .breadcrumb li a {\n            background-color: #34495e;\n            box-sizing: border-box;\n            color: #fff;\n            display: block;\n            max-height: 2em;\n            padding: .5em 1em .5em 1.5em;\n            position: relative;\n            text-decoration: none;\n            transition: .25s;\n        }\n\n        .breadcrumb li.active a {\n            background-color: #62cb31;\n            box-sizing: border-box;\n            color: #fff;\n            display: block;\n            max-height: 2em;\n            padding: .5em 1em .5em 1.5em;\n            position: relative;\n            text-decoration: none;\n            transition: .25s;\n        }\n\n        .breadcrumb li.active a::after {\n            border-top: 1em solid transparent;\n            border-bottom: 1em solid transparent;\n            border-left: 1em solid #62cb31;\n            content: "";\n            position: absolute;\n            top: 0;\n            right: -1em;\n            transition: .25s;\n            z-index: 1;\n        }\n\n\n        .breadcrumb li a:before {\n            border-top: 1em solid transparent;\n            border-bottom: 1em solid transparent;\n            border-left: 1em solid #fff;\n            content: "";\n            position: absolute;\n            top: 0;\n            right: -1.25em;\n            z-index: 1;\n        }\n\n        .breadcrumb li a:after {\n            border-top: 1em solid transparent;\n            border-bottom: 1em solid transparent;\n            border-left: 1em solid #34495e;\n            content: "";\n            position: absolute;\n            top: 0;\n            right: -1em;\n            transition: .25s;\n            z-index: 1;\n        }\n\n        .breadcrumb li a:hover {\n            background-color: #3f5872;\n        }\n\n        .breadcrumb li.active a:hover {\n            background-color: #74d348;\n        }\n\n        .breadcrumb li.active a:hover:after {\n            border-left-color: #74d348;\n        }\n\n\n        .breadcrumb li a:hover:after {\n            border-left-color: #3f5872;\n        }\n\n\n        .white-box-3 {\n            background: #ffffff;\n            border: #e4e5e7 solid 1px;\n            margin: 25px 0px 0px;\n        }\n\n        .blue-heading-box {\n            background: #34495e;\n            margin: 0px 0px 0px 0px;\n            padding: 13px 0px;\n            width: 100%;\n            float: left;\n        }\n\n\n\n        .blue-heading-box-01 {\n            margin: 0px 0px 0px 0px;\n            padding: 0px 0px;\n            width: 30%;\n            float: left;\n        }\n\n        .labelTitle1 {\n            padding: 7px 0px 0px 15px;\n            text-transform: uppercase;\n            font-family: Montserrat;\n            font-weight: 700;\n            font-size: 12px;\n            color: #ffffff;\n        }\n\n        .blue-heading-box-02 {\n            margin: 0px 0px 0px 0px;\n            padding: 0px 0px;\n            width: 70%;\n            float: left;\n        }\n\n        .hotel-main-box {\n            padding: 6px 20px;\n        }\n\n        .propertyPic {\n            height: 279px !important;\n        }\n\n        .map-box {\n            padding: 5px 0px 0px 21px;\n            width: 16%;\n        }\n\n        .marg_hack {\n            margin-bottom: -25px;\n        }\n\n        .blue-box-01 {\n            margin: 0px 0px 0px 0px;\n            padding: 0px 10px 15px 15px;\n            width: 25%;\n            float: left;\n        }\n\n        .blue-box-02 {\n            margin: 0px 0px 0px 0px;\n            padding: 0px 15px 37px 0px;\n            width: 75%;\n            float: left;\n        }\n\n        .btn-default {\n            background-color: #fff;\n            border-color: #e4e5e7;\n            color: #6a6c6f;\n        }\n\n        .star_rating {\n            margin-top: 6px;\n        }\n\n        .star_rating1 {\n            min-width: 15px !important;\n            margin-bottom: 7px;\n        }\n\n        .address_details p {\n            padding: 0px 0px 0px 53px !important;\n            font-family: "Roboto", Helvetica, Arial, sans-serif !important;\n        }\n\n        .tab1Font {\n            font-size: 12px;\n            color: #B0B0B0;\n            margin-top: 10px;\n        }\n\n        .white-box-3 {\n            background: #ffffff;\n            border: #e4e5e7 solid 1px;\n            margin: 25px 0px 0px;\n        }\n\n        .headTitle {\n            text-transform: uppercase;\n            font-weight: 500;\n        }\n\n        .blue-box * {\n            font-size: 13px;\n            font-family: "Roboto", Helvetica, Arial, sans-serif;\n        }\n\n        .labelImg {\n            height: 55px;\n            width: 55px;\n            display: inline-block;\n            padding: 12px;\n            float: right;\n            right: 5px;\n            position: relative;\n        }\n\n        .imgWid img {\n            width: 100%;\n        }\n\n        .hotel-main-box {\n            padding: 6px 20px;\n        }\n\n        .amnt {\n            font-size: 30px;\n            font-weight: 900;\n        }\n\n        .text-success {\n            color: #62cb31 !important;\n\n        }\n\n        .hotel-main-box .well {\n            background: transparent !important;\n            border: transparent !important;\n            margin-bottom: 0px !important;\n        }\n\n        .well {\n            background: #f7f9fa;\n            box-shadow: none;\n            min-height: 20px;\n        }\n\n        .well-sm {\n            padding: 9px;\n            border-radius: 3px;\n        }\n\n        .boldMe {\n            font-size: 13px;\n            font-weight: 900;\n        }\n\n        .booking-status-box-01 {\n            margin: 0px 55px 0px -30px;\n            padding: 0px 0px;\n            width: 60%;\n            float: left;\n        }\n\n        .booking-status-box-02 {\n            margin: 55px 0px 0px 0px;\n            padding: 0px 0px;\n            width: 30%;\n            float: left;\n        }\n\n        .doughnut-legend {\n            padding: 0px;\n        }\n\n        .chart-legend li {\n            list-style: none;\n        }\n\n        .chart-legend li span {\n            display: inline-block;\n            width: 6px;\n            height: 6px;\n            margin-right: 5px;\n        }\n\n        body {\n            font-family: "Roboto", Helvetica, Arial, sans-serif;\n            background-color: #fff;\n            font-size: 13px;\n            color: #6a6c6f;\n        }\n\n        .white-box-3 .panel-footer {\n            padding: 3px 15px;\n            background-color: #FFFFFF;\n            border-top: 1px solid #FFF;\n            border-bottom-right-radius: 3px;\n            border-bottom-left-radius: 3px;\n        }\n\n        .cities-green {\n            background: #62cb31;\n            min-height: 55px;\n            display: table;\n            table-layout: fixed;\n            width: 100%;\n        }\n\n        .arrivals-box-01 {\n            margin: 0px 0px 0px 0px;\n            padding: 0px 0px;\n            width: 76%;\n            float: left;\n        }\n\n        .arr_wdt {\n            width: 110px !important;\n        }\n\n        .arrivals-box-02 {\n            margin: 0px 0px 0px 0px;\n            padding: 8px 0px 0px 0px;\n            width: 24%;\n            float: left;\n        }\n\n        .label_wh_grn {\n            font-size: 18px;\n            background: #fff;\n            text-align: center;\n            border-radius: 3px;\n            color: #62cb31;\n            font-weight: 600;\n            line-height: 20px;\n        }\n\n        .arrivals-box-02-11 {\n            margin: 0px 0px 0px 0px;\n            padding: 10px 0px;\n            width: 45px;\n            float: left;\n        }\n\n        .label_grn_wh {\n            color: #fff;\n            font-size: 11px;\n            width: 70px;\n            line-height: 12px;\n        }\n\n        .arrivals-box-02-12 {\n            margin: 0px 0px 0px 0px;\n            padding: 8px 0px 0px 10px;\n            width: 70px;\n            float: left;\n        }\n\n        .arrivals-box-02-13 {\n            margin: 0px 0px 0px 0px;\n            padding: 8px 0px 0px 0px;\n            width: 42px;\n            float: right;\n        }\n\n        .nav-tabs>li.active>a,\n        .nav-tabs>li.active>a:hover,\n        .nav-tabs>li.active>a:focus {\n            color: #FFF !important;\n            cursor: pointer !important;\n            background-color: #34495E !important;\n        }\n\n        .nav-tabs.nav-justified>li>a {\n            border-radius: 2px 2px 0 0;\n        }\n\n        .nav-link.ng-binding {\n            padding: 2px 0px !important;\n        }\n\n        .nav>li>a {\n            display: block;\n            padding: 10px 10px;\n            position: relative;\n        }\n\n        h4,\n        .h4 {\n            font-size: 18px;\n        }\n\n        .tab-content>.active,\n        .pill-content>.active {\n            display: block;\n        }\n\n        .table label,\n        .table {\n            font-family: "MONTSERRAT";\n            font-size: 11px !important;\n        }\n\n        body,\n        h4 {\n            font-family: Roboto;\n            font-weight: 400;\n        }\n\n        .tab-content {\n            border-top: 3px solid #ddcfcf;\n            border-left: 0px;\n            border-bottom: 0px;\n            border-right: 0px;\n        }\n\n        .expiring-box {\n            background: #E64A3B;\n            min-height: 55px;\n            display: table;\n            table-layout: fixed;\n            width: 100%;\n        }\n\n        .percnt {\n            font-size: 50px;\n            font-weight: 600;\n            margin: -15px 0px;\n            color: #62cb31;\n        }\n\n        .complt {\n            font-weight: 300 !important;\n            border-bottom: rgba(219, 224, 230, 0) solid 0px;\n            font-size: 20px;\n        }\n\n        .radio-inline,\n        .checkbox-inline {\n            display: inline-block;\n            padding-left: 20px;\n            margin-bottom: 0;\n            font-weight: normal;\n            vertical-align: middle;\n            cursor: pointer;\n        }\n\n        .checkbox.checkbox-inline {\n            margin-top: 0;\n        }\n\n        .checkbox {\n            padding-left: 20px;\n        }\n\n        .incorPanel,\n        .corPanel {\n            float: left;\n        }\n\n        .period {\n            font-size: 11px;\n        }\n\n        .corPanel {\n            margin-top: 10px;\n        }\n\n        .label-info {\n            background-color: #5bc0de;\n        }\n\n        .label {\n            display: inline;\n            padding: 0.2em 0.6em 0.3em;\n            font-size: 75%;\n            font-weight: bold;\n            line-height: 1;\n            color: #fff;\n            text-align: center;\n            white-space: nowrap;\n            vertical-align: baseline;\n            border-radius: 0.25em;\n        }\n\n        .fontGreenPn {\n            color: #46C10D !important;\n            text-transform: uppercase;\n            font-weight: 700;\n        }\n\n        .stats h4,\n        h5,\n        h6 {\n            margin: 5px 0;\n        }\n\n        h5,\n        .h5 {\n            font-size: 14px;\n        }\n\n        .form-group select,\n        .form-group button,\n        .form-group .btn,\n        .form-group input,\n        .form-group ul li,\n        .form-group,\n        .form-group textarea,\n        .datepicker,\n        .datepicker * {\n            font-size: 12px !important;\n            font-family: "Roboto", Helvetica, Arial, sans-serif;\n            font-weight: 300;\n        }\n\n        .pull-left {\n            float: left !important;\n        }\n\n        .pull-right {\n            float: right !important;\n        }\n\n        .btn-primary.btn-outline {\n            color: #34495e;\n        }\n\n        .btn-outline {\n            color: inherit;\n            background-color: transparent;\n            transition: all .5s;\n        }\n\n        .btn-primary {\n\n            border-color: #34495e;\n            color: #FFFFFF;\n        }\n\n        .btn {\n            border-radius: 3px;\n        }\n\n        .btn-primary.btn-outline:hover,\n        .btn-success.btn-outline:hover,\n        .btn-info.btn-outline:hover,\n        .btn-warning.btn-outline:hover,\n        .btn-danger.btn-outline:hover {\n            color: #fff;\n        }\n\n        .btn-primary:hover,\n        .btn-primary:focus,\n        .btn-primary:active,\n        .btn-primary.active,\n        .open .dropdown-toggle.btn-primary {\n            background-color: #3f5872;\n            border-color: #3f5872;\n            color: #FFFFFF;\n            outline: none;\n        }\n\n    \n\n        .form-group select,\n        .form-group button,\n        .form-group .btn,\n        .form-group input,\n        .form-group ul li,\n        .form-group,\n        .form-group textarea,\n        .datepicker,\n        .datepicker * {\n            font-size: 12px !important;\n            font-family: "Roboto", Helvetica, Arial, sans-serif;\n            font-weight: 300;\n        }\n\n        .btn-info.btn-outline {\n            color: #3498db;\n        }\n\n        .btn-info {\n\n            border-color: #3498db;\n        }\n\n        .btn-info:hover,\n        .btn-info:focus,\n        .btn-info:active,\n        .btn-info.active,\n        .open .dropdown-toggle.btn-info {\n            background-color: #4ea5e0;\n            border-color: #4ea5e0;\n            color: #FFFFFF;\n        }\n\n        thead {\n            text-transform: uppercase;\n            font-family: Roboto;\n            font-weight: 900;\n            font-size: 13px;\n            color: #5d6974;\n            background-color: white;\n            float: left;\n        }\n\n        .heading_tiltle {\n            font-size: 13px !important;\n            font-weight: 600;\n        }\n\n        .table>tbody>tr>td {\n            font-size: 8pt !important;\n            vertical-align: middle;\n            font-family: "Arial";\n            padding: 8px;\n        }\n\n        .panel-body1 tbody>tr>td {\n            border-top: 0px solid #ddd;\n        }\n\n        .btn-sm,\n        .btn-group-sm>.btn {\n            padding: 5px 10px;\n            font-size: 12px;\n            line-height: 1.5;\n            border-radius: 3px;\n            font-family: "Roboto", Helvetica, Arial, sans-serif;\n        }\n\n \n.table-box {\n    width: 100%;\n    padding: 10px 10px 0px 10px;\n    margin: 0px;\n    float: left;\n}\n. > tbody > tr:nth-of-type(odd) {\n    background-color: #f9f9f9;\n}\ntd{\n    text-align: left !important;\n}\n\n    ',
          }}
        />
      </div>
    </>
  );
};
export default HotelInventoryAppDashboard;
