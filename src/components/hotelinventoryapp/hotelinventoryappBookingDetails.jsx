import React, { useEffect } from "react";
import logo from "../../assets/images/logo.png";
import userlogo from "../../assets/images/user.png";
import bellico from "../../assets/images/bellIco.png";
import { Link } from "react-router-dom";
import Constants from "../../constants/routes";

const HotelInventoryAppBookingDetails = ({ setShowHeaderAndMenuBar }) => {
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
                <div className="col-md-3">
                  <h5
                    style={{
                      fontSize: "30px",
                      fontWeight: 700,
                      margin: "0px",
                      padding: "0px",
                      textTransform: "uppercase",
                    }}
                  >
                    BOOKING DETAILS
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
            <form
              style={{ borderTop: "2px solid #62cb31", paddingTop: "12px" }}
            >
              <div className="row">
                <div className="col-md-2 col-sm-4 form-group">
                  <label>Booking Id</label>
                  <input
                    type="text"
                    className="form-control form-control-sm ng-pristine ng-untouched ng-valid ng-empty"
                    ng-model="booking_code"
                    placeholder="Booking Id"
                  />
                </div>
                <div className="col-md-2 col-sm-4  col-xs-12 form-group">
                  <label>Hotel</label>
                  <select
                    id="hotelSelector"
                    className="required selectpicker form-control form-control-sm show-menu-arrow bs-select-hidden  ng-pristine ng-untouched ng-valid ng-empty"
                    data-container="body"
                    ng-model="hotel_id"
                    data-live-search="true"
                  >
                    <option value data-hidden="true">
                      Select Booked Hotel
                    </option>
                    {/* ngRepeat: x in hotels */}
                    <option
                      value={67301}
                      ng-repeat="x in hotels"
                      className="ng-binding ng-scope"
                    >
                      Alaaddin Hotel
                    </option>
                    {/* end ngRepeat: x in hotels */}
                    <option
                      value={67069}
                      ng-repeat="x in hotels"
                      className="ng-binding ng-scope"
                    >
                      Alfa Hotel
                    </option>
                    {/* end ngRepeat: x in hotels */}
                    <option
                      value={67123}
                      ng-repeat="x in hotels"
                      className="ng-binding ng-scope"
                    >
                      All Seasons Hotel
                    </option>
                    {/* end ngRepeat: x in hotels */}
                    <option
                      value={66914}
                      ng-repeat="x in hotels"
                      className="ng-binding ng-scope"
                    >
                      Ambassador Hotel
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
                      Village Hotel Katong
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
                      value={73174}
                      ng-repeat="x in hotels"
                      className="ng-binding ng-scope"
                    >
                      Pune Hotel
                    </option>
                    {/* end ngRepeat: x in hotels */}
                    <option
                      value={73152}
                      ng-repeat="x in hotels"
                      className="ng-binding ng-scope"
                    >
                      NagpurHotel1
                    </option>
                    {/* end ngRepeat: x in hotels */}
                    <option
                      value={73156}
                      ng-repeat="x in hotels"
                      className="ng-binding ng-scope"
                    >
                      NagpurHotel2
                    </option>
                    {/* end ngRepeat: x in hotels */}
                    <option
                      value={73157}
                      ng-repeat="x in hotels"
                      className="ng-binding ng-scope"
                    >
                      NagpurHotel3
                    </option>
                    {/* end ngRepeat: x in hotels */}
                    <option
                      value={73169}
                      ng-repeat="x in hotels"
                      className="ng-binding ng-scope"
                    >
                      NagpurTest
                    </option>
                    {/* end ngRepeat: x in hotels */}
                    <option
                      value={73165}
                      ng-repeat="x in hotels"
                      className="ng-binding ng-scope"
                    >
                      No_of_Night
                    </option>
                    {/* end ngRepeat: x in hotels */}
                    <option
                      value={73175}
                      ng-repeat="x in hotels"
                      className="ng-binding ng-scope"
                    >
                      Nagpur_Fit_Hotel
                    </option>
                    {/* end ngRepeat: x in hotels */}
                    <option
                      value={73184}
                      ng-repeat="x in hotels"
                      className="ng-binding ng-scope"
                    >
                      Burj Arab Dubai
                    </option>
                    {/* end ngRepeat: x in hotels */}
                    <option
                      value={73185}
                      ng-repeat="x in hotels"
                      className="ng-binding ng-scope"
                    >
                      Al Burj Khalifa
                    </option>
                    {/* end ngRepeat: x in hotels */}
                    <option
                      value={73158}
                      ng-repeat="x in hotels"
                      className="ng-binding ng-scope"
                    >
                      Gokul Hotel
                    </option>
                    {/* end ngRepeat: x in hotels */}
                    <option
                      value={73180}
                      ng-repeat="x in hotels"
                      className="ng-binding ng-scope"
                    >
                      Hotel Test
                    </option>
                    {/* end ngRepeat: x in hotels */}
                    <option
                      value={73160}
                      ng-repeat="x in hotels"
                      className="ng-binding ng-scope"
                    >
                      Hotel_AEDTest
                    </option>
                    {/* end ngRepeat: x in hotels */}
                    <option
                      value={73189}
                      ng-repeat="x in hotels"
                      className="ng-binding ng-scope"
                    >
                      Hotel_Check
                    </option>
                    {/* end ngRepeat: x in hotels */}
                    <option
                      value={73168}
                      ng-repeat="x in hotels"
                      className="ng-binding ng-scope"
                    >
                      Hotel_Client
                    </option>
                    {/* end ngRepeat: x in hotels */}
                    <option
                      value={73167}
                      ng-repeat="x in hotels"
                      className="ng-binding ng-scope"
                    >
                      Hotel_Test1
                    </option>
                    {/* end ngRepeat: x in hotels */}
                    <option
                      value={73190}
                      ng-repeat="x in hotels"
                      className="ng-binding ng-scope"
                    >
                      Hotel_Test_(Do Not Use)
                    </option>
                    {/* end ngRepeat: x in hotels */}
                    <option
                      value={73181}
                      ng-repeat="x in hotels"
                      className="ng-binding ng-scope"
                    >
                      Multiple_Supplier
                    </option>
                    {/* end ngRepeat: x in hotels */}
                    <option
                      value={73145}
                      ng-repeat="x in hotels"
                      className="ng-binding ng-scope"
                    >
                      NidaHotel1
                    </option>
                    {/* end ngRepeat: x in hotels */}
                    <option
                      value={73146}
                      ng-repeat="x in hotels"
                      className="ng-binding ng-scope"
                    >
                      NidaHotel2
                    </option>
                    {/* end ngRepeat: x in hotels */}
                    <option
                      value={73147}
                      ng-repeat="x in hotels"
                      className="ng-binding ng-scope"
                    >
                      NidaHotel3
                    </option>
                    {/* end ngRepeat: x in hotels */}
                    <option
                      value={73149}
                      ng-repeat="x in hotels"
                      className="ng-binding ng-scope"
                    >
                      SayaliHotel2
                    </option>
                    {/* end ngRepeat: x in hotels */}
                    <option
                      value={73177}
                      ng-repeat="x in hotels"
                      className="ng-binding ng-scope"
                    >
                      SayaliHotelMumbai_New2
                    </option>
                    {/* end ngRepeat: x in hotels */}
                    <option
                      value={73150}
                      ng-repeat="x in hotels"
                      className="ng-binding ng-scope"
                    >
                      SayaliHotelNew_1
                    </option>
                    {/* end ngRepeat: x in hotels */}
                    <option
                      value={73151}
                      ng-repeat="x in hotels"
                      className="ng-binding ng-scope"
                    >
                      SayaliHotelNew_2
                    </option>
                    {/* end ngRepeat: x in hotels */}
                    <option
                      value={73164}
                      ng-repeat="x in hotels"
                      className="ng-binding ng-scope"
                    >
                      SayaliLocalHotel
                    </option>
                    {/* end ngRepeat: x in hotels */}
                    <option
                      value={73173}
                      ng-repeat="x in hotels"
                      className="ng-binding ng-scope"
                    >
                      SayaliMumbaiHotelTest_New
                    </option>
                    {/* end ngRepeat: x in hotels */}
                    <option
                      value={73172}
                      ng-repeat="x in hotels"
                      className="ng-binding ng-scope"
                    >
                      SayaliMumbaiTestHotel
                    </option>
                    {/* end ngRepeat: x in hotels */}
                    <option
                      value={73170}
                      ng-repeat="x in hotels"
                      className="ng-binding ng-scope"
                    >
                      SayaliTESTHotel
                    </option>
                    {/* end ngRepeat: x in hotels */}
                    <option
                      value={73171}
                      ng-repeat="x in hotels"
                      className="ng-binding ng-scope"
                    >
                      SayaliTestHotel_2
                    </option>
                    {/* end ngRepeat: x in hotels */}
                    <option
                      value={73127}
                      ng-repeat="x in hotels"
                      className="ng-binding ng-scope"
                    >
                      Rate_gain_Test
                    </option>
                    {/* end ngRepeat: x in hotels */}
                    <option
                      value={73185}
                      ng-repeat="x in hotels"
                      className="ng-binding ng-scope"
                    >
                      Al Burj Khalifa
                    </option>
                    {/* end ngRepeat: x in hotels */}
                    <option
                      value={73184}
                      ng-repeat="x in hotels"
                      className="ng-binding ng-scope"
                    >
                      Burj Arab Dubai
                    </option>
                    {/* end ngRepeat: x in hotels */}
                    <option
                      value={73201}
                      ng-repeat="x in hotels"
                      className="ng-binding ng-scope"
                    >
                      Aqua
                    </option>
                    {/* end ngRepeat: x in hotels */}
                  </select>
                </div>
                <div className="col-md-2 col-sm-4 form-group">
                  <label>Booking Status</label>
                  <select
                    id="status"
                    className="selectpicker form-control form-control-sm show-menu-arrow setfonts color_set_1 bs-select-hidden ng-pristine ng-untouched ng-valid ng-empty"
                    ng-model="current_status"
                    data-live-search="true"
                  >
                    <option value data-hidden="true">
                      Select Booking Status
                    </option>
                    {/* ngRepeat: x in status */}
                    <option
                      value="confirmed"
                      ng-repeat="x in status"
                      className="ng-binding ng-scope"
                    >
                      Confirmed
                    </option>
                    {/* end ngRepeat: x in status */}
                    <option
                      value="on_request"
                      ng-repeat="x in status"
                      className="ng-binding ng-scope"
                    >
                      On Request
                    </option>
                    {/* end ngRepeat: x in status */}
                    <option
                      value="cancelled"
                      ng-repeat="x in status"
                      className="ng-binding ng-scope"
                    >
                      Cancelled
                    </option>
                    {/* end ngRepeat: x in status */}
                    <option
                      value="failed"
                      ng-repeat="x in status"
                      className="ng-binding ng-scope"
                    >
                      Failed
                    </option>
                    {/* end ngRepeat: x in status */}
                  </select>
                </div>
                <div className="col-md-3 col-sm-4 form-group">
                  <label>Service Date</label>
                  <div className="input-daterange input-group date col-md-12 col-sm-12 col-xs-12">
                    <input
                      type="text"
                      className="form-control "
                      id="serviceStartdatepicker"
                      name="check_in_from"
                    />
                    <span className="input-group-addon">to</span>
                    <input
                      type="text"
                      className="form-control"
                      id="serviceEndDatepicker"
                      name="check_in_to"
                    />
                    <span className="input-group-addon" id="sTrashBtn">
                      <i className="fa fa-trash" />
                    </span>
                  </div>
                </div>
                <div className="col-md-3 col-sm-4 form-group">
                  <label>Booking Date</label>
                  <div className="input-daterange input-group date col-md-12 col-sm-12 col-xs-12">
                    <input
                      type="text"
                      className="form-control"
                      id="bookingStartdatepicker"
                      name="check_in_from"
                    />
                    <span className="input-group-addon">to</span>
                    <input
                      type="text"
                      className="form-control "
                      id="bookingEndDatepicker"
                      name="check_in_to"
                    />
                    <span className="input-group-addon" id="bTrashBtn">
                      <i className="fa fa-trash" />
                    </span>
                  </div>
                </div>
                <div className="col-md-6" />
                <div className="col-md-2 col-sm-4 form-group">
                  <label>Leader Name</label>
                  <input
                    placeholder="Leader Name"
                    type="text"
                    className="form-control form-control-sm ng-pristine ng-untouched ng-valid ng-empty"
                    ng-model="leader_name"
                  />
                </div>
                <div className="col-md-2 col-sm-4 form-group mt-4">
                  <label>&nbsp;</label>
                  <Link
                    className="btn btn-sm btn-dark  extraTopMargin"
                    ng-click="Search_bookings();"
                  >
                    <b>Search Booking</b>
                  </Link>
                </div>
              </div>
            </form>
            {/*Pagination panel*/}
            <nav aria-label="Page navigation example">
              <ul className="pagination pagination-sm justify-content-center mt-5">
                <li className="page-item  active">
                  <Link className="page-link" to="#">
                    First
                  </Link>
                </li>
                <li className="page-item">
                  <Link className="page-link" to="#">
                    Previous
                  </Link>
                </li>
                <li className="page-item">
                  <Link className="page-link" to="#">
                    1
                  </Link>
                </li>
                <li className="page-item">
                  <Link className="page-link" to="#">
                    2
                  </Link>
                </li>
                <li className="page-item">
                  <Link className="page-link" to="#">
                    3
                  </Link>
                </li>
                <li className="page-item">
                  <Link className="page-link" to="#">
                    4
                  </Link>
                </li>
                <li className="page-item">
                  <Link className="page-link" to="#">
                    5
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
            <div className="row">
              <div className="col-md-12 col-sm-12">
                <div className="white-box-3" style={{ margin: "-6px 0 0" }}>
                  <div id="wrapDIV">
                    <div className="cities-green headTitle">
                      <span
                        className="labelTitle ng-binding"
                        style={{ width: "112px" }}
                      >
                        Bookings
                      </span>
                      <span className="labelImg imgWid">
                        <img src={bellico} alt="bell" />
                      </span>
                    </div>
                    <div
                      className="hotel-main-box"
                      ng-show="bookDetails.length > 0"
                    >
                      <div className="row form-group">
                        <div className="col-md-12 col-sm-12">
                          <div className="panel-body1 table-responsive">
                            <table className="table table-responsive  ">
                              <thead>
                                <tr>
                                  <th className="leade">Booking ID</th>
                                  <th width="11%">Status</th>
                                  <th width="25%">Hotel</th>
                                  <th className="leader">Leader</th>
                                  <th width="25%">Room Category</th>
                                  <th className="ser">Booking Date</th>
                                  <th className="ser">Service Date</th>
                                  <th className="last1">Amount</th>
                                </tr>
                              </thead>
                              <tbody className="bg-white">
                                {/* ngRepeat: x in bookDetails */}
                                <tr
                                  ng-model="bookingdet"
                                  ng-repeat="x in bookDetails"
                                  className="ng-pristine ng-untouched ng-valid ng-scope ng-empty"
                                >
                                  <td>
                                    <Link
                                      to="#booking_details/28986"
                                      className="ng-binding"
                                    >
                                      TD828986
                                    </Link>
                                  </td>
                                  <td>
                                    <span
                                      className="table_lbl ng-binding confirmed"
                                      ng-class="x.current_status"
                                    >
                                      CONFIRMED
                                    </span>
                                  </td>
                                  <td className="ng-binding">
                                    BURJ ARAB DUBAI
                                  </td>
                                  <td className="ng-binding">
                                    Mr Sssss Lllll x 1
                                  </td>
                                  <td className="ng-binding">
                                    Delux -Half Board : 1 Pax{" "}
                                  </td>
                                  <td className="service_date ng-binding">
                                    23-May-2022
                                  </td>
                                  <td className="service_date ng-binding">
                                    26-May-2022
                                  </td>
                                  <td className="ng-binding">USD 100.000</td>
                                </tr>
                                {/* end ngRepeat: x in bookDetails */}
                                <tr
                                  ng-model="bookingdet"
                                  ng-repeat="x in bookDetails"
                                  className="ng-pristine ng-untouched ng-valid ng-scope ng-empty"
                                >
                                  <td>
                                    <Link
                                      to="#booking_details/28985"
                                      className="ng-binding"
                                    >
                                      TD828985
                                    </Link>
                                  </td>
                                  <td>
                                    <span
                                      className="table_lbl ng-binding confirmed"
                                      ng-class="x.current_status"
                                    >
                                      CONFIRMED
                                    </span>
                                  </td>
                                  <td className="ng-binding">
                                    BURJ ARAB DUBAI
                                  </td>
                                  <td className="ng-binding">
                                    Mr Sssss Pppp x 3
                                  </td>
                                  <td className="ng-binding">
                                    Classic -Half Board : 3 Pax{" "}
                                  </td>
                                  <td className="service_date ng-binding">
                                    26-Apr-2022
                                  </td>
                                  <td className="service_date ng-binding">
                                    21-May-2022
                                  </td>
                                  <td className="ng-binding">USD 300.000</td>
                                </tr>
                                {/* end ngRepeat: x in bookDetails */}
                                <tr
                                  ng-model="bookingdet"
                                  ng-repeat="x in bookDetails"
                                  className="ng-pristine ng-untouched ng-valid ng-scope ng-empty"
                                >
                                  <td>
                                    <Link
                                      to="#booking_details/28916"
                                      className="ng-binding"
                                    >
                                      TD828916
                                    </Link>
                                  </td>
                                  <td>
                                    <span
                                      className="table_lbl ng-binding confirmed"
                                      ng-class="x.current_status"
                                    >
                                      CONFIRMED
                                    </span>
                                  </td>
                                  <td className="ng-binding">
                                    BURJ ARAB DUBAI
                                  </td>
                                  <td className="ng-binding">
                                    Mr Sssss Pppp x 2
                                  </td>
                                  <td className="ng-binding">
                                    Deluxe Superior -Breakfast : 2 Pax{" "}
                                  </td>
                                  <td className="service_date ng-binding">
                                    24-Dec-2021
                                  </td>
                                  <td className="service_date ng-binding">
                                    30-Dec-2021
                                  </td>
                                  <td className="ng-binding">USD 50.000</td>
                                </tr>
                                {/* end ngRepeat: x in bookDetails */}
                                <tr
                                  ng-model="bookingdet"
                                  ng-repeat="x in bookDetails"
                                  className="ng-pristine ng-untouched ng-valid ng-scope ng-empty"
                                >
                                  <td>
                                    <Link
                                      to="#booking_details/28886"
                                      className="ng-binding"
                                    >
                                      TD828886
                                    </Link>
                                  </td>
                                  <td>
                                    <span
                                      className="table_lbl ng-binding confirmed"
                                      ng-class="x.current_status"
                                    >
                                      CONFIRMED
                                    </span>
                                  </td>
                                  <td className="ng-binding">
                                    ABC Arabian Suites
                                  </td>
                                  <td className="ng-binding">
                                    Mr Rohan Vartak x 1
                                  </td>
                                  <td className="ng-binding">Single</td>
                                  <td className="service_date ng-binding">
                                    14-Oct-2021
                                  </td>
                                  <td className="service_date ng-binding">
                                    14-Oct-2021
                                  </td>
                                  <td className="ng-binding">USD 50.000</td>
                                </tr>
                                {/* end ngRepeat: x in bookDetails */}
                                <tr
                                  ng-model="bookingdet"
                                  ng-repeat="x in bookDetails"
                                  className="ng-pristine ng-untouched ng-valid ng-scope ng-empty"
                                >
                                  <td>
                                    <Link
                                      to="#booking_details/28807"
                                      className="ng-binding"
                                    >
                                      TD828807
                                    </Link>
                                  </td>
                                  <td>
                                    <span
                                      className="table_lbl ng-binding confirmed"
                                      ng-class="x.current_status"
                                    >
                                      CONFIRMED
                                    </span>
                                  </td>
                                  <td className="ng-binding">
                                    SAYALIHOTELNEW_1
                                  </td>
                                  <td className="ng-binding">
                                    Ms Ankita Testbooking x 2
                                  </td>
                                  <td className="ng-binding">
                                    Classic -Breakfast Included : 2 Pax{" "}
                                  </td>
                                  <td className="service_date ng-binding">
                                    02-Jun-2021
                                  </td>
                                  <td className="service_date ng-binding">
                                    23-Jun-2021
                                  </td>
                                  <td className="ng-binding">INR 100.000</td>
                                </tr>
                                {/* end ngRepeat: x in bookDetails */}
                                <tr
                                  ng-model="bookingdet"
                                  ng-repeat="x in bookDetails"
                                  className="ng-pristine ng-untouched ng-valid ng-scope ng-empty"
                                >
                                  <td>
                                    <Link
                                      to="#booking_details/28806"
                                      className="ng-binding"
                                    >
                                      TD828806
                                    </Link>
                                  </td>
                                  <td>
                                    <span
                                      className="table_lbl ng-binding confirmed"
                                      ng-class="x.current_status"
                                    >
                                      CONFIRMED
                                    </span>
                                  </td>
                                  <td className="ng-binding">
                                    SAYALIHOTELNEW_1
                                  </td>
                                  <td className="ng-binding">
                                    Ms Ankita Testbooking x 2
                                  </td>
                                  <td className="ng-binding">
                                    Classic -Breakfast Included : 2 Pax{" "}
                                  </td>
                                  <td className="service_date ng-binding">
                                    02-Jun-2021
                                  </td>
                                  <td className="service_date ng-binding">
                                    23-Jun-2021
                                  </td>
                                  <td className="ng-binding">INR 100.000</td>
                                </tr>
                                {/* end ngRepeat: x in bookDetails */}
                                <tr
                                  ng-model="bookingdet"
                                  ng-repeat="x in bookDetails"
                                  className="ng-pristine ng-untouched ng-valid ng-scope ng-empty"
                                >
                                  <td>
                                    <Link
                                      to="#booking_details/28774"
                                      className="ng-binding"
                                    >
                                      TD828774
                                    </Link>
                                  </td>
                                  <td>
                                    <span
                                      className="table_lbl ng-binding cancelled"
                                      ng-class="x.current_status"
                                    >
                                      CANCELLED
                                    </span>
                                  </td>
                                  <td className="ng-binding">
                                    SAYALIHOTELNEW_1
                                  </td>
                                  <td className="ng-binding">
                                    Ms Ankita Testbooking x 2
                                  </td>
                                  <td className="ng-binding">
                                    Classic -Breakfast Included : 2 Pax{" "}
                                  </td>
                                  <td className="service_date ng-binding">
                                    31-May-2021
                                  </td>
                                  <td className="service_date ng-binding">
                                    08-Jun-2021
                                  </td>
                                  <td className="ng-binding">INR 225.000</td>
                                </tr>
                                {/* end ngRepeat: x in bookDetails */}
                                <tr
                                  ng-model="bookingdet"
                                  ng-repeat="x in bookDetails"
                                  className="ng-pristine ng-untouched ng-valid ng-scope ng-empty"
                                >
                                  <td>
                                    <Link
                                      to="#booking_details/28582"
                                      className="ng-binding"
                                    >
                                      TD828582
                                    </Link>
                                  </td>
                                  <td>
                                    <span
                                      className="table_lbl ng-binding confirmed"
                                      ng-class="x.current_status"
                                    >
                                      CONFIRMED
                                    </span>
                                  </td>
                                  <td className="ng-binding">GOKUL HOTEL</td>
                                  <td className="ng-binding">
                                    Mr Sssss Pppp x 2
                                  </td>
                                  <td className="ng-binding">
                                    Classic -Half Board : 2 Pax{" "}
                                  </td>
                                  <td className="service_date ng-binding">
                                    17-May-2021
                                  </td>
                                  <td className="service_date ng-binding">
                                    21-May-2021
                                  </td>
                                  <td className="ng-binding">INR 100.000</td>
                                </tr>
                                {/* end ngRepeat: x in bookDetails */}
                                <tr
                                  ng-model="bookingdet"
                                  ng-repeat="x in bookDetails"
                                  className="ng-pristine ng-untouched ng-valid ng-scope ng-empty"
                                >
                                  <td>
                                    <Link
                                      to="#booking_details/28538"
                                      className="ng-binding"
                                    >
                                      TD828538
                                    </Link>
                                  </td>
                                  <td>
                                    <span
                                      className="table_lbl ng-binding confirmed"
                                      ng-class="x.current_status"
                                    >
                                      CONFIRMED
                                    </span>
                                  </td>
                                  <td className="ng-binding">GOKUL HOTEL</td>
                                  <td className="ng-binding">
                                    Mr Samiksha Qtech x 2
                                  </td>
                                  <td className="ng-binding">
                                    Classic -Half Board : 2 Pax{" "}
                                  </td>
                                  <td className="service_date ng-binding">
                                    13-May-2021
                                  </td>
                                  <td className="service_date ng-binding">
                                    28-May-2021
                                  </td>
                                  <td className="ng-binding">INR 100.000</td>
                                </tr>
                                {/* end ngRepeat: x in bookDetails */}
                                <tr
                                  ng-model="bookingdet"
                                  ng-repeat="x in bookDetails"
                                  className="ng-pristine ng-untouched ng-valid ng-scope ng-empty"
                                >
                                  <td>
                                    <Link
                                      to="#booking_details/28537"
                                      className="ng-binding"
                                    >
                                      TD828537
                                    </Link>
                                  </td>
                                  <td>
                                    <span
                                      className="table_lbl ng-binding confirmed"
                                      ng-class="x.current_status"
                                    >
                                      CONFIRMED
                                    </span>
                                  </td>
                                  <td className="ng-binding">GOKUL HOTEL</td>
                                  <td className="ng-binding">
                                    Mr Samiksha Qtech x 2
                                  </td>
                                  <td className="ng-binding">
                                    Classic -Half Board : 2 Pax{" "}
                                  </td>
                                  <td className="service_date ng-binding">
                                    13-May-2021
                                  </td>
                                  <td className="service_date ng-binding">
                                    28-May-2021
                                  </td>
                                  <td className="ng-binding">INR 100.000</td>
                                </tr>
                                {/* end ngRepeat: x in bookDetails */}
                                <tr
                                  ng-model="bookingdet"
                                  ng-repeat="x in bookDetails"
                                  className="ng-pristine ng-untouched ng-valid ng-scope ng-empty"
                                >
                                  <td>
                                    <Link
                                      to="#booking_details/28536"
                                      className="ng-binding"
                                    >
                                      TD828536
                                    </Link>
                                  </td>
                                  <td>
                                    <span
                                      className="table_lbl ng-binding confirmed"
                                      ng-class="x.current_status"
                                    >
                                      CONFIRMED
                                    </span>
                                  </td>
                                  <td className="ng-binding">GOKUL HOTEL</td>
                                  <td className="ng-binding">
                                    Mr Samiksha Qtech x 2
                                  </td>
                                  <td className="ng-binding">
                                    Classic -Half Board : 2 Pax{" "}
                                  </td>
                                  <td className="service_date ng-binding">
                                    13-May-2021
                                  </td>
                                  <td className="service_date ng-binding">
                                    29-May-2021
                                  </td>
                                  <td className="ng-binding">INR 100.000</td>
                                </tr>
                                {/* end ngRepeat: x in bookDetails */}
                                <tr
                                  ng-model="bookingdet"
                                  ng-repeat="x in bookDetails"
                                  className="ng-pristine ng-untouched ng-valid ng-scope ng-empty"
                                >
                                  <td>
                                    <Link
                                      to="#booking_details/28535"
                                      className="ng-binding"
                                    >
                                      TD828535
                                    </Link>
                                  </td>
                                  <td>
                                    <span
                                      className="table_lbl ng-binding confirmed"
                                      ng-class="x.current_status"
                                    >
                                      CONFIRMED
                                    </span>
                                  </td>
                                  <td className="ng-binding">GOKUL HOTEL</td>
                                  <td className="ng-binding">
                                    Mr Samiksha Qtech x 2
                                  </td>
                                  <td className="ng-binding">
                                    Classic -Half Board : 2 Pax{" "}
                                  </td>
                                  <td className="service_date ng-binding">
                                    13-May-2021
                                  </td>
                                  <td className="service_date ng-binding">
                                    29-May-2021
                                  </td>
                                  <td className="ng-binding">INR 100.000</td>
                                </tr>
                                {/* end ngRepeat: x in bookDetails */}
                                <tr
                                  ng-model="bookingdet"
                                  ng-repeat="x in bookDetails"
                                  className="ng-pristine ng-untouched ng-valid ng-scope ng-empty"
                                >
                                  <td>
                                    <Link
                                      to="#booking_details/28534"
                                      className="ng-binding"
                                    >
                                      TD828534
                                    </Link>
                                  </td>
                                  <td>
                                    <span
                                      className="table_lbl ng-binding confirmed"
                                      ng-class="x.current_status"
                                    >
                                      CONFIRMED
                                    </span>
                                  </td>
                                  <td className="ng-binding">GOKUL HOTEL</td>
                                  <td className="ng-binding">
                                    Mr Samiksha Qtech x 2
                                  </td>
                                  <td className="ng-binding">
                                    Classic -Half Board : 2 Pax{" "}
                                  </td>
                                  <td className="service_date ng-binding">
                                    13-May-2021
                                  </td>
                                  <td className="service_date ng-binding">
                                    28-May-2021
                                  </td>
                                  <td className="ng-binding">INR 100.000</td>
                                </tr>
                                {/* end ngRepeat: x in bookDetails */}
                                <tr
                                  ng-model="bookingdet"
                                  ng-repeat="x in bookDetails"
                                  className="ng-pristine ng-untouched ng-valid ng-scope ng-empty"
                                >
                                  <td>
                                    <Link
                                      to="#booking_details/28533"
                                      className="ng-binding"
                                    >
                                      TD828533
                                    </Link>
                                  </td>
                                  <td>
                                    <span
                                      className="table_lbl ng-binding confirmed"
                                      ng-class="x.current_status"
                                    >
                                      CONFIRMED
                                    </span>
                                  </td>
                                  <td className="ng-binding">GOKUL HOTEL</td>
                                  <td className="ng-binding">
                                    Mr Samiksha Qtech x 2
                                  </td>
                                  <td className="ng-binding">
                                    Classic -Half Board : 2 Pax{" "}
                                  </td>
                                  <td className="service_date ng-binding">
                                    13-May-2021
                                  </td>
                                  <td className="service_date ng-binding">
                                    29-May-2021
                                  </td>
                                  <td className="ng-binding">INR 100.000</td>
                                </tr>
                                {/* end ngRepeat: x in bookDetails */}
                                <tr
                                  ng-model="bookingdet"
                                  ng-repeat="x in bookDetails"
                                  className="ng-pristine ng-untouched ng-valid ng-scope ng-empty"
                                >
                                  <td>
                                    <Link
                                      to="#booking_details/28532"
                                      className="ng-binding"
                                    >
                                      TD828532
                                    </Link>
                                  </td>
                                  <td>
                                    <span
                                      className="table_lbl ng-binding confirmed"
                                      ng-class="x.current_status"
                                    >
                                      CONFIRMED
                                    </span>
                                  </td>
                                  <td className="ng-binding">GOKUL HOTEL</td>
                                  <td className="ng-binding">
                                    Mr Samiksha Qtech x 2
                                  </td>
                                  <td className="ng-binding">
                                    Classic -Half Board : 2 Pax{" "}
                                  </td>
                                  <td className="service_date ng-binding">
                                    13-May-2021
                                  </td>
                                  <td className="service_date ng-binding">
                                    16-May-2021
                                  </td>
                                  <td className="ng-binding">INR 100.000</td>
                                </tr>
                                {/* end ngRepeat: x in bookDetails */}
                                <tr
                                  ng-model="bookingdet"
                                  ng-repeat="x in bookDetails"
                                  className="ng-pristine ng-untouched ng-valid ng-scope ng-empty"
                                >
                                  <td>
                                    <Link
                                      to="#booking_details/28531"
                                      className="ng-binding"
                                    >
                                      TD828531
                                    </Link>
                                  </td>
                                  <td>
                                    <span
                                      className="table_lbl ng-binding confirmed"
                                      ng-class="x.current_status"
                                    >
                                      CONFIRMED
                                    </span>
                                  </td>
                                  <td className="ng-binding">GOKUL HOTEL</td>
                                  <td className="ng-binding">
                                    Mr Samiksha Qtech x 2
                                  </td>
                                  <td className="ng-binding">
                                    Classic -Half Board : 2 Pax{" "}
                                  </td>
                                  <td className="service_date ng-binding">
                                    13-May-2021
                                  </td>
                                  <td className="service_date ng-binding">
                                    28-May-2021
                                  </td>
                                  <td className="ng-binding">INR 100.000</td>
                                </tr>
                                {/* end ngRepeat: x in bookDetails */}
                                <tr
                                  ng-model="bookingdet"
                                  ng-repeat="x in bookDetails"
                                  className="ng-pristine ng-untouched ng-valid ng-scope ng-empty"
                                >
                                  <td>
                                    <Link
                                      to="#booking_details/28530"
                                      className="ng-binding"
                                    >
                                      TD828530
                                    </Link>
                                  </td>
                                  <td>
                                    <span
                                      className="table_lbl ng-binding confirmed"
                                      ng-class="x.current_status"
                                    >
                                      CONFIRMED
                                    </span>
                                  </td>
                                  <td className="ng-binding">GOKUL HOTEL</td>
                                  <td className="ng-binding">
                                    Mr Samiksha Qtech x 2
                                  </td>
                                  <td className="ng-binding">
                                    Classic -Half Board : 2 Pax{" "}
                                  </td>
                                  <td className="service_date ng-binding">
                                    13-May-2021
                                  </td>
                                  <td className="service_date ng-binding">
                                    27-May-2021
                                  </td>
                                  <td className="ng-binding">INR 100.000</td>
                                </tr>
                                {/* end ngRepeat: x in bookDetails */}
                                <tr
                                  ng-model="bookingdet"
                                  ng-repeat="x in bookDetails"
                                  className="ng-pristine ng-untouched ng-valid ng-scope ng-empty"
                                >
                                  <td>
                                    <Link
                                      to="#booking_details/28529"
                                      className="ng-binding"
                                    >
                                      TD828529
                                    </Link>
                                  </td>
                                  <td>
                                    <span
                                      className="table_lbl ng-binding confirmed"
                                      ng-class="x.current_status"
                                    >
                                      CONFIRMED
                                    </span>
                                  </td>
                                  <td className="ng-binding">GOKUL HOTEL</td>
                                  <td className="ng-binding">
                                    Mr Samiksha Qtech x 2
                                  </td>
                                  <td className="ng-binding">
                                    Classic -Half Board : 2 Pax{" "}
                                  </td>
                                  <td className="service_date ng-binding">
                                    13-May-2021
                                  </td>
                                  <td className="service_date ng-binding">
                                    27-May-2021
                                  </td>
                                  <td className="ng-binding">INR 100.000</td>
                                </tr>
                                {/* end ngRepeat: x in bookDetails */}
                                <tr
                                  ng-model="bookingdet"
                                  ng-repeat="x in bookDetails"
                                  className="ng-pristine ng-untouched ng-valid ng-scope ng-empty"
                                >
                                  <td>
                                    <Link
                                      to="#booking_details/28528"
                                      className="ng-binding"
                                    >
                                      TD828528
                                    </Link>
                                  </td>
                                  <td>
                                    <span
                                      className="table_lbl ng-binding confirmed"
                                      ng-class="x.current_status"
                                    >
                                      CONFIRMED
                                    </span>
                                  </td>
                                  <td className="ng-binding">GOKUL HOTEL</td>
                                  <td className="ng-binding">
                                    Mr Samiksha Qtech x 2
                                  </td>
                                  <td className="ng-binding">
                                    Classic -Half Board : 2 Pax{" "}
                                  </td>
                                  <td className="service_date ng-binding">
                                    13-May-2021
                                  </td>
                                  <td className="service_date ng-binding">
                                    30-May-2021
                                  </td>
                                  <td className="ng-binding">INR 100.000</td>
                                </tr>
                                {/* end ngRepeat: x in bookDetails */}
                                <tr
                                  ng-model="bookingdet"
                                  ng-repeat="x in bookDetails"
                                  className="ng-pristine ng-untouched ng-valid ng-scope ng-empty"
                                >
                                  <td>
                                    <Link
                                      to="#booking_details/28527"
                                      className="ng-binding"
                                    >
                                      TD828527
                                    </Link>
                                  </td>
                                  <td>
                                    <span
                                      className="table_lbl ng-binding confirmed"
                                      ng-class="x.current_status"
                                    >
                                      CONFIRMED
                                    </span>
                                  </td>
                                  <td className="ng-binding">GOKUL HOTEL</td>
                                  <td className="ng-binding">
                                    Mr Samiksha Qteb x 2
                                  </td>
                                  <td className="ng-binding">
                                    Classic -Half Board : 2 Pax{" "}
                                  </td>
                                  <td className="service_date ng-binding">
                                    13-May-2021
                                  </td>
                                  <td className="service_date ng-binding">
                                    28-May-2021
                                  </td>
                                  <td className="ng-binding">INR 100.000</td>
                                </tr>
                                {/* end ngRepeat: x in bookDetails */}
                                <tr
                                  ng-model="bookingdet"
                                  ng-repeat="x in bookDetails"
                                  className="ng-pristine ng-untouched ng-valid ng-scope ng-empty"
                                >
                                  <td>
                                    <Link
                                      to="#booking_details/28525"
                                      className="ng-binding"
                                    >
                                      TD828525
                                    </Link>
                                  </td>
                                  <td>
                                    <span
                                      className="table_lbl ng-binding confirmed"
                                      ng-class="x.current_status"
                                    >
                                      CONFIRMED
                                    </span>
                                  </td>
                                  <td className="ng-binding">GOKUL HOTEL</td>
                                  <td className="ng-binding">
                                    Mr Samiksha Qtech x 2
                                  </td>
                                  <td className="ng-binding">
                                    Classic -Half Board : 2 Pax{" "}
                                  </td>
                                  <td className="service_date ng-binding">
                                    12-May-2021
                                  </td>
                                  <td className="service_date ng-binding">
                                    16-May-2021
                                  </td>
                                  <td className="ng-binding">INR 100.000</td>
                                </tr>
                                {/* end ngRepeat: x in bookDetails */}
                                <tr
                                  ng-model="bookingdet"
                                  ng-repeat="x in bookDetails"
                                  className="ng-pristine ng-untouched ng-valid ng-scope ng-empty"
                                >
                                  <td>
                                    <Link
                                      to="#booking_details/28519"
                                      className="ng-binding"
                                    >
                                      TD828519
                                    </Link>
                                  </td>
                                  <td>
                                    <span
                                      className="table_lbl ng-binding confirmed"
                                      ng-class="x.current_status"
                                    >
                                      CONFIRMED
                                    </span>
                                  </td>
                                  <td className="ng-binding">GOKUL HOTEL</td>
                                  <td className="ng-binding">
                                    Mr Samiksha Qtech x 2
                                  </td>
                                  <td className="ng-binding">
                                    Classic -Half Board : 2 Pax{" "}
                                  </td>
                                  <td className="service_date ng-binding">
                                    12-May-2021
                                  </td>
                                  <td className="service_date ng-binding">
                                    27-May-2021
                                  </td>
                                  <td className="ng-binding">INR 100.000</td>
                                </tr>
                                {/* end ngRepeat: x in bookDetails */}
                                <tr
                                  ng-model="bookingdet"
                                  ng-repeat="x in bookDetails"
                                  className="ng-pristine ng-untouched ng-valid ng-scope ng-empty"
                                >
                                  <td>
                                    <Link
                                      to="#booking_details/28340"
                                      className="ng-binding"
                                    >
                                      TD828340
                                    </Link>
                                  </td>
                                  <td>
                                    <span
                                      className="table_lbl ng-binding confirmed"
                                      ng-class="x.current_status"
                                    >
                                      CONFIRMED
                                    </span>
                                  </td>
                                  <td className="ng-binding">GOKUL HOTEL</td>
                                  <td className="ng-binding">
                                    Mr Samiksha Qtech x 2
                                  </td>
                                  <td className="ng-binding">
                                    Classic -Half Board : 2 Pax{" "}
                                  </td>
                                  <td className="service_date ng-binding">
                                    05-May-2021
                                  </td>
                                  <td className="service_date ng-binding">
                                    20-May-2021
                                  </td>
                                  <td className="ng-binding">INR 200.000</td>
                                </tr>
                                {/* end ngRepeat: x in bookDetails */}
                                <tr
                                  ng-model="bookingdet"
                                  ng-repeat="x in bookDetails"
                                  className="ng-pristine ng-untouched ng-valid ng-scope ng-empty"
                                >
                                  <td>
                                    <Link
                                      to="#booking_details/28187"
                                      className="ng-binding"
                                    >
                                      TD828187
                                    </Link>
                                  </td>
                                  <td>
                                    <span
                                      className="table_lbl ng-binding confirmed"
                                      ng-class="x.current_status"
                                    >
                                      CONFIRMED
                                    </span>
                                  </td>
                                  <td className="ng-binding">
                                    AL BURJ KHALIFA
                                  </td>
                                  <td className="ng-binding">
                                    Mr Rohan Vartak x 1
                                  </td>
                                  <td className="ng-binding">
                                    Classic -Half Board : 1 Pax{" "}
                                  </td>
                                  <td className="service_date ng-binding">
                                    09-Apr-2021
                                  </td>
                                  <td className="service_date ng-binding">
                                    26-Jun-2021
                                  </td>
                                  <td className="ng-binding">USD 50.000</td>
                                </tr>
                                {/* end ngRepeat: x in bookDetails */}
                                <tr
                                  ng-model="bookingdet"
                                  ng-repeat="x in bookDetails"
                                  className="ng-pristine ng-untouched ng-valid ng-scope ng-empty"
                                >
                                  <td>
                                    <Link
                                      to="#booking_details/28083"
                                      className="ng-binding"
                                    >
                                      TD828083
                                    </Link>
                                  </td>
                                  <td>
                                    <span
                                      className="table_lbl ng-binding confirmed"
                                      ng-class="x.current_status"
                                    >
                                      CONFIRMED
                                    </span>
                                  </td>
                                  <td className="ng-binding">NagpurHotel1</td>
                                  <td className="ng-binding"> x 1</td>
                                  <td className="ng-binding">Classic</td>
                                  <td className="service_date ng-binding">
                                    04-Mar-2021
                                  </td>
                                  <td className="service_date ng-binding">
                                    21-Mar-2021
                                  </td>
                                  <td className="ng-binding">INR 100.000</td>
                                </tr>
                                {/* end ngRepeat: x in bookDetails */}
                                <tr>
                                  <td
                                    colSpan={7}
                                    className="text-center ng-hide"
                                    ng-show="bookDetails == ''"
                                  >
                                    <span
                                      ng-show="service_date_from"
                                      className="ng-hide"
                                    >
                                      No Booking Available For Service Date from
                                      <b className="ng-binding"> </b> To{" "}
                                      <b className="ng-binding"></b>
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    colSpan={7}
                                    className="text-center ng-hide"
                                    ng-show="bookDetails == ''"
                                  >
                                    <span
                                      ng-show="create_date_from"
                                      className="ng-hide"
                                    >
                                      No Booking Available For Booking Date from
                                      <b className="ng-binding" /> To{" "}
                                      <b className="ng-binding" />
                                    </span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="panel-footer text-center ng-hide"
                      ng-show="bookDetails.length <= 0"
                    >
                      <h4>
                        <p className="ng-binding">No Records Available</p>
                      </h4>
                    </div>
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
              '\n        #sizing li a {\n            font-size: 12px;\n            color: #34495e;\n        }\n\n\n        a {\n            cursor: pointer;\n            color: #34495e;\n        }\n\n        .ng-hide {\n            display: none;\n        }\n\n        .h-bg-navy-blue {\n            background: #34495e;\n        }\n\n        .adddates {\n            background: #74D348;\n            color: white;\n        }\n\n        .adddates:hover {\n            background: #74D348;\n        }\n\n        .bootstrap-select.show-menu-arrow.open>.dropdown-toggle,\n        .bootstrap-select.show-menu-arrow.show>.dropdown-toggle {\n            z-index: 1;\n        }\n\n \n\n        th {\n            text-align: left !important;\n            width: 200px;\n            vertical-align: middle !important;\n            text-transform: uppercase;\n            font-size: 12px;\n\n        }\n\n        td {\n            background-color: #FFFFFF !important;\n        }\n\n        #voucherStartdatepicker {\n            background-color: white;\n        }\n\n        #voucherEndDatepicker {\n            background-color: white;\n        }\n\n\n\n\n        .breadcrumb {\n            font-weight: 500 !important;\n            font-size: 12px;\n            text-transform: uppercase;\n            list-style: none;\n            padding-left: 12px;\n\n        }\n\n\n\n\n\n        .breadcrumb li {\n            display: inline-block;\n            margin-bottom: .2em;\n        }\n\n        .breadcrumb li a {\n            background-color: #34495e;\n            box-sizing: border-box;\n            color: #fff;\n            display: block;\n            max-height: 2em;\n            padding: .5em 1em .5em 1.5em;\n            position: relative;\n            text-decoration: none;\n            transition: .25s;\n        }\n\n        .breadcrumb li.active a {\n            background-color: #62cb31;\n            box-sizing: border-box;\n            color: #fff;\n            display: block;\n            max-height: 2em;\n            padding: .5em 1em .5em 1.5em;\n            position: relative;\n            text-decoration: none;\n            transition: .25s;\n        }\n\n        .breadcrumb li.active a::after {\n            border-top: 1em solid transparent;\n            border-bottom: 1em solid transparent;\n            border-left: 1em solid #62cb31;\n            content: "";\n            position: absolute;\n            top: 0;\n            right: -1em;\n            transition: .25s;\n            z-index: 1;\n        }\n\n\n        .breadcrumb li a:before {\n            border-top: 1em solid transparent;\n            border-bottom: 1em solid transparent;\n            border-left: 1em solid #fff;\n            content: "";\n            position: absolute;\n            top: 0;\n            right: -1.25em;\n            z-index: 1;\n        }\n\n        .breadcrumb li a:after {\n            border-top: 1em solid transparent;\n            border-bottom: 1em solid transparent;\n            border-left: 1em solid #34495e;\n            content: "";\n            position: absolute;\n            top: 0;\n            right: -1em;\n            transition: .25s;\n            z-index: 1;\n        }\n\n        .breadcrumb li a:hover {\n            background-color: #3f5872;\n        }\n\n        .breadcrumb li.active a:hover {\n            background-color: #74d348;\n        }\n\n        .breadcrumb li.active a:hover:after {\n            border-left-color: #74d348;\n        }\n\n\n        .breadcrumb li a:hover:after {\n            border-left-color: #3f5872;\n        }\n\n\n        .white-box-3 {\n            background: #ffffff;\n            border: #e4e5e7 solid 1px;\n            margin: 25px 0px 0px;\n        }\n\n        .blue-heading-box {\n            background: #34495e;\n            margin: 0px 0px 0px 0px;\n            padding: 13px 0px;\n            width: 100%;\n            float: left;\n        }\n\n\n\n        .blue-heading-box-01 {\n            margin: 0px 0px 0px 0px;\n            padding: 0px 0px;\n            width: 30%;\n            float: left;\n        }\n\n        .labelTitle1 {\n            padding: 7px 0px 0px 15px;\n            text-transform: uppercase;\n            font-family: Montserrat;\n            font-weight: 700;\n            font-size: 12px;\n            color: #ffffff;\n        }\n\n        .blue-heading-box-02 {\n            margin: 0px 0px 0px 0px;\n            padding: 0px 0px;\n            width: 70%;\n            float: left;\n        }\n\n        .hotel-main-box {\n            padding: 6px 20px;\n        }\n\n        .propertyPic {\n            height: 279px !important;\n        }\n\n        .map-box {\n            padding: 5px 0px 0px 21px;\n            width: 16%;\n        }\n\n        .marg_hack {\n            margin-bottom: -25px;\n        }\n\n        .blue-box-01 {\n            margin: 0px 0px 0px 0px;\n            padding: 0px 10px 15px 15px;\n            width: 25%;\n            float: left;\n        }\n\n        .blue-box-02 {\n            margin: 0px 0px 0px 0px;\n            padding: 0px 15px 37px 0px;\n            width: 75%;\n            float: left;\n        }\n\n        .btn-default {\n            background-color: #fff;\n            border-color: #e4e5e7;\n            color: #6a6c6f;\n        }\n\n        .star_rating {\n            margin-top: 6px;\n        }\n\n        .star_rating1 {\n            min-width: 15px !important;\n            margin-bottom: 7px;\n        }\n\n        .address_details p {\n            padding: 0px 0px 0px 53px !important;\n            font-family: "Roboto", Helvetica, Arial, sans-serif !important;\n        }\n\n        .tab1Font {\n            font-size: 12px;\n            color: #B0B0B0;\n            margin-top: 10px;\n        }\n\n        .white-box-3 {\n            background: #ffffff;\n            border: #e4e5e7 solid 1px;\n            margin: 25px 0px 0px;\n        }\n\n        .headTitle {\n            text-transform: uppercase;\n            font-weight: 500;\n        }\n\n        .blue-box * {\n            font-size: 13px;\n            font-family: "Roboto", Helvetica, Arial, sans-serif;\n        }\n\n        .labelImg {\n            height: 55px;\n            width: 55px;\n            display: inline-block;\n            padding: 12px;\n            float: right;\n            right: 5px;\n            position: relative;\n        }\n\n        .imgWid img {\n            width: 100%;\n        }\n\n        .hotel-main-box {\n            padding: 6px 20px;\n        }\n\n        .amnt {\n            font-size: 30px;\n            font-weight: 900;\n        }\n\n        .text-success {\n            color: #62cb31 !important;\n\n        }\n\n        .hotel-main-box .well {\n            background: transparent !important;\n            border: transparent !important;\n            margin-bottom: 0px !important;\n        }\n\n        .well {\n            background: #f7f9fa;\n            box-shadow: none;\n            min-height: 20px;\n        }\n\n        .well-sm {\n            padding: 9px;\n            border-radius: 3px;\n        }\n\n        .boldMe {\n            font-size: 13px;\n            font-weight: 900;\n        }\n\n        .booking-status-box-01 {\n            margin: 0px 55px 0px -30px;\n            padding: 0px 0px;\n            width: 60%;\n            float: left;\n        }\n\n        .booking-status-box-02 {\n            margin: 55px 0px 0px 0px;\n            padding: 0px 0px;\n            width: 30%;\n            float: left;\n        }\n\n        .doughnut-legend {\n            padding: 0px;\n        }\n\n        .chart-legend li {\n            list-style: none;\n        }\n\n        .chart-legend li span {\n            display: inline-block;\n            width: 6px;\n            height: 6px;\n            margin-right: 5px;\n        }\n\n        body {\n            font-family: "Roboto", Helvetica, Arial, sans-serif;\n            background-color: #fff;\n            font-size: 13px;\n            color: #6a6c6f;\n        }\n\n        .white-box-3 .panel-footer {\n            padding: 3px 15px;\n            background-color: #FFFFFF;\n            border-top: 1px solid #FFF;\n            border-bottom-right-radius: 3px;\n            border-bottom-left-radius: 3px;\n        }\n\n        .cities-green {\n            background: #62cb31;\n            min-height: 55px;\n            display: table;\n            table-layout: fixed;\n            width: 100%;\n        }\n\n        .arrivals-box-01 {\n            margin: 0px 0px 0px 0px;\n            padding: 0px 0px;\n            width: 76%;\n            float: left;\n        }\n\n        .arr_wdt {\n            width: 110px !important;\n        }\n\n        .arrivals-box-02 {\n            margin: 0px 0px 0px 0px;\n            padding: 8px 0px 0px 0px;\n            width: 24%;\n            float: left;\n        }\n\n        .label_wh_grn {\n            font-size: 18px;\n            background: #fff;\n            text-align: center;\n            border-radius: 3px;\n            color: #62cb31;\n            font-weight: 600;\n            line-height: 20px;\n        }\n\n        .arrivals-box-02-11 {\n            margin: 0px 0px 0px 0px;\n            padding: 10px 0px;\n            width: 45px;\n            float: left;\n        }\n\n        .label_grn_wh {\n            color: #fff;\n            font-size: 11px;\n            width: 70px;\n            line-height: 12px;\n        }\n\n        .arrivals-box-02-12 {\n            margin: 0px 0px 0px 0px;\n            padding: 8px 0px 0px 10px;\n            width: 70px;\n            float: left;\n        }\n\n        .arrivals-box-02-13 {\n            margin: 0px 0px 0px 0px;\n            padding: 8px 0px 0px 0px;\n            width: 42px;\n            float: right;\n        }\n\n        .nav-tabs>li.active>a,\n        .nav-tabs>li.active>a:hover,\n        .nav-tabs>li.active>a:focus {\n            color: #FFF !important;\n            cursor: pointer !important;\n            background-color: #34495E !important;\n        }\n\n        .nav-tabs.nav-justified>li>a {\n            border-radius: 2px 2px 0 0;\n        }\n\n        .nav-link.ng-binding {\n            padding: 2px 0px !important;\n        }\n\n        .nav>li>a {\n            display: block;\n            padding: 10px 10px;\n            position: relative;\n        }\n\n        h4,\n        .h4 {\n            font-size: 18px;\n        }\n\n        .tab-content>.active,\n        .pill-content>.active {\n            display: block;\n        }\n\n        .table label,\n        .table {\n            font-family: "MONTSERRAT";\n            font-size: 11px !important;\n        }\n\n        body,\n        h4 {\n            font-family: Roboto;\n            font-weight: 400;\n        }\n\n        .tab-content {\n            border-top: 3px solid #ddcfcf;\n            border-left: 0px;\n            border-bottom: 0px;\n            border-right: 0px;\n        }\n\n        .expiring-box {\n            background: #E64A3B;\n            min-height: 55px;\n            display: table;\n            table-layout: fixed;\n            width: 100%;\n        }\n\n        .percnt {\n            font-size: 50px;\n            font-weight: 600;\n            margin: -15px 0px;\n            color: #62cb31;\n        }\n\n        .complt {\n            font-weight: 300 !important;\n            border-bottom: rgba(219, 224, 230, 0) solid 0px;\n            font-size: 20px;\n        }\n\n        .radio-inline,\n        .checkbox-inline {\n            display: inline-block;\n            padding-left: 20px;\n            margin-bottom: 0;\n            font-weight: normal;\n            vertical-align: middle;\n            cursor: pointer;\n        }\n\n        .checkbox.checkbox-inline {\n            margin-top: 0;\n        }\n\n        .checkbox {\n            padding-left: 20px;\n        }\n\n        .incorPanel,\n        .corPanel {\n            float: left;\n        }\n\n        .period {\n            font-size: 11px;\n        }\n\n        .corPanel {\n            margin-top: 10px;\n        }\n\n        .label-info {\n            background-color: #5bc0de;\n        }\n\n        .label {\n            display: inline;\n            padding: 0.2em 0.6em 0.3em;\n            font-size: 75%;\n            font-weight: bold;\n            line-height: 1;\n            color: #fff;\n            text-align: center;\n            white-space: nowrap;\n            vertical-align: baseline;\n            border-radius: 0.25em;\n        }\n\n        .fontGreenPn {\n            color: #46C10D !important;\n            text-transform: uppercase;\n            font-weight: 700;\n        }\n\n        .stats h4,\n        h5,\n        h6 {\n            margin: 5px 0;\n        }\n\n        h5,\n        .h5 {\n            font-size: 14px;\n        }\n\n        .form-group select,\n        .form-group button,\n        .form-group .btn,\n        .form-group input,\n        .form-group ul li,\n        .form-group,\n        .form-group textarea,\n        .datepicker,\n        .datepicker * {\n            font-size: 12px !important;\n            font-family: "Roboto", Helvetica, Arial, sans-serif;\n            font-weight: 300;\n        }\n\n        .pull-left {\n            float: left !important;\n        }\n\n        .pull-right {\n            float: right !important;\n        }\n\n        .btn-primary.btn-outline {\n            color: #34495e;\n        }\n\n        .btn-outline {\n            color: inherit;\n            background-color: transparent;\n            transition: all .5s;\n        }\n\n        .btn-primary {\n\n            border-color: #34495e;\n            color: #FFFFFF;\n        }\n\n        .btn {\n            border-radius: 3px;\n        }\n\n        .btn-primary.btn-outline:hover,\n        .btn-success.btn-outline:hover,\n        .btn-info.btn-outline:hover,\n        .btn-warning.btn-outline:hover,\n        .btn-danger.btn-outline:hover {\n            color: #fff;\n        }\n\n        .btn-primary:hover,\n        .btn-primary:focus,\n        .btn-primary:active,\n        .btn-primary.active,\n        .open .dropdown-toggle.btn-primary {\n            background-color: #3f5872;\n            border-color: #3f5872;\n            color: #FFFFFF;\n            outline: none;\n        }\n\n\n\n        .form-group select,\n        .form-group button,\n        .form-group .btn,\n        .form-group input,\n        .form-group ul li,\n        .form-group,\n        .form-group textarea,\n        .datepicker,\n        .datepicker * {\n            font-size: 12px !important;\n            font-family: "Roboto", Helvetica, Arial, sans-serif;\n            font-weight: 300;\n        }\n\n        .btn-info.btn-outline {\n            color: #3498db;\n        }\n\n        .btn-info {\n\n            border-color: #3498db;\n        }\n\n        .btn-info:hover,\n        .btn-info:focus,\n        .btn-info:active,\n        .btn-info.active,\n        .open .dropdown-toggle.btn-info {\n            background-color: #4ea5e0;\n            border-color: #4ea5e0;\n            color: #FFFFFF;\n        }\n\n        thead {\n            text-transform: uppercase;\n            font-family: Roboto;\n            font-weight: 900;\n            font-size: 13px;\n            color: #5d6974;\n            background-color: white;\n            float: left;\n        }\n\n        .heading_tiltle {\n            font-size: 13px !important;\n            font-weight: 600;\n        }\n\n        .table>tbody>tr>td {\n            font-size: 8pt !important;\n            vertical-align: middle;\n            font-family: "Arial";\n            padding: 8px;\n        }\n\n        .panel-body1 tbody>tr>td {\n            border-top: 0px solid #ddd;\n        }\n\n        .btn-sm,\n        .btn-group-sm>.btn {\n            padding: 5px 10px;\n            font-size: 12px;\n            line-height: 1.5;\n            border-radius: 3px;\n            font-family: "Roboto", Helvetica, Arial, sans-serif;\n        }\n\n\n        .table-box {\n            width: 100%;\n            padding: 10px 10px 0px 10px;\n            margin: 0px;\n            float: left;\n        }\n\n        .>tbody>tr:nth-of-type(odd) {\n            background-color: #f9f9f9;\n        }\n\n        td {\n            text-align: left !important;\n          width: 12%;\n        }\n        td a {\n            text-decoration: none !important;\n          \n        }\n        td a:hover {\n            text-decoration: none !important;\n            color:black !important ;\n        }\n\n        .table_lbl {\n    text-align: center;\n    padding: 3px 0px;\n    font-size: 11px;\n    color: #fff;\n    border-radius: 3px;\n    width: 126px;\n    height: 20px;\n    float: left;\n    font-size: 10px;\n    font-weight: 600;\n    font-family: "Roboto", Helvetica, Arial, sans-serif;\n}\n.confirmed {\n    background-color: #4CAF50;\n}\n.cancelled {\n    background-color: #f44336;\n}\n\n\n        .cities-green {\n    background: #62cb31;\n    min-height: 55px;\n    display: table;\n    table-layout: fixed;\n    width: 100%;\n}\n\n\ninput[type=text] {\n    background: white !important;\n}\n\n\n    ',
          }}
        />
      </div>
    </>
  );
};
export default HotelInventoryAppBookingDetails;
