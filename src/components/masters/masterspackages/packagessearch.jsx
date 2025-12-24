import { Link } from "react-router-dom";
import { useState } from "react";
import Header2 from "../../header2/header2";
import Constants from "../../../constants/routes";
import MultiSelect from "../../reactMultiSelect";
import {
  citiesByCountry,
  countries,
} from "../../../constants/Country-City-Data";

const packageTypeOptions = [
  { value: "", label: "Select" },
  { value: "static", label: "STATIC" },
  { value: "semi-dynamic", label: "SEMI-DYNAMIC" },
];

// Now you can use the 'packageTypeOptions' array in your JavaScript code as needed.
const servicesOptions = [
  { value: 1, label: "Hotel" },
  { value: 2, label: "Sightseeing" },
  { value: 3, label: "Transfer" },
  { value: 4, label: "Misc" },
  { value: 5, label: "Airline" },
  { value: 6, label: "Packages" },
  { value: 7, label: "Groups" },
  { value: 8, label: "Visa" },
];

const draftOptions = [
  { value: "", label: "Select" },
  { value: "Y", label: "Yes" },
  { value: "N", label: "No" },
];

// Now you can use the 'draftOptions' array in your JavaScript code as needed.

const MastersPackagesSearch = () => {
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
        title="SEARCH PACKAGES"
        linkText1="ADD Packages"
        link1={Constants.URLConstants.MASTERSPACKAGESADD}
      />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <form>
          <input id="filter" name="filter" defaultValue="Y" type="hidden" />
          {/* <input type = "hidden" name = "editdata" value = "Array"> */}
          <div className="row">
            <div className="col-md-3 form-group ">
              <label>Name </label>
              <input
                type="text"
                name="name"
                className="form-control form-control-sm test123"
                id="name"
              />
            </div>
            <div className="col-md-3 form-group ">
              <label>Code </label>
              <input
                type="text"
                id="code"
                name="code"
                className="form-control form-control-sm "
              />
            </div>
            <div className="col-md-3 form-group ">
              <label>Country </label>
              <MultiSelect
                options={countries}
                isSearchable
                placeholder="- Select Country -"
                className="custom-select"
                onChange={handleCountryChange}
                noOptionsMessage={() => "No Country Found"}
              />
            </div>
            <div className="col-md-3 form-group ">
              <label>City </label>
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
          <div className="row mt-3">
            <div className="col-md-3 form-group ">
              <label>Type </label>
              <MultiSelect
                options={packageTypeOptions}
                isSearchable
                placeholder="- Select Type -"
                className="custom-select"
                noOptionsMessage={() => "No Type Found"}
              />
            </div>
            <div className="col-md-3 form-group ">
              <label>Services </label>
              <MultiSelect
                options={servicesOptions}
                isSearchable
                placeholder="- Select Services -"
                className="custom-select"
                noOptionsMessage={() => "No Services Found"}
              />
            </div>
            <div className="col-md-3 form-group ">
              <label>Is Draft </label>
              <MultiSelect
                options={draftOptions}
                isSearchable
                placeholder="- Select Draft -"
                className="custom-select"
                onChange={handleCountryChange}
                noOptionsMessage={() => "No Draft Found"}
              />
            </div>
          </div>
          <br />
          <div className="row mt-3">
            <div className="col-md-6 form-group ">
              <button
                type="submit"
                name="add"
                id="button"
                value="Add"
                className="btn btn-dark btn-sm form-group "
              >
                <i className="fa fa-search" />
                &nbsp;Search
              </button>
              <button
                type="button"
                onclick="reload()"
                name="load"
                id="button"
                value="Load"
                className="btn btn-outline-secondary btn-sm form-group mx-1 "
              >
                <i className="fa fa-undo" />
                &nbsp;Load
              </button>
            </div>
          </div>
        </form>

        <br />

        <form>
          <div className="panel-body removeMargins">
            <div
              id="tableres_wrapper"
              className="dataTables_wrapper form-inline dt-bootstrap no-footer"
            >
              <div className="row mt-4">
                <div className="col-sm-5" />
                <div className="col-sm-3">
                  {/*Pagination panel*/}
                  <nav aria-label="Page navigation example">
                    <ul className="pagination pagination-sm justify-content-center">
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
                        <Link className="page-link" to="#" aria-label="Next">
                          <span aria-hidden="true">»</span>
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
                <div className="col-sm-2" />
                <div className="col-sm-2">
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
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div
                    className="doubleScroll-scroll-wrapper"
                    id="wrapper1"
                    style={{ height: "20px", overflow: "scroll hidden" }}
                  >
                    <div
                      className="suwala-doubleScroll-scroll"
                      style={{ height: "20px", width: "1450px" }}
                    ></div>
                  </div>
                  <div id="wrapper2" style={{ overflow: "auto" }}>
                    <table
                      id="tableres"
                      className="table table-bordered   table-responsive dataTable no-footer"
                      role="grid"
                      aria-describedby="tableres_info"
                    >
                      <thead>
                        <tr role="row">
                          <th
                            className="sorting_disabled"
                            rowSpan={1}
                            colSpan={1}
                            style={{ width: "172px" }}
                          >
                            &nbsp;Package Name
                          </th>
                          <th
                            className="sorting_disabled"
                            rowSpan={1}
                            colSpan={1}
                            style={{ width: "70px" }}
                          >
                            &nbsp;Code
                          </th>
                          <th
                            className="sorting_disabled"
                            rowSpan={1}
                            colSpan={1}
                            style={{ width: "123px" }}
                          >
                            &nbsp;Package Type
                          </th>
                          <th
                            className="sorting_disabled"
                            rowSpan={1}
                            colSpan={1}
                            style={{ width: "45px" }}
                          >
                            &nbsp;Days
                          </th>
                          <th
                            className="sorting_disabled"
                            rowSpan={1}
                            colSpan={1}
                            style={{ width: "237px" }}
                          >
                            &nbsp;Services
                          </th>
                          <th
                            className="sorting_disabled"
                            rowSpan={1}
                            colSpan={1}
                            style={{ width: "152px" }}
                          >
                            &nbsp;Is Savesd As Draft
                          </th>
                          <th
                            className="sorting_disabled"
                            rowSpan={1}
                            colSpan={1}
                            style={{ width: "119px" }}
                          >
                            &nbsp;Country Name
                          </th>
                          <th
                            className="sorting_disabled"
                            rowSpan={1}
                            colSpan={1}
                            style={{ width: "120px" }}
                          >
                            &nbsp;City Name
                          </th>
                          <th
                            className="sorting_disabled"
                            rowSpan={1}
                            colSpan={1}
                            style={{ width: "139px" }}
                          >
                            &nbsp;Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody id="searchList">
                        <tr role="row" className="odd">
                          <td>&nbsp;Fgffg</td>
                          <td>&nbsp;938523</td>
                          <td>&nbsp;semi-dynamic</td>
                          <td>&nbsp;1</td>
                          {/* td>&nbsp;</td*/}
                          {/* <td>&nbsp;</td> */}
                          <td>&nbsp;Hotel,Sightseeing,Transfer</td>
                          {/* <td>&nbsp;</td> */}
                          <td>NO</td>
                          <td>&nbsp;India</td>
                          <td>&nbsp;Mumbai</td>
                          <td className="actionlink">
                            <div className="actionCont">
                              <div className="input-group-addon">
                                <Link
                                  to={
                                    Constants.URLConstants.MASTERSPACKAGESVIEW
                                  }
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="View"
                                >
                                  <i className="fa fa-eye" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to={
                                    Constants.URLConstants.MASTERSPACKAGESEDIT
                                  }
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Edit"
                                >
                                  <i className="fa fa-pencil-square-o" />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                data-toggle="tooltip"
                                data-placement="top"
                                alt="Click To Deactivate"
                                title
                                data-original-title="Click To Deactivate"
                              >
                                <Link to="#" onclick="status_data(30,'I')">
                                  <i className="fa fa-check-circle" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="#"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  onclick="delete_data(30)"
                                  data-original-title="Delete"
                                >
                                  <i className="fa fa-trash" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="#"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  onclick="cloning(30)"
                                  data-original-title="clone"
                                >
                                  <i className="fa fa-copy" />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                title
                                data-toggle="tooltip"
                                data-placement="top"
                                data-original-title="Assign Discount Offer"
                              >
                                <Link
                                  data-toggle="modal"
                                  data-target="#packageOfferAssignment"
                                  onclick="packageOfferAssignment(30)"
                                >
                                  <i
                                    className="fa fa-map-signs"
                                    aria-hidden="true"
                                  />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                title
                                data-toggle="tooltip"
                                data-placement="top"
                                data-original-title="Hide for Agent/Branch"
                              >
                                <Link
                                  data-toggle="modal"
                                  data-target="#packageExcludeforagentbranch"
                                  onclick="packageExcludeforagentbranch(30)"
                                >
                                  <i
                                    className="fa fa-eye-slash"
                                    aria-hidden="true"
                                  />
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr role="row" className="even">
                          <td>&nbsp;Semi_Testt</td>
                          <td>&nbsp;689460</td>
                          <td>&nbsp;semi-dynamic</td>
                          <td>&nbsp;1</td>
                          {/* td>&nbsp;</td*/}
                          {/* <td>&nbsp;</td> */}
                          <td>&nbsp;Hotel,Sightseeing,Transfer</td>
                          {/* <td>&nbsp;</td> */}
                          <td>NO</td>
                          <td>&nbsp;India</td>
                          <td>&nbsp;Mumbai</td>
                          <td className="actionlink">
                            <div className="actionCont">
                              <div className="input-group-addon">
                                <Link
                                  to={
                                    Constants.URLConstants.MASTERSPACKAGESVIEW
                                  }
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="View"
                                >
                                  <i className="fa fa-eye" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to={
                                    Constants.URLConstants.MASTERSPACKAGESEDIT
                                  }
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Edit"
                                >
                                  <i className="fa fa-pencil-square-o" />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                data-toggle="tooltip"
                                data-placement="top"
                                alt="Click To Deactivate"
                                title
                                data-original-title="Click To Deactivate"
                              >
                                <Link to="#" onclick="status_data(31,'I')">
                                  <i className="fa fa-check-circle" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="#"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  onclick="delete_data(31)"
                                  data-original-title="Delete"
                                >
                                  <i className="fa fa-trash" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="#"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  onclick="cloning(31)"
                                  data-original-title="clone"
                                >
                                  <i className="fa fa-copy" />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                title
                                data-toggle="tooltip"
                                data-placement="top"
                                data-original-title="Assign Discount Offer"
                              >
                                <Link
                                  data-toggle="modal"
                                  data-target="#packageOfferAssignment"
                                  onclick="packageOfferAssignment(31)"
                                >
                                  <i
                                    className="fa fa-map-signs"
                                    aria-hidden="true"
                                  />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                title
                                data-toggle="tooltip"
                                data-placement="top"
                                data-original-title="Hide for Agent/Branch"
                              >
                                <Link
                                  data-toggle="modal"
                                  data-target="#packageExcludeforagentbranch"
                                  onclick="packageExcludeforagentbranch(31)"
                                >
                                  <i
                                    className="fa fa-eye-slash"
                                    aria-hidden="true"
                                  />
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr role="row" className="odd">
                          <td>&nbsp;Test Check</td>
                          <td>&nbsp;583107</td>
                          <td>&nbsp;static</td>
                          <td>&nbsp;1</td>
                          {/* td>&nbsp;</td*/}
                          {/* <td>&nbsp;</td> */}
                          <td>&nbsp;Hotel</td>
                          {/* <td>&nbsp;</td> */}
                          <td>NO</td>
                          <td>&nbsp;India</td>
                          <td>&nbsp;Mumbai</td>
                          <td className="actionlink">
                            <div className="actionCont">
                              <div className="input-group-addon">
                                <Link
                                  to={
                                    Constants.URLConstants.MASTERSPACKAGESVIEW
                                  }
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="View"
                                >
                                  <i className="fa fa-eye" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to={
                                    Constants.URLConstants.MASTERSPACKAGESEDIT
                                  }
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Edit"
                                >
                                  <i className="fa fa-pencil-square-o" />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                data-toggle="tooltip"
                                data-placement="top"
                                alt="Click To Deactivate"
                                title
                                data-original-title="Click To Deactivate"
                              >
                                <Link to="#" onclick="status_data(32,'I')">
                                  <i className="fa fa-check-circle" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="#"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  onclick="delete_data(32)"
                                  data-original-title="Delete"
                                >
                                  <i className="fa fa-trash" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="#"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  onclick="cloning(32)"
                                  data-original-title="clone"
                                >
                                  <i className="fa fa-copy" />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                title
                                data-toggle="tooltip"
                                data-placement="top"
                                data-original-title="Assign Discount Offer"
                              >
                                <Link
                                  data-toggle="modal"
                                  data-target="#packageOfferAssignment"
                                  onclick="packageOfferAssignment(32)"
                                >
                                  <i
                                    className="fa fa-map-signs"
                                    aria-hidden="true"
                                  />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                title
                                data-toggle="tooltip"
                                data-placement="top"
                                data-original-title="Hide for Agent/Branch"
                              >
                                <Link
                                  data-toggle="modal"
                                  data-target="#packageExcludeforagentbranch"
                                  onclick="packageExcludeforagentbranch(32)"
                                >
                                  <i
                                    className="fa fa-eye-slash"
                                    aria-hidden="true"
                                  />
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr role="row" className="even">
                          <td>&nbsp;Hotel_FrontCancel</td>
                          <td>&nbsp;942401</td>
                          <td>&nbsp;static</td>
                          <td>&nbsp;1</td>
                          {/* td>&nbsp;</td*/}
                          {/* <td>&nbsp;</td> */}
                          <td>&nbsp;Hotel</td>
                          {/* <td>&nbsp;</td> */}
                          <td>NO</td>
                          <td>&nbsp;India</td>
                          <td>&nbsp;Pune</td>
                          <td className="actionlink">
                            <div className="actionCont">
                              <div className="input-group-addon">
                                <Link
                                  to={
                                    Constants.URLConstants.MASTERSPACKAGESVIEW
                                  }
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="View"
                                >
                                  <i className="fa fa-eye" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to={
                                    Constants.URLConstants.MASTERSPACKAGESEDIT
                                  }
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Edit"
                                >
                                  <i className="fa fa-pencil-square-o" />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                data-toggle="tooltip"
                                data-placement="top"
                                alt="Click To Deactivate"
                                title
                                data-original-title="Click To Deactivate"
                              >
                                <Link to="#" onclick="status_data(29,'I')">
                                  <i className="fa fa-check-circle" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="#"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  onclick="delete_data(29)"
                                  data-original-title="Delete"
                                >
                                  <i className="fa fa-trash" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="#"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  onclick="cloning(29)"
                                  data-original-title="clone"
                                >
                                  <i className="fa fa-copy" />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                title
                                data-toggle="tooltip"
                                data-placement="top"
                                data-original-title="Assign Discount Offer"
                              >
                                <Link
                                  data-toggle="modal"
                                  data-target="#packageOfferAssignment"
                                  onclick="packageOfferAssignment(29)"
                                >
                                  <i
                                    className="fa fa-map-signs"
                                    aria-hidden="true"
                                  />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                title
                                data-toggle="tooltip"
                                data-placement="top"
                                data-original-title="Hide for Agent/Branch"
                              >
                                <Link
                                  data-toggle="modal"
                                  data-target="#packageExcludeforagentbranch"
                                  onclick="packageExcludeforagentbranch(29)"
                                >
                                  <i
                                    className="fa fa-eye-slash"
                                    aria-hidden="true"
                                  />
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr role="row" className="odd">
                          <td>&nbsp;AAAAASSSS</td>
                          <td>&nbsp;570278</td>
                          <td>&nbsp;static</td>
                          <td>&nbsp;1</td>
                          {/* td>&nbsp;</td*/}
                          {/* <td>&nbsp;</td> */}
                          <td>&nbsp;Hotel</td>
                          {/* <td>&nbsp;</td> */}
                          <td>NO</td>
                          <td>&nbsp;India</td>
                          <td>&nbsp;Pune</td>
                          <td className="actionlink">
                            <div className="actionCont">
                              <div className="input-group-addon">
                                <Link
                                  to={
                                    Constants.URLConstants.MASTERSPACKAGESVIEW
                                  }
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="View"
                                >
                                  <i className="fa fa-eye" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to={
                                    Constants.URLConstants.MASTERSPACKAGESEDIT
                                  }
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Edit"
                                >
                                  <i className="fa fa-pencil-square-o" />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                data-toggle="tooltip"
                                data-placement="top"
                                alt="Click To Deactivate"
                                title
                                data-original-title="Click To Deactivate"
                              >
                                <Link to="#" onclick="status_data(28,'I')">
                                  <i className="fa fa-check-circle" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="#"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  onclick="delete_data(28)"
                                  data-original-title="Delete"
                                >
                                  <i className="fa fa-trash" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="#"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  onclick="cloning(28)"
                                  data-original-title="clone"
                                >
                                  <i className="fa fa-copy" />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                title
                                data-toggle="tooltip"
                                data-placement="top"
                                data-original-title="Assign Discount Offer"
                              >
                                <Link
                                  data-toggle="modal"
                                  data-target="#packageOfferAssignment"
                                  onclick="packageOfferAssignment(28)"
                                >
                                  <i
                                    className="fa fa-map-signs"
                                    aria-hidden="true"
                                  />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                title
                                data-toggle="tooltip"
                                data-placement="top"
                                data-original-title="Hide for Agent/Branch"
                              >
                                <Link
                                  data-toggle="modal"
                                  data-target="#packageExcludeforagentbranch"
                                  onclick="packageExcludeforagentbranch(28)"
                                >
                                  <i
                                    className="fa fa-eye-slash"
                                    aria-hidden="true"
                                  />
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr role="row" className="even">
                          <td>&nbsp;Hhgh</td>
                          <td>&nbsp;569361</td>
                          <td>&nbsp;static</td>
                          <td>&nbsp;1</td>
                          {/* td>&nbsp;</td*/}
                          {/* <td>&nbsp;</td> */}
                          <td>&nbsp;Hotel</td>
                          {/* <td>&nbsp;</td> */}
                          <td>NO</td>
                          <td>&nbsp;India</td>
                          <td>&nbsp;Mumbai</td>
                          <td className="actionlink">
                            <div className="actionCont">
                              <div className="input-group-addon">
                                <Link
                                  to={
                                    Constants.URLConstants.MASTERSPACKAGESVIEW
                                  }
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="View"
                                >
                                  <i className="fa fa-eye" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to={
                                    Constants.URLConstants.MASTERSPACKAGESEDIT
                                  }
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Edit"
                                >
                                  <i className="fa fa-pencil-square-o" />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                data-toggle="tooltip"
                                data-placement="top"
                                alt="Click To Deactivate"
                                title
                                data-original-title="Click To Deactivate"
                              >
                                <Link to="#" onclick="status_data(27,'I')">
                                  <i className="fa fa-check-circle" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="#"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  onclick="delete_data(27)"
                                  data-original-title="Delete"
                                >
                                  <i className="fa fa-trash" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="#"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  onclick="cloning(27)"
                                  data-original-title="clone"
                                >
                                  <i className="fa fa-copy" />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                title
                                data-toggle="tooltip"
                                data-placement="top"
                                data-original-title="Assign Discount Offer"
                              >
                                <Link
                                  data-toggle="modal"
                                  data-target="#packageOfferAssignment"
                                  onclick="packageOfferAssignment(27)"
                                >
                                  <i
                                    className="fa fa-map-signs"
                                    aria-hidden="true"
                                  />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                title
                                data-toggle="tooltip"
                                data-placement="top"
                                data-original-title="Hide for Agent/Branch"
                              >
                                <Link
                                  data-toggle="modal"
                                  data-target="#packageExcludeforagentbranch"
                                  onclick="packageExcludeforagentbranch(27)"
                                >
                                  <i
                                    className="fa fa-eye-slash"
                                    aria-hidden="true"
                                  />
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr role="row" className="odd">
                          <td>&nbsp;Bbggdd</td>
                          <td>&nbsp;692812</td>
                          <td>&nbsp;static</td>
                          <td>&nbsp;1</td>
                          {/* td>&nbsp;</td*/}
                          {/* <td>&nbsp;</td> */}
                          <td>&nbsp;Hotel</td>
                          {/* <td>&nbsp;</td> */}
                          <td>NO</td>
                          <td>&nbsp;India</td>
                          <td>&nbsp;Mumbai</td>
                          <td className="actionlink">
                            <div className="actionCont">
                              <div className="input-group-addon">
                                <Link
                                  to={
                                    Constants.URLConstants.MASTERSPACKAGESVIEW
                                  }
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="View"
                                >
                                  <i className="fa fa-eye" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to={
                                    Constants.URLConstants.MASTERSPACKAGESEDIT
                                  }
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Edit"
                                >
                                  <i className="fa fa-pencil-square-o" />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                data-toggle="tooltip"
                                data-placement="top"
                                alt="Click To Deactivate"
                                title
                                data-original-title="Click To Deactivate"
                              >
                                <Link to="#" onclick="status_data(26,'I')">
                                  <i className="fa fa-check-circle" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="#"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  onclick="delete_data(26)"
                                  data-original-title="Delete"
                                >
                                  <i className="fa fa-trash" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="#"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  onclick="cloning(26)"
                                  data-original-title="clone"
                                >
                                  <i className="fa fa-copy" />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                title
                                data-toggle="tooltip"
                                data-placement="top"
                                data-original-title="Assign Discount Offer"
                              >
                                <Link
                                  data-toggle="modal"
                                  data-target="#packageOfferAssignment"
                                  onclick="packageOfferAssignment(26)"
                                >
                                  <i
                                    className="fa fa-map-signs"
                                    aria-hidden="true"
                                  />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                title
                                data-toggle="tooltip"
                                data-placement="top"
                                data-original-title="Hide for Agent/Branch"
                              >
                                <Link
                                  data-toggle="modal"
                                  data-target="#packageExcludeforagentbranch"
                                  onclick="packageExcludeforagentbranch(26)"
                                >
                                  <i
                                    className="fa fa-eye-slash"
                                    aria-hidden="true"
                                  />
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr role="row" className="even">
                          <td>&nbsp;Dffd</td>
                          <td>&nbsp;462495</td>
                          <td>&nbsp;static</td>
                          <td>&nbsp;1</td>
                          {/* td>&nbsp;</td*/}
                          {/* <td>&nbsp;</td> */}
                          <td>&nbsp;Hotel</td>
                          {/* <td>&nbsp;</td> */}
                          <td>NO</td>
                          <td>&nbsp;India</td>
                          <td>&nbsp;Mumbai</td>
                          <td className="actionlink">
                            <div className="actionCont">
                              <div className="input-group-addon">
                                <Link
                                  to={
                                    Constants.URLConstants.MASTERSPACKAGESVIEW
                                  }
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="View"
                                >
                                  <i className="fa fa-eye" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to={
                                    Constants.URLConstants.MASTERSPACKAGESEDIT
                                  }
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Edit"
                                >
                                  <i className="fa fa-pencil-square-o" />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                data-toggle="tooltip"
                                data-placement="top"
                                alt="Click To Deactivate"
                                title
                                data-original-title="Click To Deactivate"
                              >
                                <Link to="#" onclick="status_data(25,'I')">
                                  <i className="fa fa-check-circle" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="#"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  onclick="delete_data(25)"
                                  data-original-title="Delete"
                                >
                                  <i className="fa fa-trash" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="#"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  onclick="cloning(25)"
                                  data-original-title="clone"
                                >
                                  <i className="fa fa-copy" />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                title
                                data-toggle="tooltip"
                                data-placement="top"
                                data-original-title="Assign Discount Offer"
                              >
                                <Link
                                  data-toggle="modal"
                                  data-target="#packageOfferAssignment"
                                  onclick="packageOfferAssignment(25)"
                                >
                                  <i
                                    className="fa fa-map-signs"
                                    aria-hidden="true"
                                  />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                title
                                data-toggle="tooltip"
                                data-placement="top"
                                data-original-title="Hide for Agent/Branch"
                              >
                                <Link
                                  data-toggle="modal"
                                  data-target="#packageExcludeforagentbranch"
                                  onclick="packageExcludeforagentbranch(25)"
                                >
                                  <i
                                    className="fa fa-eye-slash"
                                    aria-hidden="true"
                                  />
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr role="row" className="odd">
                          <td>&nbsp;Xxcx</td>
                          <td>&nbsp;79153</td>
                          <td>&nbsp;static</td>
                          <td>&nbsp;1</td>
                          {/* td>&nbsp;</td*/}
                          {/* <td>&nbsp;</td> */}
                          <td>&nbsp;Hotel</td>
                          {/* <td>&nbsp;</td> */}
                          <td>NO</td>
                          <td>&nbsp;India</td>
                          <td>&nbsp;Mumbai</td>
                          <td className="actionlink">
                            <div className="actionCont">
                              <div className="input-group-addon">
                                <Link
                                  to={
                                    Constants.URLConstants.MASTERSPACKAGESVIEW
                                  }
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="View"
                                >
                                  <i className="fa fa-eye" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to={
                                    Constants.URLConstants.MASTERSPACKAGESEDIT
                                  }
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Edit"
                                >
                                  <i className="fa fa-pencil-square-o" />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                data-toggle="tooltip"
                                data-placement="top"
                                alt="Click To Deactivate"
                                title
                                data-original-title="Click To Deactivate"
                              >
                                <Link to="#" onclick="status_data(24,'I')">
                                  <i className="fa fa-check-circle" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="#"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  onclick="delete_data(24)"
                                  data-original-title="Delete"
                                >
                                  <i className="fa fa-trash" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="#"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  onclick="cloning(24)"
                                  data-original-title="clone"
                                >
                                  <i className="fa fa-copy" />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                title
                                data-toggle="tooltip"
                                data-placement="top"
                                data-original-title="Assign Discount Offer"
                              >
                                <Link
                                  data-toggle="modal"
                                  data-target="#packageOfferAssignment"
                                  onclick="packageOfferAssignment(24)"
                                >
                                  <i
                                    className="fa fa-map-signs"
                                    aria-hidden="true"
                                  />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                title
                                data-toggle="tooltip"
                                data-placement="top"
                                data-original-title="Hide for Agent/Branch"
                              >
                                <Link
                                  data-toggle="modal"
                                  data-target="#packageExcludeforagentbranch"
                                  onclick="packageExcludeforagentbranch(24)"
                                >
                                  <i
                                    className="fa fa-eye-slash"
                                    aria-hidden="true"
                                  />
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr role="row" className="even">
                          <td>&nbsp;Yyy</td>
                          <td>&nbsp;694541</td>
                          <td>&nbsp;static</td>
                          <td>&nbsp;1</td>
                          {/* td>&nbsp;</td*/}
                          {/* <td>&nbsp;</td> */}
                          <td>&nbsp;Hotel</td>
                          {/* <td>&nbsp;</td> */}
                          <td>NO</td>
                          <td>&nbsp;India</td>
                          <td>&nbsp;Mumbai</td>
                          <td className="actionlink">
                            <div className="actionCont">
                              <div className="input-group-addon">
                                <Link
                                  to={
                                    Constants.URLConstants.MASTERSPACKAGESVIEW
                                  }
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="View"
                                >
                                  <i className="fa fa-eye" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to={
                                    Constants.URLConstants.MASTERSPACKAGESEDIT
                                  }
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Edit"
                                >
                                  <i className="fa fa-pencil-square-o" />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                data-toggle="tooltip"
                                data-placement="top"
                                alt="Click To Deactivate"
                                title
                                data-original-title="Click To Deactivate"
                              >
                                <Link to="#" onclick="status_data(23,'I')">
                                  <i className="fa fa-check-circle" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="#"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  onclick="delete_data(23)"
                                  data-original-title="Delete"
                                >
                                  <i className="fa fa-trash" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="#"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  onclick="cloning(23)"
                                  data-original-title="clone"
                                >
                                  <i className="fa fa-copy" />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                title
                                data-toggle="tooltip"
                                data-placement="top"
                                data-original-title="Assign Discount Offer"
                              >
                                <Link
                                  data-toggle="modal"
                                  data-target="#packageOfferAssignment"
                                  onclick="packageOfferAssignment(23)"
                                >
                                  <i
                                    className="fa fa-map-signs"
                                    aria-hidden="true"
                                  />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                title
                                data-toggle="tooltip"
                                data-placement="top"
                                data-original-title="Hide for Agent/Branch"
                              >
                                <Link
                                  data-toggle="modal"
                                  data-target="#packageExcludeforagentbranch"
                                  onclick="packageExcludeforagentbranch(23)"
                                >
                                  <i
                                    className="fa fa-eye-slash"
                                    aria-hidden="true"
                                  />
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr role="row" className="odd">
                          <td>&nbsp;Semi_Hotell_2D</td>
                          <td>&nbsp;508405</td>
                          <td>&nbsp;semi-dynamic</td>
                          <td>&nbsp;2</td>
                          {/* td>&nbsp;</td*/}
                          {/* <td>&nbsp;</td> */}
                          <td>&nbsp;Hotel</td>
                          {/* <td>&nbsp;</td> */}
                          <td>NO</td>
                          <td>&nbsp;India</td>
                          <td>&nbsp;Pune</td>
                          <td className="actionlink">
                            <div className="actionCont">
                              <div className="input-group-addon">
                                <Link
                                  to={
                                    Constants.URLConstants.MASTERSPACKAGESVIEW
                                  }
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="View"
                                >
                                  <i className="fa fa-eye" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to={
                                    Constants.URLConstants.MASTERSPACKAGESEDIT
                                  }
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Edit"
                                >
                                  <i className="fa fa-pencil-square-o" />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                data-toggle="tooltip"
                                data-placement="top"
                                alt="Click To Deactivate"
                                title
                                data-original-title="Click To Deactivate"
                              >
                                <Link to="#" onclick="status_data(22,'I')">
                                  <i className="fa fa-check-circle" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="#"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  onclick="delete_data(22)"
                                  data-original-title="Delete"
                                >
                                  <i className="fa fa-trash" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="#"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  onclick="cloning(22)"
                                  data-original-title="clone"
                                >
                                  <i className="fa fa-copy" />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                title
                                data-toggle="tooltip"
                                data-placement="top"
                                data-original-title="Assign Discount Offer"
                              >
                                <Link
                                  data-toggle="modal"
                                  data-target="#packageOfferAssignment"
                                  onclick="packageOfferAssignment(22)"
                                >
                                  <i
                                    className="fa fa-map-signs"
                                    aria-hidden="true"
                                  />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                title
                                data-toggle="tooltip"
                                data-placement="top"
                                data-original-title="Hide for Agent/Branch"
                              >
                                <Link
                                  data-toggle="modal"
                                  data-target="#packageExcludeforagentbranch"
                                  onclick="packageExcludeforagentbranch(22)"
                                >
                                  <i
                                    className="fa fa-eye-slash"
                                    aria-hidden="true"
                                  />
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr role="row" className="even">
                          <td>&nbsp;Static_Hotel123_2D</td>
                          <td>&nbsp;757474</td>
                          <td>&nbsp;static</td>
                          <td>&nbsp;2</td>
                          {/* td>&nbsp;</td*/}
                          {/* <td>&nbsp;</td> */}
                          <td>&nbsp;Hotel,Transfer</td>
                          {/* <td>&nbsp;</td> */}
                          <td>NO</td>
                          <td>&nbsp;India</td>
                          <td>&nbsp;Mumbai,Pune</td>
                          <td className="actionlink">
                            <div className="actionCont">
                              <div className="input-group-addon">
                                <Link
                                  to="MastersPackageView.html"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="View"
                                >
                                  <i className="fa fa-eye" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to={
                                    Constants.URLConstants.MASTERSPACKAGESEDIT
                                  }
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Edit"
                                >
                                  <i className="fa fa-pencil-square-o" />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                data-toggle="tooltip"
                                data-placement="top"
                                alt="Click To Deactivate"
                                title
                                data-original-title="Click To Deactivate"
                              >
                                <Link to="#" onclick="status_data(21,'I')">
                                  <i className="fa fa-check-circle" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="#"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  onclick="delete_data(21)"
                                  data-original-title="Delete"
                                >
                                  <i className="fa fa-trash" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="#"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  onclick="cloning(21)"
                                  data-original-title="clone"
                                >
                                  <i className="fa fa-copy" />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                title
                                data-toggle="tooltip"
                                data-placement="top"
                                data-original-title="Assign Discount Offer"
                              >
                                <Link
                                  data-toggle="modal"
                                  data-target="#packageOfferAssignment"
                                  onclick="packageOfferAssignment(21)"
                                >
                                  <i
                                    className="fa fa-map-signs"
                                    aria-hidden="true"
                                  />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                title
                                data-toggle="tooltip"
                                data-placement="top"
                                data-original-title="Hide for Agent/Branch"
                              >
                                <Link
                                  data-toggle="modal"
                                  data-target="#packageExcludeforagentbranch"
                                  onclick="packageExcludeforagentbranch(21)"
                                >
                                  <i
                                    className="fa fa-eye-slash"
                                    aria-hidden="true"
                                  />
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr role="row" className="odd">
                          <td>&nbsp;Static_Hotell_2D</td>
                          <td>&nbsp;823625</td>
                          <td>&nbsp;static</td>
                          <td>&nbsp;2</td>
                          {/* td>&nbsp;</td*/}
                          {/* <td>&nbsp;</td> */}
                          <td>&nbsp;Hotel,Sightseeing</td>
                          {/* <td>&nbsp;</td> */}
                          <td>NO</td>
                          <td>&nbsp;India</td>
                          <td>&nbsp;Mumbai</td>
                          <td className="actionlink">
                            <div className="actionCont">
                              <div className="input-group-addon">
                                <Link
                                  to="MastersPackageView.html"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="View"
                                >
                                  <i className="fa fa-eye" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to={
                                    Constants.URLConstants.MASTERSPACKAGESEDIT
                                  }
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Edit"
                                >
                                  <i className="fa fa-pencil-square-o" />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                data-toggle="tooltip"
                                data-placement="top"
                                alt="Click To Deactivate"
                                title
                                data-original-title="Click To Deactivate"
                              >
                                <Link to="#" onclick="status_data(20,'I')">
                                  <i className="fa fa-check-circle" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="#"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  onclick="delete_data(20)"
                                  data-original-title="Delete"
                                >
                                  <i className="fa fa-trash" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="#"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  onclick="cloning(20)"
                                  data-original-title="clone"
                                >
                                  <i className="fa fa-copy" />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                title
                                data-toggle="tooltip"
                                data-placement="top"
                                data-original-title="Assign Discount Offer"
                              >
                                <Link
                                  data-toggle="modal"
                                  data-target="#packageOfferAssignment"
                                  onclick="packageOfferAssignment(20)"
                                >
                                  <i
                                    className="fa fa-map-signs"
                                    aria-hidden="true"
                                  />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                title
                                data-toggle="tooltip"
                                data-placement="top"
                                data-original-title="Hide for Agent/Branch"
                              >
                                <Link
                                  data-toggle="modal"
                                  data-target="#packageExcludeforagentbranch"
                                  onclick="packageExcludeforagentbranch(20)"
                                >
                                  <i
                                    className="fa fa-eye-slash"
                                    aria-hidden="true"
                                  />
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr role="row" className="even">
                          <td>&nbsp;Semi_Hotell123</td>
                          <td>&nbsp;3739</td>
                          <td>&nbsp;semi-dynamic</td>
                          <td>&nbsp;1</td>
                          {/* td>&nbsp;</td*/}
                          {/* <td>&nbsp;</td> */}
                          <td>&nbsp;Hotel,Sightseeing,Transfer</td>
                          {/* <td>&nbsp;</td> */}
                          <td>NO</td>
                          <td>&nbsp;India</td>
                          <td>&nbsp;Mumbai,Pune</td>
                          <td className="actionlink">
                            <div className="actionCont">
                              <div className="input-group-addon">
                                <Link
                                  to="MastersPackageView.html"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="View"
                                >
                                  <i className="fa fa-eye" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to={
                                    Constants.URLConstants.MASTERSPACKAGESEDIT
                                  }
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Edit"
                                >
                                  <i className="fa fa-pencil-square-o" />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                data-toggle="tooltip"
                                data-placement="top"
                                alt="Click To Deactivate"
                                title
                                data-original-title="Click To Deactivate"
                              >
                                <Link to="#" onclick="status_data(19,'I')">
                                  <i className="fa fa-check-circle" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="#"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  onclick="delete_data(19)"
                                  data-original-title="Delete"
                                >
                                  <i className="fa fa-trash" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="#"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  onclick="cloning(19)"
                                  data-original-title="clone"
                                >
                                  <i className="fa fa-copy" />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                title
                                data-toggle="tooltip"
                                data-placement="top"
                                data-original-title="Assign Discount Offer"
                              >
                                <Link
                                  data-toggle="modal"
                                  data-target="#packageOfferAssignment"
                                  onclick="packageOfferAssignment(19)"
                                >
                                  <i
                                    className="fa fa-map-signs"
                                    aria-hidden="true"
                                  />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                title
                                data-toggle="tooltip"
                                data-placement="top"
                                data-original-title="Hide for Agent/Branch"
                              >
                                <Link
                                  data-toggle="modal"
                                  data-target="#packageExcludeforagentbranch"
                                  onclick="packageExcludeforagentbranch(19)"
                                >
                                  <i
                                    className="fa fa-eye-slash"
                                    aria-hidden="true"
                                  />
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr role="row" className="odd">
                          <td>&nbsp;Semi_Test_Check</td>
                          <td>&nbsp;594062</td>
                          <td>&nbsp;semi-dynamic</td>
                          <td>&nbsp;1</td>
                          {/* td>&nbsp;</td*/}
                          {/* <td>&nbsp;</td> */}
                          <td>&nbsp;Hotel,Sightseeing,Transfer</td>
                          {/* <td>&nbsp;</td> */}
                          <td>NO</td>
                          <td>&nbsp;India</td>
                          <td>&nbsp;Pune</td>
                          <td className="actionlink">
                            <div className="actionCont">
                              <div className="input-group-addon">
                                <Link
                                  to="MastersPackageView.html"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="View"
                                >
                                  <i className="fa fa-eye" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="MastersPackageEdit.html"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Edit"
                                >
                                  <i className="fa fa-pencil-square-o" />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                data-toggle="tooltip"
                                data-placement="top"
                                alt="Click To Deactivate"
                                title
                                data-original-title="Click To Deactivate"
                              >
                                <Link to="#" onclick="status_data(18,'I')">
                                  <i className="fa fa-check-circle" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="#"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  onclick="delete_data(18)"
                                  data-original-title="Delete"
                                >
                                  <i className="fa fa-trash" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="#"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  onclick="cloning(18)"
                                  data-original-title="clone"
                                >
                                  <i className="fa fa-copy" />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                title
                                data-toggle="tooltip"
                                data-placement="top"
                                data-original-title="Assign Discount Offer"
                              >
                                <Link
                                  data-toggle="modal"
                                  data-target="#packageOfferAssignment"
                                  onclick="packageOfferAssignment(18)"
                                >
                                  <i
                                    className="fa fa-map-signs"
                                    aria-hidden="true"
                                  />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                title
                                data-toggle="tooltip"
                                data-placement="top"
                                data-original-title="Hide for Agent/Branch"
                              >
                                <Link
                                  data-toggle="modal"
                                  data-target="#packageExcludeforagentbranch"
                                  onclick="packageExcludeforagentbranch(18)"
                                >
                                  <i
                                    className="fa fa-eye-slash"
                                    aria-hidden="true"
                                  />
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr role="row" className="even">
                          <td>&nbsp;Hotel_BBBBB</td>
                          <td>&nbsp;22322</td>
                          <td>&nbsp;static</td>
                          <td>&nbsp;1</td>
                          {/* td>&nbsp;</td*/}
                          {/* <td>&nbsp;</td> */}
                          <td>&nbsp;Hotel,Sightseeing</td>
                          {/* <td>&nbsp;</td> */}
                          <td>NO</td>
                          <td>&nbsp;India</td>
                          <td>&nbsp;Mumbai,Pune</td>
                          <td className="actionlink">
                            <div className="actionCont">
                              <div className="input-group-addon">
                                <Link
                                  to="MastersPackageView.html"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="View"
                                >
                                  <i className="fa fa-eye" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="MastersPackageEdit.html"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Edit"
                                >
                                  <i className="fa fa-pencil-square-o" />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                data-toggle="tooltip"
                                data-placement="top"
                                alt="Click To Deactivate"
                                title
                                data-original-title="Click To Deactivate"
                              >
                                <Link to="#" onclick="status_data(16,'I')">
                                  <i className="fa fa-check-circle" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="#"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  onclick="delete_data(16)"
                                  data-original-title="Delete"
                                >
                                  <i className="fa fa-trash" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="#"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  onclick="cloning(16)"
                                  data-original-title="clone"
                                >
                                  <i className="fa fa-copy" />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                title
                                data-toggle="tooltip"
                                data-placement="top"
                                data-original-title="Assign Discount Offer"
                              >
                                <Link
                                  data-toggle="modal"
                                  data-target="#packageOfferAssignment"
                                  onclick="packageOfferAssignment(16)"
                                >
                                  <i
                                    className="fa fa-map-signs"
                                    aria-hidden="true"
                                  />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                title
                                data-toggle="tooltip"
                                data-placement="top"
                                data-original-title="Hide for Agent/Branch"
                              >
                                <Link
                                  data-toggle="modal"
                                  data-target="#packageExcludeforagentbranch"
                                  onclick="packageExcludeforagentbranch(16)"
                                >
                                  <i
                                    className="fa fa-eye-slash"
                                    aria-hidden="true"
                                  />
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr role="row" className="odd">
                          <td>&nbsp;</td>
                          <td>&nbsp;707678</td>
                          <td>&nbsp;static</td>
                          <td>&nbsp;1</td>
                          {/* td>&nbsp;</td*/}
                          {/* <td>&nbsp;</td> */}
                          <td>&nbsp;Hotel,Sightseeing,Transfer</td>
                          {/* <td>&nbsp;</td> */}
                          <td>NO</td>
                          <td>&nbsp;India</td>
                          <td>&nbsp;Mumbai,Pune</td>
                          <td className="actionlink">
                            <div className="actionCont">
                              <div className="input-group-addon">
                                <Link
                                  to="MastersPackageView.html"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="View"
                                >
                                  <i className="fa fa-eye" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="MastersPackageEdit.html"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Edit"
                                >
                                  <i className="fa fa-pencil-square-o" />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                data-toggle="tooltip"
                                data-placement="top"
                                alt="Click To Deactivate"
                                title
                                data-original-title="Click To Deactivate"
                              >
                                <Link to="#" onclick="status_data(15,'I')">
                                  <i className="fa fa-check-circle" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="#"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  onclick="delete_data(15)"
                                  data-original-title="Delete"
                                >
                                  <i className="fa fa-trash" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="#"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  onclick="cloning(15)"
                                  data-original-title="clone"
                                >
                                  <i className="fa fa-copy" />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                title
                                data-toggle="tooltip"
                                data-placement="top"
                                data-original-title="Assign Discount Offer"
                              >
                                <Link
                                  data-toggle="modal"
                                  data-target="#packageOfferAssignment"
                                  onclick="packageOfferAssignment(15)"
                                >
                                  <i
                                    className="fa fa-map-signs"
                                    aria-hidden="true"
                                  />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                title
                                data-toggle="tooltip"
                                data-placement="top"
                                data-original-title="Hide for Agent/Branch"
                              >
                                <Link
                                  data-toggle="modal"
                                  data-target="#packageExcludeforagentbranch"
                                  onclick="packageExcludeforagentbranch(15)"
                                >
                                  <i
                                    className="fa fa-eye-slash"
                                    aria-hidden="true"
                                  />
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr role="row" className="even">
                          <td>&nbsp;Hotel_Check_Occ</td>
                          <td>&nbsp;438051</td>
                          <td>&nbsp;static</td>
                          <td>&nbsp;1</td>
                          {/* td>&nbsp;</td*/}
                          {/* <td>&nbsp;</td> */}
                          <td>&nbsp;Hotel,Transfer</td>
                          {/* <td>&nbsp;</td> */}
                          <td>NO</td>
                          <td>&nbsp;India</td>
                          <td>&nbsp;Mumbai,Pune</td>
                          <td className="actionlink">
                            <div className="actionCont">
                              <div className="input-group-addon">
                                <Link
                                  to="MastersPackageView.html"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="View"
                                >
                                  <i className="fa fa-eye" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="MastersPackageEdit.html"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Edit"
                                >
                                  <i className="fa fa-pencil-square-o" />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                data-toggle="tooltip"
                                data-placement="top"
                                alt="Click To Deactivate"
                                title
                                data-original-title="Click To Deactivate"
                              >
                                <Link to="#" onclick="status_data(14,'I')">
                                  <i className="fa fa-check-circle" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="#"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  onclick="delete_data(14)"
                                  data-original-title="Delete"
                                >
                                  <i className="fa fa-trash" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="#"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  onclick="cloning(14)"
                                  data-original-title="clone"
                                >
                                  <i className="fa fa-copy" />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                title
                                data-toggle="tooltip"
                                data-placement="top"
                                data-original-title="Assign Discount Offer"
                              >
                                <Link
                                  data-toggle="modal"
                                  data-target="#packageOfferAssignment"
                                  onclick="packageOfferAssignment(14)"
                                >
                                  <i
                                    className="fa fa-map-signs"
                                    aria-hidden="true"
                                  />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                title
                                data-toggle="tooltip"
                                data-placement="top"
                                data-original-title="Hide for Agent/Branch"
                              >
                                <Link
                                  data-toggle="modal"
                                  data-target="#packageExcludeforagentbranch"
                                  onclick="packageExcludeforagentbranch(14)"
                                >
                                  <i
                                    className="fa fa-eye-slash"
                                    aria-hidden="true"
                                  />
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr role="row" className="odd">
                          <td>&nbsp;Hotel_Check_A</td>
                          <td>&nbsp;596332</td>
                          <td>&nbsp;static</td>
                          <td>&nbsp;1</td>
                          {/* td>&nbsp;</td*/}
                          {/* <td>&nbsp;</td> */}
                          <td>&nbsp;Hotel</td>
                          {/* <td>&nbsp;</td> */}
                          <td>NO</td>
                          <td>&nbsp;India</td>
                          <td>&nbsp;Mumbai,Pune</td>
                          <td className="actionlink">
                            <div className="actionCont">
                              <div className="input-group-addon">
                                <Link
                                  to="MastersPackageView.html"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="View"
                                >
                                  <i className="fa fa-eye" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="MastersPackageEdit.html"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Edit"
                                >
                                  <i className="fa fa-pencil-square-o" />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                data-toggle="tooltip"
                                data-placement="top"
                                alt="Click To Deactivate"
                                title
                                data-original-title="Click To Deactivate"
                              >
                                <Link to="#" onclick="status_data(13,'I')">
                                  <i className="fa fa-check-circle" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="#"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  onclick="delete_data(13)"
                                  data-original-title="Delete"
                                >
                                  <i className="fa fa-trash" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="#"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  onclick="cloning(13)"
                                  data-original-title="clone"
                                >
                                  <i className="fa fa-copy" />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                title
                                data-toggle="tooltip"
                                data-placement="top"
                                data-original-title="Assign Discount Offer"
                              >
                                <Link
                                  data-toggle="modal"
                                  data-target="#packageOfferAssignment"
                                  onclick="packageOfferAssignment(13)"
                                >
                                  <i
                                    className="fa fa-map-signs"
                                    aria-hidden="true"
                                  />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                title
                                data-toggle="tooltip"
                                data-placement="top"
                                data-original-title="Hide for Agent/Branch"
                              >
                                <Link
                                  data-toggle="modal"
                                  data-target="#packageExcludeforagentbranch"
                                  onclick="packageExcludeforagentbranch(13)"
                                >
                                  <i
                                    className="fa fa-eye-slash"
                                    aria-hidden="true"
                                  />
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr role="row" className="even">
                          <td>&nbsp;Hotel_Test_Check</td>
                          <td>&nbsp;79974</td>
                          <td>&nbsp;static</td>
                          <td>&nbsp;1</td>
                          {/* td>&nbsp;</td*/}
                          {/* <td>&nbsp;</td> */}
                          <td>&nbsp;Hotel</td>
                          {/* <td>&nbsp;</td> */}
                          <td>NO</td>
                          <td>&nbsp;India</td>
                          <td>&nbsp;Mumbai</td>
                          <td className="actionlink">
                            <div className="actionCont">
                              <div className="input-group-addon">
                                <Link
                                  to="MastersPackageView.html"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="View"
                                >
                                  <i className="fa fa-eye" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="MastersPackageEdit.html"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Edit"
                                >
                                  <i className="fa fa-pencil-square-o" />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                data-toggle="tooltip"
                                data-placement="top"
                                alt="Click To Deactivate"
                                title
                                data-original-title="Click To Deactivate"
                              >
                                <Link to="#" onclick="status_data(12,'I')">
                                  <i className="fa fa-check-circle" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="#"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  onclick="delete_data(12)"
                                  data-original-title="Delete"
                                >
                                  <i className="fa fa-trash" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="#"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  onclick="cloning(12)"
                                  data-original-title="clone"
                                >
                                  <i className="fa fa-copy" />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                title
                                data-toggle="tooltip"
                                data-placement="top"
                                data-original-title="Assign Discount Offer"
                              >
                                <Link
                                  data-toggle="modal"
                                  data-target="#packageOfferAssignment"
                                  onclick="packageOfferAssignment(12)"
                                >
                                  <i
                                    className="fa fa-map-signs"
                                    aria-hidden="true"
                                  />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                title
                                data-toggle="tooltip"
                                data-placement="top"
                                data-original-title="Hide for Agent/Branch"
                              >
                                <Link
                                  data-toggle="modal"
                                  data-target="#packageExcludeforagentbranch"
                                  onclick="packageExcludeforagentbranch(12)"
                                >
                                  <i
                                    className="fa fa-eye-slash"
                                    aria-hidden="true"
                                  />
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr role="row" className="odd">
                          <td>&nbsp;Static_Check dates</td>
                          <td>&nbsp;909697</td>
                          <td>&nbsp;static</td>
                          <td>&nbsp;1</td>
                          {/* td>&nbsp;</td*/}
                          {/* <td>&nbsp;</td> */}
                          <td>&nbsp;Hotel,Sightseeing,Transfer</td>
                          {/* <td>&nbsp;</td> */}
                          <td>NO</td>
                          <td>&nbsp;India</td>
                          <td>&nbsp;Pune</td>
                          <td className="actionlink">
                            <div className="actionCont">
                              <div className="input-group-addon">
                                <Link
                                  to="MastersPackageView.html"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="View"
                                >
                                  <i className="fa fa-eye" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="MastersPackageEdit.html"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Edit"
                                >
                                  <i className="fa fa-pencil-square-o" />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                data-toggle="tooltip"
                                data-placement="top"
                                alt="Click To Deactivate"
                                title
                                data-original-title="Click To Deactivate"
                              >
                                <Link to="#" onclick="status_data(11,'I')">
                                  <i className="fa fa-check-circle" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="#"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  onclick="delete_data(11)"
                                  data-original-title="Delete"
                                >
                                  <i className="fa fa-trash" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="#"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  onclick="cloning(11)"
                                  data-original-title="clone"
                                >
                                  <i className="fa fa-copy" />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                title
                                data-toggle="tooltip"
                                data-placement="top"
                                data-original-title="Assign Discount Offer"
                              >
                                <Link
                                  data-toggle="modal"
                                  data-target="#packageOfferAssignment"
                                  onclick="packageOfferAssignment(11)"
                                >
                                  <i
                                    className="fa fa-map-signs"
                                    aria-hidden="true"
                                  />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                title
                                data-toggle="tooltip"
                                data-placement="top"
                                data-original-title="Hide for Agent/Branch"
                              >
                                <Link
                                  data-toggle="modal"
                                  data-target="#packageExcludeforagentbranch"
                                  onclick="packageExcludeforagentbranch(11)"
                                >
                                  <i
                                    className="fa fa-eye-slash"
                                    aria-hidden="true"
                                  />
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr role="row" className="even">
                          <td>&nbsp;Semi_Check</td>
                          <td>&nbsp;913046</td>
                          <td>&nbsp;semi-dynamic</td>
                          <td>&nbsp;1</td>
                          {/* td>&nbsp;</td*/}
                          {/* <td>&nbsp;</td> */}
                          <td>&nbsp;Hotel,Sightseeing,Transfer</td>
                          {/* <td>&nbsp;</td> */}
                          <td>NO</td>
                          <td>&nbsp;India</td>
                          <td>&nbsp;Pune</td>
                          <td className="actionlink">
                            <div className="actionCont">
                              <div className="input-group-addon">
                                <Link
                                  to="MastersPackageView.html"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="View"
                                >
                                  <i className="fa fa-eye" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="MastersPackageEdit.html"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Edit"
                                >
                                  <i className="fa fa-pencil-square-o" />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                data-toggle="tooltip"
                                data-placement="top"
                                alt="Click To Deactivate"
                                title
                                data-original-title="Click To Deactivate"
                              >
                                <Link to="#" onclick="status_data(10,'I')">
                                  <i className="fa fa-check-circle" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="#"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  onclick="delete_data(10)"
                                  data-original-title="Delete"
                                >
                                  <i className="fa fa-trash" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="#"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  onclick="cloning(10)"
                                  data-original-title="clone"
                                >
                                  <i className="fa fa-copy" />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                title
                                data-toggle="tooltip"
                                data-placement="top"
                                data-original-title="Assign Discount Offer"
                              >
                                <Link
                                  data-toggle="modal"
                                  data-target="#packageOfferAssignment"
                                  onclick="packageOfferAssignment(10)"
                                >
                                  <i
                                    className="fa fa-map-signs"
                                    aria-hidden="true"
                                  />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                title
                                data-toggle="tooltip"
                                data-placement="top"
                                data-original-title="Hide for Agent/Branch"
                              >
                                <Link
                                  data-toggle="modal"
                                  data-target="#packageExcludeforagentbranch"
                                  onclick="packageExcludeforagentbranch(10)"
                                >
                                  <i
                                    className="fa fa-eye-slash"
                                    aria-hidden="true"
                                  />
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr role="row" className="odd">
                          <td>&nbsp;Hotel_Release</td>
                          <td>&nbsp;41839</td>
                          <td>&nbsp;static</td>
                          <td>&nbsp;1</td>
                          {/* td>&nbsp;</td*/}
                          {/* <td>&nbsp;</td> */}
                          <td>&nbsp;Hotel</td>
                          {/* <td>&nbsp;</td> */}
                          <td>NO</td>
                          <td>&nbsp;India</td>
                          <td>&nbsp;Pune</td>
                          <td className="actionlink">
                            <div className="actionCont">
                              <div className="input-group-addon">
                                <Link
                                  to="MastersPackageView.html"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="View"
                                >
                                  <i className="fa fa-eye" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="MastersPackageEdit.html"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Edit"
                                >
                                  <i className="fa fa-pencil-square-o" />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                data-toggle="tooltip"
                                data-placement="top"
                                alt="Click To Deactivate"
                                title
                                data-original-title="Click To Deactivate"
                              >
                                <Link to="#" onclick="status_data(9,'I')">
                                  <i className="fa fa-check-circle" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="#"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  onclick="delete_data(9)"
                                  data-original-title="Delete"
                                >
                                  <i className="fa fa-trash" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="#"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  onclick="cloning(9)"
                                  data-original-title="clone"
                                >
                                  <i className="fa fa-copy" />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                title
                                data-toggle="tooltip"
                                data-placement="top"
                                data-original-title="Assign Discount Offer"
                              >
                                <Link
                                  data-toggle="modal"
                                  data-target="#packageOfferAssignment"
                                  onclick="packageOfferAssignment(9)"
                                >
                                  <i
                                    className="fa fa-map-signs"
                                    aria-hidden="true"
                                  />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                title
                                data-toggle="tooltip"
                                data-placement="top"
                                data-original-title="Hide for Agent/Branch"
                              >
                                <Link
                                  data-toggle="modal"
                                  data-target="#packageExcludeforagentbranch"
                                  onclick="packageExcludeforagentbranch(9)"
                                >
                                  <i
                                    className="fa fa-eye-slash"
                                    aria-hidden="true"
                                  />
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr role="row" className="even">
                          <td>&nbsp;Multi_city</td>
                          <td>&nbsp;150859</td>
                          <td>&nbsp;static</td>
                          <td>&nbsp;1</td>
                          {/* td>&nbsp;</td*/}
                          {/* <td>&nbsp;</td> */}
                          <td>&nbsp;Hotel,Transfer</td>
                          {/* <td>&nbsp;</td> */}
                          <td>NO</td>
                          <td>&nbsp;India</td>
                          <td>&nbsp;Nagpur,Pune</td>
                          <td className="actionlink">
                            <div className="actionCont">
                              <div className="input-group-addon">
                                <Link
                                  to="MastersPackageView.html"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="View"
                                >
                                  <i className="fa fa-eye" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="MastersPackageEdit.html"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Edit"
                                >
                                  <i className="fa fa-pencil-square-o" />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                data-toggle="tooltip"
                                data-placement="top"
                                alt="Click To Deactivate"
                                title
                                data-original-title="Click To Deactivate"
                              >
                                <Link to="#" onclick="status_data(8,'I')">
                                  <i className="fa fa-check-circle" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="#"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  onclick="delete_data(8)"
                                  data-original-title="Delete"
                                >
                                  <i className="fa fa-trash" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="#"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  onclick="cloning(8)"
                                  data-original-title="clone"
                                >
                                  <i className="fa fa-copy" />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                title
                                data-toggle="tooltip"
                                data-placement="top"
                                data-original-title="Assign Discount Offer"
                              >
                                <Link
                                  data-toggle="modal"
                                  data-target="#packageOfferAssignment"
                                  onclick="packageOfferAssignment(8)"
                                >
                                  <i
                                    className="fa fa-map-signs"
                                    aria-hidden="true"
                                  />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                title
                                data-toggle="tooltip"
                                data-placement="top"
                                data-original-title="Hide for Agent/Branch"
                              >
                                <Link
                                  data-toggle="modal"
                                  data-target="#packageExcludeforagentbranch"
                                  onclick="packageExcludeforagentbranch(8)"
                                >
                                  <i
                                    className="fa fa-eye-slash"
                                    aria-hidden="true"
                                  />
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr role="row" className="odd">
                          <td>&nbsp;Test_Activity</td>
                          <td>&nbsp;667728</td>
                          <td>&nbsp;static</td>
                          <td>&nbsp;1</td>
                          {/* td>&nbsp;</td*/}
                          {/* <td>&nbsp;</td> */}
                          <td>&nbsp;Hotel,Sightseeing</td>
                          {/* <td>&nbsp;</td> */}
                          <td>NO</td>
                          <td>&nbsp;India</td>
                          <td>&nbsp;Pune</td>
                          <td className="actionlink">
                            <div className="actionCont">
                              <div className="input-group-addon">
                                <Link
                                  to="MastersPackageView.html"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="View"
                                >
                                  <i className="fa fa-eye" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="MastersPackageEdit.html"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Edit"
                                >
                                  <i className="fa fa-pencil-square-o" />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                data-toggle="tooltip"
                                data-placement="top"
                                alt="Click To Deactivate"
                                title
                                data-original-title="Click To Deactivate"
                              >
                                <Link to="#" onclick="status_data(7,'I')">
                                  <i className="fa fa-check-circle" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="#"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  onclick="delete_data(7)"
                                  data-original-title="Delete"
                                >
                                  <i className="fa fa-trash" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to="#"
                                  title
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  onclick="cloning(7)"
                                  data-original-title="clone"
                                >
                                  <i className="fa fa-copy" />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                title
                                data-toggle="tooltip"
                                data-placement="top"
                                data-original-title="Assign Discount Offer"
                              >
                                <Link
                                  data-toggle="modal"
                                  data-target="#packageOfferAssignment"
                                  onclick="packageOfferAssignment(7)"
                                >
                                  <i
                                    className="fa fa-map-signs"
                                    aria-hidden="true"
                                  />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                title
                                data-toggle="tooltip"
                                data-placement="top"
                                data-original-title="Hide for Agent/Branch"
                              >
                                <Link
                                  data-toggle="modal"
                                  data-target="#packageExcludeforagentbranch"
                                  onclick="packageExcludeforagentbranch(7)"
                                >
                                  <i
                                    className="fa fa-eye-slash"
                                    aria-hidden="true"
                                  />
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <div
                    className="dataTables_info"
                    id="tableres_info"
                    role="status"
                    aria-live="polite"
                  ></div>
                </div>
                <div className="col-sm-6" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default MastersPackagesSearch;
