import { Link } from "react-router-dom";

import { useState } from "react";
import Header2 from "../../header2/header2";
import MultiSelect from "../../reactMultiSelect";
import {
  citiesByCountry,
  countries,
} from "../../../constants/Country-City-Data";
import Constants from "../../../constants/routes";
import {
  advance_suppliers_options,
  tourActivityTypeOptions,
  tourCategoryOptions,
  transferIncludedOptions,
} from "../../../constants/contants";

const ContractsToursAndActivitiesList = () => {
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
      <Header2 title="ACTIVITY SEARCH FOR RATE" linkText1="List Activity" />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <div data-child="row" data-effect="fadeInUp">
          <div className="row">
            <div
              className="hpanel col-md-12"
              style={{ width: "auto", position: "initial", float: "none" }}
            >
              <form
                name="search_tour_rate_from"
                method="get"
                action="tours.php"
              >
                <input
                  type="hidden"
                  name="action"
                  id="action"
                  defaultValue="search_for_rate"
                />
                <input type="hidden" name="Search" defaultValue="Y" />
                <input type="hidden" name="tour_id" id="tour_id" defaultValue />
                <div className="panel-body">
                  <div className="row">
                    <div className="col-md-2 form-group">
                      <label>Activity Type</label>
                      <MultiSelect
                        options={tourActivityTypeOptions}
                        isSearchable
                        placeholder="- Select Activity -"
                        className="custom-select"
                        noOptionsMessage={() => "No Activity Found"}
                      />
                    </div>
                    <div className="col-md-2 form-group">
                      <label>Activity Category</label>
                      <MultiSelect
                        options={tourCategoryOptions}
                        isSearchable
                        placeholder="- Select Activity Category -"
                        className="custom-select"
                        noOptionsMessage={() => "No Activity Category Found"}
                      />
                    </div>
                    <div className="col-md-2 form-group">
                      <label>Activity</label>
                      <input
                        type="text"
                        className="form-control form-control-sm colPos"
                        name="Search_tour_name"
                      />
                    </div>
                    <div className="col-md-2 form-group">
                      <label>Transfer Included</label>
                      <MultiSelect
                        options={transferIncludedOptions}
                        isSearchable
                        placeholder="- Select Transfer Included -"
                        className="custom-select"
                        noOptionsMessage={() => "No Transfer Included Found"}
                      />
                    </div>
                    <div className="col-md-2 form-group">
                      <label>Supplier</label>
                      <MultiSelect
                        options={advance_suppliers_options}
                        isSearchable
                        placeholder="- Select Supplier -"
                        className="custom-select required"
                        noOptionsMessage={() => "No Supplier Found"}
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
                    <div className="col-md-2 form-group mt-2">
                      <label>City</label>
                      <MultiSelect
                        //  options={Array.isArray(branchData.branchCity) ? branchData.branchCity : []}
                        options={
                          citiesByCountry[branchData.branchCountry] || []
                        }
                        isSearchable
                        placeholder="- Select City -"
                        className="custom-select"
                        onChange={handleCityChange}
                        noOptionsMessage={() => "No City Found"}
                      />
                    </div>
                  </div>
                  <br />
                  <div className="row mt-1">
                    <div className="col-md-12 form-group">
                      <button
                        type="button"
                        className="btn btn-dark btn-sm"
                        value="Search"
                        id="btn-submit"
                      >
                        <i className="fa fa-search" />
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              <br />
              <form>
                <div className="panel-body contentDiv removeMargins">
                  <div
                    id="tbl_tour_rate_wrapper"
                    className="dataTables_wrapper form-inline dt-bootstrap no-footer"
                  >
                    <div className="row mt-2">
                      <div className="col-md-3"></div>
                      <div className="col-md-7 dtPaging">
                        {/*Pagination panel*/}
                        <nav aria-label="Page navigation example">
                          <ul className="pagination pagination-sm justify-content-center">
                            <li className="page-item">
                              <Link
                                className="page-link"
                                to="#"
                                aria-label="Previous"
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
                      <div className="col-md-2">
                        <div
                          id="search_creadit_note_filter"
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
                      <div className="col-md-12">
                        <div
                          className="doubleScroll-scroll-wrapper"
                          id="wrapper1"
                          style={{
                            height: "20px",
                            overflow: "scroll hidden",
                            width: "1350px",
                          }}
                        >
                          <div
                            className="suwala-doubleScroll-scroll"
                            style={{ height: "20px", width: "1350px" }}
                          />
                        </div>
                        <div id="wrapper2" style={{ overflow: "auto" }}>
                          <table
                            id="tbl_tour_rate"
                            className="table table-bordered   table-responsive no-footer dataTable"
                            aria-describedby="tbl_tour_rate_info"
                            role="grid"
                          >
                            <thead>
                              <tr role="row">
                                <th
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "111px" }}
                                  aria-label="Activity Type"
                                >
                                  Activity Type
                                </th>
                                <th
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "131px" }}
                                  aria-label="Activity Sub Type "
                                >
                                  Activity Sub Type{" "}
                                </th>
                                <th
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "180px" }}
                                  aria-label="Activity Category"
                                >
                                  Activity Category
                                </th>
                                <th
                                  className="sorting"
                                  tabIndex={0}
                                  aria-controls="tbl_tour_rate"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "260px" }}
                                  aria-label="Activity: activate to sort column ascending"
                                >
                                  Activity
                                </th>
                                <th
                                  className="sorting"
                                  tabIndex={0}
                                  aria-controls="tbl_tour_rate"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "146px" }}
                                  aria-label="Transfer Included: activate to sort column ascending"
                                >
                                  Transfer Included
                                </th>
                                <th
                                  className="sorting"
                                  tabIndex={0}
                                  aria-controls="tbl_tour_rate"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "70px" }}
                                  aria-label="Country: activate to sort column ascending"
                                >
                                  Country
                                </th>
                                <th
                                  className="sorting"
                                  tabIndex={0}
                                  aria-controls="tbl_tour_rate"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "60px" }}
                                  aria-label="City: activate to sort column ascending"
                                >
                                  City
                                </th>
                                <th
                                  className="no-sort sorting"
                                  tabIndex={0}
                                  aria-controls="tbl_tour_rate"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "109px" }}
                                  aria-label="Supplier: activate to sort column ascending"
                                >
                                  Supplier
                                </th>
                                <th
                                  className="no-sort sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "88px" }}
                                  aria-label="Actions"
                                >
                                  Actions
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              <tr role="row" className="odd">
                                <td>Activities</td>
                                <td>--</td>
                                <td>Adventure Trip</td>
                                <td>
                                  supp2Tour1<b>Duration: 1.0</b>
                                  <b>PAX: 1-4</b>
                                </td>
                                <td>NO</td>
                                <td>India</td>
                                <td>Mumbai</td>
                                <td>nidaSupplier2</td>
                                <td>
                                  <div className="actionCont">
                                    <div
                                      className="input-group-addon"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title="Add Rates"
                                    >
                                      {" "}
                                      <Link
                                        to={
                                          Constants.URLConstants
                                            .CONTRACTSTOURSANDACTIVITIESADDRATES
                                        }
                                        target="_blank"
                                      >
                                        {" "}
                                        <i className="fa fa-building-o">
                                          <small>
                                            <sub className="fa fa-plus fa-xs" />
                                          </small>
                                        </i>
                                      </Link>{" "}
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr role="row" className="even">
                                <td>Activities</td>
                                <td>--</td>
                                <td>Adventure Trip</td>
                                <td>
                                  supp1Tour1<b>Duration: 1.45</b>
                                  <b>PAX: 1-4</b>
                                </td>
                                <td>NO</td>
                                <td>India</td>
                                <td>Mumbai</td>
                                <td>nidaSupplier</td>
                                <td>
                                  <div className="actionCont">
                                    <div
                                      className="input-group-addon"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title="Add Rates"
                                    >
                                      {" "}
                                      <Link
                                        to={
                                          Constants.URLConstants
                                            .CONTRACTSTOURSANDACTIVITIESADDRATES
                                        }
                                        target="_blank"
                                      >
                                        {" "}
                                        <i className="fa fa-building-o">
                                          <small>
                                            <sub className="fa fa-plus fa-xs" />
                                          </small>
                                        </i>
                                      </Link>{" "}
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr role="row" className="odd">
                                <td>Activities</td>
                                <td>--</td>
                                <td>Adventure Trip</td>
                                <td>
                                  mainTour2<b>Duration: 1.15</b>
                                  <b>PAX: 1-4</b>
                                </td>
                                <td>NO</td>
                                <td>India</td>
                                <td>Mumbai</td>
                                <td>nidaSupplier</td>
                                <td>
                                  <div className="actionCont">
                                    <div
                                      className="input-group-addon"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title="Add Rates"
                                    >
                                      {" "}
                                      <Link
                                        to={
                                          Constants.URLConstants
                                            .CONTRACTSTOURSANDACTIVITIESADDRATES
                                        }
                                        target="_blank"
                                      >
                                        {" "}
                                        <i className="fa fa-building-o">
                                          <small>
                                            <sub className="fa fa-plus fa-xs" />
                                          </small>
                                        </i>
                                      </Link>{" "}
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr role="row" className="even">
                                <td>Activities</td>
                                <td>--</td>
                                <td>Adventure Trip</td>
                                <td>
                                  supp1Tour2<b>Duration: 1.15</b>
                                  <b>PAX: 1-4</b>
                                </td>
                                <td>NO</td>
                                <td>India</td>
                                <td>Mumbai</td>
                                <td>nidaSupplier</td>
                                <td>
                                  <div className="actionCont">
                                    <div
                                      className="input-group-addon"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title="Add Rates"
                                    >
                                      {" "}
                                      <Link
                                        to={
                                          Constants.URLConstants
                                            .CONTRACTSTOURSANDACTIVITIESADDRATES
                                        }
                                        target="_blank"
                                      >
                                        {" "}
                                        <i className="fa fa-building-o">
                                          <small>
                                            <sub className="fa fa-plus fa-xs" />
                                          </small>
                                        </i>
                                      </Link>{" "}
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr role="row" className="odd">
                                <td>Tour</td>
                                <td>--</td>
                                <td>Adventure Trip</td>
                                <td>
                                  Tour<b>Duration: 0.45</b>
                                  <b>PAX: 10-20</b>
                                </td>
                                <td>NO</td>
                                <td>India</td>
                                <td>Mumbai</td>
                                <td>Sup1</td>
                                <td>
                                  <div className="actionCont">
                                    <div
                                      className="input-group-addon"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title="Add Rates"
                                    >
                                      {" "}
                                      <Link
                                        to={
                                          Constants.URLConstants
                                            .CONTRACTSTOURSANDACTIVITIESADDRATES
                                        }
                                        target="_blank"
                                      >
                                        {" "}
                                        <i className="fa fa-building-o">
                                          <small>
                                            <sub className="fa fa-plus fa-xs" />
                                          </small>
                                        </i>
                                      </Link>{" "}
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr role="row" className="even">
                                <td>Tour</td>
                                <td>--</td>
                                <td>Adventure Trip</td>
                                <td>
                                  Tourtest<b>Duration: 0.45</b>
                                  <b>PAX: 10-20</b>
                                </td>
                                <td>NO</td>
                                <td>India</td>
                                <td>Mumbai</td>
                                <td>Sup1</td>
                                <td>
                                  <div className="actionCont">
                                    <div
                                      className="input-group-addon"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title="Add Rates"
                                    >
                                      {" "}
                                      <Link
                                        to={
                                          Constants.URLConstants
                                            .CONTRACTSTOURSANDACTIVITIESADDRATES
                                        }
                                        target="_blank"
                                      >
                                        {" "}
                                        <i className="fa fa-building-o">
                                          <small>
                                            <sub className="fa fa-plus fa-xs" />
                                          </small>
                                        </i>
                                      </Link>{" "}
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr role="row" className="odd">
                                <td>Tour</td>
                                <td>--</td>
                                <td>Adventure Trip</td>
                                <td>
                                  Test<b>Duration: 0.45</b>
                                  <b>PAX: 5-10</b>
                                </td>
                                <td>NO</td>
                                <td>India</td>
                                <td>Mumbai</td>
                                <td>Sup2</td>
                                <td>
                                  <div className="actionCont">
                                    <div
                                      className="input-group-addon"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title="Add Rates"
                                    >
                                      {" "}
                                      <Link
                                        to={
                                          Constants.URLConstants
                                            .CONTRACTSTOURSANDACTIVITIESADDRATES
                                        }
                                        target="_blank"
                                      >
                                        {" "}
                                        <i className="fa fa-building-o">
                                          <small>
                                            <sub className="fa fa-plus fa-xs" />
                                          </small>
                                        </i>
                                      </Link>{" "}
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr role="row" className="even">
                                <td>Tour</td>
                                <td>--</td>
                                <td>Adventure Trip</td>
                                <td>
                                  check<b>Duration: 0.45</b>
                                  <b>PAX: 5-10</b>
                                </td>
                                <td>NO</td>
                                <td>India</td>
                                <td>Mumbai</td>
                                <td>Sup2</td>
                                <td>
                                  <div className="actionCont">
                                    <div
                                      className="input-group-addon"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title="Add Rates"
                                    >
                                      {" "}
                                      <Link
                                        to={
                                          Constants.URLConstants
                                            .CONTRACTSTOURSANDACTIVITIESADDRATES
                                        }
                                        target="_blank"
                                      >
                                        {" "}
                                        <i className="fa fa-building-o">
                                          <small>
                                            <sub className="fa fa-plus fa-xs" />
                                          </small>
                                        </i>
                                      </Link>{" "}
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr role="row" className="odd">
                                <td>Tour</td>
                                <td>--</td>
                                <td>Adventure Trip</td>
                                <td>
                                  PQR<b>Duration: 0.30</b>
                                  <b>PAX: 50-60</b>
                                </td>
                                <td>NO</td>
                                <td>India</td>
                                <td>Mumbai</td>
                                <td>Sup2</td>
                                <td>
                                  <div className="actionCont">
                                    <div
                                      className="input-group-addon"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title="Add Rates"
                                    >
                                      {" "}
                                      <Link
                                        to={
                                          Constants.URLConstants
                                            .CONTRACTSTOURSANDACTIVITIESADDRATES
                                        }
                                        target="_blank"
                                      >
                                        {" "}
                                        <i className="fa fa-building-o">
                                          <small>
                                            <sub className="fa fa-plus fa-xs" />
                                          </small>
                                        </i>
                                      </Link>{" "}
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr role="row" className="even">
                                <td>Tour</td>
                                <td>--</td>
                                <td>Adventure Trip</td>
                                <td>
                                  Tourfirst<b>Duration: 0.45</b>
                                  <b>PAX: 10-20</b>
                                </td>
                                <td>NO</td>
                                <td>India</td>
                                <td>Mumbai</td>
                                <td>Plierone</td>
                                <td>
                                  <div className="actionCont">
                                    <div
                                      className="input-group-addon"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title="Add Rates"
                                    >
                                      {" "}
                                      <Link
                                        to={
                                          Constants.URLConstants
                                            .CONTRACTSTOURSANDACTIVITIESADDRATES
                                        }
                                        target="_blank"
                                      >
                                        {" "}
                                        <i className="fa fa-building-o">
                                          <small>
                                            <sub className="fa fa-plus fa-xs" />
                                          </small>
                                        </i>
                                      </Link>{" "}
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr role="row" className="odd">
                                <td>Tour</td>
                                <td>--</td>
                                <td>Adventure Trip</td>
                                <td>
                                  TourSecond<b>Duration: 0.45</b>
                                  <b>PAX: 20-30</b>
                                </td>
                                <td>NO</td>
                                <td>India</td>
                                <td>Mumbai</td>
                                <td>Pliertwo</td>
                                <td>
                                  <div className="actionCont">
                                    <div
                                      className="input-group-addon"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title="Add Rates"
                                    >
                                      {" "}
                                      <Link
                                        to={
                                          Constants.URLConstants
                                            .CONTRACTSTOURSANDACTIVITIESADDRATES
                                        }
                                        target="_blank"
                                      >
                                        {" "}
                                        <i className="fa fa-building-o">
                                          <small>
                                            <sub className="fa fa-plus fa-xs" />
                                          </small>
                                        </i>
                                      </Link>{" "}
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr role="row" className="even">
                                <td>Tour</td>
                                <td>--</td>
                                <td>Adventure Trip</td>
                                <td>
                                  TTT<b>Duration: 0.45</b>
                                  <b>PAX: 50-60</b>
                                </td>
                                <td>NO</td>
                                <td>India</td>
                                <td>Mumbai</td>
                                <td>Plierone</td>
                                <td>
                                  <div className="actionCont">
                                    <div
                                      className="input-group-addon"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title="Add Rates"
                                    >
                                      {" "}
                                      <Link
                                        to={
                                          Constants.URLConstants
                                            .CONTRACTSTOURSANDACTIVITIESADDRATES
                                        }
                                        target="_blank"
                                      >
                                        {" "}
                                        <i className="fa fa-building-o">
                                          <small>
                                            <sub className="fa fa-plus fa-xs" />
                                          </small>
                                        </i>
                                      </Link>{" "}
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr role="row" className="odd">
                                <td>Tour</td>
                                <td>--</td>
                                <td>Adventure Trip</td>
                                <td>
                                  Emaar<b>Duration: 3.30</b>
                                  <b>PAX: 2-2</b>
                                </td>
                                <td>YES</td>
                                <td>India</td>
                                <td>Mumbai</td>
                                <td>Emaar Test</td>
                                <td>
                                  <div className="actionCont">
                                    <div
                                      className="input-group-addon"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title="Add Rates"
                                    >
                                      {" "}
                                      <Link
                                        to={
                                          Constants.URLConstants
                                            .CONTRACTSTOURSANDACTIVITIESADDRATES
                                        }
                                        target="_blank"
                                      >
                                        {" "}
                                        <i className="fa fa-building-o">
                                          <small>
                                            <sub className="fa fa-plus fa-xs" />
                                          </small>
                                        </i>
                                      </Link>{" "}
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr role="row" className="even">
                                <td>Activities</td>
                                <td>--</td>
                                <td>Adventure Trip</td>
                                <td>
                                  Active<b>Duration: 0.45</b>
                                  <b>PAX: 10-20</b>
                                </td>
                                <td>NO</td>
                                <td>India</td>
                                <td>Mumbai</td>
                                <td>Sayalione</td>
                                <td>
                                  <div className="actionCont">
                                    <div
                                      className="input-group-addon"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title="Add Rates"
                                    >
                                      {" "}
                                      <Link
                                        to="tours_add_rate.php?id=17&supplier_id=S000000861&rate=FIT"
                                        target="_blank"
                                      >
                                        {" "}
                                        <i className="fa fa-building-o">
                                          <small>
                                            <sub className="fa fa-plus fa-xs" />
                                          </small>
                                        </i>
                                      </Link>{" "}
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr role="row" className="odd">
                                <td>Tour</td>
                                <td>--</td>
                                <td>Adventure Trip</td>
                                <td>
                                  Activity<b>Duration: 0.45</b>
                                  <b>PAX: 5-10</b>
                                </td>
                                <td>NO</td>
                                <td>India</td>
                                <td>Mumbai</td>
                                <td>Sayalione</td>
                                <td>
                                  <div className="actionCont">
                                    <div
                                      className="input-group-addon"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title="Add Rates"
                                    >
                                      {" "}
                                      <Link
                                        to="tours_add_rate.php?id=12&supplier_id=S000000861&rate=FIT"
                                        target="_blank"
                                      >
                                        {" "}
                                        <i className="fa fa-building-o">
                                          <small>
                                            <sub className="fa fa-plus fa-xs" />
                                          </small>
                                        </i>
                                      </Link>{" "}
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr role="row" className="even">
                                <td>Tour</td>
                                <td>gggg</td>
                                <td>Adventure Trip</td>
                                <td>
                                  Activity_One<b>Duration: 1.15</b>
                                  <b>PAX: 5-10</b>
                                </td>
                                <td>YES</td>
                                <td>India</td>
                                <td>Mumbai</td>
                                <td>Sayalione</td>
                                <td>
                                  <div className="actionCont">
                                    <div
                                      className="input-group-addon"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title="Add Rates"
                                    >
                                      {" "}
                                      <Link
                                        to="tours_add_rate.php?id=20&supplier_id=S000000861&rate=FIT"
                                        target="_blank"
                                      >
                                        {" "}
                                        <i className="fa fa-building-o">
                                          <small>
                                            <sub className="fa fa-plus fa-xs" />
                                          </small>
                                        </i>
                                      </Link>{" "}
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr role="row" className="odd">
                                <td>Activities</td>
                                <td>--</td>
                                <td>Adventure Trip</td>
                                <td>
                                  Activity_1<b>Duration: 0.15</b>
                                  <b>PAX: 1-10</b>
                                </td>
                                <td>NO</td>
                                <td>India</td>
                                <td>Mumbai</td>
                                <td>Sayalione</td>
                                <td>
                                  <div className="actionCont">
                                    <div
                                      className="input-group-addon"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title="Add Rates"
                                    >
                                      {" "}
                                      <Link
                                        to="tours_add_rate.php?id=24&supplier_id=S000000861&rate=FIT"
                                        target="_blank"
                                      >
                                        {" "}
                                        <i className="fa fa-building-o">
                                          <small>
                                            <sub className="fa fa-plus fa-xs" />
                                          </small>
                                        </i>
                                      </Link>{" "}
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr role="row" className="even">
                                <td>Flight Ticket</td>
                                <td>--</td>
                                <td>bangkok dream world</td>
                                <td>
                                  Activity_2<b>Duration: 0.30</b>
                                  <b>PAX: 1-20</b>
                                </td>
                                <td>NO</td>
                                <td>India</td>
                                <td>Mumbai</td>
                                <td>Sayalitwo</td>
                                <td>
                                  <div className="actionCont">
                                    <div
                                      className="input-group-addon"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title="Add Rates"
                                    >
                                      {" "}
                                      <Link
                                        to="tours_add_rate.php?id=25&supplier_id=S000000862&rate=FIT"
                                        target="_blank"
                                      >
                                        {" "}
                                        <i className="fa fa-building-o">
                                          <small>
                                            <sub className="fa fa-plus fa-xs" />
                                          </small>
                                        </i>
                                      </Link>{" "}
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr role="row" className="odd">
                                <td>Tour</td>
                                <td>gggg</td>
                                <td>Adventure Trip</td>
                                <td>
                                  Activity_One<b>Duration: 1.15</b>
                                  <b>PAX: 5-10</b>
                                </td>
                                <td>YES</td>
                                <td>India</td>
                                <td>Mumbai</td>
                                <td>Saya_SUPPLIER</td>
                                <td>
                                  <div className="actionCont">
                                    <div
                                      className="input-group-addon"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title="Add Rates"
                                    >
                                      {" "}
                                      <Link
                                        to="tours_add_rate.php?id=20&supplier_id=S000000878&rate=FIT"
                                        target="_blank"
                                      >
                                        {" "}
                                        <i className="fa fa-building-o">
                                          <small>
                                            <sub className="fa fa-plus fa-xs" />
                                          </small>
                                        </i>
                                      </Link>{" "}
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr role="row" className="even">
                                <td>Activities</td>
                                <td>gggg</td>
                                <td>Adventure Trip</td>
                                <td>
                                  Actone<b>Duration: 1.0</b>
                                  <b>PAX: 1-5</b>
                                </td>
                                <td>YES</td>
                                <td>India</td>
                                <td>Mumbai</td>
                                <td>Saya_SUPPLIER</td>
                                <td>
                                  <div className="actionCont">
                                    <div
                                      className="input-group-addon"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title="Add Rates"
                                    >
                                      {" "}
                                      <Link
                                        to="tours_add_rate.php?id=29&supplier_id=S000000878&rate=FIT"
                                        target="_blank"
                                      >
                                        {" "}
                                        <i className="fa fa-building-o">
                                          <small>
                                            <sub className="fa fa-plus fa-xs" />
                                          </small>
                                        </i>
                                      </Link>{" "}
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr role="row" className="odd">
                                <td>Activities</td>
                                <td>gggg</td>
                                <td>Adventure Trip</td>
                                <td>
                                  ActPCK_1<b>Duration: 0.15</b>
                                  <b>PAX: 1-10</b>
                                </td>
                                <td>NO</td>
                                <td>India</td>
                                <td>Mumbai</td>
                                <td>Saya_SUPPLIER</td>
                                <td>
                                  <div className="actionCont">
                                    <div
                                      className="input-group-addon"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title="Add Rates"
                                    >
                                      {" "}
                                      <Link
                                        to="tours_add_rate.php?id=26&supplier_id=S000000878&rate=FIT"
                                        target="_blank"
                                      >
                                        {" "}
                                        <i className="fa fa-building-o">
                                          <small>
                                            <sub className="fa fa-plus fa-xs" />
                                          </small>
                                        </i>
                                      </Link>{" "}
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr role="row" className="even">
                                <td>Flight Ticket</td>
                                <td>gggg</td>
                                <td>Adventure Trip</td>
                                <td>
                                  ActPCK_2<b>Duration: 0.15</b>
                                  <b>PAX: 1-10</b>
                                </td>
                                <td>NO</td>
                                <td>India</td>
                                <td>Mumbai</td>
                                <td>Saya_SUPPLIER</td>
                                <td>
                                  <div className="actionCont">
                                    <div
                                      className="input-group-addon"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title="Add Rates"
                                    >
                                      {" "}
                                      <Link
                                        to="tours_add_rate.php?id=27&supplier_id=S000000878&rate=FIT"
                                        target="_blank"
                                      >
                                        {" "}
                                        <i className="fa fa-building-o">
                                          <small>
                                            <sub className="fa fa-plus fa-xs" />
                                          </small>
                                        </i>
                                      </Link>{" "}
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr role="row" className="odd">
                                <td>Activities</td>
                                <td>gggg</td>
                                <td>Adventure Trip</td>
                                <td>
                                  ActPCK_3<b>Duration: 0.15</b>
                                  <b>PAX: 1-20</b>
                                </td>
                                <td>NO</td>
                                <td>India</td>
                                <td>Mumbai</td>
                                <td>Saya_SUPPLIER</td>
                                <td>
                                  <div className="actionCont">
                                    <div
                                      className="input-group-addon"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title="Add Rates"
                                    >
                                      {" "}
                                      <Link
                                        to="tours_add_rate.php?id=28&supplier_id=S000000878&rate=FIT"
                                        target="_blank"
                                      >
                                        {" "}
                                        <i className="fa fa-building-o">
                                          <small>
                                            <sub className="fa fa-plus fa-xs" />
                                          </small>
                                        </i>
                                      </Link>{" "}
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr role="row" className="even">
                                <td>Activities</td>
                                <td>gggg</td>
                                <td>Adventure Trip</td>
                                <td>
                                  ACT_FOUR<b>Duration: 0.15</b>
                                  <b>PAX: 2-5</b>
                                </td>
                                <td>NO</td>
                                <td>India</td>
                                <td>Mumbai</td>
                                <td>Saya_SUPPLIER</td>
                                <td>
                                  <div className="actionCont">
                                    <div
                                      className="input-group-addon"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title="Add Rates"
                                    >
                                      {" "}
                                      <Link
                                        to="tours_add_rate.php?id=23&supplier_id=S000000878&rate=FIT"
                                        target="_blank"
                                      >
                                        {" "}
                                        <i className="fa fa-building-o">
                                          <small>
                                            <sub className="fa fa-plus fa-xs" />
                                          </small>
                                        </i>
                                      </Link>{" "}
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr role="row" className="odd">
                                <td>Flight Ticket</td>
                                <td>gggg</td>
                                <td>Fishing </td>
                                <td>
                                  ActPX<b>Duration: 0.30</b>
                                  <b>PAX: 1-10</b>
                                </td>
                                <td>YES</td>
                                <td>India</td>
                                <td>Mumbai</td>
                                <td>Saya_SUPPLIER</td>
                                <td>
                                  <div className="actionCont">
                                    <div
                                      className="input-group-addon"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title="Add Rates"
                                    >
                                      {" "}
                                      <Link
                                        to="tours_add_rate.php?id=30&supplier_id=S000000878&rate=FIT"
                                        target="_blank"
                                      >
                                        {" "}
                                        <i className="fa fa-building-o">
                                          <small>
                                            <sub className="fa fa-plus fa-xs" />
                                          </small>
                                        </i>
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
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ContractsToursAndActivitiesList;
