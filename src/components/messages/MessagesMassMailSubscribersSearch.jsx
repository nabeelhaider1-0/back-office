import { Link } from "react-router-dom";

import React, { useEffect, useState } from "react";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";
import MultiSelect from "../reactMultiSelect";
import { selSubscribersOptions } from "../../constants/contants";
import { citiesByCountry, countries } from "../../constants/Country-City-Data";

const MessagesMassMailSubscribersSearch = () => {
  useEffect(() => {
    const selectAllCheckbox = document.getElementById("email");

    const handleSelectAllClick = () => {
      const checkboxes = document.querySelectorAll(".select-option");
      checkboxes.forEach((checkbox) => {
        checkbox.checked = selectAllCheckbox.checked;
      });
    };

    // Add the click event listener to the "Select All" checkbox
    if (selectAllCheckbox) {
      selectAllCheckbox.addEventListener("click", handleSelectAllClick);
    }

    // Clean up the event listener when the component unmounts
    return () => {
      if (selectAllCheckbox) {
        selectAllCheckbox.removeEventListener("click", handleSelectAllClick);
      }
      // Remove any other event listeners or clean up logic if needed
    };
  }, []); // Empty dependency array ensures that this effect runs only once when the component mounts

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
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <Header2
          title="SUBSCRIBER SEARCH CRITERIA"
          linkText1="List Subscriber"
          linkText2="Add Subscriber"
          link2={Constants.URLConstants.MESSAGESMASSMAILSUBSCRIBERNEW}
        />

        <div>
          <form>
            <div className="panel-body">
              <div className="row">
                <div className="col-md-3 form-group">
                  <label>Subscribers</label>
                  <MultiSelect
                    options={selSubscribersOptions}
                    isSearchable
                    placeholder="- Select Branch -"
                    noOptionsMessage={() => "No Branch Found"}
                    className="custom-select required"
                  />
                </div>
                <div className="col-md-3 form-group">
                  <label>Email</label>
                  <input
                    type="text"
                    className="required form-control form-control-sm "
                    name="txt_email"
                    size={45}
                    maxLength={255}
                    tabIndex={1}
                  />
                </div>
                <div className="col-md-3 form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    className="required form-control form-control-sm "
                    name="txt_name"
                    size={45}
                    maxLength={255}
                    tabIndex={1}
                  />
                </div>
                <div className="col-md-3 form-group">
                  <label>Agency Name</label>
                  <input
                    type="text"
                    className="form-control form-control-sm "
                    name="txt_agency_name"
                    size={45}
                    maxLength={255}
                    tabIndex={1}
                  />
                </div>
                <div className="col-md-3 form-group">
                  <label>Country</label>
                  <MultiSelect
                    options={countries}
                    isSearchable
                    placeholder="- Select Country -"
                    noOptionsMessage={() => "No Country Found"}
                    onChange={handleCountryChange}
                    className="custom-select required"
                  />
                </div>
                <div className="col-md-3 form-group">
                  <label>City</label>
                  <MultiSelect
                    options={citiesByCountry[branchData.branchCountry] || []}
                    isSearchable
                    placeholder="- Select City -"
                    noOptionsMessage={() => "No City Found"}
                    onChange={handleCityChange}
                    className="custom-select required"
                  />
                  <div
                    id="city_loading"
                    style={{ position: "absolute", display: "none" }}
                  >
                    <img
                      src="/cpfv3/images/ajax_pagination_loading.gif"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-md-12 form-group">
                  <button
                    type="button"
                    className="btn btn-dark btn-sm"
                    name="add"
                    value="SUBMIT"
                    onclick="return check_email()"
                  >
                    <i className="fa fa-search" />
                    &nbsp;Search
                  </button>
                </div>
              </div>
            </div>
          </form>
          <br />
          <form>
            <div className="panel-body">
              <div className="row">
                <div className="radioline1 col-sm-4 form-group">
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      id="move"
                      name="submit"
                      onclick=":move_subscribers(1);"
                      defaultValue="Move To Group"
                    />
                    <label htmlFor="move">Move To Group</label>
                  </div>
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      id="app"
                      name="submit"
                      onclick=":move_subscribers(2);"
                      defaultValue="Create New Group From Selected"
                    />
                    <label htmlFor="create">
                      Create New Group From Selected
                    </label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div
                  className="col-sm-4 form-group"
                  id="div_move"
                  style={{ display: "none" }}
                >
                  <div className="col-md-12">
                    <label id="title" />
                  </div>
                  <div
                    id="move_loading"
                    style={{
                      position: "absolute",
                      display: "none",
                      padding: "0px 150px",
                    }}
                  >
                    <center>
                      <img src="images/indicator.gif" alt="" />
                    </center>
                  </div>
                  <div className="row">
                    <div id="move_datadisplay" />
                  </div>
                  <br />
                  <div
                    id="move_dataButton_2"
                    style={{ display: "none" }}
                    className
                  >
                    <button
                      type="button"
                      className="btn btn-primary"
                      name="btn_submit"
                      value="Create"
                      onclick=": add_subscribers_to_list(0);"
                    >
                      <h6>
                        <i className="fa fa-pencil" />
                        &nbsp;Create
                      </h6>
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      name="btn_submit"
                      value="Cancel"
                      onclick=": document.getElementById('div_move').style.display = 'none';"
                    >
                      <h6>
                        <i className="fa fa-times" />
                        &nbsp;Cancel
                      </h6>
                    </button>
                  </div>
                  <div
                    id="move_dataButton_1"
                    style={{ display: "none" }}
                    className
                  >
                    <button
                      type="button"
                      className="btn btn-primary"
                      name="btn_submit"
                      value="Move"
                      onclick=": add_subscribers_to_list(1);"
                    >
                      <h6>
                        <i className="fa fa-arrows" />
                        &nbsp;Move
                      </h6>
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      name="btn_submit"
                      value="Copy"
                      onclick=": add_subscribers_to_list(2);"
                    >
                      <h6>
                        <i className="fa fa-files-o" />
                        &nbsp;Copy
                      </h6>
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      name="btn_submit"
                      value="Cancel"
                      onclick=": document.getElementById('div_move').style.display = 'none';"
                    >
                      <h6>
                        <i className="fa fa-times" />
                        &nbsp;Cancel
                      </h6>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <br />
          <form>
            <div className="panel-body removeMargins">
              <div className="dataTables_scroll">
                <div className="row pd_tp">
                  <div className="row">
                    <div className="col-md-5 col_hide">
                      <div className="form-group col-md-12">&nbsp;</div>
                    </div>
                    <div className="col-md-5">
                      <div className="form-group">
                        <div className="custPaging pgType2">
                          <table
                            width="100%"
                            cellPadding={0}
                            cellSpacing={0}
                            border={0}
                            className="custPaging  pgType2"
                          >
                            <tbody className="bg-white">
                              <tr>
                                <td align="center" width="70%" />
                                <td align="right" width="30%" />
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-2 search_option">
                      <style
                        dangerouslySetInnerHTML={{
                          __html:
                            "\n                                    .table tr[visible='false'],\n                                    .no-result {\n                                        display: none;\n                                        border: 1px solid #ddd;\n                                        padding: 10px;\n                                        margin-top: -2px;\n                                    }\n\n                                    .table tr[visible='true'] {\n                                        display: table-row;\n                                    }\n\n                                    .counter {\n                                        padding: 8px;\n                                        color: #ccc;\n                                    }\n\n                                    .search_new {\n                                        float: right;\n                                        height: 35px;\n                                        margin-bottom: 0px;\n                                        padding-left: 5px;\n                                    }\n                                ",
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
                </div>
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
                    <div id="wrapper2" style={{ overflow: "auto" }}>
                      <table
                        id="search_sup"
                        className="table table-bordered   table-responsive dataTable no-footer"
                        role="grid"
                        aria-describedby="search_sup_info"
                      >
                        <thead>
                          <tr role="row">
                            <th
                              className="no-sort sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="
                                  
                              "
                              style={{ width: "71.2px" }}
                            >
                              <div className="checkbox checkbox-success checkbox-inline">
                                <input
                                  type="checkbox"
                                  name="email"
                                  id="email"
                                />
                                <label />
                              </div>
                            </th>
                            <th
                              className="sorting"
                              tabIndex={0}
                              aria-controls="search_sup"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Email Address
                                  
                                  
                              : activate to sort column ascending"
                              style={{ width: "282.2px" }}
                            >
                              Email Address
                              <a href="subscribers.php?sort_by=email&direction=up&name_search=&agency_name_search=&email_search=&country_search=&city_search=&sub_list_search=">
                                <img
                                  src="images/up_arrow.gif"
                                  alt=""
                                  border={0}
                                  height={5}
                                  width={9}
                                />
                              </a>
                              <a href="subscribers.php?sort_by=email&direction=down&name_search=&agency_name_search=&email_search=&country_search=&city_search=&sub_list_search=">
                                <img
                                  src="images/down_arrow.gif"
                                  alt=""
                                  border={0}
                                  height={5}
                                  width={9}
                                />
                              </a>
                            </th>
                            <th
                              className="sorting"
                              tabIndex={0}
                              aria-controls="search_sup"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Name
                                  
                                  
                              : activate to sort column ascending"
                              style={{ width: "102.2px" }}
                            >
                              Name
                              <a href="subscribers.php?sort_by=name&direction=up&name_search=&agency_name_search=&email_search=&country_search=&city_search=&sub_list_search=">
                                <img
                                  src="images/up_arrow.gif"
                                  alt=""
                                  border={0}
                                  height={5}
                                  width={9}
                                />
                              </a>
                              <a href="subscribers.php?sort_by=name&direction=down&name_search=&agency_name_search=&email_search=&country_search=&city_search=&sub_list_search=">
                                <img
                                  src="images/down_arrow.gif"
                                  alt=""
                                  border={0}
                                  height={5}
                                  width={9}
                                />
                              </a>
                            </th>
                            <th
                              className="sorting"
                              tabIndex={0}
                              aria-controls="search_sup"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Agency Name
                                  
                                  
                              : activate to sort column ascending"
                              style={{ width: "117.2px" }}
                            >
                              Agency Name
                              <a href="subscribers.php?sort_by=from_name&direction=up&name_search=&agency_name_search=&email_search=&country_search=&city_search=&sub_list_search=">
                                <img
                                  src="images/up_arrow.gif"
                                  alt=""
                                  border={0}
                                  height={5}
                                  width={9}
                                />
                              </a>
                              <a href="subscribers.php?sort_by=from_name&direction=down&name_search=&agency_name_search=&email_search=&country_search=&city_search=&sub_list_search=">
                                <img
                                  src="images/down_arrow.gif"
                                  alt=""
                                  border={0}
                                  height={5}
                                  width={9}
                                />
                              </a>
                            </th>
                            <th
                              className="no-sort sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Subscriber Group"
                              style={{ width: "153.2px" }}
                            >
                              Subscriber Group
                            </th>
                            <th
                              className="no-sort sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Date Added"
                              style={{ width: "163.2px" }}
                            >
                              Date Added
                            </th>
                            <th
                              className="no-sort sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Last Modified"
                              style={{ width: "163.2px" }}
                            >
                              Last Modified
                            </th>
                            <th
                              className="no-sort sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Country"
                              style={{ width: "75.2px" }}
                            >
                              Country
                            </th>
                            <th
                              className="no-sort sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="City"
                              style={{ width: "78.2px" }}
                            >
                              City
                            </th>
                            <th
                              className="no-sort sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Actions"
                              style={{ width: "148px" }}
                            >
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          <tr className="phps_row_1 odd" role="row">
                            <td>
                              <div className="checkbox checkbox-success checkbox-inline">
                                <input
                                  className="select-option"
                                  type="checkbox"
                                  name="email[]"
                                  id="chk_13"
                                />
                                <label />
                              </div>
                            </td>
                            <td>nida.ansari@qtechsoftware.com</td>
                            <td>Nida Ansari</td>
                            <td>Qtech</td>
                            <td>Qtech Profile</td>
                            <td>2019-09-06 06:51:49</td>
                            <td>2019-09-06 06:55:44</td>
                            <td>India</td>
                            <td>Mumbai</td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .MESSAGESMASSMAILSUBSCRIBEREDIT
                                    }
                                  >
                                    <i
                                      className="fa fa-pencil-square-o"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      alt="Edit"
                                      title
                                      data-original-title="Edit"
                                    />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .MESSAGESMASSMAILSUBSCRIBERVIEW
                                    }
                                  >
                                    <i
                                      className="fa fa-eye"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      alt="View"
                                      title
                                      data-original-title="View"
                                    />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link href="confirm_delete_subscriber('delete',13,1);">
                                    <i
                                      className="fa fa-trash"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      alt="Delete"
                                      title
                                      data-original-title="Delete"
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
                <br />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default MessagesMassMailSubscribersSearch;
