import { Link } from "react-router-dom";
import React, { useState } from "react";
import Header2 from "../../header2/header2";
import Constants from "../../../constants/routes";

const MastersPackagesView = () => {
  const [activeTab, setActiveTab] = useState("subtab1");

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const tabData = [
    { id: "subtab1", label: "Essential Information" },
    { id: "subtab2", label: "Details" },
    { id: "subtab3", label: "Itinerary" },
    { id: "subtab4", label: "Dates & Prices" },
    { id: "subtab5", label: "Cancellation Policy" },
    { id: "subtab6", label: "Terms & Policies" },
    { id: "subtab7", label: "Inclusion & Exclusions" },
  ];
  return (
    <>
      <Header2
        title="VIEW PACKAGE"
        linkText1="Edit Packages"
        linkText2="Search Packages"
        link1={Constants.URLConstants.MASTERSPACKAGESSEARCH}
        link2={Constants.URLConstants.MASTERSPACKAGESSEARCH}
      />
      <style
        dangerouslySetInnerHTML={{
          __html: "\n.nav-item{\n    cursor: pointer !important;\n}\n",
        }}
      />

      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n        h4 {\n            font-size: 13px;\n            white-space: nowrap;\n            overflow: hidden;\n            text-overflow: ellipsis;\n        }\n\n        h4 {\n\n            font-weight: 700;\n            text-transform: capitalize;\n        }\n\n        h4,\n        .h4,\n        h5,\n        .h5,\n        h6,\n        .h6 {\n            margin-top: 10px;\n            margin-bottom: 10px;\n        }\n        .panel-group .panel-heading {\n    padding: 13px 15px;\n    background: #edf0f5;\n}\n.panel-default {\n    border-color: #ddd;\n}\n.panel-group .panel {\n    margin-bottom: 0;\n    border-radius: 4px;\n}\n\n.form-control, .form-control:focus, .has-error .form-control:focus, .has-success .form-control:focus, .has-warning .form-control:focus, .navbar-collapse, .navbar-form, .navbar-form-custom .form-control:focus, .navbar-form-custom .form-control:hover, .open .btn.dropdown-toggle, .panel, .popover, .progress, .progress-bar {\n    box-shadow: none;\n}\n.panel {\n\n    background-color: #fff;\n    border: 1px solid grey;\n}\n.navlink{\ncursor:pointer;\n}\n    ",
        }}
      />

      <div class="container-fluid pt-0 p-4" id="content-pad">
        <div
          className="tab-pane fade show active"
          id="products"
          role="tabpanel"
          aria-labelledby="products-tab"
        >
          <ul className="nav nav-tabs" id="productsSubTabs" role="tablist">
            {tabData.map((tab) => (
              <li className="nav-item" key={tab.id}>
                <Link
                  className={`nav-link ${activeTab === tab.id ? "active" : ""}`}
                  onClick={() => handleTabClick(tab.id)}
                  role="tab"
                  aria-controls={tab.id}
                  aria-selected={activeTab === tab.id}
                >
                  {tab.label}
                </Link>
              </li>
            ))}
          </ul>
          <form
            style={{ borderTop: "2px solid #FF5015!important", padding: "0px" }}
          >
            <div
              className="tab-content"
              id="productsSubTabContent"
              style={{
                paddingLeft: "11px",
                paddingRight: "0px",
                paddingTop: "5px",
                paddingBottom: "6px",
              }}
            >
              {tabData.map((tab) => (
                <div
                  key={tab.id}
                  className={`tab-pane fade show ${
                    activeTab === tab.id ? "active" : ""
                  }`}
                  id={tab.id}
                  role="tabpanel"
                  aria-labelledby={`${tab.id}-tab`}
                >
                  {/* Essential Information */}

                  {tab.id === "subtab1" && (
                    <div>
                      <div className="row form-group">
                        <div className="col-md-12">
                          <h4>{tab.label}</h4>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12">
                          <table
                            width="100%"
                            cellPadding={2}
                            cellSpacing={1}
                            align="center"
                            border={0}
                            className="table table-bordered  table-responsive table-box tableborder"
                          >
                            <tbody className="bg-white">
                              <tr>
                                <td width="25%" align="left">
                                  <b>Package Code</b>
                                </td>
                                <td width="25%">
                                  <div
                                    id="package_code"
                                    ng-bind="packageArrObj.code"
                                    className="ng-binding"
                                  >
                                    938523
                                  </div>
                                </td>
                                <td width="25%" align="left">
                                  <b>Type</b>
                                </td>
                                <td width="25%">
                                  <div
                                    id="type"
                                    ng-bind="packageArrObj.type"
                                    className="ng-binding"
                                  >
                                    semi-dynamic
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td width="25%" align="left">
                                  <b>Sub Type</b>
                                </td>
                                <td width="25%">
                                  <div
                                    id="sub_type"
                                    ng-bind="packageArrObj.sub_type"
                                    className="ng-binding"
                                  >
                                    inbound
                                  </div>
                                </td>
                                <td width="25%" align="left">
                                  <b>Services Included</b>
                                </td>
                                <td width="25%">
                                  <div id="services">
                                    Hotel
                                    <br />
                                    Activity
                                    <br />
                                    Transfer
                                    <br />
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td width="25%" align="left">
                                  <b>Category Theme</b>
                                </td>
                                <td width="25%">
                                  <div id="theme">
                                    Mumbai Dhamaal
                                    <br />
                                    Adventure
                                    <br />
                                    Family
                                    <br />
                                    Historical
                                    <br />
                                  </div>
                                </td>
                                <td width="25%" align="left">
                                  <b>Physical Level</b>
                                </td>
                                <td width="25%">
                                  <div id="physical_level">
                                    ggd
                                    <br />
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td width="25%" align="left">
                                  <b>Tags</b>
                                </td>
                                <td width="25%">
                                  <div id="tags_suggest_box">
                                    {/* ngRepeat: tags in tagsArrObj track by $index */}
                                    {/* ngIf: tagsArrObj.length==0 */}
                                    <p
                                      className="tags ng-scope"
                                      ng-if="tagsArrObj.length==0"
                                    >
                                      -
                                    </p>
                                    {/* end ngIf: tagsArrObj.length==0 */}
                                  </div>
                                </td>
                                <td width="25%" align="left">
                                  <b>Age Group</b>
                                </td>
                                <td width="25%">
                                  {/* ngIf: age.age=="group" */}
                                  {/* ngIf: age.age!="group" */}
                                  <div
                                    ng-if='age.age!="group"'
                                    className="ng-scope"
                                  >
                                    <div
                                      ng-bind="age.age"
                                      className="ng-binding"
                                    >
                                      all
                                    </div>
                                  </div>
                                  {/* end ngIf: age.age!="group" */}
                                </td>
                              </tr>
                              <tr>
                                <td width="25%" align="left">
                                  <b>No. of Days</b>
                                </td>
                                <td width="25%">
                                  <div
                                    id="days"
                                    ng-bind="packageArrObj.days"
                                    className="ng-binding"
                                  >
                                    1
                                  </div>
                                </td>
                                <td width="25%" align="left">
                                  <b>Package Type</b>
                                </td>
                                <td width="25%">
                                  <div
                                    id="package_type"
                                    ng-bind="packageArrObj.package_type"
                                    className="ng-binding"
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td width="25%" align="left">
                                  <b>Min Adult</b>
                                </td>
                                <td width="25%">
                                  <div
                                    ng-bind="packageArrObj.min_adult"
                                    className="ng-binding"
                                  >
                                    1
                                  </div>
                                </td>
                                <td width="25%" align="left">
                                  <b>Max Adult</b>
                                </td>
                                <td width="25%">
                                  <div
                                    ng-bind="packageArrObj.max_adult"
                                    className="ng-binding"
                                  >
                                    10
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td width="25%" align="left">
                                  <b>Min Child</b>
                                </td>
                                <td width="25%">
                                  <div
                                    ng-bind="packageArrObj.min_child"
                                    className="ng-binding"
                                  >
                                    0
                                  </div>
                                </td>
                                <td width="25%" align="left">
                                  <b>Max Child</b>
                                </td>
                                <td width="25%">
                                  <div
                                    ng-bind="packageArrObj.max_child"
                                    className="ng-binding"
                                  >
                                    0
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="row form-group">
                        <div className="col-md-12">
                          <h4>Destinations</h4>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="dataTables_scroll">
                            <table
                              id="visa_requirements_table"
                              className="table   table-responsive"
                            >
                              <thead>
                                <tr>
                                  <th>Country</th>
                                  <th>City</th>
                                  <th>Visa Included</th>
                                  <th>Show Visa Requirements</th>
                                </tr>
                              </thead>
                              <tbody id="visa_requirements_tr">
                                {/* ngRepeat: cityInfo in destinationArrObj */}
                                <tr
                                  className="dest ng-scope"
                                  ng-repeat="cityInfo in destinationArrObj"
                                >
                                  <td
                                    className="country_id ng-binding"
                                    id={106}
                                  >
                                    India
                                  </td>
                                  <td className="city_id ng-binding" id={64440}>
                                    Mumbai
                                  </td>
                                  <td id="no" className="ng-binding">
                                    no
                                  </td>
                                  <td id className="ng-binding">
                                    no
                                  </td>
                                </tr>
                                {/* end ngRepeat: cityInfo in destinationArrObj */}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Details */}

                  {tab.id === "subtab2" && (
                    <div>
                      <div className="row form-group">
                        <div className="col-md-12">
                          <h4>{tab.label}</h4>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <table
                            width="100%"
                            cellPadding={2}
                            cellSpacing={1}
                            align="center"
                            border={0}
                            className="table table-bordered  table-responsive table-box tableborder"
                          >
                            <tbody className="bg-white">
                              <tr>
                                <td width="25%" align="left">
                                  <b>Package Code</b>
                                </td>
                                <td width="25%">
                                  <div className="pull-left pack_code">
                                    938523
                                  </div>
                                  {/* <div class="pull-right packages_selected_lang"></div> */}
                                </td>
                                <td width="25%" align="left">
                                  <b>Name</b>
                                </td>
                                <td width="25%">
                                  <div name="package_name" id="package_name">
                                    fgffg
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td width="25%" align="left">
                                  <b>Short Description</b>
                                </td>
                                <td width="25%">
                                  <div
                                    name="short_description"
                                    id="short_description"
                                  >
                                    <p>gfggfg</p>
                                    <p></p>
                                    <p>&nbsp;</p>
                                    <p />
                                  </div>
                                </td>
                                <td width="25%" align="left">
                                  <b>Long Description</b>
                                </td>
                                <td width="25%">
                                  <div
                                    name="long_description"
                                    id="long_description"
                                  >
                                    <p>sdsds</p>
                                    <p></p>
                                    <p>&nbsp;</p>
                                    <p />
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td width="25%" align="left">
                                  <b>Useful Information</b>
                                </td>
                                <td width="25%">
                                  <div id="useful_info" />
                                </td>
                                <td width="25%" align="left"></td>
                                <td width="25%"></td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div
                        className="panel-body-essen"
                        style={{ display: "none" }}
                      >
                        <div className="form-group">
                          <h4>Gallery Image</h4>
                        </div>
                        <div className="row" id="destination_block">
                          <div className="col-md-12">
                            <div className>
                              <div className="form-group">
                                <h4>Mumbai</h4>
                              </div>
                              <div className="searchable-container">
                                <div className="items">
                                  <div className="info-block block-info clearfix">
                                    <div
                                      data-toggle="buttons"
                                      className="btn-group bizmoduleselect"
                                      id="img_list_dest64440"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Itinerary */}

                  {tab.id === "subtab3" && (
                    <div>
                      <div className="row form-group">
                        <div className="col-md-12">
                          <h4>{tab.label}</h4>
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-md-6">
                          <div className="pull-left">
                            <h6 className="pack_code">938523</h6>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="pull-right packages_selected_lang"></div>
                        </div>
                      </div>
                      <br />
                      <div
                        className="panel-group"
                        id="accordion"
                        role="tablist"
                        aria-multiselectable="true"
                      >
                        {/* ngRepeat: (key,value) in itinerary_resp */}
                        <div
                          className="panel panel-default ng-scope"
                          ng-init="dayIndex=$index"
                          ng-repeat="(key,value) in itinerary_resp"
                        >
                          <div
                            className="panel-heading"
                            role="tab"
                            id="heading1"
                            data-bs-toggle="collapse"
                            data-bs-parent="#accordion"
                            data-bs-target="#collapse1"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                          >
                            <h4 className="panel-title">
                              <Link
                                role="button"
                                data-toggle="collapse"
                                data-parent="#accordion"
                                to="#collapse1"
                                aria-expanded="true"
                                aria-controls="collapse1"
                                className="ng-binding"
                              >
                                Day 1
                              </Link>
                            </h4>
                          </div>
                          <div
                            id="collapse1"
                            className="panel-collapse collapse in"
                            role="tabpanel"
                            aria-labelledby="heading1"
                          >
                            <form
                              name="itinerary_form1"
                              id="itinerary_form1"
                              className="ng-pristine ng-valid"
                            >
                              <div
                                className="panel-body noMargin removeMargins"
                                style={{ marginBottom: "0px" }}
                              >
                                <div className="row">
                                  <div className="col-md-12">
                                    <table
                                      width="100%"
                                      cellPadding={2}
                                      cellSpacing={1}
                                      align="center"
                                      border={0}
                                      className="table  table-responsive table-box tableborder"
                                    >
                                      <tbody className="bg-white">
                                        <tr>
                                          <td width="25%" align="left">
                                            <b>Destination</b>
                                          </td>
                                          <td width="25%">
                                            {/* ngRepeat: destination in value.Destinations */}
                                          </td>
                                          <td width="25%" align="left"></td>
                                          <td width="25%"></td>
                                        </tr>
                                        <tr>
                                          <td width="25%" align="left">
                                            <b>Start Meeting Point</b>
                                          </td>
                                          <td width="25%">
                                            <label
                                              ng-bind="ifNoData(value.start_point)"
                                              className="ng-binding"
                                            >
                                              24by7
                                            </label>
                                          </td>
                                          <td width="25%" align="left">
                                            <b>Start Point Address</b>
                                          </td>
                                          <td width="25%">
                                            <label
                                              ng-bind="ifNoData(value.meeting_details)"
                                              className="ng-binding"
                                            >
                                              hotel
                                            </label>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td width="25%" align="left">
                                            <b>End Meeting Point</b>
                                          </td>
                                          <td width="25%">
                                            <label
                                              ng-bind="ifNoData(value.end_point)"
                                              className="ng-binding"
                                            >
                                              24by7
                                            </label>
                                          </td>
                                          <td width="25%" align="left">
                                            <b>End Point Address</b>
                                          </td>
                                          <td width="25%">
                                            <label
                                              ng-bind="ifNoData(value.end_meeting_details)"
                                              className="ng-binding"
                                            >
                                              hotel
                                            </label>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td width="25%" align="left">
                                            <b>Day Description</b>
                                          </td>
                                          <td width="25%" colSpan={3}>
                                            <label
                                              ng-bind="ifNoData(value.day_description)"
                                              className="ng-binding"
                                            >
                                              Day1
                                            </label>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td width="25%" align="left">
                                            <b>Stay in</b>
                                          </td>
                                          <td width="25%">
                                            <label
                                              ng-bind="ifNoData(value.hotels.stay_in_name)"
                                              className="ng-binding"
                                            >
                                              -
                                            </label>
                                          </td>
                                          <td width="25%" align="left">
                                            <b>
                                              Accomodation{" "}
                                              {/* ngIf: value.hotels.length>0 || value.hotels!="" */}
                                              <span
                                                ng-if='value.hotels.length>0 || value.hotels!=""'
                                                className="ng-scope"
                                              >
                                                [Fixed Hotels]{" "}
                                              </span>
                                              {/* end ngIf: value.hotels.length>0 || value.hotels!="" */}
                                            </b>
                                            {/* ngIf: value.hotels.length==0 || value.hotels=="" */}
                                          </td>
                                          <td width="25%">
                                            <div className="row all_acc_div1  fixed_hotel_div1">
                                              {/* ngIf: value.hotels.all_ratings!="" */}
                                              <div
                                                className="row ng-scope"
                                                ng-if='value.hotels.all_ratings!=""'
                                              >
                                                <div className="col-md-12">
                                                  <div className="col-md-10">
                                                    <b>
                                                      Hotel Ratings{" "}
                                                      {/* ngIf: value.hotels.all_ratings!="N" */}
                                                      <span
                                                        ng-if='value.hotels.all_ratings!="N"'
                                                        className="ng-scope"
                                                      >
                                                        (All rating hotels has
                                                        been included){" "}
                                                      </span>
                                                      {/* end ngIf: value.hotels.all_ratings!="N" */}
                                                    </b>{" "}
                                                    <br />
                                                    {/* ngIf: value.hotels.all_ratings!="N" */}
                                                    <span
                                                      ng-if='value.hotels.all_ratings!="N"'
                                                      ng-bind="removeAbbr(value.hotels.all_ratings)"
                                                      className="ng-binding ng-scope"
                                                    />
                                                    {/* end ngIf: value.hotels.all_ratings!="N" */}
                                                    {/* ngIf: value.hotels.all_ratings=="N" */}
                                                  </div>
                                                </div>
                                              </div>
                                              {/* end ngIf: value.hotels.all_ratings!="" */}{" "}
                                              <br />
                                              <div className="row">
                                                <div className="col-md-12">
                                                  <div className="col-md-10">
                                                    <b>Multiple Hotels</b>{" "}
                                                    <br />
                                                    {/* ngRepeat: hotel_name in getArray(value.hotels.hotel_name) */}
                                                    <div
                                                      ng-init="hotelCnt=$index"
                                                      ng-repeat="hotel_name in getArray(value.hotels.hotel_name)"
                                                      className="ng-binding ng-scope"
                                                    >
                                                      1 ]{" "}
                                                      <span
                                                        ng-bind="ifNoData(hotel_name)"
                                                        className="ng-binding"
                                                      >
                                                        -
                                                      </span>
                                                    </div>
                                                    {/* end ngRepeat: hotel_name in getArray(value.hotels.hotel_name) */}
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td width="25%" align="left">
                                            <b>Stay in</b>
                                          </td>
                                          <td width="25%" colSpan={3}>
                                            <label
                                              ng-bind="ifNoData(value.hotels.stay_in_name)"
                                              className="ng-binding"
                                            >
                                              -
                                            </label>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td width="25%" align="left">
                                            <b>Supplier</b>
                                          </td>
                                          <td width="25%">
                                            {/* ngIf: value.hotels.length==0 || value.hotels=="" */}
                                            {/* ngIf: value.hotels.length>0 || value.hotels!="" */}
                                            <span
                                              className="row all_acc_div1  fixed_hotel_div1"
                                              ng-if='value.hotels.length>0 || value.hotels!=""'
                                            >
                                              {/* ngIf: value.hotels.suppliername */}
                                              {/* ngIf: !value.hotels.suppliername */}
                                              <span
                                                ng-if="!value.hotels.suppliername"
                                                className="ng-scope"
                                              >
                                                {" "}
                                                -{" "}
                                              </span>
                                              {/* end ngIf: !value.hotels.suppliername */}
                                            </span>
                                            {/* end ngIf: value.hotels.length>0 || value.hotels!="" */}
                                          </td>
                                          <td width="25%" align="left">
                                            <b>Accomodation</b>
                                          </td>
                                          <td width="25%">
                                            {/* ngIf: value.hotels.length==0 || value.hotels=="" */}
                                            {/* ngIf: value.hotels.length>0 || value.hotels!="" */}
                                            <span
                                              className="row all_acc_div1  fixed_hotel_div1"
                                              ng-if='value.hotels.length>0 || value.hotels!=""'
                                            >
                                              {/* ngIf: value.hotels.hotel_name */}
                                              {/* ngIf: !value.hotels.hotel_name */}
                                              <span
                                                ng-if="!value.hotels.hotel_name"
                                                className="ng-scope"
                                              >
                                                {" "}
                                                -{" "}
                                              </span>
                                              {/* end ngIf: !value.hotels.hotel_name */}
                                            </span>
                                            {/* end ngIf: value.hotels.length>0 || value.hotels!="" */}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td width="25%" align="left">
                                            <b>Inventory Room</b>
                                          </td>
                                          <td width="25%">
                                            <label
                                              ng-bind="ifNoData(value.hotels.inventory_room_class)"
                                              className="ng-binding"
                                            >
                                              -
                                            </label>
                                          </td>
                                          <td width="25%" align="left">
                                            <b>Room Basis</b>
                                          </td>
                                          <td width="25%">
                                            <label
                                              ng-bind="ifNoData(value.hotels.room_basis)"
                                              className="ng-binding"
                                            >
                                              -
                                            </label>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                                {/* ngRepeat: destination in value.Destinations */}
                              </div>
                            </form>
                          </div>
                        </div>
                        {/* end ngRepeat: (key,value) in itinerary_resp */}
                      </div>
                    </div>
                  )}

                  {/* Dates & Prices */}

                  {tab.id === "subtab4" && (
                    <div>
                      <div className="row form-group">
                        <div className="col-md-12">
                          <h4>{tab.label}</h4>
                        </div>
                      </div>
                      <form
                        method="post"
                        name="date_price_form"
                        id="date_price_form"
                        className="ng-pristine ng-valid"
                      >
                        <hr />

                        <br />
                        {/* <div id="exTab1" style="display:block; padding:0px 20px;" ng-init='parentIndex=$index' ng-repeat='response in dateprice_resp'>	 */}
                        <div
                          className="panel-group"
                          id="accordion1"
                          role="tablist"
                          aria-multiselectable="true"
                        >
                          {/* ngRepeat: response in datepriceresp */}
                        </div>
                      </form>
                    </div>
                  )}

                  {/* Cancellation Policy */}

                  {tab.id === "subtab5" && (
                    <div>
                      <div className="row form-group">
                        <div className="col-md-12">
                          <h4>{tab.label}</h4>
                        </div>
                      </div>
                      <div className="tab-content panel-body clearfix removeMargins">
                        <div
                          className="tab-pane ng-scope"
                          id="1a"
                          ng-controller="essentialInfoController"
                        >
                          <form
                            id="package_info"
                            name="package_info"
                            className="ng-pristine ng-valid"
                          >
                            <input
                              type="hidden"
                              name="insert"
                              defaultValue="insert"
                            />
                            <input
                              type="hidden"
                              name="tags_data"
                              id="tags_data"
                              defaultValue
                            />
                            <input
                              type="hidden"
                              name="destinations"
                              id="destinations"
                            />
                            <div className="row form-group">
                              <div className="col-md-12">
                                <h4>Essential Information</h4>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-12">
                                <table
                                  width="100%"
                                  cellPadding={2}
                                  cellSpacing={1}
                                  align="center"
                                  border={0}
                                  className="table  table-responsive table-box tableborder"
                                >
                                  <tbody className="bg-white">
                                    <tr>
                                      <td width="25%" align="left">
                                        <b>Package Code</b>
                                      </td>
                                      <td width="25%">
                                        <div
                                          id="package_code"
                                          ng-bind="packageArrObj.code"
                                          className="ng-binding"
                                        >
                                          938523
                                        </div>
                                      </td>
                                      <td width="25%" align="left">
                                        <b>Type</b>
                                      </td>
                                      <td width="25%">
                                        <div
                                          id="type"
                                          ng-bind="packageArrObj.type"
                                          className="ng-binding"
                                        >
                                          semi-dynamic
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td width="25%" align="left">
                                        <b>Sub Type</b>
                                      </td>
                                      <td width="25%">
                                        <div
                                          id="sub_type"
                                          ng-bind="packageArrObj.sub_type"
                                          className="ng-binding"
                                        >
                                          inbound
                                        </div>
                                      </td>
                                      <td width="25%" align="left">
                                        <b>Services Included</b>
                                      </td>
                                      <td width="25%">
                                        <div id="services">
                                          Hotel
                                          <br />
                                          Activity
                                          <br />
                                          Transfer
                                          <br />
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td width="25%" align="left">
                                        <b>Category Theme</b>
                                      </td>
                                      <td width="25%">
                                        <div id="theme">
                                          Mumbai Dhamaal
                                          <br />
                                          Adventure
                                          <br />
                                          Family
                                          <br />
                                          Historical
                                          <br />
                                        </div>
                                      </td>
                                      <td width="25%" align="left">
                                        <b>Physical Level</b>
                                      </td>
                                      <td width="25%">
                                        <div id="physical_level">
                                          ggd
                                          <br />
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td width="25%" align="left">
                                        <b>Tags</b>
                                      </td>
                                      <td width="25%">
                                        <div id="tags_suggest_box">
                                          {/* ngRepeat: tags in tagsArrObj track by $index */}
                                          {/* ngIf: tagsArrObj.length==0 */}
                                          <p
                                            className="tags ng-scope"
                                            ng-if="tagsArrObj.length==0"
                                          >
                                            -
                                          </p>
                                          {/* end ngIf: tagsArrObj.length==0 */}
                                        </div>
                                      </td>
                                      <td width="25%" align="left">
                                        <b>Age Group</b>
                                      </td>
                                      <td width="25%">
                                        {/* ngIf: age.age=="group" */}
                                        {/* ngIf: age.age!="group" */}
                                        <div
                                          ng-if='age.age!="group"'
                                          className="ng-scope"
                                        >
                                          <div
                                            ng-bind="age.age"
                                            className="ng-binding"
                                          >
                                            all
                                          </div>
                                        </div>
                                        {/* end ngIf: age.age!="group" */}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td width="25%" align="left">
                                        <b>No. of Days</b>
                                      </td>
                                      <td width="25%">
                                        <div
                                          id="days"
                                          ng-bind="packageArrObj.days"
                                          className="ng-binding"
                                        >
                                          1
                                        </div>
                                      </td>
                                      <td width="25%" align="left">
                                        <b>Package Type</b>
                                      </td>
                                      <td width="25%">
                                        <div
                                          id="package_type"
                                          ng-bind="packageArrObj.package_type"
                                          className="ng-binding"
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td width="25%" align="left">
                                        <b>Min Adult</b>
                                      </td>
                                      <td width="25%">
                                        <div
                                          ng-bind="packageArrObj.min_adult"
                                          className="ng-binding"
                                        >
                                          1
                                        </div>
                                      </td>
                                      <td width="25%" align="left">
                                        <b>Max Adult</b>
                                      </td>
                                      <td width="25%">
                                        <div
                                          ng-bind="packageArrObj.max_adult"
                                          className="ng-binding"
                                        >
                                          10
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td width="25%" align="left">
                                        <b>Min Child</b>
                                      </td>
                                      <td width="25%">
                                        <div
                                          ng-bind="packageArrObj.min_child"
                                          className="ng-binding"
                                        >
                                          0
                                        </div>
                                      </td>
                                      <td width="25%" align="left">
                                        <b>Max Child</b>
                                      </td>
                                      <td width="25%">
                                        <div
                                          ng-bind="packageArrObj.max_child"
                                          className="ng-binding"
                                        >
                                          0
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                            <div className="row form-group">
                              <div className="col-md-12">
                                <h4>Destinations</h4>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-12">
                                <div className="dataTables_scroll">
                                  <table
                                    id="visa_requirements_table"
                                    className="table   table-responsive"
                                  >
                                    <thead>
                                      <tr className="bg-primary">
                                        <th>Country</th>
                                        <th>City</th>
                                        <th>Visa Included</th>
                                        <th>Show Visa Requirements</th>
                                      </tr>
                                    </thead>
                                    <tbody id="visa_requirements_tr">
                                      {/* ngRepeat: cityInfo in destinationArrObj */}
                                      <tr
                                        className="dest ng-scope"
                                        ng-repeat="cityInfo in destinationArrObj"
                                      >
                                        <td
                                          className="country_id ng-binding"
                                          id={106}
                                        >
                                          India
                                        </td>
                                        <td
                                          className="city_id ng-binding"
                                          id={64440}
                                        >
                                          Mumbai
                                        </td>
                                        <td id="no" className="ng-binding">
                                          no
                                        </td>
                                        <td id className="ng-binding">
                                          no
                                        </td>
                                      </tr>
                                      {/* end ngRepeat: cityInfo in destinationArrObj */}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                        <div className="tab-pane" id="2a">
                          <input
                            type="hidden"
                            name="img_location"
                            id="img_location"
                            defaultValue="project_folder/tdonline/uploads/package_images/"
                          />
                          <form
                            id="package_details_info"
                            name="package_details_info"
                            className="ng-pristine ng-valid"
                          >
                            <div className="form-group">
                              <h4>Package Details</h4>
                            </div>
                            <div className="row">
                              <div className="col-md-12">
                                <table
                                  width="100%"
                                  cellPadding={2}
                                  cellSpacing={1}
                                  align="center"
                                  border={0}
                                  className="table  table-responsive table-box tableborder"
                                >
                                  <tbody className="bg-white">
                                    <tr>
                                      <td width="25%" align="left">
                                        <b>Package Code</b>
                                      </td>
                                      <td width="25%">
                                        <div className="pull-left pack_code">
                                          938523
                                        </div>
                                        {/* <div class="pull-right packages_selected_lang"></div> */}
                                      </td>
                                      <td width="25%" align="left">
                                        <b>Name</b>
                                      </td>
                                      <td width="25%">
                                        <div
                                          name="package_name"
                                          id="package_name"
                                        >
                                          fgffg
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td width="25%" align="left">
                                        <b>Short Description</b>
                                      </td>
                                      <td width="25%">
                                        <div
                                          name="short_description"
                                          id="short_description"
                                        >
                                          <p>gfggfg</p>
                                          <p></p>
                                          <p>&nbsp;</p>
                                          <p />
                                        </div>
                                      </td>
                                      <td width="25%" align="left">
                                        <b>Long Description</b>
                                      </td>
                                      <td width="25%">
                                        <div
                                          name="long_description"
                                          id="long_description"
                                        >
                                          <p>sdsds</p>
                                          <p></p>
                                          <p>&nbsp;</p>
                                          <p />
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td width="25%" align="left">
                                        <b>Useful Information</b>
                                      </td>
                                      <td width="25%">
                                        <div id="useful_info" />
                                      </td>
                                      <td width="25%" align="left"></td>
                                      <td width="25%"></td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                            <div
                              className="panel-body-essen"
                              style={{ display: "none" }}
                            >
                              <div className="form-group">
                                <h4>Gallery Image</h4>
                              </div>
                              <div className="row" id="destination_block">
                                <div className="col-md-12">
                                  <div className>
                                    <div className="form-group">
                                      <h4>Mumbai</h4>
                                    </div>
                                    <div className="searchable-container">
                                      <div className="items">
                                        <div className="info-block block-info clearfix">
                                          <div
                                            data-toggle="buttons"
                                            className="btn-group bizmoduleselect"
                                            id="img_list_dest64440"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                        <div className="tab-pane" id="3a">
                          <div className="form-group">
                            <h4>Itinerary</h4>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-md-6">
                              <div className="pull-left">
                                <h6 className="pack_code">938523</h6>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="pull-right packages_selected_lang"></div>
                            </div>
                          </div>
                          <br />
                          <div
                            className="panel-group"
                            id="accordion"
                            role="tablist"
                            aria-multiselectable="true"
                          >
                            {/* ngRepeat: (key,value) in itinerary_resp */}
                            <div
                              className="panel panel-default ng-scope"
                              ng-init="dayIndex=$index"
                              ng-repeat="(key,value) in itinerary_resp"
                            >
                              <div
                                className="panel-heading"
                                role="tab"
                                id="heading1"
                                data-toggle="collapse"
                                data-parent="#accordion"
                                data-target="#collapse1"
                                aria-expanded="true"
                                aria-controls="collapseOne"
                              >
                                <h4 className="panel-title">
                                  <Link
                                    role="button"
                                    data-toggle="collapse"
                                    data-parent="#accordion"
                                    to="#collapse1"
                                    aria-expanded="true"
                                    aria-controls="collapse1"
                                    className="ng-binding"
                                  >
                                    Day 1
                                  </Link>
                                </h4>
                              </div>
                              <div
                                id="collapse1"
                                className="panel-collapse collapse in"
                                role="tabpanel"
                                aria-labelledby="heading1"
                              >
                                <form
                                  name="itinerary_form1"
                                  id="itinerary_form1"
                                  className="ng-pristine ng-valid"
                                >
                                  <div
                                    className="panel-body noMargin removeMargins"
                                    style={{ marginBottom: "0px" }}
                                  >
                                    <div className="row">
                                      <div className="col-md-12">
                                        <table
                                          width="100%"
                                          cellPadding={2}
                                          cellSpacing={1}
                                          align="center"
                                          border={0}
                                          className="table  table-responsive table-box tableborder"
                                        >
                                          <tbody className="bg-white">
                                            <tr>
                                              <td width="25%" align="left">
                                                <b>Destination</b>
                                              </td>
                                              <td width="25%">
                                                {/* ngRepeat: destination in value.Destinations */}
                                              </td>
                                              <td width="25%" align="left"></td>
                                              <td width="25%"></td>
                                            </tr>
                                            <tr>
                                              <td width="25%" align="left">
                                                <b>Start Meeting Point</b>
                                              </td>
                                              <td width="25%">
                                                <label
                                                  ng-bind="ifNoData(value.start_point)"
                                                  className="ng-binding"
                                                >
                                                  24by7
                                                </label>
                                              </td>
                                              <td width="25%" align="left">
                                                <b>Start Point Address</b>
                                              </td>
                                              <td width="25%">
                                                <label
                                                  ng-bind="ifNoData(value.meeting_details)"
                                                  className="ng-binding"
                                                >
                                                  hotel
                                                </label>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td width="25%" align="left">
                                                <b>End Meeting Point</b>
                                              </td>
                                              <td width="25%">
                                                <label
                                                  ng-bind="ifNoData(value.end_point)"
                                                  className="ng-binding"
                                                >
                                                  24by7
                                                </label>
                                              </td>
                                              <td width="25%" align="left">
                                                <b>End Point Address</b>
                                              </td>
                                              <td width="25%">
                                                <label
                                                  ng-bind="ifNoData(value.end_meeting_details)"
                                                  className="ng-binding"
                                                >
                                                  hotel
                                                </label>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td width="25%" align="left">
                                                <b>Day Description</b>
                                              </td>
                                              <td width="25%" colSpan={3}>
                                                <label
                                                  ng-bind="ifNoData(value.day_description)"
                                                  className="ng-binding"
                                                >
                                                  Day1
                                                </label>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td width="25%" align="left">
                                                <b>Stay in</b>
                                              </td>
                                              <td width="25%">
                                                <label
                                                  ng-bind="ifNoData(value.hotels.stay_in_name)"
                                                  className="ng-binding"
                                                >
                                                  -
                                                </label>
                                              </td>
                                              <td width="25%" align="left">
                                                <b>
                                                  Accomodation{" "}
                                                  {/* ngIf: value.hotels.length>0 || value.hotels!="" */}
                                                  <span
                                                    ng-if='value.hotels.length>0 || value.hotels!=""'
                                                    className="ng-scope"
                                                  >
                                                    [Fixed Hotels]{" "}
                                                  </span>
                                                  {/* end ngIf: value.hotels.length>0 || value.hotels!="" */}
                                                </b>
                                                {/* ngIf: value.hotels.length==0 || value.hotels=="" */}
                                              </td>
                                              <td width="25%">
                                                <div className="row all_acc_div1  fixed_hotel_div1">
                                                  {/* ngIf: value.hotels.all_ratings!="" */}
                                                  <div
                                                    className="row ng-scope"
                                                    ng-if='value.hotels.all_ratings!=""'
                                                  >
                                                    <div className="col-md-12">
                                                      <div className="col-md-10">
                                                        <b>
                                                          Hotel Ratings{" "}
                                                          {/* ngIf: value.hotels.all_ratings!="N" */}
                                                          <span
                                                            ng-if='value.hotels.all_ratings!="N"'
                                                            className="ng-scope"
                                                          >
                                                            (All rating hotels
                                                            has been included){" "}
                                                          </span>
                                                          {/* end ngIf: value.hotels.all_ratings!="N" */}
                                                        </b>{" "}
                                                        <br />
                                                        {/* ngIf: value.hotels.all_ratings!="N" */}
                                                        <span
                                                          ng-if='value.hotels.all_ratings!="N"'
                                                          ng-bind="removeAbbr(value.hotels.all_ratings)"
                                                          className="ng-binding ng-scope"
                                                        />
                                                        {/* end ngIf: value.hotels.all_ratings!="N" */}
                                                        {/* ngIf: value.hotels.all_ratings=="N" */}
                                                      </div>
                                                    </div>
                                                  </div>
                                                  {/* end ngIf: value.hotels.all_ratings!="" */}{" "}
                                                  <br />
                                                  <div className="row">
                                                    <div className="col-md-12">
                                                      <div className="col-md-10">
                                                        <b>Multiple Hotels</b>{" "}
                                                        <br />
                                                        {/* ngRepeat: hotel_name in getArray(value.hotels.hotel_name) */}
                                                        <div
                                                          ng-init="hotelCnt=$index"
                                                          ng-repeat="hotel_name in getArray(value.hotels.hotel_name)"
                                                          className="ng-binding ng-scope"
                                                        >
                                                          1 ]{" "}
                                                          <span
                                                            ng-bind="ifNoData(hotel_name)"
                                                            className="ng-binding"
                                                          >
                                                            -
                                                          </span>
                                                        </div>
                                                        {/* end ngRepeat: hotel_name in getArray(value.hotels.hotel_name) */}
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td width="25%" align="left">
                                                <b>Stay in</b>
                                              </td>
                                              <td width="25%" colSpan={3}>
                                                <label
                                                  ng-bind="ifNoData(value.hotels.stay_in_name)"
                                                  className="ng-binding"
                                                >
                                                  -
                                                </label>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td width="25%" align="left">
                                                <b>Supplier</b>
                                              </td>
                                              <td width="25%">
                                                {/* ngIf: value.hotels.length==0 || value.hotels=="" */}
                                                {/* ngIf: value.hotels.length>0 || value.hotels!="" */}
                                                <span
                                                  className="row all_acc_div1  fixed_hotel_div1"
                                                  ng-if='value.hotels.length>0 || value.hotels!=""'
                                                >
                                                  {/* ngIf: value.hotels.suppliername */}
                                                  {/* ngIf: !value.hotels.suppliername */}
                                                  <span
                                                    ng-if="!value.hotels.suppliername"
                                                    className="ng-scope"
                                                  >
                                                    {" "}
                                                    -{" "}
                                                  </span>
                                                  {/* end ngIf: !value.hotels.suppliername */}
                                                </span>
                                                {/* end ngIf: value.hotels.length>0 || value.hotels!="" */}
                                              </td>
                                              <td width="25%" align="left">
                                                <b>Accomodation</b>
                                              </td>
                                              <td width="25%">
                                                {/* ngIf: value.hotels.length==0 || value.hotels=="" */}
                                                {/* ngIf: value.hotels.length>0 || value.hotels!="" */}
                                                <span
                                                  className="row all_acc_div1  fixed_hotel_div1"
                                                  ng-if='value.hotels.length>0 || value.hotels!=""'
                                                >
                                                  {/* ngIf: value.hotels.hotel_name */}
                                                  {/* ngIf: !value.hotels.hotel_name */}
                                                  <span
                                                    ng-if="!value.hotels.hotel_name"
                                                    className="ng-scope"
                                                  >
                                                    {" "}
                                                    -{" "}
                                                  </span>
                                                  {/* end ngIf: !value.hotels.hotel_name */}
                                                </span>
                                                {/* end ngIf: value.hotels.length>0 || value.hotels!="" */}
                                              </td>
                                            </tr>
                                            <tr>
                                              <td width="25%" align="left">
                                                <b>Inventory Room</b>
                                              </td>
                                              <td width="25%">
                                                <label
                                                  ng-bind="ifNoData(value.hotels.inventory_room_class)"
                                                  className="ng-binding"
                                                >
                                                  -
                                                </label>
                                              </td>
                                              <td width="25%" align="left">
                                                <b>Room Basis</b>
                                              </td>
                                              <td width="25%">
                                                <label
                                                  ng-bind="ifNoData(value.hotels.room_basis)"
                                                  className="ng-binding"
                                                >
                                                  -
                                                </label>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                    {/* ngRepeat: destination in value.Destinations */}
                                  </div>
                                </form>
                              </div>
                            </div>
                            {/* end ngRepeat: (key,value) in itinerary_resp */}
                          </div>
                        </div>
                        <div
                          className="tab-pane ng-scope"
                          id="4a"
                          ng-controller="datepriceController"
                        >
                          <form
                            method="post"
                            name="date_price_form"
                            id="date_price_form"
                            className="ng-pristine ng-valid"
                          >
                            <div className="form-group">
                              <h4>Dates and Price</h4>
                            </div>
                            <hr />
                            {/* <div class="row">
                                      <div class="col-md-12">
                                          <div class="radio radio-success radio-inline">
                                              <input id="open_dates" type='radio' name='dates_and_price' value='open' checked="checked" class="date_price_required">
                                              <label for="open_dates">Open Dates</label>
                                          </div>
                                          <div class="radio radio-success radio-inline">
                                              <input id="serious_departure" type='radio' name='dates_and_price' value='series' class="date_price_required">
                                              <label for="serious_departure">Series Departure</label>
                                          </div>
                                      </div>
                                  </div> */}
                            <br />
                            {/* <div id="exTab1" style="display:block; padding:0px 20px;" ng-init='parentIndex=$index' ng-repeat='response in dateprice_resp'>	 */}
                            <div
                              className="panel-group"
                              id="accordion1"
                              role="tablist"
                              aria-multiselectable="true"
                            >
                              {/* ngRepeat: response in datepriceresp */}
                            </div>
                            {/* <div class="tab-pane" id="2a_date">
                  
                                  </div> */}
                          </form>
                        </div>
                        <div className="tab-pane active" id="5a">
                          <div className="form-group">
                            <h4>Cancellation Policy</h4>
                          </div>
                          <form
                            name="add_cancellaltion_policy"
                            id="add_cancellaltion_policy"
                            className="ng-pristine ng-valid"
                          >
                            <div className="policy">
                              <div id="can_policy" />
                            </div>
                          </form>
                        </div>
                        <div className="tab-pane" id="6a">
                          <form
                            id="terms_policies_form"
                            name="terms_policies_form"
                            className="ng-pristine ng-valid"
                          >
                            <div className="row">
                              <br />
                              <div className="col-md-12">
                                <div
                                  className="pull-right"
                                  id="term_policy_lang"
                                ></div>
                              </div>
                            </div>
                            {/* Cancellation */}
                            <div className="form-group">
                              <h4>Cancellation Policy</h4>
                            </div>
                            <hr className="mr_bt" />
                            <div className="row">
                              <div className="form-group col-md-12">
                                <label style={{ visibility: "hidden" }}>
                                  Cancellation Policy
                                </label>
                                <div name="cancellation" id="cancellation" />
                              </div>
                            </div>
                            {/* Cancellation */}
                            {/* Important Notes */}
                            <div className="form-group">
                              <h4>Important Notes</h4>
                            </div>
                            <hr className="mr_bt" />
                            <div className="row">
                              <div className="form-group col-md-12">
                                <label style={{ visibility: "hidden" }}>
                                  Important Notes
                                </label>
                                <div
                                  name="important_notes"
                                  id="important_notes"
                                />
                              </div>
                            </div>
                            {/* Important Notes */}
                            {/* Important Notes */}
                            <div className="form-group">
                              <h4>Other Terms &amp; Conditions</h4>
                            </div>
                            <hr className="mr_bt" />
                            <div className="row">
                              <div className="form-group col-md-12">
                                <label style={{ visibility: "hidden" }}>
                                  {" "}
                                  Other Terms &amp; Conditions
                                </label>
                                <div
                                  name="other_terms_conditions"
                                  id="other_terms_conditions"
                                />
                              </div>
                            </div>
                            {/* Important Notes */}
                            <br />
                          </form>
                        </div>
                        <div className="tab-pane" id="7a">
                          <form
                            className="inclusion_exclusion_data ng-pristine ng-valid"
                            id="inclusion_exclusion_data"
                          >
                            <div className="row">
                              <div className="form-group col-md-12">
                                <h4
                                  style={{
                                    backgroundColor: "#FF5015",
                                    padding: "10px 20px",
                                    color: "#FFF",
                                  }}
                                >
                                  Inclusions
                                </h4>
                              </div>
                            </div>
                            {/* Inclusions */}
                            <div className="row">
                              <div className="form-group col-md-3">
                                <label>Insurance</label>
                                <div name="insurance" id="insurance" />
                              </div>
                              <div className="form-group col-md-3">
                                <label>Tour Guide</label>
                                <div name="tour_guide" id="tour_guide" />
                              </div>
                              <div className="form-group col-md-3">
                                <label>Preset Inclusions</label>
                                <div
                                  name="inclusion_list"
                                  id="inclusion_list"
                                />
                              </div>
                              <div className="form-group col-md-3">
                                <label>Other Inclusions</label>
                                <div
                                  name="other_inclusions"
                                  id="other_inclusions"
                                />
                              </div>
                            </div>
                            <hr />
                            {/* Inclusions */}
                            {/* Exclusions */}
                            <div className="row">
                              <div className="form-group col-md-12">
                                <h4
                                  style={{
                                    backgroundColor: "#FF5015",
                                    padding: "10px 20px",
                                    color: "#FFF",
                                  }}
                                >
                                  Exclusions
                                </h4>
                              </div>
                            </div>
                            <div className="row">
                              <div className="form-group col-md-3">
                                <label>Tour Guide</label>
                                <div
                                  name="tour_guide_exclusion"
                                  id="tour_guide_exclusion"
                                />
                              </div>
                              {/* <div class="form-group col-md-3">
                                              <label>Entrance Fees</label>
                                              <div name='entrance_fees' id="entrance_fees"></div>
                                          </div> */}
                              <div className="form-group col-md-3">
                                <label>Tips and Porterage</label>
                                <div
                                  name="tips_and_porterage"
                                  id="tips_and_porterage"
                                />
                              </div>
                              <div className="form-group col-md-3">
                                <label>Preset Exclusions</label>
                                <div
                                  name="exclusion_list"
                                  id="exclusion_list"
                                />
                              </div>
                              <div className="form-group col-md-3">
                                <label>Other Exclusions</label>
                                <div
                                  name="other_exclusions"
                                  id="other_exclusions"
                                />
                              </div>
                            </div>
                            {/* Exclusions */}
                          </form>
                        </div>
                        <div className="tab-pane" id="8a">
                          <br />
                          <div className="row">
                            <div className="col-md-12">
                              <div className="pull-right packages_selected_lang"></div>
                            </div>
                          </div>
                          <div className="form-group">
                            <h4>Reviews</h4>
                          </div>
                          <hr />
                          <form
                            name="add_review_form"
                            id="add_review_form"
                            className="ng-pristine ng-valid"
                          >
                            <div className="row">
                              <div className="form-group col-md-3">
                                <label>Name</label>
                                <input
                                  type="text"
                                  name="review_cust_name"
                                  id="review_cust_name"
                                  className="form-control review_required required"
                                  defaultValue
                                />
                              </div>
                              <div className="form-group col-md-3">
                                <label>Nationality</label>
                                <select
                                  name="select_nationality_review"
                                  id="select_nationality_review"
                                  className="show-menu-arrow form-control review_required required"
                                >
                                  <option value>Select Nationality</option>
                                </select>
                              </div>
                            </div>
                            <div className="row">
                              <div className="form-group col-md-3">
                                <label>Package Date</label>
                                <div
                                  className="input-group date col-md-12 col-sm-12 col-xs-12"
                                  id="period_date4"
                                >
                                  <input
                                    id="datepicker1"
                                    name="review_date"
                                    className="review_required form-control review_date required"
                                    type="text"
                                    defaultValue
                                  />
                                  <span className="input-group-addon">
                                    <i className="glyphicon glyphicon-th" />
                                  </span>
                                </div>
                              </div>
                              <div className="form-group col-md-3">
                                <label>Ratings</label>
                                <div className="star_rating" id="star_rating">
                                  <div className="jr-ratenode jr-nomal" />
                                  <div className="jr-ratenode jr-nomal " />
                                  <div className="jr-ratenode jr-nomal " />
                                  <div className="jr-ratenode jr-nomal " />
                                  <div className="jr-ratenode jr-nomal " />
                                  <input
                                    type="hidden"
                                    name="rating"
                                    id="rating"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-12">
                                <label>Reviews</label>
                                <div
                                  id="mceu_13"
                                  className="mce-tinymce mce-container mce-panel"
                                  hidefocus={1}
                                  tabIndex={-1}
                                  role="application"
                                  style={{
                                    visibility: "hidden",
                                    borderWidth: "1px",
                                  }}
                                >
                                  <div
                                    id="mceu_13-body"
                                    className="mce-container-body mce-stack-layout"
                                  >
                                    <div
                                      id="mceu_14"
                                      className="mce-container mce-menubar mce-toolbar mce-first mce-stack-layout-item"
                                      role="menubar"
                                      style={{ borderWidth: "0px 0px 1px" }}
                                    >
                                      <div
                                        id="mceu_14-body"
                                        className="mce-container-body mce-flow-layout"
                                      >
                                        <div
                                          id="mceu_15"
                                          className="mce-widget mce-btn mce-menubtn mce-first mce-flow-layout-item"
                                          tabIndex={-1}
                                          aria-labelledby="mceu_15"
                                          role="menuitem"
                                          aria-haspopup="true"
                                        >
                                          <button
                                            id="mceu_15-open"
                                            role="presentation"
                                            type="button"
                                            tabIndex={-1}
                                          >
                                            <span>File</span>{" "}
                                            <i className="mce-caret" />
                                          </button>
                                        </div>
                                        <div
                                          id="mceu_16"
                                          className="mce-widget mce-btn mce-menubtn mce-flow-layout-item"
                                          tabIndex={-1}
                                          aria-labelledby="mceu_16"
                                          role="menuitem"
                                          aria-haspopup="true"
                                        >
                                          <button
                                            id="mceu_16-open"
                                            role="presentation"
                                            type="button"
                                            tabIndex={-1}
                                          >
                                            <span>Edit</span>{" "}
                                            <i className="mce-caret" />
                                          </button>
                                        </div>
                                        <div
                                          id="mceu_17"
                                          className="mce-widget mce-btn mce-menubtn mce-flow-layout-item"
                                          tabIndex={-1}
                                          aria-labelledby="mceu_17"
                                          role="menuitem"
                                          aria-haspopup="true"
                                        >
                                          <button
                                            id="mceu_17-open"
                                            role="presentation"
                                            type="button"
                                            tabIndex={-1}
                                          >
                                            <span>View</span>{" "}
                                            <i className="mce-caret" />
                                          </button>
                                        </div>
                                        <div
                                          id="mceu_18"
                                          className="mce-widget mce-btn mce-menubtn mce-last mce-flow-layout-item"
                                          tabIndex={-1}
                                          aria-labelledby="mceu_18"
                                          role="menuitem"
                                          aria-haspopup="true"
                                        >
                                          <button
                                            id="mceu_18-open"
                                            role="presentation"
                                            type="button"
                                            tabIndex={-1}
                                          >
                                            <span>Format</span>{" "}
                                            <i className="mce-caret" />
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      id="mceu_19"
                                      className="mce-toolbar-grp mce-container mce-panel mce-stack-layout-item"
                                      hidefocus={1}
                                      tabIndex={-1}
                                      role="group"
                                    >
                                      <div
                                        id="mceu_19-body"
                                        className="mce-container-body mce-stack-layout"
                                      >
                                        <div
                                          id="mceu_20"
                                          className="mce-container mce-toolbar mce-first mce-last mce-stack-layout-item"
                                          role="toolbar"
                                        >
                                          <div
                                            id="mceu_20-body"
                                            className="mce-container-body mce-flow-layout"
                                          >
                                            <div
                                              id="mceu_21"
                                              className="mce-container mce-first mce-flow-layout-item mce-btn-group"
                                              role="group"
                                            >
                                              <div id="mceu_21-body">
                                                <div
                                                  id="mceu_0"
                                                  className="mce-widget mce-btn mce-first mce-disabled"
                                                  tabIndex={-1}
                                                  aria-labelledby="mceu_0"
                                                  role="button"
                                                  aria-label="Undo"
                                                  aria-disabled="true"
                                                >
                                                  <button
                                                    role="presentation"
                                                    type="button"
                                                    tabIndex={-1}
                                                  >
                                                    <i className="mce-ico mce-i-undo" />
                                                  </button>
                                                </div>
                                                <div
                                                  id="mceu_1"
                                                  className="mce-widget mce-btn mce-last mce-disabled"
                                                  tabIndex={-1}
                                                  aria-labelledby="mceu_1"
                                                  role="button"
                                                  aria-label="Redo"
                                                  aria-disabled="true"
                                                >
                                                  <button
                                                    role="presentation"
                                                    type="button"
                                                    tabIndex={-1}
                                                  >
                                                    <i className="mce-ico mce-i-redo" />
                                                  </button>
                                                </div>
                                              </div>
                                            </div>
                                            <div
                                              id="mceu_22"
                                              className="mce-container mce-flow-layout-item mce-btn-group"
                                              role="group"
                                            >
                                              <div id="mceu_22-body">
                                                <div
                                                  id="mceu_2"
                                                  className="mce-widget mce-btn mce-menubtn mce-first mce-last"
                                                  tabIndex={-1}
                                                  aria-labelledby="mceu_2"
                                                  role="button"
                                                  aria-haspopup="true"
                                                >
                                                  <button
                                                    id="mceu_2-open"
                                                    role="presentation"
                                                    type="button"
                                                    tabIndex={-1}
                                                  >
                                                    <span>Formats</span>{" "}
                                                    <i className="mce-caret" />
                                                  </button>
                                                </div>
                                              </div>
                                            </div>
                                            <div
                                              id="mceu_23"
                                              className="mce-container mce-flow-layout-item mce-btn-group"
                                              role="group"
                                            >
                                              <div id="mceu_23-body">
                                                <div
                                                  id="mceu_3"
                                                  className="mce-widget mce-btn mce-first"
                                                  tabIndex={-1}
                                                  aria-labelledby="mceu_3"
                                                  role="button"
                                                  aria-label="Bold"
                                                >
                                                  <button
                                                    role="presentation"
                                                    type="button"
                                                    tabIndex={-1}
                                                  >
                                                    <i className="mce-ico mce-i-bold" />
                                                  </button>
                                                </div>
                                                <div
                                                  id="mceu_4"
                                                  className="mce-widget mce-btn mce-last"
                                                  tabIndex={-1}
                                                  aria-labelledby="mceu_4"
                                                  role="button"
                                                  aria-label="Italic"
                                                >
                                                  <button
                                                    role="presentation"
                                                    type="button"
                                                    tabIndex={-1}
                                                  >
                                                    <i className="mce-ico mce-i-italic" />
                                                  </button>
                                                </div>
                                              </div>
                                            </div>
                                            <div
                                              id="mceu_24"
                                              className="mce-container mce-flow-layout-item mce-btn-group"
                                              role="group"
                                            >
                                              <div id="mceu_24-body">
                                                <div
                                                  id="mceu_5"
                                                  className="mce-widget mce-btn mce-first"
                                                  tabIndex={-1}
                                                  aria-labelledby="mceu_5"
                                                  role="button"
                                                  aria-label="Align left"
                                                >
                                                  <button
                                                    role="presentation"
                                                    type="button"
                                                    tabIndex={-1}
                                                  >
                                                    <i className="mce-ico mce-i-alignleft" />
                                                  </button>
                                                </div>
                                                <div
                                                  id="mceu_6"
                                                  className="mce-widget mce-btn"
                                                  tabIndex={-1}
                                                  aria-labelledby="mceu_6"
                                                  role="button"
                                                  aria-label="Align center"
                                                >
                                                  <button
                                                    role="presentation"
                                                    type="button"
                                                    tabIndex={-1}
                                                  >
                                                    <i className="mce-ico mce-i-aligncenter" />
                                                  </button>
                                                </div>
                                                <div
                                                  id="mceu_7"
                                                  className="mce-widget mce-btn"
                                                  tabIndex={-1}
                                                  aria-labelledby="mceu_7"
                                                  role="button"
                                                  aria-label="Align right"
                                                >
                                                  <button
                                                    role="presentation"
                                                    type="button"
                                                    tabIndex={-1}
                                                  >
                                                    <i className="mce-ico mce-i-alignright" />
                                                  </button>
                                                </div>
                                                <div
                                                  id="mceu_8"
                                                  className="mce-widget mce-btn mce-last"
                                                  tabIndex={-1}
                                                  aria-labelledby="mceu_8"
                                                  role="button"
                                                  aria-label="Justify"
                                                >
                                                  <button
                                                    role="presentation"
                                                    type="button"
                                                    tabIndex={-1}
                                                  >
                                                    <i className="mce-ico mce-i-alignjustify" />
                                                  </button>
                                                </div>
                                              </div>
                                            </div>
                                            <div
                                              id="mceu_25"
                                              className="mce-container mce-flow-layout-item mce-btn-group"
                                              role="group"
                                            >
                                              <div id="mceu_25-body">
                                                <div
                                                  id="mceu_9"
                                                  className="mce-widget mce-btn mce-first"
                                                  tabIndex={-1}
                                                  aria-labelledby="mceu_9"
                                                  role="button"
                                                  aria-label="Bullet list"
                                                >
                                                  <button
                                                    role="presentation"
                                                    type="button"
                                                    tabIndex={-1}
                                                  >
                                                    <i className="mce-ico mce-i-bullist" />
                                                  </button>
                                                </div>
                                                <div
                                                  id="mceu_10"
                                                  className="mce-widget mce-btn"
                                                  tabIndex={-1}
                                                  aria-labelledby="mceu_10"
                                                  role="button"
                                                  aria-label="Numbered list"
                                                >
                                                  <button
                                                    role="presentation"
                                                    type="button"
                                                    tabIndex={-1}
                                                  >
                                                    <i className="mce-ico mce-i-numlist" />
                                                  </button>
                                                </div>
                                                <div
                                                  id="mceu_11"
                                                  className="mce-widget mce-btn"
                                                  tabIndex={-1}
                                                  aria-labelledby="mceu_11"
                                                  role="button"
                                                  aria-label="Decrease indent"
                                                >
                                                  <button
                                                    role="presentation"
                                                    type="button"
                                                    tabIndex={-1}
                                                  >
                                                    <i className="mce-ico mce-i-outdent" />
                                                  </button>
                                                </div>
                                                <div
                                                  id="mceu_12"
                                                  className="mce-widget mce-btn mce-last"
                                                  tabIndex={-1}
                                                  aria-labelledby="mceu_12"
                                                  role="button"
                                                  aria-label="Increase indent"
                                                >
                                                  <button
                                                    role="presentation"
                                                    type="button"
                                                    tabIndex={-1}
                                                  >
                                                    <i className="mce-ico mce-i-indent" />
                                                  </button>
                                                </div>
                                              </div>
                                            </div>
                                            <div
                                              id="mceu_26"
                                              className="mce-container mce-last mce-flow-layout-item mce-btn-group"
                                              role="group"
                                            >
                                              <div id="mceu_26-body" />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      id="mceu_27"
                                      className="mce-edit-area mce-container mce-panel mce-stack-layout-item"
                                      hidefocus={1}
                                      tabIndex={-1}
                                      role="group"
                                      style={{ borderWidth: "1px 0px 0px" }}
                                    >
                                      <iframe
                                        id="review_description_ifr"
                                        frameBorder={0}
                                        allowTransparency="true"
                                        title="Rich Text Area. Press ALT-F9 for menu. Press ALT-F10 for toolbar. Press ALT-0 for help"
                                        src='javascript""'
                                        style={{
                                          width: "100%",
                                          height: "100px",
                                          display: "block",
                                        }}
                                      />
                                    </div>
                                    <div
                                      id="mceu_28"
                                      className="mce-statusbar mce-container mce-panel mce-last mce-stack-layout-item"
                                      hidefocus={1}
                                      tabIndex={-1}
                                      role="group"
                                      style={{ borderWidth: "1px 0px 0px" }}
                                    >
                                      <div
                                        id="mceu_28-body"
                                        className="mce-container-body mce-flow-layout"
                                      >
                                        <div
                                          id="mceu_29"
                                          className="mce-path mce-first mce-flow-layout-item"
                                        >
                                          <div
                                            className="mce-path-item mce-last"
                                            data-index={0}
                                            tabIndex={-1}
                                            id="mceu_29-0"
                                            aria-level={0}
                                          >
                                            p
                                          </div>
                                        </div>
                                        <div
                                          id="mceu_30"
                                          className="mce-last mce-flow-layout-item mce-resizehandle"
                                        >
                                          <i className="mce-ico mce-i-resize" />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <textarea
                                  name="review_description"
                                  id="review_description"
                                  className="form-control review_required required"
                                  rows={5}
                                  aria-hidden="true"
                                  style={{ display: "none" }}
                                  defaultValue={""}
                                />
                              </div>
                            </div>
                            <br />
                            <div className="row">
                              <div className="form-group col-md-3">
                                <label>Image</label>
                                <span className="uniqFile input-group">
                                  <span className="input-group-addon fa fa-upload myInputFile">
                                    <input
                                      type="file"
                                      id="review_img"
                                      name="review_img"
                                      size={40}
                                    />
                                  </span>
                                </span>
                                <img
                                  src="project_folder/tdonline/uploads/package_images/"
                                  id="show_review_image"
                                  width={50}
                                  height={50}
                                  alt="cri"
                                />
                              </div>
                            </div>
                            <div className="row">
                              <div className="form-group col-md-12">
                                <br />
                                <button
                                  type="button"
                                  name="add"
                                  id="review_button"
                                  onclick="update_review()"
                                  value="Update"
                                  className="btn btn-primary form-group"
                                >
                                  <h6>
                                    <i className="fa fa-plus" />
                                    &nbsp;Update
                                  </h6>
                                </button>
                              </div>
                            </div>
                          </form>
                          <div className="panel-body removeMargins">
                            <table
                              id="reviews_table"
                              className="table   table-responsive"
                            >
                              <thead>
                                <tr className="bg-primary">
                                  <th>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        id="single"
                                        type="checkbox"
                                        name="occupancy"
                                        defaultValue
                                      />
                                      <label htmlFor="single">&nbsp;</label>
                                    </div>
                                  </th>
                                  <th>Image</th>
                                  <th>Name</th>
                                  <th>Nationality</th>
                                  <th>Tour Date</th>
                                  <th>Rating</th>
                                  <th>Review</th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody id="reviews_table_body"></tbody>
                            </table>
                            <br />
                            <br />
                            <div className="form-group"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Term & Policies */}

                  {tab.id === "subtab6" && (
                    <div>
                      <div className="row form-group">
                        <div className="col-md-12">
                          <h4>{tab.label}</h4>
                        </div>
                      </div>
                      <form
                        id="terms_policies_form"
                        name="terms_policies_form"
                        className="ng-pristine ng-valid"
                      >
                        <div className="row">
                          <br />
                          <div className="col-md-12">
                            <div
                              className="pull-right"
                              id="term_policy_lang"
                            ></div>
                          </div>
                        </div>
                        {/* Cancellation */}
                        <div className="form-group">
                          <h4>Cancellation Policy</h4>
                        </div>
                        <hr className="mr_bt" />
                        <div className="row">
                          <div className="form-group col-md-12">
                            <label style={{ visibility: "hidden" }}>
                              Cancellation Policy
                            </label>
                            <div name="cancellation" id="cancellation" />
                          </div>
                        </div>
                        {/* Cancellation */}
                        {/* Important Notes */}
                        <div className="form-group">
                          <h4>Important Notes</h4>
                        </div>
                        <hr className="mr_bt" />
                        <div className="row">
                          <div className="form-group col-md-12">
                            <label style={{ visibility: "hidden" }}>
                              Important Notes
                            </label>
                            <div name="important_notes" id="important_notes" />
                          </div>
                        </div>
                        {/* Important Notes */}
                        {/* Important Notes */}
                        <div className="form-group">
                          <h4>Other Terms &amp; Conditions</h4>
                        </div>
                        <hr className="mr_bt" />
                        <div className="row">
                          <div className="form-group col-md-12">
                            <label style={{ visibility: "hidden" }}>
                              {" "}
                              Other Terms &amp; Conditions
                            </label>
                            <div
                              name="other_terms_conditions"
                              id="other_terms_conditions"
                            />
                          </div>
                        </div>
                        {/* Important Notes */}
                        <br />
                      </form>
                    </div>
                  )}

                  {/* Inclusion & Exclusions */}
                  {tab.id === "subtab7" && (
                    <div>
                      <div className="row form-group">
                        <div className="col-md-12">
                          <h4>{tab.label}</h4>
                        </div>
                      </div>
                      <form
                        className="inclusion_exclusion_data ng-pristine ng-valid"
                        id="inclusion_exclusion_data"
                      >
                        <div className="row">
                          <div className="form-group col-md-12">
                            <h4
                              style={{
                                backgroundColor: "#FF5015",
                                padding: "10px 20px",
                                color: "#FFF",
                              }}
                            >
                              Inclusions
                            </h4>
                          </div>
                        </div>
                        {/* Inclusions */}
                        <div className="row">
                          <div className="form-group col-md-3">
                            <label>Insurance</label>
                            <div name="insurance" id="insurance" />
                          </div>
                          <div className="form-group col-md-3">
                            <label>Tour Guide</label>
                            <div name="tour_guide" id="tour_guide" />
                          </div>
                          <div className="form-group col-md-3">
                            <label>Preset Inclusions</label>
                            <div name="inclusion_list" id="inclusion_list" />
                          </div>
                          <div className="form-group col-md-3">
                            <label>Other Inclusions</label>
                            <div
                              name="other_inclusions"
                              id="other_inclusions"
                            />
                          </div>
                        </div>
                        <hr />
                        {/* Inclusions */}
                        {/* Exclusions */}
                        <div className="row">
                          <div className="form-group col-md-12">
                            <h4
                              style={{
                                backgroundColor: "#FF5015",
                                padding: "10px 20px",
                                color: "#FFF",
                              }}
                            >
                              Exclusions
                            </h4>
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-group col-md-3">
                            <label>Tour Guide</label>
                            <div
                              name="tour_guide_exclusion"
                              id="tour_guide_exclusion"
                            />
                          </div>
                          {/* <div class="form-group col-md-3">
                                                  <label>Entrance Fees</label>
                                                  <div name='entrance_fees' id="entrance_fees"></div>
                                              </div> */}
                          <div className="form-group col-md-3">
                            <label>Tips and Porterage</label>
                            <div
                              name="tips_and_porterage"
                              id="tips_and_porterage"
                            />
                          </div>
                          <div className="form-group col-md-3">
                            <label>Preset Exclusions</label>
                            <div name="exclusion_list" id="exclusion_list" />
                          </div>
                          <div className="form-group col-md-3">
                            <label>Other Exclusions</label>
                            <div
                              name="other_exclusions"
                              id="other_exclusions"
                            />
                          </div>
                        </div>
                        {/* Exclusions */}
                      </form>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </form>
          {/* End */}
        </div>
      </div>
    </>
  );
};
export default MastersPackagesView;
