import Header2 from "../header2/header2";
import Flatpickr from "react-flatpickr";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import MultiSelect from "../reactMultiSelect";
import { citiesByCountry, countries } from "../../constants/Country-City-Data";

const ReportsMappingDestination = () => {
  const [startDate, setStartDate] = useState(null); // State for the start date
  const [endDate, setEndDate] = useState(null); // State for the end date

  const handleTrashClick = () => {
    // Function to clear both start and end dates
    setStartDate(null);
    setEndDate(null);
  };

  const wrapper1Ref = useRef(null);
  const wrapper2Ref = useRef(null);

  useEffect(() => {
    const wrapper1 = wrapper1Ref.current;
    const wrapper2 = wrapper2Ref.current;

    const handleWrapper1Scroll = () => {
      wrapper2.scrollLeft = wrapper1.scrollLeft;
    };

    const handleWrapper2Scroll = () => {
      wrapper1.scrollLeft = wrapper2.scrollLeft;
    };

    if (wrapper1 && wrapper2) {
      wrapper1.addEventListener("scroll", handleWrapper1Scroll);
      wrapper2.addEventListener("scroll", handleWrapper2Scroll);
    }
    // Cleanup event listeners when component unmounts
    return () => {
      if (wrapper1 && wrapper2) {
        wrapper1.removeEventListener("scroll", handleWrapper1Scroll);
        wrapper2.removeEventListener("scroll", handleWrapper2Scroll);
      }
    };
  }, []);

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
      <Header2 title="SUPPLIER DESTINATION REPORT" />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <div>
          <form>
            <div className="row">
              <div className="form-group col-md-3">
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
              <div className="form-group col-md-3">
                <label>City</label>
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
              <div className="form-group col-md-3">
                <label id="date_range_1">Date</label>
                <div
                  id="datetimepicker9"
                  className="input-daterange input-group date col-md-12 col-sm-12 col-xs-12"
                >
                  <Flatpickr
                    value={startDate}
                    onChange={(date) => setStartDate(date)}
                    options={{ dateFormat: "Y-m-d" }}
                    style={{ width: "131px" }}
                  />

                  <span class="input-group-addon">to</span>
                  <Flatpickr
                    value={endDate}
                    onChange={(date) => setEndDate(date)}
                    options={{ dateFormat: "Y-m-d" }}
                    style={{ width: "131px" }}
                  />
                  <span
                    onclick="clear1('datepicker1_2')"
                    title="clear"
                    alt="clear"
                    className="input-group-addon"
                    onClick={handleTrashClick}
                  >
                    <i className="fa fa-trash" />
                  </span>
                </div>
              </div>
              <div className="form-group col-md-12">
                <br />
                {/*input type="button" value="Submit" id="submit_button" onclick="javaScript: submit_form(document.forms['rec_frm']);"*/}
                <button
                  type="button"
                  className="btn btn-dark btn-sm"
                  id="submit_button"
                  name="b1"
                >
                  <i className="fa fa-search" />
                  &nbsp;Search
                </button>
                &nbsp;
                {/*input type="reset" value="Reset" onclick="javaScript:document.forms['rec_frm'].reset();"*/}
                <button type="reset" className="btn btn-dark btn-sm resetMe">
                  <i className="fa fa-repeat" />
                  &nbsp;Reset
                </button>
              </div>
            </div>
            <br />
            {/*2nd Row*/}
          </form>
          <br />
          <form>
            {/*5th Row*/}
            <div className="row">
              <div className="col-md-2 form-group" />
              <div className="col-md-2 form-group" />
              <div className="col-md-5 form-group">
                {/*Pagination panel*/}
                <nav aria-label="Page navigation example">
                  <ul className="pagination pagination-sm justify-content-center mt-4">
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
                      <Link className="page-link" to="#">
                        5
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link className="page-link" to="#">
                        6
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link className="page-link" to="#">
                        7
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link className="page-link" to="#">
                        8
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link className="page-link" to="#">
                        9
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link className="page-link" to="#">
                        10
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
              <div className="col-md-3 form-group mt-3">
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
            {/* Table Creation */}
            <div
              id="search_sup_wrapper"
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
                    ref={wrapper1Ref}
                    style={{ height: "20px", overflow: "scroll hidden" }}
                  >
                    <div
                      className="suwala-doubleScroll-scroll"
                      style={{ height: "20px", width: "2590px" }}
                    />
                  </div>
                  <div
                    id="wrapper2"
                    ref={wrapper2Ref}
                    style={{ overflow: "auto" }}
                  >
                    <table
                      id="search_sup"
                      className="table  dataTable  table-responsive alignTbl no-footer table-bordered"
                      role="grid"
                      aria-describedby="search_sup_info"
                      style={{ width: "2590px" }}
                    >
                      <thead>
                        {/*tr><td colspan='7'>&nbsp;<td></tr*/}
                        <tr role="row">
                          <th
                            className="sorting"
                            tabIndex={0}
                            aria-controls="search_sup"
                            rowSpan={1}
                            colSpan={1}
                            aria-label="&nbsp;City Name: activate to sort column ascending"
                            style={{ width: "92.8889px" }}
                          >
                            &nbsp;City Name
                          </th>
                          <th
                            className="sorting"
                            tabIndex={0}
                            aria-controls="search_sup"
                            rowSpan={1}
                            colSpan={1}
                            aria-label="&nbsp;Country Name: activate to sort column ascending"
                            style={{ width: "79.8889px" }}
                          >
                            &nbsp;Country Name
                          </th>
                          <th
                            className="numAlign sorting"
                            tabIndex={0}
                            aria-controls="search_sup"
                            rowSpan={1}
                            colSpan={1}
                            aria-label="&nbsp;City Search Count: activate to sort column ascending"
                            style={{ width: "101.889px" }}
                          >
                            &nbsp;City Search Count
                          </th>
                          <th
                            className="sorting"
                            tabIndex={0}
                            aria-controls="search_sup"
                            rowSpan={1}
                            colSpan={1}
                            aria-label="&nbsp;City Code: activate to sort column ascending"
                            style={{ width: "59.8889px" }}
                          >
                            &nbsp;City Code
                          </th>
                          <th
                            className="sorting"
                            tabIndex={0}
                            aria-controls="search_sup"
                            rowSpan={1}
                            colSpan={1}
                            aria-label="&nbsp;Agoda Code: activate to sort column ascending"
                            style={{ width: "64.8889px" }}
                          >
                            &nbsp;Agoda Code
                          </th>
                          <th
                            className="sorting"
                            tabIndex={0}
                            aria-controls="search_sup"
                            rowSpan={1}
                            colSpan={1}
                            aria-label="&nbsp;Amadeus Code: activate to sort column ascending"
                            style={{ width: "78.8889px" }}
                          >
                            &nbsp;Amadeus Code
                          </th>
                          <th
                            className="sorting"
                            tabIndex={0}
                            aria-controls="search_sup"
                            rowSpan={1}
                            colSpan={1}
                            aria-label="&nbsp;Localflight Code: activate to sort column ascending"
                            style={{ width: "95.8889px" }}
                          >
                            &nbsp;Localflight Code
                          </th>
                          <th
                            className="sorting"
                            tabIndex={0}
                            aria-controls="search_sup"
                            rowSpan={1}
                            colSpan={1}
                            aria-label="&nbsp;Dhisco Code: activate to sort column ascending"
                            style={{ width: "67.8889px" }}
                          >
                            &nbsp;Dhisco Code
                          </th>
                          <th
                            className="sorting"
                            tabIndex={0}
                            aria-controls="search_sup"
                            rowSpan={1}
                            colSpan={1}
                            aria-label="&nbsp;Dotw Code: activate to sort column ascending"
                            style={{ width: "59.8889px" }}
                          >
                            &nbsp;Dotw Code
                          </th>
                          <th
                            className="sorting"
                            tabIndex={0}
                            aria-controls="search_sup"
                            rowSpan={1}
                            colSpan={1}
                            aria-label="&nbsp;Expedia Code: activate to sort column ascending"
                            style={{ width: "72.8889px" }}
                          >
                            &nbsp;Expedia Code
                          </th>
                          <th
                            className="sorting"
                            tabIndex={0}
                            aria-controls="search_sup"
                            rowSpan={1}
                            colSpan={1}
                            aria-label="&nbsp;Group Code: activate to sort column ascending"
                            style={{ width: "64.8889px" }}
                          >
                            &nbsp;Group Code
                          </th>
                          <th
                            className="sorting"
                            tabIndex={0}
                            aria-controls="search_sup"
                            rowSpan={1}
                            colSpan={1}
                            aria-label="&nbsp;Hotelbeds Code: activate to sort column ascending"
                            style={{ width: "87.8889px" }}
                          >
                            &nbsp;Hotelbeds Code
                          </th>
                          <th
                            className="sorting"
                            tabIndex={0}
                            aria-controls="search_sup"
                            rowSpan={1}
                            colSpan={1}
                            aria-label="&nbsp;Hbsight Code: activate to sort column ascending"
                            style={{ width: "74.8889px" }}
                          >
                            &nbsp;Hbsight Code
                          </th>
                          <th
                            className="sorting"
                            tabIndex={0}
                            aria-controls="search_sup"
                            rowSpan={1}
                            colSpan={1}
                            aria-label="&nbsp;Hotelbedstransfer Code: activate to sort column ascending"
                            style={{ width: "139.889px" }}
                          >
                            &nbsp;Hotelbedstransfer Code
                          </th>
                          <th
                            className="sorting"
                            tabIndex={0}
                            aria-controls="search_sup"
                            rowSpan={1}
                            colSpan={1}
                            aria-label="&nbsp;Miki Code: activate to sort column ascending"
                            style={{ width: "51.8889px" }}
                          >
                            &nbsp;Miki Code
                          </th>
                          <th
                            className="sorting"
                            tabIndex={0}
                            aria-controls="search_sup"
                            rowSpan={1}
                            colSpan={1}
                            aria-label="&nbsp;Package Supplier Code: activate to sort column ascending"
                            style={{ width: "125.889px" }}
                          >
                            &nbsp;Package Supplier Code
                          </th>
                          <th
                            className="sorting"
                            tabIndex={0}
                            aria-controls="search_sup"
                            rowSpan={1}
                            colSpan={1}
                            aria-label="&nbsp;Mystifly Code: activate to sort column ascending"
                            style={{ width: "77.8889px" }}
                          >
                            &nbsp;Mystifly Code
                          </th>
                          <th
                            className="sorting"
                            tabIndex={0}
                            aria-controls="search_sup"
                            rowSpan={1}
                            colSpan={1}
                            aria-label="&nbsp;Redapple Code: activate to sort column ascending"
                            style={{ width: "81.8889px" }}
                          >
                            &nbsp;Redapple Code
                          </th>
                          <th
                            className="sorting"
                            tabIndex={0}
                            aria-controls="search_sup"
                            rowSpan={1}
                            colSpan={1}
                            aria-label="&nbsp;Restel Code: activate to sort column ascending"
                            style={{ width: "67.8889px" }}
                          >
                            &nbsp;Restel Code
                          </th>
                          <th
                            className="sorting"
                            tabIndex={0}
                            aria-controls="search_sup"
                            rowSpan={1}
                            colSpan={1}
                            aria-label="&nbsp;Sabre Code: activate to sort column ascending"
                            style={{ width: "63.8889px" }}
                          >
                            &nbsp;Sabre Code
                          </th>
                          <th
                            className="sorting"
                            tabIndex={0}
                            aria-controls="search_sup"
                            rowSpan={1}
                            colSpan={1}
                            aria-label="&nbsp;Snehal Code: activate to sort column ascending"
                            style={{ width: "69.8889px" }}
                          >
                            &nbsp;Snehal Code
                          </th>
                          <th
                            className="sorting"
                            tabIndex={0}
                            aria-controls="search_sup"
                            rowSpan={1}
                            colSpan={1}
                            aria-label="&nbsp;Tboholidays Code: activate to sort column ascending"
                            style={{ width: "98.8889px" }}
                          >
                            &nbsp;Tboholidays Code
                          </th>
                          <th
                            className="sorting"
                            tabIndex={0}
                            aria-controls="search_sup"
                            rowSpan={1}
                            colSpan={1}
                            aria-label="&nbsp;Travco Code: activate to sort column ascending"
                            style={{ width: "69.8889px" }}
                          >
                            &nbsp;Travco Code
                          </th>
                          <th
                            className="sorting"
                            tabIndex={0}
                            aria-controls="search_sup"
                            rowSpan={1}
                            colSpan={1}
                            aria-label="&nbsp;Whitesands Code: activate to sort column ascending"
                            style={{ width: "96px" }}
                          >
                            &nbsp;Whitesands Code
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        <tr className="phps_row_0 odd" role="row">
                          <td>Dubai</td>
                          <td>United Arab Emirates</td>
                          <td className="numAlign">686</td>
                          <td>71649</td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                        </tr>
                        <tr className="phps_row_1 even" role="row">
                          <td>Abu dhabi</td>
                          <td>United Arab Emirates</td>
                          <td className="numAlign">7</td>
                          <td>71650</td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                        </tr>
                        <tr className="phps_row_0 odd" role="row">
                          <td>Venice</td>
                          <td>Italy</td>
                          <td className="numAlign">4</td>
                          <td>54177</td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                        </tr>
                        <tr className="phps_row_1 even" role="row">
                          <td>Doha</td>
                          <td>Qatar</td>
                          <td className="numAlign">2</td>
                          <td>70884</td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                        </tr>
                        <tr className="phps_row_0 odd" role="row">
                          <td>Dammam</td>
                          <td>Saudi Arabia</td>
                          <td className="numAlign">1</td>
                          <td>129_84_4142</td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                        </tr>
                        <tr className="phps_row_1 even" role="row">
                          <td>Abbeville(al)</td>
                          <td>United States</td>
                          <td className="numAlign">—</td>
                          <td>1</td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                        </tr>
                        <tr className="phps_row_0 odd" role="row">
                          <td>Alabaster(al)</td>
                          <td>United States</td>
                          <td className="numAlign">—</td>
                          <td>8</td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                        </tr>
                        <tr className="phps_row_1 even" role="row">
                          <td>Alexander city(al)</td>
                          <td>United States</td>
                          <td className="numAlign">—</td>
                          <td>12</td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                        </tr>
                        <tr className="phps_row_0 odd" role="row">
                          <td>Andalusia(al)</td>
                          <td>United States</td>
                          <td className="numAlign">—</td>
                          <td>19</td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                        </tr>
                        <tr className="phps_row_1 even" role="row">
                          <td>Athens(al)</td>
                          <td>United States</td>
                          <td className="numAlign">—</td>
                          <td>38</td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                        </tr>
                        <tr className="phps_row_0 odd" role="row">
                          <td>Atmore(al)</td>
                          <td>United States</td>
                          <td className="numAlign">—</td>
                          <td>39</td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                        </tr>
                        <tr className="phps_row_1 even" role="row">
                          <td>Auburn(al)</td>
                          <td>United States</td>
                          <td className="numAlign">—</td>
                          <td>41</td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                        </tr>
                        <tr className="phps_row_0 odd" role="row">
                          <td>Bessemer(al)</td>
                          <td>United States</td>
                          <td className="numAlign">—</td>
                          <td>82</td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                        </tr>
                        <tr className="phps_row_1 even" role="row">
                          <td>Birmingham(al)</td>
                          <td>United States</td>
                          <td className="numAlign">—</td>
                          <td>89</td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                        </tr>
                        <tr className="phps_row_0 odd" role="row">
                          <td>Brewton(al)</td>
                          <td>United States</td>
                          <td className="numAlign">—</td>
                          <td>114</td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                        </tr>
                        <tr className="phps_row_1 even" role="row">
                          <td>Calera(al)</td>
                          <td>United States</td>
                          <td className="numAlign">—</td>
                          <td>137</td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                        </tr>
                        <tr className="phps_row_0 odd" role="row">
                          <td>Centre(al)</td>
                          <td>United States</td>
                          <td className="numAlign">—</td>
                          <td>161</td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                        </tr>
                        <tr className="phps_row_1 even" role="row">
                          <td>Childersburg(al)</td>
                          <td>United States</td>
                          <td className="numAlign">—</td>
                          <td>175</td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                        </tr>
                        <tr className="phps_row_0 odd" role="row">
                          <td>Clanton(al)</td>
                          <td>United States</td>
                          <td className="numAlign">—</td>
                          <td>184</td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                        </tr>
                        <tr className="phps_row_1 even" role="row">
                          <td>Cullman(al)</td>
                          <td>United States</td>
                          <td className="numAlign">—</td>
                          <td>226</td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                        </tr>
                        <tr className="phps_row_0 odd" role="row">
                          <td>Daphne(al)</td>
                          <td>United States</td>
                          <td className="numAlign">—</td>
                          <td>238</td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                        </tr>
                        <tr className="phps_row_1 even" role="row">
                          <td>Decatur(al)</td>
                          <td>United States</td>
                          <td className="numAlign">—</td>
                          <td>247</td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                        </tr>
                        <tr className="phps_row_0 odd" role="row">
                          <td>Demopolis(al)</td>
                          <td>United States</td>
                          <td className="numAlign">—</td>
                          <td>251</td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                        </tr>
                        <tr className="phps_row_1 even" role="row">
                          <td>Dothan(al)</td>
                          <td>United States</td>
                          <td className="numAlign">—</td>
                          <td>261</td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                        </tr>
                        <tr className="phps_row_0 odd" role="row">
                          <td>Enterprise(al)</td>
                          <td>United States</td>
                          <td className="numAlign">—</td>
                          <td>291</td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
                          </td>
                          <td>
                            - &nbsp;
                            <b>/</b>&nbsp; -
                            {/* 												&mdash;
                             */}
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
                    id="search_sup_info"
                    role="status"
                    aria-live="polite"
                  />
                </div>
                <div className="col-sm-6" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default ReportsMappingDestination;
