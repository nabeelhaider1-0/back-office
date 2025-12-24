import Header2 from "../header2/header2";
import Flatpickr from "react-flatpickr";
import React, { useState } from "react";
import MultiSelect from "../reactMultiSelect";
import {
  add_options,
  markupProfileOptions,
  report_management_Options,
  reports_nationalityOptions,
  selectedServiceOptions,
  suppliersPreset,
} from "../../constants/contants";

const ReportsManagementBookingBySupplierByStatus = () => {
  const [startDate, setStartDate] = useState(null); // State for the start date
  const [endDate, setEndDate] = useState(null); // State for the end date

  const handleTrashClick = () => {
    // Function to clear both start and end dates
    setStartDate(null);
    setEndDate(null);
  };

  const [startDate1, setStartDate1] = useState(null); // State for the start date
  const [endDate1, setEndDate1] = useState(null); // State for the end date

  const handleTrashClick1 = () => {
    // Function to clear both start and end dates
    setStartDate1(null);
    setEndDate1(null);
  };

  const [showBookingDate, setShowBookingDate] = useState(false);

  const toggleBookingDate = () => {
    setShowBookingDate(!showBookingDate);
  };

  const [showServiceDate, setShowserviceDate] = useState(false);

  const toggleServiceDate = () => {
    setShowserviceDate(!showServiceDate);
  };
  const [isFormVisible, setFormVisibility] = useState(false);

  const toggleFormVisibility = () => {
    setFormVisibility(!isFormVisible);
  };

  return (
    <>
      <Header2 title="BOOKING STATUS BY SUPPLIER" />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <div>
          <form>
            <div className="panel-body">
              <div className="row">
                <div className="form-group col-md-3">
                  <label>Branch</label>
                  <MultiSelect
                    options={add_options}
                    isSearchable
                    placeholder=" All Branches "
                    className="custom-select"
                    noOptionsMessage={() => "No Branch Found"}
                  />
                </div>
                <div className="form-group col-md-3">
                  <label>Services</label>
                  <MultiSelect
                    options={selectedServiceOptions}
                    isSearchable
                    placeholder="- All -"
                    className="custom-select"
                    noOptionsMessage={() => "No Services Found"}
                  />
                </div>
                <div className="form-group col-md-3">
                  <label>Suppliers</label>
                  <MultiSelect
                    options={suppliersPreset}
                    isSearchable
                    placeholder="- All -"
                    className="custom-select"
                    noOptionsMessage={() => "No Suppliers Found"}
                  />
                </div>
                <div className="form-group col-md-3">
                  <label>Status</label>
                  <MultiSelect
                    options={report_management_Options}
                    isSearchable
                    placeholder=" Status "
                    className="custom-select"
                    noOptionsMessage={() => "No Status Found"}
                  />
                </div>
                <div className="form-group col-md-4 mt-2">
                  <label>Supplier Profiles</label>
                  <MultiSelect
                    options={markupProfileOptions}
                    isSearchable
                    placeholder="- All -"
                    className="custom-select"
                    noOptionsMessage={() => "No Profiles Found"}
                  />
                </div>
                <div className="form-group col-md-4 mt-2">
                  <label>Nationality</label>
                  <MultiSelect
                    options={reports_nationalityOptions}
                    isSearchable
                    placeholder="- All -"
                    className="custom-select"
                    noOptionsMessage={() => "No Nationality Found"}
                  />
                </div>

                <div className="form-group col-md-4 mt-2">
                  <div className="checkbox checkbox-success">
                    <input
                      type="checkbox"
                      defaultValue={1}
                      name="chk_booking_date"
                      id="chk_booking_date"
                      onChange={toggleBookingDate}
                    />
                    <label htmlFor="chk_booking_date">Booking Date</label>
                  </div>
                  <div
                    name="booking_date"
                    id="booking_date"
                    style={{ display: showBookingDate ? "block" : "none" }}
                  >
                    <div
                      className="input-daterange input-group date"
                      id="datetimepicker6"
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
                        className="input-group-addon"
                        onClick={handleTrashClick}
                      >
                        <i className="fa fa-trash" />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="form-group col-md-4 mt-2">
                  <div
                    className="checkbox checkbox-success"
                    style={{ display: "inline-block" }}
                  >
                    <input
                      type="checkbox"
                      defaultValue={1}
                      name="chk_service_date"
                      id="chk_service_date"
                      onChange={toggleServiceDate}
                    />
                    <label htmlFor="chk_service_date">Service Date</label>
                  </div>
                  <div
                    name="service_date"
                    id="service_date"
                    style={{ display: showServiceDate ? "block" : "none" }}
                  >
                    <div
                      className="input-daterange input-group date"
                      id="datetimepicker7"
                    >
                      <Flatpickr
                        value={startDate1}
                        onChange={(date) => setStartDate1(date)}
                        options={{ dateFormat: "Y-m-d" }}
                        style={{ width: "131px" }}
                      />

                      <span class="input-group-addon">to</span>
                      <Flatpickr
                        value={endDate1}
                        onChange={(date) => setEndDate1(date)}
                        options={{ dateFormat: "Y-m-d" }}
                        style={{ width: "131px" }}
                      />
                      <span
                        className="input-group-addon"
                        onClick={handleTrashClick1}
                      >
                        <i className="fa fa-trash" />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="form-group col-md-12">
                    <div className="col-md-2 ">
                      <button
                        type="button"
                        name="sbt1"
                        className="btn btn-dark btn-sm"
                        value="View Report"
                        onClick={toggleFormVisibility}
                      >
                        <i className="fa fa-eye" />
                        &nbsp;&nbsp;View Report
                      </button>
                    </div>
                    <div id="mesID" style={{ display: "none" }} />
                  </div>
                </div>
              </div>
            </div>
          </form>
          <br />
          <form
            id="hideornot"
            style={{ display: isFormVisible ? "block" : "none" }}
          >
            <div className="panel-body removeMargins">
              <div className="dataTables_scroll">
                <div className="row">
                  <div className="col-md-12">
                    <div
                      valign="top"
                      onclick="callAjaxSubmit(2,'');"
                      title="Click to download XL sheet "
                      className="btn btn-dark btn-sm form-group"
                      style={{ marginBottom: "-42px" }}
                    >
                      <i className="fa fa-download" />
                      &nbsp;Download Excel
                    </div>
                  </div>
                </div>
                <div
                  id="search_transfer_wrapper"
                  className="dataTables_wrapper form-inline dt-bootstrap no-footer"
                >
                  <div className="row">
                    <div className="col-sm-10" />
                    <div className="col-sm-2">
                      <div
                        id="search_transfer_filter"
                        className="dataTables_filter"
                      >
                        {" "}
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
                      <div id="wrapper2" style={{ overflow: "auto" }}>
                        <table
                          id="search_sup"
                          className="table table-bordered   table-responsive alignTbl dataTable no-footer"
                          role="grid"
                          aria-describedby="search_sup_info"
                        >
                          <thead>
                            <tr role="row">
                              <th
                                className="sorting_disabled"
                                rowSpan={1}
                                colSpan={1}
                                style={{ width: "223.2px" }}
                              >
                                &nbsp;Supplier
                              </th>
                              <th
                                className="numAlign sorting_disabled"
                                rowSpan={1}
                                colSpan={1}
                                style={{ width: "119.2px" }}
                              >
                                &nbsp;On Request
                              </th>
                              <th
                                className="numAlign sorting_disabled"
                                rowSpan={1}
                                colSpan={1}
                                style={{ width: "112.2px" }}
                              >
                                &nbsp;Confirmed
                              </th>
                              <th
                                className="numAlign sorting_disabled"
                                rowSpan={1}
                                colSpan={1}
                                style={{ width: "115.2px" }}
                              >
                                &nbsp;Vouchered
                              </th>
                              <th
                                className="numAlign sorting_disabled"
                                rowSpan={1}
                                colSpan={1}
                                style={{ width: "110.2px" }}
                              >
                                &nbsp;Cancelled
                              </th>
                              <th
                                className="numAlign sorting_disabled"
                                rowSpan={1}
                                colSpan={1}
                                style={{ width: "183.2px" }}
                              >
                                &nbsp;In Process Cancel
                              </th>
                              <th
                                className="numAlign sorting_disabled"
                                rowSpan={1}
                                colSpan={1}
                                style={{ width: "193.2px" }}
                              >
                                &nbsp;In Process Booking
                              </th>
                              <th
                                className="numAlign sorting_disabled"
                                rowSpan={1}
                                colSpan={1}
                                style={{ width: "71.2px" }}
                              >
                                &nbsp;Failed
                              </th>
                              <th
                                className="numAlign sorting_disabled"
                                rowSpan={1}
                                colSpan={1}
                                style={{ width: "98.2px" }}
                              >
                                &nbsp;Rejected
                              </th>
                              <th
                                className="numAlign sorting_disabled"
                                rowSpan={1}
                                colSpan={1}
                                style={{ width: "83px" }}
                              >
                                &nbsp;Total
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white">
                            {/*div class="text-danger">No suppliers found in the system.</div*/}
                            {/*tr><td colspan='7'>&nbsp;<td></tr*/}
                            <tr className="phps_row_1 odd" role="row">
                              {/*td>&nbsp;1</td*/}
                              <td>&nbsp;&nbsp;&nbsp;00</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;1</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;1</td>
                            </tr>
                            <tr className="phps_row_0 even" role="row">
                              {/*td>&nbsp;2</td*/}
                              <td>&nbsp;&nbsp;&nbsp;agoda</td>
                              <td className="numAlign">&nbsp;20</td>
                              <td className="numAlign">&nbsp;55</td>
                              <td className="numAlign">&nbsp;345</td>
                              <td className="numAlign">&nbsp;23</td>
                              <td className="numAlign">&nbsp;26</td>
                              <td className="numAlign">&nbsp;28</td>
                              <td className="numAlign">&nbsp;131</td>
                              <td className="numAlign">&nbsp;1</td>
                              <td className="numAlign">&nbsp;601</td>
                            </tr>
                            <tr className="phps_row_1 odd" role="row">
                              {/*td>&nbsp;3</td*/}
                              <td>&nbsp;&nbsp;&nbsp;amadeus</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;47</td>
                              <td className="numAlign">&nbsp;31</td>
                              <td className="numAlign">&nbsp;8</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;25</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;111</td>
                            </tr>
                            <tr className="phps_row_0 even" role="row">
                              {/*td>&nbsp;4</td*/}
                              <td>&nbsp;&nbsp;&nbsp;dhisco_rotana</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;74</td>
                              <td className="numAlign">&nbsp;64</td>
                              <td className="numAlign">&nbsp;2</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;20</td>
                              <td className="numAlign">&nbsp;36</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;176</td>
                            </tr>
                            <tr className="phps_row_1 odd" role="row">
                              {/*td>&nbsp;5</td*/}
                              <td>&nbsp;&nbsp;&nbsp;dotw</td>
                              <td className="numAlign">&nbsp;3</td>
                              <td className="numAlign">&nbsp;159</td>
                              <td className="numAlign">&nbsp;108</td>
                              <td className="numAlign">&nbsp;17</td>
                              <td className="numAlign">&nbsp;12</td>
                              <td className="numAlign">&nbsp;1</td>
                              <td className="numAlign">&nbsp;53</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;352</td>
                            </tr>
                            <tr className="phps_row_0 even" role="row">
                              {/*td>&nbsp;6</td*/}
                              <td>&nbsp;&nbsp;&nbsp;egyptexpress</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;30</td>
                              <td className="numAlign">&nbsp;1</td>
                              <td className="numAlign">&nbsp;3</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;1</td>
                              <td className="numAlign">&nbsp;6</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;40</td>
                            </tr>
                            <tr className="phps_row_1 odd" role="row">
                              {/*td>&nbsp;7</td*/}
                              <td>&nbsp;&nbsp;&nbsp;expedia</td>
                              <td className="numAlign">&nbsp;61</td>
                              <td className="numAlign">&nbsp;20</td>
                              <td className="numAlign">&nbsp;5</td>
                              <td className="numAlign">&nbsp;7</td>
                              <td className="numAlign">&nbsp;1</td>
                              <td className="numAlign">&nbsp;30</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;94</td>
                            </tr>
                            <tr className="phps_row_0 even" role="row">
                              {/*td>&nbsp;8</td*/}
                              <td>&nbsp;&nbsp;&nbsp;expediapackage</td>
                              <td className="numAlign">&nbsp;3</td>
                              <td className="numAlign">&nbsp;7</td>
                              <td className="numAlign">&nbsp;3</td>
                              <td className="numAlign">&nbsp;4</td>
                              <td className="numAlign">&nbsp;1</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;18</td>
                            </tr>
                            <tr className="phps_row_1 odd" role="row">
                              {/*td>&nbsp;9</td*/}
                              <td>&nbsp;&nbsp;&nbsp;groups</td>
                              <td className="numAlign">&nbsp;45</td>
                              <td className="numAlign">&nbsp;2</td>
                              <td className="numAlign">&nbsp;14</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;61</td>
                            </tr>
                            <tr className="phps_row_0 even" role="row">
                              {/*td>&nbsp;10</td*/}
                              <td>&nbsp;&nbsp;&nbsp;hbsight</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;20</td>
                              <td className="numAlign">&nbsp;33</td>
                              <td className="numAlign">&nbsp;3</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;14</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;70</td>
                            </tr>
                            <tr className="phps_row_1 odd" role="row">
                              {/*td>&nbsp;11</td*/}
                              <td>&nbsp;&nbsp;&nbsp;hotelbeds</td>
                              <td className="numAlign">&nbsp;1</td>
                              <td className="numAlign">&nbsp;41</td>
                              <td className="numAlign">&nbsp;512</td>
                              <td className="numAlign">&nbsp;91</td>
                              <td className="numAlign">&nbsp;9</td>
                              <td className="numAlign">&nbsp;2</td>
                              <td className="numAlign">&nbsp;204</td>
                              <td className="numAlign">&nbsp;2</td>
                              <td className="numAlign">&nbsp;860</td>
                            </tr>
                            <tr className="phps_row_0 even" role="row">
                              {/*td>&nbsp;12</td*/}
                              <td>&nbsp;&nbsp;&nbsp;hotelbedstransfer</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;77</td>
                              <td className="numAlign">&nbsp;41</td>
                              <td className="numAlign">&nbsp;22</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;50</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;190</td>
                            </tr>
                            <tr className="phps_row_1 odd" role="row">
                              {/*td>&nbsp;13</td*/}
                              <td>&nbsp;&nbsp;&nbsp;localflight</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;4</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;4</td>
                            </tr>
                            <tr className="phps_row_0 even" role="row">
                              {/*td>&nbsp;14</td*/}
                              <td>&nbsp;&nbsp;&nbsp;localsightseeing</td>
                              <td className="numAlign">&nbsp;2</td>
                              <td className="numAlign">&nbsp;2744</td>
                              <td className="numAlign">&nbsp;1619</td>
                              <td className="numAlign">&nbsp;375</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;3</td>
                              <td className="numAlign">&nbsp;4743</td>
                            </tr>
                            <tr className="phps_row_1 odd" role="row">
                              {/*td>&nbsp;15</td*/}
                              <td>&nbsp;&nbsp;&nbsp;localsystem</td>
                              <td className="numAlign">&nbsp;18</td>
                              <td className="numAlign">&nbsp;5415</td>
                              <td className="numAlign">&nbsp;3066</td>
                              <td className="numAlign">&nbsp;946</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;6</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;1</td>
                              <td className="numAlign">&nbsp;9446</td>
                            </tr>
                            <tr className="phps_row_0 even" role="row">
                              {/*td>&nbsp;16</td*/}
                              <td>&nbsp;&nbsp;&nbsp;localtransfer</td>
                              <td className="numAlign">&nbsp;45</td>
                              <td className="numAlign">&nbsp;3246</td>
                              <td className="numAlign">&nbsp;1935</td>
                              <td className="numAlign">&nbsp;379</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;4</td>
                              <td className="numAlign">&nbsp;5609</td>
                            </tr>
                            <tr className="phps_row_1 odd" role="row">
                              {/*td>&nbsp;17</td*/}
                              <td>&nbsp;&nbsp;&nbsp;miki</td>
                              <td className="numAlign">&nbsp;3</td>
                              <td className="numAlign">&nbsp;13</td>
                              <td className="numAlign">&nbsp;1</td>
                              <td className="numAlign">&nbsp;1</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;1</td>
                              <td className="numAlign">&nbsp;2</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;20</td>
                            </tr>
                            <tr className="phps_row_0 even" role="row">
                              {/*td>&nbsp;18</td*/}
                              <td>&nbsp;&nbsp;&nbsp;misc</td>
                              <td className="numAlign">&nbsp;2</td>
                              <td className="numAlign">&nbsp;8</td>
                              <td className="numAlign">&nbsp;10</td>
                              <td className="numAlign">&nbsp;2</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;22</td>
                            </tr>
                            <tr className="phps_row_1 odd" role="row">
                              {/*td>&nbsp;19</td*/}
                              <td>&nbsp;&nbsp;&nbsp;redapple</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;11</td>
                              <td className="numAlign">&nbsp;9</td>
                              <td className="numAlign">&nbsp;6</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;26</td>
                            </tr>
                            <tr className="phps_row_0 even" role="row">
                              {/*td>&nbsp;20</td*/}
                              <td>&nbsp;&nbsp;&nbsp;restel</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;1</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;19</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;2</td>
                              <td className="numAlign">&nbsp;3</td>
                            </tr>
                            <tr className="phps_row_1 odd" role="row">
                              {/*td>&nbsp;21</td*/}
                              <td>&nbsp;&nbsp;&nbsp;sabre</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;40</td>
                              <td className="numAlign">&nbsp;223</td>
                              <td className="numAlign">&nbsp;213</td>
                              <td className="numAlign">&nbsp;210</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;178</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;864</td>
                            </tr>
                            <tr className="phps_row_0 even" role="row">
                              {/*td>&nbsp;22</td*/}
                              <td>&nbsp;&nbsp;&nbsp;tboholidays</td>
                              <td className="numAlign">&nbsp;4</td>
                              <td className="numAlign">&nbsp;14</td>
                              <td className="numAlign">&nbsp;16</td>
                              <td className="numAlign">&nbsp;5</td>
                              <td className="numAlign">&nbsp;12</td>
                              <td className="numAlign">&nbsp;2</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;4</td>
                              <td className="numAlign">&nbsp;55</td>
                            </tr>
                            <tr className="phps_row_1 odd" role="row">
                              {/*td>&nbsp;23</td*/}
                              <td>&nbsp;&nbsp;&nbsp;travco</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;1</td>
                              <td className="numAlign">&nbsp;3</td>
                              <td className="numAlign">&nbsp;5</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;9</td>
                            </tr>
                            <tr className="phps_row_0 even" role="row">
                              {/*td>&nbsp;24</td*/}
                              <td>&nbsp;&nbsp;&nbsp;visa</td>
                              <td className="numAlign">&nbsp;49</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;238</td>
                              <td className="numAlign">&nbsp;107</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;394</td>
                            </tr>
                            <tr className="phps_row_1 odd" role="row">
                              {/*td>&nbsp;25</td*/}
                              <td>&nbsp;&nbsp;&nbsp;whitesands</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;2</td>
                              <td className="numAlign">&nbsp;1</td>
                              <td className="numAlign">&nbsp;1</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;2</td>
                              <td className="numAlign">&nbsp;9</td>
                              <td className="numAlign">&nbsp;0</td>
                              <td className="numAlign">&nbsp;13</td>
                            </tr>
                            <tr
                              className="phps_row_0 even"
                              role="row"
                              style={{ backgroundColor: "#a09d9d" }}
                            >
                              {/*td>&nbsp;</td*/}
                              <td
                                style={{
                                  color: "white",
                                  fontSize: "12px",
                                  fontWeight: 500,
                                }}
                              >
                                &nbsp;
                              </td>
                              <td
                                style={{
                                  color: "white",
                                  fontSize: "12px",
                                  fontWeight: 500,
                                }}
                                className="numAlign"
                              >
                                &nbsp;256
                              </td>
                              <td
                                style={{
                                  color: "white",
                                  fontSize: "12px",
                                  fontWeight: 500,
                                }}
                                className="numAlign"
                              >
                                &nbsp;12027
                              </td>
                              <td
                                style={{
                                  color: "white",
                                  fontSize: "12px",
                                  fontWeight: 500,
                                }}
                                className="numAlign"
                              >
                                &nbsp;8283
                              </td>
                              <td
                                style={{
                                  color: "white",
                                  fontSize: "12px",
                                  fontWeight: 500,
                                }}
                                className="numAlign"
                              >
                                &nbsp;2220
                              </td>
                              <td
                                style={{
                                  color: "white",
                                  fontSize: "12px",
                                  fontWeight: 500,
                                }}
                                className="numAlign"
                              >
                                &nbsp;271
                              </td>
                              <td
                                style={{
                                  color: "white",
                                  fontSize: "12px",
                                  fontWeight: 500,
                                }}
                                className="numAlign"
                              >
                                &nbsp;112
                              </td>
                              <td
                                style={{
                                  color: "white",
                                  fontSize: "12px",
                                  fontWeight: 500,
                                }}
                                className="numAlign"
                              >
                                &nbsp;708
                              </td>
                              <td
                                style={{
                                  color: "white",
                                  fontSize: "12px",
                                  fontWeight: 500,
                                }}
                                className="numAlign"
                              >
                                &nbsp;17
                              </td>
                              <td
                                style={{
                                  color: "white",
                                  fontSize: "12px",
                                  fontWeight: 500,
                                }}
                                className="numAlign"
                              >
                                &nbsp;23782
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <br />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default ReportsManagementBookingBySupplierByStatus;
