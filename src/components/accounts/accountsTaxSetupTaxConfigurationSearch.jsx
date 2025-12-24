import React, { useState } from "react"; // Import React and useState
import Flatpickr from "react-flatpickr";
import { Link } from "react-router-dom";

import {
  accounts_serviceOptions,
  consumedOptions,
  supplierStatusOptions,
} from "../../constants/contants";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";
import MultiSelect from "../reactMultiSelect";
import { countries } from "../../constants/Country-City-Data";

// Now you can use the `supplierStatusOptions` array in your JavaScript code.

// Now you can use the `consumedOptions` array in your JavaScript code.

const AccountsTaxSetupTaxConfigurationSearch = () => {
  const [startDate, setStartDate] = useState(null); // State for the start date
  const [endDate, setEndDate] = useState(null);
  const handleTrashClick = () => {
    // Function to clear both start and end dates
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <Header2
          title="SEARCH TAX CONFIGURATION"
          linkText1="Search Tax Configuration"
          linkText2="Add Tax Configuration"
          link2={Constants.URLConstants.ACCOUNTSTAXSETUPTAXCONFUGRATIONNEW}
        />

        <div>
          <form>
            <div className="row">
              <div className="col-md-3">
                <div className="form-group">
                  <label>Country :</label>
                  <MultiSelect
                    options={countries}
                    isSearchable
                    placeholder="- Select Country-"
                    noOptionsMessage={() => "No Country Found"}
                    className="custom-select"
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label>Service Consumed :</label>
                  <MultiSelect
                    options={consumedOptions}
                    isSearchable
                    placeholder="- Select Service-"
                    noOptionsMessage={() => "No Service Found"}
                    className="custom-select"
                  />
                </div>
              </div>
            </div>
            {/* 2nd Row */}
            <div className="row mt-3">
              <div className="col-md-3 form-group">
                <label>Date :</label>
                <style
                  dangerouslySetInnerHTML={{
                    __html: "\n#flow{\npadding-right: 77px !important;\n}\n",
                  }}
                />

                <div className="input-group date input-daterange" id="date">
                  <span className="input-group-addon" id="flow">
                    Valid&nbsp;From
                  </span>
                  <Flatpickr
                    value={startDate}
                    onChange={(date) => setStartDate(date)}
                    options={{ dateFormat: "Y-m-d" }}
                    style={{ width: "100px" }}
                  />
                  <span className="input-group-addon">to</span>
                  <Flatpickr
                    value={endDate}
                    onChange={(date) => setEndDate(date)}
                    options={{ dateFormat: "Y-m-d" }}
                    style={{ width: "100px" }}
                  />
                  <span
                    className="input-group-addon"
                    onClick={handleTrashClick}
                  >
                    <i className="fa fa-trash" />
                  </span>
                </div>
              </div>
              <div className="form-group col-md-3">
                <label>Supplier Status :</label>
                <MultiSelect
                  options={supplierStatusOptions}
                  isSearchable
                  placeholder="- Select Supplier-"
                  noOptionsMessage={() => "No Supplier Found"}
                  className="custom-select"
                />
              </div>
            </div>
            {/* Row */}
            <div className="row">
              <input type="hidden" name="supplier_country" defaultValue={0} />{" "}
              {/* Temp */}
              <input
                type="hidden"
                name="supplier_type"
                defaultValue="external"
              />{" "}
              {/* Temp */}
            </div>
            {/* 3rd Row */}
            <div className="row mt-3">
              <div className="form-group col-md-3">
                <label>Services :</label>
                <MultiSelect
                  options={accounts_serviceOptions}
                  isSearchable
                  placeholder="- Select Services-"
                  noOptionsMessage={() => "No Services Found"}
                  className="custom-select"
                />
              </div>
            </div>
            {/* 4th Row */}
            <div className="row mt-3">
              <div className="form-group col-md-12">
                <input
                  type="hidden"
                  name="action"
                  defaultValue="tax_config_add_controller"
                />
                <button
                  type="submit"
                  className="btn btn-dark btn-sm"
                  value="Submit"
                  id="submit_button"
                >
                  <i className="fa fa-save" />
                  &nbsp;Search
                </button>
              </div>
            </div>
          </form>
          <br />
          <form>
            {/* 5th Row */}
            <div className="row">
              <div className="col-md-1 form-group" />
              <div className="col-md-2 form-group" />
              <div className="col-md-7 form-group">
                {/*Pagination panel*/}
                <nav aria-label="Page navigation example">
                  <ul className="pagination pagination-sm justify-content-center mt-4">
                    <li className="page-item">
                      <Link className="page-link" to="#" aria-label="Previous">
                        <span aria-hidden="true">«</span>
                      </Link>
                    </li>
                    <li className="ppage-item active">
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
              <div className="col-md-2 form-group mt-3">
                <style
                  dangerouslySetInnerHTML={{
                    __html:
                      "\n                    .table tr[visible='false'],\n                    .no-result {\n                        display: none;\n                        border: 1px solid #ddd;\n                        padding: 10px;\n                        margin-top: -2px;\n                    }\n\n                    .table tr[visible='true'] {\n                        display: table-row;\n                    }\n\n                    .counter {\n                        padding: 8px;\n                        color: #ccc;\n                    }\n\n                    .search_new {\n                        float: right;\n                        height: 35px;\n                        margin-bottom: 0px;\n                        padding-left: 5px;\n                    }\n                ",
                  }}
                />
                <div
                  className="form-group col-md-2 new_search_icon"
                  style={{ textAlign: "right", paddingRight: "0px" }}
                >
                  <style
                    dangerouslySetInnerHTML={{
                      __html:
                        "\n.table > thead > tr > td {\n color: #fff;\n}\n",
                    }}
                  />

                  <h5 style={{ display: "inline" }}>
                    <i
                      className="fa fa-search srchWithinPg"
                      id="magnifiers"
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
            {/* 6th Row */}
            <div className="row mt-2">
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
                <div
                  id="wrapper2"
                  style={{
                    overflowX: "scroll",
                    display: "block",
                    overflowY: "hidden",
                  }}
                >
                  <table
                    id="tax-table"
                    className="table   table-responsive table-bordered  dataTable no-footer"
                    role="grid"
                    aria-describedby="tax-table_info"
                  >
                    <thead style={{ textTransform: "uppercase" }}>
                      <tr role="row">
                        <td
                          className="sorting_disabled"
                          rowSpan={1}
                          colSpan={1}
                          style={{ width: "167px" }}
                        >
                          Country
                        </td>
                        <td
                          className="sorting_disabled"
                          rowSpan={1}
                          colSpan={1}
                          style={{ width: "44px" }}
                        >
                          Branch
                        </td>
                        <td
                          className="sorting_disabled"
                          rowSpan={1}
                          colSpan={1}
                          style={{ width: "148px" }}
                        >
                          Location
                        </td>
                        <td
                          className="sorting_disabled"
                          rowSpan={1}
                          colSpan={1}
                          style={{ width: "78px" }}
                        >
                          Service
                        </td>
                        <td
                          className="sorting_disabled"
                          rowSpan={1}
                          colSpan={1}
                          style={{ width: "111px" }}
                        >
                          Suppler Status
                        </td>
                        <td
                          className="sorting_disabled"
                          rowSpan={1}
                          colSpan={1}
                          style={{ width: "59px" }}
                        >
                          From Date
                        </td>
                        <td
                          className="sorting_disabled"
                          rowSpan={1}
                          colSpan={1}
                          style={{ width: "43px" }}
                        >
                          To Date
                        </td>
                        <td
                          className="sorting_disabled"
                          rowSpan={1}
                          colSpan={1}
                          style={{ width: "123px" }}
                        >
                          Service consumption
                        </td>
                        <td
                          className="sorting_disabled"
                          rowSpan={1}
                          colSpan={1}
                          style={{ width: "85px" }}
                        >
                          Input Tax Code
                        </td>
                        <td
                          className="sorting_disabled"
                          rowSpan={1}
                          colSpan={1}
                          style={{ width: "43px" }}
                        >
                          Input %
                        </td>
                        <td
                          className="sorting_disabled"
                          rowSpan={1}
                          colSpan={1}
                          style={{ width: "99px" }}
                        >
                          Output Tax Code
                        </td>
                        <td
                          className="sorting_disabled"
                          rowSpan={1}
                          colSpan={1}
                          style={{ width: "53px" }}
                        >
                          Output %
                        </td>
                        <td
                          className="sorting_disabled"
                          rowSpan={1}
                          colSpan={1}
                          style={{ width: "101px" }}
                        >
                          Action
                        </td>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      <tr role="row" className="odd">
                        <td>
                          <label>India</label>
                        </td>
                        <td>
                          <label />
                        </td>
                        <td>
                          <label
                            data-toggle="tooltip"
                            data-placement="top"
                            title
                            data-original-title="Mumbai,New delhi(Delhi),Bangalore (Bengaluru)"
                          >
                            Mumbai,New delh....
                          </label>
                        </td>
                        <td>
                          <label>Transfer</label>
                        </td>
                        {/* <td>
              <label></label>
              </td> */}
                        <td>
                          <label>Registered</label>
                        </td>
                        <td>
                          <label>
                            <div className="dateWrapper">
                              <div className="onlyDate">01</div>
                              <div className="monthYear">
                                Jun
                                <br />
                                2019
                              </div>
                            </div>
                          </label>
                        </td>
                        <td>
                          <label>
                            <div className="dateWrapper">
                              <div className="onlyDate">30</div>
                              <div className="monthYear">
                                Jun
                                <br />
                                2019
                              </div>
                            </div>
                          </label>
                        </td>
                        <td>
                          <label>INBOUND</label>
                        </td>
                        <td>
                          <label />
                        </td>
                        <td>
                          <label>0</label>
                        </td>
                        <td>
                          <label />
                        </td>
                        <td>
                          <label>0</label>
                        </td>
                        <td className="actionlink">
                          <div className="actionCont">
                            <div className="input-group-addon">
                              <Link
                                data-toggle="tooltip"
                                data-original-title="Edit"
                                data-placement="top"
                                to={
                                  Constants.URLConstants
                                    .ACCOUNTSTAXSETUPTAXCONFUGRATIONEDIT
                                }
                              >
                                <i className="fa fa-pencil-square-o" />
                              </Link>
                            </div>
                            <div className="input-group-addon">
                              <Link
                                data-toggle="tooltip"
                                data-original-title="Delete"
                                data-placement="top"
                                to="tax.php?action=delete_tax_config&id=3"
                              >
                                <i className="fa fa-trash" />
                              </Link>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr role="row" className="even">
                        <td>
                          <label>India</label>
                        </td>
                        <td>
                          <label />
                        </td>
                        <td>
                          <label
                            data-toggle="tooltip"
                            data-placement="top"
                            title
                            data-original-title
                          >
                            ....
                          </label>
                        </td>
                        <td>
                          <label>Transfer</label>
                        </td>
                        {/* <td>
              <label></label>
              </td> */}
                        <td>
                          <label>Registered</label>
                        </td>
                        <td>
                          <label>
                            <div className="dateWrapper">
                              <div className="onlyDate">12</div>
                              <div className="monthYear">
                                Jun
                                <br />
                                2019
                              </div>
                            </div>
                          </label>
                        </td>
                        <td>
                          <label>
                            <div className="dateWrapper">
                              <div className="onlyDate">30</div>
                              <div className="monthYear">
                                Jun
                                <br />
                                2019
                              </div>
                            </div>
                          </label>
                        </td>
                        <td>
                          <label>INBOUND</label>
                        </td>
                        <td>
                          <label />
                        </td>
                        <td>
                          <label>0</label>
                        </td>
                        <td>
                          <label />
                        </td>
                        <td>
                          <label>0</label>
                        </td>
                        <td className="actionlink">
                          <div className="actionCont">
                            <div className="input-group-addon">
                              <Link
                                data-toggle="tooltip"
                                data-original-title="Edit"
                                data-placement="top"
                                to="AccountsTaxsetupTaxConfigurationedit.html"
                              >
                                <i className="fa fa-pencil-square-o" />
                              </Link>
                            </div>
                            <div className="input-group-addon">
                              <Link
                                data-toggle="tooltip"
                                data-original-title="Delete"
                                data-placement="top"
                                to="tax.php?action=delete_tax_config&id=4"
                              >
                                <i className="fa fa-trash" />
                              </Link>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr role="row" className="odd">
                        <td>
                          <label>India</label>
                        </td>
                        <td>
                          <label />
                        </td>
                        <td>
                          <label
                            data-toggle="tooltip"
                            data-placement="top"
                            title
                            data-original-title
                          >
                            ....
                          </label>
                        </td>
                        <td>
                          <label>Transfer</label>
                        </td>
                        {/* <td>
              <label></label>
              </td> */}
                        <td>
                          <label>Registered</label>
                        </td>
                        <td>
                          <label>
                            <div className="dateWrapper">
                              <div className="onlyDate">12</div>
                              <div className="monthYear">
                                Jun
                                <br />
                                2019
                              </div>
                            </div>
                          </label>
                        </td>
                        <td>
                          <label>
                            <div className="dateWrapper">
                              <div className="onlyDate">30</div>
                              <div className="monthYear">
                                Jun
                                <br />
                                2019
                              </div>
                            </div>
                          </label>
                        </td>
                        <td>
                          <label>INBOUND</label>
                        </td>
                        <td>
                          <label />
                        </td>
                        <td>
                          <label>0</label>
                        </td>
                        <td>
                          <label />
                        </td>
                        <td>
                          <label>0</label>
                        </td>
                        <td className="actionlink">
                          <div className="actionCont">
                            <div className="input-group-addon">
                              <Link
                                data-toggle="tooltip"
                                data-original-title="Edit"
                                data-placement="top"
                                to="AccountsTaxsetupTaxConfigurationedit.html"
                              >
                                <i className="fa fa-pencil-square-o" />
                              </Link>
                            </div>
                            <div className="input-group-addon">
                              <Link
                                data-toggle="tooltip"
                                data-original-title="Delete"
                                data-placement="top"
                                to="tax.php?action=delete_tax_config&id=5"
                              >
                                <i className="fa fa-trash" />
                              </Link>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr role="row" className="even">
                        <td>
                          <label>India</label>
                        </td>
                        <td>
                          <label />
                        </td>
                        <td>
                          <label
                            data-toggle="tooltip"
                            data-placement="top"
                            title
                            data-original-title
                          >
                            ....
                          </label>
                        </td>
                        <td>
                          <label>Transfer</label>
                        </td>
                        {/* <td>
              <label></label>
              </td> */}
                        <td>
                          <label>Registered</label>
                        </td>
                        <td>
                          <label>
                            <div className="dateWrapper">
                              <div className="onlyDate">12</div>
                              <div className="monthYear">
                                Jun
                                <br />
                                2019
                              </div>
                            </div>
                          </label>
                        </td>
                        <td>
                          <label>
                            <div className="dateWrapper">
                              <div className="onlyDate">30</div>
                              <div className="monthYear">
                                Jun
                                <br />
                                2019
                              </div>
                            </div>
                          </label>
                        </td>
                        <td>
                          <label>INBOUND</label>
                        </td>
                        <td>
                          <label />
                        </td>
                        <td>
                          <label>0</label>
                        </td>
                        <td>
                          <label />
                        </td>
                        <td>
                          <label>0</label>
                        </td>
                        <td className="actionlink">
                          <div className="actionCont">
                            <div className="input-group-addon">
                              <Link
                                data-toggle="tooltip"
                                data-original-title="Edit"
                                data-placement="top"
                                to="AccountsTaxsetupTaxConfigurationedit.html"
                              >
                                <i className="fa fa-pencil-square-o" />
                              </Link>
                            </div>
                            <div className="input-group-addon">
                              <Link
                                data-toggle="tooltip"
                                data-original-title="Delete"
                                data-placement="top"
                                to="tax.php?action=delete_tax_config&id=6"
                              >
                                <i className="fa fa-trash" />
                              </Link>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr role="row" className="odd">
                        <td>
                          <label>India</label>
                        </td>
                        <td>
                          <label />
                        </td>
                        <td>
                          <label
                            data-toggle="tooltip"
                            data-placement="top"
                            title
                            data-original-title
                          >
                            ....
                          </label>
                        </td>
                        <td>
                          <label>Transfer</label>
                        </td>
                        {/* <td>
              <label></label>
              </td> */}
                        <td>
                          <label>Registered</label>
                        </td>
                        <td>
                          <label>
                            <div className="dateWrapper">
                              <div className="onlyDate">12</div>
                              <div className="monthYear">
                                Jun
                                <br />
                                2019
                              </div>
                            </div>
                          </label>
                        </td>
                        <td>
                          <label>
                            <div className="dateWrapper">
                              <div className="onlyDate">30</div>
                              <div className="monthYear">
                                Jun
                                <br />
                                2019
                              </div>
                            </div>
                          </label>
                        </td>
                        <td>
                          <label>INBOUND</label>
                        </td>
                        <td>
                          <label />
                        </td>
                        <td>
                          <label>0</label>
                        </td>
                        <td>
                          <label />
                        </td>
                        <td>
                          <label>0</label>
                        </td>
                        <td className="actionlink">
                          <div className="actionCont">
                            <div className="input-group-addon">
                              <Link
                                data-toggle="tooltip"
                                data-original-title="Edit"
                                data-placement="top"
                                to="AccountsTaxsetupTaxConfigurationedit.html"
                              >
                                <i className="fa fa-pencil-square-o" />
                              </Link>
                            </div>
                            <div className="input-group-addon">
                              <Link
                                data-toggle="tooltip"
                                data-original-title="Delete"
                                data-placement="top"
                                to="tax.php?action=delete_tax_config&id=7"
                              >
                                <i className="fa fa-trash" />
                              </Link>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr role="row" className="even">
                        <td>
                          <label>India</label>
                        </td>
                        <td>
                          <label />
                        </td>
                        <td>
                          <label
                            data-toggle="tooltip"
                            data-placement="top"
                            title
                            data-original-title
                          >
                            ....
                          </label>
                        </td>
                        <td>
                          <label>Transfer</label>
                        </td>
                        {/* <td>
              <label></label>
              </td> */}
                        <td>
                          <label>Registered</label>
                        </td>
                        <td>
                          <label>
                            <div className="dateWrapper">
                              <div className="onlyDate">12</div>
                              <div className="monthYear">
                                Jun
                                <br />
                                2019
                              </div>
                            </div>
                          </label>
                        </td>
                        <td>
                          <label>
                            <div className="dateWrapper">
                              <div className="onlyDate">30</div>
                              <div className="monthYear">
                                Jun
                                <br />
                                2019
                              </div>
                            </div>
                          </label>
                        </td>
                        <td>
                          <label>INBOUND</label>
                        </td>
                        <td>
                          <label />
                        </td>
                        <td>
                          <label>0</label>
                        </td>
                        <td>
                          <label />
                        </td>
                        <td>
                          <label>0</label>
                        </td>
                        <td className="actionlink">
                          <div className="actionCont">
                            <div className="input-group-addon">
                              <Link
                                data-toggle="tooltip"
                                data-original-title="Edit"
                                data-placement="top"
                                to="AccountsTaxsetupTaxConfigurationedit.html"
                              >
                                <i className="fa fa-pencil-square-o" />
                              </Link>
                            </div>
                            <div className="input-group-addon">
                              <Link
                                data-toggle="tooltip"
                                data-original-title="Delete"
                                data-placement="top"
                                to="tax.php?action=delete_tax_config&id=8"
                              >
                                <i className="fa fa-trash" />
                              </Link>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr role="row" className="odd">
                        <td>
                          <label>India</label>
                        </td>
                        <td>
                          <label />
                        </td>
                        <td>
                          <label
                            data-toggle="tooltip"
                            data-placement="top"
                            title
                            data-original-title
                          >
                            ....
                          </label>
                        </td>
                        <td>
                          <label>Transfer</label>
                        </td>
                        {/* <td>
              <label></label>
              </td> */}
                        <td>
                          <label>Registered</label>
                        </td>
                        <td>
                          <label>
                            <div className="dateWrapper">
                              <div className="onlyDate">12</div>
                              <div className="monthYear">
                                Jun
                                <br />
                                2019
                              </div>
                            </div>
                          </label>
                        </td>
                        <td>
                          <label>
                            <div className="dateWrapper">
                              <div className="onlyDate">30</div>
                              <div className="monthYear">
                                Jun
                                <br />
                                2019
                              </div>
                            </div>
                          </label>
                        </td>
                        <td>
                          <label>INBOUND</label>
                        </td>
                        <td>
                          <label />
                        </td>
                        <td>
                          <label>0</label>
                        </td>
                        <td>
                          <label />
                        </td>
                        <td>
                          <label>0</label>
                        </td>
                        <td className="actionlink">
                          <div className="actionCont">
                            <div className="input-group-addon">
                              <Link
                                data-toggle="tooltip"
                                data-original-title="Edit"
                                data-placement="top"
                                to="AccountsTaxsetupTaxConfigurationedit.html"
                              >
                                <i className="fa fa-pencil-square-o" />
                              </Link>
                            </div>
                            <div className="input-group-addon">
                              <Link
                                data-toggle="tooltip"
                                data-original-title="Delete"
                                data-placement="top"
                                to="tax.php?action=delete_tax_config&id=9"
                              >
                                <i className="fa fa-trash" />
                              </Link>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr role="row" className="even">
                        <td>
                          <label>India</label>
                        </td>
                        <td>
                          <label />
                        </td>
                        <td>
                          <label
                            data-toggle="tooltip"
                            data-placement="top"
                            title
                            data-original-title
                          >
                            ....
                          </label>
                        </td>
                        <td>
                          <label>Hotel</label>
                        </td>
                        {/* <td>
              <label></label>
              </td> */}
                        <td>
                          <label>Registered</label>
                        </td>
                        <td>
                          <label>
                            <div className="dateWrapper">
                              <div className="onlyDate">12</div>
                              <div className="monthYear">
                                Jun
                                <br />
                                2019
                              </div>
                            </div>
                          </label>
                        </td>
                        <td>
                          <label>
                            <div className="dateWrapper">
                              <div className="onlyDate">30</div>
                              <div className="monthYear">
                                Jun
                                <br />
                                2019
                              </div>
                            </div>
                          </label>
                        </td>
                        <td>
                          <label>INBOUND</label>
                        </td>
                        <td>
                          <label />
                        </td>
                        <td>
                          <label>0</label>
                        </td>
                        <td>
                          <label />
                        </td>
                        <td>
                          <label>0</label>
                        </td>
                        <td className="actionlink">
                          <div className="actionCont">
                            <div className="input-group-addon">
                              <Link
                                data-toggle="tooltip"
                                data-original-title="Edit"
                                data-placement="top"
                                to="AccountsTaxsetupTaxConfigurationedit.html"
                              >
                                <i className="fa fa-pencil-square-o" />
                              </Link>
                            </div>
                            <div className="input-group-addon">
                              <Link
                                data-toggle="tooltip"
                                data-original-title="Delete"
                                data-placement="top"
                                to="tax.php?action=delete_tax_config&id=10"
                              >
                                <i className="fa fa-trash" />
                              </Link>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr role="row" className="odd">
                        <td>
                          <label>India</label>
                        </td>
                        <td>
                          <label />
                        </td>
                        <td>
                          <label
                            data-toggle="tooltip"
                            data-placement="top"
                            title
                            data-original-title
                          >
                            ....
                          </label>
                        </td>
                        <td>
                          <label>Hotel</label>
                        </td>
                        {/* <td>
              <label></label>
              </td> */}
                        <td>
                          <label>Registered</label>
                        </td>
                        <td>
                          <label>
                            <div className="dateWrapper">
                              <div className="onlyDate">12</div>
                              <div className="monthYear">
                                Jun
                                <br />
                                2019
                              </div>
                            </div>
                          </label>
                        </td>
                        <td>
                          <label>
                            <div className="dateWrapper">
                              <div className="onlyDate">30</div>
                              <div className="monthYear">
                                Jun
                                <br />
                                2019
                              </div>
                            </div>
                          </label>
                        </td>
                        <td>
                          <label>INBOUND</label>
                        </td>
                        <td>
                          <label />
                        </td>
                        <td>
                          <label>0</label>
                        </td>
                        <td>
                          <label />
                        </td>
                        <td>
                          <label>0</label>
                        </td>
                        <td className="actionlink">
                          <div className="actionCont">
                            <div className="input-group-addon">
                              <Link
                                data-toggle="tooltip"
                                data-original-title="Edit"
                                data-placement="top"
                                to="AccountsTaxsetupTaxConfigurationedit.html"
                              >
                                <i className="fa fa-pencil-square-o" />
                              </Link>
                            </div>
                            <div className="input-group-addon">
                              <Link
                                data-toggle="tooltip"
                                data-original-title="Delete"
                                data-placement="top"
                                to="tax.php?action=delete_tax_config&id=11"
                              >
                                <i className="fa fa-trash" />
                              </Link>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr role="row" className="even">
                        <td>
                          <label>India</label>
                        </td>
                        <td>
                          <label />
                        </td>
                        <td>
                          <label
                            data-toggle="tooltip"
                            data-placement="top"
                            title
                            data-original-title
                          >
                            ....
                          </label>
                        </td>
                        <td>
                          <label>Hotel</label>
                        </td>
                        {/* <td>
              <label></label>
              </td> */}
                        <td>
                          <label>Registered</label>
                        </td>
                        <td>
                          <label>
                            <div className="dateWrapper">
                              <div className="onlyDate">12</div>
                              <div className="monthYear">
                                Jun
                                <br />
                                2019
                              </div>
                            </div>
                          </label>
                        </td>
                        <td>
                          <label>
                            <div className="dateWrapper">
                              <div className="onlyDate">30</div>
                              <div className="monthYear">
                                Jun
                                <br />
                                2019
                              </div>
                            </div>
                          </label>
                        </td>
                        <td>
                          <label>INBOUND</label>
                        </td>
                        <td>
                          <label />
                        </td>
                        <td>
                          <label>0</label>
                        </td>
                        <td>
                          <label />
                        </td>
                        <td>
                          <label>0</label>
                        </td>
                        <td className="actionlink">
                          <div className="actionCont">
                            <div className="input-group-addon">
                              <Link
                                data-toggle="tooltip"
                                data-original-title="Edit"
                                data-placement="top"
                                to="AccountsTaxsetupTaxConfigurationedit.html"
                              >
                                <i className="fa fa-pencil-square-o" />
                              </Link>
                            </div>
                            <div className="input-group-addon">
                              <Link
                                data-toggle="tooltip"
                                data-original-title="Delete"
                                data-placement="top"
                                to="tax.php?action=delete_tax_config&id=12"
                              >
                                <i className="fa fa-trash" />
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
          </form>
        </div>
      </div>
    </>
  );
};
export default AccountsTaxSetupTaxConfigurationSearch;
