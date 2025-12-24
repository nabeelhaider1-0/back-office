import React, { useEffect } from "react";
import logo from "../../assets/images/logo.png";
import userlogo from "../../assets/images/user.png";
import { Link } from "react-router-dom";
import Constants from "../../constants/routes";

const HotelInventoryAppSearchOffer = ({ setShowHeaderAndMenuBar }) => {
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
                    VIEW OFFERS
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
                <div className="col-md-3 mt-2">
                  <div className="labelTitle2">VIEW ALL OFFERS / DISCOUNTS</div>
                </div>
              </div>
            </div>
            <form
              style={{ borderTop: "2px solid #62cb31", paddingTop: "12px" }}
            >
              <div className="panel-body">
                <div className="row">
                  <div className="col-md-2 form-group col-sm-4">
                    <label>Offers</label>
                    <select
                      className="selectpicker form-control form-control-sm select_reset ng-pristine ng-untouched ng-valid bs-select-hidden ng-empty"
                      name="sel_offer_type"
                      data-live-search="true"
                      ng-model="OffersModel"
                    >
                      <option value selected="selected">
                        Please Select Offer Type
                      </option>
                      {/* ngRepeat: x in offerMaster */}
                      <option
                        value="EBD"
                        ng-repeat="x in offerMaster"
                        className="ng-binding ng-scope"
                      >
                        Early Bird
                      </option>
                      {/* end ngRepeat: x in offerMaster */}
                      <option
                        value="SP"
                        ng-repeat="x in offerMaster"
                        className="ng-binding ng-scope"
                      >
                        Stay Pay
                      </option>
                      {/* end ngRepeat: x in offerMaster */}
                      <option
                        value="LS"
                        ng-repeat="x in offerMaster"
                        className="ng-binding ng-scope"
                      >
                        Long Stay
                      </option>
                      {/* end ngRepeat: x in offerMaster */}
                      <option
                        value="MP"
                        ng-repeat="x in offerMaster"
                        className="ng-binding ng-scope"
                      >
                        Mark Up
                      </option>
                      {/* end ngRepeat: x in offerMaster */}
                      <option
                        value="DIS"
                        ng-repeat="x in offerMaster"
                        className="ng-binding ng-scope"
                      >
                        Discount
                      </option>
                      {/* end ngRepeat: x in offerMaster */}
                      <option
                        value="PM"
                        ng-repeat="x in offerMaster"
                        className="ng-binding ng-scope"
                      >
                        Promotion
                      </option>
                      {/* end ngRepeat: x in offerMaster */}
                    </select>
                  </div>
                  <div className="col-md-2 col-sm-4  col-xs-5 form-group">
                    <label>Hotels/Property</label>
                    <select
                      data-actions-box="true"
                      className="CustomHeight required selectpicker form-control form-control-sm show-menu-arrow bs-select-hidden ng-pristine ng-untouched ng-valid ng-empty"
                      data-container="body"
                      data-live-search="true"
                      ng-model="HotelsModel"
                    >
                      <option value data-hidden="true">
                        Select Hotel
                      </option>
                      {/* ngRepeat: x in hotels */}
                      <option
                        value={46361}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Monkey Mia Dolphin Resort
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={46562}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Divarius Hotel Residence
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={49150}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        HOTEL DU MEE
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={48209}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        La Ferme Des Barmonts
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={23074}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Tayrona
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={23077}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Golden Tulip Miedzyzdroje Residence
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={61835}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Villa Des Impressionnistes
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={55427}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Blue Sea Hotel
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={55429}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Marathon Beach
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={55413}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Des Horlogers
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={55425}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        The Margi
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={55504}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Pantokrator
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38216}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        1234 Testing
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38278}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        5footway.Inn Project Bugis
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38274}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        5footway.inn Project Chinatown 1
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38276}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        5footway.Inn Project Chinatown 2
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38407}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        5footwayinn Project Boat Quay
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38270}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        ABC Premium Hostel
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38367}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Adler Hostel
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38362}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Adonis Hotel
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38356}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Aliwal Park Hotel
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={68384}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Amara Sanctuary Resort Sentosa
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={64081}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Amara Sanctuary Resort Sentosa
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38499}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Amara Singapore
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38288}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Amaris Hotel Bugis
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38302}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Amoy Hotel
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38254}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Aqueen Hotel Balestier
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38252}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Aqueen Hotel Lavender
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38419}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Aqueen Jalan Besar
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38214}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Arianna
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38428}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Arton Hotel
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38150}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Ascott Raffles Place Singapore
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38373}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Attic Airways Bed &amp; Breakfast
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38230}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Bay Hotel Singapore
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38502}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Bayview Hotel Singapore
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38354}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Beach Hotel
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38410}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Beach Villas
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38292}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Big Hotel
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38364}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Blanc Inn
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38343}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Bliss Hotel Singapore
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38331}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Blissful Loft
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38319}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Bunc@Radius Clarke Quay
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38256}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Bunc@Radius Hostel
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={68373}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Capella Singapore
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={64070}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Capella Singapore
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38250}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Capri By Fraser Changi City
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38267}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Capsules @ The Little Red Dot
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38454}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Carlton
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38286}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Carlton City
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38351}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Chang Ziang Hotel
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38360}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Changi Cove
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38293}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Checkers Backpackers Inn
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38508}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Chinatown
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38151}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Citadines MT. Sophia
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38401}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        City Backpackers @ Hongkong Street
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38435}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Clover 33 Jalan Sultan
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38438}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Clover The Arts
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38555}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Concorde Singapore
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38458}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Conrad Centennial Singapore
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38460}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Copthorne King's
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38764}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Crowne Plaza Changi Airport
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38145}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Cultural Hotel
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38370}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        D'Kranji Farm Resort
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38325}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Darlene Hotel
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38259}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Days Hotel Singapore at Zhongshan Park
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38262}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Dorsett Singapore
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38395}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Dragon Court Hotel
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={68378}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Equarius
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={64075}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Equarius
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38482}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Fairmont Singapore
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38219}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Far East Plaza Apartment
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={68376}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Festive
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={64073}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Festive
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38721}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Fort Canning Lodge
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38382}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Four Chain View Hotel
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38511}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Four Seasons Hotel Singapore
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38656}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Fragrance - Selegie
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38243}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Fragrance Elegance
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38683}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Fragrance Hotel - Crystal
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38687}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Fragrance Hotel - Emerald
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38164}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Fragrance Hotel - Oasis
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38691}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Fragrance Hotel - Pearl
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38678}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Fragrance Hotel - Rose
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38166}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Fragrance Hotel - Royal
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38695}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Fragrance Hotel - Ruby
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38699}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Fragrance Hotel - Sapphire
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38209}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Fragrance Hotel Bugis
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38155}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Fragrance Hotel Ocean View
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38227}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Fragrance Hotel Riverside
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38163}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Fragrance Hotel-Sunflower
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38762}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Fragrance Imperial
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38154}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Fragrance Waterfront
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38515}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Furama City Centre
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38519}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Furama Riverfront
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38376}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        G4 Station Backpackers' Hostel
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38523}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Gallery Hotel
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38531}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Goodwood Park
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38462}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Grand Copthorne Waterfront
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38464}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Grand Hyatt Singapore
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38466}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Grand Mercure Roxy
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38496}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Grand Pacific Singapore
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38535}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Grand Park City Hall
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38718}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Grand Park Orchard
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38143}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Harbour Ville
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={68375}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Hard Rock Hotel Singapore
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={64072}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Hard Rock Hotel Singapore
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38670}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Hilton Singapore
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38539}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Holiday Inn Atrium
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38297}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Holiday Inn Express Singapore Clarke Quay
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38543}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Holiday Inn Singapore Orchard City Centre
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38404}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Hotel 101
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38665}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Hotel 1929
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38132}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Hotel 34
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38241}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Hotel 81 - Balestier
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38742}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Hotel 81 - Bugis
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38739}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Hotel 81 - Orchid
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38748}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Hotel 81 - Rochor
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38134}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Hotel 81 - Selegie
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38745}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Hotel 81 - Tristar
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38648}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Hotel 81 Bencoolen
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38196}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Hotel 81 Chinatown
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38182}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Hotel 81 Classic
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38210}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Hotel 81 Cosy
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38712}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Hotel 81 Elegance
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38709}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Hotel 81 Geylang
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38184}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Hotel 81 Gold
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38212}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Hotel 81 Heritage
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38211}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Hotel 81 Hollywood
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38190}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Hotel 81 Kovan
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38186}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Hotel 81 Lucky
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38703}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Hotel 81 Opera
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38188}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Hotel 81 Osaka
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38640}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Hotel 81 Palace
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38706}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Hotel 81 Princess
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38180}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Hotel 81 Sakura
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38644}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Hotel 81 Star
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38140}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Hotel 81-Dickson
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38389}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Hotel Bencoolen
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38266}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Hotel Clover
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38305}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Hotel Clover 5 Hongkong Street
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38199}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Hotel Fort Canning
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38178}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Hotel Grand Chancellor
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38398}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Ibackpacker Kallang
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38202}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Ibis Singapore Novena
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38136}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Ibis Singapore on Bencoolen
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38204}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Innotel Hotel
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38551}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        InterContinental Singapore
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38444}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Jen Orchardgateway Singapore{" "}
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38245}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Kam Leng
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38280}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Kawan Hostel
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38197}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Lanson Place Winsland Residences
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38322}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Le Grove Serviced Apartments
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38198}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Le Hotel Singapore
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38167}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Le Peranakan
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38731}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Link Hotel
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38413}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Lofi Inn@Hamilton
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38559}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        M Hotel
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38272}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Madras @ Eminence
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38282}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Madras Hotel @ Tekka
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38472}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Mandarin Orchard Singapore
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38488}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Mandarin Oriental, Singapore
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38170}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Marina Bay Sands
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38563}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Marina Mandarin Singapore
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38358}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Marrison Hotel
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38430}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Marrison Hotel At Desker
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38225}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Metropolitan YMCA Singapore
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={68374}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Michael
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={64071}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Michael
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38468}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Miramar Singapore
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={68377}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Moevenpick Heritage
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={64074}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Moevenpick Heritage
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38392}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Moni Gallery Hostel
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38207}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Moon @ 23 Dickson
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38727}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Naumi Hotel
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38258}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Naumi Liora
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38307}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        New Happy Hotel
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={73117}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        new hotel
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38661}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        New Majestic
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38168}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Nostalgia Hotel
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38474}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Novotel Singapore Clarke Quay
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38422}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        NuVe
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38208}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Oasia Hotel Singapore by Far East Hospitality
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={68380}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        One 15 Marina Club
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={64077}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        One 15 Marina Club
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38416}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        One Farrer Hotel &amp; Spa
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38476}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Orchard Hotel Singapore
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38575}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Orchard Parade
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38755}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Orchard Parksuites
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38753}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Orchard Scotts Residences
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38248}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Orchid Country Club
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38567}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Pan Pacific Orchard
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38291}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Pan Pacific Serviced Suites Beach Road
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38201}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Parc Sovereign Hotel â€“ Albert Street{" "}
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38425}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Parc Sovereign Hotel - Tyrwhitt
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38268}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Park 22
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38347}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Park Avenue Changi Hotel
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38315}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Park Avenue Rochester Hotel
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38449}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Park Hotel Alexandra
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38147}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Park Hotel Clarke Quay
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38177}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Park Regis Singapore
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38583}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Parkroyal on Beach Road
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38571}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Parkroyal on Kitchener Road
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38263}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Parkroyal On Pickering
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38579}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Peninsula Excelsior
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38328}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Perak Hotel
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38304}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Plush Pods
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38587}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Quality Hotel Marlow
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38447}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Quarters Hostel
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38479}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Raffles Hotel Singapore
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38260}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Ramada Singapore at Zhongshan Park
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38757}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Regency House
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38624}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Regent Singapore - A Four Seasons Hotel
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38335}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Relc International Hotel
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38470}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Rendezvous Hotel Singapore
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={68381}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Resorts World Sentosa - Beach Villa
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={64078}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Resorts World Sentosa - Beach Villa
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38235}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Rider's Lodge
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38674}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Riverview Hotel Singapore
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38751}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Robertson Quay
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38760}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Royal
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38547}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Royal at Queens
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38441}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Royal Hostel Singapore
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38591}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Royal Plaza on Scotts Singapore
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38432}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Rucksack Inn @ Temple Street
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38386}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Rucksack Inn@Hong kong Street
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38301}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Sandpiper Hotel
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38169}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Santa Grand Hotel Bugis
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38176}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Santa Grand Hotel Chinatown
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38261}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Santa Grand Hotel East Coast
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38174}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Santa Grand Hotel West Coast
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38232}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Santa Grand Lai Chun Yuen
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38153}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Santa Grand Little India
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38595}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Shangri-la Singapore
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={68382}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Shangri-La's Rasa Sentosa Resort &amp; Spa
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={64079}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Shangri-La's Rasa Sentosa Resort &amp; Spa
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38600}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Sheraton Towers Singapore
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={68385}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Siloso Beach Resort
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={64082}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Siloso Beach Resort
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38604}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Singapore Marriott
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38223}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Society Backpackers' Hotel
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38298}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Sofitel So Singapore
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38264}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Soluxe Inn
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38162}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Somerset Bencoolen
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38160}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Somerset Liang Court
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38158}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Somerset Orchard
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38724}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        St. Regis Hotel Singapore
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38173}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Studio M Hotel
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38715}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Summer View
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={72370}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        SUMMER VIEW HOTEL SINGAPORE
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38213}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Supreme
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38485}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Swissotel The Stamford Singapore
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38295}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        The Club Hotel
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38505}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        The Duxton Hotel
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38608}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        The Elizabeth Singapore
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38339}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        The Forest By Wangz
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38652}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        The Fragrance (Joo Chiat)
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38175}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        The Fullerton Bay Hotel Singapore
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38612}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        The Fullerton Singapore
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38616}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        The Inn At Temple Street
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38620}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        The Pan Pacific Singapore
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38299}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        The Pod - Boutique Capsule Hotel
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38205}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        The Porcelain
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38152}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        The Quincy
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38313}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        The Residence At Singapore Recreation Club
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38492}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        The Ritz Carlton Millenia Singapore
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38628}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        The Scarlet
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38265}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        The Seacare Hotel
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={68383}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        The Singapore Resort &amp; Spa Sentosa by Accor
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={64080}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        The Singapore Resort &amp; Spa Sentosa by Accor
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38218}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        The Sultan Hotel
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38296}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        The Westin Singapore
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38632}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Traders
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38290}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Tresor Tavern Hostel
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38284}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Tresor Tavern Hotel
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38294}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        V Hotel Bencoolen
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38200}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        V Hotel Lavender
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38193}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Value Hotel Nice
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38149}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Value Hotel-Balestier
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38165}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Value Hotel-Thomson
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38156}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Venue Hotel
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38735}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Victoria
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38451}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Village Hotel Albert Court by Far East Hospitality
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38527}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Village Hotel Bugis by Far East Hospitality
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38456}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Village Hotel Changi
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38238}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Village Hotel Katong{" "}
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38217}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Village Residence Clark Quay
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38221}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Village Residence Robertson Quay
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38303}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Vintage Inn Singapore
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38309}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Vip Hotel
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={68379}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        W Singapore - Sentosa Cove
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={64076}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        W Singapore - Sentosa Cove
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38203}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Wanderlust
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38171}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Wangz Hotel
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38379}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Woke Home Capsule Hostel
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={38636}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        York
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={73179}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Travel Test
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={31754}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Hipotels Natura Palace
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={31769}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Las Marinas
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={31746}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Starpoints Hotel Kuala Lumpur
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={47199}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Vida Downtown Dubai
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={31747}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        Villas Lanzarote Paradise
                      </option>
                      {/* end ngRepeat: x in hotels */}
                      <option
                        value={73183}
                        ng-repeat="x in hotels"
                        className="ng-binding ng-scope"
                      >
                        address downtown test
                      </option>
                      {/* end ngRepeat: x in hotels */}
                    </select>
                  </div>
                  <div className="col-md-2 form-group col-sm-4 col-xs-5">
                    <label>Country</label>
                    <select
                      className="CustomHeight required selectpicker form-control form-control-sm show-menu-arrow bs-select-hidden select_reset ng-pristine ng-untouched ng-valid ng-empty"
                      data-container="body"
                      ng-change="getCities();"
                      ng-model="CountriesModel"
                      data-live-search="true"
                    >
                      <option value selected="selected">
                        Please Select Country
                      </option>
                      {/* ngRepeat: x in countries */}
                      <option
                        value={97}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Afghanistan
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={43}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Albania
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={142}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Algeria
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={44}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Andorra
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={143}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Angola
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={230}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Antigua And Barbuda
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={29}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Argentina
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={45}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Armenia
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={231}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Aruba
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={196}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Australia
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={46}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Austria
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={47}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Azerbaijan
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={3}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Bahamas
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={98}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Bahrain
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={99}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Bangladesh
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={4}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Barbados
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={48}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Belarus
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={49}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Belgium
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={5}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Belize
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={144}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Benin
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={6}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Bermuda
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={100}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Bhutan
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={30}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Bolivia
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={50}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Bosnia and Herzegovina
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={145}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Botswana
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={31}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Brazil
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={7}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        British Virgin Islands
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={101}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Brunei
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={51}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Bulgaria
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={146}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Burkina Faso
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={147}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Burundi
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={102}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Cambodia
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={148}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Cameroon
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={2}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Canada
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={149}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Cape Verde
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={8}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Cayman Islands
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={150}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Central African Republic
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={151}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Chad
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={32}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Chile
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={103}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        China
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={33}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Colombia
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={402}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Comoros
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={412}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Cook Islands
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={9}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Costa Rica
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={52}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Croatia
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={10}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Cuba
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={415}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Curacao
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={53}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Cyprus
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={54}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Czech Republic
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={153}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Democratic Republic of the Congo
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={55}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Denmark
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={154}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Djibouti
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={11}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Dominica
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={12}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Dominican Republic
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={104}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        East Timor
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={34}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Ecuador
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={155}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Egypt
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={13}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        El Salvador
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={156}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Equatorial Guinea
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={157}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Eritrea
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={56}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Estonia
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={158}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Ethiopia
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={35}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Falkland Islands
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={198}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Fiji Islands
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={57}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Finland
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={58}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        France
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={36}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        French Guiana
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={199}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        French Polynesia
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={159}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Gabon
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={160}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Gambia
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={59}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Georgia
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={60}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Germany
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={161}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Ghana
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={61}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Gibraltar
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={62}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Greece
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={404}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Greece Islands
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={14}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Greenland
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={15}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Grenada
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={16}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Guadeloupe
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={200}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Guam
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={17}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Guatemala
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={63}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Guernsey
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={162}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Guinea
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={163}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Guinea Bissau
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={37}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Guyana
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={18}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Haiti
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={19}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Honduras
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={105}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Hong Kong
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={64}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Hungary
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={65}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Iceland
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={106}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        India
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={107}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Indonesia
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={108}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Iran
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={109}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Iraq
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={66}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Ireland
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={67}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Isle of Man
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={110}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Israel
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={68}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Italy
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={164}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Ivory Coast
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={20}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Jamaica
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={111}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Japan
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={69}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Jersey
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={112}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Jordan
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={113}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Kazakhstan
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={165}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Kenya
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={201}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Kiribati
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={70}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Kosovo
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={114}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Kuwait
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={115}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Kyrgyzstan
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={116}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Laos
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={71}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Latvia
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={117}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Lebanon
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={166}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Lesotho
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={167}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Liberia
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={168}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Libya
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={72}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Liechtenstein
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={73}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Lithuania
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={74}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Luxembourg
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={118}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Macau
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={75}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Macedonia
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={169}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Madagascar
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={170}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Malawi
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={119}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Malaysia
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={120}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Maldives
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={171}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Mali
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={76}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Malta
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={202}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Marshall Islands
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={21}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Martinique
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={172}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Mauritania
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={173}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Mauritius
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={22}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Mexico
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={203}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Micronesia
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={77}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Moldova
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={78}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Monaco
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={121}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Mongolia
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={79}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Montenegro
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={23}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Montserrat
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={174}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Morocco
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={175}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Mozambique
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={122}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Myanmar(Burma)
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={176}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Namibia
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={204}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Nauru
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={123}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Nepal
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={80}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Netherlands
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={205}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        New Caledonia
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={197}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        New Zealand
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={24}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Nicaragua
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={177}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Niger
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={178}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Nigeria
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={124}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        North Korea
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={411}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Northern Cyprus
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={414}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Northern Mariana Islands
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={81}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Norway
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={125}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Oman
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={126}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Pakistan
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={228}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Palestine
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={25}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Panama
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={206}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Papua New Guinea
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={38}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Paraguay
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={39}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Peru
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={127}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Philippines
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={82}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Poland
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={83}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Portugal
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={26}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Puerto Rico
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={128}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Qatar
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={152}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Republic of the Congo
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={179}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Reunion
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={84}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Romania
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={85}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Russia
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={180}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Rwanda
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={400}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Saint Barthelemy
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={413}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Saint Kitts and Nevis
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={401}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Saint Lucia
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={207}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Samoa
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={86}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        San Marino
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={181}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Sao Tome and Principe
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={129}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Saudi Arabia
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={182}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Senegal
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={87}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Serbia
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={183}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Seychelles
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={184}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Sierra Leone
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={130}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Singapore
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={88}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Slovakia
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={89}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Slovenia
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={208}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Solomon Islands
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={185}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Somalia
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={186}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        South Africa
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={131}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        South Korea
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={403}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        South Sudan
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={90}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Spain
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={132}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Sri Lanka
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={187}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Sudan
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={40}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Suriname
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={188}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Swaziland
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={91}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Sweden
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={92}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Switzerland
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={133}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Syria
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={134}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Taiwan
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={135}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Tajikistan
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={189}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Tanzania
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={136}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Thailand
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={190}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Togo
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={209}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Tonga
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={27}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Trinidad and Tobago
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={191}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Tunisia
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={93}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Turkey
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={137}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Turkmenistan
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={410}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Turks and Caicos Islands
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={210}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Tuvalu
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={192}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Uganda
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={94}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Ukraine
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={138}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        United Arab Emirates
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={95}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        United Kingdom
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={1}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        United States
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={28}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        United States Virgin Islands
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={41}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Uruguay
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={139}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Uzbekistan
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={211}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Vanuatu
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={96}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Vatican City
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={42}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Venezuela
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={140}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Vietnam
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={212}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Wallis and Futuna
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={193}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Western Sahara
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={141}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Yemen
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={194}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Zambia
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={195}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Zimbabwe
                      </option>
                      {/* end ngRepeat: x in countries */}
                    </select>
                  </div>
                  <div
                    className="col-md-2 form-group col-sm-4 col-xs-5 ng-hide"
                    ng-show="cities.length > 0"
                  >
                    <label>City</label>
                    <select
                      className="CustomHeight required selectpicker form-control form-control-sm show-menu-arrow bs-select-hidden select_reset ng-pristine ng-untouched ng-valid ng-empty"
                      id="cities"
                      data-container="body"
                      ng-model="CitiesModel"
                      data-live-search="true"
                    >
                      <option value>Please Select City</option>
                      {/* ngRepeat: x in cities */}
                    </select>
                  </div>
                  <div className="col-md-2 col-sm-4  col-xs-5 form-group">
                    <label>Inventory Category</label>
                    <select
                      data-actions-box="true"
                      className="CustomHeight required selectpicker form-control form-control-sm show-menu-arrow bs-select-hidden ng-pristine ng-untouched ng-valid ng-empty"
                      data-container="body"
                      data-live-search="true"
                      ng-model="inventoryRoomClassModel"
                    >
                      <option value data-hidden="true">
                        Select Inventory
                      </option>
                      {/* ngRepeat: (inventory_class_id, inventory_room_class) in inventoryList */}
                      <option
                        value={2}
                        ng-repeat="(inventory_class_id, inventory_room_class) in inventoryList"
                        className="ng-binding ng-scope"
                      >
                        Standard
                      </option>
                      {/* end ngRepeat: (inventory_class_id, inventory_room_class) in inventoryList */}
                      <option
                        value={3}
                        ng-repeat="(inventory_class_id, inventory_room_class) in inventoryList"
                        className="ng-binding ng-scope"
                      >
                        Executive
                      </option>
                      {/* end ngRepeat: (inventory_class_id, inventory_room_class) in inventoryList */}
                      <option
                        value={11}
                        ng-repeat="(inventory_class_id, inventory_room_class) in inventoryList"
                        className="ng-binding ng-scope"
                      >
                        Special Executive
                      </option>
                      {/* end ngRepeat: (inventory_class_id, inventory_room_class) in inventoryList */}
                      <option
                        value={15}
                        ng-repeat="(inventory_class_id, inventory_room_class) in inventoryList"
                        className="ng-binding ng-scope"
                      >
                        Triple Standard ESC
                      </option>
                      {/* end ngRepeat: (inventory_class_id, inventory_room_class) in inventoryList */}
                      <option
                        value={21}
                        ng-repeat="(inventory_class_id, inventory_room_class) in inventoryList"
                        className="ng-binding ng-scope"
                      >
                        Standard Triple
                      </option>
                      {/* end ngRepeat: (inventory_class_id, inventory_room_class) in inventoryList */}
                      <option
                        value={26}
                        ng-repeat="(inventory_class_id, inventory_room_class) in inventoryList"
                        className="ng-binding ng-scope"
                      >
                        Classic
                      </option>
                      {/* end ngRepeat: (inventory_class_id, inventory_room_class) in inventoryList */}
                      <option
                        value={33}
                        ng-repeat="(inventory_class_id, inventory_room_class) in inventoryList"
                        className="ng-binding ng-scope"
                      >
                        Deluxe
                      </option>
                      {/* end ngRepeat: (inventory_class_id, inventory_room_class) in inventoryList */}
                      <option
                        value={34}
                        ng-repeat="(inventory_class_id, inventory_room_class) in inventoryList"
                        className="ng-binding ng-scope"
                      >
                        Royal
                      </option>
                      {/* end ngRepeat: (inventory_class_id, inventory_room_class) in inventoryList */}
                      <option
                        value={35}
                        ng-repeat="(inventory_class_id, inventory_room_class) in inventoryList"
                        className="ng-binding ng-scope"
                      >
                        Premiunm
                      </option>
                      {/* end ngRepeat: (inventory_class_id, inventory_room_class) in inventoryList */}
                      <option
                        value={36}
                        ng-repeat="(inventory_class_id, inventory_room_class) in inventoryList"
                        className="ng-binding ng-scope"
                      >
                        Super Deluxe
                      </option>
                      {/* end ngRepeat: (inventory_class_id, inventory_room_class) in inventoryList */}
                      <option
                        value={37}
                        ng-repeat="(inventory_class_id, inventory_room_class) in inventoryList"
                        className="ng-binding ng-scope"
                      >
                        Premium
                      </option>
                      {/* end ngRepeat: (inventory_class_id, inventory_room_class) in inventoryList */}
                      <option
                        value={39}
                        ng-repeat="(inventory_class_id, inventory_room_class) in inventoryList"
                        className="ng-binding ng-scope"
                      >
                        Classic Suite
                      </option>
                      {/* end ngRepeat: (inventory_class_id, inventory_room_class) in inventoryList */}
                      <option
                        value={40}
                        ng-repeat="(inventory_class_id, inventory_room_class) in inventoryList"
                        className="ng-binding ng-scope"
                      >
                        Standard ER
                      </option>
                      {/* end ngRepeat: (inventory_class_id, inventory_room_class) in inventoryList */}
                      <option
                        value={41}
                        ng-repeat="(inventory_class_id, inventory_room_class) in inventoryList"
                        className="ng-binding ng-scope"
                      >
                        StandardTest
                      </option>
                      {/* end ngRepeat: (inventory_class_id, inventory_room_class) in inventoryList */}
                    </select>
                  </div>
                  <div className="col-md-2 col-sm-4  col-xs-5 form-group">
                    <label>Room Category</label>
                    <select
                      data-actions-box="true"
                      className="CustomHeight required selectpicker form-control form-control-sm show-menu-arrow bs-select-hidden ng-pristine ng-untouched ng-valid ng-empty"
                      data-container="body"
                      data-live-search="true"
                      ng-model="roomClassModel"
                    >
                      <option value data-hidden="true">
                        Select Inventory
                      </option>
                      {/* ngRepeat: x in roomClassList */}
                      <option
                        value={13}
                        ng-repeat="x in roomClassList"
                        className="ng-binding ng-scope"
                      >
                        Classic - Triple
                      </option>
                      {/* end ngRepeat: x in roomClassList */}
                      <option
                        value={67}
                        ng-repeat="x in roomClassList"
                        className="ng-binding ng-scope"
                      >
                        Classic Suite - Triple
                      </option>
                      {/* end ngRepeat: x in roomClassList */}
                      <option
                        value={8}
                        ng-repeat="x in roomClassList"
                        className="ng-binding ng-scope"
                      >
                        Deluxe - Triple
                      </option>
                      {/* end ngRepeat: x in roomClassList */}
                      <option
                        value={55}
                        ng-repeat="x in roomClassList"
                        className="ng-binding ng-scope"
                      >
                        Executive - Single, Extrabed - 3{" "}
                      </option>
                      {/* end ngRepeat: x in roomClassList */}
                      <option
                        value={149}
                        ng-repeat="x in roomClassList"
                        className="ng-binding ng-scope"
                      >
                        Executive - Triple
                      </option>
                      {/* end ngRepeat: x in roomClassList */}
                      <option
                        value={57}
                        ng-repeat="x in roomClassList"
                        className="ng-binding ng-scope"
                      >
                        Executive - Triple, Extrabed - 2{" "}
                      </option>
                      {/* end ngRepeat: x in roomClassList */}
                      <option
                        value={60}
                        ng-repeat="x in roomClassList"
                        className="ng-binding ng-scope"
                      >
                        Premium - Single, Extrabed - 2{" "}
                      </option>
                      {/* end ngRepeat: x in roomClassList */}
                      <option
                        value={62}
                        ng-repeat="x in roomClassList"
                        className="ng-binding ng-scope"
                      >
                        Premium - Triple, Extrabed - 2{" "}
                      </option>
                      {/* end ngRepeat: x in roomClassList */}
                      <option
                        value={37}
                        ng-repeat="x in roomClassList"
                        className="ng-binding ng-scope"
                      >
                        Premiunm - Triple
                      </option>
                      {/* end ngRepeat: x in roomClassList */}
                      <option
                        value={23}
                        ng-repeat="x in roomClassList"
                        className="ng-binding ng-scope"
                      >
                        Royal - Triple
                      </option>
                      {/* end ngRepeat: x in roomClassList */}
                      <option
                        value={150}
                        ng-repeat="x in roomClassList"
                        className="ng-binding ng-scope"
                      >
                        Special Executive - Triple
                      </option>
                      {/* end ngRepeat: x in roomClassList */}
                      <option
                        value={18}
                        ng-repeat="x in roomClassList"
                        className="ng-binding ng-scope"
                      >
                        Standard - Triple
                      </option>
                      {/* end ngRepeat: x in roomClassList */}
                      <option
                        value={71}
                        ng-repeat="x in roomClassList"
                        className="ng-binding ng-scope"
                      >
                        Standard ER - Triple
                      </option>
                      {/* end ngRepeat: x in roomClassList */}
                      <option
                        value={145}
                        ng-repeat="x in roomClassList"
                        className="ng-binding ng-scope"
                      >
                        Standard Triple - Triple
                      </option>
                      {/* end ngRepeat: x in roomClassList */}
                      <option
                        value={80}
                        ng-repeat="x in roomClassList"
                        className="ng-binding ng-scope"
                      >
                        StandardTest - Triple
                      </option>
                      {/* end ngRepeat: x in roomClassList */}
                      <option
                        value={47}
                        ng-repeat="x in roomClassList"
                        className="ng-binding ng-scope"
                      >
                        Super Deluxe - Triple
                      </option>
                      {/* end ngRepeat: x in roomClassList */}
                      <option
                        value={146}
                        ng-repeat="x in roomClassList"
                        className="ng-binding ng-scope"
                      >
                        Triple Standard ESC - Triple, Extrabed - 1{" "}
                      </option>
                      {/* end ngRepeat: x in roomClassList */}
                    </select>
                  </div>
                  <div className="col-md-2 col-sm-4  col-xs-5 form-group">
                    <label>Room/Meal Basis</label>
                    <select
                      data-actions-box="true"
                      className="CustomHeight required selectpicker form-control form-control-sm show-menu-arrow bs-select-hidden ng-pristine ng-untouched ng-valid ng-empty"
                      data-container="body"
                      data-live-search="true"
                      ng-model="roomBasisModel"
                    >
                      <option value data-hidden="true">
                        Select Inventory
                      </option>
                      {/* ngRepeat: x in roomBasisList */}
                      <option
                        value={2}
                        ng-repeat="x in roomBasisList"
                        className="ng-binding ng-scope"
                      >
                        Half Board
                      </option>
                      {/* end ngRepeat: x in roomBasisList */}
                      <option
                        value={3}
                        ng-repeat="x in roomBasisList"
                        className="ng-binding ng-scope"
                      >
                        Breakfast
                      </option>
                      {/* end ngRepeat: x in roomBasisList */}
                      <option
                        value={5}
                        ng-repeat="x in roomBasisList"
                        className="ng-binding ng-scope"
                      >
                        ULTRA All
                      </option>
                      {/* end ngRepeat: x in roomBasisList */}
                      <option
                        value={6}
                        ng-repeat="x in roomBasisList"
                        className="ng-binding ng-scope"
                      >
                        Superior
                      </option>
                      {/* end ngRepeat: x in roomBasisList */}
                      <option
                        value={7}
                        ng-repeat="x in roomBasisList"
                        className="ng-binding ng-scope"
                      >
                        Bed &amp;amp; Breakfast
                      </option>
                      {/* end ngRepeat: x in roomBasisList */}
                      <option
                        value={9}
                        ng-repeat="x in roomBasisList"
                        className="ng-binding ng-scope"
                      >
                        Breakfast and dinner
                      </option>
                      {/* end ngRepeat: x in roomBasisList */}
                      <option
                        value={10}
                        ng-repeat="x in roomBasisList"
                        className="ng-binding ng-scope"
                      >
                        buffet breakfast
                      </option>
                      {/* end ngRepeat: x in roomBasisList */}
                      <option
                        value={11}
                        ng-repeat="x in roomBasisList"
                        className="ng-binding ng-scope"
                      >
                        Breakfast Included
                      </option>
                      {/* end ngRepeat: x in roomBasisList */}
                      <option
                        value={30}
                        ng-repeat="x in roomBasisList"
                        className="ng-binding ng-scope"
                      >
                        BB
                      </option>
                      {/* end ngRepeat: x in roomBasisList */}
                      <option
                        value={31}
                        ng-repeat="x in roomBasisList"
                        className="ng-binding ng-scope"
                      >
                        Bed Only
                      </option>
                      {/* end ngRepeat: x in roomBasisList */}
                      <option
                        value={32}
                        ng-repeat="x in roomBasisList"
                        className="ng-binding ng-scope"
                      >
                        Dinner Buffet
                      </option>
                      {/* end ngRepeat: x in roomBasisList */}
                      <option
                        value={33}
                        ng-repeat="x in roomBasisList"
                        className="ng-binding ng-scope"
                      >
                        Room Only.
                      </option>
                      {/* end ngRepeat: x in roomBasisList */}
                    </select>
                  </div>
                  <div className="col-md-2 form-group col-sm-4">
                    <label>Target</label>
                    <br />
                    <div
                      className="btn-group text-center m-b-md lapt_clas"
                      id="wizardControl1"
                    >
                      <Link
                        className="btn btn-sm btn-primary"
                        id="PN_Selected"
                        data-target="#step1"
                        data-bs-toggle="tab"
                        ng-click="targetClick('PN')"
                      >
                        Pax Nationality
                      </Link>
                      <Link
                        className="btn btn-sm btn-default"
                        id="MP_Selected"
                        data-target="#step2"
                        data-bs-toggle="tab"
                        ng-click="targetClick('MP')"
                      >
                        Market Profile
                      </Link>
                    </div>
                  </div>
                  <div className="col-md-2 form-group col-sm-4" id="pak_nation">
                    <label>Pax Nationality</label>
                    <select
                      data-actions-box="true"
                      className="CustomHeight required selectpicker form-control form-control-sm show-menu-arrow bs-select-hidden ng-pristine ng-untouched ng-valid ng-empty"
                      data-container="body"
                      data-live-search="true"
                      ng-model="NationalityModel"
                    >
                      {/* ngRepeat: x in countries */}
                      <option
                        value={97}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Afghanistan
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={43}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Albania
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={142}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Algerian
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={44}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Andorran
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={143}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Angola
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={230}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Antigua &amp;Amp;amp; Barbuda
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={29}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Argentina
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={45}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Armenian
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={231}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Aruban
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={196}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Australian
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={46}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Austrian
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={47}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Azerbaijani
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={3}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Bahamian
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={98}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Bahraini
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={99}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Bangladeshi
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={4}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Barbadian
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={48}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Belarusian
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={49}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Belgian
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={5}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Belizean
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={144}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Benin
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={6}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Bermuda
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={100}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Bhutan
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={30}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Bolivian
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={50}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Bosnia And Herzegovina
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={145}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Batswana
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={31}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Brazilian
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={7}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        British Virgin Islands
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={101}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Bruneian
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={51}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Bulgarian
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={146}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Burkina Faso
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={147}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Burundi
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={102}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Cambodian
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={148}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Cameroonian
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={2}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Canadian
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={149}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Verdean
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={8}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Cayman Islands
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={150}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Central African Republic
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={151}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Chad
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={32}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Chilean
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={103}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Chinese
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={33}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Colombian
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={402}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        African
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={412}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Newzealand
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={9}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Costa Rican
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={52}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Croatian
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={10}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Cuba
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={415}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Dutch
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={53}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Cypriot
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={54}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Czech
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={153}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Congolese
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={55}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Danish
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={154}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Djibouti
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={11}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Dominica
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={12}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Dominican (Dominican Republic)
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={104}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        East Timor
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={34}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Ecuador
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={155}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Egyptian
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={13}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Salvadoran
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={156}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Equatorial Guinea
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={157}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Eritrea
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={56}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Estonian
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={158}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Ethiopia
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={35}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Falkland Islands
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={198}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Fiji
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={57}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Finnish
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={58}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        French
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={36}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        French Guiana
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={199}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        French Polynesia
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={159}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Gabon
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={160}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Gambian
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={59}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Georgian
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={60}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        German
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={161}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Ghanaian
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={61}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Gibraltarian
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={62}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Greece
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={404}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Greek
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={14}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Greenland
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={15}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Grenadian
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={16}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Guadeloupe
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={200}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Guam
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={17}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Guatemalan
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={63}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Guernsey
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={162}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Guinea
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={163}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Guinea-bissau
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={37}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Guyana
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={18}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Haiti
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={19}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Honduras
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={105}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Hong Kong
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={64}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Hungarian
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={65}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Icelander
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={106}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Indian
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={107}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Indonesian
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={108}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Iranian
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={109}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Iraqi
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={66}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Irish
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={67}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Isle Of Man
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={110}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Isreali
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={68}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Italian
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={164}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Ivory Coast
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={20}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Jamaican
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={111}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Japanese
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={69}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Jersey
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={112}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Jordanian
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={113}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Kazakhstani
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={165}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Kenyan
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={201}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Kiribati
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={70}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Kosovo
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={114}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Kuwaiti
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={115}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Kyrgyzstan
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={116}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Lao
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={71}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Latvian
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={117}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Lebanese
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={166}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Lesotho
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={167}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Liberia
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={168}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Libyan
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={72}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Liechtenstein
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={73}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Lithuanian
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={74}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Luxembourger
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={118}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Macau
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={75}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Macedonia
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={169}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Madagascar
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={170}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Malawi
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={119}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Malaysian
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={120}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Maldivian
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={171}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Mali
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={76}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Maltese
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={202}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Marshall Islands
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={21}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Martiniquais
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={172}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Mauritania
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={173}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Mauritius
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={22}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Mexican
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={203}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Micronesia
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={77}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Moldova
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={78}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Monacan
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={121}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Mongolia
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={79}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Montenegrin
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={23}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Montserrat
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={174}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Moroccan
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={175}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Mozambican
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={122}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Myanmar (Burma)
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={176}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Namibian
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={204}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Nauru
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={123}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Nepalese
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={80}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Netherlander
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={205}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        New Caledonia
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={197}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        New Zealander
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={24}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Nicaragua
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={177}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Niger
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={178}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Nigerian
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={124}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        North Korea
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={411}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Turkish Cypriot
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={414}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        American
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={81}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Norwegian
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={125}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Omani
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={126}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Pakistani
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={228}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Palestinia
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={25}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Panamanian
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={206}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Papua New Guinea
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={38}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Paraguayan
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={39}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Peruvian
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={127}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Philippine
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={82}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Polish
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={83}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Portuguese
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={26}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Puerto Rican
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={128}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Qatari
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={152}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Republic Of The Congo
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={179}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Reunion
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={84}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Romanian
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={85}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Russian
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={180}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Rwanda
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={400}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Saint Barthelemy
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={413}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Carribean
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={401}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Saint Lucia
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={207}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Samoa
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={86}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        San Marino
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={181}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Sao Tome And Principe
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={129}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Saudi
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={182}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Senegalese
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={87}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Serbian
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={183}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Seychelles
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={184}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Sierra Leone
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={130}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Singaporean
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={88}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Slovakian
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={89}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Slovenian
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={208}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Solomon Islands
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={185}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Somalia
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={186}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        South African
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={131}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Korean
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={403}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Sudanese
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={90}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Spanish
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={132}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Sri Lankan
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={187}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Sudan
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={40}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Suriname
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={188}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Swaziland
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={91}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Swedish
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={92}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Swiss
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={133}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Syrian Arab Republic
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={134}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Taiwan
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={135}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Tajikistan
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={189}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Tanzanian
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={136}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Thai
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={190}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Togo
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={209}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Tonga
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={27}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Trinidad And Tobago
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={191}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Tunisian
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={93}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Turkish
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={137}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Turkmenistan
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={410}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Turks And Caicos Islands
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={210}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Tuvalu
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={192}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Ugandan
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={94}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Ukrainian
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={138}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Emirati
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={95}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        British
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={1}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        American
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={28}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        United States Virgin Islands
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={41}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Uruguayan
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={139}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Uzbekistan
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={211}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Vanuatu
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={96}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Vatican City
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={42}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Venezuelan
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={140}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Vietnamese
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={212}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Wallis And Futuna
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={193}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Western Sahara
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={141}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Yemen
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={194}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Zambian
                      </option>
                      {/* end ngRepeat: x in countries */}
                      <option
                        value={195}
                        ng-repeat="x in countries"
                        className="ng-binding ng-scope"
                      >
                        Zimbabwe
                      </option>
                      {/* end ngRepeat: x in countries */}
                    </select>
                  </div>
                  <div
                    className="col-md-2 form-group col-sm-4"
                    id="mar_pro"
                    style={{ display: "none" }}
                  >
                    <label>Market Profile</label>
                    <select
                      data-actions-box="true"
                      className="CustomHeight required selectpicker form-control form-control-sm show-menu-arrow bs-select-hidden ng-pristine ng-untouched ng-valid ng-empty"
                      data-container="body"
                      data-live-search="true"
                      ng-model="MarketProfileModel"
                    >
                      {/* ngRepeat: x in supplierProfile */}
                      <option
                        value={67}
                        ng-repeat="x in supplierProfile"
                        className="ng-binding ng-scope"
                      >
                        AFRICAN MARKET
                      </option>
                      {/* end ngRepeat: x in supplierProfile */}
                      <option
                        value={31}
                        ng-repeat="x in supplierProfile"
                        className="ng-binding ng-scope"
                      >
                        APAC
                      </option>
                      {/* end ngRepeat: x in supplierProfile */}
                      <option
                        value={68}
                        ng-repeat="x in supplierProfile"
                        className="ng-binding ng-scope"
                      >
                        CIS- RUSSIA MARKET
                      </option>
                      {/* end ngRepeat: x in supplierProfile */}
                      <option
                        value={69}
                        ng-repeat="x in supplierProfile"
                        className="ng-binding ng-scope"
                      >
                        EUROPE MARKET
                      </option>
                      {/* end ngRepeat: x in supplierProfile */}
                      <option
                        value={70}
                        ng-repeat="x in supplierProfile"
                        className="ng-binding ng-scope"
                      >
                        FAR EAST
                      </option>
                      {/* end ngRepeat: x in supplierProfile */}
                      <option
                        value={71}
                        ng-repeat="x in supplierProfile"
                        className="ng-binding ng-scope"
                      >
                        GCC- MARKET
                      </option>
                      {/* end ngRepeat: x in supplierProfile */}
                      <option
                        value={72}
                        ng-repeat="x in supplierProfile"
                        className="ng-binding ng-scope"
                      >
                        GCC-UAE&amp;SA
                      </option>
                      {/* end ngRepeat: x in supplierProfile */}
                      <option
                        value={73}
                        ng-repeat="x in supplierProfile"
                        className="ng-binding ng-scope"
                      >
                        SUB-C MARKET
                      </option>
                      {/* end ngRepeat: x in supplierProfile */}
                      <option
                        value={74}
                        ng-repeat="x in supplierProfile"
                        className="ng-binding ng-scope"
                      >
                        USA MARKET
                      </option>
                      {/* end ngRepeat: x in supplierProfile */}
                    </select>
                  </div>
                  <div
                    className="col-md-2 col-sm-4 form-group ng-hide"
                    ng-show="ExcludeNationality"
                  >
                    <label>Exclude Nationality</label>
                    <br />
                    <select
                      id="ExcludeNationalityId"
                      data-actions-box="true"
                      data-container="body"
                      className="selectpicker show-menu-arrow form-control form-control-sm ng-pristine ng-untouched ng-valid bs-select-hidden ng-empty"
                      ng-model="ExcludeNationalityModel"
                      data-live-search="true"
                      multiple
                    >
                      {/* ngRepeat: (key, value) in NationalityExclude */}
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-2 col-sm-4 form-group">
                    <label className="valuefor_txt">Booking Date</label>
                    <div
                      className="input-group date input-daterange"
                      id="booking_from_date"
                    >
                      <input
                        id="bookingfrom_date"
                        className="form-control ng-pristine ng-untouched ng-valid ng-empty"
                        type="text"
                        ng-model="BookingFromDate"
                        date="dd-MM-yyyy"
                      />
                      <span className="input-group-addon">to</span>
                      <input
                        id="bookingto_date"
                        className="form-control ng-pristine ng-untouched ng-valid ng-empty"
                        type="text"
                        ng-model="BookingToDate"
                        date="dd-MM-yyyy"
                      />
                      <span className="input-group-addon" id="dtrashbtn">
                        <i className="fa fa-trash" />
                      </span>
                    </div>
                  </div>
                  <div className="col-md-2 col-sm-4 form-group">
                    <label className="valuefor_txt">Checkin Date</label>
                    <div
                      className="input-group date input-daterange"
                      id="checkin_date_from"
                    >
                      <input
                        id="check_from_date"
                        className="form-control ng-pristine ng-untouched ng-valid ng-empty"
                        type="text"
                        ng-model="CheckinFromDate"
                        date="dd-MM-yyyy"
                      />
                      <span className="input-group-addon">to</span>
                      <input
                        id="check_to_date"
                        className="form-control ng-pristine ng-untouched ng-valid ng-empty"
                        type="text"
                        ng-model="CheckinToDate"
                        date="dd-MM-yyyy"
                      />
                      <span className="input-group-addon" id="etrashbtn">
                        <i className="fa fa-trash" />
                      </span>
                    </div>
                  </div>
                  <div className="col-md-2 col-sm-4 form-group">
                    <label className="valuefor_txt label_value">
                      Checkin Before
                    </label>
                    <div className="input-group col-md-12 col-xs-12">
                      <input
                        name="before_checkin1"
                        id="beforeCheckin"
                        ng-model="beforeCheckin"
                        maxLength={3}
                        size={4}
                        className="form-control ng-pristine ng-untouched ng-valid ng-empty ng-valid-maxlength"
                        type="text"
                        numbers-only
                      />
                      <span className="input-group-addon">Days</span>
                    </div>
                  </div>
                  <div
                    className="col-md-2 form-group col-sm-4"
                    ng-show="LastMintueOffer"
                  >
                    <label>&nbsp;</label>
                    <br />
                    <div
                      className="btn-group text-center m-b-md lapt_clas"
                      id="wizardControl1"
                    >
                      <Link
                        className="btn btn-sm btn-primary"
                        id="CB_Sel"
                        data-target="#step1"
                        data-bs-toggle="tab"
                        ng-click="lastOrCheckin('CB')"
                      >
                        Checkin Before
                      </Link>
                      <Link
                        className="btn btn-sm btn-default"
                        id="LM_Sel"
                        data-target="#step2"
                        data-bs-toggle="tab"
                        ng-click="lastOrCheckin('LM')"
                      >
                        Last Minute
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-2 col-sm-4 form-group">
                    <label className="valuefor_txt">Results</label>
                    <select
                      className="selectpicker form-control form-control-sm show-menu-arrow setfonts color_set_1 bs-select-hidden ng-pristine ng-untouched ng-valid ng-not-empty"
                      ng-model="Limit"
                      data-live-search="true"
                    >
                      <option value />
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                      <option value={75}>75</option>
                      <option value={100}>100</option>
                      <option value={150}>150</option>
                      <option value={200}>200</option>
                    </select>
                  </div>
                  <div className="col-md-2 col-sm-4 form-group">
                    <label className="valuefor_txt">Show Data Regarding</label>
                    <select
                      className="selectpicker form-control form-control-sm show-menu-arrow setfonts color_set_1 bs-select-hidden select_reset ng-pristine ng-untouched ng-valid ng-not-empty"
                      ng-change="show_row(item)"
                      ng-model="item"
                      data-live-search="true"
                    >
                      {/* ngRepeat: item in items */}
                      <option
                        value="Offer Type Code"
                        ng-repeat="item in items"
                        className="ng-binding ng-scope"
                      >
                        Offer Type Code
                      </option>
                      {/* end ngRepeat: item in items */}
                      <option
                        value="Value"
                        ng-repeat="item in items"
                        className="ng-binding ng-scope"
                      >
                        Value
                      </option>
                      {/* end ngRepeat: item in items */}
                      <option
                        value="Compulsory"
                        ng-repeat="item in items"
                        className="ng-binding ng-scope"
                      >
                        Compulsory
                      </option>
                      {/* end ngRepeat: item in items */}
                      <option
                        value="Market Profile"
                        ng-repeat="item in items"
                        className="ng-binding ng-scope"
                      >
                        Market Profile
                      </option>
                      {/* end ngRepeat: item in items */}
                      <option
                        value="Nationality"
                        ng-repeat="item in items"
                        className="ng-binding ng-scope"
                      >
                        Nationality
                      </option>
                      {/* end ngRepeat: item in items */}
                      <option
                        value="Exclude Nationality"
                        ng-repeat="item in items"
                        className="ng-binding ng-scope"
                      >
                        Exclude Nationality
                      </option>
                      {/* end ngRepeat: item in items */}
                      <option
                        value="Hotel Name"
                        ng-repeat="item in items"
                        className="ng-binding ng-scope"
                      >
                        Hotel Name
                      </option>
                      {/* end ngRepeat: item in items */}
                      <option
                        value="Inventory Category"
                        ng-repeat="item in items"
                        className="ng-binding ng-scope"
                      >
                        Inventory Category
                      </option>
                      {/* end ngRepeat: item in items */}
                      <option
                        value="Room Category"
                        ng-repeat="item in items"
                        className="ng-binding ng-scope"
                      >
                        Room Category
                      </option>
                      {/* end ngRepeat: item in items */}
                      <option
                        value="Room/Meal Basis"
                        ng-repeat="item in items"
                        className="ng-binding ng-scope"
                      >
                        Room/Meal Basis
                      </option>
                      {/* end ngRepeat: item in items */}
                      <option
                        value="Booking From-To"
                        ng-repeat="item in items"
                        className="ng-binding ng-scope"
                      >
                        Booking From-To
                      </option>
                      {/* end ngRepeat: item in items */}
                      <option
                        value="Checkin From-To"
                        ng-repeat="item in items"
                        className="ng-binding ng-scope"
                      >
                        Checkin From-To
                      </option>
                      {/* end ngRepeat: item in items */}
                      <option
                        value="Checkin Before"
                        ng-repeat="item in items"
                        className="ng-binding ng-scope"
                      >
                        Checkin Before
                      </option>
                      {/* end ngRepeat: item in items */}
                      <option
                        value="Offer Only For"
                        ng-repeat="item in items"
                        className="ng-binding ng-scope"
                      >
                        Offer Only For
                      </option>
                      {/* end ngRepeat: item in items */}
                      <option
                        value="Is Refundable"
                        ng-repeat="item in items"
                        className="ng-binding ng-scope"
                      >
                        Is Refundable
                      </option>
                      {/* end ngRepeat: item in items */}
                      <option
                        value="Last Minute Offer"
                        ng-repeat="item in items"
                        className="ng-binding ng-scope"
                      >
                        Last Minute Offer
                      </option>
                      {/* end ngRepeat: item in items */}
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 col-sm-12 form-group mobilefix001">
                    <button
                      type="button"
                      className="btn btn-primary"
                      name="search_button"
                      value="Search"
                      ng-click="search();"
                    >
                      <i className="fa fa-search" />
                      &nbsp;Search
                    </button>
                    <button
                      className="btn btn-outline-secondary mx-1"
                      ng-click="reset();"
                    >
                      <i className="fa fa-repeat" />
                      &nbsp;Reset All
                    </button>
                    <Link
                      to="hotelInventoryappcreateoffer.html"
                      className="btn btn-primary pull-right mobilefix002"
                      style={{ float: "right" }}
                    >
                      <i className="fa fa-plus" />
                      &nbsp;Add New Offer/Discount Details
                    </Link>
                  </div>
                </div>
                <div
                  className="row view-pager"
                  ng-show="searchResult.length > 0"
                >
                  <div className="col-md-2">
                    <div className="text-left mt-2">
                      <button
                        className="btn btn-default btn-danger"
                        ng-click="DeleteMultipleOffer()"
                      >
                        <span>Delete Offer</span>
                      </button>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="text-center">
                      <nav aria-label="Page navigation example">
                        <ul className="pagination pagination-sm justify-content-center">
                          <li className="page-item">
                            <Link className="page-link" to="#">
                              First
                            </Link>
                          </li>
                          <li className="page-item">
                            <Link className="page-link" to="#">
                              Previous
                            </Link>
                          </li>
                          <li className="page-item active">
                            <Link className="page-link" to="#">
                              1
                            </Link>
                          </li>
                          <li className="page-item">
                            <Link className="page-link" to="#">
                              Next
                            </Link>
                          </li>
                          <li className="page-item">
                            <Link className="page-link" to="#">
                              Last
                            </Link>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="text-right margin-top" />
                  </div>
                </div>
                <div className="row" ng-show="searchResult.length > 0">
                  <div className="col-md-12">
                    <div className="panel-body1">
                      <div className="table-responsive offer_table">
                        <div
                          id="searchApplicableOffer_wrapper"
                          className="dataTables_wrapper form-inline dt-bootstrap no-footer"
                        >
                          <div className="row">
                            <div className="col-sm-6" />
                            <div className="col-sm-6" />
                          </div>
                          <div className="row">
                            <div className="col-sm-12">
                              <table
                                className="table   table-bordered text-center dataTable no-footer"
                                id="searchApplicableOffer"
                                role="grid"
                                style={{ width: "1532px" }}
                              >
                                <thead className="text-center">
                                  <tr
                                    className="bg-primary text-center"
                                    role="row"
                                  >
                                    <th
                                      className="no-sort sorting_disabled"
                                      rowSpan={1}
                                      colSpan={1}
                                      aria-label="
                                          
                                             
                                             &nbsp;
                                          
                                      "
                                      style={{ width: "72.4px" }}
                                    >
                                      <div className="checkbox checkbox-primary searchOfferCheckBoxAlignment">
                                        <input
                                          ng-click="searchOfferSelectAll();"
                                          type="checkbox"
                                          className="styled styled-primary selectAllSearchOffer"
                                        />
                                        <label>&nbsp;</label>
                                      </div>
                                    </th>
                                    <th
                                      ng-show="showColumnsContent.ShowOfferTypeCode"
                                      className="sorting"
                                      tabIndex={0}
                                      aria-controls="searchApplicableOffer"
                                      rowSpan={1}
                                      colSpan={1}
                                      aria-label="Offer Type Code: activate to sort column ascending"
                                      style={{ width: "70.4px" }}
                                    >
                                      Offer Type Code
                                    </th>
                                    <th
                                      ng-show="showColumnsContent.ShowOfferValue"
                                      className="sorting"
                                      tabIndex={0}
                                      aria-controls="searchApplicableOffer"
                                      rowSpan={1}
                                      colSpan={1}
                                      aria-label="Value: activate to sort column ascending"
                                      style={{ width: "70.4px" }}
                                    >
                                      Value
                                    </th>
                                    <th
                                      ng-show="showColumnsContent.ShowOfferIsCompulsory"
                                      ng-if="ShowIsCompulsory"
                                      className="ng-scope sorting"
                                      tabIndex={0}
                                      aria-controls="searchApplicableOffer"
                                      rowSpan={1}
                                      colSpan={1}
                                      aria-label="Compulsory: activate to sort column ascending"
                                      style={{ width: "70.4px" }}
                                    >
                                      Compulsory
                                    </th>
                                    <th
                                      ng-show="showColumnsContent.ShowMarketProfile"
                                      className="sorting"
                                      tabIndex={0}
                                      aria-controls="searchApplicableOffer"
                                      rowSpan={1}
                                      colSpan={1}
                                      aria-label="Market Profile: activate to sort column ascending"
                                      style={{ width: "70.4px" }}
                                    >
                                      Market Profile
                                    </th>
                                    <th
                                      ng-show="showColumnsContent.ShowNationality"
                                      className="sorting"
                                      tabIndex={0}
                                      aria-controls="searchApplicableOffer"
                                      rowSpan={1}
                                      colSpan={1}
                                      aria-label="Nationality: activate to sort column ascending"
                                      style={{ width: "70.4px" }}
                                    >
                                      Nationality
                                    </th>
                                    <th
                                      ng-show="showColumnsContent.ShowExcludeNationality"
                                      className="sorting"
                                      tabIndex={0}
                                      aria-controls="searchApplicableOffer"
                                      rowSpan={1}
                                      colSpan={1}
                                      aria-label="Exclude Nationality: activate to sort column ascending"
                                      style={{ width: "70.4px" }}
                                    >
                                      Exclude Nationality
                                    </th>
                                    <th
                                      ng-show="showColumnsContent.ShowHotelName"
                                      className="sorting"
                                      tabIndex={0}
                                      aria-controls="searchApplicableOffer"
                                      rowSpan={1}
                                      colSpan={1}
                                      aria-label="Hotel Name: activate to sort column ascending"
                                      style={{ width: "70.4px" }}
                                    >
                                      Hotel Name
                                    </th>
                                    <th
                                      ng-show="showColumnsContent.ShowInventoryCategory"
                                      className="sorting"
                                      tabIndex={0}
                                      aria-controls="searchApplicableOffer"
                                      rowSpan={1}
                                      colSpan={1}
                                      aria-label="Inventory Category: activate to sort column ascending"
                                      style={{ width: "70.4px" }}
                                    >
                                      Inventory Category
                                    </th>
                                    <th
                                      ng-show="showColumnsContent.ShowRoomCategory"
                                      className="sorting"
                                      tabIndex={0}
                                      aria-controls="searchApplicableOffer"
                                      rowSpan={1}
                                      colSpan={1}
                                      aria-label="Room Category: activate to sort column ascending"
                                      style={{ width: "70.4px" }}
                                    >
                                      Room Category
                                    </th>
                                    <th
                                      ng-show="showColumnsContent.ShowMealBasis"
                                      className="sorting"
                                      tabIndex={0}
                                      aria-controls="searchApplicableOffer"
                                      rowSpan={1}
                                      colSpan={1}
                                      aria-label="Room/Meal Basis: activate to sort column ascending"
                                      style={{ width: "70.4px" }}
                                    >
                                      Room/Meal Basis
                                    </th>
                                    <th
                                      ng-show="showColumnsContent.ShowBookingFromTo"
                                      className="sorting"
                                      tabIndex={0}
                                      aria-controls="searchApplicableOffer"
                                      rowSpan={1}
                                      colSpan={1}
                                      aria-label="Booking From - To: activate to sort column ascending"
                                      style={{ width: "70.4px" }}
                                    >
                                      Booking From - To
                                    </th>
                                    <th
                                      ng-show="showColumnsContent.ShowCheckinFrom"
                                      className="sorting"
                                      tabIndex={0}
                                      aria-controls="searchApplicableOffer"
                                      rowSpan={1}
                                      colSpan={1}
                                      aria-label="Check In From - To: activate to sort column ascending"
                                      style={{ width: "70.4px" }}
                                    >
                                      Check In From - To
                                    </th>
                                    <th
                                      ng-show="showColumnsContent.ShowCheckinBefore"
                                      className="sorting"
                                      tabIndex={0}
                                      aria-controls="searchApplicableOffer"
                                      rowSpan={1}
                                      colSpan={1}
                                      aria-label="Checkin Before: activate to sort column ascending"
                                      style={{ width: "70.4px" }}
                                    >
                                      Checkin Before
                                    </th>
                                    <th
                                      ng-show="showColumnsContent.ShowLastMinuteOffer && LastMintueOffer"
                                      className="ng-hide sorting"
                                      tabIndex={0}
                                      aria-controls="searchApplicableOffer"
                                      rowSpan={1}
                                      colSpan={1}
                                      aria-label="Last Minute: activate to sort column ascending"
                                      style={{ width: "0px" }}
                                    >
                                      Last Minute
                                    </th>
                                    <th
                                      ng-show="showColumnsContent.ShowOfferOnlyFor"
                                      className="sorting"
                                      tabIndex={0}
                                      aria-controls="searchApplicableOffer"
                                      rowSpan={1}
                                      colSpan={1}
                                      aria-label="Offer Only For: activate to sort column ascending"
                                      style={{ width: "70.4px" }}
                                    >
                                      Offer Only For
                                    </th>
                                    <th
                                      ng-show="showColumnsContent.ShowIsRefundable"
                                      className="sorting"
                                      tabIndex={0}
                                      aria-controls="searchApplicableOffer"
                                      rowSpan={1}
                                      colSpan={1}
                                      aria-label="Is Refundable: activate to sort column ascending"
                                      style={{ width: "70.4px" }}
                                    >
                                      Is Refundable
                                    </th>
                                    <th
                                      width="10%"
                                      className="Ipad01 no-sort sorting_disabled"
                                      rowSpan={1}
                                      colSpan={1}
                                      aria-label="Action"
                                      style={{ width: "70.4px" }}
                                    >
                                      Action
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="bg-white">
                                  {/* ngRepeat: x in searchResult */}
                                  {/* end ngRepeat: x in searchResult */}
                                  {/* end ngRepeat: x in searchResult */}
                                  <tr
                                    ng-repeat="x in searchResult"
                                    className="ng-scope odd"
                                    role="row"
                                  >
                                    <td className="searchOfferCheckBox">
                                      <div className="checkbox checkbox-primary searchOfferCheckBoxAlignment">
                                        <input
                                          type="checkbox"
                                          className="styled styled-primary searchOffer"
                                          data-value={6}
                                        />
                                        <label>&nbsp;</label>
                                      </div>
                                    </td>
                                    <td
                                      ng-show="showColumnsContent.ShowOfferTypeCode"
                                      className="ng-binding"
                                    >
                                      Discount(test20percent)
                                    </td>
                                    <td
                                      ng-show="showColumnsContent.ShowOfferValue"
                                      className="ng-binding"
                                    >
                                      20&nbsp;
                                    </td>
                                    {/* ngIf: ShowIsCompulsory */}
                                    <td
                                      ng-show="showColumnsContent.ShowOfferIsCompulsory"
                                      ng-if="ShowIsCompulsory"
                                      className="ng-binding ng-scope"
                                    >
                                      No
                                    </td>
                                    {/* end ngIf: ShowIsCompulsory */}
                                    <td
                                      ng-show="showColumnsContent.ShowMarketProfile"
                                      className="ng-binding"
                                    >
                                      ---
                                    </td>
                                    <td
                                      ng-show="showColumnsContent.ShowNationality"
                                      className="ng-binding"
                                    >
                                      ---
                                    </td>
                                    <td
                                      ng-show="showColumnsContent.ShowExcludeNationality"
                                      className="ng-binding"
                                    >
                                      ---
                                    </td>
                                    <td
                                      ng-show="showColumnsContent.ShowHotelName"
                                      className="ng-binding"
                                    />
                                    <td
                                      ng-show="showColumnsContent.ShowInventoryCategory"
                                      className="ng-binding"
                                    >
                                      Classic Suite,Standard ER
                                    </td>
                                    <td
                                      ng-show="showColumnsContent.ShowRoomCategory"
                                      className="ng-binding"
                                    >
                                      ---
                                    </td>
                                    <td
                                      ng-show="showColumnsContent.ShowMealBasis"
                                      className="ng-binding"
                                    >
                                      Half Board,Breakfast,ULTRA
                                      All,Superior,Bed &amp;amp;
                                      Breakfast,Breakfast and dinner,buffet
                                      breakfast,Breakfast Included
                                    </td>
                                    <td
                                      ng-show="showColumnsContent.ShowBookingFromTo"
                                      className="ng-binding"
                                    >
                                      -&nbsp;-&nbsp;-
                                    </td>
                                    <td
                                      ng-show="showColumnsContent.ShowCheckinFrom"
                                      className="ng-binding"
                                    >
                                      17-Aug-2019&nbsp;-&nbsp;01-Sep-2019
                                    </td>
                                    <td
                                      ng-show="showColumnsContent.ShowCheckinBefore"
                                      className="ng-binding"
                                    >
                                      ---
                                    </td>
                                    <td
                                      ng-show="showColumnsContent.ShowLastMinuteOffer && LastMintueOffer"
                                      className="ng-binding ng-hide"
                                    >
                                      ---
                                    </td>
                                    <td
                                      ng-show="showColumnsContent.ShowOfferOnlyFor"
                                      className="ng-binding"
                                    >
                                      All
                                    </td>
                                    <td
                                      ng-show="showColumnsContent.ShowIsRefundable"
                                      className="ng-binding"
                                    >
                                      Yes
                                    </td>
                                    <td>
                                      <div className="width_100 viewOfferToolTip">
                                        <Link
                                          type="button"
                                          data-toggle="tooltip"
                                          data-placement="top"
                                          title
                                          data-original-title="Edit"
                                          className="btn btn-warning btn-xs ng-scope"
                                          to={
                                            Constants.URLConstants
                                              .HOTELINVENTORYAPPEDITOFFER
                                          }
                                        >
                                          <i
                                            className="fa fa-pencil-square-o"
                                            style={{ color: "#fff" }}
                                          />
                                        </Link>
                                        <Link
                                          data-toggle="tooltip"
                                          data-placement="top"
                                          title
                                          ng-click="delete_offer(x.aoid)"
                                          data-original-title="Delete"
                                          className="btn btn-danger btn-xs ng-scope"
                                          type="button"
                                        >
                                          <i className="fa fa-trash" />
                                        </Link>
                                        <Link
                                          style={{ marginTop: "6px" }}
                                          ng-click="change_offer_status(x.aoid,x.status)"
                                          ng-show="x.status=='A'"
                                          data-original-title="Delete"
                                          className="btn btn-xs btn-success ng-scope"
                                          type="button"
                                        >
                                          <i
                                            className="fa fa-check"
                                            aria-hidden="true"
                                          />
                                        </Link>
                                        <Link
                                          ng-click="change_offer_status(x.aoid,x.status)"
                                          ng-show="x.status=='I'"
                                          data-original-title="Delete"
                                          className="btn btn-xs btn-danger ng-scope ng-hide"
                                          type="button"
                                        >
                                          <i
                                            className="fa fa-check"
                                            aria-hidden="true"
                                          />
                                        </Link>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr
                                    ng-repeat="x in searchResult"
                                    className="ng-scope even"
                                    role="row"
                                  >
                                    <td className="searchOfferCheckBox">
                                      <div className="checkbox checkbox-primary searchOfferCheckBoxAlignment">
                                        <input
                                          type="checkbox"
                                          className="styled styled-primary searchOffer"
                                          data-value={3}
                                        />
                                        <label>&nbsp;</label>
                                      </div>
                                    </td>
                                    <td
                                      ng-show="showColumnsContent.ShowOfferTypeCode"
                                      className="ng-binding"
                                    >
                                      Promotion(1233)
                                    </td>
                                    <td
                                      ng-show="showColumnsContent.ShowOfferValue"
                                      className="ng-binding"
                                    >
                                      -&nbsp;
                                    </td>
                                    {/* ngIf: ShowIsCompulsory */}
                                    <td
                                      ng-show="showColumnsContent.ShowOfferIsCompulsory"
                                      ng-if="ShowIsCompulsory"
                                      className="ng-binding ng-scope"
                                    >
                                      No
                                    </td>
                                    {/* end ngIf: ShowIsCompulsory */}
                                    <td
                                      ng-show="showColumnsContent.ShowMarketProfile"
                                      className="ng-binding"
                                    >
                                      ---
                                    </td>
                                    <td
                                      ng-show="showColumnsContent.ShowNationality"
                                      className="ng-binding"
                                    >
                                      India
                                    </td>
                                    <td
                                      ng-show="showColumnsContent.ShowExcludeNationality"
                                      className="ng-binding"
                                    >
                                      ---
                                    </td>
                                    <td
                                      ng-show="showColumnsContent.ShowHotelName"
                                      className="ng-binding"
                                    >
                                      Monkey Mia Dolphin Resort
                                    </td>
                                    <td
                                      ng-show="showColumnsContent.ShowInventoryCategory"
                                      className="ng-binding"
                                    >
                                      Classic,Classic
                                      Suite,Deluxe,Executive,Premium,Premiunm,Royal,Standard,Standard
                                      ER,StandardTest,Super Deluxe
                                    </td>
                                    <td
                                      ng-show="showColumnsContent.ShowRoomCategory"
                                      className="ng-binding"
                                    >
                                      ---
                                    </td>
                                    <td
                                      ng-show="showColumnsContent.ShowMealBasis"
                                      className="ng-binding"
                                    >
                                      Half Board,Breakfast,ULTRA
                                      All,Superior,Bed &amp;amp;
                                      Breakfast,Breakfast and dinner,buffet
                                      breakfast,Breakfast Included,BB
                                    </td>
                                    <td
                                      ng-show="showColumnsContent.ShowBookingFromTo"
                                      className="ng-binding"
                                    >
                                      26-Jun-2019&nbsp;-&nbsp;31-Jul-2019
                                    </td>
                                    <td
                                      ng-show="showColumnsContent.ShowCheckinFrom"
                                      className="ng-binding"
                                    >
                                      01-Jul-2019&nbsp;-&nbsp;31-Aug-2019
                                    </td>
                                    <td
                                      ng-show="showColumnsContent.ShowCheckinBefore"
                                      className="ng-binding"
                                    >
                                      1 days
                                    </td>
                                    <td
                                      ng-show="showColumnsContent.ShowLastMinuteOffer && LastMintueOffer"
                                      className="ng-binding ng-hide"
                                    >
                                      ---
                                    </td>
                                    <td
                                      ng-show="showColumnsContent.ShowOfferOnlyFor"
                                      className="ng-binding"
                                    >
                                      All
                                    </td>
                                    <td
                                      ng-show="showColumnsContent.ShowIsRefundable"
                                      className="ng-binding"
                                    >
                                      Yes
                                    </td>
                                    <td>
                                      <div className="width_100 viewOfferToolTip">
                                        {/* tooltips: */}
                                        <Link
                                          type="button"
                                          data-toggle="tooltip"
                                          data-placement="top"
                                          title
                                          data-original-title="Edit"
                                          className="btn btn-warning btn-xs ng-scope"
                                          to={
                                            Constants.URLConstants
                                              .HOTELINVENTORYAPPEDITOFFER
                                          }
                                        >
                                          <i
                                            className="fa fa-pencil-square-o"
                                            style={{ color: "#fff" }}
                                          />
                                        </Link>
                                        <Link
                                          data-toggle="tooltip"
                                          data-placement="top"
                                          title
                                          ng-click="delete_offer(x.aoid)"
                                          data-original-title="Delete"
                                          className="btn btn-danger btn-xs ng-scope"
                                          type="button"
                                        >
                                          <i className="fa fa-trash" />
                                        </Link>
                                        <Link
                                          style={{ marginTop: "6px" }}
                                          ng-click="change_offer_status(x.aoid,x.status)"
                                          ng-show="x.status=='A'"
                                          data-original-title="Delete"
                                          className="btn btn-xs btn-success ng-scope"
                                          type="button"
                                        >
                                          <i
                                            className="fa fa-check"
                                            aria-hidden="true"
                                          />
                                        </Link>
                                        <Link
                                          ng-click="change_offer_status(x.aoid,x.status)"
                                          ng-show="x.status=='I'"
                                          data-original-title="Delete"
                                          className="btn btn-xs btn-danger ng-scope ng-hide"
                                          type="button"
                                        >
                                          <i
                                            className="fa fa-check"
                                            aria-hidden="true"
                                          />
                                        </Link>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-5" />
                            <div className="col-sm-7" />
                          </div>
                        </div>
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
              '\n        #sizing li a {\n            font-size: 12px;\n            color: #34495e;\n        }\n\n\n        .btn-primary {\n            background-color: #34495e;\n            border-color: #34495e;\n            color: #FFFFFF;\n            font-size: 13px;\n\n        }\n\n        .btn-primary:hover {\n            background-color: #3f5872 !important;\n            border-color: #3f5872 !important;\n            color: #FFFFFF !important;\n            outline: none !important;\n        }\n\n        .ng-hide {\n            display: none;\n        }\n\n        .h-bg-navy-blue {\n            background: #34495e;\n        }\n\n        .adddates {\n            background: #74D348;\n            color: white;\n        }\n\n        .adddates:hover {\n            background: #74D348;\n        }\n\n        .bootstrap-select.show-menu-arrow.open>.dropdown-toggle,\n        .bootstrap-select.show-menu-arrow.show>.dropdown-toggle {\n            z-index: 1;\n        }\n\n   \n\n        th {\n            text-align: left !important;\n            width: 200px;\n            vertical-align: middle !important;\n            text-transform: uppercase;\n            font-size: 12px;\n\n        }\n\n        td {\n            background-color: #FFFFFF !important;\n        }\n\n        #voucherStartdatepicker {\n            background-color: white;\n        }\n\n        #voucherEndDatepicker {\n            background-color: white;\n        }\n\n\n\n\n        .breadcrumb {\n            font-weight: 500 !important;\n            font-size: 12px;\n            text-transform: uppercase;\n            list-style: none;\n            padding-left: 12px;\n\n        }\n\n\n\n\n\n        .breadcrumb li {\n            display: inline-block;\n            margin-bottom: .2em;\n        }\n\n        .breadcrumb li a {\n            background-color: #34495e;\n            box-sizing: border-box;\n            color: #fff;\n            display: block;\n            max-height: 2em;\n            padding: .5em 1em .5em 1.5em;\n            position: relative;\n            text-decoration: none;\n            transition: .25s;\n        }\n\n        .breadcrumb li.active a {\n            background-color: #62cb31;\n            box-sizing: border-box;\n            color: #fff;\n            display: block;\n            max-height: 2em;\n            padding: .5em 1em .5em 1.5em;\n            position: relative;\n            text-decoration: none;\n            transition: .25s;\n        }\n\n        .breadcrumb li.active a::after {\n            border-top: 1em solid transparent;\n            border-bottom: 1em solid transparent;\n            border-left: 1em solid #62cb31;\n            content: "";\n            position: absolute;\n            top: 0;\n            right: -1em;\n            transition: .25s;\n            z-index: 1;\n        }\n\n\n        .breadcrumb li a:before {\n            border-top: 1em solid transparent;\n            border-bottom: 1em solid transparent;\n            border-left: 1em solid #fff;\n            content: "";\n            position: absolute;\n            top: 0;\n            right: -1.25em;\n            z-index: 1;\n        }\n\n        .breadcrumb li a:after {\n            border-top: 1em solid transparent;\n            border-bottom: 1em solid transparent;\n            border-left: 1em solid #34495e;\n            content: "";\n            position: absolute;\n            top: 0;\n            right: -1em;\n            transition: .25s;\n            z-index: 1;\n        }\n\n        .breadcrumb li a:hover {\n            background-color: #3f5872;\n        }\n\n        .breadcrumb li.active a:hover {\n            background-color: #74d348;\n        }\n\n        .breadcrumb li.active a:hover:after {\n            border-left-color: #74d348;\n        }\n\n\n        .breadcrumb li a:hover:after {\n            border-left-color: #3f5872;\n        }\n\n        .gapBigMe {\n            padding: 0px 10px;\n        }\n\n        .suppliment-box-01 {\n            margin: 0px 0px 20px 0px;\n            padding: 0px 15px;\n            width: 16%;\n            float: left;\n        }\n\n        .manage-supp-box-01 {\n            width: 45%;\n            float: left;\n            margin: 0px;\n            padding: 0px;\n        }\n\n        .manage-supp-box-02 {\n            width: 10%;\n            float: left;\n            margin: 0px;\n            padding: 0px;\n        }\n\n        .manage-supp-box-03 {\n            width: 45%;\n            float: left;\n            margin: 0px;\n            padding: 0px;\n        }\n\n        .suppliment-box-05 {\n            margin: 0px 0px 20px 0px;\n            padding: 0px 15px;\n            width: 15%;\n            float: left;\n        }\n\n        .suppliment-box-02 {\n            margin: 0px 0px 20px 0px;\n            padding: 0px 15px;\n            width: 35%;\n            float: left;\n        }\n\n        .suppliment-box-03 {\n            margin: 0px 0px 20px 0px;\n            padding: 0px 15px;\n            width: 10%;\n            float: left;\n        }\n\n        label {\n            font-weight: 400;\n        }\n\n        .bg-green {\n            background-color: #E0EFD8;\n        }\n\n        .table-bordered {\n            border: 1px solid #ddd;\n        }\n\n        thead {\n            text-transform: uppercase;\n            font-family: Roboto;\n            font-weight: 900;\n            font-size: 13px;\n            color: #5d6974;\n        }\n\n        .table label,\n        .table {\n            font-family: "MONTSERRAT";\n            font-size: 11px !important;\n        }\n\n        .form-control[disabled],\n        fieldset[disabled] {\n            cursor: not-allowed;\n            background-color: #eee !important;\n            opacity: 1;\n        }\n\n        .>tbody>tr:nth-of-type(odd) {\n            background-color: #f9f9f9;\n        }\n\n        .table>tbody>tr>td {\n            font-size: 9pt !important;\n            vertical-align: middle;\n            font-family: "Arial";\n            padding: 8px;\n            text-transform: capitalize !important;\n            text-align: left !important;\n\n\n\n        }\n\n        .form-control:disabled,\n        .form-control[readonly] {\n            background-color: white;\n            opacity: 1;\n            cursor: not-allowed;\n        }\n\n        .upload-btn {\n            font-family: \'Roboto\', sans-serif !important;\n            font-size: 17px;\n            font-weight: 700 !important;\n            color: #ffffff !important;\n            margin: 0px 0px 0px 0px;\n            padding: 6px 8px;\n            background: #3498db;\n            border-radius: 3px;\n            border: #3498db solid 1px;\n            text-align: center;\n        }\n\n        .upload-btn:hover,\n        .upload-btn:focus {\n            background: #4ea5e0;\n            color: #ffffff !important;\n            border-radius: 3px;\n            border: #4ea5e0 solid 1px;\n        }\n\n        .btn {\n            font-size: 12px;\n\n        }\n        .bg-primary {\n    color: #fff;\n    background-color: #3f5872 !important;\n}\nth {\n    min-width: 90px;\n    font-size: 9px ! important;\n    padding-right: 10px;\n    text-align: center !important;\n}\n\n#searchApplicableOffer tr th {\n    padding: 8px;\n}\n.table .checkbox {\n    margin: 3px 10px;\n}\n. > tbody > tr:nth-of-type(odd) {\n    background-color: #f9f9f9;\n}\n\n.odd {\n    background-color: #ececec !important;\n}\n#searchApplicableOffer tr td {\n    cursor: pointer;\n    padding: 8px;\n}\n.Viewoffer .table > tbody > tr > td {\n    max-width: 52px;\n    word-wrap: break-word;\n}\n.viewOfferToolTip tooltip {\n    float: left;\n    margin-top: 5px;\n    margin-right: 4px;\n}\n\ntooltip {\n    display: inline-block;\n    position: relative;\n}\n.btn-xs {\n    padding-left: 6px;\n    padding-right: 6px;\n}\n.btn-xs {\n    border-radius: 3px;\n    font-size: 11px;\n    line-height: 1.5;\n    padding: 1px 7px;\n}\n.btn-warning {\n    background-color: #ffb606;\n    border-color: #ffb606;\n    color: #FFFFFF;\n}\n\n    ',
          }}
        />
      </div>
    </>
  );
};
export default HotelInventoryAppSearchOffer;
