import { Link } from "react-router-dom";

import alertGif from "../../../assets/images/alert.gif";
import Header2 from "../../header2/header2";
import MultiSelect from "../../reactMultiSelect";
import { countries } from "../../../constants/Country-City-Data";
import Constants from "../../../constants/routes";
import {
  citiesNamesOptions,
  citiesResultsOptions,
  suppliersPreset,
} from "../../../constants/contants";

const CitiesAutoShow = () => {
  return (
    <>
      <Header2 title="AUTO CITY MAPPING" />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <form>
          <div className="panel-body">
            <div className="form-group row">
              <div className="form-group col-md-3">
                <label>Supplier</label>
                <MultiSelect
                  options={suppliersPreset}
                  isSearchable
                  placeholder="- Select Supplier -"
                  className="custom-select required"
                  noOptionsMessage={() => "No Supplier Found"}
                />
              </div>
              <div className="form-group col-md-3">
                <label>Country</label>
                <MultiSelect
                  options={countries}
                  isSearchable
                  placeholder="- Select Country -"
                  className="custom-select required"
                  noOptionsMessage={() => "No Country Found"}
                />
              </div>
              <div className="form-group col-md-3">
                <label>Results</label>
                <MultiSelect
                  options={citiesResultsOptions}
                  isSearchable
                  placeholder="All"
                  className="custom-select"
                  noOptionsMessage={() => "No Results Found"}
                />
              </div>
              <div className="form-group col-md-3">
                <label>City Name Filter</label>
                <MultiSelect
                  options={citiesNamesOptions}
                  isSearchable
                  placeholder="Select City Start Name"
                  className="custom-select"
                  noOptionsMessage={() => "No City Name Found"}
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="form-group col-md-12">
                <Link
                  to={Constants.URLConstants.CITIESAUTOSHOW}
                  className="btn btn-dark btn-sm"
                  type="button"
                  onclick="mapping_report('show')"
                  value="Show Report"
                >
                  <i className="fa fa-eye" />
                  &nbsp;Show
                </Link>
                &nbsp;&nbsp;
                <button
                  className="btn btn-outline-secondary btn-sm"
                  type="button"
                  onclick="mapping_report('download')"
                  value="Download Report"
                  id="download_report"
                  style={{ display: "none" }}
                >
                  <i className="fa fa-download" />
                  &nbsp;Download Report
                </button>
              </div>
            </div>
          </div>
        </form>

        <form className="mt-3">
          <div className="tab-content" id="mainTabContent">
            {/* Products Tab */}
            <div
              className="tab-pane fade show active"
              id="products"
              role="tabpanel"
              aria-labelledby="products-tab"
            >
              <ul
                className="nav nav-tabs"
                id="productsSubTabs"
                role="tablist"
                style={{ borderBottom: "2px solid #FF5015!important" }}
              >
                <li
                  className="nav-item"
                  style={{ borderBottom: "2px solid #FF5015!important" }}
                >
                  <Link
                    className="nav-link active"
                    id="subtab1-tab"
                    data-bs-toggle="tab"
                    to="#subtab1"
                    role="tab"
                    aria-controls="subtab1"
                    aria-selected="true"
                  >
                    Auto Map and Mapped Cities{" "}
                  </Link>
                </li>
                <li
                  className="nav-item"
                  style={{ borderBottom: "2px solid #FF5015!important" }}
                >
                  <Link
                    className="nav-link"
                    id="subtab2-tab"
                    data-bs-toggle="tab"
                    to="#subtab2"
                    role="tab"
                    aria-controls="subtab2"
                    aria-selected="false"
                  >
                    Add City{" "}
                  </Link>
                </li>
                <li
                  className="nav-item"
                  style={{ borderBottom: "2px solid #FF5015!important" }}
                >
                  <Link
                    className="nav-link"
                    id="subtab3-tab"
                    data-bs-toggle="tab"
                    to="#subtab3"
                    role="tab"
                    aria-controls="subtab3"
                    aria-selected="false"
                  >
                    Manual Mapping{" "}
                  </Link>
                </li>
              </ul>
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
                {/* Tab 1 COntent */}
                <div
                  className="tab-pane fade show active"
                  id="subtab1"
                  role="tabpanel"
                  aria-labelledby="subtab1-tab"
                >
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
                          style={{ height: "20px", overflow: "scroll hidden" }}
                        >
                          <div
                            className="suwala-doubleScroll-scroll"
                            style={{ height: "20px" }}
                          />
                        </div>
                        <div className="wrapper2" style={{ overflow: "auto" }}>
                          <table
                            id="search_sup"
                            className="table table-bordered   table-responsive dataTable no-footer"
                            role="grid"
                            aria-describedby="search_sup_info"
                          >
                            <thead>
                              <tr role="row">
                                <th
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "38.2px" }}
                                >
                                  No.
                                </th>
                                <th
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "202.2px" }}
                                >
                                  Supplier Country
                                </th>
                                <th
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "354.2px" }}
                                >
                                  Supplier City
                                </th>
                                <th
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "238.2px" }}
                                >
                                  <input
                                    type="checkbox"
                                    defaultValue
                                    className="checkAll"
                                  />
                                  &nbsp;Supplier City Code
                                </th>
                                <th
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "202.2px" }}
                                >
                                  System Country
                                </th>
                                <th
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "175.2px" }}
                                >
                                  System City
                                </th>
                                <th
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "139px" }}
                                >
                                  <input
                                    type="checkbox"
                                    defaultValue
                                    className="selectDeselect"
                                    onclick="SetAllCheckBoxes('frmcity_map', 'myCheckbox');"
                                  />
                                  &nbsp;Action
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              <tr className="phps_row_1 odd" role="row">
                                <td>1</td>
                                <td>United Arab Emirates</td>
                                <td>Abu Dhabi</td>
                                <td>
                                  <span style={{ color: "green" }}>10182</span>
                                  <div
                                    className="checkbox checkbox-success"
                                    style={{ paddingLeft: "8px" }}
                                  >
                                    <input
                                      type="checkbox"
                                      id="remove_already_mapped_cities"
                                      name="remove_already_mapped_cities[71650]"
                                      defaultValue
                                    />
                                    <label />
                                  </div>
                                  - Remove
                                </td>
                                <td>United Arab Emirates</td>
                                <td>Abu dhabi</td>
                                <td>
                                  <table border={0} width="100%">
                                    <tbody className="bg-white">
                                      <tr>
                                        <td width="25%">
                                          <div title="Will Overrule Suggested Mapping">
                                            Blocked
                                          </div>
                                          <span className="radio radio-success">
                                            <input
                                              type="radio"
                                              id="myradio"
                                              name="block_cities[71650]"
                                              defaultValue="True"
                                            />
                                            <label>Yes</label>
                                          </span>
                                        </td>
                                        {/* <td width="25%">
                                                  <span>Hotel Search</span><br> 
                                                  <div class="checkbox checkbox-success" style="padding-left: 8px;">
                                                      <input type="checkbox" id="myCheckbox" name=hotel_mapping[71650] value='71650' checked>
                                                      <label></label>
                                                  </div>
                                              </td> */}
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                              <tr className="phps_row_0 even" role="row">
                                <td>2</td>
                                <td>United Arab Emirates</td>
                                <td>Ajman</td>
                                <td>
                                  <span style={{ color: "green" }}>5563</span>
                                  <div
                                    className="checkbox checkbox-success"
                                    style={{ paddingLeft: "8px" }}
                                  >
                                    <input
                                      type="checkbox"
                                      id="remove_already_mapped_cities"
                                      name="remove_already_mapped_cities[71653]"
                                      defaultValue
                                    />
                                    <label />
                                  </div>
                                  - Remove
                                </td>
                                <td>United Arab Emirates</td>
                                <td>Ajman</td>
                                <td>
                                  <table border={0} width="100%">
                                    <tbody className="bg-white">
                                      <tr>
                                        <td width="25%">
                                          <div title="Will Overrule Suggested Mapping">
                                            Blocked
                                          </div>
                                          <span className="radio radio-success">
                                            <input
                                              type="radio"
                                              id="myradio"
                                              name="block_cities[71653]"
                                              defaultValue="True"
                                            />
                                            <label>Yes</label>
                                          </span>
                                        </td>
                                        {/* <td width="25%">
                                                  <span>Hotel Search</span><br> 
                                                  <div class="checkbox checkbox-success" style="padding-left: 8px;">
                                                      <input type="checkbox" id="myCheckbox" name=hotel_mapping[71653] value='71653' checked>
                                                      <label></label>
                                                  </div>
                                              </td> */}
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                              <tr className="phps_row_1 odd" role="row">
                                <td>3</td>
                                <td>United Arab Emirates</td>
                                <td>
                                  {" "}
                                  <Link
                                    to="#"
                                    data-toggle="tooltip"
                                    title="Al Ain | NA"
                                  >
                                    Multi-City mapped{" "}
                                  </Link>
                                </td>
                                <td>
                                  <span style={{ color: "green" }}>
                                    9174, 719328
                                  </span>
                                  <div
                                    className="checkbox checkbox-success"
                                    style={{ paddingLeft: "8px" }}
                                  >
                                    <input
                                      type="checkbox"
                                      id="remove_already_mapped_cities"
                                      name="remove_already_mapped_cities[71652]"
                                      defaultValue
                                    />
                                    <label />
                                  </div>
                                  - Remove
                                </td>
                                <td>United Arab Emirates</td>
                                <td>Al ain</td>
                                <td>
                                  <table border={0} width="100%">
                                    <tbody className="bg-white">
                                      <tr>
                                        <td width="25%">
                                          <div title="Will Overrule Suggested Mapping">
                                            Blocked
                                          </div>
                                          <span className="radio radio-success">
                                            <input
                                              type="radio"
                                              id="myradio"
                                              name="block_cities[71652]"
                                              defaultValue="True"
                                            />
                                            <label>Yes</label>
                                          </span>
                                        </td>
                                        {/* <td width="25%">
                                                  <span>Hotel Search</span><br> 
                                                  <div class="checkbox checkbox-success" style="padding-left: 8px;">
                                                      <input type="checkbox" id="myCheckbox" name=hotel_mapping[71652] value='71652' checked>
                                                      <label></label>
                                                  </div>
                                              </td> */}
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                              <tr className="phps_row_0 even" role="row">
                                <td>4</td>
                                <td>United Arab Emirates</td>
                                <td>City no longer available with supplier</td>
                                <td>
                                  <span style={{ color: "#007A7A" }}>
                                    170289
                                  </span>
                                  <div
                                    className="checkbox checkbox-success"
                                    style={{ paddingLeft: "8px" }}
                                  >
                                    <input
                                      type="checkbox"
                                      id="remove_already_mapped_cities"
                                      name="remove_already_mapped_cities[139891]"
                                      defaultValue
                                    />
                                    <label />
                                  </div>
                                  - Remove
                                </td>
                                <td>United Arab Emirates</td>
                                <td>Al Dhaid</td>
                                <td>
                                  <table border={0} width="100%">
                                    <tbody className="bg-white">
                                      <tr>
                                        <td width="25%">
                                          <div title="Will Overrule Suggested Mapping">
                                            Blocked
                                          </div>
                                          <span className="radio radio-success">
                                            <input
                                              type="radio"
                                              id="myradio"
                                              name="block_cities[139891]"
                                              defaultValue="True"
                                            />
                                            <label>Yes</label>
                                          </span>
                                        </td>
                                        {/* <td width="25%">
                                                  <span>Hotel Search</span><br> 
                                                  <div class="checkbox checkbox-success" style="padding-left: 8px;">
                                                      <input type="checkbox" id="myCheckbox" name=hotel_mapping[139891] value='139891' checked>
                                                      <label></label>
                                                  </div>
                                              </td> */}
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                              <tr className="phps_row_1 odd" role="row">
                                <td>5</td>
                                <td>United Arab Emirates</td>
                                <td>City no longer available with supplier</td>
                                <td>
                                  <span style={{ color: "#007A7A" }}>
                                    246549
                                  </span>
                                  <div
                                    className="checkbox checkbox-success"
                                    style={{ paddingLeft: "8px" }}
                                  >
                                    <input
                                      type="checkbox"
                                      id="remove_already_mapped_cities"
                                      name="remove_already_mapped_cities[139889]"
                                      defaultValue
                                    />
                                    <label />
                                  </div>
                                  - Remove
                                </td>
                                <td>United Arab Emirates</td>
                                <td>Dhadna</td>
                                <td>
                                  <table border={0} width="100%">
                                    <tbody className="bg-white">
                                      <tr>
                                        <td width="25%">
                                          <div title="Will Overrule Suggested Mapping">
                                            Blocked
                                          </div>
                                          <span className="radio radio-success">
                                            <input
                                              type="radio"
                                              id="myradio"
                                              name="block_cities[139889]"
                                              defaultValue="True"
                                            />
                                            <label>Yes</label>
                                          </span>
                                        </td>
                                        {/* <td width="25%">
                                                  <span>Hotel Search</span><br> 
                                                  <div class="checkbox checkbox-success" style="padding-left: 8px;">
                                                      <input type="checkbox" id="myCheckbox" name=hotel_mapping[139889] value='139889' checked>
                                                      <label></label>
                                                  </div>
                                              </td> */}
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                              <tr className="phps_row_0 even" role="row">
                                <td>6</td>
                                <td>United Arab Emirates</td>
                                <td>City no longer available with supplier</td>
                                <td>
                                  <span style={{ color: "#007A7A" }}>
                                    719326
                                  </span>
                                  <div
                                    className="checkbox checkbox-success"
                                    style={{ paddingLeft: "8px" }}
                                  >
                                    <input
                                      type="checkbox"
                                      id="remove_already_mapped_cities"
                                      name="remove_already_mapped_cities[139892]"
                                      defaultValue
                                    />
                                    <label />
                                  </div>
                                  - Remove
                                </td>
                                <td>United Arab Emirates</td>
                                <td>Dibba Al Fujairah</td>
                                <td>
                                  <table border={0} width="100%">
                                    <tbody className="bg-white">
                                      <tr>
                                        <td width="25%">
                                          <div title="Will Overrule Suggested Mapping">
                                            Blocked
                                          </div>
                                          <span className="radio radio-success">
                                            <input
                                              type="radio"
                                              id="myradio"
                                              name="block_cities[139892]"
                                              defaultValue="True"
                                            />
                                            <label>Yes</label>
                                          </span>
                                        </td>
                                        {/* <td width="25%">
                                                  <span>Hotel Search</span><br> 
                                                  <div class="checkbox checkbox-success" style="padding-left: 8px;">
                                                      <input type="checkbox" id="myCheckbox" name=hotel_mapping[139892] value='139892' checked>
                                                      <label></label>
                                                  </div>
                                              </td> */}
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                              <tr className="phps_row_1 odd" role="row">
                                <td>7</td>
                                <td>United Arab Emirates</td>
                                <td>
                                  {" "}
                                  <Link
                                    to="#"
                                    data-toggle="tooltip"
                                    title="Dubai | NA"
                                  >
                                    Multi-City mapped{" "}
                                  </Link>
                                </td>
                                <td>
                                  <span style={{ color: "green" }}>
                                    2994, 246634
                                  </span>
                                  <div
                                    className="checkbox checkbox-success"
                                    style={{ paddingLeft: "8px" }}
                                  >
                                    <input
                                      type="checkbox"
                                      id="remove_already_mapped_cities"
                                      name="remove_already_mapped_cities[71649]"
                                      defaultValue
                                    />
                                    <label />
                                  </div>
                                  - Remove
                                </td>
                                <td>United Arab Emirates</td>
                                <td>Dubai</td>
                                <td>
                                  <table border={0} width="100%">
                                    <tbody className="bg-white">
                                      <tr>
                                        <td width="25%">
                                          <div title="Will Overrule Suggested Mapping">
                                            Blocked
                                          </div>
                                          <span className="radio radio-success">
                                            <input
                                              type="radio"
                                              id="myradio"
                                              name="block_cities[71649]"
                                              defaultValue="True"
                                            />
                                            <label>Yes</label>
                                          </span>
                                        </td>
                                        {/* <td width="25%">
                                                  <span>Hotel Search</span><br> 
                                                  <div class="checkbox checkbox-success" style="padding-left: 8px;">
                                                      <input type="checkbox" id="myCheckbox" name=hotel_mapping[71649] value='71649' checked>
                                                      <label></label>
                                                  </div>
                                              </td> */}
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                              <tr className="phps_row_0 even" role="row">
                                <td>8</td>
                                <td>United Arab Emirates</td>
                                <td>
                                  {" "}
                                  <Link
                                    to="#"
                                    data-toggle="tooltip"
                                    title="Fujairah | NA"
                                  >
                                    Multi-City mapped{" "}
                                  </Link>
                                </td>
                                <td>
                                  <span style={{ color: "green" }}>
                                    4626, 719326
                                  </span>
                                  <div
                                    className="checkbox checkbox-success"
                                    style={{ paddingLeft: "8px" }}
                                  >
                                    <input
                                      type="checkbox"
                                      id="remove_already_mapped_cities"
                                      name="remove_already_mapped_cities[71655]"
                                      defaultValue
                                    />
                                    <label />
                                  </div>
                                  - Remove
                                </td>
                                <td>United Arab Emirates</td>
                                <td>Fujairah</td>
                                <td>
                                  <table border={0} width="100%">
                                    <tbody className="bg-white">
                                      <tr>
                                        <td width="25%">
                                          <div title="Will Overrule Suggested Mapping">
                                            Blocked
                                          </div>
                                          <span className="radio radio-success">
                                            <input
                                              type="radio"
                                              id="myradio"
                                              name="block_cities[71655]"
                                              defaultValue="True"
                                            />
                                            <label>Yes</label>
                                          </span>
                                        </td>
                                        {/* <td width="25%">
                                                  <span>Hotel Search</span><br> 
                                                  <div class="checkbox checkbox-success" style="padding-left: 8px;">
                                                      <input type="checkbox" id="myCheckbox" name=hotel_mapping[71655] value='71655' checked>
                                                      <label></label>
                                                  </div>
                                              </td> */}
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                              <tr className="phps_row_1 odd" role="row">
                                <td>9</td>
                                <td>United Arab Emirates</td>
                                <td>Hatta</td>
                                <td>
                                  <span style={{ color: "green" }}>78727</span>
                                  <div
                                    className="checkbox checkbox-success"
                                    style={{ paddingLeft: "8px" }}
                                  >
                                    <input
                                      type="checkbox"
                                      id="remove_already_mapped_cities"
                                      name="remove_already_mapped_cities[139897]"
                                      defaultValue
                                    />
                                    <label />
                                  </div>
                                  - Remove
                                </td>
                                <td>United Arab Emirates</td>
                                <td>Hatta</td>
                                <td>
                                  <table border={0} width="100%">
                                    <tbody className="bg-white">
                                      <tr>
                                        <td width="25%">
                                          <div title="Will Overrule Suggested Mapping">
                                            Blocked
                                          </div>
                                          <span className="radio radio-success">
                                            <input
                                              type="radio"
                                              id="myradio"
                                              name="block_cities[139897]"
                                              defaultValue="True"
                                            />
                                            <label>Yes</label>
                                          </span>
                                        </td>
                                        {/* <td width="25%">
                                                  <span>Hotel Search</span><br> 
                                                  <div class="checkbox checkbox-success" style="padding-left: 8px;">
                                                      <input type="checkbox" id="myCheckbox" name=hotel_mapping[139897] value='139897' checked>
                                                      <label></label>
                                                  </div>
                                              </td> */}
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                              <tr className="phps_row_0 even" role="row">
                                <td>10</td>
                                <td>United Arab Emirates</td>
                                <td>City no longer available with supplier</td>
                                <td>
                                  <span style={{ color: "#007A7A" }}>
                                    174477
                                  </span>
                                  <div
                                    className="checkbox checkbox-success"
                                    style={{ paddingLeft: "8px" }}
                                  >
                                    <input
                                      type="checkbox"
                                      id="remove_already_mapped_cities"
                                      name="remove_already_mapped_cities[139899]"
                                      defaultValue
                                    />
                                    <label />
                                  </div>
                                  - Remove
                                </td>
                                <td>United Arab Emirates</td>
                                <td>Kalba</td>
                                <td>
                                  <table border={0} width="100%">
                                    <tbody className="bg-white">
                                      <tr>
                                        <td width="25%">
                                          <div title="Will Overrule Suggested Mapping">
                                            Blocked
                                          </div>
                                          <span className="radio radio-success">
                                            <input
                                              type="radio"
                                              id="myradio"
                                              name="block_cities[139899]"
                                              defaultValue="True"
                                            />
                                            <label>Yes</label>
                                          </span>
                                        </td>
                                        {/* <td width="25%">
                                                  <span>Hotel Search</span><br> 
                                                  <div class="checkbox checkbox-success" style="padding-left: 8px;">
                                                      <input type="checkbox" id="myCheckbox" name=hotel_mapping[139899] value='139899' checked>
                                                      <label></label>
                                                  </div>
                                              </td> */}
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                              <tr className="phps_row_1 odd" role="row">
                                <td>11</td>
                                <td>United Arab Emirates</td>
                                <td>Ras Al Khaimah</td>
                                <td>
                                  <span style={{ color: "green" }}>12050</span>
                                  <div
                                    className="checkbox checkbox-success"
                                    style={{ paddingLeft: "8px" }}
                                  >
                                    <input
                                      type="checkbox"
                                      id="remove_already_mapped_cities"
                                      name="remove_already_mapped_cities[84778]"
                                      defaultValue
                                    />
                                    <label />
                                  </div>
                                  - Remove
                                </td>
                                <td>United Arab Emirates</td>
                                <td>Ras al khaimah</td>
                                <td>
                                  <table border={0} width="100%">
                                    <tbody className="bg-white">
                                      <tr>
                                        <td width="25%">
                                          <div title="Will Overrule Suggested Mapping">
                                            Blocked
                                          </div>
                                          <span className="radio radio-success">
                                            <input
                                              type="radio"
                                              id="myradio"
                                              name="block_cities[84778]"
                                              defaultValue="True"
                                            />
                                            <label>Yes</label>
                                          </span>
                                        </td>
                                        {/* <td width="25%">
                                                  <span>Hotel Search</span><br> 
                                                  <div class="checkbox checkbox-success" style="padding-left: 8px;">
                                                      <input type="checkbox" id="myCheckbox" name=hotel_mapping[84778] value='84778' checked>
                                                      <label></label>
                                                  </div>
                                              </td> */}
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                              <tr className="phps_row_0 even" role="row">
                                <td>12</td>
                                <td>United Arab Emirates</td>
                                <td>Sharjah</td>
                                <td>
                                  <span style={{ color: "green" }}>8105</span>
                                  <div
                                    className="checkbox checkbox-success"
                                    style={{ paddingLeft: "8px" }}
                                  >
                                    <input
                                      type="checkbox"
                                      id="remove_already_mapped_cities"
                                      name="remove_already_mapped_cities[71651]"
                                      defaultValue
                                    />
                                    <label />
                                  </div>
                                  - Remove
                                </td>
                                <td>United Arab Emirates</td>
                                <td>Sharjah</td>
                                <td>
                                  <table border={0} width="100%">
                                    <tbody className="bg-white">
                                      <tr>
                                        <td width="25%">
                                          <div title="Will Overrule Suggested Mapping">
                                            Blocked
                                          </div>
                                          <span className="radio radio-success">
                                            <input
                                              type="radio"
                                              id="myradio"
                                              name="block_cities[71651]"
                                              defaultValue="True"
                                            />
                                            <label>Yes</label>
                                          </span>
                                        </td>
                                        {/* <td width="25%">
                                                  <span>Hotel Search</span><br> 
                                                  <div class="checkbox checkbox-success" style="padding-left: 8px;">
                                                      <input type="checkbox" id="myCheckbox" name=hotel_mapping[71651] value='71651' checked>
                                                      <label></label>
                                                  </div>
                                              </td> */}
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                              <tr className="phps_row_1 odd" role="row">
                                <td>13</td>
                                <td>United Arab Emirates</td>
                                <td>Sir Baniyas Island</td>
                                <td>
                                  <span style={{ color: "green" }}>707835</span>
                                  <div
                                    className="checkbox checkbox-success"
                                    style={{ paddingLeft: "8px" }}
                                  >
                                    <input
                                      type="checkbox"
                                      id="remove_already_mapped_cities"
                                      name="remove_already_mapped_cities[139910]"
                                      defaultValue
                                    />
                                    <label />
                                  </div>
                                  - Remove
                                </td>
                                <td>United Arab Emirates</td>
                                <td>Sir Baniyas Island</td>
                                <td>
                                  <table border={0} width="100%">
                                    <tbody className="bg-white">
                                      <tr>
                                        <td width="25%">
                                          <div title="Will Overrule Suggested Mapping">
                                            Blocked
                                          </div>
                                          <span className="radio radio-success">
                                            <input
                                              type="radio"
                                              id="myradio"
                                              name="block_cities[139910]"
                                              defaultValue="True"
                                            />
                                            <label>Yes</label>
                                          </span>
                                        </td>
                                        {/* <td width="25%">
                                                  <span>Hotel Search</span><br> 
                                                  <div class="checkbox checkbox-success" style="padding-left: 8px;">
                                                      <input type="checkbox" id="myCheckbox" name=hotel_mapping[139910] value='139910' checked>
                                                      <label></label>
                                                  </div>
                                              </td> */}
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                              <tr className="phps_row_0 even" role="row">
                                <td>14</td>
                                <td>United Arab Emirates</td>
                                <td>Umm Al Quwain</td>
                                <td>
                                  <span style={{ color: "green" }}>6715</span>
                                  <div
                                    className="checkbox checkbox-success"
                                    style={{ paddingLeft: "8px" }}
                                  >
                                    <input
                                      type="checkbox"
                                      id="remove_already_mapped_cities"
                                      name="remove_already_mapped_cities[71656]"
                                      defaultValue
                                    />
                                    <label />
                                  </div>
                                  - Remove
                                </td>
                                <td>United Arab Emirates</td>
                                <td>Umm al quwain</td>
                                <td>
                                  <table border={0} width="100%">
                                    <tbody className="bg-white">
                                      <tr>
                                        <td width="25%">
                                          <div title="Will Overrule Suggested Mapping">
                                            Blocked
                                          </div>
                                          <span className="radio radio-success">
                                            <input
                                              type="radio"
                                              id="myradio"
                                              name="block_cities[71656]"
                                              defaultValue="True"
                                            />
                                            <label>Yes</label>
                                          </span>
                                        </td>
                                        {/* <td width="25%">
                                                  <span>Hotel Search</span><br> 
                                                  <div class="checkbox checkbox-success" style="padding-left: 8px;">
                                                      <input type="checkbox" id="myCheckbox" name=hotel_mapping[71656] value='71656' checked>
                                                      <label></label>
                                                  </div>
                                              </td> */}
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                              <tr className="phps_row_1 odd" role="row">
                                <td>15</td>
                                <td>United Arab Emirates</td>
                                <td>City no longer available with supplier</td>
                                <td>
                                  <span style={{ color: "#007A7A" }}>
                                    246668
                                  </span>
                                  <div
                                    className="checkbox checkbox-success"
                                    style={{ paddingLeft: "8px" }}
                                  >
                                    <input
                                      type="checkbox"
                                      id="remove_already_mapped_cities"
                                      name="remove_already_mapped_cities[139912]"
                                      defaultValue
                                    />
                                    <label />
                                  </div>
                                  - Remove
                                </td>
                                <td>United Arab Emirates</td>
                                <td>Zayed</td>
                                <td>
                                  <table border={0} width="100%">
                                    <tbody className="bg-white">
                                      <tr>
                                        <td width="25%">
                                          <div title="Will Overrule Suggested Mapping">
                                            Blocked
                                          </div>
                                          <span className="radio radio-success">
                                            <input
                                              type="radio"
                                              id="myradio"
                                              name="block_cities[139912]"
                                              defaultValue="True"
                                            />
                                            <label>Yes</label>
                                          </span>
                                        </td>
                                        {/* <td width="25%">
                                                  <span>Hotel Search</span><br> 
                                                  <div class="checkbox checkbox-success" style="padding-left: 8px;">
                                                      <input type="checkbox" id="myCheckbox" name=hotel_mapping[139912] value='139912' checked>
                                                      <label></label>
                                                  </div>
                                              </td> */}
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Tab 2 COntent */}
                <div
                  className="tab-pane fade"
                  id="subtab2"
                  role="tabpanel"
                  aria-labelledby="subtab2-tab"
                >
                  <div id="tab2">
                    {/* <h6 style="text-align: center;"><font color='red' class="uniqAlrt bg-primary"> Supplier City Not Exist on System</font></h6> */}
                    <br />
                    <div className="row notifText form-group">
                      <div className="col-md-12 hpanel">
                        <div className="panel-body cancelNot1">
                          <table>
                            <tbody className="bg-white">
                              <tr>
                                <td valign="middle" className="alertIcon">
                                  <img
                                    src={alertGif}
                                    alt="alert.gif"
                                    width="40px"
                                  />
                                </td>
                                <td valign="middle" className="countSect">
                                  <h2 className="text-light">9</h2>
                                </td>
                                <td valign="middle">
                                  <h6
                                    className="text-dark"
                                    style={{ fontSize: "12px" }}
                                  >
                                    Cities from the supplier system don’t exist
                                    on the system.
                                  </h6>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <div
                      id="search_sup1_wrapper"
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
                            style={{
                              height: "20px",
                              overflow: "scroll hidden",
                            }}
                          >
                            <div
                              className="suwala-doubleScroll-scroll"
                              style={{ height: "20px" }}
                            />
                          </div>
                          <div
                            className="scrollCont1"
                            style={{ overflow: "auto" }}
                          >
                            <table
                              id="search_sup1"
                              className="table table-bordered   table-responsive dataTable no-footer"
                              role="grid"
                              aria-describedby="search_sup1_info"
                            >
                              <thead>
                                <tr role="row">
                                  <th
                                    className="sorting_disabled"
                                    rowSpan={1}
                                    colSpan={1}
                                    style={{ width: "0px" }}
                                  >
                                    Supplier Country
                                  </th>
                                  <th
                                    className="sorting_disabled"
                                    rowSpan={1}
                                    colSpan={1}
                                    style={{ width: "0px" }}
                                  >
                                    Supplier City
                                  </th>
                                  <th
                                    className="sorting_disabled"
                                    rowSpan={1}
                                    colSpan={1}
                                    style={{ width: "0px" }}
                                  >
                                    Supplier City Code
                                  </th>
                                  <th
                                    className="sorting_disabled"
                                    rowSpan={1}
                                    colSpan={1}
                                    style={{ width: "0px" }}
                                  >
                                    <div className="checkbox checkbox-success">
                                      <input
                                        type="checkbox"
                                        defaultValue
                                        className="selectDeselect"
                                        onclick="SetAllCheckBoxes('frmcity_map', 'myCheckbox',this.checked);"
                                      />
                                      <label>&nbsp;Action</label>
                                    </div>
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white">
                                {/* <tr class="row_header">
                                      <td>&nbsp;</td>
                                  </tr> */}
                                <tr
                                  className="phps_row_1 odd"
                                  id="addcity1"
                                  role="row"
                                >
                                  {/* <td>1</td> */}
                                  <td>United Arab Emirates</td>
                                  <td>Al Ain</td>
                                  <td>9174</td>
                                  {/* <td><button type="button" class="btn btn-primary" value="Add City" onclick="add_supplier_city('9174','Al Ain', 'addcity1');"><h6><i class="fa fa-plus"></i>&nbsp;Add City</h6></button></td> */}
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox"
                                        name="add_supplier_cities[9174]"
                                        defaultValue="Al Ain"
                                      />
                                      <label />
                                    </div>
                                  </td>
                                </tr>
                                <tr
                                  className="phps_row_0 even"
                                  id="addcity2"
                                  role="row"
                                >
                                  {/* <td>2</td> */}
                                  <td>United Arab Emirates</td>
                                  <td>Al Khaznah</td>
                                  <td>246425</td>
                                  {/* <td><button type="button" class="btn btn-primary" value="Add City" onclick="add_supplier_city('246425','Al Khaznah', 'addcity2');"><h6><i class="fa fa-plus"></i>&nbsp;Add City</h6></button></td> */}
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox"
                                        name="add_supplier_cities[246425]"
                                        defaultValue="Al Khaznah"
                                      />
                                      <label />
                                    </div>
                                  </td>
                                </tr>
                                <tr
                                  className="phps_row_1 odd"
                                  id="addcity3"
                                  role="row"
                                >
                                  {/* <td>3</td> */}
                                  <td>United Arab Emirates</td>
                                  <td>Al Marfa'</td>
                                  <td>86190</td>
                                  {/* <td><button type="button" class="btn btn-primary" value="Add City" onclick="add_supplier_city('86190','Al Marfa\'', 'addcity3');"><h6><i class="fa fa-plus"></i>&nbsp;Add City</h6></button></td> */}
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox"
                                        name="add_supplier_cities[86190]"
                                        defaultValue="Al Marfa\'"
                                      />
                                      <label />
                                    </div>
                                  </td>
                                </tr>
                                <tr
                                  className="phps_row_0 even"
                                  id="addcity4"
                                  role="row"
                                >
                                  {/* <td>4</td> */}
                                  <td>United Arab Emirates</td>
                                  <td>Ar Ruways</td>
                                  <td>246505</td>
                                  {/* <td><button type="button" class="btn btn-primary" value="Add City" onclick="add_supplier_city('246505','Ar Ruways', 'addcity4');"><h6><i class="fa fa-plus"></i>&nbsp;Add City</h6></button></td> */}
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox"
                                        name="add_supplier_cities[246505]"
                                        defaultValue="Ar Ruways"
                                      />
                                      <label />
                                    </div>
                                  </td>
                                </tr>
                                <tr
                                  className="phps_row_1 odd"
                                  id="addcity5"
                                  role="row"
                                >
                                  {/* <td>5</td> */}
                                  <td>United Arab Emirates</td>
                                  <td>Deira</td>
                                  <td>170210</td>
                                  {/* <td><button type="button" class="btn btn-primary" value="Add City" onclick="add_supplier_city('170210','Deira', 'addcity5');"><h6><i class="fa fa-plus"></i>&nbsp;Add City</h6></button></td> */}
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox"
                                        name="add_supplier_cities[170210]"
                                        defaultValue="Deira"
                                      />
                                      <label />
                                    </div>
                                  </td>
                                </tr>
                                <tr
                                  className="phps_row_0 even"
                                  id="addcity6"
                                  role="row"
                                >
                                  {/* <td>6</td> */}
                                  <td>United Arab Emirates</td>
                                  <td>Dubai</td>
                                  <td>2994</td>
                                  {/* <td><button type="button" class="btn btn-primary" value="Add City" onclick="add_supplier_city('2994','Dubai', 'addcity6');"><h6><i class="fa fa-plus"></i>&nbsp;Add City</h6></button></td> */}
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox"
                                        name="add_supplier_cities[2994]"
                                        defaultValue="Dubai"
                                      />
                                      <label />
                                    </div>
                                  </td>
                                </tr>
                                <tr
                                  className="phps_row_1 odd"
                                  id="addcity7"
                                  role="row"
                                >
                                  {/* <td>7</td> */}
                                  <td>United Arab Emirates</td>
                                  <td>Fujairah</td>
                                  <td>4626</td>
                                  {/* <td><button type="button" class="btn btn-primary" value="Add City" onclick="add_supplier_city('4626','Fujairah', 'addcity7');"><h6><i class="fa fa-plus"></i>&nbsp;Add City</h6></button></td> */}
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox"
                                        name="add_supplier_cities[4626]"
                                        defaultValue="Fujairah"
                                      />
                                      <label />
                                    </div>
                                  </td>
                                </tr>
                                <tr
                                  className="phps_row_0 even"
                                  id="addcity8"
                                  role="row"
                                >
                                  {/* <td>8</td> */}
                                  <td>United Arab Emirates</td>
                                  <td>Jebel Dhanna</td>
                                  <td>19191</td>
                                  {/* <td><button type="button" class="btn btn-primary" value="Add City" onclick="add_supplier_city('19191','Jebel Dhanna', 'addcity8');"><h6><i class="fa fa-plus"></i>&nbsp;Add City</h6></button></td> */}
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox"
                                        name="add_supplier_cities[19191]"
                                        defaultValue="Jebel Dhanna"
                                      />
                                      <label />
                                    </div>
                                  </td>
                                </tr>
                                <tr
                                  className="phps_row_1 odd"
                                  id="addcity9"
                                  role="row"
                                >
                                  {/* <td>9</td> */}
                                  <td>United Arab Emirates</td>
                                  <td>Liwa</td>
                                  <td>86195</td>
                                  {/* <td><button type="button" class="btn btn-primary" value="Add City" onclick="add_supplier_city('86195','Liwa', 'addcity9');"><h6><i class="fa fa-plus"></i>&nbsp;Add City</h6></button></td> */}
                                  <td>
                                    <div className="checkbox checkbox-success checkbox-inline">
                                      <input
                                        type="checkbox"
                                        id="myCheckbox"
                                        name="add_supplier_cities[86195]"
                                        defaultValue="Liwa"
                                      />
                                      <label />
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
                            id="search_sup1_info"
                            role="status"
                            aria-live="polite"
                          >
                            Showing 1 to 9 of 9 entries
                          </div>
                        </div>
                        <div className="col-sm-6" />
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="subtab3"
                  role="tabpanel"
                  aria-labelledby="subtab3-tab"
                >
                  <div id="tab3" className="tab-pane active">
                    {/* 	<h6 style="text-align: center;"><font color='red' class="uniqAlrt bg-primary"> System City Not Exist on Supplier</font></h6> */}
                    <br />
                    <div
                      id="search_sup2_wrapper"
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
                            style={{
                              height: "20px",
                              overflow: "scroll hidden",
                            }}
                          >
                            <div
                              className="suwala-doubleScroll-scroll"
                              style={{ height: "20px" }}
                            />
                          </div>
                          <div
                            className="wrapper2"
                            style={{ overflow: "auto" }}
                          >
                            <table
                              id="search_sup2"
                              className="table table-bordered   table-responsive dataTable no-footer"
                              role="grid"
                              aria-describedby="search_sup2_info"
                            >
                              <thead>
                                <tr role="row">
                                  <th
                                    className="sorting_disabled"
                                    rowSpan={1}
                                    colSpan={1}
                                    style={{ width: "0px" }}
                                  >
                                    No.
                                  </th>
                                  <th
                                    className="sorting_disabled"
                                    rowSpan={1}
                                    colSpan={1}
                                    style={{ width: "0px" }}
                                  >
                                    System Country
                                  </th>
                                  <th
                                    className="sorting_disabled"
                                    rowSpan={1}
                                    colSpan={1}
                                    style={{ width: "0px" }}
                                  >
                                    System City
                                  </th>
                                  <th
                                    className="sorting_disabled"
                                    rowSpan={1}
                                    colSpan={1}
                                    style={{ width: "0px" }}
                                  >
                                    <span
                                      className="showAll"
                                      style={{ cursor: "pointer" }}
                                    >
                                      Action
                                    </span>
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white">
                                <tr className="phps_row_1 odd" role="row">
                                  <td>1</td>
                                  <td>United Arab Emirates</td>
                                  <td>Al Badiyah</td>
                                  <td>
                                    <div
                                      id="list_showdata1"
                                      style={{ display: "none" }}
                                    >
                                      <div className="dropdown bootstrap-select form-control show-menu-arrow">
                                        <select
                                          className="selectpicker form-control show-menu-arrow"
                                          data-container="body"
                                          name="sel_manual_map_supplier_cities[139883]"
                                          data-live-search="true"
                                          id="sel_manual_map_supplier_cities"
                                          tabIndex={-98}
                                        >
                                          <option value>
                                            - Select Supplier Cities -
                                          </option>
                                          <option value="blocked">
                                            Blocked
                                          </option>
                                          <option value={10182}>
                                            Abu Dhabi
                                          </option>
                                          <option value={5563}>Ajman</option>
                                          <option value={9174}>Al Ain</option>
                                          <option value={246425}>
                                            Al Khaznah
                                          </option>
                                          <option value={86190}>
                                            Al Marfa'
                                          </option>
                                          <option value={246505}>
                                            Ar Ruways
                                          </option>
                                          <option value={170210}>Deira</option>
                                          <option value={2994}>Dubai</option>
                                          <option value={4626}>Fujairah</option>
                                          <option value={78727}>Hatta</option>
                                          <option value={19191}>
                                            Jebel Dhanna
                                          </option>
                                          <option value={86195}>Liwa</option>
                                          <option value={12050}>
                                            Ras Al Khaimah
                                          </option>
                                          <option value={8105}>Sharjah</option>
                                          <option value={707835}>
                                            Sir Baniyas Island
                                          </option>
                                          <option value={6715}>
                                            Umm Al Quwain
                                          </option>
                                        </select>
                                        <button
                                          type="button"
                                          className="btn dropdown-toggle btn-light bs-placeholder"
                                          data-toggle="dropdown"
                                          aria-owns="bs-select-5"
                                          aria-haspopup="listbox"
                                          aria-expanded="false"
                                          data-id="sel_manual_map_supplier_cities"
                                          title="- Select Supplier Cities -"
                                        >
                                          <div className="filter-option">
                                            <div className="filter-option-inner">
                                              <div className="filter-option-inner-inner">
                                                - Select Supplier Cities -
                                              </div>
                                            </div>{" "}
                                          </div>
                                        </button>
                                        <div className="dropdown-menu ">
                                          <div className="bs-searchbox">
                                            <input
                                              type="search"
                                              className="form-control"
                                              autoComplete="off"
                                              aria-label="Search"
                                              aria-controls="bs-select-5"
                                              aria-autocomplete="list"
                                            />
                                          </div>
                                          <div
                                            className="inner show"
                                            role="listbox"
                                            id="bs-select-5"
                                            tabIndex={-1}
                                          >
                                            <ul
                                              className="dropdown-menu inner show"
                                              role="presentation"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      style={{ cursor: "pointer" }}
                                      id="maplink1"
                                      onclick="showLIST(id,'1','139883')"
                                    >
                                      <span className="manual">Manual Map</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr className="phps_row_0 even" role="row">
                                  <td>2</td>
                                  <td>United Arab Emirates</td>
                                  <td>Al Hamraniyah</td>
                                  <td>
                                    <div
                                      id="list_showdata2"
                                      style={{ display: "none" }}
                                    >
                                      <div className="dropdown bootstrap-select form-control show-menu-arrow">
                                        <select
                                          className="selectpicker form-control show-menu-arrow"
                                          data-container="body"
                                          name="sel_manual_map_supplier_cities[139884]"
                                          data-live-search="true"
                                          id="sel_manual_map_supplier_cities"
                                          tabIndex={-98}
                                        >
                                          <option value>
                                            - Select Supplier Cities -
                                          </option>
                                          <option value="blocked">
                                            Blocked
                                          </option>
                                          <option value={10182}>
                                            Abu Dhabi
                                          </option>
                                          <option value={5563}>Ajman</option>
                                          <option value={9174}>Al Ain</option>
                                          <option value={246425}>
                                            Al Khaznah
                                          </option>
                                          <option value={86190}>
                                            Al Marfa'
                                          </option>
                                          <option value={246505}>
                                            Ar Ruways
                                          </option>
                                          <option value={170210}>Deira</option>
                                          <option value={2994}>Dubai</option>
                                          <option value={4626}>Fujairah</option>
                                          <option value={78727}>Hatta</option>
                                          <option value={19191}>
                                            Jebel Dhanna
                                          </option>
                                          <option value={86195}>Liwa</option>
                                          <option value={12050}>
                                            Ras Al Khaimah
                                          </option>
                                          <option value={8105}>Sharjah</option>
                                          <option value={707835}>
                                            Sir Baniyas Island
                                          </option>
                                          <option value={6715}>
                                            Umm Al Quwain
                                          </option>
                                        </select>
                                        <button
                                          type="button"
                                          className="btn dropdown-toggle btn-light bs-placeholder"
                                          data-toggle="dropdown"
                                          aria-owns="bs-select-6"
                                          aria-haspopup="listbox"
                                          aria-expanded="false"
                                          data-id="sel_manual_map_supplier_cities"
                                          title="- Select Supplier Cities -"
                                        >
                                          <div className="filter-option">
                                            <div className="filter-option-inner">
                                              <div className="filter-option-inner-inner">
                                                - Select Supplier Cities -
                                              </div>
                                            </div>{" "}
                                          </div>
                                        </button>
                                        <div className="dropdown-menu ">
                                          <div className="bs-searchbox">
                                            <input
                                              type="search"
                                              className="form-control"
                                              autoComplete="off"
                                              aria-label="Search"
                                              aria-controls="bs-select-6"
                                              aria-autocomplete="list"
                                            />
                                          </div>
                                          <div
                                            className="inner show"
                                            role="listbox"
                                            id="bs-select-6"
                                            tabIndex={-1}
                                          >
                                            <ul
                                              className="dropdown-menu inner show"
                                              role="presentation"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      style={{ cursor: "pointer" }}
                                      id="maplink2"
                                      onclick="showLIST(id,'2','139884')"
                                    >
                                      <span className="manual">Manual Map</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr className="phps_row_1 odd" role="row">
                                  <td>3</td>
                                  <td>United Arab Emirates</td>
                                  <td>Al Jazirah Al Hamra</td>
                                  <td>
                                    <div
                                      id="list_showdata3"
                                      style={{ display: "none" }}
                                    >
                                      <div className="dropdown bootstrap-select form-control show-menu-arrow">
                                        <select
                                          className="selectpicker form-control show-menu-arrow"
                                          data-container="body"
                                          name="sel_manual_map_supplier_cities[139885]"
                                          data-live-search="true"
                                          id="sel_manual_map_supplier_cities"
                                          tabIndex={-98}
                                        >
                                          <option value>
                                            - Select Supplier Cities -
                                          </option>
                                          <option value="blocked">
                                            Blocked
                                          </option>
                                          <option value={10182}>
                                            Abu Dhabi
                                          </option>
                                          <option value={5563}>Ajman</option>
                                          <option value={9174}>Al Ain</option>
                                          <option value={246425}>
                                            Al Khaznah
                                          </option>
                                          <option value={86190}>
                                            Al Marfa'
                                          </option>
                                          <option value={246505}>
                                            Ar Ruways
                                          </option>
                                          <option value={170210}>Deira</option>
                                          <option value={2994}>Dubai</option>
                                          <option value={4626}>Fujairah</option>
                                          <option value={78727}>Hatta</option>
                                          <option value={19191}>
                                            Jebel Dhanna
                                          </option>
                                          <option value={86195}>Liwa</option>
                                          <option value={12050}>
                                            Ras Al Khaimah
                                          </option>
                                          <option value={8105}>Sharjah</option>
                                          <option value={707835}>
                                            Sir Baniyas Island
                                          </option>
                                          <option value={6715}>
                                            Umm Al Quwain
                                          </option>
                                        </select>
                                        <button
                                          type="button"
                                          className="btn dropdown-toggle btn-light bs-placeholder"
                                          data-toggle="dropdown"
                                          aria-owns="bs-select-7"
                                          aria-haspopup="listbox"
                                          aria-expanded="false"
                                          data-id="sel_manual_map_supplier_cities"
                                          title="- Select Supplier Cities -"
                                        >
                                          <div className="filter-option">
                                            <div className="filter-option-inner">
                                              <div className="filter-option-inner-inner">
                                                - Select Supplier Cities -
                                              </div>
                                            </div>{" "}
                                          </div>
                                        </button>
                                        <div className="dropdown-menu ">
                                          <div className="bs-searchbox">
                                            <input
                                              type="search"
                                              className="form-control"
                                              autoComplete="off"
                                              aria-label="Search"
                                              aria-controls="bs-select-7"
                                              aria-autocomplete="list"
                                            />
                                          </div>
                                          <div
                                            className="inner show"
                                            role="listbox"
                                            id="bs-select-7"
                                            tabIndex={-1}
                                          >
                                            <ul
                                              className="dropdown-menu inner show"
                                              role="presentation"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      style={{ cursor: "pointer" }}
                                      id="maplink3"
                                      onclick="showLIST(id,'3','139885')"
                                    >
                                      <span className="manual">Manual Map</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr className="phps_row_0 even" role="row">
                                  <td>4</td>
                                  <td>United Arab Emirates</td>
                                  <td>Al Madam</td>
                                  <td>
                                    <div
                                      id="list_showdata4"
                                      style={{ display: "none" }}
                                    >
                                      <div className="dropdown bootstrap-select form-control show-menu-arrow">
                                        <select
                                          className="selectpicker form-control show-menu-arrow"
                                          data-container="body"
                                          name="sel_manual_map_supplier_cities[139886]"
                                          data-live-search="true"
                                          id="sel_manual_map_supplier_cities"
                                          tabIndex={-98}
                                        >
                                          <option value>
                                            - Select Supplier Cities -
                                          </option>
                                          <option value="blocked">
                                            Blocked
                                          </option>
                                          <option value={10182}>
                                            Abu Dhabi
                                          </option>
                                          <option value={5563}>Ajman</option>
                                          <option value={9174}>Al Ain</option>
                                          <option value={246425}>
                                            Al Khaznah
                                          </option>
                                          <option value={86190}>
                                            Al Marfa'
                                          </option>
                                          <option value={246505}>
                                            Ar Ruways
                                          </option>
                                          <option value={170210}>Deira</option>
                                          <option value={2994}>Dubai</option>
                                          <option value={4626}>Fujairah</option>
                                          <option value={78727}>Hatta</option>
                                          <option value={19191}>
                                            Jebel Dhanna
                                          </option>
                                          <option value={86195}>Liwa</option>
                                          <option value={12050}>
                                            Ras Al Khaimah
                                          </option>
                                          <option value={8105}>Sharjah</option>
                                          <option value={707835}>
                                            Sir Baniyas Island
                                          </option>
                                          <option value={6715}>
                                            Umm Al Quwain
                                          </option>
                                        </select>
                                        <button
                                          type="button"
                                          className="btn dropdown-toggle btn-light bs-placeholder"
                                          data-toggle="dropdown"
                                          aria-owns="bs-select-8"
                                          aria-haspopup="listbox"
                                          aria-expanded="false"
                                          data-id="sel_manual_map_supplier_cities"
                                          title="- Select Supplier Cities -"
                                        >
                                          <div className="filter-option">
                                            <div className="filter-option-inner">
                                              <div className="filter-option-inner-inner">
                                                - Select Supplier Cities -
                                              </div>
                                            </div>{" "}
                                          </div>
                                        </button>
                                        <div className="dropdown-menu ">
                                          <div className="bs-searchbox">
                                            <input
                                              type="search"
                                              className="form-control"
                                              autoComplete="off"
                                              aria-label="Search"
                                              aria-controls="bs-select-8"
                                              aria-autocomplete="list"
                                            />
                                          </div>
                                          <div
                                            className="inner show"
                                            role="listbox"
                                            id="bs-select-8"
                                            tabIndex={-1}
                                          >
                                            <ul
                                              className="dropdown-menu inner show"
                                              role="presentation"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      style={{ cursor: "pointer" }}
                                      id="maplink4"
                                      onclick="showLIST(id,'4','139886')"
                                    >
                                      <span className="manual">Manual Map</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr className="phps_row_1 odd" role="row">
                                  <td>5</td>
                                  <td>United Arab Emirates</td>
                                  <td>Al Mirfa</td>
                                  <td>
                                    <div
                                      id="list_showdata5"
                                      style={{ display: "none" }}
                                    >
                                      <div className="dropdown bootstrap-select form-control show-menu-arrow">
                                        <select
                                          className="selectpicker form-control show-menu-arrow"
                                          data-container="body"
                                          name="sel_manual_map_supplier_cities[139888]"
                                          data-live-search="true"
                                          id="sel_manual_map_supplier_cities"
                                          tabIndex={-98}
                                        >
                                          <option value>
                                            - Select Supplier Cities -
                                          </option>
                                          <option value="blocked">
                                            Blocked
                                          </option>
                                          <option value={10182}>
                                            Abu Dhabi
                                          </option>
                                          <option value={5563}>Ajman</option>
                                          <option value={9174}>Al Ain</option>
                                          <option value={246425}>
                                            Al Khaznah
                                          </option>
                                          <option value={86190}>
                                            Al Marfa'
                                          </option>
                                          <option value={246505}>
                                            Ar Ruways
                                          </option>
                                          <option value={170210}>Deira</option>
                                          <option value={2994}>Dubai</option>
                                          <option value={4626}>Fujairah</option>
                                          <option value={78727}>Hatta</option>
                                          <option value={19191}>
                                            Jebel Dhanna
                                          </option>
                                          <option value={86195}>Liwa</option>
                                          <option value={12050}>
                                            Ras Al Khaimah
                                          </option>
                                          <option value={8105}>Sharjah</option>
                                          <option value={707835}>
                                            Sir Baniyas Island
                                          </option>
                                          <option value={6715}>
                                            Umm Al Quwain
                                          </option>
                                        </select>
                                        <button
                                          type="button"
                                          className="btn dropdown-toggle btn-light bs-placeholder"
                                          data-toggle="dropdown"
                                          aria-owns="bs-select-9"
                                          aria-haspopup="listbox"
                                          aria-expanded="false"
                                          data-id="sel_manual_map_supplier_cities"
                                          title="- Select Supplier Cities -"
                                        >
                                          <div className="filter-option">
                                            <div className="filter-option-inner">
                                              <div className="filter-option-inner-inner">
                                                - Select Supplier Cities -
                                              </div>
                                            </div>{" "}
                                          </div>
                                        </button>
                                        <div className="dropdown-menu ">
                                          <div className="bs-searchbox">
                                            <input
                                              type="search"
                                              className="form-control"
                                              autoComplete="off"
                                              aria-label="Search"
                                              aria-controls="bs-select-9"
                                              aria-autocomplete="list"
                                            />
                                          </div>
                                          <div
                                            className="inner show"
                                            role="listbox"
                                            id="bs-select-9"
                                            tabIndex={-1}
                                          >
                                            <ul
                                              className="dropdown-menu inner show"
                                              role="presentation"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      style={{ cursor: "pointer" }}
                                      id="maplink5"
                                      onclick="showLIST(id,'5','139888')"
                                    >
                                      <span className="manual">Manual Map</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr className="phps_row_0 even" role="row">
                                  <td>6</td>
                                  <td>United Arab Emirates</td>
                                  <td>Al Ruwais</td>
                                  <td>
                                    <div
                                      id="list_showdata6"
                                      style={{ display: "none" }}
                                    >
                                      <div className="dropdown bootstrap-select form-control show-menu-arrow">
                                        <select
                                          className="selectpicker form-control show-menu-arrow"
                                          data-container="body"
                                          name="sel_manual_map_supplier_cities[139911]"
                                          data-live-search="true"
                                          id="sel_manual_map_supplier_cities"
                                          tabIndex={-98}
                                        >
                                          <option value>
                                            - Select Supplier Cities -
                                          </option>
                                          <option value="blocked">
                                            Blocked
                                          </option>
                                          <option value={10182}>
                                            Abu Dhabi
                                          </option>
                                          <option value={5563}>Ajman</option>
                                          <option value={9174}>Al Ain</option>
                                          <option value={246425}>
                                            Al Khaznah
                                          </option>
                                          <option value={86190}>
                                            Al Marfa'
                                          </option>
                                          <option value={246505}>
                                            Ar Ruways
                                          </option>
                                          <option value={170210}>Deira</option>
                                          <option value={2994}>Dubai</option>
                                          <option value={4626}>Fujairah</option>
                                          <option value={78727}>Hatta</option>
                                          <option value={19191}>
                                            Jebel Dhanna
                                          </option>
                                          <option value={86195}>Liwa</option>
                                          <option value={12050}>
                                            Ras Al Khaimah
                                          </option>
                                          <option value={8105}>Sharjah</option>
                                          <option value={707835}>
                                            Sir Baniyas Island
                                          </option>
                                          <option value={6715}>
                                            Umm Al Quwain
                                          </option>
                                        </select>
                                        <button
                                          type="button"
                                          className="btn dropdown-toggle btn-light bs-placeholder"
                                          data-toggle="dropdown"
                                          aria-owns="bs-select-10"
                                          aria-haspopup="listbox"
                                          aria-expanded="false"
                                          data-id="sel_manual_map_supplier_cities"
                                          title="- Select Supplier Cities -"
                                        >
                                          <div className="filter-option">
                                            <div className="filter-option-inner">
                                              <div className="filter-option-inner-inner">
                                                - Select Supplier Cities -
                                              </div>
                                            </div>{" "}
                                          </div>
                                        </button>
                                        <div className="dropdown-menu ">
                                          <div className="bs-searchbox">
                                            <input
                                              type="search"
                                              className="form-control"
                                              autoComplete="off"
                                              aria-label="Search"
                                              aria-controls="bs-select-10"
                                              aria-autocomplete="list"
                                            />
                                          </div>
                                          <div
                                            className="inner show"
                                            role="listbox"
                                            id="bs-select-10"
                                            tabIndex={-1}
                                          >
                                            <ul
                                              className="dropdown-menu inner show"
                                              role="presentation"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      style={{ cursor: "pointer" }}
                                      id="maplink6"
                                      onclick="showLIST(id,'6','139911')"
                                    >
                                      <span className="manual">Manual Map</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr className="phps_row_1 odd" role="row">
                                  <td>7</td>
                                  <td>United Arab Emirates</td>
                                  <td>Al Sila</td>
                                  <td>
                                    <div
                                      id="list_showdata7"
                                      style={{ display: "none" }}
                                    >
                                      <div className="dropdown bootstrap-select form-control show-menu-arrow">
                                        <select
                                          className="selectpicker form-control show-menu-arrow"
                                          data-container="body"
                                          name="sel_manual_map_supplier_cities[139907]"
                                          data-live-search="true"
                                          id="sel_manual_map_supplier_cities"
                                          tabIndex={-98}
                                        >
                                          <option value>
                                            - Select Supplier Cities -
                                          </option>
                                          <option value="blocked">
                                            Blocked
                                          </option>
                                          <option value={10182}>
                                            Abu Dhabi
                                          </option>
                                          <option value={5563}>Ajman</option>
                                          <option value={9174}>Al Ain</option>
                                          <option value={246425}>
                                            Al Khaznah
                                          </option>
                                          <option value={86190}>
                                            Al Marfa'
                                          </option>
                                          <option value={246505}>
                                            Ar Ruways
                                          </option>
                                          <option value={170210}>Deira</option>
                                          <option value={2994}>Dubai</option>
                                          <option value={4626}>Fujairah</option>
                                          <option value={78727}>Hatta</option>
                                          <option value={19191}>
                                            Jebel Dhanna
                                          </option>
                                          <option value={86195}>Liwa</option>
                                          <option value={12050}>
                                            Ras Al Khaimah
                                          </option>
                                          <option value={8105}>Sharjah</option>
                                          <option value={707835}>
                                            Sir Baniyas Island
                                          </option>
                                          <option value={6715}>
                                            Umm Al Quwain
                                          </option>
                                        </select>
                                        <button
                                          type="button"
                                          className="btn dropdown-toggle btn-light bs-placeholder"
                                          data-toggle="dropdown"
                                          aria-owns="bs-select-11"
                                          aria-haspopup="listbox"
                                          aria-expanded="false"
                                          data-id="sel_manual_map_supplier_cities"
                                          title="- Select Supplier Cities -"
                                        >
                                          <div className="filter-option">
                                            <div className="filter-option-inner">
                                              <div className="filter-option-inner-inner">
                                                - Select Supplier Cities -
                                              </div>
                                            </div>{" "}
                                          </div>
                                        </button>
                                        <div className="dropdown-menu ">
                                          <div className="bs-searchbox">
                                            <input
                                              type="search"
                                              className="form-control"
                                              autoComplete="off"
                                              aria-label="Search"
                                              aria-controls="bs-select-11"
                                              aria-autocomplete="list"
                                            />
                                          </div>
                                          <div
                                            className="inner show"
                                            role="listbox"
                                            id="bs-select-11"
                                            tabIndex={-1}
                                          >
                                            <ul
                                              className="dropdown-menu inner show"
                                              role="presentation"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      style={{ cursor: "pointer" }}
                                      id="maplink7"
                                      onclick="showLIST(id,'7','139907')"
                                    >
                                      <span className="manual">Manual Map</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr className="phps_row_0 even" role="row">
                                  <td>8</td>
                                  <td>United Arab Emirates</td>
                                  <td>Bateen Liwa</td>
                                  <td>
                                    <div
                                      id="list_showdata8"
                                      style={{ display: "none" }}
                                    >
                                      <div className="dropdown bootstrap-select form-control show-menu-arrow">
                                        <select
                                          className="selectpicker form-control show-menu-arrow"
                                          data-container="body"
                                          name="sel_manual_map_supplier_cities[139902]"
                                          data-live-search="true"
                                          id="sel_manual_map_supplier_cities"
                                          tabIndex={-98}
                                        >
                                          <option value>
                                            - Select Supplier Cities -
                                          </option>
                                          <option value="blocked">
                                            Blocked
                                          </option>
                                          <option value={10182}>
                                            Abu Dhabi
                                          </option>
                                          <option value={5563}>Ajman</option>
                                          <option value={9174}>Al Ain</option>
                                          <option value={246425}>
                                            Al Khaznah
                                          </option>
                                          <option value={86190}>
                                            Al Marfa'
                                          </option>
                                          <option value={246505}>
                                            Ar Ruways
                                          </option>
                                          <option value={170210}>Deira</option>
                                          <option value={2994}>Dubai</option>
                                          <option value={4626}>Fujairah</option>
                                          <option value={78727}>Hatta</option>
                                          <option value={19191}>
                                            Jebel Dhanna
                                          </option>
                                          <option value={86195}>Liwa</option>
                                          <option value={12050}>
                                            Ras Al Khaimah
                                          </option>
                                          <option value={8105}>Sharjah</option>
                                          <option value={707835}>
                                            Sir Baniyas Island
                                          </option>
                                          <option value={6715}>
                                            Umm Al Quwain
                                          </option>
                                        </select>
                                        <button
                                          type="button"
                                          className="btn dropdown-toggle btn-light bs-placeholder"
                                          data-toggle="dropdown"
                                          aria-owns="bs-select-12"
                                          aria-haspopup="listbox"
                                          aria-expanded="false"
                                          data-id="sel_manual_map_supplier_cities"
                                          title="- Select Supplier Cities -"
                                        >
                                          <div className="filter-option">
                                            <div className="filter-option-inner">
                                              <div className="filter-option-inner-inner">
                                                - Select Supplier Cities -
                                              </div>
                                            </div>{" "}
                                          </div>
                                        </button>
                                        <div className="dropdown-menu ">
                                          <div className="bs-searchbox">
                                            <input
                                              type="search"
                                              className="form-control"
                                              autoComplete="off"
                                              aria-label="Search"
                                              aria-controls="bs-select-12"
                                              aria-autocomplete="list"
                                            />
                                          </div>
                                          <div
                                            className="inner show"
                                            role="listbox"
                                            id="bs-select-12"
                                            tabIndex={-1}
                                          >
                                            <ul
                                              className="dropdown-menu inner show"
                                              role="presentation"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      style={{ cursor: "pointer" }}
                                      id="maplink8"
                                      onclick="showLIST(id,'8','139902')"
                                    >
                                      <span className="manual">Manual Map</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr className="phps_row_1 odd" role="row">
                                  <td>9</td>
                                  <td>United Arab Emirates</td>
                                  <td>Dalma Island</td>
                                  <td>
                                    <div
                                      id="list_showdata9"
                                      style={{ display: "none" }}
                                    >
                                      <div className="dropdown bootstrap-select form-control show-menu-arrow">
                                        <select
                                          className="selectpicker form-control show-menu-arrow"
                                          data-container="body"
                                          name="sel_manual_map_supplier_cities[139890]"
                                          data-live-search="true"
                                          id="sel_manual_map_supplier_cities"
                                          tabIndex={-98}
                                        >
                                          <option value>
                                            - Select Supplier Cities -
                                          </option>
                                          <option value="blocked">
                                            Blocked
                                          </option>
                                          <option value={10182}>
                                            Abu Dhabi
                                          </option>
                                          <option value={5563}>Ajman</option>
                                          <option value={9174}>Al Ain</option>
                                          <option value={246425}>
                                            Al Khaznah
                                          </option>
                                          <option value={86190}>
                                            Al Marfa'
                                          </option>
                                          <option value={246505}>
                                            Ar Ruways
                                          </option>
                                          <option value={170210}>Deira</option>
                                          <option value={2994}>Dubai</option>
                                          <option value={4626}>Fujairah</option>
                                          <option value={78727}>Hatta</option>
                                          <option value={19191}>
                                            Jebel Dhanna
                                          </option>
                                          <option value={86195}>Liwa</option>
                                          <option value={12050}>
                                            Ras Al Khaimah
                                          </option>
                                          <option value={8105}>Sharjah</option>
                                          <option value={707835}>
                                            Sir Baniyas Island
                                          </option>
                                          <option value={6715}>
                                            Umm Al Quwain
                                          </option>
                                        </select>
                                        <button
                                          type="button"
                                          className="btn dropdown-toggle btn-light bs-placeholder"
                                          data-toggle="dropdown"
                                          aria-owns="bs-select-13"
                                          aria-haspopup="listbox"
                                          aria-expanded="false"
                                          data-id="sel_manual_map_supplier_cities"
                                          title="- Select Supplier Cities -"
                                        >
                                          <div className="filter-option">
                                            <div className="filter-option-inner">
                                              <div className="filter-option-inner-inner">
                                                - Select Supplier Cities -
                                              </div>
                                            </div>{" "}
                                          </div>
                                        </button>
                                        <div className="dropdown-menu ">
                                          <div className="bs-searchbox">
                                            <input
                                              type="search"
                                              className="form-control"
                                              autoComplete="off"
                                              aria-label="Search"
                                              aria-controls="bs-select-13"
                                              aria-autocomplete="list"
                                            />
                                          </div>
                                          <div
                                            className="inner show"
                                            role="listbox"
                                            id="bs-select-13"
                                            tabIndex={-1}
                                          >
                                            <ul
                                              className="dropdown-menu inner show"
                                              role="presentation"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      style={{ cursor: "pointer" }}
                                      id="maplink9"
                                      onclick="showLIST(id,'9','139890')"
                                    >
                                      <span className="manual">Manual Map</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr className="phps_row_0 even" role="row">
                                  <td>10</td>
                                  <td>United Arab Emirates</td>
                                  <td>Dibba Al Hisn</td>
                                  <td>
                                    <div
                                      id="list_showdata10"
                                      style={{ display: "none" }}
                                    >
                                      <div className="dropdown bootstrap-select form-control show-menu-arrow">
                                        <select
                                          className="selectpicker form-control show-menu-arrow"
                                          data-container="body"
                                          name="sel_manual_map_supplier_cities[139893]"
                                          data-live-search="true"
                                          id="sel_manual_map_supplier_cities"
                                          tabIndex={-98}
                                        >
                                          <option value>
                                            - Select Supplier Cities -
                                          </option>
                                          <option value="blocked">
                                            Blocked
                                          </option>
                                          <option value={10182}>
                                            Abu Dhabi
                                          </option>
                                          <option value={5563}>Ajman</option>
                                          <option value={9174}>Al Ain</option>
                                          <option value={246425}>
                                            Al Khaznah
                                          </option>
                                          <option value={86190}>
                                            Al Marfa'
                                          </option>
                                          <option value={246505}>
                                            Ar Ruways
                                          </option>
                                          <option value={170210}>Deira</option>
                                          <option value={2994}>Dubai</option>
                                          <option value={4626}>Fujairah</option>
                                          <option value={78727}>Hatta</option>
                                          <option value={19191}>
                                            Jebel Dhanna
                                          </option>
                                          <option value={86195}>Liwa</option>
                                          <option value={12050}>
                                            Ras Al Khaimah
                                          </option>
                                          <option value={8105}>Sharjah</option>
                                          <option value={707835}>
                                            Sir Baniyas Island
                                          </option>
                                          <option value={6715}>
                                            Umm Al Quwain
                                          </option>
                                        </select>
                                        <button
                                          type="button"
                                          className="btn dropdown-toggle btn-light bs-placeholder"
                                          data-toggle="dropdown"
                                          aria-owns="bs-select-14"
                                          aria-haspopup="listbox"
                                          aria-expanded="false"
                                          data-id="sel_manual_map_supplier_cities"
                                          title="- Select Supplier Cities -"
                                        >
                                          <div className="filter-option">
                                            <div className="filter-option-inner">
                                              <div className="filter-option-inner-inner">
                                                - Select Supplier Cities -
                                              </div>
                                            </div>{" "}
                                          </div>
                                        </button>
                                        <div className="dropdown-menu ">
                                          <div className="bs-searchbox">
                                            <input
                                              type="search"
                                              className="form-control"
                                              autoComplete="off"
                                              aria-label="Search"
                                              aria-controls="bs-select-14"
                                              aria-autocomplete="list"
                                            />
                                          </div>
                                          <div
                                            className="inner show"
                                            role="listbox"
                                            id="bs-select-14"
                                            tabIndex={-1}
                                          >
                                            <ul
                                              className="dropdown-menu inner show"
                                              role="presentation"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      style={{ cursor: "pointer" }}
                                      id="maplink10"
                                      onclick="showLIST(id,'10','139893')"
                                    >
                                      <span className="manual">Manual Map</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr className="phps_row_1 odd" role="row">
                                  <td>11</td>
                                  <td>United Arab Emirates</td>
                                  <td>Falaj Al Mualla</td>
                                  <td>
                                    <div
                                      id="list_showdata11"
                                      style={{ display: "none" }}
                                    >
                                      <div className="dropdown bootstrap-select form-control show-menu-arrow">
                                        <select
                                          className="selectpicker form-control show-menu-arrow"
                                          data-container="body"
                                          name="sel_manual_map_supplier_cities[139894]"
                                          data-live-search="true"
                                          id="sel_manual_map_supplier_cities"
                                          tabIndex={-98}
                                        >
                                          <option value>
                                            - Select Supplier Cities -
                                          </option>
                                          <option value="blocked">
                                            Blocked
                                          </option>
                                          <option value={10182}>
                                            Abu Dhabi
                                          </option>
                                          <option value={5563}>Ajman</option>
                                          <option value={9174}>Al Ain</option>
                                          <option value={246425}>
                                            Al Khaznah
                                          </option>
                                          <option value={86190}>
                                            Al Marfa'
                                          </option>
                                          <option value={246505}>
                                            Ar Ruways
                                          </option>
                                          <option value={170210}>Deira</option>
                                          <option value={2994}>Dubai</option>
                                          <option value={4626}>Fujairah</option>
                                          <option value={78727}>Hatta</option>
                                          <option value={19191}>
                                            Jebel Dhanna
                                          </option>
                                          <option value={86195}>Liwa</option>
                                          <option value={12050}>
                                            Ras Al Khaimah
                                          </option>
                                          <option value={8105}>Sharjah</option>
                                          <option value={707835}>
                                            Sir Baniyas Island
                                          </option>
                                          <option value={6715}>
                                            Umm Al Quwain
                                          </option>
                                        </select>
                                        <button
                                          type="button"
                                          className="btn dropdown-toggle btn-light bs-placeholder"
                                          data-toggle="dropdown"
                                          aria-owns="bs-select-15"
                                          aria-haspopup="listbox"
                                          aria-expanded="false"
                                          data-id="sel_manual_map_supplier_cities"
                                          title="- Select Supplier Cities -"
                                        >
                                          <div className="filter-option">
                                            <div className="filter-option-inner">
                                              <div className="filter-option-inner-inner">
                                                - Select Supplier Cities -
                                              </div>
                                            </div>{" "}
                                          </div>
                                        </button>
                                        <div className="dropdown-menu ">
                                          <div className="bs-searchbox">
                                            <input
                                              type="search"
                                              className="form-control"
                                              autoComplete="off"
                                              aria-label="Search"
                                              aria-controls="bs-select-15"
                                              aria-autocomplete="list"
                                            />
                                          </div>
                                          <div
                                            className="inner show"
                                            role="listbox"
                                            id="bs-select-15"
                                            tabIndex={-1}
                                          >
                                            <ul
                                              className="dropdown-menu inner show"
                                              role="presentation"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      style={{ cursor: "pointer" }}
                                      id="maplink11"
                                      onclick="showLIST(id,'11','139894')"
                                    >
                                      <span className="manual">Manual Map</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr className="phps_row_0 even" role="row">
                                  <td>12</td>
                                  <td>United Arab Emirates</td>
                                  <td>Ghalilah</td>
                                  <td>
                                    <div
                                      id="list_showdata12"
                                      style={{ display: "none" }}
                                    >
                                      <div className="dropdown bootstrap-select form-control show-menu-arrow">
                                        <select
                                          className="selectpicker form-control show-menu-arrow"
                                          data-container="body"
                                          name="sel_manual_map_supplier_cities[139895]"
                                          data-live-search="true"
                                          id="sel_manual_map_supplier_cities"
                                          tabIndex={-98}
                                        >
                                          <option value>
                                            - Select Supplier Cities -
                                          </option>
                                          <option value="blocked">
                                            Blocked
                                          </option>
                                          <option value={10182}>
                                            Abu Dhabi
                                          </option>
                                          <option value={5563}>Ajman</option>
                                          <option value={9174}>Al Ain</option>
                                          <option value={246425}>
                                            Al Khaznah
                                          </option>
                                          <option value={86190}>
                                            Al Marfa'
                                          </option>
                                          <option value={246505}>
                                            Ar Ruways
                                          </option>
                                          <option value={170210}>Deira</option>
                                          <option value={2994}>Dubai</option>
                                          <option value={4626}>Fujairah</option>
                                          <option value={78727}>Hatta</option>
                                          <option value={19191}>
                                            Jebel Dhanna
                                          </option>
                                          <option value={86195}>Liwa</option>
                                          <option value={12050}>
                                            Ras Al Khaimah
                                          </option>
                                          <option value={8105}>Sharjah</option>
                                          <option value={707835}>
                                            Sir Baniyas Island
                                          </option>
                                          <option value={6715}>
                                            Umm Al Quwain
                                          </option>
                                        </select>
                                        <button
                                          type="button"
                                          className="btn dropdown-toggle btn-light bs-placeholder"
                                          data-toggle="dropdown"
                                          aria-owns="bs-select-16"
                                          aria-haspopup="listbox"
                                          aria-expanded="false"
                                          data-id="sel_manual_map_supplier_cities"
                                          title="- Select Supplier Cities -"
                                        >
                                          <div className="filter-option">
                                            <div className="filter-option-inner">
                                              <div className="filter-option-inner-inner">
                                                - Select Supplier Cities -
                                              </div>
                                            </div>{" "}
                                          </div>
                                        </button>
                                        <div className="dropdown-menu ">
                                          <div className="bs-searchbox">
                                            <input
                                              type="search"
                                              className="form-control"
                                              autoComplete="off"
                                              aria-label="Search"
                                              aria-controls="bs-select-16"
                                              aria-autocomplete="list"
                                            />
                                          </div>
                                          <div
                                            className="inner show"
                                            role="listbox"
                                            id="bs-select-16"
                                            tabIndex={-1}
                                          >
                                            <ul
                                              className="dropdown-menu inner show"
                                              role="presentation"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      style={{ cursor: "pointer" }}
                                      id="maplink12"
                                      onclick="showLIST(id,'12','139895')"
                                    >
                                      <span className="manual">Manual Map</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr className="phps_row_1 odd" role="row">
                                  <td>13</td>
                                  <td>United Arab Emirates</td>
                                  <td>Huwaylat</td>
                                  <td>
                                    <div
                                      id="list_showdata13"
                                      style={{ display: "none" }}
                                    >
                                      <div className="dropdown bootstrap-select form-control show-menu-arrow">
                                        <select
                                          className="selectpicker form-control show-menu-arrow"
                                          data-container="body"
                                          name="sel_manual_map_supplier_cities[139898]"
                                          data-live-search="true"
                                          id="sel_manual_map_supplier_cities"
                                          tabIndex={-98}
                                        >
                                          <option value>
                                            - Select Supplier Cities -
                                          </option>
                                          <option value="blocked">
                                            Blocked
                                          </option>
                                          <option value={10182}>
                                            Abu Dhabi
                                          </option>
                                          <option value={5563}>Ajman</option>
                                          <option value={9174}>Al Ain</option>
                                          <option value={246425}>
                                            Al Khaznah
                                          </option>
                                          <option value={86190}>
                                            Al Marfa'
                                          </option>
                                          <option value={246505}>
                                            Ar Ruways
                                          </option>
                                          <option value={170210}>Deira</option>
                                          <option value={2994}>Dubai</option>
                                          <option value={4626}>Fujairah</option>
                                          <option value={78727}>Hatta</option>
                                          <option value={19191}>
                                            Jebel Dhanna
                                          </option>
                                          <option value={86195}>Liwa</option>
                                          <option value={12050}>
                                            Ras Al Khaimah
                                          </option>
                                          <option value={8105}>Sharjah</option>
                                          <option value={707835}>
                                            Sir Baniyas Island
                                          </option>
                                          <option value={6715}>
                                            Umm Al Quwain
                                          </option>
                                        </select>
                                        <button
                                          type="button"
                                          className="btn dropdown-toggle btn-light bs-placeholder"
                                          data-toggle="dropdown"
                                          aria-owns="bs-select-17"
                                          aria-haspopup="listbox"
                                          aria-expanded="false"
                                          data-id="sel_manual_map_supplier_cities"
                                          title="- Select Supplier Cities -"
                                        >
                                          <div className="filter-option">
                                            <div className="filter-option-inner">
                                              <div className="filter-option-inner-inner">
                                                - Select Supplier Cities -
                                              </div>
                                            </div>{" "}
                                          </div>
                                        </button>
                                        <div className="dropdown-menu ">
                                          <div className="bs-searchbox">
                                            <input
                                              type="search"
                                              className="form-control"
                                              autoComplete="off"
                                              aria-label="Search"
                                              aria-controls="bs-select-17"
                                              aria-autocomplete="list"
                                            />
                                          </div>
                                          <div
                                            className="inner show"
                                            role="listbox"
                                            id="bs-select-17"
                                            tabIndex={-1}
                                          >
                                            <ul
                                              className="dropdown-menu inner show"
                                              role="presentation"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      style={{ cursor: "pointer" }}
                                      id="maplink13"
                                      onclick="showLIST(id,'13','139898')"
                                    >
                                      <span className="manual">Manual Map</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr className="phps_row_0 even" role="row">
                                  <td>14</td>
                                  <td>United Arab Emirates</td>
                                  <td>Khatt</td>
                                  <td>
                                    <div
                                      id="list_showdata14"
                                      style={{ display: "none" }}
                                    >
                                      <div className="dropdown bootstrap-select form-control show-menu-arrow">
                                        <select
                                          className="selectpicker form-control show-menu-arrow"
                                          data-container="body"
                                          name="sel_manual_map_supplier_cities[139900]"
                                          data-live-search="true"
                                          id="sel_manual_map_supplier_cities"
                                          tabIndex={-98}
                                        >
                                          <option value>
                                            - Select Supplier Cities -
                                          </option>
                                          <option value="blocked">
                                            Blocked
                                          </option>
                                          <option value={10182}>
                                            Abu Dhabi
                                          </option>
                                          <option value={5563}>Ajman</option>
                                          <option value={9174}>Al Ain</option>
                                          <option value={246425}>
                                            Al Khaznah
                                          </option>
                                          <option value={86190}>
                                            Al Marfa'
                                          </option>
                                          <option value={246505}>
                                            Ar Ruways
                                          </option>
                                          <option value={170210}>Deira</option>
                                          <option value={2994}>Dubai</option>
                                          <option value={4626}>Fujairah</option>
                                          <option value={78727}>Hatta</option>
                                          <option value={19191}>
                                            Jebel Dhanna
                                          </option>
                                          <option value={86195}>Liwa</option>
                                          <option value={12050}>
                                            Ras Al Khaimah
                                          </option>
                                          <option value={8105}>Sharjah</option>
                                          <option value={707835}>
                                            Sir Baniyas Island
                                          </option>
                                          <option value={6715}>
                                            Umm Al Quwain
                                          </option>
                                        </select>
                                        <button
                                          type="button"
                                          className="btn dropdown-toggle btn-light bs-placeholder"
                                          data-toggle="dropdown"
                                          aria-owns="bs-select-18"
                                          aria-haspopup="listbox"
                                          aria-expanded="false"
                                          data-id="sel_manual_map_supplier_cities"
                                          title="- Select Supplier Cities -"
                                        >
                                          <div className="filter-option">
                                            <div className="filter-option-inner">
                                              <div className="filter-option-inner-inner">
                                                - Select Supplier Cities -
                                              </div>
                                            </div>{" "}
                                          </div>
                                        </button>
                                        <div className="dropdown-menu ">
                                          <div className="bs-searchbox">
                                            <input
                                              type="search"
                                              className="form-control"
                                              autoComplete="off"
                                              aria-label="Search"
                                              aria-controls="bs-select-18"
                                              aria-autocomplete="list"
                                            />
                                          </div>
                                          <div
                                            className="inner show"
                                            role="listbox"
                                            id="bs-select-18"
                                            tabIndex={-1}
                                          >
                                            <ul
                                              className="dropdown-menu inner show"
                                              role="presentation"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      style={{ cursor: "pointer" }}
                                      id="maplink14"
                                      onclick="showLIST(id,'14','139900')"
                                    >
                                      <span className="manual">Manual Map</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr className="phps_row_1 odd" role="row">
                                  <td>15</td>
                                  <td>United Arab Emirates</td>
                                  <td>Khor fakkan</td>
                                  <td>
                                    <div
                                      id="list_showdata15"
                                      style={{ display: "none" }}
                                    >
                                      <div className="dropdown bootstrap-select form-control show-menu-arrow">
                                        <select
                                          className="selectpicker form-control show-menu-arrow"
                                          data-container="body"
                                          name="sel_manual_map_supplier_cities[77672]"
                                          data-live-search="true"
                                          id="sel_manual_map_supplier_cities"
                                          tabIndex={-98}
                                        >
                                          <option value>
                                            - Select Supplier Cities -
                                          </option>
                                          <option value="blocked">
                                            Blocked
                                          </option>
                                          <option value={10182}>
                                            Abu Dhabi
                                          </option>
                                          <option value={5563}>Ajman</option>
                                          <option value={9174}>Al Ain</option>
                                          <option value={246425}>
                                            Al Khaznah
                                          </option>
                                          <option value={86190}>
                                            Al Marfa'
                                          </option>
                                          <option value={246505}>
                                            Ar Ruways
                                          </option>
                                          <option value={170210}>Deira</option>
                                          <option value={2994}>Dubai</option>
                                          <option value={4626}>Fujairah</option>
                                          <option value={78727}>Hatta</option>
                                          <option value={19191}>
                                            Jebel Dhanna
                                          </option>
                                          <option value={86195}>Liwa</option>
                                          <option value={12050}>
                                            Ras Al Khaimah
                                          </option>
                                          <option value={8105}>Sharjah</option>
                                          <option value={707835}>
                                            Sir Baniyas Island
                                          </option>
                                          <option value={6715}>
                                            Umm Al Quwain
                                          </option>
                                        </select>
                                        <button
                                          type="button"
                                          className="btn dropdown-toggle btn-light bs-placeholder"
                                          data-toggle="dropdown"
                                          aria-owns="bs-select-19"
                                          aria-haspopup="listbox"
                                          aria-expanded="false"
                                          data-id="sel_manual_map_supplier_cities"
                                          title="- Select Supplier Cities -"
                                        >
                                          <div className="filter-option">
                                            <div className="filter-option-inner">
                                              <div className="filter-option-inner-inner">
                                                - Select Supplier Cities -
                                              </div>
                                            </div>{" "}
                                          </div>
                                        </button>
                                        <div className="dropdown-menu ">
                                          <div className="bs-searchbox">
                                            <input
                                              type="search"
                                              className="form-control"
                                              autoComplete="off"
                                              aria-label="Search"
                                              aria-controls="bs-select-19"
                                              aria-autocomplete="list"
                                            />
                                          </div>
                                          <div
                                            className="inner show"
                                            role="listbox"
                                            id="bs-select-19"
                                            tabIndex={-1}
                                          >
                                            <ul
                                              className="dropdown-menu inner show"
                                              role="presentation"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      style={{ cursor: "pointer" }}
                                      id="maplink15"
                                      onclick="showLIST(id,'15','77672')"
                                    >
                                      <span className="manual">Manual Map</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr className="phps_row_0 even" role="row">
                                  <td>16</td>
                                  <td>United Arab Emirates</td>
                                  <td>Lahbab</td>
                                  <td>
                                    <div
                                      id="list_showdata16"
                                      style={{ display: "none" }}
                                    >
                                      <div className="dropdown bootstrap-select form-control show-menu-arrow">
                                        <select
                                          className="selectpicker form-control show-menu-arrow"
                                          data-container="body"
                                          name="sel_manual_map_supplier_cities[139901]"
                                          data-live-search="true"
                                          id="sel_manual_map_supplier_cities"
                                          tabIndex={-98}
                                        >
                                          <option value>
                                            - Select Supplier Cities -
                                          </option>
                                          <option value="blocked">
                                            Blocked
                                          </option>
                                          <option value={10182}>
                                            Abu Dhabi
                                          </option>
                                          <option value={5563}>Ajman</option>
                                          <option value={9174}>Al Ain</option>
                                          <option value={246425}>
                                            Al Khaznah
                                          </option>
                                          <option value={86190}>
                                            Al Marfa'
                                          </option>
                                          <option value={246505}>
                                            Ar Ruways
                                          </option>
                                          <option value={170210}>Deira</option>
                                          <option value={2994}>Dubai</option>
                                          <option value={4626}>Fujairah</option>
                                          <option value={78727}>Hatta</option>
                                          <option value={19191}>
                                            Jebel Dhanna
                                          </option>
                                          <option value={86195}>Liwa</option>
                                          <option value={12050}>
                                            Ras Al Khaimah
                                          </option>
                                          <option value={8105}>Sharjah</option>
                                          <option value={707835}>
                                            Sir Baniyas Island
                                          </option>
                                          <option value={6715}>
                                            Umm Al Quwain
                                          </option>
                                        </select>
                                        <button
                                          type="button"
                                          className="btn dropdown-toggle btn-light bs-placeholder"
                                          data-toggle="dropdown"
                                          aria-owns="bs-select-20"
                                          aria-haspopup="listbox"
                                          aria-expanded="false"
                                          data-id="sel_manual_map_supplier_cities"
                                          title="- Select Supplier Cities -"
                                        >
                                          <div className="filter-option">
                                            <div className="filter-option-inner">
                                              <div className="filter-option-inner-inner">
                                                - Select Supplier Cities -
                                              </div>
                                            </div>{" "}
                                          </div>
                                        </button>
                                        <div className="dropdown-menu ">
                                          <div className="bs-searchbox">
                                            <input
                                              type="search"
                                              className="form-control"
                                              autoComplete="off"
                                              aria-label="Search"
                                              aria-controls="bs-select-20"
                                              aria-autocomplete="list"
                                            />
                                          </div>
                                          <div
                                            className="inner show"
                                            role="listbox"
                                            id="bs-select-20"
                                            tabIndex={-1}
                                          >
                                            <ul
                                              className="dropdown-menu inner show"
                                              role="presentation"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      style={{ cursor: "pointer" }}
                                      id="maplink16"
                                      onclick="showLIST(id,'16','139901')"
                                    >
                                      <span className="manual">Manual Map</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr className="phps_row_1 odd" role="row">
                                  <td>17</td>
                                  <td>United Arab Emirates</td>
                                  <td>Maleha</td>
                                  <td>
                                    <div
                                      id="list_showdata17"
                                      style={{ display: "none" }}
                                    >
                                      <div className="dropdown bootstrap-select form-control show-menu-arrow">
                                        <select
                                          className="selectpicker form-control show-menu-arrow"
                                          data-container="body"
                                          name="sel_manual_map_supplier_cities[139904]"
                                          data-live-search="true"
                                          id="sel_manual_map_supplier_cities"
                                          tabIndex={-98}
                                        >
                                          <option value>
                                            - Select Supplier Cities -
                                          </option>
                                          <option value="blocked">
                                            Blocked
                                          </option>
                                          <option value={10182}>
                                            Abu Dhabi
                                          </option>
                                          <option value={5563}>Ajman</option>
                                          <option value={9174}>Al Ain</option>
                                          <option value={246425}>
                                            Al Khaznah
                                          </option>
                                          <option value={86190}>
                                            Al Marfa'
                                          </option>
                                          <option value={246505}>
                                            Ar Ruways
                                          </option>
                                          <option value={170210}>Deira</option>
                                          <option value={2994}>Dubai</option>
                                          <option value={4626}>Fujairah</option>
                                          <option value={78727}>Hatta</option>
                                          <option value={19191}>
                                            Jebel Dhanna
                                          </option>
                                          <option value={86195}>Liwa</option>
                                          <option value={12050}>
                                            Ras Al Khaimah
                                          </option>
                                          <option value={8105}>Sharjah</option>
                                          <option value={707835}>
                                            Sir Baniyas Island
                                          </option>
                                          <option value={6715}>
                                            Umm Al Quwain
                                          </option>
                                        </select>
                                        <button
                                          type="button"
                                          className="btn dropdown-toggle btn-light bs-placeholder"
                                          data-toggle="dropdown"
                                          aria-owns="bs-select-21"
                                          aria-haspopup="listbox"
                                          aria-expanded="false"
                                          data-id="sel_manual_map_supplier_cities"
                                          title="- Select Supplier Cities -"
                                        >
                                          <div className="filter-option">
                                            <div className="filter-option-inner">
                                              <div className="filter-option-inner-inner">
                                                - Select Supplier Cities -
                                              </div>
                                            </div>{" "}
                                          </div>
                                        </button>
                                        <div className="dropdown-menu ">
                                          <div className="bs-searchbox">
                                            <input
                                              type="search"
                                              className="form-control"
                                              autoComplete="off"
                                              aria-label="Search"
                                              aria-controls="bs-select-21"
                                              aria-autocomplete="list"
                                            />
                                          </div>
                                          <div
                                            className="inner show"
                                            role="listbox"
                                            id="bs-select-21"
                                            tabIndex={-1}
                                          >
                                            <ul
                                              className="dropdown-menu inner show"
                                              role="presentation"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      style={{ cursor: "pointer" }}
                                      id="maplink17"
                                      onclick="showLIST(id,'17','139904')"
                                    >
                                      <span className="manual">Manual Map</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr className="phps_row_0 even" role="row">
                                  <td>18</td>
                                  <td>United Arab Emirates</td>
                                  <td>Masafi</td>
                                  <td>
                                    <div
                                      id="list_showdata18"
                                      style={{ display: "none" }}
                                    >
                                      <div className="dropdown bootstrap-select form-control show-menu-arrow">
                                        <select
                                          className="selectpicker form-control show-menu-arrow"
                                          data-container="body"
                                          name="sel_manual_map_supplier_cities[139903]"
                                          data-live-search="true"
                                          id="sel_manual_map_supplier_cities"
                                          tabIndex={-98}
                                        >
                                          <option value>
                                            - Select Supplier Cities -
                                          </option>
                                          <option value="blocked">
                                            Blocked
                                          </option>
                                          <option value={10182}>
                                            Abu Dhabi
                                          </option>
                                          <option value={5563}>Ajman</option>
                                          <option value={9174}>Al Ain</option>
                                          <option value={246425}>
                                            Al Khaznah
                                          </option>
                                          <option value={86190}>
                                            Al Marfa'
                                          </option>
                                          <option value={246505}>
                                            Ar Ruways
                                          </option>
                                          <option value={170210}>Deira</option>
                                          <option value={2994}>Dubai</option>
                                          <option value={4626}>Fujairah</option>
                                          <option value={78727}>Hatta</option>
                                          <option value={19191}>
                                            Jebel Dhanna
                                          </option>
                                          <option value={86195}>Liwa</option>
                                          <option value={12050}>
                                            Ras Al Khaimah
                                          </option>
                                          <option value={8105}>Sharjah</option>
                                          <option value={707835}>
                                            Sir Baniyas Island
                                          </option>
                                          <option value={6715}>
                                            Umm Al Quwain
                                          </option>
                                        </select>
                                        <button
                                          type="button"
                                          className="btn dropdown-toggle btn-light bs-placeholder"
                                          data-toggle="dropdown"
                                          aria-owns="bs-select-22"
                                          aria-haspopup="listbox"
                                          aria-expanded="false"
                                          data-id="sel_manual_map_supplier_cities"
                                          title="- Select Supplier Cities -"
                                        >
                                          <div className="filter-option">
                                            <div className="filter-option-inner">
                                              <div className="filter-option-inner-inner">
                                                - Select Supplier Cities -
                                              </div>
                                            </div>{" "}
                                          </div>
                                        </button>
                                        <div className="dropdown-menu ">
                                          <div className="bs-searchbox">
                                            <input
                                              type="search"
                                              className="form-control"
                                              autoComplete="off"
                                              aria-label="Search"
                                              aria-controls="bs-select-22"
                                              aria-autocomplete="list"
                                            />
                                          </div>
                                          <div
                                            className="inner show"
                                            role="listbox"
                                            id="bs-select-22"
                                            tabIndex={-1}
                                          >
                                            <ul
                                              className="dropdown-menu inner show"
                                              role="presentation"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      style={{ cursor: "pointer" }}
                                      id="maplink18"
                                      onclick="showLIST(id,'18','139903')"
                                    >
                                      <span className="manual">Manual Map</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr className="phps_row_1 odd" role="row">
                                  <td>19</td>
                                  <td>United Arab Emirates</td>
                                  <td>Nahil</td>
                                  <td>
                                    <div
                                      id="list_showdata19"
                                      style={{ display: "none" }}
                                    >
                                      <div className="dropdown bootstrap-select form-control show-menu-arrow">
                                        <select
                                          className="selectpicker form-control show-menu-arrow"
                                          data-container="body"
                                          name="sel_manual_map_supplier_cities[139905]"
                                          data-live-search="true"
                                          id="sel_manual_map_supplier_cities"
                                          tabIndex={-98}
                                        >
                                          <option value>
                                            - Select Supplier Cities -
                                          </option>
                                          <option value="blocked">
                                            Blocked
                                          </option>
                                          <option value={10182}>
                                            Abu Dhabi
                                          </option>
                                          <option value={5563}>Ajman</option>
                                          <option value={9174}>Al Ain</option>
                                          <option value={246425}>
                                            Al Khaznah
                                          </option>
                                          <option value={86190}>
                                            Al Marfa'
                                          </option>
                                          <option value={246505}>
                                            Ar Ruways
                                          </option>
                                          <option value={170210}>Deira</option>
                                          <option value={2994}>Dubai</option>
                                          <option value={4626}>Fujairah</option>
                                          <option value={78727}>Hatta</option>
                                          <option value={19191}>
                                            Jebel Dhanna
                                          </option>
                                          <option value={86195}>Liwa</option>
                                          <option value={12050}>
                                            Ras Al Khaimah
                                          </option>
                                          <option value={8105}>Sharjah</option>
                                          <option value={707835}>
                                            Sir Baniyas Island
                                          </option>
                                          <option value={6715}>
                                            Umm Al Quwain
                                          </option>
                                        </select>
                                        <button
                                          type="button"
                                          className="btn dropdown-toggle btn-light bs-placeholder"
                                          data-toggle="dropdown"
                                          aria-owns="bs-select-23"
                                          aria-haspopup="listbox"
                                          aria-expanded="false"
                                          data-id="sel_manual_map_supplier_cities"
                                          title="- Select Supplier Cities -"
                                        >
                                          <div className="filter-option">
                                            <div className="filter-option-inner">
                                              <div className="filter-option-inner-inner">
                                                - Select Supplier Cities -
                                              </div>
                                            </div>{" "}
                                          </div>
                                        </button>
                                        <div className="dropdown-menu ">
                                          <div className="bs-searchbox">
                                            <input
                                              type="search"
                                              className="form-control"
                                              autoComplete="off"
                                              aria-label="Search"
                                              aria-controls="bs-select-23"
                                              aria-autocomplete="list"
                                            />
                                          </div>
                                          <div
                                            className="inner show"
                                            role="listbox"
                                            id="bs-select-23"
                                            tabIndex={-1}
                                          >
                                            <ul
                                              className="dropdown-menu inner show"
                                              role="presentation"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      style={{ cursor: "pointer" }}
                                      id="maplink19"
                                      onclick="showLIST(id,'19','139905')"
                                    >
                                      <span className="manual">Manual Map</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr className="phps_row_0 even" role="row">
                                  <td>20</td>
                                  <td>United Arab Emirates</td>
                                  <td>Shaam</td>
                                  <td>
                                    <div
                                      id="list_showdata20"
                                      style={{ display: "none" }}
                                    >
                                      <div className="dropdown bootstrap-select form-control show-menu-arrow">
                                        <select
                                          className="selectpicker form-control show-menu-arrow"
                                          data-container="body"
                                          name="sel_manual_map_supplier_cities[139906]"
                                          data-live-search="true"
                                          id="sel_manual_map_supplier_cities"
                                          tabIndex={-98}
                                        >
                                          <option value>
                                            - Select Supplier Cities -
                                          </option>
                                          <option value="blocked">
                                            Blocked
                                          </option>
                                          <option value={10182}>
                                            Abu Dhabi
                                          </option>
                                          <option value={5563}>Ajman</option>
                                          <option value={9174}>Al Ain</option>
                                          <option value={246425}>
                                            Al Khaznah
                                          </option>
                                          <option value={86190}>
                                            Al Marfa'
                                          </option>
                                          <option value={246505}>
                                            Ar Ruways
                                          </option>
                                          <option value={170210}>Deira</option>
                                          <option value={2994}>Dubai</option>
                                          <option value={4626}>Fujairah</option>
                                          <option value={78727}>Hatta</option>
                                          <option value={19191}>
                                            Jebel Dhanna
                                          </option>
                                          <option value={86195}>Liwa</option>
                                          <option value={12050}>
                                            Ras Al Khaimah
                                          </option>
                                          <option value={8105}>Sharjah</option>
                                          <option value={707835}>
                                            Sir Baniyas Island
                                          </option>
                                          <option value={6715}>
                                            Umm Al Quwain
                                          </option>
                                        </select>
                                        <button
                                          type="button"
                                          className="btn dropdown-toggle btn-light bs-placeholder"
                                          data-toggle="dropdown"
                                          aria-owns="bs-select-24"
                                          aria-haspopup="listbox"
                                          aria-expanded="false"
                                          data-id="sel_manual_map_supplier_cities"
                                          title="- Select Supplier Cities -"
                                        >
                                          <div className="filter-option">
                                            <div className="filter-option-inner">
                                              <div className="filter-option-inner-inner">
                                                - Select Supplier Cities -
                                              </div>
                                            </div>{" "}
                                          </div>
                                        </button>
                                        <div className="dropdown-menu ">
                                          <div className="bs-searchbox">
                                            <input
                                              type="search"
                                              className="form-control"
                                              autoComplete="off"
                                              aria-label="Search"
                                              aria-controls="bs-select-24"
                                              aria-autocomplete="list"
                                            />
                                          </div>
                                          <div
                                            className="inner show"
                                            role="listbox"
                                            id="bs-select-24"
                                            tabIndex={-1}
                                          >
                                            <ul
                                              className="dropdown-menu inner show"
                                              role="presentation"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      style={{ cursor: "pointer" }}
                                      id="maplink20"
                                      onclick="showLIST(id,'20','139906')"
                                    >
                                      <span className="manual">Manual Map</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr className="phps_row_1 odd" role="row">
                                  <td>21</td>
                                  <td>United Arab Emirates</td>
                                  <td>Sweihan</td>
                                  <td>
                                    <div
                                      id="list_showdata21"
                                      style={{ display: "none" }}
                                    >
                                      <div className="dropdown bootstrap-select form-control show-menu-arrow">
                                        <select
                                          className="selectpicker form-control show-menu-arrow"
                                          data-container="body"
                                          name="sel_manual_map_supplier_cities[139908]"
                                          data-live-search="true"
                                          id="sel_manual_map_supplier_cities"
                                          tabIndex={-98}
                                        >
                                          <option value>
                                            - Select Supplier Cities -
                                          </option>
                                          <option value="blocked">
                                            Blocked
                                          </option>
                                          <option value={10182}>
                                            Abu Dhabi
                                          </option>
                                          <option value={5563}>Ajman</option>
                                          <option value={9174}>Al Ain</option>
                                          <option value={246425}>
                                            Al Khaznah
                                          </option>
                                          <option value={86190}>
                                            Al Marfa'
                                          </option>
                                          <option value={246505}>
                                            Ar Ruways
                                          </option>
                                          <option value={170210}>Deira</option>
                                          <option value={2994}>Dubai</option>
                                          <option value={4626}>Fujairah</option>
                                          <option value={78727}>Hatta</option>
                                          <option value={19191}>
                                            Jebel Dhanna
                                          </option>
                                          <option value={86195}>Liwa</option>
                                          <option value={12050}>
                                            Ras Al Khaimah
                                          </option>
                                          <option value={8105}>Sharjah</option>
                                          <option value={707835}>
                                            Sir Baniyas Island
                                          </option>
                                          <option value={6715}>
                                            Umm Al Quwain
                                          </option>
                                        </select>
                                        <button
                                          type="button"
                                          className="btn dropdown-toggle btn-light bs-placeholder"
                                          data-toggle="dropdown"
                                          aria-owns="bs-select-25"
                                          aria-haspopup="listbox"
                                          aria-expanded="false"
                                          data-id="sel_manual_map_supplier_cities"
                                          title="- Select Supplier Cities -"
                                        >
                                          <div className="filter-option">
                                            <div className="filter-option-inner">
                                              <div className="filter-option-inner-inner">
                                                - Select Supplier Cities -
                                              </div>
                                            </div>{" "}
                                          </div>
                                        </button>
                                        <div className="dropdown-menu ">
                                          <div className="bs-searchbox">
                                            <input
                                              type="search"
                                              className="form-control"
                                              autoComplete="off"
                                              aria-label="Search"
                                              aria-controls="bs-select-25"
                                              aria-autocomplete="list"
                                            />
                                          </div>
                                          <div
                                            className="inner show"
                                            role="listbox"
                                            id="bs-select-25"
                                            tabIndex={-1}
                                          >
                                            <ul
                                              className="dropdown-menu inner show"
                                              role="presentation"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      style={{ cursor: "pointer" }}
                                      id="maplink21"
                                      onclick="showLIST(id,'21','139908')"
                                    >
                                      <span className="manual">Manual Map</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr className="phps_row_0 even" role="row">
                                  <td>22</td>
                                  <td>United Arab Emirates</td>
                                  <td>Zubara</td>
                                  <td>
                                    <div
                                      id="list_showdata22"
                                      style={{ display: "none" }}
                                    >
                                      <div className="dropdown bootstrap-select form-control show-menu-arrow">
                                        <select
                                          className="selectpicker form-control show-menu-arrow"
                                          data-container="body"
                                          name="sel_manual_map_supplier_cities[139909]"
                                          data-live-search="true"
                                          id="sel_manual_map_supplier_cities"
                                          tabIndex={-98}
                                        >
                                          <option value>
                                            - Select Supplier Cities -
                                          </option>
                                          <option value="blocked">
                                            Blocked
                                          </option>
                                          <option value={10182}>
                                            Abu Dhabi
                                          </option>
                                          <option value={5563}>Ajman</option>
                                          <option value={9174}>Al Ain</option>
                                          <option value={246425}>
                                            Al Khaznah
                                          </option>
                                          <option value={86190}>
                                            Al Marfa'
                                          </option>
                                          <option value={246505}>
                                            Ar Ruways
                                          </option>
                                          <option value={170210}>Deira</option>
                                          <option value={2994}>Dubai</option>
                                          <option value={4626}>Fujairah</option>
                                          <option value={78727}>Hatta</option>
                                          <option value={19191}>
                                            Jebel Dhanna
                                          </option>
                                          <option value={86195}>Liwa</option>
                                          <option value={12050}>
                                            Ras Al Khaimah
                                          </option>
                                          <option value={8105}>Sharjah</option>
                                          <option value={707835}>
                                            Sir Baniyas Island
                                          </option>
                                          <option value={6715}>
                                            Umm Al Quwain
                                          </option>
                                        </select>
                                        <button
                                          type="button"
                                          className="btn dropdown-toggle btn-light bs-placeholder"
                                          data-toggle="dropdown"
                                          aria-owns="bs-select-26"
                                          aria-haspopup="listbox"
                                          aria-expanded="false"
                                          data-id="sel_manual_map_supplier_cities"
                                          title="- Select Supplier Cities -"
                                        >
                                          <div className="filter-option">
                                            <div className="filter-option-inner">
                                              <div className="filter-option-inner-inner">
                                                - Select Supplier Cities -
                                              </div>
                                            </div>{" "}
                                          </div>
                                        </button>
                                        <div className="dropdown-menu ">
                                          <div className="bs-searchbox">
                                            <input
                                              type="search"
                                              className="form-control"
                                              autoComplete="off"
                                              aria-label="Search"
                                              aria-controls="bs-select-26"
                                              aria-autocomplete="list"
                                            />
                                          </div>
                                          <div
                                            className="inner show"
                                            role="listbox"
                                            id="bs-select-26"
                                            tabIndex={-1}
                                          >
                                            <ul
                                              className="dropdown-menu inner show"
                                              role="presentation"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      style={{ cursor: "pointer" }}
                                      id="maplink22"
                                      onclick="showLIST(id,'22','139909')"
                                    >
                                      <span className="manual">Manual Map</span>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*  
                              <br />
                              <button type="button" class="btn btn-primary" value="Mapped Cities" onclick="mapp_supplier_cities();"><h6><i class="fa fa-floppy-o"></i>&nbsp;Save</h6></button>
                               */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default CitiesAutoShow;
