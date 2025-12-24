import Flatpickr from "react-flatpickr";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header2 from "../header2/header2";
import MultiSelect from "../reactMultiSelect";
import { citiesByCountry, countries } from "../../constants/Country-City-Data";
import { add_options, suppliersPreset } from "../../constants/contants";

const ReportsManagementBookingBySupplierByNights = () => {
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
      <Header2 title="NIGHTS BY SUPPLIER" />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <div>
          <form>
            <div className="panel-body">
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
                  <label>Suppliers</label>
                  <div>
                    <MultiSelect
                      options={suppliersPreset}
                      isSearchable
                      placeholder=" Select Supplier "
                      className="custom-select"
                      noOptionsMessage={() => "No Supplier Found"}
                    />
                  </div>
                </div>

                <div className="form-group col-md-3 mt-2">
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
                <div className="form-group col-md-3 mt-2">
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
            <style
              dangerouslySetInnerHTML={{
                __html:
                  "\n                td a {\n                    text-decoration: none;\n                    cursor: pointer;\n                }\n\n                td a:hover {\n                    text-decoration: none !important;\n                    cursor: pointer;\n                }\n            ",
              }}
            />
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
                          width="100%"
                          role="grid"
                          aria-describedby="search_sup_info"
                          style={{ width: "100%" }}
                        >
                          <thead>
                            <tr role="row">
                              <th
                                className="sorting_disabled"
                                rowSpan={1}
                                colSpan={1}
                                style={{ width: "792.2px" }}
                              >
                                &nbsp;Supplier
                              </th>
                              <th
                                className="numAlign sorting_disabled"
                                rowSpan={1}
                                colSpan={1}
                                style={{ width: "619px" }}
                              >
                                &nbsp;Total Nights
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white">
                            <tr role="row" className="odd">
                              <td>
                                <Link
                                  data-toggle="modal"
                                  data-target="#reportCont"
                                  className="highlightLink"
                                  style={{ color: "#0060b3" }}
                                  onclick="callpopup('agoda','0','0','');"
                                >
                                  Agoda
                                </Link>
                              </td>
                              <td className="numAlign">80</td>
                            </tr>
                            <tr role="row" className="even">
                              <td>Dhisco_rotana</td>
                              <td className="numAlign">0</td>
                            </tr>
                            <tr role="row" className="odd">
                              <td>
                                <Link
                                  data-toggle="modal"
                                  data-target="#reportCont"
                                  className="highlightLink"
                                  style={{ color: "#0060b3" }}
                                  onclick="callpopup('dotw','0','0','');"
                                >
                                  Dotw
                                </Link>
                              </td>
                              <td className="numAlign">4</td>
                            </tr>
                            <tr role="row" className="even">
                              <td>Egyptexpress</td>
                              <td className="numAlign">0</td>
                            </tr>
                            <tr role="row" className="odd">
                              <td>Expedia</td>
                              <td className="numAlign">0</td>
                            </tr>
                            <tr role="row" className="even">
                              <td>
                                <Link
                                  data-toggle="modal"
                                  data-target="#reportCont"
                                  className="highlightLink"
                                  style={{ color: "#0060b3" }}
                                  onclick="callpopup('expediapackage','0','0','');"
                                >
                                  Expediapackage
                                </Link>
                              </td>
                              <td className="numAlign">1</td>
                            </tr>
                            <tr role="row" className="odd">
                              <td>
                                <Link
                                  data-toggle="modal"
                                  data-target="#reportCont"
                                  className="highlightLink"
                                  style={{ color: "#0060b3" }}
                                  onclick="callpopup('hotelbeds','0','0','');"
                                >
                                  Hotelbeds
                                </Link>
                              </td>
                              <td className="numAlign">332</td>
                            </tr>
                            <tr role="row" className="even">
                              <td>
                                <Link
                                  data-toggle="modal"
                                  data-target="#reportCont"
                                  className="highlightLink"
                                  style={{ color: "#0060b3" }}
                                  onclick="callpopup('localsystem','0','0','');"
                                >
                                  Localsystem
                                </Link>
                              </td>
                              <td className="numAlign">53</td>
                            </tr>
                            <tr role="row" className="odd">
                              <td>
                                <Link
                                  data-toggle="modal"
                                  data-target="#reportCont"
                                  className="highlightLink"
                                  style={{ color: "#0060b3" }}
                                  onclick="callpopup('localsystem','0','0','');"
                                >
                                  Localsystem
                                </Link>
                              </td>
                              <td className="numAlign">53</td>
                            </tr>
                            <tr role="row" className="even">
                              <td>Miki</td>
                              <td className="numAlign">0</td>
                            </tr>
                            <tr role="row" className="odd">
                              <td>Pricelinemor</td>
                              <td className="numAlign">0</td>
                            </tr>
                            <tr role="row" className="even">
                              <td>Redapple</td>
                              <td className="numAlign">0</td>
                            </tr>
                            <tr role="row" className="odd">
                              <td>
                                <Link
                                  data-toggle="modal"
                                  data-target="#reportCont"
                                  className="highlightLink"
                                  style={{ color: "#0060b3" }}
                                  onclick="callpopup('restel','0','0','');"
                                >
                                  Restel
                                </Link>
                              </td>
                              <td className="numAlign">1</td>
                            </tr>
                            <tr role="row" className="even">
                              <td>
                                <Link
                                  data-toggle="modal"
                                  data-target="#reportCont"
                                  className="highlightLink"
                                  style={{ color: "#0060b3" }}
                                  onclick="callpopup('tboholidays','0','0','');"
                                >
                                  Tboholidays
                                </Link>
                              </td>
                              <td className="numAlign">15</td>
                            </tr>
                            <tr role="row" className="odd">
                              <td>Travco</td>
                              <td className="numAlign">0</td>
                            </tr>
                            <tr role="row" className="even">
                              <td>Whitesands</td>
                              <td className="numAlign">0</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <div className="form-group col-md-3">
                  <Link
                    type="button"
                    className="btn btn-dark btn-sm"
                    title="Click to download XL sheet"
                  >
                    <i className="fa fa-download" />
                    &nbsp;Download Excel
                  </Link>
                  {/*  &nbsp;&nbsp;
                  <Link type="button" class="btn btn-primary" to="/tms/new_report.php?report=supplier_booking_track_night&a=&run=1&sel_country=0&sel_city=0&sel_branches=&sel_selected_supplier=all&booking_from_date=&booking_to_date=&service_from_date=&service_to_date=&sbt1=View+Report&print=1" target="_blank" title="Click to Print"><h6><i class="fa fa-print"></i>&nbsp;Print</h6></Link> */}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default ReportsManagementBookingBySupplierByNights;
