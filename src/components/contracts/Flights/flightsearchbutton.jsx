import React, { useState } from "react";

import { Link } from "react-router-dom";
import Header2 from "../../header2/header2";
import Constants from "../../../constants/routes";
import MultiSelect from "../../reactMultiSelect";
import { AirlineOptions } from "../../../constants/contants";

const ContractsFlightsSearchButton = () => {
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    const checkboxes = document.querySelectorAll(".select-option");
    checkboxes.forEach((checkbox) => {
      checkbox.checked = !selectAll;
    });
  };
  return (
    <>
      <Header2
        title="SEARCH FLIGHT"
        linkText1="Flight List"
        linkText2="Add List"
        link2={Constants.URLConstants.CONTRACTSFLIGHTSADDLIST}
      />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <div>
          <form>
            <div className="panel-body">
              <div className="row mt-2">
                <div className="form-group col-md-3">
                  <label>Airline</label>
                  <MultiSelect
                    options={AirlineOptions}
                    isSearchable
                    placeholder="- Select Airline -"
                    className="custom-select"
                    noOptionsMessage={() => "No Airline Found"}
                  />
                </div>
                <div className="col-md-3 form-group">
                  <label>Flight Number</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="Search_flight_number"
                    size={20}
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-3 form-group">
                  <button
                    type="button"
                    className="btn btn-dark btn-sm"
                    value="Search"
                    onclick="javascriptcallSearch(document.forms['search_flight_form']);"
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
            <div className="panel-body removeMargins">
              <div className="dataTables_scroll">
                <div className="row pd_tp">
                  <div className="row ">
                    <div className="col-md-5">
                      <div className="col-md-12 form-group">
                        <button
                          type="button"
                          name="Delete"
                          value="Delete"
                          className="btn btn-danger btn-sm"
                          onclick="javascriptvalidate_chk(document.forms['search_flight_form'],'multi_delete');"
                        >
                          <i className="fa fa-trash-o" />
                          &nbsp;Delete
                        </button>
                        <button
                          type="button"
                          name="Activate"
                          value="Activate"
                          className="btn btn-success btn-sm mx-1"
                          onclick="javascriptvalidate_chk(document.forms['search_flight_form'],'Activate');"
                        >
                          <i className="fa fa-check" />
                          &nbsp;Activate
                        </button>
                        <button
                          type="button"
                          name="Deactivate"
                          value="Deactivate"
                          className="btn btn-deactivate btn-sm mx-1"
                          onclick="javascriptvalidate_chk(document.forms['search_flight_form'],'Deactivate');"
                        >
                          <i className="fa fa-close" />
                          &nbsp;Deactivate
                        </button>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group"></div>
                    </div>
                    <div className="col-md-3 search_option">
                      <style
                        dangerouslySetInnerHTML={{
                          __html:
                            "\n                                .table tr[visible='false'],\n                                .no-result {\n                                    display: none;\n                                    border: 1px solid #ddd;\n                                    padding: 10px;\n                                    margin-top: -2px;\n                                }\n\n                                .table tr[visible='true'] {\n                                    display: table-row;\n                                }\n\n                                .counter {\n                                    padding: 8px;\n                                    color: #ccc;\n                                }\n\n                                .search_new {\n                                    float: right;\n                                    height: 35px;\n                                    margin-bottom: 0px;\n                                    padding-left: 5px;\n                                }\n                            ",
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
                          className="table   table-responsive dataTable no-footer table-bordered"
                          role="grid"
                          aria-describedby="search_sup_info"
                        >
                          <thead>
                            <tr role="row">
                              <th
                                className="no-sort sorting_asc"
                                rowSpan={1}
                                colSpan={1}
                                aria-label="
                               
                                  
                                  
                                  
                          "
                                style={{ width: "97px" }}
                              >
                                <div className="checkbox checkbox-success">
                                  <input
                                    type="checkbox"
                                    name="selectAll"
                                    id="selectAll"
                                    style={{ marginLeft: "-13px" }}
                                    onChange={handleSelectAll}
                                    checked={selectAll}
                                  />
                                  <label htmlFor="selectAll" />
                                </div>
                              </th>
                              <th
                                className="sorting"
                                tabIndex={0}
                                aria-controls="search_sup"
                                rowSpan={1}
                                colSpan={1}
                                aria-label="
                              Airline
                          : activate to sort column ascending"
                                style={{ width: "53px" }}
                              >
                                Airline
                              </th>
                              <th
                                className="sorting"
                                tabIndex={0}
                                aria-controls="search_sup"
                                rowSpan={1}
                                colSpan={1}
                                aria-label="
                              Flight Code
                          : activate to sort column ascending"
                                style={{ width: "123px" }}
                              >
                                Flight Code
                              </th>
                              <th
                                className="sorting"
                                tabIndex={0}
                                aria-controls="search_sup"
                                rowSpan={1}
                                colSpan={1}
                                aria-label="
                              Destination From
                          : activate to sort column ascending"
                                style={{ width: "156px" }}
                              >
                                Destination From
                              </th>
                              <th
                                className="sorting"
                                tabIndex={0}
                                aria-controls="search_sup"
                                rowSpan={1}
                                colSpan={1}
                                aria-label="
                              Destination To
                          : activate to sort column ascending"
                                style={{ width: "116px" }}
                              >
                                Destination To
                              </th>
                              <th
                                className="sorting"
                                tabIndex={0}
                                aria-controls="search_sup"
                                rowSpan={1}
                                colSpan={1}
                                aria-label="
                              Aircraft
                          : activate to sort column ascending"
                                style={{ width: "58px" }}
                              >
                                Aircraft
                              </th>
                              <th
                                className="sorting"
                                tabIndex={0}
                                aria-controls="search_sup"
                                rowSpan={1}
                                colSpan={1}
                                aria-label="
                              Infant Age
                          : activate to sort column ascending"
                                style={{ width: "69px" }}
                              >
                                Infant Age
                              </th>
                              <th
                                className="sorting"
                                tabIndex={0}
                                aria-controls="search_sup"
                                rowSpan={1}
                                colSpan={1}
                                aria-label="
                              Child Age
                          : activate to sort column ascending"
                                style={{ width: "61px" }}
                              >
                                Child Age
                              </th>
                              <th
                                className="sorting"
                                tabIndex={0}
                                aria-controls="search_sup"
                                rowSpan={1}
                                colSpan={1}
                                aria-label="
                              Departure Time
                          : activate to sort column ascending"
                                style={{ width: "97px" }}
                              >
                                Departure Time
                              </th>
                              <th
                                className="sorting"
                                tabIndex={0}
                                aria-controls="search_sup"
                                rowSpan={1}
                                colSpan={1}
                                aria-label="
                              Arrival Time
                          : activate to sort column ascending"
                                style={{ width: "80px" }}
                              >
                                Arrival Time
                              </th>
                              <th
                                className="sorting"
                                tabIndex={0}
                                aria-controls="search_sup"
                                rowSpan={1}
                                colSpan={1}
                                aria-label="
                              Duration
                          : activate to sort column ascending"
                                style={{ width: "59px" }}
                              >
                                Duration
                              </th>
                              <th
                                className="no-sort sorting_disabled"
                                id="action-col"
                                rowSpan={1}
                                colSpan={1}
                                aria-label="Actions"
                                style={{ width: "98px" }}
                              >
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white">
                            <tr className="phps_row_1 odd" role="row">
                              <td className="sorting_1">
                                <div className="checkbox checkbox-success">
                                  <input
                                    className="select-option"
                                    type="checkbox"
                                    name="del[]"
                                    id="del[]"
                                    defaultValue={1}
                                    style={{
                                      position: "absolute",
                                      marginLeft: "-20px",
                                    }}
                                  />
                                  <label htmlFor="del[]" />
                                </div>
                              </td>
                              <td>Air India</td>
                              <td>CharterFlight_2022</td>
                              <td>Chhatrapati Shivaji</td>
                              <td>Dubai Intl Arpt</td>
                              <td>Boeing</td>
                              {/* <td>
                              
                          </td>
                          <td>
                              
                          </td> */}
                              <td>2</td>
                              <td>12</td>
                              <td>02:00:00</td>
                              <td>05:00:00</td>
                              <td>03:00:00</td>
                              <td className="actionlink">
                                <div className="actionCont">
                                  <div className="input-group-addon">
                                    <Link
                                      to={
                                        Constants.URLConstants
                                          .CONTRACTSFLIGHTSEDITLIST
                                      }
                                      alt="Edit"
                                      title
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      data-original-title="Edit"
                                    >
                                      <i className="fa fa-pencil-square-o" />
                                    </Link>
                                  </div>
                                  <div className="input-group-addon">
                                    <Link
                                      to={
                                        Constants.URLConstants
                                          .CONTRACTSFLIGHTSVIEWLIST
                                      }
                                      alt="View1"
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
                                      to="javascript confirm_inactive('flight.php?action=inactive&id=1&Search=Y&Search_airline=&Search_flight_number=&next=');"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title
                                      data-original-title="Click To Deactivate"
                                    >
                                      {/*<img src="images/activate.gif" alt="Active" border=0>*/}
                                      <i className="fa fa-check-circle" />
                                    </Link>
                                  </div>
                                  <div className="input-group-addon">
                                    <Link
                                      to="javascript showDeleteAlert1('Are You Sure you want to delete?','flight.php?action=delete&id=1&Search=Y&Search_airline=&Search_flight_number=&next=');"
                                      alt="Delete"
                                      title
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      data-original-title="Delete"
                                    >
                                      {/*<img src="images/delete.gif" alt="Delete" title="Delete" data-toggle="tooltip" data-placement="top" border=0>*/}
                                      <i className="fa fa-trash" />
                                    </Link>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr className="phps_row_0 even" role="row">
                              <td className="sorting_1">
                                <div className="checkbox checkbox-success">
                                  <input
                                    className="select-option"
                                    type="checkbox"
                                    name="del[]"
                                    id="del[]"
                                    defaultValue={1}
                                    style={{
                                      position: "absolute",
                                      marginLeft: "-20px",
                                    }}
                                  />
                                  <label htmlFor="del[]" />
                                </div>
                              </td>
                              <td>Air India</td>
                              <td>CharterFlight_2022</td>
                              <td>Chhatrapati Shivaji</td>
                              <td>Dubai Intl Arpt</td>
                              <td>Boeing</td>
                              {/* <td>
                              
                          </td>
                          <td>
                              
                          </td> */}
                              <td>2</td>
                              <td>12</td>
                              <td>02:00:00</td>
                              <td>05:00:00</td>
                              <td>03:00:00</td>
                              <td className="actionlink">
                                <div className="actionCont">
                                  <div className="input-group-addon">
                                    <Link
                                      to={
                                        Constants.URLConstants
                                          .CONTRACTSFLIGHTSEDITLIST
                                      }
                                      alt="Edit"
                                      title
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      data-original-title="Edit"
                                    >
                                      <i className="fa fa-pencil-square-o" />
                                    </Link>
                                  </div>
                                  <div className="input-group-addon">
                                    <Link
                                      to={
                                        Constants.URLConstants
                                          .CONTRACTSFLIGHTSVIEWLIST
                                      }
                                      alt="View1"
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
                                      to="javascript confirm_inactive('flight.php?action=inactive&id=1&Search=Y&Search_airline=&Search_flight_number=&next=');"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title
                                      data-original-title="Click To Deactivate"
                                    >
                                      {/*<img src="images/activate.gif" alt="Active" border=0>*/}
                                      <i className="fa fa-check-circle" />
                                    </Link>
                                  </div>
                                  <div className="input-group-addon">
                                    <Link
                                      to="javascript showDeleteAlert1('Are You Sure you want to delete?','flight.php?action=delete&id=1&Search=Y&Search_airline=&Search_flight_number=&next=');"
                                      alt="Delete"
                                      title
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      data-original-title="Delete"
                                    >
                                      {/*<img src="images/delete.gif" alt="Delete" title="Delete" data-toggle="tooltip" data-placement="top" border=0>*/}
                                      <i className="fa fa-trash" />
                                    </Link>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr className="phps_row_1 odd" role="row">
                              <td className="sorting_1">
                                <div className="checkbox checkbox-success">
                                  <input
                                    className="select-option"
                                    type="checkbox"
                                    name="del[]"
                                    id="del[]"
                                    defaultValue={2}
                                    style={{
                                      position: "absolute",
                                      marginLeft: "-20px",
                                    }}
                                  />
                                  <label htmlFor="del[]" />
                                </div>
                              </td>
                              <td>AccesRail</td>
                              <td>CharterFlight_2023</td>
                              <td>A B Cantanhede Intl Arpt</td>
                              <td>A C Jobim Intl Arpt</td>
                              <td>Boeing</td>
                              {/* <td>
                              
                          </td>
                          <td>
                              
                          </td> */}
                              <td>3</td>
                              <td>10</td>
                              <td>05:00:00</td>
                              <td>09:00:00</td>
                              <td>04:00:00</td>
                              <td className="actionlink">
                                <div className="actionCont">
                                  <div className="input-group-addon">
                                    <Link
                                      to={
                                        Constants.URLConstants
                                          .CONTRACTSFLIGHTSEDITLIST
                                      }
                                      alt="Edit"
                                      title
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      data-original-title="Edit"
                                    >
                                      <i className="fa fa-pencil-square-o" />
                                    </Link>
                                  </div>
                                  <div className="input-group-addon">
                                    <Link
                                      to={
                                        Constants.URLConstants
                                          .CONTRACTSFLIGHTSVIEWLIST
                                      }
                                      alt="View1"
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
                                      to="javascript confirm_inactive('flight.php?action=inactive&id=2&Search=Y&Search_airline=&Search_flight_number=&next=');"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title
                                      data-original-title="Click To Deactivate"
                                    >
                                      {/*<img src="images/activate.gif" alt="Active" border=0>*/}
                                      <i className="fa fa-check-circle" />
                                    </Link>
                                  </div>
                                  <div className="input-group-addon">
                                    <Link
                                      to="javascript showDeleteAlert1('Are You Sure you want to delete?','flight.php?action=delete&id=2&Search=Y&Search_airline=&Search_flight_number=&next=');"
                                      alt="Delete"
                                      title
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      data-original-title="Delete"
                                    >
                                      {/*<img src="images/delete.gif" alt="Delete" title="Delete" data-toggle="tooltip" data-placement="top" border=0>*/}
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
                <div className="form-group no-result">
                  <h5 className="text-center">No result found.</h5>
                </div>
                <div className="row pd_tp">
                  <div className="row">
                    <div className="col-md-4 col_hide">
                      <div className="col-md-12 form-group">&nbsp;</div>
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
                    <div className="col-md-3 col_hide">&nbsp;</div>
                  </div>
                </div>
                <br />
                <br />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default ContractsFlightsSearchButton;
